/* ============================================================
   ISOPANEL URUGUAY — JS base
   1) Header cambia de estilo al hacer scroll
   2) Menú hamburguesa en mobile
   3) Animaciones "reveal" al entrar en viewport (scroll)
   Se reutiliza en todas las secciones que se agreguen después.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

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
    '50': '50 mm — aislación estándar, ideal para climas templados y uso habitacional habitual.',
    '80': '80 mm — mayor aislación térmica y acústica, recomendado para uso todo el año.',
    '100': '100 mm — máximo rendimiento térmico, pensado para exigencias de confort superiores.'
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

  /* --- 9) Obras: lightbox --- */
  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const fullImg = lightbox.querySelector('[data-lightbox-full]');
    const captionEl = lightbox.querySelector('[data-lightbox-caption-el]');
    document.querySelectorAll('[data-lightbox-img]').forEach(item => {
      item.addEventListener('click', () => {
        fullImg.src = item.dataset.lightboxImg;
        captionEl.textContent = item.dataset.lightboxCaption || '';
        lightbox.hidden = false;
      });
    });
    const closeLightbox = () => { lightbox.hidden = true; };
    lightbox.querySelector('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

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

  /* --- 11) Diferenciales: "Mostrar más" (solo mobile) --- */
  document.querySelectorAll('[data-show-more]').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.dif-col--collapsible');
      if (!col) return;
      const expanded = col.classList.toggle('is-expanded');
      btn.textContent = expanded ? 'Mostrar menos' : 'Mostrar más';
    });
  });

});
