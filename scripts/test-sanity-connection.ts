/**
 * scripts/test-sanity-connection.ts
 * Run: bun run scripts/test-sanity-connection.ts
 */
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env from project root
config({ path: resolve(process.cwd(), '.env') });

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION ?? '2025-02-19';
const token     = process.env.SANITY_API_TOKEN;

console.log('\n🔍 Sanity Connection Test');
console.log('─────────────────────────');
console.log(`Project ID : ${projectId ?? '❌ MISSING'}`);
console.log(`Dataset    : ${dataset}`);
console.log(`API Version: ${apiVersion}`);
console.log(`Token      : ${token && token !== 'your-read-token-here' ? '✅ Set (' + token.slice(0, 8) + '...)' : '❌ MISSING or placeholder'}`);
console.log('─────────────────────────\n');

if (!projectId || !token || token === 'your-read-token-here') {
  console.error('❌ Missing credentials. Check your .env file.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

try {
  console.log('⏳ Connecting to Sanity...');
  const result = await client.fetch<number>(`count(*)`);
  console.log(`✅ Connection successful! Found ${result} total documents in dataset.`);
  console.log('\n🚀 Ready to run migration scripts!\n');
} catch (err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(`❌ Connection failed: ${msg}`);
  if (msg.includes('401')) {
    console.error('   → Token tidak valid atau tidak punya permission. Buat token baru dengan role Editor.');
  } else if (msg.includes('project')) {
    console.error('   → Project ID tidak valid. Cek PUBLIC_SANITY_PROJECT_ID di .env');
  }
  process.exit(1);
}
