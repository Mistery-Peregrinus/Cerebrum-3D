// Neurociencia celular (versión Pro): neuronas, potencial de acción, sinapsis y neurotransmisores.
// Las fichas con `secciones` definen sus propios apartados numerados.

import { EN, traducir } from '../i18n.js';
import { EN_INFO_NEURO, EN_NEUROTRANSMISORES, EN_GRUPOS_NT, EN_PASOS_QUIMICA, EN_PASOS_ELECTRICA } from './en/neuro.js';

const sec = (corto, titulo, valor, tipo = Array.isArray(valor) ? (Array.isArray(valor[0]) ? 'clinica' : 'lista') : 'p') => ({ corto, titulo, valor, tipo });

const INFO_NEURO_ES = {
  // =========================================================================
  // NEURONAS
  // =========================================================================
  neuronas: {
    nombre: 'Neuronas',
    tipo: 'Unidad del sistema nervioso',
    color: '#e7a35c',
    resumen:
      'La neurona es la célula especializada en recibir, integrar y transmitir información mediante señales eléctricas y químicas. Se clasifica morfológicamente según el número y la disposición de sus prolongaciones. Elige un tipo para verlo en 3D y haz clic en sus partes.',
    ubicacion:
      'Las neuronas forman el encéfalo, la médula espinal, los ganglios y los nervios. Todas comparten un plan general: un cuerpo celular (soma), dendritas que reciben señales y, en la mayoría, un axón que las conduce hacia otras células. Se apoyan en las células gliales (astrocitos, oligodendrocitos, células de Schwann y microglía).',
    contenido: [
      'Multipolares: un axón y muchas dendritas. Son las más abundantes y predominan en el SNC (motoneuronas, piramidales, de Purkinje).',
      'Bipolares: una dendrita y un axón en polos opuestos (retina, epitelio olfatorio).',
      'Seudounipolares: una sola prolongación que se divide en una rama periférica y otra central (ganglios de la raíz dorsal y ganglios sensitivos de los nervios craneales).',
      'Anaxónicas: sin un axón distinguible; todas sus prolongaciones son parecidas (por ejemplo, las células amacrinas de la retina).',
    ],
    funciones: [
      'Sensitivas (aferentes): llevan información de los receptores al SNC.',
      'Motoras (eferentes): llevan órdenes del SNC a músculos y glándulas.',
      'Interneuronas: conectan neuronas entre sí dentro del SNC; son la mayoría.',
    ],
    dato: 'Golgi distinguió neuronas de tipo I, con axón largo que sale de la región (como las motoneuronas), y de tipo II, con axón corto que actúa localmente (muchas interneuronas).',
    fuentes: ['sp_neuronas', 'sp_axon', 'sp_glia', 'libro_snell', 'libro_kandel'],
  },
  n_multipolar: {
    nombre: 'Neurona multipolar (motoneurona α)',
    tipo: 'Multipolar',
    color: '#e7a35c',
    resumen:
      'Tiene un solo axón y numerosas dendritas que salen del soma en todas direcciones. El modelo representa una motoneurona alfa del asta anterior de la médula espinal, cuyo axón mielinizado llega hasta un músculo esquelético.',
    ubicacion:
      'Las multipolares son el tipo más común y predominan en el sistema nervioso central. Las motoneuronas alfa se encuentran en el asta anterior de la médula espinal y en los núcleos motores del tallo cerebral.',
    contenido: ['Soma grande con abundante sustancia de Nissl.', 'Muchas dendritas ramificadas.', 'Cono axónico y axón largo mielinizado.', 'Terminales que forman la unión neuromuscular (acetilcolina).'],
    funciones: ['Integrar miles de entradas sinápticas.', 'En las motoneuronas: ordenar la contracción del músculo esquelético (vía final común).'],
    padecimientos: [
      ['Esclerosis lateral amiotrófica (ELA)', 'Degeneración progresiva de motoneuronas superiores e inferiores.'],
      ['Poliomielitis', 'El virus destruye motoneuronas del asta anterior y causa parálisis flácida.'],
      ['Atrofia muscular espinal', 'Enfermedad genética con pérdida de motoneuronas del asta anterior.'],
    ],
    siFalla: 'La pérdida de motoneuronas inferiores produce debilidad, atrofia muscular, fasciculaciones y reflejos disminuidos.',
    fuentes: ['sp_neuronas', 'sp_union_nm', 'libro_snell'],
  },
  n_piramidal: {
    nombre: 'Neurona piramidal',
    tipo: 'Multipolar · forma piramidal',
    color: '#e7a35c',
    resumen:
      'Neurona multipolar con soma triangular, una dendrita apical larga dirigida hacia la superficie de la corteza y dendritas basales que salen de la base. Es la principal neurona excitadora (glutamatérgica) de la corteza cerebral y el hipocampo.',
    ubicacion: 'Corteza cerebral (sobre todo capas III y V) e hipocampo. Las más grandes, las células de Betz de la capa V de la corteza motora, originan parte del tracto corticoespinal.',
    contenido: ['Soma piramidal.', 'Dendrita apical con ramas oblicuas y penacho terminal.', 'Dendritas basales.', 'Espinas dendríticas abundantes (sinapsis excitatorias).', 'Axón que sale de la base y puede tener colaterales.'],
    funciones: ['Proyectar información entre áreas corticales y hacia estructuras subcorticales y la médula.', 'Base celular de la memoria y la plasticidad (potenciación a largo plazo en el hipocampo).'],
    padecimientos: [
      ['Enfermedad de Alzheimer', 'Pérdida de neuronas piramidales y de sinapsis en la corteza y el hipocampo.'],
      ['Epilepsia', 'La hiperexcitabilidad de redes piramidales genera crisis.'],
      ['ELA', 'Afecta a las células de Betz (motoneurona superior).'],
    ],
    siFalla: 'Déficits cognitivos, motores o crisis según la región cortical afectada.',
    fuentes: ['sp_neuronas', 'sp_corteza', 'libro_kandel'],
  },
  n_purkinje: {
    nombre: 'Célula de Purkinje',
    tipo: 'Multipolar · cerebelo',
    color: '#e7a35c',
    resumen:
      'Una de las neuronas más grandes del encéfalo. Su enorme árbol dendrítico, aplanado como un abanico, recibe gran cantidad de sinapsis de las fibras paralelas. Es inhibitoria (GABAérgica) y constituye la única salida de la corteza cerebelosa.',
    ubicacion: 'Capa de células de Purkinje de la corteza cerebelosa, entre la capa molecular (donde se extienden sus dendritas) y la capa granular.',
    contenido: ['Soma en forma de pera.', 'Árbol dendrítico plano y muy ramificado.', 'Axón mielinizado hacia los núcleos cerebelosos profundos.'],
    funciones: ['Integrar las fibras paralelas (de las células granulares) y la fibra trepadora (de la oliva inferior).', 'Inhibir a los núcleos cerebelosos profundos para ajustar y coordinar el movimiento.'],
    padecimientos: [
      ['Ataxias espinocerebelosas', 'Enfermedades hereditarias con pérdida de células de Purkinje.'],
      ['Degeneración cerebelosa alcohólica', 'Pérdida de células de Purkinje, sobre todo del vermis anterior.'],
    ],
    siFalla: 'Ataxia: movimientos descoordinados, marcha inestable y temblor de intención.',
    fuentes: ['sp_fisiologia_cerebro', 'sp_disfuncion_cerebelosa', 'libro_kandel'],
  },
  n_bipolar: {
    nombre: 'Neurona bipolar',
    tipo: 'Bipolar',
    color: '#e7a35c',
    resumen: 'Tiene una dendrita y un axón que salen de polos opuestos del soma. El modelo representa una célula bipolar de la retina, que conecta los fotorreceptores con las células ganglionares.',
    ubicacion: 'Retina, epitelio olfatorio y ganglios del nervio vestibulococlear.',
    contenido: ['Soma alargado.', 'Una dendrita (hacia los fotorreceptores).', 'Un axón (hacia las células ganglionares).'],
    funciones: ['Transmitir información de los sentidos especiales (visión, olfato, audición y equilibrio).'],
    padecimientos: [
      ['Ceguera nocturna estacionaria congénita', 'Algunas formas se deben a fallas en la transmisión de los fotorreceptores a las células bipolares.'],
      ['Anosmia', 'La lesión de las neuronas receptoras olfatorias produce pérdida del olfato.'],
    ],
    siFalla: 'Alteraciones del sentido correspondiente (visión, olfato, audición o equilibrio).',
    fuentes: ['sp_neuronas', 'libro_purves'],
  },
  n_seudounipolar: {
    nombre: 'Neurona seudounipolar',
    tipo: 'Seudounipolar (unipolar)',
    color: '#e7a35c',
    resumen:
      'De su soma sale una sola prolongación corta que se divide en T: una rama periférica, que llega a los receptores de la piel o de los órganos, y una rama central, que entra en la médula espinal o el tallo cerebral. No tiene dendritas verdaderas: la rama periférica cumple esa función.',
    ubicacion: 'Ganglios de la raíz dorsal, ganglios sensitivos de los nervios craneales y núcleo mesencefálico del trigémino.',
    contenido: ['Soma redondo en el ganglio, rodeado por células satélite.', 'Prolongación única que se bifurca.', 'Rama periférica con terminaciones sensitivas.', 'Rama central hacia el SNC.'],
    funciones: ['Conducir la sensibilidad (tacto, dolor, temperatura, propiocepción) desde la periferia hasta el SNC; la señal puede pasar de una rama a otra sin atravesar el soma.'],
    padecimientos: [
      ['Herpes zóster', 'El virus varicela-zóster permanece latente en ganglios sensitivos y al reactivarse causa dolor y erupción en un dermatoma.'],
      ['Neuropatía diabética', 'Afecta las fibras sensitivas y produce hormigueo, dolor y pérdida de sensibilidad.'],
    ],
    siFalla: 'Pérdida de sensibilidad, dolor neuropático o alteración de la propiocepción.',
    fuentes: ['sp_neuronas', 'sp_ganglio_raiz', 'libro_snell'],
  },
  n_anaxonica: {
    nombre: 'Neurona anaxónica',
    tipo: 'Anaxónica',
    color: '#e7a35c',
    resumen: 'Carece de un axón distinguible: todas sus prolongaciones tienen aspecto similar. El modelo representa una célula amacrina de la retina.',
    ubicacion: 'Encéfalo y órganos de los sentidos especiales, como la retina.',
    contenido: ['Soma pequeño.', 'Varias prolongaciones parecidas entre sí, sin axón claramente identificable.'],
    funciones: ['Participar en circuitos locales, modulando la actividad de neuronas vecinas.'],
    siFalla: 'Su papel clínico es menos conocido; en la retina contribuye al procesamiento del contraste y del movimiento.',
    fuentes: ['sp_neuronas', 'libro_purves'],
  },

  // ---- partes de la neurona ----
  p_soma: {
    nombre: 'Soma (cuerpo celular)', tipo: 'Parte de la neurona', color: '#e7a35c',
    resumen: 'Centro metabólico de la neurona. Contiene el núcleo, con un nucléolo prominente, y la sustancia de Nissl (retículo endoplásmico rugoso), donde se fabrican las proteínas.',
    funciones: ['Síntesis de proteínas y neurotransmisores.', 'Integración de las señales que llegan desde las dendritas.'],
    siFalla: 'Si se daña el axón, el soma presenta cromatólisis (dispersión de la sustancia de Nissl); la muerte del soma implica la pérdida definitiva de la neurona.',
    fuentes: ['sp_neuronas', 'libro_snell'],
  },
  p_dendritas: {
    nombre: 'Dendritas', tipo: 'Parte de la neurona', color: '#e7a35c',
    resumen: 'Prolongaciones ramificadas que reciben la mayoría de las señales sinápticas. Muchas presentan espinas dendríticas, donde se forman sinapsis excitatorias.',
    funciones: ['Recibir y sumar potenciales postsinápticos.', 'Plasticidad: las espinas cambian con el aprendizaje.'],
    siFalla: 'La pérdida o malformación de espinas dendríticas se asocia con discapacidad intelectual y con la pérdida sináptica de la enfermedad de Alzheimer.',
    fuentes: ['sp_neuronas', 'libro_kandel'],
  },
  p_cono_axonico: {
    nombre: 'Cono axónico y segmento inicial', tipo: 'Parte de la neurona', color: '#ffb36b',
    resumen: 'Región del soma de la que nace el axón; carece de sustancia de Nissl. Junto con el segmento inicial del axón concentra canales de Na⁺ dependientes de voltaje.',
    funciones: ['Zona gatillo: aquí suele iniciarse el potencial de acción cuando la suma de señales alcanza el umbral.'],
    siFalla: 'Las alteraciones de los canales iónicos de esta zona modifican la excitabilidad neuronal (algunas epilepsias genéticas).',
    fuentes: ['sp_potencial', 'sp_axon'],
  },
  p_axon: {
    nombre: 'Axón', tipo: 'Parte de la neurona', color: '#e0b27a',
    resumen: 'Prolongación única que conduce el potencial de acción desde el soma hasta las terminales. Su longitud va de micrómetros a más de un metro.',
    funciones: ['Conducir señales eléctricas.', 'Transporte axónico: anterógrado (cinesina) hacia las terminales y retrógrado (dineína) hacia el soma.'],
    padecimientos: [
      ['Degeneración walleriana', 'Degeneración del segmento distal tras la sección del axón.'],
      ['Tétanos y rabia', 'La toxina tetánica y el virus de la rabia llegan al SNC por transporte axónico retrógrado.'],
    ],
    siFalla: 'Se interrumpe la conducción hacia las células diana: debilidad, pérdida sensitiva o autonómica según el nervio.',
    fuentes: ['sp_axon', 'sp_nervio'],
  },
  p_mielina: {
    nombre: 'Vaina de mielina', tipo: 'Parte de la neurona', color: '#efe7d6',
    resumen: 'Capas concéntricas de membrana que envuelven el axón: las forman los oligodendrocitos en el SNC y las células de Schwann en el SNP. Actúa como aislante eléctrico.',
    funciones: ['Aumentar la velocidad de conducción: el potencial salta de nodo en nodo (conducción saltatoria), más de diez veces más rápido.', 'Ahorrar energía, porque solo los nodos se despolarizan.'],
    padecimientos: [
      ['Esclerosis múltiple', 'Desmielinización autoinmune en el SNC.'],
      ['Síndrome de Guillain-Barré', 'Desmielinización inflamatoria aguda de los nervios periféricos.'],
    ],
    siFalla: 'La conducción se enlentece o se bloquea: debilidad, alteraciones sensitivas, visuales o de coordinación.',
    fuentes: ['sp_mielina', 'sp_schwann', 'sp_nervio', 'mp_esclerosis_multiple'],
  },
  p_nodos: {
    nombre: 'Nodos de Ranvier', tipo: 'Parte de la neurona', color: '#ff8a65',
    resumen: 'Pequeñas interrupciones de la vaina de mielina (alrededor de 1 µm) donde el axón queda expuesto. Tienen una alta concentración de canales de Na⁺ dependientes de voltaje.',
    funciones: ['Regenerar el potencial de acción en cada nodo, lo que permite la conducción saltatoria.'],
    siFalla: 'Si la desmielinización deja los nodos demasiado separados, el potencial no alcanza el siguiente nodo y la conducción se bloquea.',
    fuentes: ['sp_potencial_neurona', 'sp_nervio'],
  },
  p_terminales: {
    nombre: 'Terminales axónicas (botones sinápticos)', tipo: 'Parte de la neurona', color: '#f2c46b',
    resumen: 'Ramificaciones finales del axón (telodendrias) que terminan en botones con vesículas llenas de neurotransmisor y abundantes mitocondrias.',
    funciones: ['Liberar neurotransmisores por exocitosis cuando entra Ca²⁺ al llegar el potencial de acción.'],
    padecimientos: [
      ['Botulismo', 'La toxina botulínica impide la liberación de acetilcolina.'],
      ['Síndrome miasténico de Lambert-Eaton', 'Anticuerpos contra los canales de Ca²⁺ presinápticos.'],
    ],
    siFalla: 'Falla la transmisión sináptica aunque el axón conduzca normalmente.',
    fuentes: ['sp_sinapsis', 'sp_union_nm'],
  },
  p_terminacion_sensitiva: {
    nombre: 'Terminaciones sensitivas', tipo: 'Parte de la neurona', color: '#9fd3c7',
    resumen: 'Extremo de la rama periférica de una neurona sensitiva. Transforma un estímulo (presión, temperatura o daño tisular) en un potencial receptor.',
    funciones: ['Transducción sensitiva: convertir estímulos físicos o químicos en señales eléctricas.'],
    siFalla: 'Hipoestesia (menos sensibilidad) o dolor neuropático.',
    fuentes: ['sp_ganglio_raiz', 'libro_purves'],
  },

  // =========================================================================
  // POTENCIAL DE ACCIÓN
  // =========================================================================
  potencial_accion: {
    nombre: 'Potencial de acción',
    tipo: 'Señal eléctrica neuronal',
    color: '#9b6bff',
    resumen:
      'Cambio rápido y transitorio del voltaje de la membrana que viaja por el axón sin perder amplitud. Se produce cuando la membrana alcanza el umbral y se abren canales de Na⁺ y K⁺ dependientes de voltaje. Pulsa «Estimular» y observa el axón, los iones y la gráfica.',
    secciones: [
      sec('Fases', 'Fases', [
        'Reposo: la membrana se mantiene negativa por dentro (en neuronas de mamífero, entre −60 y −70 mV) gracias a los canales de fuga de K⁺ y a la bomba Na⁺/K⁺-ATPasa.',
        'Umbral: si un estímulo despolariza la membrana hasta cerca de −55 mV, se abren suficientes canales de Na⁺.',
        'Despolarización: entra Na⁺ y el voltaje sube rápidamente hasta valores positivos (sobretiro).',
        'Repolarización: los canales de Na⁺ se inactivan y se abren los de K⁺; sale K⁺ y el voltaje vuelve a bajar.',
        'Hiperpolarización: los canales de K⁺ tardan en cerrarse y el voltaje queda por debajo del reposo antes de recuperarse.',
      ]),
      sec('Principios', 'Principios clave', [
        'Todo o nada: por debajo del umbral no hay potencial de acción; por encima, siempre tiene la misma amplitud.',
        'Período refractario absoluto: mientras los canales de Na⁺ están inactivados no puede iniciarse otro potencial.',
        'Período refractario relativo: durante la hiperpolarización se necesita un estímulo mayor.',
        'La intensidad del estímulo se codifica en la frecuencia de disparo, no en la amplitud.',
      ]),
      sec('Conducción', 'Conducción', [
        'Continua (axones amielínicos): el potencial regenera cada segmento contiguo de membrana; es más lenta.',
        'Saltatoria (axones mielinizados): solo se regenera en los nodos de Ranvier; puede ser más de diez veces más rápida.',
        'La velocidad aumenta con el diámetro del axón y con la mielina.',
      ]),
      sec('Clínica', 'Relevancia clínica', [
        ['Anestésicos locales', 'La lidocaína bloquea los canales de Na⁺ y detiene la conducción del dolor.'],
        ['Tetrodotoxina', 'Toxina del pez globo que bloquea los canales de Na⁺; puede causar parálisis.'],
        ['Esclerosis múltiple', 'La desmielinización enlentece o bloquea la conducción.'],
        ['Alteraciones del potasio', 'La hiperpotasemia y la hipopotasemia modifican la excitabilidad de nervios y músculos.'],
      ]),
      sec('Modelo', 'Sobre esta simulación', 'La gráfica y el color del axón se calculan en tiempo real con las ecuaciones de Hodgkin y Huxley (1952), descritas en el axón gigante de calamar (aquí a unos 16 °C). En este modelo el reposo es de −65 mV; en neuronas de mamífero los valores son similares (−60 a −70 mV) y la forma del potencial es equivalente. El axón mielinizado se modela con nodos de Ranvier activos unidos por internodos aislados.'),
    ],
    fuentes: ['sp_potencial', 'sp_potencial_neurona', 'sp_reposo', 'sp_nervio', 'pm_hh', 'libro_guyton'],
  },

  // =========================================================================
  // SINAPSIS
  // =========================================================================
  sinapsis_quimica: {
    nombre: 'Sinapsis química',
    tipo: 'Tipo de sinapsis',
    color: '#9b6bff',
    resumen:
      'Es la más frecuente en el sistema nervioso de los mamíferos. La terminal presináptica convierte la señal eléctrica en química: libera un neurotransmisor que cruza la hendidura sináptica (unos 20–40 nm) y actúa sobre receptores de la membrana postsináptica.',
    secciones: [
      sec('Estructura', 'Estructura', [
        'Terminal presináptica con vesículas sinápticas, mitocondrias y una zona activa de liberación.',
        'Hendidura sináptica: espacio extracelular entre ambas neuronas.',
        'Membrana postsináptica con receptores y una densidad postsináptica.',
      ]),
      sec('Receptores', 'Tipos de receptores', [
        'Ionotrópicos: el receptor es un canal iónico; la respuesta es rápida (milisegundos).',
        'Metabotrópicos: acoplados a proteínas G y segundos mensajeros; la respuesta es más lenta y duradera (cientos de milisegundos o más).',
      ]),
      sec('Respuesta', 'Respuesta postsináptica', [
        'PEPS (potencial excitador postsináptico): despolarización, por ejemplo por entrada de Na⁺; acerca a la neurona al umbral.',
        'PIPS (potencial inhibidor postsináptico): hiperpolarización o estabilización, por ejemplo por entrada de Cl⁻ o salida de K⁺; la aleja del umbral.',
        'La neurona suma en el tiempo y en el espacio cientos de PEPS y PIPS antes de disparar.',
      ]),
      sec('Características', 'Características', [
        'Unidireccional: de la neurona presináptica a la postsináptica.',
        'Retraso sináptico de alrededor de 0.5 a 1 ms.',
        'Permite amplificar, inhibir y modular la señal, y es la base de la plasticidad sináptica.',
      ]),
    ],
    fuentes: ['sp_sinapsis', 'sp_neurotransmisores', 'sp_receptores_celulares', 'libro_purves_ncbi', 'libro_kandel'],
  },
  sinapsis_electrica: {
    nombre: 'Sinapsis eléctrica',
    tipo: 'Tipo de sinapsis',
    color: '#4fb3bf',
    resumen:
      'La corriente pasa directamente de una neurona a otra a través de uniones en hendidura (gap junctions). Cada canal está formado por dos conexones, uno en cada membrana, y cada conexón por seis conexinas.',
    secciones: [
      sec('Estructura', 'Estructura', [
        'Las membranas quedan muy próximas (alrededor de 3.5 nm).',
        'Los conexones de ambas células se alinean y forman un poro continuo que deja pasar iones y moléculas pequeñas.',
        'En el encéfalo de los mamíferos la conexina principal es la conexina 36.',
      ]),
      sec('Características', 'Características', [
        'Retraso sináptico prácticamente nulo, mucho menor que en la sinapsis química.',
        'Normalmente bidireccional.',
        'Sincroniza la actividad de grupos de neuronas (por ejemplo, interneuronas inhibitorias de la corteza, oliva inferior y núcleos del tallo).',
        'Menor capacidad de amplificar o invertir la señal que la sinapsis química.',
      ]),
      sec('Comparación', 'Química frente a eléctrica', [
        ['Velocidad', 'Eléctrica: casi instantánea. Química: retraso de alrededor de 0.5 a 1 ms.'],
        ['Dirección', 'Eléctrica: suele ser bidireccional. Química: unidireccional.'],
        ['Mediador', 'Eléctrica: iones a través de conexones. Química: neurotransmisores y receptores.'],
        ['Frecuencia', 'La química es la más común en los mamíferos; la eléctrica es menos frecuente pero importante para la sincronización.'],
      ]),
    ],
    fuentes: ['sp_sinapsis', 'pm_connors', 'pm_pereda', 'libro_purves_ncbi'],
  },

  // =========================================================================
  // NEUROTRANSMISORES
  // =========================================================================
  neurotransmisores: {
    nombre: 'Neurotransmisores',
    tipo: 'Mensajeros químicos',
    color: '#9b6bff',
    resumen:
      'Sustancias que una neurona libera en la sinapsis para actuar sobre otra célula. Su efecto (excitador, inhibidor o modulador) no depende solo de la molécula, sino del receptor sobre el que actúa. Elige uno para verlo en acción.',
    secciones: [
      sec('Clases', 'Clases principales', [
        'Aminoácidos: glutamato (excitador), GABA y glicina (inhibidores).',
        'Acetilcolina.',
        'Aminas biógenas (monoaminas): dopamina, noradrenalina, serotonina e histamina.',
        'Neuropéptidos: endorfinas, encefalinas, sustancia P, entre otros.',
        'Otros: purinas (ATP) y transmisores gaseosos como el óxido nítrico.',
      ]),
      sec('Criterios', 'Criterios para ser neurotransmisor', [
        'Se sintetiza en la neurona presináptica y se almacena en ella.',
        'Se libera al llegar un potencial de acción.',
        'Actúa sobre receptores específicos de la célula postsináptica.',
        'Existe un mecanismo para retirarlo de la sinapsis (recaptación, degradación o difusión).',
      ]),
    ],
    fuentes: ['sp_neurotransmisores', 'sp_sinapsis', 'sp_receptores_celulares', 'libro_kandel'],
  },
};

// Neurotransmisores: datos de ficha + parámetros de la animación de sinapsis.
const nt = (o) => ({ tipo: 'Neurotransmisor', ...o });
const NEUROTRANSMISORES_ES = {
  glutamato: nt({
    nombre: 'Glutamato', clase: 'Aminoácido', efecto: 'Excitador', color: '#ff6b4a',
    anim: { receptor: 'ionotropico', ion: 'Na', signo: 1, terminacion: 'recaptacion', vesicula: 'clara' },
    resumen: 'El principal neurotransmisor excitador del SNC y el más abundante del encéfalo. Interviene en casi todas las funciones, especialmente en el aprendizaje y la memoria.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Se obtiene de la glutamina y del metabolismo de la glucosa. Neuronas y astrocitos se coordinan mediante el ciclo glutamato-glutamina: el astrocito capta el glutamato, lo convierte en glutamina y lo devuelve a la neurona.'),
      sec('Receptores', 'Receptores', ['Ionotrópicos: AMPA, NMDA y kainato (dejan entrar Na⁺ y, en el caso del NMDA, también Ca²⁺).', 'Metabotrópicos: mGluR1–8, acoplados a proteínas G.']),
      sec('Terminación', 'Terminación', 'Recaptación por transportadores de aminoácidos excitadores (EAAT), sobre todo en los astrocitos.'),
      sec('Función', 'Funciones', ['Transmisión excitadora rápida.', 'Plasticidad sináptica y potenciación a largo plazo (memoria).']),
      sec('Clínica', 'Desequilibrios', [
        ['Excitotoxicidad', 'El exceso de glutamato y la entrada masiva de Ca²⁺ dañan neuronas en el ACV, el traumatismo y la epilepsia.'],
        ['Enfermedades neurodegenerativas', 'Se ha implicado en la ELA y en la enfermedad de Alzheimer.'],
      ]),
      sec('Fármacos', 'Fármacos relacionados', ['Memantina: antagonista del receptor NMDA, usada en la enfermedad de Alzheimer.', 'Ketamina: antagonista NMDA (anestésico).']),
    ],
    fuentes: ['sp_glutamato', 'sp_neurotransmisores', 'mp_alzheimer'],
  }),
  gaba: nt({
    nombre: 'GABA (ácido γ-aminobutírico)', clase: 'Aminoácido', efecto: 'Inhibidor', color: '#5fb4ff',
    anim: { receptor: 'ionotropico', ion: 'Cl', signo: -1, terminacion: 'recaptacion', vesicula: 'clara' },
    resumen: 'El principal neurotransmisor inhibidor del encéfalo. Reduce la excitabilidad: hiperpolariza las neuronas postsinápticas y disminuye la liberación presináptica.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Se sintetiza a partir del glutamato por la enzima glutamato descarboxilasa (GAD). Lo utilizan muchas interneuronas y las células de Purkinje.'),
      sec('Receptores', 'Receptores', ['GABA-A: ionotrópico, canal de Cl⁻ (inhibición rápida).', 'GABA-B: metabotrópico, abre canales de K⁺ (inhibición lenta).']),
      sec('Terminación', 'Terminación', 'Recaptación por transportadores (GAT) y degradación por la GABA transaminasa.'),
      sec('Función', 'Funciones', ['Equilibrar la excitación.', 'Regular la ansiedad, el sueño y el tono muscular.']),
      sec('Clínica', 'Desequilibrios', [['Epilepsia', 'La disminución de la inhibición GABAérgica facilita las crisis.'], ['Ansiedad e insomnio', 'Se relacionan con la actividad de los circuitos GABAérgicos.']]),
      sec('Fármacos', 'Fármacos relacionados', ['Benzodiacepinas y barbitúricos: potencian el receptor GABA-A.', 'Vigabatrina: inhibe la GABA transaminasa (antiepiléptico).', 'El alcohol también potencia la transmisión GABAérgica.']),
    ],
    fuentes: ['sp_gaba', 'sp_neurotransmisores', 'msd_convulsiones'],
  }),
  glicina: nt({
    nombre: 'Glicina', clase: 'Aminoácido', efecto: 'Inhibidor', color: '#7ee0b0',
    anim: { receptor: 'ionotropico', ion: 'Cl', signo: -1, terminacion: 'recaptacion', vesicula: 'clara' },
    resumen: 'Neurotransmisor inhibidor principal en la médula espinal y el tallo cerebral. También es coagonista del receptor NMDA de glutamato.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Aminoácido sintetizado a partir de la serina. Lo liberan interneuronas inhibitorias de la médula y del tallo (por ejemplo, las células de Renshaw).'),
      sec('Receptores', 'Receptores', ['Receptor de glicina: ionotrópico, canal de Cl⁻.', 'Sitio coagonista en el receptor NMDA.']),
      sec('Terminación', 'Terminación', 'Recaptación por transportadores de glicina (GlyT).'),
      sec('Función', 'Funciones', ['Inhibición de las motoneuronas y control de los reflejos.']),
      sec('Clínica', 'Desequilibrios', [['Intoxicación por estricnina', 'Bloquea los receptores de glicina: espasmos musculares y convulsiones.'], ['Tétanos', 'La toxina tetánica impide la liberación de glicina y GABA en la médula: rigidez y espasmos.']]),
    ],
    fuentes: ['sp_neurotransmisores', 'libro_kandel'],
  }),
  acetilcolina: nt({
    nombre: 'Acetilcolina', clase: 'Éster de colina', efecto: 'Excitador (nicotínico) · modulador (muscarínico)', color: '#ffd23f',
    anim: { receptor: 'ionotropico', ion: 'Na', signo: 1, terminacion: 'degradacion', vesicula: 'clara' },
    resumen: 'Transmisor de la unión neuromuscular, de los ganglios autónomos y del sistema parasimpático. En el encéfalo participa en la atención, la memoria y la vigilia.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Se forma a partir de colina y acetil-CoA por la colina acetiltransferasa. Neuronas colinérgicas: motoneuronas, neuronas preganglionares autónomas, posganglionares parasimpáticas y núcleo basal de Meynert.'),
      sec('Receptores', 'Receptores', ['Nicotínicos: ionotrópicos (unión neuromuscular y ganglios autónomos).', 'Muscarínicos M1–M5: metabotrópicos (órganos parasimpáticos y encéfalo).']),
      sec('Terminación', 'Terminación', 'La acetilcolinesterasa la degrada en la hendidura a colina y acetato; la colina se recapta para sintetizar más acetilcolina.'),
      sec('Función', 'Funciones', ['Contracción del músculo esquelético.', 'Funciones parasimpáticas: digestión, salivación y disminución de la frecuencia cardiaca.', 'Atención y memoria.']),
      sec('Clínica', 'Desequilibrios', [
        ['Miastenia grave', 'Anticuerpos contra receptores nicotínicos: debilidad muscular fluctuante.'],
        ['Enfermedad de Alzheimer', 'Pérdida de neuronas colinérgicas; se tratan con inhibidores de la colinesterasa (donepezilo).'],
        ['Botulismo', 'La toxina impide la liberación de acetilcolina: parálisis flácida.'],
        ['Intoxicación por organofosforados', 'Inhiben la acetilcolinesterasa: crisis colinérgica.'],
      ]),
    ],
    fuentes: ['sp_colinergicos', 'sp_union_nm', 'sp_sinapsis', 'mp_miastenia', 'mp_alzheimer'],
  }),
  dopamina: nt({
    nombre: 'Dopamina', clase: 'Monoamina (catecolamina)', efecto: 'Modulador (D1 excitador · D2 inhibidor)', color: '#c78bff',
    anim: { receptor: 'metabotropico', ion: 'K', signo: 0, terminacion: 'recaptacion', vesicula: 'clara' },
    resumen: 'Catecolamina clave para el control motor, la motivación y la recompensa. Actúa sobre receptores metabotrópicos, por lo que su efecto es modulador y depende del subtipo de receptor.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Tirosina → L-DOPA → dopamina. Vías principales: nigroestriada (sustancia negra → estriado: movimiento), mesolímbica y mesocortical (área tegmental ventral: recompensa y cognición) y tuberoinfundibular (inhibe la prolactina).'),
      sec('Receptores', 'Receptores', ['D1 y D5: acoplados a Gs; activan la adenilato ciclasa (efecto excitador).', 'D2, D3 y D4: acoplados a Gi; inhiben la adenilato ciclasa (efecto inhibidor).']),
      sec('Terminación', 'Terminación', 'Recaptación por el transportador de dopamina (DAT) y degradación por la MAO y la COMT.'),
      sec('Función', 'Funciones', ['Iniciar y facilitar el movimiento.', 'Motivación, recompensa y aprendizaje por refuerzo.', 'Inhibir la secreción de prolactina.']),
      sec('Clínica', 'Desequilibrios', [
        ['Enfermedad de Parkinson', 'Degeneración de neuronas dopaminérgicas de la sustancia negra.'],
        ['Esquizofrenia', 'El exceso de actividad dopaminérgica mesolímbica se asocia con los síntomas psicóticos (hipótesis dopaminérgica).'],
        ['Adicciones', 'Muchas drogas aumentan la dopamina en la vía de recompensa.'],
      ]),
      sec('Fármacos', 'Fármacos relacionados', ['Levodopa y agonistas dopaminérgicos (Parkinson).', 'Antipsicóticos: bloquean receptores D2.', 'La cocaína bloquea el DAT; las anfetaminas liberan dopamina.']),
    ],
    fuentes: ['sp_dopamina', 'sp_receptores_dopamina', 'msd_parkinson', 'mp_esquizofrenia'],
  }),
  noradrenalina: nt({
    nombre: 'Noradrenalina (norepinefrina)', clase: 'Monoamina (catecolamina)', efecto: 'Modulador', color: '#ff9f43',
    anim: { receptor: 'metabotropico', ion: 'K', signo: 0, terminacion: 'recaptacion', vesicula: 'densa' },
    resumen: 'Transmisor del sistema nervioso simpático y del locus coeruleus. Aumenta el estado de alerta y prepara al organismo para la respuesta de lucha o huida.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Se sintetiza a partir de la dopamina por la dopamina β-hidroxilasa. Neuronas del locus coeruleus (tallo cerebral) y neuronas posganglionares simpáticas.'),
      sec('Receptores', 'Receptores', ['Adrenérgicos α1, α2, β1, β2 y β3, todos metabotrópicos (acoplados a proteínas G).', 'Los α2 presinápticos inhiben su propia liberación (retroalimentación negativa).']),
      sec('Terminación', 'Terminación', 'Recaptación por el transportador de noradrenalina (NET) y degradación por la MAO y la COMT.'),
      sec('Función', 'Funciones', ['Alerta, atención y vigilia.', 'Respuesta al estrés: aumento de la frecuencia cardiaca, la presión arterial y la glucemia.']),
      sec('Clínica', 'Desequilibrios', [['Depresión y ansiedad', 'Se relacionan con alteraciones de la transmisión noradrenérgica.'], ['TDAH', 'Algunos tratamientos actúan sobre la noradrenalina.']]),
      sec('Fármacos', 'Fármacos relacionados', ['Inhibidores de la recaptación de serotonina y noradrenalina (antidepresivos).', 'β-bloqueadores y agonistas α2, como la clonidina (cardiovasculares).']),
    ],
    fuentes: ['sp_catecolaminas', 'sp_neurotransmisores', 'mp_depresion'],
  }),
  serotonina: nt({
    nombre: 'Serotonina (5-HT)', clase: 'Monoamina (indolamina)', efecto: 'Modulador', color: '#4fd1c5',
    anim: { receptor: 'metabotropico', ion: 'K', signo: 0, terminacion: 'recaptacion', vesicula: 'clara' },
    resumen: 'Monoamina derivada del triptófano que modula el estado de ánimo, el sueño, el apetito y el dolor. La mayor parte de la serotonina del cuerpo está en el tubo digestivo.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Triptófano → 5-hidroxitriptófano → serotonina. En el encéfalo la producen los núcleos del rafe del tallo cerebral; la mayor concentración corporal está en las células enterocromafines del intestino y en las plaquetas.'),
      sec('Receptores', 'Receptores', ['Siete familias (5-HT1 a 5-HT7). Todas son metabotrópicas excepto la 5-HT3, que es un canal iónico.']),
      sec('Terminación', 'Terminación', 'Recaptación por el transportador de serotonina (SERT) y degradación por la MAO.'),
      sec('Función', 'Funciones', ['Estado de ánimo y ansiedad.', 'Sueño, apetito y temperatura.', 'Motilidad intestinal, náusea y vómito.']),
      sec('Clínica', 'Desequilibrios', [['Depresión y ansiedad', 'Se tratan con fármacos que aumentan la serotonina sináptica.'], ['Síndrome serotoninérgico', 'El exceso de serotonina causa agitación, hipertermia, temblor y rigidez.']]),
      sec('Fármacos', 'Fármacos relacionados', ['ISRS (fluoxetina, sertralina): bloquean el SERT.', 'Ondansetrón: bloquea los receptores 5-HT3 (antiemético).', 'Triptanes: agonistas 5-HT1B/1D (migraña).']),
    ],
    fuentes: ['sp_serotonina', 'sp_neurotransmisores', 'mp_depresion'],
  }),
  histamina: nt({
    nombre: 'Histamina', clase: 'Monoamina (imidazolamina)', efecto: 'Modulador', color: '#f78fb3',
    anim: { receptor: 'metabotropico', ion: 'K', signo: 0, terminacion: 'degradacion', vesicula: 'clara' },
    resumen: 'En el encéfalo, la histamina procede de neuronas del hipotálamo posterior y mantiene la vigilia. Fuera del SNC es un mediador de la inflamación y la alergia.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Se forma a partir de la histidina. Las neuronas histaminérgicas están en el núcleo tuberomamilar del hipotálamo y proyectan a casi todo el encéfalo.'),
      sec('Receptores', 'Receptores', ['H1 a H4, todos metabotrópicos.', 'El H3 es un autorreceptor presináptico que regula la liberación de histamina y de otros transmisores.']),
      sec('Terminación', 'Terminación', 'Degradación enzimática (en el encéfalo, principalmente por la histamina N-metiltransferasa).'),
      sec('Función', 'Funciones', ['Vigilia y atención.', 'Fuera del SNC: inflamación, alergia y secreción ácida gástrica (H2).']),
      sec('Clínica', 'Relevancia clínica', [['Somnolencia por antihistamínicos', 'Los antihistamínicos H1 de primera generación atraviesan la barrera hematoencefálica y causan sueño.']]),
    ],
    fuentes: ['sp_histamina', 'sp_neurotransmisores'],
  }),
  endorfinas: nt({
    nombre: 'Endorfinas (neuropéptidos opioides)', clase: 'Neuropéptido', efecto: 'Inhibidor / modulador', color: '#ffe08a',
    anim: { receptor: 'metabotropico', ion: 'K', signo: -1, terminacion: 'peptidasas', vesicula: 'densa' },
    resumen: 'Péptidos opioides endógenos (β-endorfina, encefalinas y dinorfinas) que alivian el dolor y participan en la recompensa. Se almacenan en vesículas de núcleo denso y actúan sobre receptores opioides.',
    secciones: [
      sec('Síntesis', 'Síntesis y localización', 'Se sintetizan en el soma como grandes precursores (por ejemplo, la proopiomelanocortina) y viajan por el axón. Se encuentran en el hipotálamo, la hipófisis, la sustancia gris periaqueductal y la médula espinal.'),
      sec('Receptores', 'Receptores', ['Receptores opioides μ, δ y κ, metabotrópicos: inhiben la adenilato ciclasa, abren canales de K⁺ y reducen la entrada de Ca²⁺.']),
      sec('Terminación', 'Terminación', 'No se recaptan: los degradan peptidasas extracelulares.'),
      sec('Función', 'Funciones', ['Analgesia endógena (modulación descendente del dolor).', 'Recompensa y respuesta al estrés.']),
      sec('Clínica', 'Relevancia clínica', [['Opioides', 'La morfina y otros opioides actúan sobre los mismos receptores; producen analgesia, pero también depresión respiratoria y dependencia.'], ['Naloxona', 'Antagonista opioide que revierte la sobredosis.']]),
    ],
    fuentes: ['sp_endorfina', 'sp_neurotransmisores'],
  }),
};

const GRUPOS_NT_ES = [
  { titulo: 'Aminoácidos', ids: ['glutamato', 'gaba', 'glicina'] },
  { titulo: 'Acetilcolina', ids: ['acetilcolina'] },
  { titulo: 'Monoaminas', ids: ['dopamina', 'noradrenalina', 'serotonina', 'histamina'] },
  { titulo: 'Neuropéptidos', ids: ['endorfinas'] },
];

// Pasos de las animaciones de sinapsis (t en segundos de animación a velocidad 1×)
const PASOS_QUIMICA_ES = [
  { t: 0, titulo: 'Llega el potencial de acción', texto: 'El potencial de acción recorre el axón y despolariza la terminal presináptica.' },
  { t: 1.6, titulo: 'Entra Ca²⁺', texto: 'Se abren canales de Ca²⁺ dependientes de voltaje en la zona activa y el Ca²⁺ entra en la terminal.' },
  { t: 3.2, titulo: 'Exocitosis', texto: 'El Ca²⁺ activa la maquinaria de fusión (proteínas SNARE): las vesículas se fusionan con la membrana y liberan el neurotransmisor.' },
  { t: 4.8, titulo: 'Difusión y unión al receptor', texto: 'El neurotransmisor cruza la hendidura sináptica en microsegundos y se une a sus receptores.' },
  { t: 6.4, titulo: 'Respuesta postsináptica', texto: 'Los receptores ionotrópicos abren canales (PEPS o PIPS rápidos); los metabotrópicos activan proteínas G y segundos mensajeros (efecto lento).' },
  { t: 9.0, titulo: 'Terminación de la señal', texto: 'El neurotransmisor se retira por recaptación, degradación enzimática o difusión, lo que permite una nueva transmisión.' },
  { t: 11.4, titulo: 'Reciclaje de vesículas', texto: 'La membrana de las vesículas se recupera por endocitosis y se vuelven a llenar de neurotransmisor.' },
];
export const DURACION_QUIMICA = 13;
const PASOS_ELECTRICA_ES = [
  { t: 0, titulo: 'Llega el potencial de acción', texto: 'La neurona presináptica se despolariza.' },
  { t: 1.6, titulo: 'Los iones cruzan los conexones', texto: 'La corriente iónica pasa directamente al citoplasma de la otra neurona a través de los canales de las uniones en hendidura.' },
  { t: 3.6, titulo: 'Despolarización casi inmediata', texto: 'La neurona postsináptica se despolariza prácticamente sin retraso sináptico.' },
  { t: 5.4, titulo: 'Bidireccional y sincronizante', texto: 'La corriente puede fluir en ambos sentidos, lo que sincroniza la actividad de grupos de neuronas.' },
];
export const DURACION_ELECTRICA = 7.5;

export const TIPOS_NEURONA = ['n_multipolar', 'n_piramidal', 'n_purkinje', 'n_bipolar', 'n_seudounipolar', 'n_anaxonica'];

// Versión en el idioma activo
const porIndice = (base, en) => (EN ? base.map((x, i) => ({ ...x, ...en[i] })) : base);
export const INFO_NEURO = traducir(INFO_NEURO_ES, EN_INFO_NEURO);
export const NEUROTRANSMISORES = traducir(NEUROTRANSMISORES_ES, EN_NEUROTRANSMISORES);
export const GRUPOS_NT = EN ? GRUPOS_NT_ES.map((g, i) => ({ ...g, titulo: EN_GRUPOS_NT[i] })) : GRUPOS_NT_ES;
export const PASOS_QUIMICA = porIndice(PASOS_QUIMICA_ES, EN_PASOS_QUIMICA);
export const PASOS_ELECTRICA = porIndice(PASOS_ELECTRICA_ES, EN_PASOS_ELECTRICA);
export const _ES = { INFO_NEURO_ES, NEUROTRANSMISORES_ES, GRUPOS_NT_ES, PASOS_QUIMICA_ES, PASOS_ELECTRICA_ES };
