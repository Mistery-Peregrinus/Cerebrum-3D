// Diencéfalo: tálamo, hipotálamo (con hipófisis y quiasma óptico), epitálamo y subtálamo.
import * as THREE from 'three';
import { crearRuido, masa, tubo, espejarX, smoothstep } from './util.js';
import { crearParte } from './partes.js';

const NERVIO = 0xeee2c4;

export const ANCLAS_DIENCEFALO = {
  nucleo_anterior_talamo: [0.75, 1.0, 0.75],
  nucleo_dorsomedial: [0.12, 0.6, -0.5],
  nucleos_ventrales_motores: [1.5, 0.45, 0.1],
  nucleos_ventrales_posteriores: [1.5, 0.15, -1.0],
  pulvinar: [0.8, 0.55, -2.25],
  geniculado_lateral: [1.45, -0.45, -1.65],
  geniculado_medial: [1.0, -0.6, -1.95],
  nucleos_intralaminares: [1.0, 1.15, -0.4],
  nucleo_supraquiasmatico: [0.12, -1.05, 1.35],
  nucleos_supraoptico_paraventricular: [0.45, -0.55, 1.05],
  nucleo_arcuato: [0.15, -1.2, 0.72],
  hipotalamo_lateral: [0.68, -0.8, 0.35],
  cuerpos_mamilares: [0.25, -1.4, 0.0],
  hipofisis: [0.0, -2.4, 1.2],
  quiasma_optico: [0.3, -1.4, 1.7],
  glandula_pineal: [0.0, 0.3, -2.75],
  habenulas: [0.3, 0.85, -1.95],
  comisura_posterior: [0.0, -0.05, -2.15],
  nucleo_subtalamico: [1.2, -0.6, -0.3],
  zona_incerta: [1.25, -0.28, 0.1],
};

export function construirDiencefalo() {
  const division = 'diencefalo';
  const grupo = new THREE.Group();
  grupo.name = division;
  const R = crearRuido(23);
  const partes = [];

  // --- Tálamo (par) ---------------------------------------------------------
  const geoTalamo = masa(56, [0.78, 0.3, -0.6], [0.7, 0.75, 1.5], (x, y, z, nx, ny, nz, vx, vy, vz) => {
    // forma ovoide: más voluminoso atrás (pulvinar)
    const atras = smoothstep(0.1, -1.0, vz);
    return 0.18 * atras * (1 - Math.abs(vy) * 0.6) + 0.025 * R(x * 2.4, y * 2.4, z * 2.4);
  }, 1.5);
  const geoGL = masa(20, [1.3, -0.35, -1.65], [0.24, 0.17, 0.3]);
  const geoGM = masa(20, [0.95, -0.45, -1.9], [0.19, 0.15, 0.22]);
  const geoAdhesion = tubo([[0, 0.38, -0.25], [0.2, 0.38, -0.25]], () => 0.2, 4, 16);

  for (const lado of ['der', 'izq']) {
    const s = lado === 'der' ? 1 : -1;
    const fix = (g) => (lado === 'der' ? g : espejarX(g));
    const geos = [fix(geoTalamo), fix(geoGL), fix(geoGM), fix(geoAdhesion)];
    partes.push(crearParte({ id: 'talamo', division, lado, geometrias: geos, explosion: [0.4 * s, 0.25, 0] }));
  }

  // --- Hipotálamo + hipófisis + quiasma ------------------------------------
  const geoHipo = masa(40, [0, -0.78, 0.6], [0.62, 0.48, 0.82], (x, y, z) => 0.02 * R(x * 3, y * 3 + 5, z * 3), 1.5);
  const geoMamI = masa(18, [-0.21, -1.22, 0.05], [0.17, 0.17, 0.17]);
  const geoMamD = masa(18, [0.21, -1.22, 0.05], [0.17, 0.17, 0.17]);
  const geoInfund = tubo([[0, -1.1, 0.9], [0, -1.55, 1.05], [0, -1.95, 1.15]], (t) => 0.13 - 0.04 * t, 16, 16);
  const geoHipofisis = masa(30, [0, -2.15, 1.2], [0.4, 0.28, 0.33]);
  const quiasma = masa(24, [0, -1.32, 1.6], [0.48, 0.1, 0.22]);
  const nervios = [];
  for (const s of [1, -1]) {
    nervios.push(tubo([[0.15 * s, -1.33, 1.65], [0.55 * s, -1.42, 2.4], [0.95 * s, -1.5, 3.3]], () => 0.12, 24, 12));
    nervios.push(tubo([[0.3 * s, -1.3, 1.5], [0.8 * s, -1.05, 0.6], [1.2 * s, -0.7, -0.6], [1.3 * s, -0.4, -1.5]], () => 0.09, 32, 12));
  }
  partes.push(crearParte({
    id: 'hipotalamo', division, lado: null,
    geometrias: [geoHipo, geoMamI, geoMamD, geoInfund, geoHipofisis],
    fijas: [{ geo: quiasma, color: NERVIO }, ...nervios.map((g) => ({ geo: g, color: NERVIO }))],
    explosion: [0, -0.45, 0.5],
  }));

  // --- Epitálamo ------------------------------------------------------------
  const geoPineal = masa(30, [0, 0.3, -2.42], [0.21, 0.2, 0.34], (x, y, z, nx, ny, nz, vx, vy, vz) => -0.08 * Math.max(0, -vz));
  const geoHabD = masa(16, [0.24, 0.68, -1.95], [0.12, 0.11, 0.14]);
  const geoHabI = masa(16, [-0.24, 0.68, -1.95], [0.12, 0.11, 0.14]);
  const estrD = tubo([[0.26, 0.72, -1.9], [0.3, 1.0, -0.8], [0.28, 1.0, 0.4]], () => 0.045, 24, 8);
  const estrI = tubo([[-0.26, 0.72, -1.9], [-0.3, 1.0, -0.8], [-0.28, 1.0, 0.4]], () => 0.045, 24, 8);
  const comisura = tubo([[-0.35, 0.02, -2.15], [0.35, 0.02, -2.15]], () => 0.07, 6, 10);
  partes.push(crearParte({
    id: 'epitalamo', division, lado: null,
    geometrias: [geoPineal, geoHabD, geoHabI, estrD, estrI, comisura],
    explosion: [0, 0.4, -0.55],
  }));

  // --- Subtálamo (par) -----------------------------------------------------
  const geoNST = masa(26, [0.88, -0.58, -0.3], [0.33, 0.17, 0.52]);
  const geoZI = masa(20, [0.98, -0.33, 0.05], [0.3, 0.07, 0.45]);
  for (const lado of ['der', 'izq']) {
    const s = lado === 'der' ? 1 : -1;
    const fix = (g) => (lado === 'der' ? g : espejarX(g));
    partes.push(crearParte({ id: 'subtalamo', division, lado, geometrias: [fix(geoNST), fix(geoZI)], explosion: [0.45 * s, -0.3, 0] }));
  }

  // en el modelo con anatomía real, el diencéfalo queda 0.75 cm más abajo (bajo el cuerpo calloso real)
  const DY = -0.75;
  for (const p of partes) { for (const m of p.meshes) m.geometry.translate(0, DY, 0); grupo.add(p.grupo); }
  const anclas = Object.fromEntries(Object.entries(ANCLAS_DIENCEFALO).map(([k, v]) => [k, [v[0], v[1] + DY, v[2]]]));
  return { id: division, grupo, partes, unidades: [], anclas, espejarAnclas: true };
}
