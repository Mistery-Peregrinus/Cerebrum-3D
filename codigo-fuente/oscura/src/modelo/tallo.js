// Tallo cerebral (tronco del encéfalo): mesencéfalo, puente y bulbo raquídeo,
// con la emergencia de los nervios craneales III–XII.
import * as THREE from 'three';
import { crearRuido, smoothstep, gauss, difAngulo, clamp, dividirPorEtiquetas, tubo, espejarX } from './util.js';
import { crearParte } from './partes.js';

const NERVIO = 0xeee2c4;
const ARRIBA = new THREE.Vector3(0, -1.0, -0.6);
const ABAJO = new THREE.Vector3(0, -7.8, -2.8);
const EJE = ABAJO.clone().sub(ARRIBA);
const LARGO = EJE.length();
EJE.normalize();
const ANT = new THREE.Vector3(0, -EJE.z, EJE.y).normalize(); // perpendicular, hacia anterior
if (ANT.z < 0) ANT.negate();
const LAT = new THREE.Vector3(1, 0, 0);

const T_MES = 0.245, T_PUE = 0.555, T_BUL = 0.9;

function interp(t, pts) {
  if (t <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (t <= pts[i][0]) {
      const [t0, v0] = pts[i - 1], [t1, v1] = pts[i];
      const u = (t - t0) / (t1 - t0);
      const s = u * u * (3 - 2 * u);
      return v0 + (v1 - v0) * s;
    }
  }
  return pts[pts.length - 1][1];
}

const BASE = [[0, 0.35], [0.025, 1.0], [0.06, 1.2], [0.08, 1.22], [0.2, 1.12], [0.26, 1.1], [0.4, 1.25], [0.55, 1.08], [0.6, 1.0], [0.75, 0.92], [0.9, 0.68], [1, 0.62]];

export function radioTallo(t, phi) {
  const c = Math.cos(phi), s = Math.sin(phi);
  const ant = Math.max(0, c);
  let r = interp(t, BASE);
  // mesencéfalo: pedúnculos cerebrales, fosa interpeduncular y colículos
  const mes = 1 - smoothstep(0.16, 0.27, t);
  const flare = (1 + 0.6 * (1 - smoothstep(0.04, 0.2, t))) * smoothstep(0, 0.04, t);
  r += mes * 0.36 * flare * (gauss(difAngulo(phi, 0.75), 0.45) + gauss(difAngulo(phi, -0.75), 0.45));
  r -= mes * 0.32 * gauss(phi, 0.24) * smoothstep(0, 0.05, t);
  const col = gauss(difAngulo(phi, Math.PI - 0.42), 0.26) + gauss(difAngulo(phi, -Math.PI + 0.42), 0.26);
  r += 0.22 * col * (gauss(t - 0.065, 0.035) + 0.85 * gauss(t - 0.155, 0.03));
  // puente: gran abultamiento anterior con surco basilar
  const pons = gauss(t - 0.4, 0.085);
  r += 0.74 * pons * Math.pow(ant, 1.3);
  r += 0.28 * pons * Math.abs(s);
  r -= 0.13 * pons * gauss(phi, 0.1);
  // surcos de unión
  r -= 0.14 * gauss(t - T_MES, 0.012) * (0.3 + ant);
  r -= 0.17 * gauss(t - T_PUE, 0.012) * (0.3 + ant);
  // bulbo: pirámides, fisura media anterior, olivas, tubérculos posteriores
  const bul = smoothstep(0.56, 0.6, t) * (1 - smoothstep(0.86, 0.93, t));
  r += bul * 0.14 * (gauss(difAngulo(phi, 0.24), 0.16) + gauss(difAngulo(phi, -0.24), 0.16));
  r -= bul * 0.09 * gauss(phi, 0.06);
  const oli = gauss(t - 0.68, 0.055);
  r += 0.27 * oli * (gauss(difAngulo(phi, 0.95), 0.22) + gauss(difAngulo(phi, -0.95), 0.22));
  const tub = gauss(t - 0.8, 0.06);
  r += 0.1 * tub * (gauss(difAngulo(phi, Math.PI - 0.3), 0.2) + gauss(difAngulo(phi, -Math.PI + 0.3), 0.2));
  // médula espinal: surco medio
  r -= (1 - smoothstep(0.86, 0.9, t)) * 0 + smoothstep(0.88, 0.92, t) * 0.05 * gauss(phi, 0.08);
  return r;
}

export function puntoTallo(t, phi, extra = 0) {
  const r = radioTallo(t, phi) + extra;
  return ARRIBA.clone().addScaledVector(EJE, t * LARGO)
    .addScaledVector(ANT, Math.cos(phi) * r)
    .addScaledVector(LAT, Math.sin(phi) * r);
}
export function centroTallo(t) {
  return ARRIBA.clone().addScaledVector(EJE, t * LARGO);
}

function construirSuperficie(R, NT = 200, NP = 112) {
  const pos = [];
  const col = [];
  const tval = [];
  for (let i = 0; i <= NT; i++) {
    const t = i / NT;
    for (let j = 0; j < NP; j++) {
      const phi = (j / NP) * Math.PI * 2 - Math.PI;
      const r0 = radioTallo(t, phi);
      const r = r0 + 0.015 * R(t * 30, Math.cos(phi) * 3, Math.sin(phi) * 3);
      const p = centroTallo(t).addScaledVector(ANT, Math.cos(phi) * r).addScaledVector(LAT, Math.sin(phi) * r);
      pos.push(p.x, p.y, p.z);
      const surco = gauss(t - T_MES, 0.012) + gauss(t - T_PUE, 0.012);
      const c = clamp(1 - surco * 0.45 - 0.25 * gauss(phi, 0.08) * smoothstep(0.3, 0.5, t), 0.45, 1);
      col.push(c, c, c);
      tval.push(t);
    }
  }
  const idx = [];
  for (let i = 0; i < NT; i++) {
    for (let j = 0; j < NP; j++) {
      const a = i * NP + j, b = i * NP + ((j + 1) % NP);
      const c = (i + 1) * NP + j, d = (i + 1) * NP + ((j + 1) % NP);
      idx.push(a, b, c, b, d, c);
    }
  }
  // tapas
  const top = pos.length / 3; const pt = centroTallo(0); pos.push(pt.x, pt.y, pt.z); col.push(1, 1, 1); tval.push(0);
  const bot = pos.length / 3; const pb = centroTallo(1); pos.push(pb.x, pb.y, pb.z); col.push(1, 1, 1); tval.push(1);
  for (let j = 0; j < NP; j++) {
    idx.push(top, (j + 1) % NP, j);
    idx.push(bot, NT * NP + j, NT * NP + ((j + 1) % NP));
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  // verificar orientación (normales hacia fuera)
  const n0 = new THREE.Vector3().fromBufferAttribute(geo.attributes.normal, Math.floor(NT / 2) * NP + NP / 2);
  const p0 = new THREE.Vector3().fromBufferAttribute(geo.attributes.position, Math.floor(NT / 2) * NP + NP / 2);
  if (n0.dot(p0.sub(centroTallo(0.5))) < 0) {
    for (let k = 0; k < idx.length; k += 3) { const a = idx[k + 1]; idx[k + 1] = idx[k + 2]; idx[k + 2] = a; }
    geo.setIndex(idx);
    geo.computeVertexNormals();
  }
  const et = new Int8Array(tval.length);
  tval.forEach((t, k) => { et[k] = t < T_MES ? 0 : t < T_PUE ? 1 : t < T_BUL ? 2 : 3; });
  return dividirPorEtiquetas(geo, et, 4);
}

// nervio craneal: sale de (t, phi) y se dirige hacia 'dir'
function nervio(t, phi, dir, largo, r, curva = 0) {
  const p0 = puntoTallo(t, phi, -0.15);
  const d = new THREE.Vector3(...dir).normalize();
  const p1 = p0.clone().addScaledVector(d, largo * 0.5).add(new THREE.Vector3(0, curva, 0));
  const p2 = p0.clone().addScaledVector(d, largo).add(new THREE.Vector3(0, curva * 2.2, 0));
  return tubo([p0.toArray(), p1.toArray(), p2.toArray()], (u) => r * (1 - 0.25 * u), 24, 10);
}

function par(fn) { const g = fn(1); return [g, espejarX(g)]; }

export function construirTallo(NT = 200, NP = 112) {
  const division = 'tallo';
  const grupo = new THREE.Group();
  grupo.name = division;
  const R = crearRuido(51);
  const [gMes, gPue, gBul, gMed] = construirSuperficie(R, NT, NP);

  const nMes = [
    ...par((s) => nervio(0.215, 0.32 * s, [0.35 * s, -0.25, 1], 1.4, 0.1)), // III
    ...par((s) => tubo([puntoTallo(0.235, (Math.PI - 0.3) * s, -0.1).toArray(), puntoTallo(0.235, 1.9 * s, 0.35).toArray(), puntoTallo(0.2, 0.9 * s, 0.6).toArray(), [1.5 * s, -2.0, 0.6]], () => 0.05, 40, 8)), // IV
  ];
  const nPue = [
    ...par((s) => nervio(0.4, 1.32 * s, [1 * s, 0.05, 0.45], 1.3, 0.2)), // V
    ...par((s) => nervio(0.565, 0.2 * s, [0.12 * s, 0.35, 1], 1.4, 0.065)), // VI
    ...par((s) => nervio(0.555, 1.22 * s, [1 * s, 0.0, 0.25], 1.15, 0.1)), // VII
    ...par((s) => nervio(0.56, 1.48 * s, [1 * s, -0.05, 0.05], 1.1, 0.13)), // VIII
  ];
  const nBul = [
    ...par((s) => nervio(0.635, 1.55 * s, [1 * s, -0.15, 0.1], 1.1, 0.07)), // IX
    ...par((s) => nervio(0.69, 1.6 * s, [1 * s, -0.25, 0.05], 1.2, 0.085)), // X
    ...par((s) => tubo([puntoTallo(0.97, 1.6 * s, -0.05).toArray(), puntoTallo(0.85, 1.65 * s, 0.1).toArray(), puntoTallo(0.76, 1.65 * s, 0.3).toArray(), puntoTallo(0.72, 1.6 * s, 1.2).toArray()], () => 0.07, 36, 8)), // XI
    ...par((s) => nervio(0.7, 0.58 * s, [0.55 * s, -0.15, 1], 1.15, 0.075)), // XII
  ];
  const fijas = (arr) => arr.map((geo) => ({ geo, color: NERVIO }));
  const aEje = (k) => EJE.clone().multiplyScalar(k).toArray();

  const partes = [
    crearParte({ id: 'mesencefalo', division, geometrias: [gMes], fijas: fijas(nMes), explosion: aEje(-0.85) }),
    crearParte({ id: 'puente', division, geometrias: [gPue], fijas: fijas(nPue), explosion: [0, 0, 0.55] }),
    crearParte({ id: 'bulbo', division, geometrias: [gBul], fijas: fijas(nBul), explosion: aEje(0.85) }),
  ];
  for (const p of partes) grupo.add(p.grupo);

  // médula espinal (decorativa, no interactiva)
  const medula = new THREE.Mesh(gMed, new THREE.MeshPhysicalMaterial({ color: 0xd8b8ac, roughness: 0.55, vertexColors: true }));
  medula.userData.decorativo = true;
  grupo.add(medula);

  const v = (p) => p.toArray();
  const interior = (t, a, b, c = 0) => v(centroTallo(t).addScaledVector(ANT, a).addScaledVector(LAT, b).add(new THREE.Vector3(0, c, 0)));
  const anclas = {
    coliculos_superiores: v(puntoTallo(0.065, Math.PI - 0.42, 0.2)),
    coliculos_inferiores: v(puntoTallo(0.155, Math.PI - 0.42, 0.2)),
    pedunculos_cerebrales: v(puntoTallo(0.08, 0.75, 0.2)),
    sustancia_negra: interior(0.12, 0.45, 0.65),
    nucleo_rojo: interior(0.1, 0.1, 0.35),
    sustancia_gris_periacueductal: interior(0.13, -0.5, 0),
    nervio_oculomotor: v(puntoTallo(0.215, 0.32, 0.6)),
    nervio_troclear: v(puntoTallo(0.235, Math.PI - 0.3, 0.15)),
    nervio_trigemino: v(puntoTallo(0.4, 1.32, 0.9)),
    nervio_abducens: v(puntoTallo(0.565, 0.2, 0.6)),
    nervios_facial_vestibulococlear: v(puntoTallo(0.555, 1.35, 0.8)),
    surco_basilar: v(puntoTallo(0.33, 0, 0.1)),
    locus_coeruleus: interior(0.33, -0.85, 0.3),
    centros_respiratorios_pontinos: interior(0.42, -0.4, 0),
    piramides: v(puntoTallo(0.7, 0.24, 0.15)),
    olivas: v(puntoTallo(0.68, 0.95, 0.15)),
    nervios_glosofaringeo_vago: v(puntoTallo(0.66, 1.58, 0.8)),
    nervio_accesorio: v(puntoTallo(0.8, 1.65, 0.3)),
    nervio_hipogloso: v(puntoTallo(0.7, 0.58, 0.7)),
    centros_cardiorrespiratorios: interior(0.7, -0.2, 0),
    area_postrema: v(puntoTallo(0.77, Math.PI, 0.1)),
  };
  return { id: division, grupo, partes, unidades: [], anclas, espejarAnclas: false };
}
