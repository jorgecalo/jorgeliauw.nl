import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jorgeliauw.nl',
  base: '/',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  }
});
