// English versions of the sources: titles and links to the English editions (same ids as FUENTES).
// Only entries that differ from the Spanish version are listed.
const MSD = 'https://www.msdmanuals.com';
const PRO = `${MSD}/professional/neurologic-disorders`;
const MP = (p) => `https://medlineplus.gov/${p}`;

export const EN_FUENTES = {
  // ---- MSD Manual (English editions) ----
  msd_cerebro: { titulo: 'Brain (Consumer Version)', org: 'MSD Manual', url: `${MSD}/home/brain-spinal-cord-and-nerve-disorders/biology-of-the-nervous-system/brain` },
  msd_localizacion: { titulo: 'Brain Dysfunction by Location', org: 'MSD Manual', url: `${MSD}/home/brain-spinal-cord-and-nerve-disorders/brain-dysfunction/brain-dysfunction-by-location` },
  msd_funcion_cerebral: { titulo: 'Overview of Cerebral Function (Professional)', org: 'MSD Manual', url: `${PRO}/function-and-dysfunction-of-the-cerebral-lobes/overview-of-cerebral-function` },
  msd_afasia: { titulo: 'Aphasia (Professional)', org: 'MSD Manual', url: `${PRO}/function-and-dysfunction-of-the-cerebral-lobes/aphasia` },
  msd_dft: { titulo: 'Frontotemporal Dementia (Professional)', org: 'MSD Manual', url: `${PRO}/delirium-and-dementia/frontotemporal-dementia` },
  msd_convulsiones: { titulo: 'Seizure Disorders (Professional)', org: 'MSD Manual', url: `${PRO}/seizure-disorders/seizure-disorders` },
  msd_acv: { titulo: 'Overview of Stroke (Professional)', org: 'MSD Manual', url: `${PRO}/stroke/overview-of-stroke` },
  msd_cerebelosos: { titulo: 'Cerebellar Disorders (Professional)', org: 'MSD Manual', url: `${PRO}/movement-and-cerebellar-disorders/cerebellar-disorders` },
  msd_parkinson: { titulo: 'Parkinson Disease (Professional)', org: 'MSD Manual', url: `${PRO}/movement-and-cerebellar-disorders/parkinson-disease` },
  msd_psp: { titulo: 'Progressive Supranuclear Palsy (Professional)', org: 'MSD Manual', url: `${PRO}/movement-and-cerebellar-disorders/progressive-supranuclear-palsy-psp` },
  msd_parkinsonismo: { titulo: 'Secondary and Atypical Parkinsonism (Professional)', org: 'MSD Manual', url: `${PRO}/movement-and-cerebellar-disorders/secondary-and-atypical-parkinsonism` },
  msd_temblor: { titulo: 'Tremor (Professional)', org: 'MSD Manual', url: `${PRO}/movement-and-cerebellar-disorders/tremor` },
  msd_movimiento: { titulo: 'Overview of Movement Disorders', org: 'MSD Manual', url: `${MSD}/home/brain-spinal-cord-and-nerve-disorders/movement-disorders/overview-of-movement-disorders` },

  // ---- MedlinePlus (English) ----
  mp_ataxia_aguda: { titulo: 'Acute cerebellar ataxia', url: MP('ency/article/001397.htm') },
  mp_friedreich: { titulo: 'Friedreich ataxia', url: MP('ency/article/001411.htm') },
  mp_desmielinizacion: { titulo: 'Osmotic demyelination syndrome', url: MP('ency/article/000775.htm') },
  mp_demencia: { titulo: 'Dementia', url: MP('ency/article/000739.htm') },
  mp_apraxia: { titulo: 'Apraxia', url: MP('ency/article/007472.htm') },
  mp_diabetes_insipida: { titulo: 'Central diabetes insipidus', url: MP('ency/article/000460.htm') },
  mp_tumor_hipofisario: { titulo: 'Pituitary tumor', url: MP('ency/article/000704.htm') },
  mp_acromegalia: { titulo: 'Acromegaly', url: MP('ency/article/000321.htm') },
  mp_huntington: { titulo: 'Huntington\'s Disease', url: MP('huntingtonsdisease.html') },
  mp_parkinson: { titulo: 'Parkinson\'s Disease', url: MP('parkinsonsdisease.html') },
  mp_trastornos_movimiento: { titulo: 'Movement Disorders', url: MP('movementdisorders.html') },
  mp_cerebelo: { titulo: 'Cerebellar Disorders', url: MP('cerebellardisorders.html') },
  mp_acv: { titulo: 'Stroke', url: MP('stroke.html') },
  mp_epilepsia: { titulo: 'Epilepsy', url: MP('epilepsy.html') },
  mp_miastenia: { titulo: 'Myasthenia Gravis', url: MP('myastheniagravis.html') },
  mp_depresion: { titulo: 'Depression', url: MP('depression.html') },
  mp_esquizofrenia: { titulo: 'Schizophrenia', url: MP('schizophrenia.html') },
  mp_esclerosis_multiple: { titulo: 'Multiple Sclerosis', url: MP('multiplesclerosis.html') },
  mp_alzheimer: { titulo: 'Alzheimer\'s Disease', url: MP('alzheimersdisease.html') },

  // ---- WHO ----
  oms_epilepsia: { titulo: 'Epilepsy — Fact sheet', org: 'World Health Organization', url: 'https://www.who.int/news-room/fact-sheets/detail/epilepsy' },

  // ---- Textbooks (English editions) ----
  libro_snell: { titulo: 'Splittgerber R. Snell\'s Clinical Neuroanatomy, 8th ed.' },
  libro_kandel: { titulo: 'Kandel ER, et al. Principles of Neural Science, 5th ed.' },
  libro_purves: { titulo: 'Purves D, et al. Neuroscience, 5th ed.', org: 'Sinauer Associates' },
  libro_guyton: { titulo: 'Hall JE. Guyton and Hall Textbook of Medical Physiology, 14th ed.' },
  libro_purves_ncbi: { titulo: 'Purves D, et al. Neuroscience, 2nd ed. (ch. 5: Synaptic Transmission)' },
};
