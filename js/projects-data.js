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
     role         se muestra en la tarjeta y en el modal
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
  {
    id: "hotel-1948",
    title: "Hotel 1948",
    category: "development",
    subcategory: "videogames",
    role: "Desarrollador",
    summary:
      "Videojuego RPG de misterio e investigación en 2D (top-down), multiplataforma (móvil y PC).",
    description:
      "Hotel 1948 es un juego de rol en el que asumes el papel de Héctor, un exdetective encargado de resolver un homicidio ocurrido en un hotel de España en 1948, tras la Segunda Guerra Mundial. El juego pondrá a prueba tu habilidad para identificar pistas, tomar decisiones y explorar rápidamente distintas habitaciones. Sé lo suficientemente ágil para reunir las pruebas necesarias que te permitan descubrir al culpable y resolver el caso.",
    thumbnail: "assets/img/thumbs/hotel-1948.jpg",
    media: [{ type: "youtube", url: "https://youtu.be/h4DbFRwOEJA" }],
    tags: ["Videojuego", "Unity", "móvil", "C#"]
  }

  // ...agregar más trabajos aquí (separados por comas)
];

/* Certificados (galería con lightbox). Se completa en la Etapa 7.
   Cada uno: { title, image, issuer, year } */
window.CERTIFICATES = [];
