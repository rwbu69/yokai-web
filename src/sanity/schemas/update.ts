import { defineField, defineType } from 'sanity';

/**
 * update.ts — Schema untuk halaman Updates / News.
 *
 * Field yang ditampilkan di frontend:
 *  - title    → judul di card listing dan header halaman detail
 *  - slug     → URL halaman detail (/updates/[slug])
 *  - date     → tanggal di card listing dan header halaman detail
 *  - excerpt  → deskripsi singkat di card listing
 *  - image    → cover image di card listing dan header halaman detail
 *  - tags     → badge tag di header halaman detail
 *  - content  → konten lengkap di halaman detail (Portable Text)
 *
 * Field yang DIHAPUS dari Studio (tidak ditampilkan di frontend):
 *  - category — tidak pernah di-fetch atau dirender di halaman manapun
 */
export default defineType({
  name: 'update',
  title: 'Update / News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Ditampilkan di card listing dan judul halaman detail.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'URL halaman detail: /updates/[slug]. Generate otomatis dari judul.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Publish',
      type: 'date',
      description: 'Ditampilkan di card listing dan header halaman detail.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Singkat',
      type: 'text',
      rows: 3,
      description: 'Ditampilkan sebagai deskripsi di card listing. Maksimal 2–3 kalimat.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Ditampilkan di card listing dan sebagai background header halaman detail.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Ditampilkan sebagai badge ungu di header halaman detail. Contoh: wotagei, event, 2026.',
    }),
    defineField({
      name: 'content',
      title: 'Konten Lengkap',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        },
      ],
      description: 'Konten artikel lengkap menggunakan Portable Text editor. Mendukung heading, bold, italic, link, dan gambar.',
    }),
  ],
  orderings: [
    { title: 'Date, Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No date',
        media,
      };
    },
  },
});
