import React from 'react';
import { SECTIONS } from './data.js';
import { HEADER_OFFSET } from './nav.js';

/* Fonte única de verdade para "em que seção estamos".
 *
 * Antes havia quatro listeners de scroll independentes (menu, side rail,
 * rótulo da sysbar e barra de progresso), dois deles com limiares
 * diferentes — daí o menu marcar Competências enquanto a sysbar já dizia
 * PROJETOS. Agora é um listener só, com uma linha de decisão só, e os
 * topos das seções ficam em cache: o loop de scroll não força mais
 * layout a cada frame lendo offsetTop de seis elementos.
 */

const IDS = SECTIONS.map((s) => s.id);
const LAST = IDS.length - 1;

// Linha de decisão: a seção vale a partir do momento em que cruza 32% da
// altura da viewport. Mesmo valor que a sysbar já usava.
const TRIGGER_RATIO = 0.32;
const PROGRESS_STEP = 500; // quantiza em 0,2% para não notificar a cada pixel

const state = { activeId: IDS[0], scrolled: false, progress: 0 };
const listeners = new Set();

let tops = null;
let maxScroll = 0;
let viewport = 0;
let ticking = false;
let started = false;
let observer = null;

function measure() {
  const doc = document.documentElement;
  viewport = window.innerHeight;
  maxScroll = doc.scrollHeight - doc.clientHeight;
  tops = IDS.map((id) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
  });
}

function syncHash(id) {
  if (typeof history.replaceState !== 'function') return;
  // A primeira seção mantém a URL limpa; as demais viram link direto.
  const target = id === IDS[0] ? '' : `#${id}`;
  if ((window.location.hash || '') === target) return;
  history.replaceState(null, '', target || window.location.pathname + window.location.search);
}

function compute() {
  ticking = false;
  if (!tops) measure();

  const y = window.scrollY;
  const line = y + viewport * TRIGGER_RATIO;

  let activeId = IDS[0];
  for (let i = LAST; i >= 0; i--) {
    if (tops[i] <= line) { activeId = IDS[i]; break; }
  }
  // No topo é sempre a capa — sem isso, um layout ainda não medido faz o
  // menu piscar na última seção logo depois do reload.
  if (y <= HEADER_OFFSET) activeId = IDS[0];
  // No fim da página é sempre a última: uma seção curta no rodapé nunca
  // chegaria a cruzar a linha de 32%.
  else if (maxScroll > 0 && maxScroll - y <= 2) activeId = IDS[LAST];

  const scrolled = y > 24;
  const progress = maxScroll > 0 ? Math.round((y / maxScroll) * PROGRESS_STEP) / PROGRESS_STEP : 0;

  if (activeId === state.activeId && scrolled === state.scrolled && progress === state.progress) return;

  if (activeId !== state.activeId) syncHash(activeId);
  state.activeId = activeId;
  state.scrolled = scrolled;
  state.progress = progress;
  listeners.forEach((fn) => fn());
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(compute);
}

function invalidate() {
  tops = null;
  onScroll();
}

function start() {
  started = true;
  measure();
  compute();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', invalidate, { passive: true });
  // Fonte carregando, seção crescendo, modal travando o scroll: qualquer
  // mudança de altura invalida o cache de topos.
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(invalidate);
    observer.observe(document.body);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(invalidate).catch(() => {});
}

function stop() {
  started = false;
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', invalidate);
  if (observer) { observer.disconnect(); observer = null; }
}

function subscribe(fn) {
  listeners.add(fn);
  if (!started) start();
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) stop();
  };
}

export const selActiveId = (s) => s.activeId;
export const selScrolled = (s) => s.scrolled;
export const selProgress = (s) => s.progress;

// Uma fatia por consumidor: o menu não re-renderiza quando só o progresso
// da barra muda.
export function useScrollValue(selector) {
  const snapshot = React.useCallback(() => selector(state), [selector]);
  return React.useSyncExternalStore(subscribe, snapshot, snapshot);
}
