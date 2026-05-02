# Calamus sandbox — convención «continua»

Este directorio tiene un **runbook lineal** para no dispersarse en nullheim, refactors globales ni otras fases hasta que corresponda.

## Archivos clave

- `src/sandboxRunbook.v1.ts` — lista ordenada de pasos (olas A–D humo → E–H → I–L → Biblia↔contrato → QA → **sólo entonces** nullheim).
- `src/sandboxRunbookState.ts` — puntero `SANDBOX_RUNBOOK_STEP_INDEX` (entero desde 0).

## Cuando el usuario diga «continua»

1. Leé `sandboxRunbookState.ts` y tomá el índice actual.
2. Leé el paso en `SANDBOX_RUNBOOK_STEPS[index]` dentro de `sandboxRunbook.v1.ts`.
3. Seguí **literal** el campo `assistantInstruction` de ese paso. No abrís otros frentes (nullheim, publicar tipos en `calamus`, etc.) **salvo** que ese texto lo indique.
4. Cuando el paso quede hecho (contenido o tarea cumplida), **incrementá** `SANDBOX_RUNBOOK_STEP_INDEX` en `sandboxRunbookState.ts` en **+1**, sin pasar del último índice salvo que se agreguen pasos nuevos al array.

## UI

`SandboxRunbookPanel` (en `App.tsx`, debajo de la guía rápida) refleja el mismo índice importado desde `sandboxRunbookState.ts` — no hay segundo puntero en `localStorage`.


## Restricción de destino (obligatoria)

- El handoff final es a **nullheim** como experiencia diegética propia.
- **No** mover ni adaptar esta línea a **Scriptorium**.
- Si aparece una propuesta para Scriptorium, detener y pedir confirmación explícita del usuario antes de cambiar el carril.
