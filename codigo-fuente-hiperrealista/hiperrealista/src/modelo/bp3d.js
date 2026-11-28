// Acceso a los datos anatómicos de BodyParts3D preparados por scripts/preparar-bp3d.mjs.
// Solo se usa al generar el modelo (Node), no en el navegador.
// BodyParts3D, © The Database Center for Life Science, licencia CC BY 4.0.
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

const BASE = new URL('../datos-bp3d/', import.meta.url);

export const GIROS = [
  null, 'frontal_superior', 'frontal_medio', 'frontal_inferior', 'precentral', 'poscentral', 'supramarginal',
  'angular', 'parietal_superior', 'occipital', 'temporal_medio', 'temporal_inferior', 'fusiforme',
  'parahipocampal', 'cingulo', 'insula',
  // giros ausentes en el paquete, reconstruidos a partir de su posición
  'temporal_superior', 'orbitario',
];
export const G = Object.fromEntries(GIROS.map((n, i) => [n, i]).filter(([n]) => n));

const cache = {};
/** Rejilla del hemisferio (siempre en coordenadas de hemisferio derecho). */
export function cargarHemisferio(lado) {
  if (cache[lado]) return cache[lado];
  const buf = gunzipSync(readFileSync(new URL(`hemisferio-${lado}.bin`, BASE)));
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const [NX, NY, NZ] = new Int32Array(ab, 0, 3);
  const [X0, Y0, Z0, H] = new Float32Array(ab, 12, 4);
  const N = NX * NY * NZ;
  const s16 = new Int16Array(ab, 28, N);
  const etiq = new Uint8Array(ab, 28 + N * 2, N);
  const dist = new Uint8Array(ab, 28 + N * 3, N);
  const ix = (i, j, k) => (k * NY + j) * NX + i;
  const val = (i, j, k) => s16[ix(i, j, k)] / 1000;
  // distancia con signo (trilineal); fuera de la rejilla, distancia aproximada a la caja
  function sdf(x, y, z) {
    const fx = (x - X0) / H - 0.5, fy = (y - Y0) / H - 0.5, fz = (z - Z0) / H - 0.5;
    if (fx < 0 || fy < 0 || fz < 0 || fx >= NX - 1 || fy >= NY - 1 || fz >= NZ - 1) {
      const cx = Math.min(Math.max(fx, 0), NX - 1.001), cy = Math.min(Math.max(fy, 0), NY - 1.001), cz = Math.min(Math.max(fz, 0), NZ - 1.001);
      return Math.hypot(fx - cx, fy - cy, fz - cz) * H + 0.5;
    }
    const i = Math.floor(fx), j = Math.floor(fy), k = Math.floor(fz);
    const u = fx - i, v = fy - j, w = fz - k;
    const c00 = val(i, j, k) * (1 - u) + val(i + 1, j, k) * u;
    const c10 = val(i, j + 1, k) * (1 - u) + val(i + 1, j + 1, k) * u;
    const c01 = val(i, j, k + 1) * (1 - u) + val(i + 1, j, k + 1) * u;
    const c11 = val(i, j + 1, k + 1) * (1 - u) + val(i + 1, j + 1, k + 1) * u;
    return (c00 * (1 - v) + c10 * v) * (1 - w) + (c01 * (1 - v) + c11 * v) * w;
  }
  const vox = (x, y, z) => {
    const i = Math.min(NX - 1, Math.max(0, Math.floor((x - X0) / H)));
    const j = Math.min(NY - 1, Math.max(0, Math.floor((y - Y0) / H)));
    const k = Math.min(NZ - 1, Math.max(0, Math.floor((z - Z0) / H)));
    return ix(i, j, k);
  };
  /** Giro real más cercano y su distancia (en vóxeles de ~1 mm; 255 = lejos). */
  const etiqueta = (x, y, z) => { const p = vox(x, y, z); return { e: etiq[p], d: dist[p] }; };
  cache[lado] = { sdf, etiqueta, H };
  return cache[lado];
}

/** Mallas directas (cerebelo, tallo, ínsula, hipocampo) en coordenadas de la app. */
export function cargarMallas() {
  if (cache.mallas) return cache.mallas;
  const buf = gunzipSync(readFileSync(new URL('mallas.bin', BASE)));
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const largo = new DataView(ab).getUint32(0, true);
  const partes = JSON.parse(new TextDecoder().decode(new Uint8Array(ab, 4, largo)));
  const base = 4 + largo + ((4 - ((4 + largo) % 4)) % 4);
  const out = {};
  for (const p of partes) {
    const pos = new Float32Array(ab.slice(base + p.p, base + p.p + p.nv * 12));
    const idx = new Uint32Array(ab.slice(base + p.i, base + p.i + p.ni * 4));
    (out[p.nombre] ||= []).push({ id: p.id, pos, idx });
  }
  cache.mallas = out;
  return out;
}
