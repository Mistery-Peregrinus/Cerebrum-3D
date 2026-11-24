# Código fuente de Cerebrum

© 2026 Maximiliano Morales Domínguez · Licencia GNU GPL-3.0 (ver [LICENSE](../LICENSE))

Esta carpeta contiene el código fuente de las dos versiones de Cerebrum. Los archivos `index.html` y `clear.html` de la raíz del repositorio son las apps ya compiladas, listas para usar.

| Carpeta | Versión | Genera |
|---|---|---|
| `oscura/` | Diseño original (oscuro) | `Cerebrum Pro.html` |
| `clara/` | Diseño alternativo (claro) | `Cerebrum Pro Claro.html` |

Las dos comparten el mismo código; solo cambian los estilos (`src/estilos.css`, `src/estilos-pro.css`), los colores de acento y las tipografías.

## Cómo compilar

Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
cd codigo-fuente/oscura      # o codigo-fuente/clara
npm install
npm run build
```

El comando genera el modelo 3D (`scripts/generar-modelo.mjs`), compila la app con Vite y deja un único archivo HTML en la carpeta de la versión. Ese archivo funciona sin internet: basta con abrirlo en Chrome o Edge.

Para desarrollar con recarga automática: `npm run dev`.

## Estructura

- `src/main.js`: aplicación principal (escena 3D, navegación, panel, buscador).
- `src/modelo/`: construcción procedural del encéfalo (telencéfalo, diencéfalo, cerebelo, tallo).
- `src/neuro/`: neuronas en 3D, simulación del potencial de acción (Hodgkin-Huxley, `hh.js`) y sinapsis.
- `src/datos/`: contenido de las fichas en español y fuentes; `src/datos/en/` contiene los textos en inglés.
- `src/ui/`: panel de fichas y buscador.
- `src/i18n.js`: idioma (español / inglés).

Si agregas o cambias contenido de las fichas, escribe también su versión en inglés en `src/datos/en/`.

## Componentes de terceros

| Componente | Uso | Licencia |
|---|---|---|
| [Three.js](https://threejs.org) | Motor 3D (WebGL) | MIT |
| [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) | Selección rápida de estructuras | MIT |
| [Vite](https://vitejs.dev) y [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) | Compilación en un solo archivo | MIT |
| Inter Tight, JetBrains Mono (versión oscura) | Tipografías | SIL Open Font License 1.1 |
| EB Garamond, Lato, Noto Sans (versión clara) | Tipografías | SIL Open Font License 1.1 |

Las tipografías se distribuyen mediante los paquetes de [Fontsource](https://fontsource.org).

El contenido de las fichas está redactado por el autor y cita sus fuentes originales (NCBI StatPearls, Manual MSD, MedlinePlus, PubMed, OMS y libros de texto), que conservan sus propios derechos.
