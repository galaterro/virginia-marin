// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: "https://virginiamarin.com",
  // Fuentes autoalojadas: Astro las descarga durante el build, las sirve desde
  // nuestro dominio y genera un fallback con métricas ajustadas para evitar el
  // salto de maquetación al cargar. Ya no se pide nada a fonts.googleapis.com.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Water Brush",
      cssVariable: "--font-water-brush",
      weights: [400],
      styles: ["normal"],
      // Sin `fallbacks`: el valor por defecto (sans-serif) deja que Astro genere
      // un sustituto con métricas ajustadas. `cursive` lo impediría y el título
      // daría un salto al cargar la fuente real.
    },
    {
      provider: fontProviders.google(),
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      weights: [400, 500, 600],
      styles: ["normal", "italic"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
});
