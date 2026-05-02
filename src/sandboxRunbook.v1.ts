/**
 * Runbook lineal del sandbox: olas A–L + Biblia sonora + contrato.
 * El puntero vive en `sandboxRunbookState.ts`.
 */

export type SandboxRunbookStep = {
  id: string;
  /** Título corto para vos */
  title: string;
  /** Qué hacer en el sandbox (creativo o técnico) */
  summary: string;
  /** Dónde clicar en esta app (referencia textual) */
  whereInApp: string;
  /** Ancla mismo origen (scroll) cuando hay un sólo punto de entrada típico */
  jumpHref?: string;
  /** Paso 0: varios destinos rápidos */
  jumpLinks?: Array<{ label: string; href: string }>;
  /**
   * Instrucción para el asistente cuando el usuario diga «continua»:
   * no improvisar otros frentes (nullheim, paquete calamus, etc.) salvo que este texto lo mencione.
   */
  assistantInstruction: string;
};

export const SANDBOX_RUNBOOK_STEPS: readonly SandboxRunbookStep[] = [
  {
    id: "runbook-00-ad-smoke",
    title: "A–D · humo de hipertexto",
    summary: "Recorré una vuelta Hypertext Lab A–D para asegurar que el Reader aguanta tus experimentos antes de cargar Cromosilencia.",
    whereInApp:
      "Encabezados con ancla `#sandbox-ola-a`, `#sandbox-ola-b`, `#sandbox-ola-c`, `#sandbox-ola-d` (mismo origen, scroll al cargar `/...#sandbox-ola-a`).",
    assistantInstruction:
      "No tocar nullheim ni refactors grandes. Opcional: si hay fricción obvia en un caso A-D, sólo correcciones UX mínimas. Al terminar, incrementá SANDBOX_RUNBOOK_STEP_INDEX.",
    jumpLinks: [
      { label: "Ola A", href: "#sandbox-ola-a" },
      { label: "Ola B", href: "#sandbox-ola-b" },
      { label: "Ola C", href: "#sandbox-ola-c" },
      { label: "Ola D", href: "#sandbox-ola-d" }
    ]
  },
  {
    id: "runbook-01-ola-e",
    title: "Ola E · Cromosilencia (exploración)",
    summary: "Sacá jugo narrativo canon / Nullheim en modo laboratorio; anotá la primera línea de Biblia sonora: ¿silencio, capa archivo o otro motor para esta ola?",
    whereInApp:
      "Encabezado `#sandbox-ola-e` · Hypertext Lab - Ola E (cromosilencia). Notas: panel «Biblia sonora · borrador local» arriba (misma página).",
    assistantInstruction:
      "Si falta contenido reusable en algún caso E, ampliá copy o checklist en ese caso sólo si el usuario pidió contenido explícito. No saltar a I-L ni nullheim. Al cerrar paso: incrementá índice.",
    jumpHref: "#sandbox-ola-e"
  },
  {
    id: "runbook-02-ola-f",
    title: "Ola F · Voces / polifonía",
    summary: "Exploración de voces; Biblia sonora: cómo distinguís capas (quién narra vs quién contradictice en audio).",
    whereInApp: "Encabezado `#sandbox-ola-f`. Biblia: fila F en el borrador local arriba.",
    assistantInstruction:
      "Cambios de código sólo dentro de casos hipertexto F si hacen falta. No matriz/nullheim salvo pedido explícito. Incrementá índice al terminar.",
    jumpHref: "#sandbox-ola-f"
  },
  {
    id: "runbook-03-ola-g",
    title: "Ola G · Reglas de sistema",
    summary: "Reglas y protocolos narrativos; Biblia sonora: ¿trigger procedural, glitch, texto-como-cue?",
    whereInApp: "Encabezado `#sandbox-ola-g`. Biblia: fila G en el borrador local arriba.",
    assistantInstruction:
      "Mantén el foco en sandbox y reglas declaradas en casos G. Incrementá índice al terminar.",
    jumpHref: "#sandbox-ola-g"
  },
  {
    id: "runbook-04-ola-h",
    title: "Ola H · Finales y colapso",
    summary: "Cierres y colapsos; Biblia sonora: qué se apaga o degrada al final del acto.",
    whereInApp: "Encabezado `#sandbox-ola-h`. Biblia: fila H en el borrador local arriba.",
    assistantInstruction:
      "Sin nullheim. Sólo ajustes localizados a casos H si el usuario los pide. Incrementá índice al terminar.",
    jumpHref: "#sandbox-ola-h"
  },
  {
    id: "runbook-05-ola-i",
    title: "Ola I · Compás / curaduría",
    summary: "Pasaje de exploración a decisión editorial: brújula canónica, qué entra en sprint.",
    whereInApp: "Encabezado `#sandbox-ola-i`. Biblia: fila I en el borrador local arriba.",
    assistantInstruction:
      "Si hace falta un caso nuevo en I por brief del usuario, agregalo. No confundir con SceneContract hasta el paso de volcado. Incrementá índice.",
    jumpHref: "#sandbox-ola-i"
  },
  {
    id: "runbook-06-ola-j",
    title: "Ola J · Packs de voz",
    summary: "Consolidá elecciones de voz como paquete; Biblia sonora por personaje o capa.",
    whereInApp: "Encabezado `#sandbox-ola-j`. Biblia: fila J en el borrador local arriba.",
    assistantInstruction:
      "Ámbito J sólo. Incrementá índice al terminar.",
    jumpHref: "#sandbox-ola-j"
  },
  {
    id: "runbook-07-ola-k",
    title: "Ola K · Presets de reglas",
    summary: "Reglas compiladas listas para ensayo; relacionar con cues sonoras duras.",
    whereInApp: "Encabezado `#sandbox-ola-k`. Biblia: fila K en el borrador local arriba.",
    assistantInstruction:
      "Ámbito K sólo. Incrementá índice al terminar.",
    jumpHref: "#sandbox-ola-k"
  },
  {
    id: "runbook-08-ola-l",
    title: "Ola L · Cierre curado → sprint",
    summary: "Salida ejecutable del laboratorio narrativo antes de código de obra.",
    whereInApp: "Encabezado `#sandbox-ola-l`. Biblia: fila L en el borrador local arriba.",
    assistantInstruction:
      "Ámbito L sólo. Incrementá índice al terminar.",
    jumpHref: "#sandbox-ola-l"
  },
  {
    id: "runbook-09-biblia-contract",
    title: "Biblia sonora ↔ SceneContract",
    summary: "Volcá cues E-L a forma contractual: stubs en `sceneContract`/familia o nueva familia cuando tengáis nombre.",
    whereInApp: "Archivos `sceneContract.v1.ts`, `src/families/`, más abajo «SceneContract Lab — familia matriz». Ancla rápido `#sandbox-scenecontract-lab`.",
    assistantInstruction:
      "Implementá el volcado mínimo acordado (nueva escena, familia, o tabla en UI que serialice a JSON copiable). No nullheim hasta el paso 11. Incrementá índice.",
    jumpHref: "#sandbox-scenecontract-lab"
  },
  {
    id: "runbook-10-contract-qa",
    title: "QA · contrato vs decisiones I–L",
    summary: "Revisá que MATRIZ (u otras familias nuevas) reflejan lo que cerraste en I–L; ajustá JSON de ejemplo.",
    whereInApp: "MatrizFamilyLab + JSON desplegable + copiar al portapapeles (`#sandbox-scenecontract-lab`).",
    assistantInstruction:
      "Sólo ajustes de contrato y texto de ejemplo. Incrementá índice.",
    jumpHref: "#sandbox-scenecontract-lab"
  },
  {
    id: "runbook-11-nullheim-handoff",
    title: "Handoff · primer consumo en nullheim",
    summary: "Una escena o ruta diegética en nullheim (experiencia propia, no Scriptorium) que lea el contrato o JSON exportado desde sandbox.",
    whereInApp: "Proyecto `nullheim/` (fuera del sandbox).",
    assistantInstruction:
      "Recién aquí integrar nullheim de forma ejecutable; antes no. Regla dura: este handoff NO va en Scriptorium, debe quedar como experiencia separada de nullheim con identidad propia. Incrementá índice al completar handoff inicial o marcá README de estado."
  }
];

export const SANDBOX_RUNBOOK_STEP_TOTAL = SANDBOX_RUNBOOK_STEPS.length;
