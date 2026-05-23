export default {
  name: 'heroImages',
  title: 'Hero Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Set Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imageSets',
      title: 'Image Sets',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'imageSet',
          title: 'Image Set',
          fields: [
            {
              name: 'setName',
              title: 'Set Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'images',
              title: 'Images (Exactly 4)',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
              validation: (Rule: any) => Rule.required().min(4).max(4).error('Tiap set harus berisi tepat 4 gambar.'),
            }
          ]
        }
      ]
    }
  ]
};
