// =====================
// Utilidades
// =====================

/**
 * Selecciona un elemento del DOM por selector CSS.
 * @param {string} selector
 * @returns {Element|null}
 */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Muestra u oculta un elemento usando la clase CSS "oculto".
 * @param {Element} el
 * @param {boolean} visible
 */
const setVisible = (el, visible) => {
  el.classList.toggle('oculto', !visible);
};


// =====================
// Inicialización
// =====================

document.addEventListener('DOMContentLoaded', () => {

  // --- Año actual en el footer ---
  const spanAnio = $('#anio');
  if (spanAnio) spanAnio.textContent = new Date().getFullYear();


  // --- Botón principal (hero) ---
  const btnPrincipal = $('#btn-principal');
  if (btnPrincipal) {
    btnPrincipal.addEventListener('click', () => {
      $('#como-usar')?.scrollIntoView({ behavior: 'smooth' });
    });
  }


  // --- Header: fondo al hacer scroll y menú móvil ---
  const header = $('#header');
  const nav    = $('#nav');
  const toggle = $('#nav-toggle');

  const alHacerScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', alHacerScroll, { passive: true });
  alHacerScroll();

  const cerrarMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  };

  toggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', cerrarMenu));


  // --- Pestañas de la ventana de código ---
  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      $$('.code').forEach((bloque) => setVisible(bloque, bloque.id === `code-${tab.dataset.tab}`));
    });
  });


  // --- Aparición al hacer scroll y enlace activo del menú ---
  if ('IntersectionObserver' in window) {
    const observerReveal = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        observerReveal.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach((el) => observerReveal.observe(el));

    const observerNav = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        nav.querySelectorAll('a').forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => observerNav.observe(s));

    const observerMetricas = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        animarContador(e.target);
        observerMetricas.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach((el) => observerMetricas.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('visible'));
    $$('[data-count]').forEach(animarContador);
  }


  // --- Foco de luz que sigue al cursor en las tarjetas ---
  $$('.spotlight').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });


  // --- Formulario de contacto ---
  const form          = $('#form-contacto');
  const btnEnviar     = $('#btn-enviar');
  const inputNombre   = $('#input-nombre');
  const inputEmail    = $('#input-email');
  const inputMensaje  = $('#input-mensaje');
  const msgRespuesta  = $('#mensaje-respuesta');
  let temporizador;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre  = inputNombre.value.trim();
    const email   = inputEmail.value.trim();
    const mensaje = inputMensaje.value.trim();

    $$('.field').forEach((f) => f.classList.remove('invalid'));

    if (!nombre) return marcarError(inputNombre, 'Por favor escribe tu nombre antes de enviar.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return marcarError(inputEmail, 'Ingresa un email válido.');
    if (!mensaje) return marcarError(inputMensaje, 'Escribe un mensaje.');

    // Simula una respuesta del servidor
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando…';

    setTimeout(() => {
      mostrarMensaje(`¡Gracias, ${nombre}! Tu mensaje fue recibido.`, 'ok');
      form.reset();
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Enviar mensaje';
    }, 900);
  });


  // =====================
  // Helpers internos
  // =====================

  /**
   * Marca un campo como inválido, le da el foco y muestra el error.
   * @param {HTMLElement} input
   * @param {string} texto
   */
  function marcarError(input, texto) {
    input.closest('.field').classList.add('invalid');
    input.focus();
    mostrarMensaje(texto, 'error');
  }

  /**
   * Muestra un mensaje de respuesta temporal en la sección de contacto.
   * @param {string} texto
   * @param {'ok'|'error'} tipo
   */
  function mostrarMensaje(texto, tipo) {
    msgRespuesta.textContent = texto;
    msgRespuesta.className = `respuesta ${tipo}`;

    // Ocultar después de 4 segundos
    clearTimeout(temporizador);
    temporizador = setTimeout(() => setVisible(msgRespuesta, false), 4000);
  }

  /**
   * Anima un número desde 0 hasta el valor de data-count.
   * @param {HTMLElement} el
   */
  function animarContador(el) {
    const final  = Number(el.dataset.count);
    const sufijo = el.dataset.suffix || '';
    const inicio = performance.now();

    const paso = (t) => {
      const p = Math.min((t - inicio) / 1400, 1);
      el.textContent = Math.round(final * (1 - Math.pow(1 - p, 3))) + sufijo;
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }

});
