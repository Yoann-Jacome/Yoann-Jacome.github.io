/* =====================================================================
   projects-data.js — ÚNICO archivo que se edita para agregar trabajos
   ---------------------------------------------------------------------
   Cada trabajo es un objeto del arreglo window.PROJECTS (ver sección 7 de
   PORTAFOLIO_SPEC.md). El orden del arreglo es el orden en pantalla dentro
   de su subcategoría.

   Campos:
     id           único, en kebab-case (se usa para el enlace directo #id)
     title        título del trabajo
     category     "development" | "audiovisual"
     subcategory  "videogames" | "vr" | "web" | "model3d" | "video" | "audio" | "motion"
     role         se muestra en la tarjeta (parte principal) y en el modal
     summary      texto de la tarjeta (se recorta a 3 líneas)
     description  descripción completa del modal
     thumbnail    ruta a la miniatura (assets/img/thumbs/...)
                  Si falta, se usa la primera imagen de media.
     media        arreglo de { type: "youtube", url } y/o
                             { type: "image", src, caption }
                  Puede estar vacío (ej. trabajo sin video ni imágenes).
                  En el modal, las imágenes forman un carrusel que muestra
                  UNA imagen completa a la vez; su orden es el del arreglo.
     tags         etiquetas (alimentan los filtros de la Etapa 6)
     team         (opcional) nombres del equipo; se muestra en el modal
     links        (opcional) botones extra: { label, url }

   Los textos (role, summary, description, caption, tags) pueden ser un
   string en español o un objeto { es, en } para la Etapa 8.

   Para facilitar galerías con muchas imágenes existe el ayudante
   gallery(dir, nombres): convierte una lista de archivos en objetos media.
   ===================================================================== */

/* Convierte una lista de nombres de archivo (dentro de `dir`) en media. */
function gallery(dir, names) {
  return names.map(function (name) {
    return { type: "image", src: dir + name };
  });
}

window.PROJECTS = [
  /* ==================== DESARROLLO / VIDEOJUEGOS ==================== */
  {
    id: "hotel-1948",
    title: "Hotel 1948",
    category: "development",
    subcategory: "videogames",
    role:
      "Desarrollador - Creación de cartas, desarrollo de habitaciones, movilidad del personaje y recolección de pistas",
    summary:
      "Videojuego RPG de misterio e investigación en 2D (top-down), multiplataforma (móvil y PC).",
    description:
      "Hotel 1948 es un juego de rol en el que asumes el papel de Héctor, un exdetective encargado de resolver un homicidio ocurrido en un hotel de España en 1948, tras la Segunda Guerra Mundial. El juego pondrá a prueba tu habilidad para identificar pistas, tomar decisiones y explorar rápidamente distintas habitaciones. Sé lo suficientemente ágil para reunir las pruebas necesarias que te permitan descubrir al culpable y resolver el caso.",
    thumbnail: "assets/img/thumbs/hotel-1948.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/h4DbFRwOEJA" }],
    tags: ["Videojuego", "Unity", "móvil", "C#"],
    team: ["Yoann Jacome", "Juan Mantilla", "Diana Angel"]
  },
  {
    id: "tiro-perfecto",
    title: "Tiro Perfecto",
    category: "development",
    subcategory: "videogames",
    role:
      "Desarrollador - Creación de la física de tiro parabólico, elaboración de mapas, interacción de cámaras",
    summary: "Videojuego 2D de físicas con vista lateral para PC.",
    description:
      "Tiro Perfecto es un videojuego que destaca por simular sus propias físicas mediante código personalizado, sin usar las herramientas predeterminadas del motor Unity. En este título pondrás a prueba tu puntería con el objetivo de derribar todos los barriles; para lograrlo, deberás calcular cuidadosamente la trayectoria de cada proyectil. Una vez que los derribes todos, podrás avanzar al siguiente desafío. Explora la variedad de personajes y mapas que ofrece Tiro Perfecto y pon a prueba tu precisión.",
    thumbnail: "assets/img/thumbs/tiro-perfecto.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/rE6LoXR0WLY" }],
    tags: ["Videojuego", "Físicas", "Unity", "PC", "C#"],
    team: [
      "Yoann Jacome",
      "Alejandra Suarez",
      "Santiago Crispoca",
      "Sebastian Guzman"
    ]
  },
  {
    id: "hide-ai-seek",
    title: "Hide Ai Seek",
    category: "development",
    subcategory: "videogames",
    role:
      "Desarrollador - Elaboración de mapas, animación de personajes, interacción con objetos",
    summary:
      "Videojuego arcade de sigilo con patrullas de IA, en 2D (vista top-down) para PC.",
    description:
      "Hide AI Seek es un videojuego de sigilo en 2D donde deberás poner a prueba tus habilidades de infiltración. Tu objetivo es claro: estudiar el entorno, recolectar la llave y alcanzar el cofre sin que los guardias que patrullan la zona te detecten. ¿Serás capaz de completar todos los mapas sin ser atrapado? ¡Pon a prueba tu capacidad de escape superando sus diferentes niveles!",
    thumbnail: "assets/img/thumbs/hide-ai-seek.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/MLR2CzBYga4" }],
    tags: ["Videojuego", "IA", "Sigilo", "Unity", "PC", "C#"],
    team: ["Yoann Jacome", "Juan Mantilla"]
  },
  {
    id: "under-shadows",
    title: "Under Shadows",
    category: "development",
    subcategory: "videogames",
    role: "Desarrollador - Creación de interacciones, mecánicas y ambientación",
    summary:
      "Videojuego de supervivencia y acción PvE. Gestiona el tiempo contrarreloj alternando entre la recolección de equipo y combates contra hordas de sombras.",
    description:
      "Under Shadows es un juego de supervivencia PvE desarrollado en UEFN (Unreal Editor for Fortnite) para Fortnite, ambientado en un bosque con cabañas suspendidas entre los árboles. La gestión del tiempo es la clave para seguir con vida: la partida alterna una fase de preparación, en la que exploras y saqueas equipo de nubes interactivas, con fases de combate contra oleadas de sombras, todo acompañado de transiciones visuales y música de tensión. Además, unos botones de azar pueden sumar o restar segundos a tu reloj, añadiendo un riesgo táctico. Sobrevive a las hordas, optimiza tu equipamiento y prepárate para el enfrentamiento final contra el jefe: la \"Sombra Mayor\".",
    thumbnail: "assets/img/thumbs/under-shadows.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/RoRkVyGWAnc" }],
    tags: ["UEFN", "Fortnite", "Videojuego", "PvE", "Supervivencia", "Gestión de tiempo", "Acción"],
    team: [
      "Yoann Jacome",
      "Sebastian Guzman",
      "Alejandra Suarez",
      "Juanita Palacios",
      "Santiago Crispoca"
    ]
  },

  /* ==================== DESARROLLO / REALIDAD VIRTUAL ==================== */
  {
    id: "fragmentos",
    title: "Fragmentos VR",
    category: "development",
    subcategory: "vr",
    role:
      "Modelador 3D - Creación del entorno del videojuego (casa), elaboración de prompts",
    summary:
      "Aventura de misterio y puzzles en Realidad Virtual (VR). Explora una casa en la Bogotá de los años 80, habla con NPCs y resuelve acertijos para reunir los fragmentos de una fotografía.",
    description:
      "Fragmentos es una experiencia de misterio y exploración en Realidad Virtual ambientada en la Bogotá de la década de 1980. Te encuentras dentro de una casa tradicional colombiana llena de objetos de la época y una atmósfera cargada de nostalgia. Tu misión es encontrar y reconstruir una fotografía dividida en tres fragmentos ocultos: para lograrlo, deberás interactuar con el entorno, resolver puzzles y conversar con los habitantes de la casa, quienes te darán pistas para superar los desafíos y completar la foto.",
    thumbnail: "assets/img/thumbs/fragmentos.jpg",
    // Video primero y luego los renders del entorno que modelé, en el orden
    // numérico de la carpeta assets/img/projects/fragmentos/.
    media: [{ type: "youtube", url: "https://youtu.be/d-vHVhG8PTA" }].concat(
      gallery("assets/img/projects/fragmentos/", [
        "Render_1.png",
        "Render_2.png",
        "Render_3.png",
        "Render_4.png",
        "Render_5.png",
        "Render_6.png",
        "Render_7.jpg",
        "Render_8.png",
        "Render_9.png",
        "Render_10.jpg",
        "Render_11.jpg",
        "Render_12.png",
        "Render_13.png",
        "Render_14.png",
        "Render_15.png",
        "Render_16.png",
        "Render_17.png",
        "Render_18.png",
        "Render_19.jpg",
        "Render_20.jpg",
        "Render_21.jpg",
        "Render_22.jpg",
        "Render_23.jpg",
        "Render_24.jpg",
        "Render_25.jpg"
      ])
    ),
    tags: ["Videojuego", "VR", "Realidad Virtual", "Unity", "3D", "C#", "Maya"],
    team: [
      "Yoann Jacome",
      "David Mendieta",
      "Juan Vasquez",
      "Astrid Melo",
      "Sebastian Guzman",
      "Laura Robayo"
    ]
  },
  {
    id: "septimazo-aereo",
    title: "Septimazo Aéreo",
    category: "development",
    subcategory: "vr",
    role:
      "Desarrollador - Creación e implementación de niveles y SFX, elaboración de interfaces",
    summary:
      "Videojuego arcade de simulación en Realidad Virtual (VR). Sobrevuela la Carrera Séptima de Bogotá como una paloma y acierta en los objetivos para conseguir la mayor puntuación.",
    description:
      "Septimazo Aéreo es una experiencia de Realidad Virtual donde asumes el papel de una paloma que sobrevuela la emblemática Carrera Séptima de Bogotá. Tu objetivo es usar tu puntería y reflejos para acertar tus \"descargas\" en lugares y blancos específicos de la calle. La precisión lo es todo: según el momento exacto en el que presiones el botón de acción, obtienes una puntuación diferente. El control es inmersivo: mueves la cabeza para dirigir la trayectoria del vuelo y usas el mando para desplazarte. El juego incluye efectos de sonido con frases típicas de Bogotá y un tutorial interactivo para dominar rápido las mecánicas antes de lanzarte a surcar los cielos de la capital.",
    thumbnail: "assets/img/thumbs/septimazo-aereo.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/_Thy026nECc" }],
    tags: ["Videojuego", "VR", "Realidad Virtual", "Arcade", "Simulación", "Unity", "3D", "C#"],
    team: [
      "Yoann Jacome",
      "Juanita Ruiz",
      "Luisa Sánchez",
      "Andrés Guevara",
      "Catalina Rodríguez"
    ]
  },

  /* ==================== DESARROLLO / WEB Y APPS MÓVILES ==================== */
  {
    id: "las-acacias",
    title: "Las Acacias floristería",
    category: "development",
    subcategory: "web",
    role: "Desarrollador Backend y Base de Datos",
    summary:
      "Plataforma web e-commerce para una floristería. Incluye catálogo de productos, carrito de compras y un panel de administración para gestionar inventario y pedidos.",
    description:
      "Plataforma de comercio electrónico integral para una floristería, desarrollada en equipo. La interfaz ofrece a los clientes un catálogo interactivo de ramos y manojos, con los detalles de cada producto y la opción de personalizar pedidos con complementos como chocolates o peluches, además de secciones informativas (Quiénes somos, Preguntas frecuentes) y un carrusel visual. En el lado del servidor se implementaron el registro y login de usuarios, el carrito de compras con historial de pedidos, el control de inventario y un panel de administración privado para el dueño del negocio, junto con un buscador dinámico conectado al stock de la tienda. El proyecto fue desplegado en un servidor de InfinityFree.",
    thumbnail: "assets/img/thumbs/las-acacias.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/7BVaDdF6PsI" }],
    tags: ["Desarrollo Web", "E-commerce", "Base de Datos", "Backend", "HTML", "CSS"],
    team: [
      "Yoann Jacome",
      "Alejandra Suarez",
      "Santiago Crispoca",
      "Sebastian Guzman"
    ]
  },
  {
    id: "noesis",
    title: "Noesis",
    category: "development",
    subcategory: "web",
    role:
      "Desarrollador - Implementación de interfaces y entornos, elaboración y edición de audios, funcionalidad del temporizador",
    summary:
      "Aplicación móvil interactiva. Ofrece entornos 360° con audio binaural y minijuegos táctiles para meditar, estudiar (estilo Pomodoro) y relajarse.",
    description:
      "Noesis es una aplicación multimedia interactiva creada para ayudar a gestionar el estrés académico, laboral o general y mejorar la concentración. Tiene tres modos principales: \"Meditar\", \"Estudiar\" (basado en la técnica Pomodoro) y \"Relajarse\". Cada modo transporta al usuario a un entorno inmersivo de 360° que puede explorar moviendo su dispositivo móvil gracias al giroscopio, acompañado de audio binaural y minijuegos táctiles.",
    thumbnail: "assets/img/thumbs/noesis.jpg",
    media: [], // Video pendiente; se agrega cuando el dueño lo entregue.
    tags: ["App Móvil", "Bienestar", "Unity", "Audio Binaural", "Entornos 360°", "C#"],
    team: ["Yoann Jacome", "Alejandra Suarez", "Santiago Crispoca"]
  },

  /* ============ CONTENIDO DIGITAL AUDIOVISUAL / VIDEO ============ */
  {
    id: "mas-alla-del-fallo",
    title: "Más Allá del Fallo",
    category: "audiovisual",
    subcategory: "video",
    role:
      "Editor y productor - Guionista, rotoscopia e implementación de efectos visuales y LUTs",
    summary:
      "Cortometraje motivacional que utiliza técnicas de rotoscopia, color grading y motion graphics para narrar una historia de superación.",
    description:
      "Este proyecto audiovisual fue diseñado con un objetivo narrativo y emocional claro: inspirar al espectador y transmitir el mensaje de que, a pesar de los tropiezos y los momentos de duda, el esfuerzo constante trae su recompensa. La historia sigue a cuatro protagonistas que \"fracasan\" en sus propósitos antes de alcanzar el éxito, con un desenlace satisfactorio y motivador.",
    thumbnail: "assets/img/thumbs/mas-alla-del-fallo.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/8zA7KEM_JoA" }],
    tags: [
      "Edición de Video",
      "Rotoscopia",
      "Motion Graphics",
      "Corrección de Color",
      "LUTs",
      "Postproducción",
      "Premiere Pro"
    ],
    team: [
      "Yoann Jacome",
      "Sebastian Guzman",
      "Alejandra Suarez",
      "Juanita Palacios"
    ]
  },
  {
    id: "el-antidoto",
    title: "El Antídoto",
    category: "audiovisual",
    subcategory: "video",
    role: "Animador 2D / Guionista / Postproductor",
    summary:
      "Cortometraje de animación 2D que implementa cámara multiplano, principios clásicos de animación y postproducción.",
    description:
      "Este proyecto es un cortometraje animado en 2D desarrollado como un producto integral para demostrar el dominio de diversas técnicas de producción audiovisual, a través de una breve secuencia narrativa.",
    thumbnail: "assets/img/thumbs/el-antidoto.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/QBpyzA9w7o0" }],
    tags: ["Animación 2D", "Adobe Animate", "Cortometraje", "Postproducción", "Principios de la Animación", "Audio"],
    team: ["Yoann Jacome"]
  },

  /* === CONTENIDO DIGITAL AUDIOVISUAL / MODELADO Y RENDERIZADO 3D === */
  {
    id: "diversidad-modelos-3d",
    title: "Diversidad de modelos 3D",
    category: "audiovisual",
    subcategory: "model3d",
    role: "Modelador 3D y renderizador",
    summary: "Recopilación de modelados 3D realizados con polígonos y NURBS, con puesta en escena de luces para los renders.",
    description:
      "Este apartado reúne distintos modelados 3D realizados con polígonos y NURBS en Autodesk Maya, junto con la puesta en escena de luces utilizada para los renders.",
    // Sin video: la miniatura usará la primera imagen de la galería.
    media: gallery("assets/img/projects/modelado-3d/", [
      "render_1.png",
      "render_2.png",
      "render_3.png",
      "render_4.png",
      "render_5.png",
      "render_6.png",
      "render_7.png",
      "render_8.png",
      "render_9.png",
      "render_10.png",
      "render_11.jpg",
      "render_12.png",
      "render_13.png",
      "render_14.png",
      "render_15.png",
      "render_16.png",
      "render_17.png",
      "render_18.png",
      "render_19.png",
      "render_20.png",
      "render_21.png",
      "render_22.jpg"
    ]),
    tags: ["Modelado 3D", "Autodesk Maya", "Render", "Luces"],
    team: ["Yoann Jacome"]
  },
  {
    id: "diversidad-renders",
    title: "Diversidad de renders",
    category: "audiovisual",
    subcategory: "model3d",
    role: "Modelador 3D y renderizador",
    summary: "Recopilación de renders y modelados 3D con distintos esquemas de iluminación.",
    description:
      "Este apartado reúne los renders 3D realizados, incluyendo distintos esquemas de iluminación y puestas en escena.",
    // Orden solicitado por el dueño: evita que imágenes similares (ej. los
    // legos) queden seguidas y permita ver el resto (ej. la tortuga).
    // Primero: Render_1, 17, 5, 21, 6, 23, 14, 22 — luego el resto.
    media: gallery("assets/img/projects/renders/", [
      "Render_1.png",
      "Render_17.jpg",
      "Render_5.png",
      "Render_21.jpg",
      "Render_6.png",
      "Render_23.jpg",
      "Render_14.png",
      "Render_22.jpg",
      "Render_2.png",
      "Render_3.png",
      "Render_4.png",
      "Render_7.png",
      "Render_8.png",
      "Render_9.png",
      "Render_10.png",
      "Render_11.png",
      "Render_12.png",
      "Render_13.png",
      "Render_15.png",
      "Render_16.png",
      "Render_18.png",
      "Render_19.png",
      "Render_20.png",
      "Render_24.png",
      "Render_25.png",
      "Render_26.png",
      "Render_27.png"
    ]),
    tags: ["Render", "Modelado 3D", "Autodesk Maya", "Luces"],
    team: ["Yoann Jacome"]
  },
  {
    id: "idles-animacion-3d",
    title: "Idles Animación 3D",
    category: "audiovisual",
    subcategory: "model3d",
    role: "Animador 3D - Implementación de idles animados en Unity",
    summary: "Integración de distintos idles animados en Maya dentro del motor Unity.",
    description:
      "Integración de distintos idles animados en Maya dentro del motor Unity, mostrando la implementación de las animaciones de personaje en un proyecto de videojuego.",
    thumbnail: "assets/img/thumbs/idles.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/DiEJCd8PenU" }],
    links: [
      { label: "Ver en itch.io", url: "https://yoann-jacome.itch.io/animacionvideojuego" }
    ],
    tags: ["Animación 3D", "Unity", "Maya", "Idles"],
    team: ["Yoann Jacome"]
  },

  /* ============ CONTENIDO DIGITAL AUDIOVISUAL / MOTION GRAPHICS ============ */
  {
    id: "nasa-explore-your-mind",
    title: "Comercial NASA: Explore Your Mind",
    category: "audiovisual",
    subcategory: "motion",
    role:
      "Animador 3D y Postproductor - Animación de planetas, diseño de iluminación espacial, efectos visuales (lens flares) y composición de textos",
    summary:
      "Comercial animado en 3D de temática espacial. Un viaje visual a través de los planetas que culmina con un mensaje que conecta la exploración del universo con la mente humana.",
    description:
      "Comercial animado en 3D de temática espacial. La pieza propone un viaje visual fluido a través de los planetas, con diseño de iluminación espacial y efectos de lente, que culmina con un mensaje inspirador conectando la exploración del universo con la mente humana.",
    thumbnail: "assets/img/thumbs/nasa-explore-your-mind.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/omuQrDvwvIY" }],
    tags: ["Animación 3D", "Motion Graphics", "Espacio", "Comercial", "Postproducción", "After Effects"],
    team: ["Yoann Jacome"]
  },
  {
    id: "motorola-playstore-ad",
    title: "Motorola Edge 30 Ultra & Play Store",
    category: "audiovisual",
    subcategory: "motion",
    role:
      "Animador 3D y Motion Grapher - Creación de prototipo (Figma), animación del dispositivo móvil",
    summary:
      "Spot publicitario animado en 3D que promociona el uso de la Google Play Store a través del Motorola Edge 30 Ultra.",
    description:
      "Pieza publicitaria que combina animación 3D de producto y motion graphics. El video muestra un modelo 3D de un teléfono inteligente navegando dinámicamente por la interfaz de la Google Play Store. El objetivo del comercial es invitar a los usuarios a usar la plataforma, donde encontrarán libros y aplicaciones, y cerrar con un llamado a la acción para adquirir el nuevo Motorola Edge 30 Ultra y disfrutar de ella.",
    thumbnail: "assets/img/thumbs/motorola-playstore-ad.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/YpaaZFgtJ3E" }],
    tags: ["Animación 3D", "Motion Graphics", "Publicidad", "Prototipado", "Figma", "After Effects"],
    team: ["Yoann Jacome"]
  }

  // ...agregar más trabajos aquí (separados por comas)
];

/* Certificados (galería con lightbox). Se completa en la Etapa 7.
   Cada uno: { title, image, issuer, year } */
window.CERTIFICATES = [];