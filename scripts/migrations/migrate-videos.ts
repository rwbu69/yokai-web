/**
 * migrate-videos.ts — Migrates video items to Sanity.
 * NOTE: GIF thumbnails cannot be auto-uploaded. Upload manually via Studio.
 * Run: bun run scripts/migrations/migrate-videos.ts
 */
import { client, log, ok, fail, warn } from './_client';

const videos = [
  { id: 'waza-showcase-1',           title: 'MURAMASA WAZA SHOWCASE',    date: 'JAN 2027', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Demonstration of the new Muramasa dual-wielding technique.' },
  { id: 'live-zepp-highlights',      title: 'ZEPP STAGE HIGHLIGHTS',     date: 'DEC 2026', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'practice-session-04',       title: 'STUDIO SESSION #04',        date: 'NOV 2026', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Raw practice footage preparing for the Tokyo underground circuit.' },
  { id: 'collab-waza',               title: 'GUEST COLLAB: TOKYO TEAM',  date: 'OCT 2026', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'waza-showcase-2',           title: 'AMATERASU WAZA SHOWCASE',   date: 'SEP 2026', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'live-underground-highlights',title: 'UNDERGROUND HIGHLIGHTS',    date: 'AUG 2026', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'practice-session-05',       title: 'STUDIO SESSION #05',        date: 'JUL 2026', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'collab-waza-2',             title: 'GUEST COLLAB: OSAKA TEAM',  date: 'JUN 2026', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
];

export async function migrateVideos() {
  log('\n🎬 Migrating: Video Items');
  warn('Thumbnail GIF HARUS di-upload manual via Sanity Studio (lihat MIGRATION-IMAGES.md)');

  for (const v of videos) {
    const doc: Record<string, unknown> = {
      _id:  `video-${v.id}`,
      _type: 'videoItem',
      title: v.title,
      date:  v.date,
      youtubeUrl: v.link,
    };
    if (v.caption) doc.caption = v.caption;

    try {
      await client.createOrReplace(doc);
      ok(`Video: "${v.title}" (thumbnail perlu upload manual)`);
    } catch (err: unknown) {
      fail(`Video "${v.title}": ${err instanceof Error ? err.message : err}`);
    }
  }
}
