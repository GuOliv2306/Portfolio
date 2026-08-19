// Reusable bits

function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
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

function Reveal({ children, delay = 0, as = 'div', style, className = '', ...rest }) {
  const ref = useReveal();
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// Big decorative section number — slow, deep fade-in
function SectionNumber({ children, top = 0, right = 0, left = 'auto', delay = 0 }) {
  const ref = useReveal({ threshold: 0.05 });
  return (
    <div ref={ref} aria-hidden="true" className="section-number" style={{
      position:'absolute',
      top, right, left,
      fontFamily:'var(--serif)',
      fontWeight:700,
      fontSize:'clamp(180px, 22vw, 320px)',
      lineHeight:0.85,
      color:'var(--text-faint)',
      letterSpacing:'-0.04em',
      pointerEvents:'none',
      userSelect:'none',
      zIndex:0,
      transitionDelay: `${delay}ms`,
    }}>{children}</div>
  );
}

function SectionEyebrow({ num, label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
      <span style={{
        fontFamily:'var(--mono)', fontSize:11, color:'var(--accent)',
        letterSpacing:'.25em', textTransform:'uppercase', fontWeight:400,
      }}>{num}</span>
      <span style={{ width:48, height:1, background:'var(--accent)' }} />
      <span className="label" style={{ color:'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

// Now class-based for CSS-driven fill-from-center hover
function OutlineLink({ href, children, external = true }) {
  return (
    <a href={href}
      className="olink"
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}>
      <span className="arr" aria-hidden="true">↗</span>
      <span>{children}</span>
    </a>
  );
}

function Tag({ children, accent = false }) {
  return (
    <span style={{
      display:'inline-block',
      padding:'6px 10px',
      border:`1px solid ${accent ? 'var(--accent)' : 'var(--border-strong)'}`,
      background: accent ? 'var(--accent-dim)' : 'var(--surface)',
      color: accent ? 'var(--accent)' : 'var(--text-muted)',
      fontSize:10, letterSpacing:'.18em', textTransform:'uppercase',
      fontFamily:'var(--sans)', fontWeight:500,
      borderRadius:3,
    }}>{children}</span>
  );
}

// ── Typewriter for the hero name ─────────────────────────────
// segments: [{ text } | { break:true } | { text, accent:true }]
function Typewriter({ segments, speed = 75, startDelay = 350, onDone }) {
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
      <span key={idx} style={s.accent ? { color:'var(--accent)' } : null}>{slice}</span>
    );
    remaining -= len;
    if (shownLen < len) stopped = true;
  }
  return (
    <React.Fragment>
      {out}
      <span aria-hidden="true" className={`caret ${caretGone ? 'gone' : ''}`} />
    </React.Fragment>
  );
}

// ── Custom cursor follower ───────────────────────────────────
function CursorFollower() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    // skip on touch / coarse pointer
    if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let x = tx, y = ty;
    let raf = 0;
    let visible = false;

    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
      }
    };
    const leaveWindow = () => { dot.style.opacity = '0'; visible = false; };
    const enterWindow = () => { dot.style.opacity = '1'; visible = true; };

    const HOVER_SELECTOR = 'a, button, [data-cursor-hover], input, textarea, label[for]';
    const TEXT_SELECTOR  = 'input, textarea, [contenteditable="true"]';
    const handleOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(TEXT_SELECTOR)) {
        dot.classList.add('is-text');
        dot.classList.remove('is-hover');
      } else if (t.closest(HOVER_SELECTOR)) {
        dot.classList.add('is-hover');
        dot.classList.remove('is-text');
      }
    };
    const handleOut = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(TEXT_SELECTOR) || t.closest(HOVER_SELECTOR)) {
        dot.classList.remove('is-hover');
        dot.classList.remove('is-text');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leaveWindow);
    window.addEventListener('mouseenter', enterWindow);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    dot.style.opacity = '0';
    const loop = () => {
      // magnetic ease — lower factor = longer delay
      const k = 0.18;
      x += (tx - x) * k;
      y += (ty - y) * k;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leaveWindow);
      window.removeEventListener('mouseenter', enterWindow);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(raf);
      dot.remove();
    };
  }, []);
  return null;
}

Object.assign(window, {
  useReveal, Reveal, SectionNumber, SectionEyebrow, OutlineLink, Tag,
  Typewriter, CursorFollower,
});
