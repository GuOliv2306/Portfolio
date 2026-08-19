import React from 'react';
import { PROJECTS } from '../data.js';
import { Reveal, SectionNumber, SectionEyebrow, Tag, Meta } from './primitives.jsx';

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
        position: 'relative',
        padding: '40px 32px 32px',
        background: hover ? 'var(--surface-2)' : 'var(--surface)',
        borderLeft: `3px solid ${hover ? 'var(--accent)' : 'transparent'}`,
        borderTop: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'background .5s var(--ease), border-color .45s var(--ease), transform .32s cubic-bezier(.22,1,.36,1), box-shadow .42s var(--ease)',
        boxShadow: hover ? '0 18px 50px -22px rgba(0,0,0,0.75)' : '0 0 0 rgba(0,0,0,0)',
        transform: hover ? 'translateY(-3px)' : 'none',
        width: '100%',
        height: '100%',
        minHeight: 360,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
      <span className="glow-grid" aria-hidden="true" />
      <div aria-hidden="true" style={{
        position: 'absolute', top: 16, right: 24,
        fontFamily: 'var(--serif)', fontWeight: 400,
        fontSize: 120, lineHeight: 1,
        color: hover ? 'var(--accent-32)' : 'var(--text-faint)',
        letterSpacing: '-0.04em',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'color .5s var(--ease), transform .5s var(--ease)',
        pointerEvents: 'none',
      }}>{project.num}</div>

      <div className="label" style={{
        color: hover ? 'var(--accent)' : 'var(--text-muted)',
        transition: 'color .4s var(--ease)',
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      }}>
        <span>{project.category} · {project.date}</span>
        {project.confidential && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 8px',
            border: '1px solid var(--border-strong)',
            background: 'rgba(244,240,235,0.025)',
            fontFamily: 'var(--mono)', fontSize: 9,
            letterSpacing: '.24em', textTransform: 'uppercase',
            color: 'var(--text-soft)',
            lineHeight: 1,
          }}>
            <span aria-hidden="true" style={{ fontSize: 10 }}>●</span>
            Confidencial
          </span>
        )}
      </div>

      <h3 style={{
        marginTop: 16,
        fontFamily: 'var(--serif)', fontWeight: 700,
        fontSize: 28, lineHeight: 1.15,
        letterSpacing: '-0.015em',
        maxWidth: '90%',
      }}>{project.title}</h3>

      <p style={{
        marginTop: 14,
        fontFamily: 'var(--sans)', fontSize: 13.5, lineHeight: 1.65,
        color: 'var(--text-muted)',
        maxWidth: '95%',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{project.challenge}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 24 }}>
        {project.tools.slice(0, 4).map((t) => <Tag key={t}>{t}</Tag>)}
      </div>

      <div style={{
        marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 11,
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: hover ? 'var(--accent)' : 'var(--text)',
          transition: 'color .4s var(--ease)',
        }}>Ver detalhes</span>
        <span style={{
          fontSize: 18,
          display: 'inline-block',
          color: hover ? 'var(--accent)' : 'var(--text-muted)',
          transform: hover ? 'translateX(6px)' : 'none',
          transition: 'color .4s var(--ease), transform .5s var(--ease)',
        }}>→</span>
      </div>
    </article>
  );
}

function ModalSection({ num, title, children }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.25em' }}>{num}</span>
        <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
        <h3 className="label" style={{ color: 'var(--text)' }}>{title}</h3>
      </div>
      <div className="modal-body" style={{
        fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)',
        maxWidth: '72ch', paddingLeft: 60,
      }}>{children}</div>
    </section>
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
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(8,8,8,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '80px 24px 40px',
        overflowY: 'auto',
        animation: 'fadeMod .35s var(--ease)',
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-scroll modal-card"
        style={{
          width: '100%', maxWidth: 880,
          background: 'var(--bg)',
          border: '1px solid var(--border-strong)',
          padding: '56px 56px 64px',
          position: 'relative',
          animation: 'slideMod .55s var(--ease)',
        }}>
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="modal-close"
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 40, height: 40,
            border: '1px solid var(--border-strong)',
            color: 'var(--text-muted)',
            fontSize: 16,
            transition: 'border-color .4s var(--ease), color .4s var(--ease), transform .4s var(--ease)',
          }}
        >×</button>

        <div aria-hidden="true" style={{
          position: 'absolute', top: 32, right: 84,
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 64, lineHeight: 1,
          color: 'var(--text-faint)',
        }}>{project.num}</div>

        <div className="label" style={{ color: 'var(--accent)' }}>
          {project.category} · {project.date}
        </div>

        <h2 style={{
          marginTop: 12,
          fontFamily: 'var(--serif)', fontWeight: 700,
          fontSize: 'clamp(32px, 4.4vw, 48px)', lineHeight: 1.05,
          letterSpacing: '-0.02em',
          maxWidth: '90%',
        }}>{project.title}</h2>

        <div style={{ height: 1, background: 'var(--border)', margin: '40px 0' }} />

        <ModalSection num="01" title="Desafio">
          <p>{project.challenge}</p>
        </ModalSection>

        <ModalSection num="02" title="Solução">
          <p>{project.solution}</p>
        </ModalSection>

        <ModalSection num="03" title="Entregáveis">
          <div className="deliv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 8 }}>
            {project.deliverables.map((d, i) => (
              <div key={i} className="deliv-tile" style={{
                aspectRatio: '4/3',
                border: '1px dashed var(--border-strong)',
                background: 'var(--surface)',
                position: 'relative',
                display: 'flex', alignItems: 'flex-end', padding: 14,
                overflow: 'hidden',
              }}>
                <div style={{ position: 'relative' }}>
                  <div className="label" style={{ color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>0{i + 1} · entregável</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 15, marginTop: 4, lineHeight: 1.25 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </ModalSection>

        <div className="meta-grid" style={{
          marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
        }}>
          <Meta label="Disciplina">{project.discipline}</Meta>
          <Meta label="Data">{project.date}</Meta>
          <Meta label="Seu Papel">{project.role}</Meta>
        </div>

        <div style={{ marginTop: 40 }}>
          <div className="label" style={{ color: 'var(--accent)', marginBottom: 12 }}>↳ Resultados & Impacto</div>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 18, lineHeight: 1.55, color: 'var(--text)',
            paddingLeft: 18, borderLeft: '2px solid var(--accent)',
          }}>{project.impact}</p>
        </div>

        {(project.repoUrl || project.liveUrl || project.confidential) && (
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {project.repoUrl && (
              <a href={project.repoUrl} className="olink" data-magnetic target="_blank" rel="noreferrer noopener">
                <span className="arr" aria-hidden="true">↗</span>
                <span>Ver no GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} className="olink" data-magnetic target="_blank" rel="noreferrer noopener">
                <span className="arr" aria-hidden="true">↗</span>
                <span>Abrir ao vivo</span>
              </a>
            )}
            {project.confidential && !project.repoUrl && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '14px 22px',
                border: '1px dashed var(--border-strong)',
                background: 'rgba(244,240,235,0.018)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--mono)', fontSize: 10.5,
                letterSpacing: '.24em', textTransform: 'uppercase',
                lineHeight: 1.2,
              }}>
                <span aria-hidden="true" style={{ fontSize: 13 }}>●</span>
                <span>Projeto confidencial · sem link público</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projetos() {
  const [active, setActive] = React.useState(null);
  const close = React.useCallback(() => setActive(null), []);
  return (
    <section id="projetos" data-screen-label="03 Projetos" style={{
      position: 'relative', padding: '120px 0', overflow: 'hidden',
    }}>
      <SectionNumber top={40} left={-30} right="auto">03</SectionNumber>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionEyebrow num="03" label="Projetos Selecionados" />
        </Reveal>

        <Reveal delay={80}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 700,
              fontSize: 'clamp(40px, 5.6vw, 64px)',
              lineHeight: 1, letterSpacing: '-0.025em',
            }}>
              Projetos<br />Selecionados<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
              {String(PROJECTS.length).padStart(2, '0')} · trabalhos
            </div>
          </div>
        </Reveal>

        <div className="proj-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gridAutoRows: '1fr',
          gap: 24,
        }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={120 + i * 100} style={{ display: 'flex' }}>
              <ProjectCard project={p} onOpen={setActive} />
            </Reveal>
          ))}

          <Reveal delay={120 + PROJECTS.length * 100}>
            <div style={{
              minHeight: 340,
              border: '1px dashed var(--border-strong)',
              padding: 32,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              textAlign: 'center', gap: 14,
              color: 'var(--text-muted)',
            }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--text-faint)' }}>+</span>
              <div className="label">Em produção</div>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, maxWidth: '28ch', lineHeight: 1.5 }}>
                Novos projetos chegam a cada semestre — fique de olho.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <ProjectModal project={active} onClose={close} />
    </section>
  );
}
