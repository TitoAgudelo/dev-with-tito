import React from "react";

export type OutputType = "system" | "input" | "output" | "error" | "file" | "ls";

export interface HistoryEntry {
  id: string;
  type: OutputType;
  command?: string;
  path?: string;
  content: string | string[];
  citation?: string;
  timestamp?: string;
}

export interface ResponseRendererProps {
  entry: HistoryEntry;
  onCommandClick?: (cmd: string) => void;
}

export function ResponseRenderer({
  entry,
  onCommandClick,
}: ResponseRendererProps) {
  if (entry.type === "input") {
    return (
      <div className="flex items-start gap-2 font-mono text-xs sm:text-sm text-[#F0EFED] py-0.5">
        <span className="text-[#C9932E] select-none font-medium">
          {entry.path || "~"} $
        </span>
        <span className="font-semibold">{entry.command}</span>
      </div>
    );
  }

  if (entry.type === "error") {
    const errorText = Array.isArray(entry.content)
      ? entry.content.join("\n")
      : entry.content;

    return (
      <div className="font-mono text-xs sm:text-sm text-[#F0EFED]/90 bg-[rgba(201,147,46,0.06)] p-3 rounded border border-[rgba(201,147,46,0.25)] space-y-2">
        <div className="flex items-center gap-2 text-[#C9932E]">
          <span aria-hidden="true">⚠</span>
          <span className="font-medium">Command Notice:</span>
        </div>
        <p className="whitespace-pre-wrap leading-relaxed">{errorText}</p>
        {onCommandClick && (
          <p className="text-xs text-[#8A8A85] pt-1">
            Tip: Type{" "}
            <button
              type="button"
              onClick={() => onCommandClick("help")}
              className="text-[#C9932E] underline hover:text-[#F0EFED] focus-visible:outline-1"
            >
              help
            </button>{" "}
            or{" "}
            <button
              type="button"
              onClick={() => onCommandClick("ls")}
              className="text-[#C9932E] underline hover:text-[#F0EFED] focus-visible:outline-1"
            >
              ls
            </button>{" "}
            to explore available nodes.
          </p>
        )}
      </div>
    );
  }

  if (entry.type === "file") {
    const lines = Array.isArray(entry.content)
      ? entry.content
      : [entry.content];

    return (
      <div className="p-4 rounded bg-[#0B0C0C] border border-[rgba(201,147,46,0.2)] space-y-3 font-mono text-xs sm:text-sm">
        {entry.citation && (
          <div className="flex items-center justify-between border-b border-[rgba(240,239,237,0.08)] pb-2 text-[11px] text-[#8A8A85]">
            <span className="text-[#C9932E]">DOCUMENT_VIEW</span>
            <span>SRC: {entry.citation}</span>
          </div>
        )}

        <div className="space-y-1 text-[#F0EFED] leading-relaxed">
          {lines.map((line, idx) => {
            if (line.startsWith("# ")) {
              return (
                <p key={idx} className="text-[#C9932E] font-bold text-sm sm:text-base pt-1">
                  {line.replace("# ", "")}
                </p>
              );
            }
            if (line.startsWith("• ") || line.startsWith("- ")) {
              return (
                <p key={idx} className="pl-2 text-[#F0EFED]/90 flex items-start gap-2">
                  <span className="text-[#C9932E] select-none">•</span>
                  <span>{line.replace(/^[•-]\s*/, "")}</span>
                </p>
              );
            }
            if (!line.trim()) {
              return <div key={idx} className="h-2" />;
            }
            return (
              <p key={idx} className="text-[#8A8A85]">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  if (entry.type === "ls") {
    const items = Array.isArray(entry.content) ? entry.content : [entry.content];

    return (
      <div className="p-3 rounded bg-[#0B0C0C]/60 border border-[rgba(240,239,237,0.06)] font-mono text-xs sm:text-sm space-y-2">
        <div className="text-[11px] text-[#8A8A85] border-b border-[rgba(240,239,237,0.06)] pb-1">
          DIRECTORY_LISTING // Click any item to inspect:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {items.map((item) => {
            const isDir = item.endsWith("/");
            const commandToRun = isDir
              ? `cd ${item.replace("/", "")}`
              : `cat ${item}`;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onCommandClick && onCommandClick(commandToRun)}
                className={`flex items-center gap-2 px-2 py-1 rounded text-left transition-colors ${
                  isDir
                    ? "text-[#C9932E] hover:bg-[#C9932E]/10 font-semibold"
                    : "text-[#F0EFED] hover:bg-[#F0EFED]/10"
                }`}
              >
                <span className="text-xs" aria-hidden="true">
                  {isDir ? "📁" : "📄"}
                </span>
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Generic output / system banner
  const contentLines = Array.isArray(entry.content)
    ? entry.content
    : [entry.content];

  return (
    <div className="font-mono text-xs sm:text-sm text-[#8A8A85] space-y-1 leading-relaxed">
      {contentLines.map((line, idx) => (
        <p key={idx} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}
    </div>
  );
}

export default ResponseRenderer;
