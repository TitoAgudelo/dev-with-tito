# Phase 6: Motion & Interaction Architecture Plan — Tito.website

> **Roles:** Creative Director, Motion Designer & Staff Frontend Architect  
> **Estado:** Especificación de Motion, Coreografía de Scroll y Directrices de Ensamble  
> **Autoridad Visual:** [DESIGN.md §5 (Motion Principles)](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L84-L95) & [creative-direction.md](file:///Users/titoagudelo/Workspace/dev-with-tito/creative-direction.md)  
> **Plan Maestro:** [MARKDOWN.md (Fase 4 & Fase 5)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md#L58-L60)  

---

## 1. Declaración de Principios de Movimiento

El sistema de movimiento de **Tito.website** tiene una única misión conceptual: **dramatizar la metáfora System Assembly**.

```
  ┌─────────────────────────────────────────────────────────────┐
  │                   SYSTEM ASSEMBLY PIPELINE                  │
  │                                                             │
  │   01. INFRAESTRUCTURA  ──> Fundaciones, Grid y Telemetría   │
  │            │                                                │
  │            ▼                                                │
  │   02. SISTEMA          ──> Topología, Buses y Protocolos    │
  │            │                                                │
  │            ▼                                                │
  │   03. PRODUCTO         ──> Mockups Reales & Framework 5-P   │
  │            │                                                │
  │            ▼                                                │
  │   04. EXPERIENCIA      ──> Consola CLI & Runtime Interactivo│
  │            │                                                │
  │            ▼                                                │
  │   05. NEGOCIO          ──> Clímax de Ensamble & Retrato     │
  └─────────────────────────────────────────────────────────────┘
```

### Reglas Inmutables de Animación:
1. **El movimiento siempre tiene una causa estructural:** Nada se anima "porque sí". Cada animación es un trazo de blueprint vector (`#C9932E`), un bus de datos que se interconecta, o una respuesta física y directa al scroll del visitante.
2. **Cero Efectos Decorativos Vacíos:**
   - ❌ Cero parallax flotante sin sentido.
   - ❌ Cero partículas aleatorias o "polvo cósmico".
   - ❌ Cero rebote de resorte (*spring bounce* / *overshoot caricaturesco*).
   - ❌ Cero gradientes de neón morado-azul o efectos cyberpunk difusos.
3. **Física de Construcción de Precisión:**
   - Curvas de frenado firme: `power2.out` y `expo.out` (asentamiento arquitectónico sin oscilaciones).
4. **Una Sola Animación Protagonista:** Mientras una línea de blueprint se traza, ningún otro elemento compite por la atención del usuario.

---

## 2. Lenis Integration Strategy

Lenis actúa como el motor de inercia unificado para todo el sitio, eliminando el tartamudeo (*scroll stutter*) y sincronizando los fotogramas de animación al refresco vertical del hardware (60Hz / 120Hz ProMotion):

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           LENIS SCROLL ENGINE                           │
│                                                                         │
│  User Wheel / Touch  ──>  Lenis Interpolator  ──>  ScrollTrigger.update │
│                                │                         │              │
│                                ▼                         ▼              │
│                       gsap.ticker (rAF)        Master Assembly Timeline │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.1 — Configuración Técnica del Provider (`SmoothScrollProvider.tsx`)
* **Parámetros del Motor:**
  - `duration`: `1.2s` (Inercia natural y deliberada, no resbaladiza).
  - `easing`: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` (Curva exponencial suave sin desaceleraciones bruscas).
  - `orientation`: `'vertical'`.
  - `smoothWheel`: `true`.
  - `touchMultiplier`: `1.5` (Respuesta táctil reactiva en pantallas móviles).
* **Sincronización con GSAP Ticker:**
  - `lenis.on('scroll', ScrollTrigger.update)`
  - `gsap.ticker.add((time) => lenis.raf(time * 1000))`
  - `gsap.ticker.lagSmoothing(0)` (Previene saltos de fotogramas tras pestañas inactivas).
* **Aislamiento de Contenedores Internos (Inner Scroll Passthrough):**
  - El componente `CommandHistory` dentro de `EngineeringConsole` posee el atributo `data-lenis-prevent="true"`, permitiendo hacer scroll independiente dentro del historial del terminal sin mover el scroll global de la página.
* **Navegación por Anclas Hash (`/#experience`, `/#business`):**
  - Al hacer clic en el TopHUD o enlaces de anclaje, `lenis.scrollTo(targetHash, { offset: 0, duration: 1.4 })` calcula la coordenada de ensamblaje correspondiente sin saltos de layout.

---

## 3. GSAP Architecture & React 19 Integration

### 3.1 — Gestión del Ciclo de Vida con `@gsap/react` (`useGSAP`)
Para garantizar cero fugas de memoria (*memory leaks*) y recolección limpia en Next.js con Fast Refresh:

```typescript
// Patrón de Hook Reutilizable para Ensamble: useScrollAssembly.ts
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function useScrollAssembly(containerRef: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Desktop & Mobile con soporte de movimiento activo
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Timeline Maestro de Ensamble
    });

    // 2. Estado nativo de movimiento reducido
    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Configuración estática 100% ensamblada
    });
  }, { scope: containerRef });
}
```

### 3.2 — Reglas de Aceleración por Hardware (GPU Compositing)
* **Propiedades Permitidas:** `transform: translate3d(x, y, 0)`, `opacity`, y SVG `strokeDashoffset`.
* **Propiedades Prohibidas:** Queda terminantemente prohibido animar `width`, `height`, `top`, `left`, `margin` o `padding` para evitar *layout thrashing* y reflows en el hilo principal.
* **Directiva `will-change`:** Aplicada dinámicamente durante el scrubbing de la capa activa y liberada automáticamente (`will-change: auto`) al consolidar el estrato.

---

## 4. ScrollTrigger Strategy & Master Assembly Timeline

El ensamble se organiza mediante un **Timeline Maestro Pinned** (`pin: true`) que mapea el progreso de scroll (`0%` a `100%`) a lo largo de un scroll virtual de `5000px`:

```
PROGRESSION MAP (Scroll Scrubbing 0% ──> 100%):
[0% ──── 20%]  CAPA 1: INFRAESTRUCTURA (Grid base + Nodos fundacionales)
[20% ─── 40%]  CAPA 2: SISTEMA (Buses de datos + Topología arquitectónica)
[40% ─── 60%]  CAPA 3: PRODUCTO (Device Frame + Slides de Case Studies)
[60% ─── 80%]  CAPA 4: EXPERIENCIA (Docking del Terminal + Prompt #C9932E)
[80% ── 100%]  CAPA 5: NEGOCIO (Clímax de ensamble completo + Retrato + Servicios)
```

### 4.1 — Mecánica de Apilamiento Acumulativo (*Live Stacking*)
A diferencia de un carrusel tradicional, **las capas anteriores no desaparecen**:
1. **Capa 1 (Infraestructura)** se ancla en el fondo z-index 10.
2. **Capa 2 (Sistema)** se dibuja sobre la Capa 1 (z-index 20) y conecta sus buses de datos a los nodos base.
3. **Capa 3 (Producto)** monta los mockups sobre el sistema (z-index 30).
4. **Capa 4 (Experiencia)** encastra la consola de terminal (z-index 40).
5. **Capa 5 (Negocio)** ilumina todo el sistema interconectado (z-index 50), revelando la arquitectura completa en el clímax visual antes de los CTAs de contacto.

---

## 5. Coreografía de Transición Capa por Capa

---

### Transición 0 → 1: Inicialización & Cimientos (Segundos 0.0 a 3.0)
* **Trigger:** Carga inicial de página (Pre-scroll).
* **Fase A (0.0s – 0.8s):** Conteo de telemetría de inicialización `SYS_INIT: [0% ──> 100%]`.
* **Fase B (0.8s – 2.0s):** Sin interacción de usuario, la línea de blueprint `#C9932E` traza autónomamente el grid base perimetral y los marcadores de coordenadas `SYS_GRID // 01.00.00`.
* **Fase C (2.0s – 3.0s):** Emerge el titular en `Fraunces 300` con fade suave (`opacity: 0 -> 1`, `duration: 0.6s`, `ease: "power2.out"`). El primer movimiento de scroll activa la ramificación de los nodos de telemetría de 15+ años.

---

### Transición 1 → 2: Elevación Arquitectónica (Progreso 20% – 40%)
* **Scrubbing GSAP:**
  - Los 4 nodos de la Capa 1 reducen su escala sutilmente a `0.96` y reducen su brillo para actuar como sustrato.
  - Una línea vertical de bus de datos asciende desde el nodo `CORE_RUNTIME` de la Capa 1 y dibuja el marco de la Capa 2.
  - El diagrama de topología (`Mobile Client ↔ Gateway ↔ Event Bus ↔ Cloud`) se despliega mediante `strokeDashoffset` en sincronía con el scroll.
  - Las etiquetas de tecnología (`React Native`, `GraphQL`, `Redis`) se asientan con un micro-desplazamiento vertical de `8px`.

---

### Transición 2 → 3: Materialización de Producto (Progreso 40% – 60%)
* **Scrubbing GSAP:**
  - Las líneas de salida de la topología de la Capa 2 se bifurcan hacia el centro del canvas.
  - El marco del dispositivo móvil (`DeviceFrame.tsx`) se acopla como un módulo de hardware.
  - Las 4 tarjetas de Case Study (`Gametime`, `Fanatics`, `TaskRabbit`, `Toptal`) se desplazan horizontalmente de forma asistida mientras el scroll vertical avanza, revelando el framework de 5 pasos (*Problem → Challenge → Investigation → Solution → Impact*).

---

### Transición 3 → 4: Encastre de la Consola Interactiva (Progreso 60% – 80%)
* **Scrubbing GSAP:**
  - Las líneas de bus se conectan a un bloque central que desciende firmemente: el panel de terminal (`#141514`).
  - La barra de estado `ConsoleHeader` se ilumina con las 3 luces de control de latón `#C9932E`.
  - El prompt `tito@system:~$ ` se activa y emite un cursor de bloque `#C9932E` parpadeante.
  - Los Quick-Action Chips (`$ help`, `$ ls`, `$ projects`) entran en cascada (*stagger: 0.05s*).

---

### Transición 4 → 5: Clímax de Ensamble & Autoridad Serena (Progreso 80% – 100%)
* **Scrubbing GSAP (El Clímax Visual):**
  - **Iluminación Global del Sistema:** Todas las líneas de blueprint vectoriales de las 5 capas se encienden con opacidad `1.0` en `#C9932E`, mostrando la arquitectura unificada y viva de fondo.
  - **Revelación del Retrato:** Emerge el retrato de alta resolución de Tito Agudelo en `PortraitFrame.tsx`, integrado dentro de las líneas del plano.
  - **Fijación de la Oferta de Negocio:** El grid de 6 servicios de consultoría y el módulo de agendamiento de Calendly se fijan en el viewport final.
  - **Cierre del Ensamble:** El marcador inferior titila a `SYSTEM_ASSEMBLY: ALL 5 LAYERS COMPLETE`.

---

## 6. Sistema de Indicadores de Progreso & Top HUD

```
TOP HUD DINÁMICO (36px):
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [TITO AGUDELO // MOBILE ARCHITECT]    LAYER [02/05] // SYSTEM    [INSPECT] [BOOK ↗]   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━───────────────────────────────────────────────── │ <- 1px Line
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Indicador de Estrato Activo:**
   - Vinculado a callbacks `onToggle` de ScrollTrigger:
     - Scroll en 0-20%: `LAYER [01/05] // INFRASTRUCTURE`
     - Scroll en 20-40%: `LAYER [02/05] // SYSTEM`
     - Scroll en 40-60%: `LAYER [03/05] // PRODUCT`
     - Scroll en 60-80%: `LAYER [04/05] // EXPERIENCE`
     - Scroll en 80-100%: `LAYER [05/05] // BUSINESS_VALUE`
2. **Barra de Progreso Vectorial (1px `#C9932E`):**
   - Corre por el borde inferior del HUD con `scaleX: progress` (`transform-origin: left`).
3. **Marcadores Técnicos de Esquina:**
   - En cada sección, los identificadores `SYS_GRID // 0X.00.00` aumentan su opacidad de `0.2` a `0.8` cuando la capa está en su punto focal.

---

## 7. Mobile Motion Strategy (*The Vertical Blueprint Bus*)

En dispositivos móviles no se ejecuta el apilamiento complejo horizontal. Se implementa la coreografía ergonómica del **Bus Vertical**:

```
MOBILE MOTION SCHEMATIC:
┌──────────────────────────────────────┐
│ [16px Spine Line #C9932E]            │
│  │                                   │
│  ├── [● Pin 1: Infra Card]           │
│  │    (Scrolls naturally)            │
│  ▼                                   │
│  ├── [● Pin 2: System Architecture]  │
│  │    (Fades in via Spine trigger)   │
│  ▼                                   │
│  ├── [● Pin 3: Product Frame]        │
│  │    (Touch swipeable 1:1)          │
│  ▼                                   │
│  ├── [● Pin 4: Terminal Chips]       │
│  │    (1-Tap execution)              │
│  ▼                                   │
│  └── [● Pin 5: Business & Call]      │
│       (All pins lit up in gold)      │
└──────────────────────────────────────┘
```

* **The Vertical Spine (`MobileSpine.tsx`):**
  - Línea continua vertical de 1.5px en `#C9932E` situada a 16px del margen izquierdo.
  - A medida que el usuario se desplaza, la punta de la línea emite un pulso y activa un pin circular en cada encabezado de sección.
* **Cero Jank en Mobile:**
  - Se desactiva el `pin: true` pesado en pantallas menores a `768px`.
  - Cada sección ocupa su propio viewport natural (`100dvh`) con transiciones suaves basadas en IntersectionObserver o ScrollTrigger liviano (`once: true`).
* **Micro-Interacciones Táctiles:**
  - Toques en Quick-Action Chips o botones disparan micro-escalas accesibles (`scale: 0.98`, `duration: 0.1s`).

---

## 8. Estrategia de Accesibilidad para Movimiento Reducido (`prefers-reduced-motion`)

En estricta conformidad con [DESIGN.md §5](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L90), la reducción de movimiento es un **estado de diseño nativo de primera clase**:

```typescript
// Implementación Arquitectónica para Reducción de Movimiento
mm.add("(prefers-reduced-motion: reduce)", () => {
  // 1. Eliminar pin y scrubbing de ScrollTrigger
  ScrollTrigger.getAll().forEach(t => t.kill());

  // 2. Dibujar todas las líneas SVG inmediatamente
  gsap.set(".blueprint-path, .blueprint-stroke", {
    strokeDashoffset: 0,
    opacity: 1
  });

  // 3. Renderizar todas las capas visibles y apiladas de forma estática
  gsap.set(".system-layer", {
    opacity: 1,
    y: 0,
    scale: 1,
    clearProps: "all"
  });
});
```

* **Comportamiento Resultante:**
  - El sitio se convierte en un documento vertical continuo de alto rendimiento.
  - Las líneas de blueprint aparecen 100% dibujadas desde el primer instante.
  - Cero saltos o trampas de scroll.
  - La consola CLI opera instantáneamente sin efectos de escritura diferida.

---

## 9. Performance Budget & Guardrails de 60fps/120fps

Para garantizar una experiencia cinematográfica fluida en dispositivos móviles de gama media y monitores de alta tasa de refresco (120Hz):

| Métrica de Rendimiento | Límite Máximo / Presupuesto | Estrategia de Garantía Técnica |
|---|---|---|
| **Frame Time (60Hz)** | `< 16.6ms` por fotograma | Animaciones confinadas a GPU (`transform`, `opacity`) |
| **Frame Time (120Hz)** | `< 8.3ms` por fotograma | `gsap.ticker.lagSmoothing(0)` + Cero reflows |
| **Capas Compuestas GPU** | Máximo 4 capas simultáneas | Desactivación de `will-change` tras el asentamiento |
| **Lighthouse Performance** | `≥ 95/100` | Cero JS bloqueante en SSR, Server Components para contenido |
| **First Input Delay (FID/INP)** | `< 50ms` | Hilo principal libre de cálculos pesados de geometría |
| **Cumulative Layout Shift (CLS)** | `0.00` | Alturas reservadas con CSS `dvh` y layouts fijos |

---

## 10. Matriz de Coreografía Emocional & Criterios de Aceptación

Mapeo de la progresión del visitante con el **Arco Emocional de DESIGN.md §2**:

```
PROGRESIÓN EMOCIONAL DEL VISITANTE:
[Calma & Orden] ───> [Tensión Constructiva] ───> [Realidad Tangible] ───> [Apertura & Control] ───> [Confianza Serena]
    (Capa 1)                 (Capa 2)                  (Capa 3)                  (Capa 4)                 (Capa 5)
```

| Capa | Arco Emocional | Comportamiento del Movimiento | Criterio de Aceptación Técnico |
|---|---|---|---|
| **1. Infraestructura** | Calma, orden primario | Trazo lineal pausado, grid sobrio | El auto-trazo inicial concluye en ≤2.0s sin input del usuario |
| **2. Sistema** | Tensión constructiva | Bifurcaciones de red, flujo dinámico | Las líneas de topología se sincronizan 1:1 con el scroll-scrubbing |
| **3. Producto** | Realidad tangible | Asentamiento firme de mockups | Los 4 case studies se despliegan con estructura de 5 fases sin desalineación |
| **4. Experiencia** | Apertura y control | Encastre de panel, cursor activo | El prompt responde a teclado y chips sin recargas ni pérdida de foco |
| **5. Negocio** | Confianza serena | Iluminación de todo el sistema | Todas las capas permanecen visibles y ensambladas simultáneamente |

---

## 11. Checklist Anti-Genérico de Validación de Motion (DESIGN.md §9)

Antes de iniciar la codificación de la Fase 6, se valida este plan contra el checklist maestro:

- [x] **¿Hay algún rebote (*spring / bounce*) o salto caricaturesco?**  
  *No.* Solo curvas de desaceleración arquitectónica (`power2.out`, `expo.out`).
- [x] **¿Hay partículas flotantes o efectos de neón cyberpunk?**  
  *No.* Prohibidos. Únicamente trazos vectoriales de blueprint en `#C9932E`.
- [x] **¿El movimiento está atado al scroll (*scroll-driven*) y no a timers arbitrarios?**  
  *Sí.* El visitante tiene el control absoluto de la velocidad de ensamble.
- [x] **¿El sitio respeta `prefers-reduced-motion` mostrando las 5 capas pre-ensambladas?**  
  *Sí.* Diseñado como estado nativo en `gsap.matchMedia()`.
- [x] **¿La versión mobile evita el lag de GPU desacoplando el pinning horizontal?**  
  *Sí.* Implementa la columna vertebral vertical ergonómica (*The Vertical Blueprint Bus*).

---

## 12. Próximos Pasos de Construcción (Fase 4 y 5)

Con el plan de motion aprobado:
1. **Fase 4:** Crear `SmoothScrollProvider.tsx` e integrar Lenis al layout raíz.
2. **Fase 5:** Implementar el hook maestro `useScrollAssembly.ts` y las animaciones SVG de blueprint con GSAP ScrollTrigger.
3. **Fase 6:** Checkpoint de Lanzamiento y Deploy a Producción.
