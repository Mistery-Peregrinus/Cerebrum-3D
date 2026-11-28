// Carga el modelo pregenerado (binario gzip con codificación delta) y reconstruye las partes.
import { t as tr } from '../i18n.js';
import * as THREE from 'three';
import { crearParte } from './partes.js';
import { materialTejido } from './util.js';

const pausa = () => new Promise((r) => setTimeout(r, 0));

async function descomprimir(url) {
  const resp = await fetch(url);
  if (!('DecompressionStream' in window)) throw new Error(tr('Este navegador es demasiado antiguo (falta DecompressionStream). Actualiza Chrome, Edge o Firefox.', 'This browser is too old (DecompressionStream is missing). Please update Chrome, Edge or Firefox.'));
  const flujo = resp.body.pipeThrough(new DecompressionStream('gzip'));
  return new Response(flujo).arrayBuffer();
}

// Deshace la codificación delta (la aritmética de los arreglos tipados envuelve igual que al codificar).
function integrar(arr, paso) {
  for (let i = paso; i < arr.length; i++) arr[i] += arr[i - paso];
  return arr;
}

/**
 * @param url      URL del binario
 * @param progreso callback(texto, fraccion 0..1)
 * @returns { [division]: { id, grupo, partes, unidades, anclas, espejarAnclas } }
 */
export async function cargarModelo(url, progreso = () => {}) {
  progreso(tr('Descomprimiendo el modelo', 'Decompressing the model'), 0.08);
  const buf = await descomprimir(url);
  const dv = new DataView(buf);
  const largoCab = dv.getUint32(0, true);
  const cab = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 4, largoCab)));
  const base = 4 + largoCab + ((4 - ((4 + largoCab) % 4)) % 4);
  const { min, rango } = cab.cuant;

  const geometria = (m) => {
    const q = integrar(new Int16Array(buf, base + m.o.p, m.nv * 3), 3);
    const pos = new Float32Array(m.nv * 3);
    for (let i = 0; i < pos.length; i++) {
      const k = i % 3;
      pos[i] = min[k] + ((q[i] + 32768) / 65535) * rango[k];
    }
    const nor = integrar(new Int8Array(buf, base + m.o.n, m.nv * 3), 3);
    const col = integrar(new Uint8Array(buf, base + m.o.c, m.nv * 3), 3);
    const ind = integrar(m.i32 ? new Uint32Array(buf, base + m.o.i, m.ni) : new Uint16Array(buf, base + m.o.i, m.ni), 1);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3, true));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3, true));
    g.setIndex(new THREE.BufferAttribute(ind, 1));
    g.computeBoundingSphere();
    return g;
  };

  const modelos = {};
  const n = cab.divisiones.length;
  for (let d = 0; d < n; d++) {
    const div = cab.divisiones[d];
    progreso(tr(`Construyendo ${div.id === 'tallo' ? 'tallo cerebral' : div.id}`, `Building ${({ telencefalo: 'telencephalon', diencefalo: 'diencephalon', cerebelo: 'cerebellum', tallo: 'brainstem' })[div.id] || div.id}`), 0.15 + (0.45 * d) / n);
    await pausa();
    const grupo = new THREE.Group();
    grupo.name = div.id;
    const unidades = div.unidades.map((u) => {
      const ug = new THREE.Group();
      ug.name = u.id;
      grupo.add(ug);
      return { id: u.id, lado: u.lado, grupo: ug, partes: [], separacion: new THREE.Vector3(...u.separacion), actual: new THREE.Vector3(), objetivo: new THREE.Vector3() };
    });
    const partes = div.partes.map((p) => {
      const normales = p.mallas.filter((m) => !m.fijo).map(geometria);
      const fijas = p.mallas.filter((m) => m.fijo).map((m) => ({ geo: geometria(m), color: new THREE.Color(m.fijo).getHex() }));
      const parte = crearParte({ id: p.id, division: div.id, lado: p.lado, geometrias: normales, fijas, explosion: p.explosion, profunda: p.profunda });
      const u = p.unidad && unidades.find((x) => x.id === p.unidad);
      if (u) { parte.unidad = u; u.partes.push(parte); u.grupo.add(parte.grupo); } else grupo.add(parte.grupo);
      return parte;
    });
    for (const dec of div.decorativos) {
      for (const m of dec.mallas) {
        const malla = new THREE.Mesh(geometria(m), materialTejido(0xd2ab9e));
        malla.userData.decorativo = true;
        grupo.add(malla);
      }
    }
    modelos[div.id] = { id: div.id, grupo, partes, unidades, anclas: div.anclas, espejarAnclas: div.espejarAnclas };
  }
  return modelos;
}
