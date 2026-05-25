// src/components/landing/projects.ts
//
// File data untuk komponen Projects.astro.
// Diimport di src/components/landing/Projects.astro.
//
// ──────────────────────────────────────────────────────────
// STRUKTUR INTERFACE
// ──────────────────────────────────────────────────────────
//   title:   string — Judul proyek
//   date:    string — Tanggal rilis / publish (format: "YYYY.MM.DD")
//   videoId: string — ID video YouTube (bagian setelah "v=" di URL)
//                     Contoh: URL "youtube.com/watch?v=abc123" → videoId: "abc123"
//
// ──────────────────────────────────────────────────────────
// CARA MENAMBAH / MENGEDIT / MENGHAPUS ITEM
// ──────────────────────────────────────────────────────────
//   Tambah : tambahkan objek baru. Komponen menampilkan SEMUA item
//            dalam 3-column grid — pertimbangkan jumlah agar tetap compact.
//   Edit   : ubah field pada objek yang diinginkan.
//   Hapus  : hapus objek dari array.
//   Urutan : item dirender berurutan dari kiri ke kanan sesuai urutan array.

// ── Public interface ──────────────────────────────────────────────────────────
export interface Project {
  title:   string;
  date:    string;
  videoId: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    title:   'The Awakening: Original Waza Showcase',
    date:    '2026.10.14',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    title:   'Concept Film #01',
    date:    '2026.08.22',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    title:   'Behind The Scenes',
    date:    '2026.07.05',
    videoId: 'dQw4w9WgXcQ',
  },
];
