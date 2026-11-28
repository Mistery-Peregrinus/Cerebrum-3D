// Mapa de surcos con nombre del hemisferio derecho (versión experimental).
// Cada surco es una curva sobre la superficie base, definida por puntos de control en
// "cartas" de proyección (vista lateral, superior, inferior, medial, frontal, posterior).
// Referencias anatómicas: Gray's Anatomy (41.ª ed.), Duvernoy "The Human Brain" y
// Ono, Kubik y Abernathey "Atlas of the Cerebral Sulci".
import * as THREE from 'three';

// Cartas: L(z,y) lateral · S(x,z) superior · I(x,z) inferior · M(z,y) medial · F(x,y) frontal · P(x,y) posterior
export const L = (z, y) => ({ c: 'L', a: z, b: y });
export const S = (x, z) => ({ c: 'S', a: x, b: z });
export const I = (x, z) => ({ c: 'I', a: x, b: z });
export const M = (z, y) => ({ c: 'M', a: z, b: y });
export const F = (x, y) => ({ c: 'F', a: x, b: y });
export const P = (x, y) => ({ c: 'P', a: x, b: y });

// prof: profundidad visible (cm) · ancho: semiancho de la hendidura (cm)
export const SURCOS = [
  // --- cara lateral y dorsal ------------------------------------------------
  { id: 'central', prof: 1.0, ancho: 0.085, pts: [M(-1.25, 4.15), S(0.35, -1.05), S(1.6, -0.75), L(-0.35, 3.75), L(-0.05, 3.0), L(0.05, 2.3), L(0.25, 1.6), L(0.55, 0.85), L(0.85, 0.25)] },
  { id: 'precentral_sup', prof: 0.3, ancho: 0.085, pts: [S(1.0, 0.3), S(2.2, 0.5), L(0.75, 3.5), L(0.95, 2.75)] },
  { id: 'precentral_inf', prof: 0.3, ancho: 0.085, pts: [L(1.3, 2.25), L(1.45, 1.5), L(1.7, 0.8), L(1.95, 0.2)] },
  { id: 'poscentral', prof: 0.3, ancho: 0.085, pts: [S(0.9, -2.2), S(2.3, -1.9), L(-1.35, 3.4), L(-1.1, 2.5), L(-0.9, 1.6), L(-0.65, 0.9), L(-0.45, 0.4)] },
  { id: 'frontal_sup', prof: 0.3, ancho: 0.085, pts: [S(2.2, 0.6), S(2.15, 2.1), S(2.05, 3.2), S(1.9, 4.3), S(1.75, 5.2)] },
  { id: 'frontal_med', prof: 0.16, ancho: 0.07, pts: [L(2.8, 3.15), L(3.7, 3.05), L(4.6, 2.75), L(5.3, 2.3)] },
  { id: 'frontal_inf', prof: 0.28, ancho: 0.085, pts: [L(1.35, 1.95), L(2.6, 1.8), L(3.6, 1.65), L(4.5, 1.4), L(5.3, 1.0)] },
  { id: 'frontomarginal', prof: 0.18, ancho: 0.07, pts: [F(4.0, 0.35), F(2.9, 0.15), F(1.7, 0.05)] },
  { id: 'silvio_horizontal', prof: 0.3, ancho: 0.08, pts: [L(2.45, -0.75), L(3.2, -0.62), L(3.85, -0.62)] },
  { id: 'silvio_ascendente', prof: 0.3, ancho: 0.08, pts: [L(2.35, -0.7), L(2.55, -0.1), L(2.7, 0.45)] },
  { id: 'silvio_posterior', prof: 0.4, ancho: 0.1, pts: [L(-2.3, 0.15), L(-2.85, 0.55), L(-3.15, 1.1), L(-3.2, 1.6)] },
  { id: 'temporal_sup', prof: 0.32, ancho: 0.09, pts: [L(2.1, -1.7), L(1.0, -1.65), L(-0.2, -1.5), L(-1.4, -1.25), L(-2.4, -0.85), L(-3.2, -0.25), L(-3.7, 0.45), L(-3.85, 1.0)] },
  { id: 'temporal_inf_a', prof: 0.24, ancho: 0.08, pts: [L(1.6, -2.85), L(0.7, -2.95), L(-0.4, -2.9)] },
  { id: 'temporal_inf_b', prof: 0.24, ancho: 0.08, pts: [L(-0.9, -2.75), L(-2.0, -2.55), L(-3.0, -2.2), L(-3.8, -1.7)] },
  { id: 'intraparietal', prof: 0.33, ancho: 0.09, pts: [L(-1.15, 2.55), L(-2.2, 2.85), L(-3.1, 2.95), L(-4.0, 2.75), L(-4.8, 2.3), L(-5.4, 1.75)] },
  { id: 'occipital_transverso', prof: 0.22, ancho: 0.08, pts: [S(1.4, -5.25), L(-5.2, 2.9), L(-5.5, 2.2)] },
  { id: 'occipital_lateral', prof: 0.24, ancho: 0.08, pts: [L(-4.7, -0.55), L(-5.5, -0.3), L(-6.3, -0.05), L(-6.9, 0.2)] },
  { id: 'lunado', prof: 0.16, ancho: 0.07, pts: [L(-6.6, 1.6), L(-6.9, 0.9)] },
  // --- cara orbitaria (inferior del lóbulo frontal) ---------------------------
  { id: 'olfatorio', prof: 0.3, ancho: 0.08, pts: [I(0.85, 2.7), I(0.9, 3.9), I(0.95, 5.1), I(1.0, 5.8)] },
  { id: 'orbitario_med', prof: 0.22, ancho: 0.08, pts: [I(2.05, 3.0), I(2.15, 4.1), I(2.2, 5.2)] },
  { id: 'orbitario_lat', prof: 0.22, ancho: 0.08, pts: [I(3.4, 3.1), I(3.35, 4.0), I(3.1, 5.0)] },
  { id: 'orbitario_trans', prof: 0.2, ancho: 0.08, pts: [I(2.1, 4.15), I(2.75, 4.05), I(3.4, 3.95)] },
  // --- cara inferior temporooccipital -----------------------------------------
  { id: 'occipitotemporal', prof: 0.24, ancho: 0.08, pts: [I(4.0, 1.0), I(3.85, -0.4), I(3.6, -2.0), I(3.25, -3.6), I(2.8, -5.0)] },
  { id: 'colateral', prof: 0.3, ancho: 0.09, pts: [I(2.55, 0.9), I(2.5, -0.6), I(2.35, -2.2), I(2.05, -3.8), I(1.6, -5.2), I(1.1, -6.2)] },
  { id: 'rinal', prof: 0.18, ancho: 0.07, pts: [I(2.75, 2.2), I(2.6, 1.3)] },
  // --- cara medial -------------------------------------------------------------
  { id: 'cingulo', prof: 0.32, ancho: 0.09, pts: [M(1.85, -0.45), M(2.9, 0.15), M(3.45, 1.2), M(3.2, 2.35), M(2.2, 2.9), M(0.9, 3.05), M(-0.4, 3.05), M(-1.4, 3.1), M(-1.95, 3.55), M(-2.2, 4.25)] },
  { id: 'paracentral', prof: 0.2, ancho: 0.075, pts: [M(0.15, 3.1), M(0.05, 3.7), M(-0.05, 4.3)] },
  { id: 'subparietal', prof: 0.22, ancho: 0.08, pts: [M(-2.05, 2.75), M(-2.8, 2.6), M(-3.3, 2.15)] },
  { id: 'parietooccipital', prof: 0.42, ancho: 0.1, pts: [M(-3.35, 0.45), M(-3.8, 1.4), M(-4.25, 2.4), M(-4.65, 3.3), M(-4.9, 3.9), S(0.55, -5.05), S(1.1, -5.15)] },
  { id: 'calcarino', prof: 0.42, ancho: 0.1, pts: [M(-3.4, 0.2), M(-4.3, 0.15), M(-5.2, 0.25), M(-6.1, 0.45), M(-6.9, 0.55), P(0.7, 0.55)] },
  { id: 'rostral', prof: 0.16, ancho: 0.07, pts: [M(4.0, 0.15), M(4.8, 0.35), M(5.5, 0.55)] },
  { id: 'frontal_medial', prof: 0.14, ancho: 0.07, pts: [M(4.2, 2.3), M(3.4, 3.4), M(2.3, 3.95)] },
];

// Puntos de anclaje de las etiquetas (se proyectan sobre la superficie)
export const ANCLAS_CARTA = {
  giro_precentral: L(0.75, 2.0),
  corteza_premotora: L(1.9, 3.3),
  campo_ocular_frontal: L(1.95, 2.45),
  area_broca: L(2.55, 0.45),
  prefrontal_dorsolateral: L(4.2, 2.4),
  corteza_orbitofrontal: I(2.7, 4.6),
  cingulado_anterior: M(2.75, 1.45),
  giro_poscentral: L(-0.4, 2.0),
  lobulillo_parietal_superior: S(1.6, -3.6),
  giro_supramarginal: L(-2.55, 1.35),
  giro_angular: L(-4.15, 1.2),
  precuneo: M(-3.0, 3.3),
  corteza_auditiva: L(0.4, -1.0),
  area_wernicke: L(-2.0, -0.45),
  giros_temporales: L(0.4, -2.3),
  giro_fusiforme: I(3.05, -1.6),
  temporal_medial: I(2.0, 0.8),
  corteza_visual_primaria: M(-5.6, 0.35),
  cuneus: M(-5.2, 1.7),
  giro_lingual: M(-5.0, -0.45),
  corteza_asociacion_visual: L(-6.0, 0.9),
};

// ---------------------------------------------------------------------------
// Proyección de las cartas sobre la superficie
// ---------------------------------------------------------------------------
function marchar(sdf, o, d) {
  let t = 0;
  for (let k = 0; k < 300; k++) {
    const x = o[0] + d[0] * t, y = o[1] + d[1] * t, z = o[2] + d[2] * t;
    const v = sdf(x, y, z);
    if (v < 0.002) return [x, y, z];
    t += Math.max(v * 0.8, 0.004);
    if (t > 30) return null;
  }
  return null;
}
export function proyectarCarta(sdf, p) {
  const { c, a, b } = p;
  switch (c) {
    case 'L': return marchar(sdf, [14, b, a], [-1, 0, 0]);
    case 'S': return marchar(sdf, [a, 14, b], [0, -1, 0]);
    case 'I': return marchar(sdf, [a, -14, b], [0, 1, 0]);
    case 'M': return marchar(sdf, [-4, b, a], [1, 0, 0]);
    case 'F': return marchar(sdf, [a, b, 14], [0, 0, -1]);
    case 'P': return marchar(sdf, [a, b, -14], [0, 0, 1]);
    default: return null;
  }
}

// Lleva un punto a la superficie sdf = 0 siguiendo el gradiente.
export function aSuperficie(sdf, p, iter = 4) {
  const e = 0.01;
  for (let k = 0; k < iter; k++) {
    const v = sdf(p[0], p[1], p[2]);
    const gx = sdf(p[0] + e, p[1], p[2]) - sdf(p[0] - e, p[1], p[2]);
    const gy = sdf(p[0], p[1] + e, p[2]) - sdf(p[0], p[1] - e, p[2]);
    const gz = sdf(p[0], p[1], p[2] + e) - sdf(p[0], p[1], p[2] - e);
    const gl = Math.hypot(gx, gy, gz) || 1;
    p[0] -= (gx / gl) * v; p[1] -= (gy / gl) * v; p[2] -= (gz / gl) * v;
  }
  return p;
}

function sstep(a, b, x) {
  let t = (x - a) / (b - a);
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return t * t * (3 - 2 * t);
}

// Generador pseudoaleatorio reproducible
function crearAzar(semilla) {
  let s = (semilla * 2654435761) >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

/**
 * Campo de surcos del hemisferio.
 *  1. Surcos con nombre (SURCOS) proyectados sobre la superficie.
 *  2. Cisura de Silvio: se sigue el pliegue entre el lóbulo temporal y el resto.
 *  3. Surcos menores: se trazan donde un giro queda demasiado ancho, siguiendo la dirección
 *     del giro (o cruzándolo), hasta que la corteza queda con giros de ~1-1.3 cm.
 * @param o.sdf        superficie base
 * @param o.pliegue    (x,y,z) -> t - sup (cambia de signo en la cisura de Silvio)
 * @param o.muestras   Float32Array de puntos sobre la superficie (para buscar giros anchos)
 * @param o.excluir    (x,y,z) -> true donde no debe haber surcos (zona de corte medial)
 * @param o.jitter     (x,y,z) -> desplazamiento pequeño de los puntos de control
 * @param o.ruido      ruido 3D para ondular los surcos menores
 * @param o.semilla    semilla del hemisferio
 */
export function campoSurcos(o) {
  const { sdf, pliegue, muestras, jitter, ruido: R, semilla = 1 } = o;
  let { excluir } = o;
  const azar = crearAzar(semilla);
  const paso = 0.07;
  // --- rejilla dinámica de segmentos ---
  const T = 0.5, X0 = -1, Y0 = -5.5, Z0 = -9, NX = 18, NY = 23, NZ = 38;
  const celdas = Array.from({ length: NX * NY * NZ }, () => []);
  const segs = []; // [ax,ay,az,bx,by,bz,prof,ancho,ta,tb,largo]
  const idCelda = (x, y, z) => {
    const i = Math.floor((x - X0) / T), j = Math.floor((y - Y0) / T), k = Math.floor((z - Z0) / T);
    if (i < 0 || j < 0 || k < 0 || i >= NX || j >= NY || k >= NZ) return -1;
    return (k * NY + j) * NX + i;
  };
  const curvas = {};
  function agregarCurva(id, pts, prof, ancho) {
    let largo = 0;
    for (let i = 0; i < pts.length - 1; i++) largo += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1], pts[i + 1][2] - pts[i][2]);
    const n = pts.length - 1;
    const nuevos = [];
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[i + 1];
      const s = [a[0], a[1], a[2], b[0], b[1], b[2], prof, ancho, i / n, (i + 1) / n, largo];
      const c = idCelda((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
      if (c >= 0) celdas[c].push(segs.length);
      segs.push(s);
      nuevos.push(s);
    }
    if (id) curvas[id] = pts;
    return nuevos;
  }
  function distSeg(s, x, y, z) {
    const abx = s[3] - s[0], aby = s[4] - s[1], abz = s[5] - s[2];
    const apx = x - s[0], apy = y - s[1], apz = z - s[2];
    const l2 = abx * abx + aby * aby + abz * abz || 1e-9;
    let u = (apx * abx + apy * aby + apz * abz) / l2;
    u = u < 0 ? 0 : u > 1 ? 1 : u;
    const dx = apx - abx * u, dy = apy - aby * u, dz = apz - abz * u;
    DS.d = Math.sqrt(dx * dx + dy * dy + dz * dz); DS.u = u;
    return DS;
  }
  const DS = { d: 0, u: 0 };
  // distancia al surco más cercano (hasta ~1 cm)
  function distancia(x, y, z) {
    let dmin = 1.2;
    const i0 = Math.floor((x - X0) / T), j0 = Math.floor((y - Y0) / T), k0 = Math.floor((z - Z0) / T);
    for (let k = k0 - 2; k <= k0 + 2; k++) {
      if (k < 0 || k >= NZ) continue;
      for (let j = j0 - 2; j <= j0 + 2; j++) {
        if (j < 0 || j >= NY) continue;
        for (let i = i0 - 2; i <= i0 + 2; i++) {
          if (i < 0 || i >= NX) continue;
          for (const q of celdas[(k * NY + j) * NX + i]) {
            const d = distSeg(segs[q], x, y, z).d;
            if (d < dmin) dmin = d;
          }
        }
      }
    }
    return dmin;
  }
  const curvaSuave = (ctrl) => {
    const curva = new THREE.CatmullRomCurve3(ctrl.map((p) => new THREE.Vector3(...p)), false, 'centripetal');
    const n = Math.max(2, Math.ceil(curva.getLength() / paso));
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push(aSuperficie(sdf, curva.getPointAt(i / n).toArray(), 3));
    return pts;
  };

  // Ondulación lateral de un surco (los surcos reales no son líneas limpias)
  function ondular(pts, fase, amp = 0.13) {
    if (!R) return pts;
    const out = [];
    const e = 0.01;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i], a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const t = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
      const n = [sdf(p[0] + e, p[1], p[2]) - sdf(p[0] - e, p[1], p[2]), sdf(p[0], p[1] + e, p[2]) - sdf(p[0], p[1] - e, p[2]), sdf(p[0], p[1], p[2] + e) - sdf(p[0], p[1], p[2] - e)];
      let l = [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]];
      const ll = Math.hypot(...l) || 1;
      l = l.map((v) => v / ll);
      const k = amp * (R(p[0] * 0.75 + fase, p[1] * 0.75, p[2] * 0.75) + 0.4 * R(p[0] * 2.1, p[1] * 2.1 + fase, p[2] * 2.1));
      out.push(aSuperficie(sdf, [p[0] + l[0] * k, p[1] + l[1] * k, p[2] + l[2] * k], 3));
    }
    return out;
  }

  // Jerarquía de profundidad: el surco central y la cisura lateral son los más hondos; las fisuras
  // calcarina, parietooccipital y del cíngulo son intermedias; el resto de surcos con nombre es
  // más superficial, y los surcos menores apenas marcan la superficie.
  const INTERMEDIOS = { calcarino: 0.6, parietooccipital: 0.6, cingulo: 0.48 };
  function profundidadSurco(s) {
    if (s.id === 'central') return [1.0, 0.095];
    if (INTERMEDIOS[s.id]) return [INTERMEDIOS[s.id], 0.08];
    return [s.prof * 1.15, s.ancho * 0.8];
  }

  // 0. surcos ya trazados (p. ej., límites entre giros reales)
  for (const c of o.curvas || []) if (c.pts.length >= 2) agregarCurva(c.id || null, c.pts, c.prof, c.ancho);

  // 1. surcos con nombre
  for (const s of SURCOS) {
    if (o.nombrados && !o.nombrados.includes(s.id)) continue;
    const ctrl = [];
    for (const p of s.pts) {
      let q = proyectarCarta(sdf, p);
      if (!q) continue;
      if (jitter) { const j = jitter(q[0], q[1], q[2]); q = aSuperficie(sdf, [q[0] + j[0], q[1] + j[1], q[2] + j[2]]); }
      ctrl.push(q);
    }
    if (ctrl.length >= 2) { const [pr, an] = profundidadSurco(s); agregarCurva(s.id, ondular(curvaSuave(ctrl), s.id.length * 7.3), pr, an); }
  }

  // 2. cisura de Silvio (rama posterior): cambio de signo del pliegue en la cara lateral
  const silvio = [];
  if (o.silvio !== false) for (let z = 2.75; z >= -2.35; z -= 0.25) {
    let prev = null;
    for (let y = 1.2; y >= -2.4; y -= 0.04) {
      const p = proyectarCarta(sdf, L(z, y));
      if (!p) continue;
      const f = pliegue(p[0], p[1], p[2]);
      if (prev && prev > 0 && f <= 0) { silvio.push(p); break; }
      prev = f;
    }
  }
  if (silvio.length >= 2) agregarCurva('silvio', curvaSuave(silvio), 1.1, 0.062);

  // 3. surcos menores (los giros precentral y poscentral quedan como bandas lisas)
  const central = curvas.central || [];
  const cercaCentral = (x, y, z) => { for (const p of central) { if ((p[0] - x) ** 2 + (p[1] - y) ** 2 + (p[2] - z) ** 2 < 0.6) return true; } return false; };
  const excluirBase = excluir;
  excluir = (x, y, z) => excluirBase(x, y, z) || cercaCentral(x, y, z);
  const nm = muestras.length / 3;
  const dm = new Float32Array(nm);
  const valida = new Uint8Array(nm);
  for (let i = 0; i < nm; i++) {
    const x = muestras[i * 3], y = muestras[i * 3 + 1], z = muestras[i * 3 + 2];
    valida[i] = excluir(x, y, z) ? 0 : 1;
    dm[i] = valida[i] ? distancia(x, y, z) : 0;
  }
  const normal = (p) => {
    const e = 0.01;
    const n = [sdf(p[0] + e, p[1], p[2]) - sdf(p[0] - e, p[1], p[2]), sdf(p[0], p[1] + e, p[2]) - sdf(p[0], p[1] - e, p[2]), sdf(p[0], p[1], p[2] + e) - sdf(p[0], p[1], p[2] - e)];
    const l = Math.hypot(...n) || 1;
    return n.map((v) => v / l);
  };
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
  const tangente = (v, n) => { const k = v[0] * n[0] + v[1] * n[1] + v[2] * n[2]; return norm([v[0] - n[0] * k, v[1] - n[1] * k, v[2] - n[2] * k]); };
  // dirección de la cresta del giro en p (hacia donde la distancia a los surcos se mantiene alta)
  function direccionCresta(p, n) {
    const ref = Math.abs(n[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const u = norm(cruz(n, ref)), v = cruz(n, u);
    let mejor = -1, dir = u;
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI;
      const d = [u[0] * Math.cos(a) + v[0] * Math.sin(a), u[1] * Math.cos(a) + v[1] * Math.sin(a), u[2] * Math.cos(a) + v[2] * Math.sin(a)];
      const s1 = distancia(p[0] + d[0] * 0.35, p[1] + d[1] * 0.35, p[2] + d[2] * 0.35);
      const s2 = distancia(p[0] - d[0] * 0.35, p[1] - d[1] * 0.35, p[2] - d[2] * 0.35);
      if (s1 + s2 > mejor) { mejor = s1 + s2; dir = d; }
    }
    return dir;
  }
  function trazarMitad(p0, d0, largoMax, unir, fase) {
    const pts = [];
    let p = p0.slice(), d = d0.slice(), largo = 0;
    while (largo < largoMax) {
      const n = normal(p);
      // gradiente de la distancia: seguir la cresta (perpendicular al gradiente)
      const e = 0.06;
      const g = [
        distancia(p[0] + e, p[1], p[2]) - distancia(p[0] - e, p[1], p[2]),
        distancia(p[0], p[1] + e, p[2]) - distancia(p[0], p[1] - e, p[2]),
        distancia(p[0], p[1], p[2] + e) - distancia(p[0], p[1], p[2] - e),
      ];
      const gl = Math.hypot(...g);
      let obj = d;
      if (gl > 1e-4) {
        let par = norm(cruz(n, g));
        if (par[0] * d[0] + par[1] * d[1] + par[2] * d[2] < 0) par = par.map((v) => -v);
        obj = par;
      }
      // ondulación natural
      const w = R ? 0.5 * R(p[0] * 0.7 + fase, p[1] * 0.7, p[2] * 0.7) : 0;
      const lado = norm(cruz(n, d));
      d = tangente([d[0] * 0.6 + obj[0] * 0.4 + lado[0] * w * 0.25, d[1] * 0.6 + obj[1] * 0.4 + lado[1] * w * 0.25, d[2] * 0.6 + obj[2] * 0.4 + lado[2] * w * 0.25], n);
      const q = aSuperficie(sdf, [p[0] + d[0] * paso, p[1] + d[1] * paso, p[2] + d[2] * paso], 3);
      if (excluir(q[0], q[1], q[2])) break;
      const dq = distancia(q[0], q[1], q[2]);
      if (dq < (unir ? 0.05 : 0.42)) { if (unir) pts.push(q); break; }
      pts.push(q);
      p = q; largo += paso;
    }
    return pts;
  }
  const UMBRAL = o.umbral || 0.66;
  for (let iter = 0; iter < 700; iter++) {
    let max = 0;
    for (let i = 0; i < nm; i++) if (dm[i] > max) max = dm[i];
    if (max < UMBRAL) break;
    // se elige al azar entre los puntos más alejados de cualquier surco
    const cand = [];
    for (let i = 0; i < nm; i++) if (dm[i] > max * 0.88) cand.push(i);
    const iS = cand[Math.floor(azar() * cand.length)];
    const p0 = [muestras[iS * 3], muestras[iS * 3 + 1], muestras[iS * 3 + 2]];
    const n0 = normal(p0);
    let d0 = direccionCresta(p0, n0);
    const cruzado = azar() < 0.42;
    if (cruzado) d0 = norm(cruz(n0, d0));
    const largo = cruzado ? 0.5 + azar() * 0.6 : 0.8 + azar() * 1.6;
    const fase = azar() * 100;
    const a = trazarMitad(p0, d0, largo, azar() < 0.45, fase);
    const b = trazarMitad(p0, d0.map((v) => -v), largo, azar() < 0.45, fase);
    const pts = [...b.reverse(), p0, ...a];
    if (pts.length < 20) { dm[iS] = 0; continue; }
    const nuevos = agregarCurva(null, pts, 0.17 + azar() * 0.1, 0.058 + azar() * 0.01);
    // actualizar distancias de las muestras cercanas
    let bx0 = Infinity, by0 = Infinity, bz0 = Infinity, bx1 = -Infinity, by1 = -Infinity, bz1 = -Infinity;
    for (const p of pts) { bx0 = Math.min(bx0, p[0]); by0 = Math.min(by0, p[1]); bz0 = Math.min(bz0, p[2]); bx1 = Math.max(bx1, p[0]); by1 = Math.max(by1, p[1]); bz1 = Math.max(bz1, p[2]); }
    for (let i = 0; i < nm; i++) {
      if (!valida[i] || dm[i] === 0) continue;
      const x = muestras[i * 3], y = muestras[i * 3 + 1], z = muestras[i * 3 + 2];
      if (x < bx0 - 1.2 || x > bx1 + 1.2 || y < by0 - 1.2 || y > by1 + 1.2 || z < bz0 - 1.2 || z > bz1 + 1.2) continue;
      for (const s of nuevos) { const d = distSeg(s, x, y, z).d; if (d < dm[i]) dm[i] = d; }
    }
  }

  /**
   * Devuelve { surco, dmin }:
   *  surco: profundidad de la hendidura en el punto (perfil gaussiano estrecho)
   *  dmin:  distancia efectiva al surco más cercano (para redondear los giros)
   */
  const res = { surco: 0, dmin: 9 };
  function consultar(x, y, z) {
    let surco = 0, dmin = 9, profCerca = 0;
    const i0 = Math.floor((x - X0) / T), j0 = Math.floor((y - Y0) / T), k0 = Math.floor((z - Z0) / T);
    for (let k = k0 - 1; k <= k0 + 1; k++) {
      if (k < 0 || k >= NZ) continue;
      for (let j = j0 - 1; j <= j0 + 1; j++) {
        if (j < 0 || j >= NY) continue;
        for (let i = i0 - 1; i <= i0 + 1; i++) {
          if (i < 0 || i >= NX) continue;
          for (const q of celdas[(k * NY + j) * NX + i]) {
            const s = segs[q];
            const { d, u } = distSeg(s, x, y, z);
            if (d > 0.9) continue;
            const t = s[8] + (s[9] - s[8]) * u;
            const e = Math.min(0.25, 0.35 / s[10]);
            const af = sstep(0, e, t) * sstep(1, 1 - e, t);
            const w = s[7] * (0.6 + 0.4 * af);
            const h = s[6] * (0.2 + 0.8 * af) * Math.exp(-(d / w) * (d / w));
            if (h > surco) surco = h;
            const de = d + (1 - af) * 0.25;
            if (de < dmin) { dmin = de; profCerca = s[6]; }
          }
        }
      }
    }
    res.surco = surco; res.dmin = dmin; res.profCerca = profCerca;
    return res;
  }
  return { consultar, muestras: curvas, nSegmentos: segs.length };
}

