/* =====================================================================
   i18n.js — Textos de la interfaz por idioma + función de traducción
   ---------------------------------------------------------------------
   ETAPA 3: se completan los textos en español (interfaz + hoja de vida).
   ETAPA 8: se llena `en` y se agrega el botón ES/EN.

   Todo texto visible del sitio vive aquí. El HTML estático usa atributos
   data-i18n="clave" y render.js/main.js usan la función t().

   La función t() acepta:
     - una clave de interfaz  → "nav.about"  → devuelve el texto traducido
     - un objeto { es, en }   → devuelve el texto del idioma activo
                               (cae a español si falta la traducción)
     - cualquier otro string  → lo devuelve tal cual
   ===================================================================== */

/* Idioma activo. La Etapa 8 permite cambiarlo a "en". */
window.LANG = window.LANG || "es";

window.I18N = {
  es: {
    /* ---------- Navegación ---------- */
    "nav.about": "Sobre mí",
    "nav.works": "Trabajos",
    "nav.tools": "Herramientas",
    "nav.achievements": "Logros",
    "nav.contact": "Contacto",
    "nav.theme": "Tema",
    "nav.toggleTheme": "Cambiar tema",
    "nav.openMenu": "Abrir menú",
    "nav.closeMenu": "Cerrar menú",

    /* ---------- Hero ---------- */
    "hero.photoAlt": "Foto de perfil de Yoann Jacome",
    "hero.name": "Yoann Esteban Jacome Garcia",
    "hero.role": "Ingeniero en Multimedia",
    "hero.tagline":
      "¡Bienvenido! Creo experiencias interactivas: videojuegos, aplicaciones y contenido audiovisual. ¡Trabajemos juntos!",
    "hero.viewWorks": "Ver mis trabajos",
    "hero.downloadCV": "Descargar CV",

    /* ---------- Sobre mí ---------- */
    "about.title": "Sobre mí",
    "about.profile":
      "Me enfoco en el desarrollo web y la creación de experiencias interactivas para dispositivos móviles y entornos de realidad virtual. Cuento con conocimientos en desarrollo de videojuegos, modelado y renderizado 3D, así como en la creación y producción de contenido audiovisual, combinando diseño y narrativa en el desarrollo de proyectos multimedia.",

    /* ---------- Trabajos (categorías y subcategorías) ---------- */
    "works.development": "Desarrollo",
    "works.audiovisual": "Contenido digital audiovisual",
    "works.sub.videogames": "Videojuegos",
    "works.sub.vr": "Realidad virtual",
    "works.sub.web": "Web y apps móviles",
    "works.sub.model3d": "Modelado y renderizado 3D",
    "works.sub.video": "Video",
    "works.sub.audio": "Audio",
    "works.sub.motion": "Motion graphics",
    "works.openDetail": "Ver detalle de",

    /* ---------- Modal (Etapa 5) ---------- */
    "modal.close": "Cerrar",
    "modal.prev": "Anterior",
    "modal.next": "Siguiente",
    "modal.openImage": "Abrir imagen en tamaño completo",
    "modal.team": "Equipo",
    "modal.goToSlide": "Ir a la diapositiva",

    /* ---------- Filtros (Etapa 6) ---------- */
    "filters.label": "Filtrar trabajos por categoría",
    "filters.all": "Todos",

    /* ---------- Herramientas, certificados y contacto (Etapa 7) ---------- */
    "tools.title": "Herramientas",
    "cert.open": "Ver certificado",
    "cert.download": "Descargar certificado",
    "contact.email": "Correo",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",

    /* ---------- Logros ---------- */
    "achievements.title": "Logros",
    "achievements.item1":
      "Participación en el 19° Congreso Colombiano de Computación 2025 — videojuego de físicas \"Tiro Perfecto\" (Rol: Desarrollador).",

    /* ---------- Footer / Contacto ---------- */
    "footer.contactTitle": "Contacto",
    "footer.certificatesTitle": "Certificados",
    "footer.copyright": "© 2026 Yoann Jacome"
  },

  /* El inglés se completa en la Etapa 8. */
  en: {}
};

/**
 * Traduce una clave de interfaz, un objeto { es, en } o devuelve el
 * string tal cual si no es una clave conocida.
 * @param {string|{es:string,en:string}} value
 * @returns {string}
 */
window.t = function (value) {
  if (value === null || value === undefined) return "";

  // Valor bilingüe { es, en } (usado por los datos de trabajos).
  if (typeof value === "object") {
    var lang = window.LANG || "es";
    return value[lang] || value.es || "";
  }

  // Clave de interfaz o string libre.
  var dict = window.I18N[window.LANG] || {};
  if (Object.prototype.hasOwnProperty.call(dict, value)) return dict[value];

  // Respaldo a español si el idioma activo no tiene la clave.
  var fallback = window.I18N.es || {};
  if (Object.prototype.hasOwnProperty.call(fallback, value)) return fallback[value];

  return value;
};

/**
 * Aplica las traducciones a todos los elementos con data-i18n dentro de
 * `root`. Si el elemento tiene data-i18n-attr="alt,title", se actualizan
 * esos atributos en lugar del texto.
 * @param {Document|Element} [root]
 */
window.applyTranslations = function (root) {
  root = root || document;

  var nodes = root.querySelectorAll("[data-i18n]");
  Array.prototype.forEach.call(nodes, function (el) {
    var key = el.getAttribute("data-i18n");
    var text = window.t(key);

    var attrs = el.getAttribute("data-i18n-attr");
    if (attrs) {
      attrs.split(",").forEach(function (attr) {
        attr = attr.trim();
        if (attr) el.setAttribute(attr, text);
      });
    } else {
      el.textContent = text;
    }
  });

  // Mantiene <html lang> sincronizado con el idioma activo.
  document.documentElement.setAttribute("lang", window.LANG || "es");
};
