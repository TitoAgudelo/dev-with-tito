"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

type FormState =
  | { readonly status: "idle" }
  | { readonly status: "submitting" }
  | { readonly status: "success"; readonly message: string }
  | { readonly status: "error"; readonly message: string };

const initialState: FormState = { status: "idle" };

interface ContactFormProps {
  readonly appearance?: "default" | "terminal";
  readonly idPrefix?: string;
}

export default function ContactForm({
  appearance = "default",
  idPrefix,
}: ContactFormProps = {}) {
  const [state, setState] = useState<FormState>(initialState);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const submissionPendingRef = useRef(false);
  const generatedId = useId().replaceAll(":", "");
  const fieldIdPrefix = idPrefix ?? `contact-${generatedId}`;
  const emailId = `${fieldIdPrefix}-email`;
  const subjectId = `${fieldIdPrefix}-subject`;
  const messageId = `${fieldIdPrefix}-message`;
  const terminalAppearance = appearance === "terminal";

  useEffect(() => {
    if (state.status === "success") successHeadingRef.current?.focus();
  }, [state.status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionPendingRef.current) return;

    submissionPendingRef.current = true;
    setState({ status: "submitting" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const result: unknown = await response.json().catch(() => null);
      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        !("success" in result) ||
        result.success !== true
      ) {
        const message = result && typeof result === "object" && "error" in result && typeof result.error === "string"
          ? result.error
          : "Your message could not be sent. Your entries are preserved; try again or use direct email.";
        setState({ status: "error", message });
        return;
      }

      form.reset();
      setState({ status: "success", message: "Your message was sent successfully." });
    } catch {
      setState({
        status: "error",
        message: "Your message could not be sent. Your entries are preserved; try again or use direct email.",
      });
    } finally {
      submissionPendingRef.current = false;
    }
  };

  if (state.status === "success") {
    return (
      <div
        className={`contact-form__success flex flex-col items-start py-8${terminalAppearance ? " contact-form__success--terminal" : ""}`}
        role="status"
      >
        <h3 ref={successHeadingRef} tabIndex={-1} className="type-h3">
          Message sent
        </h3>
        <p className="type-body mt-2">{state.message}</p>
        <button type="button" onClick={() => setState(initialState)} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    );
  }

  const submitting = state.status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className={`contact-form flex flex-col gap-5${terminalAppearance ? " contact-form--terminal" : ""}`}
      aria-busy={submitting}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="contact-form__label text-sm font-medium text-secondary">Email</label>
        <input
          type="email"
          name="email"
          id={emailId}
          required
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
          className="input-field"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={subjectId} className="contact-form__label text-sm font-medium text-secondary">Subject</label>
        <input
          type="text"
          name="subject"
          id={subjectId}
          required
          maxLength={120}
          placeholder="What would you like to discuss?"
          className="input-field"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className="contact-form__label text-sm font-medium text-secondary">Message</label>
        <textarea
          name="message"
          id={messageId}
          required
          maxLength={2000}
          rows={6}
          placeholder="Share the problem, context, and desired outcome."
          className="input-field resize-y"
        />
      </div>

      {state.status === "error" ? (
        <p className="contact-form__error text-sm text-[var(--color-danger)]" role="alert">{state.message}</p>
      ) : null}

      <p className="contact-form__help type-small">Form content is sent through the site&apos;s email delivery service so Tito can respond. Prefer not to use it? Choose direct email.</p>

      <button type="submit" disabled={submitting} className="contact-form__submit btn-glow w-full">
        {submitting ? "Sending message…" : "Send message"}
      </button>
    </form>
  );
}
