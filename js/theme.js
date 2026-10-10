/* =====================================================================
   theme.js — Cambio de tema oscuro/claro
   ---------------------------------------------------------------------
   Gestiona el botón de tema de la navbar:
     - Alterna data-theme="dark" | "light" en <html>.
     - Guarda la preferencia en localStorage (envuelto en try/catch).
     - Actualiza el ícono, el estado accesible y <meta name="theme-color">.

   La APLICACIÓN inicial del tema (antes del primer render) se hace con un
   script en línea en <head> para evitar el parpadeo; aquí solo se conecta
   el botón una vez el DOM está listo.
   ===================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "portafolio-theme";
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  var iconEl = button.querySelector(".theme-toggle-icon");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  /** Aplica el tema a la página y sincroniza el botón y los metadatos. */
  function apply(theme, persist) {
    var isDark = theme === "dark";

    root.setAttribute("data-theme", theme);

    // El ícono muestra el tema al que se cambiará al hacer clic.
    if (iconEl) iconEl.textContent = isDark ? "☀️" : "🌙";

    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro");

    // Color de la barra del navegador en móvil.
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#121212" : "#F8F9FA");

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* Sin persistencia disponible: el tema cambia solo en esta sesión. */
      }
    }
  }

  // Sincroniza el botón con el tema ya aplicado por el script de <head>.
  apply(currentTheme(), false);

  button.addEventListener("click", function () {
    apply(currentTheme() === "dark" ? "light" : "dark", true);
  });
})();
