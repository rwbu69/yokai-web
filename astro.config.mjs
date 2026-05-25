import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@data': path.resolve(__dirname, './src/data'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@content': path.resolve(__dirname, './src/content'),
      },
    },
  },
});
