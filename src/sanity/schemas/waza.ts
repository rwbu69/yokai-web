export default {
  name: 'waza',
  title: 'Waza (Technique / Move)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Waza Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Waza Type',
      type: 'string',
      options: {
        list: [
          { title: 'Original Member Waza', value: 'originalMember' },
          { title: 'Wotagei Waza', value: 'wotagei' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'videoUrl',
      title: 'Video Tutorial URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    }
  ]
};
