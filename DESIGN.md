# DESIGN.md — Tito.website

> Visual and narrative direction. This document is the final authority on aesthetics. If anything in creative-direction.md or the code contradicts this, this document wins.

---

## 1. Central metaphor: System Assembly

The site stages how you think as an architect: **a system that assembles layer by layer as the visitor scrolls.**

It's not a house (Daylight). It's not a static blueprint (Hubtown). It's a living system building itself in real time in front of the visitor — the same mental sequence you follow when designing software architecture, exposed as a visual experience.

### 1.1 — The layers (assembly order)

The scroll builds the system bottom-up, one layer at a time. Each layer is a narrative chapter:

| # | Layer | What it represents | What it says about Tito |
|---|---|---|---|
| 1 | **Infrastructure** | Foundation — servers, network, data | Years of experience, solid technical fundamentals |
| 2 | **System** | Architecture — services, integration | How he thinks about architecture, mobile + backend |
| 3 | **Product** | The app as people actually use it | Gametime, Fanatics, TaskRabbit — real products in production |
| 4 | **Experience** | UX, interaction, polish | Attention to detail, growth, user activation |
| 5 | **Business** | Impact, results, scale | Why this matters to whoever is evaluating hiring him |

Each layer that's added **does not replace** the previous one — all remain visible, stacked, so that by Layer 5 the visitor sees the complete assembled system. That moment (complete system, all layers visible) is the visual climax right before the contact section.

### 1.2 — Scroll mechanics (how it's technically built)

- Scroll-scrubbing controlled by GSAP ScrollTrigger — scroll progress maps directly to assembly progress (0% scroll = empty Layer 1, 100% = all 5 layers complete and visible).
- Each layer is drawn with blueprint-style lines (accent-color stroke, `#C9932E`) that complete themselves as you scroll within that section — they don't appear all at once.
- Inside each layer lives a real micro-UI (not decorative): in Layer 3 ("Product"), for example, a simplified functional mockup of one of the real apps; in Layer 1, something like system metrics. This is what makes Daylight feel like a "real product" and not just pretty animation.
- On mobile: the same complex/horizontal assembly isn't replicated. Each layer becomes its own full-bleed screen (Hubtown-style) with the blueprint line as the vertical transition element between layers, not as a simultaneous complex scene.

### 1.3 — First 3 seconds (no-bounce criterion)

On load, before any scroll: a brief loading screen with numeric progress (0% → 100%, Hubtown pattern) that literally says "assembling the system..." or equivalent — this turns the loading screen into part of the narrative, not friction.
Right after: Layer 1 already visible with a single trace line animating itself (no scroll needed) for 1-2 seconds, to immediately communicate "this gets built" before asking anything of the visitor.

---

## 2. Mood

The site should feel like being inside the mental process of a senior architect at the exact moment a system starts taking shape — not like a gallery of finished achievements.

Words that define the mood: **precise, deliberate, under construction, confident without being loud, technical but warm** (the bronze accent and the near-black — not pure black — background avoid the typical coldness of "dark mode tech").

The emotional rhythm follows the 5 layers: it starts calm/foundational (Infrastructure), rises in constructive tension as the system gets more complex (System → Product), opens into a moment of tangible achievement (Experience — the visitor interacts with the console and it feels real), and closes in serene confidence, not sales urgency (Business — invitation, not pressure).

❌ **NOT this:** artificial urgency ("book now!"), generic corporate tone, or the distant coldness of a dark-mode-SaaS with no personality.

✅ **YES this:** the same sense of order emerging from chaos you feel looking at a well-made architecture diagram — each layer resolves something the previous one left open.

---

## 3. Palette (locked)

| Role | Color | Usage |
|---|---|---|
| Base background | `#0B0C0C` | Main background for all sections |
| Surface / contrast | `#F0EFED` | Primary text on dark background, occasional cards |
| Single accent | `#C9932E` | Blueprint lines, CTAs, terminal cursor, active states — never as a full-section background |
| Secondary text | `#8A8A85` | Metadata, labels, timestamps, supporting text |

**Hard rule:** a single accent color across the whole site. Zero purple→blue gradients. Zero diffuse glow. If a section needs a second color (e.g. success/error in the console), it must be explicitly justified and cannot compete visually with `#C9932E`.

❌ **NOT this:** pure black background + purple-blue gradient + diffuse glow behind the hero — this is the default of any AI-generated portfolio in 2026, and it's exactly what this site exists not to be.

---

## 4. Typography (locked)

| Role | Font | Weight(s) | Usage |
|---|---|---|---|
| Headlines / display | Fraunces | 300 (large chapter titles), 600 (sub-headers) | Layer names, section headlines |
| Body text | Inter (or Satoshi) | 400, 500 | Case study paragraphs, descriptions |
| Metadata / labels / terminal | JetBrains Mono | 400, 500 | Dates, roles, tags, all of the console's interface |

Mixed weight hierarchy on purpose (300 next to 600, not a uniform scale) — the weight tension is what gives the headlines presence without indefinitely increasing font size.

❌ **NOT this:** Inter (or any generic neo-grotesk) also used as headline — that's the default of any SaaS product and doesn't communicate personality at the moments that matter most (each layer's name).

---

## 5. Motion principles

- **Motion always has a visible cause.** Nothing animates "just because" — every animation is a blueprint line completing itself, a layer settling onto the previous one, or a direct response to the user's scroll. If an animation doesn't communicate "this is being built," it doesn't ship.
- **Scroll-driven, not timer-driven.** The progress of the main animations is tied to scroll position (ScrollTrigger), not to automatic timers — the visitor controls the pace of the assembly, never the other way around.
- **Construction easing, not bounce easing.** Easing curves like `power2.out` or `expo.out` (firm settling, no overshoot/bounce) — an architecture system doesn't "bounce" as it assembles, it settles with precision.
- **Duration hierarchy by scale:** micro-interactions (hover, terminal cursor) ≤150ms; transitions between layers 400-600ms; a layer's full assembly can take the entire scroll of that section — there's no rush.
- **`prefers-reduced-motion` is a design state, not an afterthought.** With this preference on, layers appear already assembled (simple fade, no scroll-scrubbing) — the complete system is still visible, just without the animated construction process.
- **One protagonist animation per viewport.** If the blueprint line is drawing itself, nothing else should be competing for attention (text entering, floating images) at the same time — reinforces the "deliberate" mood from section 2.

❌ **NOT this:** decorative parallax unrelated to the content, animations with exaggerated bounce/spring, or "confetti" of floating elements with no narrative purpose.

---

## 6. Narrative structure (chapters)

Inspired by Hubtown's pattern (one word = one chapter) but anchored to the 5 layers in section 1.1, not to loose abstract words:

1. **Infrastructure** → intro, who Tito is, years of experience
2. **System** → how he thinks about architecture (mobile + backend + growth)
3. **Product** → case studies (Gametime, Fanatics, TaskRabbit, Toptal, Huge)
4. **Experience** → the interactive console lives here — it's the "try it yourself" layer
5. **Business** → services, availability, contact CTA (Calendly / form)

Each chapter has its own contextual CTA (not the same button repeated) — consistent with Hubtown's pattern of varying the CTA per section.

---

## 7. Photography

Real personal photo (no avatar, no illustration) at high resolution (minimum 2400px wide). It's integrated within the system assembly — not as a traditional centered hero, but as part of one of the layers (suggested: Layer 5 "Business," tied to the contact CTA, where it makes narrative sense for the real person to appear right where the complete system has just been built).

---

## 8. Console (Layer 4 — Experience)

See the full functional spec in the master plan (Console / Terminal section). Visual rules specific to DESIGN.md:

- Typography: JetBrains Mono exclusively inside the console.
- Prompt/cursor color: `#C9932E` (the site's only accent) — reinforces that the console is part of the same visual system, not a bolted-on widget.
- Console background: a slightly lighter variation of the base background (`#0B0C0C` → something like `#141514`) so it reads as a "panel" without introducing a new color.

---

## 9. Anti-generic checklist (to review any Codex/agent deliverable)

- [ ] Is there a purple/blue gradient anywhere? → reject
- [ ] Is there more than one accent color without justification? → reject
- [ ] Does the main headline use a neutral sans-serif font? → reject
- [ ] Does the scroll metaphor resemble a "house" or generic building? → reject
- [ ] Are the 5 layers visually distinguishable from each other (not all looking the same with different text)? → if not, revise
- [ ] Does the console feel bolted-on or integrated? → if it feels bolted-on, revise typography/color
- [ ] Does any animation have bounce/spring, or fail to communicate "construction"? → reject
- [ ] Does the site respect `prefers-reduced-motion` by showing already-assembled layers? → if not, revise
