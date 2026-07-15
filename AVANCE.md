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
