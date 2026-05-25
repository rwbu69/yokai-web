import { defineField, defineType } from 'sanity';

/**
 * gallery.ts → Redesigned as photoEvent.ts
 * Manages photo events with cover image and full image galleries.
 */
export default defineType({
  name: 'photoEvent',
  title: 'Photo Event',
  type: 'document',
  fields: [
    defineField({
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'string',
      description: 'Display date (e.g. "DEC 2026")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        },
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Event Caption',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    { title: 'Date, Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
});
