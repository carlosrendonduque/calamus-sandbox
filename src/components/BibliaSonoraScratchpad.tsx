import { useCallback, useEffect, useMemo, useState } from "react";
import { MATRIZ_HYBRID } from "../families/matrizFamily.v1";

const STORAGE_KEY = "calamus-sandbox.biblia.v1";

type OlaKey = "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l";

const ROWS: Array<{ key: OlaKey; label: string }> = [
  { key: "e", label: "Ola E · Cromosilencia" },
  { key: "f", label: "Ola F · Voces" },
  { key: "g", label: "Ola G · Reglas sistema" },
  { key: "h", label: "Ola H · Finales / colapso" },
  { key: "i", label: "Ola I · Compás curatorio" },
  { key: "j", label: "Ola J · Packs voz" },
  { key: "k", label: "Ola K · Presets reglas" },
  { key: "l", label: "Ola L · Cierre sprint" }
];

function emptyDraft(): Record<OlaKey, string> {
  return { e: "", f: "", g: "", h: "", i: "", j: "", k: "", l: "" };
}

const CASE_A: Record<OlaKey, string> = {
  e: "silence + pulso grave cada 8s",
  f: "voces secas sin cama",
  g: "triggers mínimos sin glitches",
  h: "cierre en silencio total",
  i: "curaduría austera",
  j: "pack Emil crudo",
  k: "preset de contención",
  l: "salida sobria para sprint"
};

const CASE_B: Record<OlaKey, string> = {
  e: "file + cama institucional suave",
  f: "Nevet sobre textura leve",
  g: "ducking al leer bloques largos",
  h: "degradación suave al final",
  i: "curaduría de contraste",
  j: "pack Nevet editorial",
  k: "preset con capa sonora activa",
  l: "cierre con eco residual"
};

function parseStored(): Record<OlaKey, string> {
  const base = emptyDraft();
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out = { ...base };
    for (const k of Object.keys(base) as OlaKey[]) {
      const v = parsed[k];
      if (typeof v === "string") out[k] = v;
    }
    return out;
  } catch {
    return base;
  }
}

export default function BibliaSonoraScratchpad() {
  const [draft, setDraft] = useState<Record<OlaKey, string>>(parseStored);
  const [copyHint, setCopyHint] = useState<null | "json_ok" | "url_ok" | "err">(null);
  const [nullheimBaseUrl, setNullheimBaseUrl] = useState("http://localhost:3000");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* noop */
    }
  }, [draft]);

  const payloadJson = useMemo(() => JSON.stringify(draft, null, 2), [draft]);

  const handoffScenePayload = useMemo(() => {
    const bibliaCompact = Object.fromEntries(
      Object.entries(draft).filter(([, v]) => v.trim().length > 0)
    ) as Partial<Record<OlaKey, string>>;
    const bibliaSuffix =
      Object.keys(bibliaCompact).length > 0
        ? ` · Biblia sonora: ${Object.entries(bibliaCompact)
            .map(([k, v]) => `${k.toUpperCase()}=${v}`)
            .join(" | ")}`
        : "";
    return {
      scene: {
        ...MATRIZ_HYBRID,
        meta: {
          ...MATRIZ_HYBRID.meta,
          notes: `${MATRIZ_HYBRID.meta?.notes ?? "Matriz handoff"}${bibliaSuffix}`
        }
      },
      biblia: bibliaCompact
    };
  }, [draft]);

  const handoffSceneJson = useMemo(
    () => JSON.stringify(handoffScenePayload),
    [handoffScenePayload]
  );

  const encodeBase64UrlUtf8 = useCallback((value: string) => {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    const b64 = window.btoa(binary);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }, []);

  const handoffUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const token = encodeBase64UrlUtf8(handoffSceneJson);
    const base = nullheimBaseUrl.trim().replace(/\/+$/, "");
    return `${base}/matriz-handoff?scene=${token}`;
  }, [encodeBase64UrlUtf8, handoffSceneJson, nullheimBaseUrl]);

  const copyPayload = useCallback(async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) throw new Error("no clipboard");
      await navigator.clipboard.writeText(payloadJson);
      setCopyHint("json_ok");
    } catch {
      setCopyHint("err");
    }
    window.setTimeout(() => setCopyHint(null), 2000);
  }, [payloadJson]);

  const copyHandoffUrl = useCallback(async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) throw new Error("no clipboard");
      await navigator.clipboard.writeText(handoffUrl);
      setCopyHint("url_ok");
    } catch {
      setCopyHint("err");
    }
    window.setTimeout(() => setCopyHint(null), 2200);
  }, [handoffUrl]);

  const setLine = useCallback((key: OlaKey, value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
  }, []);

  const loadCase = useCallback((caseDraft: Record<OlaKey, string>) => {
    setDraft(caseDraft);
  }, []);

  return (
    <div
      style={{
        marginTop: 14,
        paddingTop: 14,
        borderTop: "1px dashed var(--calamus-terminal-border)"
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          fontFamily: "var(--calamus-mono-font)",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--calamus-terminal-muted)"
        }}
      >
        Biblia sonora · borrador local (E–L)
      </p>
      <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.5, color: "var(--calamus-terminal-fg)" }}>
        Una línea por ola: motor pensado (<code style={{ fontSize: "0.92em" }}>silence</code>,{" "}
        <code style={{ fontSize: "0.92em" }}>file</code>, <code style={{ fontSize: "0.92em" }}>procedural</code>…).
        Se guarda en este navegador; al final podés copiar JSON y testear contra el SceneContract Lab.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => loadCase(CASE_A)}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid var(--calamus-terminal-border)",
            background: "var(--calamus-panel)",
            color: "var(--calamus-terminal-emphasis)",
            fontFamily: "var(--calamus-mono-font)",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          Cargar Caso A (silence)
        </button>
        <button
          type="button"
          onClick={() => loadCase(CASE_B)}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid var(--calamus-terminal-border)",
            background: "var(--calamus-panel)",
            color: "var(--calamus-terminal-emphasis)",
            fontFamily: "var(--calamus-mono-font)",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          Cargar Caso B (file)
        </button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {ROWS.map((row) => (
          <label key={row.key} style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--calamus-terminal-emphasis)", fontFamily: "var(--calamus-mono-font)" }}>
              {row.label}
            </span>
            <textarea
              value={draft[row.key]}
              onChange={(ev) => setLine(row.key, ev.target.value)}
              rows={2}
              spellCheck={false}
              placeholder="Ej: silence + clic mecánico al marcar celda…"
              style={{
                resize: "vertical",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid var(--calamus-terminal-border)",
                background: "var(--calamus-terminal-background, rgba(0,0,0,0.25))",
                color: "var(--calamus-terminal-fg)",
                fontFamily: "var(--calamus-mono-font)",
                fontSize: 12,
                lineHeight: 1.45
              }}
            />
          </label>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
        <button
          type="button"
          onClick={() => {
            void copyPayload();
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid var(--calamus-terminal-border)",
            background: "var(--calamus-panel)",
            color: "var(--calamus-terminal-emphasis)",
            fontFamily: "var(--calamus-mono-font)",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          Copiar JSON (E–L)
        </button>
        <button
          type="button"
          onClick={() => {
            void copyHandoffUrl();
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid var(--calamus-terminal-border)",
            background: "var(--calamus-panel)",
            color: "var(--calamus-terminal-emphasis)",
            fontFamily: "var(--calamus-mono-font)",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          Copiar URL handoff nullheim
        </button>
        {copyHint === "json_ok" ? (
          <span style={{ fontSize: 12, color: "var(--calamus-terminal-muted)" }}>JSON copiado</span>
        ) : null}
        {copyHint === "url_ok" ? (
          <span style={{ fontSize: 12, color: "var(--calamus-terminal-muted)" }}>URL handoff copiada</span>
        ) : null}
        {copyHint === "err" ? (
          <span style={{ fontSize: 12, color: "var(--calamus-terminal-emphasis)" }}>Clipboard no disponible</span>
        ) : null}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Base nullheim
          <input
            value={nullheimBaseUrl}
            onChange={(ev) => setNullheimBaseUrl(ev.target.value)}
            spellCheck={false}
            style={{
              width: 220,
              borderRadius: 6,
              border: "1px solid var(--calamus-terminal-border)",
              background: "var(--calamus-terminal-background, rgba(0,0,0,0.25))",
              color: "var(--calamus-terminal-fg)",
              padding: "4px 6px",
              fontSize: 11,
              fontFamily: "var(--calamus-mono-font)"
            }}
          />
        </label>
        <span style={{ fontSize: 11, color: "var(--calamus-terminal-muted)" }}>
          clave storage: <code style={{ fontSize: "0.92em" }}>{STORAGE_KEY}</code>
        </span>
      </div>
    </div>
  );
}
