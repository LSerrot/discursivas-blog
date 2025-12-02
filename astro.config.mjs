// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  // URL placeholder. Mudaremos para a real no final.
  site: 'https://seublog-seo.netlify.app', 
  
  integrations: [
    tailwind(), 
    sitemap(), 
    react()
  ],
  
  // Otimização de imagens nativa
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});