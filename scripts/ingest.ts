import { ingestKnowledgeBase } from "../lib/ingestion";

async function main(): Promise<void> {
  try {
    const summary = await ingestKnowledgeBase();
    process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown ingestion failure";

    process.stderr.write(`Ask Tito ingestion failed: ${message}\n`);
    process.exitCode = 1;
  }
}

void main();
