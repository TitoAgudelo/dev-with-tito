# Phase 6A Execution Plan: Foundational Motion & Interaction

> **Roles:** Principal Motion Engineer, GSAP Specialist & Performance Engineer  
> **Estado:** Plan de Ejecución de Bajo Riesgo — Hito 1 de Motion  
> **Referencia Superior:** [motion-implementation-plan.md](file:///Users/titoagudelo/Workspace/dev-with-tito/motion-implementation-plan.md)  
> **Alcance de Fase 6A:** Lenis Smooth Scroll + Progress HUD + Revelaciones de Sección Discretas + A11y / Mobile QA  
> **Exclusiones de Fase 6A (Diferidas a 6B):** Motor SVG de Blueprint, Master Timeline Pinned Complejo.  

---

## 1. Objetivo & Estrategia de Reducción de Riesgo

El objetivo de la **Fase 6A** es habilitar la infraestructura fundamental de scroll suave y movimiento reactivo sobre las 5 capas existentes (`infrastructure`, `system`, `product`, `experience`, `business`), **garantizando estabilidad del 100%, rendimiento de 60fps/120fps y cero regresiones funcionales** antes de introducir la virtualización tridimensional de planos en la Fase 6B.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FASE 6A: ALCANCE SEGURO                         │
│                                                                        │
│  [SmoothScrollProvider (Lenis)] ──> [TopHUD Progress & Stratum State]  │
│                   │                                  │                 │
│                   ▼                                  ▼                 │
│  [Section ScrollTrigger Triggers] ──> [Staggered Entry Revelations]    │
│                   │                                  │                 │
│                   ▼                                  ▼                 │
│  [prefers-reduced-motion Guard] ──> [Lighthouse ≥95 & Mobile 60fps]    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Lenis Implementation Checklist

Implementación de Lenis en el layout raíz de Next.js 16 con sincronización determinista de rAF:

### Checklist Técnico:
- [ ] **Componente Provider:** Crear `src/components/providers/SmoothScrollProvider.tsx` como Client Component (`'use client'`).
- [ ] **Configuración de Inercia:**
  ```typescript
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });
  ```
- [ ] **Sincronización Bidireccional con GSAP Ticker:**
  ```typescript
  // Actualizar ScrollTrigger en cada scroll de Lenis
  lenis.on('scroll', ScrollTrigger.update);

  // Vincular Lenis al loop de animación maestro de GSAP
  const tickHandler = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickHandler);
  gsap.ticker.lagSmoothing(0); // Evitar saltos de fotogramas al reanudar pestaña
  ```
- [ ] **Aislamiento de Scroll Interno (`data-lenis-prevent`):**
  - Aplicar `data-lenis-prevent="true"` en `CommandHistory.tsx` dentro de `EngineeringConsole` para permitir scroll independiente en el terminal.
- [ ] **Manejo de Enlaces de Anclaje (Hash Anchor Router):**
  - Interceptar clics en enlaces `#infrastructure`, `#system`, `#product`, `#experience`, `#business` para ejecutar:
    ```typescript
    lenis.scrollTo(targetId, {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    ```
- [ ] **Destrucción Limpia en Unmount:**
  - Invocar `lenis.destroy()` y `gsap.ticker.remove(tickHandler)` en la función de limpieza de `useEffect`.

---

## 3. Progress HUD Implementation Checklist

El `TopHUD` flotante proporciona orientación espacial y telemetría de navegación en tiempo real:

### Checklist Técnico:
- [ ] **Componente TopHUD:** Crear `src/components/chrome/TopHUD.tsx` montado en `app/layout.tsx` o en la cabecera fija de `app/page.tsx`.
- [ ] **Estructura Visual:**
  - Posicionamiento fijo: `fixed top-0 left-0 right-0 z-50`.
  - Fondo: `#0B0C0C`/85 con `backdrop-blur-md` y borde inferior sutil `border-b border-[rgba(201,147,46,0.15)]`.
  - Altura: `44px` en desktop, `40px` en mobile.
- [ ] **Telemetría de Estrato en Vivo:**
  - Estado reactivo (`currentLayer`: `LayerId`):
    - `01/05 // INFRASTRUCTURE`
    - `02/05 // SYSTEM`
    - `03/05 // PRODUCT`
    - `04/05 // EXPERIENCE`
    - `05/05 // BUSINESS`
- [ ] **Barra de Progreso Vectorial (1px `#C9932E`):**
  - Línea de 1px anclada al borde inferior del HUD con `transform-origin: left`.
  - Vinculada al progreso global de scroll de la página: `scaleX: scrollProgress` (0.0 a 1.0).
- [ ] **CTA Directo Global:**
  - Botón accesible `[ Book Discovery ↗ ]` con borde `#C9932E` que abre el agendador o hace scroll directo a `#business`.
- [ ] **Accesibilidad del HUD:**
  - `role="navigation"`, `aria-label="System Assembly Stratum Navigation"`, atributos `aria-current="step"` dinámicos.

---

## 4. Section Reveal Strategy (Discrete ScrollTrigger Entry)

En la Fase 6A, cada una de las 5 secciones ejecuta una **revelación arquitectónica firme** al entrar en el viewport, sin bloquear el flujo natural del documento:

```
┌────────────────────────────────────────────────────────────────────────┐
│                     PATRÓN DE REVELACIÓN POR CAPA                      │
│                                                                        │
│  Trigger: 15% antes de entrar al viewport (top 85%)                   │
│  - Contenedor de Capa: Opacity 0 ──> 1 (duration: 0.5s, power2.out)   │
│  - Encabezados Display: y: 24px ──> 0px (duration: 0.6s, power2.out)  │
│  - Tarjetas / Nodos: Stagger 0.08s, y: 16px ──> 0px                   │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1 — Coreografía de Revelación por Sección:
1. **Capa 1 (`#infrastructure`):**
   - El badge `SystemInitBadge` titila una vez (`opacity: 0.4 -> 1.0`).
   - El titular `IntroHero` entra con elevación vertical de 20px.
   - Las 4 tarjetas de `TelemetryGrid` se asientan con un retardo escalonado (*stagger: 0.08s*).
2. **Capa 2 (`#system`):**
   - El titular y narrativa de arquitectura emergen suavemente.
   - Los nodos de `BlueprintDiagram` se revelan en secuencia de izquierda a derecha (01 → 02 → 03 → 04).
   - Los chips de `TechnologyMap` aumentan su opacidad a 1.0.
3. **Capa 3 (`#product`):**
   - Las métricas de `ImpactMetrics` se asientan firmemente.
   - Cada `CaseStudyCard` entra con elevación sutil de 16px conforme el usuario se desplaza verticalmente.
4. **Capa 4 (`#experience`):**
   - El marco del terminal desciende 20px y el cursor `#C9932E` activa su pulso accesible.
   - Los Quick-Action Chips entran en cascada (*stagger: 0.04s*).
5. **Capa 5 (`#business`):**
   - Las 6 tarjetas de `ServicesGrid` se revelan en formación 2x3.
   - El modelo de `EngagementModel` y los paneles de `CalendlyPlaceholder` y `ContactPanel` completan el ensamble final.

---

## 5. ScrollTrigger Boundaries & Thresholds

Definición matemática de los puntos de activación de ScrollTrigger para evitar cálculos redundantes:

```
PUNTOS DE ACTIVACIÓN EN EL VIEWPORT:
┌────────────────────────────────────────────────────────────────────────┐
│ Top of Viewport (0%)                                                  │
│                                                                        │
│ Viewport Active Zone (Trigger: top 80%)  <─── DISPARA REVELACIÓN       │
│                                                                        │
│ Bottom of Viewport (100%)                                              │
└────────────────────────────────────────────────────────────────────────┘
```

### 5.1 — Parámetros por Defecto para ScrollTrigger:
```typescript
const sectionScrollTriggerConfig = (sectionId: string, onEnterLayer: () => void) => ({
  trigger: `#${sectionId}`,
  start: "top 80%",       // Se dispara cuando el tope de la sección alcanza el 80% del viewport
  end: "bottom 20%",
  toggleActions: "play none none reverse",
  onEnter: () => onEnterLayer(),
  onEnterBack: () => onEnterLayer(),
});
```

* **Beneficio Técnico:** Cero layout thrashing. ScrollTrigger solo escucha eventos pasivos y opera directamente en GPU (`transform`, `opacity`).

---

## 6. Accessibility Validation Plan (`a11y` & `prefers-reduced-motion`)

La accesibilidad es un requerimiento mandatorio de nivel **WCAG 2.1 AA**:

### Protocolo de Validación:
1. **Verificación de `prefers-reduced-motion: reduce`:**
   - [ ] Con la opción de movimiento reducido activada en macOS / Windows / iOS / Android:
     - [ ] Todas las animaciones de ScrollTrigger quedan anuladas inmediatamente (`ScrollTrigger.getAll().forEach(t => t.kill())`).
     - [ ] Todas las secciones y tarjetas aparecen con opacidad `1.0` y posición `y: 0` desde el primer render.
     - [ ] Lenis desactiva la inercia suave (`smoothWheel: false`) o se usa scroll nativo instantáneo.
2. **Navegación por Teclado:**
   - [ ] La tecla `Tab` recorre los elementos interactivos en orden semántico estricto (HUD → Capa 1 → Capa 2 → Capa 3 → Capa 4 → Capa 5).
   - [ ] Anillo de foco accesible `#C9932E` visible en todo momento (`outline: 2px solid #C9932E; outline-offset: 2px;`).
   - [ ] El desplazamiento con `Tab` hacia otra sección alinea suavemente el scroll sin atrapar el foco.
3. **Lectores de Pantalla:**
   - [ ] El TopHUD anuncia el cambio de estrato mediante `aria-live="polite"` de forma no intrusiva.
   - [ ] La consola interactiva preserva la semántica de `role="log"` y `role="region"`.

---

## 7. Mobile Validation Plan (iOS Safari & Android Chrome)

Validación de ergonomía y rendimiento en pantallas táctiles:

### Protocolo de Validación:
1. **Estabilidad de Viewport (`100dvh`):**
   - [ ] La aparición/ocultamiento de la barra de direcciones de Safari iOS no provoca saltos de layout ni re-cálculos bruscos de ScrollTrigger.
2. **Rendimiento Táctil (60fps):**
   - [ ] Desplazamiento táctil fluido sin bloqueo del hilo principal (*main thread*).
   - [ ] Cero retraso táctil (*touch delay*) en los botones del TopHUD y los Quick-Chips de la consola.
3. **Escala y Espaciado:**
   - [ ] Todas las zonas de toque (*touch targets*) cumplen con la medida mínima de `44x44px`.
   - [ ] El TopHUD no obstruye el contenido inicial de las secciones en pantallas de 375px de ancho (iPhone SE).

---

## 8. Lighthouse Validation Plan

Criterios de aceptación de rendimiento medidos con Google Lighthouse (Modo Mobile y Desktop):

| Métrica Core Web Vital | Límite Objetivo | Mecanismo de Garantía |
|---|---|---|
| **Performance Score** | `≥ 95 / 100` | Ingesta estática en SSR, cero librerías pesadas bloqueantes |
| **Largest Contentful Paint (LCP)** | `< 1.8s` | Prioridad de carga del titular Fraunces y CSS crítico inline |
| **Cumulative Layout Shift (CLS)** | `0.00` | Dimensiones explícitas y layouts estables |
| **Interaction to Next Paint (INP)** | `< 50ms` | Animaciones confinadas exclusivamente a GPU (`transform`) |
| **Total Blocking Time (TBT)** | `< 50ms` | Hilo principal libre de timers o bucles pesados |
| **Accessibility Score** | `100 / 100` | Contraste de paleta verificado (17.5:1 / 6.2:1) y ARIA semántico |

---

## 9. Rollback Strategy (Plan de Contingencia)

En caso de detectar inestabilidad de scroll o caídas de framerate durante pruebas en dispositivos de gama media:

```
PLAN DE CONTINGENCIA DE 3 NIVELES:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   NIVEL 1    │     │   NIVEL 2    │     │   NIVEL 3    │
│Reducción de  │ ──> │Desactivación │ ──> │Fallback Puro │
│Inercia Lenis │     │de Lenis en   │     │a CSS Estático│
│(duration 0.8)│     │Mobile        │     │(No JS Motion)│
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Nivel 1 (Ajuste de Inercia):**
   - Reducir `duration` de Lenis de `1.2s` a `0.8s` y `touchMultiplier` a `1.0` si se detecta resistencia en trackpads antiguos.
2. **Nivel 2 (Desactivación Selectiva en Mobile):**
   - Si Safari iOS reporta jank, desactivar Lenis en viewports `< 768px` mediante `isMobile ? null : new Lenis(...)`, manteniendo el scroll nativo del sistema operativo mientras GSAP ScrollTrigger opera normalmente.
3. **Nivel 3 (Fallback Seguro a CSS):**
   - Si GSAP falla en inicializar, el layout de las 5 capas cuenta con estilos CSS base con `opacity: 1` por defecto, garantizando que el 100% del contenido sea legible y accesible sin JavaScript.

---

## 10. Checklist de Aprobación de Fase 6A

Antes de dar por concluida la Fase 6A:
- [ ] `SmoothScrollProvider` instalado y funcionando sin errores en consola.
- [ ] `TopHUD` muestra el estrato actual en sincronía con el scroll.
- [ ] Las 5 secciones ejecutan revelaciones suaves sin parpadeos visuales.
- [ ] `prefers-reduced-motion` comprobado y verificado.
- [ ] Puntuación de Lighthouse Performance `≥ 95`.
- [ ] Cero dependencias añadidas fuera de las ya instaladas (`lenis`, `gsap`, `@gsap/react`).
