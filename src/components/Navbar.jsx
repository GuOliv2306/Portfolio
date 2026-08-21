import React from 'react';
import { NAV, SECTIONS, EMAIL, CV_URL } from '../data.js';
import { StatusChip } from './tech.jsx';
import { useScrollLock, useFocusTrap } from './primitives.jsx';
import { scrollToSection } from '../nav.js';
import { useScrollValue, selActiveId, selScrolled } from '../scrollStore.js';

const NUM_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s.num]));

// Mesmo limiar do CSS (.nav-toggle / .nav-links). Acima dele o painel nunca
// deve ficar aberto — daí o listener de breakpoint.
const MOBILE_QUERY = '(max-width: 760px)';

export default function Navbar() {
  const scrolled = useScrollValue(selScrolled);
  const active = useScrollValue(selActiveId);
  const [open, setOpen] = React.useState(false);
  const navRef = React.useRef(null);

  useScrollLock(open);
  useFocusTrap(navRef, open, '.nav-panel-link');

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const mq = window.matchMedia(MOBILE_QUERY);
    const onBreakpoint = () => { if (!mq.matches) setOpen(false); };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onBreakpoint);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  // Fecha o painel e só então rola: a trava de scroll do body precisa sair
  // antes do window.scrollTo (scrollToSection espera um rAF).
  const goTo = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    scrollToSection(href.slice(1), { push: true });
  };

  const solid = scrolled || open;
  // backdrop-filter faz do <nav> bloco contentor de descendentes fixed — o
  // painel ficaria preso aos 72px da barra em vez de cobrir a viewport.
  // Com o painel aberto o desfoque não tem o que desfocar, então sai fora.
  const blur = solid && !open ? 'blur(16px) saturate(140%)' : 'none';

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: open ? 'var(--bg)' : (solid ? 'rgba(12,12,12,0.92)' : 'transparent'),
      backdropFilter: blur,
      WebkitBackdropFilter: blur,
      borderBottom: `1px solid ${solid ? 'var(--border)' : 'transparent'}`,
      transition: 'background .45s var(--ease), border-color .45s var(--ease), backdrop-filter .45s var(--ease)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
        position: 'relative', zIndex: 2, // a barra pinta acima do painel
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

        <ul className="nav-links">
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

        <button
          type="button"
          className="nav-toggle nav-item"
          style={{ animationDelay: '220ms' }}
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}>
          <span className={`nav-toggle-icon${open ? ' is-open' : ''}`} aria-hidden="true">
            <i /><i />
          </span>
          <span>{open ? 'Fechar' : 'Menu'}</span>
        </button>
      </div>

      {open && (
        <div id="nav-panel" className="nav-panel">
          <ul className="nav-panel-list">
            {NAV.map((n) => {
              const id = n.href.slice(1);
              return (
                <li key={n.href}>
                  <a href={n.href}
                    className={`nav-panel-link${id === active ? ' is-active' : ''}`}
                    aria-current={id === active ? 'true' : undefined}
                    onClick={(e) => goTo(e, n.href)}>
                    <span className="nav-panel-num" aria-hidden="true">{NUM_BY_ID[id] || ''}</span>
                    <span>{n.label}</span>
                    <span className="nav-panel-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Contato ao alcance da mão: antes ele só existia a 97% da rolagem. */}
          <div className="nav-panel-foot">
            <a className="olink" href={`mailto:${EMAIL}`}>
              <span className="arr" aria-hidden="true">↗</span><span>Email</span>
            </a>
            <a className="olink" href={CV_URL} target="_blank" rel="noreferrer noopener">
              <span className="arr" aria-hidden="true">↗</span><span>Currículo</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
