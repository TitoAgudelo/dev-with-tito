import OpenAI from "openai";

let client: OpenAI | undefined;

export function getOpenRouterClient(): OpenAI {
  if (typeof window !== "undefined") {
    throw new Error("OpenRouter solo puede usarse en el servidor.");
  }

  if (!client) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("Falta OPENROUTER_API_KEY.");
    }

    client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
      timeout: 20_000,
      maxRetries: 0,
    });
  }

  return client;
}

export function getOpenRouterModel(): string {
  return process.env.OPENROUTER_CHAT_MODEL?.trim() || "openrouter/free";
}
