/**
 * migrate-hero-images.ts
 *
 * Uploads 12 local WebP files to Sanity asset pipeline and creates
 * the heroImages singleton document with all 12 images linked.
 *
 * Run: bun run scripts/migrations/migrate-hero-images.ts
 */
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve, join } from 'path';
import { readFileSync, existsSync } from 'fs';

config({ path: resolve(process.cwd(), '.env') });

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION ?? '2025-02-19',
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
});

const HERO_DIR = resolve(process.cwd(), 'src/assets/hero-images');

/** Upload a single WebP file to Sanity and return its asset reference */
async function uploadImage(filename: string): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } }> {
  const filePath = join(HERO_DIR, filename);

  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileBuffer = readFileSync(filePath);
  const asset = await client.assets.upload('image', fileBuffer, {
    filename,
    contentType: 'image/webp',
  });

  console.log(`  ✅ Uploaded ${filename} → ${asset._id}`);

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

console.log('\n════════════════════════════════════════');
console.log('  YOKAI — Hero Images Migration');
console.log('════════════════════════════════════════');
console.log(`Uploading from: ${HERO_DIR}\n`);

// Upload all 12 images
console.log('⏳ Uploading 12 WebP files to Sanity...\n');

const [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12] =
  await Promise.all([
    uploadImage('1.webp'),
    uploadImage('2.webp'),
    uploadImage('3.webp'),
    uploadImage('4.webp'),
    uploadImage('5.webp'),
    uploadImage('6.webp'),
    uploadImage('7.webp'),
    uploadImage('8.webp'),
    uploadImage('9.webp'),
    uploadImage('10.webp'),
    uploadImage('11.webp'),
    uploadImage('12.webp'),
  ]);

console.log('\n⏳ Creating heroImages singleton document...');

await client.createOrReplace({
  _id: 'hero-images-singleton',
  _type: 'heroImages',
  title: 'Hero Images 2026',

  // Set A: images 1–4 (panels 1–4, initial view)
  setA: {
    panel1: img1,
    panel2: img2,
    panel3: img3,
    panel4: img4,
  },

  // Set B: images 5–8 (after first slide, ~5s)
  setB: {
    panel1: img5,
    panel2: img6,
    panel3: img7,
    panel4: img8,
  },

  // Set C: images 9–12 (after second slide, ~10s)
  setC: {
    panel1: img9,
    panel2: img10,
    panel3: img11,
    panel4: img12,
  },
});

console.log('  ✅ heroImages singleton created / updated');
console.log('\n════════════════════════════════════════');
console.log('  DONE — Hero images are now in Sanity');
console.log('════════════════════════════════════════');
console.log('→ Buka Studio → "Hero Images (Landing Page)" untuk edit');
console.log('→ Setelah edit, klik Publish → rebuild website\n');
