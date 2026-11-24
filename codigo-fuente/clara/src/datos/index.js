import { t, traducir } from '../i18n.js';
import { INFO_GENERAL } from './general.js';
import { INFO_TELENCEFALO } from './telencefalo.js';
import { INFO_DIENCEFALO } from './diencefalo.js';
import { INFO_CEREBELO } from './cerebelo.js';
import { INFO_TALLO } from './tallo.js';
import { FUENTES as FUENTES_ES } from './fuentes.js';
import { EN_GENERAL } from './en/general.js';
import { EN_TELENCEFALO } from './en/telencefalo.js';
import { EN_TELENCEFALO_2 } from './en/telencefalo2.js';
import { EN_DIENCEFALO } from './en/diencefalo.js';
import { EN_CEREBELO } from './en/cerebelo.js';
import { EN_TALLO } from './en/tallo.js';
import { EN_FUENTES } from './en/fuentes.js';

export const FUENTES = traducir(FUENTES_ES, EN_FUENTES);

export const INFO = traducir(
  { ...INFO_GENERAL, ...INFO_TELENCEFALO, ...INFO_DIENCEFALO, ...INFO_CEREBELO, ...INFO_TALLO },
  { ...EN_GENERAL, ...EN_TELENCEFALO, ...EN_TELENCEFALO_2, ...EN_DIENCEFALO, ...EN_CEREBELO, ...EN_TALLO },
);

// Orden de las divisiones y de sus partes en la interfaz
export const DIVISIONES = [
  {
    id: 'telencefalo', corto: t('Telencéfalo', 'Telencephalon'),
    unidades: ['hemisferio_izq', 'hemisferio_der'],
    partes: ['lobulo_frontal', 'lobulo_parietal', 'lobulo_temporal', 'lobulo_occipital', 'insula'],
    profundas: ['cuerpo_calloso', 'nucleo_caudado', 'putamen', 'globo_palido', 'hipocampo', 'amigdala'],
  },
  { id: 'diencefalo', corto: t('Diencéfalo', 'Diencephalon'), unidades: [], partes: ['talamo', 'hipotalamo', 'epitalamo', 'subtalamo'], profundas: [] },
  {
    id: 'cerebelo', corto: t('Cerebelo', 'Cerebellum'), unidades: [],
    partes: ['vermis', 'lobulo_anterior', 'lobulo_posterior', 'lobulo_floculonodular', 'pedunculos_cerebelosos'],
    profundas: ['nucleos_cerebelosos'],
  },
  { id: 'tallo', corto: t('Tallo cerebral', 'Brainstem'), unidades: [], partes: ['mesencefalo', 'puente', 'bulbo'], profundas: [] },
];

export function estructurasDe(parteId) {
  return Object.entries(INFO)
    .filter(([, v]) => v.clase === 'estructura' && v.parte === parteId)
    .map(([id, v]) => ({ id, ...v }));
}
