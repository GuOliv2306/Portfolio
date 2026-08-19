import React from 'react';
import { NAV } from '../data.js';
import { StatusChip } from './tech.jsx';

const NAV_IDS = NAV.map((n) => n.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('capa');

  React.useEffect(() => {
    let ticking = false;
    const compute = () => {
      setScrolled((prev) => {
        const s = window.scrollY > 24;
        return prev === s ? prev : s;
      });
      const y = window.scrollY + 140;
      for (let i = NAV_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_IDS[i]);
        if (el && el.offsetTop <= y) {
          setActive((prev) => (prev === NAV_IDS[i] ? prev : NAV_IDS[i]));
          break;
        }
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(12,12,12,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition: 'background .45s var(--ease), border-color .45s var(--ease), backdrop-filter .45s var(--ease)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
      }}>
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a href="#capa"
            className="nav-item"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              animationDelay: '100ms',
            }}>
            <span aria-hidden="true" style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
              boxShadow: '0 0 0 4px var(--accent-18)',
              animation: 'pulseDot 2.4s ease-in-out infinite',
            }} />
            <span className="nav-brand">Gustavo Oliveira</span>
          </a>
          <span className="nav-item nav-chip" style={{ animationDelay: '160ms' }}>
            <StatusChip>SYS_v2 · ONLINE</StatusChip>
          </span>
        </div>
        <ul style={{ display: 'flex', gap: 34, listStyle: 'none' }}>
          {NAV.map((n, i) => {
            const isActive = n.href.slice(1) === active;
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
