/**
 * scripts/migrations/_client.ts
 * Shared Sanity client for all migration scripts.
 */
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env') });

export const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION ?? '2025-02-19',
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
});

export function log(msg: string) { console.log(msg); }
export function ok(msg: string)  { console.log(`  ✅ ${msg}`); }
export function warn(msg: string){ console.log(`  ⚠️  ${msg}`); }
export function fail(msg: string){ console.log(`  ❌ ${msg}`); }
