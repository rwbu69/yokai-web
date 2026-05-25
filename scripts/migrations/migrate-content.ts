/**
 * migrate-content.ts
 * Run: bun run scripts/migrations/migrate-content.ts
 */
import { client, log, ok, fail } from './_client';
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const articles = [
  {
    slug: 'persiapan-fisik',
    title: 'Persiapan Fisik Sebelum Perform',
    description: 'Tips menjaga stamina dan menghindari cedera saat melakukan wotagei.',
    coverImage: '1.webp',
    date: '2024-02-05',
    tags: ['tips', 'health'],
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Persiapan Fisik Sebelum Perform' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Melakukan wotagei selama 4 menit penuh layaknya lari sprint. Banyak pemula yang menyepelekan hal ini dan berakhir dengan cedera bahu ringan.' }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Pemanasan Wajib' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Selalu lakukan stretching pada bagian pundak, pergelangan tangan, dan pergelangan kaki. Putar lengan perlahan selama 30 detik ke depan dan ke belakang.' }]
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: 'Tubuh yang rileks akan menghasilkan garis ayunan cahaya yang jauh lebih lurus.' }]
      }
    ]
  },
  {
    slug: 'sejarah-yogyakarta',
    title: 'Sejarah Wotagei di Yogyakarta',
    description: 'Bagaimana kultur lightstick berevolusi di Kota Pelajar.',
    coverImage: '2.webp', // Using 2.webp since .JPG is probably outdated extension naming in the original codebase vs 2.webp
    date: '2024-01-10',
    tags: ['history', 'culture'],
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Menelusuri Akar Wotagei di Yogyakarta' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Yogyakarta tidak hanya dikenal sebagai kota budaya, tetapi juga menjadi saksi bisu perkembangan sub-kultur wotagei di Indonesia. Dari kumpul-kumpul kecil di sudut alun-alun hingga memonopoli panggung event kebudayaan Jepang.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Era Awal' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Dulu, mendapatkan lightstick yang layak sangat sulit. Banyak dari perintis skena ini menggunakan stik modifikasi dari senter LED murah yang ditempel dengan mika warna-warni. Namun keterbatasan ini justru melahirkan kreativitas gerakan yang tak terduga.' }]
      }
    ]
  }
];

const wazas = [
  {
    slug: 'muramasa-strike',
    title: 'Muramasa Strike',
    description: 'Sebuah original waza yang diciptakan oleh Yokai pada tahun 2024, mengandalkan kecepatan putaran.',
    coverImage: '3.webp',
    date: '2024-03-15',
    tags: ['original', 'speed'],
    wazaType: 'originalMember',
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Muramasa Strike' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Muramasa Strike adalah teknik original waza yang diciptakan oleh anggota Yokai untuk menandingi ritme lagu bertempo di atas 180 BPM.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Filosofi Gerakan' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Teknik ini mengambil inspirasi dari tebasan pedang beruntun, mengubah ayunan lightstick menjadi rentetan garis cahaya yang tajam dan tidak terputus. Titik tumpu berada di pergelangan tangan, meminimalisir pergerakan bahu untuk menjaga stamina.' }]
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: 'Gerakan yang efisien adalah kunci dari kecepatan absolut. Kami membuang semua ayunan ekstra.' }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Cara Melakukan' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Buka kuda-kuda selebar bahu.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Ayunkan lightstick dari kiri bawah ke kanan atas secara diagonal.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Putar pergelangan tangan di puncak ayunan untuk membalikkan arah tanpa jeda.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Latih dengan kecepatan lambat terlebih dahulu sebelum mencoba mengejar BPM yang sebenarnya.' }]
      }
    ]
  },
  {
    slug: 'tornado-phantom',
    title: 'Tornado Phantom',
    description: 'Waza berputar dengan teknik lemparan lightstick di udara.',
    coverImage: '2.webp',
    date: '2023-11-20',
    tags: ['original', 'acrobatic'],
    wazaType: 'originalMember',
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Tornado Phantom' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Tornado Phantom menggabungkan wotagei dasar dengan elemen juggling ringan, menghasilkan ilusi rotasi cahaya yang lepas dari genggaman.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Eksekusi' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Dibutuhkan timing yang sangat presisi. Melempar lightstick terlalu tinggi akan merusak ritme waza secara keseluruhan, sementara lemparan yang terlalu rendah tidak akan memberikan cukup waktu untuk melakukan putaran badan.' }]
      }
    ]
  }
];

export async function migrateContent() {
  log('\n📦 Migrating: Articles & Waza');

  for (const item of articles) {
    try {
      const imgPath = path.join(SRC_DIR, 'assets', 'photos', item.coverImage);
      const mainAsset = await client.assets.upload('image', fs.createReadStream(imgPath), { filename: item.coverImage });

      const doc = {
        _id: `article-${item.slug}`,
        _type: 'article',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        description: item.description,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: mainAsset._id } },
        date: item.date,
        tags: item.tags,
        body: item.body,
        draft: false
      };

      await client.createOrReplace(doc);
      ok(`Article: "${item.title}"`);
    } catch (e: unknown) {
      fail(`Article "${item.title}": ${e instanceof Error ? e.message : e}`);
    }
  }

  for (const item of wazas) {
    try {
      const imgPath = path.join(SRC_DIR, 'assets', 'photos', item.coverImage);
      const mainAsset = await client.assets.upload('image', fs.createReadStream(imgPath), { filename: item.coverImage });

      const doc = {
        _id: `waza-${item.slug}`,
        _type: 'waza',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        wazaType: item.wazaType,
        description: item.description,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: mainAsset._id } },
        date: item.date,
        tags: item.tags,
        body: item.body,
      };

      await client.createOrReplace(doc);
      ok(`Waza: "${item.title}"`);
    } catch (e: unknown) {
      fail(`Waza "${item.title}": ${e instanceof Error ? e.message : e}`);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  import('dotenv/config');
  await migrateContent();
}
