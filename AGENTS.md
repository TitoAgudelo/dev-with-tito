# AGENTS.md — Tito.website

> Permanent project instructions for the agent. Read this at the start of every session before writing code or content.

---

## 1. Mission

Build a narrative, cinematic web experience (not a traditional portfolio) that positions Tito Agudelo as Senior Software Engineer / Mobile Architect / Product Builder / AI Engineer, and generates qualified leads for React Native consulting, mobile architecture, AI product development, full stack engineering, architecture reviews, and fractional technical leadership.

The site exists so that a technical visitor (CTO, founder, hiring manager) leaves with: curiosity, technical confidence, a clear understanding of Tito's experience, and the desire to schedule a call.

## 2. Document authority (in case of conflict)

1. **DESIGN.md** — visual and narrative direction. Wins over anything else on aesthetics, metaphor, palette, typography, mood, and motion.
2. **Master plan (plan-maestro.md)** — phases, work sequence, per-phase acceptance criteria.
3. **knowledge/** — source of truth for all factual content (experience, projects, skills, services). Never invent data that isn't there.
4. This document (AGENTS.md) — process rules and code standards.

If a specific prompt asks for something that contradicts these documents, flag it explicitly before proceeding — don't resolve it silently.

## 3. Design principles (summary — see DESIGN.md for full detail)

- Central metaphor: **System Assembly** — the system assembles in 5 layers as the visitor scrolls (Infrastructure → System → Product → Experience → Business).
- A single accent color (`#C9932E`). Zero purple/blue gradients. Zero diffuse glow.
- Typography: Fraunces (display) + Inter/Satoshi (body) + JetBrains Mono (metadata/console).
- All motion must communicate "this is being built" — scroll-driven, not timer-driven, no bounce/spring.
- `prefers-reduced-motion` is a real design state, not an afterthought: layers appear already assembled.
- No avatar/illustration — a real personal photo, high resolution, integrated into Layer 5.

## 4. Technical stack

- Next.js 16, React 19, TypeScript, Tailwind CSS
- Installed: GSAP, @gsap/react, Lenis, Framer Motion
- Future (not before the narrative is solid — see master plan Phase 6+): Three.js, React Three Fiber, Drei
- Long-term: Supabase, pgvector, FastAPI, OpenAI API (for the console's RAG)

## 5. Code standards

- Strict TypeScript — no `any` without explicit justification in a comment.
- Section components live in `src/sections/`, with a 1:1 mapping to DESIGN.md's 5 layers (see information-architecture.md for the full detail and the rationale behind the change from the earlier 7-section scheme):
  - `src/sections/infrastructure/` → Layer 1 (Infrastructure) — orchestrated by `InfrastructureSection.tsx`, composed of `SystemInitBadge.tsx`, `IntroHero.tsx`, `TelemetryGrid.tsx`
  - `src/sections/system/` → Layer 2 (System)
  - `src/sections/product/` → Layer 3 (Product)
  - `src/sections/experience/` → Layer 4 (Experience) — interactive CLI console + RAG engine
  - `src/sections/business/` → Layer 5 (Business) — orchestrated by `BusinessSection.tsx`, composed of `ServicesGrid.tsx`, `PortraitFrame.tsx`, `CalendlyWidget.tsx`, `ContactForm.tsx`
- Each layer section is an orchestrator composing single-responsibility subcomponents (ideally <150 lines each) — never a monolithic component per layer.
- GSAP animations encapsulated in reusable hooks (`useScrollAssembly`, etc.), not repeated inline ScrollTrigger logic in every component.
- All visible copy (text, labels, console responses) comes from `knowledge/`, never hardcoded directly in the component — so the Phase 10 RAG can index the same source the user sees.
- Accessibility is not optional: AA minimum contrast with the DESIGN.md palette, keyboard support in the interactive console, and real respect for `prefers-reduced-motion`.

## 6. What NOT to do without explicit confirmation

- Don't touch Three.js, Supabase, FastAPI, OpenAI API, or RAG until Phase 6 (production checkpoint) is closed — see master plan.
- Don't introduce a second accent color without explicit justification.
- Don't use Inter (or another neutral sans-serif) as the headline font.
- Don't build the Terminal (Phase 8) and the AI Assistant (Phase 10-11) as separate components — they are a single interface that evolves.
- Don't generate factual content (years of experience, company names, projects) that isn't in `knowledge/` — if it's missing, ask instead of inventing.

## 7. Delivery process

- Each phase of the master plan ends in a concrete deliverable (a direction .md file, working code, or a deploy) — don't move to the next phase without that explicit deliverable.
- Before closing Phase 1 (creative-direction.md), verify the document against the anti-generic checklist in DESIGN.md section 9.
