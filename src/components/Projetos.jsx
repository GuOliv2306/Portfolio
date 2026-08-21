import React from 'react';
import { PROJECTS } from '../data.js';
import { Reveal, SectionNumber, SectionEyebrow, Tag, Meta, useScrollLock, useFocusTrap } from './primitives.jsx';

const GithubMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
  </svg>
);

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
            fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
            letterSpacing: '.24em', textTransform: 'uppercase',
            color: 'var(--text-soft)',
            lineHeight: 1,
          }}>
            <span aria-hidden="true" style={{ fontSize: 'var(--fs-micro)' }}>●</span>
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
        fontFamily: 'var(--sans)', fontSize: 'var(--fs-body)', lineHeight: 1.65,
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

      <div className="proj-foot">
        {/* O <button> é o gatilho acessível: um tab stop por card, Enter/Espaço
            nativos e foco visível. O clique no article segue valendo p/ mouse. */}
        <button
          type="button"
          className="proj-cta"
          aria-label={`Estudo de caso: ${project.title}`}
          onClick={(e) => { e.stopPropagation(); onOpen(project); }}>
          <span>Estudo de caso</span>
          <span className="proj-cta-arrow" aria-hidden="true">→</span>
        </button>

        <div className="proj-links">
          {project.repoUrl && (
            <a href={project.repoUrl} className="proj-link"
              target="_blank" rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Código no GitHub: ${project.title}`}>
              <GithubMark /><span>GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="proj-link"
              target="_blank" rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Abrir ao vivo: ${project.title}`}>
              <span aria-hidden="true">↗</span><span>Ao vivo</span>
            </a>
          )}
          {project.confidential && !project.repoUrl && (
            <span className="proj-link is-static">
              <span aria-hidden="true">●</span><span>Sem link público</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ModalSection({ num, title, children }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)', color: 'var(--accent)', letterSpacing: '.25em' }}>{num}</span>
        <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
        <h3 className="label" style={{ color: 'var(--text)' }}>{title}</h3>
      </div>
      <div className="modal-body" style={{
        fontFamily: 'var(--sans)', fontSize: 'var(--fs-body)', lineHeight: 1.8, color: 'var(--text-muted)',
        maxWidth: '72ch', paddingLeft: 60,
      }}>{children}</div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  const cardRef = React.useRef(null);
  const titleId = `proj-title-${project.id}`;

  useScrollLock(true);
  // Foca o botão fechar ao abrir, prende o Tab no diálogo e devolve o foco
  // ao card que abriu quando desmonta.
  useFocusTrap(cardRef, true, '.modal-close');

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
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
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="modal-scroll modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
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

        <h2 id={titleId} style={{
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
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'var(--fs-body)', marginTop: 4, lineHeight: 1.25 }}>{d}</div>
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
                fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
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
            <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)', color: 'var(--text-muted)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
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
              <span aria-hidden="true" style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--text-faint)' }}>+</span>
              <div className="label">Em produção</div>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'var(--fs-body)', maxWidth: '28ch', lineHeight: 1.5 }}>
                Novos projetos chegam a cada semestre — fique de olho.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}
