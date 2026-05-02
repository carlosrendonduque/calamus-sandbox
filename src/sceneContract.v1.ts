/**
 * SceneContract v1 — Cromosilencia / Nullheim
 *
 * Contrato único de escena: narrativa + presentación + sonido opcional + estado/triggers.
 * Uso previsto: definir variantes dentro de una misma familia (poema / set / narración / apócrifa).
 *
 * Este archivo es el entregable de Fase 1 · Tarea 1.1. No ejecuta audio ni UI; solo tipa contratos.
 */

// ---------------------------------------------------------------------------
// Core presentation
// ---------------------------------------------------------------------------

export type SceneMode = "text_only" | "audio_only" | "hybrid";

export type NarrativeLayer =
  | "espina"
  | "voces"
  | "sustrato"
  | "erosion"
  | "apocrypha";

export type ActPhase = "I" | "II" | "III" | "COLLAPSE";

export type NarrativeCost =
  | "clarity_loss"
  | "memory_loss"
  | "order_shift"
  | "attribution_doubt"
  | "access_lock";

export type TriggerType =
  | "on_enter_scene"
  | "on_open_file"
  | "on_read_progress"
  | "on_command"
  | "on_state_change"
  | "manual";

/** Estado narrativo mínimo que el sistema puede usar para orden, sonificación procedural, etc. */
export type NarrativeStateRef = {
  iteration?: number;
  memoryPercent?: number;
  corruptionLevel?: number;
  flags?: string[];
  currentPath?: string;
  sceneFamily?: string;
  variant?: string;
};

// ---------------------------------------------------------------------------
// Text / rich content (agnóstico de renderer: Calamus u otro)
// ---------------------------------------------------------------------------

/**
 * Payload textual básico. `body` es lo que típicamente consume ReaderContent.body[]
 * cuando mode incluye texto.
 */
export type SceneTextPayload = {
  title: string;
  subtitle?: string;
  body: string[];
};

// ---------------------------------------------------------------------------
// Audio subsystem (tipo + config; placeholders permitidos hasta producción)
// ---------------------------------------------------------------------------

export type AudioEngineType =
  | "silence"
  | "file"
  | "generative"
  | "procedural"
  | "sonification"
  | "glitch"
  | "textual"; // comandos/texto disparan capas sonoras según mapping externo

export type AudioAssetRef = {
  id: string;
  url?: string;
  stemGroup?: string;
  label?: string;
};

export type GenerativeConfig = {
  seedKey?: string;
  bpm?: number;
  scale?: string;
  density?: number;
  maxVoices?: number;
};

export type ProceduralRule = {
  when: {
    field: keyof NarrativeStateRef | "event";
    op: "eq" | "gt" | "lt" | "includes";
    value: string | number;
  };
  then: {
    bpmDelta?: number;
    gainDelta?: number;
    filterCutoff?: number;
    layerOn?: string[];
    layerOff?: string[];
    glitchAmount?: number;
  };
};

export type SonificationMap = {
  inputField: "memoryPercent" | "corruptionLevel" | "iteration";
  targetParam: "pitch" | "gain" | "filter" | "tempo";
  rangeIn: [number, number];
  rangeOut: [number, number];
};

export type SceneAudioBlock = {
  engine: AudioEngineType;
  assets?: AudioAssetRef[];
  generative?: GenerativeConfig;
  proceduralRules?: ProceduralRule[];
  sonification?: SonificationMap[];
  mix?: {
    baseGain?: number;
    fadeInMs?: number;
    fadeOutMs?: number;
    /** Si true: bajar música mientras hay bloque textual denso activo */
    duckText?: boolean;
    silenceWindowsMs?: Array<{ startMs: number; endMs: number }>;
  };
  degradation?: {
    enabled: boolean;
    strategy: "step" | "continuous";
    affects: Array<"tempo" | "pitch" | "clarity" | "dropouts" | "bitcrush">;
    maxAmount?: number;
  };
};

// ---------------------------------------------------------------------------
// SceneContract v1 (raíz)
// ---------------------------------------------------------------------------

export type SceneContractV1 = {
  schemaVersion: 1;

  /** Identificación */
  id: string;
  familyId: string;
  variantId: string;

  mode: SceneMode;
  act: ActPhase;
  layer: NarrativeLayer;

  /** Dramaturgia */
  objective: string;
  narrativeCost: NarrativeCost[];

  /** Si true: debe ejecutarse una sola vez en el canon (equiv. gesto tipo rojo irrepetible) */
  uniqueEvent?: boolean;

  /** Activación */
  trigger: {
    type: TriggerType;
    detail?: string;
  };
  prerequisitesFlag?: string[];
  forbiddenIfFlag?: string[];

  /** Contenido cuando mode es text_only o hybrid */
  text?: SceneTextPayload;

  /** Calamus hints (solo si el renderer es Calamus): no obligatorio en obra */
  presentation?: {
    readerMode?: "scroll" | "book" | "terminal" | "editorial" | "hypertext";
    transition?: "fade" | "slide" | "none";
    readingTimeLabel?: string;
  };

  /** Sonido: opcional; silence explícito es válido en text-heavy */
  audio?: SceneAudioBlock;

  salida?: {
    stopAudioOnExit?: boolean;
    residualAudio?: boolean;
    lockVariantAfterComplete?: boolean;
    emitFlags?: string[];
  };

  telemetry?: {
    emit: boolean;
    eventName?: string;
  };

  meta?: {
    notes?: string;
    authorFacingPriority?: "A" | "B" | "C";
  };
};

// ---------------------------------------------------------------------------
// Ejemplo mínimo (referencia rápida; no ejecutar desde runtime obligatorio)
// ---------------------------------------------------------------------------

/** Alias del híbrido canónico de `families/matrizFamily.v1.ts` (única fuente de verdad). */
export { MATRIZ_HYBRID as EXAMPLE_SCENE_MATRIZ_HYBRID } from "./families/matrizFamily.v1";

export const EXAMPLE_SCENE_CONEXION_HYBRID: SceneContractV1 = {
  schemaVersion: 1,
  id: "A2_conexion_emil_nevet_hybrid_placeholder",
  familyId: "conexion_emil_nevet",
  variantId: "hybrid",
  mode: "hybrid",
  act: "III",
  layer: "espina",
  objective:
    "Hacer audible el tránsito de registro técnico a experiencia sensible compartida.",
  narrativeCost: ["memory_loss", "order_shift"],
  uniqueEvent: false,
  trigger: { type: "on_state_change", detail: "link.emil_nevet=connected" },
  prerequisitesFlag: ["revealed_iterations"],
  text: {
    title: "Conexión Emil-Nevet — variante hybrid",
    subtitle: "de procesamiento a cualia",
    body: [
      "Nevet se conecta como procesador auxiliar al sustrato híbrido de Emil.",
      "Lo que antes era solo registro empieza a sentirse como experiencia."
    ],
  },
  presentation: {
    readerMode: "hypertext",
    transition: "slide",
    readingTimeLabel: "transición estimada"
  },
  audio: {
    engine: "procedural",
    assets: [
      {
        id: "conexion-bed-placeholder",
        url: "/audio/placeholders/conexion-bed.mp3",
        label: "base clínica placeholder"
      },
      {
        id: "conexion-organic-placeholder",
        url: "/audio/placeholders/conexion-organic.mp3",
        stemGroup: "organic",
        label: "capa orgánica placeholder"
      }
    ],
    proceduralRules: [
      {
        when: { field: "event", op: "eq", value: "nevet_first_quale" },
        then: {
          bpmDelta: -8,
          gainDelta: 0.12,
          layerOn: ["organic"],
          glitchAmount: 0.1
        }
      },
      {
        when: { field: "memoryPercent", op: "lt", value: 25 },
        then: {
          gainDelta: -0.2,
          layerOff: ["organic"],
          glitchAmount: 0.35
        }
      }
    ],
    mix: {
      baseGain: 0.4,
      fadeInMs: 800,
      fadeOutMs: 500,
      duckText: true
    },
    degradation: {
      enabled: true,
      strategy: "continuous",
      affects: ["clarity", "dropouts"],
      maxAmount: 0.45
    }
  },
  salida: {
    stopAudioOnExit: true,
    residualAudio: true,
    emitFlags: ["heard_conexion_placeholder"]
  },
  telemetry: { emit: true, eventName: "scene_contract_played" },
  meta: { authorFacingPriority: "A", notes: "Fase 1.2 segundo ejemplo validación" },
};
