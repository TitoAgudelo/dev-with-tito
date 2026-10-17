# Tito.website — Master Plan v2

> This plan replaces the phase order from v1. Same destination, more realistic route: lead-gen and analytics come in early, there's a "shippable" checkpoint before the advanced phases, and an accessibility/performance phase is added that v1 didn't have.

---

## 1. Look & feel analysis — what to steal and what not to

### Daylight (godaylight.com)

What the site actually does, mechanically:

- **Hero with a real photographic/video scene** (a house), not an abstract illustration. The "wow" comes from very high quality photography + large overlaid text, not from 3D.
- **Narrative scroll by short "chapters"**: each section has a small label/icon on top ("Control," "Protect"), a 4-6 word headline, and a single large image. Never mixes more than one idea per viewport.
- **Micro-UI embedded in the images** (fake temperature widgets, battery, energy graph) that give the sense of a "real working product," not a mockup.
- **Numbered steps (Step 1/2/3)** with autoplay looping product video — this is what you describe as the "I enter the house and exit through the roof" effect: it's actually a scroll-scrubbed video/scroll sequence, not real 3D animation. It's cheaper to build than it looks and is exactly what GSAP ScrollTrigger + a video with scroll-controlled `currentTime` achieves well.
- **CTA repeated every 2-3 sections**, never only at the end.

**What I'd steal for your site:** the scroll-scrubbing pattern of sequential video/image for your own "scene" (see section 1.3), and the real micro-UI-floating-over-images pattern.

**What I would NOT steal:** it's a product/sales site, its tone is commercial-emotional. Your site needs more visible technical depth, not just emotion.

### Hubtown (hubtown.co.in)

What the site actually does, mechanically:

- **Loading screen with a percentage (0% → 100% "Ready to Explore")** before showing anything — builds anticipation and "gatekeeps" the first impression.
- **A brief counter/map of credentials up top** (projects by region) — your equivalent would be years of experience / apps shipped / companies, shown as data, not as text.
- **Each section = a single thematic word** (Future, Innovation, Collaboration, Excellence, Purpose, Legacy) acting as both navigation anchor and scroll "chapter." Below it, a short headline split into 3 lines and a max 2-sentence paragraph.
- **Full-page transitions** (full-bleed), no continuous "document"-style scroll — feels more like flipping through cinematic slides than reading a page.
- **A distinct CTA per chapter** ("Explore our projects," "Work with us," "discover our vision") — never repeats the same button.

**What I'd steal for your site:** the "one word = one chapter" structure is perfect for your narrative, the loading screen with percentage, and the credentials-as-data pattern up top.

**What I would NOT steal:** Hubtown's extreme minimalism works because they sell luxury real estate — a technical visitor evaluating whether to hire you is going to want more substance (code, architecture, decisions) before booking a call, not just mood.

### 1.3 — Synthesis: how to avoid looking "like both of them"

Your most important instruction is that the design be unique. How to achieve that without starting from zero:

1. **The visual metaphor can't be a house** (that's literally Daylight). **Locked decision: System Assembly** — a system that assembles layer by layer as you scroll (infrastructure → app → UX → product → business) — visually it's "construction," conceptually it's exactly what you do as an architect.
2. The one-word chapter structure (Hubtown) is adopted as a *navigation pattern*, not as a visual style — your typography, palette, and the metaphor from point 1 are what make it yours.
3. Palette and typography: define this in DESIGN.md before Codex generates anything — otherwise Codex will converge on the generic default (dark mode + purple-blue gradient is any LLM's de facto default for a "modern portfolio"). Give it a specific, uncommon palette and typography with character (not default Inter/Geist).

---

## 2. Phases (revised)

| Phase | Name | What's delivered | Change vs. v1 |
|---|---|---|---|
| 0 | Content foundation | knowledge/about, experience, services, skills, projects/ | Same — already in progress |
| 1 | Creative direction | creative-direction.md **with explicit acceptance criteria** (see 2.1) | Explicit acceptance criteria added |
| 2 | Information architecture | sitemap, routes, component hierarchy | Same |
| 3 | Structural build + Contact + Analytics | base sections (intro, journey, experience, services, projects, terminal, contact) **+ working contact form/Calendly + analytics instrumented from day 1** | Lead-gen and analytics move from Phase 9 → Phase 3 |
| 4 | Smooth scrolling | Lenis | Same |
| 5 | Narrative animations | GSAP + ScrollTrigger, including the Daylight-style scroll-scrubbing on your own metaphor (not a house) | Same, with the proper metaphor |
| 6 | **Checkpoint: first complete experience — SHIP** | Production deploy of the narrative version + contact + analytics | **New**: this is no longer just an internal milestone, it's a real launch. Everything after is v2/v3, not blocking |
| 7 | Performance & accessibility | `prefers-reduced-motion`, performance budget (LCP/CLS/INP), mid-range mobile device testing | **New phase** — didn't exist in v1 |
| 8 | Interactive terminal v1 (hardcoded) | cd, ls, pwd + about/experience/skills/projects/services/contact/resume commands, with guided follow-ups | Same as original Phase 7, no AI yet |
| 9 | Three.js | React Three Fiber + Drei, only if chapter 5 needs it | Same, still blocked until the narrative is strong |
| 10 | RAG in Python | Site knowledge index (experience, projects, skills, FAQ) built in Python, exposed via FastAPI | Kept, now explicitly Python (your preference) |
| 11 | Terminal + AI (merge) | The Phase 8 terminal connects to the Phase 10 RAG — same component, not two separate interfaces | **Design change**: avoids building two separate "ask boxes" |

### 2.1 — Acceptance criteria for Phase 1 (creative-direction.md)

So you don't evaluate Codex's output blindly, have it explicitly answer:

- What's the central visual metaphor and why is it different from a generic house/building?
- What happens in the first 3 seconds of scroll that keeps someone from bouncing?
- Where does the first CTA live (it can't be only at the end)?
- What does the mobile version of the metaphor look like (not "the same animation but smaller")?
- What three adjectives do NOT describe this design? (forces active differentiation, not just avoiding the "don't build" list)

---

## 3. Console / Terminal — spec

Two-layer flow, a single interface (not two separate features):

**Layer 1 — Command onboarding (hardcoded, Phase 8)**
- On opening the console, a short message invites typing `help`.
- `help` lists available commands with a one-line explanation.
- `pwd`, `ls`, `cd <section>` simulate real navigation through the site's "file system" (e.g. `cd experience` takes you to that section or unfolds it inside the console).
- Every successful command suggests the logical next one (e.g. after `ls`, it suggests `cd experience` or `cat resume.pdf`).

**Layer 2 — Free-form questions via RAG (Phase 10-11)**
- Once the visitor has learned the mechanics, a command like `ask <question>` (or detecting natural language directly with no prefix) activates the RAG.
- Target questions: CV, experience by company, tech stack, years of experience, apps built, services offered.
- The RAG must be able to cite the source (e.g. "according to knowledge/projects/gametime.md") so answers feel trustworthy, not invented.
- Clear fallback when the question is out of scope ("I don't have that info, but you can ask me about X, Y, Z" or book the call).

---

## 4. Photography

Any avatar/illustration plan is replaced with a real, high-quality personal photo. Technical recommendation: request the photo at high resolution (minimum 2400px wide) so it can be used full-screen in the hero or as part of the visual metaphor in point 1.3, not just as a small thumbnail-style "about me" photo.

---

## 5. Step 1 — What gets defined tomorrow: palette and typography

Without this, Codex will converge on any LLM's default for a "modern portfolio": black background, purple gradient, blue glow. It's literally the most repeated pattern in AI-generated portfolio outputs in 2026 — so this door needs to be closed with specific decisions, not with "use dark, modern colors."

### 5.1 — Proposed palette

Concept: **architect's blueprint**, consistent with your Mobile Architect positioning and with the visual metaphor in section 1.3 (a system/blueprint that draws or assembles itself with the scroll). It's neither the generic black-with-glow nor the jewel-tone dark mode that's also becoming a cliché.

| Role | Color | Usage |
|---|---|---|
| Base background | `#0B0C0C` (near-black, not pure black) | Main background for dark sections |
| Surface / contrast | `#F0EFED` (warm off-white) | Light sections, cards, text on dark background |
| Single accent | `#C9932E` (saturated bronze/brass) | CTAs, blueprint lines, terminal cursor, highlights — used sparingly, never as a large background |
| Secondary text | `#8A8A85` (warm gray) | Metadata, labels, supporting text |

Why it works for your case: the warm-black + bronze/brass accent combination on a dark background is a pattern being used in 2026 in fintech/premium products precisely because it communicates "technical seriousness" without falling into neon — and a single saturated accent (instead of a gradient) is easier to control visually in scroll animations without it looking "effect after effect."

Hard rule for the Codex prompt: **a single accent color, zero purple→blue gradients, zero diffuse glow**. If Codex proposes a second accent, it needs to justify why (e.g. success/error states in the console).

### 5.2 — Proposed typography

Three-font pattern with clear roles (headline / body / mono), avoiding Inter as headline since it's the absolute default of any AI-generated product:

| Role | Font | Why |
|---|---|---|
| Headlines / display | **Fraunces** | Variable serif with "wonky" details — has real character at large sizes (your chapter headlines, Hubtown-style) but becomes elegant at small sizes. This is exactly the 2026 trend of "expressive display fonts are back" — sets you apart from 90% of dev portfolios that use only sans-serif |
| Body copy | **Inter** or **Satoshi** | Proven readability for long paragraphs (case studies) — here "invisible" is actually right, the headline already did the personality work |
| Metadata / labels / terminal | **JetBrains Mono** or **Geist Mono** | Reinforces your technical identity in dates, roles, project tags, and is the natural font for the interactive console — coherence between "who you are" (developer) and the terminal component |

This combination (expressive serif + neutral sans + technical mono) is exactly the "old-meets-new" tension recommended in 2026 to differentiate without sacrificing long-form readability, and gives the console its own typographic identity consistent with the rest of the site instead of feeling bolted-on.

### 5.3 — What to put in DESIGN.md tomorrow

- The 4 colors from 5.1 with their hex codes, roles, and the "single accent" rule
- The 3 fonts from 5.2 with roles and weights (e.g. Fraunces 300 for large headlines, 600 for sub-headers — the "mixed-weight hierarchies" trend instead of a single weight)
- An explicit "NOT this" example next to each rule (black background + purple gradient + Inter everywhere = the example being rejected), so Codex has something concrete to avoid, not just something abstract

---

## 6. What's next

1. Confirm the central visual metaphor (point 1.3) before writing DESIGN.md — this is the decision with the biggest impact on whether the site feels unique. **Done — locked as System Assembly.**
2. Close palette and typography from section 5 in DESIGN.md. **Done.**
3. Rewrite the Phase 1 prompt for Codex/the coding agent including the acceptance criteria from 2.1 and the hard rules from 5.3. **Done.**
