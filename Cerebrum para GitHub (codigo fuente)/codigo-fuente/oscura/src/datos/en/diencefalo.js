// English text for INFO_DIENCEFALO.
export const EN_DIENCEFALO = {
  diencefalo: {
    nombre: 'Diencephalon',
    tipo: 'Brain division',
    resumen:
      'The central region of the brain between the telencephalon and the midbrain, around the third ventricle. It acts as the great relay station for sensory information heading to the cortex and as a regulator of homeostasis, the endocrine system and biological rhythms. Click on it to break it down into its four parts.',
    ubicacion:
      'Deep within the brain, almost completely covered by the cerebral hemispheres (in the model, the telencephalon turns transparent to reveal it). It derives from the embryonic prosencephalon. Its lateral walls form the third ventricle; below, it continues into the brainstem.',
    contenido: [
      'Thalamus: the largest part (about 80% of the diencephalon).',
      'Hypothalamus: below the thalamus; connected to the pituitary gland by the infundibulum.',
      'Epithalamus: pineal gland, habenular nuclei and posterior commissure.',
      'Subthalamus: subthalamic nucleus and zona incerta.',
      'Metathalamus: lateral and medial geniculate nuclei (often included in the thalamus).',
      'The retina, optic nerve and neurohypophysis also derive from the diencephalon.',
    ],
    funciones: [
      'Relay and filtering of almost all sensory information to the cortex (except smell).',
      'Regulation of consciousness, attention and the sleep-wake cycle.',
      'Homeostasis: temperature, hunger, thirst and water balance.',
      'Control of the endocrine system through the pituitary gland.',
      'Circadian rhythms (suprachiasmatic nucleus and pineal gland).',
      'Participation in motor, memory and emotional circuits.',
    ],
    irrigacion:
      'Perforating branches of the circle of Willis: thalamoperforating and thalamogeniculate arteries (from the posterior cerebral), the posterior communicating artery, and the anterior and posterior choroidal arteries.',
    padecimientos: [
      ['Thalamic infarcts and hemorrhages', 'Common in people with hypertension; they cause contralateral sensory loss.'],
      ['Dejerine-Roussy syndrome', 'Severe central pain after a thalamic infarct.'],
      ['Wernicke-Korsakoff syndrome', 'Due to thiamine (vitamin B1) deficiency; damages the mammillary bodies and the medial thalamus.'],
      ['Central diabetes insipidus and hypopituitarism', 'Due to injury of the hypothalamus or pituitary gland.'],
      ['Sellar and pineal region tumors', 'Craniopharyngiomas, pituitary adenomas and pineal tumors.'],
      ['Hemiballismus', 'Due to a lesion of the subthalamic nucleus.'],
    ],
    siFalla: [
      'Loss of sensation and central pain on the opposite side of the body.',
      'Drowsiness or coma if both thalami are affected.',
      'Hormonal, temperature, appetite and thirst disturbances.',
      'Memory impairment.',
      'Violent involuntary movements (hemiballismus).',
    ],
  },

  // ---- Parts ----
  talamo: {
    nombre: 'Thalamus',
    tipo: 'Part of the diencephalon',
    resumen:
      'A pair of egg-shaped masses of gray matter on either side of the third ventricle. It is the "relay station" that receives, filters and distributes sensory, motor and limbic information to the cortex. It also takes part in attention, consciousness and the sleep-wake cycle.',
    ubicacion:
      'It forms the lateral walls of the upper half of the third ventricle. Laterally it borders the posterior limb of the internal capsule. The two thalami are usually joined by the interthalamic adhesion. The internal medullary lamina divides it into anterior, medial and lateral nuclear groups.',
    contenido: [
      'Anterior group (anterior nucleus).',
      'Medial group (dorsomedial nucleus).',
      'Lateral group: ventral anterior, ventral lateral, ventral posterolateral and ventral posteromedial, lateral dorsal, lateral posterior and pulvinar nuclei.',
      'Metathalamus: lateral (vision) and medial (hearing) geniculate nuclei.',
      'Intralaminar nuclei and reticular nucleus.',
    ],
    funciones: [
      'Sensory relay to the cortex: touch, pain and temperature, vision, hearing and taste.',
      'Motor relay: carries information from the basal nuclei and cerebellum to the motor cortex.',
      'Memory and emotion circuits (anterior and dorsomedial nuclei).',
      'Attention and regulation of consciousness and the sleep-wake cycle.',
    ],
    irrigacion:
      'Thalamoperforating (paramedian) and thalamogeniculate arteries (from the posterior cerebral), the tuberothalamic artery (from the posterior communicating) and the posterior choroidal arteries. Sometimes a single artery (artery of Percheron) supplies both medial thalami.',
    padecimientos: [
      ['Thalamic infarct or hemorrhage', 'Contralateral loss of all sensory modalities.'],
      ['Dejerine-Roussy syndrome', 'Persistent central pain after a thalamic infarct.'],
      ['Artery of Percheron infarct', 'Bilateral thalamic infarct: impaired consciousness, memory and vertical gaze.'],
      ['Wernicke-Korsakoff syndrome', 'Affects the medial thalamic nuclei.'],
      ['Fatal familial insomnia', 'A hereditary prion disease with thalamic degeneration.'],
    ],
    siFalla: [
      'Loss of sensation on the opposite side of the body.',
      'Central pain, sometimes very severe.',
      'Excessive sleepiness or coma (bilateral lesion).',
      'Amnesia, apathy and language disturbances.',
      'Tremor or ataxia.',
    ],
    dato: 'The ventral intermediate nucleus of the thalamus is a target of deep brain stimulation for treating essential tremor.',
  },
  hipotalamo: {
    nombre: 'Hypothalamus',
    tipo: 'Part of the diencephalon',
    resumen:
      'A small region (about 4 grams) below the thalamus that acts as the control center for homeostasis. It regulates temperature, hunger, thirst, sleep and emotions, and governs the endocrine system through the pituitary gland and the autonomic nervous system.',
    ubicacion:
      'It forms the floor and lower part of the lateral walls of the third ventricle, separated from the thalamus by the hypothalamic sulcus. It extends from the optic chiasm and lamina terminalis (in front) to the mammillary bodies (behind). The infundibulum arises from the tuber cinereum and connects it to the pituitary gland.',
    contenido: [
      'Suprachiasmatic, supraoptic, paraventricular and preoptic nuclei (anterior region).',
      'Arcuate, ventromedial and dorsomedial nuclei (tuberal region).',
      'Mammillary bodies and posterior nucleus (posterior region).',
      'Lateral hypothalamic area.',
      'Infundibulum and median eminence; connection to the pituitary gland.',
    ],
    funciones: [
      'Thermoregulation (anterior region: heat loss; posterior: heat conservation).',
      'Hunger and satiety (lateral and ventromedial hypothalamus; the arcuate nucleus senses leptin).',
      'Thirst and water balance through osmoreceptors and antidiuretic hormone.',
      'Endocrine control: releasing and inhibiting hormones that regulate the anterior pituitary; synthesis of oxytocin and vasopressin.',
      'Circadian rhythms (suprachiasmatic nucleus).',
      'Control of the autonomic nervous system and the stress response.',
      'Emotional, sexual and reproductive behavior.',
    ],
    irrigacion: 'Small perforating branches of the circle of Willis (anterior and posterior communicating, anterior and posterior cerebral arteries).',
    padecimientos: [
      ['Central diabetes insipidus', 'Deficiency of antidiuretic hormone: large volumes of dilute urine and intense thirst.'],
      ['Hypopituitarism', 'Failure of pituitary hormones due to hypothalamic or pituitary injury.'],
      ['Pituitary tumors and craniopharyngioma', 'Disrupt hormones and can compress the optic chiasm.'],
      ['Wernicke-Korsakoff syndrome', 'Damage to the mammillary bodies due to thiamine deficiency.'],
      ['Narcolepsy', 'Loss of the orexin neurons of the lateral hypothalamus.'],
      ['Hypothalamic obesity', 'Due to damage to the satiety centers.'],
    ],
    siFalla: [
      'Polyuria and polydipsia (diabetes insipidus).',
      'Hormonal disturbances: infertility, hypothyroidism, adrenal insufficiency or growth deficiency.',
      'Hyperthermia or hypothermia.',
      'Insatiable hunger and obesity, or loss of appetite.',
      'Sleep disorders and behavioral changes.',
    ],
  },
  epitalamo: {
    nombre: 'Epithalamus',
    tipo: 'Part of the diencephalon',
    resumen:
      'The dorsal and posterior part of the diencephalon. It contains the pineal gland, which secretes melatonin and helps synchronize sleep-wake rhythms, and the habenular nuclei, which connect the limbic system with the midbrain.',
    ubicacion: 'In the posterior roof of the third ventricle, above the superior colliculi of the midbrain and behind the thalami.',
    contenido: [
      'Pineal gland (epiphysis).',
      'Habenular nuclei and habenular commissure.',
      'Stria medullaris of the thalamus.',
      'Posterior commissure.',
    ],
    funciones: [
      'Melatonin secretion, regulated by light through the suprachiasmatic nucleus; synchronizes circadian rhythms.',
      'Habenula: links the limbic system with the dopaminergic and serotonergic nuclei (motivation, reward and aversion).',
      'Posterior commissure: takes part in the consensual pupillary reflex and in vertical gaze.',
    ],
    irrigacion: 'Posterior choroidal arteries (branches of the posterior cerebral).',
    padecimientos: [
      ['Pineal tumors (germinomas, pineoblastomas)', 'Compress the dorsal midbrain (Parinaud syndrome) and the aqueduct (hydrocephalus).'],
      ['Pineal cysts', 'A frequent finding on MRI; almost always benign.'],
      ['Circadian rhythm disturbances', 'Jet lag or night-shift work disrupt melatonin secretion.'],
    ],
    siFalla: [
      'Parinaud syndrome: paralysis of upward gaze and pupils that respond poorly to light.',
      'Obstructive hydrocephalus from compression of the aqueduct.',
      'Disturbances of the sleep-wake cycle.',
      'Some pineal tumors in children can cause precocious puberty.',
    ],
    dato: 'The pineal gland often calcifies with age, which makes it a visible landmark on X-rays and CT scans.',
  },
  subtalamo: {
    nombre: 'Subthalamus',
    tipo: 'Part of the diencephalon',
    resumen:
      'A region below the thalamus and lateral to the hypothalamus. Its main component, the subthalamic nucleus, is part of the basal nuclei circuit and helps suppress unwanted movements.',
    ubicacion: 'At the junction between the diencephalon and the midbrain, above the substantia nigra and medial to the internal capsule.',
    contenido: ['Subthalamic nucleus (of Luys).', 'Zona incerta.', 'Fields of Forel (fiber bundles).'],
    funciones: [
      'The subthalamic nucleus sends excitatory signals (glutamate) to the internal globus pallidus: it suppresses inappropriate movements.',
      'The zona incerta integrates sensory and motor information.',
    ],
    irrigacion: 'Branches of the posterior cerebral and posterior communicating arteries.',
    padecimientos: [
      ['Hemiballismus', 'Due to an infarct of the subthalamic nucleus: wide, violent movements of the limbs on the opposite side.'],
      ['Parkinson disease', 'The subthalamic nucleus is overactive; it is the most common target of deep brain stimulation.'],
    ],
    siFalla: ['Violent contralateral involuntary movements (ballismus).'],
  },

  // ---- Structures (markers) ----
  nucleo_anterior_talamo: {
    nombre: 'Anterior nucleus', tipo: 'Thalamic nucleus',
    resumen: 'The nucleus at the front end of the thalamus, part of the limbic system.',
    funciones: ['Receives the mammillothalamic tract and projects to the cingulate gyrus (Papez circuit).', 'Episodic memory and emotion.'],
    siFalla: 'Memory impairment.',
  },
  nucleo_dorsomedial: {
    nombre: 'Dorsomedial nucleus', tipo: 'Thalamic nucleus',
    resumen: 'A large nucleus of the medial group, next to the wall of the third ventricle, reciprocally connected with the prefrontal cortex.',
    funciones: ['Executive functions.', 'Memory.', 'Emotional regulation.'],
    siFalla: 'Amnesia (as in Korsakoff syndrome), apathy and personality changes.',
  },
  nucleos_ventrales_motores: {
    nombre: 'Ventral anterior and ventral lateral nuclei', tipo: 'Motor thalamic nuclei',
    resumen: 'The motor relay of the thalamus: they receive input from the basal nuclei (globus pallidus) and the cerebellum (dentate nucleus) and project to the motor and premotor cortices.',
    funciones: ['Planning and coordination of movement.', 'Integration of the basal nuclei and cerebellar circuits.'],
    siFalla: 'Contralateral tremor, ataxia or movement disturbances. Its ventral intermediate portion is a surgical target in essential tremor.',
  },
  nucleos_ventrales_posteriores: {
    nombre: 'Ventral posterolateral (VPL) and posteromedial (VPM) nuclei', tipo: 'Sensory thalamic nuclei',
    resumen: 'The somatosensory relay. The VPL receives sensation from the body (medial lemniscus and spinothalamic pathway); the VPM receives sensation from the face (trigeminal pathway) and taste.',
    funciones: ['Transmit touch, pain, temperature and position sense to the primary somatosensory cortex.'],
    siFalla: 'Contralateral sensory loss and sometimes thalamic pain (Dejerine-Roussy syndrome).',
  },
  pulvinar: {
    nombre: 'Pulvinar', tipo: 'Thalamic nucleus',
    resumen: 'The largest thalamic nucleus; it forms the posterior pole of the thalamus.',
    funciones: ['Visual attention.', 'Multisensory integration with the parietal, temporal and occipital association cortices.'],
    siFalla: 'Visual attention disturbances and neglect.',
  },
  geniculado_lateral: {
    nombre: 'Lateral geniculate nucleus', tipo: 'Metathalamus',
    resumen: 'Relay of the visual pathway: it receives the optic tract and sends the optic radiations to the primary visual cortex.',
    funciones: ['Transmit visual information from the contralateral visual field.'],
    siFalla: 'Contralateral homonymous hemianopia.',
  },
  geniculado_medial: {
    nombre: 'Medial geniculate nucleus', tipo: 'Metathalamus',
    resumen: 'Relay of the auditory pathway: it receives input from the inferior colliculus and projects to the primary auditory cortex.',
    funciones: ['Transmission of auditory information.'],
    siFalla: 'A unilateral lesion causes mild hearing deficits, because the auditory pathway is bilateral.',
  },
  nucleos_intralaminares: {
    nombre: 'Intralaminar and reticular nuclei', tipo: 'Thalamic nuclei',
    resumen: 'The intralaminar nuclei lie within the internal medullary lamina; the reticular nucleus wraps around the thalamus like a shell.',
    funciones: ['Cortical activation and alertness (reticular activating system).', 'The reticular nucleus regulates and filters the activity of the rest of the thalamus.'],
    siFalla: 'Disturbances of consciousness and attention.',
  },
  nucleo_supraquiasmatico: {
    nombre: 'Suprachiasmatic nucleus', tipo: 'Hypothalamic nucleus',
    resumen: 'A small nucleus just above the optic chiasm: the "master biological clock".',
    funciones: ['Receives light information from the retina (retinohypothalamic tract).', 'Synchronizes circadian rhythms and regulates melatonin secretion by the pineal gland.'],
    siFalla: 'Loss or disorganization of sleep-wake rhythms.',
  },
  nucleos_supraoptico_paraventricular: {
    nombre: 'Supraoptic and paraventricular nuclei', tipo: 'Hypothalamic nuclei',
    resumen: 'Neurosecretory nuclei that make antidiuretic hormone (vasopressin) and oxytocin, which travel down the infundibulum to the neurohypophysis.',
    funciones: ['Control of body water (antidiuretic hormone).', 'Uterine contraction and milk ejection (oxytocin).', 'The paraventricular nucleus also regulates stress (CRH) and the autonomic system.'],
    siFalla: 'Central diabetes insipidus.',
  },
  nucleo_arcuato: {
    nombre: 'Arcuate (infundibular) nucleus', tipo: 'Hypothalamic nucleus',
    resumen: 'Located at the base of the third ventricle, near the median eminence.',
    funciones: ['Senses leptin and other energy signals: regulates appetite.', 'Releases dopamine (inhibits prolactin) and growth hormone-releasing hormone.'],
    siFalla: 'Obesity and hormonal disturbances, such as raised prolactin.',
  },
  hipotalamo_lateral: {
    nombre: 'Lateral hypothalamic area', tipo: 'Hypothalamus',
    resumen: 'The lateral region of the hypothalamus, crossed by the medial forebrain bundle.',
    funciones: ['Hunger center.', 'Maintenance of wakefulness through orexin (hypocretin) neurons.'],
    siFalla: 'Loss of appetite; loss of orexin neurons causes narcolepsy with cataplexy.',
  },
  cuerpos_mamilares: {
    nombre: 'Mammillary bodies', tipo: 'Posterior hypothalamus',
    resumen: 'Two small rounded eminences at the base of the posterior hypothalamus.',
    funciones: ['They receive the fornix (from the hippocampus) and project to the anterior nucleus of the thalamus: Papez circuit and memory.'],
    siFalla: 'Their damage from thiamine deficiency (alcoholism, malnutrition) causes Wernicke-Korsakoff syndrome: confusion, ataxia, ophthalmoplegia, amnesia and confabulation.',
  },
  hipofisis: {
    nombre: 'Infundibulum and pituitary gland', tipo: 'Hypothalamic-pituitary axis',
    resumen: 'The pituitary gland hangs from the hypothalamus by the infundibulum and rests in the sella turcica. The neurohypophysis (posterior) derives from the diencephalon; the adenohypophysis (anterior) derives from Rathke\'s pouch.',
    funciones: ['Neurohypophysis: releases antidiuretic hormone and oxytocin.', 'Adenohypophysis: secretes growth hormone, prolactin, ACTH, TSH, FSH and LH under hypothalamic control.'],
    siFalla: 'Pituitary tumors: acromegaly, Cushing syndrome, prolactinoma or hypopituitarism; compression of the chiasm causes loss of the temporal visual fields.',
  },
  quiasma_optico: {
    nombre: 'Optic chiasm', tipo: 'Visual pathway (anterior border of the hypothalamus)',
    resumen: 'The crossing of the optic nerves in front of the infundibulum. Fibers from the nasal half of each retina cross here; it marks the anterior border of the hypothalamus.',
    funciones: ['Allows each hemisphere to receive information from the opposite visual field.'],
    siFalla: 'Its compression (e.g., by a pituitary tumor) causes bitemporal hemianopia: loss of both outer visual fields.',
  },
  glandula_pineal: {
    nombre: 'Pineal gland', tipo: 'Epithalamus',
    resumen: 'A small, unpaired, pine-cone-shaped endocrine gland.',
    funciones: ['Produces melatonin, mainly in darkness, to regulate circadian rhythms.'],
    siFalla: 'Pineal tumors cause Parinaud syndrome and hydrocephalus; its dysfunction disrupts the sleep-wake cycle.',
  },
  habenulas: {
    nombre: 'Habenular nuclei', tipo: 'Epithalamus',
    resumen: 'Small paired nuclei in front of the pineal gland, joined by the habenular commissure.',
    funciones: ['They connect the limbic system with the midbrain and regulate the release of dopamine and serotonin (motivation and response to negative experiences).'],
    siFalla: 'Their dysfunction is being studied in depression and addiction.',
  },
  comisura_posterior: {
    nombre: 'Posterior commissure', tipo: 'Epithalamus',
    resumen: 'A fiber bundle that crosses the midline below the pineal gland, at the border with the midbrain.',
    funciones: ['Consensual pupillary reflex.', 'Coordination of vertical gaze.'],
    siFalla: 'Paralysis of upward vertical gaze and pupillary abnormalities (Parinaud syndrome).',
  },
  nucleo_subtalamico: {
    nombre: 'Subthalamic nucleus', tipo: 'Subthalamus',
    resumen: 'A lens-shaped nucleus with glutamatergic neurons that project to the internal globus pallidus.',
    funciones: ['Part of the indirect pathway of the basal nuclei: suppresses unwanted movements.'],
    siFalla: 'Contralateral hemiballismus. In Parkinson disease it is overactive and is the main target of deep brain stimulation.',
  },
  zona_incerta: {
    nombre: 'Zona incerta', tipo: 'Subthalamus',
    resumen: 'A thin sheet of gray matter between the fields of Forel, above the subthalamic nucleus.',
    funciones: ['Sensorimotor integration and regulation of attention and motor activity.'],
    siFalla: 'Its clinical role is under study; it has also been explored as a stimulation target for tremor.',
  },
};
