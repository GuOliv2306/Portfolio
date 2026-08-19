function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('capa');

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = ['capa','competencias','projetos','certificados','contato'];
      const y = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= y) { setActive(sections[i]); break; }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background: scrolled ? 'rgba(12,12,12,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition:'background .45s var(--ease), border-color .45s var(--ease), backdrop-filter .45s var(--ease)',
    }}>
      <div className="container" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:72,
      }}>
        <a href="#capa"
          className="nav-item"
          style={{
            display:'flex', alignItems:'center', gap:12,
            animationDelay: '100ms',
          }}>
          <span aria-hidden="true" style={{
            width:8, height:8, borderRadius:'50%', background:'var(--accent)',
            boxShadow:'0 0 0 4px rgba(232,96,28,0.18)',
            animation:'pulseDot 2.4s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily:'var(--sans)', fontWeight:500, fontSize:11.5,
            letterSpacing:'.28em', textTransform:'uppercase',
          }}>Gustavo Oliveira</span>
        </a>
        <ul style={{ display:'flex', gap:34, listStyle:'none' }}>
          {NAV.map((n, i) => {
            const id = n.href.slice(1);
            const isActive = id === active;
            return (
              <li key={n.href}
                className="nav-item"
                style={{ animationDelay: `${220 + i * 120}ms` }}>
                <a href={n.href} className={`nav-link${isActive ? ' is-active' : ''}`}>
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

window.Navbar = Navbar;
