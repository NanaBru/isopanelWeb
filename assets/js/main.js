/* ============================================================
   ISOPANEL URUGUAY — JS base
   1) Header cambia de estilo al hacer scroll
   2) Menú hamburguesa en mobile
   3) Animaciones "reveal" al entrar en viewport (scroll)
   Se reutiliza en todas las secciones que se agreguen después.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 0) Hero: slideshow de fondo con crossfade --- */
  document.querySelectorAll('[data-hero-slideshow]').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.hero-bg-slide');
    if (slides.length < 2) return;
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 7000);
  });

  /* --- 1) Header on scroll --- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- 2) Menú mobile --- */
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.main-nav ul');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- 2b) Dropdown "Módulos" en el nav --- */
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-dropdown-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    dropdown.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });

  /* --- 3) Reveal on scroll (para futuras secciones) --- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* --- 4) Tabs de Productos --- */
  document.querySelectorAll('[data-tabs]').forEach(tabs => {
    const btns = tabs.querySelectorAll('[data-tab-btn]');
    const panels = tabs.querySelectorAll('[data-tab-panel]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabBtn;
        btns.forEach(b => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        panels.forEach(p => p.classList.toggle('is-active', p.dataset.tabPanel === target));
      });
    });
  });

  /* --- 5) Slider de Valores (Quiénes somos) --- */
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const slides = slider.querySelectorAll('[data-slide]');
    const dotsWrap = slider.parentElement.querySelector('[data-slider-dots]');
    let current = 0;

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('is-active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    const goTo = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('is-active', i === current));
      }
    };

    slider.querySelector('[data-slider-prev]')?.addEventListener('click', () => goTo(current - 1));
    slider.querySelector('[data-slider-next]')?.addEventListener('click', () => goTo(current + 1));
  });

  /* --- 6) Casa Maracaná: swatches de revestimiento --- */
  document.querySelectorAll('[data-swatches]').forEach(group => {
    const preview = group.querySelector('[data-swatch-preview]');
    const buttons = group.querySelectorAll('[data-swatch]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.toggle('is-active', b === btn));
        if (preview) preview.src = btn.dataset.swatch;
      });
    });
  });

  /* --- 7) Casa Maracaná: selector de espesor --- */
  const espesorTextos = {
    '100': '100 mm — aislación estándar, ideal para climas templados y uso habitacional habitual.',
    '150': '150 mm — mayor aislación térmica y acústica, recomendado para uso todo el año.',
    '200': '200 mm — máximo rendimiento térmico, pensado para exigencias de confort superiores.'
  };
  document.querySelectorAll('[data-espesor]').forEach(group => {
    const text = group.parentElement.querySelector('[data-esp-text]');
    const buttons = group.querySelectorAll('[data-esp]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.toggle('is-active', b === btn));
        if (text && espesorTextos[btn.dataset.esp]) text.textContent = espesorTextos[btn.dataset.esp];
      });
    });
  });

  /* --- 8) Casa Maracaná: modo editor (puerta / ventana) --- */
  document.querySelectorAll('[data-editor-group]').forEach(group => {
    const preview = document.querySelector('[data-editor-preview]');
    const buttons = group.querySelectorAll('[data-editor-img]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.toggle('is-active', b === btn));
        if (preview) preview.src = btn.dataset.editorImg;
      });
    });
  });

  /* --- 9) Obras: lightbox con galería (varias fotos por proyecto) --- */
  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const fullImg = lightbox.querySelector('[data-lightbox-full]');
    const captionEl = lightbox.querySelector('[data-lightbox-caption-el]');
    const counterEl = lightbox.querySelector('[data-lightbox-counter]');
    const prevBtn = lightbox.querySelector('[data-lightbox-prev]');
    const nextBtn = lightbox.querySelector('[data-lightbox-next]');

    let photos = [];
    let caption = '';
    let index = 0;

    const render = () => {
      fullImg.src = photos[index];
      captionEl.textContent = caption;
      counterEl.textContent = photos.length > 1 ? `${index + 1} / ${photos.length}` : '';
      const showNav = photos.length > 1;
      prevBtn.hidden = !showNav;
      nextBtn.hidden = !showNav;
    };

    document.querySelectorAll('[data-lightbox-key]').forEach(item => {
      item.addEventListener('click', () => {
        const key = item.dataset.lightboxKey;
        const count = parseInt(item.dataset.lightboxCount, 10) || 1;
        const folder = item.dataset.lightboxFolder || `/assets/img/obras2/gallery/${key}`;
        const ext = item.dataset.lightboxExt || 'jpg';
        photos = Array.from({ length: count }, (_, i) =>
          `${folder}/${String(i + 1).padStart(2, '0')}.${ext}`
        );
        caption = item.dataset.lightboxCaption || '';
        index = 0;
        render();
        lightbox.hidden = false;
      });
    });

    const showPrev = () => { index = (index - 1 + photos.length) % photos.length; render(); };
    const showNext = () => { index = (index + 1) % photos.length; render(); };
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    const closeLightbox = () => { lightbox.hidden = true; };
    lightbox.querySelector('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  /* --- 9b) Selectores de proyecto (varias obras dentro de una misma categoría) --- */
  document.querySelectorAll('[data-picker]').forEach(picker => {
    const pickerKey = picker.dataset.picker;
    document.querySelectorAll(`[data-picker-open="${pickerKey}"]`).forEach(btn => {
      btn.addEventListener('click', () => { picker.hidden = false; });
    });
    const closePicker = () => { picker.hidden = true; };
    picker.querySelector('[data-picker-close]')?.addEventListener('click', closePicker);
    picker.addEventListener('click', (e) => { if (e.target === picker) closePicker(); });
    picker.querySelectorAll('[data-lightbox-key]').forEach(item => {
      item.addEventListener('click', closePicker);
    });
    document.addEventListener('keydown', (e) => {
      if (picker.hidden) return;
      if (e.key === 'Escape') closePicker();
    });
  });

  /* --- 10) FAQ: acordeón (una pregunta abierta a la vez) --- */
  document.querySelectorAll('[data-accordion]').forEach(accordion => {
    const items = accordion.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn = item.querySelector('[data-accordion-btn]');
      const panel = item.querySelector('[data-accordion-panel]');
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        items.forEach(other => {
          const otherBtn = other.querySelector('[data-accordion-btn]');
          const otherPanel = other.querySelector('[data-accordion-panel]');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherPanel.style.maxHeight = null;
        });
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  });

  /* --- 11a) Quiénes somos: sección desplegable, cerrada por defecto --- */
  document.querySelectorAll('[data-collapsible-btn]').forEach(btn => {
    const panel = btn.parentElement.querySelector('[data-collapsible-panel]');
    if (!panel) return;
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
      btn.textContent = isOpen ? 'Ver más' : 'Ver menos';
    });
  });

  /* --- 11b) Obras: "Ver más" (solo mobile) --- */
  document.querySelectorAll('[data-obras-show-more]').forEach(btn => {
    const grid = document.querySelector('.obras-grid');
    if (!grid) return;
    btn.addEventListener('click', () => {
      const expanded = grid.classList.toggle('is-expanded');
      btn.textContent = expanded ? 'Ver menos' : 'Ver más';
    });
  });

  /* --- 11) Diferenciales: "Mostrar más" (solo mobile) --- */
  document.querySelectorAll('[data-show-more]').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.dif-col--collapsible');
      if (!col) return;
      const expanded = col.classList.toggle('is-expanded');
      btn.textContent = expanded ? 'Mostrar menos' : 'Mostrar más';
    });
  });

  /* --- 12) Formularios de cotización: arman el mensaje y abren WhatsApp --- */
  document.querySelectorAll('#cotizacion-form, #cotizacion-modal-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = data.get('nombre').trim();
      const whatsapp = data.get('whatsapp').trim();
      const departamento = data.get('departamento');
      const tipo = data.get('tipo');
      const medidas = data.get('medidas').trim();
      const instalacion = data.get('instalacion');
      const obs = data.get('obs').trim();

      let mensaje = `Hola, quiero cotizar un proyecto.\n`;
      mensaje += `Nombre: ${nombre}\n`;
      mensaje += `WhatsApp: ${whatsapp}\n`;
      mensaje += `Departamento: ${departamento}\n`;
      mensaje += `Tipo de proyecto: ${tipo}\n`;
      if (medidas) mensaje += `Medidas / m² aprox: ${medidas}\n`;
      mensaje += `Instalación: ${instalacion}\n`;
      if (obs) mensaje += `Observaciones: ${obs}\n`;

      window.open(`https://wa.me/59894692000?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');

      const modal = form.closest('[data-modal]');
      if (modal) closeModal(modal);
      form.reset();
    });
  });

  /* --- 12b) Formulario "Comprar paneles": arma el mensaje y abre WhatsApp --- */
  const panelesForm = document.getElementById('paneles-modal-form');
  if (panelesForm) {
    panelesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(panelesForm);
      const nombre = data.get('nombre').trim();
      const departamento = data.get('departamento');
      const materiales = data.get('materiales').trim();

      let mensaje = `Hola, quiero comprar material.\n`;
      mensaje += `Nombre: ${nombre}\n`;
      mensaje += `Departamento: ${departamento}\n`;
      mensaje += `Materiales que necesito: ${materiales}\n`;

      window.open(`https://wa.me/59894692000?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');

      const modal = panelesForm.closest('[data-modal]');
      if (modal) closeModal(modal);
      panelesForm.reset();
    });
  }

  /* --- 12c) Formulario "Club del Colocador": arma el mensaje y abre WhatsApp --- */
  const clubForm = document.getElementById('club-form');
  if (clubForm) {
    clubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(clubForm);
      const nombre = data.get('nombre').trim();
      const rubro = data.get('rubro');
      const zona = data.get('zona');
      const obrasMes = data.get('obras_mes').trim();
      const productos = data.get('productos').trim();

      let mensaje = `Hola, soy colocador/constructor y quiero información sobre el Club del Colocador.\n`;
      mensaje += `Nombre: ${nombre}\n`;
      mensaje += `Rubro: ${rubro}\n`;
      mensaje += `Zona de trabajo: ${zona}\n`;
      if (obrasMes) mensaje += `Obras aproximadas por mes: ${obrasMes}\n`;
      if (productos) mensaje += `Productos que compra: ${productos}\n`;

      window.open(`https://wa.me/59894692000?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
      clubForm.reset();
    });
  }

  /* --- 13) Modal de cotización: abrir / cerrar --- */
  const openModal = (modal) => {
    modal.hidden = false;
    document.body.classList.add('modal-open');
    const firstField = modal.querySelector('input, select, textarea');
    if (firstField) firstField.focus();
  };
  const closeModal = (modal) => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.openModal);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll('[data-modal]').forEach(modal => {
    modal.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(modal));
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('[data-modal]:not([hidden])').forEach(modal => closeModal(modal));
  });

  /* --- 14) Guía: buscador de la barra lateral + link activo --- */
  const guiaSearch = document.getElementById('guia-search-input');
  const guiaLinks = document.querySelectorAll('[data-guia-link]');
  if (guiaSearch && guiaLinks.length) {
    guiaSearch.addEventListener('input', () => {
      const term = guiaSearch.value.trim().toLowerCase();
      guiaLinks.forEach(link => {
        const match = link.textContent.toLowerCase().includes(term);
        link.toggleAttribute('data-guia-hidden', !match);
      });
    });

    guiaLinks.forEach(link => {
      link.addEventListener('click', () => {
        guiaLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });
  }

  /* --- 15) FAQ: buscador de preguntas --- */
  const faqSearch = document.getElementById('faq-search-input');
  const faqItems = document.querySelectorAll('.faq-accordion .faq-item');
  const faqNoResults = document.getElementById('faq-no-results');
  if (faqSearch && faqItems.length) {
    faqSearch.addEventListener('input', () => {
      const term = faqSearch.value.trim().toLowerCase();
      let visibleCount = 0;
      faqItems.forEach(item => {
        const match = item.textContent.toLowerCase().includes(term);
        item.hidden = !match;
        if (match) visibleCount++;
      });
      if (faqNoResults) faqNoResults.hidden = visibleCount !== 0;
    });
  }

});
