// src/components/landing/performances.ts
//
// File data untuk komponen LivePerformances.astro.
// Diimport di src/components/landing/LivePerformances.astro.
//
// ──────────────────────────────────────────────────────────
// STRUKTUR INTERFACE
// ──────────────────────────────────────────────────────────
//   title:     string  — Judul / nama event performance
//   meta:      string  — Keterangan singkat: venue, stage, kota, dst.
//   date:      string  — Tanggal event (format: "YYYY.MM.DD")
//   videoId:   string  — ID video YouTube untuk thumbnail fallback
//                        Contoh: "youtube.com/watch?v=abc123" → "abc123"
//   youtubeId?: string — ID video YouTube untuk iframe embed (opsional).
//                        Jika diisi: komponen menampilkan <iframe> embed.
//                        Jika kosong/tidak ada: tampil thumbnail sebagai fallback.
//                        Biasanya sama dengan videoId, tapi bisa berbeda.
//
// ──────────────────────────────────────────────────────────
// CARA MENAMBAH / MENGEDIT / MENGHAPUS ITEM
// ──────────────────────────────────────────────────────────
//   Tambah : tambahkan objek baru. Item pertama akan menjadi
//            FEATURED (ditampilkan lebih besar dengan iframe).
//            Item berikutnya menjadi SUPPORTING (compact, di kanan).
//   Edit   : ubah field pada objek yang diinginkan.
//   Hapus  : hapus objek dari array.
//   Urutan : item[0] = featured, item[1...] = supporting.

// ── Public interface ──────────────────────────────────────────────────────────
export interface Performance {
  title:      string;
  meta:       string;
  date:       string;
  videoId:    string;
  youtubeId?: string;
}

// ── Data — item[0] = FEATURED, item[1...] = SUPPORTING ───────────────────────
export const performances: Performance[] = [
  {
    title:      'Zepp Jakarta: The First Ritual',
    meta:       'Main Stage',
    date:       '2026.12.31',
    videoId:    'dQw4w9WgXcQ',
    youtubeId:  'dQw4w9WgXcQ',   // embed iframe shown on featured item
  },
  {
    title:      'Underground Fes vol.4',
    meta:       'Shibuya, Tokyo',
    date:       '2026.09.15',
    videoId:    'dQw4w9WgXcQ',
    // youtubeId not set → compact list, no embed
  },
  {
    title:      'Anisong Matsuri',
    meta:       'JIExpo Kemayoran',
    date:       '2026.05.20',
    videoId:    'dQw4w9WgXcQ',
    // youtubeId not set → compact list, no embed
  },
];
