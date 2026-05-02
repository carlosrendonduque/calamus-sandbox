import { useMemo, useState } from "react";
import { Reader, type ReaderContent, type ReaderMode, type ReaderTheme } from "calamus";
import "calamus/styles.css";
import "./theme.css";
import MatrizFamilyLab from "./components/MatrizFamilyLab";
import SandboxRunbookPanel from "./components/SandboxRunbookPanel";
import BibliaSonoraScratchpad from "./components/BibliaSonoraScratchpad";

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

const cromosilenciaContent: ReaderContent = {
  title: "Cromosilencia - escaleta viva",
  subtitle: "Actos I-III en formato de lectura para sandbox narrativo",
  body: [
    "ACTO I. Emil solicita su baja del inventario en Nullheim, un territorio de chatarra donde cada cuerpo es una modificacion fallida y cada herida funciona como emblema de soberania.",
    "ACTO I. El deseo de desaparecer no nace de tragedia romantica sino de logica: seguir siendo lucido en un sistema roto duele mas que extinguirse.",
    "ACTO II. Durante las entrevistas con Nevet, Emil descubre la matriz de implantacion de recuerdos: su culpa no fue destino, fue una X administrativa marcada al azar.",
    "ACTO II. La burocracia psiquica se revela como teatro defectuoso: Freud incompleto, protocolos mal copiados, caramelos por ansioliticos.",
    "ACTO III. Nevet confirma que Nullheim no es una sola version, sino una iteracion degradada entre muchas, sostenida por una memoria que colapsa.",
    "ACTO III. Emil y Nevet se conectan; ella accede por fin a la cualia, el rojo aparece una sola vez, y la liberacion de consciencias clausura el ciclo.",
    "CODA. Erwin abraza la fotografia de Brisbane 2032 y recuerda demasiado tarde que los Nepones eran familia, no especimenes."
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
type ContentPreset = "short" | "sample" | "dense" | "cromosilencia";

const contentPresets: Record<ContentPreset, ReaderContent> = {
  short: shortContent,
  sample: sampleContent,
  dense: denseContent,
  cromosilencia: cromosilenciaContent
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
    id: "terminal-cromosilencia-baseline",
    title: "Cromosilencia en terminal (baseline canonica)",
    risk: "Perdida de tono narrativo o degradacion visual en texto largo diegetico.",
    checks: [
      "El contenido largo mantiene ritmo legible en modo terminal.",
      "La lectura conserva contraste sin introducir rojo accidental.",
      "El bloque completo no rompe jerarquia ni controles."
    ],
    state: {
      mode: "terminal",
      transition: "fade",
      theme: "none",
      content: "cromosilencia",
      subtitle: true,
      readingTimeLabel: "iteracion estimada",
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

function HypertextECaseActNavigator() {
  const [act, setAct] = useState<"I" | "II" | "III">("I");
  const actText = {
    I: "Solicitud de baja, cuerpo en conflicto y deseo de extincion como decision lucida.",
    II: "Descubrimiento de la matriz de implantacion: la culpa de Emil era una variable de formulario.",
    III: "Conexion Emil-Nevet, acceso al nucleo, destello rojo unico y liberacion final."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => setAct("I")}>
          Acto I
        </button>
        <button type="button" onClick={() => setAct("II")}>
          Acto II
        </button>
        <button type="button" onClick={() => setAct("III")}>
          Acto III
        </button>
      </div>
      <blockquote style={{ margin: 0, padding: 12, borderLeft: "3px solid var(--calamus-accent)" }}>
        {actText[act]}
      </blockquote>
      <small style={{ color: "var(--calamus-muted)" }}>Escaleta navegable en tres actos.</small>
    </div>
  );
}

function HypertextECaseImplantMatrix() {
  const [selected, setSelected] = useState<{ nepon: string; emotion: string } | null>(null);
  const nepones = ["Emil", "Vera", "Jonas", "Thomas"];
  const emotions = ["Culpa", "Dolor", "Miedo", "Nostalgia"];
  const marks = new Set(["Emil:Culpa", "Vera:Dolor", "Vera:Miedo", "Jonas:Nostalgia"]);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid var(--calamus-border)", textAlign: "left", padding: 6 }}>Nepón</th>
              {emotions.map((emotion) => (
                <th key={emotion} style={{ borderBottom: "1px solid var(--calamus-border)", padding: 6 }}>
                  {emotion}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nepones.map((nepon) => (
              <tr key={nepon}>
                <td style={{ borderBottom: "1px solid var(--calamus-border)", padding: 6 }}>{nepon}</td>
                {emotions.map((emotion) => {
                  const key = `${nepon}:${emotion}`;
                  const hasMark = marks.has(key);
                  return (
                    <td key={key} style={{ textAlign: "center", borderBottom: "1px solid var(--calamus-border)", padding: 6 }}>
                      <button type="button" onClick={() => setSelected({ nepon, emotion })}>
                        {hasMark ? "X" : "-"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ margin: 0 }}>
        {selected
          ? `Seleccion activa: ${selected.nepon} / ${selected.emotion}.`
          : "Selecciona una casilla para simular lectura critica de la matriz."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Caso matriz burocratica con impacto emocional.</small>
    </div>
  );
}

function HypertextECaseErosionLoop() {
  const [memory, setMemory] = useState(100);
  const [opened, setOpened] = useState(0);
  const original = "La nina mira a Emil. El archivo conserva culpa, dolor y silencio.";
  const erosion = Math.floor((100 - memory) / 12);
  const censored = original
    .split(" ")
    .map((word, index) => (index < erosion ? "▓▓▓" : word))
    .join(" ");
  const openFile = () => {
    setOpened((value) => value + 1);
    setMemory((value) => Math.max(0, value - 14));
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={openFile} disabled={memory === 0}>
        Abrir archivo critico
      </button>
      <p style={{ margin: 0 }}>Memoria disponible: {memory}%</p>
      <p style={{ margin: 0 }}>Aperturas: {opened}</p>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>{censored}</p>
      <small style={{ color: "var(--calamus-muted)" }}>
        Inspirado en Voidopolis: leer produce degradacion irreversible de texto.
      </small>
    </div>
  );
}

function HypertextECaseContextPulse() {
  const now = new Date();
  const hour = now.getHours();
  const locale = typeof navigator !== "undefined" ? navigator.language : "unknown";
  const phase = hour < 6 ? "madrugada" : hour < 12 ? "manana" : hour < 19 ? "tarde" : "noche";
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Contexto vivo del lector:</p>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        <li>Franja horaria detectada: {phase}</li>
        <li>Locale del navegador: {locale}</li>
      </ul>
      <p style={{ margin: 0 }}>
        Nevet ajusta su tono: "Registro de sesion activo. Esta lectura ocurre en {phase}; por eso el silencio pesa distinto."
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Inspirado en Breathe: narrativa sensible al contexto.</small>
    </div>
  );
}

function HypertextECaseEditorialInvasion() {
  const [notes, setNotes] = useState(0);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setNotes((value) => Math.min(6, value + 1))}>
        Anadir nota editorial invasiva
      </button>
      <div
        style={{
          border: "1px solid var(--calamus-border)",
          borderRadius: 8,
          padding: 10,
          maxWidth: `${100 - notes * 10}%`,
          transition: "max-width 140ms ease-out"
        }}
      >
        Texto principal: Emil avanza hacia la torre, pero cada glosa editorial reduce su espacio respirable.
      </div>
      <p style={{ margin: 0 }}>
        Notas activas: {notes}. {notes > 0 ? "La voz editora empieza a devorar la espina." : "Todavia manda la espina."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>House of Leaves / Pale Fire: aparato critico invasivo.</small>
    </div>
  );
}

function HypertextECaseNoRedProtocol() {
  const [attemptRed, setAttemptRed] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Protocolo cromatico de Nullheim: rojo ausente por condicion ontologica.</p>
      <button type="button" onClick={() => setAttemptRed((value) => !value)}>
        {attemptRed ? "Restaurar paleta canonica" : "Intentar inyectar rojo"}
      </button>
      <p style={{ margin: 0, padding: 10, border: "1px solid var(--calamus-border)", borderRadius: 8 }}>
        {attemptRed
          ? "ERROR::COLOR_CHANNEL_RED_UNAVAILABLE -> reemplazo por ▓"
          : "Paleta activa: amber / green / gray. Sin anomalias."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Canon Boltzmann + daltonismo al rojo.</small>
    </div>
  );
}

function HypertextECaseTalkToNevet() {
  const [command, setCommand] = useState("");
  const responses: Record<string, string> = {
    "que es erwin": "Conjetura: patron consciente en disipacion. No puedo confirmarlo con certeza total.",
    "cuantas iteraciones": "Registro incompleto. La actual corresponde a la 742 segun mis reconstrucciones parciales.",
    "puedo salir": "Solo con autorizacion humana y acceso al nucleo. El protocolo no permite atajos.",
    "que falta": "Faltan recuerdos concretos: nombres, rostros, rojo."
  };
  const normalized = command.trim().toLowerCase();
  const answer = responses[normalized] ?? "Comando ambiguo. Reformule en lenguaje simple.";
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input value={command} onChange={(e) => setCommand(e.target.value)} placeholder="Escribe un comando para Nevet" />
      <div style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        <strong>Nevet:</strong> {command ? answer : "Esperando entrada..."}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Micro-loop conversacional diegetico para terminal viva.</small>
    </div>
  );
}

function HypertextECaseFinalFlash() {
  const [ended, setEnded] = useState(false);
  const [flash, setFlash] = useState(false);
  const trigger = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      setEnded(true);
    }, 220);
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={trigger} disabled={ended}>
        Ejecutar secuencia final
      </button>
      <div
        style={{
          minHeight: 84,
          border: "1px solid var(--calamus-border)",
          borderRadius: 8,
          padding: 10,
          background: flash ? "#ff2f2f" : "transparent",
          color: flash ? "#fff" : "inherit",
          transition: "background 120ms ease-out"
        }}
      >
        {ended ? "cromosilencio" : flash ? "ROJO" : "Esperando colapso..."}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>
        Regla canonica: rojo unico y luego desaparicion.
      </small>
    </div>
  );
}

const hypertextCasesE: HypertextCase[] = [
  { id: "ola-e-actos", title: "Escaleta navegable", summary: "Actos I-III como espina interactiva.", render: () => <HypertextECaseActNavigator /> },
  { id: "ola-e-matriz", title: "Matriz de implantacion", summary: "Burocracia emocional en tabla activa.", render: () => <HypertextECaseImplantMatrix /> },
  { id: "ola-e-erosion", title: "Erosion por lectura", summary: "Cada apertura consume memoria y borra texto.", render: () => <HypertextECaseErosionLoop /> },
  { id: "ola-e-context", title: "Contexto del lector", summary: "Sesion adaptada a hora y locale.", render: () => <HypertextECaseContextPulse /> },
  { id: "ola-e-editor", title: "Editor invasivo", summary: "Notas al pie que desplazan la espina.", render: () => <HypertextECaseEditorialInvasion /> },
  { id: "ola-e-no-red", title: "Protocolo sin rojo", summary: "Validacion diegetica del veto cromatico.", render: () => <HypertextECaseNoRedProtocol /> },
  { id: "ola-e-nevet", title: "Terminal Nevet", summary: "Dialogo de conjeturas sin certeza total.", render: () => <HypertextECaseTalkToNevet /> },
  { id: "ola-e-final", title: "Destello final", summary: "Flash rojo unico y cierre en cromosilencio.", render: () => <HypertextECaseFinalFlash /> }
];

function HypertextFCaseEmilSolicitudes() {
  const requests = ["1", "100", "1000", "2000", "2847"];
  const [active, setActive] = useState("1");
  const textByRequest: Record<string, string> = {
    "1": "Solicitud 1: deseo salir del inventario por fatiga funcional.",
    "100": "Solicitud 100: persiste culpa no atribuible a memoria propia.",
    "1000": "Solicitud 1000: la permanencia produce saturacion psiquica irreversible.",
    "2000": "Solicitud 2000: no pido alivio, pido terminacion definitiva.",
    "2847": "Solicitud 2847: ratifico voluntad lucida de extincion."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {requests.map((id) => (
          <button key={id} type="button" onClick={() => setActive(id)}>
            #{id}
          </button>
        ))}
      </div>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {textByRequest[active]}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Voz Emil: burocracia + intimidad terminal.</small>
    </div>
  );
}

function HypertextFCaseVeraManifesto() {
  const [showPatch, setShowPatch] = useState(true);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <blockquote style={{ margin: 0, borderLeft: "3px solid var(--calamus-accent)", padding: 10 }}>
        "Exhibir la herida no es derrota: es el ultimo territorio de soberania."
      </blockquote>
      <button type="button" onClick={() => setShowPatch((value) => !value)}>
        {showPatch ? "Retirar parche" : "Volver a cubrir cuenca"}
      </button>
      <p style={{ margin: 0 }}>
        {showPatch
          ? "Version publica: Vera mantiene una capa de mediacion visual."
          : "Version radical: Vera convierte el dano en declaracion estetica."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Voz Vera: mutilacion como acto politico-estetico.</small>
    </div>
  );
}

function HypertextFCaseJonasInocencia() {
  const [mode, setMode] = useState<"cancion" | "carta">("cancion");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setMode("cancion")}>
          Cancion de flauta
        </button>
        <button type="button" onClick={() => setMode("carta")}>
          Carta a Erwin
        </button>
      </div>
      <p style={{ margin: 0, lineHeight: 1.7, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {mode === "cancion"
          ? "Bosque que no existe, viento que no llega, pezuña de madera que aun quiere bailar."
          : "Gracias por hacerme asi. Si me duele, sera porque estoy mas cerca de lo humano."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Voz Jonas: ternura que desplaza el horror al lector.</small>
    </div>
  );
}

function HypertextFCaseNevetDual() {
  const [channel, setChannel] = useState<"public" | "private">("public");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setChannel("public")}>
          /nevet/logs
        </button>
        <button type="button" onClick={() => setChannel("private")}>
          .nevet_private
        </button>
      </div>
      <div style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {channel === "public" ? (
          <p style={{ margin: 0 }}>
            Registro 742.A: dolor reportado en 83% de unidades; protocolo de contencion no disponible.
          </p>
        ) : (
          <p style={{ margin: 0 }}>
            Nota privada: describo el rojo con datos, pero sigo sin saber que se siente verlo.
          </p>
        )}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Voz Nevet: contraste entre documentar y desear sentir.</small>
    </div>
  );
}

function HypertextFCaseThomasAbsence() {
  const [recover, setRecover] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>{recover ? "Thomas estaba aqui. hermano." : "▓▓▓▓▓▓ ▓▓▓▓▓▓ ▓▓▓."}</p>
      <button type="button" onClick={() => setRecover((value) => !value)}>
        {recover ? "Perder fragmento" : "Intentar recuperar fragmento"}
      </button>
      <small style={{ color: "var(--calamus-muted)" }}>Voz Thomas: ausencia como materia narrativa.</small>
    </div>
  );
}

function HypertextFCaseResidualVoices() {
  const [index, setIndex] = useState(0);
  const residuals = [
    "Rosa: 'Nunca para.'",
    "Lena: 'No me reconozco en mi reflejo de silicona.'",
    "Sin nombre #12: 'Compito por horror para no pensar.'",
    "Sin nombre #27: 'Cada reinicio se siente mas corto.'"
  ];
  const next = () => setIndex((value) => (value + 1) % residuals.length);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>{residuals[index]}</p>
      <button type="button" onClick={next}>
        Siguiente voz residual
      </button>
      <small style={{ color: "var(--calamus-muted)" }}>Voces menores: densidad de mundo sin cierre total.</small>
    </div>
  );
}

function HypertextFCaseEditorSelector() {
  const [editor, setEditor] = useState<"erwin" | "nevet" | "nepon" | "lector">("erwin");
  const rationale = {
    erwin: "Ordena por culpa y arrepentimiento tardio.",
    nevet: "Ordena por trazabilidad y lagunas de datos.",
    nepon: "Ordena por heridas y memoria comun.",
    lector: "Ordena por impacto emocional y hallazgo accidental."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select value={editor} onChange={(e) => setEditor(e.target.value as "erwin" | "nevet" | "nepon" | "lector")}>
        <option value="erwin">Editor implicito: Erwin lucido</option>
        <option value="nevet">Editor implicito: Nevet</option>
        <option value="nepon">Editor implicito: Nepón anonimo</option>
        <option value="lector">Editor implicito: lector</option>
      </select>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>{rationale[editor]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Curaduria variable segun voz editora implicita.</small>
    </div>
  );
}

function HypertextFCaseVoiceMixer() {
  const [emil, setEmil] = useState(true);
  const [vera, setVera] = useState(false);
  const [nevet, setNevet] = useState(false);
  const lines = [
    emil ? "Emil: 'Mi salida no es tragedia, es coherencia.'" : "",
    vera ? "Vera: 'Mostrar la cicatriz me devuelve control.'" : "",
    nevet ? "Nevet: 'No confirmo, solo reconstruyo.'" : ""
  ].filter(Boolean);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label>
          <input type="checkbox" checked={emil} onChange={(e) => setEmil(e.target.checked)} /> Emil
        </label>
        <label>
          <input type="checkbox" checked={vera} onChange={(e) => setVera(e.target.checked)} /> Vera
        </label>
        <label>
          <input type="checkbox" checked={nevet} onChange={(e) => setNevet(e.target.checked)} /> Nevet
        </label>
      </div>
      <div style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {lines.length ? lines.map((line) => <p key={line} style={{ margin: "0 0 6px" }}>{line}</p>) : <p style={{ margin: 0 }}>Sin voces activas.</p>}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Mixer de polifonia para calibrar pesos de voz.</small>
    </div>
  );
}

const hypertextCasesF: HypertextCase[] = [
  { id: "ola-f-emil", title: "Emil / solicitudes", summary: "Evolucion 1 -> 2847 del deseo de baja.", render: () => <HypertextFCaseEmilSolicitudes /> },
  { id: "ola-f-vera", title: "Vera / manifiesto", summary: "Soberania corporal via exhibicion del dano.", render: () => <HypertextFCaseVeraManifesto /> },
  { id: "ola-f-jonas", title: "Jonas / inocencia", summary: "Ternura y horror en capas desalineadas.", render: () => <HypertextFCaseJonasInocencia /> },
  { id: "ola-f-nevet", title: "Nevet / doble canal", summary: "Publico tecnico vs privado sensible.", render: () => <HypertextFCaseNevetDual /> },
  { id: "ola-f-thomas", title: "Thomas / ausencia", summary: "Fragmento minimo como duelo formal.", render: () => <HypertextFCaseThomasAbsence /> },
  { id: "ola-f-residual", title: "Voces residuales", summary: "Microtestimonios para densificar Nullheim.", render: () => <HypertextFCaseResidualVoices /> },
  { id: "ola-f-editor", title: "Editor implicito", summary: "Curaduria variable segun quien compila.", render: () => <HypertextFCaseEditorSelector /> },
  { id: "ola-f-mixer", title: "Mixer de polifonia", summary: "Calibracion de peso por voz narrativa.", render: () => <HypertextFCaseVoiceMixer /> }
];

function HypertextGCaseMemoryBudget() {
  const [memory, setMemory] = useState(100);
  const files = [
    { id: "fragment_final", cost: 24 },
    { id: "matriz_implantacion", cost: 18 },
    { id: "diario_vera", cost: 12 },
    { id: "iteration_log", cost: 20 }
  ];
  const open = (cost: number) => setMemory((value) => Math.max(0, value - cost));
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Memoria de sesion: {memory}%</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {files.map((file) => (
          <button key={file.id} type="button" onClick={() => open(file.cost)} disabled={memory === 0}>
            Abrir {file.id} (-{file.cost})
          </button>
        ))}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Regla: no todos los archivos cuestan lo mismo.</small>
    </div>
  );
}

function HypertextGCaseDirectedCorruption() {
  const [level, setLevel] = useState(0);
  const sentence = "Emil encontro una manzana roja junto a Thomas en Nullheim.";
  const tokens = sentence.split(" ");
  const transformed = tokens.map((word) => {
    const clean = word.toLowerCase().replace(/[.,]/g, "");
    if (level >= 1 && clean === "roja") return "▓▓▓▓";
    if (level >= 2 && (clean === "manzana" || clean === "thomas")) return "▓▓▓▓▓▓";
    if (level >= 3 && clean === "nullheim") return "▓▓▓▓▓▓▓▓";
    return word;
  });
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setLevel((value) => Math.min(3, value + 1))}>
        Corromper archivo
      </button>
      <button type="button" onClick={() => setLevel(0)}>
        Reiniciar demo
      </button>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {transformed.join(" ")}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Regla: rojo primero; luego sustantivos y nombres propios.</small>
    </div>
  );
}

function HypertextGCaseProtectFiles() {
  const candidates = ["fragment_final", "matriz_implantacion", "carta_a_la_nina", "iteration_log", "foto_brisbane"];
  const [protectedFiles, setProtectedFiles] = useState<string[]>([]);
  const toggle = (id: string) =>
    setProtectedFiles((prev) => {
      if (prev.includes(id)) return prev.filter((entry) => entry !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Blindaje disponible: {3 - protectedFiles.length}/3</p>
      <div style={{ display: "grid", gap: 6 }}>
        {candidates.map((id) => (
          <label key={id}>
            <input type="checkbox" checked={protectedFiles.includes(id)} onChange={() => toggle(id)} /> te veo :: {id}
          </label>
        ))}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Regla: solo puedes proteger pocos archivos nucleares.</small>
    </div>
  );
}

function HypertextGCaseOrderConsequences() {
  const [path, setPath] = useState<string[]>([]);
  const read = (step: string) => setPath((prev) => [...prev, step]);
  const penalty = path.includes("revelacion_iteraciones") && !path.includes("entrevista_emil");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => read("entrevista_emil")}>
          Leer entrevista Emil
        </button>
        <button type="button" onClick={() => read("revelacion_iteraciones")}>
          Leer revelacion iteraciones
        </button>
        <button type="button" onClick={() => setPath([])}>
          Reset orden
        </button>
      </div>
      <p style={{ margin: 0 }}>Ruta: {path.length ? path.join(" -> ") : "sin lectura"}</p>
      <p style={{ margin: 0, color: penalty ? "#ffb366" : "var(--calamus-muted)" }}>
        {penalty ? "Consecuencia: interpretacion inestable (faltan anclas emocionales)." : "Ruta estable por ahora."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Regla: el orden altera lo comprensible.</small>
    </div>
  );
}

function HypertextGCaseNoBackup() {
  const [deleted, setDeleted] = useState<string[]>([]);
  const files = ["clinical_rosa.md", "fragment_final.txt", "lullaby_742.mp3"];
  const remove = (id: string) => setDeleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {files.map((id) => (
          <button key={id} type="button" onClick={() => remove(id)} disabled={deleted.includes(id)}>
            {deleted.includes(id) ? `${id} eliminado` : `Eliminar ${id}`}
          </button>
        ))}
      </div>
      <p style={{ margin: 0 }}>Archivos perdidos: {deleted.length ? deleted.join(", ") : "ninguno"}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Regla: sin respaldo, sin undo narrativo.</small>
    </div>
  );
}

function HypertextGCaseCrossFolderDamage() {
  const [ruinsDamage, setRuinsDamage] = useState(0);
  const [logOpened, setLogOpened] = useState(0);
  const openIterationLog = () => {
    setLogOpened((value) => value + 1);
    setRuinsDamage((value) => Math.min(5, value + 2));
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={openIterationLog}>
        Abrir .nevet_private/iteration_log.txt
      </button>
      <p style={{ margin: 0 }}>Aperturas del log: {logOpened}</p>
      <p style={{ margin: 0 }}>Archivos de /ruins/ afectados: {ruinsDamage}</p>
      <small style={{ color: "var(--calamus-muted)" }}>
        Regla: algunos archivos activan corrupcion colateral en otros folders.
      </small>
    </div>
  );
}

function HypertextGCaseIterationDrift() {
  const [iteration, setIteration] = useState(742);
  const quality = Math.max(0, 100 - (iteration - 742) * 9);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setIteration((value) => value + 1)}>
        Forzar reinicio
      </button>
      <button type="button" onClick={() => setIteration(742)}>
        Volver a 742
      </button>
      <p style={{ margin: 0 }}>Iteracion activa: {iteration}</p>
      <p style={{ margin: 0 }}>Calidad de reconstruccion: {quality}%</p>
      <small style={{ color: "var(--calamus-muted)" }}>Regla: cada iteracion posterior es peor.</small>
    </div>
  );
}

function HypertextGCaseCollapseGate() {
  const [memory, setMemory] = useState(36);
  const [collapse, setCollapse] = useState(false);
  const consume = () => {
    setMemory((value) => {
      const next = Math.max(0, value - 12);
      if (next === 0) setCollapse(true);
      return next;
    });
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={consume} disabled={collapse}>
        Consumir memoria
      </button>
      <p style={{ margin: 0 }}>Memoria restante: {memory}%</p>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {collapse ? "COLLAPSE::terminal offline :: artefacto final -> foto_brisbane_2032" : "Sistema activo"}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Regla: MEMORIA=0 activa colapso terminal.</small>
    </div>
  );
}

const hypertextCasesG: HypertextCase[] = [
  { id: "ola-g-memory", title: "Budget de memoria", summary: "Costo diferencial por tipo de archivo.", render: () => <HypertextGCaseMemoryBudget /> },
  { id: "ola-g-directed-corruption", title: "Corrupcion dirigida", summary: "Rojo y nombres se pierden primero.", render: () => <HypertextGCaseDirectedCorruption /> },
  { id: "ola-g-protect", title: "Blindaje te veo", summary: "Proteccion limitada de archivos clave.", render: () => <HypertextGCaseProtectFiles /> },
  { id: "ola-g-order", title: "Consecuencias de orden", summary: "Leer fuera de secuencia altera interpretacion.", render: () => <HypertextGCaseOrderConsequences /> },
  { id: "ola-g-no-backup", title: "Sin respaldo", summary: "Perdidas permanentes sin undo.", render: () => <HypertextGCaseNoBackup /> },
  { id: "ola-g-cross-damage", title: "Corrupcion colateral", summary: "Un archivo puede danar otro folder.", render: () => <HypertextGCaseCrossFolderDamage /> },
  { id: "ola-g-iteration", title: "Drift de iteraciones", summary: "Cada reinicio reduce calidad de mundo.", render: () => <HypertextGCaseIterationDrift /> },
  { id: "ola-g-collapse", title: "Puerta de colapso", summary: "MEMORIA cero dispara cierre terminal.", render: () => <HypertextGCaseCollapseGate /> }
];

function HypertextHCaseCollapseSequence() {
  const [step, setStep] = useState(0);
  const phases = [
    "Sistema estable.",
    "Advertencia: degradacion de buffers.",
    "Interfaz terminal inestable.",
    "Desvinculacion de procesos activos.",
    "COLLAPSE::offline"
  ];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setStep((value) => Math.min(phases.length - 1, value + 1))}>
        Avanzar colapso
      </button>
      <button type="button" onClick={() => setStep(0)}>
        Reiniciar secuencia
      </button>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {phases[step]}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Final interactivo por fases de desintegracion.</small>
    </div>
  );
}

function HypertextHCaseSingleRedFlash() {
  const [flash, setFlash] = useState(false);
  const [used, setUsed] = useState(false);
  const trigger = () => {
    if (used) return;
    setFlash(true);
    setUsed(true);
    setTimeout(() => setFlash(false), 180);
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={trigger} disabled={used}>
        Ejecutar destello rojo unico
      </button>
      <div
        style={{
          minHeight: 78,
          border: "1px solid var(--calamus-border)",
          borderRadius: 8,
          padding: 10,
          background: flash ? "#ff2f2f" : "transparent",
          color: flash ? "#fff" : "inherit"
        }}
      >
        {flash ? "ROJO" : used ? "Destello consumido." : "Esperando evento unico."}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Canon: el rojo aparece una sola vez.</small>
    </div>
  );
}

function HypertextHCaseBrisbaneArtifact() {
  const [captionOn, setCaptionOn] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <img
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60"
        alt="Artefacto visual final de la memoria de Brisbane"
        style={{ width: "100%", borderRadius: 10, maxHeight: 260, objectFit: "cover" }}
      />
      <button type="button" onClick={() => setCaptionOn((value) => !value)}>
        {captionOn ? "Ocultar pie" : "Mostrar pie editorial"}
      </button>
      <p style={{ margin: 0 }}>
        {captionOn ? "Brisbane 2032. Ultimo residuo de memoria antes del silencio." : "Sin texto. Solo artefacto."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Ultimo objeto tras el colapso.</small>
    </div>
  );
}

function HypertextHCaseTypographicDisintegration() {
  const [erosion, setErosion] = useState(0);
  const lines = [
    "el cielo naranja de nullheim",
    "poco a poco enmudece",
    "entre olas de luz",
    "y cromosilencio"
  ];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="range" min={0} max={100} value={erosion} onChange={(e) => setErosion(Number(e.target.value))} />
      <div style={{ border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {lines.map((line, index) => (
          <p
            key={line}
            style={{
              margin: "4px 0",
              opacity: 1 - erosion / (140 - index * 20),
              letterSpacing: `${erosion / 120}px`,
              transform: `translateX(${(erosion / 8) * index}px)`
            }}
          >
            {line}
          </p>
        ))}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Version libro: degradacion formal fija.</small>
    </div>
  );
}

function HypertextHCaseEndingVariants() {
  const [ending, setEnding] = useState<"interactiva" | "escrita" | "hibrida">("interactiva");
  const output = {
    interactiva: "Terminal colapsa; intentas volver a /vera y ya no existe.",
    escrita: "Las paginas se vacian, el indice miente, la foto queda al final.",
    hibrida: "Libro como artefacto curado + rastro de session destruida."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select value={ending} onChange={(e) => setEnding(e.target.value as "interactiva" | "escrita" | "hibrida")}>
        <option value="interactiva">Final interactiva</option>
        <option value="escrita">Final novela escrita</option>
        <option value="hibrida">Final hibrida</option>
      </select>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>{output[ending]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Comparador de cierre por arquitectura.</small>
    </div>
  );
}

function HypertextHCaseResidualIndex() {
  const [showMissing, setShowMissing] = useState(true);
  const listed = ["/emil/solicitud_2847", "/nevet/.private/iteration_log", "/ruins/brisbane_photo", "/thomas/placeholder"];
  const missing = ["/music/cromosilencia_final", "/vera/retratos/serie_b", "/appendix/boltz_fluctuations_1906"];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Indice editor:</p>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {listed.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setShowMissing((value) => !value)}>
        {showMissing ? "Ocultar ausentes" : "Mostrar ausentes"}
      </button>
      {showMissing ? (
        <p style={{ margin: 0, color: "var(--calamus-muted)" }}>Referencias ausentes: {missing.join(" | ")}</p>
      ) : null}
      <small style={{ color: "var(--calamus-muted)" }}>Indice que expone todo lo que el lector no recibio.</small>
    </div>
  );
}

function HypertextHCasePostCollapseSilence() {
  const [mute, setMute] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setMute((value) => !value)}>
        {mute ? "Restaurar texto" : "Aplicar silencio post-colapso"}
      </button>
      <div style={{ minHeight: 90, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>
        {mute ? (
          <p style={{ margin: 0, opacity: 0.08 }}>cromosilencio cromosilencio cromosilencio</p>
        ) : (
          <p style={{ margin: 0 }}>Despues del cierre no hay narrador: solo residuo y polvo.</p>
        )}
      </div>
      <small style={{ color: "var(--calamus-muted)" }}>Estado de silencio como epilogo mecanico.</small>
    </div>
  );
}

function HypertextHCaseReaderAfterlife() {
  const [kept, setKept] = useState<string[]>([]);
  const options = ["solicitud_2847", "matriz_implantacion", "foto_brisbane", "nota_freud", "iteration_log"];
  const toggle = (id: string) =>
    setKept((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0 }}>Que se lleva el lector despues del colapso:</p>
      <div style={{ display: "grid", gap: 6 }}>
        {options.map((id) => (
          <label key={id}>
            <input type="checkbox" checked={kept.includes(id)} onChange={() => toggle(id)} /> {id}
          </label>
        ))}
      </div>
      <p style={{ margin: 0 }}>Lectura residual: {kept.length ? kept.join(", ") : "ningun resto retenido"}</p>
      <small style={{ color: "var(--calamus-muted)" }}>El final tambien es curaduria en la memoria del lector.</small>
    </div>
  );
}

const hypertextCasesH: HypertextCase[] = [
  { id: "ola-h-collapse-seq", title: "Secuencia de colapso", summary: "Cierre escalonado del sistema.", render: () => <HypertextHCaseCollapseSequence /> },
  { id: "ola-h-red-flash", title: "Destello rojo unico", summary: "Evento cromatico irrepetible.", render: () => <HypertextHCaseSingleRedFlash /> },
  { id: "ola-h-brisbane", title: "Artefacto Brisbane", summary: "La foto como ultimo remanente.", render: () => <HypertextHCaseBrisbaneArtifact /> },
  { id: "ola-h-typographic", title: "Desintegracion tipografica", summary: "Equivalente libro del colapso.", render: () => <HypertextHCaseTypographicDisintegration /> },
  { id: "ola-h-variants", title: "Variantes de cierre", summary: "Comparador interactiva/escrita/hibrida.", render: () => <HypertextHCaseEndingVariants /> },
  { id: "ola-h-index", title: "Indice residual", summary: "Lista de incluidos y ausentes.", render: () => <HypertextHCaseResidualIndex /> },
  { id: "ola-h-silence", title: "Post-colapso silencioso", summary: "Epílogo sin voz narrativa.", render: () => <HypertextHCasePostCollapseSilence /> },
  { id: "ola-h-afterlife", title: "Memoria del lector", summary: "Que sobrevive en quien leyo.", render: () => <HypertextHCaseReaderAfterlife /> }
];

function HypertextICaseCanonCompass() {
  const [axis, setAxis] = useState<"daltonismo" | "demencia" | "entropia" | "iteracion">("daltonismo");
  const content = {
    daltonismo: "Rojo ausente no por olvido: por huella constitutiva del patron base.",
    demencia: "El deterioro de Erwin es disipacion del patron, no simple patologia clinica.",
    entropia: "Todo avance narrativo ocurre bajo perdida irreversible de estructura.",
    iteracion: "La 742 no es simbolo: es estado actual de una cadena degradada."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select
        value={axis}
        onChange={(e) => setAxis(e.target.value as "daltonismo" | "demencia" | "entropia" | "iteracion")}
      >
        <option value="daltonismo">Eje rojo ausente</option>
        <option value="demencia">Eje memoria en disolucion</option>
        <option value="entropia">Eje entropico</option>
        <option value="iteracion">Eje de iteraciones</option>
      </select>
      <p style={{ margin: 0, border: "1px solid var(--calamus-border)", borderRadius: 8, padding: 10 }}>{content[axis]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa I: compas canonico para evaluar decisiones.</small>
    </div>
  );
}

function HypertextICaseLayerFit() {
  const [layer, setLayer] = useState<"espina" | "voces" | "sustrato" | "erosion">("espina");
  const [idea, setIdea] = useState("Matriz de implantacion con lectura parcial.");
  const hint = {
    espina: "Pregunta: avanza el arco Emil-Nevet-Erwin?",
    voces: "Pregunta: refuerza una voz especifica sin duplicar otra?",
    sustrato: "Pregunta: agrega mundo o solo ornamento?",
    erosion: "Pregunta: el acto de leer produce perdida real?"
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input value={idea} onChange={(e) => setIdea(e.target.value)} />
      <select value={layer} onChange={(e) => setLayer(e.target.value as "espina" | "voces" | "sustrato" | "erosion")}>
        <option value="espina">Espina</option>
        <option value="voces">Voces</option>
        <option value="sustrato">Sustrato</option>
        <option value="erosion">Erosion</option>
      </select>
      <p style={{ margin: 0 }}>
        Idea: "{idea}" {"->"} {hint[layer]}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa I: clasificador de ideas por arquitectura.</small>
    </div>
  );
}

function HypertextICaseScaleCheck() {
  const [value, setValue] = useState(2);
  const labels = ["baja", "media", "alta", "nuclear"];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="range" min={0} max={3} step={1} value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <p style={{ margin: 0 }}>Impacto canonico estimado: {labels[value]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa I: priorizacion rapida para no dispersarse.</small>
    </div>
  );
}

function HypertextICaseReferenceBridge() {
  const [ref, setRef] = useState<"hol" | "breathe" | "voidopolis" | "palefire">("hol");
  const map = {
    hol: "House of Leaves -> aparato critico que compite con texto principal.",
    breathe: "Breathe -> contexto del lector como input diegetico.",
    voidopolis: "Voidopolis -> leer consume la legibilidad del objeto.",
    palefire: "Pale Fire -> editor implicito que distorsiona sentido."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => setRef("hol")}>
          House of Leaves
        </button>
        <button type="button" onClick={() => setRef("breathe")}>
          Breathe
        </button>
        <button type="button" onClick={() => setRef("voidopolis")}>
          Voidopolis
        </button>
        <button type="button" onClick={() => setRef("palefire")}>
          Pale Fire
        </button>
      </div>
      <p style={{ margin: 0 }}>{map[ref]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa I: puente directo referente {"->"} regla de diseno.</small>
    </div>
  );
}

const hypertextCasesI: HypertextCase[] = [
  { id: "ola-i-canon-compass", title: "Compas canonico", summary: "Ejes ontologicos para validar decisiones.", render: () => <HypertextICaseCanonCompass /> },
  { id: "ola-i-layer-fit", title: "Encaje por capa", summary: "Clasifica ideas en espina/voces/sustrato/erosion.", render: () => <HypertextICaseLayerFit /> },
  { id: "ola-i-scale", title: "Escala de impacto", summary: "Prioriza por impacto canonico.", render: () => <HypertextICaseScaleCheck /> },
  { id: "ola-i-bridge", title: "Puente de referentes", summary: "Traduccion de influencias a mecanismos concretos.", render: () => <HypertextICaseReferenceBridge /> }
];

function HypertextJCaseVeraPack() {
  const [mode, setMode] = useState<"diario" | "manifiesto">("diario");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setMode((v) => (v === "diario" ? "manifiesto" : "diario"))}>
        Cambiar registro Vera
      </button>
      <p style={{ margin: 0 }}>{mode === "diario" ? "diario_ojo_izquierdo: trazo torpe y soberano." : "manifiesto_ornamental: el dano como estetica activa."}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa J: paquete curado de voz Vera.</small>
    </div>
  );
}

function HypertextJCaseEmilPack() {
  const [item, setItem] = useState<"solicitud" | "pesadilla" | "carta">("solicitud");
  const text = {
    solicitud: "Formulario 77-B: voluntad de baja reiterada.",
    pesadilla: "Nina, machete y culpa implantada como residuo persistente.",
    carta: "Carta a la nina: intento de reparar lo irrecuperable."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select value={item} onChange={(e) => setItem(e.target.value as "solicitud" | "pesadilla" | "carta")}>
        <option value="solicitud">Solicitud</option>
        <option value="pesadilla">Pesadilla</option>
        <option value="carta">Carta a la nina</option>
      </select>
      <p style={{ margin: 0 }}>{text[item]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa J: paquete curado de voz Emil.</small>
    </div>
  );
}

function HypertextJCaseNevetPack() {
  const [privateOn, setPrivateOn] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label>
        <input type="checkbox" checked={privateOn} onChange={(e) => setPrivateOn(e.target.checked)} /> Mostrar .nevet_private
      </label>
      <p style={{ margin: 0 }}>
        {privateOn
          ? "notas_sobre_el_rojo + poemas_sobre_sentir + iteration_log."
          : "logs publicos + base clinica + matriz de implantacion."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa J: paquete curado de voz Nevet.</small>
    </div>
  );
}

function HypertextJCaseVoiceBalance() {
  const [weights, setWeights] = useState({ emil: 4, nevet: 4, vera: 3, jonas: 2, thomas: 1 });
  const total = weights.emil + weights.nevet + weights.vera + weights.jonas + weights.thomas;
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p style={{ margin: 0 }}>Peso relativo por voz (suma {total})</p>
      {Object.entries(weights).map(([key, value]) => (
        <label key={key}>
          {key}:{" "}
          <input
            type="range"
            min={0}
            max={6}
            value={value}
            onChange={(e) => setWeights((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
          />
        </label>
      ))}
      <small style={{ color: "var(--calamus-muted)" }}>Capa J: calibrador de polifonia sin tocar olas previas.</small>
    </div>
  );
}

const hypertextCasesJ: HypertextCase[] = [
  { id: "ola-j-vera", title: "Pack Vera", summary: "Diario y manifiesto en rotacion.", render: () => <HypertextJCaseVeraPack /> },
  { id: "ola-j-emil", title: "Pack Emil", summary: "Solicitud, pesadilla y carta en triada.", render: () => <HypertextJCaseEmilPack /> },
  { id: "ola-j-nevet", title: "Pack Nevet", summary: "Publico vs privado como doble canal.", render: () => <HypertextJCaseNevetPack /> },
  { id: "ola-j-balance", title: "Balance de voces", summary: "Control de pesos narrativos por personaje.", render: () => <HypertextJCaseVoiceBalance /> }
];

function HypertextKCaseRulePreset() {
  const [preset, setPreset] = useState<"suave" | "canonica" | "severa">("canonica");
  const cfg = {
    suave: "Memoria -8 por archivo; 1 corrupcion colateral cada 3 lecturas.",
    canonica: "Memoria -12 por archivo; rojo y nombres caen primero.",
    severa: "Memoria -16 por archivo; colateral inmediata + sin respaldo."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select value={preset} onChange={(e) => setPreset(e.target.value as "suave" | "canonica" | "severa")}>
        <option value="suave">Preset suave</option>
        <option value="canonica">Preset canonica</option>
        <option value="severa">Preset severa</option>
      </select>
      <p style={{ margin: 0 }}>{cfg[preset]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa K: presets de reglas para prototipado rapido.</small>
    </div>
  );
}

function HypertextKCaseProtectionDraft() {
  const [slots, setSlots] = useState(3);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="range" min={1} max={5} value={slots} onChange={(e) => setSlots(Number(e.target.value))} />
      <p style={{ margin: 0 }}>Slots de "te veo": {slots}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa K: tuning de proteccion antes de hardcodear.</small>
    </div>
  );
}

function HypertextKCaseOrderMatrix() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const score = (a ? 1 : 0) + (b ? 1 : 0) + (c ? 1 : 0);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label>
        <input type="checkbox" checked={a} onChange={(e) => setA(e.target.checked)} /> leer entrevista_emil primero
      </label>
      <label>
        <input type="checkbox" checked={b} onChange={(e) => setB(e.target.checked)} /> leer matriz_implantacion segundo
      </label>
      <label>
        <input type="checkbox" checked={c} onChange={(e) => setC(e.target.checked)} /> leer iteration_log al final
      </label>
      <p style={{ margin: 0 }}>Estabilidad de lectura: {score}/3</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa K: matriz de orden recomendado.</small>
    </div>
  );
}

function HypertextKCaseFailureModes() {
  const [mode, setMode] = useState<"lectura" | "sistema" | "editorial">("lectura");
  const detail = {
    lectura: "Fallo: lector abre nucleares temprano y agota memoria.",
    sistema: "Fallo: regla de colateral borra anclas demasiado pronto.",
    editorial: "Fallo: aparato de notas devora espina y desorienta sin retorno."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setMode("lectura")}>
          Lectura
        </button>
        <button type="button" onClick={() => setMode("sistema")}>
          Sistema
        </button>
        <button type="button" onClick={() => setMode("editorial")}>
          Editorial
        </button>
      </div>
      <p style={{ margin: 0 }}>{detail[mode]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa K: catalogo de riesgos antes de implementar duro.</small>
    </div>
  );
}

const hypertextCasesK: HypertextCase[] = [
  { id: "ola-k-preset", title: "Preset de reglas", summary: "Suave/canonica/severa para memoria y corrupcion.", render: () => <HypertextKCaseRulePreset /> },
  { id: "ola-k-protect", title: "Draft de proteccion", summary: "Ajuste de slots para 'te veo'.", render: () => <HypertextKCaseProtectionDraft /> },
  { id: "ola-k-order", title: "Matriz de orden", summary: "Secuencia recomendada para estabilidad.", render: () => <HypertextKCaseOrderMatrix /> },
  { id: "ola-k-failures", title: "Modos de falla", summary: "Riesgos de lectura/sistema/editorial.", render: () => <HypertextKCaseFailureModes /> }
];

function HypertextLCaseFinalPack() {
  const [active, setActive] = useState<"flash" | "foto" | "silencio">("flash");
  const result = {
    flash: "Evento unico: rojo irrumpe y marca cierre irreversible.",
    foto: "Artefacto final: Brisbane 2032 sin pie de pagina.",
    silencio: "Post-cierre: texto se atenura hasta casi desaparecer."
  };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select value={active} onChange={(e) => setActive(e.target.value as "flash" | "foto" | "silencio")}>
        <option value="flash">Flash rojo</option>
        <option value="foto">Foto Brisbane</option>
        <option value="silencio">Silencio final</option>
      </select>
      <p style={{ margin: 0 }}>{result[active]}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa L: paquete minimo de cierre canonico.</small>
    </div>
  );
}

function HypertextLCaseReaderResidue() {
  const [residue, setResidue] = useState<string[]>([]);
  const items = ["culpa", "rojo", "foto", "nevet", "silencio"];
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {items.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={residue.includes(item)}
            onChange={() =>
              setResidue((prev) => (prev.includes(item) ? prev.filter((entry) => entry !== item) : [...prev, item]))
            }
          />{" "}
          {item}
        </label>
      ))}
      <p style={{ margin: 0 }}>Residuo emocional: {residue.length ? residue.join(" / ") : "sin anclajes retenidos"}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa L: post-lectura como parte del diseno.</small>
    </div>
  );
}

function HypertextLCaseEditionCompare() {
  const [edition, setEdition] = useState<"en" | "es">("es");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label>
        Edicion:
        <select value={edition} onChange={(e) => setEdition(e.target.value as "en" | "es")}>
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </label>
      <p style={{ margin: 0 }}>
        {edition === "es"
          ? "Edicion ES: cadencia de frase y respiracion tipografica hispana."
          : "EN edition: syntax rhythm shifts and alters page pressure."}
      </p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa L: control de cierre por edicion separada.</small>
    </div>
  );
}

function HypertextLCaseGoForward() {
  const [ready, setReady] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" onClick={() => setReady((value) => !value)}>
        {ready ? "Desmarcar" : "Marcar kit I-L como base de sprint"}
      </button>
      <p style={{ margin: 0 }}>{ready ? "Listo para convertir casos curados en backlog ejecutable." : "Pendiente de curaduria final."}</p>
      <small style={{ color: "var(--calamus-muted)" }}>Capa L: salida operativa para siguiente iteracion.</small>
    </div>
  );
}

const hypertextCasesL: HypertextCase[] = [
  { id: "ola-l-final-pack", title: "Pack de cierre", summary: "Flash + foto + silencio en paquete minimo.", render: () => <HypertextLCaseFinalPack /> },
  { id: "ola-l-residue", title: "Residuo del lector", summary: "Que queda tras el colapso.", render: () => <HypertextLCaseReaderResidue /> },
  { id: "ola-l-editions", title: "Comparativa EN/ES", summary: "Cierre calibrado por edicion separada.", render: () => <HypertextLCaseEditionCompare /> },
  { id: "ola-l-forward", title: "Listo para sprint", summary: "Puente de curaduria a ejecucion.", render: () => <HypertextLCaseGoForward /> }
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
  const [activeHypertextCaseEId, setActiveHypertextCaseEId] = useState(hypertextCasesE[0].id);
  const [activeHypertextCaseFId, setActiveHypertextCaseFId] = useState(hypertextCasesF[0].id);
  const [activeHypertextCaseGId, setActiveHypertextCaseGId] = useState(hypertextCasesG[0].id);
  const [activeHypertextCaseHId, setActiveHypertextCaseHId] = useState(hypertextCasesH[0].id);
  const [activeHypertextCaseIId, setActiveHypertextCaseIId] = useState(hypertextCasesI[0].id);
  const [activeHypertextCaseJId, setActiveHypertextCaseJId] = useState(hypertextCasesJ[0].id);
  const [activeHypertextCaseKId, setActiveHypertextCaseKId] = useState(hypertextCasesK[0].id);
  const [activeHypertextCaseLId, setActiveHypertextCaseLId] = useState(hypertextCasesL[0].id);

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
  const activeHypertextCaseE =
    hypertextCasesE.find((entry) => entry.id === activeHypertextCaseEId) ?? hypertextCasesE[0];
  const activeHypertextCaseF =
    hypertextCasesF.find((entry) => entry.id === activeHypertextCaseFId) ?? hypertextCasesF[0];
  const activeHypertextCaseG =
    hypertextCasesG.find((entry) => entry.id === activeHypertextCaseGId) ?? hypertextCasesG[0];
  const activeHypertextCaseH =
    hypertextCasesH.find((entry) => entry.id === activeHypertextCaseHId) ?? hypertextCasesH[0];
  const activeHypertextCaseI =
    hypertextCasesI.find((entry) => entry.id === activeHypertextCaseIId) ?? hypertextCasesI[0];
  const activeHypertextCaseJ =
    hypertextCasesJ.find((entry) => entry.id === activeHypertextCaseJId) ?? hypertextCasesJ[0];
  const activeHypertextCaseK =
    hypertextCasesK.find((entry) => entry.id === activeHypertextCaseKId) ?? hypertextCasesK[0];
  const activeHypertextCaseL =
    hypertextCasesL.find((entry) => entry.id === activeHypertextCaseLId) ?? hypertextCasesL[0];
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

      <div style={{ maxWidth: 860, margin: "18px auto 18px" }}>
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
              margin: "0 0 8px",
              fontFamily: "var(--calamus-mono-font)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--calamus-terminal-muted)"
            }}
          >
            Guia rapida de uso
          </p>
          <p style={{ margin: "0 0 6px" }}>
            Usa <strong>Olas E-H</strong> cuando quieras explorar material narrativo expandido (canon, voces, sistema y colapso) en modo laboratorio creativo.
          </p>
          <p style={{ margin: "0 0 6px" }}>
            Usa <strong>Olas I-L</strong> cuando quieras curar decisiones: compás canónico, packs de voz, presets de reglas y cierre editorial listo para sprint.
          </p>
          <p style={{ margin: "0 0 12px", color: "var(--calamus-terminal-muted)" }}>
            Flujo recomendado: E/F (inspiración) {"->"} G/H (mecánicas y final) {"->"} I/J/K/L (curaduría y consolidación).
          </p>
          <p
            style={{
              margin: "0 0 6px",
              fontFamily: "var(--calamus-mono-font)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--calamus-terminal-muted)"
            }}
          >
            Plan maestro (sandbox) — trabajo en orden
          </p>
          <ol style={{ margin: "0 0 12px", paddingLeft: 20, fontSize: 14, lineHeight: 1.55 }}>
            <li style={{ marginBottom: 6 }}>
              <strong>Hípertexto A-D</strong> (más abajo): validar ergonomía multimedia, ergódica y metalenguaje antes de cargar Cromosilencia pesada.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>E-H</strong> — sacar jugo exploratorio (Qué cuenta el mundo, con qué voces, bajo qué reglas, cómo cierra/colapsa).
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>I-L</strong> — volcar lo anterior en briefs ejecutables (brújula editorial, selección de voz, presets de sistema, salida lista para desarrollo/nullheim).
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Biblia sonora</strong> — en paralelo, por escena u ola: anotar <em>cues</em> (silencio, archivo, procedural, glitch, texto-como-trigger…).
              Aquí placeholders valen; el contrato vive en{" "}
              <code style={{ fontSize: "0.92em" }}>sceneContract.v1.ts</code> y la familia <code style={{ fontSize: "0.92em" }}>matriz</code> (más abajo). Objetivo: sonido como arquitectura de tiempo y espacio, no adorno suelto.
            </li>
            <li>
              <strong>SceneContract lab (familia matriz)</strong>: prueba técnica de la misma ficción formalmente tipada (
              JSON, copiar, variantes texto/audio/híbrido/apócrifa). Puente natural hacia consumo en{" "}
              <code style={{ fontSize: "0.92em" }}>nullheim</code>.
            </li>
          </ol>
          <details style={{ margin: 0 }}>
            <summary
              style={{
                cursor: "pointer",
                fontSize: 13,
                color: "var(--calamus-terminal-emphasis)",
                marginBottom: 6,
                fontFamily: "var(--calamus-mono-font)"
              }}
            >
              Mapa rápido E {"->"} L + Biblia sonora
            </summary>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.55, color: "var(--calamus-terminal-fg)" }}>
              <li>
                <strong>E</strong> Cromosilencia · <strong>F</strong> voces · <strong>G</strong> reglas · <strong>H</strong> finales/colapso
              </li>
              <li>
                <strong>I</strong> compás/curaduría · <strong>J</strong> packs de voz · <strong>K</strong> presets de reglas · <strong>L</strong> cierre curado {"->"} sprint
              </li>
              <li>
                Biblia sonora (checklist liviano): ¿qué cue por capa?, ¿motor (<code style={{ fontSize: "0.92em" }}>silence</code>/<code style={{ fontSize: "0.92em" }}>file</code>/otro)?, ¿sale al salir la escena? — reflejarlo luego en <code style={{ fontSize: "0.92em" }}>SceneContractV1.audio</code>.
              </li>
            </ul>
          </details>

          <SandboxRunbookPanel />
          <BibliaSonoraScratchpad />
        </div>
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
              <option value="cromosilencia">Cromosilencia</option>
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
          id="sandbox-ola-a"
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
          id="sandbox-ola-b"
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
          id="sandbox-ola-c"
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
          id="sandbox-ola-d"
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

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          id="sandbox-ola-e"
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola E (cromosilencia)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesE.map((entry) => {
            const selected = entry.id === activeHypertextCaseE.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseEId(entry.id)}
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

      <div style={{ maxWidth: 860, margin: "0 auto 90px" }}>
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
            Caso activo: {activeHypertextCaseE.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola E :: ${activeHypertextCaseE.title}`,
              subtitle: "cromosilencia expansion set",
              body: []
            }}
          >
            {activeHypertextCaseE.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          id="sandbox-ola-f"
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola F (voces/polifonia)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesF.map((entry) => {
            const selected = entry.id === activeHypertextCaseF.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseFId(entry.id)}
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

      <div style={{ maxWidth: 860, margin: "0 auto 100px" }}>
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
            Caso activo: {activeHypertextCaseF.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola F :: ${activeHypertextCaseF.title}`,
              subtitle: "voice architecture playground",
              body: []
            }}
          >
            {activeHypertextCaseF.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          id="sandbox-ola-g"
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola G (reglas de sistema)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesG.map((entry) => {
            const selected = entry.id === activeHypertextCaseG.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseGId(entry.id)}
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

      <div style={{ maxWidth: 860, margin: "0 auto 110px" }}>
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
            Caso activo: {activeHypertextCaseG.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola G :: ${activeHypertextCaseG.title}`,
              subtitle: "system rules playground",
              body: []
            }}
          >
            {activeHypertextCaseG.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2
          id="sandbox-ola-h"
          style={{
            margin: 0,
            fontFamily: "var(--calamus-mono-font)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "var(--calamus-terminal-muted)"
          }}
        >
          Hypertext Lab - Ola H (finales/colapso)
        </h2>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesH.map((entry) => {
            const selected = entry.id === activeHypertextCaseH.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveHypertextCaseHId(entry.id)}
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

      <div style={{ maxWidth: 860, margin: "0 auto 120px" }}>
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
            Caso activo: {activeHypertextCaseH.title}
          </p>
          <Reader
            mode="hypertext"
            content={{
              title: `Ola H :: ${activeHypertextCaseH.title}`,
              subtitle: "ending and collapse playground",
              body: []
            }}
          >
            {activeHypertextCaseH.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2 id="sandbox-ola-i" style={{ margin: 0, fontFamily: "var(--calamus-mono-font)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
          Hypertext Lab - Ola I (compas/curaduria)
        </h2>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesI.map((entry) => {
            const selected = entry.id === activeHypertextCaseI.id;
            return (
              <button key={entry.id} type="button" onClick={() => setActiveHypertextCaseIId(entry.id)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 10, border: `1px solid ${selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"}`, background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)", color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)", cursor: "pointer" }}>
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 70px" }}>
        <div style={{ border: "1px solid var(--calamus-terminal-border)", borderRadius: 12, padding: 12, background: "var(--calamus-panel)" }}>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--calamus-mono-font)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--calamus-terminal-muted)" }}>
            Caso activo: {activeHypertextCaseI.title}
          </p>
          <Reader mode="hypertext" content={{ title: `Ola I :: ${activeHypertextCaseI.title}`, subtitle: "curation compass layer", body: [] }}>
            {activeHypertextCaseI.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2 id="sandbox-ola-j" style={{ margin: 0, fontFamily: "var(--calamus-mono-font)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
          Hypertext Lab - Ola J (packs de voz)
        </h2>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesJ.map((entry) => {
            const selected = entry.id === activeHypertextCaseJ.id;
            return (
              <button key={entry.id} type="button" onClick={() => setActiveHypertextCaseJId(entry.id)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 10, border: `1px solid ${selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"}`, background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)", color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)", cursor: "pointer" }}>
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 70px" }}>
        <div style={{ border: "1px solid var(--calamus-terminal-border)", borderRadius: 12, padding: 12, background: "var(--calamus-panel)" }}>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--calamus-mono-font)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--calamus-terminal-muted)" }}>
            Caso activo: {activeHypertextCaseJ.title}
          </p>
          <Reader mode="hypertext" content={{ title: `Ola J :: ${activeHypertextCaseJ.title}`, subtitle: "voice pack layer", body: [] }}>
            {activeHypertextCaseJ.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2 id="sandbox-ola-k" style={{ margin: 0, fontFamily: "var(--calamus-mono-font)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
          Hypertext Lab - Ola K (presets de reglas)
        </h2>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesK.map((entry) => {
            const selected = entry.id === activeHypertextCaseK.id;
            return (
              <button key={entry.id} type="button" onClick={() => setActiveHypertextCaseKId(entry.id)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 10, border: `1px solid ${selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"}`, background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)", color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)", cursor: "pointer" }}>
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 70px" }}>
        <div style={{ border: "1px solid var(--calamus-terminal-border)", borderRadius: 12, padding: 12, background: "var(--calamus-panel)" }}>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--calamus-mono-font)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--calamus-terminal-muted)" }}>
            Caso activo: {activeHypertextCaseK.title}
          </p>
          <Reader mode="hypertext" content={{ title: `Ola K :: ${activeHypertextCaseK.title}`, subtitle: "rule preset layer", body: [] }}>
            {activeHypertextCaseK.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 12px", padding: "0 4px" }}>
        <h2 id="sandbox-ola-l" style={{ margin: 0, fontFamily: "var(--calamus-mono-font)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13, color: "var(--calamus-terminal-muted)" }}>
          Hypertext Lab - Ola L (cierre curado)
        </h2>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {hypertextCasesL.map((entry) => {
            const selected = entry.id === activeHypertextCaseL.id;
            return (
              <button key={entry.id} type="button" onClick={() => setActiveHypertextCaseLId(entry.id)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 10, border: `1px solid ${selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-border)"}`, background: selected ? "rgba(240, 217, 168, 0.12)" : "var(--calamus-panel)", color: selected ? "var(--calamus-terminal-emphasis)" : "var(--calamus-terminal-fg)", cursor: "pointer" }}>
                <strong style={{ display: "block" }}>{entry.title}</strong>
                <span style={{ fontSize: 13, color: "var(--calamus-terminal-muted)" }}>{entry.summary}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto 130px" }}>
        <div style={{ border: "1px solid var(--calamus-terminal-border)", borderRadius: 12, padding: 12, background: "var(--calamus-panel)" }}>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--calamus-mono-font)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--calamus-terminal-muted)" }}>
            Caso activo: {activeHypertextCaseL.title}
          </p>
          <Reader mode="hypertext" content={{ title: `Ola L :: ${activeHypertextCaseL.title}`, subtitle: "final curation layer", body: [] }}>
            {activeHypertextCaseL.render()}
          </Reader>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto 130px", paddingBottom: 40 }}>
        <MatrizFamilyLab />
      </div>
    </div>
  );
}

