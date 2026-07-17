# Avance del proyecto — isopanelWeb

Este archivo es la bitácora de trabajo del rediseño de la web, basado en la
auditoría que le pasó el jefe (PDF de auditoría + docx de plan V1/V2). Se
actualiza cada sesión para poder retomar sin perder contexto.

## Sesión 2026-07-15

### Contacto y formularios
- Hero con **3 CTAs segmentados** en vez de 2 genéricos:
  - "Cotizar mi proyecto" → abre **modal** con formulario (nombre, WhatsApp, departamento, tipo de proyecto, medidas, instalación sí/no, observaciones) → arma mensaje y abre WhatsApp.
  - "Comprar paneles" → abre **modal** con formulario más corto (nombre, departamento, qué materiales necesita) y **dos botones**: "Enviar" (arma mensaje) y "Hablar directo por WhatsApp" (mensaje fijo).
  - "Soy colocador o constructor" → WhatsApp directo con mensaje: *"Hola, estoy interesado a entrar en el club del colocador."*
- Sección **Contacto** rediseñada: info + formulario + mapa en fila horizontal, compacta (no supera 100vh), formulario en 2 columnas, mismo alto que el bloque de info.
- El formulario de la home ("Cotizá tu proyecto") y todos los modales funcionan igual: arman el mensaje y abren WhatsApp — **no hay backend ni CRM**, es intencional por ahora (ver pendientes).

### Bugs de diseño arreglados
- Botones que eran `<a>` y pasaron a `<button>` (para abrir modales) se quedaron con fondo/borde gris por defecto del navegador. Se resetearon `border` y `background` en la clase base `.btn`.
- Color del borde de `.btn-primary` ajustado (probamos blanco, quedó en celeste `--blue-200` para hacer juego con `.btn-secondary`).
- Favicon cambiado de `favicon.png` (no existía, roto) a `logo_azul.png` en las 7 páginas del sitio.

### Home — hero y servicios
- Fondo del hero: ahora es un **carrusel de 4 imágenes con crossfade** (`1-fondo.webp` a `4-fondo.webp`), cambia cada 7s.
- Sección "Modelos de techo": la card rota "Isopanel Trapezoidal" (imagen 404) se separó en dos cards reales: **"Isopaneles EPS"** e **"Isopaneles PIR"**, con sus imágenes del catálogo (`assets/img/productos/`).
- Sección "Servicios" recompaginada para no superar 100vh, y después reajustada para aprovechar mejor el espacio (textos/imágenes más grandes, menos huecos vacíos).

### Páginas nuevas (arquitectura multi-página, punto #1 de la auditoría)
- **`club-colocador.html`**: landing completa (hero, beneficios ampliados, "cómo funciona" en 4 pasos, requisitos, formulario de alta con 2 botones). La sección del Club en la home se achicó a teaser con link "Conocé el Club →".
- **`preguntas-frecuentes.html`**: las 18 preguntas y respuestas reales que pasó el jefe, con schema `FAQPage` (JSON-LD) para SEO, y **buscador en vivo** que filtra por pregunta y respuesta. La mini-FAQ de la home se actualizó con 5 preguntas reales + link "Ver todas →".
- Nav actualizado en las 7 páginas del sitio: se agregaron los links "Club del Colocador" y "FAQ".

### Guía Isopaneles
- Layout nuevo: **barra lateral sticky** con buscador + índice de 8 temas (agregamos "Accesorios y perfiles" y "Tornillería y anclajes", que no existían como contenido educativo). En mobile la barra se convierte en buscador + chips arriba del contenido.

### Casa Maracaná
- Se agregó la descripción completa (49 m², distribución, diseño minimalista), lista "Maracaná incluye" y lista de "Opcionales".
- Galería de 10 renders al final de la página (carpeta `Render/`, ya estaban en `.webp`, no hizo falta convertir nada).
- Visor 360° arreglado: apuntaba a una imagen que no existía (`360-exterior.jpg`), ahora usa `exterior.png` (interior de la casa).

---

## Pendiente (de la auditoría original)

1. **Corregir "Instalación en 24 horas"** — sigue sin resolverse. Aparece en 4 lugares: `<meta name="description">`, `<meta property="og:description">`, spec-bar del hero, tarjeta de diferenciales, y la respuesta del FAQ de la home. El jefe pidió cambiarlo por algo tipo "construcción garantizada" pero **falta definir el texto final exacto** antes de tocar código (quedó frenado esperando esa decisión).
2. **Landing propia para "Techo instalado"** (residencial) — mismo patrón que Club del Colocador.
3. **Landing propia SEO para "Comprar paneles"** — hoy solo tiene el modal, falta una página con contenido/keywords propios (la auditoría pide `/paneles-de-techo-eps`, `/paneles-de-pared-eps`, `/paneles-pir-uruguay`, etc.).
4. **Medición**: instalar GA4, Google Tag Manager, Meta Pixel y Search Console. Esto necesita que el cliente cree las cuentas primero (IDs/códigos) — no se puede avanzar sin eso.
5. **Obras como "casos de uso"** en vez de galería simple: agregar contexto por obra (tipo de proyecto, m², alcance, plazo) en vez de solo fotos.
6. **Sitemap.xml, robots.txt, schema Organization + BreadcrumbList** en todas las páginas — checklist SEO técnico de la auditoría, no arrancado.
7. **Performance / accesibilidad**: no se corrió Lighthouse ni se auditó Core Web Vitals ni WCAG todavía.
8. **Eventos de analítica** (`click_whatsapp`, `form_submit`, `generate_lead`) — depende del punto 4 (medición).

## Notas para retomar
- El sitio es estático (GitHub Pages), sin backend. Todos los formularios funcionan armando un mensaje y abriendo WhatsApp — es la solución elegida para "V1 rápida" sin CRM.
- Cuando se pruebe algo visual, usamos `python -m http.server` + Playwright headless para verificar antes de dar por terminada una tarea (capturas + chequeo de consola/404).




16/07/2026

## Sesión 2026-07-16

### Home — hero
- Barra de specs (`spec-bar`) rehecha: ahora son 4 ítems en vez de 3 — **Logística** (flete gratis), **Respaldo** (garantía escrita), **Izaje** (camión grúa propio) y **Calidad** (obras de referencia en todo Uruguay). Se sacó "Tiempos / Instalación en 24 horas" (seguía pendiente de definición, ver lista de pendientes).
- CSS de `.spec-item` ajustado (`flex: 1 1 0`, padding con `clamp()`, gap e íconos más chicos) para que los 4 entren en una sola fila sin que ninguno baje de línea.
- Se quitó el texto `Canelones, Uruguay` que aparecía arriba del `<h1>` en el hero.

### Sección "Quiénes somos"
- Se movió de su lugar original (después de Casa Maracaná) a **justo arriba de Servicios**.
- Fondo: se probaron varias variantes (blanco sólido, celeste sólido, textura sola) hasta quedar en la versión final: **fondo celeste (`--blue-100`) + textura `fondo-logo.webp` con `background-blend-mode: multiply`**, para que se vea el celeste con la textura del logo encima sin el blanco tapando todo.
- Tarjetas Visión/Misión vueltas a blanco para que contrasten bien sobre el nuevo fondo celeste.

### Reordenamiento de colores por sección (alternancia celeste/blanco)
- **Servicios**: fondo celeste → blanco.
- **Obras**: fondo blanco → celeste.
- **Productos**: fondo celeste → blanco.

### Obras — limpieza de galerías
- **Bella Vista** (módulos): se borró la foto `07.webp` (no correspondía a esa obra) y se bajó `data-lightbox-count` de 7 a 6.
- **Techos**: se detectó que la imagen `24.webp` ya faltaba en el servidor (por eso tiraba error al cargar) y encima el conteo (37) no coincidía con los archivos reales (36). Se borraron además las pedidas (8, 9, 11, 13, 14, 20, 30), se renombró todo el resto de forma correlativa `01–29.webp` y se ajustó `data-lightbox-count` a 29.
- **Nuestros clientes**: se sacaron los logos de Ejército Nacional y Global Import; se agregó el logo de **El Clon** (`el-clon.png`, renombrado desde `El clon.png`) justo después de Las Acacias. El filtro blanco y negro ya lo aplica el CSS existente a todos los logos por igual.

### Bug de fondo con imagen no cargaba (`--hero-img`)
- Se detectó que en todas las mini-landings que usan `.maracana-hero` con `style="--hero-img:url('...')"` inline, la ruta se resolvía **relativa al CSS (`servicios.css`)** y no al HTML — por eso tiraba 404 y solo se veía el overlay azul oscuro. Se corrigió pasando esas rutas a **absolutas desde la raíz (`/assets/...`)** en: `isoelite.html`, `obras/index.html`, `obras/el-clon.html`, `modulos.html`, `casa-tiny.html`, `casa-olimpica.html`.

### IsoElite (`isoelite.html`)
- Fondo del hero cambiado a `assets/img/obras2/isoElite/salinas/01.webp`.
- Se agregó el **video institucional** (`IsoElite_VideoInstitucional.mp4`, con timelapse) en un bloque destacado justo después de la descripción inicial, **no** al final junto a los otros 2 videos de obra.

### Diferenciales y distinción
- Título de la sección cambiado a **"11 razones para elegir Isopanel Uruguay"**.
- Columna "Diferenciales" reemplazada con las 11 razones nuevas que pasó el jefe (proyecto llave en mano, experiencia comprobada, asesoramiento técnico, izaje especializado, logística nacional, garantía escrita, seguridad, financiación, postventa, flete gratis, Club del Colocador).
- La columna "Distinción del producto" se dejó sin cambios (así lo pidió el jefe).

### Preguntas frecuentes (`preguntas-frecuentes.html` + mini-FAQ de la home)
- Se agregaron 9 preguntas nuevas (espesor según proyecto, presupuesto con/sin instalación, garantía de paneles e instalación, entregas/instalaciones en todo Uruguay, plazos de fabricación y entrega, financiación en cuotas, obra llave en mano, personalización de Casa Maracaná, qué es IsoElite), tanto en el acordeón visible como en el schema `FAQPage` (JSON-LD).
- La pregunta "¿Los paneles resisten el fuego y la humedad?" ya existía: se reemplazó su respuesta por la versión nueva y más completa que pasó el jefe.
- **Se eliminaron todas las menciones a "Bromyros" y "EPS 118" en todo el sitio** (ya no se trabaja con esas líneas): aparecían en 4 respuestas del FAQ completo y 1 en el mini-FAQ de la home.
- Mini-FAQ de la home: se achicó de 5 a **3 preguntas** + botón "Ver todas las preguntas frecuentes →".

### Navegación
- Se cambió el link del menú de **"FAQ" a "Preguntas"** en las 11 páginas del sitio.

### Guía Isopaneles (`guia-isopaneles.html`)
- Sección "Modelos de techo más usados": la tarjeta "Isopanel Trapezoidal" pasó a ser **"Isopanel EPS"** con el texto nuevo del jefe; se agregó una tarjeta nueva **"Isopanel PIR"** (resistencia al fuego, mejor aislamiento térmico); "IsoElite" actualizada con el texto nuevo.

### Productos (home)
- Paneles PIR: se sacó la tarjeta "PU Trapezoidal".
- Perfiles: se sacaron las tarjetas "Frontal Gotero PU" y "Lateral Gotero PU".