// src/components/about/trackRecord.ts
//
// File data untuk komponen TrackRecord.astro.
// Diimport di src/components/about/TrackRecord.astro.
//
// ──────────────────────────────────────────────────────────
// STRUKTUR INTERFACE
// ──────────────────────────────────────────────────────────
//   id:          number  — ID unik, urut dari 1
//   event:       string  — Nama event
//   date:        string  — Format bebas: "Dec 2024", "Nov 2023", dst.
//   achievement: string  — Posisi / pencapaian singkat
//   image:       string  — URL gambar (gunakan img.src dari Astro image import)
//   description: string  — 1–2 kalimat untuk ditampilkan di modal
//   youtube?:    string  — URL YouTube penuh (opsional — hilangkan field ini
//                          jika tidak ada video, bukan diisi string kosong)
//
// ──────────────────────────────────────────────────────────
// CARA MENAMBAH / MENGEDIT / MENGHAPUS ITEM
// ──────────────────────────────────────────────────────────
//   Tambah   : tambahkan objek baru di akhir array `trackRecords`,
//              berikan id unik berikutnya, import gambar baru jika perlu.
//   Edit     : ubah field pada objek yang diinginkan.
//   Hapus    : hapus objek dari array; ID tidak perlu berurutan.
//   Urutan   : array harus diurutkan TERBARU → TERLAMA (atas = paling baru).
//              Custom scrollbar / timeline otomatis menyesuaikan.
//
// Gambar diimport dari src/assets/hero-images/ menggunakan Vite/Astro.
// Gunakan `.src` untuk mendapatkan URL string yang diproses.

import img1 from '../../assets/hero-images/1.jpg';
import img2 from '../../assets/hero-images/2.jpg';
import img3 from '../../assets/hero-images/3.jpg';
import img4 from '../../assets/hero-images/4.jpg';
import img5 from '../../assets/hero-images/5.jpg';
import img6 from '../../assets/hero-images/6.jpg';
import img7 from '../../assets/hero-images/7.jpg';
import img8 from '../../assets/hero-images/8.jpg';

// ── Public interface ──────────────────────────────────────────────────────────
export interface TrackRecord {
  id:          number;
  event:       string;
  date:        string;
  achievement: string;
  image:       string;
  description: string;
  youtube?:    string;
}

// ── Data — diurutkan TERBARU → TERLAMA ───────────────────────────────────────
export const trackRecords: TrackRecord[] = [
  {
    id:          1,
    event:       'Wotagei National Invitational',
    date:        'Dec 2024',
    achievement: 'Finalist — Top 8 Nationally',
    image:       img1.src,
    description: 'Competed against 32 teams from across Indonesia. Showcased our signature Roman-Densha combination in both qualifying and elimination rounds, advancing to the final 8.',
    youtube:     'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id:          2,
    event:       'Jogja Idol Festival 2024',
    date:        'Aug 2024',
    achievement: 'Best Formation Award',
    image:       img2.src,
    description: 'Recognized for outstanding synchronized formation work in the group performance category. One of three awards distributed among all competing groups.',
  },
  {
    id:          3,
    event:       'Wotagei Open Competition',
    date:        'Apr 2024',
    achievement: '2nd Place — Group Division',
    image:       img3.src,
    description: 'Open regional competition. Performed a 4-minute original routine combining Roman, Mix, and Smile Gakuen. Narrowly missed 1st place by a single judge vote.',
    youtube:     'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id:          4,
    event:       'Wota Jogja Open',
    date:        'Nov 2023',
    achievement: '1st Place',
    image:       img4.src,
    description: 'Home ground victory. Delivered a clean, high-energy performance under pressure and took first place in the main competition category for the first time.',
    youtube:     'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id:          5,
    event:       'Kolaborasi Budaya DIY',
    date:        'Jun 2023',
    achievement: 'Invited Performance',
    image:       img5.src,
    description: 'Selected as one of five Yogyakarta-based performance groups for the annual cultural showcase. Performed a 7-minute set bridging traditional and contemporary aesthetics.',
  },
  {
    id:          6,
    event:       'Anisong Night Yogyakarta',
    date:        'Feb 2023',
    achievement: 'Invited Performance',
    image:       img6.src,
    description: 'Featured as the opening act for the annual anisong concert series. First major indoor venue performance with approximately 800 attendees.',
  },
  {
    id:          7,
    event:       'Wotagei Exhibition · Malioboro',
    date:        'Oct 2022',
    achievement: 'Featured Team',
    image:       img7.src,
    description: 'One of two teams selected for a public exhibition at Malioboro. Five back-to-back sets across the day, reaching an estimated 2,000+ passersby.',
  },
  {
    id:          8,
    event:       'Perdana Showcase Yogyakarta',
    date:        'Mar 2022',
    achievement: 'Debut Performance',
    image:       img8.src,
    description: 'The first public appearance of Yokai Wotagei as a unit. A 3-minute set at a local anime community event. The beginning of everything.',
  },
];
