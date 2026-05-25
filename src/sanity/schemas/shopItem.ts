import { defineField, defineType } from 'sanity';

/**
 * shopItem.ts — Split into merch and cheki categories.
 * A single document type that handles both Merch and Cheki items
 * via a category discriminator field.
 */
export default defineType({
  name: 'shopItem',
  title: 'Shop Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Item Name',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Official Merch', value: 'merch' },
          { title: 'Cheki (Polaroid)', value: 'cheki' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (IDR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Images (for Merch)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      hidden: ({ document }) => document?.category !== 'merch',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'variants',
      title: 'Size / Variant Options (for Merch)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. S, M, L, XL, XXL',
      hidden: ({ document }) => document?.category !== 'merch',
    }),
    defineField({
      name: 'memberName',
      title: 'Member Name (for Cheki)',
      type: 'string',
      description: 'Which member this cheki is for.',
      hidden: ({ document }) => document?.category !== 'cheki',
    }),
    defineField({
      name: 'available',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 'merch' ? '🎽 Merch' : '📷 Cheki',
        media,
      };
    },
  },
});
