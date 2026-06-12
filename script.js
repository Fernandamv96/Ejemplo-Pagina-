// =====================
// Utilidades
// =====================

/**
 * Selecciona un elemento del DOM por selector CSS.
 * @param {string} selector
 * @returns {Element|null}
 */
const $ = (selector) => document.querySelector(selector);

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
      document.querySelector('#acerca')?.scrollIntoView({ behavior: 'smooth' });
    });
  }


  // --- Formulario de contacto ---
  const btnEnviar     = $('#btn-enviar');
  const inputNombre   = $('#input-nombre');
  const msgRespuesta  = $('#mensaje-respuesta');

  if (btnEnviar && inputNombre && msgRespuesta) {
    btnEnviar.addEventListener('click', () => {
      const nombre = inputNombre.value.trim();

      if (!nombre) {
        mostrarMensaje('Por favor escribe tu nombre antes de enviar.', 'error');
        return;
      }

      // Simula una respuesta del servidor
      btnEnviar.disabled = true;
      btnEnviar.textContent = 'Enviando…';

      setTimeout(() => {
        mostrarMensaje(`¡Gracias, ${nombre}! Tu mensaje fue recibido.`, 'ok');
        inputNombre.value  = '';
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar';
      }, 900);
    });

    // Enviar con Enter
    inputNombre.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') btnEnviar.click();
    });
  }


  // =====================
  // Helpers internos
  // =====================

  /**
   * Muestra un mensaje de respuesta temporal en la sección de contacto.
   * @param {string} texto
   * @param {'ok'|'error'} tipo
   */
  function mostrarMensaje(texto, tipo) {
    msgRespuesta.textContent = texto;
    msgRespuesta.style.color = tipo === 'error' ? '#f76f6f' : 'var(--color-acento)';
    setVisible(msgRespuesta, true);

    // Ocultar después de 4 segundos
    setTimeout(() => setVisible(msgRespuesta, false), 4000);
  }

});
