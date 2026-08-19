import React from 'react';
import { SECTIONS } from '../data.js';

const DECODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//<>';

// Substitui caracteres por ruído e "resolve" da esquerda para a direita.
function startDecode(el, opts = {}) {
  if (!el) return;
  if (el.__decoding && !opts.force) return;
  if (!el.__originalText) el.__originalText = el.textContent;
  const original = el.__originalText;
  const speed = opts.speed || 30;
  const step = opts.step || 1 / 3;
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

export function attachDecodeHover(nodes) {
  nodes.forEach((n) => {
    if (!n || n.__decodeBound) return;
    n.__decodeBound = true;
    n.addEventListener('mouseenter', () => startDecode(n));
  });
}

export function StatusChip({ children }) {
  return (
    <span className="chip-sys">
      <span className="bracket">[</span>
      <span className="dot-live" />
      <span>{children || 'SYS · ONLINE'}</span>
      <span className="bracket">]</span>
    </span>
  );
}

// Encontra a seção atual pela posição de scroll, com throttle via rAF.
function useActiveSection(select) {
  const [value, setValue] = React.useState(() => select(SECTIONS[0]));
  React.useEffect(() => {
    let ticking = false;
    const compute = () => {
      const y = window.scrollY + window.innerHeight * 0.32;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= y) {
          const next = select(SECTIONS[i]);
          setValue((prev) => (prev === next ? prev : next));
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
  }, [select]);
  return value;
}

const pickId = (s) => s.id;
const pickLabel = (s) => s.label;

export function SideRail() {
  const active = useActiveSection(pickId);
  const [revealed, setRevealed] = React.useState(false);

  // Entra depois do nome no hero terminar de digitar.
  React.useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside className={`siderail ${revealed ? 'is-in' : ''}`} aria-label="Navegação por seção">
      {SECTIONS.map((it, i) => (
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

function useClock() {
  const [time, setTime] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

const pad = (n) => String(n).padStart(2, '0');

export function HeroTelemetry() {
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = wrap.closest('section');
    if (!section) return;

    const cards = wrap.querySelectorAll('.telem-card');
    let raf = 0;
    let running = false;
    let onScreen = true;
    let tx = 0, ty = 0, x = 0, y = 0;

    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      cards.forEach((c) => {
        const d = parseFloat(c.dataset.depth || '0.18');
        c.style.transform = `translate3d(${(x * 36 * d).toFixed(2)}px, ${(y * 36 * d).toFixed(2)}px, 0)`;
      });
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
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      ty = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      if (!running && onScreen) startLoop();
    };
    const onLeave = () => { tx = 0; ty = 0; startLoop(); };

    // Pausa quando o hero sai da viewport — economiza ciclos durante o scroll.
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

  const time = useClock();

  return (
    <div ref={wrapRef} aria-hidden="true" className="hero-telem" style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      zIndex: 2,
    }}>
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

      <div className="telem-card telem-c" data-depth="0.16">
        <div className="telem-eye">
          <span>TX_SINAL</span>
          <span style={{ color: 'var(--accent)' }}>{pad(time.getDate())}/{pad(time.getMonth() + 1)}</span>
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
            {pad(time.getHours())}:{pad(time.getMinutes())}:<span style={{ color: 'var(--accent)' }}>{pad(time.getSeconds())}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function SystemBar() {
  const time = useClock();
  const section = useActiveSection(pickLabel);
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    const compute = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const s = max > 0 ? window.scrollY / max : 0;
      setScroll((prev) => (Math.abs(prev - s) < 0.002 ? prev : s));
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
        {pad(time.getHours())}:{pad(time.getMinutes())}:<span style={{ color: 'var(--accent)' }}>{pad(time.getSeconds())}</span>
      </span>
    </div>
  );
}
