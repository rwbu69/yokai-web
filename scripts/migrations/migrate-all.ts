/**
 * migrate-all.ts — Master migration script. Runs all migrations in order.
 * Run: bun run scripts/migrations/migrate-all.ts
 */
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env') });

import { migrateLanding }  from './migrate-landing';
import { migrateAbout }    from './migrate-about';
import { migrateMembers }  from './migrate-members';
import { migratePhotos }   from './migrate-photos';
import { migrateVideos }   from './migrate-videos';
import { migrateMerch }    from './migrate-merch';
import { migrateCheki }    from './migrate-cheki';
import { migrateContent }  from './migrate-content';

const DELAY_MS = 500; // pause between scripts to respect Sanity rate limits

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// ── Pre-flight check ──────────────────────────────────────────────────────────
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const token     = process.env.SANITY_API_TOKEN;

if (!projectId || !token || token === 'your-read-token-here') {
  console.error('\n❌ ABORT: Missing or invalid credentials in .env');
  console.error('   Ensure PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are set.\n');
  process.exit(1);
}

// Quick connection test
const testClient = createClient({
  projectId,
  dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION ?? '2025-02-19',
  token,
  useCdn: false,
});

console.log('\n════════════════════════════════════════');
console.log('  YOKAI WOTAGEI — SANITY MIGRATION');
console.log('════════════════════════════════════════');
console.log(`Project  : ${projectId}`);
console.log(`Dataset  : ${process.env.PUBLIC_SANITY_DATASET ?? 'production'}`);
console.log(`Token    : ${token.slice(0, 8)}...`);
console.log('────────────────────────────────────────\n');

try {
  const count = await testClient.fetch<number>(`count(*)`);
  console.log(`⚡ Connection OK — ${count} existing documents\n`);
} catch {
  console.error('❌ Cannot connect to Sanity. Aborting.');
  process.exit(1);
}

// ── Run migrations ────────────────────────────────────────────────────────────
const steps: Array<{ name: string; fn: () => Promise<void> }> = [
  { name: 'Landing Page & Performances', fn: migrateLanding },
  { name: 'About Us',                    fn: migrateAbout   },
  { name: 'Members',                     fn: migrateMembers  },
  { name: 'Photo Events',               fn: migratePhotos  },
  { name: 'Video Items',                fn: migrateVideos  },
  { name: 'Merch Items',               fn: migrateMerch   },
  { name: 'Cheki Items & Config',       fn: migrateCheki   },
  { name: 'Content Collections',        fn: migrateContent },
];

let successSteps = 0;
let failedSteps  = 0;

for (let i = 0; i < steps.length; i++) {
  const step = steps[i];
  console.log(`\n[${i + 1}/${steps.length}] ${step.name}...`);
  try {
    await step.fn();
    successSteps++;
  } catch (err: unknown) {
    console.error(`  ❌ Step failed: ${err instanceof Error ? err.message : err}`);
    failedSteps++;
  }
  if (i < steps.length - 1) await sleep(DELAY_MS);
}

// ── Summary ───────────────────────────────────────────────────────────────────
const finalCount = await testClient.fetch<number>(`count(*)`);

console.log('\n════════════════════════════════════════');
console.log('  MIGRATION COMPLETE');
console.log('════════════════════════════════════════');
console.log(`Steps success : ${successSteps}/${steps.length}`);
console.log(`Steps failed  : ${failedSteps}/${steps.length}`);
console.log(`Total docs now: ${finalCount}`);
console.log('────────────────────────────────────────');
console.log('⚠️  Collections requiring manual image upload:');
console.log('   → Members (foto anggota)');
console.log('   → Photo Events (cover + gallery images)');
console.log('   → Video Items (GIF thumbnail)');
console.log('   → Merch Items (foto produk)');
console.log('   → Cheki Items (foto polaroid)');
console.log('   → About Us (hero background image)');
console.log('\n   Buka MIGRATION-IMAGES.md untuk panduan upload.');
console.log('════════════════════════════════════════\n');
