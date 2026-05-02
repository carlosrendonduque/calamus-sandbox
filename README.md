# calamus-sandbox

Sandbox de consumo para madurar el uso de `calamus` antes de integrarlo en otros proyectos.

## Flujo local recomendado

Este repositorio asume esta estructura:

```text
calamus/
  calamus/          # package reutilizable
  calamus-sandbox/  # consumer de prueba
```

Dentro de `calamus-sandbox`:

```bash
npm install
npm run dev
```

La dependencia local se resuelve con:

```json
"calamus": "file:../calamus"
```

Importante: ejecuta comandos npm dentro de `calamus-sandbox` (no desde el directorio padre), para que el path relativo funcione correctamente.

## Qué incluye hoy

- **Runbook lineal** (olas E–L, Biblia sonora y handoff ordenado): `AGENTS.md` y el panel «Runbook» en la UI; puntero en `src/sandboxRunbookState.ts`.
- Selector rápido de modos (`scroll`, `book`, `terminal`, `editorial`, `hypertext`).
- Playground de escenarios fijos de consumo.
- Prop Lab para probar combinaciones de props en vivo.
- Banco de regresiones con checklist y carga automática al Prop Lab.

## Checklist de release (listo para consumir)

Antes de usar una versión de `calamus` en otro proyecto, valida:

- Build de `calamus` sin errores.
- Typecheck de `calamus` sin errores.
- Build de `calamus-sandbox` sin errores.
- Casos del banco de regresiones revisados manualmente.
- Prop Lab validado en al menos 2 modos con combinaciones distintas de tema/transition.
- Sin regresiones visuales graves (overflow, contraste, foco teclado, navegación básica).

## Comando de validación rápida

Desde `calamus-sandbox`:

```bash
npm run verify:local
```

Este comando ejecuta en cadena:

1. `calamus`: `build` + `typecheck`
2. `calamus-sandbox`: `build`

## Estado de handoff (runbook)

- `runbook-11-nullheim-handoff`: implementado en `nullheim` con la ruta `"/matriz-handoff"` y comando de terminal `matriz`.
- Restricción vigente: handoff a `nullheim` como experiencia propia; no mover esta línea a Scriptorium.

## Template para nuevo caso de regresión

En `src/App.tsx` ya existe un template base dentro de `regressionCases` con id `template-new-case`.

Para crear un caso nuevo en menos de 1 minuto:

1. Duplica un bloque `createRegressionCase({...})` existente.
2. Completa `id`, `title`, `risk` y `checks`.
3. Ajusta `state` con la combinación exacta de props que quieres preservar.
4. Si usaste el template, quítale `isTemplate: true` o cambia ese valor a `false`.

Campos de `state`:

- `mode`: `scroll | book | terminal | editorial | hypertext`
- `transition`: `fade | slide | none`
- `theme`: `none | light`
- `content`: `short | sample | dense`
- `subtitle`: `true | false`
- `readingTimeLabel`: texto libre
- `children`: `true | false` (impacta en `hypertext`)

