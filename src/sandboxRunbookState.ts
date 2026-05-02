import { SANDBOX_RUNBOOK_STEPS } from "./sandboxRunbook.v1";

/**
 * Puntero del runbook (única fuente de verdad del «ahora tocó esto»).
 *
 * Convención con el usuario: cuando diga «continua», el asistente ejecuta el paso
 * `SANDBOX_RUNBOOK_STEPS[SANDBOX_RUNBOOK_STEP_INDEX]` y luego **incrementa** este número en este archivo (o el usuario lo edita a mano).
 *
 * Mantener entre `0` y `SANDBOX_RUNBOOK_STEPS.length - 1`. Cuando llegues al último paso y lo completes,
 * podés dejar el índice ahí o añadir más pasos en `sandboxRunbook.v1.ts`.
 */
export const SANDBOX_RUNBOOK_STEP_INDEX = 11;

/** Índice acotado para UI y tests */
export function getSandboxRunbookStepIndexSafe(): number {
  const raw = SANDBOX_RUNBOOK_STEP_INDEX;
  const max = SANDBOX_RUNBOOK_STEPS.length - 1;
  if (raw < 0) return 0;
  if (raw > max) return max;
  return raw;
}
