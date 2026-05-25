/**
 * migrate-landing.ts — Migrates Projects, Live Performances, and Landing Page Singleton to Sanity.
 * Run: bun run scripts/migrations/migrate-landing.ts
 */
import { client, log, ok, fail } from './_client';

// ── Inline source data (mirrored from src/components/landing/) ─────────────
const projects = [
  { title: 'The Awakening: Original Waza Showcase', date: '2026.10.14', videoId: 'dQw4w9WgXcQ' },
  { title: 'Concept Film #01',                      date: '2026.08.22', videoId: 'dQw4w9WgXcQ' },
  { title: 'Behind The Scenes',                     date: '2026.07.05', videoId: 'dQw4w9WgXcQ' },
];

const performances = [
  { title: 'Zepp Jakarta: The First Ritual', meta: 'Main Stage',       date: '2026.12.31', videoId: 'dQw4w9WgXcQ', youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Underground Fes vol.4',          meta: 'Shibuya, Tokyo',   date: '2026.09.15', videoId: 'dQw4w9WgXcQ' },
  { title: 'Anisong Matsuri',               meta: 'JIExpo Kemayoran', date: '2026.05.20', videoId: 'dQw4w9WgXcQ' },
];

export async function migrateLanding() {
  log('\n📦 Migrating: Projects & Live Performances');

  // Projects
  for (const p of projects) {
    const doc = {
      _id:  `project-${p.videoId}-${p.date.replace(/\./g, '')}`,
      _type: 'project',
      title: p.title,
      youtubeUrl: `https://www.youtube.com/watch?v=${p.videoId}`,
      description: p.title,
      releaseDate: p.date.replace(/\./g, '-'),
    };
    try {
      await client.createOrReplace(doc);
      ok(`Project: "${p.title}"`);
    } catch (e: unknown) {
      fail(`Project "${p.title}": ${e instanceof Error ? e.message : e}`);
    }
  }

  // Live Performances
  for (const p of performances) {
    const doc = {
      _id:  `performance-${p.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40)}`,
      _type: 'livePerformance',
      title: p.title,
      youtubeUrl: `https://www.youtube.com/watch?v=${p.youtubeId ?? p.videoId}`,
      date: p.date.replace(/\./g, '-'),
      location: p.meta,
    };
    try {
      await client.createOrReplace(doc);
      ok(`Performance: "${p.title}"`);
    } catch (e: unknown) {
      fail(`Performance "${p.title}": ${e instanceof Error ? e.message : e}`);
    }
  }

  // Landing Page singleton
  try {
    await client.createOrReplace({
      _id: 'landing-page-singleton',
      _type: 'landingPage',
      
      heroOverlayTitle: 'YOKAI',
      heroOverlaySubtitle: 'WOTAGEI',

      mottoLine1: 'WE DO NOT JUST',
      mottoLine2: 'PERFORM.',
      mottoLine3: 'WE INOVATE.',
      mottoSubtitle: 'Bridging the raw energy of Wotagei with premium contemporary artistry.',
      mottoBadge: 'The Yokai Manifesto',
      
      whoAreWeTitle: 'WHO ARE WE',
      whoAreWeHighlight: 'BORN FROM THE CROWD, FORGED IN DISCIPLINE.',
      whoAreWeBody: 'We are YOKAI. An independent Wotagei performance team hailing from Yogyakarta. We don’t just swing lights—we dictate the rhythm of the crowd. With precision, emotion, and unrelenting energy, we blur the line between performer and audience.',
      whoAreWeButtonText: 'READ OUR STORY',
    });
    ok('Landing Page singleton updated with full data');
  } catch (e: unknown) {
    fail(`Landing Page: ${e instanceof Error ? e.message : e}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  import('dotenv/config');
  await migrateLanding();
}
