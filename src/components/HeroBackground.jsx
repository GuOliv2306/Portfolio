import React from 'react';

// Fundo do hero — desenha-se em sincronia com o typewriter do nome.
// Timeline (relativa ao load), ritmo editorial, total ~5s:
//   400ms dots · 800ms barras "DADOS" · 1800ms fio laranja ·
//   2000ms label DADOS · 3200ms ESTRATÉGIA · 4000ms constelação ·
//   4700ms IDEIA + anel · 4900ms conectores
export default function HeroBackground() {
  const dots = [];
  const COLS = 14, ROWS = 16;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      dots.push({ x: 720 + c * 40, y: 80 + r * 44, key: `${r}-${c}` });
    }
  }

  const tickHeights = [10, 14, 9, 18, 12, 22, 16, 26, 20, 30, 24, 36];
  const tickBase = 740;
  const tickStart = 760;

  // [x, y, r, opacidade final, delay]
  const sparks = [
    [1130, 170, 2.6, 1.00, 4000],
    [1195, 110, 1.8, 0.70, 4180],
    [1070, 230, 1.6, 0.55, 4320],
    [1220, 210, 1.4, 0.45, 4460],
    [1140, 70, 1.2, 0.55, 4600],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1280 820"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}>
      <defs>
        <linearGradient id="threadFade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="15%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.7" />
          <stop offset="95%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dotFade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f4f0eb" stopOpacity="0" />
          <stop offset="30%" stopColor="#f4f0eb" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#f4f0eb" stopOpacity="0.18" />
        </linearGradient>
        <mask id="dotMask">
          <rect x="720" y="0" width="560" height="820" fill="url(#dotFade)" />
        </mask>
      </defs>

      <g className="hb-dotgroup" mask="url(#dotMask)">
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r="1.1" fill="#f4f0eb" />
        ))}
      </g>

      {/* ZONA A — barras de analytics */}
      <g opacity="0.22">
        {tickHeights.map((h, i) => {
          const len = h * 3;
          return (
            <line key={i}
              className="hb-tick"
              x1={tickStart + i * 18} y1={tickBase}
              x2={tickStart + i * 18} y2={tickBase - len}
              stroke="#f4f0eb" strokeWidth="1" strokeLinecap="square"
              style={{ '--len': len, animationDelay: `${800 + i * 90}ms` }}
            />
          );
        })}
        <line className="hb-tickbase"
          x1={tickStart - 4} y1={tickBase + 5}
          x2={tickStart + tickHeights.length * 18} y2={tickBase + 5}
          stroke="#f4f0eb" strokeWidth="0.75" />
        <text className="hb-label hb-label-dados"
          x={tickStart} y={tickBase + 22} fill="#f4f0eb"
          fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
          fontSize="9" letterSpacing="2">DADOS</text>
      </g>

      {/* ZONA C — faíscas criativas */}
      <g>
        {sparks.map(([cx, cy, r, op, delay], i) => (
          <circle key={i}
            className="hb-spark"
            cx={cx} cy={cy} r={r}
            fill="var(--accent)"
            opacity={op}
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
        <g className="hb-connectors">
          <line x1="1130" y1="170" x2="1195" y2="110"
            stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="2 3" />
          <line x1="1130" y1="170" x2="1070" y2="230"
            stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="2 3" />
        </g>
      </g>

      {/* ZONA B — o fio */}
      <path
        className="hb-thread"
        pathLength="1"
        d="
          M 760 720
          L 778 720 L 778 700
          L 796 700 L 796 680
          L 814 680 L 814 660
          L 832 660 L 832 640
          L 850 640 L 850 615
          L 870 605
          Q 920 580 970 530
          T 1080 380
          Q 1110 300 1130 170
        "
        fill="none"
        stroke="url(#threadFade)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle className="hb-ring"
        cx="1130" cy="170" r="5"
        fill="none" stroke="var(--accent)" strokeWidth="0.8" />

      <g>
        <line className="hb-label hb-label-estrategia"
          x1="976" y1="485" x2="984" y2="485"
          stroke="#f4f0eb" strokeWidth="0.75" />
        <text className="hb-label hb-label-estrategia"
          x="990" y="488" fill="#f4f0eb"
          fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
          fontSize="9" letterSpacing="1.5">ESTRATÉGIA</text>
        <text className="hb-label hb-label-ideia"
          x="1060" y="252" fill="var(--accent)"
          fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
          fontSize="9" letterSpacing="1.5">IDEIA</text>
      </g>
    </svg>
  );
}
