export interface MarkdownChunk {
  readonly index: number;
  readonly content: string;
}

export const CHUNK_SIZE = 800;
export const CHUNK_OVERLAP = 150;

function markdownBlocks(markdown: string): string[] {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const blocks: string[] = [];
  let current: string[] = [];
  let mode: "text" | "list" = "text";

  const flush = () => {
    const value = current.join("\n").trim();
    if (value) blocks.push(value);
    current = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const isHeading = /^#{1,6}\s/.test(trimmed);
    const isList = /^(?:[-*+] |\d+\.\s)/.test(trimmed);
    if (!trimmed) {
      flush();
      mode = "text";
    } else if (isHeading) {
      flush();
      blocks.push(trimmed);
      mode = "text";
    } else if (isList) {
      if (mode !== "list") flush();
      current.push(trimmed);
      mode = "list";
    } else {
      if (mode === "list") flush();
      current.push(trimmed);
      mode = "text";
    }
  }
  flush();
  return blocks;
}

function splitOversizedBlock(block: string): string[] {
  if (block.length <= CHUNK_SIZE) return [block];
  const parts: string[] = [];
  let remaining = block;
  while (remaining.length > CHUNK_SIZE) {
    const window = remaining.slice(0, CHUNK_SIZE + 1);
    const boundary = Math.max(window.lastIndexOf(". "), window.lastIndexOf("\n"), window.lastIndexOf(" "));
    const end = boundary > CHUNK_SIZE * 0.6 ? boundary + (window[boundary] === "." ? 1 : 0) : CHUNK_SIZE;
    parts.push(remaining.slice(0, end).trim());
    remaining = remaining.slice(end).trim();
  }
  if (remaining) parts.push(remaining);
  return parts;
}

export function chunkMarkdown(markdown: string): MarkdownChunk[] {
  const blocks = markdownBlocks(markdown).flatMap(splitOversizedBlock);
  const chunks: string[] = [];
  let current: string[] = [];

  const sizeOf = (items: readonly string[]) => items.join("\n\n").length;
  const pushCurrent = () => {
    if (current.length === 0) return;
    chunks.push(current.join("\n\n"));
    const overlap: string[] = [];
    for (let index = current.length - 1; index >= 0; index -= 1) {
      const candidate = current[index];
      if (!candidate || sizeOf([candidate, ...overlap]) > CHUNK_OVERLAP) break;
      overlap.unshift(candidate);
    }
    if (overlap.length === 0) {
      const lastBlock = current.at(-1);
      const isStructuralBlock = lastBlock ? /^(?:#{1,6}\s|[-*+] |\d+\.\s)/.test(lastBlock) : false;
      if (lastBlock && !isStructuralBlock) {
        const tail = lastBlock.slice(-CHUNK_OVERLAP);
        const wordBoundary = tail.indexOf(" ");
        overlap.push(tail.slice(wordBoundary >= 0 ? wordBoundary + 1 : 0).trim());
      }
    }
    current = overlap;
  };

  for (const block of blocks) {
    if (current.length > 0 && sizeOf([...current, block]) > CHUNK_SIZE) pushCurrent();
    if (current.length > 0 && sizeOf([...current, block]) > CHUNK_SIZE) current = [];
    current.push(block);
  }
  if (current.length > 0) chunks.push(current.join("\n\n"));

  return chunks.map((content, index) => ({ index, content }));
}
