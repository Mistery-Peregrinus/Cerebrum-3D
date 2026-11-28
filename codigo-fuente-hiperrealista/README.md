# Código fuente de Cerebrum

© 2026 Maximiliano Morales Domínguez · Licencia GNU GPL-3.0 (ver [LICENSE](../LICENSE))

Esta carpeta contiene el código fuente de las versiones de Cerebrum. Los archivos `index.html`, `clear.html` y `hiperrealista.html` de la raíz del repositorio son las apps ya compiladas, listas para usar.

| Carpeta | Versión | Genera |
|---|---|---|
| `oscura/` | Diseño original (oscuro), modelo procedural | `Cerebrum Pro.html` |
| `clara/` | Diseño alternativo (claro), modelo procedural | `Cerebrum Pro Claro.html` |
| `hiperrealista/` | Diseño oscuro con anatomía real de BodyParts3D (experimental) | `Cerebrum Hiperrealista.html` |

`oscura/` y `clara/` comparten el mismo código; solo cambian los estilos (`src/estilos.css`, `src/estilos-pro.css`), los colores de acento y las tipografías. `hiperrealista/` parte de la versión oscura y cambia el modelo 3D y el material.

## Cómo compilar

Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
cd codigo-fuente/oscura      # o codigo-fuente/clara, o codigo-fuente/hiperrealista
npm install
npm run build
```

El comando genera el modelo 3D (`scripts/generar-modelo.mjs`), compila la app con Vite y deja un único archivo HTML en la carpeta de la versión. Ese archivo funciona sin internet: basta con abrirlo en Chrome o Edge.

Para desarrollar con recarga automática: `npm run dev`.

## Estructura

- `src/main.js`: aplicación principal (escena 3D, navegación, panel, buscador).
- `src/modelo/`: construcción del encéfalo (telencéfalo, diencéfalo, cerebelo, tallo).
- `src/neuro/`: neuronas en 3D, simulación del potencial de acción (Hodgkin-Huxley, `hh.js`) y sinapsis.
- `src/datos/`: contenido de las fichas en español y fuentes; `src/datos/en/` contiene los textos en inglés.
- `src/ui/`: panel de fichas y buscador.
- `src/i18n.js`: idioma (español / inglés).

Si agregas o cambias contenido de las fichas, escribe también su versión en inglés en `src/datos/en/`.

### Versión hiperrealista

- `src/datos-bp3d/`: datos derivados de BodyParts3D (rejillas con la forma real de cada hemisferio y el giro al que pertenece cada punto, y las mallas del cerebelo, el tallo cerebral, la ínsula y el hipocampo). Ya vienen incluidos: para compilar no hace falta descargar nada más.
- `scripts/preparar-bp3d.mjs`: genera esos datos a partir del paquete original `partof_BP3D_4.0_obj_99` de BodyParts3D. Solo se necesita para volver a generarlos: `npm run preparar -- <carpeta con los OBJ>`.
- `src/modelo/bp3d.js`: lee esos datos al generar el modelo.
- `src/modelo/telencefalo.js`: arma la superficie real, talla los surcos en los límites entre giros reales (con la profundidad de cada surco) y asigna lóbulos y etiquetas según el giro.
- `src/modelo/surcos.js`: surcos menores procedurales y el campo de profundidad de los surcos.

## Componentes de terceros

| Componente | Uso | Licencia |
|---|---|---|
| [Three.js](https://threejs.org) | Motor 3D (WebGL) | MIT |
| [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) | Selección rápida de estructuras | MIT |
| [Vite](https://vitejs.dev) y [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) | Compilación en un solo archivo | MIT |
| Inter Tight, JetBrains Mono (versiones oscura e hiperrealista) | Tipografías | SIL Open Font License 1.1 |
| EB Garamond, Lato, Noto Sans (versión clara) | Tipografías | SIL Open Font License 1.1 |
| [BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/) (versión hiperrealista) | Forma y giros del encéfalo, cerebelo, tallo cerebral, ínsula e hipocampo | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

Las tipografías se distribuyen mediante los paquetes de [Fontsource](https://fontsource.org).

**Atribución de BodyParts3D:** "BodyParts3D, © The Database Center for Life Science, licensed under CC Attribution 4.0 International". Los datos se escalaron, voxelizaron y adaptaron: los huecos de giros ausentes en el paquete (temporal superior y orbitarios) se rellenaron, y los surcos, el detalle de la superficie y el resto de las estructuras son procedurales. The Database Center for Life Science no participa en este proyecto ni lo respalda.

El contenido de las fichas está redactado por el autor y cita sus fuentes originales (NCBI StatPearls, Manual MSD, MedlinePlus, PubMed, OMS y libros de texto), que conservan sus propios derechos.
