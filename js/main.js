/* =====================================================================
   main.js — Inicialización, filtros y utilidades
   ---------------------------------------------------------------------
   ETAPA 2: inicializa el menú de navegación móvil.
   Las Etapas 4–6 agregarán el render de trabajos y los filtros.
   ===================================================================== */
(function () {
  "use strict";

  /** Conecta el botón hamburguesa con el panel de navegación en móvil. */
  function initMobileNav() {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!header || !toggle) return;

    function setOpen(open) {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }

    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("nav-open"));
    });

    // Cierra el menú al elegir un enlace.
    if (nav) {
      nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) setOpen(false);
      });
    }

    // Cierra el menú con la tecla Escape.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("nav-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Aplica los textos de i18n.js (español por ahora) al HTML estático.
    if (window.applyTranslations) window.applyTranslations(document);
    initMobileNav();
  });
})();
