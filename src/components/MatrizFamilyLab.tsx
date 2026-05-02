import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reader, type ReaderMode } from "calamus";
import type { SceneContractV1 } from "../sceneContract.v1";
import { MATRIZ_FAMILY_V1 } from "../families/matrizFamily.v1";

function audioEngineSummary(scene: SceneContractV1): string {
  const audio = scene.audio;
  if (!audio) return "sin bloque audio en contrato";

  switch (audio.engine) {
    case "silence":
      return "engine: silence (capa neutra declarada)";
    case "file": {
      const a = audio.assets?.[0];
      return `engine: file · asset: ${a?.id ?? "?"} (${a?.label ?? "sin etiqueta"})`;
    }
    case "generative":
      return `engine: generative · seed=${audio.generative?.seedKey ?? "—"} · bpm=${audio.generative?.bpm ?? "—"}`;
    case "procedural":
      return `engine: procedural · reglas: ${audio.proceduralRules?.length ?? 0}`;
    case "sonification":
      return `engine: sonification · mapas: ${audio.sonification?.length ?? 0}`;
    case "glitch":
      return "engine: glitch (placeholder — sin motor en sandbox)";
    case "textual":
      return "engine: textual (placeholders externos)";
  }
}

export default function MatrizFamilyLab() {
  const [idx, setIdx] = useState(0);
  const [copyHint, setCopyHint] = useState<null | "ok" | "err">(null);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scene = MATRIZ_FAMILY_V1[idx];

  const readerMode: ReaderMode = scene.presentation?.readerMode ?? "scroll";
  const content = useMemo(
    () => ({
      title: scene.text?.title ?? scene.id,
      subtitle: scene.text?.subtitle,
      body: scene.text?.body ?? []
    }),
    [scene]
  );

  const transition = scene.presentation?.transition ?? "fade";

  const sceneJson = useMemo(() => JSON.stringify(scene, null, 2), [scene]);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
    };
  }, []);

  useEffect(() => {
    setCopyHint(null);
    if (copyResetRef.current) {
      clearTimeout(copyResetRef.current);
      copyResetRef.current = null;
    }
  }, [scene.id]);

  const copySceneJson = useCallback(async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        throw new Error("Clipboard API no disponible");
      }
      await navigator.clipboard.writeText(sceneJson);
      setCopyHint("ok");
    } catch {
      setCopyHint("err");
    }
    if (copyResetRef.current) clearTimeout(copyResetRef.current);
    copyResetRef.current = setTimeout(() => {
      setCopyHint(null);
      copyResetRef.current = null;
    }, 2200);
  }, [sceneJson]);

  const fileAsset =
    scene.audio?.engine === "file" ? scene.audio.assets?.find((a) => a.url) : undefined;

  const isApocrifa = scene.variantId === "apocrifa";

  const readerInner = (
    <Reader mode={readerMode} content={content} transition={transition}>
      {isApocrifa ? (
        <aside
          style={{
            marginTop: 16,
            padding: "12px 14px",
            border: "1px solid var(--calamus-terminal-border, var(--calamus-border))",
            borderRadius: 10,
            background: "rgba(240, 217, 168, 0.08)",
            fontSize: 13,
            lineHeight: 1.45,
            color: "var(--calamus-terminal-muted, var(--calamus-muted))"
          }}
        >
          <strong style={{ display: "block", marginBottom: 8, color: "var(--calamus-terminal-emphasis, var(--calamus-accent))" }}>
            Cámara apócrifa (sidebar)
          </strong>
          <span>
            Glosa paralela · layer <code>{scene.layer}</code> · costes: {scene.narrativeCost.join(", ")} ·
            objetivo contractual resumido en panel superior.
          </span>
        </aside>
      ) : null}
    </Reader>
  );

  return (
    <div id="sandbox-scenecontract-lab">
      <div style={{ margin: "0 auto 12px", padding: "0 4px" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--calamus-mono-font)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
          SceneContract Lab — familia matriz (4 variantes · Fase 2)
        </h2>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--calamus-terminal-fg)", lineHeight: 1.5 }}>
          Cuatro contratos v1 coherentes (<code>text_only</code>, <code>audio_only</code>, <code>hybrid</code>,{" "}
          <code>apocrifa</code>). Lectura con Calamus Reader; archivo MP3 sólo cuando <code>audio.engine === "file"</code>;
          otros engines se listan como metadatos hasta integrar Tone u orquestadores.
        </p>
      </div>
      <div style={{ margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {MATRIZ_FAMILY_V1.map((s, i) => {
            const selected = i === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setIdx(i)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"}`,
                  background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)",
                  color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)",
                  cursor: "pointer"
                }}
              >
                <strong style={{ display: "block" }}>
                  {s.variantId}
                  {" "}
                  <span style={{ fontWeight: 400, opacity: 0.85 }}>(mode: {s.mode})</span>
                </strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
                  id: <code>{s.id}</code> · acto {s.act} · capa {s.layer}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ margin: "0 auto 70px" }}>
        <div
          style={{
            border: "1px solid var(--calamus-terminal-border)",
            borderRadius: 12,
            padding: 12,
            background: "var(--calamus-panel)"
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontFamily: "var(--calamus-mono-font)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--calamus-terminal-muted)"
            }}
          >
            Contrato activo: {scene.id}
          </p>

          <div
            style={{
              marginBottom: 14,
              padding: "10px 12px",
              borderRadius: 8,
              background: "var(--calamus-terminal-background, rgba(0,0,0,0.2))",
              fontSize: 13,
              lineHeight: 1.55,
              border: "1px solid var(--calamus-terminal-border)"
            }}
          >
            <div>
              <strong>Objetivo: </strong>
              <span>{scene.objective}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>Trigger: </strong>
              <span>
                {scene.trigger.type}
                {scene.trigger.detail ? ` (${scene.trigger.detail})` : ""}
              </span>
            </div>
            <div style={{ marginTop: 8, fontFamily: "var(--calamus-mono-font)", fontSize: 12 }}>
              {audioEngineSummary(scene)}
            </div>
            {scene.meta?.notes ? (
              <div style={{ marginTop: 8, color: "var(--calamus-terminal-muted)", fontSize: 12 }}>
                {scene.meta.notes}
              </div>
            ) : null}
          </div>

          <details
            style={{
              marginBottom: 14,
              borderRadius: 8,
              border: "1px solid var(--calamus-terminal-border)",
              background: "rgba(0,0,0,0.12)",
              overflow: "hidden"
            }}
          >
            <summary
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "8px 12px",
                cursor: "pointer",
                fontFamily: "var(--calamus-mono-font)",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--calamus-terminal-emphasis)",
                userSelect: "none",
                listStyle: "none"
              }}
            >
              <span>Contrato como JSON · depuración</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {copyHint === "ok" ? (
                  <span style={{ textTransform: "none", letterSpacing: "normal", color: "var(--calamus-terminal-muted)", fontSize: 11 }}>
                    Copiado
                  </span>
                ) : null}
                {copyHint === "err" ? (
                  <span style={{ textTransform: "none", letterSpacing: "normal", color: "var(--calamus-terminal-emphasis)", fontSize: 11 }}>
                    No se pudo copiar
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void copySceneJson();
                  }}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: "1px solid var(--calamus-terminal-border)",
                    background: "var(--calamus-panel)",
                    color: "var(--calamus-terminal-fg)",
                    fontFamily: "var(--calamus-mono-font)",
                    fontSize: 11,
                    textTransform: "none",
                    letterSpacing: "normal",
                    cursor: "pointer"
                  }}
                >
                  Copiar JSON
                </button>
              </span>
            </summary>
            <pre
              style={{
                margin: 0,
                padding: "10px 12px 14px",
                overflow: "auto",
                maxHeight: 340,
                fontSize: 11,
                lineHeight: 1.45,
                borderTop: "1px solid var(--calamus-terminal-border)",
                fontFamily: "var(--calamus-mono-font)",
                color: "var(--calamus-terminal-fg)"
              }}
              tabIndex={0}
            >
              {sceneJson}
            </pre>
          </details>

          {readerInner}

          {fileAsset?.url ? (
            <div style={{ marginTop: 14 }}>
              <p style={{ margin: "0 0 6px", fontSize: 12, color: "var(--calamus-terminal-muted)" }}>
                Audio (placeholder reproducible por el navegador)
              </p>
              <audio controls preload="none" style={{ width: "100%", maxHeight: 40 }}>
                <source src={fileAsset.url} />
              </audio>
            </div>
          ) : (
            <div style={{ marginTop: 14, fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
              Esta variante no expone URL de archivo: {audioEngineSummary(scene)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
