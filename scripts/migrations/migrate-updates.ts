/**
 * migrate-updates.ts
 * Run: bun run scripts/migrations/migrate-updates.ts
 */
import { client, log, ok, fail } from './_client';
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const updates = [
  {
    slug: 'mangafest-2024',
    title: 'Yokai Main Stage di Event Mangafest 2024',
    description: 'Jangan lewatkan penampilan perdana formasi baru kami.',
    coverImage: '2.webp', // Updated from .JPG to .webp
    date: '2024-04-10',
    tags: ['event', 'stage'],
    category: 'event',
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Mangafest 2024' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Halo semua! Kami sangat bangga mengumumkan bahwa Yokai akan kembali mengguncang panggung utama Mangafest 2024 yang akan diadakan di JEC.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Formasi Baru' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Tahun ini kami akan membawa 3 anggota generasi terbaru yang sudah berlatih keras selama 6 bulan terakhir. Akan ada kolaborasi rahasia di lagu penutup, jadi pastikan kalian datang dan membawa lightstick kebanggaan kalian!' }]
      }
    ]
  },
  {
    slug: 'oprec-batch-5',
    title: 'Open Recruitment Batch 5',
    description: 'Pendaftaran anggota baru resmi dibuka.',
    coverImage: '1.webp', // Updated from 6.JPG to 1.webp since 6 does not exist
    date: '2024-05-01',
    tags: ['announcement', 'recruitment'],
    category: 'announcement',
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Open Recruitment Batch 5' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Saat yang kalian tunggu-tunggu akhirnya tiba! Yokai Wotagei Team resmi membuka pendaftaran untuk Batch 5.' }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Syarat Pendaftaran' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Memiliki semangat pantang menyerah.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Bisa menghadiri latihan rutin di hari Minggu pagi.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Membawa lightstick sendiri (tidak wajib lumina, senter modifikasi dipersilakan).' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Kami tidak mencari mereka yang sudah jago, melainkan mereka yang mau berkeringat dan belajar bersama.' }]
      }
    ]
  }
];

export async function migrateUpdates() {
  log('\n📦 Migrating: Updates');

  for (const item of updates) {
    try {
      const imgPath = path.join(SRC_DIR, 'assets', 'photos', item.coverImage);
      const mainAsset = await client.assets.upload('image', fs.createReadStream(imgPath), { filename: item.coverImage });

      const doc = {
        _id: `update-${item.slug}`,
        _type: 'update',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        category: item.category,
        excerpt: item.description,
        image: { _type: 'image', asset: { _type: 'reference', _ref: mainAsset._id } },
        date: item.date,
        tags: item.tags,
        content: item.body,
      };

      await client.createOrReplace(doc);
      ok(`Update: "${item.title}"`);
    } catch (e: unknown) {
      fail(`Update "${item.title}": ${e instanceof Error ? e.message : e}`);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  import('dotenv/config');
  await migrateUpdates();
}
