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
`isopaneluruguay.com`, las rutas absolutas van a funcionar bien.

### Archivo CNAME

Se agregó un archivo `CNAME` con `www.isopaneluruguay.com` para que, si en
algún momento se apunta el DNS del dominio a GitHub Pages, este repo se sirva
desde la raíz de ese dominio (en vez de bajo `/isopanelWeb/`) y las rutas
absolutas funcionen ahí también. Con el DNS apuntando todavía al hosting
viejo (WordPress), este archivo no tiene efecto — el link
`nanabru.github.io/isopanelWeb/` va a seguir dando 404 en los assets hasta que:

1. En **Settings → Pages** del repo se confirme el dominio personalizado
   `www.isopaneluruguay.com`, y
2. En el proveedor de DNS del dominio se agregue un registro `CNAME` de `www`
   apuntando a `nanabru.github.io` (y, si se quiere que ande sin el `www`,
   registros `A` de la raíz apuntando a las IPs de GitHub Pages).

Si el sitio termina hosteado por la agencia de marketing (no en GitHub
Pages), este archivo `CNAME` es inofensivo y se puede borrar sin problema.

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
