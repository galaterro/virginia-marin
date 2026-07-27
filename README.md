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
- `src/components/` — una sección por componente: Hero, Biografía, Escritura, Traducción, Fotografía, Contacto.
  Además, tres piezas compartidas: `SiteNav` (el menú, superpuesto en el hero y fijo al dejarlo atrás),
  `SectionTitle` (encabezado bilingüe, oculto visualmente) y `BotanicalBand` (la banda vegetal del diseño)
- `src/data/nav.ts` — lista de secciones del menú; añadir o reordenar aquí, no en los componentes
- `src/styles/global.css` — paleta y tipografías (tokens del diseño de Canva)
- `astro.config.mjs` — dominio y las tres tipografías autoalojadas con la API de fuentes de Astro

## Estado del contenido

El diseño de Canva está cerrado y volcado: ya no queda ningún placeholder en `src/`.

- [x] Textos definitivos de biografía (castellano e inglés), escritura, traducción y contacto
- [x] Fotos reales (portada, retrato, portadas de libros, galería) en `src/assets/images/`, servidas con `astro:assets`
- [x] Enlaces reales: revistas y fanzines con poemas, Substack, redes sociales y compra del libro
- [x] Título y descripción de los libros
- [x] Dominio: `virginiamarin.com`, ya configurado en `astro.config.mjs`

Lo único que queda por actualizar es el segundo libro, *Si pudiera ser ave y traer un río en la boca*:
está previsto para finales de 2026 y de momento enlaza a las bases del premio, así que habrá que
cambiar ese enlace por el de compra cuando se publique (`src/components/Escritura.astro`).

## Despliegue

El dominio está gestionado en Cloudflare. Dos opciones, ambas con deploy automático al hacer push:

**Opción A — Netlify (recomendada por el formulario):**
el formulario de contacto ya está preparado para [Netlify Forms](https://docs.netlify.com/forms/setup/)
(100 envíos/mes gratis, sin backend). `netlify.toml` ya define build y carpeta de publicación.

1. En Netlify: *Add new site → Import an existing project*, elegir el repo de GitHub. Detecta la build sola.
2. En Netlify: *Domain management → Add custom domain* → `virginiamarin.com` (añadir también `www.virginiamarin.com`).
3. En Cloudflare (DNS de `virginiamarin.com`), crear dos registros **con el proxy desactivado (nube gris, "DNS only")**, porque Netlify ya hace de CDN y el proxy de Cloudflare interfiere con su certificado SSL:
   - `CNAME` · nombre `www` · destino `<nombre-del-sitio>.netlify.app`
   - `CNAME` · nombre `@` (apex) · destino `<nombre-del-sitio>.netlify.app` (Cloudflare lo aplana automáticamente)
4. En Netlify: *Domain management → HTTPS*, esperar a que emita el certificado (Let's Encrypt, automático).
5. Tras el primer deploy, comprobar en *Forms* que aparece el formulario `contacto` y activar la notificación por email en *Forms → Form notifications*.

**Opción B — Cloudflare Workers/Pages:**
todo queda en Cloudflare (DNS + hosting), pero el formulario necesita un servicio externo
(p. ej. [Web3Forms](https://web3forms.com/) o [Formspree](https://formspree.io/)): cambiar el
`action` del formulario en `src/components/Contacto.astro` y quitar los atributos `data-netlify`.
Build: comando `pnpm build`, directorio de salida `dist`.
