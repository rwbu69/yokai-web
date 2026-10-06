export default {
  name: 'battleMatch',
  title: 'Battle Match',
  type: 'document',
  fields: [
    {
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., Rookie, Open, 1v1, Cyalume Dance',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'battler1',
      title: 'Battler 1',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'battler2',
      title: 'Battler 2',
      type: 'string',
      description: 'Optional, e.g. for 1v1 battles',
    },
    {
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      validation: (Rule: any) => Rule.uri({
        scheme: ['http', 'https']
      }).required(),
    },
  ],
  preview: {
    select: {
      battler1: 'battler1',
      battler2: 'battler2',
      category: 'category',
      event: 'event.name'
    },
    prepare(selection: any) {
      const { battler1, battler2, category, event } = selection;
      const title = battler2 ? `${battler1} vs ${battler2}` : battler1;
      return {
        title: title,
        subtitle: `[${category}] ${event ? `- ${event}` : ''}`
      }
    }
  },
};
