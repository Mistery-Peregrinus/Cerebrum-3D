// Modos «Sinapsis» y «Neurotransmisores»: animación paso a paso de la sinapsis química
// (configurable por neurotransmisor) y de la sinapsis eléctrica (uniones en hendidura).
import { t as tr } from '../i18n.js';
import * as THREE from 'three';
import { tubo, masa, materialTejido, crearFoco, smoothstep, clamp } from '../modelo/util.js';
import { crearGrafica } from './grafica.js';
import { aleatorio } from './neuronas.js';
import {
  NEUROTRANSMISORES, GRUPOS_NT, PASOS_QUIMICA, DURACION_QUIMICA, PASOS_ELECTRICA, DURACION_ELECTRICA,
} from '../datos/neuro.js';

const e01 = (a, b, t) => smoothstep(a, b, t);
const lin = (a, b, t) => clamp((t - a) / (b - a), 0, 1);
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

// superficies de las membranas (elipsoides)
const PRE = { c: V3(0, 4.4, 0), r: [4.0, 3.0, 4.0] };
const POST = { c: V3(0, -4.2, 0), r: [5.2, 3.0, 5.2] };
const yPre = (x, z) => PRE.c.y - PRE.r[1] * Math.sqrt(Math.max(0, 1 - (x / PRE.r[0]) ** 2 - (z / PRE.r[2]) ** 2));
const yPost = (x, z) => POST.c.y + POST.r[1] * Math.sqrt(Math.max(0, 1 - (x / POST.r[0]) ** 2 - (z / POST.r[2]) ** 2));

function membrana(geo, color, foco, opacidad = 0.5) {
  const m = materialTejido(color, foco);
  m.transparent = true; m.opacity = opacidad; m.depthWrite = false;
  foco.uFantasma.value = 0.72;
  const mesh = new THREE.Mesh(geo, m);
  mesh.renderOrder = 2;
  return mesh;
}
function instancias(geo, mat, n) {
  const im = new THREE.InstancedMesh(geo, mat, n);
  im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  return im;
}

// ---------------------------------------------------------------------------
// Escena química
// ---------------------------------------------------------------------------
function escenaQuimica(LIGERO) {
  const rnd = aleatorio(7);
  const g = new THREE.Group();
  const focoPre = crearFoco(), focoPost = crearFoco();
  const pre = membrana(masa(56, PRE.c.toArray(), PRE.r), 0xe7b49c, focoPre);
  const axon = membrana(tubo([[0, 13.5, 0], [0.3, 9.5, 0], [0, 6.8, 0]], () => 1.0, 30, 18), 0xe7b49c, focoPre);
  const post = membrana(masa(56, POST.c.toArray(), POST.r), 0xd9a6c4, focoPost);
  pre.userData.etiqueta = tr('Terminal presináptica', 'Presynaptic terminal'); post.userData.etiqueta = tr('Neurona postsináptica', 'Postsynaptic neuron');
  g.add(pre, axon, post);
  const psd = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 2.9, 0.12, 40), new THREE.MeshStandardMaterial({ color: 0x8a3b4a, transparent: true, opacity: 0.55, roughness: 0.6 }));
  psd.position.set(0, yPost(0, 0) - 0.12, 0); psd.scale.set(1, 1, 0.75);
  psd.userData.etiqueta = tr('Densidad postsináptica', 'Postsynaptic density');
  g.add(psd);

  // vesículas
  const docks = [];
  for (let i = 0; i < 8; i++) { const x = -2.1 + (i % 4) * 1.4, z = i < 4 ? -0.75 : 0.75; docks.push(V3(x, yPre(x, z) + 0.55, z)); }
  const reserva = [];
  while (reserva.length < (LIGERO ? 18 : 28)) {
    const p = V3((rnd() * 2 - 1) * 3.0, PRE.c.y + (rnd() * 2 - 1) * 2.1, (rnd() * 2 - 1) * 3.0);
    const k = (p.x / 3.1) ** 2 + ((p.y - PRE.c.y) / 2.3) ** 2 + (p.z / 3.1) ** 2;
    if (k < 1 && p.y > 2.75) reserva.push(p);
  }
  const NV = docks.length + reserva.length;
  const capa = instancias(new THREE.SphereGeometry(0.44, 18, 12), new THREE.MeshPhysicalMaterial({ color: 0xf4efe8, transparent: true, opacity: 0.38, roughness: 0.2, clearcoat: 0.6, depthWrite: false }), NV);
  capa.renderOrder = 3;
  const nucleo = instancias(new THREE.SphereGeometry(0.28, 14, 10), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.25 }), NV);
  capa.userData.etiqueta = nucleo.userData.etiqueta = tr('Vesículas sinápticas', 'Synaptic vesicles');
  g.add(capa, nucleo);

  // canales de Ca²⁺
  const canalesCa = [];
  const matCa = new THREE.MeshStandardMaterial({ color: 0x4fb3bf, roughness: 0.4, emissive: 0x4fb3bf, emissiveIntensity: 0.1 });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3, x = Math.cos(a) * 2.9, z = Math.sin(a) * 1.9;
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.75, 12, 1, true), matCa);
    c.position.set(x, yPre(x, z), z);
    c.userData.etiqueta = tr('Canal de Ca²⁺ dependiente de voltaje', 'Voltage-gated Ca²⁺ channel'); c.userData.paso = 1;
    g.add(c); canalesCa.push(c.position.clone());
  }
  // receptores (+ proteína G para metabotrópicos)
  const receptores = [];
  const matRec = new THREE.MeshStandardMaterial({ color: 0x9aa7b8, roughness: 0.35, emissive: 0x000000 });
  const geoRec = new THREE.CylinderGeometry(0.3, 0.34, 0.85, 14);
  const geoG = new THREE.SphereGeometry(0.24, 14, 10);
  const matG = new THREE.MeshStandardMaterial({ color: 0xffb36b, roughness: 0.4, emissive: 0xffb36b, emissiveIntensity: 0.15 });
  for (const x of [-2.4, -1.2, 0, 1.2, 2.4]) {
    for (const z of [-0.85, 0.85]) {
      const y = yPost(x, z);
      const r = new THREE.Mesh(geoRec, matRec.clone());
      r.position.set(x, y + 0.12, z);
      r.userData.etiqueta = tr('Receptor postsináptico', 'Postsynaptic receptor'); r.userData.paso = 3;
      const gp = new THREE.Mesh(geoG, matG.clone());
      gp.position.set(x + 0.35, y - 0.35, z);
      gp.userData.etiqueta = tr('Proteína G', 'G protein'); gp.userData.paso = 4;
      g.add(r, gp);
      receptores.push({ mesh: r, g: gp, base: V3(x, y, z) });
    }
  }
  // transportadores de recaptación
  const transportadores = [];
  const matT = new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.4, emissive: 0xa78bfa, emissiveIntensity: 0.05 });
  for (const [x, z] of [[-3.15, -1.0], [3.15, 1.0], [-3.0, 1.3], [3.0, -1.3]]) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.8, 12), matT);
    t.position.set(x, yPre(x, z) + 0.05, z);
    t.lookAt(V3(0, PRE.c.y, 0)); t.rotateX(Math.PI / 2);
    t.userData.etiqueta = tr('Transportador de recaptación', 'Reuptake transporter'); t.userData.paso = 5;
    g.add(t); transportadores.push(t.position.clone());
  }
  // enzimas en la hendidura
  const enzimas = [];
  const matE = new THREE.MeshStandardMaterial({ color: 0x7ee0b0, roughness: 0.5, flatShading: true, emissive: 0x7ee0b0, emissiveIntensity: 0.08 });
  const grupoEnzimas = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const e = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26, 0), matE);
    const x = -2.6 + (i % 4) * 1.75 + (rnd() - 0.5) * 0.4, z = i < 4 ? -1.5 : 1.5;
    e.position.set(x, (yPre(x, z) + yPost(x, z)) / 2 + (rnd() - 0.5) * 0.5, z);
    e.userData.etiqueta = tr('Enzima de degradación', 'Degrading enzyme'); e.userData.paso = 5;
    grupoEnzimas.add(e); enzimas.push(e.position.clone());
  }
  g.add(grupoEnzimas);

  // moléculas de neurotransmisor
  const NM = LIGERO ? 160 : 260;
  const moleculas = instancias(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, emissive: 0xffffff, emissiveIntensity: 0.45 }), NM);
  moleculas.userData.etiqueta = tr('Neurotransmisor', 'Neurotransmitter');
  g.add(moleculas);
  const M = [];
  for (let i = 0; i < NM; i++) {
    const v = i % 8;
    const rec = rnd() < 0.55 ? Math.floor(rnd() * receptores.length) : -1;
    const libre = V3((rnd() * 2 - 1) * 3.2, 0, (rnd() * 2 - 1) * 2.2);
    libre.y = (yPre(libre.x, libre.z) + yPost(libre.x, libre.z)) / 2 + (rnd() - 0.5) * 0.9;
    M.push({
      v, rec, libre, fase: rnd() * 10, jit: V3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(0.35),
      tr: Math.floor(rnd() * transportadores.length), en: Math.floor(rnd() * enzimas.length), dt: rnd() * 0.9, dl: rnd() * 0.25,
    });
  }
  // Ca²⁺ e iones postsinápticos
  const NCA = 30, NION = LIGERO ? 36 : 54;
  const ca = instancias(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0xbff4ff, toneMapped: false }), NCA);
  const iones = instancias(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffd23f, toneMapped: false }), NION);
  g.add(ca, iones);
  const CA = Array.from({ length: NCA }, (_, i) => ({ c: i % 6, d: rnd() * 1.1, off: V3(rnd() - 0.5, 0, rnd() - 0.5).multiplyScalar(0.25) }));
  const IO = Array.from({ length: NION }, (_, i) => ({ r: i % receptores.length, d: rnd() * 1.8, off: V3(rnd() - 0.5, 0, rnd() - 0.5).multiplyScalar(0.18) }));

  const etiquetas = [
    [tr('Terminal presináptica', 'Presynaptic terminal'), V3(4.6, 6.4, 0)], [tr('Hendidura sináptica', 'Synaptic cleft'), V3(5.2, -0.1, 0)], [tr('Neurona postsináptica', 'Postsynaptic neuron'), V3(5.6, -3.6, 0)],
  ];
  return { g, pre, post, focoPre, focoPost, docks, reserva, capa, nucleo, receptores, transportadores, enzimas, grupoEnzimas, moleculas, M, ca, CA, canalesCa, iones, IO, etiquetas, psd };
}

// ---------------------------------------------------------------------------
// Escena eléctrica
// ---------------------------------------------------------------------------
function escenaElectrica(LIGERO) {
  const rnd = aleatorio(19);
  const g = new THREE.Group();
  const focoPre = crearFoco(), focoPost = crearFoco();
  const pre = membrana(masa(56, [0, 3.4, 0], [6.2, 3.0, 4.2]), 0xe7b49c, focoPre);
  const post = membrana(masa(56, [0, -3.4, 0], [6.2, 3.0, 4.2]), 0xd9a6c4, focoPost);
  pre.userData.etiqueta = tr('Neurona 1', 'Neuron 1'); post.userData.etiqueta = tr('Neurona 2', 'Neuron 2');
  g.add(pre, post);
  const canales = [];
  for (const x of [-3, -1, 1, 3]) for (const z of [-1.4, 0, 1.4]) canales.push(V3(x + (rnd() - 0.5) * 0.3, 0, z + (rnd() - 0.5) * 0.3));
  const NC = canales.length * 12;
  const cx = instancias(new THREE.CylinderGeometry(0.1, 0.1, 0.62, 8), new THREE.MeshStandardMaterial({ color: 0x4fb3bf, roughness: 0.35, emissive: 0x4fb3bf, emissiveIntensity: 0.12 }), NC);
  cx.userData.etiqueta = tr('Conexón (6 conexinas)', 'Connexon (6 connexins)');
  const m4 = new THREE.Matrix4();
  let k = 0;
  for (const c of canales) {
    for (const lado of [1, -1]) {
      for (let j = 0; j < 6; j++) {
        const a = (j / 6) * Math.PI * 2;
        m4.makeTranslation(c.x + Math.cos(a) * 0.3, lado * 0.34, c.z + Math.sin(a) * 0.3);
        cx.setMatrixAt(k++, m4);
      }
    }
  }
  g.add(cx);
  const NI = LIGERO ? 70 : 120;
  const iones = instancias(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffd23f, toneMapped: false }), NI);
  g.add(iones);
  const IO = Array.from({ length: NI }, (_, i) => ({ c: i % canales.length, d: rnd(), inv: rnd() < 0.35, off: V3(rnd() - 0.5, 0, rnd() - 0.5).multiplyScalar(0.12) }));
  const etiquetas = [[tr('Neurona presináptica', 'Presynaptic neuron'), V3(6.6, 4.6, 0)], [tr('Uniones en hendidura', 'Gap junctions'), V3(6.8, 0, 0)], [tr('Neurona postsináptica', 'Postsynaptic neuron'), V3(6.6, -4.6, 0)]];
  return { g, pre, post, focoPre, focoPost, canales, cx, iones, IO, etiquetas };
}

// ---------------------------------------------------------------------------
// Curvas fisiológicas (para la gráfica)
// ---------------------------------------------------------------------------
const espiga = (t, t0) => 100 * Math.exp(-(((t - t0) / 0.17) ** 2)) - 9 * Math.exp(-(((t - t0 - 1.1) / 0.55) ** 2)) * (t > t0 + 0.2 ? 1 : 0);
const alfa = (t, t0, tr, td) => (t < t0 ? 0 : Math.exp(-(t - t0) / td) - Math.exp(-(t - t0) / tr));
function curvasQuimica(anim) {
  const metab = anim.receptor === 'metabotropico';
  const xMax = metab ? 400 : 25;
  const n = 300, xs = [], pre = [], post = [], post2 = [];
  const pico = (t0, tr, td) => { let m = 0; for (let t = t0; t < t0 + 8 * td; t += td / 50) m = Math.max(m, alfa(t, t0, tr, td)); return m; };
  const [t0, tr, td] = metab ? [30, 40, 150] : [1.3, 1, 6];
  const norma = pico(t0, tr, td);
  for (let i = 0; i <= n; i++) {
    const t = (xMax * i) / n;
    xs.push(t);
    pre.push(-65 + espiga(t, metab ? 5 : 0.5) * (metab ? 1 : 1));
    const a = alfa(t, t0, tr, td) / norma;
    if (anim.signo === 0) { post.push(-65 + 7 * a); post2.push(-65 - 5 * a); } else post.push(-65 + (anim.signo > 0 ? 9 : -6) * a);
  }
  return { xs, pre, post, post2: anim.signo === 0 ? post2 : null, xMax, metab };
}
function curvasElectrica() {
  const xs = [], pre = [], post = [];
  for (let i = 0; i <= 300; i++) {
    const t = (5 * i) / 300;
    xs.push(t);
    pre.push(-65 + espiga(t, 1.0));
    post.push(-65 + 0.42 * espiga(t, 1.1) * 0.95);
  }
  return { xs, pre, post, xMax: 5 };
}
function mapearTiempo(ta, anclasA, anclasF) {
  for (let i = 1; i < anclasA.length; i++) if (ta <= anclasA[i]) { const u = (ta - anclasA[i - 1]) / (anclasA[i] - anclasA[i - 1]); return anclasF[i - 1] + u * (anclasF[i] - anclasF[i - 1]); }
  return anclasF[anclasF.length - 1];
}

// ---------------------------------------------------------------------------
// Modo
// ---------------------------------------------------------------------------
export function crearModoSinapsis(ctx, variante = 'sinapsis') {
  const { h, escena, LIGERO } = ctx;
  const grupo = new THREE.Group();
  grupo.visible = false;
  escena.add(grupo);
  let Q = null, E = null; // escenas (perezosas)
  const st = { tipo: 'quimica', nt: 'glutamato', ta: 0, reproduciendo: true, vel: 1, pausaFinal: 0, verGeneral: false };
  let etiquetasObj = [];
  let refs = {}, grafica = null, curvas = null;
  const m4 = new THREE.Matrix4(), q4 = new THREE.Quaternion(), vT = new THREE.Vector3(), sT = new THREE.Vector3(), c1 = new THREE.Color();

  const pasos = () => (st.tipo === 'quimica' ? PASOS_QUIMICA : PASOS_ELECTRICA);
  const duracion = () => (st.tipo === 'quimica' ? DURACION_QUIMICA : DURACION_ELECTRICA);
  const pasoActual = () => { const p = pasos(); let k = 0; for (let i = 0; i < p.length; i++) if (st.ta >= p[i].t) k = i; return k; };

  function asegurarEscenas() {
    if (st.tipo === 'quimica' && !Q) { Q = escenaQuimica(LIGERO); grupo.add(Q.g); }
    if (st.tipo === 'electrica' && !E) { E = escenaElectrica(LIGERO); grupo.add(E.g); }
    if (Q) Q.g.visible = st.tipo === 'quimica';
    if (E) E.g.visible = st.tipo === 'electrica';
    for (const o of etiquetasObj) { o.removeFromParent(); o.element.remove(); }
    const sc = st.tipo === 'quimica' ? Q : E;
    etiquetasObj = sc.etiquetas.map(([t, p]) => { const o = new ctx.CSS2DObject(h('div', { class: 'etq-escena' }, t)); o.center.set(0, 0.5); o.position.copy(p); sc.g.add(o); return o; });
  }
  function aplicarNT() {
    if (!Q) return;
    const nt = NEUROTRANSMISORES[st.nt];
    const col = new THREE.Color(nt.color);
    Q.moleculas.material.color.copy(col); Q.moleculas.material.emissive.copy(col);
    Q.nucleo.material.color.copy(col); Q.nucleo.material.emissive.copy(col);
    const densa = nt.anim.vesicula === 'densa';
    Q.capa.material.color.set(densa ? 0x8c7d74 : 0xf4efe8);
    const ion = nt.anim.ion;
    Q.iones.material.color.set(ion === 'Na' ? 0xffd23f : ion === 'Cl' ? 0x7ee0b0 : 0xb78cff);
    const metab = nt.anim.receptor === 'metabotropico';
    for (const r of Q.receptores) { r.g.visible = metab; r.mesh.scale.set(metab ? 0.8 : 1, metab ? 1.15 : 1, metab ? 0.8 : 1); }
    Q.grupoEnzimas.visible = nt.anim.terminacion === 'degradacion' || nt.anim.terminacion === 'peptidasas';
    curvas = curvasQuimica(nt.anim);
  }

  // --- animación química ----------------------------------------------------
  function animarQuimica(t, tiempoReal) {
    const nt = NEUROTRANSMISORES[st.nt];
    const anim = nt.anim;
    const metab = anim.receptor === 'metabotropico';
    // potencial de acción en la terminal
    const yAP = 13.5 - 10.5 * e01(0, 1.6, t);
    Q.focoPre.uFoco.value.set(0, yAP, 0);
    Q.focoPre.uRadio.value = 2.6 + 1.6 * e01(1.2, 1.8, t);
    Q.focoPre.uBrillo.value = t < 0.05 ? 0 : (1 - e01(2.4, 3.4, t)) * 0.9;
    Q.focoPre.uColorFoco.value.set(0xff3b2f);
    Q.focoPre.uTiempo.value = tiempoReal;
    // respuesta postsináptica
    const colPost = anim.signo > 0 ? 0xff6b4a : anim.signo < 0 ? 0x5fb4ff : 0xc78bff;
    Q.focoPost.uFoco.value.set(0, yPost(0, 0) - 0.6, 0);
    Q.focoPost.uRadio.value = 2.5 + 2.5 * e01(6.4, 8.0, t);
    Q.focoPost.uBrillo.value = e01(6.4, 7.0, t) * (1 - e01(8.6, 10, t)) * 0.95;
    Q.focoPost.uColorFoco.value.set(colPost);
    Q.focoPost.uTiempo.value = tiempoReal;

    // vesículas
    const nd = Q.docks.length;
    for (let i = 0; i < nd + Q.reserva.length; i++) {
      let p, s = 1, sy = 1, sn = 1;
      if (i < nd) {
        const d = Q.docks[i];
        const tRel = 3.3 + 0.18 * i;
        if (t < 11.4) {
          const baja = e01(3.0, tRel, t);
          p = vT.copy(d).add(V3(0, -0.42 * baja, 0));
          const f = lin(tRel, tRel + 0.5, t);
          sy = 1 - 0.9 * f; s = (1 + 0.5 * f) * (1 - e01(tRel + 0.3, tRel + 0.55, t));
          sn = 1 - e01(tRel, tRel + 0.25, t);
        } else {
          const u = e01(11.4, 12.7, t);
          const lado = d.x < 0 ? -1 : 1;
          const brote = V3(lado * 3.1, yPre(lado * 3.1, d.z) + 0.6, d.z);
          p = vT.copy(brote).lerp(d, u);
          s = e01(11.4, 11.9, t); sy = 1; sn = e01(12.0, 12.8, t);
        }
      } else {
        const r = Q.reserva[i - nd];
        p = vT.copy(r).add(V3(Math.sin(tiempoReal * 0.7 + i) * 0.05, Math.cos(tiempoReal * 0.6 + i * 1.7) * 0.05, 0));
      }
      m4.compose(p, q4.identity(), sT.set(s, s * sy, s)); Q.capa.setMatrixAt(i, m4);
      m4.compose(p, q4, sT.set(s * sn, s * sy * sn, s * sn)); Q.nucleo.setMatrixAt(i, m4);
    }
    Q.capa.instanceMatrix.needsUpdate = true; Q.nucleo.instanceMatrix.needsUpdate = true;

    // neurotransmisor
    const degrada = anim.terminacion === 'degradacion' || anim.terminacion === 'peptidasas';
    let enUnion = new Array(Q.receptores.length).fill(0);
    for (let i = 0; i < Q.M.length; i++) {
      const mo = Q.M[i];
      const d = Q.docks[mo.v];
      const tRel = 3.3 + 0.18 * mo.v + 0.25 + mo.dl;
      let s = 0;
      if (t > tRel) {
        const F = V3(d.x, yPre(d.x, d.z) - 0.05, d.z);
        const T = mo.rec >= 0 ? Q.receptores[mo.rec].base.clone().add(V3(0, 0.62, 0)).add(mo.jit.clone().multiplyScalar(0.6)) : mo.libre;
        const u1 = e01(tRel, tRel + 1.3, t);
        const bam = (1 - u1) * 0.5;
        vT.copy(F).lerp(T, u1).add(V3(Math.sin(t * 5 + mo.fase) * bam, 0, Math.cos(t * 4.3 + mo.fase) * bam));
        s = 1;
        if (mo.rec >= 0 && u1 > 0.95 && t < 9.4 + mo.dt) enUnion[mo.rec]++;
        const tFin = 9.0 + mo.dt;
        if (t > tFin) {
          const u2 = e01(tFin, tFin + 1.3, t);
          const destino = degrada ? Q.enzimas[mo.en] : Q.transportadores[mo.tr];
          vT.lerp(destino, u2);
          s = degrada ? 1 - e01(tFin + 0.8, tFin + 1.4, t) : 1 - e01(tFin + 1.0, tFin + 1.4, t);
        }
        if (!metab && mo.rec >= 0 && u1 >= 1 && t < tFin) vT.y += Math.sin(tiempoReal * 9 + mo.fase) * 0.02;
      }
      m4.compose(vT, q4.identity(), sT.set(s, s, s)); Q.moleculas.setMatrixAt(i, m4);
    }
    Q.moleculas.instanceMatrix.needsUpdate = true;
    // receptores encendidos
    const colNT = new THREE.Color(nt.color);
    Q.receptores.forEach((r, i) => {
      const on = Math.min(1, enUnion[i] / 2);
      r.mesh.material.emissive.copy(colNT).multiplyScalar(on * 0.8);
      const ug = metab ? e01(6.4, 7.6, t) * (1 - e01(9.5, 10.5, t)) : 0;
      r.g.position.set(r.base.x + 0.35 + ug * 0.2, r.base.y - 0.35 - ug * 1.0, r.base.z);
      r.g.material.emissiveIntensity = 0.15 + ug * 0.9;
    });
    // Ca²⁺
    for (let i = 0; i < Q.CA.length; i++) {
      const c = Q.CA[i], ch = Q.canalesCa[c.c];
      const t0 = 1.6 + c.d;
      const u = e01(t0, t0 + 1.0, t);
      const s = t > t0 ? 1 - e01(3.4, 4.2, t) : 0;
      vT.set(ch.x + c.off.x, ch.y - 0.9 + 2.0 * u, ch.z + c.off.z);
      m4.compose(vT, q4.identity(), sT.set(s, s, s)); Q.ca.setMatrixAt(i, m4);
    }
    Q.ca.instanceMatrix.needsUpdate = true;
    // iones postsinápticos
    for (let i = 0; i < Q.IO.length; i++) {
      const io = Q.IO[i], r = Q.receptores[io.r].base;
      const t0 = 6.4 + io.d;
      let s = 0;
      if (!metab || anim.signo < 0) {
        const u = e01(t0, t0 + 1.2, t);
        s = t > t0 ? 1 - e01(t0 + 1.0, t0 + 1.3, t) : 0;
        const sale = metab; // K⁺ sale de la célula (inhibición metabotrópica)
        vT.set(r.x + io.off.x, sale ? r.y - 1.4 + 2.4 * u : r.y + 1.0 - 2.6 * u, r.z + io.off.z);
      }
      m4.compose(vT, q4.identity(), sT.set(s, s, s)); Q.iones.setMatrixAt(i, m4);
    }
    Q.iones.instanceMatrix.needsUpdate = true;
    Q.grupoEnzimas.rotation.y = tiempoReal * 0.05;
  }

  // --- animación eléctrica --------------------------------------------------
  function animarElectrica(t, tiempoReal) {
    E.focoPre.uFoco.value.set(-7 + 7 * e01(0, 1.6, t), 2.2, 0);
    E.focoPre.uRadio.value = 3 + 3 * e01(1.2, 2.2, t);
    E.focoPre.uBrillo.value = (t > 0.05 ? 1 : 0) * (1 - e01(4.2, 5.6, t)) * 0.9;
    E.focoPre.uColorFoco.value.set(0xff3b2f);
    E.focoPost.uFoco.value.set(0, -1.8, 0);
    E.focoPost.uRadio.value = 2 + 5 * e01(1.8, 4.0, t);
    E.focoPost.uBrillo.value = e01(1.75, 2.1, t) * (1 - e01(4.6, 6.0, t)) * 0.8;
    E.focoPost.uColorFoco.value.set(0xff6b4a);
    E.focoPre.uTiempo.value = E.focoPost.uTiempo.value = tiempoReal;
    for (let i = 0; i < E.IO.length; i++) {
      const io = E.IO[i], c = E.canales[io.c];
      const bidir = t > 5.4;
      const inv = io.inv && bidir;
      const periodo = 1.4, t0 = 1.6 + io.d * periodo;
      const ciclo = t > t0 ? ((t - t0) % periodo) / periodo : -1;
      let s = 0;
      if (ciclo >= 0 && (t < 5.4 ? t < 5.0 + io.d : true)) {
        s = Math.sin(Math.PI * ciclo);
        const y = 2.0 - 4.0 * ciclo;
        vT.set(c.x + io.off.x, inv ? -y : y, c.z + io.off.z);
      }
      if (!(io.inv) && bidir && t > 6.8) s *= 0.6;
      m4.compose(vT, q4.identity(), sT.set(s, s, s)); E.iones.setMatrixAt(i, m4);
    }
    E.iones.instanceMatrix.needsUpdate = true;
  }

  // --- panel ----------------------------------------------------------------
  function controlesReproduccion() {
    const boton = (txt, titulo, f) => h('button', { class: 'rep-btn', type: 'button', title: titulo, onclick: f }, txt);
    refs.play = boton(st.reproduciendo ? tr('Pausa', 'Pause') : tr('Reproducir', 'Play'), tr('Reproducir / pausar', 'Play / pause'), () => { st.reproduciendo = !st.reproduciendo; refs.play.textContent = st.reproduciendo ? tr('Pausa', 'Pause') : tr('Reproducir', 'Play'); ctx.pedirRender(); });
    refs.progreso = h('i', { class: 'rep-relleno' });
    const velBtns = [0.5, 1, 2].map((v) => h('button', { type: 'button', class: st.vel === v ? 'activo' : '', onclick: (e) => { st.vel = v; [...e.target.parentNode.children].forEach((b) => b.classList.toggle('activo', b === e.target)); } }, `${v}×`));
    return h('div', { class: 'rep' },
      h('div', { class: 'rep-fila' },
        boton('←', tr('Paso anterior', 'Previous step'), () => irPaso(Math.max(0, pasoActual() - 1))),
        refs.play,
        boton('→', tr('Paso siguiente', 'Next step'), () => irPaso(Math.min(pasos().length - 1, pasoActual() + 1))),
        boton('↺', tr('Reiniciar', 'Restart'), () => irPaso(0)),
        h('div', { class: 'segmentado mini' }, velBtns)),
      h('span', { class: 'rep-pista' }, refs.progreso));
  }
  function listaPasos() {
    refs.pasos = pasos().map((p, i) => h('li', { class: 'paso', onclick: () => irPaso(i) },
      h('span', { class: 'paso-num' }, String(i + 1).padStart(2, '0')),
      h('div', {}, h('strong', {}, p.titulo), h('p', {}, p.texto))));
    return h('ol', { class: 'pasos' }, refs.pasos);
  }
  function irPaso(i) { st.ta = pasos()[i].t + 0.001; st.pausaFinal = 0; ctx.pedirRender(); }

  function bloqueGrafica() {
    const canvas = h('canvas', { class: 'osc-canvas', height: 170 });
    refs.canvas = canvas;
    return h('section', { class: 'osc' }, h('header', { class: 'lab-cab' }, h('span', {}, tr('Potenciales', 'Potentials')), h('span', { class: 'lab-nota' }, st.tipo === 'quimica' && curvas && curvas.metab ? tr('Receptor metabotrópico: respuesta lenta', 'Metabotropic receptor: slow response') : tr('Tiempo fisiológico real', 'Real physiological time'))), canvas);
  }
  function montarGrafica() {
    if (!refs.canvas) return;
    const xMax = st.tipo === 'quimica' ? curvas.xMax : 5;
    grafica = crearGrafica(refs.canvas, { xMin: 0, xMax, xPaso: xMax / 5, yMin: -80, yMax: 40, yPaso: 20, xEtiqueta: 'ms', yEtiqueta: 'mV', lineas: [{ y: -65, etiqueta: tr('reposo', 'rest'), color: '#2a3f5b' }] });
    dibujarGrafica();
  }
  function dibujarGrafica() {
    if (!grafica) return;
    const nt = NEUROTRANSMISORES[st.nt];
    let series, cursor;
    if (st.tipo === 'quimica') {
      const c = curvas;
      const etqPost = c.post2 ? tr('Postsináptica (excitador, p. ej. Gs)', 'Postsynaptic (excitatory, e.g. Gs)') : tr(`Postsináptica (${nt.anim.signo > 0 ? 'PEPS' : 'PIPS'})`, `Postsynaptic (${nt.anim.signo > 0 ? 'EPSP' : 'IPSP'})`);
      series = [{ xs: c.xs, ys: c.pre, color: '#e8e8e8', ancho: 1.2, etiqueta: tr('Presináptica', 'Presynaptic') }, { xs: c.xs, ys: c.post, color: nt.color, etiqueta: etqPost }];
      if (c.post2) series.push({ xs: c.xs, ys: c.post2, color: nt.color, punteada: true, etiqueta: tr('inhibidor (p. ej. Gi)', 'inhibitory (e.g. Gi)') });
      const fis = c.metab ? [0, 5, 6, 8, 30, 200, 350, 400] : [0, 0.5, 0.8, 1.0, 1.3, 8, 20, 25];
      cursor = mapearTiempo(st.ta, [...PASOS_QUIMICA.map((p) => p.t), DURACION_QUIMICA], fis);
    } else {
      const c = curvasElectrica();
      series = [{ xs: c.xs, ys: c.pre, color: '#e8e8e8', ancho: 1.2, etiqueta: tr('Neurona 1', 'Neuron 1') }, { xs: c.xs, ys: c.post, color: '#4fb3bf', etiqueta: tr('Neurona 2 (acoplada)', 'Neuron 2 (coupled)') }];
      cursor = mapearTiempo(st.ta, [...PASOS_ELECTRICA.map((p) => p.t), DURACION_ELECTRICA], [0, 1.0, 1.15, 2.5, 5]);
    }
    grafica.dibujar(series, { cursor });
  }
  function actualizarPasos() {
    if (!refs.pasos) return;
    const k = pasoActual();
    refs.pasos.forEach((el, i) => { el.classList.toggle('activo', i === k); el.classList.toggle('hecho', i < k); });
    refs.progreso.style.transform = `scaleX(${Math.min(1, st.ta / duracion())})`;
  }

  function renderPanel() {
    const nt = NEUROTRANSMISORES[st.nt];
    const bloques = [];
    if (variante === 'sinapsis') {
      bloques.push(h('div', { class: 'lab-campo' }, h('span', { class: 'lab-etq' }, tr('Tipo', 'Type')),
        h('div', { class: 'segmentado' },
          h('button', { type: 'button', class: st.tipo === 'quimica' ? 'activo' : '', onclick: () => cambiarTipo('quimica') }, tr('Química', 'Chemical')),
          h('button', { type: 'button', class: st.tipo === 'electrica' ? 'activo' : '', onclick: () => cambiarTipo('electrica') }, tr('Eléctrica', 'Electrical')))));
      if (st.tipo === 'quimica') {
        const sel = h('select', { class: 'selector', onchange: (e) => { st.nt = e.target.value; aplicarNT(); irPaso(0); renderPanel(); } },
          GRUPOS_NT.map((gr) => h('optgroup', { label: gr.titulo }, gr.ids.map((id) => h('option', { value: id, selected: id === st.nt }, NEUROTRANSMISORES[id].nombre)))));
        bloques.push(h('div', { class: 'lab-campo' }, h('span', { class: 'lab-etq' }, tr('Neurotransmisor', 'Neurotransmitter')), sel,
          h('span', { class: `efecto efecto-${nt.anim.signo > 0 ? 'exc' : nt.anim.signo < 0 ? 'inh' : 'mod'}` }, nt.efecto)));
      }
    } else {
      bloques.push(h('div', { class: 'catalogo' }, [
        h('button', { type: 'button', class: `cat-item${st.verGeneral ? ' activo' : ''}`, onclick: () => { st.verGeneral = true; renderPanel(); } }, h('span', { class: 'cat-color', style: 'background:#6b6b6b' }), tr('Visión general', 'Overview')),
        ...GRUPOS_NT.flatMap((gr) => [h('div', { class: 'cat-grupo' }, gr.titulo), ...gr.ids.map((id) => {
          const x = NEUROTRANSMISORES[id];
          return h('button', { type: 'button', class: `cat-item${!st.verGeneral && id === st.nt ? ' activo' : ''}`, onclick: () => { st.verGeneral = false; st.nt = id; aplicarNT(); irPaso(0); renderPanel(); } },
            h('span', { class: 'cat-color', style: `background:${x.color}` }), x.nombre.replace(/\s*\(.*\)$/, ''),
            h('span', { class: `efecto mini efecto-${x.anim.signo > 0 ? 'exc' : x.anim.signo < 0 ? 'inh' : 'mod'}` }, x.anim.signo > 0 ? 'EXC' : x.anim.signo < 0 ? 'INH' : 'MOD'));
        })]),
      ]));
    }
    bloques.push(h('section', { class: 'lab' }, h('header', { class: 'lab-cab' }, h('span', {}, tr('Animación', 'Animation')), h('span', { class: 'lab-nota' }, variante === 'nt' ? ((n) => tr(`Sinapsis con ${/^[A-Z0-9-]+$/.test(n) ? n : n.toLowerCase()}`, `Synapse with ${/^[A-Z0-9-]+$/.test(n) ? n : n.toLowerCase()}`))(nt.nombre.replace(/\s*\(.*\)$/, '')) : st.tipo === 'quimica' ? tr('Paso a paso', 'Step by step') : tr('Uniones en hendidura', 'Gap junctions'))), controlesReproduccion(), listaPasos()));
    bloques.push(bloqueGrafica());
    let info, ruta, etiquetas = [];
    if (variante === 'sinapsis') {
      info = ctx.INFO[st.tipo === 'quimica' ? 'sinapsis_quimica' : 'sinapsis_electrica'];
      ruta = [{ t: tr('Neurociencia', 'Neuroscience') }, { t: tr('Sinapsis', 'Synapses') }, { t: st.tipo === 'quimica' ? tr('Química', 'Chemical') : tr('Eléctrica', 'Electrical') }];
    } else if (st.verGeneral) {
      info = ctx.INFO.neurotransmisores;
      ruta = [{ t: tr('Neurociencia', 'Neuroscience') }, { t: tr('Neurotransmisores', 'Neurotransmitters') }];
    } else {
      info = nt;
      ruta = [{ t: tr('Neurociencia', 'Neuroscience') }, { t: tr('Neurotransmisores', 'Neurotransmitters'), f: () => { st.verGeneral = true; renderPanel(); } }, { t: nt.nombre.replace(/\s*\(.*\)$/, '') }];
      etiquetas = [nt.clase, nt.anim.receptor === 'metabotropico' ? tr('Metabotrópico', 'Metabotropic') : tr('Ionotrópico', 'Ionotropic')];
    }
    ctx.mostrarPanel({ ruta, info, op: { bloques, etiquetas, contexto: variante === 'nt' && !st.verGeneral ? nt.efecto : null } });
    actualizarPasos();
    requestAnimationFrame(montarGrafica);
  }
  function cambiarTipo(t) { st.tipo = t; asegurarEscenas(); aplicarNT(); irPaso(0); renderPanel(); ctx.volarA(vista()); }
  function vista() { return st.tipo === 'quimica' ? { pos: [15, 6.5, 25], obj: [0, 1.6, 0] } : { pos: [16, 7, 25], obj: [0, 0, 0] }; }

  const seleccionables = () => {
    const sc = st.tipo === 'quimica' ? Q : E;
    if (!sc) return [];
    const arr = [];
    sc.g.traverse((o) => { if (o.isMesh && o.userData.etiqueta && o.visible !== false) arr.push(o); });
    return arr;
  };

  return {
    id: variante,
    vista,
    activar(params = {}) {
      if (variante === 'nt') { st.tipo = 'quimica'; if (params.nt) { st.nt = params.nt; st.verGeneral = false; } if (params.general) st.verGeneral = true; }
      if (params.tipo) st.tipo = params.tipo;
      grupo.visible = true;
      asegurarEscenas();
      aplicarNT();
      st.ta = 0; st.reproduciendo = true;
      for (const o of etiquetasObj) o.element.style.display = '';
      renderPanel();
    },
    desactivar() {
      grupo.visible = false;
      for (const o of etiquetasObj) o.element.style.display = 'none';
    },
    seleccionables,
    nombre: (m) => m.userData.etiqueta || '',
    alClic: (m) => { if (m.userData.paso != null && st.tipo === 'quimica') irPaso(m.userData.paso); },
    volver: () => false,
    estado: () => ({ tipo: st.tipo, nt: st.nt }),
    actualizar(dt, tiempoReal) {
      if (!grupo.visible) return false;
      if (st.reproduciendo) {
        if (st.ta >= duracion()) {
          st.pausaFinal += dt;
          if (st.pausaFinal > 1.4) { st.ta = 0; st.pausaFinal = 0; }
        } else st.ta = Math.min(duracion(), st.ta + dt * st.vel);
      }
      if (st.tipo === 'quimica' && Q) animarQuimica(st.ta, tiempoReal); else if (E) animarElectrica(st.ta, tiempoReal);
      actualizarPasos();
      dibujarGrafica();
      return true;
    },
  };
}
