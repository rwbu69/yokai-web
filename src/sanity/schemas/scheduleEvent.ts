export default {
  name: 'scheduleEvent',
  title: 'Schedule Event',
  type: 'document',
  fields: [
    {
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('Event Name is required'),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required().error('Date is required'),
    },
    {
      name: 'time',
      title: 'Time (Optional)',
      type: 'string',
      description: 'e.g., 19:00, 7 PM. Leave empty if not applicable.',
    }
  ],
  preview: {
    select: {
      title: 'eventName',
      subtitle: 'date',
    }
  },
  orderings: [
    {
      title: 'Date, Newest first',
      name: 'dateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Date, Oldest first',
      name: 'dateAsc',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    }
  ]
};
