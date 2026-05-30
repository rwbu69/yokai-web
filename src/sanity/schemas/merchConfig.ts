import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'merchConfig',
  title: 'Merch Page Config',
  type: 'document',
  fields: [
    defineField({
      name: 'isOpen',
      title: 'Is Merch Open?',
      type: 'boolean',
      description: 'Toggle on to open merch orders, off to close them.',
      initialValue: false,
    }),
    defineField({
      name: 'closedMessage',
      title: 'Closed Message',
      type: 'string',
      description: 'Pesan yang ditampilkan saat merch tutup',
      initialValue: 'OUR MERCH IS CLOSED AT THE MOMENT.',
    }),
    defineField({
      name: 'heroBgImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the Merch page hero section',
    }),
    defineField({
      name: 'endpointUrl',
      title: 'Google Sheets Endpoint URL',
      type: 'url',
      description: 'URL dari Google Apps Script Web App untuk menampung form order Merch.',
    }),
  ],
});
