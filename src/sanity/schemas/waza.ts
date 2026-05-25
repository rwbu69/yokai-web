import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'waza',
  title: 'Waza (Technique / Move)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Waza Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wazaType',
      title: 'Waza Type',
      type: 'string',
      options: {
        list: [
          { title: 'Original Member Waza', value: 'originalMember' },
          { title: 'Wotagei Waza', value: 'wotagei' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Created / Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'body',
      title: 'Waza Tutorial Body (Portable Text)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Tutorial URL (YouTube)',
      type: 'url',
    }),
  ],
  orderings: [
    { title: 'Date, Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
});
