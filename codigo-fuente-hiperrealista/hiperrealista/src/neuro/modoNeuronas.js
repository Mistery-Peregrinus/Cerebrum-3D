// Modo «Neuronas»: clasificación morfológica con modelos 3D y partes seleccionables.
import { t as tr } from '../i18n.js';
import * as THREE from 'three';
import { construirNeurona, PARTE_INFO } from './neuronas.js';
import { TIPOS_NEURONA } from '../datos/neuro.js';

const COLOR_FILA = {
  soma: '#e39a55', dendritas: '#e7a35c', cono: '#ffb36b', axon: '#d9a46e', mielina: '#f1eadb',
  nodos: '#ff7a59', terminales: '#f2c46b', terminacion_sensitiva: '#8fd3c4',
};

export function crearModoNeuronas(ctx) {
  const { h, escena, INFO, quitarParentesis } = ctx;
  const grupo = new THREE.Group();
  grupo.visible = false;
  escena.add(grupo);
  const cache = {};
  let actual = null, tipo = 'n_multipolar', sel = null, hover = null, general = false;
  let pines = [];
  const nombreParte = (id) => quitarParentesis(INFO[PARTE_INFO[id]].nombre);

  function quitarPines() { for (const p of pines) { p.obj.removeFromParent(); p.el.remove(); } pines = []; }
  function crearPines() {
    quitarPines();
    for (const p of actual.partes) {
      const el = h('button', {
        class: `pin${sel === p.id ? ' activo' : ''}${sel && sel !== p.id ? ' atenuado' : ''}`, type: 'button',
        onclick: (ev) => { ev.stopPropagation(); seleccionar(sel === p.id ? null : p.id); },
        onpointerdown: (ev) => ev.stopPropagation(),
        onpointerenter: () => { hover = p.id; ctx.pedirRender(); }, onpointerleave: () => { hover = null; ctx.pedirRender(); },
      }, h('span', { class: 'pin-punto' }), h('span', { class: 'pin-texto' }, nombreParte(p.id)));
      const obj = new ctx.CSS2DObject(el);
      obj.center.set(0, 0.5);
      obj.position.copy(p.ancla);
      actual.grupo.add(obj);
      pines.push({ obj, el, id: p.id });
    }
  }
  function vista() {
    // distancia según ancho y alto reales (el área útil está entre el índice y el panel)
    const t = actual ? actual.tam : { x: 20, y: 14 };
    const d = Math.max(t.y * 1.75, t.x * 2.05, 14);
    return { pos: [d * 0.17, d * 0.2, d], obj: [0, 0, 0] };
  }
  function mostrar(t) {
    tipo = t; sel = null; general = false;
    if (actual) { quitarPines(); grupo.remove(actual.grupo); }
    actual = cache[t] || (cache[t] = construirNeurona(t, ctx.LIGERO));
    grupo.add(actual.grupo);
    crearPines();
    renderPanel();
    ctx.volarA(vista());
    ctx.pedirRender();
  }
  function seleccionar(id) {
    sel = id;
    for (const p of pines) { p.el.classList.toggle('activo', p.id === sel); p.el.classList.toggle('atenuado', !!sel && p.id !== sel); }
    renderPanel();
    ctx.pedirRender();
  }

  function renderPanel() {
    const filasPartes = actual.partes.map((p) => ({ texto: nombreParte(p.id), color: COLOR_FILA[p.id], activo: p.id === sel, accion: () => seleccionar(p.id) }));
    const filasTipos = TIPOS_NEURONA.map((t) => ({ texto: quitarParentesis(INFO[t].nombre), activo: t === tipo && !general, accion: () => mostrar(t) }));
    const rutaBase = [{ t: tr('Neurociencia', 'Neuroscience') }, { t: tr('Neuronas', 'Neurons'), f: () => { general = true; sel = null; seleccionar(null); } }];
    if (general) {
      ctx.mostrarPanel({ ruta: rutaBase.slice(0, 2), info: INFO.neuronas, op: { grupos: [{ titulo: tr('Clasificación morfológica', 'Morphological classification'), nota: tr('Elige un tipo', 'Choose a type'), filas: filasTipos }] } });
      return;
    }
    if (sel) {
      ctx.mostrarPanel({
        ruta: [...rutaBase, { t: quitarParentesis(INFO[tipo].nombre), f: () => seleccionar(null) }, { t: nombreParte(sel) }],
        info: INFO[PARTE_INFO[sel]],
        op: { contexto: quitarParentesis(INFO[tipo].nombre), grupos: [{ titulo: tr('Partes en el modelo', 'Parts in the model'), filas: filasPartes }, { titulo: tr('Otros tipos', 'Other types'), filas: filasTipos }] },
      });
      return;
    }
    ctx.mostrarPanel({
      ruta: [...rutaBase, { t: quitarParentesis(INFO[tipo].nombre) }],
      info: INFO[tipo],
      op: { grupos: [{ titulo: tr('Partes en el modelo', 'Parts in the model'), nota: tr('Clic para resaltar', 'Click to highlight'), filas: filasPartes }, { titulo: tr('Clasificación morfológica', 'Morphological classification'), filas: filasTipos }] },
    });
  }

  const cBase = new THREE.Color();
  return {
    id: 'neuronas',
    vista,
    activar(params = {}) {
      grupo.visible = true;
      if (!actual || (params.tipo && params.tipo !== tipo)) mostrar(params.tipo || tipo);
      else { crearPines(); renderPanel(); }
      if (params.parte && actual.partes.some((p) => p.id === params.parte)) seleccionar(params.parte);
      if (params.general) { general = true; sel = null; seleccionar(null); }
    },
    desactivar() { grupo.visible = false; quitarPines(); },
    seleccionables: () => (actual ? actual.partes.map((p) => p.mesh) : []),
    nombre: (m) => nombreParte(m.userData.parteNeurona),
    alHover: (m) => { const id = m ? m.userData.parteNeurona : null; if (id !== hover) { hover = id; ctx.pedirRender(); } },
    alClic: (m) => seleccionar(sel === m.userData.parteNeurona ? null : m.userData.parteNeurona),
    volver() { if (sel) { seleccionar(null); return true; } if (general) { general = false; renderPanel(); return true; } return false; },
    estado: () => ({ tipo }),
    actualizar(dt) {
      if (!actual || !grupo.visible) return false;
      let cambia = false;
      const k = 1 - Math.exp(-dt * 10);
      for (const p of actual.partes) {
        const obj = p.id === sel ? 0.32 : p.id === hover ? 0.18 : 0;
        const opObj = sel && p.id !== sel ? 0.55 : 1;
        const mat = p.mesh.material;
        const e = mat.userData.emisivo ?? 0;
        const ne = e + (obj - e) * k;
        const no = mat.opacity + (opObj - mat.opacity) * k;
        if (Math.abs(ne - obj) > 0.002 || Math.abs(no - opObj) > 0.003) cambia = true;
        mat.userData.emisivo = Math.abs(ne - obj) < 0.002 ? obj : ne;
        mat.opacity = Math.abs(no - opObj) < 0.003 ? opObj : no;
        const transp = mat.opacity < 0.995;
        if (mat.transparent !== transp) { mat.transparent = transp; mat.needsUpdate = true; }
        mat.depthWrite = mat.opacity > 0.8;
        mat.emissive.copy(cBase.copy(mat.color)).multiplyScalar(mat.userData.emisivo);
      }
      return cambia;
    },
  };
}
