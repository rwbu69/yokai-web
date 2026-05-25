import { z, defineCollection } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  coverImage: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false)
});

export const collections = {
  'original-waza': defineCollection({ schema: blogSchema }),
  'wotagei-waza': defineCollection({ schema: blogSchema }),
  'articles': defineCollection({ schema: blogSchema }),
  'updates': defineCollection({ schema: blogSchema }),
};
