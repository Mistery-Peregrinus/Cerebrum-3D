// Telencéfalo (versión hiperrealista): forma y giros reales de BodyParts3D
// (© The Database Center for Life Science, CC BY 4.0), con los surcos tallados en los límites
// reales entre giros, surcos menores procedurales, la ínsula y el hipocampo reales.
// Sistema de coordenadas (1 unidad ≈ 1 cm del modelo): x = derecha(+), y = arriba, z = anterior(+).
import * as THREE from 'three';
import {
  crearRuido, smoothstep, gauss, clamp, superficieSDF, relajarSobreSDF, gradienteSDF,
  dividirPorEtiquetas, espejarX, masa, tubo, suavizarTaubin,
} from './util.js';
import { crearParte } from './partes.js';
import { campoSurcos, aSuperficie } from './surcos.js';
import { cargarHemisferio, cargarMallas, G } from './bp3d.js';

const SIN_RELIEVE = typeof process !== 'undefined' && !!process.env.SIN_RELIEVE;
const L_FRONTAL = 0, L_PARIETAL = 1, L_TEMPORAL = 2, L_OCCIPITAL = 3;
const IDS_LOBULOS = ['lobulo_frontal', 'lobulo_parietal', 'lobulo_temporal', 'lobulo_occipital'];
const B0 = [-0.3, -4.9, -8.1], B1 = [6.5, 5.7, 7.5];

const LOBULO = new Map([
  [G.frontal_superior, L_FRONTAL], [G.frontal_medio, L_FRONTAL], [G.frontal_inferior, L_FRONTAL], [G.precentral, L_FRONTAL], [G.orbitario, L_FRONTAL],
  [G.poscentral, L_PARIETAL], [G.supramarginal, L_PARIETAL], [G.angular, L_PARIETAL], [G.parietal_superior, L_PARIETAL],
  [G.temporal_superior, L_TEMPORAL], [G.temporal_medio, L_TEMPORAL], [G.temporal_inferior, L_TEMPORAL], [G.fusiforme, L_TEMPORAL], [G.parahipocampal, L_TEMPORAL],
  [G.occipital, L_OCCIPITAL],
]);
const OPERCULARES = new Set([G.frontal_inferior, G.precentral, G.poscentral, G.supramarginal, G.angular, G.orbitario]);

// Cara de corte medial (por el cuerpo calloso y el diencéfalo): lisa y sin surcos.
function zonaPlana(x, y, z) {
  const medial = 1 - smoothstep(0.14, 0.45, x);
  const q = Math.hypot(y / 1.6, (z + 0.2) / 2.8);
  return medial * (1 - smoothstep(0.9, 1.0, q));
}

// Giro de un punto de la superficie. Los giros que faltan en el paquete (temporal superior y
// orbitarios) se reconocen porque quedan lejos de cualquier giro real.
function crearEtiquetador(hem) {
  const g = new THREE.Vector3();
  return (x, y, z) => {
    gradienteSDF(hem.sdf, x, y, z, g, 0.05);
    let { e, d } = hem.etiqueta(x - g.x * 0.1, y - g.y * 0.1, z - g.z * 0.1);
    if (e === G.insula) e = G.temporal_superior; // superficie que cubre la ínsula: labio de la cisura
    if (d >= 2 && x > 2.3 && y < 1.3 && z > -4.6 && z < 3.4 && (OPERCULARES.has(e) || e === G.temporal_medio || e === G.temporal_superior)) e = G.temporal_superior;
    else if (d >= 3 && y < -0.4 && z > 1.0 && (LOBULO.get(e) === L_FRONTAL || e === 0)) e = G.orbitario;
    return e;
  };
}

// Profundidad del surco que separa dos giros (jerarquía anatómica).
function surcoEntre(a, b, p) {
  const s = new Set([a, b]);
  const tiene = (n) => s.has(n);
  if (tiene(G.precentral) && tiene(G.poscentral)) return { id: 'central', prof: 1.0, ancho: 0.095 };
  if (tiene(G.temporal_superior) && [...s].some((n) => OPERCULARES.has(n))) return { id: 'silvio', prof: 1.1, ancho: 0.07 };
  if (tiene(G.temporal_superior) && tiene(G.frontal_medio)) return { id: 'silvio', prof: 1.1, ancho: 0.07 };
  if (tiene(G.occipital)) {
    if (tiene(G.parietal_superior) && p[0] < 1.3) return { id: 'parietooccipital', prof: 0.6, ancho: 0.08 };
    return { prof: 0.2, ancho: 0.06 }; // límite lateral del lóbulo occipital: no es un surco marcado
  }
  if (tiene(G.cingulo)) return { id: 'cingulo', prof: 0.48, ancho: 0.08 };
  if (tiene(G.supramarginal) && tiene(G.angular)) return { prof: 0.26, ancho: 0.065 };
  return { prof: 0.4, ancho: 0.07 };
}

// Curvas de los límites entre giros sobre una malla gruesa (isolíneas de etiqueta).
function curvasDeLimites(gm, Lv, sdf) {
  const P = gm.attributes.position.array, I = gm.index.array;
  const pt = (a) => [P[a * 3], P[a * 3 + 1], P[a * 3 + 2]];
  const nodos = new Map();
  const nodo = (k, p) => { if (!nodos.has(k)) nodos.set(k, { p, segs: [] }); return k; };
  const grupos = new Map(); // par de giros -> segmentos
  const agregar = (k1, k2, a, b) => {
    const par = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (!grupos.has(par)) grupos.set(par, []);
    const lista = grupos.get(par);
    lista.push([k1, k2]);
  };
  const medio = (a, b) => { const p = pt(a), q = pt(b); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2]; };
  const ka = (a, b) => (a < b ? `${a}_${b}` : `${b}_${a}`);
  for (let t = 0; t < I.length; t += 3) {
    const v = [I[t], I[t + 1], I[t + 2]], l = v.map((q) => Lv[q]);
    if (l[0] === l[1] && l[1] === l[2]) continue;
    if (l.includes(0)) continue;
    const c = medio(v[0], v[1]);
    if (zonaPlana(c[0], c[1], c[2]) > 0.2) continue;
    const ar = [[0, 1], [1, 2], [2, 0]].filter(([i, j]) => l[i] !== l[j]);
    if (ar.length === 2) {
      const [i1, j1] = ar[0], [i2, j2] = ar[1];
      const k1 = nodo(ka(v[i1], v[j1]), medio(v[i1], v[j1])), k2 = nodo(ka(v[i2], v[j2]), medio(v[i2], v[j2]));
      // el par de giros del segmento: los dos lados de la línea
      const comun = [i1, j1].find((q) => q === i2 || q === j2);
      const otro = [i1, j1, i2, j2].find((q) => l[q] !== l[comun]);
      agregar(k1, k2, l[comun], l[otro]);
    } else {
      const cp = [(P[v[0] * 3] + P[v[1] * 3] + P[v[2] * 3]) / 3, (P[v[0] * 3 + 1] + P[v[1] * 3 + 1] + P[v[2] * 3 + 1]) / 3, (P[v[0] * 3 + 2] + P[v[1] * 3 + 2] + P[v[2] * 3 + 2]) / 3];
      const kc = nodo(`c${t}`, cp);
      for (const [i, j] of ar) agregar(nodo(ka(v[i], v[j]), medio(v[i], v[j])), kc, l[i], l[j]);
    }
  }
  // encadenar los segmentos de cada par en polilíneas
  const curvas = [];
  for (const [par, segs] of grupos) {
    const [a, b] = par.split('-').map(Number);
    const ady = new Map();
    segs.forEach(([k1, k2], i) => { for (const k of [k1, k2]) { if (!ady.has(k)) ady.set(k, []); ady.get(k).push(i); } });
    const usado = new Uint8Array(segs.length);
    const caminar = (inicio, si) => {
      const camino = [inicio];
      let k = inicio, s = si;
      while (s !== undefined && !usado[s]) {
        usado[s] = 1;
        const [k1, k2] = segs[s];
        k = k1 === k ? k2 : k1;
        camino.push(k);
        s = (ady.get(k) || []).find((q) => !usado[q]);
      }
      return camino;
    };
    const ordenInicio = [...ady.keys()].sort((p, q) => (ady.get(p).length === 2) - (ady.get(q).length === 2));
    for (const k of ordenInicio) {
      for (const s of ady.get(k)) {
        if (usado[s]) continue;
        const camino = caminar(k, s).map((q) => nodos.get(q).p);
        if (camino.length < 4) continue;
        // suavizado de Chaikin y proyección sobre la superficie
        let pts = camino;
        for (let it = 0; it < 2; it++) {
          const nuevo = [pts[0]];
          for (let i = 0; i < pts.length - 1; i++) {
            const p = pts[i], q = pts[i + 1];
            nuevo.push([0.75 * p[0] + 0.25 * q[0], 0.75 * p[1] + 0.25 * q[1], 0.75 * p[2] + 0.25 * q[2]], [0.25 * p[0] + 0.75 * q[0], 0.25 * p[1] + 0.75 * q[1], 0.25 * p[2] + 0.75 * q[2]]);
          }
          nuevo.push(pts[pts.length - 1]);
          pts = nuevo;
        }
        pts = pts.map((p) => aSuperficie(sdf, p.slice(), 3));
        let largo = 0;
        for (let i = 0; i < pts.length - 1; i++) largo += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1], pts[i + 1][2] - pts[i][2]);
        if (largo < 0.5) continue;
        const info = surcoEntre(a, b, pts[Math.floor(pts.length / 2)]);
        curvas.push({ ...info, pts, par: [a, b] });
      }
    }
  }
  return curvas;
}

// Surco calcarino: recorre la mitad de la cara medial del lóbulo occipital (cúneo arriba, lingual abajo).
function curvaCalcarina(gm, Lv, sdf) {
  const P = gm.attributes.position.array;
  const bins = new Map();
  for (let i = 0; i < Lv.length; i++) {
    if (Lv[i] !== G.occipital || P[i * 3] > 0.7) continue;
    const z = P[i * 3 + 2], y = P[i * 3 + 1];
    const b = Math.round(z / 0.45);
    if (!bins.has(b)) bins.set(b, []);
    bins.get(b).push(y);
  }
  const pts = [...bins.entries()].filter(([, ys]) => ys.length > 6).sort((p, q) => q[0] - p[0]).map(([b, ys]) => {
    const y = (Math.min(...ys) + Math.max(...ys)) / 2;
    return aSuperficie(sdf, [0.1, y, b * 0.45], 6);
  });
  return pts.length >= 3 ? pts.slice(1) : [];
}

function geoDeMalla(m) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(m.pos.slice(), 3));
  g.setIndex(new THREE.BufferAttribute(m.idx.slice(), 1));
  suavizarTaubin(g, 4);
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(m.pos.length).fill(1), 3));
  g.computeVertexNormals();
  g.computeBoundingSphere();
  return g;
}

function crearRelieve(campo, R, o) {
  return (x, y, z) => {
    const { surco, dmin, profCerca } = campo.consultar(x, y, z);
    const plano = zonaPlana(x, y, z);
    const kp = clamp(profCerca / 1.0, 0, 1);
    const A = 0.13 + 0.14 * kp, RG = 0.34 + 0.12 * kp;
    const k = 1 - clamp(dmin / RG, 0, 1);
    const hombro = A * (0.6 * (1 - Math.sqrt(Math.max(0, 1 - k * k))) + 0.4 * k * k);
    let disp = -(surco + hombro);
    disp += 0.008 * R(x * 1.6 + o, y * 1.6, z * 1.6);
    disp *= 1 - plano;
    return { disp, plano };
  };
}

function construirHemisferio(hem, R, off, detalle, semilla) {
  const sdf = hem.sdf;
  const etiquetar = crearEtiquetador(hem);
  // malla gruesa: muestras para los límites entre giros y para repartir los surcos menores
  const gm = superficieSDF(sdf, B0, B1, 0.11);
  relajarSobreSDF(gm, sdf, 2, 0.5);
  const Pm = gm.attributes.position.array;
  const Lm = new Uint8Array(Pm.length / 3);
  for (let i = 0; i < Lm.length; i++) Lm[i] = etiquetar(Pm[i * 3], Pm[i * 3 + 1], Pm[i * 3 + 2]);
  const limites = curvasDeLimites(gm, Lm, sdf);
  const calcarina = curvaCalcarina(gm, Lm, sdf);
  if (calcarina.length) limites.push({ id: 'calcarino', prof: 0.6, ancho: 0.08, pts: calcarina });

  const campo = campoSurcos({
    sdf, muestras: Pm, curvas: limites, nombrados: [], silvio: false,
    excluir: (x, y, z) => zonaPlana(x, y, z) > 0.02 || etiquetar(x, y, z) === G.temporal_superior,
    ruido: R, semilla,
  });
  // límite frontal/parietal en la cara medial: extremo superior del surco central
  const central = limites.filter((c) => c.id === 'central').flatMap((c) => c.pts);
  const altos = central.filter((p) => p[1] > 3.0);
  const zc = altos.length ? altos.reduce((s, p) => s + p[2], 0) / altos.length : -0.8;
  const lobulo = (x, y, z, e) => {
    if (LOBULO.has(e)) return LOBULO.get(e);
    if (e === G.cingulo || zonaPlana(x, y, z) > 0.3) return z > zc ? L_FRONTAL : L_PARIETAL;
    if (y < -1.2) return L_TEMPORAL;
    if (z < -4.6) return L_OCCIPITAL;
    return z > zc ? L_FRONTAL : L_PARIETAL;
  };

  // malla final
  const paso = 7.8 / detalle; // alta ≈ 0.054, ligera ≈ 0.108
  const geo = superficieSDF(sdf, B0, B1, paso);
  relajarSobreSDF(geo, sdf, 3, 0.5);
  const relieve = crearRelieve(campo, R, off);
  const pos = geo.attributes.position;
  const n = pos.count;
  const etiquetas = new Int8Array(n);
  const col = new Float32Array(n * 3);
  const g = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    etiquetas[i] = lobulo(x, y, z, etiquetar(x, y, z));
    const { disp, plano } = SIN_RELIEVE ? { disp: 0, plano: 0 } : relieve(x, y, z);
    gradienteSDF(sdf, x, y, z, g, 0.3);
    pos.setXYZ(i, x + g.x * disp, y + g.y * disp, z + g.z * disp);
    const occ = Math.pow(clamp((-disp - 0.04) / 0.42, 0, 1), 0.85);
    let r = 1 - occ * 0.7, gg = 1 - occ * 0.86, b = 1 - occ * 0.83;
    const v = Math.abs(R(x * 0.5 + off + 50, y * 0.5, z * 0.5));
    const venas = (1 - smoothstep(0.012, 0.06, v)) * smoothstep(0.2, 0.6, R(x * 0.28, y * 0.28 + 40, z * 0.28 + off));
    r -= venas * 0.1; gg -= venas * 0.2; b -= venas * 0.13;
    if (plano > 0.5) { r = 0.97; gg = 0.92; b = 0.88; }
    col[i * 3] = r; col[i * 3 + 1] = gg; col[i * 3 + 2] = b;
  }
  suavizarTaubin(geo, 3);
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();

  // anclas de las etiquetas, a partir de los giros reales
  const muestrasDe = (f) => { const r = []; for (let i = 0; i < Lm.length; i++) { const p = [Pm[i * 3], Pm[i * 3 + 1], Pm[i * 3 + 2]]; if (f(Lm[i], p)) r.push(p); } return r; };
  const centro = (ps) => (ps.length ? ps.reduce((s, p) => [s[0] + p[0], s[1] + p[1], s[2] + p[2]], [0, 0, 0]).map((v) => v / ps.length) : null);
  const masCercano = (ps, t) => { let m = null, dm = Infinity; for (const p of ps) { const d = (p[0] - t[0]) ** 2 + (p[1] - t[1]) ** 2 + (p[2] - t[2]) ** 2; if (d < dm) { dm = d; m = p; } } return m; };
  const mas = (p, d) => (p ? [p[0] + d[0], p[1] + d[1], p[2] + d[2]] : null);
  const anclas = {};
  const poner = (id, ps, t) => { if (!ps.length || !t) return; const p = masCercano(ps, t); if (p) anclas[id] = p.map((v) => +v.toFixed(3)); };
  const lat = (e) => muestrasDe((l, p) => l === e && p[0] > 1.5);
  const med = (e) => muestrasDe((l, p) => l === e && p[0] < 0.7);
  const cPre = centro(lat(G.precentral));
  poner('giro_precentral', lat(G.precentral), cPre);
  poner('corteza_premotora', [...lat(G.frontal_superior), ...lat(G.frontal_medio)], mas(cPre, [0, 1.0, 1.3]));
  poner('campo_ocular_frontal', lat(G.frontal_medio), mas(cPre, [0, 0.3, 1.2]));
  poner('area_broca', lat(G.frontal_inferior), mas(centro(lat(G.frontal_inferior)), [0, 0, -0.7]));
  poner('prefrontal_dorsolateral', lat(G.frontal_medio), mas(centro(lat(G.frontal_medio)), [0, 0, 1.3]));
  const orb = muestrasDe((l) => l === G.orbitario);
  poner('corteza_orbitofrontal', orb.length ? orb : muestrasDe((l, p) => LOBULO.get(l) === L_FRONTAL && p[1] < -0.5), centro(orb.length ? orb : muestrasDe((l, p) => LOBULO.get(l) === L_FRONTAL && p[1] < -0.5)));
  const cing = muestrasDe((l) => l === G.cingulo);
  poner('cingulado_anterior', cing.filter((p) => p[2] > zc), mas(centro(cing), [0, 0.2, 2.2]));
  poner('giro_poscentral', lat(G.poscentral), centro(lat(G.poscentral)));
  poner('lobulillo_parietal_superior', muestrasDe((l, p) => l === G.parietal_superior && p[0] > 0.9), centro(muestrasDe((l, p) => l === G.parietal_superior && p[0] > 0.9)));
  poner('giro_supramarginal', lat(G.supramarginal), centro(lat(G.supramarginal)));
  poner('giro_angular', lat(G.angular), centro(lat(G.angular)));
  poner('precuneo', med(G.parietal_superior), centro(med(G.parietal_superior)));
  const stg = lat(G.temporal_superior);
  poner('corteza_auditiva', stg, centro(stg));
  poner('area_wernicke', stg, mas(centro(stg), [0, 0.2, -1.6]));
  poner('giros_temporales', lat(G.temporal_medio), centro(lat(G.temporal_medio)));
  poner('giro_fusiforme', muestrasDe((l) => l === G.fusiforme), centro(muestrasDe((l) => l === G.fusiforme)));
  poner('temporal_medial', muestrasDe((l) => l === G.parahipocampal), centro(muestrasDe((l) => l === G.parahipocampal)));
  const occMed = med(G.occipital);
  const cMid = calcarina.length ? calcarina[Math.floor(calcarina.length * 0.55)] : centro(occMed);
  poner('corteza_visual_primaria', occMed, cMid);
  poner('cuneus', occMed, mas(cMid, [0, 0.9, 0.2]));
  poner('giro_lingual', occMed, mas(cMid, [0, -0.9, 0.2]));
  poner('corteza_asociacion_visual', lat(G.occipital), centro(lat(G.occipital)));

  return { lobs: dividirPorEtiquetas(geo, etiquetas, 4), anclas, nSurcos: limites.length };
}

// Estructuras profundas procedurales que no vienen en el paquete (coordenadas del lado derecho)
function geosProfundas(R) {
  const caudado = tubo(
    [[1.05, 0.0, 2.15], [1.15, 0.35, 1.5], [1.3, 0.6, 0.3], [1.5, 0.6, -1.2], [1.85, 0.15, -2.45], [2.35, -0.7, -2.35], [2.65, -1.3, -1.3]],
    (t) => 0.07 + 0.5 * Math.pow(1 - t, 1.8) * smoothstep(0, 0.06, t) + 0.05 * smoothstep(0, 0.04, t),
    90, 20,
  );
  const putamen = masa(36, [2.35, -0.45, 0.5], [0.42, 0.85, 1.45], (x, y, z) => 0.03 * R(x * 2, y * 2, z * 2));
  const palido = masa(30, [1.82, -0.55, 0.35], [0.3, 0.6, 0.85], (x, y, z) => 0.02 * R(x * 2 + 3, y * 2, z * 2));
  const amigdala = masa(30, [2.4, -2.1, 1.7], [0.46, 0.42, 0.5], (x, y, z) => 0.03 * R(x * 2.5, y * 2.5 + 7, z * 2.5));
  return { caudado, putamen, palido, amigdala };
}

function geoCuerpoCalloso() {
  return tubo(
    [[0, -0.6, 1.6], [0, 0.05, 2.45], [0, 0.75, 1.95], [0, 1.0, 0.4], [0, 0.96, -1.4], [0, 0.65, -2.7], [0, 0.15, -3.15], [0, -0.22, -2.8]],
    (t) => 0.16 + 0.09 * gauss(t - 0.14, 0.1) + 0.13 * gauss(t - 0.86, 0.08),
    120, 24, [1, 5.5],
  );
}

export function construirTelencefalo(detalle = 128) {
  const division = 'telencefalo';
  const grupo = new THREE.Group();
  grupo.name = division;
  const partes = [];
  const unidades = [];
  const R = crearRuido(7);
  const mallas = cargarMallas();
  const explosiones = {
    lobulo_frontal: [0.15, 0.25, 0.65],
    lobulo_parietal: [0.15, 0.6, -0.25],
    lobulo_temporal: [0.55, -0.55, 0.15],
    lobulo_occipital: [0.1, 0.1, -0.7],
    insula: [1.6, 0, 0.1],
  };
  const prof = geosProfundas(R);
  const insula = geoDeMalla(mallas.insula_der[0]);
  const hipocampo = geoDeMalla(mallas.hipocampo_der[0]);
  let anclas = {};

  for (const lado of ['der', 'izq']) {
    const s = lado === 'der' ? 1 : -1;
    const off = lado === 'der' ? 0 : 41.7;
    const ug = new THREE.Group();
    ug.name = `hemisferio_${lado}`;
    const unidad = {
      id: `hemisferio_${lado}`, lado, grupo: ug, partes: [],
      separacion: new THREE.Vector3(0.9 * s, 0, 0),
      actual: new THREE.Vector3(), objetivo: new THREE.Vector3(),
    };
    const hem = construirHemisferio(cargarHemisferio(lado), R, off, detalle, lado === 'der' ? 11 : 23);
    if (lado === 'der') anclas = hem.anclas;
    const ex = (v) => [v[0] * s, v[1], v[2]];
    const fix = (g) => (lado === 'der' ? g : espejarX(g));

    hem.lobs.forEach((geo, i) => {
      if (!geo) return;
      const p = crearParte({ id: IDS_LOBULOS[i], division, lado, geometrias: [fix(geo)], explosion: ex(explosiones[IDS_LOBULOS[i]]) });
      p.unidad = unidad; unidad.partes.push(p); partes.push(p); ug.add(p.grupo);
    });
    const ins = crearParte({ id: 'insula', division, lado, geometrias: [fix(insula)], explosion: ex(explosiones.insula) });
    ins.unidad = unidad; unidad.partes.push(ins); partes.push(ins); ug.add(ins.grupo);

    const profundas = [
      ['nucleo_caudado', prof.caudado], ['putamen', prof.putamen], ['globo_palido', prof.palido],
      ['hipocampo', hipocampo], ['amigdala', prof.amigdala],
    ];
    for (const [id, gp] of profundas) {
      const p = crearParte({ id, division, lado, geometrias: [fix(gp)], profunda: true });
      p.unidad = unidad; unidad.partes.push(p); partes.push(p); ug.add(p.grupo);
    }
    unidades.push(unidad);
    grupo.add(ug);
  }
  const cc = crearParte({ id: 'cuerpo_calloso', division, lado: null, geometrias: [geoCuerpoCalloso()], profunda: true });
  partes.push(cc);
  grupo.add(cc.grupo);

  // ínsula: anclas sobre la malla real
  insula.computeBoundingBox();
  const bi = insula.boundingBox;
  const cx = bi.max.x, cy = (bi.min.y + bi.max.y) / 2;
  anclas.insula_anterior = [+cx.toFixed(3), +cy.toFixed(3), +(bi.min.z + (bi.max.z - bi.min.z) * 0.72).toFixed(3)];
  anclas.insula_posterior = [+cx.toFixed(3), +cy.toFixed(3), +(bi.min.z + (bi.max.z - bi.min.z) * 0.3).toFixed(3)];

  return { id: division, grupo, partes, unidades, anclas, espejarAnclas: true };
}
