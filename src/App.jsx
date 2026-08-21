import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CursorFollower } from './components/primitives.jsx';
import { sectionTop, scrollToSection } from './nav.js';
import { SECTIONS } from './data.js';
import { SideRail, SystemBar } from './components/tech.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Competencias from './components/Competencias.jsx';
import Projetos from './components/Projetos.jsx';
import Certificados from './components/Certificados.jsx';
import Depoimentos from './components/Depoimentos.jsx';
import Contato from './components/Contato.jsx';

const SECTION_IDS = new Set(SECTIONS.map((s) => s.id));

export default function App() {
  React.useEffect(() => {
    const handle = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      // Link de seção grava a entrada no histórico; o skip link, não.
      if (SECTION_IDS.has(id) && typeof history.pushState === 'function' && window.location.hash !== `#${id}`) {
        history.pushState(null, '', `#${id}`);
      }
      window.scrollTo({ top: sectionTop(el), behavior: 'smooth' });
      // Alvos com tabindex (o <main> do skip link) também recebem o foco:
      // rolar sozinho não move o cursor de leitura de quem usa teclado.
      if (el.hasAttribute('tabindex')) el.focus({ preventScroll: true });
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, []);

  // Voltar/avançar do navegador passam a andar entre seções.
  React.useEffect(() => {
    const onPop = () => {
      const id = window.location.hash.slice(1);
      scrollToSection(id && SECTION_IDS.has(id) ? id : SECTIONS[0].id, { immediate: true });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Chegando com #secao na URL, corrige o salto nativo pelo header fixo.
  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && SECTION_IDS.has(id)) scrollToSection(id, { immediate: true });
  }, []);

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <CursorFollower />
      <SideRail />
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Competencias />
        <Projetos />
        <Certificados />
        <Depoimentos />
        <Contato />
      </main>
      <SystemBar />
      {/* Web Analytics da Vercel — contagem de visitas sem cookies. */}
      <Analytics />
    </>
  );
}
