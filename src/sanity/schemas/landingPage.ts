import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'landingPage',
  title: 'Landing Page Content',
  type: 'document',
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroOverlayTitle',
      title: 'Hero Overlay Title',
      type: 'string',
      description: 'Large text overlaid on the hero panels (e.g. "YOKAI")',
    }),
    defineField({
      name: 'heroOverlaySubtitle',
      title: 'Hero Overlay Subtitle',
      type: 'string',
      description: 'Italic subtitle below hero title (e.g. "WOTAGEI")',
    }),
    
    // ── Motto Section ───────────────────────────────────────────────────────
    defineField({
      name: 'mottoLine1',
      title: 'Motto Line 1',
      type: 'string',
    }),
    defineField({
      name: 'mottoLine2',
      title: 'Motto Line 2 (Highlighted)',
      type: 'string',
    }),
    defineField({
      name: 'mottoLine3',
      title: 'Motto Line 3',
      type: 'string',
    }),
    defineField({
      name: 'mottoSubtitle',
      title: 'Motto Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mottoBadge',
      title: 'Motto Badge Text',
      type: 'string',
    }),

    // ── Who Are We Section ──────────────────────────────────────────────────
    defineField({
      name: 'whoAreWeTitle',
      title: '"Who Are We" Title',
      type: 'string',
    }),
    defineField({
      name: 'whoAreWeHighlight',
      title: '"Who Are We" Highlight',
      type: 'string',
      description: 'Large purple text (e.g. "BORN FROM THE CROWD, FORGED IN DISCIPLINE.")',
    }),
    defineField({
      name: 'whoAreWeBody',
      title: '"Who Are We" Body Text',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'whoAreWeButtonText',
      title: '"Who Are We" Button Text',
      type: 'string',
    }),
  ],
});
