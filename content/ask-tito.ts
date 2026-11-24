import type { Locale } from "../lib/i18n";

/** Fired on `window` to open the floating chat, optionally asking a question. */
export const ASK_TITO_OPEN_EVENT = "ask-tito:open";

export interface AskTitoOpenDetail {
  readonly question?: string;
}

/** Every question here must be answerable from `knowledge/`. */
export const SUGGESTED_QUESTIONS: Readonly<Record<Locale, readonly string[]>> = {
  en: [
    "Can Tito build a custom app for my business?",
    "What AI projects has Tito built?",
    "What React Native experience does Tito have?",
    "What leadership experience does Tito have?",
    "What cloud technologies has Tito used?",
    "Why hire Tito as a Senior Engineer?",
  ],
  es: [
    "¿Puede Tito construir una aplicación a medida para mi negocio?",
    "¿Qué proyectos de IA ha construido Tito?",
    "¿Qué experiencia tiene Tito con React Native?",
    "¿Qué experiencia de liderazgo tiene Tito?",
    "¿Qué tecnologías de nube ha usado Tito?",
    "¿Por qué contratar a Tito como Senior Engineer?",
  ],
};

/** Answers the API streams when it has nothing grounded to say. */
export const FALLBACK_ANSWERS: readonly string[] = [
  "I don't have information about that.",
  "Ask me about Tito's experience, projects, leadership, or technical background.",
  "No tengo información sobre eso.",
  "No tengo esa información.",
  "Pregúntame sobre la experiencia, los proyectos, el liderazgo o el perfil técnico de Tito.",
];

export interface AskTitoCopy {
  readonly launcher: string;
  readonly panelTitle: string;
  readonly panelSubtitle: string;
  readonly openFullPage: string;
  readonly close: string;
  readonly loading: string;
  readonly conversationLabel: string;
  readonly suggested: string;
  readonly fieldLabel: string;
  readonly placeholder: string;
  readonly send: string;
  readonly thinking: string;
  readonly keyboardHelp: string;
  readonly you: string;
  readonly assistant: string;
  readonly youSaid: string;
  readonly assistantSaid: string;
  readonly composing: string;
  readonly sources: string;
  readonly fallbackHint: string;
  readonly fallbackLink: string;
  readonly unavailable: string;
  readonly emptyResponse: string;
}

export const ASK_TITO_COPY: Readonly<Record<Locale, AskTitoCopy>> = {
  en: {
    launcher: "Ask Tito",
    panelTitle: "Ask Tito",
    panelSubtitle: "Answers come from Tito's career knowledge base.",
    openFullPage: "Open full page",
    close: "Close chat",
    loading: "Preparing the career assistant…",
    conversationLabel: "Ask Tito AI conversation",
    suggested: "Suggested questions",
    fieldLabel: "Ask a question about Tito",
    placeholder: "Ask about projects, services, leadership…",
    send: "Ask Tito",
    thinking: "Thinking",
    keyboardHelp: "Enter to send · Shift + Enter for a new line",
    you: "Visitor",
    assistant: "Tito / AI",
    youSaid: "You said",
    assistantSaid: "Tito AI said",
    composing: "Tito AI is composing an answer",
    sources: "Sources",
    fallbackHint: "This isn't in Tito's knowledge base yet.",
    fallbackLink: "Send Tito a message",
    unavailable: "Ask Tito AI is temporarily unavailable. Please try again.",
    emptyResponse: "The AI service returned an empty response.",
  },
  es: {
    launcher: "Pregúntale a Tito",
    panelTitle: "Pregúntale a Tito",
    panelSubtitle: "Las respuestas salen de la base de conocimiento profesional de Tito.",
    openFullPage: "Abrir página completa",
    close: "Cerrar chat",
    loading: "Preparando el asistente profesional…",
    conversationLabel: "Conversación con Ask Tito AI",
    suggested: "Preguntas sugeridas",
    fieldLabel: "Haz una pregunta sobre Tito",
    placeholder: "Pregunta por proyectos, servicios, liderazgo…",
    send: "Preguntar",
    thinking: "Pensando",
    keyboardHelp: "Enter para enviar · Shift + Enter para nueva línea",
    you: "Visitante",
    assistant: "Tito / IA",
    youSaid: "Dijiste",
    assistantSaid: "Tito AI dijo",
    composing: "Tito AI está preparando una respuesta",
    sources: "Fuentes",
    fallbackHint: "Esto todavía no está en la base de conocimiento de Tito.",
    fallbackLink: "Escríbele a Tito",
    unavailable: "Ask Tito AI no está disponible por ahora. Inténtalo de nuevo.",
    emptyResponse: "El servicio de IA devolvió una respuesta vacía.",
  },
};

export function isFallbackAnswer(content: string): boolean {
  const normalized = content.trim();
  return FALLBACK_ANSWERS.includes(normalized);
}
