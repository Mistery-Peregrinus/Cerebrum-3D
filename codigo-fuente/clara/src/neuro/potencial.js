// Modo «Potencial de acción»: neurona multipolar completa. El impulso nace en el cono axónico
// y recorre el axón (saltando de nodo de Ranvier en nodo si está mielinizado). El voltaje se
// calcula en tiempo real con el modelo de Hodgkin-Huxley; se muestran iones Na⁺/K⁺,
// electrodos A y B y un osciloscopio.
import { t as tr } from '../i18n.js';
import * as THREE from 'three';
import { tubo } from '../modelo/util.js';
import { CableHH, UMBRAL } from './hh.js';
import { crearGrafica } from './grafica.js';
import { construirNeurona } from './neuronas.js';

const ACENTO = 0x7c4dff;
const VELOCIDADES = [0.0625, 0.125, 0.25, 0.5, 1, 2, 4]; // ms simulados por segundo real
const VENTANA = 16; // ms mostrados en el osciloscopio
const T0_MIELINA = 0.06, T1_MIELINA = 0.9; // tramo mielinizado sobre la curva del axón
const PARADAS = [
  [-80, new THREE.Color('#3d2a8f')], [-65, new THREE.Color('#2f6db3')], [-55, new THREE.Color('#38b2a3')],
  [-20, new THREE.Color('#f2c14e')], [35, new THREE.Color('#ff3b2f')],
];
function colorVoltaje(v, out) {
  if (v <= PARADAS[0][0]) return out.copy(PARADAS[0][1]);
  for (let i = 1; i < PARADAS.length; i++) {
    if (v <= PARADAS[i][0]) {
      const [v0, c0] = PARADAS[i - 1], [v1, c1] = PARADAS[i];
      return out.copy(c0).lerp(c1, (v - v0) / (v1 - v0));
    }
  }
  return out.copy(PARADAS[PARADAS.length - 1][1]);
}
function materialVoltaje() {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.42, metalness: 0 });
  m.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n totalEmissiveRadiance += vColor * 0.55;');
  };
  return m;
}

export function crearModoPotencial(ctx) {
  const { h, escena, LIGERO } = ctx;
  const grupo = new THREE.Group();
  grupo.visible = false;
  escena.add(grupo);

  const cfg = { intensidad: 1.5, mielina: true, velIdx: 1, doble: false, intervalo: 4 };
  let sim = new CableHH(true);
  let activo = false, ultimoTiempoActivo = 0;

  // --- neurona multipolar ---------------------------------------------------
  const neurona = construirNeurona('n_multipolar', LIGERO);
  const curva = neurona.curvaAxon;
  const R = neurona.radioAxon;
  grupo.add(neurona.grupo);
  const matSoma = new THREE.MeshStandardMaterial({ color: 0x2f6db3, roughness: 0.45 });
  const matTerm = new THREE.MeshStandardMaterial({ color: 0x2f6db3, roughness: 0.4 });
  let somaMesh = null;
  for (const p of neurona.partes) {
    if (p.id === 'axon' || p.id === 'mielina' || p.id === 'nodos') { p.mesh.visible = false; continue; }
    p.mesh.material = p.id === 'terminales' ? matTerm : matSoma;
    if (p.id === 'soma') { somaMesh = p.mesh; somaMesh.userData.etiqueta = tr('Soma · clic para estimular', 'Soma · click to stimulate'); }
  }

  // axón coloreado por voltaje (sigue la curva del axón de la neurona)
  const segs = LIGERO ? 320 : 520, radial = LIGERO ? 9 : 14;
  const geoAxon = tubo(curva, () => R * 1.1, segs, radial);
  const colAxon = geoAxon.attributes.color;
  const nAnillo = (segs + 1) * radial;
  const uVertice = new Float32Array(colAxon.count);
  for (let v = 0; v < colAxon.count; v++) uVertice[v] = v < nAnillo ? Math.floor(v / radial) / segs : v === nAnillo ? 0 : 1;
  const axonMesh = new THREE.Mesh(geoAxon, materialVoltaje());
  axonMesh.userData.etiqueta = tr('Axón', 'Axon');
  grupo.add(axonMesh);

  // vaina de mielina y nodos de Ranvier (uno por compartimento activo del modelo mielinizado)
  const NNODOS = new CableHH(true).N;
  const uNodo = (k) => T0_MIELINA + ((T1_MIELINA - T0_MIELINA) * k) / (NNODOS - 1);
  const grupoMielina = new THREE.Group();
  grupo.add(grupoMielina);
  const matMielina = new THREE.MeshPhysicalMaterial({ color: 0xf1eadb, roughness: 0.5, clearcoat: 0.3 });
  const hueco = 0.16 / curva.getLength();
  for (let k = 0; k < NNODOS - 1; k++) {
    const a = uNodo(k) + hueco, b = uNodo(k + 1) - hueco;
    const pts = [];
    for (let s = 0; s <= 8; s++) pts.push(curva.getPointAt(a + ((b - a) * s) / 8).toArray());
    grupoMielina.add(new THREE.Mesh(tubo(pts, (u) => R * 2.4 * Math.pow(Math.max(0, 1 - Math.pow(2 * u - 1, 10)), 0.25) + 0.001, 16, radial + 2), matMielina));
  }
  const anillos = [];
  for (let k = 0; k < NNODOS; k++) {
    const t = uNodo(k);
    const pts = [t - hueco * 0.8, t, t + hueco * 0.8].map((x) => curva.getPointAt(Math.min(1, Math.max(0, x))).toArray());
    const mat = new THREE.MeshStandardMaterial({ color: 0x2f6db3, roughness: 0.35, emissive: 0x000000 });
    const m = new THREE.Mesh(tubo(pts, () => R * 1.55, 4, radial), mat);
    m.userData.etiqueta = tr('Nodo de Ranvier', 'Node of Ranvier');
    grupoMielina.add(m);
    anillos.push(mat);
  }

  // electrodos
  const electrodos = [];
  for (const [nombre, frac, color] of [['A', 0.15, ACENTO], ['B', 0.85, 0xeeeeee]]) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.4, emissive: color, emissiveIntensity: 0.25 });
    const aguja = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.012, 3.2, 8), mat);
    aguja.position.set(0, R + 1.75, 0);
    const mango = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.4, 12), new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 }));
    mango.position.set(0, R + 3.9, 0);
    g.add(aguja, mango);
    grupo.add(g);
    const el = h('div', { class: `marca-electrodo e-${nombre}` }, nombre);
    const obj = new ctx.CSS2DObject(el);
    obj.center.set(0.5, 1);
    obj.position.set(0, R + 4.75, 0);
    g.add(obj);
    electrodos.push({ nombre, frac, g, obj });
  }
  const etqNodos = new ctx.CSS2DObject(h('div', { class: 'etq-escena' }, tr('Nodos de Ranvier', 'Nodes of Ranvier')));
  etqNodos.center.set(0, 0.5);
  grupoMielina.add(etqNodos);
  const etqSoma = new ctx.CSS2DObject(h('div', { class: 'etq-escena' }, tr('Soma · clic para estimular', 'Soma · click to stimulate')));
  etqSoma.center.set(0, 0.5);
  grupo.add(etqSoma);
  const somaCentro = new THREE.Box3().setFromObject(somaMesh).getCenter(new THREE.Vector3());
  etqSoma.position.copy(somaCentro).add(new THREE.Vector3(-1.2, -2.6, 0));
  const etiquetas = [etqNodos, etqSoma, ...electrodos.map((e) => e.obj)];

  // posición (u sobre la curva) de cada compartimento del modelo
  const uComp = (i) => (cfg.mielina ? uNodo(i) : 0.02 + (0.98 * i) / (sim.N - 1));
  const indiceElectrodo = (frac) => Math.round(frac * (sim.N - 1));
  function colocar() {
    for (const e of electrodos) {
      const p = curva.getPointAt(uComp(indiceElectrodo(e.frac)));
      e.g.position.copy(p);
    }
    etqNodos.position.copy(curva.getPointAt(uNodo(5))).add(new THREE.Vector3(0, R * 2.6 + 0.6, 0));
    grupoMielina.visible = cfg.mielina;
  }

  // iones (partículas) en anillo alrededor del axón
  const MAXP = LIGERO ? 360 : 700;
  const ionMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ toneMapped: false }), MAXP);
  ionMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  grupo.add(ionMesh);
  const P = Array.from({ length: MAXP }, () => ({ vivo: false }));
  const COL_NA = new THREE.Color('#ffd23f'), COL_K = new THREE.Color('#b78cff');
  for (let i = 0; i < MAXP; i++) ionMesh.setColorAt(i, COL_NA);
  const m4 = new THREE.Matrix4(), tmpV = new THREE.Vector3(), arriba = new THREE.Vector3(0, 1, 0);
  function emitir(tipo, u) {
    const libre = P.findIndex((p) => !p.vivo);
    if (libre < 0) return;
    const uu = Math.min(1, Math.max(0, u + (Math.random() - 0.5) * 0.006));
    const base = curva.getPointAt(uu), tg = curva.getTangentAt(uu);
    const n = new THREE.Vector3().crossVectors(tg, arriba).normalize(), b = new THREE.Vector3().crossVectors(tg, n).normalize();
    const a = Math.random() * Math.PI * 2;
    const dir = n.multiplyScalar(Math.cos(a)).addScaledVector(b, Math.sin(a));
    Object.assign(P[libre], { vivo: true, tipo, base, dir, t: 0, vida: 0.75 + Math.random() * 0.35 });
    ionMesh.setColorAt(libre, tipo === 'Na' ? COL_NA : COL_K);
    ionMesh.instanceColor.needsUpdate = true;
  }
  function moverIones(dt) {
    let vivos = 0;
    const rFuera = cfg.mielina ? R * 3.4 : R * 4.2;
    for (let i = 0; i < MAXP; i++) {
      const q = P[i];
      if (q.vivo) { q.t += dt / q.vida; if (q.t >= 1) q.vivo = false; }
      let s = 0;
      if (q.vivo) {
        vivos++;
        const e = q.t * q.t * (3 - 2 * q.t);
        const r = q.tipo === 'Na' ? rFuera - (rFuera - R * 0.4) * e : R * 0.4 + (rFuera - R * 0.4) * e;
        s = Math.sin(Math.PI * Math.min(1, q.t * 1.15));
        tmpV.copy(q.base).addScaledVector(q.dir, r);
      }
      m4.makeScale(s, s, s).setPosition(tmpV);
      ionMesh.setMatrixAt(i, m4);
    }
    ionMesh.instanceMatrix.needsUpdate = true;
    return vivos;
  }

  // --- color según el voltaje ----------------------------------------------
  const cTmp = new THREE.Color();
  function vEn(u) {
    const N = sim.N;
    if (cfg.mielina) {
      if (u <= uNodo(0)) return sim.V[0];
      if (u >= uNodo(N - 1)) return sim.V[N - 1];
      const f = ((u - T0_MIELINA) / (T1_MIELINA - T0_MIELINA)) * (N - 1), i = Math.floor(f), w = f - i;
      return sim.V[i] * (1 - w) + sim.V[Math.min(N - 1, i + 1)] * w;
    }
    const f = Math.max(0, ((u - 0.02) / 0.98) * (N - 1)), i = Math.min(N - 1, Math.floor(f)), w = f - i;
    return sim.V[i] * (1 - w) + sim.V[Math.min(N - 1, i + 1)] * w;
  }
  function pintar() {
    const arr = colAxon.array;
    for (let v = 0; v < colAxon.count; v++) {
      colorVoltaje(vEn(uVertice[v]), cTmp);
      arr[v * 3] = cTmp.r; arr[v * 3 + 1] = cTmp.g; arr[v * 3 + 2] = cTmp.b;
    }
    colAxon.needsUpdate = true;
    colorVoltaje(sim.V[0], cTmp);
    matSoma.color.copy(cTmp); matSoma.emissive.copy(cTmp).multiplyScalar(0.3);
    colorVoltaje(sim.V[sim.N - 1], cTmp);
    matTerm.color.copy(cTmp); matTerm.emissive.copy(cTmp).multiplyScalar(0.35);
    if (cfg.mielina) {
      for (let k = 0; k < NNODOS; k++) {
        colorVoltaje(sim.V[k], cTmp);
        anillos[k].color.copy(cTmp);
        anillos[k].emissive.copy(cTmp).multiplyScalar(0.25 + 0.75 * Math.max(0, Math.min(1, (sim.V[k] + 60) / 80)));
      }
    }
  }

  // --- osciloscopio ---------------------------------------------------------
  const traza = { activa: false, t0: 0, xs: [], va: [], vb: [] };
  let grafica = null, refs = {};
  let vPrevA = -65, faseAnterior = tr('Reposo', 'Resting'), huboPico = false, picoFinal = false;
  function fase(v, dvdt) {
    if (v > -55 && dvdt > 4) return tr('Despolarización', 'Depolarization');
    if (v > -50 && dvdt < -3) return tr('Repolarización', 'Repolarization');
    if (huboPico && v < -66) return tr('Hiperpolarización', 'Hyperpolarization');
    if (!huboPico && v > -64.5) return tr('Potencial local (subumbral)', 'Local potential (subthreshold)');
    return tr('Reposo', 'Resting');
  }
  function estimular() {
    if (!activo || !traza.activa || sim.t - traza.t0 > VENTANA * 0.9) {
      traza.activa = true; traza.t0 = sim.t; traza.xs = []; traza.va = []; traza.vb = []; huboPico = false; picoFinal = false;
    }
    const amp = cfg.intensidad * (cfg.mielina ? UMBRAL.mielinizado : UMBRAL.amielinico);
    sim.estimular(amp, 0, 0.5);
    if (cfg.doble) sim.estimular(amp, cfg.intervalo, 0.5);
    activo = true;
    ctx.pedirRender();
  }
  function reiniciar() {
    sim.configurar(cfg.mielina);
    traza.activa = false; traza.xs = []; traza.va = []; traza.vb = [];
    activo = false; huboPico = false; picoFinal = false; faseAnterior = tr('Reposo', 'Resting');
    for (const q of P) q.vivo = false;
    moverIones(0);
    colocar();
    pintar();
    dibujarGrafica();
    actualizarLecturas();
    ctx.pedirRender();
  }
  function dibujarGrafica() {
    if (!grafica) return;
    grafica.dibujar([
      { xs: traza.xs, ys: traza.va, color: '#9d7aff', etiqueta: tr('A (inicio del axón)', 'A (start of axon)') },
      { xs: traza.xs, ys: traza.vb, color: '#e8e8e8', etiqueta: tr('B (final del axón)', 'B (end of axon)'), ancho: 1.3 },
    ]);
  }
  function actualizarLecturas() {
    if (!refs.fase) return;
    const ia = indiceElectrodo(0.15);
    const v = sim.V[ia], g = sim.compuertas(ia);
    refs.voltaje.textContent = `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)} mV`;
    refs.fase.textContent = faseAnterior;
    refs.barNa.style.transform = `scaleX(${Math.min(1, g.gNa / 0.6)})`;
    refs.barK.style.transform = `scaleX(${Math.min(1, g.gK / 0.6)})`;
    refs.pNa.textContent = `${Math.round(Math.min(1, g.gNa / 0.6) * 100)}%`;
    refs.pK.textContent = `${Math.round(Math.min(1, g.gK / 0.6) * 100)}%`;
  }

  // --- panel ----------------------------------------------------------------
  const textoVel = () => `${VELOCIDADES[cfg.velIdx]} ${tr('ms por segundo', 'ms per second')}`;
  function etiquetaIntensidad() {
    const x = cfg.intensidad;
    return `${x.toFixed(2)}× ${tr('umbral', 'threshold')} · ${x < 1 ? tr('subumbral (no dispara)', 'subthreshold (no firing)') : tr('supraumbral', 'suprathreshold')}`;
  }
  function construirPanel() {
    const seg = (a, b, val, f) => h('div', { class: 'segmentado', role: 'group' },
      h('button', { type: 'button', class: !val ? 'activo' : '', onclick: () => f(false) }, a),
      h('button', { type: 'button', class: val ? 'activo' : '', onclick: () => f(true) }, b));
    const salidaInt = h('output', {}, etiquetaIntensidad());
    const salidaVel = h('output', {}, textoVel());
    const salidaInter = h('output', {}, `${cfg.intervalo} ms`);
    const filaInter = h('label', { class: `deslizador${cfg.doble ? '' : ' apagado'}` }, h('span', {}, tr('Intervalo entre estímulos', 'Interval between stimuli')),
      h('input', { type: 'range', min: 1, max: 12, step: 0.5, value: cfg.intervalo, oninput: (e) => { cfg.intervalo = +e.target.value; salidaInter.textContent = `${cfg.intervalo} ms`; } }), salidaInter);
    const canvas = h('canvas', { class: 'osc-canvas', height: 190 });
    refs = {
      fase: h('b', {}, faseAnterior), voltaje: h('span', { class: 'osc-v' }, '−65.0 mV'),
      barNa: h('i', { class: 'barra-relleno na' }), barK: h('i', { class: 'barra-relleno k' }),
      pNa: h('span', {}, '0%'), pK: h('span', {}, '0%'),
    };
    const lab = h('section', { class: 'lab' },
      h('header', { class: 'lab-cab' }, h('span', {}, tr('Laboratorio', 'Laboratory')), h('span', { class: 'lab-nota' }, tr('Modelo de Hodgkin-Huxley en tiempo real', 'Real-time Hodgkin-Huxley model'))),
      h('div', { class: 'lab-fila' },
        h('button', { class: 'btn btn-solido', type: 'button', onclick: estimular }, tr('Estimular', 'Stimulate'), h('span', { class: 'btn-flecha' }, '→')),
        h('button', { class: 'btn btn-borde', type: 'button', onclick: reiniciar }, tr('Reiniciar', 'Reset'))),
      h('div', { class: 'lab-campo' }, h('span', { class: 'lab-etq' }, tr('Axón', 'Axon')),
        seg(tr('Amielínico', 'Unmyelinated'), tr('Mielinizado', 'Myelinated'), cfg.mielina, (m) => { cfg.mielina = m; cfg.velIdx = m ? 1 : 4; reiniciar(); renderPanel(); })),
      h('label', { class: 'deslizador' }, h('span', {}, tr('Intensidad del estímulo', 'Stimulus intensity')),
        h('input', { type: 'range', min: 0.2, max: 3, step: 0.05, value: cfg.intensidad, oninput: (e) => { cfg.intensidad = +e.target.value; salidaInt.textContent = etiquetaIntensidad(); } }), salidaInt),
      h('label', { class: 'deslizador' }, h('span', {}, tr('Cámara lenta', 'Slow motion')),
        h('input', { type: 'range', min: 0, max: VELOCIDADES.length - 1, step: 1, value: cfg.velIdx, oninput: (e) => { cfg.velIdx = +e.target.value; salidaVel.textContent = textoVel(); } }), salidaVel),
      h('label', { class: 'casilla' }, h('input', { type: 'checkbox', checked: cfg.doble, onchange: (e) => { cfg.doble = e.target.checked; filaInter.classList.toggle('apagado', !cfg.doble); } }),
        h('span', {}, tr('Segundo estímulo (período refractario)', 'Second stimulus (refractory period)'))),
      filaInter,
    );
    const osc = h('section', { class: 'osc' },
      h('header', { class: 'lab-cab' }, h('span', {}, tr('Osciloscopio', 'Oscilloscope')), h('span', { class: 'lab-nota' }, `0–${VENTANA} ${tr('ms desde el estímulo', 'ms after the stimulus')}`)),
      canvas,
      h('div', { class: 'osc-lectura' }, h('span', {}, tr('Electrodo A', 'Electrode A')), refs.voltaje, h('span', { class: 'osc-fase' }, tr('Fase: ', 'Phase: '), refs.fase)),
      h('div', { class: 'osc-barras' },
        h('div', { class: 'barra' }, h('span', { class: 'barra-etq' }, tr('Canales Na⁺ abiertos', 'Open Na⁺ channels')), h('span', { class: 'barra-pista' }, refs.barNa), refs.pNa),
        h('div', { class: 'barra' }, h('span', { class: 'barra-etq' }, tr('Canales K⁺ abiertos', 'Open K⁺ channels')), h('span', { class: 'barra-pista' }, refs.barK), refs.pK)),
      h('div', { class: 'leyenda-iones' },
        h('span', {}, h('i', { class: 'punto-ion na' }), tr('Na⁺ entra', 'Na⁺ in')), h('span', {}, h('i', { class: 'punto-ion k' }), tr('K⁺ sale', 'K⁺ out')),
        h('span', { class: 'escala-v' }, h('i', {}), tr('−80 a +35 mV', '−80 to +35 mV'))),
    );
    return { bloques: [lab, osc], canvas };
  }
  function renderPanel() {
    const { bloques, canvas } = construirPanel();
    ctx.mostrarPanel({ ruta: [{ t: tr('Neurociencia', 'Neuroscience') }, { t: tr('Potencial de acción', 'Action potential') }], info: ctx.INFO.potencial_accion, op: { bloques, etiquetas: [cfg.mielina ? tr('Conducción saltatoria', 'Saltatory conduction') : tr('Conducción continua', 'Continuous conduction')] } });
    requestAnimationFrame(() => {
      grafica = crearGrafica(canvas, { xMin: 0, xMax: VENTANA, xPaso: 2, yMin: -90, yMax: 50, yPaso: 20, xEtiqueta: 'ms', yEtiqueta: 'mV', lineas: [{ y: -55, etiqueta: tr('umbral ≈ −55', 'threshold ≈ −55'), color: '#6b5b2a' }, { y: -65, etiqueta: tr('reposo −65', 'rest −65'), color: '#2a3f5b', abajo: true }] });
      dibujarGrafica();
    });
  }

  colocar();
  pintar();

  // --- interfaz del modo ----------------------------------------------------
  function vista() {
    const t = neurona.tam;
    const d = Math.max(t.y * 1.7, t.x * 1.86, 20);
    return { pos: [d * 0.12, d * 0.24, d], obj: [0, 0, 0] };
  }
  return {
    id: 'potencial',
    vista,
    activar() {
      grupo.visible = true;
      for (const o of etiquetas) o.element.style.display = '';
      colocar();
      pintar();
      renderPanel();
    },
    desactivar() {
      grupo.visible = false;
      for (const o of etiquetas) o.element.style.display = 'none';
    },
    seleccionables: () => [somaMesh],
    nombre: (m) => m.userData.etiqueta || '',
    alClic: () => estimular(),
    volver: () => false,
    actualizar(dt) {
      let necesita = false;
      if (activo) {
        // una vez que el impulso llegó al final del axón, avance rápido hasta el reposo
        const factor = picoFinal ? 6 : 1;
        const simDt = Math.min(0.25, VELOCIDADES[cfg.velIdx] * dt * factor);
        const pasos = Math.max(1, Math.ceil(simDt / 0.02));
        const ia = indiceElectrodo(0.15), ib = indiceElectrodo(0.85);
        for (let s = 0; s < pasos; s++) {
          sim.avanzar(simDt / pasos);
          if (traza.activa) {
            const tr = sim.t - traza.t0;
            if (tr <= VENTANA) { traza.xs.push(tr); traza.va.push(sim.V[ia]); traza.vb.push(sim.V[ib]); } else traza.activa = false;
          }
        }
        const N = sim.N, k = cfg.mielina ? 0.1 : 0.0125;
        for (let i = 0; i < N; i++) {
          const u = uComp(i);
          const lNa = Math.max(0, -sim.INa[i]) * simDt * k, lK = Math.max(0, sim.IK[i] - 2) * simDt * k * 0.8;
          if (Math.random() < lNa / factor) emitir('Na', u);
          if (Math.random() < lK / factor) emitir('K', u);
        }
        const va = sim.V[ia];
        if (va > 0) huboPico = true;
        if (sim.V[N - 1] > 0) picoFinal = true;
        faseAnterior = fase(va, (va - vPrevA) / Math.max(1e-6, simDt));
        vPrevA = va;
        pintar();
        actualizarLecturas();
        dibujarGrafica();
        let quieto = sim.estimulos.length === 0;
        if (quieto) for (let i = 0; i < N; i++) if (Math.abs(sim.V[i] + 65) > 0.05) { quieto = false; break; }
        if (quieto) { activo = false; faseAnterior = tr('Reposo', 'Resting'); actualizarLecturas(); }
        necesita = true;
        ultimoTiempoActivo = performance.now();
      }
      const vivos = moverIones(dt);
      if (vivos > 0 || performance.now() - ultimoTiempoActivo < 200) necesita = true;
      return necesita;
    },
  };
}
