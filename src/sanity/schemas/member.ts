import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({ name: 'name',      title: 'Full Name',       type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'firstName', title: 'First Name',      type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'lastName',  title: 'Last Name',       type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'initials',  title: 'Initials (2 char)', type: 'string', validation: (Rule) => Rule.required().max(2) }),
    defineField({ name: 'role',      title: 'Role / Position', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tenure',    title: 'Tenure (e.g. "4y")', type: 'string' }),
    defineField({ name: 'city',      title: 'City',            type: 'string' }),
    defineField({
      name: 'tags',
      title: 'Tags (max 2)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (Rule) => Rule.max(2),
    }),
    defineField({ name: 'quote',         title: 'Personal Quote',     type: 'text', rows: 2 }),
    defineField({ name: 'favoriteWaza',  title: 'Favorite Waza',      type: 'string' }),
    defineField({ name: 'favoriteUchishi', title: 'Favorite Uchishi', type: 'string' }),
    defineField({ name: 'instagram',     title: 'Instagram (handle only, no @)', type: 'string' }),
    defineField({ name: 'twitter',       title: 'X / Twitter (handle only, no @)', type: 'string' }),
    defineField({
      name: 'photo',
      title: 'Strip Photo (portrait, shown in accordion strip)',
      type: 'image',
      options: { hotspot: true },
      description: 'Portrait orientation recommended. Displayed as background in the member strip.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Photos (exactly 4, shown in Credits Panel)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(4).max(4).error('Harus tepat 4 foto.'),
      description: 'Ditampilkan sebagai grid 2×2 di bagian bawah halaman Members saat member ini dipilih.',
    }),
    defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 4 }),
    defineField({
      name: 'description',
      title: 'Short Description (for Cheki label)',
      type: 'string',
    }),
    defineField({ name: 'joinedDate', title: 'Joined Date', type: 'date' }),
    defineField({ name: 'sortOrder',  title: 'Sort Order (lower = first)', type: 'number', initialValue: 99 }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
