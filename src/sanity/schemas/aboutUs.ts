import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Bold Text',
      type: 'string',
      description: 'Large text shown in the hero section (e.g. "BORN FROM THE CROWD")',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Our Story (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Feature Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'trackRecord',
      title: 'Track Record / Event History',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'trackRecordItem',
          title: 'Track Record Entry',
          fields: [
            defineField({ name: 'eventName', title: 'Event Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'date', title: 'Date', type: 'string', description: 'e.g. "March 2024"' }),
            defineField({ name: 'position', title: 'Position / Result', type: 'string' }),
            defineField({ name: 'image', title: 'Event Photo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'youtubeUrl', title: 'YouTube Video URL (optional)', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X URL', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
      ],
    }),
  ],
});
