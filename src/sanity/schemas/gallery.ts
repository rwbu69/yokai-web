export default {
  name: 'gallery',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Photo File',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }: any) => document?.type !== 'photo',
    },
    {
      name: 'videoUrl',
      title: 'Video Embed URL',
      type: 'url',
      hidden: ({ document }: any) => document?.type !== 'video',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    }
  ]
};
