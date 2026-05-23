import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
      dataset: PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-03-01',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});