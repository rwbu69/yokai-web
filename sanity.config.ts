import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Existing schemas
import heroImages from './src/sanity/schemas/heroImages';
import member from './src/sanity/schemas/member';
import aboutUs from './src/sanity/schemas/aboutUs';
import update from './src/sanity/schemas/update';
import waza from './src/sanity/schemas/waza';
import gallery from './src/sanity/schemas/gallery';
import shopItem from './src/sanity/schemas/shopItem';
import project from './src/sanity/schemas/project';
import livePerformance from './src/sanity/schemas/livePerformance';

// New schemas
import article from './src/sanity/schemas/article';
import chekiConfig from './src/sanity/schemas/chekiConfig';
import videoItem from './src/sanity/schemas/videoItem';
import landingPage from './src/sanity/schemas/landingPage';

export default defineConfig({
  name: 'default',
  title: 'Yokai Web Studio',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: [
      // === Singletons ===
      landingPage,
      aboutUs,
      chekiConfig,

      // === Content ===
      member,
      heroImages,
      livePerformance,
      project,

      // === Gallery ===
      gallery,      // Photo Events
      videoItem,

      // === Shop ===
      shopItem,

      // === Library ===
      waza,
      article,
      update,
    ],
  },
});
