import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'snsUpdate',
  title: 'SNS Update',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'X (Twitter)', value: 'x' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postUrl',
      title: 'Post URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / Account Name',
      type: 'string',
      initialValue: '@YokaiWotagei',
    }),
    defineField({
      name: 'date',
      title: 'Post Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentSnippet',
      title: 'Content Snippet',
      type: 'text',
      rows: 3,
      description: 'Singkatan teks dari post untuk ditampilkan di card.',
    }),
    defineField({
      name: 'image',
      title: 'Screenshot / Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Gambar dari post tersebut.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    { title: 'Date, Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
});
