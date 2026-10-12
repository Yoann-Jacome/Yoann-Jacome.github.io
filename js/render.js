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
    card.setAttribute("data-sub", project.subcategory || "");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    if (title) card.setAttribute("aria-label", window.t("works.openDetail") + " " + title);

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
    if (project.role) {
      // En la tarjeta se muestra solo la parte principal del rol (lo que va
      // antes de " - "); el rol completo se mostrará en el modal (Etapa 5).
      var roleFull = window.t(project.role);
      var roleShort = roleFull.split(/\s+[-–—]\s+/)[0];
      body.appendChild(el("span", "work-role", roleShort));
    }
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

    // Barra de filtros por etiqueta (Etapa 6) y estado inicial.
    renderFilters();
    applyWorksFilter("");
  }

  /* ===================== Filtros (Etapa 6) ===================== */

  var filterButtons = {}; // clave de subcategoría → botón de la barra

  /* Subcategorías con trabajos, en el orden de CATEGORIES. */
  function presentFilters() {
    var out = [];
    CATEGORIES.forEach(function (category) {
      presentSubcategories(category).forEach(function (subKey) {
        out.push({
          key: subKey,
          label: window.t(SUBCATEGORY_LABELS[subKey] || subKey)
        });
      });
    });
    return out;
  }

  /* Genera la barra: "Todos" + una pestaña por subcategoría (Videojuegos,
     Realidad virtual, Web y apps móviles, Modelado 3D, Video, Motion...). */
  function renderFilters() {
    var container = document.getElementById("works-filters");
    if (!container) return;
    container.textContent = "";
    filterButtons = {};

    var all = el("button", "filter-btn", window.t("filters.all"));
    all.type = "button";
    all.setAttribute("aria-pressed", "true");
    all.addEventListener("click", function () { applyWorksFilter(""); });
    container.appendChild(all);
    filterButtons[""] = all;

    presentFilters().forEach(function (item) {
      var btn = el("button", "filter-btn", item.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () { applyWorksFilter(item.key); });
      container.appendChild(btn);
      filterButtons[item.key] = btn;
    });
  }

  /* Muestra solo los trabajos de una subcategoría ("" = todos) y oculta las
     secciones que queden vacías. */
  function applyWorksFilter(subKey) {
    subKey = subKey || "";
    var container = document.getElementById("works-list");
    if (!container) return;

    // 1) Tarjetas que no son de la subcategoría elegida.
    Array.prototype.forEach.call(container.querySelectorAll(".work-card"), function (card) {
      var sub = card.getAttribute("data-sub") || "";
      card.hidden = !!subKey && sub !== subKey;
    });

    // 2) Subcategorías sin tarjetas visibles.
    Array.prototype.forEach.call(container.querySelectorAll(".works-subgroup"), function (sub) {
      var visible = false;
      Array.prototype.forEach.call(sub.querySelectorAll(".work-card"), function (card) {
        if (!card.hidden) visible = true;
      });
      sub.hidden = !visible;
    });

    // 3) Categorías sin subcategorías visibles.
    Array.prototype.forEach.call(container.querySelectorAll(".works-group"), function (group) {
      var visible = false;
      Array.prototype.forEach.call(group.querySelectorAll(".works-subgroup"), function (sub) {
        if (!sub.hidden) visible = true;
      });
      group.hidden = !visible;
    });

    // 4) Estado accesible de los botones (aria-pressed).
    Object.keys(filterButtons).forEach(function (key) {
      filterButtons[key].setAttribute("aria-pressed", String(key === subKey));
    });
  }

  /* ===================== Herramientas (Etapa 7) ===================== */

  function renderTools() {
    var container = document.getElementById("tools-grid");
    if (!container) return;
    container.textContent = "";

    var tools = Array.isArray(window.TOOLS) ? window.TOOLS : [];
    tools.forEach(function (tool) {
      var card = el("div", "tool");
      if (tool.icon) {
        var img = document.createElement("img");
        img.src = tool.icon;
        img.alt = "";
        img.setAttribute("aria-hidden", "true");
        img.loading = "lazy";
        // Si el logo todavía no existe, se quita y queda solo el nombre.
        img.onerror = function () {
          if (img.parentNode) img.parentNode.removeChild(img);
        };
        card.appendChild(img);
      }
      card.appendChild(el("span", "tool-name", window.t(tool.name)));
      container.appendChild(card);
    });
  }

  /* ===================== Certificados (Etapa 7) ===================== */

  function renderCertificates() {
    var container = document.getElementById("certificates-grid");
    if (!container) return;
    container.textContent = "";

    var certs = Array.isArray(window.CERTIFICATES) ? window.CERTIFICATES : [];
    certs.forEach(function (cert) {
      var title = window.t(cert.title);
      var sub = [window.t(cert.issuer), cert.date || cert.year]
        .filter(Boolean)
        .join(" · ");

      var card = el("button", "cert-card");
      card.type = "button";
      card.setAttribute("aria-label", window.t("cert.open") + " " + title);

      if (cert.image) {
        var img = document.createElement("img");
        img.src = cert.image;
        img.alt = title;
        img.loading = "lazy";
        img.decoding = "async";
        card.appendChild(img);
      } else {
        card.appendChild(el("span", "cert-placeholder", "📜"));
      }

      var meta = el("span", "cert-meta");
      meta.appendChild(el("span", "cert-title", title));
      if (sub) meta.appendChild(el("span", "cert-sub", sub));
      card.appendChild(meta);

      // Clic → lightbox con la imagen y el botón de descarga (PDF).
      card.addEventListener("click", function () {
        window.openLightbox({
          src: cert.image,
          alt: title,
          caption: title + (sub ? " — " + sub : ""),
          downloadUrl: cert.file || "",
          downloadLabel: window.t("cert.download")
        });
      });

      container.appendChild(card);
    });
  }

  // Expuesto para que main.js lo llame cuando el DOM esté listo.
  window.renderWorks = renderWorks;
  window.renderTools = renderTools;
  window.renderCertificates = renderCertificates;
  window.applyWorksFilter = applyWorksFilter;

  // Devuelve la etiqueta traducida de una subcategoría (la usa el modal).
  window.worksSubcategoryLabel = function (key) {
    return window.t(SUBCATEGORY_LABELS[key] || key);
  };
})();
