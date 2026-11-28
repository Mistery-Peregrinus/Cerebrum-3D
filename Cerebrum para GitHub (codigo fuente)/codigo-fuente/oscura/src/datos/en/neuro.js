// English text for the cellular neuroscience data (INFO_NEURO, NEUROTRANSMISORES, groups and steps).
const sec = (corto, titulo, valor, tipo = Array.isArray(valor) ? (Array.isArray(valor[0]) ? 'clinica' : 'lista') : 'p') => ({ corto, titulo, valor, tipo });

export const EN_INFO_NEURO = {
  neuronas: {
    nombre: 'Neurons',
    tipo: 'Unit of the nervous system',
    resumen:
      'The neuron is the cell specialized in receiving, integrating and transmitting information through electrical and chemical signals. It is classified morphologically by the number and arrangement of its processes. Choose a type to see it in 3D and click on its parts.',
    ubicacion:
      'Neurons make up the brain, spinal cord, ganglia and nerves. They all share a general plan: a cell body (soma), dendrites that receive signals and, in most cases, an axon that carries signals to other cells. They are supported by glial cells (astrocytes, oligodendrocytes, Schwann cells and microglia).',
    contenido: [
      'Multipolar: one axon and many dendrites. They are the most abundant and predominate in the CNS (motor neurons, pyramidal cells, Purkinje cells).',
      'Bipolar: one dendrite and one axon at opposite poles (retina, olfactory epithelium).',
      'Pseudounipolar: a single process that divides into a peripheral branch and a central branch (dorsal root ganglia and sensory ganglia of the cranial nerves).',
      'Anaxonic: no distinguishable axon; all their processes look alike (for example, amacrine cells of the retina).',
    ],
    funciones: [
      'Sensory (afferent): carry information from receptors to the CNS.',
      'Motor (efferent): carry commands from the CNS to muscles and glands.',
      'Interneurons: connect neurons with each other within the CNS; they are the majority.',
    ],
    dato: 'Golgi distinguished type I neurons, with a long axon that leaves the region (such as motor neurons), and type II neurons, with a short axon that acts locally (many interneurons).',
  },
  n_multipolar: {
    nombre: 'Multipolar neuron (α motor neuron)',
    tipo: 'Multipolar',
    resumen:
      'It has a single axon and numerous dendrites that leave the soma in all directions. The model shows an alpha motor neuron of the anterior horn of the spinal cord, whose myelinated axon reaches a skeletal muscle.',
    ubicacion:
      'Multipolar neurons are the most common type and predominate in the central nervous system. Alpha motor neurons are found in the anterior horn of the spinal cord and in the motor nuclei of the brainstem.',
    contenido: ['Large soma with abundant Nissl substance.', 'Many branched dendrites.', 'Axon hillock and long myelinated axon.', 'Terminals that form the neuromuscular junction (acetylcholine).'],
    funciones: ['Integrate thousands of synaptic inputs.', 'In motor neurons: command skeletal muscle contraction (final common pathway).'],
    padecimientos: [
      ['Amyotrophic lateral sclerosis (ALS)', 'Progressive degeneration of upper and lower motor neurons.'],
      ['Poliomyelitis', 'The virus destroys anterior horn motor neurons and causes flaccid paralysis.'],
      ['Spinal muscular atrophy', 'A genetic disease with loss of anterior horn motor neurons.'],
    ],
    siFalla: 'Loss of lower motor neurons causes weakness, muscle atrophy, fasciculations and reduced reflexes.',
  },
  n_piramidal: {
    nombre: 'Pyramidal neuron',
    tipo: 'Multipolar · pyramidal shape',
    resumen:
      'A multipolar neuron with a triangular soma, a long apical dendrite pointing toward the cortical surface and basal dendrites leaving from its base. It is the main excitatory (glutamatergic) neuron of the cerebral cortex and hippocampus.',
    ubicacion: 'Cerebral cortex (especially layers III and V) and hippocampus. The largest, the Betz cells of layer V of the motor cortex, give rise to part of the corticospinal tract.',
    contenido: ['Pyramidal soma.', 'Apical dendrite with oblique branches and a terminal tuft.', 'Basal dendrites.', 'Abundant dendritic spines (excitatory synapses).', 'Axon leaving from the base, which may have collaterals.'],
    funciones: ['Project information between cortical areas and to subcortical structures and the spinal cord.', 'Cellular basis of memory and plasticity (long-term potentiation in the hippocampus).'],
    padecimientos: [
      ['Alzheimer disease', 'Loss of pyramidal neurons and synapses in the cortex and hippocampus.'],
      ['Epilepsy', 'Hyperexcitability of pyramidal networks generates seizures.'],
      ['ALS', 'Affects the Betz cells (upper motor neuron).'],
    ],
    siFalla: 'Cognitive or motor deficits or seizures, depending on the cortical region affected.',
  },
  n_purkinje: {
    nombre: 'Purkinje cell',
    tipo: 'Multipolar · cerebellum',
    resumen:
      'One of the largest neurons in the brain. Its huge dendritic tree, flattened like a fan, receives a vast number of synapses from parallel fibers. It is inhibitory (GABAergic) and is the only output of the cerebellar cortex.',
    ubicacion: 'Purkinje cell layer of the cerebellar cortex, between the molecular layer (where its dendrites spread) and the granular layer.',
    contenido: ['Pear-shaped soma.', 'Flat, highly branched dendritic tree.', 'Myelinated axon to the deep cerebellar nuclei.'],
    funciones: ['Integrate the parallel fibers (from granule cells) and the climbing fiber (from the inferior olive).', 'Inhibit the deep cerebellar nuclei to adjust and coordinate movement.'],
    padecimientos: [
      ['Spinocerebellar ataxias', 'Hereditary diseases with loss of Purkinje cells.'],
      ['Alcoholic cerebellar degeneration', 'Loss of Purkinje cells, especially in the anterior vermis.'],
    ],
    siFalla: 'Ataxia: uncoordinated movements, unsteady gait and intention tremor.',
  },
  n_bipolar: {
    nombre: 'Bipolar neuron',
    tipo: 'Bipolar',
    resumen: 'It has one dendrite and one axon leaving from opposite poles of the soma. The model shows a retinal bipolar cell, which connects photoreceptors with ganglion cells.',
    ubicacion: 'Retina, olfactory epithelium and ganglia of the vestibulocochlear nerve.',
    contenido: ['Elongated soma.', 'One dendrite (toward the photoreceptors).', 'One axon (toward the ganglion cells).'],
    funciones: ['Transmit information from the special senses (vision, smell, hearing and balance).'],
    padecimientos: [
      ['Congenital stationary night blindness', 'Some forms are due to defects in transmission from photoreceptors to bipolar cells.'],
      ['Anosmia', 'Damage to olfactory receptor neurons causes loss of smell.'],
    ],
    siFalla: 'Disturbances of the corresponding sense (vision, smell, hearing or balance).',
  },
  n_seudounipolar: {
    nombre: 'Pseudounipolar neuron',
    tipo: 'Pseudounipolar (unipolar)',
    resumen:
      'A single short process leaves its soma and splits like a T: a peripheral branch, which reaches receptors in the skin or organs, and a central branch, which enters the spinal cord or brainstem. It has no true dendrites: the peripheral branch performs that role.',
    ubicacion: 'Dorsal root ganglia, sensory ganglia of the cranial nerves and the mesencephalic nucleus of the trigeminal nerve.',
    contenido: ['Round soma in the ganglion, surrounded by satellite cells.', 'A single process that bifurcates.', 'Peripheral branch with sensory endings.', 'Central branch to the CNS.'],
    funciones: ['Conduct sensation (touch, pain, temperature, proprioception) from the periphery to the CNS; the signal can pass from one branch to the other without going through the soma.'],
    padecimientos: [
      ['Herpes zoster', 'The varicella-zoster virus lies dormant in sensory ganglia and, when reactivated, causes pain and a rash in a dermatome.'],
      ['Diabetic neuropathy', 'Affects sensory fibers and causes tingling, pain and loss of sensation.'],
    ],
    siFalla: 'Loss of sensation, neuropathic pain or impaired proprioception.',
  },
  n_anaxonica: {
    nombre: 'Anaxonic neuron',
    tipo: 'Anaxonic',
    resumen: 'It lacks a distinguishable axon: all its processes look similar. The model shows an amacrine cell of the retina.',
    ubicacion: 'Brain and special sense organs, such as the retina.',
    contenido: ['Small soma.', 'Several similar processes, with no clearly identifiable axon.'],
    funciones: ['Take part in local circuits, modulating the activity of neighboring neurons.'],
    siFalla: 'Its clinical role is less well known; in the retina it contributes to the processing of contrast and motion.',
  },

  // ---- parts of the neuron ----
  p_soma: {
    nombre: 'Soma (cell body)', tipo: 'Part of the neuron',
    resumen: 'The metabolic center of the neuron. It contains the nucleus, with a prominent nucleolus, and the Nissl substance (rough endoplasmic reticulum), where proteins are made.',
    funciones: ['Synthesis of proteins and neurotransmitters.', 'Integration of signals arriving from the dendrites.'],
    siFalla: 'If the axon is damaged, the soma shows chromatolysis (dispersal of the Nissl substance); death of the soma means permanent loss of the neuron.',
  },
  p_dendritas: {
    nombre: 'Dendrites', tipo: 'Part of the neuron',
    resumen: 'Branched processes that receive most synaptic signals. Many have dendritic spines, where excitatory synapses form.',
    funciones: ['Receive and sum postsynaptic potentials.', 'Plasticity: spines change with learning.'],
    siFalla: 'Loss or malformation of dendritic spines is associated with intellectual disability and with the synaptic loss of Alzheimer disease.',
  },
  p_cono_axonico: {
    nombre: 'Axon hillock and initial segment', tipo: 'Part of the neuron',
    resumen: 'The region of the soma from which the axon arises; it lacks Nissl substance. Together with the initial segment of the axon, it concentrates voltage-gated Na⁺ channels.',
    funciones: ['Trigger zone: the action potential usually starts here when the sum of signals reaches threshold.'],
    siFalla: 'Changes in the ion channels of this zone alter neuronal excitability (some genetic epilepsies).',
  },
  p_axon: {
    nombre: 'Axon', tipo: 'Part of the neuron',
    resumen: 'A single process that conducts the action potential from the soma to the terminals. Its length ranges from micrometers to more than a meter.',
    funciones: ['Conduct electrical signals.', 'Axonal transport: anterograde (kinesin) toward the terminals and retrograde (dynein) toward the soma.'],
    padecimientos: [
      ['Wallerian degeneration', 'Degeneration of the distal segment after the axon is cut.'],
      ['Tetanus and rabies', 'Tetanus toxin and the rabies virus reach the CNS by retrograde axonal transport.'],
    ],
    siFalla: 'Conduction to the target cells is interrupted: weakness, sensory or autonomic loss depending on the nerve.',
  },
  p_mielina: {
    nombre: 'Myelin sheath', tipo: 'Part of the neuron',
    resumen: 'Concentric layers of membrane wrapped around the axon: formed by oligodendrocytes in the CNS and Schwann cells in the PNS. It acts as an electrical insulator.',
    funciones: ['Increase conduction velocity: the potential jumps from node to node (saltatory conduction), more than ten times faster.', 'Save energy, because only the nodes depolarize.'],
    padecimientos: [
      ['Multiple sclerosis', 'Autoimmune demyelination in the CNS.'],
      ['Guillain-Barré syndrome', 'Acute inflammatory demyelination of the peripheral nerves.'],
    ],
    siFalla: 'Conduction slows or is blocked: weakness and sensory, visual or coordination disturbances.',
  },
  p_nodos: {
    nombre: 'Nodes of Ranvier', tipo: 'Part of the neuron',
    resumen: 'Small gaps in the myelin sheath (about 1 µm) where the axon is exposed. They have a high concentration of voltage-gated Na⁺ channels.',
    funciones: ['Regenerate the action potential at each node, which makes saltatory conduction possible.'],
    siFalla: 'If demyelination leaves the nodes too far apart, the potential does not reach the next node and conduction is blocked.',
  },
  p_terminales: {
    nombre: 'Axon terminals (synaptic boutons)', tipo: 'Part of the neuron',
    resumen: 'The final branches of the axon (telodendria), ending in boutons with vesicles full of neurotransmitter and abundant mitochondria.',
    funciones: ['Release neurotransmitters by exocytosis when Ca²⁺ enters on arrival of the action potential.'],
    padecimientos: [
      ['Botulism', 'Botulinum toxin prevents the release of acetylcholine.'],
      ['Lambert-Eaton myasthenic syndrome', 'Antibodies against presynaptic Ca²⁺ channels.'],
    ],
    siFalla: 'Synaptic transmission fails even though the axon conducts normally.',
  },
  p_terminacion_sensitiva: {
    nombre: 'Sensory endings', tipo: 'Part of the neuron',
    resumen: 'The end of the peripheral branch of a sensory neuron. It transforms a stimulus (pressure, temperature or tissue damage) into a receptor potential.',
    funciones: ['Sensory transduction: converting physical or chemical stimuli into electrical signals.'],
    siFalla: 'Hypoesthesia (reduced sensation) or neuropathic pain.',
  },

  // ---- action potential ----
  potencial_accion: {
    nombre: 'Action potential',
    tipo: 'Neuronal electrical signal',
    resumen:
      'A rapid, transient change in membrane voltage that travels along the axon without losing amplitude. It occurs when the membrane reaches threshold and voltage-gated Na⁺ and K⁺ channels open. Press "Stimulate" and watch the axon, the ions and the graph.',
    secciones: [
      sec('Phases', 'Phases', [
        'Resting: the membrane stays negative inside (in mammalian neurons, between −60 and −70 mV) thanks to K⁺ leak channels and the Na⁺/K⁺-ATPase pump.',
        'Threshold: if a stimulus depolarizes the membrane to about −55 mV, enough Na⁺ channels open.',
        'Depolarization: Na⁺ flows in and the voltage rises rapidly to positive values (overshoot).',
        'Repolarization: Na⁺ channels inactivate and K⁺ channels open; K⁺ flows out and the voltage falls again.',
        'Hyperpolarization: K⁺ channels are slow to close and the voltage dips below resting before recovering.',
      ]),
      sec('Principles', 'Key principles', [
        'All or none: below threshold there is no action potential; above it, the amplitude is always the same.',
        'Absolute refractory period: while Na⁺ channels are inactivated, no new potential can start.',
        'Relative refractory period: during hyperpolarization a stronger stimulus is needed.',
        'Stimulus intensity is encoded in firing frequency, not amplitude.',
      ]),
      sec('Conduction', 'Conduction', [
        'Continuous (unmyelinated axons): the potential regenerates each adjacent segment of membrane; it is slower.',
        'Saltatory (myelinated axons): it is regenerated only at the nodes of Ranvier; it can be more than ten times faster.',
        'Velocity increases with axon diameter and with myelin.',
      ]),
      sec('Clinical', 'Clinical relevance', [
        ['Local anesthetics', 'Lidocaine blocks Na⁺ channels and stops pain conduction.'],
        ['Tetrodotoxin', 'A pufferfish toxin that blocks Na⁺ channels; it can cause paralysis.'],
        ['Multiple sclerosis', 'Demyelination slows or blocks conduction.'],
        ['Potassium disorders', 'Hyperkalemia and hypokalemia alter the excitability of nerves and muscles.'],
      ]),
      sec('Model', 'About this simulation', 'The graph and the color of the axon are computed in real time with the Hodgkin-Huxley equations (1952), described in the squid giant axon (here at about 16 °C). In this model the resting potential is −65 mV; in mammalian neurons the values are similar (−60 to −70 mV) and the shape of the potential is equivalent. The myelinated axon is modeled with active nodes of Ranvier joined by insulated internodes.'),
    ],
  },

  // ---- synapses ----
  sinapsis_quimica: {
    nombre: 'Chemical synapse',
    tipo: 'Type of synapse',
    resumen:
      'The most common type in the mammalian nervous system. The presynaptic terminal converts the electrical signal into a chemical one: it releases a neurotransmitter that crosses the synaptic cleft (about 20–40 nm) and acts on receptors in the postsynaptic membrane.',
    secciones: [
      sec('Structure', 'Structure', [
        'Presynaptic terminal with synaptic vesicles, mitochondria and an active release zone.',
        'Synaptic cleft: the extracellular space between the two neurons.',
        'Postsynaptic membrane with receptors and a postsynaptic density.',
      ]),
      sec('Receptors', 'Types of receptors', [
        'Ionotropic: the receptor is an ion channel; the response is fast (milliseconds).',
        'Metabotropic: coupled to G proteins and second messengers; the response is slower and longer-lasting (hundreds of milliseconds or more).',
      ]),
      sec('Response', 'Postsynaptic response', [
        'EPSP (excitatory postsynaptic potential): depolarization, for example by Na⁺ influx; brings the neuron closer to threshold.',
        'IPSP (inhibitory postsynaptic potential): hyperpolarization or stabilization, for example by Cl⁻ influx or K⁺ efflux; moves it away from threshold.',
        'The neuron sums hundreds of EPSPs and IPSPs in time and space before firing.',
      ]),
      sec('Features', 'Features', [
        'Unidirectional: from the presynaptic to the postsynaptic neuron.',
        'Synaptic delay of about 0.5 to 1 ms.',
        'It allows the signal to be amplified, inhibited and modulated, and is the basis of synaptic plasticity.',
      ]),
    ],
  },
  sinapsis_electrica: {
    nombre: 'Electrical synapse',
    tipo: 'Type of synapse',
    resumen:
      'Current passes directly from one neuron to another through gap junctions. Each channel is formed by two connexons, one in each membrane, and each connexon by six connexins.',
    secciones: [
      sec('Structure', 'Structure', [
        'The membranes are very close together (about 3.5 nm).',
        'The connexons of both cells line up and form a continuous pore that lets ions and small molecules through.',
        'In the mammalian brain the main connexin is connexin 36.',
      ]),
      sec('Features', 'Features', [
        'Virtually no synaptic delay, much shorter than in the chemical synapse.',
        'Usually bidirectional.',
        'Synchronizes the activity of groups of neurons (for example, inhibitory interneurons of the cortex, the inferior olive and brainstem nuclei).',
        'Less able to amplify or invert the signal than the chemical synapse.',
      ]),
      sec('Comparison', 'Chemical vs. electrical', [
        ['Speed', 'Electrical: almost instantaneous. Chemical: delay of about 0.5 to 1 ms.'],
        ['Direction', 'Electrical: usually bidirectional. Chemical: unidirectional.'],
        ['Mediator', 'Electrical: ions through connexons. Chemical: neurotransmitters and receptors.'],
        ['Frequency', 'The chemical synapse is the most common in mammals; the electrical one is less frequent but important for synchronization.'],
      ]),
    ],
  },

  // ---- neurotransmitters ----
  neurotransmisores: {
    nombre: 'Neurotransmitters',
    tipo: 'Chemical messengers',
    resumen:
      'Substances that a neuron releases at the synapse to act on another cell. Their effect (excitatory, inhibitory or modulatory) depends not only on the molecule but on the receptor it acts on. Choose one to see it in action.',
    secciones: [
      sec('Classes', 'Main classes', [
        'Amino acids: glutamate (excitatory), GABA and glycine (inhibitory).',
        'Acetylcholine.',
        'Biogenic amines (monoamines): dopamine, norepinephrine, serotonin and histamine.',
        'Neuropeptides: endorphins, enkephalins, substance P, among others.',
        'Others: purines (ATP) and gaseous transmitters such as nitric oxide.',
      ]),
      sec('Criteria', 'Criteria for a neurotransmitter', [
        'It is synthesized and stored in the presynaptic neuron.',
        'It is released when an action potential arrives.',
        'It acts on specific receptors of the postsynaptic cell.',
        'There is a mechanism to remove it from the synapse (reuptake, degradation or diffusion).',
      ]),
    ],
  },
};

const nt = (o) => ({ tipo: 'Neurotransmitter', ...o });
export const EN_NEUROTRANSMISORES = {
  glutamato: nt({
    nombre: 'Glutamate', clase: 'Amino acid', efecto: 'Excitatory',
    resumen: 'The main excitatory neurotransmitter of the CNS and the most abundant in the brain. It is involved in almost every function, especially learning and memory.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'It is obtained from glutamine and glucose metabolism. Neurons and astrocytes cooperate through the glutamate-glutamine cycle: the astrocyte takes up glutamate, converts it into glutamine and returns it to the neuron.'),
      sec('Receptors', 'Receptors', ['Ionotropic: AMPA, NMDA and kainate (let Na⁺ in and, in the case of NMDA, also Ca²⁺).', 'Metabotropic: mGluR1–8, coupled to G proteins.']),
      sec('Termination', 'Termination', 'Reuptake by excitatory amino acid transporters (EAAT), mainly in astrocytes.'),
      sec('Function', 'Functions', ['Fast excitatory transmission.', 'Synaptic plasticity and long-term potentiation (memory).']),
      sec('Clinical', 'Imbalances', [
        ['Excitotoxicity', 'Excess glutamate and massive Ca²⁺ influx damage neurons in stroke, trauma and epilepsy.'],
        ['Neurodegenerative diseases', 'It has been implicated in ALS and Alzheimer disease.'],
      ]),
      sec('Drugs', 'Related drugs', ['Memantine: NMDA receptor antagonist, used in Alzheimer disease.', 'Ketamine: NMDA antagonist (anesthetic).']),
    ],
  }),
  gaba: nt({
    nombre: 'GABA (γ-aminobutyric acid)', clase: 'Amino acid', efecto: 'Inhibitory',
    resumen: 'The main inhibitory neurotransmitter of the brain. It reduces excitability: it hyperpolarizes postsynaptic neurons and decreases presynaptic release.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'It is synthesized from glutamate by the enzyme glutamate decarboxylase (GAD). It is used by many interneurons and by Purkinje cells.'),
      sec('Receptors', 'Receptors', ['GABA-A: ionotropic, Cl⁻ channel (fast inhibition).', 'GABA-B: metabotropic, opens K⁺ channels (slow inhibition).']),
      sec('Termination', 'Termination', 'Reuptake by transporters (GAT) and degradation by GABA transaminase.'),
      sec('Function', 'Functions', ['Balance excitation.', 'Regulate anxiety, sleep and muscle tone.']),
      sec('Clinical', 'Imbalances', [['Epilepsy', 'Reduced GABAergic inhibition facilitates seizures.'], ['Anxiety and insomnia', 'Related to the activity of GABAergic circuits.']]),
      sec('Drugs', 'Related drugs', ['Benzodiazepines and barbiturates: enhance the GABA-A receptor.', 'Vigabatrin: inhibits GABA transaminase (antiepileptic).', 'Alcohol also enhances GABAergic transmission.']),
    ],
  }),
  glicina: nt({
    nombre: 'Glycine', clase: 'Amino acid', efecto: 'Inhibitory',
    resumen: 'The main inhibitory neurotransmitter in the spinal cord and brainstem. It is also a co-agonist of the glutamate NMDA receptor.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'An amino acid synthesized from serine. It is released by inhibitory interneurons of the spinal cord and brainstem (for example, Renshaw cells).'),
      sec('Receptors', 'Receptors', ['Glycine receptor: ionotropic, Cl⁻ channel.', 'Co-agonist site on the NMDA receptor.']),
      sec('Termination', 'Termination', 'Reuptake by glycine transporters (GlyT).'),
      sec('Function', 'Functions', ['Inhibition of motor neurons and control of reflexes.']),
      sec('Clinical', 'Imbalances', [['Strychnine poisoning', 'Blocks glycine receptors: muscle spasms and seizures.'], ['Tetanus', 'Tetanus toxin prevents the release of glycine and GABA in the spinal cord: rigidity and spasms.']]),
    ],
  }),
  acetilcolina: nt({
    nombre: 'Acetylcholine', clase: 'Choline ester', efecto: 'Excitatory (nicotinic) · modulatory (muscarinic)',
    resumen: 'The transmitter of the neuromuscular junction, the autonomic ganglia and the parasympathetic system. In the brain it takes part in attention, memory and wakefulness.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'It is formed from choline and acetyl-CoA by choline acetyltransferase. Cholinergic neurons: motor neurons, autonomic preganglionic neurons, parasympathetic postganglionic neurons and the basal nucleus of Meynert.'),
      sec('Receptors', 'Receptors', ['Nicotinic: ionotropic (neuromuscular junction and autonomic ganglia).', 'Muscarinic M1–M5: metabotropic (parasympathetic organs and brain).']),
      sec('Termination', 'Termination', 'Acetylcholinesterase breaks it down in the cleft into choline and acetate; choline is taken back up to make more acetylcholine.'),
      sec('Function', 'Functions', ['Skeletal muscle contraction.', 'Parasympathetic functions: digestion, salivation and slowing of the heart rate.', 'Attention and memory.']),
      sec('Clinical', 'Imbalances', [
        ['Myasthenia gravis', 'Antibodies against nicotinic receptors: fluctuating muscle weakness.'],
        ['Alzheimer disease', 'Loss of cholinergic neurons; treated with cholinesterase inhibitors (donepezil).'],
        ['Botulism', 'The toxin prevents the release of acetylcholine: flaccid paralysis.'],
        ['Organophosphate poisoning', 'Inhibits acetylcholinesterase: cholinergic crisis.'],
      ]),
    ],
  }),
  dopamina: nt({
    nombre: 'Dopamine', clase: 'Monoamine (catecholamine)', efecto: 'Modulatory (D1 excitatory · D2 inhibitory)',
    resumen: 'A catecholamine key to motor control, motivation and reward. It acts on metabotropic receptors, so its effect is modulatory and depends on the receptor subtype.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'Tyrosine → L-DOPA → dopamine. Main pathways: nigrostriatal (substantia nigra → striatum: movement), mesolimbic and mesocortical (ventral tegmental area: reward and cognition) and tuberoinfundibular (inhibits prolactin).'),
      sec('Receptors', 'Receptors', ['D1 and D5: coupled to Gs; activate adenylyl cyclase (excitatory effect).', 'D2, D3 and D4: coupled to Gi; inhibit adenylyl cyclase (inhibitory effect).']),
      sec('Termination', 'Termination', 'Reuptake by the dopamine transporter (DAT) and degradation by MAO and COMT.'),
      sec('Function', 'Functions', ['Initiate and facilitate movement.', 'Motivation, reward and reinforcement learning.', 'Inhibit prolactin secretion.']),
      sec('Clinical', 'Imbalances', [
        ['Parkinson disease', 'Degeneration of the dopaminergic neurons of the substantia nigra.'],
        ['Schizophrenia', 'Excess mesolimbic dopaminergic activity is associated with psychotic symptoms (dopamine hypothesis).'],
        ['Addiction', 'Many drugs increase dopamine in the reward pathway.'],
      ]),
      sec('Drugs', 'Related drugs', ['Levodopa and dopamine agonists (Parkinson disease).', 'Antipsychotics: block D2 receptors.', 'Cocaine blocks DAT; amphetamines release dopamine.']),
    ],
  }),
  noradrenalina: nt({
    nombre: 'Norepinephrine (noradrenaline)', clase: 'Monoamine (catecholamine)', efecto: 'Modulatory',
    resumen: 'The transmitter of the sympathetic nervous system and the locus coeruleus. It increases alertness and prepares the body for the fight-or-flight response.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'It is synthesized from dopamine by dopamine β-hydroxylase. Neurons of the locus coeruleus (brainstem) and sympathetic postganglionic neurons.'),
      sec('Receptors', 'Receptors', ['Adrenergic α1, α2, β1, β2 and β3, all metabotropic (coupled to G proteins).', 'Presynaptic α2 receptors inhibit its own release (negative feedback).']),
      sec('Termination', 'Termination', 'Reuptake by the norepinephrine transporter (NET) and degradation by MAO and COMT.'),
      sec('Function', 'Functions', ['Alertness, attention and wakefulness.', 'Stress response: increased heart rate, blood pressure and blood glucose.']),
      sec('Clinical', 'Imbalances', [['Depression and anxiety', 'Related to disturbances of noradrenergic transmission.'], ['ADHD', 'Some treatments act on norepinephrine.']]),
      sec('Drugs', 'Related drugs', ['Serotonin-norepinephrine reuptake inhibitors (antidepressants).', 'β-blockers and α2 agonists such as clonidine (cardiovascular).']),
    ],
  }),
  serotonina: nt({
    nombre: 'Serotonin (5-HT)', clase: 'Monoamine (indolamine)', efecto: 'Modulatory',
    resumen: 'A monoamine derived from tryptophan that modulates mood, sleep, appetite and pain. Most of the body\'s serotonin is in the digestive tract.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'Tryptophan → 5-hydroxytryptophan → serotonin. In the brain it is produced by the raphe nuclei of the brainstem; the highest concentration in the body is in the enterochromaffin cells of the gut and in platelets.'),
      sec('Receptors', 'Receptors', ['Seven families (5-HT1 to 5-HT7). All are metabotropic except 5-HT3, which is an ion channel.']),
      sec('Termination', 'Termination', 'Reuptake by the serotonin transporter (SERT) and degradation by MAO.'),
      sec('Function', 'Functions', ['Mood and anxiety.', 'Sleep, appetite and temperature.', 'Gut motility, nausea and vomiting.']),
      sec('Clinical', 'Imbalances', [['Depression and anxiety', 'Treated with drugs that increase synaptic serotonin.'], ['Serotonin syndrome', 'Excess serotonin causes agitation, hyperthermia, tremor and rigidity.']]),
      sec('Drugs', 'Related drugs', ['SSRIs (fluoxetine, sertraline): block SERT.', 'Ondansetron: blocks 5-HT3 receptors (antiemetic).', 'Triptans: 5-HT1B/1D agonists (migraine).']),
    ],
  }),
  histamina: nt({
    nombre: 'Histamine', clase: 'Monoamine (imidazolamine)', efecto: 'Modulatory',
    resumen: 'In the brain, histamine comes from neurons of the posterior hypothalamus and maintains wakefulness. Outside the CNS it is a mediator of inflammation and allergy.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'It is formed from histidine. Histaminergic neurons are in the tuberomammillary nucleus of the hypothalamus and project to almost the whole brain.'),
      sec('Receptors', 'Receptors', ['H1 to H4, all metabotropic.', 'H3 is a presynaptic autoreceptor that regulates the release of histamine and other transmitters.']),
      sec('Termination', 'Termination', 'Enzymatic degradation (in the brain, mainly by histamine N-methyltransferase).'),
      sec('Function', 'Functions', ['Wakefulness and attention.', 'Outside the CNS: inflammation, allergy and gastric acid secretion (H2).']),
      sec('Clinical', 'Clinical relevance', [['Drowsiness from antihistamines', 'First-generation H1 antihistamines cross the blood-brain barrier and cause sleepiness.']]),
    ],
  }),
  endorfinas: nt({
    nombre: 'Endorphins (opioid neuropeptides)', clase: 'Neuropeptide', efecto: 'Inhibitory / modulatory',
    resumen: 'Endogenous opioid peptides (β-endorphin, enkephalins and dynorphins) that relieve pain and take part in reward. They are stored in dense-core vesicles and act on opioid receptors.',
    secciones: [
      sec('Synthesis', 'Synthesis and location', 'They are synthesized in the soma as large precursors (for example, proopiomelanocortin) and travel down the axon. They are found in the hypothalamus, pituitary gland, periaqueductal gray and spinal cord.'),
      sec('Receptors', 'Receptors', ['Opioid receptors μ, δ and κ, metabotropic: inhibit adenylyl cyclase, open K⁺ channels and reduce Ca²⁺ influx.']),
      sec('Termination', 'Termination', 'They are not taken back up: extracellular peptidases break them down.'),
      sec('Function', 'Functions', ['Endogenous analgesia (descending pain modulation).', 'Reward and stress response.']),
      sec('Clinical', 'Clinical relevance', [['Opioids', 'Morphine and other opioids act on the same receptors; they produce analgesia but also respiratory depression and dependence.'], ['Naloxone', 'An opioid antagonist that reverses overdose.']]),
    ],
  }),
};

export const EN_GRUPOS_NT = ['Amino acids', 'Acetylcholine', 'Monoamines', 'Neuropeptides'];

export const EN_PASOS_QUIMICA = [
  { titulo: 'The action potential arrives', texto: 'The action potential travels down the axon and depolarizes the presynaptic terminal.' },
  { titulo: 'Ca²⁺ enters', texto: 'Voltage-gated Ca²⁺ channels open in the active zone and Ca²⁺ flows into the terminal.' },
  { titulo: 'Exocytosis', texto: 'Ca²⁺ activates the fusion machinery (SNARE proteins): vesicles fuse with the membrane and release the neurotransmitter.' },
  { titulo: 'Diffusion and receptor binding', texto: 'The neurotransmitter crosses the synaptic cleft in microseconds and binds to its receptors.' },
  { titulo: 'Postsynaptic response', texto: 'Ionotropic receptors open channels (fast EPSPs or IPSPs); metabotropic receptors activate G proteins and second messengers (slow effect).' },
  { titulo: 'Signal termination', texto: 'The neurotransmitter is removed by reuptake, enzymatic degradation or diffusion, allowing a new transmission.' },
  { titulo: 'Vesicle recycling', texto: 'The vesicle membrane is recovered by endocytosis and the vesicles are refilled with neurotransmitter.' },
];
export const EN_PASOS_ELECTRICA = [
  { titulo: 'The action potential arrives', texto: 'The presynaptic neuron depolarizes.' },
  { titulo: 'Ions cross the connexons', texto: 'Ionic current passes directly into the cytoplasm of the other neuron through the gap junction channels.' },
  { titulo: 'Almost immediate depolarization', texto: 'The postsynaptic neuron depolarizes with virtually no synaptic delay.' },
  { titulo: 'Bidirectional and synchronizing', texto: 'Current can flow in both directions, which synchronizes the activity of groups of neurons.' },
];
