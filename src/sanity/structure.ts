import type { StructureBuilder } from 'sanity/structure';

// Helper to render a Singleton document list item
const singletonListItem = (S: StructureBuilder, title: string, id: string) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(
      S.document()
        .schemaType(id)
        .documentId(id)
    );

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Yokai Content')
    .items([
      S.listItem()
        .title('⚙️ Settings & Pages')
        .child(
          S.list()
            .title('Settings & Pages')
            .items([
              singletonListItem(S, 'Landing Page', 'landingPage'),
              singletonListItem(S, 'About Us', 'aboutUs'),
              singletonListItem(S, 'Merch Config', 'merchConfig'),
              singletonListItem(S, 'Cheki Config', 'chekiConfig'),
              singletonListItem(S, 'Updates Config', 'updatesConfig'),
              singletonListItem(S, 'Tutorial Config', 'tutorial'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('🧑‍🎤 Team & Schedule')
        .child(
          S.list()
            .title('Team & Schedule')
            .items([
              S.documentTypeListItem('member').title('Members'),
              S.documentTypeListItem('scheduleEvent').title('Schedule Events'),
              S.documentTypeListItem('livePerformance').title('Live Performances'),
            ])
        ),
      S.listItem()
        .title('📸 Gallery & Shop')
        .child(
          S.list()
            .title('Gallery & Shop')
            .items([
              S.documentTypeListItem('gallery').title('Photo Events'),
              S.documentTypeListItem('videoItem').title('Videos'),
              S.documentTypeListItem('shopItem').title('Shop Items'),
            ])
        ),
      S.listItem()
        .title('📚 Library & Content')
        .child(
          S.list()
            .title('Library & Content')
            .items([
              S.documentTypeListItem('waza').title('Waza (Moves)'),
              S.documentTypeListItem('article').title('Articles'),
              S.documentTypeListItem('update').title('Updates'),
              S.documentTypeListItem('snsUpdate').title('SNS Updates'),
            ])
        ),
    ]);
