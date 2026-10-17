import React from "react";

export interface HelpPanelProps {
  onSelectCommand: (command: string) => void;
  className?: string;
}

const QUICK_CHIPS = [
  { label: "help", cmd: "help", desc: "Show command manual" },
  { label: "ls", cmd: "ls", desc: "List directory contents" },
  { label: "about", cmd: "about", desc: "Profile summary" },
  { label: "experience", cmd: "experience", desc: "Career timeline" },
  { label: "skills", cmd: "skills", desc: "Technical competencies" },
  { label: "services", cmd: "services", desc: "Consulting practices" },
  { label: "projects", cmd: "cd projects", desc: "Enter projects directory" },
  { label: "gametime", cmd: "gametime", desc: "Gametime case study" },
  { label: "fanatics", cmd: "fanatics", desc: "Fanatics case study" },
  { label: "taskrabbit", cmd: "taskrabbit", desc: "TaskRabbit case study" },
  { label: "toptal", cmd: "toptal", desc: "Toptal consulting" },
  { label: "contact", cmd: "contact", desc: "Direct contact info" },
];

export function HelpPanel({ onSelectCommand, className = "" }: HelpPanelProps) {
  return (
    <div
      aria-label="Terminal Quick Commands and Cheat Sheet"
      className={`p-4 sm:p-5 rounded border border-[rgba(201,147,46,0.18)] bg-[#141514]/70 space-y-4 font-mono text-xs ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(240,239,237,0.06)] pb-2">
        <span className="text-[#C9932E] font-medium uppercase tracking-wider text-[11px]">
          QUICK_COMMAND_CHIPS // Click or Tap to Run
        </span>
        <span className="text-[#8A8A85] text-[10px] hidden sm:inline">
          1-TAP EXECUTION
        </span>
      </div>

      {/* Quick Action Chips Grid */}
      <div className="flex flex-wrap gap-2">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => onSelectCommand(chip.cmd)}
            title={chip.desc}
            className="px-2.5 py-1 rounded bg-[#0B0C0C] text-[#F0EFED] border border-[rgba(201,147,46,0.22)] hover:border-[#C9932E] hover:text-[#C9932E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9932E] text-xs"
          >
            $ {chip.label}
          </button>
        ))}
      </div>

      {/* Navigation Cheat Sheet */}
      <div className="pt-2 border-t border-[rgba(240,239,237,0.06)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-[#8A8A85]">
        <div>
          <code className="text-[#C9932E]">cd &lt;dir&gt;</code>: Change dir
        </div>
        <div>
          <code className="text-[#C9932E]">cat &lt;file&gt;</code>: View file
        </div>
        <div>
          <code className="text-[#C9932E]">pwd</code>: Current path
        </div>
        <div>
          <code className="text-[#C9932E]">cd ..</code>: Go up one dir
        </div>
      </div>
    </div>
  );
}

export default HelpPanel;
