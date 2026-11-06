# Creative Direction & Storytelling System — Tito.website

> **Rol de Autor:** Creative Director, Narrative Designer, UX Architect & Staff Frontend Engineer  
> **Estado:** Fase 1 — Dirección Creativa y Arquitectura Narrativa (Aprobada)  
> **Autoridad Visual:** [DESIGN.md](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md) (Reglas duras de paleta, tipografía, motion y metáfora)  
> **Plan de Ejecución:** [MARKDOWN.md (Plan Maestro v2)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md)  
> *(Nota de sincronización: El archivo físico en el repositorio es `MARKDOWN.md`, correspondiente a `Tito.website — Plan Maestro v2`)*

---

## 1. Visión y Metáfora Central: System Assembly

El propósito de **Tito.website** no es listar credenciales en un formato de currículum web tradicional, sino **dramatizar el modelo mental de un Senior Software Engineer y Mobile Architect**.

El sitio opera bajo una metáfora visual cerrada y fundacional: **System Assembly**.

```
  ┌────────────────────────────────────────────────────────┐
  │  5. NEGOCIO       Impacto, Escala, Liderazgo & CTA     │  ▲
  ├────────────────────────────────────────────────────────┤  │
  │  4. EXPERIENCIA   Consola Interactiva / RAG Live       │  │ SISTEMA
  ├────────────────────────────────────────────────────────┤  │ ENSAMBLADO
  │  3. PRODUCTO      Gametime, Fanatics, TaskRabbit Apps  │  │ (ACUMULATIVO)
  ├────────────────────────────────────────────────────────┤  │
  │  2. SISTEMA       Arquitectura, Mobile + Cloud + Growth│  │
  ├────────────────────────────────────────────────────────┤  │
  │  1. INFRAESTRUCTURA  Fundamentos Técnicos & Telemetría │  │
  └────────────────────────────────────────────────────────┘
```

### Principios Fundamentales del Ensamble:
1. **Acumulación Viva (No Reemplazo):** Cada capa que se construye mediante el scroll se asienta y permanece visible en el canvas. Al alcanzar la Capa 5, el visitante contempla la arquitectura técnica completa en su totalidad tridimensional/estratificada.
2. **Líneas de Blueprint Vectorial (`#C9932E`):** Las conexiones entre módulos, buses de datos y contenedores se trazan en tiempo real con trazos de precisión de latón/bronce sobre el fondo `#0B0C0C`.
3. **Micro-UIs Funcionales:** Cada estrato contiene subsistemas con datos de arquitectura o mockups interactivos (no capturas estáticas ni decorados pasivos).

---

## 2. Respuestas a los Criterios de Aceptación (Fase 1)

---

### 2.1 — ¿Qué pasa en los primeros 3 segundos de scroll que hace que alguien no rebote?

Para retener a perfiles exigentes (CTOs, VPs de Ingeniería, Founders técnicos) en los primeros 3000ms, el sitio destruye el patrón pasivo de carga web y establece autoridad técnica instantánea:

```
[0.0s ──────────────────────── 0.8s]  ->  [0.8s ────────────────────── 2.0s]  ->  [2.0s ──────── 3.0s (Scroll)]
 Loading Telemetría (0% → 100%)            Auto-Trazo Blueprint Autónomo           Primer Scrubbing Reactivo
 "SYS_INIT: Architectural Kernel"          Grid base + Nodos de Infraestructura    El scroll "controla" la física
```

1. **Segundo 0.0 – 0.8 (Pre-scroll / Telemetría de Carga):**
   - El visitante entra a una superficie `#0B0C0C` limpia.
   - En el centro-inferior, un indicador minimalista en `JetBrains Mono` renderiza un conteo incremental ultra-rápido:  
     `SYS_INIT: Bootstrapping Architectural Kernel... [0% ──> 100%]`.
   - No es un spinner genérico; es un micro-proceso que inicializa el canvas de coordenadas del blueprint.
2. **Segundo 0.8 – 2.0 (Revelación Autónoma / The Hook):**
   - Al llegar a 100%, el canvas se abre. Sin que el usuario toque la rueda del mouse o la pantalla, una **línea de blueprint `#C9932E` de 1px se traza sola horizontal y verticalmente**, demarcando el plano base de la **Capa 1: Infraestructura**.
   - Emerge el titular display en `Fraunces 300`: *"Engineering systems from foundation to scale."*
   - Emerge el bloque de telemetría técnica verificado:  
     `EXPERIENCE: 15+ YRS [knowledge/experience.md] | CORE: REACT NATIVE • FULL STACK • AI SYSTEMS | [PENDIENTE: métrica adicional de telemetría validada con Tito]`.
   - Este trazo autónomo comunica de inmediato: *"Este sitio es un sistema vivo que se construye, no un documento estático."*
3. **Segundo 2.0 – 3.0 (El Primer Gesto de Scroll):**
   - Un indicador sutil `SCROLL TO ASSEMBLE SYSTEM [ ↓ ]` titila suavemente.
   - Al deslizar la rueda de scroll, el movimiento ejecuta un *scrubbing* determinista: el trazo blueprint se ramifica, revelando el primer nodo de arquitectura y conectando los servidores base con la capa superior.
   - La respuesta táctil inmediata, precisa y sin latencia (gracias a Lenis + GSAP) genera el efecto neurocognitivo de estar operando un panel de control real. El visitante no rebota porque quiere ver qué activa el siguiente milímetro de scroll.

---

### 2.2 — ¿Dónde vive el primer CTA (y cuál es la estrategia en cada capítulo)?

El sitio rechaza tanto el error de esconder el contacto hasta el footer como el error de saturar con modales intrusivos. La estrategia de conversión se despliega en dos niveles:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TITO AGUDELO]  • CAPA: INFRAESTRUCTURA [01/05]         [INSPECT CONSOLE]  [BOOK DISCOVERY ↗]  │ <- Top HUD
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1. Top HUD Persistente (Conversión Directa Inmediata):
- En el borde superior vive una barra de estado translúcida (`rgba(11, 12, 12, 0.85)` con backdrop-blur):
  - **Izquierda:** `TITO AGUDELO // STAFF & MOBILE ARCHITECT` (JetBrains Mono).
  - **Centro:** Indicador de estrato activo: `LAYER 01/05: INFRASTRUCTURE`.
  - **Derecha:** CTA Global discreto pero de alto contraste: `[ BOOK DISCOVERY ↗ ]` (Borde `#C9932E`, texto `#F0EFED`, hover con relleno `#C9932E` y texto `#0B0C0C`).
  - *Función:* Permite a un directivo o reclutador con alta intención agendar una llamada en 1 click sin necesidad de recorrer el scroll completo.

#### 2. CTAs Contextuales por Capítulo (Patrón Narrativo Hubtown):
Cada capa presenta una acción natural adaptada a lo que el visitante acaba de validar:

| Capa | Nombre | Contexto Narrativo | CTA Contextual Dedicado |
|---|---|---|---|
| **1** | **Infraestructura** | Fundamentos técnicos y solidez comprobada (15+ años) | `[ Read Technical Foundation Specs ↓ ]` *(Scroll asistido a Capa 2 o resumen técnico)* |
| **2** | **Sistema** | Patrones de arquitectura (Mobile, BFF, Event-Driven) | `[ Inspect Architecture Schematics ]` *(Abre desglose de topología React Native / Cloud)* |
| **3** | **Producto** | Apps en producción a escala (Gametime, Fanatics, TaskRabbit) | `[ Launch Case Study: Gametime Mobile ↗ ]` *(Detalle de desafíos de deep linking y activación)* |
| **4** | **Experiencia** | La consola interactiva CLI & RAG | `[ Execute $ tito --help in Terminal ]` *(Foco activo al prompt interactivo)* |
| **5** | **Negocio** | Servicios, liderazgo técnico y disponibilidad | `[ Schedule 30-Min Technical Discovery (Calendly) ]` + Formulario directo integrado |

---

### 2.3 — ¿Cómo se ve la versión mobile de cada una de las 5 capas?

En mobile **no se comprime la escena desktop**. Se re-arquitectura la experiencia para pantallas verticales táctiles:

#### La Columna Vertebral Mobile: *The Vertical Blueprint Bus*
- En el margen izquierdo (a 16px del borde), una línea vertical continua de 1.5px `#C9932E` corre a lo largo de toda la página como un **bus de datos**.
- A medida que el usuario hace scroll, la línea se ilumina y deposita "pines de conexión" en cada una de las 5 pantallas completas (*full-bleed viewport cards*).

```
MOBILE VIEWPORT (Card Full-Bleed)
┌──────────────────────────────────────┐
│[●] L1: INFRAESTRUCTURA               │
│ │                                    │
│ │  Fraunces 300 Headline             │
│ │  "15+ Years of Systems"            │
│ │                                    │
│ ├─ [Telemetry: 15+ Yrs Experience]   │
│ ├─ [Stack: RN • Node • Python • AWS] │
│ │                                    │
│ │  [Tap to Expand Foundation Node]   │
│ │                                    │
│ ▼  (Scroll down connects to L2)      │
└──────────────────────────────────────┘
```

#### Detalle Capa por Capa en Mobile:

1. **Capa 1: Infraestructura (Mobile View):**
   - **Estructura:** Pantalla vertical limpia con micro-badges táctiles de telemetría ordenados en grid 2x2.
   - **Interacción Touch:** Al tocar cualquier nodo (ej. `React Native Core`, `Distributed Systems`), el badge emite una micro-pulsación `#C9932E` y despliega notas técnicas directamente bajo el pulgar.
2. **Capa 2: Sistema (Mobile View):**
   - **Estructura:** Diagrama de arquitectura vertical simplificado (Mobile Client → Edge Gateway → Microservices).
   - **Interacción Touch:** El usuario alterna con un toggle táctil superior entre: `[Mobile Architecture]`, `[Deep Linking Engine]` y `[Experimentation Systems]`. La transición entre esquemas ocurre con un deslizamiento lateral suave optimizado a 60fps.
3. **Capa 3: Producto (Mobile View):**
   - **Estructura:** Un marco de dispositivo móvil a escala real (*1:1 Touch Device Frame*) centrado en pantalla.
   - **Interacción Touch:** Carrusel táctil con snapping nativo (CSS Scroll-Snap / Framer Motion). El usuario desliza con el pulgar horizontalmente entre los case studies de [knowledge/projets/](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/projets/):
     - *Gametime:* Ticketing móvil en tiempo real, activación de usuarios y deep linking.
     - *Fanatics:* Ecommerce a escala para millones de fans deportivos.
     - *TaskRabbit:* Plataforma de servicios y matching móvil.
     - *Toptal & Huge:* Consultoría técnica y transformación digital enterprise.
   - Cada slide incluye un pill de impacto en `JetBrains Mono`: `[PENDIENTE: métricas de impacto validadas por proyecto en knowledge/projets/]`.
4. **Capa 4: Experiencia — Consola Mobile (Mobile View):**
   - **Estructura:** Panel de terminal dockeado al viewport (`#141514`) con barra de comandos rápidos (*Quick-Action Chips*).
   - **Problema resuelto:** Escribir en teclado virtual en mobile es incómodo. La consola mobile incluye botones chip horizontales pre-configurados: `[ $ help ]`, `[ $ experience ]`, `[ $ projects ]`, `[ $ ask-rag ]`.
   - **Interacción Touch:** Un toque en un chip ejecuta el comando y renderiza la salida inmediatamente en el terminal sin tapar la pantalla con el teclado virtual, manteniendo la opción de abrir el teclado si el usuario desea tipear preguntas libres.
5. **Capa 5: Negocio & Conversión (Mobile View):**
   - **Estructura:** Fotografía de Tito optimizada (crop vertical de alta fidelidad, iluminación cálida de estudio), integrada con las tarjetas de servicios de [knowledge/services.md](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/services.md).
   - **Interacción Touch:** Selector de horario de Calendly adaptado a pantalla táctil y botón flotante sticky en la zona del pulgar: `[ Book Discovery Call ]`.

---

### 2.4 — ¿Qué tres adjetivos NO describen este diseño?

Para garantizar una postura estética radicalmente diferenciada, el diseño rechaza formalmente:

```
  ❌ 1. GENÉRICO (Anti AI-Default / Anti SaaS-Template)
  ❌ 2. GIMMICKY (Anti Efectista / Anti Decorativo Vacío)
  ❌ 3. RUIDOSO (Anti Desesperado / Anti Agresivo Comercial)
```

1. ❌ **NO es "Genérico" (Anti AI-Default / Template):**
   - *Por qué:* El 95% de los sitios generados por IA o plantillas de portafolio en 2026 utilizan fondo negro puro (`#000000`), gradientes de morado a cian, tarjetas con bordes estándar y fuentes sans-serif neutras en titulares.
   - *Nuestra identidad:* Tito.website utiliza un fondo orgánico `#0B0C0C`, un acento de latón arquitectónico único (`#C9932E`), tipografía display con tensión y carácter (`Fraunces 300/600`), y una estructura de ensamblaje progresivo que no existe en ninguna librería de componentes pre-fabricada.
2. ❌ **NO es "Gimmicky" (Anti Efectista / Decorativo Vacío):**
   - *Por qué:* Muchos sitios de diseño abusan de Three.js pesado, partículas flotantes sin sentido, efectos de distorsión líquida y rebotes de resorte (*spring bounce*) que ralentizan la navegación y distraen del contenido técnico.
   - *Nuestra identidad:* Cada animación tiene una causa física y lógica en el sistema: es una línea de plano dibujándose, un módulo acoplándose o una respuesta inmediata a un comando de usuario. Curvas de easing severas y precisas (`power2.out`, `expo.out`). Si un elemento no comunica arquitectura o producto, se elimina.
3. ❌ **NO es "Ruidoso" (Anti Desesperado / Agresivo Comercial):**
   - *Por qué:* Las landing pages de venta agresiva recurren a banners de urgencia ("¡Contrátame ya!"), popups flotantes, titulares inflados de auto-promoción ("10x Rockstar") y colores estridentes.
   - *Nuestra identidad:* La presencia de Tito se comunica con **autoridad serena (Senior presence)**. El tono es técnico, medido, claro y respaldado por la experiencia real en empresas líderes (Gametime, Fanatics, TaskRabbit). El sitio invita a una conversación técnica entre pares.

---

## 3. Comportamiento Detallado de Navegación por Teclado, Scroll-Scrubbing y Accesibilidad

Como Staff Frontend Engineer y UX Architect, la arquitectura de scroll scrubbing jamás debe comprometer la accesibilidad (`a11y`) ni atrapar al usuario en trampas de foco o scroll forzado (*scroll-jacking hostil*).

```
MODALIDAD DE NAVEGACIÓN Y MOTION:
┌───────────────────────────────┬─────────────────────────────────────────────────────────────┐
│ Modo de Entrada / Preferencia │ Comportamiento Técnico del Engine                           │
├───────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ Mouse Wheel / Touchpad        │ GSAP ScrollTrigger + Lenis scrub continuo (0% ──> 100%)    │
│ Teclado (Tab / Shift+Tab)     │ Foco nativo visible + auto-desplazamiento a la capa activa  │
│ Teclas de Flecha / PgUp / PgDn│ Avance determinista del scroll sin atrapar el evento        │
│ prefers-reduced-motion: reduce│ Sistema 100% ensamblado y estático; scroll web tradicional  │
└───────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

### 3.1 — Navegación por Teclado (Teclas de Navegación y Foco Accesible)

El motor GSAP ScrollTrigger se sincroniza de forma bidireccional con el foco del DOM y los eventos de teclado estándar:

1. **Navegación con `Tab` y `Shift + Tab` (Focus Management):**
   - Todos los elementos interactivos (botones del HUD, CTAs contextuales, pestañas de arquitectura, inputs de la consola y enlaces de Calendly) poseen un orden de tabulación estrictamente secuencial (`tabindex="0"` en orden semántico de Capa 1 a 5).
   - **Indicador de foco:** Anillo exterior nítido de 2px en `#C9932E` con offset de 2px (`outline: 2px solid #C9932E; outline-offset: 2px`).
   - **Auto-Alineación del Scroll:** Cuando el usuario presiona `Tab` y el foco pasa a un elemento ubicado en una capa siguiente (ej. de un botón en Capa 1 a un botón en Capa 2), un listener `focusin` calcula la posición exacta de scroll de ese estrato y ejecuta `lenis.scrollTo(targetElement, { offset: 0, duration: 0.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })`. El scroll se sincroniza instantáneamente con la capa activa sin desorientar al usuario.
2. **Navegación con `ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Home`, `End`, `Space`:**
   - No se bloquean (*preventDefault*) los eventos de teclado nativos.
   - Lenis intercepta las pulsaciones para aplicar una interpolación inercial suave pero directa.
   - Presionar `PageDown` o `Space` avanza el timeline de ScrollTrigger en incrementos predecibles equivalentes a una vista de capa completa, evitando que el usuario de teclado quede "bloqueado" en micropasos.
3. **Cero Trampas de Foco en el Scroll Principal:**
   - El scroll principal nunca atrapa el foco. Las únicas trampas de foco (*focus traps*) permitidas ocurren cuando el usuario abre intencionalmente un modal a pantalla completa (ej. detalle extendido de un Case Study o modal de Calendly), donde la tecla `Escape` cierra el modal y devuelve el foco exactamente al botón que lo abrió.

---

### 3.2 — Comportamiento con `prefers-reduced-motion: reduce`

En cumplimiento estricto con [DESIGN.md §5](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L90), `prefers-reduced-motion` no es un ajuste secundario, sino un **estado de diseño nativo de primera clase**:

```typescript
// Implementación arquitectónica en GSAP ScrollTrigger:
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: reduce)", () => {
  // 1. Desactivar todo el scroll-scrubbing y parallax
  // 2. Renderizar todas las líneas de blueprint 100% dibujadas (strokeDashoffset: 0)
  // 3. Renderizar las 5 capas completamente visibles y ensambladas
  // 4. Transformar el layout en un flujo de documento vertical limpio
});
```

#### Especificación Técnica para Reducción de Movimiento:
1. **Desactivación de Scrubbing:** Se eliminan todas las animaciones atadas al progreso del scroll (`scrub: true`). La rueda de scroll y los gestos táctiles se comportan exactamente como en un documento web estándar de alto rendimiento.
2. **Líneas de Blueprint Pre-Ensambladas:** Los trazos de blueprint no se animan ni se dibujan poco a poco; se renderizan inmediatamente con `stroke-dashoffset: 0` y opacidad total, mostrando la estructura arquitectónica ya construida.
3. **Consola y Terminal:** Se desactiva el efecto de máquina de escribir (*typewriter effect*). Las respuestas de texto de la consola aparecen de forma instantánea al ingresar un comando. El cursor parpadeante `#C9932E` se mantiene estático o con un pulso muy lento de opacidad conforme a directrices WCAG AAA.
4. **Micro-UIs y Case Studies:** Permanece el 100% de la funcionalidad interactiva (los toggles de arquitectura, los tabs de productos y el formulario de contacto siguen respondiendo a clics y toques con transiciones instantáneas de `opacity: 0 -> 1` en ≤100ms).

---

## 4. Journey Completo del Visitante (Capa por Capa)

A continuación se detalla la experiencia del visitante a través de las 5 capas, mapeando cada momento al **Arco Emocional** definido en [DESIGN.md §2](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L41-L53).

```
ARCO EMOCIONAL DEL RECORRIDO:
[Calma / Fundación] ──> [Tensión Constructiva] ──> [Realidad Tangible] ──> [Apertura / Interactividad] ──> [Confianza Serena]
      (Capa 1)                 (Capa 2)                  (Capa 3)                  (Capa 4)                 (Capa 5)
```

---

### Capa 1: Infraestructura (Infra)
* **Mood:** Calma, orden primario, solidez de cimientos.
* **Titular Display:** `Fraunces 300` — *"The Foundation of Durable Software"*
* **Subtítulo / Meta:** `JetBrains Mono` — `SYS_LAYER_01 // RUNTIME_STABILITY // 15+ YRS CORE`
* **Narrativa:** Antes de hablar de interfaces atractivas, demostramos que la ingeniería de Tito descansa sobre cimientos inamovibles. Más de 15 años diseñando sistemas resilientes, plataformas móviles y arquitecturas que escalan bajo tráfico real.
* **Componente Visual / Blueprint:**
  - En la base del canvas se dibuja un rack de arquitectura minimalista: nodos interconectados con trazos `#C9932E` que representan Storage, Compute, Cache y Networking.
  - Micro-UI: Bloque de telemetría técnica verificado con [knowledge/experience.md](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/experience.md).
* **CTA Contextual:** `[ Read Technical Foundation Specs ↓ ]`

---

### Capa 2: Sistema (Architecture)
* **Mood:** Tensión constructiva, complejidad orquestada, inteligencia de arquitectura.
* **Titular Display:** `Fraunces 300` — *"Orchestrating Scale & Mobile Runtime"*
* **Subtítulo / Meta:** `JetBrains Mono` — `SYS_LAYER_02 // SYSTEM_TOPOLOGY // REACT NATIVE & CLOUD`
* **Narrativa:** Cómo piensa un Mobile Architect. No se trata solo de escribir componentes React, sino de resolver la sincronización offline, el deep linking resiliente, los motores de experimentación A/B y el puente entre el cliente móvil y el backend cloud.
* **Componente Visual / Blueprint:**
  - La Capa 1 permanece visible y fija en el fondo; sobre ella, la línea de blueprint asciende y expande un diagrama de flujo arquitectónico en tiempo real:
    `Mobile Client (React Native / Expo) <──> BFF / GraphQL Gateway <──> Event Bus <──> Microservices`.
  - Micro-UI: Diagrama interactivo donde hacer hover o tap sobre un nodo ilumina el flujo de datos correspondiente (ej. ciclo de vida móvil y pipeline de experimentación).
* **CTA Contextual:** `[ Inspect Architecture Schematics ]`

---

### Capa 3: Producto (Production Applications)
* **Mood:** Realidad tangible, impacto masivo, validación de mercado.
* **Titular Display:** `Fraunces 300` — *"Products in the Hands of Millions"*
* **Subtítulo / Meta:** `JetBrains Mono` — `SYS_LAYER_03 // PRODUCTION_DEPLOYMENTS // HIGH_SCALE_APPS`
* **Narrativa:** La arquitectura no sirve de nada si no entrega productos excepcionales que los usuarios amen. Aquí se despliegan los sistemas construidos para empresas documentadas en `/knowledge`: **Gametime, Fanatics, TaskRabbit, Toptal y Huge**.
* **Componente Visual / Blueprint:**
  - Las capas 1 y 2 continúan apiladas debajo. La Capa 3 monta sobre ellas mockups funcionales interactivos:
    1. **Gametime:** Marketplace de tickets para eventos en vivo con énfasis en velocidad, mobile purchasing y transparent pricing ([knowledge/projets/gametime.md](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/projets/gametime.md)).
    2. **Fanatics:** Plataforma de mobile commerce y experiencia de usuario a gran escala para fans deportivos ([knowledge/projets/fanatics.md](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/projets/fanatics.md)).
    3. **TaskRabbit:** Soluciones móviles y de marketplace para matching en tiempo real ([knowledge/experience.md](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/experience.md)).
    4. **Toptal & Huge:** Consultoría senior de arquitectura y transformación digital para clientes globales enterprise.
  - Micro-UI: Métricas de producto (`[PENDIENTE: validar métricas cuantitativas finales con Tito para Gametime/Fanatics]`).
* **CTA Contextual:** `[ Launch Case Study: Gametime Mobile ↗ ]`

---

### Capa 4: Experiencia (The Interactive Console)
* **Mood:** Apertura, satisfacción interactiva, logro tangible ("El visitante toma el control").
* **Titular Display:** `Fraunces 300` — *"The Terminal: Direct System Access"*
* **Subtítulo / Meta:** `JetBrains Mono` — `SYS_LAYER_04 // INTERACTIVE_RUNTIME // CLI & RAG ENGINE`
* **Narrativa:** Se rompe la barrera entre el visitante y el portafolio. El usuario puede inspeccionar directamente el sistema mediante una consola interactiva real integrada en el diseño.
* **Componente Visual / Especificación de la Consola:**
  - **Fondo:** `#141514` (panel oscuro diferenciado pero perteneciente a la misma familia que `#0B0C0C`).
  - **Borde / Prompt:** Trazo de 1px con cursor parpadeante en `#C9932E`.
  - **Tipografía:** `JetBrains Mono 400/500` exclusivamente.
  - **Comportamiento Progresivo (Fases 8, 10, 11 de MARKDOWN.md):**
    - *Modo CLI (Fase 8):* Comandos nativos guiados (`help`, `ls`, `cat experience.md`, `inspect stack`, `clear`).
    - *Modo AI/RAG (Fases 10-11):* Detección de lenguaje natural o comando `$ ask "¿Cuál fue el rol de Tito en Gametime?"`. El motor RAG consulta los documentos en `/knowledge` y responde citando la fuente exacta.
* **CTA Contextual:** `[ Execute $ tito --help in Terminal ]`

---

### Capa 5: Negocio (Impact & The Assembled System)
* **Mood:** Confianza serena, clímax de ensamble, liderazgo y llamada a la acción clara.
* **Titular Display:** `Fraunces 300` — *"Let’s Engineer the Next Breakthrough"*
* **Subtítulo / Meta:** `JetBrains Mono` — `SYS_LAYER_05 // BUSINESS_VALUE // LEADERSHIP & CONSULTING`
* **Narrativa:** **El Clímax Visual.** Al llegar al final del scroll, el sistema completo se visualiza ensamblado en el fondo (las 5 capas interconectadas con sus líneas de blueprint activas). En primer plano, emerge la persona real detrás de todo el sistema técnico: **Tito Agudelo**.
* **Componente Visual / Blueprint:**
  - **Fotografía Personal:** Retrato de alta resolución (≥2400px), integrado en el sistema con iluminación cálida de estudio y recorte arquitectónico limpio.
  - **Oferta de Servicios Claros ([knowledge/services.md](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/services.md)):**
    - *React Native Consulting & Architecture Reviews*
    - *Mobile Product Development (End-to-end Expo & RN)*
    - *AI Product Development (RAG, Agents, Knowledge Systems)*
    - *Full Stack Engineering (React, Next.js, Node.js, Python)*
    - *Fractional Technical Leadership & Architecture Mentoring*
  - **Centro de Conversión Dual:**
    1. Widget embebido de **Calendly** para agendar llamada de 30 min directa.
    2. Formulario de contacto directo de baja fricción (Name, Company, Message) conectado a API route segura.
* **CTA Principal:** `[ Schedule a Discovery Call (30 Min) ↗ ]`

---

## 5. Sistema de Diseño Visual y Reglas Tipográficas

De estricta conformidad con [DESIGN.md §3 y §4](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L55-L82):

```
PALETA DE COLOR CERRADA:
┌───────────────────────────────────┬───────────────────────────────────┐
│ BASE BACKGROUND: #0B0C0C          │ ACCENT COLOR: #C9932E             │
│ (Casi negro cálido, no puro)      │ (Bronce / Latón arquitectónico)   │
├───────────────────────────────────┼───────────────────────────────────┤
│ SURFACE / CONTRAST: #F0EFED       │ SECONDARY TEXT: #8A8A85           │
│ (Off-white para texto y cards)    │ (Gris cálido para metadata/labels)│
└───────────────────────────────────┴───────────────────────────────────┘
```

### Reglas Tipográficas:
1. **Titulares y Display:** `Fraunces` (Google Fonts variable serif).
   - Títulos de Capa: `weight: 300`, `letter-spacing: -0.02em`, tamaño display.
   - Sub-encabezados de Sección: `weight: 600`.
   - *Razón:* Otorga tensión editorial sofisticada y separa radicalmente el sitio de la estética genérica de SaaS.
2. **Cuerpo de Texto y Case Studies:** `Inter` o `Satoshi`.
   - Pesos: `400` (Regular) y `500` (Medium).
   - Altura de línea: `1.6` para máxima legibilidad en descripciones técnicas complejas.
3. **Metadata, Etiquetas, Telemetría y Consola:** `JetBrains Mono`.
   - Pesos: `400` y `500`.
   - Uso: Fechas, métricas de experiencia, nombres de capas (`LAYER 01`), código fuente y toda la interfaz del terminal.

---

## 6. Verificación del Checklist Anti-Genérico (DESIGN.md §9)

Antes de dar por finalizada esta dirección creativa, se valida formalmente cada criterio de calidad:

- [x] **¿Hay gradiente morado/azul en algún lado?**  
  *No.* Prohibido explícitamente. Fondo `#0B0C0C` y acento `#C9932E`.
- [x] **¿Hay más de un color de acento sin justificación?**  
  *No.* Un solo acento cromático `#C9932E` en todo el sistema.
- [x] **¿El titular principal usa una fuente sans-serif neutra?**  
  *No.* Se prescribe `Fraunces` (300/600 variable serif) para todos los titulares de capítulo.
- [x] **¿La metáfora de scroll se parece a "casa" o "edificio genérico"?**  
  *No.* La metáfora es **System Assembly** (arquitectura de software real: Infraestructura → Sistema → Producto → Experiencia → Negocio).
- [x] **¿Las 5 capas son visualmente distinguibles entre sí (no todas lucen igual con texto distinto)?**  
  *Sí.* Cada capa tiene una identidad morfológica única: Capa 1 (Telemetría y grid base), Capa 2 (Diagrama de topología y microservicios), Capa 3 (Mockups interactivos de apps Gametime/Fanatics/TaskRabbit), Capa 4 (Consola interactiva JetBrains Mono `#141514`), Capa 5 (Retrato de Tito + Calendly + vista global ensamblada).
- [x] **¿La consola se siente pegada al resto del sitio o integrada?**  
  *Sí.* Está completamente integrada: fondo `#141514`, cursor y prompt `#C9932E`, tipografía compartida `JetBrains Mono`.
- [x] **¿Alguna animación tiene bounce/spring o no comunica "construcción"?**  
  *No.* Todas las curvas son de precisión y desaceleración (`power2.out`, `expo.out`), gobernadas por el trazo de blueprints.
- [x] **¿El sitio respeta `prefers-reduced-motion` mostrando las capas ya ensambladas?**  
  *Sí.* Diseñado como estado nativo de renderizado estático y accesible.

---

## 7. Próximos Pasos de Ejecución (Fases Siguientes)

Siguiendo el [Plan Maestro v2 (MARKDOWN.md)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md#L50-L66):
1. **Fase 2:** Arquitectura de Información y Componentes (Estructura de directorios en Next.js 16, layouts y slots para las 5 capas).
2. **Fase 3:** Build Estructural + Contacto + Analytics (Formulario funcional + Calendly + telemetría de eventos).
3. **Fase 4 & 5:** Integración de Lenis Scroll + GSAP ScrollTrigger con el motor de trazo de blueprint y soporte a11y.
4. **Fase 6:** Checkpoint SHIP (Lanzamiento v1 a producción).
