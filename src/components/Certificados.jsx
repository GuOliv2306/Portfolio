import React from 'react';
import { CERTS } from '../data.js';
import { Reveal, SectionNumber, SectionEyebrow, Tag } from './primitives.jsx';

const ROTATIONS = [10, 35, 60, 85];

function CertVisual({ cert, ord }) {
  const rot = ROTATIONS[ord % ROTATIONS.length];
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      <div className="cert-hatch" style={{ '--hatch-rot': `${rot}deg` }} />
      <div className="cert-radial" />
      <div className="cert-mesh" />

      <div style={{
        position: 'absolute', right: '4%', top: '8%',
        fontFamily: 'var(--serif)', fontWeight: 700,
        fontSize: 'clamp(280px, 38vw, 460px)', lineHeight: 1,
        color: 'var(--text-faint)',
        letterSpacing: '-0.06em', pointerEvents: 'none', userSelect: 'none',
        opacity: 0.85,
      }}>{cert.title[0]}</div>

      <span className="cert-mark cert-mark-tl" />
      <span className="cert-mark cert-mark-tr" />
      <span className="cert-mark cert-mark-bl" />
      <span className="cert-mark cert-mark-br" />

      <div style={{
        position: 'absolute', left: 0, right: 0, top: '72%', height: 1,
        background: 'linear-gradient(90deg, transparent, var(--accent-22), transparent)',
        opacity: 0.7,
      }} />
    </div>
  );
}

function CertTab({ cert, active, onPick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onPick}
      aria-pressed={active}
      style={{
        position: 'relative', display: 'block', width: '100%',
        textAlign: 'left',
        padding: '28px 28px 28px 30px',
        background: active ? 'var(--accent-04)' : (hover ? 'rgba(244,240,235,0.018)' : 'transparent'),
        borderBottom: '1px solid var(--border)',
        borderLeft: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
        transition: 'background .35s var(--ease), border-color .35s var(--ease)',
        cursor: 'pointer',
      }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 14,
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
          letterSpacing: '.28em', textTransform: 'uppercase',
          color: active || hover ? 'var(--accent)' : 'var(--text-soft)',
          transition: 'color .35s var(--ease)',
        }}>{cert.category} · {cert.year}</span>
        <span aria-hidden="true" style={{
          width: 6, height: 6, borderRadius: '50%',
          background: active ? 'var(--accent)' : 'transparent',
          border: `1px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
          boxShadow: active ? '0 0 0 4px var(--accent-18)' : 'none',
          transition: 'background .35s var(--ease), border-color .35s var(--ease), box-shadow .35s var(--ease)',
        }} />
      </div>

      <h3 style={{
        fontFamily: 'var(--serif)', fontWeight: 700,
        fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.018em',
        color: active || hover ? 'var(--text)' : 'var(--text-muted)',
        marginBottom: 14,
        transition: 'color .35s var(--ease)',
      }}>{cert.title}</h3>

      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '5px 10px',
        border: `1px solid ${active ? 'var(--accent-45)' : 'var(--border-strong)'}`,
        background: active ? 'var(--accent-08)' : 'var(--surface)',
        color: active ? 'var(--accent)' : (hover ? 'var(--text)' : 'var(--text-soft)'),
        fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
        letterSpacing: '.24em', textTransform: 'uppercase',
        lineHeight: 1,
        transition: 'background .35s var(--ease), border-color .35s var(--ease), color .35s var(--ease)',
      }}>{cert.badge}</span>
    </button>
  );
}

function CertPanel({ cert, ord }) {
  return (
    <div key={cert.id} className="cert-anim" style={{ position: 'absolute', inset: 0 }}>
      <CertVisual cert={cert} ord={ord} />

      <div className="cert-panel-pad" style={{
        position: 'absolute', inset: 0,
        padding: '56px 56px 48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        zIndex: 2,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>// CERT_FILE · {String(cert.credential).slice(0, 8).toUpperCase()}</span>
            <span style={{ width: 1, height: 12, background: 'var(--border-strong)' }} />
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'var(--text-soft)',
            }}>{cert.hours} · CARGA HORÁRIA</span>
          </div>

          <h3 style={{
            fontFamily: 'var(--serif)', fontWeight: 700,
            fontSize: 'clamp(28px, 3.4vw, 40px)',
            lineHeight: 1.08, letterSpacing: '-0.022em',
            color: 'var(--text)',
            maxWidth: '22ch',
            marginBottom: 24,
          }}>{cert.full}<span style={{ color: 'var(--accent)' }}>.</span></h3>

          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 'var(--fs-body)', lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: '52ch',
            paddingLeft: 18, borderLeft: '1px solid var(--accent)',
          }}>{cert.desc}</p>
        </div>

        <div className="cert-meta" style={{
          marginTop: 40,
          paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: '1.4fr 2fr auto', gap: 32,
          alignItems: 'end',
        }}>
          <div>
            <div className="label" style={{ color: 'var(--text-muted)', marginBottom: 6 }}>Emissor</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--text)', lineHeight: 1.3 }}>
              {cert.issuer}
            </div>
          </div>
          <div>
            <div className="label" style={{ color: 'var(--text-muted)', marginBottom: 10 }}>Aplicações</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {cert.skills.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
          <a
            href={cert.verifyUrl}
            data-magnetic
            target="_blank"
            rel="noreferrer noopener"
            className="olink"
            style={{ whiteSpace: 'nowrap' }}>
            <span className="arr" aria-hidden="true">↗</span>
            <span>Verificar</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Certificados() {
  const [idx, setIdx] = React.useState(0);
  const cert = CERTS[idx];

  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let paused = false;
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    const id = setInterval(() => {
      if (paused) return;
      setIdx((i) => (i + 1) % CERTS.length);
    }, 9000);
    return () => {
      clearInterval(id);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="certificados" data-screen-label="04 Certificados" style={{
      position: 'relative', padding: '120px 0', overflow: 'hidden',
    }}>
      <SectionNumber top={40} right={-20}>04</SectionNumber>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionEyebrow num="04" label="Certificações & Credenciais" />
        </Reveal>

        <Reveal delay={80}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: 24, marginBottom: 64,
          }}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 700,
              fontSize: 'clamp(40px, 5.6vw, 64px)',
              lineHeight: 1, letterSpacing: '-0.025em',
            }}>
              Capacidades<br />Certificadas<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
              color: 'var(--text-muted)', letterSpacing: '.2em', textTransform: 'uppercase',
            }}>
              {String(CERTS.length).padStart(2, '0')} · credenciais
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div
            ref={rootRef}
            className="cert-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
              minHeight: 640,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              position: 'relative',
            }}>
            <div className="cert-tabs" style={{
              borderRight: '1px solid var(--border)',
              background: 'rgba(244,240,235,0.012)',
              display: 'flex', flexDirection: 'column',
            }}>
              {CERTS.map((c, i) => (
                <CertTab key={c.id} cert={c} active={i === idx} onPick={() => setIdx(i)} />
              ))}
            </div>

            <div className="cert-panel" style={{ position: 'relative', overflow: 'hidden', background: '#080808' }}>
              <CertPanel cert={cert} ord={idx} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div style={{
            marginTop: 24,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 14,
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {CERTS.map((c, i) => (
                <button
                  key={c.id}
                  aria-label={`Mostrar certificado ${c.title}`}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 28 : 12, height: 2,
                    background: i === idx ? 'var(--accent)' : 'var(--border-strong)',
                    transition: 'width .45s var(--ease), background .45s var(--ease)',
                    cursor: 'pointer',
                    padding: 0,
                    border: 'none',
                  }}
                />
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'var(--text-soft)',
            }}>
              {String(idx + 1).padStart(2, '0')} / {String(CERTS.length).padStart(2, '0')} · {cert.category}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
