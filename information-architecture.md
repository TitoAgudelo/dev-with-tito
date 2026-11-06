# Arquitectura de Información & Jerarquía de Componentes — Tito.website

> **Rol de Autor:** UX Architect & Staff Frontend Engineer  
> **Estado:** Fase 2 — Arquitectura de Información & Mapeo de Componentes (Revisada — Mapeo 1:1 Canónico)  
> **Autoridad Visual & Narrativa:** [DESIGN.md](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md) & [creative-direction.md](file:///Users/titoagudelo/Workspace/dev-with-tito/creative-direction.md)  
> **Plan de Ejecución:** [MARKDOWN.md (Plan Maestro v2)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md)  
> **Alineación con AGENTS.md:** Propuesta de evolución a estructura canónica 1:1 por capas  

---

## 1. Sitemap & Estrategia de Enrutamiento

En estricta coherencia con la metáfora **System Assembly** y la directriz de experiencia continua (*cinematic scroll-driven journey*), la arquitectura de rutas implementa un lienzo principal unificado (*Single-Page Cinematic Canvas*) estructurado en **5 anclas deterministas con mapeo 1:1 exacto a las 5 capas narrativas de DESIGN.md**:

```
                                      ┌────────────────────────┐
                                      │       / (Root)         │
                                      │  Cinematic Assembly    │
                                      │  5 Capas 1:1 Mapeadas  │
                                      └───────────┬────────────┘
               ┌──────────────────────────────────┼──────────────────────────────────┐
               ▼                                  ▼                                  ▼
      ┌─────────────────┐                ┌─────────────────┐                ┌─────────────────┐
      │   /api/contact  │                │    /api/rag     │                │ /resume.pdf     │
      │  (Lead Capture) │                │  (AI Retrieval) │                │ (Direct Asset)  │
      └─────────────────┘                └─────────────────┘                └─────────────────┘
```

### 1.1 — Tabla de Mapeo 1:1 Canónico (Ruta Principal `/`)

| # | Capa Narrativa (DESIGN.md §1.1) | Sección de Código (`src/sections/`) | Scroll-Anchor (Hash URL) | Propósito UX / Accesibilidad |
|---|---|---|---|---|
| **1** | **Infraestructura** | `src/sections/infrastructure/` | `/#infrastructure` | Punto de anclaje inicial: telemetría, grid base y 15+ años de fundamentos |
| **2** | **Sistema** | `src/sections/system/` | `/#system` | Topología de arquitectura: React Native, BFF, Cloud y pipelines de growth |
| **3** | **Producto** | `src/sections/product/` | `/#product` | Mockup interactivo 1:1 con case studies (Gametime, Fanatics, TaskRabbit) |
| **4** | **Experiencia** | `src/sections/experience/` | `/#experience` | Consola interactiva CLI & motor RAG ("experiméntalo tú mismo") |
| **5** | **Negocio** | `src/sections/business/` | `/#business` | Clímax de ensamble: servicios, liderazgo fraccional, retrato y Calendly |

*Regla de Enrutamiento:* Al acceder directamente a una URL con hash (ej. `tito.website/#experience`), el motor Lenis ejecuta un desplazamiento suave asistido con auto-scroll a la coordenada exacta donde esa capa se encuentra pre-ensamblada.

---

### 1.2 — Rutas Secundarias y Endpoints Técnicos

1. **`/api/contact` (POST):**
   - Endpoint seguro para el procesamiento del formulario de contacto directo (Name, Email, Company, Message, Project Scope).
   - Validación estricta de esquemas vía Zod y despacho a Resend / Nodemailer.
2. **`/api/rag` (POST / SSE Stream):**
   - Endpoint de consulta para el motor RAG de la Capa 4 (Fases 10-11).
   - En Fase 8 opera como mock/router local; en Fases 10-11 canaliza consultas vectoriales hacia el backend en Python (FastAPI) o el índice local `/knowledge`.
3. **`/resume.pdf` (Static Asset):**
   - Documento descargable directamente desde el Top HUD, la Capa 1 y la consola mediante `$ cat resume.pdf` o `$ download cv`.
4. **`/og.png` / Metadata Routes:**
   - Generación dinámica de OpenGraph image con la estética de blueprint `#0B0C0C` + `#C9932E`.

---

## 2. Jerarquía de Componentes & Justificación de Evolución Arquitectónica

### 2.1 — Justificación de la Estructura Canónica 1:1 vs AGENTS.md Preliminar

En [AGENTS.md §5](file:///Users/titoagudelo/Workspace/dev-with-tito/AGENTS.md#L52) y [MARKDOWN.md §2](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md#L57) se listaban originalmente 7 secciones genéricas heredadas de un esquema preliminar (`intro`, `journey`, `experience`, `services`, `projects`, `terminal`, `contact`).

**Evolución Arquitectónica Formal:**
Consolidamos la estructura en **5 carpetas de sección con correspondencia 1:1 estricta con las 5 capas de DESIGN.md**:

1. **Eliminación de la Ambigüedad en `experience`:**  
   En el esquema preliminar, `experience` se refería a la lista de trabajos pasados (ubicada en la Capa 1), mientras que la Capa 4 de DESIGN.md se llama formalmente **"Experiencia"** (la consola interactiva donde el visitante experimenta el sistema en vivo). Al renombrar la Capa 1 a `src/sections/infrastructure/`, la carpeta `src/sections/experience/` asume con total claridad semántica la Capa 4 (consola interactiva).
2. **Consolidación de Secciones Fragmentadas (Capas 1 y 5):**  
   - En la **Capa 1**, `intro` (animación inicial de entrada) y el bloque fundacional de trayectoria histórica se unifican bajo `src/sections/infrastructure/`, manteniendo subcomponentes internos limpios (`SystemInitBadge.tsx` y `TelemetryGrid.tsx`).
   - En la **Capa 5**, la oferta de consultoría (`services`) y los mecanismos de conversión (`contact`) se unifican bajo `src/sections/business/`, reflejando exactamente el clímax de ensamble donde el cliente evalúa el impacto de negocio y agenda la llamada en un solo plano.
3. **Claridad para Nuevos Ingenieros:**  
   Cualquier desarrollador que lea el código encontrará una correspondencia idéntica y directa:
   `Capa N en DESIGN.md` ⟷ `src/sections/0N-capa/` ⟷ `/#capa`.

---

### 2.2 — Árbol de Componentes del Proyecto (`src/`)

```
src/
├── app/
│   ├── layout.tsx                  [Root Layout: Tipografías Fraunces/Inter/JetBrains Mono]
│   ├── page.tsx                    [Assembly Orchestrator: Lenis + GSAP Master Timeline]
│   ├── globals.css                 [Tokens de diseño: #0B0C0C, #C9932E, #F0EFED, #8A8A85]
│   └── api/
│       ├── contact/route.ts        [POST: Formulario de contacto y leads]
│       └── rag/route.ts            [POST: AI Retrieval / SSE Stream]
│
├── components/
│   └── chrome/                     [Componentes Globales de HUD y Canvas]
│       ├── TopHUD.tsx              [Barra persistente: Layer Indicator + Direct CTA]
│       ├── BlueprintCanvas.tsx     [Motor SVG de trazo de líneas #C9932E]
│       └── MobileSpine.tsx         [Bus vertical de datos para viewport móvil]
│
└── sections/                       [Mapeo 1:1 Estricto con las 5 Capas]
    ├── infrastructure/             ──> CAPA 1: INFRAESTRUCTURA (/#infrastructure)
    │   ├── InfrastructureSection.tsx [Contenedor de capa + Grid base + Titular Fraunces]
    │   ├── SystemInitBadge.tsx     [Telemetría de carga 0% -> 100%]
    │   └── TelemetryGrid.tsx       [15+ años de experiencia, nodos Cloud / React Native]
    │
    ├── system/                     ──> CAPA 2: SISTEMA (/#system)
    │   ├── SystemSection.tsx       [Contenedor de topología arquitectónica]
    │   └── TopologyDiagram.tsx     [Diagrama interactivo React Native <-> BFF <-> Cloud]
    │
    ├── product/                    ──> CAPA 3: PRODUCTO (/#product)
    │   ├── ProductSection.tsx      [Contenedor de productos en producción]
    │   ├── DeviceFrame.tsx         [Mockup táctil interactivo 1:1]
    │   └── CaseStudySlide.tsx      [Slides: Gametime, Fanatics, TaskRabbit, Toptal, Huge]
    │
    ├── experience/                 ──> CAPA 4: EXPERIENCIA (/#experience)
    │   ├── ExperienceSection.tsx   [Contenedor del panel interactivo #141514]
    │   ├── TerminalCore.tsx        [Engine CLI unificado + Prompt #C9932E JetBrains Mono]
    │   ├── QuickActionChips.tsx    [Chips táctiles para mobile y teclado]
    │   └── TerminalDispatcher.ts   [Router estático Fase 8 + AI RAG Fases 10-11]
    │
    └── business/                   ──> CAPA 5: NEGOCIO (/#business)
        ├── BusinessSection.tsx     [Contenedor del clímax de ensamble del sistema]
        ├── ServicesGrid.tsx        [6 áreas de especialización de knowledge/services.md]
        ├── PortraitFrame.tsx       [Retrato de Tito en alta resolución (≥2400px)]
        ├── CalendlyWidget.tsx      [Scheduler embebido de 30 min]
        └── ContactForm.tsx         [Formulario directo con validación Zod]
```

---

## 3. Mapeo de Contenido (`knowledge/` → Capas) & Detección de Bloqueos

Verificación rigurosa de las fuentes de datos en `/knowledge`. **Se prohíbe inventar métricas no respaldadas:**

```
MAPEO DE CONOCIMIENTO A COMPONENTES (1:1):
┌─────────────────────────────┬───────────────────────────────────┬─────────────────────────────────┐
│ Capa Narrativa / Sección    │ Archivo Fuente en knowledge/      │ Estado de Disponibilidad        │
├─────────────────────────────┼───────────────────────────────────┼─────────────────────────────────┤
│ Capa 1: Infraestructura     │ knowledge/about.md                │ ✅ DISPONIBLE                   │
│ (`src/sections/infra...`)   │ knowledge/experience.md (L1-L10)  │ ✅ DISPONIBLE (15+ años exp.)   │
│                             │ knowledge/skills.md               │ ✅ DISPONIBLE (Stack verificado)│
├─────────────────────────────┼───────────────────────────────────┼─────────────────────────────────┤
│ Capa 2: Sistema             │ knowledge/skills.md               │ ✅ DISPONIBLE                   │
│ (`src/sections/system/`)    │ knowledge/experience.md           │ ✅ DISPONIBLE                   │
├─────────────────────────────┼───────────────────────────────────┼─────────────────────────────────┤
│ Capa 3: Producto            │ knowledge/projets/gametime.md     │ ✅ DISPONIBLE                   │
│ (`src/sections/product/`)   │ knowledge/projets/taskrabbit.md   │ ✅ DISPONIBLE                   │
│                             │ knowledge/projets/toptal.md       │ ✅ DISPONIBLE                   │
│                             │ knowledge/projets/fanatics.md     │ 🛑 BLOQUEANTE (0 bytes / vacío) │
├─────────────────────────────┼───────────────────────────────────┼─────────────────────────────────┤
│ Capa 4: Experiencia         │ knowledge/about.md                │ ✅ DISPONIBLE                   │
│ (`src/sections/experience/`)│ knowledge/experience.md           │ ✅ DISPONIBLE                   │
│                             │ knowledge/services.md             │ ✅ DISPONIBLE                   │
│                             │ knowledge/skills.md               │ ✅ DISPONIBLE                   │
│                             │ knowledge/projets/*.md            │ ⚠️ PARCIAL (Fanatics pendiente) │
├─────────────────────────────┼───────────────────────────────────┼─────────────────────────────────┤
│ Capa 5: Negocio             │ knowledge/services.md             │ ✅ DISPONIBLE (6 servicios)     │
│ (`src/sections/business/`)  │ knowledge/about.md                │ ✅ DISPONIBLE                   │
│                             │ [Fotografía en alta resolución]   │ 🛑 BLOQUEANTE (Asset pendiente) │
│                             │ [Calendly URL / Embed Token]      │ 🛑 BLOQUEANTE (Config pendiente)│
└─────────────────────────────┴───────────────────────────────────┴─────────────────────────────────┘
```

### 3.1 — Registro Explícito de Elementos Bloqueantes

1. 🛑 **BLOQUEANTE — `knowledge/projets/fanatics.md`:**
   - *Diagnóstico:* El archivo existe en el disco pero tiene **0 bytes** (completamente vacío).
   - *Impacto:* La sección `src/sections/product/` (Capa 3) no puede construir el Case Study de Fanatics con datos inventados.
   - *Acción Requerida:* Tito debe proveer el contenido de Fanatics (Rol, Responsabilidades, Arquitectura y Desafíos) antes de implementar el slide de Fanatics.
2. 🛑 **BLOQUEANTE — Fotografía Personal en Alta Resolución (≥2400px):**
   - *Diagnóstico:* No existe el archivo de imagen de retrato personal en la carpeta `public/` o `assets/`.
   - *Impacto:* La sección `src/sections/business/` (Capa 5) requiere el retrato real integrado en el ensamble del sistema según [DESIGN.md §7](file:///Users/titoagudelo/Workspace/dev-with-tito/DESIGN.md#L111-L114).
   - *Acción Requerida:* Suministrar la fotografía personal en alta resolución.
3. 🛑 **BLOQUEANTE — Configuración de Calendly & Credenciales de Envío:**
   - *Diagnóstico:* URL de Calendly y tokens de API de correo aún no configurados en variables de entorno (`.env.local`).
   - *Impacto:* El widget de agendamiento de `src/sections/business/` debe configurarse antes del despliegue de Fase 3.
4. ⚠️ **PENDIENTE NO BLOQUEANTE — Métricas Cuantitativas de Impacto (% conversión, volumen):**
   - *Diagnóstico:* Los archivos actuales de `knowledge/` detallan responsabilidades cualitativas y tecnologías, pero no contienen porcentajes cuantitativos exactos.
   - *Directriz:* En tanto Tito no confirme métricas específicas, la UI utilizará etiquetas de logros cualitativos verificados (ej. *"TypeScript Migration across Core Flow"*, *"Deep Linking Infrastructure"*) en lugar de inventar porcentajes ficticios.

---

## 4. Jerarquía y Arquitectura Unificada de la Consola (Capa 4 / `src/sections/experience`)

Para evitar duplicar interfaces entre la **Fase 8 (CLI Hardcoded)** y las **Fases 10-11 (AI / RAG en Python)**, se implementa un **Pipeline de Despacho Dual dentro de `src/sections/experience/`**:

```
                                  ┌─────────────────────────────────────────┐
                                  │      TerminalCore Component             │
                                  │      (Prompt `#C9932E` + JetBrains Mono) │
                                  └────────────────────┬────────────────────┘
                                                       │
                                            User Input Submission
                                                       │
                                                       ▼
                                  ┌─────────────────────────────────────────┐
                                  │        TerminalDispatcher Engine        │
                                  └────────────────────┬────────────────────┘
                                                       │
                           ┌───────────────────────────┴───────────────────────────┐
                           │                                                       │
               Matches Static Command?                                     Natural Language /
            (help, ls, cat, clear, whoami)                                  Unrecognized Query
                           │                                                       │
                           ▼                                                       ▼
             ┌──────────────────────────┐                            ┌──────────────────────────┐
             │   Static Local Registry  │                            │    RAG Streaming Router  │
             │   (Fase 8: Instant DOM)  │                            │  (Fase 10-11: /api/rag)  │
             └─────────────┬────────────┘                            └─────────────┬────────────┘
                           │                                                       │
                           └───────────────────────────┬───────────────────────────┘
                                                       │
                                                       ▼
                                  ┌─────────────────────────────────────────┐
                                  │   Unified Terminal Output Streamer      │
                                  │   (Renderiza Texto, Tablas y Citas)     │
                                  └─────────────────────────────────────────┘
```

### 4.1 — Especificación del Pipeline de Despacho (`src/sections/experience/TerminalDispatcher.ts`)

```typescript
// Estructura de Arquitectura para TerminalDispatcher (Frontend)
export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
  sourceCitation?: string; // Ej: "knowledge/projets/gametime.md"
  timestamp: string;
}

export type CommandHandler = (args: string[]) => Promise<TerminalLine[]>;

export const STATIC_COMMANDS: Record<string, CommandHandler> = {
  help: async () => [
    { id: '1', type: 'system', content: 'Available commands: about, experience, skills, projects, services, contact, clear', timestamp: new Date().toISOString() }
  ],
  whoami: async () => [
    { id: '2', type: 'output', content: 'Tito Agudelo — Senior Software Engineer & Mobile Architect', timestamp: new Date().toISOString() }
  ],
  ls: async () => [
    { id: '3', type: 'output', content: 'about.md  experience.md  skills.md  services.md  projects/', timestamp: new Date().toISOString() }
  ],
  // Comandos de lectura directa de knowledge/ en Fase 8
};

// Router Unificado:
export async function dispatchTerminalInput(input: string, isRAGEnabled: boolean): Promise<TerminalLine[]> {
  const trimmed = input.trim();
  const [cmd, ...args] = trimmed.split(' ');
  const normalizedCmd = cmd.toLowerCase();

  // 1. Si coincide con un comando estático del sistema, se ejecuta localmente (Fase 8)
  if (STATIC_COMMANDS[normalizedCmd]) {
    return STATIC_COMMANDS[normalizedCmd](args);
  }

  // 2. Si no es comando estático y RAG no está activo todavía (Fase 8), sugerir help
  if (!isRAGEnabled) {
    return [{
      id: crypto.randomUUID(),
      type: 'error',
      content: `Command not found: "${trimmed}". Type 'help' to see available system commands.`,
      timestamp: new Date().toISOString()
    }];
  }

  // 3. Si RAG está activo (Fase 10-11), canalizar como pregunta en lenguaje natural a /api/rag
  return queryRAGPipeline(trimmed);
}
```

### 4.2 — Ventajas de esta Arquitectura:
1. **Cero Duplicación de UI:** El mismo marco de terminal (`TerminalCore.tsx`), los mismos estilos tipográficos en `JetBrains Mono` y el cursor `#C9932E` manejan tanto los comandos básicos como las respuestas de IA complejas.
2. **Evolución No Destructiva:** Pasar de Fase 8 a Fase 11 es simplemente encender una bandera (`isRAGEnabled = true`) que conecta el fallback al endpoint de Python RAG sin modificar el componente de UI.
3. **Citas de Fuente Integradas:** Cuando el motor RAG responde, inyecta la propiedad `sourceCitation` que renderiza una etiqueta sutil en `JetBrains Mono 400`: `[Source: knowledge/projets/gametime.md]`, reforzando la credibilidad técnica.

---

## 5. Matriz de Cobertura de Verificación Factual

Para asegurar cumplimiento riguroso con la regla de **cero datos inventados**:

| Dato / Elemento en el Sitio | Fuente Verificada en Repo | Estado de Integridad |
|---|---|---|
| Años de Experiencia (15+ años) | [knowledge/experience.md#L5](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/experience.md#L5) | ✅ Verificado |
| Roles y Empresas (Gametime, Fanatics, TaskRabbit, Toptal, Huge) | [knowledge/experience.md#L11-L85](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/experience.md#L11-L85) | ✅ Verificado |
| Stack Móvil (React Native, Expo, Deep Linking, Push Notifications) | [knowledge/skills.md#L3-L11](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/skills.md#L3-L11) | ✅ Verificado |
| Stack Web & Backend (Next.js, TypeScript, Node.js, Python, FastAPI) | [knowledge/skills.md#L12-L28](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/skills.md#L12-L28) | ✅ Verificado |
| Oferta de Servicios (6 áreas de consultoría) | [knowledge/services.md#L1-L26](file:///Users/titoagudelo/Workspace/dev-with-tito/knowledge/services.md#L1-L26) | ✅ Verificado |
| Case Study Detallado: Fanatics | `knowledge/projets/fanatics.md` | 🛑 Marcado como **[BLOQUEANTE]** |
| Métricas Cuantitativas Específicas (% o cifras) | N/A en knowledge actual | ⚠️ Marcado como **[PENDIENTE]** |

---

## 6. Próximo Paso (Transición a Fase 3)

Con la **Dirección Creativa ([creative-direction.md](file:///Users/titoagudelo/Workspace/dev-with-tito/creative-direction.md))** y la **Arquitectura de Información ([information-architecture.md](file:///Users/titoagudelo/Workspace/dev-with-tito/information-architecture.md))** completadas y verificadas bajo el esquema 1:1:
- Proceder a la **Fase 3:** Build Estructural en Next.js 16 (`src/sections/`: infrastructure, system, product, experience, business) + Formulario de Contacto + Calendly + Analytics instrumentado desde el día 1, conforme al [Plan Maestro v2 (MARKDOWN.md)](file:///Users/titoagudelo/Workspace/dev-with-tito/MARKDOWN.md#L57).
