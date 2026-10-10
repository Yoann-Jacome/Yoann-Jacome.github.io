# Portafolio Web — Especificación del Proyecto

> Documento para **opencode** (agente de programación con IA). Léelo completo antes de escribir código.
> Trabaja **una etapa a la vez** (ver sección 13). No empieces una etapa hasta que el dueño confirme la anterior.

---

## 0. Cómo usar este documento con opencode

- Este documento es la **fuente de verdad** del proyecto. Guárdalo en la raíz del repositorio como `PORTAFOLIO_SPEC.md` (opcionalmente, copia su contenido o una referencia a él en un archivo `AGENTS.md`, que opencode suele leer automáticamente al iniciar).
- Las etapas están en la **sección 13**. Cada etapa tiene tareas y un criterio de "terminado".
- Flujo de trabajo esperado en cada etapa:
  1. Leer la sección 13 y ejecutar **solo** la etapa pedida.
  2. Al terminar, resumir lo hecho, explicar cómo probarlo y **esperar confirmación**.
  3. Hacer un commit por etapa (`etapa-N: descripción`).
- Mensajes sugeridos para el dueño:
  - Inicio: *"Lee PORTAFOLIO_SPEC.md completo. Ejecuta únicamente la Etapa 0 y la Etapa 1 y espera mi confirmación antes de continuar."*
  - Siguientes: *"Todo bien con la etapa anterior. Ejecuta únicamente la Etapa N."*

---

## 1. Objetivo

Un portafolio web público para **Yoann Esteban Jacome Garcia**, estudiante de Ingeniería en Multimedia, donde se muestren sus trabajos de la universidad (videojuegos, realidad virtual, web, apps, renders 3D, video, audio), su perfil, estudios, experiencia laboral, herramientas y enlaces de contacto.

- Alojado gratis en **GitHub Pages** con un link público.
- **Idioma:** primero todo en **español**. En una etapa final se agrega un **botón para cambiar a inglés**.
- Agregar un trabajo nuevo debe hacerse **solo editando un archivo de datos**, sin tocar el HTML.

## 2. Restricciones técnicas

- **Solo HTML + CSS + JavaScript puro (vanilla).** Sin frameworks, sin proceso de build, sin dependencias de npm.
- Debe funcionar abriendo `index.html` con doble clic (`file://`) y en GitHub Pages.
  - **No** usar `fetch()` para JSON local ni imports de módulos ES. Los datos se guardan en un script normal que define una variable global (`window.PROJECTS = [...]`).
- Usar **rutas relativas** en todo el proyecto (el sitio puede servirse desde una subruta).
- Diseño *mobile-first* y totalmente responsive.
- Código bien comentado, con comentarios cortos que expliquen cómo agregar un trabajo.

## 3. Estructura de carpetas

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
│   ├── projects-data.js  # ÚNICO archivo que el dueño edita para agregar trabajos
│   ├── i18n.js           # textos de la interfaz por idioma + función de traducción
│   ├── theme.js          # cambio de tema oscuro/claro
│   ├── render.js         # construye secciones y tarjetas desde los datos
│   ├── modal.js          # modal + multimedia (YouTube / carrusel)
│   └── main.js           # inicialización, filtros, utilidades
├── assets/
│   ├── img/
│   │   ├── thumbs/       # miniaturas de las tarjetas
│   │   ├── projects/     # imágenes de galería / renders
│   │   ├── certificates/ # imágenes de certificados
│   │   └── profile/      # foto de perfil
│   ├── icons/            # logos de herramientas (Unity, Unreal, Maya...)
│   └── cv/               # PDF de la hoja de vida para descargar
```

## 4. Sistema de diseño

### Tokens de color (variables CSS; el tema se define con `data-theme="dark|light"` en `<html>`)

| Token | Tema oscuro | Tema claro |
|---|---|---|
| `--bg` (fondo principal) | `#121212` | `#F8F9FA` |
| `--text` (texto general) | `#E0E0E0` | `#111827` |
| `--heading` (títulos) | `#E0E0E0` | `#111827` |
| `--accent` (botones, títulos resaltados, enlaces) | `#3B82F6` | `#1D4ED8` |
| `--surface` (tarjetas, bordes, paneles) | `#1F2937` | `#DBEAFE` |

- Los tonos extra (hover, bordes, superposiciones) deben derivarse de estos colores; no introducir colores ajenos a la paleta.
- El texto sobre botones de acento debe tener contraste legible (WCAG AA).
- **Botón de tema** en la barra de navegación: por defecto sigue `prefers-color-scheme`; la elección se guarda en `localStorage` (envolver en try/catch) y se aplica antes del primer render para evitar parpadeos.

### Dirección de estilo

- Moderno y limpio, con sensación gamer/audiovisual en el tema oscuro y más corporativo en el claro (mismo layout, solo cambian los tokens).
- Tarjetas redondeadas (≈12px), sombras suaves, elevación o zoom sutil en las miniaturas al pasar el mouse, transiciones suaves (respetar `prefers-reduced-motion`).
- Tipografía sans-serif moderna (por ejemplo Inter o Poppins de Google Fonts) con respaldo de fuentes del sistema.

## 5. Estructura de la página (una sola página con secciones ancladas)

```
[ NAVBAR ]  Logo/Nombre | Sobre mí | Experiencia | Trabajos | Herramientas | Contacto | [☀/🌙 tema] | [ES/EN idioma → solo desde la Etapa 8]

[ HERO ]     Foto (redonda) · Nombre · Título ("Ingeniero en Multimedia") · frase corta
             Botones: [Ver mis trabajos]  [Descargar CV]

[ SOBRE MÍ ] Texto de perfil + Educación (línea de tiempo)

[ EXPERIENCIA ] Experiencia laboral (línea de tiempo) + Logros

[ TRABAJOS ]
   Barra de filtros (etiquetas)  →  Todos | Unity | Unreal | VR | IA | Web | Móvil | 3D ...
   ── DESARROLLO ──
        Videojuegos            [tarjeta][tarjeta][tarjeta]
        Realidad virtual       [tarjeta][tarjeta][tarjeta]
        Web y apps móviles     [tarjeta][tarjeta][tarjeta]
   ── CONTENIDO DIGITAL AUDIOVISUAL ──
        Modelado y renderizado 3D   [tarjeta][tarjeta][tarjeta]
        Video                       [tarjeta][tarjeta][tarjeta]
        Audio                       [tarjeta][tarjeta][tarjeta]
        Motion graphics             [tarjeta][tarjeta][tarjeta]
   (Las subcategorías sin trabajos se ocultan automáticamente.)

[ HERRAMIENTAS ]  Cuadrícula de logos con nombre

[ FOOTER / CONTACTO ]
             Correo · LinkedIn · GitHub · [Descargar CV]
             Certificados (galería de imágenes con lightbox)
             © año Yoann Jacome
```

## 6. Contenido del dueño (fuente: hoja de vida)

**Nombre:** Yoann Esteban Jacome Garcia
**Título/rol:** Ingeniero en Multimedia (estudiante)

**Perfil:**
> Ingeniero en Multimedia enfocado en el desarrollo web y la creación de experiencias interactivas para dispositivos móviles y entornos de realidad virtual. Cuento con conocimientos en desarrollo de videojuegos, modelado y renderizado 3D, así como en la creación y producción de contenido audiovisual, combinando diseño y narrativa en el desarrollo de proyectos multimedia.

**Educación**
- Ingeniería en Multimedia — Universidad Militar Nueva Granada — 2022 – Actualmente
- Bachillerato — Colegio Distrital Los Periodistas — 2016 – 2021

**Experiencia laboral** (**no** incluir nombres ni teléfonos de referencias)
- Asesor comercial temporal — Forus Colombia — 04/12/2024 – 31/12/2024
- Asesor comercial temporal — Forus Colombia — 05/12/2025 – 04/01/2026
- Auxiliar de inventario temporal — Pernine Ltda — 19/01/2026 – 27/01/2026

**Logros**
- Participación en el 19° Congreso Colombiano de Computación 2025 — videojuego de físicas "Tiro Perfecto" (Rol: Desarrollador)

**Herramientas:** Unity, Unreal Engine, Maya, Mudbox, Photoshop, Premiere Pro, Audition, After Effects

**Contacto público:**
- Correo: yoannstebanjg@hotmail.com
- LinkedIn: https://www.linkedin.com/in/yoann-jacome
- GitHub: https://github.com/Yoann-Jacome
- ⚠️ **Nunca publicar teléfonos** (ni el del dueño ni los de sus referencias).

**Trabajos ya conocidos por la hoja de vida** (el dueño entregará miniaturas, enlaces y descripciones finales):

| Trabajo | Tipo | Subcategoría sugerida |
|---|---|---|
| Hotel 1948 | Juego de rol narrativo | Videojuegos |
| Tiro Perfecto | Juego de físicas | Videojuegos |
| Hide AI Seek | Videojuego con implementación de IA | Videojuegos |
| Fragmentos | Videojuego en entorno VR | Realidad virtual |
| Septimazo Aéreo | Videojuego en entorno VR (Unity) | Realidad virtual |
| Noesis | App móvil interactiva | Web y apps móviles |
| Las Acacias | Página web de venta de flores | Web y apps móviles |
| Participación en game jam UEFN (título por definir) | Minijuego creado en UEFN (Epic Games) | Videojuegos |
| Renders / videos / audio | — | Subcategorías audiovisuales |

## 7. Modelo de datos — `js/projects-data.js`

Este es el **único archivo que se edita para agregar contenido**. Cada trabajo es un objeto del arreglo:

```js
window.PROJECTS = [
  {
    id: "tiro-perfecto",                 // único, en kebab-case (se usa para el enlace directo #tiro-perfecto)
    title: "Tiro Perfecto",
    category: "development",             // "development" | "audiovisual"
    subcategory: "videogames",           // clave de subcategoría (ver lista en i18n.js); las nuevas se crean automáticamente
    role: "Desarrollador",               // se muestra en la tarjeta y en el modal
    summary: "Juego de físicas presentado en el 19° Congreso Colombiano de Computación.", // texto de la tarjeta (recortado a 3 líneas)
    description: "Descripción completa que se muestra en el modal. Puede tener varias frases...",
    thumbnail: "assets/img/thumbs/tiro-perfecto.jpg",
    media: [                             // 1 o varios elementos, en cualquier mezcla
      { type: "youtube", url: "https://youtu.be/XXXXXXXXXXX" },
      { type: "image", src: "assets/img/projects/tiro-perfecto-1.jpg", caption: "Menú principal" }
    ],
    tags: ["Unity", "Físicas", "C#"],    // se muestran al final del modal y alimentan los filtros
    links: [                             // botones extra opcionales
      { label: "Jugar en itch.io", url: "https://..." }
    ]
  },
  // ...agregar más objetos aquí
];
```

Reglas:
- La página se renderiza **por completo** desde este arreglo. El orden del arreglo es el orden en pantalla dentro de su subcategoría.
- Los campos opcionales ausentes (`links`, `caption`, `role`...) no deben romper el diseño.
- Si falta `thumbnail`, usar la primera imagen de `media` o un marcador neutro.
- Aceptar cualquier formato de URL de YouTube (`youtu.be/ID`, `watch?v=ID`, `shorts/ID`, `embed/ID`) y extraer el ID del video.
- **Preparado para dos idiomas desde el inicio:** los campos de texto (`role`, `summary`, `description`, `caption`, `links[].label`, `tags`) pueden ser un **string** (se usa tal cual) o un **objeto** `{ es: "...", en: "..." }`. Una función auxiliar `t(valor)` devuelve el texto del idioma activo y, si falta, cae a español. Hasta la Etapa 8 basta con escribir strings en español.

## 8. Comportamiento de la sección de Trabajos

### 8.1 Tarjetas (módulo de vista previa)
- CSS Grid responsive: **3 por fila en escritorio**, 2 en tablet, 1 en móvil; salto de línea automático para cualquier cantidad de trabajos.
- Cada tarjeta: miniatura (proporción 16:9 fija, `object-fit: cover`, `loading="lazy"`), título, insignia de rol, **resumen recortado a 3 líneas** (`-webkit-line-clamp` + puntos suspensivos) y hasta 3 etiquetas pequeñas.
- Si el trabajo tiene video, mostrar un ícono ▶ sobre la miniatura; si tiene varias imágenes, mostrar un ícono de galería con la cantidad.
- Toda la tarjeta es clickeable **y accesible por teclado** (`tabindex`, Enter/Espacio) → abre el modal.

### 8.2 Modal (vista de detalle)
Disposición, de arriba hacia abajo:
1. **Área multimedia (grande):**
   - Un solo video de YouTube → reproductor incrustado (usar `https://www.youtube-nocookie.com/embed/ID`), 16:9, responsive.
   - Una o más imágenes → **carrusel** (flechas anterior/siguiente, indicadores, deslizar en pantallas táctiles, teclas ← →, pie de foto opcional).
   - Mezcla de elementos → un único carrusel donde las diapositivas de video muestran el reproductor y las de imagen muestran la imagen.
   - **Crear el iframe solo cuando la diapositiva se muestra** y eliminarlo al salir de ella o al cerrar el modal, para que el video se detenga y la página se mantenga liviana.
2. Título
3. Rol + subcategoría
4. Descripción completa
5. Botones de enlaces extra (`links`), si existen
6. **Etiquetas** al final (al hacer clic en una, se cierra el modal y se aplica ese filtro)

Comportamiento: cerrar con el botón ✕, con `Esc` o haciendo clic en el fondo; atrapar el foco dentro del modal y devolverlo a la tarjeta al cerrar; bloquear el scroll del body mientras está abierto; `aria-modal="true"`, `role="dialog"` etiquetado con el título; actualizar el hash de la URL (`#id`) al abrir para poder compartir un trabajo, y abrir el modal al cargar la página si el hash coincide con un id.

### 8.3 Filtros
- Barra de filtros por etiqueta sobre los trabajos, generada automáticamente con todas las etiquetas de los datos.
- "Todos" es el valor por defecto; al elegir una etiqueta se ocultan las tarjetas que no coinciden y las subcategorías/categorías que queden vacías.
- El filtro activo debe distinguirse claramente y ser accesible (botones con `aria-pressed`).

## 9. Secciones finales
- **Herramientas:** cuadrícula con logo + nombre (íconos en `assets/icons/`; si falta un ícono, mostrar solo el texto).
- **Certificados:** galería de imágenes responsive; al hacer clic se abre un lightbox (reutilizar la lógica del modal/carrusel). Se definen en un arreglo pequeño en `projects-data.js` (`window.CERTIFICATES = [{ title, image, issuer, year }]`).
- **Contacto:** correo (`mailto:`), LinkedIn, GitHub (ícono + texto). Sin formulario de contacto.
- **Descargar CV:** botón en el hero y en el footer que apunta a `assets/cv/<archivo>.pdf` con el atributo `download`.

## 10. Idioma (español primero, inglés al final)

- **Etapas 0–7:** todo el sitio en español, `<html lang="es">`.
- Desde el inicio, **no dejar textos de la interfaz regados en la lógica de JS**: todos deben vivir en `js/i18n.js` con esta forma:
  ```js
  window.I18N = {
    es: { "nav.about": "Sobre mí", "works.development": "Desarrollo", ... },
    en: { /* se llena en la Etapa 8 */ }
  };
  ```
  El HTML estático usa atributos `data-i18n="clave"` y `render.js` usa la función de traducción, de modo que agregar inglés después no obligue a reescribir nada.
- **Etapa 8:** completar `en`, agregar los textos en inglés de cada trabajo (`{ es, en }`), un **botón ES/EN** en la barra de navegación, persistencia en `localStorage`, actualización de `<html lang>` y de los metadatos, y traducción del CV descargable (el dueño entrega la versión en inglés del PDF).

## 11. Requisitos de calidad
- **Accesibilidad:** HTML semántico (`header`, `nav`, `main`, `section`, `footer`), texto alternativo en todas las imágenes, estados de foco visibles, contraste AA en ambos temas, respetar `prefers-reduced-motion`.
- **Rendimiento:** imágenes con carga diferida; sin librerías pesadas; miniaturas idealmente de menos de ~300 KB (documentar tamaños recomendados en el README).
- **SEO y redes:** `<title>`, meta description, etiquetas Open Graph (título, descripción, imagen de vista previa), favicon y `lang` correcto.
- **Compatibilidad:** últimas versiones de Chrome, Edge, Firefox, Safari y navegadores móviles.

## 12. Despliegue (GitHub Pages)

- Usuario de GitHub: **Yoann-Jacome** (el guion es parte del usuario; las URLs de GitHub no distinguen mayúsculas).
- **Recomendado:** crear un repositorio público llamado **`Yoann-Jacome.github.io`** → el sitio queda en `https://yoann-jacome.github.io`.
  - Alternativa: un repo llamado `portafolio` → `https://yoann-jacome.github.io/portafolio/` (también funciona porque todas las rutas son relativas).
- Pasos a documentar en el `README.md`:
  1. `git init`, hacer commit, agregar el remoto y subir a `main`.
  2. GitHub → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
  3. Esperar ~1–2 minutos y abrir la URL pública.
- Incluir un archivo `.nojekyll` en la raíz.

## 13. Etapas de desarrollo

> Al terminar cada etapa: resumir lo hecho, cómo probarlo y **esperar confirmación**. Un commit por etapa (`etapa-N: ...`).

### Etapa 0 — Preparación
- [ ] Crear la estructura de carpetas y archivos vacíos de la sección 3.
- [ ] `README.md` con descripción del proyecto y cómo agregar un trabajo.
- [ ] `.gitignore` y `.nojekyll`.

### Etapa 1 — Esqueleto + link público ⭐ (primer hito)
- [ ] `index.html` con **todas las secciones y espacios marcados** (navbar, hero, sobre mí, experiencia, trabajos con ambas categorías y sus subtítulos, herramientas, footer).
- [ ] CSS mínimo y legible (aún sin diseño final); textos e imágenes de relleno claramente identificados.
- [ ] Subir a GitHub y **activar GitHub Pages**; confirmar que el link público funciona.
- ✅ Terminado cuando: el link público muestra todas las secciones vacías en orden y los enlaces de la barra de navegación llevan a cada sección.

### Etapa 2 — Sistema de diseño y temas
- [ ] Variables CSS de ambos temas (sección 4), botón de tema con persistencia, tipografía, botones, navbar (fija + menú móvil) y layout responsive base.
- ✅ Terminado cuando: al cambiar de tema toda la página cambia sin parpadeos y ambos temas se ven consistentes en escritorio y móvil.

### Etapa 3 — Contenido de la hoja de vida
- [ ] Completar hero, Sobre mí/Educación y Experiencia/Logros con el contenido de la sección 6, usando `js/i18n.js` para los textos.
- [ ] Botón de descargar CV (PDF entregado por el dueño).
- ✅ Terminado cuando: toda la información personal está en su lugar y no aparece ningún teléfono.

### Etapa 4 — Datos de trabajos y tarjetas
- [ ] `projects-data.js` con el esquema de la sección 7 y 3–4 entradas de ejemplo (marcadas como ejemplo).
- [ ] `render.js`: generar categorías, subcategorías y tarjetas desde los datos; grilla de 3 por fila; resumen recortado a 3 líneas; subcategorías vacías ocultas.
- ✅ Terminado cuando: agregar un objeto al arreglo hace aparecer una tarjeta nueva en el lugar correcto sin editar HTML.

### Etapa 5 — Modal y multimedia
- [ ] Modal según la sección 8.2: reproductor de YouTube, carrusel de imágenes, multimedia mixta, formas de cerrar, manejo de foco y enlace directo por hash.
- ✅ Terminado cuando: funcionan un trabajo con video, uno con varias imágenes y uno mixto, y los videos se detienen al cerrar o cambiar de diapositiva.

### Etapa 6 — Filtros
- [ ] Barra de filtros por etiqueta (sección 8.3), integrada con las etiquetas clickeadas desde el modal.

### Etapa 7 — Herramientas, certificados y contacto
- [ ] Cuadrícula de herramientas, galería de certificados con lightbox, enlaces de contacto y footer.

### Etapa 8 — Versión en inglés
- [ ] Completar `en` en `i18n.js`, textos `{ es, en }` en los trabajos, botón ES/EN en la navbar, persistencia, `<html lang>` y metadatos dinámicos, CV en inglés.
- ✅ Terminado cuando: al cambiar de idioma cambia absolutamente todo el texto visible (incluidos modal, filtros y certificados) y la elección se recuerda al recargar.

### Etapa 9 — Pulido y publicación final
- [ ] Revisión responsive (360px → 1440px+), revisión de accesibilidad, prueba con Lighthouse, SEO/Open Graph, favicon y README final.
- [ ] Reemplazar los trabajos de ejemplo por los reales a medida que el dueño entregue el contenido.

## 14. Contenido que debe entregar el dueño (lista de verificación)

- [ ] Foto de perfil
- [ ] PDF de la hoja de vida (y, para la Etapa 8, la versión en inglés)
- [ ] Por cada trabajo: título, rol, resumen corto, descripción completa, miniatura, link de YouTube y/o imágenes, etiquetas y subcategoría
- [ ] Imágenes de certificados (+ título/entidad/año)
- [ ] Logos de herramientas (o permiso para usar íconos oficiales)
- [ ] Título final de la participación en el game jam de UEFN

## 15. Reglas para el agente

1. Una etapa a la vez; preguntar antes de tomar decisiones de diseño no cubiertas aquí.
2. Sin frameworks ni herramientas de build; código simple y bien comentado.
3. Nunca escribir trabajos directamente en el HTML; todo sale de `projects-data.js`.
4. Nunca incluir teléfonos ni referencias personales en ningún lugar.
5. Mantener todas las rutas relativas y probar tanto con `file://` como con un servidor local.
6. Los textos de interfaz siempre pasan por `i18n.js`, aunque por ahora solo exista español.
7. Mantener este documento como fuente de verdad; si algo cambia, proponer una actualización del mismo.
