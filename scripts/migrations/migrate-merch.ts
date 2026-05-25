/**
 * migrate-merch.ts — Migrates merch items to Sanity.
 * NOTE: Product images require manual upload via Studio (see MIGRATION-IMAGES.md).
 * Run: bun run scripts/migrations/migrate-merch.ts
 */
import { client, log, ok, fail, warn } from './_client';

const merchItems = [
  {
    id: 'yokai-classic-tee',
    title: 'YOKAI CLASSIC TEE',
    price: 150000,
    description: 'The definitive Yokai Wotagei heavy cotton tee. Featuring our signature logo on the back and minimalist typography on the chest. Built for intense waza practice.',
    variants: ['S', 'M', 'L', 'XL', 'XXL'],
    available: true,
  },
  {
    id: 'blade-lightstick',
    title: 'MURAMASA LUMINA BLADE',
    price: 250000,
    description: 'High-luminance multi-color blade custom engineered for wotagei performance. Perfectly balanced for dual-wielding.',
    available: false,
  },
  {
    id: 'yokai-hoodie-2026',
    title: 'UNDERGROUND CIRCUIT HOODIE',
    price: 350000,
    description: 'Limited 2026 tour edition. Thick fleece material with oversized fit. Perfect for warming up before hitting the stage.',
    variants: ['M', 'L', 'XL'],
    available: true,
  },
];

export async function migrateMerch() {
  log('\n🎽 Migrating: Merch Items');
  warn('Product images HARUS di-upload manual via Sanity Studio (lihat MIGRATION-IMAGES.md)');

  for (const m of merchItems) {
    const doc: Record<string, unknown> = {
      _id:  `merch-${m.id}`,
      _type: 'shopItem',
      title: m.title,
      slug:  { _type: 'slug', current: m.id },
      category: 'merch',
      price: m.price,
      description: m.description,
      available: m.available,
    };
    if (m.variants) doc.variants = m.variants;

    try {
      await client.createOrReplace(doc);
      ok(`Merch: "${m.title}" (images perlu upload manual)`);
    } catch (err: unknown) {
      fail(`Merch "${m.title}": ${err instanceof Error ? err.message : err}`);
    }
  }
}
