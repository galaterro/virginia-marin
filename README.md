# Virginia Marin — web personal

Página personal de Virginia Marin: escritura, traducción literaria y fotografía de naturaleza.
Sitio estático de una sola página construido con [Astro](https://astro.build), a partir de un diseño hecho en Canva.

## Comandos

| Comando        | Acción                                        |
| :------------- | :-------------------------------------------- |
| `pnpm install` | Instala las dependencias                      |
| `pnpm dev`     | Servidor de desarrollo en `localhost:4321`    |
| `pnpm build`   | Compila el sitio en `./dist/`                 |
| `pnpm preview` | Previsualiza la build antes de desplegar      |

## Estructura

- `src/pages/index.astro` — página única que ensambla las secciones
- `src/components/` — una sección por componente: Hero, Biografía, Escritura, Traducción, Fotografía, Contacto
- `src/styles/global.css` — paleta y tipografías (tokens del diseño de Canva)

## Contenido pendiente

Los textos e imágenes marcados con `[...]` o "pendiente" son provisionales hasta que el diseño de Canva esté cerrado:

- [ ] Textos definitivos de biografía (castellano e inglés), escritura, traducción y contacto
- [ ] Fotos reales (portada, retrato, portadas de libros, galería) — exportarlas de Canva y ponerlas en `src/assets/` usando `astro:assets`
- [ ] Enlaces reales: revistas/fanzines con poemas, Substack, redes sociales, compra del libro
- [ ] Título y descripción de los libros
- [ ] Dominio definitivo en `astro.config.mjs` (opción `site`)

## Despliegue

El dominio está gestionado en Cloudflare. Dos opciones, ambas con deploy automático al hacer push:

**Opción A — Netlify (recomendada por el formulario):**
el formulario de contacto ya está preparado para [Netlify Forms](https://docs.netlify.com/forms/setup/)
(100 envíos/mes gratis, sin backend). Conectar el repo en Netlify, y en Cloudflare DNS crear un
`CNAME` hacia el subdominio de Netlify. `netlify.toml` ya define build y carpeta de publicación.

**Opción B — Cloudflare Workers/Pages:**
todo queda en Cloudflare (DNS + hosting), pero el formulario necesita un servicio externo
(p. ej. [Web3Forms](https://web3forms.com/) o [Formspree](https://formspree.io/)): cambiar el
`action` del formulario en `src/components/Contacto.astro` y quitar los atributos `data-netlify`.
Build: comando `pnpm build`, directorio de salida `dist`.
