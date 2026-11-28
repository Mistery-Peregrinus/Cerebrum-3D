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

const CALIDADES = {
  alta: { tele: 128, cerebelo: 110, talloNT: 200, talloNP: 112, masa: 0.42 },
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
  let triangulos = 0;
  const codificarMalla = (malla) => {
    const g = malla.geometry;
    const pos = g.attributes.position.array, nor = g.attributes.normal.array;
    const col = g.attributes.color ? g.attributes.color.array : null;
    const nv = pos.length / 3;
    const q = new Int16Array(pos.length);
    for (let i = 0; i < pos.length; i++) {
      const k = i % 3;
      q[i] = Math.round(((pos[i] - min[k]) / rango[k]) * 65535) - 32768;
    }
    const n8 = new Int8Array(nor.length);
    for (let i = 0; i < nor.length; i++) n8[i] = Math.max(-127, Math.min(127, Math.round(nor[i] * 127)));
    const c8 = new Uint8Array(nv * 3);
    for (let i = 0; i < nv * 3; i++) c8[i] = col ? Math.max(0, Math.min(255, Math.round(col[i] * 255))) : 255;
    const idx = g.index.array;
    triangulos += idx.length / 3;
    const i32 = nv > 65535;
    const ind = i32 ? Uint32Array.from(idx) : Uint16Array.from(idx);
    return {
      nv, ni: idx.length, i32,
      fijo: malla.userData.colorFijo ? `#${malla.userData.colorFijo.getHexString()}` : null,
      o: { p: agregar(delta(q, 3)), n: agregar(delta(n8, 3)), c: agregar(delta(c8, 3)), i: agregar(delta(ind, 1)) },
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

  const cabecera = new TextEncoder().encode(JSON.stringify({ version: 2, cuant: { min, rango }, divisiones }));
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
