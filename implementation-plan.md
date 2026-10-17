# Implementation Plan — Tito.website

> **Roles:** Lead Product Designer & Staff Frontend Architect  
> **Estado:** Blueprint Técnico y Estrategia de Implementación Frontend  
> **Autoridad Visual & Narrativa:** [DESIGN.md](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md) & [creative-direction.md](file:///Users/titoagudelo/Workspace/dev-with-tito/creative-direction.md)  
> **Arquitectura de Información:** [information-architecture.md](file:///Users/titoagudelo/Workspace/dev-with-tito/information-architecture.md)  
> **Plan Maestro de Fases:** [MARKDOWN.md (Plan Maestro v2)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md)  

---

## 1. Technical Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   NEXT.JS 16 APP ROUTER                                │
│                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                SERVER COMPONENTS                                 │  │
│  │  - Static Content Ingestion (knowledge/*.md parsing at build time)               │  │
│  │  - SEO, OpenGraph Metadata, Schema.org JSON-LD (Person, SoftwareApplication)     │  │
│  │  - Initial HTML Shell & Critical CSS Streaming                                  │  │
│  └──────────────────────────────────────────┬───────────────────────────────────────┘  │
│                                             │                                          │
│                                             ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                             CLIENT COMPONENT ISLANDS                             │  │
│  │                                                                                  │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌──────────────────┐  │  │
│  │  │   SmoothScrollProvider  │  │  AssemblyOrchestrator   │  │     TopHUD       │  │  │
│  │  │      (Lenis Engine)     │  │  (GSAP Master Timeline) │  │ (State & Direct) │  │  │
│  │  └────────────┬────────────┘  └────────────┬────────────┘  └────────┬─────────┘  │  │
│  │               │                            │                        │            │  │
│  │               └────────────────────────────┼────────────────────────┘            │  │
│  │                                            ▼                                     │  │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │                5 ASSEMBLED SECTIONS (src/sections/*)                       │  │  │
│  │  │  01-infrastructure | 02-system | 03-product | 04-experience | 05-business │  │  │
│  │  └────────────────────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                               SERVERLESS API ROUTES                              │  │
│  │  - POST /api/contact (Resend / Nodemailer + Zod Validation)                      │  │
│  │  - POST /api/rag     (Local Static Mock -> Python FastAPI Proxy)                 │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 — Stack Tecnológico & Decisiones de Ingeniería
* **Framework:** Next.js 16.1 (React 19, App Router, TypeScript 5 en modo estricto).
* **Motor de Estilizado:** Tailwind CSS v4 con variables CSS directas configuradas en [DESIGN.md §3](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L55-L68):
  - Fondo Base: `#0B0C0C`
  - Superficie / Contraste: `#F0EFED`
  - Acento Único: `#C9932E`
  - Texto Secundario: `#8A8A85`
  - Panel Terminal: `#141514`
* **Sistema Tipográfico (`next/font/google`):**
  - Display / Titulares: `Fraunces` (weights 300, 600, variable serif).
  - Cuerpo / Textos: `Inter` (weights 400, 500).
  - Metadata / Terminal: `JetBrains Mono` (weights 400, 500).
* **Motor de Animación & Scroll:** GSAP 3.15 + `@gsap/react` + ScrollTrigger + Lenis 1.3.
* **Procesamiento de Contenido:** Ingesta estática en build time desde `/knowledge` usando Node.js `fs/promises` y parseo de frontmatter. Cero overhead en runtime en el cliente.
* **Seguridad & Validación:** Zod para validación de contratos de API en formularios y despachadores de terminal.

---

## 2. Component Architecture

Siguiendo el mapeo 1:1 canónico formalizado en [information-architecture.md §2](file:///Users/titoagudelo/Workspace/dev-with-tito/information-architecture.md#L45-L105), la jerarquía de componentes divide estrictamente la orquestación global de los bloques de dominio:

```
src/
├── app/
│   ├── layout.tsx                     # Inyección de fuentes, metadata y CSS base
│   ├── page.tsx                       # Master Orchestrator (Lenis + GSAP Assembly Canvas)
│   ├── globals.css                    # Tokens de diseño y reset de accesibilidad
│   └── api/
│       ├── contact/route.ts           # Endpoint de captura de leads
│       └── rag/route.ts               # Endpoint de consulta vectorial
│
├── components/
│   ├── chrome/                        # Elementos globales persistentes
│   │   ├── TopHUD.tsx                 # Barra superior: Estrato activo + CTA Directo
│   │   ├── BlueprintCanvas.tsx        # Motor SVG de trazo de líneas #C9932E
│   │   └── MobileSpine.tsx            # Bus vertical de datos para mobile
│   │
│   └── ui/                            # Primitivas accesibles desacopladas
│       ├── Button.tsx                 # Botones con acento #C9932E
│       ├── Badge.tsx                  # Pills de telemetría y tags en JetBrains Mono
│       └── Dialog.tsx                 # Wrappers Radix UI para modales de Case Studies
│
└── sections/                          # 5 Capas Narrativas (Mapeo 1:1 Estricto)
    ├── infrastructure/                # CAPA 1: INFRAESTRUCTURA (/#infrastructure)
    │   ├── InfrastructureSection.tsx  # Orquestador de capa (<120 líneas)
    │   ├── SystemInitBadge.tsx        # Loader pre-scroll (0% -> 100%)
    │   ├── IntroHero.tsx              # Titular Fraunces 300 + Reveal de Grid
    │   └── TelemetryGrid.tsx          # 15+ años de experiencia + Nodos técnicos
    │
    ├── system/                        # CAPA 2: SISTEMA (/#system)
    │   ├── SystemSection.tsx          # Orquestador de capa
    │   ├── TopologyDiagram.tsx        # Diagrama SVG interactivo React Native <-> Cloud
    │   └── ArchitectureMetrics.tsx    # Nodos de Deep Linking, Sync y Event Pipelines
    │
    ├── product/                       # CAPA 3: PRODUCTO (/#product)
    │   ├── ProductSection.tsx         # Orquestador de capa
    │   ├── DeviceFrame.tsx            # Mockup táctil interactivo 1:1
    │   ├── CaseStudySlide.tsx         # Slides: Gametime, Fanatics, TaskRabbit, Toptal
    │   └── ProductMetricsBadge.tsx    # Métricas de producto cualitativas
    │
    ├── experience/                    # CAPA 4: EXPERIENCIA (/#experience)
    │   ├── ExperienceSection.tsx      # Orquestador de capa
    │   ├── TerminalCore.tsx           # Panel de consola (#141514 + cursor #C9932E)
    │   ├── TerminalOutput.tsx         # Streamer de texto y citas de fuente
    │   ├── QuickActionChips.tsx       # Chips táctiles para mobile y teclado
    │   └── TerminalDispatcher.ts      # Pipeline dual (Fase 8 Local -> Fase 11 RAG)
    │
    └── business/                      # CAPA 5: NEGOCIO (/#business)
        ├── BusinessSection.tsx        # Orquestador del clímax de ensamble
        ├── ServicesGrid.tsx           # 6 Áreas de consultoría de knowledge/services.md
        ├── PortraitFrame.tsx          # Retrato en alta resolución de Tito
        ├── CalendlyWidget.tsx         # Widget de agendamiento 30 min
        └── ContactForm.tsx            # Formulario directo (Zod + Server Action)
```

---

## 3. State Management Strategy

Para garantizar 60fps/120fps sostenidos durante el scroll-scrubbing, **se prohíbe el uso de librerías pesadas de estado global (como Redux o Zustand)** para eventos de scroll. El estado se gestiona mediante tres capas delimitadas:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                ESTRATEGIA DE ESTADO                                    │
│                                                                                        │
│  1. SCROLL & ENSAMBLE (Zero-React Re-renders)                                          │
│     - GSAP ScrollTrigger maneja la interpolación directamente en el DOM y GPU.         │
│     - TopHUD lee el progreso mediante callbacks reactivos de baja frecuencia           │
│       (`onEnter`, `onLeaveBack`) actualizando únicamente el indicador de capa.         │
│                                                                                        │
│  2. CONSOLA INTERACTIVA (Local Hook: useTerminal)                                      │
│     - Estado inmutable de líneas de historial (`TerminalLine[]`).                      │
│     - Buffer del prompt y puntero de historial de comandos (teclas Arriba / Abajo).    │
│     - Modo de despacho (`isRAGEnabled: boolean`).                                      │
│                                                                                        │
│  3. FORMULARIO & CONVERSIÓN (React 19 Actions)                                         │
│     - `useActionState` para el manejo de estados de envío (idle, pending, success).    │
│     - Zod schema validation en cliente y servidor con feedback accesible.              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 — Interfaces de Tipado Estricto (TypeScript)
```typescript
// Contratos de datos para las capas y telemetría
export type LayerId = 'infrastructure' | 'system' | 'product' | 'experience' | 'business';

export interface TelemetryNode {
  id: string;
  category: 'core' | 'cloud' | 'mobile' | 'ai';
  label: string;
  detail: string;
  sourceDoc: string; // ej. "knowledge/experience.md"
}

export interface CaseStudy {
  id: 'gametime' | 'fanatics' | 'taskrabbit' | 'toptal';
  title: string;
  role: string;
  period?: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  sourceDoc: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
  sourceCitation?: string;
  timestamp: string;
}
```

---

## 4. Animation Architecture & Metáfora System Assembly

El ensamble del sistema se orquesta a lo largo de un **Timeline Maestro de GSAP ScrollTrigger** fijado al viewport (`pin: true`), donde el progreso del scroll (0% a 100%) construye visualmente la arquitectura técnica de Tito:

```
PROGRESIÓN DEL TIMELINE MAESTRO DE ENSAMBLE:
0% ──────────── 20% ──────────── 40% ──────────── 60% ──────────── 80% ─────────── 100%
[CAPA 1: INFRA]  [CAPA 2: SISTEMA] [CAPA 3: PROD]  [CAPA 4: EXP]   [CAPA 5: NEGOCIO]
Auto-draw Grid   Topology Flows   Device Frame     Terminal Docks  Portrait & Climax
```

### 4.1 — Reglas de Física y Curvas de Animación
* **Filosofía:** Precisión de ingeniería y construcción firme.
* **Curvas de Easing:** `power2.out` (asentamiento suave sin rebote) y `expo.out` (frenado de precisión para trazos de blueprint).
* **Cero Spring / Bounce:** Ningún elemento rebota al posicionarse.
* **Regla de Protagonismo:** Un solo vector o módulo ejecuta su animación activa por viewport. Los textos descriptivos entran con fade de opacidad (`150ms`) únicamente cuando la estructura del blueprint ha finalizado su trazo.

---

## 5. GSAP Strategy & React 19 Integration

### 5.1 — Integración con `@gsap/react` (`useGSAP`)
Para prevenir fugas de memoria y asegurar la recolección de basura en Next.js con Fast Refresh, todas las animaciones se encapsulan usando `useGSAP`:

```typescript
// Patrón de encapsulación arquitectónica para capas
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function useSystemAssembly(containerRef: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    // 1. Guard de prefers-reduced-motion
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // Scroll virtual para el scrubbing de 5 capas
          scrub: 0.8,    // Suavizado inercial
          pin: true,
          anticipatePin: 1,
        }
      });

      // Layer 1 -> Layer 2 -> Layer 3 -> Layer 4 -> Layer 5 timeline sequence
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Estado pre-ensamblado estático (ver Sección 8)
    });
  }, { scope: containerRef });
}
```

### 5.2 — Optimizaciones de Rendimiento de Renderizado
* **Propiedades Animadas:** Únicamente `transform: translate3d(x, y, 0)`, `opacity`, y SVG `strokeDashoffset`.
* **Aceleración por Hardware:** Uso selectivo de `will-change: transform, opacity` en elementos en fase de ensamblaje, liberando la memoria GPU una vez ensamblados.
* **Cero Animación de Reflow:** Prohibido animar `width`, `height`, `top`, `left`, `margin` o `padding`.

---

## 6. Lenis Integration Plan

### 6.1 — Configuración del Motor de Scroll Suave
Lenis proporciona una experiencia de inercia cinematográfica premium que se sincroniza perfectamente con el refresco de pantalla del navegador:

```typescript
// Arquitectura del Provider de Lenis en Next.js 16
'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Inicializar Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Sincronizar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

### 6.2 — Manejo de Navegación por Hash (`/#experience`, etc.)
Cuando un usuario hace clic en un ancla del TopHUD o ingresa con una URL con hash:
1. Se intercepta el scroll nativo.
2. `lenis.scrollTo(targetHash, { offset: 0, duration: 1.4, easing: ... })` calcula el desplazamiento exacto en el timeline de ScrollTrigger.
3. ScrollTrigger actualiza de forma fluida el estado de ensamblaje correspondiente sin parpadeos ni saltos bruscos.

---

## 7. Mobile Strategy & Touch Experience

En mobile **no se reduce la experiencia de escritorio**; se adapta a la ergonomía táctil mediante el diseño *Vertical Blueprint Bus*:

```
LAYOUT ERGONÓMICO MOBILE:
┌────────────────────────────────────────────────────────┐
│ TOP HUD (36px): TITO AGUDELO // [L01]  [BOOK ↗]        │
├────────────────────────────────────────────────────────┤
│ [16px Spine]                                           │
│  │                                                     │
│  │  FRAUNCES TITLE (Display)                           │
│  │  "The Foundation of Durable Software"               │
│  │                                                     │
│  ├─ [Telemetry Badge: 15+ Yrs Core]                    │
│  ├─ [Interactive Device Frame 1:1 (Touch Swipe)]       │
│  │                                                     │
│  ▼  (Data bus flows to next layer on scroll)           │
├────────────────────────────────────────────────────────┤
│ BOTTOM STICKY ACTION ZONE: [ Quick Terminal / Book ]   │
└────────────────────────────────────────────────────────┘
```

1. **The Vertical Blueprint Bus (`MobileSpine.tsx`):**
   - Una línea vectorial vertical `#C9932E` de 1.5px ubicada en el margen izquierdo (16px) acompaña todo el scroll.
   - Actúa como bus de datos que se ilumina y deposita nodos de conexión en cada sección.
2. **Dimensionamiento Dinámico (`100dvh`):**
   - Uso estricto de `dvh` (*Dynamic Viewport Height*) para prevenir saltos de layout causados por la barra de direcciones de Safari iOS y Chrome Android.
3. **Zona de Toque Ergonómica (Thumb Zone):**
   - Todos los botones interactivos, tabs y chips de terminal tienen una altura mínima de 44x44px con márgenes accesibles.
4. **Carrusel Táctil en Capa 3 (Producto):**
   - `DeviceFrame.tsx` utiliza CSS scroll-snap con inercia táctil nativa en mobile, permitiendo deslizar con el pulgar entre Gametime, Fanatics, TaskRabbit y Toptal.
5. **Consola Mobile con Quick-Action Chips:**
   - Para no forzar la apertura del teclado virtual en mobile, `QuickActionChips.tsx` expone botones táctiles directos: `[ $ help ]`, `[ $ experience ]`, `[ $ projects ]`, `[ $ contact ]`.

---

## 8. Accessibility Strategy (`a11y`) & Reduced Motion

La accesibilidad es un requerimiento arquitectónico no negociable de nivel **WCAG 2.1 AA**:

### 8.1 — Cumplimiento de Contraste Cromático (Palette Contrast Ratios)
* **Texto Primario (`#F0EFED`) sobre Fondo Base (`#0B0C0C`):** Ratio `17.5:1` (Supera con creces el mínimo de 4.5:1 de WCAG AAA).
* **Acento Único (`#C9932E`) sobre Fondo Base (`#0B0C0C`):** Ratio `6.2:1` (Cumple con creces WCAG AA para textos y componentes UI).
* **Texto Secundario (`#8A8A85`) sobre Fondo Base (`#0B0C0C`):** Ratio `4.8:1` (Cumple WCAG AA para textos medianos y metadata).

### 8.2 — Navegación Accesible por Teclado y Focus Management
* **Focus Indicator Unificado:** Anillo visible `#C9932E` de 2px con offset de 2px (`outline: 2px solid #C9932E; outline-offset: 2px`).
* **Sincronización de Foco y Scroll:** Al presionar `Tab` hacia un elemento ubicado en una capa siguiente, un listener de foco invoca `lenis.scrollTo()` hacia esa sección para mantener el elemento enfocado dentro del viewport visible.
* **Cero Trampas de Foco:** El flujo principal de scroll jamás secuestra el foco del teclado.

### 8.3 — Estado de Diseño Nativo: `prefers-reduced-motion: reduce`
Cuando el sistema operativo tiene activada la preferencia de reducción de movimiento:
1. Se desactiva el scroll scrubbing (`scrub: false`).
2. Las 5 capas aparecen **completamente dibujadas y ensambladas desde el primer render** (`strokeDashoffset: 0`).
3. El sitio se navega como un documento vertical estándar de alto rendimiento.
4. Se elimina el efecto de máquina de escribir (*typewriter*) en la consola; las respuestas aparecen instantáneamente.

---

## 9. Analytics Implementation Plan

Estrategia de telemetría de eventos orientada a la privacidad (sin cookies intrusivas, compatible con Plausible, PostHog o Vercel Analytics):

```typescript
// Contrato de Telemetría de Eventos para Tito.website
export type AnalyticsEvent =
  | { name: 'system_init_complete'; duration_ms: number }
  | { name: 'layer_view'; layer_id: LayerId; scroll_depth_percent: number }
  | { name: 'cta_click'; location: 'top_hud' | LayerId; cta_type: 'discovery' | 'case_study' | 'terminal' | 'calendly' }
  | { name: 'terminal_command'; command: string; mode: 'static' | 'rag' }
  | { name: 'case_study_inspect'; project_id: string }
  | { name: 'calendly_opened'; source_layer: LayerId }
  | { name: 'contact_form_submit'; status: 'success' | 'error' };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event.name, { props: event });
  }
}
```

### Embudo de Conversión Medido:
1. **Paso 1 (Engage Inicial):** `system_init_complete` (carga inicial 0-100%).
2. **Paso 2 (Exploración Técnica):** `layer_view` en Capas 1, 2 y 3.
3. **Paso 3 (Interacción Activa):** `terminal_command` en Capa 4 o inspección de case studies en Capa 3.
4. **Paso 4 (Conversión / Lead):** `calendly_opened` o `contact_form_submit` en Capa 5 o Top HUD.

---

## 10. Phase-by-Phase Build Roadmap

Plan de construcción secuencial estrictamente alineado con [MARKDOWN.md (Plan Maestro v2)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md#L50-L66):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CRONOGRAMA DE EJECUCIÓN POR FASES                               │
├────────┬───────────────────────────────────────┬───────────────────────────────────────┤
│ Fase   │ Nombre de la Fase                     │ Entregable Principal                  │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ Fase 0 │ Fundación de Contenido                │ knowledge/ verificado (Fanatics pend.)│
│ Fase 1 │ Dirección Creativa (Aprobada)         │ creative-direction.md                 │
│ Fase 2 │ Arquitectura de Información (Aprobada)│ information-architecture.md           │
│ Fase 3 │ Build Estructural + Contacto + Metric │ 5 secciones 1:1 + Formulario + Leads  │
│ Fase 4 │ Scroll Suave                          │ Integración de Lenis Provider         │
│ Fase 5 │ Animaciones Narrativas (System Assemb)│ GSAP ScrollTrigger + Blueprint Engine │
│ Fase 6 │ CHECKPOINT SHIP — V1 PRODUCCIÓN       │ Deploy en producción (Lead-Gen Live)  │
│ Fase 7 │ Performance & A11y Audit              │ Lighthouse 95+, WCAG AA, Reduced-Mot. │
│ Fase 8 │ Terminal Interactivo V1               │ CLI estático hardcoded + Quick Chips  │
│ Fase 9 │ Three.js Canvas (Opcional)            │ R3F Blueprint solo si agrega valor    │
│ Fase 10│ Python FastAPI RAG Service            │ Backend de embeddings de knowledge/   │
│ Fase 11│ Terminal + RAG AI Fusion              │ Consola unificada con respuestas AI   │
└────────┴───────────────────────────────────────┴───────────────────────────────────────┘
```

### Criterio de Aceptación para Fase 3 (Próxima Fase de Construcción):
* [ ] Crear las 5 carpetas en `src/sections/` (`infrastructure/`, `system/`, `product/`, `experience/`, `business/`).
* [ ] Reemplazar los colores morados genéricos de `app/globals.css` por la paleta canónica `#0B0C0C` y `#C9932E`.
* [ ] Configurar las fuentes `Fraunces`, `Inter` y `JetBrains Mono` en `app/layout.tsx`.
* [ ] Implementar el formulario de contacto directo (`/api/contact`) con Resend y validación Zod.
* [ ] Embeber el widget de Calendly en `src/sections/business/`.
* [ ] Instrumentar el despachador de Analytics desde el día 1.
