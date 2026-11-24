// Cerebrum (Encéfalo 3D Pro) — aplicación principal
import { t as tr, IDIOMA, cambiarIdioma, traducirHTML } from './i18n.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { computeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { cargarModelo } from './modelo/cargar.js';
import { configurarCalidad } from './modelo/util.js';
import urlAlta from './generado/modelo-alta.bin?url';
import urlBaja from './generado/modelo-baja.bin?url';
import { INFO, DIVISIONES, estructurasDe } from './datos/index.js';
import { h, fichaInfo, quitarParentesis } from './ui/panel.js';
import { INFO_NEURO, NEUROTRANSMISORES, TIPOS_NEURONA } from './datos/neuro.js';
import { PARTE_INFO } from './neuro/neuronas.js';
import { crearBuscador, normalizar } from './ui/buscador.js';
import { crearModoNeuronas } from './neuro/modoNeuronas.js';
import { crearModoPotencial } from './neuro/potencial.js';
import { crearModoSinapsis } from './neuro/sinapsis.js';
import './estilos.css';
import './estilos-pro.css';

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

// ---------------------------------------------------------------------------
// Calidad: detección automática del equipo (se puede cambiar con el botón "Calidad")
// ---------------------------------------------------------------------------
const CLAVE_CALIDAD = 'encefalo3d-calidad';
function detectarCalidad() {
  const q = new URLSearchParams(location.hash.slice(1)).get('q');
  if (q === 'alta' || q === 'baja') return { calidad: q, fijada: true };
  try {
    const g = localStorage.getItem(CLAVE_CALIDAD);
    if (g === 'alta' || g === 'baja') return { calidad: g, fijada: true };
  } catch { /* almacenamiento no disponible */ }
  let gpu = '';
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return { calidad: 'baja', fijada: false };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    gpu = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    const perder = gl.getExtension('WEBGL_lose_context');
    if (perder) perder.loseContext();
  } catch { /* sin información de GPU */ }
  const gpuDebil = /swiftshader|llvmpipe|softpipe|basic render|intel(r) (hd|uhd)|intel hd|intel uhd|mali|adreno|powervr|videocore/i.test(gpu);
  const nucleos = navigator.hardwareConcurrency || 4;
  const memoria = navigator.deviceMemory || 8;
  const movil = matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 900;
  return { calidad: gpuDebil || nucleos <= 4 || memoria <= 4 || movil ? 'baja' : 'alta', fijada: false, gpu };
}
const { calidad: CALIDAD, fijada: CALIDAD_FIJADA } = detectarCalidad();
const LIGERO = CALIDAD === 'baja';
configurarCalidad(LIGERO);
document.body.classList.toggle('ligero', LIGERO);

// Idioma: textos fijos del HTML y selector ES / EN
const LANG_URL = new URLSearchParams(location.hash.slice(1)).has('lang');
traducirHTML();
document.querySelectorAll('#idioma button').forEach((b) => {
  const activo = b.dataset.l === IDIOMA;
  b.classList.toggle('activo', activo);
  b.setAttribute('aria-pressed', String(activo));
  b.addEventListener('click', () => cambiarIdioma(b.dataset.l));
});

// ---------------------------------------------------------------------------
// Configuración visual
// ---------------------------------------------------------------------------
const ACENTO = '#7c4dff';
const COLOR_DIV = {
  telencefalo: '#d2a99d',
  diencefalo: '#d09d91',
  cerebelo: '#c9988b',
  tallo: '#d2ab9e',
};
// Opacidad de las demás divisiones cuando una está activa
const FANTASMA = {
  telencefalo: { diencefalo: 1, cerebelo: 1, tallo: 1 },
  diencefalo: { telencefalo: 0.14, cerebelo: 0.2, tallo: 0.3 },
  cerebelo: { telencefalo: 0.16, diencefalo: 0, tallo: 0.34 },
  tallo: { telencefalo: 0.14, diencefalo: 0.22, cerebelo: 0.2 },
};
const VISTAS = {
  inicio: { pos: [-21, 8, 15], obj: [0, -1.0, -0.8] },
  telencefalo: { pos: [-17.5, 16, 23], obj: [0, 0.6, -0.5] },
  diencefalo: { pos: [8.1, 4, 8.8], obj: [0, -0.5, -0.4] },
  diencefalo1: { pos: [10.5, 4.5, 5.5], obj: [0, -0.4, -0.5] },
  cerebelo: { pos: [9, 9, -17], obj: [0, -4, -4.8] },
  cerebelo1: { pos: [10.5, 10.5, -19.5], obj: [0, -4, -4.6] },
  cerebeloProf: { pos: [8.8, 2.8, -12.6], obj: [0, -4, -4.6] },
  tallo: { pos: [12.5, -3.6, 7.5], obj: [0, -4.4, -1.7] },
  tallo1: { pos: [14, -3.6, 9], obj: [0, -4.4, -1.7] },
};
const CENTRO_DIV = {
  telencefalo: new THREE.Vector3(0, 0.6, -0.5),
  diencefalo: new THREE.Vector3(0, -0.5, -0.4),
  cerebelo: new THREE.Vector3(0, -4.0, -4.8),
  tallo: new THREE.Vector3(0, -4.3, -1.6),
};
// Radio de la zona iluminada al seleccionar una estructura (cm)
const RADIO_FOCO = { telencefalo: 1.25, diencefalo: 0.4, cerebelo: 0.8, tallo: 0.5 };

// ---------------------------------------------------------------------------
// Escena
// ---------------------------------------------------------------------------
const contenedor = document.getElementById('escena');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(LIGERO ? 1 : Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.outputColorSpace = THREE.SRGBColorSpace;
contenedor.appendChild(renderer.domElement);

const capaEtiquetas = new CSS2DRenderer();
capaEtiquetas.setSize(window.innerWidth, window.innerHeight);
capaEtiquetas.domElement.className = 'capa-etiquetas';
contenedor.appendChild(capaEtiquetas.domElement);

const escena = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
escena.environmentIntensity = 0.42;

const camara = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 300);
camara.position.set(...VISTAS.inicio.pos);
const controles = new OrbitControls(camara, renderer.domElement);
controles.target.set(...VISTAS.inicio.obj);
controles.enableDamping = true;
controles.dampingFactor = 0.07;
controles.minDistance = 3;
controles.maxDistance = 60;
controles.autoRotateSpeed = 0.55;
controles.update();

// Iluminación de estudio: clave cálida que sigue a la cámara, relleno frío y contraluz.
escena.add(new THREE.HemisphereLight(0xfff1ea, 0x1d1a20, 0.55));
const luzClave = new THREE.DirectionalLight(0xfff4ee, 2.2);
camara.add(luzClave);
luzClave.position.set(6, 9, 4);
const luzRelleno = new THREE.DirectionalLight(0xcfdcff, 0.55);
luzRelleno.position.set(-12, 3, -9);
escena.add(luzRelleno);
const contraluz = new THREE.DirectionalLight(0xffd9cc, 0.9);
contraluz.position.set(0, 6, -16);
escena.add(contraluz);
const luzBaja = new THREE.DirectionalLight(0xffe2d6, 0.35);
luzBaja.position.set(2, -12, 6);
escena.add(luzBaja);
escena.add(camara);

// ---------------------------------------------------------------------------
// Estado
// ---------------------------------------------------------------------------
const modelos = {};
const todasPartes = [];
const todasUnidades = [];
let seleccionables = [];
const estado = { division: null, nivel: 0, unidad: null, parte: null, lado: null, estructura: null, profundas: false, infoGeneral: false };
let hover = null;
let mostrarEtiquetas = true;
let rotacion = true;
let pines = [];
let focoPrevio = null; // estructura resaltada al pasar el puntero sobre su etiqueta

// ---------------------------------------------------------------------------
// Construcción del modelo (por etapas, para mostrar el progreso)
// ---------------------------------------------------------------------------
window.__tiempos = [];
function mostrarCarga(texto, pct) {
  window.__tiempos.push([texto, Math.round(performance.now())]);
  document.getElementById('carga-texto').textContent = texto;
  document.getElementById('carga-barra').style.transform = `scaleX(${pct})`;
  document.getElementById('carga-pct').textContent = String(Math.round(pct * 100)).padStart(3, '0');
}
const pasoCarga = (texto, pct) => new Promise((r) => {
  mostrarCarga(texto, pct);
  let hecho = false;
  const seguir = () => { if (!hecho) { hecho = true; setTimeout(r, 0); } };
  requestAnimationFrame(seguir);
  setTimeout(seguir, 120); // respaldo si la pestaña está en segundo plano
});

async function construirModelo() {
  // El modelo se generó al compilar; aquí solo se descomprime y se arma.
  Object.assign(modelos, await cargarModelo(LIGERO ? urlBaja : urlAlta, mostrarCarga));
  await pasoCarga(tr('Preparando la interacción', 'Preparing interaction'), 0.62);
  const mallas = [];
  for (const m of Object.values(modelos)) {
    escena.add(m.grupo);
    for (const p of m.partes) {
      mallas.push(...p.meshes);
      p.actual.color.set(COLOR_DIV[p.division]);
      p.objetivo.color.set(COLOR_DIV[p.division]);
      if (p.profunda) { p.actual.opacidad = 0; p.grupo.visible = false; }
    }
    todasPartes.push(...m.partes);
    todasUnidades.push(...m.unidades);
    m.grupo.traverse((o) => {
      if (o.isMesh && o.userData.decorativo) o.material.color.set(COLOR_DIV[m.id]);
    });
  }
  // Árboles de colisión (BVH) por lotes, cediendo el control para que la ventana no se congele
  let t0 = performance.now();
  for (let i = 0; i < mallas.length; i++) {
    mallas[i].geometry.computeBoundsTree();
    if (performance.now() - t0 > 35) {
      await pasoCarga(tr('Preparando la interacción', 'Preparing interaction'), 0.62 + 0.36 * (i / mallas.length));
      t0 = performance.now();
    }
  }
  await pasoCarga(tr('Listo', 'Ready'), 1);
}

// ---------------------------------------------------------------------------
// Objetivos visuales según el estado
// ---------------------------------------------------------------------------
const GRIS = new THREE.Color('#8d8789');
const tmpColor = new THREE.Color();

function coincideLado(p, lado) {
  return lado == null || p.lado == null || p.lado === lado;
}
function enHover(p) {
  if (!hover) return false;
  if (hover.tipo === 'division') return p.division === hover.id && !p.profunda;
  if (hover.tipo === 'unidad') return p.unidad && p.unidad.id === hover.id && !p.profunda;
  if (hover.tipo === 'parte') return p.division === estado.division && p.id === hover.id && coincideLado(p, hover.lado);
  return false;
}
function parteSeleccionada() {
  return todasPartes.find((q) => q.division === estado.division && q.id === estado.parte && coincideLado(q, estado.lado));
}

function calcularObjetivos() {
  const D = estado.division;
  for (const p of todasPartes) {
    const o = p.objetivo;
    let color = COLOR_DIV[p.division];
    let op = 1, ex = 0, em = 0, vis = !p.profunda;
    const activa = D === p.division;
    if (D && !activa) {
      op = FANTASMA[D][p.division];
      if (D === 'telencefalo' && estado.profundas) op = 0.16;
    } else if (activa && estado.nivel === 0 && p.unidad) {
      // Telencéfalo: cada hemisferio con su color antes de desglosarlo
      color = INFO[p.unidad.id].color;
    } else if (activa && estado.nivel >= 1) {
      color = (INFO[p.id] && INFO[p.id].color) || color;
      ex = 1;
      if (estado.profundas) {
        if (p.profunda) { vis = true; ex = 0; } else { op = 0.1; ex = 0; color = COLOR_DIV[p.division]; }
      }
      if (estado.parte) {
        const sel = p.id === estado.parte && coincideLado(p, estado.lado);
        if (sel) em = estado.estructura ? 0.04 : 0.12;
        else if (op > 0.5 && vis) color = `#${tmpColor.set(color).lerp(GRIS, 0.62).getHexString()}`;
      }
    }
    if (enHover(p)) em += 0.2;
    o.color.set(color);
    o.opacidad = vis ? op : 0;
    o.visible = vis && op > 0.005;
    o.explosion.copy(p.explosion).multiplyScalar(ex);
    o.emisivo = em;
    o.foco = 0;
  }
  // zona iluminada de la estructura seleccionada (o previsualizada)
  const idFoco = focoPrevio || estado.estructura;
  const pin = idFoco && pines.find((q) => q.id === idFoco);
  const p = pin && parteSeleccionada();
  if (p) {
    p.foco.uFoco.value.copy(pin.pos);
    p.foco.uRadio.value = (INFO[idFoco].radio || RADIO_FOCO[estado.division]) * (pin.interno ? 1.5 : 1);
    p.objetivo.foco = idFoco === estado.estructura ? 1 : 0.6;
  }
  for (const u of todasUnidades) {
    const sep = D === 'telencefalo' && estado.nivel >= 1 && !estado.profundas;
    u.objetivo.copy(sep ? u.separacion : new THREE.Vector3());
  }
}

function actualizarSeleccionables() {
  seleccionables = [];
  for (const p of todasPartes) {
    let ok = false;
    if (!estado.division) ok = !p.profunda;
    else if (p.division === estado.division) {
      if (estado.nivel === 0) ok = !p.profunda;
      else ok = estado.profundas ? p.profunda : !p.profunda;
    }
    if (ok) seleccionables.push(...p.meshes);
  }
}

function mallasOclusoras() {
  return todasPartes.filter((p) => p.objetivo.visible && p.objetivo.opacidad > 0.6).flatMap((p) => p.meshes);
}

// ---------------------------------------------------------------------------
// Navegación
// ---------------------------------------------------------------------------
function ir(nuevo, { volar = true, desdeModo = false } = {}) {
  if (modoActivo && !desdeModo) salirModo();
  const antes = { ...estado };
  Object.assign(estado, { division: null, nivel: 0, unidad: null, parte: null, lado: null, estructura: null, profundas: false, infoGeneral: false }, nuevo);
  hover = null;
  focoPrevio = null;
  actualizarPines();
  calcularObjetivos();
  actualizarSeleccionables();
  renderPanel();
  renderIndice();
  controles.autoRotate = rotacion && !estado.division && !modoActivo;
  if (desdeModo) { guardarHash(); pedirRender(); return; }
  const cambioVista = antes.division !== estado.division || Math.min(antes.nivel, 1) !== Math.min(estado.nivel, 1)
    || antes.profundas !== estado.profundas || (estado.division === 'telencefalo' && estado.nivel === 1 && antes.lado !== estado.lado);
  if (volar && cambioVista) volarA(vistaActual());
  else if (volar && estado.parte && estado.parte !== antes.parte && !estado.profundas) enfocarParte();
  guardarHash();
  pedirRender();
}

function vistaActual() {
  const D = estado.division;
  if (!D) return VISTAS.inicio;
  const s = estado.lado === 'izq' ? -1 : 1;
  if (D === 'telencefalo' && estado.profundas) return { pos: [15 * s, 5, 8], obj: [0, -0.3, -0.4] };
  if (estado.profundas) return VISTAS[`${D}Prof`] || VISTAS[`${D}1`] || VISTAS[D];
  if (D === 'telencefalo' && estado.nivel >= 1) return { pos: [25 * s, 9.5, 9], obj: [0, 0.4, -0.5] };
  if (estado.nivel >= 1) return VISTAS[`${D}1`] || VISTAS[D];
  return VISTAS[D];
}

function volver() {
  if (modoActivo) { if (!modoActivo.volver()) ir({}); return; }
  const e = estado;
  if (!e.division) { if (e.infoGeneral) ir({}); return; }
  if (e.estructura) return ir({ ...e, nivel: 2, estructura: null }, { volar: false });
  if (e.parte) return ir({ ...e, nivel: 1, parte: null, lado: e.unidad && e.unidad.startsWith('hemisferio') ? e.lado : null });
  if (e.nivel >= 1) return ir({ division: e.division, nivel: 0 });
  return ir({});
}

function seleccionarDivision(id) { ir({ division: id, nivel: 0 }); }
function desglosar(unidad, lado = null) {
  ir({ division: estado.division, nivel: 1, unidad: unidad || estado.division, lado });
}
function seleccionarParte(id, lado = null) {
  const prof = !!(INFO[id] && INFO[id].profunda);
  let unidad = estado.unidad || estado.division;
  if (estado.division === 'telencefalo') {
    const l = lado || estado.lado || 'izq';
    unidad = `hemisferio_${l}`;
    lado = l;
    if (id === 'cuerpo_calloso') lado = null;
  }
  ir({ division: estado.division, nivel: 2, unidad, parte: id, lado, profundas: prof });
}
function seleccionarEstructura(id) {
  ir({ ...estado, nivel: 3, estructura: estado.estructura === id ? null : id }, { volar: false });
}
function alternarProfundas() {
  const D = estado.division;
  ir({ division: D, nivel: 1, unidad: estado.unidad || D, lado: estado.lado, profundas: !estado.profundas });
}

// ---------------------------------------------------------------------------
// Modos de neurociencia celular (versión Pro)
// ---------------------------------------------------------------------------
const MODOS = [
  { id: 'neuronas', corto: tr('Neuronas', 'Neurons'), crear: () => crearModoNeuronas(ctxModo) },
  { id: 'potencial', corto: tr('Potencial de acción', 'Action potential'), crear: () => crearModoPotencial(ctxModo) },
  { id: 'sinapsis', corto: tr('Sinapsis', 'Synapses'), crear: () => crearModoSinapsis(ctxModo, 'sinapsis') },
  { id: 'nt', corto: tr('Neurotransmisores', 'Neurotransmitters'), crear: () => crearModoSinapsis(ctxModo, 'nt') },
];
const modosCreados = {};
let modoActivo = null;
const INFO_TODO = { ...INFO, ...INFO_NEURO };
const ctxModo = {
  h, escena, LIGERO, CSS2DObject, INFO: INFO_TODO, quitarParentesis,
  pedirRender: () => pedirRender(),
  volarA: (v) => volarA(v),
  mostrarPanel: (o) => mostrarPanelModo(o),
};
// --- buscador ---------------------------------------------------------------
function divisionDeParte(id) { return DIVISIONES.find((d) => d.partes.includes(id) || d.profundas.includes(id)); }
function irParte(division, parte, estructura = null) {
  const tele = division === 'telencefalo';
  const conLado = (tele && parte !== 'cuerpo_calloso') || (division === 'diencefalo' && (parte === 'talamo' || parte === 'subtalamo'));
  ir({ division, nivel: estructura ? 3 : 2, unidad: tele ? 'hemisferio_izq' : division, parte, lado: conLado ? 'izq' : null, estructura, profundas: !!INFO[parte].profunda });
}
function indiceBusqueda() {
  const r = [];
  const add = (nombre, tipo, ruta, f, extra = '') => r.push({ nombre, tipo, ruta, ir: f, clave: normalizar(`${nombre} ${tipo} ${extra}`) });
  for (const [id, v] of Object.entries(INFO)) {
    if (v.clase === 'division') add(v.nombre, tr('División', 'Division'), tr('Encéfalo', 'Brain'), () => seleccionarDivision(id));
    else if (v.clase === 'unidad') add(v.nombre, tr('Hemisferio', 'Hemisphere'), tr('Telencéfalo', 'Telencephalon'), () => ir({ division: 'telencefalo', nivel: 1, unidad: id, lado: id.endsWith('izq') ? 'izq' : 'der' }));
    else if (v.clase === 'parte') { const d = divisionDeParte(id); if (d) add(v.nombre, v.tipo, nombreCorto(d.id), () => irParte(d.id, id)); }
    else if (v.clase === 'estructura') { const d = divisionDeParte(v.parte); if (d) add(v.nombre, v.tipo, `${nombreCorto(d.id)} › ${nombreCorto(v.parte)}`, () => irParte(d.id, v.parte, id)); }
  }
  const NC = tr('Neurociencia', 'Neuroscience'), CEL = tr('Neurociencia celular', 'Cellular neuroscience');
  add(INFO_NEURO.neuronas.nombre, CEL, NC, () => irModo('neuronas', { general: true }), 'clasificacion morfologica morphological classification');
  for (const tn of TIPOS_NEURONA) add(INFO_NEURO[tn].nombre, tr('Tipo de neurona', 'Neuron type'), `${NC} › ${INFO_NEURO.neuronas.nombre}`, () => irModo('neuronas', { tipo: tn }));
  for (const [clave, pid] of Object.entries(PARTE_INFO)) add(INFO_NEURO[pid].nombre, tr('Parte de la neurona', 'Part of the neuron'), `${NC} › ${INFO_NEURO.neuronas.nombre}`, () => irModo('neuronas', { tipo: clave === 'terminacion_sensitiva' ? 'n_seudounipolar' : 'n_multipolar', parte: clave }));
  add(INFO_NEURO.potencial_accion.nombre, tr('Fisiología neuronal', 'Neuronal physiology'), NC, () => irModo('potencial'), 'impulso nervioso hodgkin huxley despolarizacion repolarizacion conduccion saltatoria nerve impulse depolarization repolarization saltatory conduction');
  add(INFO_NEURO.sinapsis_quimica.nombre, tr('Sinapsis', 'Synapse'), NC, () => irModo('sinapsis', { tipo: 'quimica' }), 'vesiculas exocitosis receptores peps pips vesicles exocytosis receptors epsp ipsp');
  add(INFO_NEURO.sinapsis_electrica.nombre, tr('Sinapsis', 'Synapse'), NC, () => irModo('sinapsis', { tipo: 'electrica' }), 'uniones en hendidura gap junction conexones conexinas connexons connexins');
  add(INFO_NEURO.neurotransmisores.nombre, CEL, NC, () => irModo('nt', { general: true }));
  for (const [id, n] of Object.entries(NEUROTRANSMISORES)) add(n.nombre, `${tr('Neurotransmisor', 'Neurotransmitter')} · ${n.clase}`, `${NC} › ${INFO_NEURO.neurotransmisores.nombre}`, () => irModo('nt', { nt: id }), n.efecto);
  return r;
}
const buscador = crearBuscador(indiceBusqueda, tr(['Área de Broca', 'Hipocampo', 'Tálamo', 'Cerebelo', 'Potencial de acción', 'Dopamina'], ["Broca's area", 'Hippocampus', 'Thalamus', 'Cerebellum', 'Action potential', 'Dopamine']));

function mostrarEncefalo(v) {
  for (const m of Object.values(modelos)) m.grupo.visible = v;
}
function irModo(id, params = {}) {
  if (modoActivo && modoActivo.id !== id) { modoActivo.desactivar(); modoActivo = null; }
  ir({}, { volar: false, desdeModo: true });
  mostrarEncefalo(false);
  const m = modosCreados[id] || (modosCreados[id] = MODOS.find((d) => d.id === id).crear());
  modoActivo = m;
  controles.autoRotate = false;
  m.activar(params);
  volarA(m.vista());
  tooltip.classList.remove('visible');
  renderIndice();
  guardarHash();
  pedirRender();
}
function salirModo() {
  if (!modoActivo) return;
  modoActivo.desactivar();
  modoActivo = null;
  mostrarEncefalo(true);
  volarA(VISTAS.inicio);
}
function mostrarPanelModo({ ruta, info, op }) {
  panel.classList.add('abierto');
  document.body.classList.add('con-panel');
  const items = [{ t: tr('Inicio', 'Home'), f: () => ir({}) }, ...ruta];
  migas.replaceChildren(...items.flatMap((it, i) => [
    i ? h('span', { class: 'sep' }, '/') : '',
    h('button', { class: `miga${i === items.length - 1 ? ' actual' : ''}`, type: 'button', onclick: it.f || null, disabled: i === items.length - 1 || !it.f }, it.t),
  ]));
  document.getElementById('panel-nivel').textContent = '';
  const scroll = panelCuerpo.scrollTop;
  const mismo = panelCuerpo.dataset.ficha === info.nombre;
  panelCuerpo.replaceChildren(fichaInfo(info, op));
  panelCuerpo.dataset.ficha = info.nombre;
  panelCuerpo.scrollTop = mismo ? scroll : 0;
  document.getElementById('btn-volver').disabled = false;
}

// ---------------------------------------------------------------------------
// Cámara
// ---------------------------------------------------------------------------
let vuelo = null;
function volarA(vista, dur = 1.15) {
  vuelo = {
    t: 0, dur,
    p0: camara.position.clone(), p1: new THREE.Vector3(...vista.pos),
    o0: controles.target.clone(), o1: new THREE.Vector3(...vista.obj),
  };
}
function enfocarParte() {
  const p = parteSeleccionada();
  if (!p) return;
  const caja = new THREE.Box3();
  for (const m of p.meshes) { m.geometry.computeBoundingBox(); caja.union(m.geometry.boundingBox); }
  const centro = caja.getCenter(new THREE.Vector3()).add(p.objetivo.explosion);
  if (p.unidad) centro.add(p.unidad.objetivo);
  const base = CENTRO_DIV[estado.division];
  const dirParte = centro.clone().sub(base);
  if (dirParte.lengthSq() < 0.5) return;
  dirParte.normalize();
  const dirAct = camara.position.clone().sub(controles.target).normalize();
  const dist = camara.position.distanceTo(controles.target);
  const dir = dirAct.lerp(dirParte, 0.6).normalize();
  const obj = base.clone().lerp(centro, 0.35);
  vuelo = { t: 0, dur: 0.95, p0: camara.position.clone(), p1: obj.clone().addScaledVector(dir, dist), o0: controles.target.clone(), o1: obj };
}

// Desplazamiento de la vista para que el modelo quede centrado junto al panel
let desplaz = { x: 0, y: 0 };
function desplazamientoObjetivo() {
  const panelAbierto = !!estado.division || estado.infoGeneral || !!modoActivo;
  if (window.innerWidth > 860) {
    // centrar entre el índice (izquierda) y el panel (derecha)
    const W = window.innerWidth;
    const izq = 272, der = panelAbierto ? Math.min(460, W * 0.4) + 14 : 0;
    return { x: (der - izq) / 2, y: 0 };
  }
  if (!panelAbierto) return { x: 0, y: 0 };
  return { x: 0, y: window.innerHeight * 0.24 };
}
function fijarDesplazamiento() {
  const W = window.innerWidth, H = window.innerHeight;
  if (Math.abs(desplaz.x) < 0.5 && Math.abs(desplaz.y) < 0.5) camara.clearViewOffset();
  else camara.setViewOffset(W, H, desplaz.x, desplaz.y, W, H);
}
function aplicarDesplazamiento(k) {
  const obj = desplazamientoObjetivo();
  const dx = obj.x - desplaz.x, dy = obj.y - desplaz.y;
  if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) return false;
  desplaz.x += dx * k;
  desplaz.y += dy * k;
  const W = window.innerWidth, H = window.innerHeight;
  if (Math.abs(desplaz.x) < 0.5 && Math.abs(desplaz.y) < 0.5) camara.clearViewOffset();
  else camara.setViewOffset(W, H, desplaz.x, desplaz.y, W, H);
  return true;
}

// ---------------------------------------------------------------------------
// Marcadores (etiquetas) de estructuras
// ---------------------------------------------------------------------------
function limpiarPines() {
  for (const pin of pines) { pin.obj.removeFromParent(); pin.el.remove(); }
  pines = [];
}
function ajustarASuperficie(v, parte) {
  let mejor = Infinity, pos = null, nor = null, idx = -1;
  for (const m of parte.meshes) {
    const a = m.geometry.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const dx = a.getX(i) - v.x, dy = a.getY(i) - v.y, dz = a.getZ(i) - v.z;
      const d = dx * dx + dy * dy + dz * dz;
      if (d < mejor) { mejor = d; pos = a; nor = m.geometry.attributes.normal; idx = i; }
    }
  }
  if (idx >= 0) {
    v.set(pos.getX(idx), pos.getY(idx), pos.getZ(idx));
    if (nor) v.add(new THREE.Vector3(nor.getX(idx), nor.getY(idx), nor.getZ(idx)).multiplyScalar(0.04));
  }
}
function actualizarPines() {
  limpiarPines();
  if (!estado.parte) return;
  const lista = estructurasDe(estado.parte);
  if (!lista.length) return;
  const modelo = modelos[estado.division];
  const parte = parteSeleccionada();
  if (!parte) return;
  for (const e of lista) {
    const a = modelo.anclas[e.id];
    if (!a) continue;
    const v = new THREE.Vector3(...a);
    if (modelo.espejarAnclas && parte.lado === 'izq') v.x = -v.x;
    if (!e.interno) ajustarASuperficie(v, parte);
    const activo = estado.estructura === e.id;
    const el = h('button', {
      class: `pin${e.interno ? ' interno' : ''}${activo ? ' activo' : ''}${estado.estructura && !activo ? ' atenuado' : ''}`,
      type: 'button',
      title: e.interno ? `${e.nombre} (${tr('estructura interna', 'internal structure')})` : e.nombre,
      onclick: (ev) => { ev.stopPropagation(); seleccionarEstructura(e.id); },
      onpointerdown: (ev) => ev.stopPropagation(),
      onpointerenter: () => { if (estado.estructura !== e.id) { focoPrevio = e.id; calcularObjetivos(); } },
      onpointerleave: () => { if (focoPrevio) { focoPrevio = null; calcularObjetivos(); } },
    }, h('span', { class: 'pin-punto' }), h('span', { class: 'pin-texto' }, quitarParentesis(e.nombre)));
    el.style.display = mostrarEtiquetas || activo ? '' : 'none';
    const obj = new CSS2DObject(el);
    obj.center.set(0, 0.5); // el punto queda exactamente sobre la estructura
    obj.position.copy(v);
    parte.grupo.add(obj);
    pines.push({ obj, el, id: e.id, interno: !!e.interno, pos: v.clone() });
  }
}

const rayoOclusion = new THREE.Raycaster();
rayoOclusion.firstHitOnly = true;
function comprobarOclusion() {
  if (!pines.length) return;
  const mallas = mallasOclusoras();
  const pw = new THREE.Vector3();
  for (const pin of pines) {
    if (pin.interno) continue;
    pin.obj.getWorldPosition(pw);
    const dir = pw.clone().sub(camara.position);
    const dist = dir.length();
    rayoOclusion.set(camara.position, dir.normalize());
    rayoOclusion.far = dist;
    const hit = rayoOclusion.intersectObjects(mallas, false)[0];
    pin.el.classList.toggle('tapado', !!hit && hit.distance < dist - 0.25);
  }
}

// ---------------------------------------------------------------------------
// Interacción con el puntero
// ---------------------------------------------------------------------------
const rayo = new THREE.Raycaster();
rayo.firstHitOnly = true;
const puntero = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');
let pendienteHover = false, ultimoEvento = null, inicioClic = null;

function objetivoDesdeParte(p) {
  if (!estado.division) return { tipo: 'division', id: p.division };
  if (estado.nivel === 0) {
    if (p.unidad) return { tipo: 'unidad', id: p.unidad.id, lado: p.unidad.lado };
    return { tipo: 'division', id: p.division };
  }
  return { tipo: 'parte', id: p.id, lado: p.lado };
}
function nombreObjetivo(o) {
  if (!o) return '';
  const n = quitarParentesis((INFO[o.id] && INFO[o.id].nombre) || o.id);
  if (o.tipo === 'parte' && o.lado) return `${n} · ${o.lado === 'izq' ? tr('izq.', 'left') : tr('der.', 'right')}`;
  return n;
}
function lanzar(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  puntero.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
  puntero.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
  rayo.setFromCamera(puntero, camara);
  const hit = rayo.intersectObjects(seleccionables, false)[0];
  return hit ? hit.object.userData.parte : null;
}
function lanzarModo(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  puntero.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
  puntero.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
  rayo.setFromCamera(puntero, camara);
  const hit = rayo.intersectObjects(modoActivo.seleccionables(), false)[0];
  return hit ? hit.object : null;
}
function procesarHover() {
  pendienteHover = false;
  const ev = ultimoEvento;
  if (!ev) return;
  if (modoActivo) {
    const m = lanzarModo(ev);
    if (modoActivo.alHover) modoActivo.alHover(m);
    const t = m ? modoActivo.nombre(m) : '';
    tooltip.textContent = t;
    tooltip.style.transform = `translate(${ev.clientX + 16}px, ${ev.clientY + 14}px)`;
    tooltip.classList.toggle('visible', !!t);
    renderer.domElement.style.cursor = t ? 'pointer' : '';
    return;
  }
  const p = lanzar(ev);
  const nuevo = p ? objetivoDesdeParte(p) : null;
  const igual = (a, b) => (!a && !b) || (a && b && a.tipo === b.tipo && a.id === b.id && a.lado === b.lado);
  if (!igual(nuevo, hover)) {
    hover = nuevo;
    calcularObjetivos();
  }
  if (hover) {
    tooltip.textContent = nombreObjetivo(hover);
    tooltip.style.transform = `translate(${ev.clientX + 16}px, ${ev.clientY + 14}px)`;
    tooltip.classList.add('visible');
    renderer.domElement.style.cursor = 'pointer';
  } else {
    tooltip.classList.remove('visible');
    renderer.domElement.style.cursor = '';
  }
}
renderer.domElement.addEventListener('pointermove', (ev) => {
  if (ev.pointerType === 'touch') return;
  ultimoEvento = ev;
  if (!pendienteHover) { pendienteHover = true; requestAnimationFrame(procesarHover); }
});
renderer.domElement.addEventListener('pointerleave', () => {
  hover = null; tooltip.classList.remove('visible'); calcularObjetivos();
});
renderer.domElement.addEventListener('pointerdown', (ev) => { inicioClic = { x: ev.clientX, y: ev.clientY }; });
renderer.domElement.addEventListener('pointerup', (ev) => {
  if (!inicioClic) return;
  const mov = Math.hypot(ev.clientX - inicioClic.x, ev.clientY - inicioClic.y);
  inicioClic = null;
  if (mov > 6) return;
  if (modoActivo) { const m = lanzarModo(ev); if (m) modoActivo.alClic(m); return; }
  const p = lanzar(ev);
  if (!p) return;
  const o = objetivoDesdeParte(p);
  if (o.tipo === 'division') {
    if (!estado.division) seleccionarDivision(o.id);
    else desglosar(o.id);
  } else if (o.tipo === 'unidad') desglosar(o.id, o.lado);
  else seleccionarParte(o.id, o.lado);
});
window.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Escape') return;
  if (!proyecto.hidden) { cerrarProyecto(); return; }
  if (buscador.abierto()) { buscador.cerrar(); return; }
  volver();
});

// ---------------------------------------------------------------------------
// Interfaz: índice, panel y controles
// ---------------------------------------------------------------------------
const listaIndice = document.getElementById('divisiones');
const panel = document.getElementById('panel');
const panelCuerpo = document.getElementById('panel-cuerpo');
const migas = document.getElementById('migas');

function renderIndice() {
  const filas = [{ id: null, corto: tr('Encéfalo completo', 'Whole brain'), num: '00' }, ...DIVISIONES.map((d, i) => ({ ...d, num: String(i + 1).padStart(2, '0') }))];
  const filasModo = MODOS.map((m, i) => h('li', {},
    h('button', { class: `fila-indice fila-pro${modoActivo && modoActivo.id === m.id ? ' activo' : ''}`, type: 'button', onclick: () => irModo(m.id) },
      h('span', { class: 'fila-num' }, String(i + 5).padStart(2, '0')),
      h('span', { class: 'fila-texto' }, m.corto),
      h('span', { class: 'fila-marca', 'aria-hidden': 'true' }))));
  listaIndice.replaceChildren(...filas.map((d) => {
    const activo = !modoActivo && (d.id ? estado.division === d.id : !estado.division);
    return h('li', {},
      h('button', {
        class: `fila-indice${activo ? ' activo' : ''}${d.id ? '' : ' fila-inicio'}`,
        type: 'button',
        style: d.id ? `--c:${INFO[d.id].color}` : '',
        onclick: () => (d.id ? (estado.division === d.id && estado.nivel === 0 ? ir({}) : seleccionarDivision(d.id)) : ir({})),
      },
      h('span', { class: 'fila-num' }, d.num),
      h('span', { class: 'fila-texto' }, d.corto),
      h('span', { class: 'fila-marca', 'aria-hidden': 'true' })));
  }), h('li', { class: 'indice-sep' }, h('span', {}, tr('Neurociencia celular', 'Cellular neuroscience'))), ...filasModo);
}

function nombreCorto(id) {
  const n = INFO[id] ? INFO[id].nombre : id;
  return quitarParentesis(n).replace('Hemisferio cerebral', 'Hemisferio').replace('cerebral hemisphere', 'hemisphere');
}
function textoLado(lado) { return lado === 'izq' ? tr('izquierdo', 'left') : lado === 'der' ? tr('derecho', 'right') : ''; }
const mayus = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function renderMigas() {
  const e = estado;
  const items = [{ t: tr('Encéfalo', 'Brain'), f: () => ir({}) }];
  if (e.division) items.push({ t: nombreCorto(e.division), f: () => ir({ division: e.division, nivel: 0 }) });
  if (e.division && e.nivel >= 1 && e.unidad && e.unidad !== e.division) {
    items.push({ t: nombreCorto(e.unidad), f: () => ir({ division: e.division, nivel: 1, unidad: e.unidad, lado: e.lado }) });
  }
  if (e.parte) items.push({ t: nombreCorto(e.parte), f: () => ir({ ...e, nivel: 2, estructura: null }, { volar: false }) });
  if (e.estructura) items.push({ t: nombreCorto(e.estructura), f: null });
  migas.replaceChildren(...items.flatMap((it, i) => [
    i ? h('span', { class: 'sep' }, '/') : '',
    h('button', { class: `miga${i === items.length - 1 ? ' actual' : ''}`, type: 'button', onclick: it.f || null, disabled: i === items.length - 1 }, it.t),
  ]));
  document.getElementById('panel-nivel').textContent = `N${Math.min(e.nivel + (e.division ? 1 : 0), 4)}/4`;
}

const filaParte = (id, activo) => ({ texto: nombreCorto(id), color: INFO[id].color, activo, accion: () => seleccionarParte(id) });

function renderPanel() {
  if (modoActivo) return;
  const e = estado;
  const abierto = !!e.division || e.infoGeneral;
  panel.classList.toggle('abierto', abierto);
  document.body.classList.toggle('con-panel', abierto);
  if (!abierto) return;
  renderMigas();
  const def = DIVISIONES.find((d) => d.id === e.division);
  let id;
  const op = { grupos: [], acciones: [], contexto: null };

  if (!e.division) {
    id = 'encefalo';
    op.grupos.push({ titulo: tr('Divisiones', 'Divisions'), filas: DIVISIONES.map((d) => ({ texto: d.corto, color: INFO[d.id].color, accion: () => seleccionarDivision(d.id) })) });
  } else if (e.estructura) {
    id = e.estructura;
    op.contexto = `${nombreCorto(e.parte)}${e.lado && e.division === 'telencefalo' ? ` · ${textoLado(e.lado)}` : ''}`;
    op.grupos.push({ titulo: `${tr('Más en', 'More in')} ${nombreCorto(e.parte).toLowerCase()}`, filas: estructurasDe(e.parte).map((s) => ({ texto: nombreCorto(s.id), activo: s.id === e.estructura, interno: s.interno, accion: () => seleccionarEstructura(s.id) })) });
  } else if (e.parte) {
    id = e.parte;
    if (e.lado && e.division === 'telencefalo' && e.parte !== 'cuerpo_calloso') op.contexto = tr(`Hemisferio ${textoLado(e.lado)}`, `${mayus(textoLado(e.lado))} hemisphere`);
    else if (e.lado) op.contexto = tr(`Lado ${textoLado(e.lado)}`, `${mayus(textoLado(e.lado))} side`);
    const est = estructurasDe(e.parte);
    if (est.length) op.grupos.push({ titulo: tr('Estructuras en el modelo', 'Structures in the model'), nota: tr('Clic para iluminar la zona', 'Click to highlight the area'), filas: est.map((s) => ({ texto: nombreCorto(s.id), interno: s.interno, accion: () => seleccionarEstructura(s.id) })) });
    op.grupos.push({ titulo: e.division === 'telencefalo' ? tr('Lóbulos', 'Lobes') : tr('Partes', 'Parts'), filas: def.partes.map((pid) => filaParte(pid, pid === e.parte && !e.profundas)) });
    if (def.profundas.length) op.grupos.push({ titulo: tr('Estructuras internas', 'Internal structures'), filas: def.profundas.map((pid) => filaParte(pid, pid === e.parte)) });
  } else if (e.nivel >= 1) {
    id = e.unidad && e.unidad !== e.division ? e.unidad : e.division;
    op.grupos.push({ titulo: e.division === 'telencefalo' ? tr('Lóbulos', 'Lobes') : tr('Partes', 'Parts'), filas: def.partes.map((pid) => filaParte(pid, false)) });
    if (def.profundas.length) op.grupos.push({ titulo: tr('Estructuras internas', 'Internal structures'), filas: def.profundas.map((pid) => filaParte(pid, false)) });
  } else {
    id = e.division;
    if (def.unidades.length) {
      op.grupos.push({ titulo: tr('Hemisferios', 'Hemispheres'), nota: tr('Clic en uno para ver sus lóbulos', 'Click one to see its lobes'), filas: def.unidades.map((u) => ({ texto: nombreCorto(u), color: INFO[u].color, accion: () => desglosar(u, u.endsWith('izq') ? 'izq' : 'der') })) });
    } else {
      op.acciones.push(h('button', { class: 'btn btn-solido', type: 'button', onclick: () => desglosar(e.division) }, tr('Desglosar en partes', 'Break down into parts'), h('span', { class: 'btn-flecha' }, '→')));
    }
  }
  if (e.division && e.nivel >= 1 && def.profundas.length) {
    op.acciones.push(h('button', { class: `btn btn-borde${e.profundas ? ' activo' : ''}`, type: 'button', onclick: alternarProfundas },
      h('span', { class: 'btn-casilla' }), tr('Estructuras internas', 'Internal structures')));
  }
  panelCuerpo.replaceChildren(fichaInfo(INFO[id], op));
  panelCuerpo.scrollTop = 0;
  document.getElementById('btn-volver').disabled = !e.division && !e.infoGeneral;
}

document.getElementById('btn-volver').addEventListener('click', volver);
document.getElementById('btn-info').addEventListener('click', () => ir(estado.infoGeneral ? {} : { infoGeneral: true }, { volar: false }));
const btnEtiquetas = document.getElementById('btn-etiquetas');
btnEtiquetas.addEventListener('click', () => {
  mostrarEtiquetas = !mostrarEtiquetas;
  btnEtiquetas.classList.toggle('activo', mostrarEtiquetas);
  actualizarPines();
  calcularObjetivos();
  pedirRender();
});
const btnRotar = document.getElementById('btn-rotar');
btnRotar.addEventListener('click', () => {
  rotacion = !rotacion;
  btnRotar.classList.toggle('activo', rotacion);
  controles.autoRotate = rotacion && !estado.division;
});
document.getElementById('btn-vista').addEventListener('click', () => volarA(vistaActual()));

// ---------------------------------------------------------------------------
// Más información de este proyecto (autoría y créditos)
// ---------------------------------------------------------------------------
const proyecto = document.getElementById('proyecto');
const btnProyecto = document.getElementById('btn-proyecto');
function abrirProyecto() {
  const fila = (etq, ...cont) => h('div', { class: 'proyecto-fila' }, h('dt', {}, etq), h('dd', {}, ...cont));
  document.getElementById('proyecto-cuerpo').replaceChildren(
    h('h2', { class: 'proyecto-titulo', id: 'proyecto-titulo' }, 'Cerebrum', h('span', { class: 'marca-punto' }, '.')),
    h('p', { class: 'proyecto-lead' }, tr(
      'Atlas interactivo de neuroanatomía y neurociencia celular, creado con fines educativos.',
      'An interactive atlas of neuroanatomy and cellular neuroscience, created for educational purposes.')),
    h('dl', { class: 'proyecto-filas' },
      fila(tr('Autoría', 'Author'),
        h('span', { class: 'proyecto-autor' }, 'Maximiliano Morales Domínguez'),
        tr('Software desarrollado por el autor intelectual del proyecto, quien concibió la idea y dirigió su diseño y desarrollo.',
          'Software developed by the intellectual author of the project, who conceived the idea and directed its design and development.')),
      fila(tr('Uso de IA', 'Use of AI'), tr(
        'Se utilizaron herramientas de inteligencia artificial (Claude Opus 5.5, de Anthropic) como apoyo en el desarrollo, especialmente en la programación, el modelado 3D y la recopilación de información.',
        'Artificial intelligence tools (Claude Opus 5.5, by Anthropic) supported the development, especially the programming, 3D modeling and gathering of information.')),
      fila(tr('Fuentes', 'Sources'), tr(
        'La información proviene de fuentes médicas de alta confianza (NCBI StatPearls, Manual MSD, MedlinePlus, PubMed, OMS y libros de texto de referencia), citadas al final de cada ficha.',
        'The information comes from highly trusted medical sources (NCBI StatPearls, MSD Manual, MedlinePlus, PubMed, WHO and reference textbooks), cited at the end of each entry.')),
      fila(tr('Tecnología', 'Technology'), tr(
        'Modelo 3D procedural en WebGL (Three.js). El potencial de acción se simula en tiempo real con el modelo de Hodgkin-Huxley.',
        'Procedural 3D model in WebGL (Three.js). The action potential is simulated in real time with the Hodgkin-Huxley model.')),
      fila(tr('Aviso', 'Notice'),
        h('p', {}, tr('Contenido educativo. No sustituye la valoración de un profesional de la salud.',
          'Educational content. It does not replace assessment by a health professional.')),
        h('p', {}, tr('Las fuentes académicas fueron seleccionadas minuciosamente por el autor intelectual. En caso de hallar un error en la información o en el programa, envía un correo a: ',
          'The academic sources were carefully selected by the intellectual author. If you find an error in the information or in the program, please send an email to: '),
          h('a', { class: 'proyecto-correo', href: 'mailto:as.1759616@gmail.com' }, 'as.1759616@gmail.com')))),
    h('div', { class: 'proyecto-pie' }, h('span', {}, tr('Versión Pro', 'Pro version')), h('span', {}, 'Maximiliano Morales Domínguez · 2026')));
  proyecto.hidden = false;
  proyecto.querySelector('.proyecto-caja').focus();
}
function cerrarProyecto() { proyecto.hidden = true; btnProyecto.focus(); }
btnProyecto.addEventListener('click', abrirProyecto);
proyecto.querySelectorAll('[data-cerrar]').forEach((el) => el.addEventListener('click', cerrarProyecto));

// ---------------------------------------------------------------------------
// Escala (cm) y lectura de la cámara
// ---------------------------------------------------------------------------
const escalaBarra = document.getElementById('escala-barra');
const escalaTexto = document.getElementById('escala-texto');
const lectura = document.getElementById('lectura');
function actualizarInstrumentos() {
  const dist = camara.position.distanceTo(controles.target);
  const pxPorCm = window.innerHeight / (2 * dist * Math.tan(THREE.MathUtils.degToRad(camara.fov / 2)));
  const opciones = [1, 2, 5, 10];
  const cm = opciones.find((c) => c * pxPorCm >= 70) || 10;
  escalaBarra.style.width = `${Math.round(cm * pxPorCm)}px`;
  escalaTexto.textContent = `${cm} cm`;
  const v = camara.position.clone().sub(controles.target);
  const az = (THREE.MathUtils.radToDeg(Math.atan2(v.x, v.z)) + 360) % 360;
  const el = THREE.MathUtils.radToDeg(Math.asin(v.y / v.length()));
  lectura.textContent = `AZ ${String(Math.round(az)).padStart(3, '0')}°  EL ${el >= 0 ? '+' : '−'}${String(Math.abs(Math.round(el))).padStart(2, '0')}°  D ${dist.toFixed(1)} cm`;
}

// ---------------------------------------------------------------------------
// Hash (permite abrir directamente un estado: #d=telencefalo&n=2&u=hemisferio_der&p=lobulo_frontal&l=der)
// ---------------------------------------------------------------------------
function guardarHash() {
  const e = estado;
  const q = new URLSearchParams();
  if (LANG_URL) q.set('lang', IDIOMA);
  if (modoActivo) {
    q.set('m', modoActivo.id);
    try { history.replaceState(null, '', `#${q.toString()}`); } catch { /* file:// */ }
    return;
  }
  if (e.division) {
    q.set('d', e.division);
    q.set('n', e.nivel);
    if (e.unidad) q.set('u', e.unidad);
    if (e.parte) q.set('p', e.parte);
    if (e.lado) q.set('l', e.lado);
    if (e.estructura) q.set('e', e.estructura);
    if (e.profundas) q.set('prof', '1');
  }
  const s = q.toString();
  try { history.replaceState(null, '', s ? `#${s}` : location.pathname + location.search); } catch { /* file:// */ }
}
function leerHash() {
  const q = new URLSearchParams(location.hash.slice(1));
  const d = q.get('d');
  if (!d || !modelos[d]) return null;
  return {
    division: d, nivel: Number(q.get('n') || 0), unidad: q.get('u'), parte: q.get('p'),
    lado: q.get('l'), estructura: q.get('e'), profundas: q.get('prof') === '1',
  };
}

// ---------------------------------------------------------------------------
// Bucle de animación
// ---------------------------------------------------------------------------
const reloj = new THREE.Clock();
let cuadro = 0, cuadrosDibujados = 0;
let renderPendiente = true;
function pedirRender() { renderPendiente = true; }
controles.addEventListener('change', pedirRender);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const difColor = (a, b) => Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b);
const PULSO = !LIGERO; // en modo ligero la zona iluminada no pulsa (permite dejar de dibujar)

// Bucle con dibujo bajo demanda: si nada cambia (cámara quieta, sin animaciones), no se dibuja.
function animar() {
  requestAnimationFrame(animar);
  cuadro++;
  const dt = Math.min(reloj.getDelta(), 0.05);
  const k = 1 - Math.exp(-dt * 7);
  const tiempo = reloj.elapsedTime;
  let activo = renderPendiente;

  for (const p of todasPartes) {
    const a = p.actual, o = p.objetivo;
    const opObj = o.visible ? o.opacidad : 0;
    const cambia = a.explosion.distanceToSquared(o.explosion) > 1e-7 || difColor(a.color, o.color) > 0.002
      || Math.abs(a.opacidad - opObj) > 0.0015 || Math.abs(a.emisivo - o.emisivo) > 0.001 || Math.abs(a.foco - o.foco) > 0.002;
    const pulsa = PULSO && a.foco > 0.003;
    if (!cambia && !pulsa && !renderPendiente) continue;
    if (cambia || pulsa) activo = true;
    a.explosion.lerp(o.explosion, k);
    if (a.explosion.distanceToSquared(o.explosion) < 1e-7) a.explosion.copy(o.explosion);
    p.grupo.position.copy(a.explosion);
    a.color.lerp(o.color, k);
    if (difColor(a.color, o.color) < 0.002) a.color.copy(o.color);
    a.opacidad += (opObj - a.opacidad) * k;
    if (Math.abs(a.opacidad - opObj) < 0.003) a.opacidad = opObj;
    a.emisivo += (o.emisivo - a.emisivo) * k;
    if (Math.abs(a.emisivo - o.emisivo) < 0.001) a.emisivo = o.emisivo;
    a.foco += (o.foco - a.foco) * Math.min(1, k * 1.4);
    if (Math.abs(a.foco - o.foco) < 0.002) a.foco = o.foco;
    p.foco.uBrillo.value = a.foco < 0.003 ? 0 : a.foco;
    p.foco.uTiempo.value = PULSO ? tiempo : 0;
    p.foco.uFantasma.value = THREE.MathUtils.smoothstep(0.45, 0.2, a.opacidad) * (a.opacidad < 0.45 ? 1 : 0);
    p.grupo.visible = a.opacidad > 0.004;
    for (const m of p.meshes) {
      const mat = m.material;
      if (!m.userData.colorFijo) mat.color.copy(a.color);
      mat.emissive.copy(m.userData.colorFijo || a.color).multiplyScalar(a.emisivo);
      const transp = a.opacidad < 0.995;
      if (mat.transparent !== transp) { mat.transparent = transp; mat.needsUpdate = true; }
      mat.opacity = a.opacidad;
      mat.depthWrite = a.opacidad > 0.6;
    }
  }
  for (const u of todasUnidades) {
    if (u.actual.distanceToSquared(u.objetivo) > 1e-7) { u.actual.lerp(u.objetivo, k); activo = true; } else u.actual.copy(u.objetivo);
    u.grupo.position.copy(u.actual);
  }

  if (vuelo) {
    activo = true;
    vuelo.t += dt / vuelo.dur;
    const t = ease(Math.min(1, vuelo.t));
    camara.position.lerpVectors(vuelo.p0, vuelo.p1, t);
    controles.target.lerpVectors(vuelo.o0, vuelo.o1, t);
    if (vuelo.t >= 1) vuelo = null;
  }
  if (modoActivo && modoActivo.actualizar(dt, tiempo)) activo = true;
  if (aplicarDesplazamiento(k)) activo = true;
  if (controles.update()) activo = true;
  if (!activo) return;
  renderPendiente = false;
  renderer.render(escena, camara);
  capaEtiquetas.render(escena, camara);
  cuadrosDibujados++;
  if (cuadrosDibujados % 8 === 0) comprobarOclusion();
  actualizarInstrumentos();
  medirRendimiento(dt);
}

// Si el equipo va lento en calidad alta, se sugiere el modo ligero.
const monitor = { muestras: [], hecho: LIGERO || CALIDAD_FIJADA };
function medirRendimiento(dt) {
  if (monitor.hecho || reloj.elapsedTime < 2) return;
  monitor.muestras.push(dt);
  if (monitor.muestras.length < 90) return;
  monitor.hecho = true;
  const orden = monitor.muestras.sort((a, b) => a - b);
  const mediana = orden[orden.length >> 1];
  if (mediana > 1 / 24) mostrarAvisoCalidad(Math.round(1 / mediana));
}
function cambiarCalidad(nueva) {
  try { localStorage.setItem(CLAVE_CALIDAD, nueva); } catch { /* sin almacenamiento */ }
  const q = new URLSearchParams(location.hash.slice(1));
  q.set('q', nueva);
  location.hash = q.toString();
  location.reload();
}
function mostrarAvisoCalidad(fps) {
  document.getElementById('aviso-calidad-texto').textContent = tr(`La animación va a ~${fps} cuadros/s en este equipo.`, `The animation runs at ~${fps} frames/s on this device.`);
  document.getElementById('aviso-calidad').hidden = false;
}
document.getElementById('btn-ligero').addEventListener('click', () => cambiarCalidad('baja'));
document.getElementById('btn-aviso-cerrar').addEventListener('click', () => { document.getElementById('aviso-calidad').hidden = true; });
const btnCalidad = document.getElementById('btn-calidad');
btnCalidad.querySelector('.ctrl-texto').textContent = `${tr('Calidad', 'Quality')} · ${LIGERO ? tr('Ligera', 'Light') : tr('Alta', 'High')}`;
btnCalidad.classList.toggle('activo', !LIGERO);
btnCalidad.title = LIGERO ? tr('Cambiar a calidad alta (más detalle, requiere mejor equipo)', 'Switch to high quality (more detail, needs a better device)') : tr('Cambiar a calidad ligera (más fluida en equipos modestos)', 'Switch to light quality (smoother on modest devices)');
btnCalidad.addEventListener('click', () => cambiarCalidad(LIGERO ? 'alta' : 'baja'));

window.addEventListener('resize', () => {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  capaEtiquetas.setSize(window.innerWidth, window.innerHeight);
  fijarDesplazamiento();
  pedirRender();
});

// ---------------------------------------------------------------------------
// Inicio
// ---------------------------------------------------------------------------
async function iniciar() {
  try {
    await construirModelo();
  } catch (err) {
    document.getElementById('carga-texto').textContent = `${tr('Error al cargar el modelo', 'Error loading the model')}: ${err.message}`;
    console.error(err);
    return;
  }
  const inicial = leerHash();
  const qh = new URLSearchParams(location.hash.slice(1));
  if (qh.get('r') === '0') { rotacion = false; btnRotar.classList.remove('activo'); }
  ir(inicial || {}, { volar: false });
  const modoInicial = qh.get('m');
  if (modoInicial && MODOS.some((d) => d.id === modoInicial)) {
    irModo(modoInicial, { tipo: qh.get('t') || undefined, nt: qh.get('nt') || undefined });
    if (vuelo) { camara.position.copy(vuelo.p1); controles.target.copy(vuelo.o1); vuelo = null; }
    desplaz = desplazamientoObjetivo();
    fijarDesplazamiento();
  }
  if (inicial) {
    const v = vistaActual();
    camara.position.set(...v.pos);
    controles.target.set(...v.obj);
    for (const p of todasPartes) {
      p.actual.explosion.copy(p.objetivo.explosion);
      p.actual.opacidad = p.objetivo.visible ? p.objetivo.opacidad : 0;
      p.actual.color.copy(p.objetivo.color);
    }
    for (const u of todasUnidades) u.actual.copy(u.objetivo);
    desplaz = desplazamientoObjetivo();
    fijarDesplazamiento();
    if (inicial.parte && !inicial.profundas) enfocarParte();
    if (vuelo) { camara.position.copy(vuelo.p1); controles.target.copy(vuelo.o1); vuelo = null; }
  }
  // parámetros de depuración de cámara: cam=x,y,z & obj=x,y,z
  if (qh.get('cam')) camara.position.set(...qh.get('cam').split(',').map(Number));
  if (qh.get('obj')) controles.target.set(...qh.get('obj').split(',').map(Number));
  document.getElementById('carga').classList.add('oculto');
  animar();
}
requestAnimationFrame(() => setTimeout(iniciar, 40));

// Ayudas para pruebas automatizadas
const PUNTOS_PRUEBA = { telencefalo: [4, 1.5, 0], diencefalo: [0.78, 0.3, -0.6], cerebelo: [1.6, -4, -5.4], tallo: [0, -3.7, -1.0] };
window.__estado = () => ({ ...estado, pines: pines.length, cuadro, cuadrosDibujados, calidad: CALIDAD, modo: modoActivo ? modoActivo.id : null });
window.__proyectar = (d) => {
  const v = new THREE.Vector3(...PUNTOS_PRUEBA[d]).project(camara);
  return [((v.x + 1) / 2) * window.innerWidth, ((1 - v.y) / 2) * window.innerHeight];
};
