// Telencéfalo: división, hemisferios, lóbulos, estructuras profundas y estructuras de cada lóbulo.
export const INFO_TELENCEFALO = {
  // =========================================================================
  // DIVISIÓN
  // =========================================================================
  telencefalo: {
    nombre: 'Telencéfalo',
    tipo: 'División encefálica',
    clase: 'division',
    color: '#e6a99c',
    resumen:
      'Es la porción más grande y evolucionada del encéfalo. Está formado por los dos hemisferios cerebrales, separados por la cisura longitudinal y unidos principalmente por el cuerpo calloso. Es responsable de las funciones mentales superiores: movimiento voluntario, percepción consciente, lenguaje, memoria, razonamiento y emociones. Haz clic en un hemisferio para desglosarlo en lóbulos.',
    ubicacion:
      'Ocupa las fosas craneales anterior y media y la mayor parte de la bóveda craneal, por encima del diencéfalo y del tallo cerebral; la tienda del cerebelo lo separa del cerebelo. Deriva embriológicamente del prosencéfalo. Su superficie es la corteza cerebral (sustancia gris), plegada en giros (circunvoluciones) y surcos que aumentan su área; por debajo está la sustancia blanca y, en la profundidad, los núcleos basales.',
    contenido: [
      'Corteza cerebral: capa de sustancia gris de unos 2–4 mm de espesor, organizada en lóbulos frontal, parietal, temporal, occipital e insular.',
      'Sustancia blanca: fibras de asociación (unen áreas del mismo hemisferio), comisurales (cuerpo calloso) y de proyección (cápsula interna).',
      'Núcleos (ganglios) basales: núcleo caudado, putamen y globo pálido.',
      'Estructuras del sistema límbico: hipocampo, amígdala y giro del cíngulo.',
      'Ventrículos laterales, con líquido cefalorraquídeo.',
      'Bulbos y tractos olfatorios.',
    ],
    funciones: [
      'Planificación y ejecución del movimiento voluntario.',
      'Percepción consciente de las sensaciones (somáticas, visuales, auditivas, gustativas y olfatorias).',
      'Lenguaje: comprensión y expresión.',
      'Memoria, aprendizaje y atención.',
      'Funciones ejecutivas: planificación, juicio, toma de decisiones y control de impulsos.',
      'Procesamiento de las emociones y regulación de la conducta social.',
    ],
    irrigacion:
      'Arterias cerebrales anterior y media (ramas de la carótida interna) y arteria cerebral posterior (rama de la basilar). La arteria cerebral media irriga la mayor parte de la cara lateral de los hemisferios; las ramas lenticuloestriadas irrigan los núcleos basales y la cápsula interna.',
    padecimientos: [
      ['Accidente cerebrovascular', 'La causa más frecuente de déficit focal: hemiparesia, afasia, negligencia o pérdida de campo visual según la arteria afectada.'],
      ['Epilepsia', 'Muchas epilepsias focales se originan en la corteza, sobre todo en el lóbulo temporal.'],
      ['Enfermedad de Alzheimer y otras demencias', 'Degeneración progresiva de la corteza y del hipocampo.'],
      ['Esclerosis múltiple', 'Lesiones desmielinizantes en la sustancia blanca, frecuentes alrededor de los ventrículos y en el cuerpo calloso.'],
      ['Tumores (gliomas, meningiomas, metástasis)', 'Producen síntomas según su localización, crisis convulsivas o hipertensión intracraneal.'],
      ['Traumatismo craneoencefálico', 'Las contusiones afectan con frecuencia los polos frontales y temporales.'],
    ],
    siFalla: [
      'Debilidad o parálisis del lado opuesto del cuerpo (hemiparesia contralateral).',
      'Pérdida de sensibilidad contralateral.',
      'Trastornos del lenguaje (afasias), de la memoria y de la atención.',
      'Cambios de personalidad y de conducta.',
      'Pérdida de parte del campo visual.',
    ],
    dato:
      'Cada hemisferio controla principalmente la mitad opuesta del cuerpo, porque la mayoría de las vías motoras y sensitivas se cruzan (decusan) en el tallo cerebral o la médula espinal.',
    fuentes: ['sp_corteza', 'sp_hemisferio', 'sp_funciones_corteza', 'sp_irrigacion', 'msd_funcion_cerebral', 'msd_localizacion', 'libro_snell'],
  },

  // =========================================================================
  // HEMISFERIOS
  // =========================================================================
  hemisferio_izq: {
    nombre: 'Hemisferio cerebral izquierdo',
    tipo: 'Hemisferio',
    clase: 'unidad',
    color: '#6e9ce8',
    resumen:
      'Cada hemisferio es una mitad del telencéfalo con la misma organización en lóbulos, pero con especializaciones funcionales (lateralización). En la gran mayoría de las personas el hemisferio izquierdo es el dominante para el lenguaje. Controla los movimientos y recibe la sensibilidad del lado derecho del cuerpo. Selecciona un lóbulo para ver su información.',
    ubicacion:
      'Ocupa la mitad izquierda de la cavidad craneal. Se separa del hemisferio derecho por la cisura longitudinal (donde se introduce la hoz del cerebro) y se une a él por el cuerpo calloso y otras comisuras. Sus límites principales son el surco central (de Rolando), el surco lateral (de Silvio) y el surco parietooccipital, que lo dividen en lóbulos.',
    contenido: [
      'Lóbulos frontal, parietal, temporal, occipital e ínsula.',
      'Áreas del lenguaje (en el hemisferio dominante): área de Broca (expresión) y área de Wernicke (comprensión), unidas por el fascículo arqueado.',
      'Núcleos basales y estructuras límbicas izquierdas.',
    ],
    funciones: [
      'Lenguaje en el hemisferio dominante: producción, comprensión, lectura y escritura. El hemisferio izquierdo es dominante en más del 90 % de las personas diestras y en la mayoría de las zurdas.',
      'Cálculo y procesamiento secuencial y analítico.',
      'Praxias: planificación de gestos y movimientos aprendidos.',
      'Control motor y sensibilidad de la mitad derecha del cuerpo.',
      'Procesamiento del campo visual derecho.',
    ],
    irrigacion: 'Arterias cerebrales anterior, media y posterior izquierdas.',
    padecimientos: [
      ['ACV de la arteria cerebral media izquierda', 'Hemiparesia derecha de predominio facio-braquial con afasia.'],
      ['Afasias', 'Broca (no fluente), Wernicke (fluente con mala comprensión), de conducción y global.'],
      ['Síndrome de Gerstmann', 'Por lesión del lóbulo parietal dominante: agrafia, acalculia, agnosia digital y desorientación derecha-izquierda.'],
      ['Apraxia ideomotora', 'Dificultad para ejecutar gestos aprendidos a la orden.'],
    ],
    siFalla: [
      'Debilidad y pérdida de sensibilidad en el lado derecho del cuerpo.',
      'Afasia: dificultad para hablar, comprender, leer o escribir.',
      'Dificultad para el cálculo y para realizar gestos aprendidos (apraxia).',
      'Pérdida del campo visual derecho (hemianopsia homónima derecha).',
    ],
    dato:
      'La dominancia del lenguaje no depende solo de la lateralidad manual: una proporción importante de personas zurdas también tiene el lenguaje en el hemisferio izquierdo.',
    fuentes: ['sp_hemisferio', 'sp_funciones_corteza', 'msd_afasia', 'msd_funcion_cerebral', 'msd_localizacion', 'libro_kandel'],
  },
  hemisferio_der: {
    nombre: 'Hemisferio cerebral derecho',
    tipo: 'Hemisferio',
    clase: 'unidad',
    color: '#ec8a6c',
    resumen:
      'Mitad derecha del telencéfalo. Comparte la organización en lóbulos con el izquierdo, pero en la mayoría de las personas predomina en las funciones visuoespaciales, la atención espacial, el reconocimiento de rostros y los componentes emocionales del lenguaje (prosodia). Controla los movimientos y recibe la sensibilidad del lado izquierdo del cuerpo. Selecciona un lóbulo para ver su información.',
    ubicacion:
      'Ocupa la mitad derecha de la cavidad craneal. Está separado del hemisferio izquierdo por la cisura longitudinal y unido a él por el cuerpo calloso. Los surcos central, lateral y parietooccipital delimitan sus lóbulos.',
    contenido: [
      'Lóbulos frontal, parietal, temporal, occipital e ínsula.',
      'Redes de atención espacial (predominio parietal derecho).',
      'Núcleos basales y estructuras límbicas derechas.',
    ],
    funciones: [
      'Procesamiento visuoespacial: orientación, relaciones espaciales y construcción (dibujo, armado).',
      'Atención dirigida a ambos lados del espacio.',
      'Reconocimiento de rostros y de expresiones emocionales.',
      'Prosodia: entonación y contenido emocional del habla.',
      'Control motor y sensibilidad de la mitad izquierda del cuerpo; procesamiento del campo visual izquierdo.',
    ],
    irrigacion: 'Arterias cerebrales anterior, media y posterior derechas.',
    padecimientos: [
      ['ACV de la arteria cerebral media derecha', 'Hemiparesia izquierda con heminegligencia y anosognosia.'],
      ['Heminegligencia izquierda', 'La persona ignora el lado izquierdo del espacio y de su cuerpo.'],
      ['Anosognosia', 'Falta de conciencia del propio déficit (p. ej., no reconoce su parálisis).'],
      ['Apraxia del vestir y apraxia construccional', 'Dificultad para vestirse o para copiar dibujos.'],
    ],
    siFalla: [
      'Debilidad y pérdida de sensibilidad en el lado izquierdo del cuerpo.',
      'Negligencia del espacio izquierdo, con frecuencia sin conciencia del problema.',
      'Desorientación espacial y dificultades para dibujar o vestirse.',
      'Habla monótona o dificultad para captar el tono emocional (aprosodia).',
    ],
    dato:
      'La heminegligencia es más frecuente y grave tras lesiones del hemisferio derecho, porque este atiende a ambos hemiespacios, mientras que el izquierdo atiende sobre todo al derecho.',
    fuentes: ['sp_hemisferio', 'sp_funciones_corteza', 'msd_funcion_cerebral', 'msd_localizacion', 'libro_kandel'],
  },

  // =========================================================================
  // LÓBULOS
  // =========================================================================
  lobulo_frontal: {
    nombre: 'Lóbulo frontal',
    tipo: 'Lóbulo cerebral',
    clase: 'parte',
    color: '#5b8def',
    resumen:
      'Es el lóbulo más grande de cada hemisferio. Controla el movimiento voluntario y alberga las funciones ejecutivas: planificar, tomar decisiones, mantener información en la memoria de trabajo, controlar impulsos y regular la conducta social y la personalidad. En el hemisferio dominante contiene el área de Broca, esencial para la expresión del lenguaje.',
    ubicacion:
      'Porción anterior del hemisferio, por delante del surco central (de Rolando) y por encima del surco lateral (de Silvio). Presenta una cara lateral (giros frontal superior, medio e inferior y giro precentral), una cara medial (giro frontal medial y parte anterior del giro del cíngulo) y una cara inferior u orbitaria, apoyada sobre el techo de las órbitas.',
    contenido: [
      'Corteza motora primaria (giro precentral, área 4 de Brodmann).',
      'Corteza premotora y área motora suplementaria (área 6).',
      'Campo ocular frontal (área 8).',
      'Área de Broca (áreas 44 y 45, giro frontal inferior del hemisferio dominante).',
      'Corteza prefrontal: dorsolateral, orbitofrontal y medial.',
      'Lobulillo paracentral (cara medial): representación motora de la pierna y control voluntario de la micción.',
    ],
    funciones: [
      'Inicio, planificación y ejecución de los movimientos voluntarios del lado contralateral.',
      'Producción del lenguaje (hemisferio dominante).',
      'Funciones ejecutivas: planificación, organización, flexibilidad mental y resolución de problemas.',
      'Memoria de trabajo (mantener y manipular información por segundos).',
      'Control de impulsos, juicio y conducta social; personalidad.',
      'Motivación, iniciativa y atención.',
      'Movimientos oculares voluntarios (sacadas).',
    ],
    irrigacion:
      'Arteria cerebral media (cara lateral) y arteria cerebral anterior (cara medial y parte de la orbitaria), ambas ramas de la carótida interna.',
    padecimientos: [
      ['ACV de la arteria cerebral media o anterior', 'Debilidad contralateral; en la ACA predomina en la pierna.'],
      ['Demencia frontotemporal', 'Degeneración frontal y temporal con desinhibición, apatía y cambios de conducta.'],
      ['Traumatismo craneoencefálico', 'Las contusiones frontales son frecuentes y alteran la conducta y las funciones ejecutivas.'],
      ['Tumores', 'Gliomas y meningiomas pueden manifestarse con cambios de personalidad antes que con déficits motores.'],
      ['Epilepsia del lóbulo frontal', 'Crisis breves, a menudo nocturnas, con actividad motora llamativa.'],
      ['Síndrome del lóbulo frontal', 'Conjunto de alteraciones conductuales y ejecutivas por disfunción de las redes frontales y subcorticales.'],
    ],
    siFalla: [
      'Debilidad o parálisis del lado opuesto del cuerpo (lesión de la corteza motora).',
      'Afasia de Broca: habla no fluente, esforzada, con comprensión relativamente conservada (hemisferio dominante).',
      'Apatía, falta de iniciativa y respuestas lentas (lesión medial).',
      'Desinhibición, impulsividad, labilidad emocional y conducta social inapropiada (lesión orbitofrontal).',
      'Dificultad para planificar, organizarse y mantener información en mente (lesión dorsolateral).',
      'Desviación de la mirada hacia el lado de la lesión e incontinencia urinaria.',
    ],
    dato:
      'El caso de Phineas Gage (1848), un obrero cuya corteza frontal fue atravesada por una barra de hierro, mostró por primera vez que el lóbulo frontal es clave para la personalidad y la conducta social.',
    fuentes: ['sp_frontal', 'sp_corteza', 'sp_sindrome_frontal', 'msd_funcion_cerebral', 'msd_localizacion', 'msd_afasia', 'msd_dft'],
  },
  lobulo_parietal: {
    nombre: 'Lóbulo parietal',
    tipo: 'Lóbulo cerebral',
    clase: 'parte',
    color: '#f2c14e',
    resumen:
      'Procesa la sensibilidad del cuerpo (tacto, presión, temperatura, dolor y posición) y la integra con la visión y la audición para construir una representación del cuerpo y del espacio. Es esencial para la atención espacial, la orientación, la manipulación de objetos y, en el hemisferio dominante, para la lectura, la escritura y el cálculo.',
    ubicacion:
      'Por detrás del surco central y por delante del surco parietooccipital; por debajo limita con el lóbulo temporal a nivel del surco lateral. Su cara lateral comprende el giro poscentral, el lobulillo parietal superior y el lobulillo parietal inferior (giros supramarginal y angular), separados por el surco intraparietal. En la cara medial se encuentra el precúneo.',
    contenido: [
      'Corteza somatosensorial primaria (giro poscentral, áreas 3, 1 y 2).',
      'Lobulillo parietal superior (áreas 5 y 7).',
      'Giro supramarginal (área 40).',
      'Giro angular (área 39).',
      'Precúneo (cara medial).',
    ],
    funciones: [
      'Percepción de la sensibilidad somática del lado opuesto del cuerpo.',
      'Discriminación táctil: reconocer objetos por el tacto (estereognosia), grafestesia y discriminación de dos puntos.',
      'Esquema corporal y conciencia de la posición de las extremidades.',
      'Atención y orientación espacial; guía visual de los movimientos (alcanzar y tomar objetos).',
      'Lectura, escritura y cálculo (hemisferio dominante).',
      'Praxias: planificación de gestos aprendidos.',
    ],
    irrigacion:
      'Arteria cerebral media (cara lateral), arteria cerebral anterior (cara medial anterior) y ramas de la arteria cerebral posterior (parte posterior medial).',
    padecimientos: [
      ['ACV parietal', 'Pérdida sensitiva contralateral, heminegligencia o síndrome de Gerstmann según el hemisferio.'],
      ['Síndrome de Gerstmann', 'Agrafia, acalculia, agnosia digital y desorientación derecha-izquierda (parietal dominante).'],
      ['Heminegligencia', 'Más frecuente con lesiones parietales derechas.'],
      ['Enfermedad de Alzheimer', 'La corteza parietal posterior y el precúneo se afectan de forma temprana.'],
      ['Crisis focales sensitivas', 'Hormigueo o sensaciones anormales en una parte del cuerpo.'],
    ],
    siFalla: [
      'Pérdida de la sensibilidad fina y de la posición en el lado opuesto; incapacidad para reconocer objetos por el tacto (astereognosia).',
      'Heminegligencia: ignorar un lado del espacio o del propio cuerpo; anosognosia.',
      'Apraxias: dificultad para realizar gestos, vestirse o copiar dibujos.',
      'Agrafia, alexia y acalculia (hemisferio dominante).',
      'Cuadrantanopsia homónima inferior contralateral por afectación de las radiaciones ópticas.',
    ],
    dato:
      'En el giro poscentral el cuerpo está representado de forma desproporcionada (homúnculo sensitivo): la mano, los labios y la lengua ocupan áreas muy grandes porque tienen gran densidad de receptores.',
    fuentes: ['sp_hemisferio', 'sp_corteza', 'sp_funciones_corteza', 'msd_funcion_cerebral', 'msd_localizacion', 'mp_apraxia', 'libro_purves'],
  },
  lobulo_temporal: {
    nombre: 'Lóbulo temporal',
    tipo: 'Lóbulo cerebral',
    clase: 'parte',
    color: '#5cc28a',
    resumen:
      'Interviene en la audición, la comprensión del lenguaje, la memoria y las emociones, así como en el reconocimiento visual de objetos y rostros. Su porción medial contiene el hipocampo y la amígdala, piezas centrales del sistema límbico.',
    ubicacion:
      'Por debajo del surco lateral (de Silvio), por delante del lóbulo occipital y por detrás del frontal. Su cara lateral tiene los giros temporal superior, medio e inferior; en la cara superior, oculta dentro del surco lateral, están los giros transversos de Heschl. La cara inferior contiene el giro fusiforme y el giro parahipocampal, que termina por delante en el uncus.',
    contenido: [
      'Corteza auditiva primaria (giros transversos de Heschl, áreas 41 y 42).',
      'Área de Wernicke (porción posterior del giro temporal superior, área 22, hemisferio dominante).',
      'Giros temporales medio e inferior y giro fusiforme (vía visual ventral).',
      'Hipocampo y amígdala (lóbulo temporal medial).',
      'Giro parahipocampal, uncus y corteza olfatoria.',
    ],
    funciones: [
      'Audición: percepción de tono, intensidad y localización de los sonidos.',
      'Comprensión del lenguaje hablado y escrito (hemisferio dominante).',
      'Memoria declarativa: formación de nuevos recuerdos de hechos y experiencias (hipocampo).',
      'Procesamiento emocional, en particular del miedo (amígdala).',
      'Reconocimiento de objetos, rostros y palabras escritas (vía visual ventral).',
      'Olfato (uncus y corteza piriforme).',
    ],
    irrigacion:
      'Arteria cerebral media (cara lateral), arteria cerebral posterior (caras inferior y medial) y arteria coroidea anterior (parte del hipocampo y la amígdala).',
    padecimientos: [
      ['Epilepsia del lóbulo temporal', 'Es la epilepsia focal más frecuente en adultos; suele asociarse a esclerosis del hipocampo y cursar con sensación de déjà vu, miedo o malestar epigástrico.'],
      ['Enfermedad de Alzheimer', 'La atrofia del hipocampo es uno de sus signos más precoces.'],
      ['Encefalitis por virus del herpes simple', 'Tiene predilección por los lóbulos temporales.'],
      ['Demencia frontotemporal (variante semántica)', 'Pérdida progresiva del significado de las palabras.'],
      ['ACV de la arteria cerebral media o posterior', 'Afasia de Wernicke o alteraciones de memoria y visión.'],
    ],
    siFalla: [
      'Afasia de Wernicke: habla fluida pero con palabras incorrectas y mala comprensión (hemisferio dominante).',
      'Amnesia anterógrada: incapacidad para formar nuevos recuerdos (lesión bilateral del hipocampo).',
      'Cuadrantanopsia homónima superior contralateral (asa de Meyer de las radiaciones ópticas).',
      'Dificultad para reconocer rostros (prosopagnosia) u objetos.',
      'Sordera cortical si la lesión auditiva es bilateral.',
      'Síndrome de Klüver-Bucy por lesión bilateral anterior: hiperoralidad, hipersexualidad y pérdida del miedo.',
    ],
    dato:
      'Cada corteza auditiva recibe información de ambos oídos, por lo que una lesión unilateral rara vez causa sordera.',
    fuentes: ['sp_temporal', 'sp_corteza', 'sp_limbico', 'msd_funcion_cerebral', 'msd_localizacion', 'msd_convulsiones', 'msd_afasia', 'oms_epilepsia'],
  },
  lobulo_occipital: {
    nombre: 'Lóbulo occipital',
    tipo: 'Lóbulo cerebral',
    clase: 'parte',
    color: '#e8735a',
    resumen:
      'Es el centro del procesamiento visual y el más pequeño de los cuatro lóbulos principales. Recibe la información de la retina (a través del tálamo) y analiza forma, color, movimiento y profundidad. Desde aquí la información visual se distribuye hacia el lóbulo parietal ("¿dónde está?") y hacia el temporal ("¿qué es?").',
    ubicacion:
      'Polo posterior del hemisferio, por detrás del surco parietooccipital (claramente visible en la cara medial) y de una línea imaginaria hasta la escotadura preoccipital. En la cara medial, el surco calcarino lo divide en el cuneus (arriba) y el giro lingual (abajo). Descansa sobre la tienda del cerebelo.',
    contenido: [
      'Corteza visual primaria (V1, área 17 o corteza estriada), a ambos lados del surco calcarino.',
      'Cortezas visuales de asociación (áreas 18 y 19: V2, V3, V4, V5/MT).',
      'Cuneus y giro lingual (cara medial).',
    ],
    funciones: [
      'Percepción visual consciente del campo visual contralateral.',
      'Análisis de forma, contraste y orientación de los estímulos (V1).',
      'Percepción del color (V4) y del movimiento (V5/MT).',
      'Integración visual para el reconocimiento y la orientación espacial.',
      'Reflejos visuales de fijación y seguimiento (en conexión con el mesencéfalo).',
    ],
    irrigacion:
      'Principalmente la arteria cerebral posterior (arteria calcarina). El polo occipital, donde se representa la mácula, puede recibir colaterales de la arteria cerebral media, lo que explica la "preservación macular" en algunos infartos.',
    padecimientos: [
      ['ACV de la arteria cerebral posterior', 'Hemianopsia homónima contralateral, a menudo con preservación macular.'],
      ['Ceguera cortical', 'Por lesión occipital bilateral (p. ej., oclusión del tope de la basilar); puede acompañarse de negación de la ceguera (síndrome de Anton).'],
      ['Migraña con aura visual', 'Destellos o líneas en zigzag originados en la corteza occipital.'],
      ['Epilepsia occipital', 'Crisis con alucinaciones visuales elementales (luces, colores).'],
      ['Tumores y traumatismos occipitales', 'Defectos del campo visual según la zona afectada.'],
    ],
    siFalla: [
      'Hemianopsia homónima: pérdida de la misma mitad del campo visual en ambos ojos (del lado opuesto a la lesión).',
      'Cuadrantanopsia: pérdida de un cuarto del campo visual (lesión del cuneus o del giro lingual).',
      'Ceguera cortical si la lesión es bilateral, con reflejos pupilares conservados.',
      'Agnosia visual, acromatopsia (no ver colores) o acinetopsia (no percibir el movimiento).',
      'Alucinaciones visuales.',
    ],
    dato:
      'La mácula (visión central y detallada) ocupa una porción desproporcionadamente grande de la corteza visual primaria, en el polo occipital.',
    fuentes: ['sp_occipital', 'sp_corteza', 'sp_irrigacion', 'msd_funcion_cerebral', 'msd_localizacion', 'libro_purves'],
  },
  insula: {
    nombre: 'Ínsula (lóbulo insular)',
    tipo: 'Lóbulo cerebral',
    clase: 'parte',
    color: '#b07cd8',
    resumen:
      'Lóbulo oculto en la profundidad del surco lateral, cubierto por porciones de los lóbulos frontal, parietal y temporal (opérculos). Integra las señales del interior del cuerpo (interocepción) con las emociones, y participa en el gusto, el dolor, la regulación autonómica y la planificación articulatoria del habla. En el modelo se aprecia al desglosar los lóbulos.',
    ubicacion:
      'En el fondo del surco lateral (de Silvio), rodeada por el surco circular. El surco central de la ínsula la divide en una porción anterior (giros cortos) y otra posterior (giros largos). Por debajo de ella, separadas por la cápsula extrema, el claustro y la cápsula externa, se encuentra el núcleo lenticular.',
    contenido: [
      'Giros cortos (ínsula anterior).',
      'Giros largos (ínsula posterior).',
      'Corteza gustativa primaria (ínsula anterior y opérculo frontal).',
    ],
    funciones: [
      'Interocepción: percepción consciente del estado del cuerpo (latido cardíaco, respiración, hambre, sed).',
      'Gusto (corteza gustativa primaria).',
      'Procesamiento del dolor y de la temperatura.',
      'Regulación autonómica (cardiovascular y visceral).',
      'Emociones como el asco y la empatía; conciencia emocional.',
      'Planificación motora del habla (ínsula anterior izquierda).',
    ],
    irrigacion: 'Segmento insular (M2) de la arteria cerebral media, que discurre sobre su superficie.',
    padecimientos: [
      ['ACV de la arteria cerebral media', 'La pérdida de la diferenciación del "ribete insular" en la tomografía es un signo temprano de isquemia.'],
      ['Gliomas insulares', 'La ínsula es una localización frecuente de gliomas de bajo grado.'],
      ['Epilepsia insular', 'Crisis con síntomas viscerales, gustativos o dolorosos que pueden simular otras epilepsias.'],
      ['Demencia frontotemporal (variante conductual)', 'Suele mostrar atrofia insular anterior.'],
    ],
    siFalla: [
      'Alteraciones del gusto.',
      'Inestabilidad autonómica, incluidas arritmias cardiacas tras ACV insular.',
      'Alteraciones en la percepción del dolor y la temperatura.',
      'Apraxia del habla (dificultad para coordinar la articulación).',
      'Menor reconocimiento de emociones como el asco.',
    ],
    dato: 'Durante el desarrollo fetal, la ínsula queda cubierta porque los lóbulos vecinos crecen más rápido y la "envuelven".',
    fuentes: ['sp_corteza', 'sp_acm', 'sp_hemisferio', 'msd_dft', 'libro_kandel'],
  },

  // =========================================================================
  // ESTRUCTURAS PROFUNDAS
  // =========================================================================
  cuerpo_calloso: {
    nombre: 'Cuerpo calloso',
    tipo: 'Comisura (sustancia blanca)',
    clase: 'parte',
    profunda: true,
    color: '#ecd9b4',
    resumen:
      'Es la principal comisura del encéfalo: un gran haz de fibras de sustancia blanca que conecta los dos hemisferios y permite que compartan información.',
    ubicacion:
      'En el fondo de la cisura longitudinal, formando el techo de los ventrículos laterales. De adelante hacia atrás se divide en rostro, rodilla (genu), cuerpo y esplenio.',
    contenido: [
      'Rodilla: une las cortezas prefrontales.',
      'Cuerpo: une áreas motoras, sensitivas y de asociación.',
      'Esplenio: une las cortezas occipitales y temporales (información visual).',
    ],
    funciones: [
      'Transferencia de información sensitiva, motora y cognitiva entre hemisferios.',
      'Coordinación bimanual.',
      'Integración del lenguaje (hemisferio izquierdo) con la información percibida por el hemisferio derecho.',
    ],
    irrigacion: 'Ramas pericallosas de la arteria cerebral anterior; el esplenio, ramas de la arteria cerebral posterior.',
    padecimientos: [
      ['Esclerosis múltiple', 'Es la patología más frecuente del cuerpo calloso: placas desmielinizantes en él y en la región pericallosa.'],
      ['Agenesia del cuerpo calloso', 'Ausencia congénita total o parcial.'],
      ['Callosotomía', 'Sección quirúrgica empleada en algunas epilepsias graves para evitar la propagación de crisis.'],
      ['Glioblastoma "en alas de mariposa"', 'Tumor que cruza la línea media a través del cuerpo calloso.'],
    ],
    siFalla: [
      'Síndrome de desconexión: incapacidad para nombrar objetos sostenidos con la mano izquierda sin verlos.',
      'Apraxia de la mano izquierda y fenómeno de la "mano ajena".',
      'Alexia sin agrafia (lesión del esplenio junto con la corteza occipital izquierda).',
    ],
    fuentes: ['sp_cuerpo_calloso', 'sp_ventriculos', 'libro_kandel'],
  },
  nucleo_caudado: {
    nombre: 'Núcleo caudado',
    tipo: 'Núcleo basal',
    clase: 'parte',
    profunda: true,
    color: '#4fb3bf',
    resumen:
      'Núcleo basal en forma de "C" que, junto con el putamen, forma el cuerpo estriado, la principal puerta de entrada de los núcleos basales. Participa en el control del movimiento, el aprendizaje por recompensa y funciones cognitivas y conductuales.',
    ubicacion:
      'Su cabeza abomba la pared lateral del asta anterior del ventrículo lateral; el cuerpo y la cola siguen la curvatura del ventrículo hasta el techo del asta temporal. Está separado del núcleo lenticular por el brazo anterior de la cápsula interna.',
    contenido: ['Cabeza, cuerpo y cola.', 'Neuronas espinosas medianas GABAérgicas que reciben aferencias de la corteza y dopamina de la sustancia negra.'],
    funciones: [
      'Selección y modulación de los movimientos voluntarios (circuitos corteza–núcleos basales–tálamo–corteza).',
      'Aprendizaje de hábitos y aprendizaje basado en la recompensa.',
      'Funciones ejecutivas y control de la conducta (circuitos prefrontales).',
    ],
    irrigacion: 'Arterias lenticuloestriadas (de la arteria cerebral media) y arteria recurrente de Heubner (de la cerebral anterior).',
    padecimientos: [
      ['Enfermedad de Huntington', 'Enfermedad hereditaria con atrofia del caudado: corea, alteraciones psiquiátricas y demencia.'],
      ['Infartos lacunares', 'Por oclusión de las arterias perforantes.'],
      ['Trastorno obsesivo-compulsivo', 'Se han descrito alteraciones de los circuitos fronto-estriatales.'],
    ],
    siFalla: ['Movimientos involuntarios (corea).', 'Apatía, abulia y cambios de conducta.', 'Deterioro de las funciones ejecutivas.'],
    fuentes: ['sp_ganglios_basales', 'sp_extrapiramidal', 'mp_huntington', 'libro_purves'],
  },
  putamen: {
    nombre: 'Putamen',
    tipo: 'Núcleo basal',
    clase: 'parte',
    profunda: true,
    color: '#e48fb4',
    resumen:
      'Porción lateral del núcleo lenticular y parte del cuerpo estriado. Recibe sobre todo aferencias de las cortezas motoras y es clave en el control motor y el aprendizaje de habilidades motoras.',
    ubicacion:
      'Lateral al globo pálido (con el que forma el núcleo lenticular) y medial a la cápsula externa, el claustro y la ínsula. La cápsula interna lo separa del tálamo y del caudado.',
    contenido: ['Neuronas espinosas medianas que expresan receptores dopaminérgicos D1 y D2.', 'Interneuronas colinérgicas.'],
    funciones: [
      'Regulación de la amplitud y velocidad de los movimientos.',
      'Aprendizaje y automatización de secuencias motoras.',
      'Integración de la información de la corteza con la dopamina de la sustancia negra.',
    ],
    irrigacion: 'Arterias lenticuloestriadas de la arteria cerebral media.',
    padecimientos: [
      ['Enfermedad de Parkinson', 'La pérdida de dopamina afecta sobre todo al putamen.'],
      ['Hemorragia intracerebral hipertensiva', 'El putamen es su localización más frecuente.'],
      ['Enfermedad de Wilson', 'Depósito de cobre que puede dañar el putamen.'],
    ],
    siFalla: [
      'Lentitud y pobreza de movimientos (bradicinesia), rigidez o, por el contrario, movimientos involuntarios y distonía.',
      'En una hemorragia: hemiparesia contralateral por compresión de la cápsula interna.',
    ],
    fuentes: ['sp_ganglios_basales', 'sp_capsula_interna', 'msd_parkinson', 'libro_purves'],
  },
  globo_palido: {
    nombre: 'Globo pálido',
    tipo: 'Núcleo basal',
    clase: 'parte',
    profunda: true,
    color: '#c9a0f0',
    resumen:
      'Porción medial del núcleo lenticular. Su segmento interno es, junto con la sustancia negra reticulada, la principal salida inhibitoria (GABAérgica) de los núcleos basales hacia el tálamo.',
    ubicacion: 'Medial al putamen y lateral al brazo posterior de la cápsula interna. Se divide en segmentos externo (GPe) e interno (GPi).',
    contenido: ['Segmento externo (vía indirecta).', 'Segmento interno (salida principal hacia el tálamo).'],
    funciones: [
      'Regulación de los movimientos voluntarios: facilitar los deseados y suprimir los no deseados.',
      'Modulación del tono muscular.',
    ],
    irrigacion: 'Arterias lenticuloestriadas (ACM) y arteria coroidea anterior.',
    padecimientos: [
      ['Intoxicación por monóxido de carbono', 'Puede causar necrosis bilateral del globo pálido y parkinsonismo irreversible.'],
      ['Distonías', 'El GPi es diana de la estimulación cerebral profunda.'],
      ['Enfermedad de Parkinson avanzada', 'La estimulación cerebral profunda del GPi mejora síntomas motores.'],
    ],
    siFalla: ['Parkinsonismo (rigidez, lentitud).', 'Distonía (contracciones musculares sostenidas).'],
    fuentes: ['sp_globo_palido', 'sp_ganglios_basales', 'msd_parkinsonismo'],
  },
  hipocampo: {
    nombre: 'Hipocampo',
    tipo: 'Estructura límbica',
    clase: 'parte',
    profunda: true,
    color: '#ffb347',
    resumen:
      'Estructura curva con forma de caballito de mar, situada en el lóbulo temporal medial. Es indispensable para convertir las experiencias recientes en recuerdos duraderos (memoria declarativa) y para la navegación espacial.',
    ubicacion:
      'En el suelo del asta temporal del ventrículo lateral, en la cara medial del lóbulo temporal. Su principal vía de salida es el fórnix, que se arquea bajo el cuerpo calloso hasta los cuerpos mamilares.',
    contenido: ['Cuerno de Amón (CA1–CA4), giro dentado y subículo.', 'Forma parte del circuito de Papez: hipocampo → fórnix → cuerpos mamilares → tálamo anterior → giro del cíngulo.'],
    funciones: [
      'Consolidación de la memoria declarativa (episódica y semántica).',
      'Memoria y orientación espacial ("células de lugar").',
      'Regulación de la respuesta al estrés (conexiones con el hipotálamo).',
    ],
    irrigacion: 'Ramas de la arteria cerebral posterior y de la arteria coroidea anterior.',
    padecimientos: [
      ['Enfermedad de Alzheimer', 'La atrofia del hipocampo es precoz y explica la pérdida de memoria reciente.'],
      ['Esclerosis temporal mesial', 'Causa frecuente de epilepsia del lóbulo temporal resistente a fármacos.'],
      ['Hipoxia-isquemia', 'La región CA1 es especialmente vulnerable a la falta de oxígeno.'],
      ['Encefalitis herpética', 'Daña el lóbulo temporal medial.'],
    ],
    siFalla: [
      'Amnesia anterógrada: incapacidad de formar nuevos recuerdos declarativos, con conservación de la memoria de habilidades.',
      'Desorientación espacial.',
    ],
    dato:
      'El paciente H. M. perdió la capacidad de formar nuevos recuerdos tras la extirpación bilateral del lóbulo temporal medial en 1953; su caso, descrito por Scoville y Milner, demostró el papel del hipocampo en la memoria.',
    fuentes: ['sp_limbico', 'sp_temporal', 'pm_scoville', 'mp_demencia', 'msd_convulsiones'],
  },
  amigdala: {
    nombre: 'Amígdala (cuerpo amigdalino)',
    tipo: 'Estructura límbica',
    clase: 'parte',
    profunda: true,
    color: '#ff6f61',
    resumen:
      'Conjunto de núcleos con forma de almendra en la parte anterior del lóbulo temporal medial. Evalúa el significado emocional de los estímulos, sobre todo las amenazas, y coordina las respuestas de miedo.',
    ubicacion: 'En el polo temporal medial, por delante del hipocampo y del extremo del asta temporal del ventrículo lateral, por debajo del uncus.',
    contenido: ['Núcleos basolaterales (reciben información sensorial y cortical).', 'Núcleo central (envía órdenes al hipotálamo y al tallo cerebral).'],
    funciones: [
      'Detección de amenazas y generación de la respuesta de miedo.',
      'Memoria emocional: refuerza el recuerdo de experiencias con carga emocional.',
      'Respuestas autonómicas y endocrinas al estrés (vía hipotálamo).',
      'Reconocimiento de expresiones faciales y conducta social.',
    ],
    irrigacion: 'Arteria coroidea anterior y ramas de la arteria cerebral media y posterior.',
    padecimientos: [
      ['Trastornos de ansiedad y estrés postraumático', 'Se asocian con hiperactividad de la amígdala.'],
      ['Epilepsia del lóbulo temporal', 'Las crisis pueden comenzar con una sensación súbita de miedo.'],
      ['Síndrome de Klüver-Bucy', 'Lesión bilateral: pérdida del miedo, docilidad, hiperoralidad e hipersexualidad.'],
    ],
    siFalla: ['Disminución del miedo y de la percepción del peligro.', 'Dificultad para reconocer el miedo en los rostros ajenos.', 'Aplanamiento emocional.'],
    fuentes: ['sp_limbico', 'sp_temporal', 'libro_kandel'],
  },

  // =========================================================================
  // ESTRUCTURAS DE LOS LÓBULOS (marcadores)
  // =========================================================================
  // ---- Frontal ----
  giro_precentral: {
    nombre: 'Giro precentral (corteza motora primaria)',
    tipo: 'Área 4 de Brodmann', clase: 'estructura', parte: 'lobulo_frontal',
    resumen: 'Franja de corteza inmediatamente por delante del surco central. Contiene el "homúnculo motor": la cara y la mano se representan en la cara lateral y la pierna en la cara medial (lobulillo paracentral). De aquí parte gran parte de la vía corticoespinal.',
    funciones: ['Ejecución de los movimientos voluntarios del lado opuesto del cuerpo.', 'Control fino de los dedos, la cara y la lengua.'],
    siFalla: 'Debilidad o parálisis contralateral, inicialmente flácida y después espástica, con hiperreflexia y signo de Babinski.',
    fuentes: ['sp_frontal', 'sp_corteza', 'msd_funcion_cerebral'],
  },
  corteza_premotora: {
    nombre: 'Corteza premotora y área motora suplementaria',
    tipo: 'Área 6 de Brodmann', clase: 'estructura', parte: 'lobulo_frontal',
    resumen: 'Región por delante del giro precentral. La corteza premotora (lateral) y el área motora suplementaria (medial) preparan y secuencian los movimientos antes de ejecutarlos.',
    funciones: ['Planificación y programación de secuencias motoras.', 'Movimientos guiados por estímulos externos (premotora).', 'Inicio de movimientos generados internamente y coordinación bimanual (área motora suplementaria).'],
    siFalla: 'Apraxia y dificultad para iniciar movimientos; la lesión del área motora suplementaria puede producir acinesia y mutismo transitorios.',
    fuentes: ['sp_frontal', 'sp_corteza', 'libro_kandel'],
  },
  campo_ocular_frontal: {
    nombre: 'Campo ocular frontal',
    tipo: 'Área 8 de Brodmann', clase: 'estructura', parte: 'lobulo_frontal',
    resumen: 'Área en la porción posterior del giro frontal medio que controla los movimientos oculares voluntarios.',
    funciones: ['Genera movimientos sacádicos voluntarios hacia el lado opuesto.', 'Dirige la mirada y la atención visual.'],
    siFalla: 'En la fase aguda, los ojos se desvían hacia el lado de la lesión ("el paciente mira su lesión") y cuesta mirar hacia el lado contrario.',
    fuentes: ['sp_frontal', 'sp_corteza'],
  },
  area_broca: {
    nombre: 'Área de Broca',
    tipo: 'Áreas 44 y 45 de Brodmann', clase: 'estructura', parte: 'lobulo_frontal',
    resumen: 'Porción posterior del giro frontal inferior (opérculo y triángulo) del hemisferio dominante, generalmente el izquierdo. Fundamental para la producción del lenguaje.',
    funciones: ['Planificación motora del habla.', 'Procesamiento gramatical y construcción de frases.', 'Conectada con el área de Wernicke por el fascículo arqueado.'],
    siFalla: 'Afasia de Broca: habla no fluente, lenta, esforzada y "telegráfica", con comprensión relativamente conservada y repetición alterada; suele acompañarse de hemiparesia derecha. La persona es consciente de su dificultad.',
    fuentes: ['sp_frontal', 'msd_afasia', 'msd_funcion_cerebral'],
  },
  prefrontal_dorsolateral: {
    nombre: 'Corteza prefrontal dorsolateral',
    tipo: 'Corteza de asociación', clase: 'estructura', parte: 'lobulo_frontal',
    resumen: 'Región anterior y lateral del lóbulo frontal, base de las funciones ejecutivas.',
    funciones: ['Memoria de trabajo.', 'Planificación, organización y razonamiento abstracto.', 'Flexibilidad cognitiva (cambiar de estrategia).'],
    siFalla: 'Síndrome disejecutivo: dificultad para planificar y organizarse, perseveración (repetir una respuesta aunque ya no sirva) y problemas para mantener información en mente.',
    fuentes: ['sp_frontal', 'sp_sindrome_frontal', 'msd_funcion_cerebral'],
  },
  corteza_orbitofrontal: {
    nombre: 'Corteza orbitofrontal',
    tipo: 'Corteza de asociación', clase: 'estructura', parte: 'lobulo_frontal',
    resumen: 'Cara inferior del lóbulo frontal, apoyada sobre las órbitas. Muy conectada con la amígdala y el hipotálamo.',
    funciones: ['Regulación de la conducta social y de las emociones.', 'Toma de decisiones basada en recompensas y castigos.', 'Integración de olfato y gusto (corteza olfatoria secundaria).'],
    siFalla: 'Desinhibición, impulsividad, comentarios inapropiados, labilidad emocional e indiferencia ante las consecuencias de los propios actos.',
    fuentes: ['sp_frontal', 'msd_funcion_cerebral', 'msd_dft'],
  },
  cingulado_anterior: {
    nombre: 'Corteza del cíngulo anterior',
    tipo: 'Corteza límbica (cara medial)', clase: 'estructura', parte: 'lobulo_frontal',
    resumen: 'Porción anterior del giro del cíngulo, en la cara medial del hemisferio, por encima del cuerpo calloso.',
    funciones: ['Motivación e iniciativa.', 'Atención y detección de errores o conflictos.', 'Componente emocional del dolor.'],
    siFalla: 'Apatía y abulia; la lesión bilateral puede causar mutismo acinético (la persona está despierta pero no habla ni se mueve espontáneamente).',
    fuentes: ['sp_limbico', 'msd_funcion_cerebral'],
  },
  // ---- Parietal ----
  giro_poscentral: {
    nombre: 'Giro poscentral (corteza somatosensorial primaria)',
    tipo: 'Áreas 3, 1 y 2 de Brodmann', clase: 'estructura', parte: 'lobulo_parietal',
    resumen: 'Franja inmediatamente por detrás del surco central. Recibe la información sensitiva del cuerpo y de la cara a través de los núcleos ventrales posteriores del tálamo y la organiza en el "homúnculo sensitivo".',
    funciones: ['Percepción del tacto, presión, vibración, temperatura, dolor y posición del lado opuesto.', 'Localización precisa de los estímulos.'],
    siFalla: 'Pérdida contralateral de la sensibilidad fina, de la posición articular y de la discriminación entre dos puntos.',
    fuentes: ['sp_hemisferio', 'sp_corteza', 'msd_funcion_cerebral'],
  },
  lobulillo_parietal_superior: {
    nombre: 'Lobulillo parietal superior',
    tipo: 'Áreas 5 y 7 de Brodmann', clase: 'estructura', parte: 'lobulo_parietal',
    resumen: 'Región por encima del surco intraparietal que integra información somatosensorial y visual.',
    funciones: ['Esquema corporal.', 'Guía visual de los movimientos para alcanzar y tomar objetos.', 'Atención espacial.'],
    siFalla: 'Ataxia óptica (errores al alcanzar objetos con la vista), astereognosia y negligencia del hemicuerpo contralateral.',
    fuentes: ['sp_corteza', 'libro_kandel'],
  },
  giro_supramarginal: {
    nombre: 'Giro supramarginal',
    tipo: 'Área 40 de Brodmann', clase: 'estructura', parte: 'lobulo_parietal',
    resumen: 'Rodea el extremo posterior del surco lateral. En el hemisferio dominante forma parte de la red del lenguaje; por debajo pasa el fascículo arqueado.',
    funciones: ['Procesamiento fonológico.', 'Praxias (gestos aprendidos).', 'Percepción espacial y del propio cuerpo.'],
    siFalla: 'Afasia de conducción (dificultad marcada para repetir) y apraxia ideomotora en el hemisferio dominante.',
    fuentes: ['sp_corteza', 'msd_afasia', 'mp_apraxia'],
  },
  giro_angular: {
    nombre: 'Giro angular',
    tipo: 'Área 39 de Brodmann', clase: 'estructura', parte: 'lobulo_parietal',
    resumen: 'Rodea el extremo posterior del surco temporal superior; punto de unión entre las áreas visuales, auditivas y somatosensoriales.',
    funciones: ['Lectura y escritura.', 'Cálculo.', 'Procesamiento semántico del lenguaje.'],
    siFalla: 'Alexia con agrafia y síndrome de Gerstmann (agrafia, acalculia, agnosia digital y desorientación derecha-izquierda) en el hemisferio dominante.',
    fuentes: ['sp_hemisferio', 'sp_corteza', 'msd_funcion_cerebral'],
  },
  precuneo: {
    nombre: 'Precúneo',
    tipo: 'Corteza de asociación (cara medial)', clase: 'estructura', parte: 'lobulo_parietal',
    resumen: 'Porción medial del lóbulo parietal, por delante del cuneus. Es un nodo central de la "red neuronal por defecto".',
    funciones: ['Recuperación de la memoria episódica.', 'Imaginería visuoespacial.', 'Conciencia de uno mismo.'],
    siFalla: 'Se afecta de forma temprana en la enfermedad de Alzheimer (disminución del metabolismo); su lesión aislada es poco frecuente.',
    fuentes: ['sp_corteza', 'mp_demencia'],
  },
  // ---- Temporal ----
  corteza_auditiva: {
    nombre: 'Corteza auditiva primaria (giros de Heschl)',
    tipo: 'Áreas 41 y 42 de Brodmann', clase: 'estructura', parte: 'lobulo_temporal',
    resumen: 'Situada en los giros transversos de la cara superior del giro temporal superior, oculta dentro del surco lateral. Recibe la información auditiva desde el núcleo geniculado medial del tálamo.',
    funciones: ['Percepción consciente de los sonidos.', 'Organización tonotópica: cada frecuencia se procesa en una franja distinta.'],
    siFalla: 'Una lesión unilateral produce pocos síntomas porque cada lado recibe información de ambos oídos; la lesión bilateral causa sordera cortical o agnosia auditiva.',
    fuentes: ['sp_temporal', 'sp_corteza'],
  },
  area_wernicke: {
    nombre: 'Área de Wernicke',
    tipo: 'Área 22 de Brodmann (porción posterior)', clase: 'estructura', parte: 'lobulo_temporal',
    resumen: 'Porción posterior del giro temporal superior del hemisferio dominante. Esencial para comprender el lenguaje.',
    funciones: ['Comprensión del lenguaje hablado y escrito.', 'Selección de las palabras adecuadas al hablar.'],
    siFalla: 'Afasia de Wernicke: habla fluida pero con parafasias y palabras sin sentido, comprensión muy alterada y, a menudo, sin conciencia del problema.',
    fuentes: ['sp_temporal', 'msd_afasia', 'msd_funcion_cerebral'],
  },
  giros_temporales: {
    nombre: 'Giros temporales medio e inferior',
    tipo: 'Corteza de asociación', clase: 'estructura', parte: 'lobulo_temporal',
    resumen: 'Forman parte de la vía visual ventral ("¿qué es?") y de las redes de memoria semántica.',
    funciones: ['Reconocimiento visual de objetos.', 'Memoria semántica (significado de palabras y conceptos).'],
    siFalla: 'Agnosia visual para objetos, anomia (dificultad para nombrar) y pérdida del significado de las palabras.',
    fuentes: ['sp_temporal', 'msd_dft'],
  },
  giro_fusiforme: {
    nombre: 'Giro fusiforme (occipitotemporal)',
    tipo: 'Cara inferior', clase: 'estructura', parte: 'lobulo_temporal',
    resumen: 'Giro de la cara inferior del lóbulo temporal que se extiende hasta el occipital. Contiene regiones especializadas en rostros y en palabras escritas.',
    funciones: ['Reconocimiento de rostros.', 'Reconocimiento visual de palabras.', 'Procesamiento del color (en la transición occipitotemporal).'],
    siFalla: 'Prosopagnosia (incapacidad para reconocer rostros conocidos), alexia o acromatopsia.',
    fuentes: ['sp_temporal', 'sp_occipital'],
  },
  temporal_medial: {
    nombre: 'Giro parahipocampal y uncus',
    tipo: 'Lóbulo temporal medial', clase: 'estructura', parte: 'lobulo_temporal',
    resumen: 'Cara medial e inferior del lóbulo temporal, junto al hipocampo. El uncus es su extremo anterior en forma de gancho.',
    funciones: ['Codificación de la memoria y del contexto espacial (giro parahipocampal).', 'Olfato (corteza olfatoria primaria en el uncus).'],
    siFalla: 'Alteraciones de la memoria; en la hipertensión intracraneal el uncus puede herniarse y comprimir el nervio oculomotor (pupila dilatada del mismo lado) y el mesencéfalo.',
    fuentes: ['sp_temporal', 'sp_limbico'],
  },
  // ---- Occipital ----
  corteza_visual_primaria: {
    nombre: 'Corteza visual primaria (V1)',
    tipo: 'Área 17 de Brodmann', clase: 'estructura', parte: 'lobulo_occipital',
    resumen: 'Se encuentra en las paredes del surco calcarino, en la cara medial. Recibe las radiaciones ópticas desde el núcleo geniculado lateral y contiene un "mapa" ordenado del campo visual contralateral.',
    funciones: ['Percepción visual consciente.', 'Detección de bordes, orientación, contraste y profundidad.'],
    siFalla: 'Hemianopsia homónima contralateral, a menudo con preservación de la visión central (macular).',
    fuentes: ['sp_occipital', 'msd_funcion_cerebral'],
  },
  cuneus: {
    nombre: 'Cuneus',
    tipo: 'Cara medial', clase: 'estructura', parte: 'lobulo_occipital',
    resumen: 'Porción en forma de cuña situada por encima del surco calcarino, entre este y el surco parietooccipital.',
    funciones: ['Procesa el cuadrante inferior del campo visual contralateral.'],
    siFalla: 'Cuadrantanopsia homónima inferior contralateral.',
    fuentes: ['sp_occipital'],
  },
  giro_lingual: {
    nombre: 'Giro lingual',
    tipo: 'Cara medial', clase: 'estructura', parte: 'lobulo_occipital',
    resumen: 'Situado por debajo del surco calcarino. Continúa hacia delante con el giro parahipocampal.',
    funciones: ['Procesa el cuadrante superior del campo visual contralateral.', 'Participa en el procesamiento del color.'],
    siFalla: 'Cuadrantanopsia homónima superior contralateral; puede asociarse a acromatopsia.',
    fuentes: ['sp_occipital'],
  },
  corteza_asociacion_visual: {
    nombre: 'Cortezas visuales de asociación (V2–V5)',
    tipo: 'Áreas 18 y 19 de Brodmann', clase: 'estructura', parte: 'lobulo_occipital',
    resumen: 'Rodean a la corteza visual primaria y elaboran la información visual: V4 se especializa en el color y V5/MT en el movimiento.',
    funciones: ['Reconocimiento e interpretación de lo que se ve.', 'Percepción del color (V4) y del movimiento (V5).'],
    siFalla: 'Agnosia visual (se ve pero no se reconoce), acromatopsia o acinetopsia.',
    fuentes: ['sp_occipital', 'libro_purves'],
  },
  // ---- Ínsula ----
  insula_anterior: {
    nombre: 'Ínsula anterior (giros cortos)',
    tipo: 'Ínsula', clase: 'estructura', parte: 'insula',
    resumen: 'Porción anterior de la ínsula, muy conectada con la corteza prefrontal y el sistema límbico.',
    funciones: ['Gusto.', 'Conciencia emocional, asco y empatía.', 'Planificación articulatoria del habla.'],
    siFalla: 'Alteraciones del gusto, menor reconocimiento emocional y apraxia del habla.',
    fuentes: ['sp_corteza', 'libro_kandel'],
  },
  insula_posterior: {
    nombre: 'Ínsula posterior (giros largos)',
    tipo: 'Ínsula', clase: 'estructura', parte: 'insula',
    resumen: 'Porción posterior de la ínsula, conectada con el tálamo y las áreas somatosensoriales.',
    funciones: ['Procesamiento del dolor y la temperatura.', 'Interocepción (señales viscerales).', 'Información vestibular.'],
    siFalla: 'Alteraciones en la percepción del dolor y la temperatura y síntomas vestibulares.',
    fuentes: ['sp_corteza', 'libro_kandel'],
  },
};
