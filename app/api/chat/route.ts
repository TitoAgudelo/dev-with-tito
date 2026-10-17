
import { randomUUID } from "node:crypto";
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

type RequestStage =
  | "rate_limit"
  | "parse_json"
  | "validate_question"
  | "classify_question"
  | "retrieve_context"
  | "create_completion"
  | "stream_response";

function logInfo(
  requestId: string,
  stage: RequestStage,
  message: string,
  details?: Record<string, unknown>,
) {
  console.info("[AskTito]", {
    requestId,
    stage,
    message,
    timestamp: new Date().toISOString(),
    ...details,
  });
}

function logError(
  requestId: string,
  stage: RequestStage,
  error: unknown,
) {
  const details =
    error instanceof Error
      ? {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
        cause:
          error.cause instanceof Error
            ? {
              name: error.cause.name,
              message: error.cause.message,
            }
            : error.cause,
      }
      : {
        errorName: "UnknownError",
        errorMessage: String(error),
      };

  console.error("[AskTito]", {
    requestId,
    stage,
    message: "Operation failed",
    timestamp: new Date().toISOString(),
    ...details,
  });
}

function jsonError(
  message: string,
  status: number,
  requestId: string,
) {
  return NextResponse.json(
    { error: message, requestId },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Request-ID": requestId,
      },
    },
  );
}

function clientKey(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();

  const recent = (requestLog.get(key) ?? []).filter(
    (timestamp) => timestamp > now - RATE_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT) {
    requestLog.set(key, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(key, recent);

  if (requestLog.size > 1_000) {
    for (const [candidate, entries] of requestLog) {
      if (
        entries.every(
          (timestamp) => timestamp <= now - RATE_WINDOW_MS,
        )
      ) {
        requestLog.delete(candidate);
      }
    }
  }

  return false;
}

function encodeEvent(event: AskTitoStreamEvent): Uint8Array {
  return new TextEncoder().encode(
    `${JSON.stringify(event)}\n`,
  );
}

function streamResponse(
  body: ReadableStream<Uint8Array>,
  requestId: string,
): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Content-Type-Options": "nosniff",
      "X-Request-ID": requestId,
    },
  });
}

function staticStream(
  text: string,
  requestId: string,
): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encodeEvent({ type: "sources", sources: [] }),
      );
      controller.enqueue(
        encodeEvent({ type: "delta", text }),
      );
      controller.enqueue(encodeEvent({ type: "done" }));
      controller.close();
    },
  });

  return streamResponse(body, requestId);
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const startedAt = Date.now();

  let stage: RequestStage = "rate_limit";

  logInfo(requestId, stage, "Request received", {
    method: request.method,
    url: request.nextUrl.pathname,
  });

  try {
    if (isRateLimited(clientKey(request))) {
      logInfo(requestId, stage, "Rate limit exceeded");

      return jsonError(
        "Too many questions. Please wait a moment and try again.",
        429,
        requestId,
      );
    }

    stage = "parse_json";
    logInfo(requestId, stage, "Parsing request body");

    let payload: unknown;

    try {
      payload = await request.json();
    } catch (error) {
      logError(requestId, stage, error);
      return jsonError("Invalid JSON body.", 400, requestId);
    }

    stage = "validate_question";
    logInfo(requestId, stage, "Validating question");

    const question = validateQuestion(
      (payload as { question?: unknown } | null)?.question,
    );

    logInfo(requestId, stage, "Question validated");

    stage = "classify_question";
    logInfo(requestId, stage, "Classifying question");

    const classification = classifyQuestion(question);

    logInfo(requestId, stage, "Classification completed", {
      classification,
    });

    if (classification !== "allowed") {
      logInfo(requestId, stage, "Returning out-of-scope response");

      return staticStream(OUT_OF_SCOPE_RESPONSE, requestId);
    }

    stage = "retrieve_context";
    logInfo(requestId, stage, "Retrieving career context");

    const retrievalStartedAt = Date.now();
    const sources = await retrieveCareerContext(question);

    logInfo(requestId, stage, "Context retrieval completed", {
      durationMs: Date.now() - retrievalStartedAt,
      sourceCount: sources.length,
    });

    if (sources.length === 0) {
      logInfo(requestId, stage, "No context sources found");

      return staticStream(UNAVAILABLE_RESPONSE, requestId);
    }

    stage = "create_completion";
    logInfo(requestId, stage, "Creating grounded AI completion");

    const completionStartedAt = Date.now();

    const completion = await createGroundedAnswerStream(
      question,
      sources,
      request.signal,
    );

    logInfo(requestId, stage, "AI completion stream created", {
      durationMs: Date.now() - completionStartedAt,
    });

    stage = "stream_response";

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        let chunkCount = 0;
        let characterCount = 0;

        try {
          controller.enqueue(
            encodeEvent({ type: "sources", sources }),
          );

          logInfo(requestId, stage, "Streaming started");

          for await (const chunk of completion) {
            if (request.signal.aborted) {
              logInfo(requestId, stage, "Request aborted by client");
              break;
            }

            const text = chunk.choices[0]?.delta?.content;

            if (text) {
              chunkCount++;
              characterCount += text.length;

              controller.enqueue(
                encodeEvent({ type: "delta", text }),
              );
            }
          }

          if (!request.signal.aborted) {
            controller.enqueue(encodeEvent({ type: "done" }));
          }

          logInfo(requestId, stage, "Streaming completed", {
            chunkCount,
            characterCount,
            durationMs: Date.now() - startedAt,
          });
        } catch (error) {
          logError(requestId, stage, error);

          if (!request.signal.aborted) {
            try {
              controller.enqueue(
                encodeEvent({
                  type: "error",
                  message: "The AI service is temporarily unavailable.",
                }),
              );
            } catch (enqueueError) {
              logError(requestId, stage, enqueueError);
            }
          }
        } finally {
          try {
            controller.close();
          } catch (error) {
            logError(requestId, stage, error);
          }
        }
      },

      cancel(reason) {
        logInfo(requestId, stage, "Stream cancelled", {
          reason:
            reason instanceof Error
              ? reason.message
              : String(reason ?? "No reason provided"),
        });

        completion.controller.abort();
      },
    });

    logInfo(requestId, stage, "Returning HTTP streaming response", {
      durationMs: Date.now() - startedAt,
    });

    return streamResponse(body, requestId);
  } catch (error: unknown) {
    logError(requestId, stage, error);

    if (error instanceof AskTitoValidationError) {
      return jsonError(error.message, 400, requestId);
    }

    logError(requestId, stage, new Error(
      `Request failed at stage "${stage}"`,
      { cause: error },
    ));

    return jsonError(
      "Ask Tito AI is temporarily unavailable. Please try again later.",
      503,
      requestId,
    );
  }
}
