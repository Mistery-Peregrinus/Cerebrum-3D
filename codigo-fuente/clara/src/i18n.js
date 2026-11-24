// Idioma de la interfaz (español / inglés).
// Orden de prioridad: ?lang= o #lang= en la URL → elección guardada → idioma del navegador.
const CLAVE = 'encefalo3d-idioma';
const valido = (l) => l === 'es' || l === 'en';

function detectar() {
  const url = new URLSearchParams(location.search).get('lang') || new URLSearchParams(location.hash.slice(1)).get('lang');
  if (valido(url)) return url;
  try {
    const g = localStorage.getItem(CLAVE);
    if (valido(g)) return g;
  } catch { /* almacenamiento no disponible */ }
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
  return /^es\b/i.test(nav) ? 'es' : 'en';
}

export const IDIOMA = detectar();
export const EN = IDIOMA === 'en';
document.documentElement.lang = IDIOMA;

/** Devuelve el texto en el idioma activo. */
export const t = (es, en) => (EN ? en : es);

/** Aplica una capa de textos en inglés sobre un objeto de datos { id: {...} } (sin tocar colores, ids ni fuentes). */
export function traducir(base, en) {
  if (!EN) return base;
  const r = {};
  for (const [k, v] of Object.entries(base)) r[k] = en[k] ? { ...v, ...en[k] } : v;
  return r;
}

/** Cambia el idioma y recarga la página conservando la vista actual (el estado vive en el hash). */
export function cambiarIdioma(l) {
  if (!valido(l) || l === IDIOMA) return;
  try { localStorage.setItem(CLAVE, l); } catch { /* sin almacenamiento */ }
  const q = new URLSearchParams(location.hash.slice(1));
  q.set('lang', l);
  location.hash = q.toString();
  location.reload();
}

/** Traduce los textos fijos del HTML marcados con data-en, data-en-title, data-en-placeholder y data-en-aria. */
export function traducirHTML(raiz = document) {
  if (!EN) return;
  raiz.querySelectorAll('[data-en]').forEach((el) => { el.textContent = el.dataset.en; });
  raiz.querySelectorAll('[data-en-title]').forEach((el) => { el.title = el.dataset.enTitle; });
  raiz.querySelectorAll('[data-en-placeholder]').forEach((el) => { el.placeholder = el.dataset.enPlaceholder; });
  raiz.querySelectorAll('[data-en-aria]').forEach((el) => { el.setAttribute('aria-label', el.dataset.enAria); });
}
