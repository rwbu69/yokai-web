// src/components/about/socials.ts
//
// File data untuk komponen ContactSocials.astro.
// Diimport di src/components/about/ContactSocials.astro.
//
// ──────────────────────────────────────────────────────────
// STRUKTUR INTERFACE
// ──────────────────────────────────────────────────────────
//   platform: string — Nama platform yang ditampilkan (mis. "Instagram")
//   handle:   string — Username / handle (termasuk @ jika diinginkan)
//   href:     string — URL lengkap ke profil / channel
//
// ──────────────────────────────────────────────────────────
// CARA MENAMBAH / MENGEDIT / MENGHAPUS ITEM
// ──────────────────────────────────────────────────────────
//   Tambah : tambahkan objek baru di akhir array `socials`.
//   Edit   : ubah field pada objek yang diinginkan.
//   Hapus  : hapus objek dari array.
//   Urutan : array dirender berurutan dari atas ke bawah di komponen.
//
// Email kontak (yokai.wotagei@gmail.com) dikelola langsung
// di template ContactSocials.astro (bukan bagian dari array ini).

// ── Public interface ──────────────────────────────────────────────────────────
export interface Social {
  platform: string;
  handle:   string;
  href:     string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
export const socials: Social[] = [
  {
    platform: 'Instagram',
    handle:   '@yokai.wotagei',
    href:     'https://instagram.com/yokai.wotagei',
  },
  {
    platform: 'Twitter / X',
    handle:   '@yokai_wt',
    href:     'https://x.com/yokai_wt',
  },
  {
    platform: 'YouTube',
    handle:   'Yokai Wotagei',
    href:     'https://youtube.com/@yokaiwotagei',
  },
];
