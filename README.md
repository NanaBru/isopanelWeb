# isopanelWeb

Proyecto web para Isopanel Uruguay. Sitio estático (HTML/CSS/JS puro, sin
backend ni build step) — se publica subiendo el contenido de este repo tal
cual a un hosting.

Este repositorio se usa como copia de seguridad del código y como referencia
de trabajo. **No está pensado para servirse desde GitHub Pages** (el link de
preview `nanabru.github.io/isopanelWeb/` puede verse roto — ver más abajo por
qué, y por qué no es un problema real).

## Requisito clave para publicarlo: debe quedar en la raíz del dominio

El sitio usa **URLs limpias sin `.html`** (cada página es una carpeta con su
`index.html` adentro, ej. `casa-tiny/index.html` → `isopaneluruguay.com/casa-tiny/`)
y todas las rutas a `assets/` (CSS, JS, imágenes, PDFs) son **absolutas desde
la raíz** (empiezan con `/assets/...`).

Por eso, quien publique este sitio tiene que asegurarse de que quede
disponible en la **raíz** del dominio:

- ✅ Correcto: `https://www.isopaneluruguay.com/` sirve directamente el
  `index.html` de este repo.
- ❌ Incorrecto: `https://www.isopaneluruguay.com/nueva-web/` o cualquier
  subcarpeta — ahí todas las rutas `/assets/...` van a dar 404, porque
  apuntarían a `www.isopaneluruguay.com/assets/...` en vez de
  `www.isopaneluruguay.com/nueva-web/assets/...`.

Esto es el comportamiento normal de cualquier hosting para un dominio propio
(cPanel, Netlify, Vercel, un vhost de Apache/Nginx): el contenido que se sube
queda en la raíz. Así que en la gran mayoría de los casos no hay nada
especial que configurar — solo confirmarlo con la agencia antes de que
suban los archivos.

## Checklist para la agencia de marketing al publicar

1. Subir **todo** el contenido de este repo (carpetas y archivos) a la raíz
   del hosting/dominio — no dentro de una subcarpeta.
2. Verificar que `index.html` quede accesible en `https://www.isopaneluruguay.com/`.
3. `sitemap.xml` y `robots.txt` ya están en la raíz, listos para
   `https://www.isopaneluruguay.com/sitemap.xml` y `/robots.txt`.
4. Dar de alta el dominio en Google Search Console y mandar el sitemap.
5. Después de publicar, revisar la consola del navegador (F12) en un par de
   páginas por si algo tira 404 — si pasa, seguramente el sitio quedó en una
   subcarpeta en vez de en la raíz (ver punto anterior).

## Por qué el link de GitHub Pages puede verse roto (y por qué no importa)

GitHub Pages, sin configurar un dominio propio, publica el repo bajo una
subcarpeta con el nombre del repo (`nanabru.github.io/isopanelWeb/`), no en
la raíz. Como las rutas del sitio son absolutas (`/assets/...`), en GitHub
Pages terminan apuntando a `nanabru.github.io/assets/...` (no existe ahí) en
vez de `nanabru.github.io/isopanelWeb/assets/...`. Por eso en la consola del
navegador aparecen 404 de todos los CSS/JS/imágenes al abrir ese link.

GitHub Pages acá se usa solo como respaldo del código, no como hosting del
sitio — este 404 puntual de esa URL no afecta en nada la publicación real en
`isopaneluruguay.com`.

**Para probar el sitio en tu máquina** mientras se trabaja en él, no usar el
link de GitHub Pages: correr un servidor local desde la raíz del proyecto y
abrir eso, por ejemplo:

```
python -m http.server 8000
```

y entrar a `http://localhost:8000/`. Ahí sí se sirve desde la raíz, igual
que en producción.
