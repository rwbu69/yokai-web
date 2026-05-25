import { defineField, defineType } from 'sanity';

/**
 * landingPage.ts — Singleton document to manage all Landing Page content.
 *
 * Only ONE document of this type should exist.
 * Edits here are reflected on the homepage after a site rebuild.
 */
export default defineType({
  name: 'landingPage',
  title: 'Landing Page Content',
  type: 'document',
  fields: [
    // Hero
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
    // Motto Section
    defineField({
      name: 'mottoText',
      title: 'Motto Text',
      type: 'string',
      description: 'Main motto statement displayed in the section below hero.',
    }),
    // Who Are We
    defineField({
      name: 'whoAreWeTitle',
      title: '"Who Are We" Title',
      type: 'string',
    }),
    defineField({
      name: 'whoAreWeBody',
      title: '"Who Are We" Body Text',
      type: 'text',
      rows: 5,
    }),
  ],
  // Prevent creating more than one landing page document
  __experimental_actions: ['update', 'publish'],
});
