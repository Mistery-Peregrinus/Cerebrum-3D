// Modelos 3D procedurales de neuronas según su clasificación morfológica.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { tubo, masa, materialTejido, smoothstep } from '../modelo/util.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

export function aleatorio(semilla) {
  let s = semilla >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLORES = {
  soma: 0xe39a55, dendritas: 0xe7a35c, cono: 0xffb36b, axon: 0xd9a46e,
  mielina: 0xf1eadb, nodos: 0xff7a59, terminales: 0xf2c46b, terminacion_sensitiva: 0x8fd3c4,
};
export const PARTE_INFO = {
  soma: 'p_soma', dendritas: 'p_dendritas', cono: 'p_cono_axonico', axon: 'p_axon',
  mielina: 'p_mielina', nodos: 'p_nodos', terminales: 'p_terminales', terminacion_sensitiva: 'p_terminacion_sensitiva',
};

// ---------------------------------------------------------------------------
// Generadores
// ---------------------------------------------------------------------------
function perpendicular(d, rnd) {
  const a = Math.abs(d.y) < 0.9 ? V(0, 1, 0) : V(1, 0, 0);
  const p = new THREE.Vector3().crossVectors(d, a).normalize();
  return p.applyAxisAngle(d, rnd() * Math.PI * 2);
}

/**
 * Árbol ramificado (dendritas o telodendrias).
 * o: { inicio, dir, largo, radio, nivel, maxNivel, rnd, angulo, plano (normal) | null, ramas, ondulacion, q }
 */
function arbol(geos, puntas, o) {
  const { rnd } = o;
  const n = 6;
  const pts = [o.inicio.clone()];
  const p = o.inicio.clone();
  const d = o.dir.clone().normalize();
  for (let k = 1; k <= n; k++) {
    d.add(perpendicular(d, rnd).multiplyScalar(o.ondulacion ?? 0.18)).normalize();
    if (o.plano) { d.addScaledVector(o.plano, -d.dot(o.plano)).normalize(); }
    p.addScaledVector(d, o.largo / n);
    pts.push(p.clone());
  }
  const r0 = o.radio, r1 = o.radio * 0.72;
  geos.push(tubo(pts.map((q) => q.toArray()), (t) => r0 + (r1 - r0) * t, o.q.segs, o.q.radial));
  if (o.nivel >= o.maxNivel) { puntas.push({ p: p.clone(), d: d.clone() }); return; }
  const nRamas = o.ramas + (rnd() < (o.extra ?? 0) ? 1 : 0);
  for (let i = 0; i < nRamas; i++) {
    const eje = o.plano ? o.plano.clone() : perpendicular(d, rnd);
    const signo = nRamas === 1 ? (rnd() < 0.5 ? -1 : 1) : (i % 2 === 0 ? -1 : 1);
    const ang = o.angulo * (0.55 + rnd() * 0.7) * signo;
    const nd = d.clone().applyAxisAngle(eje, ang);
    arbol(geos, puntas, { ...o, inicio: p.clone(), dir: nd, largo: o.largo * (0.66 + rnd() * 0.16), radio: r1 * 0.78, nivel: o.nivel + 1 });
  }
}

function soma(centro, radios, rnd, forma = null) {
  return masa(48, centro, radios, (x, y, z, nx, ny, nz, vx, vy, vz) => {
    let d = 0.04 * Math.sin(vx * 7 + rnd() * 0.01) * Math.cos(vz * 6);
    if (forma === 'piramide') d += -0.45 * smoothstep(-0.2, 1, vy) * (Math.abs(vx) + Math.abs(vz)) * 0.6 + 0.25 * smoothstep(0.4, 1, vy);
    if (forma === 'pera') d += 0.18 * smoothstep(0.3, 1, vy) - 0.12 * smoothstep(-1, -0.4, -vy) * 0;
    return d;
  }, 0);
}

/** Axón con vaina de mielina, nodos de Ranvier y telodendrias opcionales. */
function axon(partes, puntos, o) {
  const { q, rnd } = o;
  const curva = new THREE.CatmullRomCurve3(puntos, false, 'centripetal');
  const r = o.radio;
  partes.axon.push(tubo(curva, () => r, q.segsAxon, q.radial));
  const anclas = {};
  if (o.mielina) {
    const t0 = o.inicioMielina ?? 0.07, t1 = o.finMielina ?? 0.9;
    const n = o.internodos;
    const paso = (t1 - t0) / n;
    const largoTotal = curva.getLength();
    const hueco = Math.min(0.012, (0.18 / largoTotal));
    for (let i = 0; i < n; i++) {
      const a = t0 + i * paso + hueco, b = t0 + (i + 1) * paso - hueco;
      const pts = [];
      for (let k = 0; k <= 10; k++) pts.push(curva.getPointAt(a + ((b - a) * k) / 10).toArray());
      const R = r * 2.4;
      partes.mielina.push(tubo(pts, (u) => R * Math.pow(Math.max(0, 1 - Math.pow(2 * u - 1, 10)), 0.25) + 0.001, 24, q.radial + 2));
      if (i === Math.min(2, n - 1)) anclas.mielina = curva.getPointAt((a + b) / 2).add(V(0, R, 0));
      // nodo al final de cada internodo (excepto el último)
      if (i < n - 1) {
        const tn = t0 + (i + 1) * paso;
        const pn = [tn - hueco * 0.9, tn, tn + hueco * 0.9].map((t) => curva.getPointAt(t).toArray());
        partes.nodos.push(tubo(pn, () => r * 1.35, 4, q.radial));
        if (i === Math.min(4, n - 2)) anclas.nodos = curva.getPointAt(tn).add(V(0, r * 1.4, 0));
      }
    }
  }
  anclas.axon = curva.getPointAt(o.mielina ? ((o.finMielina ?? 0.9) + 1) / 2 - 0.02 : 0.5);
  const fin = curva.getPointAt(1), dirFin = curva.getTangentAt(1);
  if (o.terminales) {
    const geos = [], puntas = [];
    arbol(geos, puntas, { inicio: fin, dir: dirFin, largo: o.largoTerminal ?? 1.6, radio: r * 0.8, nivel: 0, maxNivel: o.nivelesTerminal ?? 2, rnd, angulo: 0.7, plano: null, ramas: 2, extra: 0.5, ondulacion: 0.25, q });
    partes.terminales.push(...geos);
    for (const pt of puntas) partes.terminales.push(masa(16, pt.p.toArray(), [0.26, 0.26, 0.26]));
    anclas.terminales = puntas[0].p.clone().add(V(0, 0.4, 0));
  }
  return { curva, anclas, fin, dirFin };
}

function cono(partes, desde, hacia, r0, r1, q) {
  const pts = [];
  for (let k = 0; k <= 6; k++) pts.push(desde.clone().lerp(hacia, k / 6).toArray());
  partes.cono.push(tubo(pts, (t) => r0 + (r1 - r0) * Math.pow(t, 0.7), 10, q.radial + 2));
}

function dendritasRadiales(partes, puntasOut, centro, radioSoma, n, rnd, o) {
  for (let i = 0; i < n; i++) {
    let d;
    do { d = V(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1); } while (d.lengthSq() < 0.1 || (o.excluir && d.clone().normalize().dot(o.excluir) > 0.55));
    d.normalize();
    if (o.planoY) { d.y *= 0.25; d.normalize(); }
    arbol(partes.dendritas, puntasOut, { inicio: centro.clone().addScaledVector(d, radioSoma * 0.85), dir: d, nivel: 0, rnd, plano: null, ramas: 2, extra: 0.3, ondulacion: 0.2, ...o.arbol });
  }
}

// ---------------------------------------------------------------------------
// Tipos de neurona
// ---------------------------------------------------------------------------
function definicion(tipo, q) {
  const rnd = aleatorio({ n_multipolar: 11, n_piramidal: 23, n_purkinje: 37, n_bipolar: 41, n_seudounipolar: 53, n_anaxonica: 67 }[tipo]);
  const partes = { soma: [], dendritas: [], cono: [], axon: [], mielina: [], nodos: [], terminales: [], terminacion_sensitiva: [] };
  const anclas = {};
  const puntas = [];
  const extra = {};

  if (tipo === 'n_multipolar') {
    const c = V(-6, 0, 0);
    partes.soma.push(soma(c.toArray(), [1.5, 1.3, 1.4], rnd));
    dendritasRadiales(partes, puntas, c, 1.4, 7, rnd, { excluir: V(1, 0, 0), arbol: { largo: 3.0, radio: 0.34, maxNivel: 3, angulo: 0.6, q } });
    cono(partes, V(-4.7, 0, 0), V(-3.6, 0.05, 0), 0.62, 0.22, q);
    const ax = axon(partes, [V(-3.6, 0.05, 0), V(1, 0.7, 0.4), V(6.5, -0.5, -0.3), V(12.5, 0.3, 0)], { radio: 0.22, mielina: true, internodos: 8, terminales: true, nivelesTerminal: 2, q, rnd });
    extra.curva = ax.curva; extra.radioAxon = 0.22;
    Object.assign(anclas, ax.anclas, { soma: c.clone().add(V(0, 1.6, 0)), cono: V(-4.1, 0.6, 0) });
  }

  if (tipo === 'n_piramidal') {
    const c = V(0, -2.2, 0);
    partes.soma.push(soma(c.toArray(), [1.3, 1.7, 1.3], rnd, 'piramide'));
    // dendrita apical: tronco con ramas oblicuas y penacho
    const tronco = [];
    let p = V(0, -0.6, 0);
    for (let k = 0; k <= 8; k++) { tronco.push(p.clone()); p = p.add(V((rnd() - 0.5) * 0.25, 1.05, (rnd() - 0.5) * 0.25)); }
    partes.dendritas.push(tubo(tronco.map((x) => x.toArray()), (t) => 0.42 - 0.24 * t, 40, q.radial));
    for (let k = 2; k < 8; k++) {
      const d = V((rnd() - 0.5) * 2, 0.6, (rnd() - 0.5) * 2).normalize();
      arbol(partes.dendritas, puntas, { inicio: tronco[k], dir: d, largo: 1.8, radio: 0.16, nivel: 0, maxNivel: 1, rnd, angulo: 0.6, plano: null, ramas: 2, q });
    }
    for (let i = 0; i < 4; i++) {
      const d = V((rnd() - 0.5) * 1.6, 1, (rnd() - 0.5) * 1.6).normalize();
      arbol(partes.dendritas, puntas, { inicio: tronco[8], dir: d, largo: 1.9, radio: 0.17, nivel: 0, maxNivel: 2, rnd, angulo: 0.55, plano: null, ramas: 2, q });
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rnd() * 0.4;
      const d = V(Math.cos(a), -0.45 - rnd() * 0.3, Math.sin(a)).normalize();
      arbol(partes.dendritas, puntas, { inicio: c.clone().add(V(Math.cos(a) * 0.9, -1.0, Math.sin(a) * 0.9)), dir: d, largo: 2.3, radio: 0.26, nivel: 0, maxNivel: 2, rnd, angulo: 0.6, plano: null, ramas: 2, extra: 0.3, q });
    }
    cono(partes, V(0, -3.7, 0), V(0, -4.7, 0), 0.55, 0.2, q);
    const ax = axon(partes, [V(0, -4.7, 0), V(0.4, -8, 0.2), V(-0.3, -11.5, 0), V(0.2, -15, 0)], { radio: 0.2, mielina: true, internodos: 5, terminales: true, inicioMielina: 0.09, q, rnd });
    // colateral axónica
    const col = ax.curva.getPointAt(0.3);
    arbol(partes.axon, [], { inicio: col, dir: V(1, -0.4, 0.3), largo: 2.4, radio: 0.12, nivel: 0, maxNivel: 1, rnd, angulo: 0.5, plano: null, ramas: 2, q });
    Object.assign(anclas, ax.anclas, { soma: c.clone().add(V(1.1, 0.2, 0)), dendritas: tronco[6].clone().add(V(0.3, 0, 0)), cono: V(0.5, -4.2, 0) });
  }

  if (tipo === 'n_purkinje') {
    const c = V(0, -3.2, 0);
    partes.soma.push(soma(c.toArray(), [1.15, 1.45, 1.15], rnd, 'pera'));
    const plano = V(0, 0, 1);
    for (const dx of [-0.45, 0.45]) {
      arbol(partes.dendritas, puntas, { inicio: c.clone().add(V(dx * 0.6, 1.2, 0)), dir: V(dx, 1, 0), largo: 2.4, radio: 0.4, nivel: 0, maxNivel: 6, rnd, angulo: 0.48, plano, ramas: 2, extra: 0.15, ondulacion: 0.22, q: q.purkinje });
    }
    cono(partes, V(0, -4.6, 0), V(0, -5.5, 0), 0.5, 0.2, q);
    const ax = axon(partes, [V(0, -5.5, 0), V(0.3, -8.5, 0), V(-0.2, -12, 0)], { radio: 0.2, mielina: true, internodos: 4, terminales: true, q, rnd });
    Object.assign(anclas, ax.anclas, { soma: c.clone().add(V(1.2, 0, 0)), dendritas: V(2.5, 4.5, 0), cono: V(0.5, -5.1, 0) });
  }

  if (tipo === 'n_bipolar') {
    const c = V(0, 0, 0);
    partes.soma.push(soma(c.toArray(), [0.95, 1.5, 0.95], rnd));
    const tronco = [V(0, 1.3, 0), V(0.15, 3, 0.1), V(-0.1, 4.6, 0)].map((x) => x.toArray());
    partes.dendritas.push(tubo(tronco, (t) => 0.32 - 0.12 * t, 20, q.radial));
    for (let i = 0; i < 4; i++) {
      const d = V((rnd() - 0.5) * 2, 0.8, (rnd() - 0.5) * 2).normalize();
      arbol(partes.dendritas, puntas, { inicio: V(-0.1, 4.6, 0), dir: d, largo: 1.2, radio: 0.13, nivel: 0, maxNivel: 1, rnd, angulo: 0.6, plano: null, ramas: 2, q });
    }
    const ax = axon(partes, [V(0, -1.4, 0), V(-0.2, -4, 0.1), V(0.1, -6.6, 0)], { radio: 0.2, mielina: false, terminales: true, nivelesTerminal: 2, largoTerminal: 1.2, q, rnd });
    Object.assign(anclas, ax.anclas, { soma: V(1.1, 0, 0), dendritas: V(0.5, 3.2, 0) });
  }

  if (tipo === 'n_seudounipolar') {
    const c = V(0, 3.2, 0);
    partes.soma.push(soma(c.toArray(), [1.45, 1.45, 1.45], rnd));
    // prolongación única con un pequeño bucle (glomérulo) y bifurcación en T
    partes.axon.push(tubo([V(0, 1.8, 0), V(0.5, 1.0, 0.2), V(-0.4, 0.2, -0.1), V(0, -1, 0)].map((x) => x.toArray()), () => 0.24, 30, q.radial));
    const periferica = axon(partes, [V(0, -1, 0), V(4, -1.4, 0.3), V(9, -0.8, -0.2), V(13.5, -1.2, 0)], { radio: 0.22, mielina: true, internodos: 6, inicioMielina: 0.05, finMielina: 0.86, terminales: false, q, rnd });
    // terminaciones sensitivas
    const tips = [];
    arbol(partes.terminacion_sensitiva, tips, { inicio: periferica.fin, dir: periferica.dirFin, largo: 1.5, radio: 0.13, nivel: 0, maxNivel: 3, rnd, angulo: 0.7, plano: null, ramas: 2, ondulacion: 0.35, q });
    const central = axon(partes, [V(0, -1, 0), V(-4, -0.7, -0.2), V(-10, -1.1, 0.2)], { radio: 0.22, mielina: true, internodos: 4, inicioMielina: 0.07, finMielina: 0.86, terminales: true, q, rnd });
    Object.assign(anclas, central.anclas, { mielina: periferica.anclas.mielina, nodos: periferica.anclas.nodos, soma: c.clone().add(V(0, 1.7, 0)), axon: V(0.6, 0.6, 0), terminacion_sensitiva: periferica.fin.clone().add(V(0.6, 0.8, 0)) });
  }

  if (tipo === 'n_anaxonica') {
    const c = V(0, 0, 0);
    partes.soma.push(soma(c.toArray(), [1.0, 0.85, 1.0], rnd));
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + rnd() * 0.3;
      const d = V(Math.cos(a), (rnd() - 0.5) * 0.25, Math.sin(a)).normalize();
      arbol(partes.dendritas, puntas, { inicio: d.clone().multiplyScalar(0.8), dir: d, largo: 2.6, radio: 0.2, nivel: 0, maxNivel: 3, rnd, angulo: 0.55, plano: V(0, 1, 0), ramas: 2, extra: 0.2, ondulacion: 0.2, q });
    }
    anclas.soma = V(0, 1.1, 0);
  }

  if (!anclas.dendritas && puntas.length) anclas.dendritas = puntas[Math.floor(puntas.length / 3)].p.clone();
  return { partes, anclas, extra };
}

/** Construye la neurona indicada. Devuelve { grupo, partes: [{ id, mesh, ancla }], radio } */
export function construirNeurona(tipo, ligero = false) {
  const q = ligero
    ? { segs: 8, radial: 5, segsAxon: 120, purkinje: { segs: 5, radial: 4 } }
    : { segs: 12, radial: 7, segsAxon: 220, purkinje: { segs: 7, radial: 5 } };
  const { partes, anclas, extra } = definicion(tipo, q);
  const grupo = new THREE.Group();
  const lista = [];
  for (const [id, geos] of Object.entries(partes)) {
    if (!geos.length) continue;
    const geo = geos.length > 1 ? mergeGeometries(geos, false) : geos[0];
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    const mat = materialTejido(COLORES[id]);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.parteNeurona = id;
    grupo.add(mesh);
    lista.push({ id, mesh, ancla: anclas[id] || geo.boundingSphere.center.clone() });
  }
  // centrar
  const caja = new THREE.Box3().setFromObject(grupo);
  const centro = caja.getCenter(new THREE.Vector3());
  for (const m of grupo.children) m.position.sub(centro);
  for (const p of lista) p.ancla.sub(centro);
  const tam = caja.getSize(new THREE.Vector3());
  const radio = tam.length() / 2;
  // curva del axón (si existe) en las mismas coordenadas centradas
  const curvaAxon = extra.curva ? new THREE.CatmullRomCurve3(extra.curva.points.map((p) => p.clone().sub(centro)), false, 'centripetal') : null;
  return { grupo, partes: lista, radio, tam, curvaAxon, radioAxon: extra.radioAxon };
}
