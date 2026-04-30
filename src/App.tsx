import { useMemo, useState } from "react";
import { Reader, type ReaderContent, type ReaderMode, type ReaderTheme } from "calamus";
import "calamus/styles.css";
import "./theme.css";

const sampleContent: ReaderContent = {
  title: "Alba en estantería",
  subtitle: "Notas para quien lee cuando todavía no empieza el día",
  body: [
    "A esta hora, el aire tiene una paciencia casi antigua: no anuncia nada, simplemente sostiene el silencio como si fuera una cuerda tensada alrededor del mundo.",
    "En mi biblioteca personal, los lomos no guardan secretos; guardan recorridos. Cada volumen parece decir: vuelve por mí cuando necesites recordar que también existe la calma.",
    "Leo despacio, no por nostalgia sino por método. Las frases son pequeñas habitaciones: si no entro con cuidado, la vista se me llena de ruido y el sentido se escurre.",
    "Hay páginas que se abren solas cuando las busco con honestidad. Otras, en cambio, esperan a que cambie la respiración: entonces se dejan leer, como si respondieran a un ritmo.",
    "Al terminar, la luz ya no es la misma, pero el libro sigue igual. Esa es la lección: lo leído permanece, mientras el día—amable o brutal—se renueva.",
  ],
};

const shortContent: ReaderContent = {
  title: "Entrada breve",
  body: [
    "Este escenario ayuda a validar el render minimo del componente: titulo y un solo parrafo."
  ]
};

const denseContent: ReaderContent = {
  title: "Manual operativo",
  subtitle: "Fragmento tecnico para stress visual",
  body: [
    "La primera regla del tablero es no confundir velocidad con progreso. Una entrega rapida sin criterio se vuelve deuda y la deuda siempre cobra intereses.",
    "En cada iteracion revisamos limites: ancho de columnas, altura de paneles, contraste, foco visible y orden de tabulacion. Si un caso falla, se registra de inmediato.",
    "El lector no debe quedarse sin contexto cuando cambia de modo; por eso mantenemos titulo, subtitulo y continuidad de tono aunque el layout evolucione.",
    "Cuando aparecen palabras muy largas o numeraciones extensas, el bloque debe envolver sin romper la jerarquia tipografica ni desplazar controles fuera del viewport.",
    "Este texto largo existe para forzar paginacion y desplazamiento, especialmente en book y scroll, donde los indicadores de avance deben seguir siendo coherentes."
  ]
};

const modes: Array<{ id: ReaderMode; label: string }> = [
  { id: "scroll", label: "Scroll" },
  { id: "book", label: "Book" },
  { id: "terminal", label: "Terminal" },
  { id: "editorial", label: "Editorial" },
  { id: "hypertext", label: "Hypertext" }
];

const lightTheme: ReaderTheme = {
  background: "#faf7ef",
  foreground: "#2f2a22",
  muted: "#6f6759",
  accent: "#985f1f",
  border: "#d8ccba",
  panel: "#fffdf8",
  terminalBackground: "#f6f0e6",
  terminalForeground: "#3f2f18",
  terminalMuted: "#7c6e5a",
  terminalEmphasis: "#7a4b15",
  terminalEof: "#8e806b",
  terminalBorder: "#ccbda7"
};

const scenarios = [
  {
    id: "minimal-scroll",
    title: "Minimo - Scroll",
    description: "Consumo mas simple: contenido minimo y modo por defecto.",
    render: () => <Reader content={shortContent} />
  },
  {
    id: "full-scroll-custom-label",
    title: "Completo - Scroll con etiqueta custom",
    description: "Valida readingTimeLabel, className y style.",
    render: () => (
      <Reader
        content={sampleContent}
        mode="scroll"
        readingTimeLabel="min aproximados"
        className="sandbox-reader--framed"
        style={{ border: "1px dashed var(--calamus-border)", borderRadius: 12, padding: 10 }}
      />
    )
  },
  {
    id: "book-slide",
    title: "Book + transition slide",
    description: "Prueba navegacion por paginas y animacion de cambio.",
    render: () => <Reader content={denseContent} mode="book" transition="slide" />
  },
  {
    id: "terminal-light-theme",
    title: "Terminal con theme por props",
    description: "Sobrescribe variables CSS via objeto theme.",
    render: () => <Reader content={sampleContent} mode="terminal" theme={lightTheme} />
  },
  {
    id: "editorial-none",
    title: "Editorial sin transicion",
    description: "Valida el modo editorial con transition='none'.",
    render: () => <Reader content={denseContent} mode="editorial" transition="none" />
  },
  {
    id: "hypertext-with-children",
    title: "Hypertext con children",
    description: "Ejercita extension del consumidor inyectando UI adicional.",
    render: () => (
      <Reader content={sampleContent} mode="hypertext">
        <aside
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid var(--calamus-border)",
            borderRadius: 10,
            background: "rgba(0,0,0,0.15)"
          }}
        >
          <strong style={{ display: "block", marginBottom: 8 }}>Notas del consumidor</strong>
          <span>Este bloque lo provee calamus-sandbox como child externo.</span>
        </aside>
      </Reader>
    )
  }
] as const;

type ThemePreset = "none" | "light";
type ContentPreset = "short" | "sample" | "dense";

const contentPresets: Record<ContentPreset, ReaderContent> = {
  short: shortContent,
  sample: sampleContent,
  dense: denseContent
};

type RegressionCase = {
  id: string;
  title: string;
  risk: string;
  checks: string[];
  isTemplate?: boolean;
  state: {
    mode: ReaderMode;
    transition: "fade" | "slide" | "none";
    theme: ThemePreset;
    content: ContentPreset;
    subtitle: boolean;
    readingTimeLabel: string;
    children: boolean;
  };
};

function createRegressionCase(definition: RegressionCase): RegressionCase {
  return definition;
}

const regressionCases: RegressionCase[] = [
  createRegressionCase({
    id: "book-dense-slide",
    title: "Paginacion en book con texto denso",
    risk: "Saltos de pagina inconsistentes o navegacion rota.",
    checks: [
      "Las flechas cambian de pagina sin trabarse.",
      "La etiqueta de pagina avanza y retrocede bien.",
      "No hay solapamiento visual de parrafos."
    ],
    state: {
      mode: "book",
      transition: "slide",
      theme: "none",
      content: "dense",
      subtitle: true,
      readingTimeLabel: "min de lectura",
      children: false
    }
  }),
  createRegressionCase({
    id: "terminal-light-theme",
    title: "Tema por props en terminal",
    risk: "Variables CSS ignoradas o contraste bajo.",
    checks: [
      "El color de fondo cambia respecto al default.",
      "Header, progreso y EOF mantienen legibilidad.",
      "No se pierde foco al hacer scroll con teclado."
    ],
    state: {
      mode: "terminal",
      transition: "fade",
      theme: "light",
      content: "sample",
      subtitle: true,
      readingTimeLabel: "min aprox",
      children: false
    }
  }),
  createRegressionCase({
    id: "hypertext-children",
    title: "Children incrustado en hypertext",
    risk: "El consumidor no puede extender layout.",
    checks: [
      "El bloque child aparece al final del contenido.",
      "Al desactivar children desaparece sin romper estilos.",
      "El contenido principal sigue renderizando igual."
    ],
    state: {
      mode: "hypertext",
      transition: "none",
      theme: "none",
      content: "sample",
      subtitle: true,
      readingTimeLabel: "min de lectura",
      children: true
    }
  }),
  createRegressionCase({
    id: "template-new-case",
    title: "Template - reemplazar por caso real",
    risk: "Describe aqui el riesgo que quieres cubrir.",
    isTemplate: true,
    checks: [
      "Check 1: comportamiento esperado.",
      "Check 2: visual / accesibilidad / navegacion.",
      "Check 3: no regresa bugs conocidos."
    ],
    state: {
      mode: "scroll",
      transition: "fade",
      theme: "none",
      content: "sample",
      subtitle: true,
      readingTimeLabel: "min de lectura",
      children: false
    }
  })
];

type HypertextCase = {
  id: string;
  title: string;
  summary: string;
  render: () => JSX.Element;
};

function HypertextCaseMultivoz() {
  const [voice, setVoice] = useState<"zampano" | "truant" | "editor">("zampano");
  const blocks = {
    zampano:
      "El pasillo no agrega metros: agrega duda. Cada medicion reafirma la paradoja y, por extension, la fragilidad del metodo.",
    truant:
      "No se si creerle a ese manuscrito. Lo releo y cambia. A veces siento que el texto respira antes que yo.",
    editor:
      "Nota de edicion: los parrafos previos presentan inconsistencias de fechas y fuentes no verificables."
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => setVoice("zampano")}>
          Voz academica
        </button>
        <button type="button" onClick={() => setVoice("truant")}>
          Voz compilador
        </button>
        <button type="button" onClick={() => setVoice("editor")}>
          Voz editorial
        </button>
      </div>
      <blockquote style={{ margin: 0, padding: 12, borderLeft: "3px solid var(--calamus-accent)" }}>
        {blocks[voice]}
      </blockquote>
      <small style={{ color: "var(--calamus-muted)" }}>Caso 1: cambio de narrador con estilo y tono.</small>
    </div>
  );
}

function HypertextCaseFootnoteChain() {
  const [depth, setDepth] = useState(0);
  const chain = [
    "Nota 1: El plano original no coincide con la medida interior.",
    "Nota 1.1: La segunda inspeccion repite la desviacion.",
    "Nota 1.1.a: El registro en video presenta un corte no explicado.",
    "Nota 1.1.a.i: La metadata del archivo fue alterada."
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setDepth((value) => Math.min(chain.length - 1, value + 1))}>
        Seguir nota al pie
      </button>
      <button type="button" onClick={() => setDepth(0)}>
        Volver al texto principal
      </button>
      <div style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {chain.slice(0, depth + 1).map((entry) => (
          <p key={entry} style={{ margin: "0 0 8px" }}>
            {entry}
          </p>
        ))}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Caso 2: footnotes encadenadas con retorno.</small>
    </div>
  );
}

function HypertextCaseCensura() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>
        El informe indica que la pared se abrio a las{" "}
        <span style={{ background: revealed ? "transparent" : "#111", color: revealed ? "inherit" : "#111" }}>
          03:14
        </span>{" "}
        y que el equipo escucho{" "}
        <span style={{ background: revealed ? "transparent" : "#111", color: revealed ? "inherit" : "#111" }}>
          una voz infantil
        </span>
        .
      </p>
      <button type="button" onClick={() => setRevealed((value) => !value)}>
        {revealed ? "Ocultar pasaje censurado" : "Revelar pasaje censurado"}
      </button>
      <small style={{ color: "var(--calamus-muted)" }}>Caso 3: texto suprimido / revelado.</small>
    </div>
  );
}

function HypertextCaseEvidenciaVisual() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <img
        src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=60"
        alt="Pasillo oscuro con profundidad pronunciada"
        style={{ width: "100%", borderRadius: 10, maxHeight: 220, objectFit: "cover" }}
      />
      <p style={{ margin: 0 }}>
        Evidencia A: el pasillo parece lineal. Nota editorial: la sombra final no corresponde con la fuente de luz.
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Caso 4: imagen + interpretacion contradictoria.</small>
    </div>
  );
}

function HypertextCaseAudio() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Testimonio de campo #7 (capa sonora diegetica):</p>
      <audio controls preload="none">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>
      <small style={{ color: "var(--calamus-muted)" }}>
        Caso 5: audio embebido con rol de evidencia narrativa.
      </small>
    </div>
  );
}

function HypertextCaseVideo() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <video controls preload="metadata" style={{ width: "100%", borderRadius: 10, maxHeight: 260 }}>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      </video>
      <p style={{ margin: 0 }}>
        Clip 02: entre el segundo 00:06 y 00:08 aparece un corte abrupto. Verificar continuidad con la nota 1.1.a.
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Caso 6: metraje con anotacion temporal.</small>
    </div>
  );
}

function HypertextCaseLaberinto() {
  const graph: Record<string, { text: string; exits: string[] }> = {
    A: { text: "Nodo A: entrada principal.", exits: ["B", "C"] },
    B: { text: "Nodo B: corredor frio.", exits: ["D", "A"] },
    C: { text: "Nodo C: escalera incompleta.", exits: ["E", "A"] },
    D: { text: "Nodo D: cuarto sin puerta de salida visible.", exits: ["B"] },
    E: { text: "Nodo E: retorno imposible al inicio.", exits: ["A", "D"] }
  };
  const [path, setPath] = useState<string[]>(["A"]);
  const current = path[path.length - 1];
  const node = graph[current];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>{node.text}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {node.exits.map((exit) => (
          <button key={exit} type="button" onClick={() => setPath((prev) => [...prev, exit])}>
            Ir a {exit}
          </button>
        ))}
        <button type="button" onClick={() => setPath((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))}>
          Backtrack
        </button>
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Ruta: {path.join(" -> ")}</small>
      <small style={{ color: "var(--calamus-muted)" }}>Caso 7: navegacion tipo laberinto.</small>
    </div>
  );
}

function HypertextCaseMotivos() {
  const [showHouse, setShowHouse] = useState(true);
  const [showMinotaur, setShowMinotaur] = useState(true);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label>
          <input type="checkbox" checked={showHouse} onChange={(e) => setShowHouse(e.target.checked)} /> house
        </label>
        <label>
          <input type="checkbox" checked={showMinotaur} onChange={(e) => setShowMinotaur(e.target.checked)} />{" "}
          minotaur
        </label>
      </div>
      <p style={{ margin: 0, lineHeight: 1.8 }}>
        La{" "}
        {showHouse ? <span style={{ color: "#2a6cff", fontWeight: 700 }}>house</span> : <span>house</span>} no
        guarda silencio: guarda recorridos. Cada eco parece nombrar al{" "}
        {showMinotaur ? (
          <span style={{ color: "#c33131", textDecoration: "line-through" }}>minotaur</span>
        ) : (
          <span>minotaur</span>
        )}{" "}
        sin confirmarlo nunca.
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Caso 8: palabras-motivo y semantica visual.</small>
    </div>
  );
}

const hypertextCases: HypertextCase[] = [
  {
    id: "ola-a-multivoz",
    title: "Multivoz no confiable",
    summary: "Tres capas narrativas con tono y postura distintos.",
    render: () => <HypertextCaseMultivoz />
  },
  {
    id: "ola-a-footnote-chain",
    title: "Footnotes encadenadas",
    summary: "Notas al pie recursivas y retorno al hilo principal.",
    render: () => <HypertextCaseFootnoteChain />
  },
  {
    id: "ola-a-censura",
    title: "Pasajes censurados",
    summary: "Contenido oculto/revelado que cambia la lectura.",
    render: () => <HypertextCaseCensura />
  },
  {
    id: "ola-a-evidencia-visual",
    title: "Evidencia visual contradictoria",
    summary: "Imagen con interpretacion en disputa.",
    render: () => <HypertextCaseEvidenciaVisual />
  },
  {
    id: "ola-a-audio",
    title: "Audio diegetico",
    summary: "Testimonio sonoro como pieza narrativa.",
    render: () => <HypertextCaseAudio />
  },
  {
    id: "ola-a-video",
    title: "Video anotado",
    summary: "Metraje con observacion por timestamp.",
    render: () => <HypertextCaseVideo />
  },
  {
    id: "ola-a-laberinto",
    title: "Nodos de laberinto",
    summary: "Navegacion no lineal con backtracking.",
    render: () => <HypertextCaseLaberinto />
  },
  {
    id: "ola-a-motivos",
    title: "Motivos tipograficos",
    summary: "Palabras-clave con semantica por color y tachado.",
    render: () => <HypertextCaseMotivos />
  }
];

function HypertextBCaseSplitScreen() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <article style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
          <strong>Transcripcion</strong>
          <p style={{ marginBottom: 0 }}>“La pared se movio 4 cm en 12 minutos.”</p>
        </article>
        <article style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
          <strong>Bitacora de campo</strong>
          <p style={{ marginBottom: 0 }}>“No hubo movimiento observable en ese intervalo.”</p>
        </article>
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Comparativa simultanea de fuentes.</small>
    </div>
  );
}

function HypertextBCaseImageStack() {
  const images = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=900&q=60"
  ];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {images.map((src) => (
          <img key={src} src={src} alt="Evidencia visual" style={{ width: "100%", borderRadius: 8, height: 170, objectFit: "cover" }} />
        ))}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Dos capturas del mismo espacio con lecturas opuestas.</small>
    </div>
  );
}

function HypertextBCaseAudioLayers() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Capa 1 (ambiente)</p>
      <audio controls preload="none">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
      </audio>
      <p style={{ margin: 0 }}>Capa 2 (testimonio)</p>
      <audio controls preload="none">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" type="audio/mpeg" />
      </audio>
      <small style={{ color: "var(--calamus-muted)" }}>Capas sonoras separadas para lectura comparativa.</small>
    </div>
  );
}

function HypertextBCaseVideoEvidenceBoard() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <video controls preload="metadata" style={{ width: "100%", borderRadius: 10, maxHeight: 240 }}>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      </video>
      <div style={{ border: "1px dashed var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        <strong>Marcas de evidencia</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>00:03 - Sombra no atribuible.</li>
          <li>00:06 - Corte sin continuidad espacial.</li>
          <li>00:09 - Ruido de fondo no identificado.</li>
        </ul>
      </div>
    </div>
  );
}

function HypertextBCaseAnimatedStress() {
  const [stress, setStress] = useState(0);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="range" min={0} max={100} value={stress} onChange={(e) => setStress(Number(e.target.value))} />
      <p
        style={{
          margin: 0,
          letterSpacing: `${stress / 80}px`,
          transform: `translateX(${stress / 14}px)`,
          opacity: 0.7 + stress / 350
        }}
      >
        El texto se comprime, se desplaza y deja de ser estable.
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Tipografia reactiva al nivel de tension.</small>
    </div>
  );
}

function HypertextBCaseTimelineDispute() {
  const events = [
    { t: "03:14", a: "Apertura detectada", b: "Sin novedad" },
    { t: "03:17", a: "Ruido metalico", b: "Viento en ducto" },
    { t: "03:22", a: "Pérdida de señal", b: "Equipo funcionando" }
  ];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {events.map((event) => (
        <div key={event.t} style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 8 }}>
          <strong>{event.t}</strong>
          <p style={{ margin: "4px 0" }}>Fuente A: {event.a}</p>
          <p style={{ margin: 0 }}>Fuente B: {event.b}</p>
        </div>
      ))}
      <small style={{ color: "var(--calamus-muted)" }}>Timeline con conflicto de evidencia.</small>
    </div>
  );
}

function HypertextBCaseDocumentPacket() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <details open>
        <summary>Exhibicion A - Nota tecnica</summary>
        <p>Plano de infraestructura, version 2.3 (archivado).</p>
      </details>
      <details>
        <summary>Exhibicion B - Carta personal</summary>
        <p>“No regreses al sotano. La medida nunca coincide.”</p>
      </details>
      <details>
        <summary>Exhibicion C - Registro de audio</summary>
        <p>“...si escuchas tres golpes, no abras...”</p>
      </details>
      <small style={{ color: "var(--calamus-muted)" }}>Paquete de anexos navegable.</small>
    </div>
  );
}

function HypertextBCaseReaderPath() {
  const [visited, setVisited] = useState<string[]>([]);
  const options = ["puerta norte", "pasillo 5", "archivo X", "salida de emergencia"];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((option) => (
          <button key={option} type="button" onClick={() => setVisited((prev) => [...prev, option])}>
            {option}
          </button>
        ))}
      </div>
      <p style={{ margin: 0 }}>Recorrido del lector: {visited.length ? visited.join(" -> ") : "sin recorrido aun"}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Persistencia narrativa por decisiones.</small>
    </div>
  );
}

const hypertextCasesB: HypertextCase[] = [
  { id: "ola-b-split", title: "Split-screen de fuentes", summary: "Dos relatos simultaneos en conflicto.", render: () => <HypertextBCaseSplitScreen /> },
  { id: "ola-b-image-stack", title: "Stack de imagenes", summary: "Evidencias visuales comparables.", render: () => <HypertextBCaseImageStack /> },
  { id: "ola-b-audio-layers", title: "Capas de audio", summary: "Ambiente + testimonio en paralelo.", render: () => <HypertextBCaseAudioLayers /> },
  { id: "ola-b-video-board", title: "Video con tablero", summary: "Clip con marcas de evidencia.", render: () => <HypertextBCaseVideoEvidenceBoard /> },
  { id: "ola-b-animated-stress", title: "Tipografia reactiva", summary: "Animacion segun tension narrativa.", render: () => <HypertextBCaseAnimatedStress /> },
  { id: "ola-b-timeline-dispute", title: "Timeline disputado", summary: "Eventos con versiones incompatibles.", render: () => <HypertextBCaseTimelineDispute /> },
  { id: "ola-b-doc-packet", title: "Paquete documental", summary: "Anexos expandibles por exhibicion.", render: () => <HypertextBCaseDocumentPacket /> },
  { id: "ola-b-reader-path", title: "Ruta del lector", summary: "Registro de decisiones de lectura.", render: () => <HypertextBCaseReaderPath /> }
];

function HypertextCCaseRotatedBlocks() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <p style={{ margin: 0 }}>Gira la mirada: la orientacion tambien narra.</p>
      <div style={{ transform: "rotate(-3deg)", border: "1px solid var(--calamus-border)", padding: 10 }}>
        Este bloque desvia la lectura para inducir desorientacion.
      </div>
      <div style={{ transform: "rotate(2deg)", border: "1px dashed var(--calamus-border)", padding: 10 }}>
        Un segundo giro refuerza la sensacion de pasillo torcido.
      </div>
    </div>
  );
}

function HypertextCCaseNarrowClaustro() {
  const [narrow, setNarrow] = useState(220);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="range" min={160} max={520} value={narrow} onChange={(e) => setNarrow(Number(e.target.value))} />
      <div style={{ width: narrow, transition: "width 120ms ease-out", border: "1px solid var(--calamus-border)", padding: 10 }}>
        <p style={{ margin: 0 }}>
          El corredor se estrecha y obliga a leer mas rapido, con menos aire y mayor ansiedad espacial.
        </p>
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Ancho actual: {narrow}px</small>
    </div>
  );
}

function HypertextCCaseSparseIsolation() {
  return (
    <div style={{ minHeight: 260, display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: 0, letterSpacing: "0.2em" }}>solo</p>
        <p style={{ margin: "90px 0 0" }}>eco</p>
      </div>
    </div>
  );
}

function HypertextCCaseMirrorText() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <p style={{ margin: 0 }}>Lectura frontal:</p>
      <p style={{ margin: 0 }}>La salida no estaba donde la dejamos.</p>
      <p style={{ margin: 0 }}>Lectura espejo:</p>
      <p style={{ margin: 0, transform: "scaleX(-1)" }}>La salida no estaba donde la dejamos.</p>
    </div>
  );
}

function HypertextCCaseSpiralPath() {
  const words = ["entra", "gira", "desciende", "escucha", "duda", "retrocede"];
  return (
    <div style={{ position: "relative", minHeight: 280 }}>
      {words.map((word, index) => (
        <span
          key={word}
          style={{
            position: "absolute",
            left: `${40 + index * 9}%`,
            top: `${20 + (index % 2 === 0 ? index * 8 : index * 6)}%`,
            transform: `rotate(${index * 16}deg)`
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function HypertextCCaseUnstableLinks() {
  const choices = ["pasillo norte", "archivo roto", "escalera ciega", "camara 03"];
  const [order, setOrder] = useState(choices);
  const shuffle = () => setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={shuffle}>
        Reconfigurar rutas
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {order.map((entry) => (
          <button key={entry} type="button">
            {entry}
          </button>
        ))}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Los enlaces cambian de lugar: orientacion inestable.</small>
    </div>
  );
}

function HypertextCCaseColumnLab() {
  const [columns, setColumns] = useState(2);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label>
        Columnas:{" "}
        <select value={columns} onChange={(e) => setColumns(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </label>
      <div style={{ columnCount: columns, columnGap: "1.4rem", border: "1px solid var(--calamus-border)", padding: 10 }}>
        <p>El texto en columnas modifica la respiracion visual y el ritmo de lectura.</p>
        <p>Al aumentar columnas, sube la sensacion de fragmentacion documental.</p>
        <p>En tres columnas aparece densidad, ruido y urgencia.</p>
      </div>
    </div>
  );
}

function HypertextCCaseRecoverAnchor() {
  const [log, setLog] = useState<string[]>([]);
  const jump = (target: string) => setLog((prev) => [...prev, `salto a ${target}`]);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => jump("nota 4.2")}>
          Saltar a nota 4.2
        </button>
        <button type="button" onClick={() => jump("apendice C")}>
          Saltar a apendice C
        </button>
        <button type="button" onClick={() => setLog([])}>
          Reanclar lectura
        </button>
      </div>
      <p style={{ margin: 0 }}>Historial: {log.length ? log.join(" / ") : "linea principal estable"}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Control de desorientacion con reanclaje.</small>
    </div>
  );
}

const hypertextCasesC: HypertextCase[] = [
  { id: "ola-c-rotated", title: "Bloques rotados", summary: "Orientacion como parte del relato.", render: () => <HypertextCCaseRotatedBlocks /> },
  { id: "ola-c-claustro", title: "Compresion claustrofobica", summary: "Ancho variable para tension espacial.", render: () => <HypertextCCaseNarrowClaustro /> },
  { id: "ola-c-sparse", title: "Pagina casi vacia", summary: "Aislamiento por vacio y ritmo.", render: () => <HypertextCCaseSparseIsolation /> },
  { id: "ola-c-mirror", title: "Texto espejo", summary: "Lectura invertida y doble interpretacion.", render: () => <HypertextCCaseMirrorText /> },
  { id: "ola-c-spiral", title: "Ruta en espiral", summary: "Trayectoria visual no lineal.", render: () => <HypertextCCaseSpiralPath /> },
  { id: "ola-c-unstable-links", title: "Enlaces inestables", summary: "Rutas moviles para desorientacion controlada.", render: () => <HypertextCCaseUnstableLinks /> },
  { id: "ola-c-columns", title: "Laboratorio de columnas", summary: "Densidad y fragmentacion por layout.", render: () => <HypertextCCaseColumnLab /> },
  { id: "ola-c-anchor", title: "Reanclaje narrativo", summary: "Saltar y volver sin perder el hilo.", render: () => <HypertextCCaseRecoverAnchor /> }
];

function HypertextDCaseSessionMemory() {
  const storageKey = "calamus-sandbox-hypertext-session-note";
  const [note, setNote] = useState(() => localStorage.getItem(storageKey) ?? "");
  const save = () => localStorage.setItem(storageKey, note);
  const clear = () => {
    localStorage.removeItem(storageKey);
    setNote("");
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Escribe una pista para la proxima sesion"
        rows={4}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={save}>
          Guardar memoria local
        </button>
        <button type="button" onClick={clear}>
          Limpiar memoria
        </button>
      </div>
    </div>
  );
}

function HypertextDCaseContradictionDetector() {
  const statements = [
    { id: "s1", text: "La puerta principal quedo sellada a las 03:00.", tag: "door:closed@03:00" },
    { id: "s2", text: "A las 03:02 la puerta principal seguia abierta.", tag: "door:open@03:02" },
    { id: "s3", text: "No hubo registro de apertura posterior.", tag: "door:no-open-after" }
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));
  const contradiction = selected.includes("s1") && selected.includes("s2");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {statements.map((s) => (
        <label key={s.id}>
          <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} /> {s.text}
        </label>
      ))}
      <p style={{ margin: 0, color: contradiction ? "#ff6b6b" : "var(--calamus-muted)" }}>
        {contradiction ? "Contradiccion detectada: estado de puerta incompatible." : "Sin contradiccion fuerte."}
      </p>
    </div>
  );
}

function HypertextDCaseInvestigatorBoard() {
  const [pins, setPins] = useState<string[]>([]);
  const options = ["clip-02", "nota-1.1.a", "foto-corredor", "carta-pelafina"];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => setPins((prev) => [...prev, opt])}>
            Fijar {opt}
          </button>
        ))}
      </div>
      <div style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        <strong>Tablero</strong>
        <p style={{ margin: "6px 0 0" }}>{pins.length ? pins.join(" -> ") : "Sin conexiones aun."}</p>
      </div>
    </div>
  );
}

function HypertextDCaseReaderProfile() {
  const [mode, setMode] = useState<"minimal" | "obsesivo">("minimal");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setMode("minimal")}>
          Lectura minima
        </button>
        <button type="button" onClick={() => setMode("obsesivo")}>
          Lectura obsesiva
        </button>
      </div>
      {mode === "minimal" ? (
        <p style={{ margin: 0 }}>Solo narrativa principal, notas colapsadas.</p>
      ) : (
        <p style={{ margin: 0 }}>Notas, anexos y contradicciones expandidas por defecto.</p>
      )}
    </div>
  );
}

function HypertextDCaseEvidenceScore() {
  const [score, setScore] = useState(50);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="range" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} />
      <p style={{ margin: 0 }}>Confiabilidad del documento: {score}%</p>
      <small style={{ color: "var(--calamus-muted)" }}>
        Simula como la UI cambia cuando aumenta/disminuye la certeza narrativa.
      </small>
    </div>
  );
}

function HypertextDCaseRouteSnapshots() {
  const [path, setPath] = useState<string[]>([]);
  const [snapshots, setSnapshots] = useState<string[][]>([]);
  const jump = (node: string) => setPath((prev) => [...prev, node]);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => jump("A")}>
          A
        </button>
        <button type="button" onClick={() => jump("B")}>
          B
        </button>
        <button type="button" onClick={() => jump("C")}>
          C
        </button>
        <button type="button" onClick={() => setSnapshots((prev) => [...prev, path])}>
          Guardar snapshot
        </button>
      </div>
      <p style={{ margin: 0 }}>Ruta actual: {path.length ? path.join(" -> ") : "vacia"}</p>
      <p style={{ margin: 0 }}>Snapshots: {snapshots.length ? snapshots.map((s) => `[${s.join("->")}]`).join(" ") : "ninguno"}</p>
    </div>
  );
}

function HypertextDCaseMetaEditor() {
  const [line, setLine] = useState("La casa no cambia.");
  const [editorOn, setEditorOn] = useState(true);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label>
        <input type="checkbox" checked={editorOn} onChange={(e) => setEditorOn(e.target.checked)} /> Editor diegetico
      </label>
      <input value={line} onChange={(e) => setLine(e.target.value)} />
      <p style={{ margin: 0 }}>
        {editorOn ? line.replace("no cambia", "parece cambiar") : line}
      </p>
    </div>
  );
}

function HypertextDCaseEndingLens() {
  const [lens, setLens] = useState<"horror" | "duelo" | "fraude">("horror");
  const endings = {
    horror: "Final A: habia algo en la oscuridad.",
    duelo: "Final B: todo fue una elaboracion del duelo.",
    fraude: "Final C: la evidencia fue fabricada."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select value={lens} onChange={(e) => setLens(e.target.value as "horror" | "duelo" | "fraude")}>
        <option value="horror">Lente horror</option>
        <option value="duelo">Lente duelo</option>
        <option value="fraude">Lente fraude</option>
      </select>
      <p style={{ margin: 0 }}>{endings[lens]}</p>
    </div>
  );
}

const hypertextCasesD: HypertextCase[] = [
  { id: "ola-d-session-memory", title: "Memoria de sesion", summary: "Persistencia local de pistas del lector.", render: () => <HypertextDCaseSessionMemory /> },
  { id: "ola-d-contradictions", title: "Detector de contradicciones", summary: "Conflictos logicos entre afirmaciones.", render: () => <HypertextDCaseContradictionDetector /> },
  { id: "ola-d-board", title: "Modo investigador", summary: "Tablero de evidencias y conexiones.", render: () => <HypertextDCaseInvestigatorBoard /> },
  { id: "ola-d-profile", title: "Perfil de lectura", summary: "Minima vs obsesiva para capas de detalle.", render: () => <HypertextDCaseReaderProfile /> },
  { id: "ola-d-score", title: "Score de confiabilidad", summary: "Indicador dinamico de certeza narrativa.", render: () => <HypertextDCaseEvidenceScore /> },
  { id: "ola-d-snapshots", title: "Snapshots de ruta", summary: "Guardar recorridos para comparar lecturas.", render: () => <HypertextDCaseRouteSnapshots /> },
  { id: "ola-d-meta-editor", title: "Editor diegetico", summary: "Intervencion editorial sobre el texto.", render: () => <HypertextDCaseMetaEditor /> },
  { id: "ola-d-ending-lens", title: "Lentes de final", summary: "Final interpretativo segun enfoque.", render: () => <HypertextDCaseEndingLens /> }
];

export default function App() {
  const [mode, setMode] = useState<ReaderMode>("scroll");
  const [activeScenario, setActiveScenario] = useState<string>(scenarios[0].id);
  const [labMode, setLabMode] = useState<ReaderMode>("scroll");
  const [labTransition, setLabTransition] = useState<"fade" | "slide" | "none">("fade");
  const [labThemePreset, setLabThemePreset] = useState<ThemePreset>("none");
  const [labContentPreset, setLabContentPreset] = useState<ContentPreset>("sample");
  const [labReadingLabel, setLabReadingLabel] = useState("min de lectura");
  const [labSubtitle, setLabSubtitle] = useState(true);
  const [labUseChildren, setLabUseChildren] = useState(true);
  const [activeHypertextCaseId, setActiveHypertextCaseId] = useState(hypertextCases[0].id);
  const [activeHypertextCaseBId, setActiveHypertextCaseBId] = useState(hypertextCasesB[0].id);
  const [activeHypertextCaseCId, setActiveHypertextCaseCId] = useState(hypertextCasesC[0].id);
  const [activeHypertextCaseDId, setActiveHypertextCaseDId] = useState(hypertextCasesD[0].id);

  // Pasamos un theme vacío solo para ejercitar el tipo público sin anular el tema definido por CSS.
  const theme: ReaderTheme = useMemo(() => ({}), []);
  const scenario = scenarios.find((entry) => entry.id === activeScenario) ?? scenarios[0];
  const baseContent = contentPresets[labContentPreset];
  const labContent: ReaderContent = useMemo(
    () => ({
      ...baseContent,
      subtitle: labSubtitle ? baseContent.subtitle ?? "Subtitulo inyectado desde Prop Lab" : undefined
    }),
    [baseContent, labSubtitle]
  );
  const labTheme: ReaderTheme | undefined = labThemePreset === "light" ? lightTheme : undefined;
  const labChildren =
    labMode === "hypertext" && labUseChildren ? (
      <aside
        style={{
          marginTop: 16,
          padding: 12,
          border: "1px solid var(--calamus-border)",
          borderRadius: 10,
          background: "rgba(0,0,0,0.15)"
        }}
      >
        <strong style={{ display: "block", marginBottom: 8 }}>Panel externo del consumidor</strong>
        <span>Este bloque permite verificar como `children` convive con el layout hypertext.</span>
      </aside>
    ) : null;
  const visibleRegressionCases = regressionCases.filter((entry) => !entry.isTemplate);
  const activeHypertextCase =
    hypertextCases.find((entry) => entry.id === activeHypertextCaseId) ?? hypertextCases[0];
  const activeHypertextCaseB =
    hypertextCasesB.find((entry) => entry.id === activeHypertextCaseBId) ?? hypertextCasesB[0];
  const activeHypertextCaseC =
    hypertextCasesC.find((entry) => entry.id === activeHypertextCaseCId) ?? hypertextCasesC[0];
  const activeHypertextCaseD =
    hypertextCasesD.find((entry) => entry.id === activeHypertextCaseDId) ?? hypertextCasesD[0];
  const [activeRegression, setActiveRegression] = useState<string>(visibleRegressionCases[0].id);
  const regression =
    visibleRegressionCases.find((entry) => entry.id === activeRegression) ?? visibleRegressionCases[0];

  const applyRegressionCase = (regressionCase: RegressionCase) => {
    setActiveRegression(regressionCase.id);
    setLabMode(regressionCase.state.mode);
    setLabTransition(regressionCase.state.transition);
    setLabThemePreset(regressionCase.state.theme);
    setLabContentPreset(regressionCase.state.content);
    setLabSubtitle(regressionCase.state.subtitle);
    setLabReadingLabel(regressionCase.state.readingTimeLabel);
    setLabUseChildren(regressionCase.state.children);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "var(--calamus-terminal-bg)",
        color: "var(--calamus-terminal-fg)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto 18px" }}>
        <div
          role="tablist"
          aria-label="Reader mode"
          style={{
            display: "flex",
            gap: 10,
            padding: 10,
            border: "1px solid var(--calamus-terminal-border)",
            background: "var(--calamus-panel)",
            borderRadius: 12,
            flexWrap: "wrap",
          }}
        >
          {modes.map((m) => {
            const isActive = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setMode(m.id)}
                style={{
                  appearance: "none",
                  cursor: "pointer",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1px solid ${isActive ? "var(--calamus-terminal-emphasis)" : "var(--calamus-border)"}`,
                  background: isActive ? "rgba(240, 217, 168, 0.12)" : "transparent",
                  color: isActive ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-muted)",
                  fontFamily: "var(--calamus-mono-font)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Reader content={sampleContent} mode={mode} theme={theme} />
      </div>

      <div style={{ maxWidth: 860, margin: "22px auto 10px", padding: "0 4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Playground de escenarios
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 14px" }}>
        <div
          style={{
            display: "grid",
            gap: 10
          }}
        >
          {scenarios.map((entry) => {
            const selected = entry.id === scenario.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveScenario(entry.id)}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: `1px solid ${
                    selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"
                  }`,
                  background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)",
                  color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)",
                  cursor: "pointer"
                }}
              >
                <strong style={{ display: "block", marginBottom: 4 }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
                  {entry.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 40px" }}>
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
            Escenario activo: {scenario.title}
          </p>
          {scenario.render()}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Prop Lab
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 10,
            border: "1px solid var(--calamus-terminal-border)",
            borderRadius: 12,
            padding: 12,
            background: "var(--calamus-panel)"
          }}
        >
          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--calamus-terminal-muted)" }}>Mode</span>
            <select value={labMode} onChange={(e) => setLabMode(e.target.value as ReaderMode)}>
              {modes.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--calamus-terminal-muted)" }}>Transition</span>
            <select
              value={labTransition}
              onChange={(e) => setLabTransition(e.target.value as "fade" | "slide" | "none")}
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="none">None</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--calamus-terminal-muted)" }}>Theme</span>
            <select
              value={labThemePreset}
              onChange={(e) => setLabThemePreset(e.target.value as ThemePreset)}
            >
              <option value="none">Default CSS</option>
              <option value="light">Light theme prop</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--calamus-terminal-muted)" }}>Content</span>
            <select
              value={labContentPreset}
              onChange={(e) => setLabContentPreset(e.target.value as ContentPreset)}
            >
              <option value="short">Short</option>
              <option value="sample">Sample</option>
              <option value="dense">Dense</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--calamus-terminal-muted)" }}>readingTimeLabel</span>
            <input
              value={labReadingLabel}
              onChange={(e) => setLabReadingLabel(e.target.value)}
              placeholder="min de lectura"
            />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={labSubtitle}
              onChange={(e) => setLabSubtitle(e.target.checked)}
            />
            <span style={{ fontSize: 13 }}>Incluir subtitle</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={labUseChildren}
              onChange={(e) => setLabUseChildren(e.target.checked)}
            />
            <span style={{ fontSize: 13 }}>Inyectar children (hypertext)</span>
          </label>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 44px" }}>
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
            Vista en vivo del Prop Lab
          </p>
          <Reader
            content={labContent}
            mode={labMode}
            transition={labTransition}
            theme={labTheme}
            readingTimeLabel={labReadingLabel || "min de lectura"}
          >
            {labChildren}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Banco de regresiones
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 42px" }}>
        <div style={{ display: "grid", gap: 10 }}>
          {visibleRegressionCases.map((entry) => {
            const selected = entry.id === regression.id;
            return (
              <article
                key={entry.id}
                style={{
                  border: `1px solid ${
                    selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"
                  }`,
                  borderRadius: 12,
                  padding: 12,
                  background: "var(--calamus-panel)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <strong>{entry.title}</strong>
                  <button
                    type="button"
                    onClick={() => applyRegressionCase(entry)}
                    style={{
                      border: "1px solid var(--calamus-terminal-border)",
                      background: "transparent",
                      color: "var(--calamus-terminal-fg)",
                      borderRadius: 8,
                      padding: "6px 10px",
                      cursor: "pointer"
                    }}
                  >
                    Cargar en Prop Lab
                  </button>
                </div>
                <p style={{ margin: "8px 0 8px", color: "var(--calamus-terminal-muted)", fontSize: 13 }}>
                  Riesgo: {entry.risk}
                </p>
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
                  Checklist de validacion
                </p>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {entry.checks.map((check) => (
                    <li key={check} style={{ marginBottom: 4 }}>
                      {check}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola A (8 casos)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCases.map((entry) => {
            const selected = entry.id === activeHypertextCase.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseId(entry.id)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${
                    selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"
                  }`,
                  background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)",
                  color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)",
                  cursor: "pointer"
                }}
              >
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 50px" }}>
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
            Caso activo: {activeHypertextCase.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola A :: ${activeHypertextCase.title}`,
              subtitle: "experimental hypertext playground",
              body: []
            }}
          >
            {activeHypertextCase.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola B (8 casos multimedia)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesB.map((entry) => {
            const selected = entry.id === activeHypertextCaseB.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseBId(entry.id)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${
                    selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"
                  }`,
                  background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)",
                  color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)",
                  cursor: "pointer"
                }}
              >
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 60px" }}>
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
            Caso activo: {activeHypertextCaseB.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola B :: ${activeHypertextCaseB.title}`,
              subtitle: "multimedia hypertext playground",
              body: []
            }}
          >
            {activeHypertextCaseB.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola C (ergodico/experimental)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesC.map((entry) => {
            const selected = entry.id === activeHypertextCaseC.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseCId(entry.id)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${
                    selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"
                  }`,
                  background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)",
                  color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)",
                  cursor: "pointer"
                }}
              >
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 70px" }}>
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
            Caso activo: {activeHypertextCaseC.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola C :: ${activeHypertextCaseC.title}`,
              subtitle: "ergodic hypertext playground",
              body: []
            }}
          >
            {activeHypertextCaseC.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola D (metanarrativa/persistencia)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesD.map((entry) => {
            const selected = entry.id === activeHypertextCaseD.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseDId(entry.id)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${
                    selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"
                  }`,
                  background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)",
                  color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)",
                  cursor: "pointer"
                }}
              >
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 80px" }}>
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
            Caso activo: {activeHypertextCaseD.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola D :: ${activeHypertextCaseD.title}`,
              subtitle: "metanarrative hypertext playground",
              body: []
            }}
          >
            {activeHypertextCaseD.render()}
          </Reader>
        </div>
      </div>
    </div>
  );
}

