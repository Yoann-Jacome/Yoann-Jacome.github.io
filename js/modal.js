/* =====================================================================
   modal.js — Modal + multimedia (YouTube / carrusel)
   ---------------------------------------------------------------------
   ETAPA 5: abre el detalle de un trabajo desde su tarjeta.

   - Área multimedia grande (sección 8.2 de PORTAFOLIO_SPEC.md):
     · Un video → reproductor de YouTube incrustado (nocookie, 16:9).
     · Imágenes → carrusel que muestra UNA imagen completa a la vez
       (flechas, indicadores, deslizar en táctil y teclas ← →).
     · El iframe del video SOLO se crea cuando su diapositiva está
       visible y se elimina al salir de ella o al cerrar el modal
       (así el video se detiene y la página se mantiene liviana).
   - Cierre con ✕, Esc o clic en el fondo; foco atrapado dentro del
     modal y devuelto a la tarjeta al cerrar; bloqueo del scroll del
     body; hash #id en la URL para compartir y apertura al cargar la
     página si el hash coincide con un trabajo.
   ===================================================================== */
(function () {
  "use strict";

  var modalEl = null;      // el diálogo (se construye una sola vez)
  var slides = [];         // elementos .car-slide del carrusel
  var mediaItems = [];     // datos de cada diapositiva ({type, urlId, src...})
  var current = 0;         // índice de la diapositiva visible
  var activeId = null;     // id del trabajo abierto
  var lastFocused = null;  // elemento que tenía el foco antes de abrir
  var touchStartX = null;  // inicio del gesto táctil

  function t(value) {
    return window.t ? window.t(value) : String(value);
  }

  /* Extrae el ID de un video de YouTube desde varios formatos de URL:
     youtu.be/ID, watch?v=ID, shorts/ID, embed/ID. */
  function youtubeId(url) {
    if (!url) return "";
    var m = String(url).match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
    );
    return m ? m[1] : "";
  }

  function getProject(id) {
    var list = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  /* Crea el DOM del modal una sola vez y lo agrega al final del <body>. */
  function ensureModal() {
    if (modalEl) return modalEl;

    modalEl = document.createElement("div");
    modalEl.className = "modal";

    // Fondo: clic para cerrar.
    var backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.addEventListener("click", closeModal);
    modalEl.appendChild(backdrop);

    var panel = document.createElement("div");
    panel.className = "modal-panel";

    var close = document.createElement("button");
    close.type = "button";
    close.className = "modal-close";
    close.setAttribute("aria-label", t("modal.close"));
    close.textContent = "✕";
    close.addEventListener("click", closeModal);
    panel.appendChild(close);

    /* --- Carrusel (se oculta si el trabajo no tiene multimedia) --- */
    var media = document.createElement("div");
    media.className = "modal-media";
    media.hidden = true;

    var viewport = document.createElement("div");
    viewport.className = "carousel-viewport";
    var track = document.createElement("div");
    track.className = "carousel-slides";
    viewport.appendChild(track);
    media.appendChild(viewport);

    var prev = document.createElement("button");
    prev.type = "button";
    prev.className = "carousel-btn carousel-prev";
    prev.setAttribute("aria-label", t("modal.prev"));
    prev.textContent = "‹";
    prev.addEventListener("click", function () { move(-1); });
    media.appendChild(prev);

    var next = document.createElement("button");
    next.type = "button";
    next.className = "carousel-btn carousel-next";
    next.setAttribute("aria-label", t("modal.next"));
    next.textContent = "›";
    next.addEventListener("click", function () { move(1); });
    media.appendChild(next);

    var count = document.createElement("span");
    count.className = "carousel-count";
    count.setAttribute("aria-hidden", "true");
    media.appendChild(count);

    var nav = document.createElement("div");
    nav.className = "carousel-nav";
    media.appendChild(nav);

    // Deslizar con el dedo (móvil): cambia de diapositiva.
    media.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    });
    media.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
      touchStartX = null;
    });

    panel.appendChild(media);

    /* --- Cuerpo: título, rol + subcategoría, equipo, descripción --- */
    var body = document.createElement("div");
    body.className = "modal-body";

    var title = document.createElement("h3");
    title.id = "modal-title";
    body.appendChild(title);

    var meta = document.createElement("p");
    meta.className = "modal-meta";
    body.appendChild(meta);

    var team = document.createElement("p");
    team.className = "modal-team";
    body.appendChild(team);

    var description = document.createElement("div");
    description.className = "modal-description";
    body.appendChild(description);

    var links = document.createElement("div");
    links.className = "modal-links";
    body.appendChild(links);

    var tags = document.createElement("ul");
    tags.className = "modal-tags";
    body.appendChild(tags);

    panel.appendChild(body);
    modalEl.appendChild(panel);
    modalEl.setAttribute("role", "dialog");
    modalEl.setAttribute("aria-modal", "true");
    modalEl.setAttribute("aria-labelledby", title.id);
    modalEl.hidden = true;
    document.body.appendChild(modalEl);

    return modalEl;
  }

  /* Construye las diapositivas a partir del arreglo media. */
  function buildCarousel(media) {
    var el = ensureModal();
    var track = el.querySelector(".carousel-slides");
    var nav = el.querySelector(".carousel-nav");
    var area = el.querySelector(".modal-media");

    track.textContent = "";
    nav.textContent = "";
    slides = [];
    mediaItems = media;
    current = 0;

    area.hidden = !media.length; // sin multimedia → sin área
    if (!media.length) return;

    media.forEach(function (item, i) {
      var slide = document.createElement("div");
      slide.className = "car-slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-label", (i + 1) + " / " + media.length);

      if (item.type === "youtube") {
        // El iframe se inyecta solo cuando la diapositiva está visible.
        var holder = document.createElement("div");
        holder.className = "car-video";
        slide.appendChild(holder);
      } else {
        // Imagen: la imagen completa se ve dentro del marco (object-fit:
        // contain) y el enlace abre el archivo original a tamaño completo.
        var anchor = document.createElement("a");
        anchor.className = "car-image";
        anchor.href = item.src;
        anchor.target = "_blank";
        anchor.rel = "noopener";
        anchor.setAttribute("aria-label", t("modal.openImage"));
        var img = document.createElement("img");
        img.src = item.src;
        img.alt = t(item.caption) || "";
        img.loading = "lazy";
        img.decoding = "async";
        anchor.appendChild(img);
        slide.appendChild(anchor);
      }
      track.appendChild(slide);
      slides.push(slide);
    });

    // Indicadores (uno por diapositiva).
    media.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", t("modal.goToSlide") + " " + (i + 1));
      dot.addEventListener("click", function () { showSlide(i); });
      nav.appendChild(dot);
    });

    showSlide(0);
  }

  /* Crea o elimina el iframe de una diapositiva según esté visible. */
  function renderVideoSlide(i) {
    var slide = slides[i];
    var holder = slide.querySelector(".car-video");
    if (!holder) return;
    if (i === current) {
      if (!holder.querySelector("iframe")) {
        var id = mediaItems[i].urlId;
        if (!id) return;
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?rel=0";
        iframe.title = "Video de YouTube";
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        holder.appendChild(iframe);
      }
    } else {
      holder.textContent = ""; // quita el iframe y detiene el video
    }
  }

  /* Muestra una sola diapositiva completa a la vez (una imagen o video). */
  function showSlide(index) {
    if (!slides.length) return;
    current = Math.max(0, Math.min(index, slides.length - 1));

    ensureModal().querySelector(".carousel-slides").style.transform =
      "translateX(-" + current * 100 + "%)";

    ensureModal().querySelector(".carousel-count").textContent =
      (current + 1) + " / " + slides.length;

    var dots = ensureModal().querySelectorAll(".carousel-dot");
    for (var d = 0; d < dots.length; d++) {
      if (d === current) dots[d].setAttribute("aria-current", "true");
      else dots[d].removeAttribute("aria-current");
    }

    // Actualiza los iframes (solo el visible los tiene).
    for (var s = 0; s < slides.length; s++) renderVideoSlide(s);
  }

  function move(step) {
    showSlide(current + step);
  }

  /* Abre el modal con el detalle del trabajo indicado. */
  function openModal(id) {
    var project = getProject(id);
    if (!project) return;

    var el = ensureModal();
    activeId = id;
    lastFocused = document.activeElement;

    el.querySelector("#modal-title").textContent = t(project.title);

    // Rol completo + subcategoría.
    var subLabel = window.worksSubcategoryLabel
      ? window.worksSubcategoryLabel(project.subcategory)
      : project.subcategory || "";
    var metaEl = el.querySelector(".modal-meta");
    metaEl.textContent = "";
    var role = document.createElement("strong");
    role.textContent = t(project.role);
    metaEl.appendChild(role);
    if (subLabel) metaEl.appendChild(document.createTextNode(" · " + subLabel));

    // Equipo (campo opcional en los datos).
    var teamEl = el.querySelector(".modal-team");
    teamEl.hidden = !(Array.isArray(project.team) && project.team.length);
    if (!teamEl.hidden) {
      teamEl.textContent = t("modal.team") + ": " + project.team.join(", ");
    }

    el.querySelector(".modal-description").textContent = t(project.description);

    // Botones extra (links opcionales).
    var linksEl = el.querySelector(".modal-links");
    linksEl.textContent = "";
    (Array.isArray(project.links) ? project.links : []).forEach(function (link) {
      var a = document.createElement("a");
      a.className = "btn";
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = t(link.label);
      linksEl.appendChild(a);
    });

    // Etiquetas: al hacer clic se cierra el modal y se aplica el filtro
    // (la barra de filtros llega en la Etapa 6).
    var tagsEl = el.querySelector(".modal-tags");
    tagsEl.textContent = "";
    (Array.isArray(project.tags) ? project.tags : []).forEach(function (tag) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "modal-tag";
      btn.textContent = t(tag);
      btn.addEventListener("click", function () {
        closeModal();
        if (window.applyWorksFilter) window.applyWorksFilter(t(tag));
      });
      li.appendChild(btn);
      tagsEl.appendChild(li);
    });

    // Multimedia → carrusel.
    var media = Array.isArray(project.media) ? project.media : [];
    buildCarousel(
      media.map(function (item) {
        return {
          type: item.type,
          src: item.src,
          caption: item.caption,
          urlId: youtubeId(item.url)
        };
      })
    );

    el.hidden = false;
    document.body.classList.add("scroll-locked");
    el.querySelector(".modal-close").focus();

    // Hash #id en la URL para poder compartir el trabajo.
    try { history.pushState(null, "", "#" + project.id); } catch (e) { /* file:// u otros */ }
  }

  /* Cierra el modal y deja todo limpio. */
  function closeModal() {
    if (!modalEl || modalEl.hidden) return;

    modalEl.hidden = true;
    document.body.classList.remove("scroll-locked");

    // Elimina los iframes para detener los videos.
    slides.forEach(function (slide) {
      var holder = slide.querySelector(".car-video");
      if (holder) holder.textContent = "";
    });

    // Quita el hash de la URL sin agregar entradas al historial.
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (e) { /* file:// u otros */ }

    // Devuelve el foco a la tarjeta que abrió el modal.
    var backTo = lastFocused;
    if (!backTo || !backTo.focus) {
      backTo = document.querySelector('.work-card[data-id="' + activeId + '"]');
    }
    if (backTo && backTo.focus) backTo.focus();
    lastFocused = null;
  }

  /* Mantiene el foco dentro del modal (trampa de foco). */
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    var focusables = modalEl.querySelectorAll(
      'button, a[href], iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || active === modalEl) { event.preventDefault(); last.focus(); }
    } else if (active === last) {
      event.preventDefault(); first.focus();
    }
  }

  /* Teclado global del modal y del lightbox: Esc, ← → y Tab. */
  function onGlobalKey(event) {
    // El lightbox de certificados tiene prioridad si está abierto.
    if (lightboxEl && !lightboxEl.hidden) {
      if (event.key === "Escape") closeLightbox();
      return;
    }
    if (!modalEl || modalEl.hidden) return;
    if (event.key === "Escape") {
      closeModal();
    } else if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && slides.length > 1) {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Tab") {
      trapFocus(event);
    }
  }

  /* Abre el modal al cargar la página si el hash es el id de un trabajo. */
  function openFromHash() {
    var id = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    if (id) openModal(id);
  }

  /* Conecta las tarjetas (.work-card) con el modal y el teclado global. */
  function initModal() {
    document.addEventListener("click", function (event) {
      var card = event.target.closest ? event.target.closest(".work-card") : null;
      if (card && card.getAttribute("data-id")) {
        openModal(card.getAttribute("data-id"));
      }
    });

    // Tarjetas accesibles por teclado (Enter / Espacio).
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var card = event.target.closest ? event.target.closest(".work-card") : null;
      if (card && card.getAttribute("data-id")) {
        event.preventDefault();
        openModal(card.getAttribute("data-id"));
      }
    });

    document.addEventListener("keydown", onGlobalKey);
    openFromHash();
  }

  /* ===================== Lightbox (certificados, Etapa 7) =====================
     Reutiliza el patrón del modal: fondo, cierre con ✕/Esc/fondo, bloqueo
     del scroll y devolución del foco. Muestra la imagen y un botón para
     descargar el PDF del certificado. */
  var lightboxEl = null;
  var lightboxLastFocus = null;

  function ensureLightbox() {
    if (lightboxEl) return lightboxEl;

    lightboxEl = document.createElement("div");
    lightboxEl.className = "lightbox";
    lightboxEl.hidden = true;
    lightboxEl.setAttribute("role", "dialog");
    lightboxEl.setAttribute("aria-modal", "true");

    var backdrop = document.createElement("div");
    backdrop.className = "lightbox-backdrop";
    backdrop.addEventListener("click", closeLightbox);
    lightboxEl.appendChild(backdrop);

    var panel = document.createElement("div");
    panel.className = "lightbox-panel";

    var close = document.createElement("button");
    close.type = "button";
    close.className = "lightbox-close";
    close.setAttribute("aria-label", t("modal.close"));
    close.textContent = "✕";
    close.addEventListener("click", closeLightbox);
    panel.appendChild(close);

    panel.appendChild(el2("div", "lightbox-media"));
    panel.appendChild(el2("p", "lightbox-caption"));
    panel.appendChild(el2("div", "lightbox-actions"));

    lightboxEl.appendChild(panel);
    document.body.appendChild(lightboxEl);
    return lightboxEl;
  }

  /* Ayudante local para crear elementos (mismo estilo que render.js). */
  function el2(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function openLightbox(options) {
    var el = ensureLightbox();
    options = options || {};
    lightboxLastFocus = document.activeElement;

    var media = el.querySelector(".lightbox-media");
    media.textContent = "";
    if (options.src) {
      var img = document.createElement("img");
      img.src = options.src;
      img.alt = options.alt || "";
      media.appendChild(img);
    }

    el.querySelector(".lightbox-caption").textContent = options.caption || options.title || "";

    var actions = el.querySelector(".lightbox-actions");
    actions.textContent = "";
    if (options.downloadUrl) {
      var link = document.createElement("a");
      link.className = "btn";
      link.href = options.downloadUrl;
      link.setAttribute("download", "");
      link.textContent = options.downloadLabel || t("cert.download");
      actions.appendChild(link);
    }

    el.hidden = false;
    document.body.classList.add("scroll-locked");
    el.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    if (!lightboxEl || lightboxEl.hidden) return;
    lightboxEl.hidden = true;
    document.body.classList.remove("scroll-locked");
    if (lightboxLastFocus && lightboxLastFocus.focus) lightboxLastFocus.focus();
    lightboxLastFocus = null;
  }

  window.openProjectModal = openModal;
  window.openLightbox = openLightbox;
  window.initModal = initModal;
})();