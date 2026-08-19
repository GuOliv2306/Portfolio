
// ===== data.jsx =====
// Shared data + helpers

// Camada tech — componentes definidos em src/tech.jsx, expostos em window
const {
  startDecode,
  attachDecodeHover,
  DecodeText,
  SectionMark,
  StatusChip,
  SideRail,
  HeroTelemetry,
  SystemBar,
  ScanLine,
  TweaksHost,
} = window;

const SKILLS = [
  { name: 'Análise de Dados',          source: 'COMUNICAÇÃO',  note: 'Fundamentar decisões de comunicação com evidências, não com intuição.',                         tier: 'applied' },
  { name: 'Python / NumPy',            source: 'EMAp',         note: 'Automatizar o trabalho pesado para focar no que a máquina não resolve: a narrativa.',            tier: 'applied' },
  { name: 'Estatística Aplicada',      source: 'EMAp',         note: 'Tornar a inferência uma aliada da estratégia — não só da academia.',                             tier: 'applied' },
  { name: 'Storytelling com Dados',    source: 'COMUNICAÇÃO',  note: 'Traduzir números em narrativa com intenção editorial.',                                           tier: 'core' },
  { name: 'Estratégia de Comunicação', source: 'COMUNICAÇÃO',  note: 'Conectar o que os dados revelam às mensagens que marcas precisam transmitir.',                   tier: 'learning' },
  { name: 'Engenharia de IA',           source: 'Projetos',     note: 'Ampliar produção e análise sem abrir mão de voz e identidade autoral.',                          tier: 'core' },
  { name: 'DSPy / LLM Pipelines',      source: 'Projetos',     note: 'Construir fluxos de IA que produzem conteúdo com consistência e escala estratégica.',            tier: 'learning' },
  { name: 'Análise Exploratória (EDA)', source: 'COMUNICAÇÃO', note: 'Revelar padrões culturais que os dashboards convencionais não conseguem enxergar.',              tier: 'core' },
];

// Vocabulário honesto de profundidade — sem percentual fabricado.
// 'core'     → em prática contínua hoje
// 'applied'  → já apliquei em contexto real
// 'learning' → em estudo / aprofundamento
const TIERS = {
  core:     { label: 'Em prática',  ord: 1, accent: true  },
  applied:  { label: 'Aplicado',    ord: 2, accent: false },
  learning: { label: 'Em estudo',   ord: 3, accent: false },
};

const TAGS = ['EDA','DSPy','Docling','Pydantic','Claude API','Engenharia de IA','Langchain','Agno','Storytelling','Estratégia Digital','Análise Comunicacional'];

const PROJECTS = [
  {
    id: 4,
    num: '01',
    category: 'Engenharia de Dados & IA',
    date: '2025',
    title: 'Extração Estruturada de Documentos de Segurança Pública',
    challenge: 'Transformar centenas de PDFs brutos com estruturas heterogêneas em um JSON consistente, facilitando análises quantitativas e qualitativas em outras ferramentas.',
    tools: ['Python','DSPy','PyMuPDF','Regex','Fine-tuning','Fuzzy Matching'],
    solution: 'Pipeline em etapas: extração de texto com PyMuPDF, regex para identificar seções e itens com padrões previsíveis, limpeza, modelo de IA otimizado para a extração específica, fuzzy string matching para resolver ligações entre documentos e um self-correction loop que reprocessa saídas inconsistentes.',
    deliverables: ['Pipeline de coleta com altíssima acurácia','JSON estruturado e reaproveitável','CSV limpo pronto para análise'],
    discipline: 'Consultoria contratada · Setor público de segurança',
    role: 'Analista contratado: desenho do pipeline, prompt engineering com DSPy, fine-tuning do modelo de extração e validação dos JSONs.',
    impact: 'Documentos antes inacessíveis a métodos quantitativos passaram a alimentar análises cruzadas em outras ferramentas. O loop de self-correction tornou a extração estável mesmo diante das variações estruturais entre PDFs.',
    confidential: true,
  },
  {
    id: 1,
    num: '02',
    category: 'Analytics & IA Generativa',
    date: '2025',
    title: 'Analytics API · Relatórios de Marketing com IA',
    challenge: 'Automatizar a leitura de dados de GA4 e Search Console com clusterização e relatórios narrativos que um time de marketing realmente consiga acionar.',
    tools: ['FastAPI','Agno','GPT-4o-mini','DuckDB','scikit-learn','Pydantic'],
    solution: 'API REST com 13 endpoints que cruza tráfego, engajamento e conversões. K-Means segmenta canais, keywords e páginas; um agente Agno + GPT-4o-mini transforma os clusters em relatório com sumário executivo, 5 seções analíticas e 8–10 recomendações priorizadas.',
    deliverables: ['API em produção (Render)','Simulador de dados realistas (3.668 registros)','Documentação para frontend'],
    discipline: 'A2 · FGV · Projeto acadêmico',
    role: 'Arquitetura da API, pipelines de ML, prompt design do agente, deploy.',
    impact: 'Geração de relatório completo em ~80s a custo de ~$0.001 por execução. Sistema vivo em produção no Render.',
    repoUrl: 'https://github.com/GuOliv2306/trabalho_A2',
    liveUrl: 'https://siteup.onrender.com/docs',
  },
  {
    id: 2,
    num: '03',
    category: 'IA Conversacional',
    date: '2024',
    title: 'Oráculo · Chat sobre Documentos & Vídeos',
    challenge: 'Permitir conversar com qualquer fonte — um PDF denso, um vídeo de YouTube, um site, uma planilha — sem precisar processá-la manualmente.',
    tools: ['Streamlit','Python','OpenAI','Groq','PDFs','YouTube'],
    solution: 'Interface em Streamlit que ingere arquivos (PDF, TXT, CSV) ou links (site, YouTube), formata o conteúdo como system message e abre um chat interativo. Provedor (OpenAI ou Groq) e modelo são selecionáveis em tempo de carga.',
    deliverables: ['App público (GustaBot) no Streamlit Cloud','Pipeline modular de ingestão','Interface multi-formato'],
    discipline: 'Projeto independente',
    role: 'Arquitetura, integração com APIs de LLM, UX da interface.',
    impact: 'Aplicação publicada e funcional — testes feitos com PDFs longos e transcrições de vídeo.',
    repoUrl: 'https://github.com/GuOliv2306/Project_oraculo',
    liveUrl: 'https://gustabot.streamlit.app/',
  },
  {
    id: 3,
    num: '04',
    category: 'Análise de Consumidor',
    date: '2024',
    title: 'Avaliações de Consumidores · Insights via IA',
    challenge: 'Transformar centenas de avaliações brutas de produtos em insights acionáveis sem perder o sinal qualitativo dentro do ruído de comentários.',
    tools: ['Python','OpenAI API','Pandas','Excel/JSON'],
    solution: 'Pipeline em quatro etapas: extração das avaliações de produtos, limpeza e normalização, envio estruturado para a OpenAI API e consolidação dos insights em tabela final pronta para análise comunicacional.',
    deliverables: ['Pipeline reproduzível em Python','Dataset limpo (JSON)','Tabela final com insights'],
    discipline: 'Projeto final · FGV',
    role: 'Pipeline completo: extração, limpeza, prompt design e consolidação.',
    impact: 'Tempo de leitura manual de avaliações reduzido a uma execução de script com saída interpretada.',
    repoUrl: 'https://github.com/GuOliv2306/Projeto-Final-Analise-de-Avaliacoes-de-Consumidores',
  },
];

const NAV = [
  { href: '#capa', label: 'Início' },
  { href: '#competencias', label: 'Competências' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#certificados', label: 'Certificados' },
  { href: '#contato', label: 'Contato' },
];

const EMAIL = 'gustavo.o.silva556@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/gustavo-oliveira-5386b62a0/';
const CV_URL = 'assets/CV_Gustavo_Oliveira.pdf';

Object.assign(window, { SKILLS, TIERS, TAGS, PROJECTS, NAV, EMAIL, LINKEDIN, CV_URL });


// ===== primitives.jsx =====
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

function Reveal({ children, delay = 0, as = 'div', style, className = '', immediate = false, ...rest }) {
  const obsRef = useReveal();
  const immRef = React.useRef(null);
  const ref = immediate ? immRef : obsRef;

  // Modo `immediate`: ignora o IntersectionObserver e aplica .in após o delay,
  // garantindo um fluxo contínuo mesmo quando o elemento começa abaixo do fold
  // (ex.: cascata do Hero em viewports menores).
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
      data-magnetic
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

// ── Custom cursor v2 ────────────────────────────────────────
// Ring + pin separados → o ring escala/cor por estado (transform-only,
// sem repaint), o pin é o ponto de precisão.
// Magnetismo: aproxima o ring do centro do elemento [data-magnetic]
// dentro de um raio. Clique: ring "comprime".
function CursorFollower() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    // skip on touch / coarse pointer
    if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    // skip if user wants reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const follow = document.createElement('div');
    follow.className = 'cursor-follow';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    const pin = document.createElement('div');
    pin.className = 'cursor-pin';
    follow.appendChild(ring);
    follow.appendChild(pin);
    document.body.appendChild(follow);

    // alvo (target) e posição interpolada
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let x = mx, y = my;
    let visible = false;
    let magnetEl = null;
    let raf = 0;

    const EASE       = 0.20;   // suavidade base do cursor
    const MAGNET_R   = 90;     // raio em px de captura do alvo magnético

    // descobre o elemento [data-magnetic] mais próximo dentro do raio
    const findMagnet = () => {
      const nodes = document.querySelectorAll('[data-magnetic]');
      let best = null, bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        const r = el.getBoundingClientRect();
        // descarte rápido: precisa estar visível na viewport
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // distância à borda mais próxima (não ao centro) — mais natural
        const dx = Math.max(r.left - mx, 0, mx - r.right);
        const dy = Math.max(r.top  - my, 0, my - r.bottom);
        const d = Math.hypot(dx, dy);
        if (d < MAGNET_R && d < bestD) { best = el; bestD = d; }
      }
      return best;
    };

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) { visible = true; follow.classList.add('is-on'); }
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
    const onUp   = () => follow.classList.remove('is-click');

    const HOVER_SEL = 'a, button, [data-cursor-hover], [role="button"], summary';
    const TEXT_SEL  = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]';

    // Recalcula o estado a partir de elementFromPoint — fonte da verdade.
    // Imune a unmount (React) e a elementos que somem mid-hover (modais fechando).
    const refreshState = () => {
      const t = document.elementFromPoint(mx, my);
      if (!t) {
        follow.classList.remove('is-hover');
        follow.classList.remove('is-text');
        return;
      }
      if (t.closest(TEXT_SEL))  {
        follow.classList.add('is-text');
        follow.classList.remove('is-hover');
        return;
      }
      if (t.closest(HOVER_SEL)) {
        follow.classList.add('is-hover');
        follow.classList.remove('is-text');
        return;
      }
      follow.classList.remove('is-hover');
      follow.classList.remove('is-text');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeaveWindow);
    window.addEventListener('mouseenter', onEnterWindow);
    window.addEventListener('mousedown', onDown);
    const onUpHandler = () => { onUp(); refreshState(); };
    window.addEventListener('mouseup', onUpHandler);
    // Após clique/scroll a árvore pode mudar (modal abre/fecha, elementos somem) —
    // releia o estado direto do ponto sob o cursor.
    document.addEventListener('click', refreshState, true);
    const onScroll = () => refreshState();
    window.addEventListener('scroll', onScroll, { passive: true });

    const loop = () => {
      // alvo padrão é a posição do mouse
      let tx = mx, ty = my;
      // se há magnetismo ativo, o alvo é uma mistura entre mouse e centro
      // do elemento — captura sem grudar (75% do caminho ao centro)
      if (magnetEl) {
        const r = magnetEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top  + r.height / 2;
        tx = mx + (cx - mx) * 0.75;
        ty = my + (cy - my) * 0.75;
      }
      x += (tx - x) * EASE;
      y += (ty - y) * EASE;
      // arredonda para subpixel — evita borrar em hi-dpi
      follow.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeaveWindow);
      window.removeEventListener('mouseenter', onEnterWindow);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUpHandler);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', refreshState, true);
      cancelAnimationFrame(raf);
      follow.remove();
    };
  }, []);
  return null;
}

Object.assign(window, {
  useReveal, Reveal, SectionNumber, SectionEyebrow, OutlineLink, Tag,
  Typewriter, CursorFollower,
});


// ===== Navbar.jsx =====
function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('capa');

  React.useEffect(() => {
    let ticking = false;
    const compute = () => {
      setScrolled(prev => {
        const s = window.scrollY > 24;
        return prev === s ? prev : s;
      });
      const sections = ['capa','competencias','projetos','certificados','contato'];
      const y = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= y) {
          setActive(prev => prev === sections[i] ? prev : sections[i]);
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
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background: scrolled ? 'rgba(12,12,12,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition:'background .45s var(--ease), border-color .45s var(--ease), backdrop-filter .45s var(--ease)',
    }}>
      <div className="container" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:72,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <a href="#capa"
            className="nav-item"
            style={{
              display:'flex', alignItems:'center', gap:12,
              animationDelay: '100ms',
            }}>
            <span aria-hidden="true" style={{
              width:8, height:8, borderRadius:'50%', background:'var(--accent)',
              boxShadow:'0 0 0 4px var(--accent-18)',
              animation:'pulseDot 2.4s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily:'var(--sans)', fontWeight:500, fontSize:11.5,
              letterSpacing:'.28em', textTransform:'uppercase',
            }}>Gustavo Oliveira</span>
          </a>
          <span
            className="nav-item nav-chip"
            style={{ animationDelay: '160ms' }}>
            <StatusChip>SYS_v2 · ONLINE</StatusChip>
          </span>
        </div>
        <ul style={{ display:'flex', gap:34, listStyle:'none' }}>
          {NAV.map((n, i) => {
            const id = n.href.slice(1);
            const isActive = id === active;
            return (
              <li key={n.href}
                className="nav-item"
                style={{ animationDelay: `${220 + i * 120}ms` }}>
                <a href={n.href} className={`nav-link${isActive ? ' is-active' : ''}`}>
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

window.Navbar = Navbar;


// ===== HeroBackground.jsx =====
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


// ===== Hero.jsx =====
function Hero01() {
  const ref = useReveal({ threshold: 0.05 });
  return (
    <div ref={ref} aria-hidden="true" className="section-number" style={{
      position:'absolute',
      top:'52%', right:'-3vw', transform:'translateY(-50%)',
      fontFamily:'var(--serif)', fontWeight:400,
      fontSize:'clamp(220px, 32vw, 460px)',
      lineHeight:1,
      color:'var(--text-faint)',
      letterSpacing:'-0.04em',
      pointerEvents:'none', userSelect:'none',
      transitionDelay:'200ms',
    }}>01</div>
  );
}

function Hero() {
  const phrases = [
    'Tenho forte ambição de compreender novas tendências, e busco transformar boas ideias em ação segura.',
    'Acredito na extrema importância dos dados e como tornam mais seguro e previsível a execução de bons caminhos.',
    'Estou em um caminho de desenvolvimento consciente de ferramentas de IA para gerar produtos com identidades e otimizar custo e velocidade de produção.',
  ];

  // Time budget — typewriter ends ~ 350 + (chars * 75) ≈ 350 + 18*75 = 1700ms
  // Subsequent reveals start after the name lands.
  const T_AFTER_NAME = 1900;

  // Anexa decode-on-hover aos spans do nome (cada segmento do Typewriter)
  // assim que o efeito de digitação termina.
  const nameRef = React.useRef(null);
  const bindNameDecode = React.useCallback(() => {
    const el = nameRef.current;
    if (!el) return;
    const spans = el.querySelectorAll(':scope > span:not(.caret)');
    spans.forEach(s => s.classList.add('decode-target'));
    if (window.attachDecodeHover) window.attachDecodeHover(spans);
  }, []);

  return (
    <section id="capa" data-screen-label="01 Capa" style={{
      position:'relative', minHeight:'100vh',
      paddingTop:160, paddingBottom:120,
      display:'flex', alignItems:'center',
      overflow:'hidden',
    }}>
      <HeroBackground />
      <Hero01 />
      <HeroTelemetry />

      {/* horizontal rule at very top */}
      <div style={{ position:'absolute', top:96, left:0, right:0, height:1, background:'var(--border)' }} />

      <div className="container" style={{ position:'relative', zIndex:1, width:'100%' }}>
        <Reveal delay={120} immediate>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:36, flexWrap:'wrap' }}>
            <span aria-hidden="true" style={{
              width:7, height:7, borderRadius:'50%', background:'var(--accent)',
              boxShadow:'0 0 0 4px var(--accent-18)',
              animation:'pulseDot 2.4s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily:'var(--mono)', fontSize:11,
              letterSpacing:'.25em', textTransform:'uppercase',
              color:'var(--accent)',
            }}>Disponível para projetos</span>
            <span style={{ width:1, height:14, background:'var(--border-strong)' }} />
            <span style={{
              fontFamily:'var(--mono)', fontSize:10,
              letterSpacing:'.28em', textTransform:'uppercase',
              color:'var(--text-soft)',
            }}>// CAPA · 01_INIT</span>
          </div>
        </Reveal>

        {/* Name — typewriter (no Reveal wrapper; the typewriter handles its own entry).
            Cada segmento revelado vira um alvo de decode-on-hover. */}
        <h1 ref={nameRef} style={{
          fontFamily:'var(--serif)', fontWeight:700,
          fontSize:'clamp(56px, 9.6vw, 120px)',
          lineHeight:0.95,
          letterSpacing:'-0.035em',
          color:'var(--text)',
          marginBottom:32,
          maxWidth:'12ch',
          minHeight:'1.9em',  // reserve two lines so layout below doesn't jump
        }}>
          <Typewriter
            segments={[
              { text: 'Gustavo' },
              { break: true },
              { text: 'de Oliveira' },
              { text: '.', accent: true },
            ]}
            speed={75}
            startDelay={400}
            onDone={bindNameDecode}
          />
        </h1>

        <Reveal delay={T_AFTER_NAME} immediate>
          <div className="label" style={{ color:'var(--text-muted)', marginBottom:32 }}>
            Comunicação Digital · FGV · 3º Período
          </div>
        </Reveal>

        <Reveal delay={T_AFTER_NAME + 120} immediate>
          <div style={{ width:480, maxWidth:'100%', height:1, background:'var(--border)', margin:'0 0 36px' }} />
        </Reveal>

        {/* Value phrases — staggered, 120ms apart */}
        <div style={{ maxWidth:600, display:'flex', flexDirection:'column', gap:18, marginBottom:48 }}>
          {phrases.map((p, i) => (
            <Reveal key={i} delay={T_AFTER_NAME + 240 + i * 120} immediate>
              <p style={{
                fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
                fontSize:15, lineHeight:1.7,
                color:'var(--text-muted)',
                paddingLeft:18,
                borderLeft:'1px solid var(--border-strong)',
              }}>{p}</p>
            </Reveal>
          ))}
        </div>

        {/* Buttons — staggered, 120ms apart */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
          <Reveal delay={T_AFTER_NAME + 240 + phrases.length * 120 + 120} immediate>
            <OutlineLink href={`mailto:${EMAIL}`} external={false}>Email</OutlineLink>
          </Reveal>
          <Reveal delay={T_AFTER_NAME + 240 + phrases.length * 120 + 240} immediate>
            <OutlineLink href={LINKEDIN}>LinkedIn</OutlineLink>
          </Reveal>
        </div>

        {/* scroll cue */}
        <Reveal delay={T_AFTER_NAME + 800} immediate>
          <div style={{
            position:'absolute', right:48, bottom:-40,
            display:'flex', alignItems:'center', gap:12,
            color:'var(--text-muted)',
          }}>
            <span style={{
              fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.3em', textTransform:'uppercase',
              writingMode:'vertical-rl', transform:'rotate(180deg)',
            }}>Scroll</span>
            <span aria-hidden="true" style={{ width:1, height:48, background:'var(--border-strong)' }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Hero = Hero;


// ===== Competencias.jsx =====
function SkillRow({ skill }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display:'grid',
        gridTemplateColumns:'1fr auto',
        columnGap:24, rowGap:6,
        padding:'18px 14px 18px 18px',
        marginLeft:-18, marginRight:-14,
        borderBottom:'1px solid var(--border)',
        background: hover ? 'var(--accent-04)' : 'transparent',
        boxShadow: hover ? 'inset 2px 0 0 var(--accent)' : 'inset 0 0 0 transparent',
        transition:'background .45s var(--ease), box-shadow .45s var(--ease)',
      }}>
      <div style={{ minWidth:0 }}>
        <span style={{
          fontFamily:'var(--serif)', fontWeight:400, fontSize:18,
          letterSpacing:'-0.005em',
          color: hover ? 'var(--accent)' : 'var(--text)',
          transition:'color .35s var(--ease)',
        }}>{skill.name}</span>
      </div>
      <div style={{ justifySelf:'end' }}>
        <span style={{
          fontFamily:'var(--mono)', fontSize:10,
          letterSpacing:'.22em', textTransform:'uppercase',
          color: hover ? 'var(--text)' : 'var(--text-muted)',
          transition:'color .35s var(--ease)',
        }}>{skill.source}</span>
      </div>
      <p style={{
        gridColumn:'1 / -1',
        fontFamily:'var(--sans)', fontWeight:300, fontSize:13,
        lineHeight:1.55,
        color: hover ? 'var(--text)' : 'var(--text-muted)',
        maxWidth:'58ch',
        transition:'color .35s var(--ease)',
      }}>{skill.note}</p>
    </div>
  );
}

function Competencias() {
  return (
    <section id="competencias" data-screen-label="02 Competências" style={{
      position:'relative', padding:'120px 0', overflow:'hidden',
    }}>
      <SectionNumber top={40} right={-20}>02</SectionNumber>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <Reveal>
          <SectionEyebrow num="02" label="Perfil & Competências" />
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily:'var(--serif)', fontWeight:700,
            fontSize:'clamp(40px, 5.6vw, 64px)',
            lineHeight:1, letterSpacing:'-0.025em',
            marginBottom:72,
          }}>
            Perfil &<br/>Competências<span style={{ color:'var(--accent)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{
          display:'grid',
          gridTemplateColumns:'5fr 7fr',
          gap:80,
          alignItems:'start',
        }} className="comp-grid">
          {/* Bio */}
          <Reveal delay={140} style={{ position:'relative' }}>
            <div className="label" style={{ marginBottom:20, color:'var(--accent)' }}>↳ Bio</div>
            <div style={{
              borderLeft:'1px solid var(--accent)',
              paddingLeft:24,
              display:'flex', flexDirection:'column', gap:18,
            }}>
              <p style={{
                fontFamily:'var(--sans)', fontWeight:300,
                fontSize:14, lineHeight:1.85, color:'var(--text)',
              }}>
                Me chamo Gustavo. Atualmente estudante de <em style={{ color:'var(--accent)', fontStyle:'normal' }}>Comunicação Digital</em> na FGV, mas já fiz 2 anos de Ciência de Dados e IA na EMAp — e faço proveito desse conhecimento híbrido para ter uma análise metódica de dados comunicacionais, entendendo que a complexidade das vidas ao qual só os números e inferências não vão realizar sozinhos.
              </p>
              <p style={{
                fontFamily:'var(--sans)', fontWeight:300,
                fontSize:14, lineHeight:1.85, color:'var(--text-muted)',
              }}>
                Uso habilidade de compreender análises para fazer também um bom storytelling e criação de estratégias. Com conhecimentos estatísticos, aplico análise exploratória para entender o contexto do hoje e inferência para probabilizar o amanhã.
              </p>
            </div>

            <div style={{ marginTop:32 }}>
              <CVButton />
            </div>

            <div style={{ marginTop:48, paddingTop:24, borderTop:'1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom:14 }}>Formação</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:14 }}>
                <li>
                  <div style={{ fontFamily:'var(--serif)', fontSize:18, color:'var(--text)' }}>FGV · Comunicação Digital</div>
                  <div className="label" style={{ marginTop:4 }}>2024 — Presente · 3º Período</div>
                </li>
                <li>
                  <div style={{ fontFamily:'var(--serif)', fontSize:18, color:'var(--text-muted)' }}>FGV EMAp · Ciência de Dados & IA</div>
                  <div className="label" style={{ marginTop:4 }}>2022 — 2024 · 2 anos</div>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Skills column */}
          <Reveal delay={200}>
            <div className="label" style={{ marginBottom:20, color:'var(--accent)' }}>↳ Áreas de prática</div>

            <div>
              {SKILLS.map((s) => (
                <SkillRow key={s.name} skill={s} />
              ))}
            </div>

            <div style={{ marginTop:40 }}>
              <div className="label" style={{ marginBottom:16 }}>Ferramentas & Métodos</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {TAGS.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </Reveal>
        </div>

        {/* internal nav strip */}
        <Reveal delay={120} style={{ marginTop:96 }}>
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'24px 0', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
            flexWrap:'wrap', gap:16,
          }}>
            <span className="label" style={{ color:'var(--text-muted)' }}>Próximas seções</span>
            <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
              {[
                ['03','Projetos','#projetos'],
                ['04','Certificados','#certificados'],
                ['05','Depoimentos','#depoimentos'],
                ['06','Contato','#contato'],
              ].map(([n, label, href], i, arr) => (
                <React.Fragment key={n}>
                  <a href={href} style={{
                    display:'inline-flex', alignItems:'baseline', gap:10,
                    fontFamily:'var(--sans)', fontWeight:500, fontSize:11,
                    letterSpacing:'.22em', textTransform:'uppercase',
                    color:'var(--text-muted)',
                    transition:'color .4s var(--ease)',
                  }}
                    onMouseEnter={(e)=>e.currentTarget.style.color='var(--accent)'}
                    onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-muted)'}
                  >
                    <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--accent)' }}>→ {n}</span>
                    <span>{label}</span>
                  </a>
                  {i < arr.length - 1 && <span style={{ color:'var(--text-faint)' }}>/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 880px){
          .comp-grid{grid-template-columns: 1fr !important; gap: 56px !important;}
        }
      `}</style>
    </section>
  );
}

function CVButton() {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={CV_URL}
      data-magnetic
      target="_blank"
      rel="noreferrer noopener"
      download
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display:'inline-flex', alignItems:'center', gap:14,
        padding:'14px 22px',
        background: hover ? '#ff6f24' : 'var(--accent)',
        color:'#0c0c0c',
        fontFamily:'var(--sans)', fontWeight:500, fontSize:11,
        letterSpacing:'.22em', textTransform:'uppercase',
        transition:'all .45s var(--ease)',
        boxShadow: hover ? '4px 4px 0 var(--text)' : '0 0 0 var(--text)',
      }}>
      <span>Baixar Currículo</span>
      <span style={{ fontSize:13 }}>↓</span>
    </a>
  );
}

window.Competencias = Competencias;


// ===== Projetos.jsx =====
function ProjectCard({ project, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const cardRef = React.useRef(null);
  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <article
      ref={cardRef}
      className="glow-host"
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMouseMove}
      style={{
        position:'relative',
        padding:'40px 32px 32px',
        background: hover ? 'var(--surface-2)' : 'var(--surface)',
        borderLeft:`3px solid ${hover ? 'var(--accent)' : 'transparent'}`,
        borderTop:'1px solid var(--border)',
        borderRight:'1px solid var(--border)',
        borderBottom:'1px solid var(--border)',
        cursor:'pointer',
        transition:'background .5s var(--ease), border-color .45s var(--ease), transform .32s cubic-bezier(.22,1,.36,1), box-shadow .42s var(--ease)',
        boxShadow: hover ? '0 18px 50px -22px rgba(0,0,0,0.75)' : '0 0 0 rgba(0,0,0,0)',
        transform: hover ? 'translateY(-3px)' : 'none',
        width:'100%',
        height:'100%',
        minHeight:360,
        display:'flex', flexDirection:'column',
        overflow:'hidden',
      }}>
      <span className="glow-grid" aria-hidden="true" />
      <div aria-hidden="true" style={{
        position:'absolute', top:16, right:24,
        fontFamily:'var(--serif)', fontWeight:400,
        fontSize:120, lineHeight:1,
        color: hover ? 'var(--accent-32)' : 'var(--text-faint)',
        letterSpacing:'-0.04em',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition:'color .5s var(--ease), transform .5s var(--ease)',
        pointerEvents:'none',
      }}>{project.num}</div>

      <div className="label" style={{ color: hover ? 'var(--accent)' : 'var(--text-muted)', transition:'color .4s var(--ease)', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
        <span>{project.category} · {project.date}</span>
        {project.confidential && (
          <span style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'3px 8px',
            border:'1px solid var(--border-strong)',
            background:'rgba(244,240,235,0.025)',
            fontFamily:'var(--mono)', fontSize:9,
            letterSpacing:'.24em', textTransform:'uppercase',
            color:'var(--text-soft)',
            lineHeight:1,
          }}>
            <span aria-hidden="true" style={{ fontSize:10 }}>●</span>
            Confidencial
          </span>
        )}
      </div>

      <h3 style={{
        marginTop:16,
        fontFamily:'var(--serif)', fontWeight:700,
        fontSize:28, lineHeight:1.15,
        letterSpacing:'-0.015em',
        maxWidth:'90%',
      }}>{project.title}</h3>

      <p style={{
        marginTop:14,
        fontFamily:'var(--sans)', fontSize:13.5, lineHeight:1.65,
        color:'var(--text-muted)',
        maxWidth:'95%',
        display:'-webkit-box',
        WebkitLineClamp:3,
        WebkitBoxOrient:'vertical',
        overflow:'hidden',
      }}>{project.challenge}</p>

      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:'auto', paddingTop:24 }}>
        {project.tools.slice(0,4).map((t) => <Tag key={t}>{t}</Tag>)}
      </div>

      <div style={{
        marginTop:20, paddingTop:18, borderTop:'1px solid var(--border)',
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span style={{
          fontFamily:'var(--sans)', fontWeight:500, fontSize:11,
          letterSpacing:'.22em', textTransform:'uppercase',
          color: hover ? 'var(--accent)' : 'var(--text)',
          transition:'color .4s var(--ease)',
        }}>Ver detalhes</span>
        <span style={{
          fontSize:18,
          display:'inline-block',
          color: hover ? 'var(--accent)' : 'var(--text-muted)',
          transform: hover ? 'translateX(6px)' : 'none',
          transition:'color .4s var(--ease), transform .5s var(--ease)',
        }}>→</span>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:200,
        background:'rgba(8,8,8,0.78)',
        backdropFilter:'blur(14px)',
        WebkitBackdropFilter:'blur(14px)',
        display:'flex', alignItems:'flex-start', justifyContent:'center',
        padding:'80px 24px 40px',
        overflowY:'auto',
        animation:'fadeMod .35s var(--ease)',
      }}>
      <style>{`@keyframes fadeMod{from{opacity:0}to{opacity:1}}@keyframes slideMod{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-scroll"
        style={{
          width:'100%', maxWidth:880,
          background:'var(--bg)',
          border:'1px solid var(--border-strong)',
          padding:'56px 56px 64px',
          position:'relative',
          animation:'slideMod .55s var(--ease)',
        }}>
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position:'absolute', top:20, right:20,
            width:40, height:40,
            border:'1px solid var(--border-strong)',
            color:'var(--text-muted)',
            fontSize:16,
            transition:'border-color .4s var(--ease), color .4s var(--ease), transform .4s var(--ease)',
          }}
          onMouseEnter={(e)=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';e.currentTarget.style.transform='rotate(90deg)'}}
          onMouseLeave={(e)=>{e.currentTarget.style.borderColor='var(--border-strong)';e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.transform='rotate(0deg)'}}
        >×</button>

        <div aria-hidden="true" style={{
          position:'absolute', top:32, right:84,
          fontFamily:'var(--serif)', fontWeight:400,
          fontSize:64, lineHeight:1,
          color:'var(--text-faint)',
        }}>{project.num}</div>

        <div className="label" style={{ color:'var(--accent)' }}>
          {project.category} · {project.date}
        </div>

        <h2 style={{
          marginTop:12,
          fontFamily:'var(--serif)', fontWeight:700,
          fontSize:'clamp(32px, 4.4vw, 48px)', lineHeight:1.05,
          letterSpacing:'-0.02em',
          maxWidth:'90%',
        }}>{project.title}</h2>

        <div style={{ height:1, background:'var(--border)', margin:'40px 0' }} />

        <ModalSection num="01" title="Desafio">
          <p>{project.challenge}</p>
        </ModalSection>

        <ModalSection num="02" title="Solução">
          <p>{project.solution}</p>
        </ModalSection>

        <ModalSection num="03" title="Entregáveis">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginTop:8 }} className="deliv-grid">
            {project.deliverables.map((d, i) => (
              <div key={i} style={{
                aspectRatio:'4/3',
                border:'1px dashed var(--border-strong)',
                background:'var(--surface)',
                position:'relative',
                display:'flex', alignItems:'flex-end', padding:14,
                overflow:'hidden',
              }}>
                <svg width="100%" height="100%" style={{ position:'absolute', inset:0, opacity:0.5 }} preserveAspectRatio="none">
                  <defs>
                    <pattern id={`s${project.id}-${i}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(244,240,235,0.06)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#s${project.id}-${i})`} />
                </svg>
                <div style={{ position:'relative' }}>
                  <div className="label" style={{ color:'var(--text-muted)', fontFamily:'var(--mono)' }}>0{i+1} · entregável</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:15, marginTop:4, lineHeight:1.25 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </ModalSection>

        <div style={{
          marginTop:48, paddingTop:32, borderTop:'1px solid var(--border)',
          display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32,
        }} className="meta-grid">
          <Meta label="Disciplina">{project.discipline}</Meta>
          <Meta label="Data">{project.date}</Meta>
          <Meta label="Seu Papel">{project.role}</Meta>
        </div>

        <div style={{ marginTop:40 }}>
          <div className="label" style={{ color:'var(--accent)', marginBottom:12 }}>↳ Resultados & Impacto</div>
          <p style={{
            fontFamily:'var(--serif)', fontStyle:'italic',
            fontSize:18, lineHeight:1.55, color:'var(--text)',
            paddingLeft:18, borderLeft:'2px solid var(--accent)',
          }}>{project.impact}</p>
        </div>

        {(project.repoUrl || project.liveUrl || project.confidential) && (
          <div style={{ marginTop:40, display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
            {project.repoUrl && (
              <a href={project.repoUrl}
                className="olink"
                data-magnetic
                target="_blank" rel="noreferrer noopener">
                <span className="arr" aria-hidden="true">↗</span>
                <span>Ver no GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl}
                className="olink"
                data-magnetic
                target="_blank" rel="noreferrer noopener">
                <span className="arr" aria-hidden="true">↗</span>
                <span>Abrir ao vivo</span>
              </a>
            )}
            {project.confidential && !project.repoUrl && (
              <span style={{
                display:'inline-flex', alignItems:'center', gap:12,
                padding:'14px 22px',
                border:'1px dashed var(--border-strong)',
                background:'rgba(244,240,235,0.018)',
                color:'var(--text-muted)',
                fontFamily:'var(--mono)', fontSize:10.5,
                letterSpacing:'.24em', textTransform:'uppercase',
                lineHeight:1.2,
              }}>
                <span aria-hidden="true" style={{ fontSize:13 }}>●</span>
                <span>Projeto confidencial · sem link público</span>
              </span>
            )}
          </div>
        )}

        <style>{`
          @media (max-width:680px){
            .deliv-grid{grid-template-columns:1fr 1fr !important;}
            .meta-grid{grid-template-columns:1fr !important; gap:20px !important;}
          }
        `}</style>
      </div>
    </div>
  );
}

function ModalSection({ num, title, children }) {
  return (
    <section style={{ marginBottom:36 }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:14 }}>
        <span style={{ fontFamily:'var(--mono)', fontSize:11, color:'var(--accent)', letterSpacing:'.25em' }}>{num}</span>
        <span style={{ width:24, height:1, background:'var(--accent)' }} />
        <h3 className="label" style={{ color:'var(--text)' }}>{title}</h3>
      </div>
      <div style={{
        fontFamily:'var(--sans)', fontSize:14, lineHeight:1.8, color:'var(--text-muted)',
        maxWidth:'72ch', paddingLeft:60,
      }}>{children}</div>
    </section>
  );
}

function Meta({ label, children }) {
  return (
    <div>
      <div className="label" style={{ color:'var(--text-muted)', marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily:'var(--serif)', fontSize:16, color:'var(--text)', lineHeight:1.4 }}>{children}</div>
    </div>
  );
}

function Projetos() {
  const [active, setActive] = React.useState(null);
  return (
    <section id="projetos" data-screen-label="03 Projetos" style={{
      position:'relative', padding:'120px 0', overflow:'hidden',
    }}>
      <SectionNumber top={40} left={-30} right="auto">03</SectionNumber>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <Reveal>
          <SectionEyebrow num="03" label="Projetos Selecionados" />
        </Reveal>

        <Reveal delay={80}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:64 }}>
            <h2 style={{
              fontFamily:'var(--serif)', fontWeight:700,
              fontSize:'clamp(40px, 5.6vw, 64px)',
              lineHeight:1, letterSpacing:'-0.025em',
            }}>
              Projetos<br/>Selecionados<span style={{ color:'var(--accent)' }}>.</span>
            </h2>
            <div style={{ fontFamily:'var(--mono)', fontSize:11, color:'var(--text-muted)', letterSpacing:'.2em', textTransform:'uppercase' }}>
              {String(PROJECTS.length).padStart(2,'0')} · trabalhos
            </div>
          </div>
        </Reveal>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(2, 1fr)',
          gridAutoRows:'1fr',
          gap:24,
        }} className="proj-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={120 + i*100} style={{ display:'flex' }}>
              <ProjectCard project={p} onOpen={setActive} />
            </Reveal>
          ))}

          {/* "More" tile */}
          <Reveal delay={120 + PROJECTS.length*100}>
            <div style={{
              minHeight:340,
              border:'1px dashed var(--border-strong)',
              padding:32,
              display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
              textAlign:'center', gap:14,
              color:'var(--text-muted)',
            }}>
              <span style={{ fontFamily:'var(--serif)', fontSize:48, color:'var(--text-faint)' }}>+</span>
              <div className="label">Em produção</div>
              <p style={{ fontFamily:'var(--serif)', fontStyle:'italic', fontSize:15, maxWidth:'28ch', lineHeight:1.5 }}>
                Novos projetos chegam a cada semestre — fique de olho.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />

      <style>{`
        @media (max-width: 760px){
          .proj-grid{grid-template-columns: 1fr !important;}
        }
      `}</style>
    </section>
  );
}

window.Projetos = Projetos;


// ===== Certificados.jsx =====
// Layout inspirado em "Perfis de Missão" do design system AERO_SYSTEMS:
// coluna esquerda com tabs verticais (categoria · título · status chip)
// e painel direito com background visual + título e descrição expandidos.
// Mantém a tipografia editorial do portfólio (Playfair Display + IBM Plex).

const CERTS = [
  {
    id: 'agentes-agno',
    category: 'IA & AGENTES',
    year: '2025',
    title: 'Criando Agentes com Agno',
    badge: 'ASIMOV ACADEMY',
    full: 'Criando Agentes com Agno',
    issuer: 'Asimov Academy',
    hours: '14h',
    credential: 'c449192d-2c5a-4f28-8db5-0e93399b5156',
    desc: 'Construção e deploy de agentes autônomos com o framework Agno. Cobre arquitetura de agentes, orquestração com LLMs e publicação em produção — base para os pipelines de IA que uso hoje em projetos próprios.',
    skills: ['Agno', 'Python', 'LLM Agents', 'Deploy'],
    verifyUrl: 'https://hub.asimov.academy/validar-certificado/c449192d-2c5a-4f28-8db5-0e93399b5156/',
  },
  {
    id: 'engenharia-ia',
    category: 'IA & FOUNDATION MODELS',
    year: '2025',
    title: 'Engenharia de IA',
    badge: 'ESTUDO PRÓPRIO · O\u2019REILLY',
    full: 'AI Engineering · Chip Huyen',
    issuer: 'Estudo independente · livro de Chip Huyen (O\u2019Reilly)',
    hours: 'Em curso',
    credential: 'self-study-ai-engineering',
    desc: 'Leitura aplicada do livro AI Engineering — fundamentos de aplicações com foundation models: avaliação, RAG, fine-tuning leve, prompt engineering, custo e latência. Estudo conduzido em paralelo aos projetos próprios.',
    skills: ['Foundation Models', 'RAG', 'Avaliação LLM', 'Prompting'],
    verifyUrl: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
  },
  {
    id: 'matematica-dados',
    category: 'MATEMÁTICA',
    year: '2025',
    title: 'Matemática para Análise de Dados',
    badge: 'ASIMOV ACADEMY',
    full: 'Matemática para Análise de Dados',
    issuer: 'Asimov Academy',
    hours: '7h',
    credential: '3fd894f6-3b5a-46d8-a2d8-07848ae6fa15',
    desc: 'Revisão aplicada de cálculo, álgebra linear, probabilidade e estatística com foco em análise de dados. Ferramental quantitativo que sustenta leituras com rigor e não só com narrativa.',
    skills: ['Cálculo', 'Álgebra Linear', 'Probabilidade', 'Estatística'],
    verifyUrl: 'https://hub.asimov.academy/validar-certificado/3fd894f6-3b5a-46d8-a2d8-07848ae6fa15/',
  },
  {
    id: 'usp-probabilidade',
    category: 'ESTATÍSTICA',
    year: '2026',
    title: 'Probabilidade & Estatística',
    badge: 'USP · ICMC',
    full: 'Fundamentos de Probabilidade e Estatística para Ciência de Dados',
    issuer: 'Universidade de São Paulo · ICMC',
    hours: '30h',
    credential: 'KPCP-CDSD-PLUH-7CE6',
    desc: 'Curso de Extensão Universitária no Instituto de Ciências Matemáticas e de Computação da USP. Fundamentos formais de probabilidade e estatística que sustentam toda inferência e análise quantitativa em comunicação.',
    skills: ['Probabilidade', 'Inferência', 'Estatística', 'Ciência de Dados'],
    verifyUrl: 'assets/cert-usp-probabilidade.pdf',
  },
];

function CertVisual({ cert, ord }) {
  const rot = [10, 35, 60, 85][ord % 4];
  const glyph = cert.title[0];
  return (
    <div aria-hidden="true" style={{
      position:'absolute', inset:0, overflow:'hidden',
      background:'var(--bg)',
    }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position:'absolute', inset:0, opacity:0.55 }}>
        <defs>
          <pattern id={`cert-pat-${cert.id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform={`rotate(${rot})`}>
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(244,240,235,0.045)" strokeWidth="1"/>
          </pattern>
          <radialGradient id={`cert-rad-${cert.id}`} cx="78%" cy="28%" r="65%">
            <stop offset="0%"  stopColor="var(--accent)" stopOpacity="0.16"/>
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.02"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cert-pat-${cert.id})`}/>
        <rect width="100%" height="100%" fill={`url(#cert-rad-${cert.id})`}/>
      </svg>

      <div style={{
        position:'absolute', inset:0,
        backgroundImage:
          'linear-gradient(to right, rgba(244,240,235,0.022) 1px, transparent 1px),'+
          'linear-gradient(to bottom, rgba(244,240,235,0.022) 1px, transparent 1px)',
        backgroundSize:'48px 48px',
      }}/>

      <div style={{
        position:'absolute', right:'4%', top:'8%',
        fontFamily:'var(--serif)', fontWeight:700,
        fontSize:'clamp(280px, 38vw, 460px)', lineHeight:1,
        color:'var(--text-faint)',
        letterSpacing:'-0.06em', pointerEvents:'none', userSelect:'none',
        opacity:0.85,
      }}>{glyph}</div>

      <CertCornerMarks/>

      <div style={{
        position:'absolute', left:0, right:0, top:'72%', height:1,
        background:'linear-gradient(90deg, transparent, var(--accent-22), transparent)',
        opacity:0.7,
      }}/>
    </div>
  );
}

function CertCornerMarks() {
  const m = (pos) => ({ position:'absolute', width:14, height:14, ...pos });
  const stroke = '1px solid var(--border-strong)';
  return (
    <React.Fragment>
      <span aria-hidden="true" style={{...m({top:18, left:18}), borderTop:stroke, borderLeft:stroke}}/>
      <span aria-hidden="true" style={{...m({top:18, right:18}), borderTop:stroke, borderRight:stroke}}/>
      <span aria-hidden="true" style={{...m({bottom:18, left:18}), borderBottom:stroke, borderLeft:stroke}}/>
      <span aria-hidden="true" style={{...m({bottom:18, right:18}), borderBottom:stroke, borderRight:stroke}}/>
    </React.Fragment>
  );
}

function CertTab({ cert, active, onPick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onPick}
      style={{
        position:'relative', display:'block', width:'100%',
        textAlign:'left',
        padding:'28px 28px 28px 30px',
        background: active ? 'var(--accent-04)' : (hover ? 'rgba(244,240,235,0.018)' : 'transparent'),
        borderBottom:'1px solid var(--border)',
        borderLeft: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
        transition:'background .35s var(--ease), border-color .35s var(--ease)',
        cursor:'pointer',
      }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        marginBottom:14,
      }}>
        <span style={{
          fontFamily:'var(--mono)', fontSize:10,
          letterSpacing:'.28em', textTransform:'uppercase',
          color: active ? 'var(--accent)' : (hover ? 'var(--accent)' : 'var(--text-soft)'),
          transition:'color .35s var(--ease)',
        }}>{cert.category} · {cert.year}</span>
        <span aria-hidden="true" style={{
          width:6, height:6, borderRadius:'50%',
          background: active ? 'var(--accent)' : 'transparent',
          border: `1px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
          boxShadow: active ? '0 0 0 4px var(--accent-18)' : 'none',
          transition:'all .35s var(--ease)',
        }}/>
      </div>

      <h3 style={{
        fontFamily:'var(--serif)', fontWeight:700,
        fontSize:24, lineHeight:1.15, letterSpacing:'-0.018em',
        color: active ? 'var(--text)' : (hover ? 'var(--text)' : 'var(--text-muted)'),
        marginBottom:14,
        transition:'color .35s var(--ease)',
      }}>{cert.title}</h3>

      <span style={{
        display:'inline-flex', alignItems:'center', gap:8,
        padding:'5px 10px',
        border:`1px solid ${active ? 'var(--accent-45)' : 'var(--border-strong)'}`,
        background: active ? 'var(--accent-08)' : 'var(--surface)',
        color: active ? 'var(--accent)' : (hover ? 'var(--text)' : 'var(--text-soft)'),
        fontFamily:'var(--mono)', fontSize:9,
        letterSpacing:'.24em', textTransform:'uppercase',
        lineHeight:1,
        transition:'all .35s var(--ease)',
      }}>{cert.badge}</span>
    </button>
  );
}

function CertPanel({ cert, ord }) {
  return (
    <div style={{
      position:'absolute', inset:0,
      animation:'certIn .5s var(--ease)',
    }}>
      <style>{`
        @keyframes certIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <CertVisual cert={cert} ord={ord} />

      <div style={{
        position:'absolute', inset:0,
        padding:'56px 56px 48px',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        zIndex:2,
      }} className="cert-panel-pad">

        <div>
          <div style={{
            display:'flex', alignItems:'center', gap:12, marginBottom:24, flexWrap:'wrap',
          }}>
            <span style={{
              fontFamily:'var(--mono)', fontSize:10,
              letterSpacing:'.28em', textTransform:'uppercase',
              color:'var(--accent)',
            }}>// CERT_FILE · {String(cert.credential).slice(0, 8).toUpperCase()}</span>
            <span style={{ width:1, height:12, background:'var(--border-strong)' }}/>
            <span style={{
              fontFamily:'var(--mono)', fontSize:10,
              letterSpacing:'.28em', textTransform:'uppercase',
              color:'var(--text-soft)',
            }}>{cert.hours} · CARGA HORÁRIA</span>
          </div>

          <h3 style={{
            fontFamily:'var(--serif)', fontWeight:700,
            fontSize:'clamp(28px, 3.4vw, 40px)',
            lineHeight:1.08, letterSpacing:'-0.022em',
            color:'var(--text)',
            maxWidth:'22ch',
            marginBottom:24,
          }}>{cert.full}<span style={{ color:'var(--accent)' }}>.</span></h3>

          <p style={{
            fontFamily:'var(--sans)', fontWeight:300, fontSize:14, lineHeight:1.75,
            color:'var(--text-muted)',
            maxWidth:'52ch',
            paddingLeft:18, borderLeft:'1px solid var(--accent)',
          }}>{cert.desc}</p>
        </div>

        <div style={{
          marginTop:40,
          paddingTop:24, borderTop:'1px solid var(--border)',
          display:'grid', gridTemplateColumns:'1.4fr 2fr auto', gap:32,
          alignItems:'end',
        }} className="cert-meta">
          <div>
            <div className="label" style={{ color:'var(--text-muted)', marginBottom:6 }}>Emissor</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:16, color:'var(--text)', lineHeight:1.3 }}>
              {cert.issuer}
            </div>
          </div>
          <div>
            <div className="label" style={{ color:'var(--text-muted)', marginBottom:10 }}>Aplicações</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {cert.skills.map(s => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
          <a
            href={cert.verifyUrl || '#'}
            data-magnetic
            target="_blank"
            rel="noreferrer noopener"
            className="olink"
            style={{ whiteSpace:'nowrap' }}>
            <span className="arr" aria-hidden="true">↗</span>
            <span>Verificar</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Certificados() {
  const [idx, setIdx] = React.useState(0);
  const cert = CERTS[idx];

  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let paused = false;
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    const id = setInterval(() => {
      if (paused) return;
      setIdx(i => (i + 1) % CERTS.length);
    }, 9000);
    return () => {
      clearInterval(id);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="certificados" data-screen-label="04 Certificados" style={{
      position:'relative', padding:'120px 0', overflow:'hidden',
    }}>
      <SectionNumber top={40} right={-20}>04</SectionNumber>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <Reveal>
          <SectionEyebrow num="04" label="Certificações & Credenciais" />
        </Reveal>

        <Reveal delay={80}>
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'flex-end',
            flexWrap:'wrap', gap:24, marginBottom:64,
          }}>
            <h2 style={{
              fontFamily:'var(--serif)', fontWeight:700,
              fontSize:'clamp(40px, 5.6vw, 64px)',
              lineHeight:1, letterSpacing:'-0.025em',
            }}>
              Capacidades<br/>Certificadas<span style={{ color:'var(--accent)' }}>.</span>
            </h2>
            <div style={{
              fontFamily:'var(--mono)', fontSize:11,
              color:'var(--text-muted)', letterSpacing:'.2em', textTransform:'uppercase',
            }}>
              {String(CERTS.length).padStart(2,'0')} · credenciais
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div
            ref={rootRef}
            style={{
              display:'grid',
              gridTemplateColumns:'minmax(280px, 1fr) 2fr',
              minHeight: 640,
              border:'1px solid var(--border)',
              background:'var(--surface)',
              position:'relative',
            }}
            className="cert-grid">

            <div style={{
              borderRight:'1px solid var(--border)',
              background:'rgba(244,240,235,0.012)',
              display:'flex', flexDirection:'column',
            }} className="cert-tabs">
              {CERTS.map((c, i) => (
                <CertTab key={c.id} cert={c} active={i === idx} onPick={() => setIdx(i)} />
              ))}
            </div>

            <div style={{
              position:'relative', overflow:'hidden',
              background:'#080808',
            }} className="cert-panel">
              <CertPanel cert={cert} ord={idx} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div style={{
            marginTop:24,
            display:'flex', justifyContent:'space-between', alignItems:'center',
            flexWrap:'wrap', gap:14,
          }}>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              {CERTS.map((c, i) => (
                <button
                  key={c.id}
                  aria-label={`Mostrar certificado ${c.title}`}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 28 : 12, height:2,
                    background: i === idx ? 'var(--accent)' : 'var(--border-strong)',
                    transition:'all .45s var(--ease)',
                    cursor:'pointer',
                    padding:0,
                    border:'none',
                  }}
                />
              ))}
            </div>
            <span style={{
              fontFamily:'var(--mono)', fontSize:10,
              letterSpacing:'.28em', textTransform:'uppercase',
              color:'var(--text-soft)',
            }}>
              {String(idx + 1).padStart(2,'0')} / {String(CERTS.length).padStart(2,'0')} · {cert.category}
            </span>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px){
          .cert-grid{
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .cert-tabs{
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .cert-panel{
            min-height: 520px;
          }
        }
        @media (max-width: 600px){
          .cert-panel-pad{ padding: 32px 28px 28px !important; }
          .cert-meta{
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

window.Certificados = Certificados;


// ===== Depoimentos.jsx =====
function Depoimentos() {
  const items = [
    {
      num: '01',
      quote: 'Gustavo se destacou primeiro como aluno e depois como integrante do projeto de extração de dados de segurança: autônomo, tecnicamente sólido e com leitura analítica do que extrai — não apenas executa.',
      name: 'Matheus Pestana',
      role: 'Professor de Extração e Análise de Dados',
      context: 'Gerente do projeto de extração de dados de segurança',
    },
    {
      num: '02',
      quote: 'Como Sênior de Digital Development na FGV Jr., o Gustavo entregou dashboards, KPIs e pipelines de webscraping com clareza técnica e maturidade de gestão — elevava o nível de quem trabalhava ao seu redor.',
      name: 'Nicholas Costa',
      role: 'ex-Diretor de Digital Development',
      context: 'FGV Jr. — Consultoria Júnior da FGV',
    },
  ];

  return (
    <section id="depoimentos" data-screen-label="05 Depoimentos" style={{
      position:'relative', padding:'120px 0', overflow:'hidden',
    }}>
      <SectionNumber top={40} right={-20}>05</SectionNumber>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <Reveal>
          <SectionEyebrow num="05" label="Depoimentos" />
        </Reveal>

        <Reveal delay={80}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:64 }}>
            <h2 style={{
              fontFamily:'var(--serif)', fontWeight:700,
              fontSize:'clamp(40px, 5.6vw, 64px)',
              lineHeight:1, letterSpacing:'-0.025em',
            }}>
              O que dizem<span style={{ color:'var(--accent)' }}>.</span>
            </h2>
          </div>
        </Reveal>

        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:24,
        }} className="dep-grid">
          {items.map((it, i) => (
            <Reveal key={i} delay={120 + i*100}>
              <figure style={{
                position:'relative',
                minHeight:260,
                border:'1px solid var(--border-strong)',
                padding:'40px 36px 32px',
                display:'flex', flexDirection:'column', gap:18,
                background:'transparent',
                margin:0,
              }}>
                <div style={{
                  position:'absolute', top:14, left:16,
                  fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.2em',
                  color:'var(--text-soft)', textTransform:'uppercase',
                }}>
                  {it.num} / depoimento
                </div>
                <svg width="32" height="24" viewBox="0 0 36 28" fill="none" aria-hidden="true" style={{ marginTop:14 }}>
                  <path d="M0 28V18C0 8 4 2 13 0L15 4C9 6 6 10 6 16H14V28H0ZM22 28V18C22 8 26 2 35 0L37 4C31 6 28 10 28 16H36V28H22Z" fill="var(--accent)"/>
                </svg>

                <blockquote style={{
                  fontFamily:'var(--serif)', fontStyle:'italic',
                  fontSize:17, lineHeight:1.55,
                  color:'var(--text)',
                  margin:0,
                  textWrap:'pretty',
                }}>
                  “{it.quote}”
                </blockquote>

                <figcaption style={{
                  display:'flex', flexDirection:'column', gap:4,
                  marginTop:'auto', paddingTop:18,
                  borderTop:'1px dashed var(--border)',
                }}>
                  <div style={{
                    fontFamily:'var(--sans)', fontWeight:600, fontSize:14,
                    color:'var(--text)', letterSpacing:'-0.01em',
                  }}>
                    {it.name}
                  </div>
                  <div style={{
                    fontFamily:'var(--sans)', fontSize:13,
                    color:'var(--text-muted)',
                  }}>
                    {it.role}
                  </div>
                  <div className="label" style={{ color:'var(--text-soft)', marginTop:4 }}>
                    {it.context}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px){
          .dep-grid{grid-template-columns: 1fr !important;}
        }
      `}</style>
    </section>
  );
}

window.Depoimentos = Depoimentos;


// ===== Contato.jsx =====
function Contato() {
  return (
    <section id="contato" data-screen-label="06 Contato" style={{
      position:'relative', padding:'140px 0 80px', overflow:'hidden',
    }}>
      <SectionNumber top={20} left={-30} right="auto">06</SectionNumber>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <Reveal>
          <SectionEyebrow num="06" label="Contato" />
        </Reveal>

        <div style={{
          display:'grid', gridTemplateColumns:'7fr 5fr', gap:80, alignItems:'end',
        }} className="cont-grid">
          <Reveal delay={80}>
            <h2 style={{
              fontFamily:'var(--serif)', fontWeight:700,
              fontSize:'clamp(56px, 8vw, 96px)',
              lineHeight:0.95, letterSpacing:'-0.03em',
            }}>
              Vamos<br/>
              <span style={{ display:'inline-flex', alignItems:'baseline', gap:'0.1em' }}>
                conversar<span style={{ color:'var(--accent)' }}>?</span>
              </span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p style={{
              fontFamily:'var(--serif)', fontStyle:'italic',
              fontSize:18, lineHeight:1.6,
              color:'var(--text-muted)',
              paddingLeft:20, borderLeft:'1px solid var(--accent)',
              maxWidth:'42ch',
            }}>
              Estou sempre aberto a novas conversas — seja sobre projetos, parcerias ou ideias que ainda estão tomando forma.
            </p>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div style={{ marginTop:64, display:'flex', gap:14, flexWrap:'wrap' }}>
            <OutlineLink href={`mailto:${EMAIL}`} external={false}>Email</OutlineLink>
            <OutlineLink href={LINKEDIN}>LinkedIn</OutlineLink>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div style={{
            marginTop:80, paddingTop:32, borderTop:'1px solid var(--border)',
            display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24,
          }} className="cont-meta">
            <Meta2 label="Localização">Rio de Janeiro · BR</Meta2>
            <Meta2 label="Disponibilidade">Estágio · Freelance</Meta2>
            <Meta2 label="Resposta">~24h em dias úteis</Meta2>
          </div>
        </Reveal>
      </div>

      <Footer />

      <style>{`
        @media (max-width:880px){
          .cont-grid{grid-template-columns:1fr !important; gap:40px !important; align-items:start !important;}
          .cont-meta{grid-template-columns:1fr !important;}
        }
      `}</style>
    </section>
  );
}

function Meta2({ label, children }) {
  return (
    <div>
      <div className="label" style={{ color:'var(--text-muted)', marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily:'var(--serif)', fontSize:17, color:'var(--text)' }}>{children}</div>
    </div>
  );
}

function Footer() {
  return (
    <div className="container" style={{
      marginTop:96, paddingTop:32, borderTop:'1px solid var(--border)',
      display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:14,
    }}>
      <div style={{
        fontFamily:'var(--sans)', fontWeight:300, fontSize:12,
        color:'var(--text-soft)',
      }}>
        © 2025 Gustavo de Oliveira · Comunicação Digital × Dados
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span aria-hidden="true" style={{
          width:6, height:6, borderRadius:'50%', background:'var(--accent)',
          animation:'pulseDot 2.4s ease-in-out infinite',
        }} />
        <span className="label" style={{ color:'var(--text-muted)', fontSize:10 }}>
          Versão 2 · Studio Editorial
        </span>
      </div>
    </div>
  );
}

window.Contato = Contato;


// ===== App.jsx =====
function App() {
  // Smooth-scroll for in-page anchors
  React.useEffect(() => {
    const handle = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior:'smooth' });
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, []);

  return (
    <React.Fragment>
      <CursorFollower />
      <SideRail />
      <Navbar />
      <main>
        <Hero />
        <Competencias />
        <Projetos />
        <Certificados />
        <Depoimentos />
        <Contato />
      </main>
      <SystemBar />
      <TweaksHost />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

