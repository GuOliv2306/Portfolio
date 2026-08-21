import React from 'react';
import { EMAIL, LINKEDIN, CV_URL } from '../data.js';
import { Reveal, OutlineLink, PrimaryLink, Typewriter, useReveal } from './primitives.jsx';
import { HeroTelemetry, attachDecodeHover } from './tech.jsx';
import HeroBackground from './HeroBackground.jsx';

const PHRASES = [
  'Tenho forte ambição de compreender novas tendências, e busco transformar boas ideias em ação segura.',
  'Acredito na extrema importância dos dados e como tornam mais seguro e previsível a execução de bons caminhos.',
  'Estou em um caminho de desenvolvimento consciente de ferramentas de IA para gerar produtos com identidades e otimizar custo e velocidade de produção.',
];

// O typewriter termina em ~350 + 18*75 ≈ 1700ms; o resto entra depois disso.
const T_AFTER_NAME = 1900;

const NAME_SEGMENTS = [
  { text: 'Gustavo' },
  { break: true },
  { text: 'de Oliveira' },
  { text: '.', accent: true },
];

function Hero01() {
  const ref = useReveal({ threshold: 0.05 });
  return (
    <div ref={ref} aria-hidden="true" className="section-number" style={{
      position: 'absolute',
      top: '52%', right: '-3vw', transform: 'translateY(-50%)',
      fontFamily: 'var(--serif)', fontWeight: 400,
      fontSize: 'clamp(220px, 32vw, 460px)',
      lineHeight: 1,
      color: 'var(--text-faint)',
      letterSpacing: '-0.04em',
      pointerEvents: 'none', userSelect: 'none',
      transitionDelay: '200ms',
    }}>01</div>
  );
}

export default function Hero() {
  const nameRef = React.useRef(null);

  // Cada segmento digitado vira alvo de decode-on-hover assim que o nome termina.
  const bindNameDecode = React.useCallback(() => {
    const el = nameRef.current;
    if (!el) return;
    const spans = el.querySelectorAll(':scope > span:not(.caret)');
    spans.forEach((s) => s.classList.add('decode-target'));
    attachDecodeHover(spans);
  }, []);

  return (
    <section id="capa" data-screen-label="01 Capa" style={{
      position: 'relative', minHeight: '100vh',
      paddingTop: 160, paddingBottom: 120,
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      <HeroBackground />
      <Hero01 />
      <HeroTelemetry />

      <div style={{ position: 'absolute', top: 96, left: 0, right: 0, height: 1, background: 'var(--border)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Reveal delay={120} immediate>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
            <span aria-hidden="true" style={{
              width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)',
              boxShadow: '0 0 0 4px var(--accent-18)',
              animation: 'pulseDot 2.4s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)',
              letterSpacing: '.25em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>Disponível para projetos</span>
            <span style={{ width: 1, height: 14, background: 'var(--border-strong)' }} />
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--fs-micro)',
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'var(--text-soft)',
            }}>// CAPA · 01_INIT</span>
          </div>
        </Reveal>

        <h1 ref={nameRef} style={{
          fontFamily: 'var(--serif)', fontWeight: 700,
          fontSize: 'clamp(56px, 9.6vw, 120px)',
          lineHeight: 0.95,
          letterSpacing: '-0.035em',
          color: 'var(--text)',
          marginBottom: 32,
          maxWidth: '12ch',
          minHeight: '1.9em', // reserva duas linhas para o layout abaixo não pular
        }}>
          <Typewriter
            segments={NAME_SEGMENTS}
            speed={75}
            startDelay={400}
            onDone={bindNameDecode}
          />
        </h1>

        <Reveal delay={T_AFTER_NAME} immediate>
          <div className="label" style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
            Comunicação Digital · FGV
          </div>
        </Reveal>

        <Reveal delay={T_AFTER_NAME + 120} immediate>
          <div style={{ width: 480, maxWidth: '100%', height: 1, background: 'var(--border)', margin: '0 0 36px' }} />
        </Reveal>

        <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 48 }}>
          {PHRASES.map((p, i) => (
            <Reveal key={i} delay={T_AFTER_NAME + 240 + i * 120} immediate>
              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
                fontSize: 'var(--fs-body)', lineHeight: 1.7,
                color: 'var(--text-muted)',
                paddingLeft: 18,
                borderLeft: '1px solid var(--border-strong)',
              }}>{p}</p>
            </Reveal>
          ))}
        </div>

        {/* "Disponível para projetos" agora oferece o próximo passo em vez de
            só anunciar: quem chega pelo topo tem para onde ir. */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Reveal delay={T_AFTER_NAME + 240 + PHRASES.length * 120 + 60} immediate>
            <PrimaryLink href="#projetos" icon="↓">Ver projetos</PrimaryLink>
          </Reveal>
          <Reveal delay={T_AFTER_NAME + 240 + PHRASES.length * 120 + 120} immediate>
            <OutlineLink href={`mailto:${EMAIL}`} external={false}>Email</OutlineLink>
          </Reveal>
          <Reveal delay={T_AFTER_NAME + 240 + PHRASES.length * 120 + 240} immediate>
            <OutlineLink href={LINKEDIN}>LinkedIn</OutlineLink>
          </Reveal>
          <Reveal delay={T_AFTER_NAME + 240 + PHRASES.length * 120 + 360} immediate>
            <OutlineLink href={CV_URL}>Currículo</OutlineLink>
          </Reveal>
        </div>

        <Reveal delay={T_AFTER_NAME + 800} immediate>
          <div className="scroll-cue" style={{
            position: 'absolute', right: 48, bottom: -40,
            display: 'flex', alignItems: 'center', gap: 12,
            color: 'var(--text-muted)',
          }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--fs-micro)', letterSpacing: '.3em', textTransform: 'uppercase',
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            }}>Scroll</span>
            <span aria-hidden="true" style={{ width: 1, height: 48, background: 'var(--border-strong)' }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
