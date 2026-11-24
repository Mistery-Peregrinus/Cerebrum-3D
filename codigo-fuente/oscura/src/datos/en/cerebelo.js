// English text for INFO_CEREBELO.
export const EN_CEREBELO = {
  cerebelo: {
    nombre: 'Cerebellum',
    tipo: 'Brain division',
    resumen:
      'The "little brain" coordinates movement: it adjusts force, direction and timing, maintains balance and posture, and makes motor learning possible. It also takes part in cognitive and emotional functions. Although it occupies about 10% of brain volume, it contains more than half of all neurons. Click on it to break it down.',
    ubicacion:
      'In the posterior cranial fossa, behind the pons and medulla oblongata, from which it is separated by the fourth ventricle. Above, the tentorium cerebelli (dura mater) separates it from the occipital lobes. It is attached to the brainstem by three pairs of peduncles. It derives from the metencephalon.',
    contenido: [
      'Two cerebellar hemispheres joined in the midline by the vermis.',
      'Three lobes separated by fissures: anterior (primary fissure), posterior and flocculonodular (posterolateral fissure).',
      'Three-layered cerebellar cortex (molecular, Purkinje cell and granular layers), tightly folded into folia.',
      'Inner white matter (the "arbor vitae").',
      'Deep nuclei: dentate, emboliform, globose and fastigial.',
      'Superior, middle and inferior cerebellar peduncles.',
    ],
    funciones: [
      'Coordination of voluntary movements: precision, force and timing.',
      'Balance and postural control.',
      'Muscle tone.',
      'Coordination of eye movements.',
      'Motor learning and automation of skills.',
      'Contribution to language, attention and emotional regulation.',
    ],
    irrigacion:
      'Three pairs of arteries: superior cerebellar (from the basilar), anterior inferior cerebellar (from the basilar) and posterior inferior cerebellar (from the vertebral).',
    padecimientos: [
      ['Acute cerebellar ataxia', 'Sudden loss of coordination, common in children after a viral infection.'],
      ['Cerebellar stroke', 'Vertigo, vomiting and ataxia; swelling can compress the brainstem or cause hydrocephalus (an emergency).'],
      ['Alcoholic cerebellar degeneration', 'Mainly affects the anterior vermis: unsteady, wide-based gait.'],
      ['Hereditary ataxias', 'Such as Friedreich ataxia and the spinocerebellar ataxias.'],
      ['Medulloblastoma', 'A malignant brain tumor common in childhood, usually arising in the vermis.'],
      ['Chiari malformation', 'Downward displacement of the cerebellar tonsils through the foramen magnum.'],
      ['Drug or alcohol toxicity', 'For example, phenytoin can cause ataxia.'],
    ],
    siFalla: [
      'Ataxia: clumsy, uncoordinated movements on the same side as the lesion.',
      'Dysmetria: errors in judging distance (overshooting or undershooting when reaching for an object).',
      'Intention tremor: appears as the hand approaches the target.',
      'Dysdiadochokinesia: difficulty performing rapid alternating movements.',
      'Unsteady, wide-based gait, like that of a drunk person.',
      'Dysarthria ("scanning" speech) and nystagmus.',
      'Hypotonia.',
    ],
    dato:
      'Lesions of one cerebellar hemisphere produce symptoms on the same side of the body (ipsilateral), unlike lesions of the cerebrum, because its pathways cross twice.',
  },

  // ---- Parts ----
  vermis: {
    nombre: 'Vermis',
    tipo: 'Part of the cerebellum',
    resumen:
      'An unpaired, worm-like midline structure that joins the two cerebellar hemispheres. It controls the muscles of the trunk and proximal limbs: posture, gait and balance.',
    ubicacion: 'In the midline of the cerebellum, on its superior and inferior surfaces. It runs through the anterior and posterior lobes; its most anterior and inferior portion is the nodule (flocculonodular lobe).',
    contenido: ['Lobules of the vermis (lingula, culmen, declive, folium, tuber, pyramid, uvula and nodule).', 'Projects to the fastigial nucleus.'],
    funciones: [
      'Control of posture and gait (spinocerebellum).',
      'Coordination of axial muscles.',
      'Eye movements (oculomotor vermis).',
    ],
    irrigacion: 'Superior cerebellar (superior vermis) and posterior inferior cerebellar (inferior vermis) arteries.',
    padecimientos: [
      ['Alcoholic cerebellar degeneration', 'Atrophy of the anterosuperior vermis.'],
      ['Medulloblastoma', 'In children it often arises in the vermis.'],
    ],
    siFalla: ['Truncal ataxia: difficulty sitting or standing.', 'Wide-based, unsteady gait.', 'Oscillation of the head and trunk (titubation).'],
  },
  lobulo_anterior: {
    nombre: 'Anterior lobe',
    tipo: 'Cerebellar lobe',
    resumen:
      'The part of the cerebellum in front of the primary fissure, on its superior surface. It mainly receives proprioceptive input from the spinal cord (spinocerebellum) and regulates muscle tone and the execution of movements.',
    ubicacion: 'Superior and anterior surface of the cerebellum, bounded posteriorly by the primary fissure. It includes parts of the vermis and of the hemispheres.',
    contenido: ['Vermal and paravermal portions of the spinocerebellum.', 'A somatotopic map of the body.'],
    funciones: ['Regulation of muscle tone.', 'Adjustment of ongoing movements based on proprioceptive information.', 'Control of posture and gait.'],
    irrigacion: 'Superior cerebellar artery.',
    padecimientos: [['Alcoholic cerebellar degeneration', 'Preferentially affects the anterior lobe and the superior vermis.']],
    siFalla: ['Ataxia of gait and of the legs.', 'Hypotonia.'],
  },
  lobulo_posterior: {
    nombre: 'Posterior lobe',
    tipo: 'Cerebellar lobe',
    resumen:
      'The largest lobe of the cerebellum, between the primary fissure and the posterolateral fissure. Its lateral portions (cerebrocerebellum) receive input from the cerebral cortex via the pontine nuclei and take part in planning and coordinating fine movements, motor learning and cognitive functions.',
    ubicacion: 'It occupies most of the cerebellar hemispheres, on the posterior superior and inferior surfaces. It includes the cerebellar tonsils, next to the foramen magnum.',
    contenido: ['Lateral hemispheres (cerebrocerebellum).', 'Cerebellar tonsils.', 'Horizontal fissure.'],
    funciones: [
      'Planning and timing of voluntary movements.',
      'Fine coordination of the limbs.',
      'Motor learning.',
      'Contribution to language, working memory and emotional regulation.',
    ],
    irrigacion: 'Superior cerebellar, anterior inferior cerebellar and posterior inferior cerebellar arteries.',
    padecimientos: [
      ['Chiari malformation', 'Herniation of the cerebellar tonsils through the foramen magnum.'],
      ['Tonsillar herniation', 'In raised intracranial pressure it compresses the medulla and can cause respiratory arrest.'],
      ['Cerebellar cognitive affective syndrome', 'Executive, language and emotional disturbances due to posterior cerebellar lesions.'],
    ],
    siFalla: ['Ataxia of the limbs on the same side.', 'Dysmetria, intention tremor and dysdiadochokinesia.', 'Dysarthria.', 'Cognitive and affective disturbances.'],
  },
  lobulo_floculonodular: {
    nombre: 'Flocculonodular lobe',
    tipo: 'Cerebellar lobe',
    resumen:
      'The phylogenetically oldest part of the cerebellum (vestibulocerebellum). Made up of the flocculi (lateral) and the nodule (in the vermis), connected to the vestibular nuclei. It controls balance and eye movements.',
    ubicacion: 'Inferior and anterior surface of the cerebellum, in front of the posterolateral fissure, next to the fourth ventricle and near the middle cerebellar peduncle.',
    contenido: ['Flocculi (paired).', 'Nodule of the vermis.'],
    funciones: ['Balance and spatial orientation.', 'Tuning of the vestibulo-ocular reflex.', 'Gaze holding and smooth pursuit.'],
    irrigacion: 'Anterior inferior and posterior inferior cerebellar arteries.',
    padecimientos: [['Medulloblastoma', 'In children, midline tumors near the nodule cause truncal ataxia.']],
    siFalla: ['Truncal instability and falls.', 'Wide-based gait.', 'Nystagmus and eye-movement abnormalities.'],
  },
  pedunculos_cerebelosos: {
    nombre: 'Cerebellar peduncles',
    tipo: 'Part of the cerebellum (connections)',
    resumen: 'Three pairs of fiber bundles that connect the cerebellum to the brainstem. All information entering and leaving the cerebellum passes through them.',
    ubicacion: 'Superior: toward the midbrain. Middle: toward the pons (the thickest). Inferior: toward the medulla oblongata.',
    contenido: [
      'Superior: mainly efferent (dentate and interposed nuclei → red nucleus and thalamus).',
      'Middle: exclusively afferent, from the pontine nuclei (corticopontocerebellar pathway).',
      'Inferior: spinocerebellar, olivocerebellar and vestibular afferents; efferents to the vestibular nuclei.',
    ],
    funciones: ['Receive information from the cerebral cortex, spinal cord and vestibular system.', 'Send the cerebellum\'s corrective commands to the thalamus, red nucleus and brainstem.'],
    irrigacion: 'Branches of the superior, anterior inferior and posterior inferior cerebellar arteries.',
    padecimientos: [
      ['Multiple sclerosis', 'Plaques in the peduncles cause ataxia and tremor.'],
      ['Lateral medullary syndrome (Wallenberg)', 'Involves the inferior peduncle: ataxia on the same side.'],
    ],
    siFalla: ['Ataxia on the same side as the lesion.', 'Intention tremor (superior peduncle).'],
  },
  nucleos_cerebelosos: {
    nombre: 'Deep cerebellar nuclei',
    tipo: 'Internal structure',
    resumen: 'Four pairs of nuclei within the white matter of the cerebellum. They are the main output of the cerebellum: they receive the inhibitory signal from Purkinje cells and send commands to the rest of the brain.',
    ubicacion: 'From lateral to medial: dentate, emboliform, globose and fastigial, above the roof of the fourth ventricle.',
    contenido: ['Dentate nucleus (the largest; cerebrocerebellum).', 'Interposed nuclei: emboliform and globose (spinocerebellum).', 'Fastigial nucleus (vermis and vestibulocerebellum).'],
    funciones: ['Planning and execution of movement (dentate → thalamus → motor cortex).', 'Limb control (interposed → red nucleus).', 'Balance and posture (fastigial → vestibular nuclei and reticular formation).'],
    irrigacion: 'Superior cerebellar artery.',
    padecimientos: [['Dentatorubral-pallidoluysian atrophy', 'A rare hereditary disease affecting the dentate nucleus.'], ['Deep stroke or tumors', 'Severe ataxia and tremor.']],
    siFalla: ['Severe intention tremor.', 'Limb or truncal ataxia, depending on the nucleus affected.'],
  },

  // ---- Structures (markers) ----
  vermis_superior: {
    nombre: 'Superior vermis', tipo: 'Vermis',
    resumen: 'The part of the vermis on the superior surface of the cerebellum, beneath the tentorium cerebelli.',
    funciones: ['Control of posture and gait.'],
    siFalla: 'Gait ataxia; it is the region most affected in alcoholic cerebellar degeneration.',
  },
  vermis_inferior: {
    nombre: 'Inferior vermis', tipo: 'Vermis',
    resumen: 'The part of the vermis on the inferior surface, sunk between the hemispheres (vallecula). It includes the pyramid, uvula and nodule.',
    funciones: ['Balance and axial control.', 'Eye movements.'],
    siFalla: 'Truncal ataxia and nystagmus.',
  },
  fisura_primaria: {
    nombre: 'Primary fissure', tipo: 'Anatomical landmark',
    resumen: 'A deep fissure on the superior surface that separates the anterior lobe from the posterior lobe.',
    funciones: ['Boundary between the anterior spinocerebellum and the posterior cerebrocerebellum.'],
    siFalla: 'It is an anatomical landmark; lesions in front of it mainly affect gait, and those behind it affect limb coordination.',
  },
  corteza_cerebelosa: {
    nombre: 'Cerebellar cortex (folia)', tipo: 'Histology',
    resumen: 'The surface of the cerebellum forms thin leaves, or folia. Its cortex has three layers: molecular, Purkinje cell and granular.',
    funciones: ['Purkinje cells are the only output of the cerebellar cortex and are inhibitory (GABA).', 'Mossy fibers and climbing fibers (from the inferior olive) provide the input.'],
    siFalla: 'Loss of Purkinje cells (from alcohol, genetics or drugs) causes progressive ataxia.',
  },
  fisura_horizontal: {
    nombre: 'Horizontal fissure', tipo: 'Anatomical landmark',
    resumen: 'A fissure that runs along the posterolateral border of the cerebellum and separates its superior and inferior surfaces.',
    funciones: ['Anatomical landmark within the posterior lobe.'],
    siFalla: 'No specific clinical correlate; it helps localize lesions.',
  },
  amigdalas_cerebelosas: {
    nombre: 'Cerebellar tonsils', tipo: 'Posterior lobe',
    resumen: 'Rounded lobules on the inferior surface, on either side of the vermis, just above the foramen magnum.',
    funciones: ['Part of the cerebrocerebellum.'],
    siFalla: 'They can descend through the foramen magnum (Chiari malformation or herniation due to raised intracranial pressure), compressing the medulla oblongata and endangering breathing.',
  },
  floculo: {
    nombre: 'Flocculus', tipo: 'Flocculonodular lobe',
    resumen: 'A small paired lobule next to the middle cerebellar peduncle, near the cerebellopontine angle.',
    funciones: ['Tuning of the vestibulo-ocular reflex.', 'Smooth pursuit and gaze holding.'],
    siFalla: 'Nystagmus and difficulty keeping the gaze steady.',
  },
  nodulo: {
    nombre: 'Nodule', tipo: 'Flocculonodular lobe',
    resumen: 'The most anterior and inferior part of the vermis, forming part of the roof of the fourth ventricle.',
    funciones: ['Balance and spatial orientation relative to gravity.'],
    siFalla: 'Truncal ataxia and central positional vertigo.',
  },
  pedunculo_superior: {
    nombre: 'Superior cerebellar peduncle', tipo: 'Peduncle',
    resumen: 'Connects the cerebellum to the midbrain. Its fibers cross (decussate) in the midbrain.',
    funciones: ['Main efferent pathway: carries commands from the dentate and interposed nuclei to the red nucleus and thalamus.'],
    siFalla: 'Ataxia and intention tremor.',
  },
  pedunculo_medio: {
    nombre: 'Middle cerebellar peduncle', tipo: 'Peduncle',
    resumen: 'The thickest of the three; connects the pons to the cerebellum.',
    funciones: ['Exclusively afferent pathway: carries information from the cerebral cortex (via the contralateral pontine nuclei) to the cerebellum.'],
    siFalla: 'Ataxia of the limbs on the same side.',
  },
  pedunculo_inferior: {
    nombre: 'Inferior cerebellar peduncle', tipo: 'Peduncle',
    resumen: 'Connects the medulla oblongata to the cerebellum (restiform body).',
    funciones: ['Receives proprioceptive input from the spinal cord (dorsal spinocerebellar tract), the inferior olive and the vestibular system.'],
    siFalla: 'Ipsilateral ataxia, as in lateral medullary syndrome (Wallenberg).',
  },
  nucleo_dentado: {
    nombre: 'Dentate nucleus', tipo: 'Cerebellar nucleus',
    resumen: 'The largest of the cerebellar nuclei, shaped like a crumpled bag.',
    funciones: ['Output of the cerebrocerebellum to the thalamus (ventral lateral nucleus) and motor cortex: movement planning.'],
    siFalla: 'Intention tremor and dysmetria.',
  },
  nucleos_interpuestos: {
    nombre: 'Interposed nuclei (emboliform and globose)', tipo: 'Cerebellar nuclei',
    resumen: 'Located between the dentate and fastigial nuclei.',
    funciones: ['Output of the paravermal spinocerebellum to the red nucleus: limb control during movement.'],
    siFalla: 'Limb ataxia and tremor.',
  },
  nucleo_fastigio: {
    nombre: 'Fastigial nucleus', tipo: 'Cerebellar nucleus',
    resumen: 'The most medial nucleus, next to the midline, in the roof of the fourth ventricle.',
    funciones: ['Receives input from the vermis and projects to the vestibular nuclei and reticular formation: balance, posture and eye movements.'],
    siFalla: 'Truncal ataxia and eye-movement abnormalities.',
  },
};
