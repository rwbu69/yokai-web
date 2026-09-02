import { defineField, defineType } from 'sanity';

/**
 * heroImages.ts — Singleton schema untuk mengelola 12 gambar hero landing page.
 *
 * STRUKTUR:
 *   Panel 1–4 menggunakan gambar dari 3 "set" yang bergantian:
 *     Set A (images 1–4)  → tampilan pertama
 *     Set B (images 5–8)  → tampilan kedua setelah slide
 *     Set C (images 9–12) → tampilan ketiga setelah slide
 *
 *   Setiap set berisi tepat 4 gambar, satu per panel (kiri → kanan).
 *
 * CARA EDIT:
 *   Buka "Hero Images" di Studio → ubah gambar di Set A, B, atau C.
 *   Perubahan akan terlihat setelah rebuild website.
 */
export default defineType({
  name: 'heroImages',
  title: 'Hero Images (Landing Page)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Label (internal)',
      type: 'string',
      description: 'Hanya untuk identifikasi di Studio. Contoh: "Hero Images 2026"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Hero Images',
      type: 'array',
      description: 'Upload foto-foto hero di sini. Foto akan didistribusikan secara otomatis ke dalam kolom marquee.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(4),
    }),
  ],

  // Singleton — hanya boleh ada 1 dokumen
});
