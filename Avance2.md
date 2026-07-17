# Avance 2 — cambios de esta sesión con Claude

Bitácora de lo que hicimos juntos en esta conversación (distinta de `AVANCE.md`,
que registra otras sesiones de trabajo sobre el sitio). Fecha: 2026-07-16/17.

## 1. IsoElite — landing propia (`isoelite.html`)

- Se creó una mini-landing dedicada para IsoElite, con el mismo patrón que
  Casa Olímpica / Tiny / Maracaná (`section-maracana`, `mar-block`, etc.):
  - Hero con explicación corta del producto.
  - Bloque "Qué es IsoElite" y "Cómo se compone" (panel liso EPS/PIR de 10 cm
    /100 mm + barrera hídrica + teja asfáltica americana), usando el
    contenido real de la ficha técnica `IsoELite.pdf`.
  - Tabla comparativa de las 4 tejas asfálticas (IKO Marathon, IKO Cambridge,
    Seeton, Hexagonal EDIL) con colores y garantías, sacada de la ficha.
  - Bloque "Kit Arma tu Casa".
  - Galería con lightbox de los 3 proyectos reales (Costa Azul, Mercedes,
    Salinas).
  - Sección de Videos con los 2 videos de obra de Costa Azul
    (`costaazul06.mp4`, `costaazul10.mp4`).
  - Botón de descarga de la ficha técnica en PDF.
  - CTA de WhatsApp con mensaje prellenado.
- En `index.html`, el botón "IsoElite" de la sección **Servicios** dejó de
  abrir el modal selector de proyecto y ahora **linkea directo** a
  `isoelite.html`. (El selector de proyecto en la sección Obras no se tocó
  en ese momento.)

## 2. "Soluciones extras" — reubicación y reescritura

- Se sacó el párrafo "Soluciones extras" del final de la sección
  **Servicios** de `index.html` (no encajaba temáticamente ahí).
- Se reescribió el texto (antes solo mencionaba UTE/OSE) para dar más
  tranquilidad sobre la burocracia de cualquier tipo de obra, y se dejó como
  paso 06 del "Proceso completo de obra" en las 3 landings de módulos que ya
  lo tenían: `maracana.html`, `casa-olimpica.html`, `casa-tiny.html`.
  Texto nuevo: *"En todo tipo de obra —proyectos arquitectónicos, módulos a
  medida y mucho más— nos encargamos de la gestión integral ante los
  organismos públicos correspondientes (Intendencias Departamentales, BPS,
  etc.) y empresas públicas (UTE, OSE, etc.), para que no tengas que
  preocuparte por la burocracia detrás de tu proyecto."*

## 3. Dropdown "Módulos" + nueva página `modulos.html`

- Se creó `modulos.html`: landing "Todos los módulos" con 4 tarjetas —
  Casa Olímpica (15 m²), Tiny 30 (30 m²), Casa Maracaná (49 m²) y
  **"100% Personalizado a tu gusto"** (abre WhatsApp con mensaje prellenado).
- El dropdown "Módulos" del header se actualizó en **todas** las páginas del
  sitio: ahora el primer ítem es "Todos los módulos" (→ `modulos.html`), se
  mantienen los 3 módulos existentes, y se agregó al final
  "100% Personalizado a tu gusto" (→ WhatsApp).

## 4. Obras — landing detallada + reorganización en carpeta `obras/`

- Se creó una landing de Obras más completa (fotos + descripción por
  proyecto, y video donde había), incorporando dos proyectos que tenían
  material en `assets/img/obras2/` pero no se mostraban en ningún lado:
  - **El Clon** (13 fotos, sin renombrar todavía — se copiaron y
    renombraron a `assets/img/obras2/gallery/el-clon/01.webp`…`13.webp`).
  - **Laboratorio Microsules** (solo tenía un video, sin fotos — se copió a
    `assets/img/obras2/gallery/laboratorio-microsules/video01.mp4`).
  - También se copió el video de Techos a
    `assets/img/obras2/gallery/techos/video01.mp4` (el archivo original
    tenía espacios en el nombre, complicado para URLs).
- **Reorganización en carpeta `obras/`** (para que la raíz del sitio no siga
  creciendo): se movió la landing detallada a `obras/index.html`
  (corrigiendo todas las rutas relativas al nuevo nivel de carpeta) y se creó
  `obras/el-clon.html` como landing propia de esa obra (portada `01.webp`,
  galería completa de 13 fotos con lightbox, sección de Videos con nota de
  "muy pronto sumamos videos" ya que todavía no hay video de esa obra).
  El bloque de El Clon dentro de `obras/index.html` quedó liviano (texto +
  botón "Ver obra completa"), igual que IsoElite y Casas Llave en Mano, para
  no duplicar fotos.
- Se agregó un pequeño estilo en `assets/styles/obras.css` para que la
  tarjeta "Ver todas las obras" se vea clickeable (antes tenía
  `cursor:default` porque era un texto sin link).

## 5. Sección Obras del home (`index.html`) — ajustes finales

- Se sacó la tarjeta **"Galpones"** de la grilla.
- Se agregó **"El Clon"** en segundo lugar (justo después de Ebital), con
  portada `01.webp` y la etiqueta "Saber más →" dentro de la tarjeta,
  linkeando directo a `obras/el-clon.html`.
- El link final de la grilla ("Ver todas las obras →") ahora apunta a
  `obras/index.html`.
- (El detalle de Galpones/Global Import se mantiene sin cambios dentro de la
  landing completa `obras/index.html`, solo se sacó la vidriera del home.)

---

## Pendiente / a definir

- Todavía no hay video propio de la obra "El Clon" — la sección está
  preparada pero vacía, avisar cuando haya material para sumarlo.
- Quedan sin usar en `assets/img/obras2/` las carpetas **"los angeles"**
  (bastantes fotos, sin nombre de cliente claro) y **"modulos a medida"**
  (parece duplicado de `modulos/`, ya usada en Casas Llave en Mano) — no se
  tocaron por no tener claro si son obra real a publicar o material interno.
