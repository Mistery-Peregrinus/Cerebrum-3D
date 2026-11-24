// Cerebelo: vermis, lóbulos anterior/posterior/floculonodular, pedúnculos y núcleos profundos.
import * as THREE from 'three';
import {
  crearRuido, sdElipsoide as E, smin, smax, smoothstep, gauss, clamp, difAngulo,
  esferaUnitaria, envolverSDF, gradienteSDF, dividirPorEtiquetas, espejarX, masa, tubo, suavizarTaubin,
} from './util.js';
import { crearParte } from './partes.js';

const YC = -4.0, ZC = -5.0;

function sdfCerebelo(x, y, z) {
  const hd = E(x, y, z, 2.15, -4.05, -5.25, 2.55, 1.6, 2.3);
  const hi = E(x, y, z, -2.15, -4.05, -5.25, 2.55, 1.6, 2.3);
  const v = E(x, y, z, 0, -4.0, -5.55, 1.0, 1.75, 2.15);
  let d = smin(smin(hd, hi, 0.8), v, 0.8);
  d = smax(d, -E(x, y, z, 0, -4.3, -2.5, 1.35, 2.2, 1.6), 0.45); // escotadura anterior (IV ventrículo)
  d = smax(d, -E(x, y, z, 0, -4.0, -8.0, 0.45, 1.2, 0.9), 0.3); // escotadura posterior
  return d;
}

const V_VERMIS = 0, V_ANT = 1, V_POST = 2, V_NOD = 3;

function construirCorteza(R, detalle) {
  const geo = esferaUnitaria(detalle);
  envolverSDF(geo, new THREE.Vector3(0, -4.0, -5.4), sdfCerebelo, 8);
  const pos = geo.attributes.position;
  const n = pos.count;
  const et = new Int8Array(n);
  const col = new Float32Array(n * 3);
  const g = new THREE.Vector3();
  const N = 46;
  for (let i = 0; i < n; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const th0 = Math.atan2(y - YC, -(z - ZC));
    const th = th0 + 0.05 * R(x * 0.7, y * 0.7, z * 0.7) + 0.02 * x * x;
    const f = (th * N) / (2 * Math.PI);
    const fr = f - Math.floor(f);
    let disp = -0.075 * gauss(fr - 0.5, 0.13);
    disp -= 0.26 * gauss(difAngulo(th0, 2.0), 0.035); // fisura primaria
    disp -= 0.2 * gauss(difAngulo(th0, -0.12), 0.03) * smoothstep(0.8, 1.5, Math.abs(x)); // fisura horizontal
    disp -= 0.22 * gauss(difAngulo(th0, -2.35), 0.04); // fisura posterolateral
    const ax = Math.abs(x) + 0.08 * R(y * 1.5, z * 1.5, 3);
    disp -= 0.18 * gauss(ax - 0.82, 0.1) * smoothstep(0.3, -0.6, Math.sin(th0)); // surcos paravermianos
    disp += 0.01 * R(x * 6, y * 6, z * 6);
    gradienteSDF(sdfCerebelo, x, y, z, g, 0.02);
    pos.setXYZ(i, x + g.x * disp, y + g.y * disp, z + g.z * disp);
    const occ = clamp(-disp / 0.2, 0, 1);
    col[i * 3] = 1 - occ * 0.4; col[i * 3 + 1] = 1 - occ * 0.58; col[i * 3 + 2] = 1 - occ * 0.55;
    let e;
    if (ax < 0.8) e = th0 < -2.25 ? V_NOD : V_VERMIS;
    else e = th0 > 2.0 ? V_ANT : V_POST;
    et[i] = e;
  }
  suavizarTaubin(geo, 3);
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  return dividirPorEtiquetas(geo, et, 4);
}

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
  const [gVermis, gAnt, gPost, gNod] = construirCorteza(R, detalle);

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
    crearParte({ id: 'lobulo_floculonodular', division, geometrias: [gNod, flocD, flocI], explosion: [0, -0.75, 0.7] }),
    crearParte({ id: 'pedunculos_cerebelosos', division, geometrias: peds, explosion: [0, 0, 0.6] }),
    crearParte({ id: 'nucleos_cerebelosos', division, geometrias: nucleosTodos, profunda: true }),
  ];
  for (const p of partes) grupo.add(p.grupo);
  return { id: division, grupo, partes, unidades: [], anclas: ANCLAS_CEREBELO, espejarAnclas: false };
}
