import React from 'react';
import { CursorFollower } from './components/primitives.jsx';
import { SideRail, SystemBar } from './components/tech.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Competencias from './components/Competencias.jsx';
import Projetos from './components/Projetos.jsx';
import Certificados from './components/Certificados.jsx';
import Depoimentos from './components/Depoimentos.jsx';
import Contato from './components/Contato.jsx';

export default function App() {
  React.useEffect(() => {
    const handle = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, []);

  return (
    <>
      <CursorFollower />
      <SideRail />
      <Navbar />
      <main>
        <Hero />
        <Competencias />
        <Projetos />
        <Certificados />
        <Depoimentos />
        <Contato />
      </main>
      <SystemBar />
    </>
  );
}
