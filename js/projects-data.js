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
     media        arreglo de { type: "youtube", url } y/o
                             { type: "image", src, caption }
     tags         etiquetas (alimentan los filtros)
     links        (opcional) botones extra: { label, url }

   Los textos (role, summary, description, caption, tags) pueden ser un
   string en español o un objeto { es, en } para la Etapa 8.
   ===================================================================== */

window.PROJECTS = [
  /* ------------------ DESARROLLO / VIDEOJUEGOS ------------------ */
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
    tags: ["Videojuego", "Unity", "móvil", "C#"]
  },
  {
    id: "tiro-perfecto",
    title: "Tiro Perfecto",
    category: "development",
    subcategory: "videogames",
    role:
      "Desarrollador - Creación de física de tiro parabólico, elaboración de mapas, interacción de cámaras",
    summary: "Videojuego 2D de físicas con vista lateral para PC.",
    description:
      "Tiro Perfecto es un videojuego que destaca por simular sus propias físicas mediante código personalizado, prescindiendo de las herramientas predeterminadas del motor Unity. En este título pondrás a prueba tu puntería con el objetivo de derribar todos los barriles. Para lograrlo, deberás calcular cuidadosamente la trayectoria de cada proyectil. Una vez que logres derribarlos todos, podrás avanzar al siguiente desafío. ¡Explora la variedad de personajes y mapas que ofrece Tiro Perfecto y pon a prueba tu precisión!",
    thumbnail: "assets/img/thumbs/tiro-perfecto.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/rE6LoXR0WLY" }],
    tags: ["Videojuego", "físicas", "Unity", "PC", "C#"]
  },
  {
    id: "hide-ai-seek",
    title: "Hide Ai Seek",
    category: "development",
    subcategory: "videogames",
    role: "Desarrollador - Elaboración de mapas, animación de personajes, interacción de objetos",
    summary: "Videojuego arcade de sigilo con patrullas de IA, en 2D (vista top-down) para PC.",
    description:
      "Hide AI Seek es un videojuego de sigilo en 2D donde deberás poner a prueba tus habilidades de infiltración. Tu objetivo es claro: estudiar el entorno, recolectar la llave y alcanzar el cofre sin que los guardias que patrullan la zona te detecten. ¿Serás capaz de completar todos los mapas sin ser atrapado? ¡Pon a prueba tu capacidad de escape y diviértete superando sus diferentes niveles!",
    thumbnail: "assets/img/thumbs/hide-ai-seek.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/MLR2CzBYga4" }],
    tags: ["Videojuego", "IA", "sigilo", "Unity", "PC", "C#"]
  },

  /* --------------------- DESARROLLO / VR --------------------- */
  {
    id: "fragmentos",
    title: "Fragmentos VR",
    category: "development",
    subcategory: "vr",
    role: "Modelador 3D - Creación del entorno del videojuego (casa), elaboración de prompts",
    summary:
      "Aventura de misterio y puzzles en Realidad Virtual (VR). Explora una casa en la Bogotá de los años 80, habla con NPCs y resuelve acertijos para reunir los fragmentos de una fotografía.",
    description:
      "Fragmentos ofrece un viaje en el tiempo a la vibrante Bogotá de la década de 1980 en esta experiencia de misterio y exploración en Realidad Virtual. Te encuentras dentro de una casa tradicional colombiana llena de objetos de la época y una atmósfera cargada de nostalgia. Tu misión es encontrar y reconstruir una fotografía que ha sido dividida en tres fragmentos ocultos. Para lograrlo, deberás interactuar con el entorno, resolver puzzles y conversar con los habitantes de la casa, quienes te darán pistas para superar los desafíos y completar la foto.",
    thumbnail: "assets/img/thumbs/fragmentos.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/d-vHVhG8PTA" }],
    tags: ["Videojuego", "VR", "Realidad Virtual", "Unity", "3D", "C#", "Maya"]
  }

  // ...agregar más trabajos aquí (separados por comas)
];

/* Certificados (galería con lightbox). Se completa en la Etapa 7.
   Cada uno: { title, image, issuer, year } */
window.CERTIFICATES = [];
