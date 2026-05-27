import { defineField, defineType } from 'sanity';

/**
 * member.ts — Schema untuk anggota tim Yokai Wotagei.
 *
 * Field yang ditampilkan di frontend (Members page):
 *  - photo      → background foto di accordion strip
 *  - firstName  → nama di strip, detail panel (COL 1)
 *  - lastName   → nama di detail panel (COL 1)
 *  - role       → posisi di strip & detail panel (COL 1)
 *  - favoriteWaza    → detail panel COL 2
 *  - favoriteUchishi → detail panel COL 2
 *  - quote      → detail panel COL 3
 *  - instagram  → link sosial di detail panel COL 3
 *  - twitter    → link sosial di detail panel COL 3
 *  - gallery    → grid 2×2 foto di detail panel COL 4
 *  - sortOrder  → urutan tampil di accordion strip
 *
 * Field yang DIHAPUS dari Studio (tidak ditampilkan di frontend):
 *  - bio, description, joinedDate, tenure, city, tags, initials, name
 */
export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    // ── Identitas ─────────────────────────────────────────────────────────────
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      description: 'Ditampilkan di strip dan panel detail.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      description: 'Ditampilkan di panel detail.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
      description: 'Contoh: "Center / Lead Performer". Ditampilkan di strip dan panel detail.',
      validation: (Rule) => Rule.required(),
    }),

    // ── Konten Panel Detail ───────────────────────────────────────────────────
    defineField({
      name: 'quote',
      title: 'Personal Quote',
      type: 'text',
      rows: 2,
      description: 'Kalimat singkat yang muncul di panel detail saat member dipilih.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favoriteWaza',
      title: 'Favorite Waza',
      type: 'string',
      description: 'Teknik wotagei favorit. Ditampilkan di panel detail.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favoriteUchishi',
      title: 'Favorite Uchishi',
      type: 'string',
      description: 'Partner / pasangan uchishi favorit. Ditampilkan di panel detail.',
      validation: (Rule) => Rule.required(),
    }),

    // ── Sosial Media ──────────────────────────────────────────────────────────
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Handle tanpa @. Contoh: yokai.ind — Ditampilkan sebagai link di panel detail.',
    }),
    defineField({
      name: 'twitter',
      title: 'X / Twitter Handle',
      type: 'string',
      description: 'Handle tanpa @. Contoh: yokai_ind — Ditampilkan sebagai link di panel detail.',
    }),

    // ── Foto ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'photo',
      title: 'Strip Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Foto portrait. Ditampilkan sebagai background di accordion strip member.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Photos (tepat 4 foto)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(4).max(4).error('Harus tepat 4 foto untuk grid 2×2.'),
      description: 'Ditampilkan sebagai grid 2×2 di panel detail saat member ini dipilih.',
    }),

    // ── Urutan ────────────────────────────────────────────────────────────────
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 99,
      description: 'Angka lebih kecil = tampil lebih dulu di strip. Contoh: 1, 2, 3...',
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'firstName', subtitle: 'role', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
