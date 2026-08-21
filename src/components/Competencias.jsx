import React from 'react';
import { SKILLS, TAGS, CV_URL } from '../data.js';
import { PrimaryLink, Reveal, SectionNumber, SectionEyebrow, Tag } from './primitives.jsx';

const NEXT_SECTIONS = [
  ['03', 'Projetos', '#projetos'],
  ['04', 'Certificados', '#certificados'],
  ['05', 'Depoimentos', '#depoimentos'],
  ['06', 'Contato', '#contato'],
];

function SkillRow({ skill }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        columnGap: 24, rowGap: 6,
        padding: '18px 14px 18px 18px',
        marginLeft: -18, marginRight: -14,
        borderBottom: '1px solid var(--border)',
        background: hover ? 'var(--accent-04)' : 'transparent',
        boxShadow: hover ? 'inset 2px 0 0 var(--accent)' : 'inset 0 0 0 transparent',
        transition: 'background .45s var(--ease), box-shadow .45s var(--ease)',
      }}>
      <div style={{ minWidth: 0 }}>
        <span style={{
          fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 18,
          letterSpacing: '-0.005em',
          color: hover ? 'var(--accent)' : 'var(--text)',
          transition: 'color .35s var(--ease)',
        }}>{skill.name}</span>
      </div>
      <div style={{ justifySelf: 'end' }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: hover ? 'var(--text)' : 'var(--text-muted)',
          transition: 'color .35s var(--ease)',
        }}>{skill.source}</span>
      </div>
      <p style={{
        gridColumn: '1 / -1',
        fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 'var(--fs-body)',
        lineHeight: 1.55,
        color: hover ? 'var(--text)' : 'var(--text-muted)',
        maxWidth: '58ch',
        transition: 'color .35s var(--ease)',
      }}>{skill.note}</p>
    </div>
  );
}

// Mesmo visual de antes, agora na classe .pbtn compartilhada com o CTA do
// hero e o rodapé — e com estado de foco, que o hover inline não tinha.
function CVButton() {
  return <PrimaryLink href={CV_URL} external download>Baixar Currículo</PrimaryLink>;
}

export default function Competencias() {
  return (
    <section id="competencias" data-screen-label="02 Competências" style={{
      position: 'relative', padding: '120px 0', overflow: 'hidden',
    }}>
      <SectionNumber top={40} right={-20}>02</SectionNumber>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionEyebrow num="02" label="Perfil & Competências" />
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 700,
            fontSize: 'clamp(40px, 5.6vw, 64px)',
            lineHeight: 1, letterSpacing: '-0.025em',
            marginBottom: 72,
          }}>
            Perfil &<br />Competências<span style={{ color: 'var(--accent)' }}>.</span>
          </h2>
        </Reveal>

        <div className="comp-grid" style={{
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          gap: 80,
          alignItems: 'start',
        }}>
          <Reveal delay={140} style={{ position: 'relative' }}>
            <div className="label" style={{ marginBottom: 20, color: 'var(--accent)' }}>↳ Bio</div>
            <div style={{
              borderLeft: '1px solid var(--accent)',
              paddingLeft: 24,
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <p style={{
                fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: 'var(--fs-body)', lineHeight: 1.85, color: 'var(--text)',
              }}>
                Me chamo Gustavo. Atualmente estudante de <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Comunicação Digital</em> na FGV, mas já fiz 2 anos de Ciência de Dados e IA na EMAp — e faço proveito desse conhecimento híbrido para ter uma análise metódica de dados comunicacionais, entendendo que a complexidade das vidas ao qual só os números e inferências não vão realizar sozinhos.
              </p>
              <p style={{
                fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: 'var(--fs-body)', lineHeight: 1.85, color: 'var(--text-muted)',
              }}>
                Uso habilidade de compreender análises para fazer também um bom storytelling e criação de estratégias. Com conhecimentos estatísticos, aplico análise exploratória para entender o contexto do hoje e inferência para probabilizar o amanhã.
              </p>
            </div>

            <div style={{ marginTop: 32 }}>
              <CVButton />
            </div>

            <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom: 14 }}>Formação</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--text)' }}>FGV · Comunicação Digital</div>
                  <div className="label" style={{ marginTop: 4 }}>2024 — Presente</div>
                </li>
                <li>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--text-muted)' }}>FGV EMAp · Ciência de Dados & IA</div>
                  <div className="label" style={{ marginTop: 4 }}>2022 — 2024 · 2 anos</div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="label" style={{ marginBottom: 20, color: 'var(--accent)' }}>↳ Áreas de prática</div>

            <div>
              {SKILLS.map((s) => (
                <SkillRow key={s.name} skill={s} />
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <div className="label" style={{ marginBottom: 16 }}>Ferramentas & Métodos</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TAGS.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} style={{ marginTop: 96 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '24px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            flexWrap: 'wrap', gap: 16,
          }}>
            <span className="label" style={{ color: 'var(--text-muted)' }}>Próximas seções</span>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {NEXT_SECTIONS.map(([n, label, href], i, arr) => (
                <React.Fragment key={n}>
                  <a href={href} className="next-link" style={{
                    display: 'inline-flex', alignItems: 'baseline', gap: 10,
                    fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'var(--fs-label)',
                    letterSpacing: '.22em', textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    transition: 'color .4s var(--ease)',
                  }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)', color: 'var(--accent)' }}>→ {n}</span>
                    <span>{label}</span>
                  </a>
                  {i < arr.length - 1 && <span aria-hidden="true" style={{ color: 'var(--text-faint)' }}>/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
