// Genera el modelo 3D una sola vez (al compilar) y lo guarda en binario comprimido.
// Así la app no tiene que calcular la geometría en cada apertura.
// Salida (gzip): src/generado/modelo-alta.bin y src/generado/modelo-baja.bin
import { mkdirSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { construirTelencefalo } from '../src/modelo/telencefalo.js';
import { construirDiencefalo } from '../src/modelo/diencefalo.js';
import { construirCerebelo } from '../src/modelo/cerebelo.js';
import { construirTallo } from '../src/modelo/tallo.js';
import { configurarDetalle } from '../src/modelo/util.js';

const SIN_NORMALES = true;
const PASOS = 16383;
const CALIDADES = {
  alta: { tele: 144, cerebelo: 110, talloNT: 200, talloNP: 112, masa: 0.42 },
  baja: { tele: 72, cerebelo: 66, talloNT: 110, talloNP: 64, masa: 0.3 },
};

function generar(nombre, c) {
  const t0 = Date.now();
  configurarDetalle(c.masa);
  const modelos = [
    construirTelencefalo(c.tele),
    construirDiencefalo(),
    construirCerebelo(c.cerebelo),
    construirTallo(c.talloNT, c.talloNP),
  ];
  // caja global para cuantizar posiciones
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  const todasMallas = [];
  for (const m of modelos) m.grupo.traverse((o) => { if (o.isMesh) todasMallas.push(o); });
  for (const malla of todasMallas) {
    const p = malla.geometry.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { if (p[i + k] < min[k]) min[k] = p[i + k]; if (p[i + k] > max[k]) max[k] = p[i + k]; }
  }
  const rango = max.map((v, k) => v - min[k]);

  const bloques = [];
  let offset = 0;
  const agregar = (typed) => {
    const bytes = new Uint8Array(typed.buffer, typed.byteOffset, typed.byteLength);
    const o = offset;
    bloques.push(bytes);
    offset += bytes.byteLength;
    const pad = (4 - (offset % 4)) % 4;
    if (pad) { bloques.push(new Uint8Array(pad)); offset += pad; }
    return o;
  };
  // Codificación delta sin pérdida (módulo 2^bits): mejora mucho la compresión.
  const delta = (arr, paso) => { const out = new arr.constructor(arr.length); for (let i = arr.length - 1; i >= 0; i--) out[i] = i >= paso ? arr[i] - arr[i - paso] : arr[i]; return out; };
  // Enteros de longitud variable (LEB128) en zigzag: diferencias pequeñas ocupan 1 byte
  const varint = (valores) => {
    const out = [];
    for (let i = 0; i < valores.length; i++) {
      let v = valores[i];
      v = v >= 0 ? v * 2 : -v * 2 - 1;
      while (v >= 128) { out.push((v % 128) | 128); v = Math.floor(v / 128); }
      out.push(v);
    }
    return Uint8Array.from(out);
  };
  const diferencias = (arr, paso) => { const d = new Float64Array(arr.length); for (let i = 0; i < arr.length; i++) d[i] = i >= paso ? arr[i] - arr[i - paso] : arr[i]; return d; };
  let triangulos = 0;
  // Reordena los vértices según su primer uso en la lista de triángulos: vértices consecutivos
  // quedan cerca en el espacio y los índices crecen poco a poco, así la compresión es mucho mejor.
  const reordenar = (g) => {
    const I = g.index.array, P = g.attributes.position.array, Nn = g.attributes.normal.array;
    const C = g.attributes.color ? g.attributes.color.array : null;
    const mapa = new Int32Array(P.length / 3).fill(-1);
    const orden = [];
    const idx = new Uint32Array(I.length);
    for (let t = 0; t < I.length; t++) { let v = mapa[I[t]]; if (v < 0) { v = orden.length; mapa[I[t]] = v; orden.push(I[t]); } idx[t] = v; }
    const pos = new Float32Array(orden.length * 3), nor = new Float32Array(orden.length * 3), col = C ? new Float32Array(orden.length * 3) : null;
    orden.forEach((v, i) => { for (let c = 0; c < 3; c++) { pos[i * 3 + c] = P[v * 3 + c]; nor[i * 3 + c] = Nn[v * 3 + c]; if (col) col[i * 3 + c] = C[v * 3 + c]; } });
    return { pos, nor, col, idx };
  };
  const codificarMalla = (malla) => {
    const g = malla.geometry;
    const { pos, nor, col, idx } = reordenar(g);
    const nv = pos.length / 3;
    const q = new Int16Array(pos.length);
    for (let i = 0; i < pos.length; i++) {
      const k = i % 3;
      q[i] = Math.round(((pos[i] - min[k]) / rango[k]) * PASOS); // 14 bits: ~0.01 mm, invisible
    }
    const n8 = new Int8Array(nor.length);
    for (let i = 0; i < nor.length; i++) n8[i] = Math.max(-127, Math.min(127, Math.round(nor[i] * 127)));
    const c8 = new Uint8Array(nv * 3);
    for (let i = 0; i < nv * 3; i++) c8[i] = col ? Math.max(0, Math.min(255, Math.round(col[i] * 255))) : 255;
    triangulos += idx.length / 3;
    const vp = varint(diferencias(q, 3)), vi = varint(diferencias(idx, 1));
    return {
      nv, ni: idx.length, bp: vp.length, bi: vi.length,
      fijo: malla.userData.colorFijo ? `#${malla.userData.colorFijo.getHexString()}` : null,
      // las normales no se guardan: el navegador las recalcula al cargar (ahorra ~25 % de datos)
      o: { p: agregar(vp), n: SIN_NORMALES ? -1 : agregar(delta(n8, 3)), c: agregar(delta(c8, 3)), i: agregar(vi) },
    };
  };

  const divisiones = modelos.map((m) => ({
    id: m.id,
    espejarAnclas: m.espejarAnclas,
    anclas: Object.fromEntries(Object.entries(m.anclas).map(([k, v]) => [k, Array.from(v).map((x) => +x.toFixed(4))])),
    unidades: m.unidades.map((u) => ({ id: u.id, lado: u.lado, separacion: u.separacion.toArray() })),
    partes: m.partes.map((p) => ({
      id: p.id, lado: p.lado, explosion: p.explosion.toArray(), profunda: p.profunda,
      unidad: p.unidad ? p.unidad.id : null,
      mallas: p.meshes.map(codificarMalla),
    })),
    decorativos: m.grupo.children.filter((o) => o.isMesh && o.userData.decorativo).map((o) => ({ mallas: [codificarMalla(o)] })),
  }));

  const cabecera = new TextEncoder().encode(JSON.stringify({ version: 3, cuant: { min, rango, pasos: PASOS }, divisiones }));
  const padCab = (4 - ((4 + cabecera.length) % 4)) % 4;
  const total = 4 + cabecera.length + padCab + offset;
  const salida = new Uint8Array(total);
  new DataView(salida.buffer).setUint32(0, cabecera.length, true);
  salida.set(cabecera, 4);
  let pos = 4 + cabecera.length + padCab;
  for (const b of bloques) { salida.set(b, pos); pos += b.byteLength; }
  const gz = gzipSync(salida, { level: 9 });
  writeFileSync(`src/generado/modelo-${nombre}.bin`, gz);
  console.log(`  ${nombre}: ${(triangulos / 1e6).toFixed(2)} M triángulos · ${(salida.length / 1048576).toFixed(1)} MB → ${(gz.length / 1048576).toFixed(1)} MB comprimido · ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}

mkdirSync('src/generado', { recursive: true });
console.log('Generando modelo 3D…');
for (const [nombre, c] of Object.entries(CALIDADES)) generar(nombre, c);
