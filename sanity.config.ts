import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Yokai Web Studio',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',

  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: [
      /* add your schema types here */
      {
        name: 'post',
        type: 'document',
        title: 'Post',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
          {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
              source: 'title',
            },
          },
          {
            name: 'body',
            type: 'text',
            title: 'Body',
          },
        ],
      },
    ],
  },
});
