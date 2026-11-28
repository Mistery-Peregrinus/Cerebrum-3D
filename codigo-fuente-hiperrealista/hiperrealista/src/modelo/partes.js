// Registro común de "partes" interactivas del modelo.
import * as THREE from 'three';
import { materialTejido, crearFoco } from './util.js';

/**
 * Crea una parte interactiva (un grupo de mallas que se seleccionan juntas).
 *  - id, division, lado ('der' | 'izq' | null)
 *  - geometrias: BufferGeometry[] que toman el color de la parte
 *  - fijas: [{ geo, color }] mallas que conservan su propio color (nervios, etc.)
 *  - explosion: [x,y,z] desplazamiento al "desglosar"
 *  - profunda: estructura interna (solo visible en la vista interna)
 */
export function crearParte(o) {
  const grupo = new THREE.Group();
  grupo.name = `${o.division}:${o.id}:${o.lado || 'c'}`;
  const foco = crearFoco();
  const parte = {
    id: o.id,
    division: o.division,
    lado: o.lado || null,
    grupo,
    meshes: [],
    foco,
    explosion: new THREE.Vector3(...(o.explosion || [0, 0, 0])),
    profunda: !!o.profunda,
    unidad: null,
    actual: { explosion: new THREE.Vector3(), opacidad: 1, color: new THREE.Color(0xe2b3a6), emisivo: 0, foco: 0 },
    objetivo: { explosion: new THREE.Vector3(), opacidad: 1, color: new THREE.Color(0xe2b3a6), emisivo: 0, visible: true, foco: 0 },
  };
  for (const geo of o.geometrias || []) {
    if (!geo) continue;
    const m = new THREE.Mesh(geo, materialTejido(0xe2b3a6, foco, { relieve: true }));
    m.userData.parte = parte;
    grupo.add(m);
    parte.meshes.push(m);
  }
  for (const f of o.fijas || []) {
    const m = new THREE.Mesh(f.geo, materialTejido(f.color, foco, { relieve: true }));
    m.userData.parte = parte;
    m.userData.colorFijo = new THREE.Color(f.color);
    grupo.add(m);
    parte.meshes.push(m);
  }
  return parte;
}
