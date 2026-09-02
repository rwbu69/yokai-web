import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { markdownSchema } from 'sanity-plugin-markdown';

// Existing schemas
import member from './src/sanity/schemas/member';
import aboutUs from './src/sanity/schemas/aboutUs';
import update from './src/sanity/schemas/update';
import waza from './src/sanity/schemas/waza';
import gallery from './src/sanity/schemas/gallery';
import shopItem from './src/sanity/schemas/shopItem';
import project from './src/sanity/schemas/project';
import livePerformance from './src/sanity/schemas/livePerformance';
import scheduleEvent from './src/sanity/schemas/scheduleEvent';

// New schemas
import article from './src/sanity/schemas/article';
import chekiConfig from './src/sanity/schemas/chekiConfig';
import merchConfig from './src/sanity/schemas/merchConfig';
import videoItem from './src/sanity/schemas/videoItem';
import landingPage from './src/sanity/schemas/landingPage';
import updatesConfig from './src/sanity/schemas/updatesConfig';
import snsUpdate from './src/sanity/schemas/snsUpdate';

import tutorial from './src/sanity/schemas/tutorial';
import { deskStructure } from './src/sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Yokai Web Studio',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool({ structure: deskStructure }), markdownSchema()],

  schema: {
    types: [
      // === Singletons ===
      tutorial,
      landingPage,
      aboutUs,
      chekiConfig,
      merchConfig,
      updatesConfig,

      // === Content ===
      member,
      snsUpdate,
      livePerformance,
      project,
      scheduleEvent,

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
