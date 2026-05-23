export default {
  name: 'livePerformance',
  title: 'Live Performance',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Performance Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube Embed Link',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Performance Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Venue / Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    }
  ]
};
