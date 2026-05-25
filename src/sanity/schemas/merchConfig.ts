import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'merchConfig',
  title: 'Merch Page Config',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBgImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the Merch page hero section',
    }),
  ],
});
