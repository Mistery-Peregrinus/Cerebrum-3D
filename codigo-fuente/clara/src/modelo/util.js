// Utilidades geométricas para el modelado procedural del encéfalo.
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ---------------------------------------------------------------------------
// Ruido simplex 3D (algoritmo de Stefan Gustavson, dominio público)
// ---------------------------------------------------------------------------
export function crearRuido(semilla = 1) {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = (semilla * 2654435761) >>> 0 || 1;
  const rnd = () => {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = p[i]; p[i] = p[j]; p[j] = t;
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) { perm[i] = p[i & 255]; permMod12[i] = perm[i] % 12; }
  const g = new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]);
  const F3 = 1 / 3, G3 = 1 / 6;

  return function ruido3(xin, yin, zin) {
    const s0 = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s0), j = Math.floor(yin + s0), k = Math.floor(zin + s0);
    const t = (i + j + k) * G3;
    const x0 = xin - (i - t), y0 = yin - (j - t), z0 = zin - (k - t);
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }
    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;
    let n = 0;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 > 0) { const gi = permMod12[ii + perm[jj + perm[kk]]] * 3; t0 *= t0; n += t0 * t0 * (g[gi] * x0 + g[gi + 1] * y0 + g[gi + 2] * z0); }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 > 0) { const gi = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3; t1 *= t1; n += t1 * t1 * (g[gi] * x1 + g[gi + 1] * y1 + g[gi + 2] * z1); }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 > 0) { const gi = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3; t2 *= t2; n += t2 * t2 * (g[gi] * x2 + g[gi + 1] * y2 + g[gi + 2] * z2); }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 > 0) { const gi = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3; t3 *= t3; n += t3 * t3 * (g[gi] * x3 + g[gi + 1] * y3 + g[gi + 2] * z3); }
    return 32 * n;
  };
}

// ---------------------------------------------------------------------------
// Funciones matemáticas
// ---------------------------------------------------------------------------
export const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
export function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}
export const gauss = (x, w) => Math.exp(-(x / w) * (x / w));
export const lerp = (a, b, t) => a + (b - a) * t;
export function difAngulo(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

// Distancia con signo aproximada a un elipsoide (Inigo Quilez)
export function sdElipsoide(x, y, z, cx, cy, cz, rx, ry, rz) {
  const px = x - cx, py = y - cy, pz = z - cz;
  const k0 = Math.hypot(px / rx, py / ry, pz / rz);
  const k1 = Math.hypot(px / (rx * rx), py / (ry * ry), pz / (rz * rz));
  if (k1 < 1e-9) return -Math.min(rx, ry, rz);
  return (k0 * (k0 - 1)) / k1;
}
export function smin(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}
export const smax = (a, b, k) => -smin(-a, -b, k);

// ---------------------------------------------------------------------------
// Geometría
// ---------------------------------------------------------------------------
export function esferaUnitaria(detalle) {
  let g = new THREE.IcosahedronGeometry(1, detalle);
  g.deleteAttribute('normal');
  g.deleteAttribute('uv');
  g = mergeVertices(g, 1e-6);
  return g;
}

export function gradienteSDF(sdf, x, y, z, out, e = 0.01) {
  out.set(
    sdf(x + e, y, z) - sdf(x - e, y, z),
    sdf(x, y + e, z) - sdf(x, y - e, z),
    sdf(x, y, z + e) - sdf(x, y, z - e),
  );
  if (out.lengthSq() < 1e-14) out.set(0, 1, 0);
  return out.normalize();
}

// Proyecta los vértices de una esfera unitaria sobre la superficie sdf = 0,
// marchando desde fuera hacia el centro (se queda con la superficie más externa).
export function envolverSDF(geo, centro, sdf, rMax = 12) {
  const pos = geo.attributes.position;
  const d = new THREE.Vector3();
  const cx = centro.x, cy = centro.y, cz = centro.z;
  for (let i = 0; i < pos.count; i++) {
    d.fromBufferAttribute(pos, i).normalize();
    const f = (r) => sdf(cx + d.x * r, cy + d.y * r, cz + d.z * r);
    let r = rMax;
    for (let k = 0; k < 200; k++) {
      const v = f(r);
      if (v < 0.003) break;
      r -= Math.max(v * 0.85, 0.003);
      if (r <= 0) { r = 0; break; }
    }
    let lo = Math.max(0, r - 0.06), hi = r + 0.06;
    if (f(lo) < 0 && f(hi) > 0) {
      for (let k = 0; k < 10; k++) {
        const m = (lo + hi) / 2;
        if (f(m) > 0) hi = m; else lo = m;
      }
      r = (lo + hi) / 2;
    }
    pos.setXYZ(i, cx + d.x * r, cy + d.y * r, cz + d.z * r);
  }
  pos.needsUpdate = true;
}

// Divide una geometría indexada en varias según una etiqueta por vértice
// (cada triángulo va a la etiqueta mayoritaria de sus vértices).
export function dividirPorEtiquetas(geo, etiquetas, nEtiquetas) {
  const idx = geo.index.array;
  const attrs = ['position', 'normal', 'color'].filter((a) => geo.attributes[a]);
  const listas = Array.from({ length: nEtiquetas }, () => []);
  for (let t = 0; t < idx.length; t += 3) {
    const a = etiquetas[idx[t]], b = etiquetas[idx[t + 1]], c = etiquetas[idx[t + 2]];
    let e = a;
    if (b === c) e = b;
    if (e < 0) continue;
    listas[e].push(idx[t], idx[t + 1], idx[t + 2]);
  }
  return listas.map((lista) => {
    if (!lista.length) return null;
    const mapa = new Map();
    const nuevoIdx = new Uint32Array(lista.length);
    let n = 0;
    for (let i = 0; i < lista.length; i++) {
      let v = mapa.get(lista[i]);
      if (v === undefined) { v = n++; mapa.set(lista[i], v); }
      nuevoIdx[i] = v;
    }
    const g = new THREE.BufferGeometry();
    for (const nombre of attrs) {
      const src = geo.attributes[nombre];
      const arr = new Float32Array(n * src.itemSize);
      for (const [viejo, nuevo] of mapa) {
        for (let c = 0; c < src.itemSize; c++) arr[nuevo * src.itemSize + c] = src.array[viejo * src.itemSize + c];
      }
      g.setAttribute(nombre, new THREE.BufferAttribute(arr, src.itemSize));
    }
    g.setIndex(new THREE.BufferAttribute(nuevoIdx, 1));
    g.computeBoundingSphere();
    return g;
  });
}

// Espejo en X (para el lado izquierdo), invirtiendo el sentido de los triángulos.
export function espejarX(geo) {
  const g = geo.clone();
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setX(i, -pos.getX(i));
  if (g.attributes.normal) {
    const nor = g.attributes.normal;
    for (let i = 0; i < nor.count; i++) nor.setX(i, -nor.getX(i));
  }
  const idx = g.index.array;
  for (let t = 0; t < idx.length; t += 3) { const a = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = a; }
  g.index.needsUpdate = true;
  g.computeBoundingSphere();
  return g;
}

// Masa deformada a partir de una esfera: centro, radios y función de relieve opcional.
// relieve(x, y, z, nx, ny, nz) -> desplazamiento a lo largo de la normal.
// Las estructuras pequeñas no necesitan tanta resolución: el detalle se escala con este factor.
let FACTOR_MASA = 0.4;
export function configurarDetalle(factor) { FACTOR_MASA = factor; }

export function masa(detalle, centro, radios, relieve = null, ao = 0) {
  const geo = esferaUnitaria(Math.max(5, Math.round(detalle * FACTOR_MASA)));
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  const v = new THREE.Vector3(), n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    n.set(v.x / radios[0], v.y / radios[1], v.z / radios[2]).normalize();
    let x = centro[0] + v.x * radios[0], y = centro[1] + v.y * radios[1], z = centro[2] + v.z * radios[2];
    let d = 0;
    if (relieve) d = relieve(x, y, z, n.x, n.y, n.z, v.x, v.y, v.z);
    x += n.x * d; y += n.y * d; z += n.z * d;
    pos.setXYZ(i, x, y, z);
    const c = ao ? clamp(1 + d * ao, 0.45, 1) : 1;
    col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = c;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

// Tubo de radio variable a lo largo de una curva, con tapas.
// escala = [sN, sB] estira la sección transversal (normal, binormal).
export function tubo(puntos, radioFn, segs = 64, radial = 16, escala = [1, 1], relieve = null) {
  const curva = puntos instanceof THREE.Curve ? puntos : new THREE.CatmullRomCurve3(puntos.map((p) => new THREE.Vector3(...p)), false, 'centripetal');
  const frames = curva.computeFrenetFrames(segs, false);
  const vert = [];
  const P = new THREE.Vector3(), dir = new THREE.Vector3();
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    curva.getPointAt(t, P);
    const N = frames.normals[i], B = frames.binormals[i];
    const r = radioFn(t);
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      dir.set(0, 0, 0).addScaledVector(N, Math.cos(a) * escala[0]).addScaledVector(B, Math.sin(a) * escala[1]);
      let rr = r;
      if (relieve) rr += relieve(t, a);
      vert.push(P.x + dir.x * rr, P.y + dir.y * rr, P.z + dir.z * rr);
    }
  }
  const idx = [];
  for (let i = 0; i < segs; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j, b = i * radial + ((j + 1) % radial);
      const c = (i + 1) * radial + j, d = (i + 1) * radial + ((j + 1) % radial);
      idx.push(a, c, b, b, c, d);
    }
  }
  // tapas
  const p0 = curva.getPointAt(0), p1 = curva.getPointAt(1);
  const i0 = vert.length / 3; vert.push(p0.x, p0.y, p0.z);
  const i1 = vert.length / 3; vert.push(p1.x, p1.y, p1.z);
  const ult = segs * radial;
  for (let j = 0; j < radial; j++) {
    idx.push(i0, j, (j + 1) % radial);
    idx.push(i1, ult + ((j + 1) % radial), ult + j);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vert, 3));
  const col = new Float32Array(vert.length).fill(1);
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

// Material de tejido nervioso
// Suavizado de Taubin (λ|μ): suaviza sin encoger la malla.
export function suavizarTaubin(geo, iteraciones = 4, lambda = 0.5, mu = -0.53, peso = null) {
  const pos = geo.attributes.position.array;
  const n = pos.length / 3;
  const idx = geo.index.array;
  // vecinos en formato CSR
  const grado = new Uint32Array(n);
  for (let t = 0; t < idx.length; t += 3) {
    const a = idx[t], b = idx[t + 1], c = idx[t + 2];
    grado[a] += 2; grado[b] += 2; grado[c] += 2;
  }
  const ini = new Uint32Array(n + 1);
  for (let i = 0; i < n; i++) ini[i + 1] = ini[i] + grado[i];
  const vec = new Uint32Array(ini[n]);
  const cur = ini.slice(0, n);
  for (let t = 0; t < idx.length; t += 3) {
    const a = idx[t], b = idx[t + 1], c = idx[t + 2];
    vec[cur[a]++] = b; vec[cur[a]++] = c;
    vec[cur[b]++] = a; vec[cur[b]++] = c;
    vec[cur[c]++] = a; vec[cur[c]++] = b;
  }
  const tmp = new Float32Array(pos.length);
  const paso = (f) => {
    for (let i = 0; i < n; i++) {
      let sx = 0, sy = 0, sz = 0;
      const k0 = ini[i], k1 = ini[i + 1];
      for (let k = k0; k < k1; k++) { const j = vec[k] * 3; sx += pos[j]; sy += pos[j + 1]; sz += pos[j + 2]; }
      const m = k1 - k0 || 1;
      const w = peso ? f * peso[i] : f;
      const i3 = i * 3;
      tmp[i3] = pos[i3] + w * (sx / m - pos[i3]);
      tmp[i3 + 1] = pos[i3 + 1] + w * (sy / m - pos[i3 + 1]);
      tmp[i3 + 2] = pos[i3 + 2] + w * (sz / m - pos[i3 + 2]);
    }
    pos.set(tmp);
  };
  for (let it = 0; it < iteraciones; it++) { paso(lambda); paso(mu); }
  geo.attributes.position.needsUpdate = true;
}

/**
 * Material de tejido nervioso: aspecto húmedo leve (clearcoat), "sheen" rosado que imita la
 * dispersión subsuperficial, caras internas oscurecidas y una zona iluminable (foco) que se
 * usa para resaltar estructuras al seleccionarlas.
 * @param foco uniforms compartidos { uFoco, uRadio, uBrillo, uColorFoco, uTiempo }
 */
let LIGERO = false;
/** Modo ligero: material estándar (sin clearcoat ni sheen), más barato para GPUs modestas. */
export function configurarCalidad(ligero) { LIGERO = !!ligero; }

export function materialTejido(color = 0xe2b3a6, foco = null) {
  const mat = LIGERO ? new THREE.MeshStandardMaterial({
    color, roughness: 0.44, metalness: 0, vertexColors: true, side: THREE.DoubleSide,
  }) : new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.26,
    clearcoatRoughness: 0.4,
    sheen: 0.22,
    sheenRoughness: 0.55,
    sheenColor: new THREE.Color(0xf2c8bc),
    vertexColors: true,
    side: THREE.DoubleSide,
  });
  mat.onBeforeCompile = (sh) => {
    if (foco) Object.assign(sh.uniforms, foco);
    else Object.assign(sh.uniforms, { uFoco: { value: new THREE.Vector3() }, uRadio: { value: 1 }, uBrillo: { value: 0 }, uColorFoco: { value: new THREE.Color() }, uTiempo: { value: 0 }, uFantasma: { value: 0 } });
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosLocal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPosLocal = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosLocal;\nuniform vec3 uFoco; uniform float uRadio; uniform float uBrillo; uniform vec3 uColorFoco; uniform float uTiempo; uniform float uFantasma;')
      .replace('#include <opaque_fragment>', `#include <opaque_fragment>
        if (uFantasma > 0.001) {
          float fr = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));
          fr = pow(fr, 2.4);
          vec3 cRayos = mix(gl_FragColor.rgb, vec3(0.9, 0.82, 0.8), 0.4);
          gl_FragColor = vec4(mix(gl_FragColor.rgb, cRayos, uFantasma), mix(gl_FragColor.a, gl_FragColor.a * (0.05 + 1.5 * fr), uFantasma));
        }`)
      .replace('#include <color_fragment>', '#include <color_fragment>\n if (!gl_FrontFacing) diffuseColor.rgb *= vec3(0.55, 0.42, 0.42);')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        if (uBrillo > 0.001) {
          float dF = distance(vPosLocal, uFoco);
          float nucleo = 1.0 - smoothstep(uRadio * 0.25, uRadio, dF);
          float anillo = smoothstep(uRadio * 0.86, uRadio * 0.95, dF) - smoothstep(uRadio * 0.95, uRadio * 1.04, dF);
          float pulso = 0.78 + 0.22 * sin(uTiempo * 3.2);
          totalEmissiveRadiance += uColorFoco * uBrillo * (nucleo * 0.85 * pulso + anillo * 0.9);
          diffuseColor.rgb = mix(diffuseColor.rgb, uColorFoco, uBrillo * nucleo * 0.35);
        }`);
  };
  return mat;
}

export function crearFoco() {
  return {
    uFoco: { value: new THREE.Vector3() },
    uRadio: { value: 1 },
    uBrillo: { value: 0 },
    uColorFoco: { value: new THREE.Color(0x7c4dff) },
    uTiempo: { value: 0 },
    uFantasma: { value: 0 },
  };
}
