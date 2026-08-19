// ============================================================
// tech.jsx — Camada tech sobre o portfólio editorial
// Inspirada no design system AERO_SYSTEMS (drone), reinterpretada
// para um comunicador de dados. Componentes expostos em window
// para serem usados pelo bundle.jsx (que carrega em seguida).
// ============================================================

// ---------------------------------------------
// DECODE / GLITCH TEXT
// ---------------------------------------------
const DECODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//<>";

// Substitui caracteres por ruído e "resolve" da esquerda para a direita,
// imitando uma decodificação. Reinicia se chamado de novo durante o ciclo.
function startDecode(el, opts) {
  if (!el) return;
  opts = opts || {};
  if (el.__decoding && !opts.force) return;
  if (!el.__originalText) el.__originalText = el.textContent;
  const original = el.__originalText;
  const speed = opts.speed || 30;
  const step  = opts.step  || 1 / 3;
  el.__decoding = true;
  let iter = 0;
  clearInterval(el.__decoder);
  el.__decoder = setInterval(() => {
    el.textContent = original.split('').map((c, i) => {
      if (i < iter) return original[i];
      if (c === ' ' || c === '\n' || c === '.' || c === ',') return c;
      return DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
    }).join('');
    if (iter >= original.length) {
      clearInterval(el.__decoder);
      el.textContent = original;
      el.__decoding = false;
    }
    iter += step;
  }, speed);
}

// Anexa decode-on-hover a um conjunto de nós já presentes no DOM
function attachDecodeHover(nodes) {
  nodes.forEach(n => {
    if (!n || n.__decodeBound) return;
    n.__decodeBound = true;
    n.addEventListener('mouseenter', () => startDecode(n));
  });
}

// Componente declarativo para texto com decode no hover
function DecodeText({ children, as, className, style, speed }) {
  const ref = React.useRef(null);
  const Tag = as || 'span';
  return (
    <Tag
      ref={ref}
      className={`decode-target ${className || ''}`.trim()}
      style={style}
      onMouseEnter={() => startDecode(ref.current, { speed })}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------
// SECTION MARK — "// LABEL" com dot pulsante
// ---------------------------------------------
function SectionMark({ children, color }) {
  return (
    <div className="section-mark" style={color ? { color } : null}>
      <span className="dot-mark" />
      <span className="slash">//</span>
      <span>{children}</span>
    </div>
  );
}

// ---------------------------------------------
// STATUS CHIP — pill mono com dot verde "ao vivo"
// ---------------------------------------------
function StatusChip({ children }) {
  return (
    <span className="chip-sys">
      <span className="bracket">[</span>
      <span className="dot-live" />
      <span>{children || 'SYS · ONLINE'}</span>
      <span className="bracket">]</span>
    </span>
  );
}

// ---------------------------------------------
// SIDE RAIL — navegação numerada na lateral esquerda
// ---------------------------------------------
const SIDE_RAIL_ITEMS = [
  { id: 'capa',          num: '01', label: 'CAPA' },
  { id: 'competencias',  num: '02', label: 'PERFIL' },
  { id: 'projetos',      num: '03', label: 'PROJETOS' },
  { id: 'certificados',  num: '04', label: 'CERTIFICADOS' },
  { id: 'depoimentos',   num: '05', label: 'DEPOIMENTOS' },
  { id: 'contato',       num: '06', label: 'CONTATO' },
];

function SideRail() {
  const [active, setActive] = React.useState('capa');
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    // throttle via rAF — uma checagem por frame, no máximo
    let ticking = false;
    const compute = () => {
      const y = window.scrollY + window.innerHeight * 0.32;
      for (let i = SIDE_RAIL_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SIDE_RAIL_ITEMS[i].id);
        if (el && el.offsetTop <= y) {
          setActive(prev => prev === SIDE_RAIL_ITEMS[i].id ? prev : SIDE_RAIL_ITEMS[i].id);
          break;
        }
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Entrada com atraso (depois do nome no hero terminar)
    const t = setTimeout(() => setRevealed(true), 2200);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <aside className={`siderail ${revealed ? 'is-in' : ''}`} aria-label="Navegação por seção">
      {SIDE_RAIL_ITEMS.map((it, i) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={`rdot ${active === it.id ? 'is-active' : ''}`}
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span className="rdot-num">{it.num}</span>
          <span className="rdot-glyph">{it.label}</span>
        </a>
      ))}
      <span className="rsig">PORTFOLIO_SYS_v2</span>
    </aside>
  );
}

// ---------------------------------------------
// HERO TELEMETRY — micro-cards com paralaxe leve
// ---------------------------------------------
function HeroTelemetry() {
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = wrap.closest('section');
    if (!section) return;

    const cards = wrap.querySelectorAll('.telem-card');
    let raf = 0;
    let running = false;
    let onScreen = true;
    let tx = 0, ty = 0, x = 0, y = 0;

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      ty = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      if (!running && onScreen) startLoop();
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const loop = () => {
      // ease confortável (~spring)
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      cards.forEach(c => {
        const d = parseFloat(c.dataset.depth || '0.18');
        c.style.transform = `translate3d(${(x * 36 * d).toFixed(2)}px, ${(y * 36 * d).toFixed(2)}px, 0)`;
      });
      // se quase repousado E sem movimento do mouse pendente — desliga o loop
      if (Math.abs(tx - x) < 0.001 && Math.abs(ty - y) < 0.001) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    // Pausa quando o hero sai da viewport — economiza ciclos enquanto rola
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (!onScreen) {
        cancelAnimationFrame(raf);
        running = false;
      }
    }, { threshold: 0 });
    io.observe(section);

    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave);

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // relógio ao vivo
  const [time, setTime] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const ss = String(time.getSeconds()).padStart(2, '0');
  const dd  = String(time.getDate()).padStart(2, '0');
  const mon = String(time.getMonth() + 1).padStart(2, '0');

  return (
    <div ref={wrapRef} aria-hidden="true" className="hero-telem" style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      zIndex: 2,
    }}>
      {/* link estabelecido — alto à direita */}
      <div className="telem-card telem-a" data-depth="0.22">
        <div className="telem-eye">
          <span>UNID · GUSTAVO_01</span>
          <span className="telem-blink" />
        </div>
        <div className="telem-row">
          <span className="telem-key">SIG</span>
          <span className="telem-val">−42 dBm</span>
        </div>
        <div className="telem-row">
          <span className="telem-key">LINK</span>
          <span className="telem-mini">ESTABELECIDO</span>
        </div>
      </div>

      {/* perfil / disciplinas — meio */}
      <div className="telem-card telem-b" data-depth="0.34">
        <div className="telem-eye">
          <span>PERFIL · STACK</span>
          <span style={{ color: 'var(--text-soft)' }}>FIG.02</span>
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 30, lineHeight: 1,
          color: 'var(--text)', letterSpacing: '-0.02em',
          margin: '4px 0 10px',
        }}>
          <span style={{ color: 'var(--accent)' }}>2</span>
          <span style={{ color: 'var(--text-soft)', margin: '0 6px' }}>↔</span>
          <span style={{ color: 'var(--accent)' }}>1</span>
        </div>
        <div className="telem-key" style={{ marginBottom: 10 }}>
          2 ANOS DE DADOS · 1 ANO DE COMUNIC.
        </div>
        <div style={{ height: 1, background: 'var(--border)', margin: '6px 0' }} />
        <div className="telem-row">
          <span className="telem-key">ÁREAS</span>
          <span className="telem-mini">08 ATIVAS</span>
        </div>
      </div>

      {/* sinal + relógio — baixo */}
      <div className="telem-card telem-c" data-depth="0.16">
        <div className="telem-eye">
          <span>TX_SINAL</span>
          <span style={{ color: 'var(--accent)' }}>{dd}/{mon}</span>
        </div>
        <div className="telem-bars" style={{ marginBottom: 10 }}>
          <span style={{ height: 4 }} />
          <span style={{ height: 7 }} />
          <span style={{ height: 10 }} />
          <span style={{ height: 13 }} />
          <span style={{ height: 14, background: 'var(--border-strong)' }} />
        </div>
        <div className="telem-row">
          <span className="telem-key">UTC-3</span>
          <span className="telem-val" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {hh}:{mm}:<span style={{ color: 'var(--accent)' }}>{ss}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// GLOW HOST — hook utilitário para spotlight radial
// ---------------------------------------------
function useGlowMouse() {
  const ref = React.useRef(null);
  const onMouseMove = React.useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return { ref, onMouseMove };
}

// ---------------------------------------------
// SYSTEM BAR — barra inferior fixa, estilo HUD
// ---------------------------------------------
function SystemBar() {
  const [time, setTime] = React.useState(() => new Date());
  const [section, setSection] = React.useState('CAPA');
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  React.useEffect(() => {
    let ticking = false;
    const compute = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const s = max > 0 ? window.scrollY / max : 0;
      setScroll(prev => Math.abs(prev - s) < 0.002 ? prev : s);

      const y = window.scrollY + window.innerHeight * 0.32;
      for (let i = SIDE_RAIL_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SIDE_RAIL_ITEMS[i].id);
        if (el && el.offsetTop <= y) {
          setSection(prev => prev === SIDE_RAIL_ITEMS[i].label ? prev : SIDE_RAIL_ITEMS[i].label);
          break;
        }
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const ss = String(time.getSeconds()).padStart(2, '0');

  return (
    <div className="sysbar" role="status" aria-label="Barra de sistema">
      <span className="sysbar-cell">
        <span className="dot-live" /> LIVE
        <span className="sysbar-sep">/</span>
        <span style={{ color: 'var(--text-muted)' }}>{section}</span>
      </span>
      <span className="sysbar-cell">LAT 22.91° S · LNG 43.17° W</span>
      <span className="sysbar-cell sysbar-progress">
        SCROLL
        <span className="sysbar-bar">
          <span className="sysbar-bar-fill" style={{ width: `${(scroll * 100).toFixed(1)}%` }} />
        </span>
        <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--text-muted)' }}>
          {(scroll * 100).toFixed(0).padStart(2, '0')}%
        </span>
      </span>
      <span className="sysbar-cell">SYS_v2 · BUILD 2026.05</span>
      <span className="sysbar-cell" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {hh}:{mm}:<span style={{ color: 'var(--accent)' }}>{ss}</span>
      </span>
    </div>
  );
}

// ---------------------------------------------
// SCAN LINE — passa horizontalmente no topo de uma seção
// ---------------------------------------------
function ScanLine({ delay }) {
  return <span className="scanline" style={delay ? { animationDelay: `${delay}s` } : null} aria-hidden="true" />;
}

// Expor para o bundle.jsx
Object.assign(window, {
  startDecode, attachDecodeHover, DecodeText,
  SectionMark, StatusChip, SideRail,
  HeroTelemetry, SystemBar, ScanLine,
  useGlowMouse,
});
