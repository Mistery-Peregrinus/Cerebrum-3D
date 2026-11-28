// Simulación del potencial de acción con el modelo de Hodgkin-Huxley (1952) en un axón
// discretizado (ecuación de cable). Convención moderna: reposo ≈ -65 mV.
// Hodgkin AL, Huxley AF. J Physiol. 1952;117(4):500-44 (PMID 12991237).

const G_NA = 120, G_K = 36, G_L = 0.3; // mS/cm²
const E_NA = 50, E_K = -77, E_L = -54.387; // mV
const CM = 1; // µF/cm²
const PHI = 3; // factor de temperatura (≈16 °C): potencial de ~1 ms

function tasas(V) {
  const am = Math.abs(V + 40) < 1e-6 ? 1 : (0.1 * (V + 40)) / (1 - Math.exp(-(V + 40) / 10));
  const bm = 4 * Math.exp(-(V + 65) / 18);
  const ah = 0.07 * Math.exp(-(V + 65) / 20);
  const bh = 1 / (1 + Math.exp(-(V + 35) / 10));
  const an = Math.abs(V + 55) < 1e-6 ? 0.1 : (0.01 * (V + 55)) / (1 - Math.exp(-(V + 55) / 10));
  const bn = 0.125 * Math.exp(-(V + 65) / 80);
  return [am * PHI, bm * PHI, ah * PHI, bh * PHI, an * PHI, bn * PHI];
}

export const CONSTANTES = { G_NA, G_K, G_L, E_NA, E_K, E_L, REPOSO: -65, UMBRAL_APROX: -55 };

export class CableHH {
  constructor(mielinizado = false) { this.configurar(mielinizado); }

  configurar(mielinizado) {
    this.mielinizado = mielinizado;
    // Amielínico: compartimentos continuos. Mielinizado: solo nodos de Ranvier activos,
    // acoplados por un internodo aislante (mucho menor pérdida → acoplamiento efectivo mayor).
    this.N = mielinizado ? 12 : 150;
    this.ga = mielinizado ? 40 : 134; // mS/cm² (acoplamiento axial entre compartimentos)
    this.dt = 0.0025; // ms (estable: dt < Cm / 2ga)
    const N = this.N;
    this.V = new Float64Array(N).fill(-65);
    const [am, bm, ah, bh, an, bn] = tasas(-65);
    this.m = new Float64Array(N).fill(am / (am + bm));
    this.h = new Float64Array(N).fill(ah / (ah + bh));
    this.n = new Float64Array(N).fill(an / (an + bn));
    this.INa = new Float64Array(N);
    this.IK = new Float64Array(N);
    this.t = 0;
    this.estimulos = [];
    this._tmp = new Float64Array(N);
  }

  reiniciar() { this.configurar(this.mielinizado); }

  /** amplitud en µA/cm², duración en ms; se aplica en el segmento inicial (cono axónico) */
  estimular(amplitud, retraso = 0, duracion = 0.5) {
    this.estimulos.push({ t0: this.t + retraso, t1: this.t + retraso + duracion, a: amplitud });
  }

  avanzar(ms) {
    const pasos = Math.max(1, Math.round(ms / this.dt));
    const { N, V, m, h, n, INa, IK, ga } = this;
    const dt = ms / pasos;
    const tmp = this._tmp;
    for (let s = 0; s < pasos; s++) {
      let iest = 0;
      for (const e of this.estimulos) if (this.t >= e.t0 && this.t < e.t1) iest += e.a;
      for (let i = 0; i < N; i++) {
        const v = V[i];
        const [am, bm, ah, bh, an, bn] = tasas(v);
        // integración exponencial (Rush-Larsen) de las compuertas
        const tm = am + bm, th = ah + bh, tn = an + bn;
        m[i] = am / tm + (m[i] - am / tm) * Math.exp(-tm * dt);
        h[i] = ah / th + (h[i] - ah / th) * Math.exp(-th * dt);
        n[i] = an / tn + (n[i] - an / tn) * Math.exp(-tn * dt);
        const ina = G_NA * m[i] ** 3 * h[i] * (v - E_NA);
        const ik = G_K * n[i] ** 4 * (v - E_K);
        const il = G_L * (v - E_L);
        INa[i] = ina; IK[i] = ik;
        const izq = i > 0 ? V[i - 1] : v, der = i < N - 1 ? V[i + 1] : v;
        const iax = ga * (izq - 2 * v + der);
        const ie = i < (this.mielinizado ? 1 : 3) ? iest : 0;
        tmp[i] = v + (dt / CM) * (iax + ie - ina - ik - il);
      }
      V.set(tmp);
      this.t += dt;
    }
    this.estimulos = this.estimulos.filter((e) => e.t1 > this.t);
  }

  /** conductancias normalizadas (0–1) de un compartimento: Na⁺ = m³h, K⁺ = n⁴ */
  compuertas(i) {
    return { m: this.m[i], h: this.h[i], n: this.n[i], gNa: this.m[i] ** 3 * this.h[i], gK: this.n[i] ** 4 };
  }
}

// Umbral (µA/cm², pulso de 0.5 ms) medido con este mismo modelo
export const UMBRAL = { amielinico: 76.5, mielinizado: 119.8 };
