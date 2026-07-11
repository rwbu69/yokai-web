# Dokumentasi Fitur Yokai Web

## 1. Landing Page (Home)
- **Lokasi file**: 
  - `src/pages/index.astro`
  - `src/components/landing/*.astro` (HeroLanding, WhoAreWe, Projects, Schedule, LivePerformances)
- **Fungsi**: Beranda utama untuk menarik pengunjung. Menampilkan sorotan (highlight) identitas grup (Who Are We), proyek video terbaru, jadwal manggung (Schedule), dan dokumentasi performa (Live Performances).
- **Cara kerja teknis**: `index.astro` memanggil data dari Sanity untuk Hero Images, Projects, Schedule, dan Live Performances. Data tersebut kemudian diteruskan ke masing-masing komponen pendarat (landing components). Animasi masuk (reveal) ditangani secara individual di tiap komponen menggunakan Anime.js (Intersection Observer).
- **Titik rawan perubahan**: Pengaturan layout dan urutan komponen di dalam `index.astro`. Pengubahan logika tanggal di `Schedule.astro` dan `Projects.astro` sangat rentan menghasilkan *type errors* jika tidak disesuaikan dengan skema `sanity.ts` maupun fallback lokalnya.
- **Dependency**: Membutuhkan `sanityClient` dari `@lib/sanity`, layout utama (`Layout.astro`), dan Anime.js untuk animasi klien.

## 2. About Us
- **Lokasi file**: 
  - `src/pages/about.astro`
  - `src/components/about/*.astro` (HeroAbout, OurStory, TrackRecord, ContactSocials)
- **Fungsi**: Menjelaskan sejarah pembentukan Yokai, rekam jejak, visi misi, serta menyediakan informasi kontak dan media sosial.
- **Cara kerja teknis**: Data di-fetch seluruhnya (atau *hardcoded* dengan fallback) di `about.astro`. Berisi *Accordion* untuk "Our Story" dan daftar panjang pencapaian di "Track Record". Interaktivitas akordion dikendalikan via DOM standard (Vanilla JS) di dalam komponennya masing-masing.
- **Titik rawan perubahan**: Penambahan sosial media di `ContactSocials.astro` membutuhkan ikon SVG spesifik. Pastikan Anda memiliki aset SVG yang konsisten untuk menjaga integritas visual.
- **Dependency**: Komponen statis UI, Anime.js untuk transisi masuk.

## 3. Members Directory
- **Lokasi file**:
  - `src/pages/members.astro`
  - `src/components/members/*.astro`
- **Fungsi**: Halaman khusus untuk memperkenalkan seluruh anggota Yokai beserta peran (posisi), kutipan, dan foto mereka.
- **Cara kerja teknis**: Mengambil tipe dokumen `member` dari Sanity. Komponen `MembersPage.astro` merender *grid* dan *StripItem* interaktif (Accordion strip horizontal/vertikal) menggunakan interaksi DOM dan CSS flex-grow untuk transisi ukuran (hover/expand). Data di-*inject* menggunakan blok `<script define:vars>` ke sisi klien.
- **Titik rawan perubahan**: Animasi kembang-kempis (expand/collapse) profil anggota. Pengubahan kelas CSS atau markup DOM di sini sangat rawan memecah kalkulasi tata letak flexbox interaktifnya. Perhatikan penanganan *mobile view* yang berbeda dengan desktop.
- **Dependency**: Data Sanity tipe `member`.

## 4. Yokai Library (Articles & Waza)
- **Lokasi file**:
  - `src/pages/library/.../index.astro` dan `[slug].astro`
  - `src/components/blog/*.astro` (PostGrid, PostCard)
- **Fungsi**: Arsip edukatif berupa artikel teknis, sejarah Wotagei, koreografi orisinal (Original Waza), dan ensiklopedia pergerakan standar (Wotagei Waza).
- **Cara kerja teknis**: Memanfaatkan *Dynamic Routing* Astro (`[slug].astro`). Fungsi `getStaticPaths` akan mengambil (fetch) semua data dokumen yang sesuai (baik dari Sanity maupun markdown) di waktu build (SSG), lalu memetakan URL per rute. Konten *rich-text* Markdown / PortableText dirender menjadi HTML.
- **Titik rawan perubahan**: Struktur URL (`getStaticPaths`). Perubahan relasi atau properti kueri GROQ harus dipastikan selaras dengan *type definition* (`ProjectedLibraryItem` atau `FormattedPost`) agar Astro build tidak gagal (type mismatch).
- **Dependency**: `@lib/sanity` (untuk data), `PostCard` dan `PostGrid` untuk UI daftar artikel.

## 5. Updates / News
- **Lokasi file**:
  - `src/pages/updates/index.astro` dan `[slug].astro`
- **Fungsi**: Mading pembaruan berisi pengumuman acara, berita terbaru, dan agregasi postingan media sosial (SNS).
- **Cara kerja teknis**: Mengambil dokumen bertipe `update`, serta agregat dari artikel/waza (sebagai "From The Library"), dan dokumen `snsUpdate`. Halaman ini mengombinasikan banyak sumber data menjadi satu aliran informasi dinamis. Detail artikel dilayani dengan *Dynamic Routing*.
- **Titik rawan perubahan**: Proyeksi tipe data (*type casting*). Karena merangkum beragam jenis dokumen (Waza, Articles, Updates) ke dalam satu list render, *mapping* datanya (`libraryRaw.map`) adalah proses yang paling rentan terhadap hilangnya referensi properti (*undefined errors*).
- **Dependency**: Membagi banyak komponen UI blog (`PostCard`, `RelatedPosts`).

## 6. Shop / E-Commerce
- **Lokasi file**:
  - `src/pages/shop/*.astro` (merch.astro, cheki.astro)
  - `src/components/shop/*.astro`
- **Fungsi**: Katalog untuk menjual merchandise grup (kaos, aksesoris) dan reservasi Cheki (foto polaroid).
- **Cara kerja teknis**: Mengambil *Config* toko (untuk mengecek status buka/tutup toko). Jika tutup, dialihkan ke tampilan `ShopClosed`. Jika buka, memuat `ProductGrid` yang mana saat produk diklik, sebuah `ShopModal` (keranjang/checkout) muncul melalui CustomEvents DOM. Formulir pesanan di-*embed* via iFrame Tally.so.
- **Titik rawan perubahan**: Interaksi modal keranjang (`ShopModal.astro`). Event listener (`document.addEventListener('open-shop-modal')`) sangat bergantung pada *payload* acara (Event details). Memodifikasi tombol beli pada kartu produk dapat memutuskan aliran data modal ini.
- **Dependency**: Tally.so iFrame embed script, Vanilla JS CustomEvents.

## 7. Gallery
- **Lokasi file**:
  - `src/pages/gallery/photos.astro` dan `videos.astro`
  - `src/components/gallery/*.astro`
- **Fungsi**: Etalase visual untuk melihat foto dokumentasi *on-stage* dan kumpulan tautan video Youtube.
- **Cara kerja teknis**: Data statis (atau CMS) diteruskan ke dalam grid masonry/CSS. Terdapat integrasi Lightbox kustom untuk memperbesar foto, menggunakan event listener klik sederhana dan manipulasi *opacity* /*z-index* via CSS DOM.
- **Titik rawan perubahan**: Modifikasi rasio gambar. Pemaksaan rasio dimensi pada *grid masonry* bisa merusak tampilan (layout shift) jika gambar dengan orientasi tak terduga ditambahkan tanpa fallback CSS yang baik.
- **Dependency**: Komponen masonry grid, YouTube thumbnail API.
