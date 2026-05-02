import {
  SANDBOX_RUNBOOK_STEPS,
  SANDBOX_RUNBOOK_STEP_TOTAL,
  type SandboxRunbookStep
} from "../sandboxRunbook.v1";
import { getSandboxRunbookStepIndexSafe } from "../sandboxRunbookState";

function StepRow(props: {
  step: SandboxRunbookStep;
  position: number;
  status: "done" | "current" | "pending";
}) {
  const { step, position, status } = props;
  const mark =
    status === "done" ? "✓" : status === "current" ? "→" : "○";
  const opacity = status === "pending" ? 0.55 : 1;
  return (
    <li style={{ marginBottom: 10, opacity, fontSize: 13, lineHeight: 1.45 }}>
      <span style={{ fontFamily: "var(--calamus-mono-font)", marginRight: 8 }}>{mark}</span>
      <strong>
        {position + 1}. {step.title}
      </strong>
      <span style={{ color: "var(--calamus-terminal-muted)" }}>
        {" "}
        (<code style={{ fontSize: "0.9em" }}>{step.id}</code>)
      </span>
      {status === "current" ? (
        <>
          <div style={{ marginTop: 6 }}>{step.summary}</div>
          <div style={{ marginTop: 6, fontSize: 12, color: "var(--calamus-terminal-muted)" }}>
            <strong>Dónde: </strong>
            {step.whereInApp}
          </div>
          {step.jumpHref ? (
            <div style={{ marginTop: 8 }}>
              <a
                href={step.jumpHref}
                style={{
                  fontSize: 13,
                  color: "var(--calamus-terminal-emphasis)",
                  fontFamily: "var(--calamus-mono-font)"
                }}
              >
                Saltar: {step.jumpHref}
              </a>
            </div>
          ) : null}
          {step.jumpLinks?.length ? (
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {step.jumpLinks.map((j) => (
                <a
                  key={j.href}
                  href={j.href}
                  style={{
                    fontSize: 12,
                    color: "var(--calamus-terminal-emphasis)",
                    fontFamily: "var(--calamus-mono-font)"
                  }}
                >
                  {j.label}
                </a>
              ))}
            </div>
          ) : null}
          <div
            style={{
              marginTop: 8,
              padding: "8px 10px",
              borderRadius: 8,
              background: "rgba(0,0,0,0.15)",
              border: "1px solid var(--calamus-terminal-border)",
              fontFamily: "var(--calamus-mono-font)",
              fontSize: 11,
              whiteSpace: "pre-wrap",
              color: "var(--calamus-terminal-fg)"
            }}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>Para el asistente («continua»)</strong>
            {step.assistantInstruction}
          </div>
        </>
      ) : null}
    </li>
  );
}

export default function SandboxRunbookPanel() {
  const idx = getSandboxRunbookStepIndexSafe();
  const step = SANDBOX_RUNBOOK_STEPS[idx];

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
          margin: "0 0 8px",
          fontFamily: "var(--calamus-mono-font)",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--calamus-terminal-emphasis)"
        }}
      >
        Runbook · qué sigue (decí «continua»)
      </p>
      <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.55 }}>
        Paso <strong>{idx + 1}</strong> de <strong>{SANDBOX_RUNBOOK_STEP_TOTAL}</strong>
        {": "}
        <strong>{step.title}</strong>
      </p>
      <ul style={{ margin: "0 0 12px", paddingLeft: 0, listStyle: "none" }}>
        {SANDBOX_RUNBOOK_STEPS.map((s, i) => (
          <StepRow
            key={s.id}
            step={s}
            position={i}
            status={i < idx ? "done" : i === idx ? "current" : "pending"}
          />
        ))}
      </ul>
      <p style={{ margin: 0, fontSize: 12, color: "var(--calamus-terminal-muted)", lineHeight: 1.5 }}>
        Cuando completes este paso, pedí <strong>continua</strong>: el asistente sube{" "}
        <code style={{ fontSize: "0.92em" }}>SANDBOX_RUNBOOK_STEP_INDEX</code> en{" "}
        <code style={{ fontSize: "0.92em" }}>src/sandboxRunbookState.ts</code>.
        También podés cambiar ese número vos. Ver <code style={{ fontSize: "0.92em" }}>calamus-sandbox/AGENTS.md</code>.
      </p>
    </div>
  );
}
