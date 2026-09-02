import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'landingPage',
  title: 'Landing Page Content',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'motto', title: 'Motto Section' },
    { name: 'whoAreWe', title: 'Who Are We Section' },
    { name: 'schedule', title: 'Schedule Section' },
  ],
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroOverlayTitle',
      title: 'Hero Overlay Title',
      type: 'string',
      group: 'hero',
      description: 'Large text overlaid on the hero panels (e.g. "YOKAI")',
    }),
    defineField({
      name: 'heroOverlaySubtitle',
      title: 'Hero Overlay Subtitle',
      type: 'string',
      group: 'hero',
      description: 'Italic subtitle below hero title (e.g. "WOTAGEI")',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Marquee Images',
      type: 'array',
      group: 'hero',
      description: 'Upload foto-foto hero di sini. Foto akan didistribusikan secara otomatis ke dalam kolom marquee.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(4),
    }),
    
    // ── Motto Section ───────────────────────────────────────────────────────
    defineField({
      name: 'mottoLine1',
      title: 'Motto Line 1',
      type: 'string',
      group: 'motto',
    }),
    defineField({
      name: 'mottoLine2',
      title: 'Motto Line 2 (Highlighted)',
      type: 'string',
      group: 'motto',
    }),
    defineField({
      name: 'mottoLine3',
      title: 'Motto Line 3',
      type: 'string',
      group: 'motto',
    }),
    defineField({
      name: 'mottoSubtitle',
      title: 'Motto Subtitle',
      type: 'text',
      group: 'motto',
      rows: 2,
    }),
    defineField({
      name: 'mottoBadge',
      title: 'Motto Badge Text',
      type: 'string',
      group: 'motto',
    }),

    // ── Who Are We Section ──────────────────────────────────────────────────
    defineField({
      name: 'whoAreWeTitle',
      title: '"Who Are We" Title',
      type: 'string',
      group: 'whoAreWe',
    }),
    defineField({
      name: 'whoAreWeHighlight',
      title: '"Who Are We" Highlight',
      type: 'string',
      group: 'whoAreWe',
      description: 'Large purple text (e.g. "BORN FROM THE CROWD, FORGED IN DISCIPLINE.")',
    }),
    defineField({
      name: 'whoAreWeBody',
      title: '"Who Are We" Body Text',
      type: 'text',
      group: 'whoAreWe',
      rows: 5,
    }),
    defineField({
      name: 'whoAreWeButtonText',
      title: '"Who Are We" Button Text',
      type: 'string',
      group: 'whoAreWe',
    }),
    defineField({
      name: 'whoAreWeImages',
      title: '"Who Are We" Background Images',
      type: 'array',
      group: 'whoAreWe',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.length(12).error('Exactly 12 images are required for the marquee layout.'),
      description: 'Exactly 12 images used for the background marquee (3 rows of 4).',
    }),
    // ── Schedule Section ────────────────────────────────────────────────────
    defineField({
      name: 'scheduleTitle',
      title: 'Schedule Section Title',
      type: 'string',
      group: 'schedule',
    }),
    defineField({
      name: 'scheduleSubtitle',
      title: 'Schedule Section Subtitle',
      type: 'text',
      group: 'schedule',
      rows: 2,
    }),
  ],
});
