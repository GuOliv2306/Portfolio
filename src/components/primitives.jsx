import React from 'react';

export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}

export function Reveal({ children, delay = 0, as = 'div', style, className = '', immediate = false, ...rest }) {
  const obsRef = useReveal();
  const immRef = React.useRef(null);
  const ref = immediate ? immRef : obsRef;

  // Modo `immediate`: ignora o IntersectionObserver e aplica .in após o delay,
  // garantindo um fluxo contínuo mesmo quando o elemento começa abaixo do fold.
  React.useEffect(() => {
    if (!immediate) return;
    const el = immRef.current;
    if (!el) return;
    const t = setTimeout(() => { el.classList.add('in'); }, 60);
    return () => clearTimeout(t);
  }, [immediate]);

  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionNumber({ children, top = 0, right = 0, left = 'auto', delay = 0 }) {
  const ref = useReveal({ threshold: 0.05 });
  return (
    <div ref={ref} aria-hidden="true" className="section-number" style={{
      position: 'absolute',
      top, right, left,
      fontFamily: 'var(--serif)',
      fontWeight: 700,
      fontSize: 'clamp(180px, 22vw, 320px)',
      lineHeight: 0.85,
      color: 'var(--text-faint)',
      letterSpacing: '-0.04em',
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 0,
      transitionDelay: `${delay}ms`,
    }}>{children}</div>
  );
}

export function SectionEyebrow({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)', color: 'var(--accent)',
        letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 400,
      }}>{num}</span>
      <span style={{ width: 48, height: 1, background: 'var(--accent)' }} />
      <span className="label" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

export function OutlineLink({ href, children, external = true }) {
  return (
    <a href={href}
      className="olink"
      data-magnetic
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}>
      <span className="arr" aria-hidden="true">↗</span>
      <span>{children}</span>
    </a>
  );
}

export function PrimaryLink({ href, children, icon = '↓', external = false, download = false }) {
  return (
    <a href={href}
      className="pbtn"
      data-magnetic
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      download={download || undefined}>
      <span>{children}</span>
      <span className="pbtn-icon" aria-hidden="true">{icon}</span>
    </a>
  );
}

export function Tag({ children, accent = false }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '6px 10px',
      border: `1px solid ${accent ? 'var(--accent)' : 'var(--border-strong)'}`,
      background: accent ? 'var(--accent-dim)' : 'var(--surface)',
      color: accent ? 'var(--accent)' : 'var(--text-muted)',
      fontSize: 'var(--fs-label)', letterSpacing: '.18em', textTransform: 'uppercase',
      fontFamily: 'var(--sans)', fontWeight: 500,
      borderRadius: 3,
    }}>{children}</span>
  );
}

export function Meta({ label, children }) {
  return (
    <div>
      <div className="label" style={{ color: 'var(--text-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--text)', lineHeight: 1.4 }}>{children}</div>
    </div>
  );
}

// segments: [{ text } | { break:true } | { text, accent:true }]
export function Typewriter({ segments, speed = 75, startDelay = 350, onDone }) {
  const totalChars = segments.reduce((n, s) => n + (s.text ? s.text.length : 0), 0);
  const [i, setI] = React.useState(0);
  const [caretGone, setCaretGone] = React.useState(false);

  React.useEffect(() => {
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        setI((prev) => {
          if (prev >= totalChars) {
            clearInterval(timer);
            setTimeout(() => { setCaretGone(true); onDone && onDone(); }, 900);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); clearInterval(timer); };
  }, [totalChars, speed, startDelay, onDone]);

  let remaining = i;
  const out = [];
  let stopped = false;
  for (let idx = 0; idx < segments.length; idx++) {
    if (stopped) break;
    const s = segments[idx];
    if (s.break) {
      out.push(<br key={`br-${idx}`} />);
      continue;
    }
    const len = s.text.length;
    const shownLen = Math.max(0, Math.min(len, remaining));
    const slice = s.text.slice(0, shownLen);
    out.push(
      <span key={idx} style={s.accent ? { color: 'var(--accent)' } : null}>{slice}</span>
    );
    remaining -= len;
    if (shownLen < len) stopped = true;
  }
  return (
    <>
      {out}
      <span aria-hidden="true" className={`caret ${caretGone ? 'gone' : ''}`} />
    </>
  );
}

// Ring + pin separados: o ring escala/colore por estado (transform-only, sem
// repaint), o pin é o ponto de precisão. Magnetismo puxa o ring para o centro
// de um [data-magnetic] próximo.
export function CursorFollower() {
  React.useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const follow = document.createElement('div');
    follow.className = 'cursor-follow';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    const pin = document.createElement('div');
    pin.className = 'cursor-pin';
    follow.appendChild(ring);
    follow.appendChild(pin);
    document.body.appendChild(follow);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let x = mx, y = my;
    let visible = false;
    let magnetEl = null;
    let raf = 0;

    const EASE = 0.20;
    const MAGNET_R = 90;

    const findMagnet = () => {
      const nodes = document.querySelectorAll('[data-magnetic]');
      let best = null, bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        // distância à borda mais próxima (não ao centro) — mais natural
        const dx = Math.max(r.left - mx, 0, mx - r.right);
        const dy = Math.max(r.top - my, 0, my - r.bottom);
        const d = Math.hypot(dx, dy);
        if (d < MAGNET_R && d < bestD) { best = el; bestD = d; }
      }
      return best;
    };

    const HOVER_SEL = 'a, button, [data-cursor-hover], [role="button"], summary';
    const TEXT_SEL = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]';

    // Estado lido de elementFromPoint — imune a unmount do React (um modal que
    // fecha sob o cursor nunca dispara mouseout e deixaria o estado preso).
    const refreshState = () => {
      const t = document.elementFromPoint(mx, my);
      if (!t) {
        follow.classList.remove('is-hover', 'is-text');
        return;
      }
      if (t.closest(TEXT_SEL)) {
        follow.classList.add('is-text');
        follow.classList.remove('is-hover');
        return;
      }
      if (t.closest(HOVER_SEL)) {
        follow.classList.add('is-hover');
        follow.classList.remove('is-text');
        return;
      }
      follow.classList.remove('is-hover', 'is-text');
    };

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) {
        visible = true;
        follow.classList.add('is-on');
        // Só a partir daqui o cursor customizado tem uma posição real para
        // ocupar. Antes disso — e se o script falhar ou nem rodar — o ponteiro
        // nativo continua na tela: o visitante nunca fica sem cursor.
        document.documentElement.classList.add('has-cursor');
      }
      const m = findMagnet();
      if (m !== magnetEl) {
        magnetEl = m;
        follow.classList.toggle('is-magnet', !!m);
      }
      refreshState();
    };
    const onLeaveWindow = () => { visible = false; follow.classList.remove('is-on'); };
    const onEnterWindow = () => { visible = true; follow.classList.add('is-on'); };
    const onDown = () => follow.classList.add('is-click');
    const onUp = () => { follow.classList.remove('is-click'); refreshState(); };
    const onScroll = () => refreshState();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeaveWindow);
    window.addEventListener('mouseenter', onEnterWindow);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', refreshState, true);

    const loop = () => {
      let tx = mx, ty = my;
      if (magnetEl) {
        const r = magnetEl.getBoundingClientRect();
        tx = mx + (r.left + r.width / 2 - mx) * 0.75;
        ty = my + (r.top + r.height / 2 - my) * 0.75;
      }
      x += (tx - x) * EASE;
      y += (ty - y) * EASE;
      follow.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeaveWindow);
      window.removeEventListener('mouseenter', onEnterWindow);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', refreshState, true);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      follow.remove();
    };
  }, []);
  return null;
}

/* ── Trava de scroll do body ───────────────────────────────────
   Contador compartilhado: modal e menu mobile podem coexistir sem
   que o primeiro a fechar devolva o scroll enquanto o outro segue
   aberto. useLayoutEffect para que a liberação aconteça antes de
   qualquer window.scrollTo disparado no mesmo clique. */
let scrollLocks = 0;
let savedOverflow = '';

export function useScrollLock(active) {
  React.useLayoutEffect(() => {
    if (!active) return undefined;
    if (scrollLocks === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    scrollLocks += 1;
    return () => {
      scrollLocks = Math.max(0, scrollLocks - 1);
      if (scrollLocks === 0) document.body.style.overflow = savedOverflow;
    };
  }, [active]);
}

/* ── Focus trap ────────────────────────────────────────────────
   Move o foco para dentro ao abrir, prende o Tab e devolve o foco
   ao elemento de origem ao fechar. */
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// getClientRects() cobre display:none e ancestrais ocultos, e continua
// correto dentro de contêineres position:fixed (onde offsetParent é null).
const visibleFocusable = (node) =>
  Array.prototype.filter.call(node.querySelectorAll(FOCUSABLE), (el) => el.getClientRects().length > 0);

export function useFocusTrap(ref, active, initialSelector) {
  React.useEffect(() => {
    if (!active) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const origin = document.activeElement;
    const first = (initialSelector && node.querySelector(initialSelector)) || visibleFocusable(node)[0];
    if (first) first.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const items = visibleFocusable(node);
      if (!items.length) return;
      const head = items[0];
      const tail = items[items.length - 1];
      if (!node.contains(document.activeElement)) {
        e.preventDefault();
        head.focus({ preventScroll: true });
      } else if (e.shiftKey && document.activeElement === head) {
        e.preventDefault();
        tail.focus({ preventScroll: true });
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault();
        head.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      if (origin && typeof origin.focus === 'function' && origin.isConnected) {
        origin.focus({ preventScroll: true });
      }
    };
  }, [ref, active, initialSelector]);
}
