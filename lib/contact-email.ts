import { NextResponse } from "next/server";

export const CONTACT_EMAIL_FROM = "Tito Portfolio <contact@tito.website>";
export const CONTACT_EMAIL_TO = "titoarturoagudelo@gmail.com";

const limits = {
  email: 254,
  subject: 120,
  message: 2000,
} as const;

export interface ContactEmailPayload {
  readonly from: string;
  readonly to: string;
  readonly replyTo: string;
  readonly subject: string;
  readonly text: string;
}

export interface ContactProviderError {
  readonly name?: string;
  readonly statusCode?: number | null;
  readonly message?: string;
}

interface ContactProviderResult {
  readonly data: { readonly id: string } | null;
  readonly error: ContactProviderError | null;
}

interface ContactHandlerDependencies {
  readonly getApiKey: () => string | undefined;
  readonly sendEmail: (
    apiKey: string,
    payload: ContactEmailPayload,
  ) => Promise<ContactProviderResult>;
  readonly logger?: Pick<Console, "error">;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function errorMetadata(error: unknown) {
  if (!error || typeof error !== "object") {
    return { errorName: "unknown", statusCode: null };
  }

  const candidate = error as Record<string, unknown>;
  const errorName = typeof candidate.name === "string"
    ? candidate.name.slice(0, 80)
    : "unknown";
  const statusCode = typeof candidate.statusCode === "number"
    ? candidate.statusCode
    : typeof candidate.status === "number"
      ? candidate.status
      : null;

  return { errorName, statusCode };
}

function providerFailureMessage(statusCode: number | null | undefined): string {
  if (statusCode === 429) {
    return "Messaging is temporarily busy. Please wait a moment and try again.";
  }

  return "The email service rejected the message. Please try again or use direct email.";
}

export function createContactHandler({
  getApiKey,
  sendEmail,
  logger = console,
}: ContactHandlerDependencies) {
  return async function handleContactRequest(request: Request) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { email, subject, message } = body as Record<string, unknown>;
    if (
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Check your email, subject, and message, then try again." },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim();
    const normalizedSubject = subject.trim();
    const normalizedMessage = message.trim();

    if (
      !isValidEmail(normalizedEmail) ||
      normalizedEmail.length > limits.email ||
      normalizedSubject.length === 0 ||
      normalizedSubject.length > limits.subject ||
      normalizedMessage.length === 0 ||
      normalizedMessage.length > limits.message
    ) {
      return NextResponse.json(
        { error: "Check your email, subject, and message, then try again." },
        { status: 400 },
      );
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      logger.error("Contact email configuration is missing.", {
        errorName: "missing_configuration",
        statusCode: null,
      });
      return NextResponse.json(
        { error: "Messaging is temporarily unavailable. Please use direct email." },
        { status: 503 },
      );
    }

    const payload: ContactEmailPayload = {
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: normalizedEmail,
      subject: `[Portfolio] ${normalizedSubject}`,
      text: `From: ${normalizedEmail}\n\nSubject: ${normalizedSubject}\n\n${normalizedMessage}`,
    };

    try {
      const result = await sendEmail(apiKey, payload);
      if (result.error) {
        const metadata = errorMetadata(result.error);
        logger.error("Contact email provider rejected the request.", metadata);
        return NextResponse.json(
          { error: providerFailureMessage(metadata.statusCode) },
          { status: metadata.statusCode === 429 ? 503 : 502 },
        );
      }

      if (!result.data?.id) {
        logger.error("Contact email provider returned no acceptance identifier.", {
          errorName: "missing_acceptance_id",
          statusCode: null,
        });
        return NextResponse.json(
          { error: "The email service did not accept the message. Please try again." },
          { status: 502 },
        );
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      logger.error("Contact email provider request failed.", errorMetadata(error));
      return NextResponse.json(
        { error: "Messaging is temporarily unavailable. Please try again or use direct email." },
        { status: 502 },
      );
    }
  };
}
