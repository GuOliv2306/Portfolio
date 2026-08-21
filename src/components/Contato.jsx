import React from 'react';
import { EMAIL, LINKEDIN, CV_URL } from '../data.js';
import { Reveal, SectionNumber, SectionEyebrow, OutlineLink } from './primitives.jsx';

function Meta2({ label, children }) {
  return (
    <div>
      <div className="label" style={{ color: 'var(--text-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--text)' }}>{children}</div>
    </div>
  );
}

function Footer() {
  return (
    <div className="container" style={{
      marginTop: 96, paddingTop: 32, borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14,
    }}>
      <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 'var(--fs-label)', color: 'var(--text-soft)' }}>
        © {new Date().getFullYear()} Gustavo de Oliveira · Comunicação Digital × Dados
      </div>
      {/* A página não termina mais sem ação: e-mail e currículo ficam à mão
          na última dobra, não só no meio da seção Perfil. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <a href={`mailto:${EMAIL}`} className="foot-link">{EMAIL}</a>
        <a href={CV_URL} className="foot-link" target="_blank" rel="noreferrer noopener">
          Baixar currículo <span aria-hidden="true">↓</span>
        </a>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span aria-hidden="true" style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
            animation: 'pulseDot 2.4s ease-in-out infinite',
          }} />
          <span className="label" style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-label)' }}>
            Versão 2 · Studio Editorial
          </span>
        </span>
      </div>
    </div>
  );
}

export default function Contato() {
  return (
    <section id="contato" data-screen-label="06 Contato" style={{
      position: 'relative', padding: '140px 0 80px', overflow: 'hidden',
    }}>
      <SectionNumber top={20} left={-30} right="auto">06</SectionNumber>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionEyebrow num="06" label="Contato" />
        </Reveal>

        <div className="cont-grid" style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 80, alignItems: 'end' }}>
          <Reveal delay={80}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 700,
              fontSize: 'clamp(56px, 8vw, 96px)',
              lineHeight: 0.95, letterSpacing: '-0.03em',
            }}>
              Vamos<br />
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.1em' }}>
                conversar<span style={{ color: 'var(--accent)' }}>?</span>
              </span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 18, lineHeight: 1.6,
              color: 'var(--text-muted)',
              paddingLeft: 20, borderLeft: '1px solid var(--accent)',
              maxWidth: '42ch',
            }}>
              Estou sempre aberto a novas conversas — seja sobre projetos, parcerias ou ideias que ainda estão tomando forma.
            </p>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div style={{ marginTop: 64, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <OutlineLink href={`mailto:${EMAIL}`} external={false}>Email</OutlineLink>
            <OutlineLink href={LINKEDIN}>LinkedIn</OutlineLink>
            <OutlineLink href={CV_URL}>Currículo</OutlineLink>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="cont-meta" style={{
            marginTop: 80, paddingTop: 32, borderTop: '1px solid var(--border)',
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24,
          }}>
            <Meta2 label="Localização">Rio de Janeiro · BR</Meta2>
            <Meta2 label="Disponibilidade">Estágio · Freelance</Meta2>
            <Meta2 label="Resposta">~24h em dias úteis</Meta2>
          </div>
        </Reveal>
      </div>

      <Footer />
    </section>
  );
}
