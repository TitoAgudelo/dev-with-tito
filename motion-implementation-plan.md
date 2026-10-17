# Motion Implementation Plan — System Assembly Engine

> **Roles:** Senior Motion Designer, Creative Director & Staff Frontend Architect  
> **Estado:** Especificación Técnica de Animación, Scroll-Scrubbing y Coreografía de Ensamble  
> **Autoridad Visual:** [DESIGN.md §5](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L84-L95) & [creative-direction.md](file:///Users/titoagudelo/Workspace/dev-with-tito/creative-direction.md)  
> **Plan Maestro:** [MARKDOWN.md (Fases 4, 5 y 6)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md#L58-L60)  

---

## 1. Visión & Metáfora Central de Movimiento

El sistema de movimiento de **Tito.website** no es cosmético ni decorativo; es la **puesta en escena de cómo piensa un Mobile Architect**: un sistema complejo de software que se construye y ensambla capa por capa frente a los ojos del visitante.

```
                  ┌─────────────────────────────────────────┐
                  │          SYSTEM ASSEMBLY ENGINE         │
                  ├─────────────────────────────────────────┤
                  │  05. BUSINESS (Clímax, Retrato & CTA)   │  ▲
                  │  04. EXPERIENCE (Consola CLI & Prompt)  │  │ ENSAMBLE
                  │  03. PRODUCT (Apps Reales 1:1)          │  │ CONTINUO Y
                  │  02. SYSTEM (Topología & Bus de Datos)  │  │ ACUMULATIVO
                  │  01. INFRASTRUCTURE (Grid Base & Nodos) │  │
                  └─────────────────────────────────────────┘
```

### Reglas de Movimiento Inmutables (Anti-Generic):
* ❌ **Prohibido:** Parallax genérico flotante sin anclaje lógico.
* ❌ **Prohibido:** Partículas flotantes o polvos difusos.
* ❌ **Prohibido:** Rebotes caricaturescos (*spring bounce / overshooting*).
* ❌ **Prohibido:** Estética cyberpunk de neón morado-azul.
* ✅ **Obligatorio:** Cada animación representa una línea de plano (*blueprint* `#C9932E`), un acoplamiento modular o una respuesta determinista al scroll del visitante.

---

## 2. Lenis Integration Roadmap

Lenis actúa como el motor de inercia y normalización de scroll, garantizando que el *scrubbing* de GSAP ScrollTrigger sea táctil, fluido y consistente en todos los navegadores y hardware (trackpads, mouse wheels, touchscreens y pantallas 120Hz ProMotion):

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LENIS ENGINE ARCHITECTURE                       │
│                                                                        │
│  [User Scroll / Wheel] ──> Lenis Inercia ──> ScrollTrigger.update()   │
│                                  │                   │                 │
│                                  ▼                   ▼                 │
│                          gsap.ticker (rAF)   Master Assembly Timeline  │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 — Configuración del Provider (`src/components/providers/SmoothScrollProvider.tsx`)
```typescript
'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Inicialización con inercia arquitectónica
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // 2. Sincronización con GSAP Ticker
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return <>{children}</>;
}
```

### 2.2 — Reglas de Integración de Lenis
1. **Aislamiento de Scroll Interno (`data-lenis-prevent`):**
   - El historial de la consola interactiva (`CommandHistory`) posee `data-lenis-prevent="true"`, permitiendo el scroll independiente de comandos sin mover la página global.
2. **Navegación Asistida por Hashes:**
   - Clics en anclas del TopHUD (`#infrastructure`, `#system`, `#product`, `#experience`, `#business`) invocan `lenis.scrollTo(target, { duration: 1.4, offset: 0 })` recalculando la coordenada exacta del estrato ensamblado.

---

## 3. GSAP Architecture & Custom Motion Hooks

Para garantizar modularidad, mantenibilidad y recolección limpia de basura en Next.js con React 19, toda la lógica de animación se encapsula en hooks especializados dentro de `src/hooks/motion/`:

```
src/hooks/motion/
├── useSystemAssembly.ts       # Orquestador del Timeline Maestro Pinned
├── useBlueprintStroke.ts      # Motor de trazo SVG strokeDashoffset
├── useProgressHUD.ts          # Sincronización de progreso y capas activas
└── useMobileSpine.ts          # Controlador del bus vertical para mobile
```

### 3.1 — Arquitectura de Hooks
* **`useSystemAssembly(containerRef)`:** Registra el master timeline fijado al viewport (`pin: true`) y divide el scroll virtual en 5 bandas de progreso.
* **`useBlueprintStroke(svgRef)`:** Calcula dinámicamente `path.getTotalLength()` y aplica el scrubbing de `strokeDashoffset: (1 - progress) * totalLength`.
* **`useProgressHUD()`:** Expone el estado reactivo del estrato actual (`activeLayer: LayerId`) y el porcentaje numérico de ensamble (`progressPercent: number`) para el HUD.

---

## 4. ScrollTrigger Architecture & Master Timeline

El ensamble del sistema opera a lo largo de un **Timeline Maestro Fijado** (`pin: true`) con un recorrido virtual de `5000px`:

```
BANDAS DE PROGRESO DE ENSAMBLE:
Progreso:  0% ──────── 20% ──────── 40% ──────── 60% ──────── 80% ─────── 100%
Capa:     [L1: INFRA] [L2: SYSTEM] [L3: PRODUCT] [L4: EXPERIENCE] [L5: BUSINESS]
Física:   Auto-draw   Bus Ascends  Mount Frames  Dock Terminal    Global Light
```

### 4.1 — Bandas de Tiempo y Parámetros del Timeline Maestro
* **Trigger Element:** `#system-assembly-canvas` (Contenedor maestro que envuelve las 5 capas).
* **Scroll Distance:** `end: "+=5000"`.
* **Scrub Smoothing:** `scrub: 0.8` (Equilibrio exacto entre respuesta táctil inmediata y suavizado inercial).
* **Anticipate Pin:** `anticipatePin: 1` (Elimina parpadeos visuales al anclar el canvas).

---

## 5. Blueprint Assembly Animation System (SVG Vector Engine)

El motor visual de planos técnicos se implementa mediante un lienzo SVG vectorial (`BlueprintCanvas.tsx`) superpuesto a las capas HTML:

```
VECTOR BLUEPRINT TOPOLOGY:
┌────────────────────────────────────────────────────────────────────────┐
│ [01: Storage Rack] ──(Bus 1)──> [02: API Gateway] ──(Bus 2)──> [03]   │
│         │                                                        │     │
│         ▼                                                        ▼     │
│  [Telemetry Node] ────────────(Global Bus)────────────> [05: Climax]   │
└────────────────────────────────────────────────────────────────────────┘
```

### 5.1 — Fórmulas de Trazo de Líneas
Cada línea de blueprint `#C9932E` se define como un `<path>` vectorial:
```typescript
// Cálculo determinista de trazo para GSAP
const path = pathRef.current;
const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length, // 0% scroll = 100% oculto
});

// Scrubbing en ScrollTrigger:
timeline.to(path, {
  strokeDashoffset: 0, // Se dibuja en sincronía con el avance de capa
  ease: "none",
  duration: 1,
});
```

### 5.2 — Marcadores de Coordenadas de Precisión (*Crosshairs*)
* En cada intersección de líneas se ubica un marcador de cruz `+` en `JetBrains Mono` (`#C9932E`).
* Cuando una línea completa su recorrido y bloquea un nodo en su posición, el marcador emite un destello de opacidad (`opacity: 0.2 -> 1.0 -> 0.6`, `duration: 0.2s`, `ease: "power2.out"`).

---

## 6. Coreografía de Transición Capa por Capa

```
ARCO DE ANIMACIÓN CONTINUO:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   CAPA 1:    │     │   CAPA 2:    │     │   CAPA 3:    │     │   CAPA 4:    │     │   CAPA 5:    │
│INFRASTRUCTURE│ ──> │    SYSTEM    │ ──> │   PRODUCT    │ ──> │  EXPERIENCE  │ ──> │   BUSINESS   │
│ Grid autónomo│     │ Bus asciende │     │ Frames 1:1   │     │ Terminal dock│     │ Iluminación  │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Transición 0 → 1: Inicialización & Cimientos (0% – 20% Scroll)
1. **Pre-scroll (0.0s – 0.8s):** Conteo numérico de carga `SYS_INIT [0% ──> 100%]`.
2. **Auto-Trazo (0.8s – 2.0s):** Trazo automático perimetral de 1px `#C9932E` sin necesidad de input de usuario.
3. **Primer Scroll (2.0s – 3.0s):** Los 4 nodos de telemetría fundacional (`15+ Years`, `Production Scale`, `Architecture Reviews`, `End-to-End`) emergen con un leve desplazamiento vertical de `12px` (`opacity: 0 -> 1`, `ease: "power2.out"`).

### Transición 1 → 2: Elevación de Topología (20% – 40% Scroll)
1. Los nodos de la Capa 1 se atenúan a opacidad `0.45` para actuar como base sólida.
2. Una línea troncal de datos asciende desde la Capa 1 y bifurca el diagrama de arquitectura (`Mobile Client ↔ Gateway ↔ Persistence ↔ Cloud`).
3. Las tarjetas de tecnología de `TechnologyMap` se acoplan en formación 2x3 con un retardo escalonado de 0.04s.

### Transición 2 → 3: Materialización de Producto (40% – 60% Scroll)
1. Los conectores de la Capa 2 se extienden al centro del canvas.
2. Los 4 case studies (`Gametime`, `Fanatics`, `TaskRabbit`, `Toptal`) se desplazan en el eje X de forma controlada por scroll, revelando el framework de 5 pasos (*Problem → Challenge → Investigation → Solution → Impact*).

### Transición 3 → 4: Encastre de la Consola (60% – 80% Scroll)
1. El marco del terminal (`EngineeringConsole`) desciende firmemente desde el plano superior.
2. La barra de estado se ilumina con los 3 indicadores de latón `#C9932E`.
3. El prompt interactivo emite el cursor parpadeante en bloque `#C9932E` y los Quick-Chips entran en cascada.

### Transición 4 → 5: Clímax de Ensamble & Autoridad Serena (80% – 100% Scroll)
1. **Iluminación Global:** Todas las líneas de blueprint de las 5 capas suben su opacidad a `1.0` simultáneamente, mostrando la arquitectura interconectada completa en el fondo.
2. **Revelación del Retrato:** Emerge el retrato de alta resolución de Tito integrado con el marco de plano.
3. **Fijación de Conversión:** Las tarjetas de servicios y los módulos de Calendly / Contacto quedan anclados en su posición final.
4. **Sello de Completitud:** El marcador inferior cambia a `SYSTEM_ASSEMBLY: ALL 5 LAYERS COMPLETE`.

---

## 7. Progress Indicator Design (HUD & Technical Telemetry)

```
TOP HUD FLOTANTE (36px):
┌────────────────────────────────────────────────────────────────────────┐
│ [TITO AGUDELO // MOBILE ARCHITECT]    LAYER [02/05] // SYSTEM   [BOOK] │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━───────────────────────────────── │ <- 1px Line
└────────────────────────────────────────────────────────────────────────┘
```

* **Indicador de Texto:** Actualiza dinámicamente el estrato activo según la banda de scroll:
  `LAYER [01/05] // INFRASTRUCTURE` → `LAYER [02/05] // SYSTEM` → `...` → `LAYER [05/05] // BUSINESS_VALUE`.
* **Línea de Progreso Inferior:** Línea de 1px `#C9932E` con `scaleX: progress` (`transform-origin: left`).
* **Marcadores de Esquina:** Los tags `SYS_GRID // 0X.00.00` aumentan su brillo al entrar a la capa correspondiente.

---

## 8. Mobile Motion Strategy (*The Vertical Blueprint Bus*)

En pantallas móviles (<768px) no se utiliza el pinning tridimensional pesado para evitar sobrecargar la GPU:

```
MOBILE BLUEPRINT BUS:
┌─────────────────────────────────────┐
│ [16px Spine Line #C9932E]           │
│  │                                  │
│  ├── [● Pin 1: Infrastructure Card] │
│  │    (Scrolls smoothly)            │
│  ▼                                  │
│  ├── [● Pin 2: System Architecture] │
│  │    (Lights up via Spine trigger) │
│  ▼                                  │
│  ├── [● Pin 3: Product Frame]       │
│  │    (Horizontal touch swipe 1:1)  │
│  ▼                                  │
│  ├── [● Pin 4: Terminal Chips]      │
│  │    (1-Tap direct execution)      │
│  ▼                                  │
│  └── [● Pin 5: Business Conversion] │
│       (All pins lit in gold)        │
└─────────────────────────────────────┘
```

1. **The Vertical Spine (`MobileSpine.tsx`):**
   - Una línea vectorial vertical continua de 1.5px `#C9932E` en el margen izquierdo (16px).
   - Conforme el usuario hace scroll, la punta de la línea viaja verticalmente e ilumina un pin circular en cada capa.
2. **Dimensionamiento Seguro (`100dvh`):**
   - Altura de viewport dinámica para evitar saltos provocados por la barra de navegación de iOS Safari.
3. **Interacciones Táctiles:**
   - Swiping horizontal nativo con CSS scroll-snap en los case studies de la Capa 3.
   - Micro-escalas táctiles (`scale: 0.98`, `duration: 0.1s`) al presionar los Quick-Action Chips del terminal.

---

## 9. Reduced Motion Accessibility Strategy (`prefers-reduced-motion: reduce`)

En estricta conformidad con [DESIGN.md §5](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L90):

```typescript
// Implementación en gsap.matchMedia():
mm.add("(prefers-reduced-motion: reduce)", () => {
  // 1. Desactivar pinning y scrubbing forzado
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // 2. Renderizar todas las líneas SVG 100% dibujadas desde el inicio
  gsap.set(".blueprint-vector, .blueprint-stroke", {
    strokeDashoffset: 0,
    opacity: 1,
  });

  // 3. Renderizar las 5 capas completamente visibles y ensambladas
  gsap.set(".system-layer-container", {
    opacity: 1,
    y: 0,
    scale: 1,
    clearProps: "all",
  });
});
```

* **Experiencia Resultante:**
  - Las 5 capas aparecen ya ensambladas y visibles.
  - El scroll se comporta como un documento vertical tradicional con navegación asistida por anclas.
  - La consola CLI muestra respuestas de forma instantánea sin efecto typewriter.

---

## 10. Performance Budget & Guardrails de 60fps/120fps

| Parámetro | Límite Máximo | Mecanismo de Garantía Técnica |
|---|---|---|
| **Frame Time (60Hz)** | `< 16.6ms` | Animaciones restringidas a GPU (`transform`, `opacity`) |
| **Frame Time (120Hz)** | `< 8.3ms` | `gsap.ticker.lagSmoothing(0)` + cero reflows en scroll |
| **Capas GPU Simultáneas** | `≤ 4` | Desactivación dinámica de `will-change` tras el anclaje |
| **Lighthouse Performance** | `≥ 95/100` | Ingesta estática en build time, cero JS bloqueante |
| **Layout Shift (CLS)** | `0.00` | Dimensiones reservadas con CSS `dvh` |

---

## 11. Rollout Plan (Fases de Implementación)

```
CRONOGRAMA DE ROLLOUT:
[Paso 1: Lenis Provider] ──> [Paso 2: Blueprint Canvas] ──> [Paso 3: Master Timeline] ──> [Paso 4: Mobile Spine] ──> [Paso 5: Deploy V1]
```

1. **Paso 1: Integración de Lenis Provider (`SmoothScrollProvider.tsx`)**
   - Envolver el layout raíz (`app/layout.tsx`) y verificar sincronización de rAF con `gsap.ticker`.
2. **Paso 2: Construcción del Lienzo de Blueprint (`BlueprintCanvas.tsx`)**
   - Implementar los trazados SVG de precisión y conectar las fórmulas de `strokeDashoffset`.
3. **Paso 3: Timeline Maestro de ScrollTrigger (`useSystemAssembly.ts`)**
   - Ensamblar las 5 capas existentes (`InfrastructureSection`, `SystemSection`, `ProductSection`, `ExperienceSection`, `BusinessSection`) en el canvas de scrubbing unificado.
4. **Paso 4: Implementación de Mobile Spine & TopHUD**
   - Activar el bus vertical para viewports móviles y sincronizar el HUD dinámico.
5. **Paso 5: Auditoría de Accesibilidad & Performance (Fase 6 / SHIP)**
   - Validación de `prefers-reduced-motion`, prueba en dispositivos móviles reales y verificación de Lighthouse ≥ 95.
