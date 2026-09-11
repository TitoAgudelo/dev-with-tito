export type AskTitoSourceType = "Resume" | "LinkedIn" | "Bio" | "Case Study" | "Project";

export interface AskTitoMetadata {
  readonly source: AskTitoSourceType;
  readonly title: string;
  readonly category: string;
  readonly chunkIndex: number;
}

export interface AskTitoSource extends AskTitoMetadata {
  readonly id: string;
  readonly excerpt: string;
  readonly distance: number | null;
}

export interface AskTitoRequest {
  readonly question: string;
}

export type AskTitoStreamEvent =
  | { readonly type: "sources"; readonly sources: readonly AskTitoSource[] }
  | { readonly type: "delta"; readonly text: string }
  | { readonly type: "done" }
  | { readonly type: "error"; readonly message: string };

export interface AskTitoMessage {
  readonly id: string;
  readonly role: "user" | "assistant";
  readonly content: string;
  readonly sources?: readonly AskTitoSource[];
  readonly status?: "streaming" | "complete" | "error";
}

export interface IngestionSummary {
  readonly files: number;
  readonly chunks: number;
  readonly embedded: number;
  readonly reused: number;
  readonly removed: number;
  readonly collection: string;
}
