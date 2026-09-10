import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const limits = {
  email: 254,
  subject: 120,
  message: 2000,
} as const;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { email, subject, message } = body as Record<string, unknown>;

    if (
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !isValidEmail(email.trim()) ||
      email.length > limits.email ||
      subject.trim().length === 0 ||
      subject.length > limits.subject ||
      message.trim().length === 0 ||
      message.length > limits.message
    ) {
      return NextResponse.json(
        { error: "Invalid contact details" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "titoarturoagudelo@gmail.com",
      replyTo: email.trim(),
      subject: `[Portfolio] ${subject.trim()}`,
      text: `From: ${email.trim()}\n\nSubject: ${subject.trim()}\n\n${message.trim()}`,
    });

    if (error) {
      return NextResponse.json({ error: "Message delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
