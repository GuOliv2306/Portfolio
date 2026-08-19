// Certificados — seção 04
// Layout inspirado em "Perfis de Missão" do design system AERO_SYSTEMS:
// coluna esquerda com tabs verticais (categoria · título · status chip)
// e painel direito com background visual + título e descrição expandidos.
// Mantém a tipografia editorial do portfólio (Playfair Display + IBM Plex).

const CERTS = [
  {
    id: 'data-analytics',
    category: 'DADOS',
    year: '2024',
    title: 'Análise de Dados',
    badge: 'GOOGLE / COURSERA',
    full: 'Google Data Analytics Professional',
    issuer: 'Google · via Coursera',
    hours: '180h',
    credential: 'GDAC-7K2-2024',
    desc: 'Programa de seis meses cobrindo coleta, limpeza e análise de dados em SQL, R e Tableau. Foco em traduzir perguntas de negócio em decisões orientadas por evidência.',
    skills: ['SQL', 'R', 'Tableau', 'Spreadsheets'],
  },
  {
    id: 'engenharia-ia',
    category: 'IA & PROMPTING',
    year: '2025',
    title: 'Engenharia de IA',
    badge: 'PROJETO INDEPENDENTE',
    full: 'DSPy & Pipelines com LLMs',
    issuer: 'Estudo independente · Stanford CRFM',
    hours: '60h',
    credential: 'DSP-2025-IND',
    desc: 'Construção de pipelines estruturados com DSPy e validação tipada com Pydantic. Desenho de agentes, prompts compositivos e avaliação automatizada em produção.',
    skills: ['DSPy', 'Pydantic', 'Claude API', 'Avaliação LLM'],
  },
  {
    id: 'storytelling',
    category: 'COMUNICAÇÃO',
    year: '2024',
    title: 'Storytelling com Dados',
    badge: 'FGV ECMI',
    full: 'Narrativas e Visualização de Dados',
    issuer: 'FGV · Escola de Comunicação e Marketing',
    hours: '40h',
    credential: 'FGV-ECM-242-04',
    desc: 'Princípios de visualização editorial, escolha de gráficos por intenção narrativa e construção de relatórios que sustentam uma tese — não apenas exibem números.',
    skills: ['Figma', 'Datawrapper', 'Edição', 'Narrativa visual'],
  },
  {
    id: 'estatistica',
    category: 'ESTATÍSTICA',
    year: '2023',
    title: 'Inferência Aplicada',
    badge: 'EMAp / FGV',
    full: 'Probabilidade & Inferência Estatística',
    issuer: 'FGV EMAp · Matemática Aplicada',
    hours: '120h',
    credential: 'EMAP-PIE-2023-II',
    desc: 'Fundamentos formais de probabilidade, distribuições, testes de hipótese e regressão. Base teórica que sustenta toda análise de discurso e dados sociais nos projetos.',
    skills: ['Python · NumPy', 'SciPy', 'Testes A/B', 'Regressão'],
  },
];

// SVG de fundo "credencial" — placeholder editorial sem reproduzir nenhuma marca.
// Cada certificado recebe um esquema próprio (rotação de linhas + glyph) baseado no id.
function CertVisual({ cert, ord }) {
  const hue = [0, 1, 2, 3][ord % 4];
  const rot = [10, 35, 60, 85][hue];
  const glyph = cert.title[0];
  return (
    <div aria-hidden="true" style={{
      position:'absolute', inset:0, overflow:'hidden',
      background:'var(--bg)',
    }}>
      {/* striped fill — sutil, no espírito de "deliverable placeholder" do projeto */}
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

      {/* grid overlay — eco do scenario panel do design system */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:
          'linear-gradient(to right, rgba(244,240,235,0.022) 1px, transparent 1px),'+
          'linear-gradient(to bottom, rgba(244,240,235,0.022) 1px, transparent 1px)',
        backgroundSize:'48px 48px',
      }}/>

      {/* big serif glyph — número de série / inicial */}
      <div style={{
        position:'absolute',
        right:'4%', top:'8%',
        fontFamily:'var(--serif)', fontWeight:700,
        fontSize:'clamp(280px, 38vw, 460px)', lineHeight:1,
        color:'var(--text-faint)',
        letterSpacing:'-0.06em', pointerEvents:'none', userSelect:'none',
        opacity:0.85,
      }}>{glyph}</div>

      {/* corner marks — quatro cantos, traço único */}
      <CornerMarks/>

      {/* faint scan band — eco do scanline global */}
      <div style={{
        position:'absolute', left:0, right:0, top:'72%', height:1,
        background:'linear-gradient(90deg, transparent, var(--accent-22), transparent)',
        opacity:0.7,
      }}/>
    </div>
  );
}

function CornerMarks() {
  const m = (pos) => {
    const base = { position:'absolute', width:14, height:14, ...pos };
    return base;
  };
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
        position:'relative',
        display:'block', width:'100%',
        textAlign:'left',
        padding:'28px 28px 28px 30px',
        background: active ? 'var(--accent-04)' : (hover ? 'rgba(244,240,235,0.018)' : 'transparent'),
        borderBottom:'1px solid var(--border)',
        borderLeft: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
        transition:'background .35s var(--ease), border-color .35s var(--ease)',
        cursor:'pointer',
      }}>
      {/* row 1 — categoria + status dot */}
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

      {/* row 2 — título serif */}
      <h3 style={{
        fontFamily:'var(--serif)', fontWeight:700,
        fontSize:24, lineHeight:1.15, letterSpacing:'-0.018em',
        color: active ? 'var(--text)' : (hover ? 'var(--text)' : 'var(--text-muted)'),
        marginBottom:14,
        transition:'color .35s var(--ease)',
      }}>{cert.title}</h3>

      {/* row 3 — chip mono */}
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

      {/* content overlay */}
      <div style={{
        position:'absolute', inset:0,
        padding:'56px 56px 48px',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        zIndex:2,
      }} className="cert-panel-pad">

        {/* TOP — meta line + headline */}
        <div>
          <div style={{
            display:'flex', alignItems:'center', gap:12, marginBottom:24, flexWrap:'wrap',
          }}>
            <span style={{
              fontFamily:'var(--mono)', fontSize:10,
              letterSpacing:'.28em', textTransform:'uppercase',
              color:'var(--accent)',
            }}>// CERT_FILE · {cert.credential}</span>
            <span style={{ width:1, height:12, background:'var(--border-strong)' }}/>
            <span style={{
              fontFamily:'var(--mono)', fontSize:10,
              letterSpacing:'.28em', textTransform:'uppercase',
              color:'var(--text-soft)',
            }}>{cert.hours} · CARGA HORÁRIA</span>
          </div>

          <h3 style={{
            fontFamily:'var(--serif)', fontWeight:700,
            fontSize:'clamp(32px, 4vw, 48px)',
            lineHeight:1.05, letterSpacing:'-0.022em',
            color:'var(--text)',
            maxWidth:'18ch',
            marginBottom:24,
          }}>{cert.full}<span style={{ color:'var(--accent)' }}>.</span></h3>

          <p style={{
            fontFamily:'var(--sans)', fontWeight:300, fontSize:14, lineHeight:1.75,
            color:'var(--text-muted)',
            maxWidth:'52ch',
            paddingLeft:18, borderLeft:'1px solid var(--accent)',
          }}>{cert.desc}</p>
        </div>

        {/* BOTTOM — metadata strip */}
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
            href="#"
            data-magnetic
            onClick={(e) => { e.preventDefault(); alert(`Credencial ${cert.credential} — link de verificação será adicionado.`); }}
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

  // Auto-rotate suave a cada 9s — pausa no hover. Replica o ritmo do design system.
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
              Capacidades<br/>
              <span style={{ color:'var(--text-soft)' }}>certificadas</span>
              <span style={{ color:'var(--accent)' }}>.</span>
            </h2>
            <div style={{
              fontFamily:'var(--mono)', fontSize:11,
              color:'var(--text-muted)', letterSpacing:'.2em', textTransform:'uppercase',
            }}>
              {String(CERTS.length).padStart(2,'0')} · credenciais
            </div>
          </div>
        </Reveal>

        {/* Bloco principal: tabs + painel */}
        <Reveal delay={140}>
          <div
            ref={rootRef}
            style={{
              display:'grid',
              gridTemplateColumns:'minmax(280px, 1fr) 2fr',
              minHeight: 560,
              border:'1px solid var(--border)',
              background:'var(--surface)',
              position:'relative',
            }}
            className="cert-grid">

            {/* TABS COLUMN */}
            <div style={{
              borderRight:'1px solid var(--border)',
              background:'rgba(244,240,235,0.012)',
              display:'flex', flexDirection:'column',
            }} className="cert-tabs">
              {CERTS.map((c, i) => (
                <CertTab key={c.id} cert={c} active={i === idx} onPick={() => setIdx(i)} />
              ))}
            </div>

            {/* PANEL COLUMN */}
            <div style={{
              position:'relative', overflow:'hidden',
              background:'#080808',
            }} className="cert-panel">
              <CertPanel cert={cert} ord={idx} />
            </div>
          </div>
        </Reveal>

        {/* counter strip */}
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
