/**
 * migrate-cheki.ts — Migrates cheki items and config to Sanity.
 * NOTE: Cheki images require manual upload via Studio (see MIGRATION-IMAGES.md).
 * Run: bun run scripts/migrations/migrate-cheki.ts
 */
import { client, log, ok, fail, warn } from './_client';

const chekiItems = [
  { id: 'cheki-solo-kai',  title: 'SOLO: KAI',    price: 50000, description: 'Solo polaroid shot. Signed.', memberName: 'KAI',   available: true },
  { id: 'cheki-solo-ryu',  title: 'SOLO: RYU',    price: 50000, description: 'Solo polaroid shot. Signed.', memberName: 'RYU',   available: true },
  { id: 'cheki-group',     title: 'GROUP SHOT',   price: 80000, description: 'Full team polaroid with special event decorations.', available: true },
];

const chekiConfig = {
  isOpen: false,
  closedMessage: 'OUR CHEKI IS CLOSED AT THE MOMENT.',
};

export async function migrateCheki() {
  log('\n📷 Migrating: Cheki Items & Config');
  warn('Cheki images HARUS di-upload manual via Sanity Studio (lihat MIGRATION-IMAGES.md)');

  // Cheki Config singleton
  try {
    await client.createOrReplace({
      _id:  'cheki-config-singleton',
      _type: 'chekiConfig',
      isOpen: chekiConfig.isOpen,
      closedMessage: chekiConfig.closedMessage,
    });
    ok(`Cheki Config: isOpen=${chekiConfig.isOpen}`);
  } catch (err: unknown) {
    fail(`Cheki Config: ${err instanceof Error ? err.message : err}`);
  }

  // Cheki Items
  for (const c of chekiItems) {
    const doc: Record<string, unknown> = {
      _id:  `shop-${c.id}`,
      _type: 'shopItem',
      title: c.title,
      slug:  { _type: 'slug', current: c.id },
      category: 'cheki',
      price: c.price,
      description: c.description,
      available: c.available,
    };
    if (c.memberName) doc.memberName = c.memberName;

    try {
      await client.createOrReplace(doc);
      ok(`Cheki: "${c.title}" (image perlu upload manual)`);
    } catch (err: unknown) {
      fail(`Cheki "${c.title}": ${err instanceof Error ? err.message : err}`);
    }
  }
}
