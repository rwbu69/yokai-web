import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    // ── Hero Section ────────────────────────────────────────────────────────
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      description: 'Tulisan kecil di atas (contoh: "About Us")',
    }),
    defineField({
      name: 'heroLine1',
      title: 'Hero Line 1',
      type: 'string',
      description: 'Baris pertama teks besar (contoh: "We Are Not")',
    }),
    defineField({
      name: 'heroLine2',
      title: 'Hero Line 2',
      type: 'string',
      description: 'Baris kedua teks besar warna ungu (contoh: "Fans.")',
    }),
    defineField({
      name: 'heroSub',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      description: 'Teks deskripsi di bawah judul besar',
    }),
    defineField({
      name: 'heroFooterText',
      title: 'Hero Footer Text',
      type: 'string',
      description: 'Teks kecil di pojok kiri bawah (contoh: "Yogyakarta · Wotagei")',
    }),
    
    // ── Our Story Section ───────────────────────────────────────────────────
    defineField({
      name: 'storyTitle',
      title: 'Story Title',
      type: 'string',
      description: 'Label section (contoh: "Our Story")',
    }),
    defineField({
      name: 'storyMainStatement',
      title: 'Story Main Statement',
      type: 'text',
      rows: 3,
      description: 'Paragraf utama (yang teksnya besar)',
    }),
    defineField({
      name: 'storySubStatement',
      title: 'Story Sub Statement',
      type: 'text',
      rows: 4,
      description: 'Paragraf penjelasan di bawah main statement',
    }),

    // ── Track Record Section ────────────────────────────────────────────────
    defineField({
      name: 'trackRecordHeader',
      title: 'Track Record Header',
      type: 'string',
      description: 'Label section (contoh: "Track Record")',
    }),
    defineField({
      name: 'trackRecords',
      title: 'Track Records',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'trackRecordItem',
          title: 'Track Record Entry',
          fields: [
            defineField({ name: 'event', title: 'Event Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'date', title: 'Date (Month Year)', type: 'string', description: 'Format bebas: "Dec 2024", "Nov 2023", dst.' }),
            defineField({ name: 'achievement', title: 'Achievement / Position', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'image', title: 'Event Photo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'youtubeUrl', title: 'YouTube URL (optional)', type: 'url' }),
          ],
        },
      ],
    }),

    // ── Contact Section ─────────────────────────────────────────────────────
    defineField({
      name: 'contactHeading',
      title: 'Contact Heading',
      type: 'string',
      description: 'Contoh: "Find Us."',
    }),
    defineField({
      name: 'contactSub',
      title: 'Contact Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({ name: 'platform', title: 'Platform (e.g. INSTAGRAM)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'handle', title: 'Handle (e.g. @yokaiwotagei)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
});
