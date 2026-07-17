# isopanelWeb

Proyecto web para Isopanel.

## Estructura de URLs (desde el commit `1e5a2d4`)

Cada página vive en su propia carpeta como `index.html` (ej. `casa-tiny/index.html`
en vez de `casa-tiny.html`), para tener URLs limpias sin `.html`
(`isopaneluruguay.com/casa-tiny/`). Todas las rutas a `assets/` (CSS, JS,
imágenes, PDFs) son **absolutas desde la raíz** (`/assets/...`) para que
funcionen sin importar la profundidad de carpeta de cada página.

Esto asume que el sitio se sirve **desde la raíz del dominio**
(`isopaneluruguay.com/`, no `isopaneluruguay.com/alguna-subcarpeta/`). Es como
funciona cualquier hosting normal para un dominio propio (cPanel, Netlify,
Vercel, un vhost de Apache/Nginx).

### Por qué el link de GitHub Pages (`nanabru.github.io/isopanelWeb/`) da 404 en todo

GitHub Pages, sin un dominio propio configurado, publica el repo bajo una
subcarpeta con el nombre del repo (`/isopanelWeb/`), no en la raíz. Como las
rutas del sitio son absolutas (`/assets/...`), en GitHub Pages apuntan a
`nanabru.github.io/assets/...` (no existe ahí) en vez de
`nanabru.github.io/isopanelWeb/assets/...` (donde sí está). Por eso en la
consola del navegador aparecen 404 de todos los CSS/JS/imágenes.

**Esto es solo una limitación del link de preview de GitHub Pages, no un bug
del sitio.** Cuando la agencia de marketing lo publique en la raíz de
`isopaneluruguay.com`, las rutas absolutas van a funcionar bien. Decisión
tomada: no tocar el código por esto — GitHub Pages queda como está (roto en
esa URL puntual) y para probar en local se sigue usando
`python -m http.server` desde la raíz del proyecto.

### Si en algún momento hay que revertir esta reorganización

Si el hosting final termina sirviendo el sitio desde una subcarpeta (no la
raíz del dominio) y hay que volver a rutas relativas / archivos `.html`
sueltos en la raíz:

- El commit que hizo el cambio es `1e5a2d4` ("Reorganiza el sitio en URLs
  limpias..."). `git show 1e5a2d4 --stat` muestra todos los archivos movidos.
- Habría que: mover cada `carpeta/index.html` de vuelta a `carpeta.html` en la
  raíz, y cambiar las rutas `/assets/...` por rutas relativas calculadas según
  la profundidad real de cada página (`assets/...` para las de la raíz,
  `../assets/...` para las que estén una carpeta adentro, como pasaba antes).
- Los links internos entre páginas (`href="/casa-tiny/"`) también habría que
  volverlos a `href="casa-tiny.html"` (o `../casa-tiny.html` según la
  profundidad).
