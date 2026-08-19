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
