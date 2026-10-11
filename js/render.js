/* =====================================================================
   render.js — Construye la sección de Trabajos desde js/projects-data.js
   ---------------------------------------------------------------------
   Genera, en orden:
     Categoría → Subcategoría (solo si tiene trabajos) → tarjetas.

   Reglas:
     - La página se renderiza por completo desde window.PROJECTS.
     - Las subcategorías/categorías sin trabajos se ocultan.
     - El resumen de la tarjeta se recorta a 3 líneas (ver components.css).
     - Se muestran hasta 3 etiquetas por tarjeta.

   La Etapa 5 (modal) conectará el clic/teclado de cada tarjeta usando su
   atributo data-id.
   ===================================================================== */
(function () {
  "use strict";

  /* Orden de categorías y subcategorías tal como se muestran en la página.
     Las subcategorías desconocidas que aparezcan en los datos se agregan
     automáticamente al final de su categoría. */
  var CATEGORIES = [
    {
      key: "development",
      labelKey: "works.development",
      subcategories: ["videogames", "vr", "web"]
    },
    {
      key: "audiovisual",
      labelKey: "works.audiovisual",
      subcategories: ["model3d", "video", "audio", "motion"]
    }
  ];

  /* Clave de subcategoría → clave de texto en i18n.js */
  var SUBCATEGORY_LABELS = {
    videogames: "works.sub.videogames",
    vr: "works.sub.vr",
    web: "works.sub.web",
    model3d: "works.sub.model3d",
    video: "works.sub.video",
    audio: "works.sub.audio",
    motion: "works.sub.motion"
  };

  /* --- Utilidades --- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function getProjects() {
    return Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  }

  /* Subcategorías presentes en los datos para una categoría, respetando el
     orden conocido y añadiendo las desconocidas al final. */
  function presentSubcategories(category) {
    var used = [];
    getProjects().forEach(function (p) {
      if (p.category === category.key && p.subcategory && used.indexOf(p.subcategory) === -1) {
        used.push(p.subcategory);
      }
    });

    var ordered = category.subcategories.filter(function (sub) {
      return used.indexOf(sub) !== -1;
    });
    used.forEach(function (sub) {
      if (ordered.indexOf(sub) === -1) ordered.push(sub);
    });
    return ordered;
  }

  /* Información multimedia de un trabajo (video y número de imágenes). */
  function mediaInfo(project) {
    var media = Array.isArray(project.media) ? project.media : [];
    var hasVideo = media.some(function (m) {
      return m.type === "youtube" || m.type === "video";
    });
    var imageCount = media.filter(function (m) {
      return m.type === "image";
    }).length;
    return { hasVideo: hasVideo, imageCount: imageCount };
  }

  /* Miniatura: usa project.thumbnail, o la primera imagen, o null. */
  function thumbnailSrc(project) {
    if (project.thumbnail) return project.thumbnail;
    var media = Array.isArray(project.media) ? project.media : [];
    for (var i = 0; i < media.length; i++) {
      if (media[i].type === "image" && media[i].src) return media[i].src;
    }
    return null;
  }

  /* --- Construcción de una tarjeta --- */

  function createCard(project) {
    var title = window.t(project.title);

    // Toda la tarjeta es clickeable y accesible por teclado (abre el modal
    // en la Etapa 5 mediante data-id).
    var card = el("article", "work-card");
    card.setAttribute("data-id", project.id || "");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    if (title) card.setAttribute("aria-label", "Ver detalle de " + title);

    // --- Miniatura 16:9 ---
    var thumb = el("div", "work-thumb");
    var src = thumbnailSrc(project);

    if (src) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = title || "";
      img.loading = "lazy";
      img.decoding = "async";
      thumb.appendChild(img);
    } else {
      thumb.appendChild(el("div", "work-thumb-placeholder", "Sin imagen"));
    }

    // Insignia: ▶ si tiene video, o el número de imágenes si tiene varias.
    var info = mediaInfo(project);
    if (info.hasVideo) {
      var play = el("span", "work-media-badge", "▶");
      play.setAttribute("aria-hidden", "true");
      thumb.appendChild(play);
    } else if (info.imageCount > 1) {
      var gallery = el("span", "work-media-badge", info.imageCount + " 🖼");
      gallery.setAttribute("aria-hidden", "true");
      thumb.appendChild(gallery);
    }
    card.appendChild(thumb);

    // --- Cuerpo ---
    var body = el("div", "work-body");

    if (title) body.appendChild(el("h4", "work-title", title));
    if (project.role) body.appendChild(el("span", "work-role", window.t(project.role)));
    if (project.summary) body.appendChild(el("p", "work-summary", window.t(project.summary)));

    var tags = Array.isArray(project.tags) ? project.tags : [];
    if (tags.length) {
      var ul = el("ul", "work-tags");
      tags.slice(0, 3).forEach(function (tag) {
        ul.appendChild(el("li", "work-tag", window.t(tag)));
      });
      body.appendChild(ul);
    }

    card.appendChild(body);
    return card;
  }

  /* --- Construcción de subcategoría y categoría --- */

  function createSubcategory(subKey, projects) {
    var wrap = el("div", "works-subgroup");
    wrap.appendChild(
      el("h4", "works-subcategory", window.t(SUBCATEGORY_LABELS[subKey] || subKey))
    );

    var grid = el("div", "cards-grid");
    projects.forEach(function (project) {
      grid.appendChild(createCard(project));
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function renderWorks() {
    var container = document.getElementById("works-list");
    if (!container) return;
    container.textContent = "";

    var projects = getProjects();

    CATEGORIES.forEach(function (category) {
      var subs = presentSubcategories(category);
      if (!subs.length) return; // Categoría vacía → no se muestra

      var group = el("div", "works-group");
      group.appendChild(el("h3", "works-category", window.t(category.labelKey)));

      subs.forEach(function (subKey) {
        var subProjects = projects.filter(function (p) {
          return p.category === category.key && p.subcategory === subKey;
        });
        if (subProjects.length) group.appendChild(createSubcategory(subKey, subProjects));
      });

      container.appendChild(group);
    });
  }

  // Expuesto para que main.js lo llame cuando el DOM esté listo.
  window.renderWorks = renderWorks;
})();
