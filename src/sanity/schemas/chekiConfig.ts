import { defineField, defineType } from 'sanity';

/**
 * chekiConfig.ts — Singleton document to control Cheki open/closed status.
 *
 * HOW TO USE:
 * 1. Add exactly ONE document of this type in Sanity Studio.
 * 2. Toggle "isOpen" to open or close Cheki orders.
 * 3. The website reads this value. Status changes appear immediately
 *    WITHOUT needing a full site rebuild (uses real-time fetch).
 *
 * In the Astro page, query with:
 *   import { getChekiConfig } from '@lib/sanity';
 *   const chekiConfig = await getChekiConfig();
 */
export default defineType({
  name: 'chekiConfig',
  title: 'Cheki Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'isOpen',
      title: 'Cheki Orders are OPEN',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle this to open or close Cheki orders. Changes take effect immediately.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'closedMessage',
      title: 'Closed Message',
      type: 'string',
      description: 'Shown to visitors when Cheki is closed.',
      initialValue: 'OUR CHEKI IS CLOSED AT THE MOMENT.',
    }),
    defineField({
      name: 'heroBgImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the Cheki page hero section',
    }),
  ],
  // Prevent creating more than one chekiConfig document
});
