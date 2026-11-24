// Información general: encéfalo completo.
export const INFO_GENERAL = {
  encefalo: {
    nombre: 'Encéfalo',
    tipo: 'Visión general',
    clase: 'inicio',
    resumen:
      'El encéfalo es la porción del sistema nervioso central (SNC) contenida dentro del cráneo; junto con la médula espinal forma el SNC. Recibe e integra la información sensorial, genera las órdenes motoras y sostiene funciones como la conciencia, el lenguaje, la memoria, el pensamiento y las emociones. Selecciona arriba una de sus cuatro divisiones para explorarla.',
    ubicacion:
      'Se aloja en la cavidad craneal, protegido por el cráneo, las meninges (duramadre, aracnoides y piamadre) y el líquido cefalorraquídeo que circula por los ventrículos y el espacio subaracnoideo. En el embrión, el extremo cefálico del tubo neural forma tres vesículas primarias: el prosencéfalo (que dará lugar al telencéfalo y al diencéfalo), el mesencéfalo y el rombencéfalo (que dará lugar al puente, al cerebelo y al bulbo raquídeo).',
    contenido: [
      'Telencéfalo: los dos hemisferios cerebrales (corteza, sustancia blanca, núcleos basales y estructuras límbicas como el hipocampo y la amígdala).',
      'Diencéfalo: tálamo, hipotálamo, epitálamo y subtálamo, alrededor del tercer ventrículo.',
      'Cerebelo: dos hemisferios cerebelosos unidos por el vermis, con núcleos profundos y tres pares de pedúnculos.',
      'Tallo cerebral (tronco del encéfalo): mesencéfalo, puente (protuberancia) y bulbo raquídeo; de él emergen los nervios craneales III a XII.',
    ],
    funciones: [
      'Percepción e integración de la información sensorial (tacto, visión, audición, gusto, olfato y equilibrio).',
      'Planificación y control del movimiento voluntario, la postura y la coordinación.',
      'Funciones cognitivas superiores: lenguaje, memoria, atención, razonamiento y toma de decisiones.',
      'Regulación de las emociones, la conducta y la motivación.',
      'Control de funciones vitales y homeostáticas: respiración, frecuencia cardiaca, temperatura, sueño-vigilia y sistema endocrino.',
    ],
    irrigacion:
      'Recibe sangre de dos sistemas: el carotídeo (arterias carótidas internas → arterias cerebrales anteriores y medias) y el vertebrobasilar (arterias vertebrales → arteria basilar → arterias cerebrales posteriores). Ambos se comunican en la base del encéfalo mediante el polígono de Willis.',
    padecimientos: [
      ['Accidente cerebrovascular (ACV)', 'Interrupción del flujo sanguíneo (isquémico) o rotura de un vaso (hemorrágico); los síntomas dependen de la zona afectada.'],
      ['Epilepsia', 'Tendencia a presentar crisis convulsivas recurrentes por actividad eléctrica anormal de las neuronas.'],
      ['Demencias', 'Como la enfermedad de Alzheimer o la demencia frontotemporal, con deterioro progresivo de la memoria y otras funciones cognitivas.'],
      ['Traumatismo craneoencefálico', 'Lesión del encéfalo por un golpe o una aceleración brusca de la cabeza.'],
      ['Tumores cerebrales', 'Primarios (p. ej., gliomas, meningiomas) o metastásicos.'],
    ],
    siFalla: [
      'Las manifestaciones dependen de la región dañada: parálisis, pérdida de sensibilidad, alteraciones del lenguaje, de la visión, de la memoria o de la conducta.',
      'La lesión grave del tronco del encéfalo puede producir pérdida de la conciencia y de funciones automáticas como la respiración.',
    ],
    dato:
      'El encéfalo humano adulto contiene alrededor de 86 000 millones de neuronas; cerca de 69 000 millones se encuentran en el cerebelo, aunque este representa solo alrededor del 10 % del volumen encefálico (Azevedo et al., 2009).',
    fuentes: ['sp_snc', 'sp_tubo_neural', 'sp_fisiologia_cerebro', 'msd_cerebro', 'sp_irrigacion', 'pm_azevedo', 'libro_snell'],
  },
};
