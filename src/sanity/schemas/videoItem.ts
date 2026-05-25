import { defineField, defineType } from 'sanity';

/**
 * videoItem.ts — Video gallery entries for the Gallery → Videos page.
 *
 * Mendukung dua mode:
 *  1. File Upload (GIF / WebM) — upload langsung ke Sanity, tanpa YouTube
 *  2. YouTube Link saja — thumbnail GIF/WebP sebagai preview hover
 *
 * Field videoAsset + videoType digunakan untuk mode 1.
 * Field youtubeUrl digunakan untuk mode 2 (link ke YouTube).
 * Field thumbnail digunakan sebagai gambar statis sebelum hover (kedua mode).
 */
export default defineType({
  name: 'videoItem',
  title: 'Video Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'string',
      description: 'Display date (e.g. "JAN 2027")',
      validation: (Rule) => Rule.required(),
    }),

    // ── Mode 1: File Upload (GIF / WebM) ─────────────────────────────────────
    defineField({
      name: 'videoAsset',
      title: 'File GIF / WebM',
      type: 'file',
      description:
        'Upload file GIF atau WebM. WebM SANGAT direkomendasikan — ukuran 5–10x lebih kecil dari GIF dengan kualitas yang sama.',
      options: {
        accept: 'image/gif,video/webm',
      },
    }),
    defineField({
      name: 'videoType',
      title: 'Tipe File Animasi',
      type: 'string',
      options: {
        list: [
          { title: 'WebM (Direkomendasikan)', value: 'webm' },
          { title: 'GIF', value: 'gif' },
        ],
        layout: 'radio',
      },
      description:
        'Pilih sesuai file yang diupload di atas. Wajib diisi jika menggunakan File GIF / WebM.',
    }),

    // ── Mode 2: YouTube Link ──────────────────────────────────────────────────
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL (Opsional)',
      type: 'url',
      description:
        'URL YouTube jika video tidak diupload langsung. Digunakan sebagai href link pada cell video.',
    }),

    // ── Preview Thumbnail ─────────────────────────────────────────────────────
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (Gambar Statis)',
      type: 'image',
      description:
        'Gambar statis yang ditampilkan sebelum video di-hover. Digunakan jika tidak ada file WebM/GIF yang diupload.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'thumbnailGif',
      title: 'Preview GIF (Legacy)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Legacy field — gunakan "File GIF / WebM" di atas sebagai gantinya. Dipertahankan untuk kompatibilitas mundur.',
    }),

    // ── Caption ───────────────────────────────────────────────────────────────
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'thumbnail',
    },
  },
  orderings: [
    { title: 'Date, Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
});
