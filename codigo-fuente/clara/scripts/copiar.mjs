// Copia la aplicación compilada (un único HTML autocontenido) a la raíz del proyecto.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'Cerebrum Pro Claro.html');
console.log('Listo: "Cerebrum Pro Claro.html" (ábrelo con doble clic en Chrome o Edge).');
