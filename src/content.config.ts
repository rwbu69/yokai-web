/**
 * src/content.config.ts
 *
 * Astro v6 Content Collections configuration.
 * Moved from src/content/config.ts to src/content.config.ts as required by Astro v6.
 *
 * HOW TO ADD A NEW COLLECTION:
 * 1. Create a folder under src/content/[collection-name]/
 * 2. Add Markdown files with frontmatter matching the blogSchema below.
 * 3. Add a new entry to the collections export below.
 *
 * FRONTMATTER SCHEMA (required fields):
 *   ---
 *   title: "Post Title"
 *   description: "Short description shown in listing cards."
 *   coverImage: "/src/assets/photos/example.jpg"
 *   date: "2024-03-15"       # YYYY-MM-DD format
 *   tags: ["tag1", "tag2"]   # optional
 *   draft: false             # set to true to hide from listing
 *   ---
 *
 * HOW TO CHANGE COLLECTION METADATA (title, hero text):
 * Edit src/data/*-meta.ts files.
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  coverImage: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
});

export const collections = {
  'original-waza': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/original-waza' }),
    schema: blogSchema,
  }),
  'wotagei-waza': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/wotagei-waza' }),
    schema: blogSchema,
  }),
  'articles': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
    schema: blogSchema,
  }),
  'updates': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
    schema: blogSchema,
  }),
};
