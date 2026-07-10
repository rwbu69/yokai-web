import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'updatesConfig',
  title: 'Updates Page Config',
  type: 'document',
  fields: [
    defineField({
      name: 'projectsYoutubeLink',
      title: 'Projects CTA Link',
      type: 'url',
      description: 'Link YouTube yang akan dibuka saat pengunjung mengklik CTA Projects di halaman Updates.',
    }),
    defineField({
      name: 'performancesYoutubeLink',
      title: 'Live Performances CTA Link',
      type: 'url',
      description: 'Link YouTube yang akan dibuka saat pengunjung mengklik CTA Live Performances di halaman Updates.',
    }),
  ],
});
