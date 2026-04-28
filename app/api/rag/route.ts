import { NextResponse, type NextRequest } from "next/server";
import { runRAG, RAGValidationError } from "../../../lib/rag/pipeline";
import type { RAGErrorResponse, RAGResponse } from "../../../types/rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(message: string, status: number) {
  const body: RAGErrorResponse = { error: message };
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("Invalid JSON body.", 400);
  }

  if (typeof payload !== "object" || payload === null) {
    return errorResponse("Request body must be a JSON object.", 400);
  }

  const query = (payload as { query?: unknown }).query;

  try {
    const response: RAGResponse = runRAG(query);
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof RAGValidationError) {
      return errorResponse(error.message, 400);
    }
    // Never leak internals in error messages.
    return errorResponse("Something went wrong processing your request.", 500);
  }
}
