// Construcción de la ficha informativa del panel lateral (diseño editorial v2).
import { t as tr } from '../i18n.js';
import { FUENTES } from '../datos/index.js';

export function h(tag, attrs = {}, ...hijos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style') el.style.cssText = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of hijos.flat()) {
    if (c == null || c === false) continue;
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return el;
}

// Quita un paréntesis final descriptivo, pero conserva los números romanos de los nervios craneales
export function quitarParentesis(n) {
  return n.replace(/\s*\((?![IVX]+\))[^()]*\)\s*$/, '');
}
const dos = (n) => String(n).padStart(2, '0');

function titulo(nombre) {
  const m = nombre.match(/^(.*?)\s*\(((?![IVX]+\))[^()]*)\)\s*$/);
  if (!m) return h('h2', { class: 'ficha-titulo' }, nombre);
  return h('h2', { class: 'ficha-titulo' }, m[1], ' ', h('span', { class: 'ficha-titulo-alt' }, m[2]));
}

function lista(items) {
  return h('ul', { class: 'lista' }, items.map((t) => h('li', {}, t)));
}

function grupoExplorar(g) {
  return h('section', { class: 'explorar' },
    h('header', { class: 'explorar-cab' },
      h('h4', {}, g.titulo),
      g.nota ? h('span', { class: 'explorar-nota' }, g.nota) : null,
      h('span', { class: 'explorar-cuenta' }, dos(g.filas.length))),
    h('ul', { class: 'explorar-lista' }, g.filas.map((f) => h('li', {},
      h('button', { class: `fila${f.activo ? ' activo' : ''}`, type: 'button', onclick: f.accion },
        f.color ? h('span', { class: 'fila-color', style: `background:${f.color}` }) : null,
        h('span', { class: 'fila-t' }, f.texto),
        f.interno ? h('span', { class: 'fila-tag' }, 'INT') : null,
        h('span', { class: 'fila-f', 'aria-hidden': 'true' }, '→'))))));
}

/**
 * @param info entrada de INFO
 * @param op   { contexto, acciones: [elementos], grupos: [{ titulo, nota, filas: [{ texto, color, activo, interno, accion }] }] }
 */
export function fichaInfo(info, op = {}) {
  const art = h('article', { class: 'ficha' });
  const add = (...els) => art.append(...els.filter(Boolean));

  add(
    h('div', { class: 'ficha-meta' },
      h('span', { class: 'etiqueta' }, info.color ? h('span', { class: 'etiqueta-color', style: `background:${info.color}` }) : null, info.tipo || ''),
      op.contexto ? h('span', { class: 'etiqueta etiqueta-acento' }, op.contexto) : null,
      ...(op.etiquetas || []).map((t) => h('span', { class: 'etiqueta' }, t))),
    titulo(info.nombre),
    h('p', { class: 'ficha-resumen' }, info.resumen),
  );
  if (op.acciones && op.acciones.length) add(h('div', { class: 'ficha-acciones' }, op.acciones));
  for (const el of op.bloques || []) add(el);
  for (const g of op.grupos || []) if (g.filas.length) add(grupoExplorar(g));

  // Secciones numeradas (propias de la ficha o las estándar)
  const cuerpoSec = (s) => s.tipo === 'p' ? h('p', {}, s.valor) : s.tipo === 'clinica'
    ? h('ul', { class: 'lista-clinica' }, s.valor.map(([n, d]) => h('li', {}, h('div', {}, h('strong', {}, n), d ? h('p', {}, d) : null))))
    : lista(s.valor);
  const propias = info.secciones ? info.secciones.map((s, i) => [`x${i}`, s.corto, s.titulo, cuerpoSec(s)]) : null;
  const secciones = propias ? [...propias, ...(info.fuentes ? [['fuentes', tr('Fuentes', 'Sources'), tr('Fuentes', 'Sources'), null]] : [])] : [
    ['ubicacion', tr('Anatomía', 'Anatomy'), tr('Ubicación y anatomía', 'Location and anatomy'), info.ubicacion && h('p', {}, info.ubicacion)],
    ['funciones', tr('Función', 'Function'), tr('¿Para qué sirve?', 'What is it for?'), info.funciones && lista(info.funciones)],
    ['contenido', tr('Contenido', 'Contents'), tr('¿Qué contiene?', 'What does it contain?'), info.contenido && lista(info.contenido)],
    ['irrigacion', tr('Irrigación', 'Blood supply'), tr('Irrigación', 'Blood supply'), info.irrigacion && h('p', {}, info.irrigacion)],
    ['padecimientos', tr('Clínica', 'Clinical'), tr('Padecimientos asociados', 'Associated conditions'), info.padecimientos && h('ul', { class: 'lista-clinica' },
      info.padecimientos.map(([n, d]) => h('li', {}, h('div', {}, h('strong', {}, n), d ? h('p', {}, d) : null))))],
    ['falla', tr('Si falla', 'If it fails'), tr('¿Qué pasa si falla?', 'What happens if it fails?'), info.siFalla && (Array.isArray(info.siFalla) ? lista(info.siFalla) : h('p', {}, info.siFalla))],
    ['fuentes', tr('Fuentes', 'Sources'), tr('Fuentes', 'Sources'), info.fuentes && fuentesLista(info.fuentes)],
  ];
  function fuentesLista(ids) { return h('ul', { class: 'lista-fuentes' }, ids.map((id) => {
      const f = FUENTES[id];
      if (!f) return null;
      return h('li', {},
        h('div', {},
          f.url ? h('a', { href: f.url, target: '_blank', rel: 'noopener noreferrer' }, f.titulo, h('span', { class: 'ext' }, ' ↗')) : h('span', { class: 'libro' }, f.titulo),
          h('span', { class: 'fuente-org' }, f.org)));
    }));
  }
  if (propias && info.fuentes) secciones[secciones.length - 1][3] = fuentesLista(info.fuentes);
  const visibles = secciones.filter((s) => s[3]);

  const toc = h('nav', { class: 'toc', 'aria-label': tr('Secciones', 'Sections') }, visibles.map(([clave, corto], i) => h('button', {
    class: 'toc-item', type: 'button', 'data-s': clave,
    onclick: () => art.querySelector(`#s-${clave}`).scrollIntoView({ behavior: 'smooth', block: 'start' }),
  }, h('span', { class: 'toc-num' }, dos(i + 1)), corto)));
  add(toc);

  const claveDato = propias ? (visibles.length > 1 ? visibles[visibles.length - 2][0] : null) : 'falla';
  visibles.forEach(([clave, , largo, cuerpo], i) => {
    add(h('section', { class: 'bloque', id: `s-${clave}` },
      h('header', { class: 'bloque-cab' }, h('span', { class: 'bloque-num' }, dos(i + 1)), h('h3', {}, largo)),
      h('div', { class: 'bloque-cuerpo' }, cuerpo)));
    if (clave === claveDato && info.dato) {
      add(h('aside', { class: 'nota-clinica' }, h('span', { class: 'nota-clinica-tag' }, tr('Nota clínica', 'Clinical note')), h('p', {}, info.dato)));
    }
  });
  add(h('footer', { class: 'aviso' }, tr('Contenido educativo. No sustituye la valoración de un profesional de la salud.', 'Educational content. It does not replace assessment by a health professional.')));

  // Índice que sigue la lectura
  requestAnimationFrame(() => {
    const raiz = art.closest('.panel-cuerpo');
    if (!raiz || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entradas) => {
      for (const en of entradas) {
        if (!en.isIntersecting) continue;
        const clave = en.target.id.slice(2);
        toc.querySelectorAll('.toc-item').forEach((b) => b.classList.toggle('activo', b.dataset.s === clave));
      }
    }, { root: raiz, rootMargin: '-15% 0px -70% 0px' });
    art.querySelectorAll('.bloque').forEach((b) => obs.observe(b));
  });
  return art;
}
