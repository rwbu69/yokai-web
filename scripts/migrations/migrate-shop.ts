/**
 * migrate-shop.ts
 * Run: bun run scripts/migrations/migrate-shop.ts
 */
import { client, log, ok, fail } from './_client';
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const merchItems = [
  {
    id: 'yokai-classic-tee',
    name: 'YOKAI CLASSIC TEE',
    price: 150000,
    images: ['1.webp', '2.webp'],
    description: 'The definitive Yokai Wotagei heavy cotton tee. Featuring our signature logo on the back and minimalist typography on the chest. Built for intense waza practice.',
    variants: ['S', 'M', 'L', 'XL', 'XXL'],
    available: true
  },
  {
    id: 'blade-lightstick',
    name: 'MURAMASA LUMINA BLADE',
    price: 250000,
    images: ['3.webp'],
    description: 'High-luminance multi-color blade custom engineered for wotagei performance. Perfectly balanced for dual-wielding.',
    available: false
  },
  {
    id: 'yokai-hoodie-2026',
    name: 'UNDERGROUND CIRCUIT HOODIE',
    price: 350000,
    images: ['2.webp', '1.webp'],
    description: 'Limited 2026 tour edition. Thick fleece material with oversized fit. Perfect for warming up before hitting the stage.',
    variants: ['M', 'L', 'XL'],
    available: true
  }
];

export async function migrateShop() {
  log('\n📦 Migrating: Shop & Cheki');

  for (const m of merchItems) {
    try {
      // Create main image asset
      const mainImgPath = path.join(SRC_DIR, 'assets', 'hero-images', m.images[0]);
      const mainAsset = await client.assets.upload('image', fs.createReadStream(mainImgPath), { filename: m.images[0] });

      // Create additional images
      const additionalImages = [];
      for (let i = 1; i < m.images.length; i++) {
        const imgPath = path.join(SRC_DIR, 'assets', 'hero-images', m.images[i]);
        const asset = await client.assets.upload('image', fs.createReadStream(imgPath), { filename: m.images[i] });
        additionalImages.push({ _type: 'image', asset: { _type: 'reference', _ref: asset._id } });
      }

      const doc = {
        _id: `merch-${m.id}`,
        _type: 'shopItem',
        category: 'merch',
        title: m.name,
        slug: { _type: 'slug', current: m.id },
        price: m.price,
        description: m.description,
        available: m.available,
        variants: m.variants || [],
        image: { _type: 'image', asset: { _type: 'reference', _ref: mainAsset._id } },
        images: additionalImages,
      };

      await client.createOrReplace(doc);
      ok(`Merch: "${m.name}"`);
    } catch (e: unknown) {
      fail(`Merch "${m.name}": ${e instanceof Error ? e.message : e}`);
    }
  }

  // Cheki Config singleton
  try {
    await client.createOrReplace({
      _id: 'cheki-config-singleton',
      _type: 'chekiConfig',
      isOpen: false,
      closedMessage: 'OUR CHEKI IS CLOSED AT THE MOMENT.',
    });
    ok('Cheki Config singleton');
  } catch (e: unknown) {
    fail(`Cheki Config: ${e instanceof Error ? e.message : e}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  import('dotenv/config');
  await migrateShop();
}
