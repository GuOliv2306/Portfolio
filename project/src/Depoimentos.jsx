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
                minHeight:280,
                border:'1px solid var(--border-strong)',
                padding:'40px 36px 32px',
                display:'flex', flexDirection:'column', gap:20,
                background:'transparent',
                margin:0,
              }}>
                {/* corner marker */}
                <div style={{
                  position:'absolute', top:14, left:16,
                  fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.2em',
                  color:'var(--text-soft)', textTransform:'uppercase',
                }}>
                  {it.num} / depoimento
                </div>
                <svg width="32" height="24" viewBox="0 0 36 28" fill="none" aria-hidden="true" style={{ marginTop:18 }}>
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
                  marginTop:'auto', paddingTop:20,
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
