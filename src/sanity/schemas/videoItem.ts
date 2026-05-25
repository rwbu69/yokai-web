import { defineField, defineType } from 'sanity';

/**
 * videoItem.ts — Video gallery entries for the Gallery → Videos page.
 * Each item represents one video with a thumbnail and YouTube link.
 */
export default defineType({
  name: 'videoItem',
  title: 'Video Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'string',
      description: 'Display date (e.g. "JAN 2027")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailGif',
      title: 'Thumbnail / Preview GIF',
      type: 'image',
      options: { hotspot: true },
      description: 'Used as preview on hover. Ideally a GIF or WebP animation.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    { title: 'Date, Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
});
