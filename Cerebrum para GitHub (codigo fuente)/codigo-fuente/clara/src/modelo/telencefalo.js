// Telencéfalo (v2): hemisferios con circunvoluciones procedurales suaves, proporciones
// realistas, divididos en lóbulos, más la ínsula y estructuras profundas.
// Sistema de coordenadas (1 unidad ≈ 1 cm): x = izquierda(-)/derecha(+), y = arriba, z = anterior(+).
import * as THREE from 'three';
import {
  crearRuido, sdElipsoide as E, smin, smax, smoothstep, gauss, clamp,
  esferaUnitaria, envolverSDF, gradienteSDF, dividirPorEtiquetas, espejarX, masa, tubo, suavizarTaubin,
} from './util.js';
import { crearParte } from './partes.js';

const L_FRONTAL = 0, L_PARIETAL = 1, L_TEMPORAL = 2, L_OCCIPITAL = 3;
const IDS_LOBULOS = ['lobulo_frontal', 'lobulo_parietal', 'lobulo_temporal', 'lobulo_occipital'];

// --- forma base del hemisferio derecho (unión suave de elipsoides) ----------
// Proporciones aproximadas de un encéfalo adulto: largo ≈ 15 cm, ancho ≈ 13 cm, alto ≈ 9 cm.
function piezas(x, y, z) {
  const a = E(x, y, z, 3.1, 1.0, -0.5, 3.3, 3.9, 7.0);
  const f = E(x, y, z, 2.75, 0.9, 3.4, 2.8, 3.4, 3.7);
  const pa = E(x, y, z, 3.0, 2.1, -2.2, 3.35, 3.1, 3.8);
  const o = E(x, y, z, 2.5, 0.6, -4.8, 2.45, 2.8, 2.9);
  const t = E(x, y, z, 3.75, -1.85, -0.2, 2.45, 1.95, 3.7);
  let sup = smin(a, f, 1.4);
  sup = smin(sup, pa, 1.4);
  sup = smin(sup, o, 1.2);
  return { sup, t };
}

export function sdfHemisferio(x, y, z) {
  const { sup, t } = piezas(x, y, z);
  let d = smin(sup, t, 1.2);
  d = smax(d, 0.12 - x, 0.4); // cara medial (cisura interhemisférica)
  return d;
}

const surcoCentralZ = (y) => 0.35 - 0.36 * y + 0.2 * Math.sin(2.3 * y) + 0.12 * Math.sin(5.1 * y + 1.3);
function zParietoOccipital(x, y) {
  const med = -3.3 - 0.3 * y;
  const lat = -4.1 - 0.1 * y;
  return med + (lat - med) * smoothstep(0.6, 2.2, x);
}

function clasificar(x, y, z, sup, t) {
  if (z < zParietoOccipital(x, y)) return L_OCCIPITAL;
  const temporal = (t < sup && z > -3.9) || (y < -1.8 && z < 2.6 && z > -3.9);
  if (temporal) return L_TEMPORAL;
  return z > surcoCentralZ(y) ? L_FRONTAL : L_PARIETAL;
}

// --- relieve: circunvoluciones (giros) y surcos ------------------------------
function relieve(x, y, z, sup, t, lob, R, o) {
  const q = 0.42;
  const wx = R(x * q + o, y * q, z * q) * 0.7;
  const wy = R(x * q, y * q + o + 5.2, z * q) * 0.7;
  const wz = R(x * q, y * q, z * q + o + 9.7) * 0.7;
  const px = x + wx, py = y + wy, pz = z + wz;
  // distancia aproximada a la línea de surco = |n| / |∇n|
  const f = 0.74, e = 0.04;
  const n0 = R(px * f + o, py * f, pz * f);
  const gxn = R((px + e) * f + o, py * f, pz * f) - n0;
  const gyn = R(px * f + o, (py + e) * f, pz * f) - n0;
  const gzn = R(px * f + o, py * f, (pz + e) * f) - n0;
  const gl = Math.hypot(gxn, gyn, gzn) / e + 1e-3;
  let dn = Math.min(Math.abs(n0) / gl, 1.5);

  const zc = surcoCentralZ(y);
  const dc = Math.abs(z - zc);
  const ang = Math.atan2(y - 0.6, x - 2.7) + 0.08 * R(x * 0.9, y * 0.9, z * 0.9 + o);
  const encima = lob === L_FRONTAL || lob === L_PARIETAL;
  const medial = 1 - smoothstep(0.35, 1.0, x);

  if (encima) dn += (1 - smoothstep(0.7, 1.2, dc)) * 0.12; // giros pre/poscentral
  let dm = dn;
  if (encima) {
    const ond = 0.16 * Math.sin(y * 3.1 + x) + 0.14 * R(x * 1.3, y * 1.3, z + o);
    dm = Math.min(dm, Math.abs(z - (zc + 0.82 + ond)) + medial * 0.4 + 0.12, Math.abs(z - (zc - 0.82 - ond)) + medial * 0.4 + 0.12);
  }
  if (lob === L_FRONTAL) {
    const k = smoothstep(zc + 1.4, zc + 2.1, z) * (1 - smoothstep(5.3, 6.6, z)) * (1 - medial);
    dm = Math.min(dm,
      Math.abs(ang - 1.12) * 3.6 + (1 - k) * 3,
      Math.abs(ang - 0.42) * 3.8 + (1 - k) * 3);
  }
  if (lob === L_PARIETAL) {
    const k = (1 - smoothstep(zc - 2.1, zc - 1.4, z)) * smoothstep(-4.4, -3.6, z) * (1 - medial);
    dm = Math.min(dm, Math.abs(ang - 0.85) * 3.6 + (1 - k) * 3);
  }
  if (lob === L_TEMPORAL) {
    const prof = sup - t;
    const k = smoothstep(1.6, 2.6, x);
    dm = Math.min(dm, Math.abs(prof - 0.9) * 1.3 + (1 - k) * 3, Math.abs(prof - 1.9) * 1.3 + (1 - k) * 3);
  }

  // perfil del giro: corona redondeada, surco estrecho y poco profundo
  const gy = clamp(dm / 0.5, 0, 1);
  const hondo = 0.24 * (0.85 + 0.3 * R(x * 0.5 + 11, y * 0.5, z * 0.5 + o));
  let disp = -hondo * (1 - Math.sin(gy * Math.PI * 0.5));

  // surco central (cisura de Rolando): apenas más marcado que los demás
  if (encima) {
    const wc = x < 0.9 ? smoothstep(2.4, 3.4, y) : 1;
    disp -= 0.13 * wc * gauss(dc, 0.13);
  }
  // surco lateral (cisura de Silvio): fisura fina, no una zanja
  const dS = Math.abs(t - sup);
  const wS = smoothstep(-3.0, -2.3, z) * (1 - smoothstep(3.0, 3.6, z)) * smoothstep(1.8, 2.8, x) * smoothstep(-3.0, -2.3, y);
  disp -= 0.42 * wS * gauss(dS, 0.17);
  // surco parietooccipital (cara medial)
  const zpo = zParietoOccipital(x, y);
  disp -= 0.36 * medial * smoothstep(-0.4, 0.2, y) * gauss(z - zpo, 0.15);
  // surco calcarino
  if (z < zpo + 0.2) {
    const yCa = 0.15 + 0.12 * (z + 4.5);
    disp -= 0.32 * medial * gauss(y - yCa, 0.13);
  }
  // surco del cíngulo y zona lisa del corte medial
  const qe = Math.hypot((y - 0.35) / 2.2, (z + 0.45) / 3.9);
  const dCi = Math.abs(qe - 1) * 2.6;
  disp -= 0.26 * medial * smoothstep(-0.2, 0.5, y) * gauss(dCi, 0.14);
  const plano = medial * (1 - smoothstep(0.6, 0.72, qe));
  disp *= 1 - plano;
  return { disp, plano };
}

function construirHemisferio(R, off, detalle) {
  const geo = esferaUnitaria(detalle);
  const centro = new THREE.Vector3(3.1, 0.4, -0.4);
  envolverSDF(geo, centro, sdfHemisferio, 12);
  const pos = geo.attributes.position;
  const n = pos.count;
  const etiquetas = new Int8Array(n);
  const col = new Float32Array(n * 3);
  const g = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const { sup, t } = piezas(x, y, z);
    const lob = clasificar(x, y, z, sup, t);
    etiquetas[i] = lob;
    const { disp, plano } = relieve(x, y, z, sup, t, lob, R, off);
    gradienteSDF(sdfHemisferio, x, y, z, g, 0.02);
    pos.setXYZ(i, x + g.x * disp, y + g.y * disp, z + g.z * disp);
    // color de tejido: surcos rojizos (vasos de la piamadre) y venas superficiales tenues
    const occ = Math.pow(clamp(-disp / 0.22, 0, 1), 0.8);
    let r = 1 - occ * 0.48, gg = 1 - occ * 0.7, b = 1 - occ * 0.66;
    const v = Math.abs(R(x * 0.5 + off + 50, y * 0.5, z * 0.5));
    const venas = (1 - smoothstep(0.015, 0.075, v)) * smoothstep(0.2, 0.6, R(x * 0.28, y * 0.28 + 40, z * 0.28 + off));
    r -= venas * 0.1; gg -= venas * 0.2; b -= venas * 0.13;
    if (plano > 0.5) { r = 0.97; gg = 0.92; b = 0.88; }
    col[i * 3] = r; col[i * 3 + 1] = gg; col[i * 3 + 2] = b;
  }
  suavizarTaubin(geo, 5);
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  return dividirPorEtiquetas(geo, etiquetas, 4);
}

function geoInsula(R, off) {
  const g = masa(64, [4.25, -0.3, 0.5], [0.42, 1.05, 1.85], (x, y, z, nx) => {
    const a = Math.atan2(y + 1.0, z - 1.9);
    const ridge = Math.abs(Math.cos(a * 7 + R(x * 0.8 + off, y * 0.8, z * 0.8) * 0.8));
    return (0.07 * ridge - 0.045) * smoothstep(-0.2, 0.6, nx);
  }, 1.6);
  suavizarTaubin(g, 2);
  g.computeVertexNormals();
  return g;
}

// Estructuras profundas (coordenadas del lado derecho)
function geosProfundas(R) {
  const caudado = tubo(
    [[1.05, 0.2, 2.15], [1.15, 0.6, 1.5], [1.3, 0.95, 0.3], [1.5, 0.95, -1.2], [1.85, 0.45, -2.45], [2.35, -0.45, -2.35], [2.65, -1.05, -1.3]],
    (t) => 0.07 + 0.5 * Math.pow(1 - t, 1.8) * smoothstep(0, 0.06, t) + 0.05 * smoothstep(0, 0.04, t),
    90, 20,
  );
  const putamen = masa(36, [2.35, -0.15, 0.5], [0.42, 0.85, 1.45], (x, y, z) => 0.03 * R(x * 2, y * 2, z * 2));
  const palido = masa(30, [1.82, -0.25, 0.35], [0.3, 0.6, 0.85], (x, y, z) => 0.02 * R(x * 2 + 3, y * 2, z * 2));
  const hipocampo = tubo(
    [[2.75, -1.85, 1.35], [2.6, -1.72, 0.3], [2.3, -1.4, -1.0], [1.8, -0.85, -2.15], [1.3, -0.3, -2.7]],
    (t) => 0.13 + 0.32 * Math.pow(1 - t, 1.3),
    80, 20, [1, 1.3],
    (t, a) => 0.05 * Math.sin(t * 46) * (1 - smoothstep(0.15, 0.45, t)) * Math.max(0, Math.cos(a)),
  );
  const amigdala = masa(30, [2.6, -1.72, 2.2], [0.46, 0.42, 0.5], (x, y, z) => 0.03 * R(x * 2.5, y * 2.5 + 7, z * 2.5));
  return { caudado, putamen, palido, hipocampo, amigdala };
}

function geoCuerpoCalloso() {
  return tubo(
    [[0, -0.25, 1.6], [0, 0.45, 2.45], [0, 1.15, 1.95], [0, 1.42, 0.4], [0, 1.38, -1.4], [0, 1.05, -2.7], [0, 0.55, -3.15], [0, 0.18, -2.8]],
    (t) => 0.16 + 0.09 * gauss(t - 0.14, 0.1) + 0.13 * gauss(t - 0.86, 0.08),
    120, 24, [1, 5.5],
  );
}

export const ANCLAS_TELENCEFALO = {
  giro_precentral: [5.9, 2.8, -0.1],
  corteza_premotora: [4.4, 4.2, 1.2],
  campo_ocular_frontal: [5.4, 2.0, 1.9],
  area_broca: [6.3, -0.1, 2.4],
  prefrontal_dorsolateral: [4.8, 2.3, 4.8],
  corteza_orbitofrontal: [2.6, -2.7, 5.0],
  cingulado_anterior: [-0.4, 1.0, 2.6],
  giro_poscentral: [5.6, 2.4, -1.0],
  lobulillo_parietal_superior: [3.2, 5.1, -3.0],
  giro_supramarginal: [6.0, 1.2, -2.3],
  giro_angular: [5.4, 1.0, -3.6],
  precuneo: [-0.4, 2.0, -3.3],
  corteza_auditiva: [6.2, -1.0, -0.4],
  area_wernicke: [6.0, -0.4, -2.3],
  giros_temporales: [6.1, -2.2, 0.6],
  giro_fusiforme: [3.3, -4.3, -1.2],
  temporal_medial: [1.6, -3.3, 1.6],
  corteza_visual_primaria: [-0.4, 0.0, -6.2],
  cuneus: [-0.4, 1.4, -5.6],
  giro_lingual: [-0.4, -1.2, -5.6],
  corteza_asociacion_visual: [4.4, 0.4, -5.9],
  insula_anterior: [5.1, -0.5, 1.4],
  insula_posterior: [5.1, 0.0, -0.4],
};

export function construirTelencefalo(detalle = 128) {
  const division = 'telencefalo';
  const grupo = new THREE.Group();
  grupo.name = division;
  const partes = [];
  const unidades = [];

  const R = crearRuido(7);
  const explosiones = {
    lobulo_frontal: [0.15, 0.25, 0.65],
    lobulo_parietal: [0.15, 0.6, -0.25],
    lobulo_temporal: [0.55, -0.55, 0.15],
    lobulo_occipital: [0.1, 0.1, -0.7],
    insula: [1.6, 0, 0.1],
  };
  const prof = geosProfundas(R);

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
    const lobs = construirHemisferio(R, off, detalle);
    const ex = (v) => [v[0] * s, v[1], v[2]];
    const fix = (g) => (lado === 'der' ? g : espejarX(g));

    lobs.forEach((geo, i) => {
      const p = crearParte({ id: IDS_LOBULOS[i], division, lado, geometrias: [fix(geo)], explosion: ex(explosiones[IDS_LOBULOS[i]]) });
      p.unidad = unidad; unidad.partes.push(p); partes.push(p); ug.add(p.grupo);
    });
    const ins = crearParte({ id: 'insula', division, lado, geometrias: [fix(geoInsula(R, off))], explosion: ex(explosiones.insula) });
    ins.unidad = unidad; unidad.partes.push(ins); partes.push(ins); ug.add(ins.grupo);

    const profundas = [
      ['nucleo_caudado', prof.caudado], ['putamen', prof.putamen], ['globo_palido', prof.palido],
      ['hipocampo', prof.hipocampo], ['amigdala', prof.amigdala],
    ];
    for (const [id, g] of profundas) {
      const p = crearParte({ id, division, lado, geometrias: [fix(g)], profunda: true });
      p.unidad = unidad; unidad.partes.push(p); partes.push(p); ug.add(p.grupo);
    }
    unidades.push(unidad);
    grupo.add(ug);
  }
  const cc = crearParte({ id: 'cuerpo_calloso', division, lado: null, geometrias: [geoCuerpoCalloso()], profunda: true });
  partes.push(cc);
  grupo.add(cc.grupo);

  return { id: division, grupo, partes, unidades, anclas: ANCLAS_TELENCEFALO, espejarAnclas: true };
}
