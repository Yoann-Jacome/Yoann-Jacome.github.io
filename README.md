# Portafolio Web — Yoann Esteban Jacome Garcia

Sitio web personal (portafolio) de **Yoann Esteban Jacome Garcia**, estudiante de
Ingeniería en Multimedia. Muestra sus trabajos de la universidad (videojuegos,
realidad virtual, web, apps móviles, modelado y renderizado 3D, video, audio y
motion graphics), su perfil, estudios, experiencia, herramientas y contacto.

- **Sitio público:** https://yoann-jacome.github.io
- **Tecnología:** HTML + CSS + JavaScript puro (vanilla). Sin frameworks, sin build,
  sin dependencias de npm.
- **Repositorio:** https://github.com/Yoann-Jacome/Yoann-Jacome.github.io

> La fuente de verdad del proyecto es `PORTAFOLIO_SPEC.md`. Antes de modificar el
> proyecto, léelo completo. El desarrollo avanza **una etapa a la vez**.

---

## Estructura del proyecto

```
/
├── index.html
├── README.md
├── PORTAFOLIO_SPEC.md
├── .nojekyll
├── css/
│   ├── variables.css     # tokens de color de ambos temas
│   ├── base.css          # reset, tipografía, utilidades de layout
│   └── components.css    # navbar, tarjetas, modal, carrusel, footer...
├── js/
│   ├── projects-data.js  # ÚNICO archivo que se edita para agregar trabajos
│   ├── i18n.js           # textos de la interfaz por idioma + traducción
│   ├── theme.js          # cambio de tema oscuro/claro
│   ├── render.js         # construye secciones y tarjetas desde los datos
│   ├── modal.js          # modal + multimedia (YouTube / carrusel)
│   └── main.js           # inicialización, filtros, utilidades
└── assets/
    ├── img/
    │   ├── thumbs/       # miniaturas de las tarjetas
    │   ├── projects/     # imágenes de galería / renders
    │   ├── certificates/ # imágenes de certificados
    │   └── profile/      # foto de perfil
    ├── icons/            # logos de herramientas (Unity, Unreal, Maya...)
    └── cv/               # PDF de la hoja de vida para descargar
```

---

## Cómo probar el sitio

1. **Doble clic:** abre `index.html` con tu navegador (`file://`). No requiere
   servidor porque **no** se usa `fetch()` ni módulos ES.
2. **Servidor local (recomendado para pruebas más reales):**
   ```bash
   # Opción con Python
   python -m http.server 8000
   # Luego abre http://localhost:8000
   ```

---

## Cómo agregar un trabajo

Todos los trabajos se definen en **`js/projects-data.js`**. Nunca se escriben
trabajos directamente en el HTML.

1. Abre `js/projects-data.js`.
2. Agrega un objeto al arreglo `window.PROJECTS` (por ejemplo, al final):
   ```js
   {
     id: "mi-trabajo",                 // único, en kebab-case (enlace #mi-trabajo)
     title: "Mi Trabajo",
     category: "development",          // "development" | "audiovisual"
     subcategory: "videogames",        // clave de subcategoría
     role: "Desarrollador",            // se muestra en tarjeta y modal
     summary: "Resumen corto de la tarjeta (se recorta a 3 líneas).",
     description: "Descripción completa que se muestra en el modal.",
     thumbnail: "assets/img/thumbs/mi-trabajo.jpg",
     media: [
       { type: "youtube", url: "https://youtu.be/XXXXXXXXXXX" },
       { type: "image", src: "assets/img/projects/mi-trabajo-1.jpg", caption: "Menú principal" }
     ],
     tags: ["Unity", "Físicas", "C#"],
     links: [
       { label: "Jugar en itch.io", url: "https://..." }
     ]
   }
   ```
3. Guarda, recarga el navegador y la tarjeta aparecerá en su subcategoría.

**Reglas de los datos:**
- El orden del arreglo es el orden en pantalla dentro de su subcategoría.
- Los campos opcionales (`links`, `caption`, `role`...) pueden faltar sin romper el diseño.
- Si falta `thumbnail`, se usa la primera imagen de `media` o un marcador neutro.
- Se aceptan enlaces de YouTube en formato `youtu.be/ID`, `watch?v=ID`, `shorts/ID` y `embed/ID`.
- Los textos (`summary`, `description`, etc.) pueden ser un string (español) o un objeto `{ es: "...", en: "..." }` para la versión bilingüe.
- **Nunca** incluir teléfonos ni datos de referencias personales.

---

## Tamaños recomendados de imágenes

| Uso | Tamaño recomendado | Peso máximo |
|---|---|---|
| Miniatura de tarjeta (`thumbs/`) | 1280 × 720 px (16:9) | ~300 KB |
| Imagen de galería (`projects/`) | 1600 px de ancho | ~500 KB |
| Foto de perfil (`profile/`) | 512 × 512 px (cuadrada) | ~200 KB |
| Certificado (`certificates/`) | 1200 px de ancho | ~400 KB |

Consejos: exporta en `.jpg` o `.webp`, usa nombres en minúsculas con guiones
(`tiro-perfecto.jpg`) y evita imágenes más pesadas de lo necesario (el sitio usa
`loading="lazy"`).

---

## Despliegue en GitHub Pages

El repositorio debe llamarse exactamente **`Yoann-Jacome.github.io`** para quedar
en `https://yoann-jacome.github.io`. El nombre de la carpeta local no importa.

Primera vez (subir el proyecto):

```bash
git init -b main
git add .
git commit -m "etapa-0: estructura inicial del proyecto"
git remote add origin https://github.com/Yoann-Jacome/Yoann-Jacome.github.io.git
git push -u origin main
```

Si Git pide contraseña, usa un **Personal Access Token** de GitHub (no tu clave
normal) o la ventana de inicio de sesión de Git Credential Manager.

Etapas siguientes (commit por etapa y subir):

```bash
git add .
git commit -m "etapa-N: descripción"
git push
```

Activar GitHub Pages:

1. GitHub → repositorio → **Settings** → **Pages**.
2. En *Source* elige **Deploy from a branch**.
3. Rama: **main**, carpeta: **/ (root)** → **Save**.
4. Espera ~1–2 minutos y abre https://yoann-jacome.github.io

El archivo `.nojekyll` (en la raíz) evita que GitHub Pages procese el sitio con Jekyll.

---

## Estado del desarrollo

El avance por etapas está descrito en la sección 13 de `PORTAFOLIO_SPEC.md`.
Cada etapa se commitea como `etapa-N: descripción` y se espera confirmación antes
de continuar con la siguiente.
