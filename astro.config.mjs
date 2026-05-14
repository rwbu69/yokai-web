import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);

// https://astro.build/config
export default defineConfig({
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
});