// English text for INFO_TELENCEFALO (part 1: division, hemispheres and lobes).
export const EN_TELENCEFALO = {
  telencefalo: {
    nombre: 'Telencephalon',
    tipo: 'Brain division',
    resumen:
      'The largest and most highly evolved part of the brain. It is made up of the two cerebral hemispheres, separated by the longitudinal fissure and joined mainly by the corpus callosum. It is responsible for higher mental functions: voluntary movement, conscious perception, language, memory, reasoning and emotion. Click on a hemisphere to break it down into lobes.',
    ubicacion:
      'It occupies the anterior and middle cranial fossae and most of the cranial vault, above the diencephalon and brainstem; the tentorium cerebelli separates it from the cerebellum. Embryologically it derives from the prosencephalon. Its surface is the cerebral cortex (gray matter), folded into gyri and sulci that increase its area; beneath lies the white matter and, deeper still, the basal nuclei.',
    contenido: [
      'Cerebral cortex: a layer of gray matter about 2–4 mm thick, organized into the frontal, parietal, temporal, occipital and insular lobes.',
      'White matter: association fibers (linking areas of the same hemisphere), commissural fibers (corpus callosum) and projection fibers (internal capsule).',
      'Basal nuclei (basal ganglia): caudate nucleus, putamen and globus pallidus.',
      'Limbic system structures: hippocampus, amygdala and cingulate gyrus.',
      'Lateral ventricles, containing cerebrospinal fluid.',
      'Olfactory bulbs and tracts.',
    ],
    funciones: [
      'Planning and execution of voluntary movement.',
      'Conscious perception of sensations (somatic, visual, auditory, gustatory and olfactory).',
      'Language: comprehension and expression.',
      'Memory, learning and attention.',
      'Executive functions: planning, judgment, decision-making and impulse control.',
      'Processing of emotions and regulation of social behavior.',
    ],
    irrigacion:
      'Anterior and middle cerebral arteries (branches of the internal carotid) and the posterior cerebral artery (branch of the basilar). The middle cerebral artery supplies most of the lateral surface of the hemispheres; the lenticulostriate branches supply the basal nuclei and internal capsule.',
    padecimientos: [
      ['Stroke', 'The most common cause of focal deficits: hemiparesis, aphasia, neglect or visual field loss depending on the artery affected.'],
      ['Epilepsy', 'Many focal epilepsies originate in the cortex, especially in the temporal lobe.'],
      ['Alzheimer disease and other dementias', 'Progressive degeneration of the cortex and hippocampus.'],
      ['Multiple sclerosis', 'Demyelinating lesions in the white matter, common around the ventricles and in the corpus callosum.'],
      ['Tumors (gliomas, meningiomas, metastases)', 'Cause symptoms according to their location, seizures or raised intracranial pressure.'],
      ['Traumatic brain injury', 'Contusions often affect the frontal and temporal poles.'],
    ],
    siFalla: [
      'Weakness or paralysis of the opposite side of the body (contralateral hemiparesis).',
      'Contralateral sensory loss.',
      'Disorders of language (aphasias), memory and attention.',
      'Personality and behavioral changes.',
      'Loss of part of the visual field.',
    ],
    dato:
      'Each hemisphere mainly controls the opposite half of the body, because most motor and sensory pathways cross (decussate) in the brainstem or spinal cord.',
  },

  // ---- Hemispheres ----
  hemisferio_izq: {
    nombre: 'Left cerebral hemisphere',
    tipo: 'Hemisphere',
    resumen:
      'Each hemisphere is one half of the telencephalon with the same lobar organization, but with functional specializations (lateralization). In the vast majority of people the left hemisphere is dominant for language. It controls movement and receives sensation from the right side of the body. Select a lobe to see its information.',
    ubicacion:
      'It occupies the left half of the cranial cavity. It is separated from the right hemisphere by the longitudinal fissure (into which the falx cerebri extends) and joined to it by the corpus callosum and other commissures. Its main boundaries are the central sulcus (of Rolando), the lateral sulcus (of Sylvius) and the parieto-occipital sulcus, which divide it into lobes.',
    contenido: [
      'Frontal, parietal, temporal and occipital lobes and the insula.',
      'Language areas (in the dominant hemisphere): Broca\'s area (expression) and Wernicke\'s area (comprehension), linked by the arcuate fasciculus.',
      'Left basal nuclei and limbic structures.',
    ],
    funciones: [
      'Language in the dominant hemisphere: production, comprehension, reading and writing. The left hemisphere is dominant in more than 90% of right-handed people and in most left-handed people.',
      'Calculation and sequential, analytical processing.',
      'Praxis: planning of learned gestures and movements.',
      'Motor control and sensation of the right half of the body.',
      'Processing of the right visual field.',
    ],
    irrigacion: 'Left anterior, middle and posterior cerebral arteries.',
    padecimientos: [
      ['Left middle cerebral artery stroke', 'Right hemiparesis predominantly of the face and arm, with aphasia.'],
      ['Aphasias', 'Broca (nonfluent), Wernicke (fluent with poor comprehension), conduction and global.'],
      ['Gerstmann syndrome', 'Due to a lesion of the dominant parietal lobe: agraphia, acalculia, finger agnosia and right-left disorientation.'],
      ['Ideomotor apraxia', 'Difficulty performing learned gestures on command.'],
    ],
    siFalla: [
      'Weakness and loss of sensation on the right side of the body.',
      'Aphasia: difficulty speaking, understanding, reading or writing.',
      'Difficulty with calculation and with performing learned gestures (apraxia).',
      'Loss of the right visual field (right homonymous hemianopia).',
    ],
    dato:
      'Language dominance does not depend only on handedness: a large proportion of left-handed people also have language in the left hemisphere.',
  },
  hemisferio_der: {
    nombre: 'Right cerebral hemisphere',
    tipo: 'Hemisphere',
    resumen:
      'The right half of the telencephalon. It shares the lobar organization of the left, but in most people it predominates in visuospatial functions, spatial attention, face recognition and the emotional components of language (prosody). It controls movement and receives sensation from the left side of the body. Select a lobe to see its information.',
    ubicacion:
      'It occupies the right half of the cranial cavity. It is separated from the left hemisphere by the longitudinal fissure and joined to it by the corpus callosum. The central, lateral and parieto-occipital sulci delimit its lobes.',
    contenido: [
      'Frontal, parietal, temporal and occipital lobes and the insula.',
      'Spatial attention networks (right parietal predominance).',
      'Right basal nuclei and limbic structures.',
    ],
    funciones: [
      'Visuospatial processing: orientation, spatial relationships and construction (drawing, assembling).',
      'Attention directed to both sides of space.',
      'Recognition of faces and emotional expressions.',
      'Prosody: the intonation and emotional content of speech.',
      'Motor control and sensation of the left half of the body; processing of the left visual field.',
    ],
    irrigacion: 'Right anterior, middle and posterior cerebral arteries.',
    padecimientos: [
      ['Right middle cerebral artery stroke', 'Left hemiparesis with hemineglect and anosognosia.'],
      ['Left hemineglect', 'The person ignores the left side of space and of their own body.'],
      ['Anosognosia', 'Lack of awareness of one\'s own deficit (e.g., not recognizing one\'s paralysis).'],
      ['Dressing apraxia and constructional apraxia', 'Difficulty getting dressed or copying drawings.'],
    ],
    siFalla: [
      'Weakness and loss of sensation on the left side of the body.',
      'Neglect of left space, often without awareness of the problem.',
      'Spatial disorientation and difficulty drawing or dressing.',
      'Monotonous speech or difficulty grasping emotional tone (aprosody).',
    ],
    dato:
      'Hemineglect is more frequent and severe after right-hemisphere lesions, because the right hemisphere attends to both hemispaces, whereas the left attends mainly to the right.',
  },

  // ---- Lobes ----
  lobulo_frontal: {
    nombre: 'Frontal lobe',
    tipo: 'Cerebral lobe',
    resumen:
      'The largest lobe of each hemisphere. It controls voluntary movement and houses the executive functions: planning, making decisions, holding information in working memory, controlling impulses and regulating social behavior and personality. In the dominant hemisphere it contains Broca\'s area, essential for language expression.',
    ubicacion:
      'The anterior part of the hemisphere, in front of the central sulcus (of Rolando) and above the lateral sulcus (of Sylvius). It has a lateral surface (superior, middle and inferior frontal gyri and the precentral gyrus), a medial surface (medial frontal gyrus and the front of the cingulate gyrus) and an inferior or orbital surface, resting on the roof of the orbits.',
    contenido: [
      'Primary motor cortex (precentral gyrus, Brodmann area 4).',
      'Premotor cortex and supplementary motor area (area 6).',
      'Frontal eye field (area 8).',
      'Broca\'s area (areas 44 and 45, inferior frontal gyrus of the dominant hemisphere).',
      'Prefrontal cortex: dorsolateral, orbitofrontal and medial.',
      'Paracentral lobule (medial surface): motor representation of the leg and voluntary control of urination.',
    ],
    funciones: [
      'Initiation, planning and execution of voluntary movements of the contralateral side.',
      'Language production (dominant hemisphere).',
      'Executive functions: planning, organization, mental flexibility and problem-solving.',
      'Working memory (holding and manipulating information for seconds).',
      'Impulse control, judgment and social behavior; personality.',
      'Motivation, initiative and attention.',
      'Voluntary eye movements (saccades).',
    ],
    irrigacion:
      'Middle cerebral artery (lateral surface) and anterior cerebral artery (medial surface and part of the orbital surface), both branches of the internal carotid.',
    padecimientos: [
      ['Middle or anterior cerebral artery stroke', 'Contralateral weakness; with the ACA it predominates in the leg.'],
      ['Frontotemporal dementia', 'Frontal and temporal degeneration with disinhibition, apathy and behavioral changes.'],
      ['Traumatic brain injury', 'Frontal contusions are common and alter behavior and executive functions.'],
      ['Tumors', 'Gliomas and meningiomas can present with personality changes before motor deficits.'],
      ['Frontal lobe epilepsy', 'Brief seizures, often nocturnal, with striking motor activity.'],
      ['Frontal lobe syndrome', 'A set of behavioral and executive disturbances due to dysfunction of frontal and subcortical networks.'],
    ],
    siFalla: [
      'Weakness or paralysis of the opposite side of the body (motor cortex lesion).',
      'Broca aphasia: nonfluent, effortful speech with relatively preserved comprehension (dominant hemisphere).',
      'Apathy, lack of initiative and slow responses (medial lesion).',
      'Disinhibition, impulsivity, emotional lability and inappropriate social behavior (orbitofrontal lesion).',
      'Difficulty planning, getting organized and keeping information in mind (dorsolateral lesion).',
      'Gaze deviation toward the side of the lesion and urinary incontinence.',
    ],
    dato:
      'The case of Phineas Gage (1848), a worker whose frontal cortex was pierced by an iron bar, showed for the first time that the frontal lobe is key to personality and social behavior.',
  },
  lobulo_parietal: {
    nombre: 'Parietal lobe',
    tipo: 'Cerebral lobe',
    resumen:
      'It processes bodily sensation (touch, pressure, temperature, pain and position) and integrates it with vision and hearing to build a representation of the body and of space. It is essential for spatial attention, orientation and handling objects and, in the dominant hemisphere, for reading, writing and calculation.',
    ubicacion:
      'Behind the central sulcus and in front of the parieto-occipital sulcus; below, it borders the temporal lobe at the lateral sulcus. Its lateral surface includes the postcentral gyrus, the superior parietal lobule and the inferior parietal lobule (supramarginal and angular gyri), separated by the intraparietal sulcus. The precuneus lies on the medial surface.',
    contenido: [
      'Primary somatosensory cortex (postcentral gyrus, areas 3, 1 and 2).',
      'Superior parietal lobule (areas 5 and 7).',
      'Supramarginal gyrus (area 40).',
      'Angular gyrus (area 39).',
      'Precuneus (medial surface).',
    ],
    funciones: [
      'Perception of somatic sensation from the opposite side of the body.',
      'Tactile discrimination: recognizing objects by touch (stereognosis), graphesthesia and two-point discrimination.',
      'Body schema and awareness of limb position.',
      'Spatial attention and orientation; visual guidance of movement (reaching and grasping objects).',
      'Reading, writing and calculation (dominant hemisphere).',
      'Praxis: planning of learned gestures.',
    ],
    irrigacion:
      'Middle cerebral artery (lateral surface), anterior cerebral artery (anterior medial surface) and branches of the posterior cerebral artery (posterior medial part).',
    padecimientos: [
      ['Parietal stroke', 'Contralateral sensory loss, hemineglect or Gerstmann syndrome depending on the hemisphere.'],
      ['Gerstmann syndrome', 'Agraphia, acalculia, finger agnosia and right-left disorientation (dominant parietal lobe).'],
      ['Hemineglect', 'More common with right parietal lesions.'],
      ['Alzheimer disease', 'The posterior parietal cortex and precuneus are affected early.'],
      ['Focal sensory seizures', 'Tingling or abnormal sensations in one part of the body.'],
    ],
    siFalla: [
      'Loss of fine sensation and position sense on the opposite side; inability to recognize objects by touch (astereognosis).',
      'Hemineglect: ignoring one side of space or of one\'s own body; anosognosia.',
      'Apraxias: difficulty performing gestures, dressing or copying drawings.',
      'Agraphia, alexia and acalculia (dominant hemisphere).',
      'Contralateral inferior homonymous quadrantanopia from involvement of the optic radiations.',
    ],
    dato:
      'In the postcentral gyrus the body is represented out of proportion (the sensory homunculus): the hand, lips and tongue occupy very large areas because they have a high density of receptors.',
  },
  lobulo_temporal: {
    nombre: 'Temporal lobe',
    tipo: 'Cerebral lobe',
    resumen:
      'It is involved in hearing, language comprehension, memory and emotion, as well as in the visual recognition of objects and faces. Its medial part contains the hippocampus and amygdala, central components of the limbic system.',
    ubicacion:
      'Below the lateral sulcus (of Sylvius), in front of the occipital lobe and behind the frontal lobe. Its lateral surface has the superior, middle and inferior temporal gyri; on the upper surface, hidden within the lateral sulcus, are the transverse gyri of Heschl. The inferior surface contains the fusiform gyrus and the parahippocampal gyrus, which ends anteriorly in the uncus.',
    contenido: [
      'Primary auditory cortex (transverse gyri of Heschl, areas 41 and 42).',
      'Wernicke\'s area (posterior part of the superior temporal gyrus, area 22, dominant hemisphere).',
      'Middle and inferior temporal gyri and fusiform gyrus (ventral visual stream).',
      'Hippocampus and amygdala (medial temporal lobe).',
      'Parahippocampal gyrus, uncus and olfactory cortex.',
    ],
    funciones: [
      'Hearing: perception of pitch, loudness and sound location.',
      'Comprehension of spoken and written language (dominant hemisphere).',
      'Declarative memory: forming new memories of facts and experiences (hippocampus).',
      'Emotional processing, particularly of fear (amygdala).',
      'Recognition of objects, faces and written words (ventral visual stream).',
      'Smell (uncus and piriform cortex).',
    ],
    irrigacion:
      'Middle cerebral artery (lateral surface), posterior cerebral artery (inferior and medial surfaces) and anterior choroidal artery (part of the hippocampus and amygdala).',
    padecimientos: [
      ['Temporal lobe epilepsy', 'The most common focal epilepsy in adults; it is often associated with hippocampal sclerosis and presents with déjà vu, fear or an epigastric sensation.'],
      ['Alzheimer disease', 'Hippocampal atrophy is one of its earliest signs.'],
      ['Herpes simplex encephalitis', 'Has a predilection for the temporal lobes.'],
      ['Frontotemporal dementia (semantic variant)', 'Progressive loss of the meaning of words.'],
      ['Middle or posterior cerebral artery stroke', 'Wernicke aphasia or memory and vision disturbances.'],
    ],
    siFalla: [
      'Wernicke aphasia: fluent speech but with wrong words and poor comprehension (dominant hemisphere).',
      'Anterograde amnesia: inability to form new memories (bilateral hippocampal lesion).',
      'Contralateral superior homonymous quadrantanopia (Meyer\'s loop of the optic radiations).',
      'Difficulty recognizing faces (prosopagnosia) or objects.',
      'Cortical deafness if the auditory lesion is bilateral.',
      'Klüver-Bucy syndrome from bilateral anterior lesions: hyperorality, hypersexuality and loss of fear.',
    ],
    dato:
      'Each auditory cortex receives information from both ears, so a unilateral lesion rarely causes deafness.',
  },
  lobulo_occipital: {
    nombre: 'Occipital lobe',
    tipo: 'Cerebral lobe',
    resumen:
      'The center of visual processing and the smallest of the four main lobes. It receives information from the retina (via the thalamus) and analyzes shape, color, motion and depth. From here, visual information is distributed to the parietal lobe ("where is it?") and to the temporal lobe ("what is it?").',
    ubicacion:
      'The posterior pole of the hemisphere, behind the parieto-occipital sulcus (clearly visible on the medial surface) and an imaginary line to the preoccipital notch. On the medial surface, the calcarine sulcus divides it into the cuneus (above) and the lingual gyrus (below). It rests on the tentorium cerebelli.',
    contenido: [
      'Primary visual cortex (V1, area 17 or striate cortex), on both banks of the calcarine sulcus.',
      'Visual association cortices (areas 18 and 19: V2, V3, V4, V5/MT).',
      'Cuneus and lingual gyrus (medial surface).',
    ],
    funciones: [
      'Conscious visual perception of the contralateral visual field.',
      'Analysis of the shape, contrast and orientation of stimuli (V1).',
      'Perception of color (V4) and motion (V5/MT).',
      'Visual integration for recognition and spatial orientation.',
      'Visual fixation and pursuit reflexes (in connection with the midbrain).',
    ],
    irrigacion:
      'Mainly the posterior cerebral artery (calcarine artery). The occipital pole, where the macula is represented, may receive collaterals from the middle cerebral artery, which explains "macular sparing" in some infarcts.',
    padecimientos: [
      ['Posterior cerebral artery stroke', 'Contralateral homonymous hemianopia, often with macular sparing.'],
      ['Cortical blindness', 'Due to bilateral occipital lesions (e.g., top-of-the-basilar occlusion); it may be accompanied by denial of blindness (Anton syndrome).'],
      ['Migraine with visual aura', 'Flashes or zigzag lines originating in the occipital cortex.'],
      ['Occipital epilepsy', 'Seizures with elementary visual hallucinations (lights, colors).'],
      ['Occipital tumors and trauma', 'Visual field defects depending on the area affected.'],
    ],
    siFalla: [
      'Homonymous hemianopia: loss of the same half of the visual field in both eyes (on the side opposite the lesion).',
      'Quadrantanopia: loss of a quarter of the visual field (lesion of the cuneus or lingual gyrus).',
      'Cortical blindness if the lesion is bilateral, with preserved pupillary reflexes.',
      'Visual agnosia, achromatopsia (inability to see colors) or akinetopsia (inability to perceive motion).',
      'Visual hallucinations.',
    ],
    dato:
      'The macula (central, detailed vision) occupies a disproportionately large portion of the primary visual cortex, at the occipital pole.',
  },
  insula: {
    nombre: 'Insula (insular lobe)',
    tipo: 'Cerebral lobe',
    resumen:
      'A lobe hidden deep within the lateral sulcus, covered by portions of the frontal, parietal and temporal lobes (opercula). It integrates signals from inside the body (interoception) with emotions, and takes part in taste, pain, autonomic regulation and the articulatory planning of speech. In the model it becomes visible when the lobes are separated.',
    ubicacion:
      'At the bottom of the lateral sulcus (of Sylvius), surrounded by the circular sulcus. The central sulcus of the insula divides it into an anterior part (short gyri) and a posterior part (long gyri). Beneath it, separated by the extreme capsule, the claustrum and the external capsule, lies the lentiform nucleus.',
    contenido: [
      'Short gyri (anterior insula).',
      'Long gyri (posterior insula).',
      'Primary gustatory cortex (anterior insula and frontal operculum).',
    ],
    funciones: [
      'Interoception: conscious perception of the body\'s state (heartbeat, breathing, hunger, thirst).',
      'Taste (primary gustatory cortex).',
      'Processing of pain and temperature.',
      'Autonomic regulation (cardiovascular and visceral).',
      'Emotions such as disgust and empathy; emotional awareness.',
      'Motor planning of speech (left anterior insula).',
    ],
    irrigacion: 'Insular segment (M2) of the middle cerebral artery, which runs over its surface.',
    padecimientos: [
      ['Middle cerebral artery stroke', 'Loss of definition of the "insular ribbon" on CT is an early sign of ischemia.'],
      ['Insular gliomas', 'The insula is a common site of low-grade gliomas.'],
      ['Insular epilepsy', 'Seizures with visceral, gustatory or painful symptoms that can mimic other epilepsies.'],
      ['Frontotemporal dementia (behavioral variant)', 'Often shows anterior insular atrophy.'],
    ],
    siFalla: [
      'Taste disturbances.',
      'Autonomic instability, including cardiac arrhythmias after insular stroke.',
      'Disturbances of pain and temperature perception.',
      'Apraxia of speech (difficulty coordinating articulation).',
      'Reduced recognition of emotions such as disgust.',
    ],
    dato: 'During fetal development the insula becomes covered because the neighboring lobes grow faster and "wrap around" it.',
  },
};
