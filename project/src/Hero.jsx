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

  return (
    <section id="capa" data-screen-label="01 Capa" style={{
      position:'relative', minHeight:'100vh',
      paddingTop:160, paddingBottom:120,
      display:'flex', alignItems:'center',
      overflow:'hidden',
    }}>
      <HeroBackground />
      <Hero01 />

      {/* horizontal rule at very top */}
      <div style={{ position:'absolute', top:96, left:0, right:0, height:1, background:'var(--border)' }} />

      <div className="container" style={{ position:'relative', zIndex:1, width:'100%' }}>
        <Reveal delay={120}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:36 }}>
            <span aria-hidden="true" style={{
              width:7, height:7, borderRadius:'50%', background:'var(--accent)',
              boxShadow:'0 0 0 4px rgba(232,96,28,0.18)',
              animation:'pulseDot 2.4s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily:'var(--mono)', fontSize:11,
              letterSpacing:'.25em', textTransform:'uppercase',
              color:'var(--accent)',
            }}>Disponível para projetos</span>
          </div>
        </Reveal>

        {/* Name — typewriter (no Reveal wrapper; the typewriter handles its own entry) */}
        <h1 style={{
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
          />
        </h1>

        <Reveal delay={T_AFTER_NAME}>
          <div className="label" style={{ color:'var(--text-muted)', marginBottom:32 }}>
            Comunicação Digital · FGV · 3º Período
          </div>
        </Reveal>

        <Reveal delay={T_AFTER_NAME + 120}>
          <div style={{ width:480, maxWidth:'100%', height:1, background:'var(--border)', margin:'0 0 36px' }} />
        </Reveal>

        {/* Value phrases — staggered, 120ms apart */}
        <div style={{ maxWidth:600, display:'flex', flexDirection:'column', gap:18, marginBottom:48 }}>
          {phrases.map((p, i) => (
            <Reveal key={i} delay={T_AFTER_NAME + 240 + i * 120}>
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
          <Reveal delay={T_AFTER_NAME + 240 + phrases.length * 120 + 120}>
            <OutlineLink href={`mailto:${EMAIL}`} external={false}>Email</OutlineLink>
          </Reveal>
          <Reveal delay={T_AFTER_NAME + 240 + phrases.length * 120 + 240}>
            <OutlineLink href={LINKEDIN}>LinkedIn</OutlineLink>
          </Reveal>
        </div>

        {/* scroll cue */}
        <Reveal delay={T_AFTER_NAME + 800}>
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
