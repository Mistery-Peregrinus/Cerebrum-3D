// English text for INFO_TALLO.
export const EN_TALLO = {
  tallo: {
    nombre: 'Brainstem',
    tipo: 'Brain division',
    resumen:
      'It connects the cerebrum and diencephalon with the spinal cord. All motor and sensory pathways between the body and the brain pass through it; it contains the nuclei of cranial nerves III to XII and the centers that control vital functions such as breathing, heart rate and the level of consciousness. Click on it to break it down.',
    ubicacion:
      'In the posterior cranial fossa, in front of the cerebellum, resting on the clivus. It extends from the diencephalon to the foramen magnum, where it continues as the spinal cord. From top to bottom it consists of the midbrain, pons and medulla oblongata.',
    contenido: [
      'Midbrain (mesencephalon).',
      'Pons.',
      'Medulla oblongata.',
      'Nuclei of cranial nerves III–XII.',
      'Reticular formation (a network of neurons running through the whole brainstem).',
      'Ascending (medial lemniscus, spinothalamic) and descending (corticospinal, corticobulbar) pathways.',
    ],
    funciones: [
      'Conduction of motor and sensory information between the brain and the spinal cord.',
      'Innervation of the head and neck through the cranial nerves.',
      'Maintenance of consciousness and alertness (ascending reticular activating system).',
      'Control of breathing and cardiovascular function.',
      'Reflexes: pupillary, corneal, cough, gag, swallowing and vomiting.',
      'Sleep regulation.',
    ],
    irrigacion:
      'Vertebrobasilar system: vertebral arteries, anterior spinal artery, basilar artery and its paramedian and circumferential branches, and the cerebellar arteries (posterior inferior, anterior inferior and superior).',
    padecimientos: [
      ['Brainstem stroke', 'Produces "crossed" syndromes: a cranial nerve deficit on the same side and weakness or sensory loss on the opposite side.'],
      ['Locked-in syndrome', 'Infarct of the anterior pons: the person is conscious but can only move the eyes vertically and blink.'],
      ['Osmotic demyelination syndrome', 'Damage to the pons from overly rapid correction of hyponatremia.'],
      ['Multiple sclerosis', 'Brainstem plaques: double vision, vertigo or sensory disturbances.'],
      ['Diffuse midline gliomas', 'Brainstem tumors, mainly in children.'],
      ['Brain herniation', 'Compression of the brainstem by raised intracranial pressure can be fatal.'],
    ],
    siFalla: [
      'Double vision, difficulty swallowing or speaking, vertigo and facial paralysis.',
      'Weakness or paralysis of all four limbs.',
      'Loss of consciousness and coma.',
      'Respiratory failure and cardiovascular instability.',
      'Irreversible loss of all brainstem functions is part of the criteria for brain death.',
    ],
  },

  // ---- Parts ----
  mesencefalo: {
    nombre: 'Midbrain',
    tipo: 'Part of the brainstem',
    resumen:
      'The uppermost and shortest part of the brainstem. It is involved in visual and auditory reflexes, eye movements, motor control (substantia nigra and red nucleus) and pain modulation. The cerebral aqueduct runs through it.',
    ubicacion:
      'Between the diencephalon (above) and the pons (below). The cerebral aqueduct (of Sylvius), which connects the third and fourth ventricles, passes through it. It is divided into the tectum (roof, posterior), tegmentum (central) and cerebral peduncles (anterior), with the substantia nigra between the last two.',
    contenido: [
      'Tectum: superior and inferior colliculi (quadrigeminal plate).',
      'Tegmentum: red nucleus, nuclei of the oculomotor (III) and trochlear (IV) nerves, Edinger-Westphal nucleus, periaqueductal gray, reticular formation.',
      'Substantia nigra (pars compacta and pars reticulata).',
      'Cerebral peduncles: corticospinal, corticobulbar and corticopontine tracts.',
      'Nerve III (exits through the interpeduncular fossa) and nerve IV (the only one that exits from the posterior surface).',
    ],
    funciones: [
      'Visual orienting reflexes (superior colliculi) and auditory relay (inferior colliculi).',
      'Eye movements and eyelid elevation (nerves III and IV); vertical gaze center.',
      'Pupillary light reflex and accommodation (Edinger-Westphal).',
      'Motor control: dopamine production (substantia nigra) and coordination (red nucleus).',
      'Pain modulation (periaqueductal gray).',
      'Conduction of descending motor pathways.',
    ],
    irrigacion: 'Branches of the posterior cerebral artery, the superior cerebellar artery and perforators from the upper end of the basilar artery.',
    padecimientos: [
      ['Parkinson disease', 'Degeneration of the dopaminergic neurons of the substantia nigra pars compacta.'],
      ['Weber syndrome', 'Anterior midbrain infarct: ipsilateral third-nerve palsy and contralateral hemiparesis.'],
      ['Parinaud syndrome', 'Compression of the dorsal midbrain (e.g., by a pineal tumor): paralysis of upward gaze.'],
      ['Aqueductal stenosis', 'A cause of obstructive hydrocephalus.'],
      ['Progressive supranuclear palsy', 'Midbrain atrophy ("hummingbird sign") with vertical gaze palsy.'],
      ['Uncal herniation', 'Compresses nerve III and the midbrain.'],
    ],
    siFalla: [
      'Double vision, drooping eyelid (ptosis) and a dilated pupil.',
      'Inability to look up or down.',
      'Weakness of the opposite side of the body.',
      'Tremor, rigidity and slowness (parkinsonism).',
      'Hydrocephalus and impaired consciousness.',
    ],
  },
  puente: {
    nombre: 'Pons',
    tipo: 'Part of the brainstem',
    resumen:
      'The central bulge of the brainstem. It acts as a "bridge" between the cerebral cortex and the cerebellum and contains the nuclei of the trigeminal, abducens, facial and vestibulocochlear nerves, as well as centers that regulate breathing and sleep.',
    ubicacion:
      'Between the midbrain (above) and the medulla oblongata (below), in front of the cerebellum, to which it is joined by the middle cerebellar peduncles. Its posterior surface forms the upper part of the floor of the fourth ventricle. On its anterior surface, the basilar sulcus holds the basilar artery.',
    contenido: [
      'Basilar part (anterior): pontine nuclei, transverse pontocerebellar fibers and corticospinal tracts.',
      'Tegmentum (posterior): nuclei of nerves V, VI, VII and VIII, medial longitudinal fasciculus, horizontal gaze center, locus coeruleus and reticular formation.',
      'Pontine respiratory centers.',
    ],
    funciones: [
      'Relay of information from the cerebral cortex to the cerebellum.',
      'Facial sensation and chewing (nerve V).',
      'Lateral eye movement (nerve VI and horizontal gaze center).',
      'Facial expression, taste from the anterior two-thirds of the tongue, tearing and salivation (nerve VII).',
      'Hearing and balance (nerve VIII).',
      'Modulation of breathing rhythm; regulation of REM sleep and alertness.',
    ],
    irrigacion: 'Paramedian and circumferential branches of the basilar artery, the anterior inferior cerebellar artery and the superior cerebellar artery.',
    padecimientos: [
      ['Locked-in syndrome', 'Bilateral anterior pontine infarct, often due to basilar artery occlusion.'],
      ['Osmotic demyelination syndrome (central pontine myelinolysis)', 'Due to rapid correction of low blood sodium.'],
      ['Hypertensive pontine hemorrhage', 'Coma, pinpoint pupils and quadriplegia.'],
      ['Internuclear ophthalmoplegia', 'Due to a lesion of the medial longitudinal fasciculus, typical of multiple sclerosis.'],
      ['Vestibular schwannoma', 'A tumor of nerve VIII at the cerebellopontine angle: hearing loss and tinnitus.'],
      ['Trigeminal neuralgia', 'Intense, shock-like facial pain.'],
    ],
    siFalla: [
      'Weakness of all four limbs.',
      'Facial paralysis, facial numbness and difficulty chewing.',
      'Double vision and lateral gaze palsy.',
      'Hearing loss, vertigo and imbalance.',
      'Abnormal breathing patterns and coma.',
    ],
  },
  bulbo: {
    nombre: 'Medulla oblongata',
    tipo: 'Part of the brainstem',
    resumen:
      'The lowest part of the brainstem, continuous with the spinal cord. It houses vital centers that control breathing, heart rate and blood pressure, as well as reflexes such as swallowing, coughing and vomiting. Most motor fibers cross here (pyramidal decussation).',
    ubicacion:
      'From the pontomedullary sulcus to the foramen magnum, where it continues as the spinal cord. Its anterior surface shows the pyramids and, laterally, the olives; its upper posterior part forms the lower half of the floor of the fourth ventricle.',
    contenido: [
      'Pyramids (corticospinal tracts) and pyramidal decussation.',
      'Olives (inferior olivary nucleus).',
      'Gracile and cuneate nuclei (dorsal column pathway) → medial lemniscus.',
      'Nuclei of nerves IX, X, XI and XII; nucleus ambiguus and nucleus of the solitary tract.',
      'Respiratory and cardiovascular centers; area postrema.',
    ],
    funciones: [
      'Automatic control of breathing (pre-Bötzinger complex, respiratory groups).',
      'Regulation of heart rate and blood pressure (vasomotor center).',
      'Swallowing, cough, sneeze, gag and vomiting reflexes.',
      'Conduction of motor and sensory pathways.',
      'Tongue movements (XII), swallowing and phonation (IX and X).',
    ],
    irrigacion: 'Vertebral arteries, anterior spinal artery (medial portion) and posterior inferior cerebellar artery (lateral portion).',
    padecimientos: [
      ['Lateral medullary syndrome (Wallenberg)', 'Occlusion of the vertebral or posterior inferior cerebellar artery: vertigo, dysphagia, hoarseness, loss of pain and temperature on the same side of the face and the opposite side of the body, Horner syndrome and ataxia.'],
      ['Medial medullary syndrome (Dejerine)', 'Contralateral hemiparesis and deviation of the tongue toward the side of the lesion.'],
      ['Progressive bulbar palsy (a form of ALS)', 'Progressive weakness of the tongue, swallowing and speech.'],
      ['Chiari malformation and tonsillar herniation', 'Compression of the medulla with a risk of respiratory arrest.'],
    ],
    siFalla: [
      'Respiratory failure and disturbances of heart rhythm and blood pressure.',
      'Difficulty swallowing (with a risk of aspiration) and speaking.',
      'Loss of the cough and gag reflexes.',
      'Weakness or sensory loss on the opposite side of the body.',
      'An extensive lesion can be fatal.',
    ],
  },

  // ---- Structures (markers) ----
  coliculos_superiores: {
    nombre: 'Superior colliculi', tipo: 'Tectum',
    resumen: 'The upper pair of eminences of the quadrigeminal plate, on the posterior surface of the midbrain.',
    funciones: ['Visual orienting reflexes: turning the eyes and head toward a stimulus.', 'Coordination of saccadic movements.'],
    siFalla: 'Eye-movement disturbances, especially of vertical gaze (Parinaud syndrome).',
  },
  coliculos_inferiores: {
    nombre: 'Inferior colliculi', tipo: 'Tectum',
    resumen: 'The lower pair of eminences of the quadrigeminal plate.',
    funciones: ['Relay of the auditory pathway to the medial geniculate nucleus.', 'Sound localization and the startle reflex.'],
    siFalla: 'Mild disturbances of hearing and sound localization.',
  },
  pedunculos_cerebrales: {
    nombre: 'Cerebral peduncles', tipo: 'Base of the midbrain',
    resumen: 'Two large columns of fibers on the anterior surface, separated by the interpeduncular fossa.',
    funciones: ['They carry the corticospinal, corticobulbar and corticopontine tracts from the cortex to the brainstem and spinal cord.'],
    siFalla: 'Contralateral hemiparesis; if nerve III is also involved, Weber syndrome.',
  },
  sustancia_negra: {
    nombre: 'Substantia nigra', tipo: 'Midbrain nucleus',
    resumen: 'A sheet of pigmented neurons (neuromelanin) between the tegmentum and the cerebral peduncles. It has a dopaminergic pars compacta and an inhibitory pars reticulata.',
    funciones: ['Pars compacta: releases dopamine into the striatum to facilitate movement.', 'Pars reticulata: inhibitory output of the basal nuclei.'],
    siFalla: 'Its degeneration causes Parkinson disease: resting tremor, rigidity, slowness of movement and postural instability.',
  },
  nucleo_rojo: {
    nombre: 'Red nucleus', tipo: 'Midbrain nucleus',
    resumen: 'An egg-shaped nucleus of the tegmentum, pinkish because of its rich blood supply.',
    funciones: ['Receives input from the cerebellum (superior peduncle) and the motor cortex.', 'Contributes to motor coordination of the upper limbs.'],
    siFalla: 'Contralateral tremor and ataxia; with nerve III involvement, Benedikt syndrome.',
  },
  sustancia_gris_periacueductal: {
    nombre: 'Periaqueductal gray', tipo: 'Tegmentum',
    resumen: 'Gray matter surrounding the cerebral aqueduct.',
    funciones: ['Descending pain modulation (endogenous opioid analgesia).', 'Defensive and autonomic responses.'],
    siFalla: 'Disturbances of pain perception and defensive responses.',
  },
  nervio_oculomotor: {
    nombre: 'Oculomotor nerve (III)', tipo: 'Cranial nerve',
    resumen: 'Emerges through the interpeduncular fossa.',
    funciones: ['Moves most of the extraocular muscles and raises the eyelid.', 'Pupillary constriction and accommodation (parasympathetic fibers).'],
    siFalla: 'Eye deviated "down and out", ptosis and a dilated pupil that does not respond to light.',
  },
  nervio_troclear: {
    nombre: 'Trochlear nerve (IV)', tipo: 'Cranial nerve',
    resumen: 'The only cranial nerve that exits from the posterior surface of the brainstem and crosses completely.',
    funciones: ['Supplies the superior oblique muscle (looking down when the eye is adducted).'],
    siFalla: 'Vertical double vision that worsens when going down stairs or reading; compensatory head tilt.',
  },
  nervio_trigemino: {
    nombre: 'Trigeminal nerve (V)', tipo: 'Cranial nerve',
    resumen: 'The thickest cranial nerve; emerges from the anterolateral surface of the pons.',
    funciones: ['Sensation of the face, cornea, mouth and teeth.', 'Muscles of mastication.'],
    siFalla: 'Facial numbness, loss of the corneal reflex and weak chewing. Trigeminal neuralgia causes intense facial pain.',
  },
  nervio_abducens: {
    nombre: 'Abducens nerve (VI)', tipo: 'Cranial nerve',
    resumen: 'Emerges at the pontomedullary sulcus, near the midline.',
    funciones: ['Supplies the lateral rectus muscle (moving the eye outward).'],
    siFalla: 'Inability to move the eye outward and horizontal double vision; it is sensitive to raised intracranial pressure.',
  },
  nervios_facial_vestibulococlear: {
    nombre: 'Facial (VII) and vestibulocochlear (VIII) nerves', tipo: 'Cranial nerves',
    resumen: 'They emerge together at the cerebellopontine angle, in the pontomedullary sulcus.',
    funciones: ['VII: facial expression, taste from the anterior two-thirds of the tongue, tearing and salivation.', 'VIII: hearing (cochlear part) and balance (vestibular part).'],
    siFalla: 'Facial paralysis, hearing loss, tinnitus and vertigo; vestibular schwannoma is a typical tumor of this area.',
  },
  surco_basilar: {
    nombre: 'Basilar sulcus', tipo: 'Anterior surface of the pons',
    resumen: 'A groove in the anterior midline of the pons along which the basilar artery runs.',
    funciones: ['Anatomical landmark for the basilar artery, which supplies the brainstem.'],
    siFalla: 'Occlusion of the basilar artery can cause an extensive pontine infarct and locked-in syndrome.',
  },
  locus_coeruleus: {
    nombre: 'Locus coeruleus', tipo: 'Pontine nucleus',
    resumen: 'A small pigmented nucleus in the pontine tegmentum, next to the floor of the fourth ventricle. It is the main source of norepinephrine in the brain.',
    funciones: ['Alertness and attention.', 'Stress response.', 'Regulation of the sleep-wake cycle.'],
    siFalla: 'It degenerates in Parkinson disease and Alzheimer disease.',
  },
  centros_respiratorios_pontinos: {
    nombre: 'Pontine respiratory centers', tipo: 'Reticular formation',
    resumen: 'Neuronal groups of the pons (pontine respiratory group, formerly called the pneumotaxic and apneustic centers).',
    funciones: ['They modulate the rhythm generated in the medulla and regulate the transition between inspiration and expiration.'],
    siFalla: 'Abnormal breathing patterns, such as apneustic breathing.',
  },
  piramides: {
    nombre: 'Pyramids and pyramidal decussation', tipo: 'Anterior surface of the medulla',
    resumen: 'Columns on either side of the anterior median fissure, formed by the corticospinal tracts. In the lower medulla, most of their fibers cross.',
    funciones: ['They carry voluntary motor commands to the spinal cord.'],
    siFalla: 'Weakness of the opposite side of the body (medial medullary syndrome).',
  },
  olivas: {
    nombre: 'Olives (inferior olivary nucleus)', tipo: 'Anterolateral surface of the medulla',
    resumen: 'Oval bulges beside the pyramids that contain the inferior olivary nucleus.',
    funciones: ['They send climbing fibers to the contralateral cerebellum: motor learning and timing of movements.'],
    siFalla: 'Their lesion can cause palatal tremor (palatal myoclonus).',
  },
  nervios_glosofaringeo_vago: {
    nombre: 'Glossopharyngeal (IX) and vagus (X) nerves', tipo: 'Cranial nerves',
    resumen: 'They emerge through the retro-olivary sulcus, behind the olive.',
    funciones: ['IX: taste from the posterior third of the tongue, pharyngeal sensation and the gag reflex.', 'X: swallowing and phonation; parasympathetic supply to the heart, lungs and digestive tract.'],
    siFalla: 'Difficulty swallowing, hoarseness, loss of the gag reflex and deviation of the uvula.',
  },
  nervio_accesorio: {
    nombre: 'Accessory nerve (XI)', tipo: 'Cranial nerve',
    resumen: 'Its roots arise from the upper cervical spinal cord and ascend alongside the medulla.',
    funciones: ['Supplies the sternocleidomastoid and trapezius muscles.'],
    siFalla: 'Weakness turning the head and raising the shoulder.',
  },
  nervio_hipogloso: {
    nombre: 'Hypoglossal nerve (XII)', tipo: 'Cranial nerve',
    resumen: 'Emerges through the preolivary sulcus, between the pyramid and the olive.',
    funciones: ['Tongue movements.'],
    siFalla: 'When protruded, the tongue deviates toward the side of the lesion; atrophy and fasciculations if the lesion is nuclear or peripheral.',
  },
  centros_cardiorrespiratorios: {
    nombre: 'Respiratory and cardiovascular centers', tipo: 'Medullary reticular formation',
    resumen: 'Neuronal networks of the medulla that generate the breathing rhythm (dorsal and ventral respiratory groups, pre-Bötzinger complex) and regulate the heart and vessels (vasomotor center).',
    funciones: ['Automatic breathing and the response to CO₂ and pH.', 'Control of heart rate and blood pressure.'],
    siFalla: 'Respiratory arrest and cardiovascular instability; their compression (herniation) is potentially fatal.',
  },
  area_postrema: {
    nombre: 'Area postrema', tipo: 'Floor of the fourth ventricle',
    resumen: 'A small region at the lower end of the fourth ventricle that lacks a blood-brain barrier.',
    funciones: ['Chemoreceptor trigger zone: detects toxins in the blood and triggers vomiting.'],
    siFalla: 'Its involvement (e.g., in neuromyelitis optica) can cause persistent nausea, vomiting or hiccups.',
  },
};
