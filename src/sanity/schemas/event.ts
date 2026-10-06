export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Event Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroVideo',
      title: 'Hero Video (Optional Auto-play Background)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Upload a short, mute, looping video for the hero background.',
    },
    {
      name: 'impressions',
      title: 'The Story / Impressions',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'highlightPhotos',
      title: 'Highlight Photos (Bento Grid)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add 3-4 candid photos to show within the story section.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
      media: 'coverImage',
    },
  },
};
