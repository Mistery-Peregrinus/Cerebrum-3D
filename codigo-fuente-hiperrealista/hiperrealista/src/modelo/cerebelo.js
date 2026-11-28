// Cerebelo: vermis, lóbulos anterior/posterior/floculonodular, pedúnculos y núcleos profundos.
import * as THREE from 'three';
import {
  crearRuido, sdElipsoide as E, smin, smax, smoothstep, gauss, clamp, difAngulo,
  esferaUnitaria, envolverSDF, gradienteSDF, dividirPorEtiquetas, espejarX, masa, tubo, suavizarTaubin, subdividir,
} from './util.js';
import { crearParte } from './partes.js';
import { cargarMallas } from './bp3d.js';

const YC = -4.0, ZC = -5.0;

function sdfCerebelo(x, y, z) {
  const hd = E(x, y, z, 2.15, -4.25, -5.25, 2.55, 1.8, 2.3);
  const hi = E(x, y, z, -2.15, -4.25, -5.25, 2.55, 1.8, 2.3);
  const v = E(x, y, z, 0, -4.2, -5.55, 1.0, 1.95, 2.15);
  let d = smin(smin(hd, hi, 0.8), v, 0.8);
  d = smax(d, -E(x, y, z, 0, -4.3, -2.5, 1.35, 2.2, 1.6), 0.45); // escotadura anterior (IV ventrículo)
  d = smax(d, -E(x, y, z, 0, -4.0, -8.0, 0.45, 1.2, 0.9), 0.3); // escotadura posterior
  return d;
}

const V_VERMIS = 0, V_ANT = 1, V_POST = 2, V_NOD = 3;

// Corteza cerebelosa real (BodyParts3D, CC BY 4.0), con sus folias, dividida en vermis y lóbulos.
// El hilio (entrada de los pedúnculos) está por delante: los lóbulos se separan por el ángulo
// alrededor de él (fisura primaria entre el lóbulo anterior y el posterior).
function construirCorteza(detalle) {
  const ms = cargarMallas().cerebelo;
  let nv = 0, ni = 0;
  for (const m of ms) { nv += m.pos.length / 3; ni += m.idx.length; }
  const pos = new Float32Array(nv * 3);
  let idx = new Uint32Array(ni);
  let ov = 0, oi = 0;
  for (const m of ms) { pos.set(m.pos, ov * 3); for (let k = 0; k < m.idx.length; k++) idx[oi + k] = m.idx[k] + ov; ov += m.pos.length / 3; oi += m.idx.length; }
  let geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  // la malla reducida se subdivide dos veces, se suaviza y se le tallan folias finas encima
  if (detalle >= 100) geo = subdividir(geo);
  suavizarTaubin(geo, detalle >= 100 ? 5 : 2);
  geo.computeVertexNormals();
  if (detalle >= 100) {
    const Pq = geo.attributes.position.array, Nq = geo.attributes.normal.array;
    const R2 = crearRuido(33);
    const HY0 = -4.3, HZ0 = -1.55, NF = 110;
    for (let i = 0; i < Pq.length / 3; i++) {
      const x = Pq[i * 3], y = Pq[i * 3 + 1], z = Pq[i * 3 + 2];
      const th0 = Math.atan2(y - HY0, -(z - HZ0));
      const rr = Math.hypot(y - HY0, z - HZ0);
      const th = th0 + 0.04 * R2(x * 0.6, y * 0.6, z * 0.6) + 0.01 * x * x;
      const fq = (th * NF) / (2 * Math.PI);
      const nit = smoothstep(0.9, 1.9, rr);
      let d = -0.05 * nit * gauss(fq - Math.floor(fq) - 0.5, 0.17);
      const f2 = (th * NF) / (2 * Math.PI * 5.5);
      d -= 0.05 * nit * gauss(f2 - Math.floor(f2) - 0.5, 0.045);
      d -= 0.16 * nit * gauss(difAngulo(th0, 0.95), 0.022);
      Pq[i * 3] += Nq[i * 3] * d; Pq[i * 3 + 1] += Nq[i * 3 + 1] * d; Pq[i * 3 + 2] += Nq[i * 3 + 2] * d;
    }
  }
  geo.computeVertexNormals();
  nv = geo.attributes.position.count;
  // sombra en el fondo de las folias: concavidad local (vecinos por encima de la normal)
  const P = geo.attributes.position.array, Nn = geo.attributes.normal.array;
  idx = geo.index.array;
  const suma = new Float32Array(nv * 3), cuenta = new Uint16Array(nv);
  for (let t = 0; t < idx.length; t += 3) {
    for (let q = 0; q < 3; q++) {
      const a = idx[t + q], b = idx[t + (q + 1) % 3];
      for (let c = 0; c < 3; c++) { suma[a * 3 + c] += P[b * 3 + c]; suma[b * 3 + c] += P[a * 3 + c]; }
      cuenta[a]++; cuenta[b]++;
    }
  }
  const col = new Float32Array(nv * 3);
  const et = new Int8Array(nv);
  const HY = -4.3, HZ = -1.55;
  for (let i = 0; i < nv; i++) {
    const x = P[i * 3], y = P[i * 3 + 1], z = P[i * 3 + 2];
    let cv = 0;
    for (let c = 0; c < 3; c++) cv += (suma[i * 3 + c] / Math.max(1, cuenta[i]) - P[i * 3 + c]) * Nn[i * 3 + c];
    const occ = clamp(cv / 0.012, 0, 1);
    col[i * 3] = 1 - occ * 0.42; col[i * 3 + 1] = 1 - occ * 0.6; col[i * 3 + 2] = 1 - occ * 0.57;
    const th0 = Math.atan2(y - HY, -(z - HZ));
    const ax = Math.abs(x);
    let e;
    if (ax < 0.75 && y < -4.9 && z > -2.9) e = V_NOD;
    else if (ax < 0.75) e = V_VERMIS;
    else e = th0 > 0.95 ? V_ANT : V_POST;
    et[i] = e;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return dividirPorEtiquetas(geo, et, 4);
}

// La malla real queda 1.73 cm más adelante que el cerebelo procedural original:
// pedúnculos, núcleos y anclas se desplazan igual.
const DZ = 1.73;

export const ANCLAS_CEREBELO = {
  vermis_superior: [0, -1.9, -5.6],
  vermis_inferior: [0, -6.0, -6.3],
  fisura_primaria: [1.8, -2.1, -4.2],
  fisura_horizontal: [3.0, -4.25, -7.7],
  amigdalas_cerebelosas: [0.95, -6.0, -4.8],
  corteza_cerebelosa: [3.3, -2.9, -6.3],
  floculo: [2.85, -4.9, -3.0],
  nodulo: [0, -5.1, -3.5],
  pedunculo_superior: [0.8, -2.45, -2.9],
  pedunculo_medio: [1.75, -3.45, -2.8],
  pedunculo_inferior: [1.05, -5.2, -3.2],
  nucleo_dentado: [1.45, -4.0, -4.9],
  nucleos_interpuestos: [0.72, -3.85, -4.7],
  nucleo_fastigio: [0.25, -3.75, -4.5],
};

export function construirCerebelo(detalle = 110) {
  const division = 'cerebelo';
  const grupo = new THREE.Group();
  grupo.name = division;
  const R = crearRuido(31);
  const [gVermis, gAnt, gPost, gNod] = construirCorteza(detalle);

  const folia = (cy, cz) => (x, y, z) => {
    const th = Math.atan2(y - cy, -(z - cz));
    const f = (th * 9) / Math.PI;
    return -0.05 * gauss(f - Math.floor(f) - 0.5, 0.14);
  };
  const flocD = masa(30, [2.55, -4.75, -3.35], [0.45, 0.33, 0.45], folia(-4.75, -3.35), 3);
  const flocI = espejarX(flocD);

  const peds = [];
  const trazos = {
    sup: [[[0.55, -2.05, -2.05], [0.75, -2.6, -2.9], [0.9, -3.2, -3.8]], 0.24],
    med: [[[1.25, -3.65, -2.0], [1.6, -3.8, -2.8], [1.85, -3.95, -3.7]], 0.55],
    inf: [[[0.62, -5.15, -2.75], [0.9, -4.9, -3.2], [1.1, -4.55, -3.9]], 0.27],
  };
  for (const [pts, r] of Object.values(trazos)) {
    const g = tubo(pts, (t) => r * (1 - 0.15 * t), 30, 18, [1, 1], (t, a) => 0.015 * Math.sin(a * 9 + t * 20));
    peds.push(g, espejarX(g));
  }

  const dentD = masa(44, [1.45, -4.0, -4.9], [0.36, 0.46, 0.62], (x, y, z) => 0.06 * Math.sin(y * 22 + z * 9) * Math.cos(z * 14));
  const empD = masa(18, [0.85, -3.85, -4.65], [0.13, 0.24, 0.3]);
  const globD = masa(18, [0.58, -3.92, -4.8], [0.13, 0.15, 0.17]);
  const fasD = masa(18, [0.25, -3.75, -4.5], [0.14, 0.15, 0.2]);
  const nucleos = [dentD, empD, globD, fasD];
  const nucleosTodos = [...nucleos, ...nucleos.map(espejarX)];

  const partes = [
    crearParte({ id: 'vermis', division, geometrias: [gVermis], explosion: [0, 0.1, -0.25] }),
    crearParte({ id: 'lobulo_anterior', division, geometrias: [gAnt], explosion: [0, 0.6, 0.25] }),
    crearParte({ id: 'lobulo_posterior', division, geometrias: [gPost], explosion: [0, -0.25, -0.65] }),
    crearParte({ id: 'lobulo_floculonodular', division, geometrias: [gNod], explosion: [0, -0.75, 0.7] }),
    crearParte({ id: 'pedunculos_cerebelosos', division, geometrias: peds, explosion: [0, 0, 0.6] }),
    crearParte({ id: 'nucleos_cerebelosos', division, geometrias: nucleosTodos, profunda: true }),
  ];
  for (const p of partes) {
    if (p.id === 'pedunculos_cerebelosos' || p.id === 'nucleos_cerebelosos') for (const m of p.meshes) m.geometry.translate(0, 0, DZ);
    grupo.add(p.grupo);
  }
  const anclas = Object.fromEntries(Object.entries(ANCLAS_CEREBELO).map(([k, v]) => [k, [v[0], v[1], v[2] + DZ]]));
  return { id: division, grupo, partes, unidades: [], anclas, espejarAnclas: false };
}
