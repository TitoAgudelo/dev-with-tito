"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type FormState =
  | { readonly status: "idle" }
  | { readonly status: "submitting" }
  | { readonly status: "success"; readonly message: string }
  | { readonly status: "error"; readonly message: string };

const initialState: FormState = { status: "idle" };

export default function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.status === "success") successHeadingRef.current?.focus();
  }, [state.status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      setState({ status: "success", message: "Your message was sent successfully." });
    } catch {
      setState({
        status: "error",
        message: "Your message could not be sent. Your entries are preserved; try again or use direct email.",
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start py-8" role="status">
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-busy={submitting}>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-secondary">Email</label>
        <input
          type="email"
          name="email"
          id="contact-email"
          required
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
          className="input-field"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="text-sm font-medium text-secondary">Subject</label>
        <input
          type="text"
          name="subject"
          id="contact-subject"
          required
          maxLength={120}
          placeholder="What would you like to discuss?"
          className="input-field"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-secondary">Message</label>
        <textarea
          name="message"
          id="contact-message"
          required
          maxLength={2000}
          rows={6}
          placeholder="Share the problem, context, and desired outcome."
          className="input-field resize-y"
        />
      </div>

      {state.status === "error" ? (
        <p className="text-sm text-[var(--color-danger)]" role="alert">{state.message}</p>
      ) : null}

      <p className="type-small">Form content is sent through the site&apos;s email delivery service so Tito can respond. Prefer not to use it? Choose direct email.</p>

      <button type="submit" disabled={submitting} className="btn-glow w-full">
        {submitting ? "Sending message…" : "Send message"}
      </button>
    </form>
  );
}
