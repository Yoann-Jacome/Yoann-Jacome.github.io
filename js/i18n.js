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
    "nav.experience": "Experiencia",
    "nav.works": "Trabajos",
    "nav.tools": "Herramientas",
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
    "about.educationTitle": "Educación",
    "about.edu1.title": "Ingeniería en Multimedia",
    "about.edu1.place": "Universidad Militar Nueva Granada",
    "about.edu1.period": "2022 — Actualmente",
    "about.edu2.title": "Bachillerato",
    "about.edu2.place": "Colegio Distrital Los Periodistas",
    "about.edu2.period": "2016 — 2021",

    /* ---------- Experiencia ---------- */
    "experience.title": "Experiencia",
    "experience.jobsTitle": "Experiencia laboral",
    "experience.job1.role": "Asesor comercial temporal",
    "experience.job1.company": "Forus Colombia",
    "experience.job1.period": "04/12/2024 — 31/12/2024",
    "experience.job2.role": "Asesor comercial temporal",
    "experience.job2.company": "Forus Colombia",
    "experience.job2.period": "05/12/2025 — 04/01/2026",
    "experience.job3.role": "Auxiliar de inventario temporal",
    "experience.job3.company": "Pernine Ltda",
    "experience.job3.period": "19/01/2026 — 27/01/2026",
    "experience.achievementsTitle": "Logros",
    "experience.achievement1":
      "Participación en el 19° Congreso Colombiano de Computación 2025 — videojuego de físicas \"Tiro Perfecto\" (Rol: Desarrollador).",

    /* ---------- Herramientas (los íconos llegan en la Etapa 7) ---------- */
    "tools.title": "Herramientas",

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
