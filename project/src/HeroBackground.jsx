// Subtle hero background — animates in alongside the name typewriter.
// Timeline (relative to page load) — deliberate, editorial pace, total ~5s:
//   400ms  — dot field fades in (2.0s)
//   800ms  — tick bars rise (staggered, 0.9s each, 90ms apart)
//  1800ms  — thread draws from data → curve → spark (2.4s)
//  2000ms  — DADOS label
//  3200ms  — ESTRATÉGIA label
//  4000ms  — constellation pops in (sequenced)
//  4700ms  — IDEIA label + landing ring
//  4900ms  — connectors
function HeroBackground() {
  // dot matrix — right half only
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

  // constellation positions [x, y, r, finalOpacity, delayMs]
  const sparks = [
    [1130, 170, 2.6, 1.00, 4000],
    [1195, 110, 1.8, 0.70, 4180],
    [1070, 230, 1.6, 0.55, 4320],
    [1220, 210, 1.4, 0.45, 4460],
    [1140,  70, 1.2, 0.55, 4600],
  ];

  return (
    <React.Fragment>
      <style>{`
        @keyframes heroDots   { to { opacity: 1; } }
        @keyframes heroTick   { to { stroke-dashoffset: 0; } }
        @keyframes heroDraw   { to { stroke-dashoffset: 0; } }
        @keyframes heroFade   { to { opacity: var(--heroEnd, 1); } }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(6px); }
                                to   { opacity: var(--heroEnd, 1); transform: none; } }
        @keyframes heroPop {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        @keyframes heroRing {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { opacity: 0.6; transform: scale(1.25); }
          100% { opacity: 0.45; transform: scale(1); }
        }

        .hb-dotgroup { opacity: 0; animation: heroDots 2s var(--ease) 400ms forwards; }
        .hb-tick {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          animation: heroTick .9s var(--ease) forwards;
        }
        .hb-tickbase { opacity: 0; animation: heroFade 1s var(--ease) 2000ms forwards; --heroEnd: 0.5; }
        .hb-thread {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: heroDraw 2400ms var(--ease) 1800ms forwards;
        }
        .hb-label { opacity: 0; transform-origin: left center; }
        .hb-label-dados      { animation: heroFadeUp 1s var(--ease) 2000ms forwards; --heroEnd: 0.34; }
        .hb-label-estrategia { animation: heroFadeUp 1s var(--ease) 3200ms forwards; --heroEnd: 0.34; }
        .hb-label-ideia      { animation: heroFadeUp 1s var(--ease) 4700ms forwards; --heroEnd: 0.6; }
        .hb-spark {
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0);
          animation: heroPop .8s var(--ease) forwards;
        }
        .hb-ring {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: heroRing 1s var(--ease) 4800ms forwards;
        }
      `}</style>

      <svg
        aria-hidden="true"
        viewBox="0 0 1280 820"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          pointerEvents:'none', zIndex:0,
        }}>
        <defs>
          <linearGradient id="threadFade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#e8601c" stopOpacity="0" />
            <stop offset="15%"  stopColor="#e8601c" stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#e8601c" stopOpacity="0.7" />
            <stop offset="95%"  stopColor="#e8601c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dotFade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#f4f0eb" stopOpacity="0" />
            <stop offset="30%"  stopColor="#f4f0eb" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#f4f0eb" stopOpacity="0.18" />
          </linearGradient>
          <mask id="dotMask">
            <rect x="720" y="0" width="560" height="820" fill="url(#dotFade)" />
          </mask>
        </defs>

        {/* ambient data field */}
        <g className="hb-dotgroup" mask="url(#dotMask)">
          {dots.map(d => (
            <circle key={d.key} cx={d.x} cy={d.y} r="1.1" fill="#f4f0eb" />
          ))}
        </g>

        {/* ZONE A — analytics ticks */}
        <g opacity="0.22">
          {tickHeights.map((h, i) => {
            const len = h * 3;
            return (
              <line key={i}
                className="hb-tick"
                x1={tickStart + i * 18} y1={tickBase}
                x2={tickStart + i * 18} y2={tickBase - len}
                stroke="#f4f0eb" strokeWidth="1" strokeLinecap="square"
                style={{
                  '--len': len,
                  animationDelay: `${800 + i * 90}ms`,
                }}
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

        {/* ZONE C — creative sparks */}
        <g>
          {sparks.map(([cx, cy, r, op, delay], i) => (
            <circle key={i}
              className="hb-spark"
              cx={cx} cy={cy} r={r}
              fill="#e8601c"
              opacity={op}
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
          {/* dashed connectors — fade in once the main sparks exist */}
          <g style={{ opacity: 0, animation: 'heroFade 1s var(--ease) 4900ms forwards', '--heroEnd': 0.28 }}>
            <line x1="1130" y1="170" x2="1195" y2="110"
              stroke="#e8601c" strokeWidth="0.6" strokeDasharray="2 3"/>
            <line x1="1130" y1="170" x2="1070" y2="230"
              stroke="#e8601c" strokeWidth="0.6" strokeDasharray="2 3"/>
          </g>
        </g>

        {/* ZONE B — the thread */}
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

        {/* landing ring */}
        <circle className="hb-ring"
          cx="1130" cy="170" r="5"
          fill="none" stroke="#e8601c" strokeWidth="0.8" />

        {/* labels */}
        <g>
          <line className="hb-label hb-label-estrategia"
            x1="976" y1="485" x2="984" y2="485"
            stroke="#f4f0eb" strokeWidth="0.75"/>
          <text className="hb-label hb-label-estrategia"
            x="990" y="488" fill="#f4f0eb"
            fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
            fontSize="9" letterSpacing="1.5">ESTRATÉGIA</text>
          <text className="hb-label hb-label-ideia"
            x="1060" y="252" fill="#e8601c"
            fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
            fontSize="9" letterSpacing="1.5">IDEIA</text>
        </g>
      </svg>
    </React.Fragment>
  );
}

window.HeroBackground = HeroBackground;
