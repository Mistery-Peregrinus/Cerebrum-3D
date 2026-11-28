// English text for INFO_TELENCEFALO (part 2: deep structures and lobe markers).
export const EN_TELENCEFALO_2 = {
  cuerpo_calloso: {
    nombre: 'Corpus callosum',
    tipo: 'Commissure (white matter)',
    resumen:
      'The main commissure of the brain: a large bundle of white-matter fibers that connects the two hemispheres and lets them share information.',
    ubicacion:
      'At the bottom of the longitudinal fissure, forming the roof of the lateral ventricles. From front to back it is divided into the rostrum, genu, body and splenium.',
    contenido: [
      'Genu: connects the prefrontal cortices.',
      'Body: connects motor, sensory and association areas.',
      'Splenium: connects the occipital and temporal cortices (visual information).',
    ],
    funciones: [
      'Transfer of sensory, motor and cognitive information between hemispheres.',
      'Bimanual coordination.',
      'Integration of language (left hemisphere) with information perceived by the right hemisphere.',
    ],
    irrigacion: 'Pericallosal branches of the anterior cerebral artery; the splenium, branches of the posterior cerebral artery.',
    padecimientos: [
      ['Multiple sclerosis', 'The most common disease of the corpus callosum: demyelinating plaques in it and in the pericallosal region.'],
      ['Agenesis of the corpus callosum', 'Complete or partial congenital absence.'],
      ['Callosotomy', 'Surgical section used in some severe epilepsies to stop seizures from spreading.'],
      ['"Butterfly" glioblastoma', 'A tumor that crosses the midline through the corpus callosum.'],
    ],
    siFalla: [
      'Disconnection syndrome: inability to name objects held in the left hand without seeing them.',
      'Apraxia of the left hand and the "alien hand" phenomenon.',
      'Alexia without agraphia (lesion of the splenium together with the left occipital cortex).',
    ],
  },
  nucleo_caudado: {
    nombre: 'Caudate nucleus',
    tipo: 'Basal nucleus',
    resumen:
      'A C-shaped basal nucleus that, together with the putamen, forms the striatum, the main input gate of the basal nuclei. It takes part in motor control, reward learning and cognitive and behavioral functions.',
    ubicacion:
      'Its head bulges into the lateral wall of the anterior horn of the lateral ventricle; the body and tail follow the curve of the ventricle to the roof of the temporal horn. It is separated from the lentiform nucleus by the anterior limb of the internal capsule.',
    contenido: ['Head, body and tail.', 'GABAergic medium spiny neurons that receive input from the cortex and dopamine from the substantia nigra.'],
    funciones: [
      'Selection and modulation of voluntary movements (cortex–basal nuclei–thalamus–cortex circuits).',
      'Habit learning and reward-based learning.',
      'Executive functions and behavioral control (prefrontal circuits).',
    ],
    irrigacion: 'Lenticulostriate arteries (from the middle cerebral artery) and the recurrent artery of Heubner (from the anterior cerebral).',
    padecimientos: [
      ['Huntington disease', 'A hereditary disease with atrophy of the caudate: chorea, psychiatric disturbances and dementia.'],
      ['Lacunar infarcts', 'Due to occlusion of the perforating arteries.'],
      ['Obsessive-compulsive disorder', 'Abnormalities of fronto-striatal circuits have been described.'],
    ],
    siFalla: ['Involuntary movements (chorea).', 'Apathy, abulia and behavioral changes.', 'Impaired executive functions.'],
  },
  putamen: {
    nombre: 'Putamen',
    tipo: 'Basal nucleus',
    resumen:
      'The lateral part of the lentiform nucleus and part of the striatum. It mainly receives input from the motor cortices and is key to motor control and the learning of motor skills.',
    ubicacion:
      'Lateral to the globus pallidus (with which it forms the lentiform nucleus) and medial to the external capsule, claustrum and insula. The internal capsule separates it from the thalamus and caudate.',
    contenido: ['Medium spiny neurons that express D1 and D2 dopamine receptors.', 'Cholinergic interneurons.'],
    funciones: [
      'Regulation of the amplitude and speed of movements.',
      'Learning and automation of motor sequences.',
      'Integration of cortical information with dopamine from the substantia nigra.',
    ],
    irrigacion: 'Lenticulostriate arteries of the middle cerebral artery.',
    padecimientos: [
      ['Parkinson disease', 'Dopamine loss affects the putamen most.'],
      ['Hypertensive intracerebral hemorrhage', 'The putamen is its most common site.'],
      ['Wilson disease', 'Copper deposition that can damage the putamen.'],
    ],
    siFalla: [
      'Slowness and poverty of movement (bradykinesia), rigidity or, conversely, involuntary movements and dystonia.',
      'In a hemorrhage: contralateral hemiparesis from compression of the internal capsule.',
    ],
  },
  globo_palido: {
    nombre: 'Globus pallidus',
    tipo: 'Basal nucleus',
    resumen:
      'The medial part of the lentiform nucleus. Its internal segment is, together with the substantia nigra pars reticulata, the main inhibitory (GABAergic) output of the basal nuclei to the thalamus.',
    ubicacion: 'Medial to the putamen and lateral to the posterior limb of the internal capsule. It is divided into external (GPe) and internal (GPi) segments.',
    contenido: ['External segment (indirect pathway).', 'Internal segment (main output to the thalamus).'],
    funciones: [
      'Regulation of voluntary movements: facilitating wanted ones and suppressing unwanted ones.',
      'Modulation of muscle tone.',
    ],
    irrigacion: 'Lenticulostriate arteries (MCA) and the anterior choroidal artery.',
    padecimientos: [
      ['Carbon monoxide poisoning', 'Can cause bilateral necrosis of the globus pallidus and irreversible parkinsonism.'],
      ['Dystonias', 'The GPi is a target of deep brain stimulation.'],
      ['Advanced Parkinson disease', 'Deep brain stimulation of the GPi improves motor symptoms.'],
    ],
    siFalla: ['Parkinsonism (rigidity, slowness).', 'Dystonia (sustained muscle contractions).'],
  },
  hipocampo: {
    nombre: 'Hippocampus',
    tipo: 'Limbic structure',
    resumen:
      'A curved, seahorse-shaped structure in the medial temporal lobe. It is indispensable for turning recent experiences into lasting memories (declarative memory) and for spatial navigation.',
    ubicacion:
      'In the floor of the temporal horn of the lateral ventricle, on the medial surface of the temporal lobe. Its main output is the fornix, which arches beneath the corpus callosum to the mammillary bodies.',
    contenido: ['Cornu Ammonis (CA1–CA4), dentate gyrus and subiculum.', 'Part of the Papez circuit: hippocampus → fornix → mammillary bodies → anterior thalamus → cingulate gyrus.'],
    funciones: [
      'Consolidation of declarative memory (episodic and semantic).',
      'Spatial memory and orientation ("place cells").',
      'Regulation of the stress response (connections with the hypothalamus).',
    ],
    irrigacion: 'Branches of the posterior cerebral artery and the anterior choroidal artery.',
    padecimientos: [
      ['Alzheimer disease', 'Hippocampal atrophy occurs early and explains the loss of recent memory.'],
      ['Mesial temporal sclerosis', 'A common cause of drug-resistant temporal lobe epilepsy.'],
      ['Hypoxia-ischemia', 'The CA1 region is especially vulnerable to lack of oxygen.'],
      ['Herpes encephalitis', 'Damages the medial temporal lobe.'],
    ],
    siFalla: [
      'Anterograde amnesia: inability to form new declarative memories, with preserved memory for skills.',
      'Spatial disorientation.',
    ],
    dato:
      'Patient H. M. lost the ability to form new memories after bilateral removal of the medial temporal lobes in 1953; his case, described by Scoville and Milner, demonstrated the role of the hippocampus in memory.',
  },
  amigdala: {
    nombre: 'Amygdala (amygdaloid body)',
    tipo: 'Limbic structure',
    resumen:
      'A cluster of almond-shaped nuclei in the anterior medial temporal lobe. It evaluates the emotional significance of stimuli, especially threats, and coordinates fear responses.',
    ubicacion: 'At the medial temporal pole, in front of the hippocampus and the tip of the temporal horn of the lateral ventricle, beneath the uncus.',
    contenido: ['Basolateral nuclei (receive sensory and cortical information).', 'Central nucleus (sends commands to the hypothalamus and brainstem).'],
    funciones: [
      'Threat detection and generation of the fear response.',
      'Emotional memory: strengthens the memory of emotionally charged experiences.',
      'Autonomic and endocrine stress responses (via the hypothalamus).',
      'Recognition of facial expressions and social behavior.',
    ],
    irrigacion: 'Anterior choroidal artery and branches of the middle and posterior cerebral arteries.',
    padecimientos: [
      ['Anxiety disorders and post-traumatic stress disorder', 'Associated with amygdala hyperactivity.'],
      ['Temporal lobe epilepsy', 'Seizures may begin with a sudden feeling of fear.'],
      ['Klüver-Bucy syndrome', 'Bilateral lesion: loss of fear, docility, hyperorality and hypersexuality.'],
    ],
    siFalla: ['Reduced fear and perception of danger.', 'Difficulty recognizing fear in other people\'s faces.', 'Emotional blunting.'],
  },

  // ---- Lobe markers: frontal ----
  giro_precentral: {
    nombre: 'Precentral gyrus (primary motor cortex)',
    tipo: 'Brodmann area 4',
    resumen: 'A strip of cortex immediately in front of the central sulcus. It contains the "motor homunculus": the face and hand are represented on the lateral surface and the leg on the medial surface (paracentral lobule). Much of the corticospinal pathway arises here.',
    funciones: ['Execution of voluntary movements of the opposite side of the body.', 'Fine control of the fingers, face and tongue.'],
    siFalla: 'Contralateral weakness or paralysis, initially flaccid and later spastic, with hyperreflexia and a Babinski sign.',
  },
  corteza_premotora: {
    nombre: 'Premotor cortex and supplementary motor area',
    tipo: 'Brodmann area 6',
    resumen: 'The region in front of the precentral gyrus. The premotor cortex (lateral) and the supplementary motor area (medial) prepare and sequence movements before they are executed.',
    funciones: ['Planning and programming of motor sequences.', 'Movements guided by external cues (premotor).', 'Initiation of internally generated movements and bimanual coordination (supplementary motor area).'],
    siFalla: 'Apraxia and difficulty initiating movements; a lesion of the supplementary motor area can cause transient akinesia and mutism.',
  },
  campo_ocular_frontal: {
    nombre: 'Frontal eye field',
    tipo: 'Brodmann area 8',
    resumen: 'An area in the posterior part of the middle frontal gyrus that controls voluntary eye movements.',
    funciones: ['Generates voluntary saccades toward the opposite side.', 'Directs gaze and visual attention.'],
    siFalla: 'In the acute phase the eyes deviate toward the side of the lesion ("the patient looks at the lesion") and it is hard to look to the opposite side.',
  },
  area_broca: {
    nombre: 'Broca\'s area',
    tipo: 'Brodmann areas 44 and 45',
    resumen: 'The posterior part of the inferior frontal gyrus (pars opercularis and pars triangularis) of the dominant hemisphere, usually the left. Fundamental for language production.',
    funciones: ['Motor planning of speech.', 'Grammatical processing and sentence construction.', 'Connected to Wernicke\'s area by the arcuate fasciculus.'],
    siFalla: 'Broca aphasia: nonfluent, slow, effortful, "telegraphic" speech, with relatively preserved comprehension and impaired repetition; often accompanied by right hemiparesis. The person is aware of the difficulty.',
  },
  prefrontal_dorsolateral: {
    nombre: 'Dorsolateral prefrontal cortex',
    tipo: 'Association cortex',
    resumen: 'The anterior, lateral region of the frontal lobe, the basis of executive functions.',
    funciones: ['Working memory.', 'Planning, organization and abstract reasoning.', 'Cognitive flexibility (switching strategies).'],
    siFalla: 'Dysexecutive syndrome: difficulty planning and organizing, perseveration (repeating a response even when it no longer works) and trouble keeping information in mind.',
  },
  corteza_orbitofrontal: {
    nombre: 'Orbitofrontal cortex',
    tipo: 'Association cortex',
    resumen: 'The inferior surface of the frontal lobe, resting on the orbits. Strongly connected with the amygdala and hypothalamus.',
    funciones: ['Regulation of social behavior and emotions.', 'Decision-making based on rewards and punishments.', 'Integration of smell and taste (secondary olfactory cortex).'],
    siFalla: 'Disinhibition, impulsivity, inappropriate remarks, emotional lability and indifference to the consequences of one\'s own actions.',
  },
  cingulado_anterior: {
    nombre: 'Anterior cingulate cortex',
    tipo: 'Limbic cortex (medial surface)',
    resumen: 'The anterior part of the cingulate gyrus, on the medial surface of the hemisphere, above the corpus callosum.',
    funciones: ['Motivation and initiative.', 'Attention and detection of errors or conflict.', 'The emotional component of pain.'],
    siFalla: 'Apathy and abulia; a bilateral lesion can cause akinetic mutism (the person is awake but does not speak or move spontaneously).',
  },
  // ---- Parietal ----
  giro_poscentral: {
    nombre: 'Postcentral gyrus (primary somatosensory cortex)',
    tipo: 'Brodmann areas 3, 1 and 2',
    resumen: 'A strip immediately behind the central sulcus. It receives sensory information from the body and face through the ventral posterior nuclei of the thalamus and organizes it into the "sensory homunculus".',
    funciones: ['Perception of touch, pressure, vibration, temperature, pain and position from the opposite side.', 'Precise localization of stimuli.'],
    siFalla: 'Contralateral loss of fine touch, joint position sense and two-point discrimination.',
  },
  lobulillo_parietal_superior: {
    nombre: 'Superior parietal lobule',
    tipo: 'Brodmann areas 5 and 7',
    resumen: 'The region above the intraparietal sulcus that integrates somatosensory and visual information.',
    funciones: ['Body schema.', 'Visual guidance of movements to reach and grasp objects.', 'Spatial attention.'],
    siFalla: 'Optic ataxia (errors reaching for objects under visual guidance), astereognosis and neglect of the contralateral half of the body.',
  },
  giro_supramarginal: {
    nombre: 'Supramarginal gyrus',
    tipo: 'Brodmann area 40',
    resumen: 'It curves around the posterior end of the lateral sulcus. In the dominant hemisphere it is part of the language network; the arcuate fasciculus runs beneath it.',
    funciones: ['Phonological processing.', 'Praxis (learned gestures).', 'Perception of space and of one\'s own body.'],
    siFalla: 'Conduction aphasia (marked difficulty repeating) and ideomotor apraxia in the dominant hemisphere.',
  },
  giro_angular: {
    nombre: 'Angular gyrus',
    tipo: 'Brodmann area 39',
    resumen: 'It curves around the posterior end of the superior temporal sulcus; a meeting point of the visual, auditory and somatosensory areas.',
    funciones: ['Reading and writing.', 'Calculation.', 'Semantic processing of language.'],
    siFalla: 'Alexia with agraphia and Gerstmann syndrome (agraphia, acalculia, finger agnosia and right-left disorientation) in the dominant hemisphere.',
  },
  precuneo: {
    nombre: 'Precuneus',
    tipo: 'Association cortex (medial surface)',
    resumen: 'The medial part of the parietal lobe, in front of the cuneus. It is a central hub of the "default mode network".',
    funciones: ['Retrieval of episodic memory.', 'Visuospatial imagery.', 'Self-awareness.'],
    siFalla: 'It is affected early in Alzheimer disease (reduced metabolism); isolated lesions are uncommon.',
  },
  // ---- Temporal ----
  corteza_auditiva: {
    nombre: 'Primary auditory cortex (Heschl\'s gyri)',
    tipo: 'Brodmann areas 41 and 42',
    resumen: 'Located in the transverse gyri on the upper surface of the superior temporal gyrus, hidden within the lateral sulcus. It receives auditory information from the medial geniculate nucleus of the thalamus.',
    funciones: ['Conscious perception of sounds.', 'Tonotopic organization: each frequency is processed in a different strip.'],
    siFalla: 'A unilateral lesion causes few symptoms because each side receives information from both ears; a bilateral lesion causes cortical deafness or auditory agnosia.',
  },
  area_wernicke: {
    nombre: 'Wernicke\'s area',
    tipo: 'Brodmann area 22 (posterior part)',
    resumen: 'The posterior part of the superior temporal gyrus of the dominant hemisphere. Essential for understanding language.',
    funciones: ['Comprehension of spoken and written language.', 'Selection of the right words when speaking.'],
    siFalla: 'Wernicke aphasia: fluent speech but with paraphasias and meaningless words, severely impaired comprehension and often no awareness of the problem.',
  },
  giros_temporales: {
    nombre: 'Middle and inferior temporal gyri',
    tipo: 'Association cortex',
    resumen: 'Part of the ventral visual stream ("what is it?") and of semantic memory networks.',
    funciones: ['Visual recognition of objects.', 'Semantic memory (the meaning of words and concepts).'],
    siFalla: 'Visual object agnosia, anomia (difficulty naming) and loss of word meaning.',
  },
  giro_fusiforme: {
    nombre: 'Fusiform (occipitotemporal) gyrus',
    tipo: 'Inferior surface',
    resumen: 'A gyrus on the inferior surface of the temporal lobe that extends into the occipital lobe. It contains regions specialized for faces and written words.',
    funciones: ['Face recognition.', 'Visual word recognition.', 'Color processing (at the occipitotemporal junction).'],
    siFalla: 'Prosopagnosia (inability to recognize familiar faces), alexia or achromatopsia.',
  },
  temporal_medial: {
    nombre: 'Parahippocampal gyrus and uncus',
    tipo: 'Medial temporal lobe',
    resumen: 'The medial and inferior surface of the temporal lobe, next to the hippocampus. The uncus is its hook-shaped anterior end.',
    funciones: ['Encoding of memory and spatial context (parahippocampal gyrus).', 'Smell (primary olfactory cortex in the uncus).'],
    siFalla: 'Memory impairment; with raised intracranial pressure the uncus can herniate and compress the oculomotor nerve (dilated pupil on the same side) and the midbrain.',
  },
  // ---- Occipital ----
  corteza_visual_primaria: {
    nombre: 'Primary visual cortex (V1)',
    tipo: 'Brodmann area 17',
    resumen: 'Located on the walls of the calcarine sulcus, on the medial surface. It receives the optic radiations from the lateral geniculate nucleus and contains an ordered "map" of the contralateral visual field.',
    funciones: ['Conscious visual perception.', 'Detection of edges, orientation, contrast and depth.'],
    siFalla: 'Contralateral homonymous hemianopia, often with sparing of central (macular) vision.',
  },
  cuneus: {
    nombre: 'Cuneus',
    tipo: 'Medial surface',
    resumen: 'A wedge-shaped region above the calcarine sulcus, between it and the parieto-occipital sulcus.',
    funciones: ['Processes the lower quadrant of the contralateral visual field.'],
    siFalla: 'Contralateral inferior homonymous quadrantanopia.',
  },
  giro_lingual: {
    nombre: 'Lingual gyrus',
    tipo: 'Medial surface',
    resumen: 'Located below the calcarine sulcus. It continues forward into the parahippocampal gyrus.',
    funciones: ['Processes the upper quadrant of the contralateral visual field.', 'Takes part in color processing.'],
    siFalla: 'Contralateral superior homonymous quadrantanopia; it may be associated with achromatopsia.',
  },
  corteza_asociacion_visual: {
    nombre: 'Visual association cortices (V2–V5)',
    tipo: 'Brodmann areas 18 and 19',
    resumen: 'They surround the primary visual cortex and elaborate visual information: V4 specializes in color and V5/MT in motion.',
    funciones: ['Recognition and interpretation of what is seen.', 'Perception of color (V4) and motion (V5).'],
    siFalla: 'Visual agnosia (seeing without recognizing), achromatopsia or akinetopsia.',
  },
  // ---- Insula ----
  insula_anterior: {
    nombre: 'Anterior insula (short gyri)',
    tipo: 'Insula',
    resumen: 'The anterior part of the insula, strongly connected with the prefrontal cortex and the limbic system.',
    funciones: ['Taste.', 'Emotional awareness, disgust and empathy.', 'Articulatory planning of speech.'],
    siFalla: 'Taste disturbances, reduced emotional recognition and apraxia of speech.',
  },
  insula_posterior: {
    nombre: 'Posterior insula (long gyri)',
    tipo: 'Insula',
    resumen: 'The posterior part of the insula, connected with the thalamus and the somatosensory areas.',
    funciones: ['Processing of pain and temperature.', 'Interoception (visceral signals).', 'Vestibular information.'],
    siFalla: 'Disturbances of pain and temperature perception and vestibular symptoms.',
  },
};
