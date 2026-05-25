/**
 * migrate-gallery.ts
 * Run: bun run scripts/migrations/migrate-gallery.ts
 */
import { client, log, ok, fail } from './_client';
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const photoEvents = [
  {
    id: 'zepp-jakarta-2026',
    eventName: 'ZEPP JAKARTA: THE FIRST RITUAL',
    date: 'DEC 2026',
    coverImage: '1.webp',
    images: ['2.webp', '3.webp', '4.webp'],
    caption: 'Our biggest solo stage. A culmination of sweat, tears, and unfiltered emotion.'
  },
  {
    id: 'underground-fes-4',
    eventName: 'UNDERGROUND FES VOL.4',
    date: 'SEP 2026',
    coverImage: '2.webp',
    images: ['1.webp', '3.webp', '4.webp'],
    caption: 'Taking over Shibuya. The raw energy of the underground scene in Tokyo.'
  },
  {
    id: 'anisong-matsuri-26',
    eventName: 'ANISONG MATSURI',
    date: 'MAY 2026',
    coverImage: '3.webp',
    images: ['1.webp', '2.webp', '4.webp'],
    caption: 'JIExpo Kemayoran shook with the light of a thousand blades.'
  },
  {
    id: 'waza-shoot-1',
    eventName: 'WAZA SHOOTING #01',
    date: 'FEB 2026',
    coverImage: '4.webp',
    images: ['1.webp', '2.webp', '3.webp'],
  }
];

const videos = [
  {
    id: 'waza-showcase-1',
    title: 'MURAMASA WAZA SHOWCASE',
    date: 'JAN 2027',
    gif: 'placeholder.gif',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Demonstration of the new Muramasa dual-wielding technique.'
  },
  {
    id: 'live-zepp-highlights',
    title: 'ZEPP STAGE HIGHLIGHTS',
    date: 'DEC 2026',
    gif: 'placeholder.gif',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'practice-session-04',
    title: 'STUDIO SESSION #04',
    date: 'NOV 2026',
    gif: 'placeholder.gif',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Raw practice footage preparing for the Tokyo underground circuit.'
  },
  {
    id: 'collab-waza',
    title: 'GUEST COLLAB: TOKYO TEAM',
    date: 'OCT 2026',
    gif: 'placeholder.gif',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

export async function migrateGallery() {
  log('\n📦 Migrating: Gallery (Photos & Videos)');

  for (const event of photoEvents) {
    try {
      const mainImgPath = path.join(SRC_DIR, 'assets', 'photos', event.coverImage);
      const mainAsset = await client.assets.upload('image', fs.createReadStream(mainImgPath), { filename: event.coverImage });

      const additionalImages = [];
      for (const imgName of event.images) {
        const imgPath = path.join(SRC_DIR, 'assets', 'photos', imgName);
        const asset = await client.assets.upload('image', fs.createReadStream(imgPath), { filename: imgName });
        additionalImages.push({ _type: 'image', asset: { _type: 'reference', _ref: asset._id } });
      }

      const doc = {
        _id: `photoevent-${event.id}`,
        _type: 'photoEvent',
        eventName: event.eventName,
        date: event.date,
        caption: event.caption,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: mainAsset._id } },
        images: additionalImages,
      };

      await client.createOrReplace(doc);
      ok(`Photo Event: "${event.eventName}"`);
    } catch (e: unknown) {
      fail(`Photo Event "${event.eventName}": ${e instanceof Error ? e.message : e}`);
    }
  }

  for (const v of videos) {
    try {
      const gifPath = path.join(SRC_DIR, 'assets', 'videos', v.gif);
      const gifAsset = await client.assets.upload('image', fs.createReadStream(gifPath), { filename: v.gif });

      const doc = {
        _id: `videoitem-${v.id}`,
        _type: 'videoItem',
        title: v.title,
        date: v.date,
        youtubeUrl: v.link,
        caption: v.caption,
        thumbnailGif: { _type: 'image', asset: { _type: 'reference', _ref: gifAsset._id } }
      };

      await client.createOrReplace(doc);
      ok(`Video: "${v.title}"`);
    } catch (e: unknown) {
      fail(`Video "${v.title}": ${e instanceof Error ? e.message : e}`);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  import('dotenv/config');
  await migrateGallery();
}
