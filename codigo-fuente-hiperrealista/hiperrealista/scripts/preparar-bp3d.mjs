// Prepara los datos anatómicos reales de BodyParts3D para el generador del modelo.
// Se ejecuta una sola vez (no en cada compilación): node scripts/preparar-bp3d.mjs <carpeta con los OBJ>
// Los resultados ya vienen incluidos en src/datos-bp3d: para compilar la app no hace falta correrlo.
//
// Fuente: BodyParts3D, © The Database Center for Life Science, licencia CC BY 4.0
// (https://dbarchive.biosciencedbc.jp/en/bodyparts3d/). Paquete partof_BP3D_4.0_obj_99.
//
// Salida (src/datos-bp3d/, gzip):
//  - hemisferio-der.bin / hemisferio-izq.bin: rejilla 3D con la distancia con signo a la superficie
//    del hemisferio (giros + sustancia blanca, con los huecos de giros ausentes rellenos) y la
//    etiqueta del giro real más cercano a cada punto. El izquierdo se guarda espejado (como derecho).
//  - mallas.bin: cerebelo, tallo cerebral, ínsula e hipocampo en coordenadas de la app.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

// carpeta con los OBJ descomprimidos del paquete partof_BP3D_4.0_obj_99 (descarga en la página de BodyParts3D)
const DIR = (process.argv[2] || 'partof_BP3D_4.0_obj_99').replace(/\\/g, '/') + '/';
const SALIDA = 'src/datos-bp3d';
mkdirSync(SALIDA, { recursive: true });

// BodyParts3D (mm): X = izquierda(+)/derecha(-), Y = posterior(+), Z = arriba.
// App (1 unidad ≈ 1 cm del modelo): x = derecha(+), y = arriba, z = anterior(+).
// Escala 0.78: el hemisferio de BodyParts3D (18 cm) se ajusta al largo del modelo de la app (14 cm),
// para que encaje con el diencéfalo, las etiquetas y las cámaras existentes.
const K = 0.078, Z0 = 1568.2, Y0 = -85.4;
const aApp = (X, Y, Z) => [-X * K, (Z - Z0) * K, -(Y - Y0) * K];

function leerOBJ(id) {
  const txt = readFileSync(DIR + id + '.obj', 'utf8');
  const v = [], f = [];
  for (const l of txt.split(/\r?\n/)) {
    if (l.startsWith('v ')) { const [, X, Y, Z] = l.trim().split(/\s+/).map(Number); v.push(...aApp(X, Y, Z)); }
    else if (l.startsWith('f ')) {
      const q = l.trim().split(/\s+/).slice(1).map((t) => parseInt(t, 10) - 1);
      // el cambio de ejes es una reflexión: se invierte el orden de los vértices para que las caras miren hacia fuera
      for (let i = 1; i < q.length - 1; i++) f.push(q[0], q[i + 1], q[i]);
    }
  }
  return { pos: new Float32Array(v), idx: new Uint32Array(f) };
}
const espejar = (m) => {
  const pos = m.pos.slice();
  for (let i = 0; i < pos.length; i += 3) pos[i] = -pos[i];
  const idx = m.idx.slice();
  for (let t = 0; t < idx.length; t += 3) { const a = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = a; }
  return { pos, idx };
};

// --- etiquetas de giros (mismo número en ambos lados) -----------------------------
export const GIROS = [
  null,
  ['frontal_superior', 'FJ1834', 'FJ1833'],
  ['frontal_medio', 'FJ1788', 'FJ1787'],
  ['frontal_inferior', 'FJ1745', 'FJ1744'],
  ['precentral', 'FJ1801', 'FJ1800'],
  ['poscentral', 'FJ1798', 'FJ1797'],
  ['supramarginal', 'FJ1842', 'FJ1841'],
  ['angular', 'FJ1733', 'FJ1732'],
  ['parietal_superior', 'FJ1836', 'FJ1835'],
  ['occipital', 'FJ1792', 'FJ1791'],
  ['temporal_medio', 'FJ1790', 'FJ1789'],
  ['temporal_inferior', 'FJ1747', 'FJ1746'],
  ['fusiforme', 'FJ1784', 'FJ1783'],
  ['parahipocampal', 'FJ1786', 'FJ1785'],
  ['cingulo', 'FJ1740', 'FJ1739'],
  ['insula', 'FJ1749', 'FJ1748'],
];
const SUST_BLANCA = ['FJ1806', 'FJ1758'];

// --- rejilla ------------------------------------------------------------------------
const H = 0.08; // tamaño de vóxel (≈ 1 mm real)
const B0 = [-0.6, -4.8, -8.0], B1 = [6.4, 5.6, 7.4];
const NX = Math.ceil((B1[0] - B0[0]) / H), NY = Math.ceil((B1[1] - B0[1]) / H), NZ = Math.ceil((B1[2] - B0[2]) / H);
const N = NX * NY * NZ;
const ix = (i, j, k) => (k * NY + j) * NX + i;

// Relleno de una malla cerrada por paridad: rayos a lo largo de z por cada columna (x, y).
function rellenar(m, marcar) {
  const cols = new Map();
  const P = m.pos, I = m.idx;
  for (let t = 0; t < I.length; t += 3) {
    const a = I[t] * 3, b = I[t + 1] * 3, c = I[t + 2] * 3;
    const x0 = Math.min(P[a], P[b], P[c]), x1 = Math.max(P[a], P[b], P[c]);
    const y0 = Math.min(P[a + 1], P[b + 1], P[c + 1]), y1 = Math.max(P[a + 1], P[b + 1], P[c + 1]);
    const i0 = Math.ceil((x0 - B0[0]) / H - 0.5), i1 = Math.floor((x1 - B0[0]) / H - 0.5);
    const j0 = Math.ceil((y0 - B0[1]) / H - 0.5), j1 = Math.floor((y1 - B0[1]) / H - 0.5);
    for (let i = i0; i <= i1; i++) {
      const px = B0[0] + (i + 0.5) * H;
      for (let j = j0; j <= j1; j++) {
        const py = B0[1] + (j + 0.5) * H;
        // baricéntricas en el plano xy
        const d = (P[b + 1] - P[c + 1]) * (P[a] - P[c]) + (P[c] - P[b]) * (P[a + 1] - P[c + 1]);
        if (Math.abs(d) < 1e-12) continue;
        const l1 = ((P[b + 1] - P[c + 1]) * (px - P[c]) + (P[c] - P[b]) * (py - P[c + 1])) / d;
        const l2 = ((P[c + 1] - P[a + 1]) * (px - P[c]) + (P[a] - P[c]) * (py - P[c + 1])) / d;
        const l3 = 1 - l1 - l2;
        if (l1 < 0 || l2 < 0 || l3 < 0) continue;
        const z = l1 * P[a + 2] + l2 * P[b + 2] + l3 * P[c + 2];
        const key = j * NX + i;
        if (!cols.has(key)) cols.set(key, []);
        cols.get(key).push(z);
      }
    }
  }
  for (const [key, zs] of cols) {
    zs.sort((p, q) => p - q);
    const i = key % NX, j = Math.floor(key / NX);
    for (let q = 0; q + 1 < zs.length; q += 2) {
      const k0 = Math.ceil((zs[q] - B0[2]) / H - 0.5), k1 = Math.floor((zs[q + 1] - B0[2]) / H - 0.5);
      for (let k = Math.max(0, k0); k <= Math.min(NZ - 1, k1); k++) marcar(ix(i, j, k));
    }
  }
}

// Transformada de distancia euclidiana exacta (Felzenszwalb y Huttenlocher), al cuadrado, en vóxeles.
function edt1d(f, n, d, v, z) {
  let k = 0; v[0] = 0; z[0] = -Infinity; z[1] = Infinity;
  for (let q = 1; q < n; q++) {
    let s;
    while (true) {
      s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      if (s <= z[k]) { k--; if (k < 0) { k = 0; break; } } else break;
    }
    k++; v[k] = q; z[k] = s; z[k + 1] = Infinity;
  }
  k = 0;
  for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
}
function edt(objetivo) { // objetivo: Uint8Array (1 = semilla) → distancia (en vóxeles) a la semilla más cercana
  const INF = 1e10;
  const g = new Float32Array(N);
  for (let p = 0; p < N; p++) g[p] = objetivo[p] ? 0 : INF;
  const m = Math.max(NX, NY, NZ);
  const f = new Float64Array(m), d = new Float64Array(m), v = new Int32Array(m), z = new Float64Array(m + 1);
  for (let k = 0; k < NZ; k++) for (let j = 0; j < NY; j++) {
    for (let i = 0; i < NX; i++) f[i] = g[ix(i, j, k)];
    edt1d(f, NX, d, v, z); for (let i = 0; i < NX; i++) g[ix(i, j, k)] = d[i];
  }
  for (let k = 0; k < NZ; k++) for (let i = 0; i < NX; i++) {
    for (let j = 0; j < NY; j++) f[j] = g[ix(i, j, k)];
    edt1d(f, NY, d, v, z); for (let j = 0; j < NY; j++) g[ix(i, j, k)] = d[j];
  }
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    for (let k = 0; k < NZ; k++) f[k] = g[ix(i, j, k)];
    edt1d(f, NZ, d, v, z); for (let k = 0; k < NZ; k++) g[ix(i, j, k)] = d[k];
  }
  for (let p = 0; p < N; p++) g[p] = Math.sqrt(g[p]);
  return g;
}

function prepararHemisferio(lado) {
  const t0 = Date.now();
  const col = lado === 'der' ? 1 : 2;
  const ocup = new Uint8Array(N);
  const etiq = new Uint8Array(N);
  const leer = (id) => (lado === 'der' ? leerOBJ(id) : espejar(leerOBJ(id)));
  rellenar(leer(SUST_BLANCA[col - 1]), (p) => { ocup[p] = 1; });
  for (let e = 1; e < GIROS.length; e++) rellenar(leer(GIROS[e][col]), (p) => { ocup[p] = 1; etiq[p] = e; });
  // cara de corte medial (por el cuerpo calloso y el diencéfalo): el paquete deja ahí una cavidad;
  // se rellena para obtener la superficie plana de un hemisferio separado en la línea media
  for (let k = 0; k < NZ; k++) for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    const x = B0[0] + (i + 0.5) * H, y = B0[1] + (j + 0.5) * H, z = B0[2] + (k + 0.5) * H;
    if (x < 0.04 || x > 1.7) continue;
    if (Math.hypot((y - 0.0) / 1.6, (z + 0.2) / 2.8) < 1) ocup[ix(i, j, k)] = 1;
  }
  // cierre morfológico (radio ≈ 6 mm): rellena los giros que faltan en el paquete y los surcos
  // (los surcos se vuelven a tallar después, en su sitio real, a partir de los límites entre giros)
  const R = 6.5;
  const dFuera = edt(ocup);
  const dil = new Uint8Array(N);
  for (let p = 0; p < N; p++) dil[p] = dFuera[p] <= R ? 1 : 0;
  const noDil = new Uint8Array(N);
  for (let p = 0; p < N; p++) noDil[p] = dil[p] ? 0 : 1;
  const dHastaFuera = edt(noDil);
  const cerrado = new Uint8Array(N);
  for (let p = 0; p < N; p++) cerrado[p] = dHastaFuera[p] > R ? 1 : 0;
  // distancia con signo (en unidades de la app): negativa dentro
  const dIn = edt(cerrado.map((v) => 1 - v));
  const dOut = edt(cerrado);
  const sdf = new Float32Array(N);
  for (let p = 0; p < N; p++) sdf[p] = (cerrado[p] ? -(dIn[p] - 0.5) : dOut[p] - 0.5) * H;
  // suavizado (caja 3x3x3, dos pasadas) para quitar el escalonado de los vóxeles
  const tmp = new Float32Array(N);
  for (let pasada = 0; pasada < 2; pasada++) {
    for (let k = 1; k < NZ - 1; k++) for (let j = 1; j < NY - 1; j++) for (let i = 1; i < NX - 1; i++) {
      let s = 0;
      for (let c = -1; c <= 1; c++) for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) s += sdf[ix(i + a, j + b, k + c)];
      tmp[ix(i, j, k)] = s / 27;
    }
    for (let k = 1; k < NZ - 1; k++) for (let j = 1; j < NY - 1; j++) for (let i = 1; i < NX - 1; i++) sdf[ix(i, j, k)] = tmp[ix(i, j, k)];
  }
  // etiqueta del giro más cercano (propagación por capas, hasta ~12 mm) y distancia a él
  const dist = new Uint8Array(N).fill(255);
  let frente = [];
  for (let p = 0; p < N; p++) if (etiq[p]) { dist[p] = 0; frente.push(p); }
  for (let paso = 1; paso <= 14 && frente.length; paso++) {
    const nuevo = [];
    for (const p of frente) {
      const i = p % NX, j = Math.floor(p / NX) % NY, k = Math.floor(p / (NX * NY));
      const vec = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
      for (const [a, b, c] of vec) {
        const ii = i + a, jj = j + b, kk = k + c;
        if (ii < 0 || jj < 0 || kk < 0 || ii >= NX || jj >= NY || kk >= NZ) continue;
        const q = ix(ii, jj, kk);
        if (dist[q] !== 255) continue;
        dist[q] = paso; etiq[q] = etiq[p]; nuevo.push(q);
      }
    }
    frente = nuevo;
  }
  // empaquetar: sdf en int16 (centésimas de unidad), etiqueta y distancia en uint8
  const s16 = new Int16Array(N);
  for (let p = 0; p < N; p++) s16[p] = Math.max(-32767, Math.min(32767, Math.round(sdf[p] * 1000)));
  const cab = new Int32Array([NX, NY, NZ]);
  const geo = new Float32Array([B0[0], B0[1], B0[2], H]);
  const buf = Buffer.concat([Buffer.from(cab.buffer), Buffer.from(geo.buffer), Buffer.from(s16.buffer), Buffer.from(etiq.buffer), Buffer.from(dist.buffer)]);
  writeFileSync(`${SALIDA}/hemisferio-${lado}.bin`, gzipSync(buf, { level: 9 }));
  console.log(`  hemisferio ${lado}: ${NX}×${NY}×${NZ} vóxeles · ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}

// --- mallas que se usan directamente --------------------------------------------------
const MALLAS = {
  cerebelo: ['FJ1781', 'FJ1830'],
  mesencefalo: ['FJ1770', 'FJ1817', 'FJ1762', 'FJ1779', 'FJ1810', 'FJ1826'],
  puente: ['FJ1775', 'FJ1822'],
  bulbo: ['FJ1769', 'FJ1831'],
  insula_der: ['FJ1749'],
  hipocampo_der: ['FJ1807'],
};
function guardarMallas() {
  const partes = [], bloques = [];
  let off = 0;
  for (const [nombre, ids] of Object.entries(MALLAS)) {
    for (const id of ids) {
      const m = leerOBJ(id);
      partes.push({ nombre, id, nv: m.pos.length / 3, ni: m.idx.length, p: off, i: off + m.pos.byteLength });
      bloques.push(Buffer.from(m.pos.buffer), Buffer.from(m.idx.buffer));
      off += m.pos.byteLength + m.idx.byteLength;
    }
  }
  const cab = Buffer.from(JSON.stringify(partes));
  const largo = Buffer.alloc(4); largo.writeUInt32LE(cab.length);
  const pad = Buffer.alloc((4 - ((4 + cab.length) % 4)) % 4);
  writeFileSync(`${SALIDA}/mallas.bin`, gzipSync(Buffer.concat([largo, cab, pad, ...bloques]), { level: 9 }));
  console.log(`  mallas: ${partes.length}`);
}

console.log('Preparando datos de BodyParts3D…');
prepararHemisferio('der');
prepararHemisferio('izq');
guardarMallas();
writeFileSync(`${SALIDA}/LEEME.txt`, `Datos derivados de BodyParts3D, © The Database Center for Life Science, licencia Creative Commons Atribución 4.0 Internacional (CC BY 4.0).
https://dbarchive.biosciencedbc.jp/en/bodyparts3d/
Generados con scripts/preparar-bp3d.mjs a partir del paquete partof_BP3D_4.0_obj_99 (escalados, voxelizados y con los huecos rellenos).
Texto de la licencia: https://creativecommons.org/licenses/by/4.0/
The Database Center for Life Science no participa en este proyecto ni lo respalda.
`);
