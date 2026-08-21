// Navegação entre seções — fonte única de verdade para o offset do header fixo
// e para a rolagem suave. Usado tanto pelo delegador global de cliques quanto
// pelo painel de menu mobile, que precisa rolar depois de liberar o scroll.

export const HEADER_OFFSET = 64;

export function sectionTop(el) {
  return el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
}

export function scrollToSection(id, { immediate = false, push = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  // pushState no clique deixa o Voltar do navegador desfazer a navegação
  // por seção em vez de sair do site.
  if (push && typeof history.pushState === 'function' && window.location.hash !== `#${id}`) {
    history.pushState(null, '', `#${id}`);
  }
  const run = () => window.scrollTo({ top: sectionTop(el), behavior: immediate ? 'auto' : 'smooth' });
  // rAF garante que qualquer trava de scroll já foi liberada e o layout está
  // estabilizado antes de medirmos a posição de destino.
  if (immediate) run(); else requestAnimationFrame(run);
  return true;
}
