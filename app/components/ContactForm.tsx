"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import type { Locale } from "../../lib/i18n";

type FormState =
  | { readonly status: "idle" }
  | { readonly status: "submitting" }
  | { readonly status: "success"; readonly message: string }
  | { readonly status: "error"; readonly message: string };

const initialState: FormState = { status: "idle" };

const CONTACT_COPY = {
  en: {
    email: "Email",
    subject: "Subject",
    message: "Message",
    subjectPlaceholder: "What would you like to discuss?",
    messagePlaceholder: "Share the problem, context, and desired outcome.",
    help: "Form content is sent through the site's email delivery service so Tito can respond. Prefer not to use it? Choose direct email.",
    submit: "Send message",
    submitting: "Sending message…",
    sentTitle: "Message sent",
    sent: "Your message was sent successfully.",
    again: "Send another message",
    failed: "Your message could not be sent. Your entries are preserved; try again or use direct email.",
  },
  es: {
    email: "Correo electrónico",
    subject: "Asunto",
    message: "Mensaje",
    subjectPlaceholder: "¿Qué te gustaría conversar?",
    messagePlaceholder: "Comparte el problema, el contexto y el resultado que buscas.",
    help: "El contenido del formulario se envía mediante el servicio de correo del sitio para que Tito pueda responderte. ¿Prefieres no usarlo? Escríbele directamente por correo.",
    submit: "Enviar mensaje",
    submitting: "Enviando mensaje…",
    sentTitle: "Mensaje enviado",
    sent: "Tu mensaje se envió correctamente.",
    again: "Enviar otro mensaje",
    failed: "No se pudo enviar tu mensaje. Tus datos se conservan; inténtalo de nuevo o escribe directamente por correo.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

interface ContactFormProps {
  readonly appearance?: "default" | "terminal";
  readonly idPrefix?: string;
  readonly locale?: Locale;
  readonly defaultSubject?: string;
}

export default function ContactForm({
  appearance = "default",
  idPrefix,
  locale = "en",
  defaultSubject,
}: ContactFormProps = {}) {
  const copy = CONTACT_COPY[locale];
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
          : copy.failed;
        setState({ status: "error", message });
        return;
      }

      form.reset();
      setState({ status: "success", message: copy.sent });
    } catch {
      setState({
        status: "error",
        message: copy.failed,
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
          {copy.sentTitle}
        </h3>
        <p className="type-body mt-2">{state.message}</p>
        <button type="button" onClick={() => setState(initialState)} className="btn-outline mt-6">
          {copy.again}
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
        <label htmlFor={emailId} className="contact-form__label text-sm font-medium text-secondary">{copy.email}</label>
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
        <label htmlFor={subjectId} className="contact-form__label text-sm font-medium text-secondary">{copy.subject}</label>
        <input
          type="text"
          name="subject"
          id={subjectId}
          required
          maxLength={120}
          placeholder={copy.subjectPlaceholder}
          defaultValue={defaultSubject}
          className="input-field"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className="contact-form__label text-sm font-medium text-secondary">{copy.message}</label>
        <textarea
          name="message"
          id={messageId}
          required
          maxLength={2000}
          rows={6}
          placeholder={copy.messagePlaceholder}
          className="input-field resize-y"
        />
      </div>

      {state.status === "error" ? (
        <p className="contact-form__error text-sm text-[var(--color-danger)]" role="alert">{state.message}</p>
      ) : null}

      <p className="contact-form__help type-small">{copy.help}</p>

      <button type="submit" disabled={submitting} className="contact-form__submit btn-glow w-full">
        {submitting ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
