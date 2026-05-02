import type { SceneContractV1 } from "../sceneContract.v1";

/** Placeholder compartido hasta que existan stems definitivos. */
export const PLACEHOLDER_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const MATRIZ_TEXT_ONLY: SceneContractV1 = {
  schemaVersion: 1,
  id: "fam_matriz_v1_text_only",
  familyId: "matriz",
  variantId: "text_only",
  mode: "text_only",
  act: "II",
  layer: "espina",
  objective: "Solo lectura: el descubrimiento de la matriz sin capa sonora.",
  narrativeCost: ["clarity_loss"],
  trigger: { type: "on_open_file", detail: "/registry/matriz_implantacion" },
  text: {
    title: "Matriz de implantación · solo texto",
    subtitle: "variante sin paisaje sonoro",
    body: [
      "Emil encuentra la cuadrícula donde las emociones fueron asignadas como campos de formulario.",
      "No hay música: el silencio es aquí una elección narrativa, no un olvido técnico.",
      "Una X en «Culpa» deja de ser metáfora y pasa a ser dato."
    ]
  },
  presentation: { readerMode: "editorial", transition: "fade", readingTimeLabel: "lectura en seco" },
  audio: {
    engine: "silence",
    mix: { baseGain: 0 }
  },
  meta: { authorFacingPriority: "A", notes: "Fase 2 · familia matriz · variante 1/4" }
};

export const MATRIZ_AUDIO_ONLY: SceneContractV1 = {
  schemaVersion: 1,
  id: "fam_matriz_v1_audio_only",
  familyId: "matriz",
  variantId: "audio_only",
  mode: "audio_only",
  act: "II",
  layer: "espina",
  objective:
    "Priorizar temporalidad sonora sobre explicación verbal: matriz percibida como ritmo/atmosfera antes que como tabla.",
  narrativeCost: ["order_shift", "memory_loss"],
  trigger: { type: "on_enter_scene", detail: "matriz.room" },
  text: {
    title: "Matriz · canal sonoro",
    subtitle: "mínimo verbal — placeholder de producción",
    body: [
      "Lo que ves es solo ancoral: el contenido verdadero llega por oído."
    ]
  },
  presentation: { readerMode: "scroll", transition: "none", readingTimeLabel: "placeholder" },
  audio: {
    engine: "file",
    assets: [{ id: "matriz-placeholder", url: PLACEHOLDER_AUDIO_URL, label: "matriz_placeholder" }],
    mix: { baseGain: 0.55, fadeInMs: 400, fadeOutMs: 400, duckText: false },
    proceduralRules: [],
    degradation: {
      enabled: true,
      strategy: "continuous",
      affects: ["clarity"],
      maxAmount: 0.35
    }
  },
  meta: { authorFacingPriority: "B", notes: "Fase 2 · familia matriz · variante 2/4" }
};

export const MATRIZ_HYBRID: SceneContractV1 = {
  schemaVersion: 1,
  id: "fam_matriz_v1_hybrid",
  familyId: "matriz",
  variantId: "hybrid",
  mode: "hybrid",
  act: "II",
  layer: "espina",
  objective:
    "Mezcla lectura institucional y capa sonora placeholder: mismo evento narrativo que text_only/audio_only pero en tensión simultánea.",
  narrativeCost: ["clarity_loss", "memory_loss"],
  trigger: { type: "on_read_progress", detail: ">0.4" },
  text: {
    title: "Matriz de implantación · lectura + paisaje",
    subtitle: "variante hybrid (sandbox)",
    body: [
      "La tabla no juzga; solo clasifica.",
      "Cada casilla marca un afecto sin preguntarte si lo vives así.",
      "Sientes el mismo hallazgo con el cuerpo (texto) y con el tiempo (audio placeholder)."
    ]
  },
  presentation: {
    readerMode: "editorial",
    transition: "fade",
    readingTimeLabel: "lectura paralela"
  },
  audio: {
    engine: "file",
    assets: [{ id: "matriz-layer", url: PLACEHOLDER_AUDIO_URL, label: "matriz_placeholder_b" }],
    mix: { baseGain: 0.35, fadeInMs: 600, fadeOutMs: 450, duckText: true }
  },
  salida: {
    stopAudioOnExit: true,
    emitFlags: ["heard_matriz_placeholder"]
  },
  telemetry: { emit: true, eventName: "matriz_family_lab_hybrid" },
  meta: { authorFacingPriority: "A", notes: "Fase 2 · familia matriz · variante 3/4" }
};

export const MATRIZ_APOCRYPHA: SceneContractV1 = {
  schemaVersion: 1,
  id: "fam_matriz_v1_apocrypha",
  familyId: "matriz",
  variantId: "apocrifa",
  mode: "hybrid",
  act: "II",
  layer: "apocrypha",
  objective:
    "Misma fuente oficial con aparato apócrifo: la glosa compite con la espina y desplaza legitimidad.",
  narrativeCost: ["attribution_doubt", "clarity_loss"],
  trigger: { type: "manual", detail: "cámara apócrifa" },
  text: {
    title: "Matriz — edición no autorizada",
    subtitle: "nota del compilador (identidad provisional)",
    body: [
      "La matriz aparece igual que en el archivo oficial.",
      "Al lado, alguien pegó una columna. El texto insiste: «No preguntes por qué estaba esa X. Nevet siguió el procedimiento cuando el procedimiento ya no quería preguntarse nada.»",
      "El expediente habla de diseño e intención. Esta glosa sólo registra sospechas de omisión institucional: quien compile decide qué pesa más."
    ]
  },
  presentation: {
    readerMode: "hypertext",
    transition: "slide",
    readingTimeLabel: "lectura bifurcada"
  },
  audio: {
    engine: "file",
    assets: [{ id: "matriz-glitch-soft", url: PLACEHOLDER_AUDIO_URL, stemGroup: "apocrypha" }],
    mix: { baseGain: 0.25, duckText: true, fadeInMs: 200, fadeOutMs: 300 }
  },
  meta: { authorFacingPriority: "A", notes: "Fase 2 · familia matriz · variante 4/4 · Cámara apócrifa" }
};

export const MATRIZ_FAMILY_V1: SceneContractV1[] = [
  MATRIZ_TEXT_ONLY,
  MATRIZ_AUDIO_ONLY,
  MATRIZ_HYBRID,
  MATRIZ_APOCRYPHA
];
