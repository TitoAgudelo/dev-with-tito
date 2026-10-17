"use client";

import React, { useState } from "react";
import ConsoleHeader from "./ConsoleHeader";
import CommandHistory from "./CommandHistory";
import CommandInput from "./CommandInput";
import HelpPanel from "./HelpPanel";
import { HistoryEntry } from "./ResponseRenderer";
import { KNOWLEDGE_BASE, KnowledgeFile } from "./knowledgeData";

const INITIAL_BANNER: HistoryEntry[] = [
  {
    id: "banner-1",
    type: "system",
    content: [
      "╔═══════════════════════════════════════════════════════════════════════════╗",
      "║           TITO AGUDELO // STAFF & MOBILE ARCHITECT CLI [v1.0]             ║",
      "║             Knowledge Base & Architectural Diagnostics Kernel             ║",
      "╚═══════════════════════════════════════════════════════════════════════════╝",
      "",
      "Welcome to the interactive engineering console. Explore Tito's architecture,",
      "production case studies, and engineering services using standard shell commands.",
      "",
      "Type 'help' for manual, 'ls' to inspect files, or click the quick chips below.",
      "─────────────────────────────────────────────────────────────────────────────",
    ],
    timestamp: new Date().toISOString(),
  },
];

const AUTOCOMPLETE_LIST = [
  "help",
  "ls",
  "pwd",
  "cd",
  "cd ..",
  "cd projects",
  "cat about.md",
  "cat experience.md",
  "cat skills.md",
  "cat services.md",
  "cat contact.txt",
  "cat resume.txt",
  "cat gametime.md",
  "cat fanatics.md",
  "cat taskrabbit.md",
  "cat toptal.md",
  "about",
  "experience",
  "skills",
  "services",
  "projects",
  "resume",
  "contact",
  "gametime",
  "fanatics",
  "taskrabbit",
  "toptal",
  "clear",
  "whoami",
];

export interface EngineeringConsoleProps {
  className?: string;
}

export function EngineeringConsole({ className = "" }: EngineeringConsoleProps) {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_BANNER);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);

  const handleClear = () => {
    setHistory([]);
  };

  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Track in history
    setCommandHistoryList((prev) => [...prev, trimmed]);

    // Push input line into history
    const inputEntry: HistoryEntry = {
      id: crypto.randomUUID(),
      type: "input",
      command: trimmed,
      path: currentPath,
      content: "",
      timestamp: new Date().toISOString(),
    };

    const parts = trimmed.split(" ").filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim();

    let outputEntry: HistoryEntry;

    // Handle Commands:
    if (cmd === "clear" || cmd === "cls") {
      setHistory([]);
      return;
    }

    if (cmd === "help" || cmd === "man") {
      outputEntry = {
        id: crypto.randomUUID(),
        type: "system",
        content: [
          "AVAILABLE COMMANDS & UTILITIES:",
          "",
          "Navigation & Inspection:",
          "  ls, dir           List files and directories in current path",
          "  pwd               Print current working directory",
          "  cd <directory>    Change directory (e.g., 'cd projects', 'cd ..', 'cd /')",
          "  cat <file>        Read document contents (e.g., 'cat about.md', 'cat gametime.md')",
          "  clear             Clear the terminal history",
          "",
          "Direct Knowledge Shortcuts:",
          "  about             Overview of Tito's engineering background",
          "  experience        15+ years career timeline and company history",
          "  skills            Comprehensive technical competency matrix",
          "  services          6 core consulting practices & engagement models",
          "  projects          List all production case studies",
          "  resume            Executive resume overview",
          "  contact           Direct communication channels & Calendly scheduler",
          "",
          "Case Study Quick Access:",
          "  gametime          Deep dive: Gametime live event mobile ticketing",
          "  fanatics          Deep dive: Fanatics high-traffic ecommerce scale",
          "  taskrabbit        Deep dive: TaskRabbit TypeScript & testing modernization",
          "  toptal            Deep dive: Toptal enterprise consulting engagements",
        ],
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "pwd") {
      outputEntry = {
        id: crypto.randomUUID(),
        type: "output",
        content: `Current Working Directory: ${currentPath}`,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "whoami") {
      outputEntry = {
        id: crypto.randomUUID(),
        type: "output",
        content: "Tito Agudelo // Staff Software Engineer & Mobile Architect",
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "ls" || cmd === "dir") {
      if (currentPath === "/") {
        outputEntry = {
          id: crypto.randomUUID(),
          type: "ls",
          content: [
            ...Object.keys(KNOWLEDGE_BASE.rootFiles),
            "projects/",
          ],
          timestamp: new Date().toISOString(),
        };
      } else if (currentPath === "/projects") {
        outputEntry = {
          id: crypto.randomUUID(),
          type: "ls",
          content: Object.keys(KNOWLEDGE_BASE.directories.projects.files),
          timestamp: new Date().toISOString(),
        };
      } else {
        outputEntry = {
          id: crypto.randomUUID(),
          type: "error",
          content: `Path not found: ${currentPath}`,
          timestamp: new Date().toISOString(),
        };
      }
    } else if (cmd === "cd") {
      if (!arg || arg === "~" || arg === "/" || arg === "root") {
        setCurrentPath("/");
        outputEntry = {
          id: crypto.randomUUID(),
          type: "output",
          content: "Changed directory to /",
          timestamp: new Date().toISOString(),
        };
      } else if (arg === ".." || arg === "../") {
        setCurrentPath("/");
        outputEntry = {
          id: crypto.randomUUID(),
          type: "output",
          content: "Changed directory to /",
          timestamp: new Date().toISOString(),
        };
      } else if (arg === "." || arg === "./") {
        outputEntry = {
          id: crypto.randomUUID(),
          type: "output",
          content: `Remaining in ${currentPath}`,
          timestamp: new Date().toISOString(),
        };
      } else if (arg === "projects" || arg === "/projects" || arg === "./projects") {
        setCurrentPath("/projects");
        outputEntry = {
          id: crypto.randomUUID(),
          type: "output",
          content: [
            "Changed directory to /projects",
            "Available case studies: gametime.md, fanatics.md, taskrabbit.md, toptal.md",
            "Type 'cat gametime.md' or 'ls' to inspect.",
          ],
          timestamp: new Date().toISOString(),
        };
      } else {
        outputEntry = {
          id: crypto.randomUUID(),
          type: "error",
          content: `cd: no such directory: ${arg}. Available directories: projects`,
          timestamp: new Date().toISOString(),
        };
      }
    } else if (cmd === "cat") {
      if (!arg) {
        outputEntry = {
          id: crypto.randomUUID(),
          type: "error",
          content: "Usage: cat <filename>. Example: 'cat about.md' or 'cat gametime.md'",
          timestamp: new Date().toISOString(),
        };
      } else {
        // Resolve target file
        const cleanArg = arg.toLowerCase().trim();
        let targetFile: KnowledgeFile | undefined;

        if (currentPath === "/") {
          if (KNOWLEDGE_BASE.rootFiles[cleanArg]) {
            targetFile = KNOWLEDGE_BASE.rootFiles[cleanArg];
          } else if (cleanArg.startsWith("projects/")) {
            const subName = cleanArg.replace("projects/", "");
            targetFile = KNOWLEDGE_BASE.directories.projects.files[subName];
          } else if (KNOWLEDGE_BASE.directories.projects.files[cleanArg]) {
            targetFile = KNOWLEDGE_BASE.directories.projects.files[cleanArg];
          }
        } else if (currentPath === "/projects") {
          if (KNOWLEDGE_BASE.directories.projects.files[cleanArg]) {
            targetFile = KNOWLEDGE_BASE.directories.projects.files[cleanArg];
          } else if (KNOWLEDGE_BASE.rootFiles[cleanArg]) {
            targetFile = KNOWLEDGE_BASE.rootFiles[cleanArg];
          }
        }

        if (targetFile) {
          outputEntry = {
            id: crypto.randomUUID(),
            type: "file",
            content: targetFile.content,
            citation: targetFile.citation,
            timestamp: new Date().toISOString(),
          };
        } else {
          outputEntry = {
            id: crypto.randomUUID(),
            type: "error",
            content: `cat: ${arg}: No such file. Type 'ls' to view available documents in ${currentPath}.`,
            timestamp: new Date().toISOString(),
          };
        }
      }
    } else if (cmd === "about") {
      const file = KNOWLEDGE_BASE.rootFiles["about.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "experience") {
      const file = KNOWLEDGE_BASE.rootFiles["experience.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "skills") {
      const file = KNOWLEDGE_BASE.rootFiles["skills.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "services") {
      const file = KNOWLEDGE_BASE.rootFiles["services.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "projects") {
      outputEntry = {
        id: crypto.randomUUID(),
        type: "output",
        content: [
          "PRODUCTION CASE STUDIES // 4 FEATURED SYSTEMS:",
          "",
          "1. gametime.md   — Live Event Mobile Ticketing & Deep Linking (Senior React Native Engineer)",
          "2. fanatics.md   — Sports Ecommerce Scale & Checkout Optimization (Software Engineer)",
          "3. taskrabbit.md — Marketplace TypeScript & Testing Modernization (Senior Mobile Engineer)",
          "4. toptal.md     — Enterprise Architecture Modernization (Senior Consultant)",
          "",
          "Tip: Type 'cat gametime.md' or 'cd projects' to read the full case studies.",
        ],
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "resume" || cmd === "cv") {
      const file = KNOWLEDGE_BASE.rootFiles["resume.txt"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "contact") {
      const file = KNOWLEDGE_BASE.rootFiles["contact.txt"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "gametime") {
      const file = KNOWLEDGE_BASE.directories.projects.files["gametime.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "fanatics") {
      const file = KNOWLEDGE_BASE.directories.projects.files["fanatics.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "taskrabbit") {
      const file = KNOWLEDGE_BASE.directories.projects.files["taskrabbit.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else if (cmd === "toptal") {
      const file = KNOWLEDGE_BASE.directories.projects.files["toptal.md"];
      outputEntry = {
        id: crypto.randomUUID(),
        type: "file",
        content: file.content,
        citation: file.citation,
        timestamp: new Date().toISOString(),
      };
    } else {
      outputEntry = {
        id: crypto.randomUUID(),
        type: "error",
        content: `Command not recognized: '${trimmed}'. Type 'help' to see available system commands.`,
        timestamp: new Date().toISOString(),
      };
    }

    setHistory((prev) => [...prev, inputEntry, outputEntry]);
  };

  return (
    <div
      role="region"
      aria-label="Interactive Engineering CLI Console"
      className={`rounded border border-[rgba(201,147,46,0.3)] bg-[#141514] overflow-hidden shadow-2xl space-y-0 ${className}`}
    >
      {/* 1. Window Header */}
      <ConsoleHeader currentPath={currentPath} onClear={handleClear} />

      {/* 2. Scrollable Output Stream */}
      <CommandHistory
        history={history}
        onCommandClick={executeCommand}
      />

      {/* 3. Command Input Prompt */}
      <CommandInput
        currentPath={currentPath}
        onSubmitCommand={executeCommand}
        commandList={AUTOCOMPLETE_LIST}
        recentHistory={commandHistoryList}
      />

      {/* 4. Quick Action Chips & Navigation Guide */}
      <div className="p-3 bg-[#0B0C0C]/90 border-t border-[rgba(240,239,237,0.06)]">
        <HelpPanel onSelectCommand={executeCommand} />
      </div>
    </div>
  );
}

export default EngineeringConsole;
