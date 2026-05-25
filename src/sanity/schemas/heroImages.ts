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

    // Set A — gambar pertama yang terlihat saat halaman dibuka
    defineField({
      name: 'setA',
      title: 'Set A — Tampilan Awal (Panel 1, 2, 3, 4)',
      type: 'object',
      description: 'Gambar yang pertama kali terlihat saat halaman dibuka. Isi tepat 4 gambar.',
      fields: [
        defineField({ name: 'panel1', title: 'Panel 1 (kiri)',         type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel2', title: 'Panel 2',                type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel3', title: 'Panel 3',                type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel4', title: 'Panel 4 (kanan)',        type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
      ],
    }),

    // Set B — gambar kedua, muncul setelah 5 detik
    defineField({
      name: 'setB',
      title: 'Set B — Tampilan Kedua (setelah 5 detik)',
      type: 'object',
      description: 'Muncul setelah panel otomatis bergeser. Isi tepat 4 gambar.',
      fields: [
        defineField({ name: 'panel1', title: 'Panel 1 (kiri)',         type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel2', title: 'Panel 2',                type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel3', title: 'Panel 3',                type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel4', title: 'Panel 4 (kanan)',        type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
      ],
    }),

    // Set C — gambar ketiga, muncul setelah 10 detik
    defineField({
      name: 'setC',
      title: 'Set C — Tampilan Ketiga (setelah 10 detik)',
      type: 'object',
      description: 'Muncul setelah panel bergeser dua kali. Isi tepat 4 gambar.',
      fields: [
        defineField({ name: 'panel1', title: 'Panel 1 (kiri)',         type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel2', title: 'Panel 2',                type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel3', title: 'Panel 3',                type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'panel4', title: 'Panel 4 (kanan)',        type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
      ],
    }),
  ],

  // Singleton — hanya boleh ada 1 dokumen
  __experimental_actions: ['update', 'publish'],
});
