// Gráfica sencilla en <canvas> con estilo del panel (osciloscopio).
export function crearGrafica(canvas, o) {
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    W = Math.max(200, r.width); H = Math.max(120, r.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  medir();
  const M = { l: 38, r: 10, t: 10, b: 24 };
  const X = (x) => M.l + ((x - o.xMin) / (o.xMax - o.xMin)) * (W - M.l - M.r);
  const Y = (y) => M.t + (1 - (y - o.yMin) / (o.yMax - o.yMin)) * (H - M.t - M.b);

  function dibujar(series, extra = {}) {
    if (canvas.getBoundingClientRect().width !== W) medir();
    ctx.clearRect(0, 0, W, H);
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.lineWidth = 1;
    // cuadrícula
    ctx.strokeStyle = '#1c1c1c'; ctx.fillStyle = '#5c5c5c';
    for (let y = o.yMin; y <= o.yMax + 1e-9; y += o.yPaso) {
      ctx.beginPath(); ctx.moveTo(M.l, Y(y)); ctx.lineTo(W - M.r, Y(y)); ctx.stroke();
      ctx.textAlign = 'right'; ctx.fillText(String(Math.round(y)), M.l - 6, Y(y) + 3);
    }
    for (let x = o.xMin; x <= o.xMax + 1e-9; x += o.xPaso) {
      ctx.beginPath(); ctx.moveTo(X(x), M.t); ctx.lineTo(X(x), H - M.b); ctx.stroke();
      ctx.textAlign = 'center'; ctx.fillText(String(+x.toFixed(2)), X(x), H - M.b + 14);
    }
    ctx.textAlign = 'right'; ctx.fillStyle = '#6b6b6b';
    ctx.fillText(o.xEtiqueta || '', W - M.r, H - 2);
    ctx.textAlign = 'left';
    ctx.fillText(o.yEtiqueta || '', M.l + 4, M.t + 9);
    // líneas de referencia
    for (const l of o.lineas || []) {
      ctx.setLineDash([4, 4]); ctx.strokeStyle = l.color || '#3a3a3a';
      ctx.beginPath(); ctx.moveTo(M.l, Y(l.y)); ctx.lineTo(W - M.r, Y(l.y)); ctx.stroke();
      ctx.setLineDash([]); ctx.fillStyle = l.color || '#5c5c5c'; ctx.textAlign = 'right';
      ctx.fillText(l.etiqueta, W - M.r - 2, Y(l.y) + (l.abajo ? 11 : -4));
    }
    // series
    for (const s of series) {
      const n = s.n ?? s.xs.length;
      if (n < 2) continue;
      ctx.strokeStyle = s.color; ctx.lineWidth = s.ancho || 1.6;
      ctx.setLineDash(s.punteada ? [5, 4] : []);
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const px = X(s.xs[i]), py = Y(Math.max(o.yMin, Math.min(o.yMax, s.ys[i])));
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (extra.cursor != null) {
      ctx.strokeStyle = 'rgba(255,59,47,0.7)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(extra.cursor), M.t); ctx.lineTo(X(extra.cursor), H - M.b); ctx.stroke();
    }
    // leyenda
    let lx = M.l + 6;
    for (const s of series) {
      if (!s.etiqueta) continue;
      ctx.fillStyle = s.color; ctx.fillRect(lx, M.t + 16, 10, 2);
      ctx.fillStyle = '#a1a1a1'; ctx.textAlign = 'left'; ctx.fillText(s.etiqueta, lx + 14, M.t + 20);
      lx += ctx.measureText(s.etiqueta).width + 30;
    }
  }
  return { dibujar, medir };
}
