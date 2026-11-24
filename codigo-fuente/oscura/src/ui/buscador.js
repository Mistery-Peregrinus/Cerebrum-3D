// Buscador de áreas y estructuras (lupa, Ctrl+K o «/»).
import { t as tr } from '../i18n.js';
import { h } from './panel.js';

export const normalizar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * @param obtenerIndice  () => [{ nombre, tipo, ruta, ir, clave }]
 * @param sugerencias    nombres sugeridos cuando la búsqueda está vacía
 */
export function crearBuscador(obtenerIndice, sugerencias = []) {
  const caja = document.getElementById('buscador');
  const entrada = document.getElementById('buscador-input');
  const lista = document.getElementById('buscador-resultados');
  const boton = document.getElementById('btn-buscar');
  let indice = null, resultados = [], sel = 0;

  function buscar(q) {
    if (!indice) indice = obtenerIndice();
    const nq = normalizar(q.trim());
    if (!nq) return sugerencias.map((n) => indice.find((e) => e.nombre === n)).filter(Boolean);
    const tokens = nq.split(/\s+/);
    return indice
      .map((e) => {
        if (!tokens.every((t) => e.clave.includes(t))) return null;
        const n = normalizar(e.nombre);
        const s = n.startsWith(nq) ? 0 : n.split(/[\s(·,]+/).some((w) => w.startsWith(tokens[0])) ? 1 : n.includes(tokens[0]) ? 2 : 3;
        return { e, s: s * 1000 + n.length };
      })
      .filter(Boolean)
      .sort((a, b) => a.s - b.s)
      .slice(0, 12)
      .map((x) => x.e);
  }
  function resaltar(nombre, q) {
    const t = normalizar(q.trim()).split(/\s+/)[0];
    const i = t ? normalizar(nombre).indexOf(t) : -1;
    if (i < 0) return [nombre];
    return [nombre.slice(0, i), h('mark', {}, nombre.slice(i, i + t.length)), nombre.slice(i + t.length)];
  }
  function pintar() {
    const q = entrada.value;
    resultados = buscar(q);
    sel = Math.min(sel, Math.max(0, resultados.length - 1));
    if (!resultados.length) {
      lista.replaceChildren(h('li', { class: 'buscador-vacio' }, tr('Sin resultados. Prueba con otro nombre (por ejemplo, «Broca», «tálamo» o «sinapsis»).', 'No results. Try another name (for example, "Broca", "thalamus" or "synapse").')));
      return;
    }
    lista.replaceChildren(
      ...(q.trim() ? [] : [h('li', { class: 'buscador-titulo' }, tr('Sugerencias', 'Suggestions'))]),
      ...resultados.map((e, i) => h('li', {},
        h('button', {
          type: 'button', class: `buscador-item${i === sel ? ' activo' : ''}`,
          onclick: () => abrir(e), onpointermove: () => { if (sel !== i) { sel = i; marcar(); } },
        },
        h('span', { class: 'buscador-nombre' }, ...resaltar(e.nombre, q)),
        h('span', { class: 'buscador-ruta' }, e.ruta),
        h('span', { class: 'buscador-tipo' }, e.tipo)))),
    );
  }
  function marcar() {
    lista.querySelectorAll('.buscador-item').forEach((b, i) => b.classList.toggle('activo', i === sel));
    const act = lista.querySelector('.buscador-item.activo');
    if (act) act.scrollIntoView({ block: 'nearest' });
  }
  function abrir(e) { cerrar(); e.ir(); }
  function mostrar() {
    caja.hidden = false;
    boton.classList.add('activo');
    entrada.value = '';
    sel = 0;
    pintar();
    requestAnimationFrame(() => entrada.focus());
  }
  function cerrar() { caja.hidden = true; boton.classList.remove('activo'); entrada.blur(); }
  const abierto = () => !caja.hidden;

  boton.addEventListener('click', () => (abierto() ? cerrar() : mostrar()));
  entrada.addEventListener('input', () => { sel = 0; pintar(); });
  entrada.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown') { ev.preventDefault(); sel = Math.min(resultados.length - 1, sel + 1); marcar(); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); sel = Math.max(0, sel - 1); marcar(); }
    else if (ev.key === 'Enter') { ev.preventDefault(); if (resultados[sel]) abrir(resultados[sel]); }
    else if (ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); cerrar(); }
  });
  document.addEventListener('pointerdown', (ev) => { if (abierto() && !caja.contains(ev.target) && !boton.contains(ev.target)) cerrar(); });
  window.addEventListener('keydown', (ev) => {
    const enCampo = /input|textarea|select/i.test(document.activeElement?.tagName || '');
    if ((ev.key === 'k' && (ev.ctrlKey || ev.metaKey)) || (ev.key === '/' && !enCampo)) { ev.preventDefault(); mostrar(); }
  });
  return { abierto, cerrar, mostrar };
}
