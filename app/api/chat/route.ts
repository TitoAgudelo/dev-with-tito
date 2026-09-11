import { NextResponse, type NextRequest } from "next/server";

import {
  AskTitoValidationError,
  OUT_OF_SCOPE_RESPONSE,
  UNAVAILABLE_RESPONSE,
  classifyQuestion,
  createGroundedAnswerStream,
  retrieveCareerContext,
  validateQuestion,
} from "../../../lib/rag";
import type { AskTitoStreamEvent } from "../../../types/ask-tito";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const requestLog = new Map<string, number[]>();

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

function clientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((timestamp) => timestamp > now - RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    requestLog.set(key, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(key, recent);
  if (requestLog.size > 1_000) {
    for (const [candidate, entries] of requestLog) {
      if (entries.every((timestamp) => timestamp <= now - RATE_WINDOW_MS)) requestLog.delete(candidate);
    }
  }
  return false;
}

function encodeEvent(event: AskTitoStreamEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}

function staticStream(text: string): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encodeEvent({ type: "sources", sources: [] }));
      controller.enqueue(encodeEvent({ type: "delta", text }));
      controller.enqueue(encodeEvent({ type: "done" }));
      controller.close();
    },
  });
  return streamResponse(body);
}

function streamResponse(body: ReadableStream<Uint8Array>): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) return jsonError("Too many questions. Please wait a moment and try again.", 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid JSON body.", 400);
  }

  try {
    const question = validateQuestion((payload as { question?: unknown } | null)?.question);
    if (classifyQuestion(question) !== "allowed") return staticStream(OUT_OF_SCOPE_RESPONSE);

    const sources = await retrieveCareerContext(question);
    if (sources.length === 0) return staticStream(UNAVAILABLE_RESPONSE);
    const completion = await createGroundedAnswerStream(question, sources, request.signal);

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        controller.enqueue(encodeEvent({ type: "sources", sources }));
        try {
          for await (const chunk of completion) {
            if (request.signal.aborted) break;
            const text = chunk.choices[0]?.delta?.content;
            if (text) controller.enqueue(encodeEvent({ type: "delta", text }));
          }
          if (!request.signal.aborted) controller.enqueue(encodeEvent({ type: "done" }));
        } catch {
          if (!request.signal.aborted) controller.enqueue(encodeEvent({ type: "error", message: "The AI service is temporarily unavailable." }));
        } finally {
          controller.close();
        }
      },
      cancel() {
        completion.controller.abort();
      },
    });
    return streamResponse(body);
  } catch (error: unknown) {
    if (error instanceof AskTitoValidationError) return jsonError(error.message, 400);
    return jsonError("Ask Tito AI is temporarily unavailable. Please try again later.", 503);
  }
}
