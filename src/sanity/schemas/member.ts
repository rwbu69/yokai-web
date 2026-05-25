import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Member Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description (for Cheki label)',
      type: 'string',
      description: 'Short tagline shown on the Cheki order form.',
    }),
    defineField({
      name: 'joinedDate',
      title: 'Joined Date',
      type: 'date',
    }),
  ],
  orderings: [
    {
      title: 'Join Date, Oldest First',
      name: 'joinedDateAsc',
      by: [{ field: 'joinedDate', direction: 'asc' }],
    },
  ],
});
