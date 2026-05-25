/**
 * migrate-photos.ts — Migrates photo events to Sanity.
 * NOTE: Images cannot be auto-uploaded. Only metadata is migrated.
 *       Upload images manually via Studio (see MIGRATION-IMAGES.md).
 * Run: bun run scripts/migrations/migrate-photos.ts
 */
import { client, log, ok, fail, warn } from './_client';

const photoEvents = [
  { id: 'zepp-jakarta-2026',       eventName: 'ZEPP JAKARTA: THE FIRST RITUAL',  date: 'DEC 2026', caption: 'Our biggest solo stage. A culmination of sweat, tears, and unfiltered emotion.' },
  { id: 'underground-fes-4',       eventName: 'UNDERGROUND FES VOL.4',            date: 'SEP 2026', caption: 'Taking over Shibuya. The raw energy of the underground scene in Tokyo.' },
  { id: 'anisong-matsuri-26',      eventName: 'ANISONG MATSURI',                  date: 'MAY 2026', caption: 'JIExpo Kemayoran shook with the light of a thousand blades.' },
  { id: 'waza-shoot-1',            eventName: 'WAZA SHOOTING #01',                date: 'FEB 2026' },
  { id: 'zepp-jakarta-2026-pt2',   eventName: 'ZEPP JAKARTA: BACKSTAGE',          date: 'DEC 2026' },
  { id: 'underground-fes-4-pt2',   eventName: 'UNDERGROUND FES: AFTERPARTY',      date: 'SEP 2026' },
  { id: 'anisong-matsuri-26-pt2',  eventName: 'ANISONG MATSURI: MEET & GREET',    date: 'MAY 2026' },
  { id: 'waza-shoot-1-pt2',        eventName: 'WAZA SHOOTING: B-ROLL',            date: 'FEB 2026' },
];

export async function migratePhotos() {
  log('\n📸 Migrating: Photo Events');
  warn('Cover image dan gallery images HARUS di-upload manual via Sanity Studio (lihat MIGRATION-IMAGES.md)');

  for (const e of photoEvents) {
    const doc: Record<string, unknown> = {
      _id:  `photo-event-${e.id}`,
      _type: 'photoEvent',
      eventName: e.eventName,
      date: e.date,
    };
    if (e.caption) doc.caption = e.caption;

    try {
      await client.createOrReplace(doc);
      ok(`Photo Event: "${e.eventName}" (images perlu upload manual)`);
    } catch (err: unknown) {
      fail(`Photo Event "${e.eventName}": ${err instanceof Error ? err.message : err}`);
    }
  }
}
