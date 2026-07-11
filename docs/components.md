# Dokumentasi Komponen Utama Yokai Web

Berikut adalah daftar modul dan komponen fungsional yang krusial untuk dipahami apabila Anda akan mengembangkan fitur di *codebase* ini.

## 1. ShopModal
- **File**: `src/components/shop/ShopModal.astro`
- **Fungsi singkat**: Menampilkan pop-up (Modal) keranjang belanja atau detail produk lengkap beserta integrasi checkout formulir pesanan Tally.so.
- **Props/Parameters**: Tidak menerima properti eksternal langsung. Komponen ini dirancang independen dan "mendengarkan" payload dari mana saja melalui custom events.
- **Return/Output**: Elemen HTML `<dialog>` (secara konseptual, meskipun dibangun menggunakan `div` absolute/fixed) dengan iFrame responsif.
- **Efek samping**: Memanipulasi DOM secara massal (menukar kelas utilitas Tailwind untuk *opacity*, *pointer-events*, *scale*) saat event tertrigger. Mengikat satu *event listener* berantai ke objek `document` global (`'open-shop-modal'`). Mengontrol interval JS (Carousel) secara asinkron.
- **Catatan perubahan**: Mengubah cara penangkapan CustomEvent dapat memecahkan seluruh aliran (flow) pembelanjaan toko. Eksekusi skrip `tally.so/widgets/embed.js` disuntikkan asinkron, sehingga perubahan versi embed API Tally bisa berdampak pada komponen ini.

## 2. PostCard
- **File**: `src/components/blog/PostCard.astro`
- **Fungsi singkat**: Merender sebuah kartu artikel (thumbnail, judul, deskripsi, tanggal) yang dapat diklik, menjadi *building block* utama halaman *blog/library*.
- **Props/Parameters**:
  - `title` & `titleJp` (string): Judul kartu, mendukung rendering bilingual.
  - `description` (string): Teks ringkasan, secara internal dibatasi dua-tiga baris (line-clamp).
  - `coverImage` (string): URL langsung menuju gambar.
  - `date` (string): String tanggal belum terformat, diparsing ke dalam bentuk tampilan yang mudah dibaca di dalam komponen.
  - `slug` & `collection` (string): Konkatenasi (penggabungan) dua string ini menciptakan URL navigasi final (`/${collection}/${slug}`).
- **Return/Output**: HTML elemen `<a>` terbungkus `div` berisikan `<article>`.
- **Efek samping**: Murni render UI (stateless & pure visual component).
- **Catatan perubahan**: Sangat krusial! Dipakai di *Library Articles*, *Original Waza*, *Wotagei Waza*, dan *Updates/News*. Segala perubahan layout (seperti tinggi gambar atau ukuran teks) harus diuji silang (cross-test) di minimal 3 rute halaman tersebut agar tidak menciptakan regresi visual.

## 3. MembersPage (Main Strip / Accordion)
- **File**: `src/components/members/MembersPage.astro`
- **Fungsi singkat**: *Engine* utama dari profil anggota Yokai; mengurus pembuatan grid yang bersifat akordion (melebar saat di-*hover* atau diklik).
- **Props/Parameters**: 
  - `members` (Array of objects): Sekumpulan objek anggota yang diekstrak langsung dari Sanity. Memiliki *nested data* seperti avatar, kutipan, info bio.
- **Return/Output**: Layout dinamis dengan grid horizontal (di desktop) yang berubah menjadi vertical list (di mobile).
- **Efek samping**: Menggunakan *inline-script* asinkron untuk menjaring seluruh event klik dan sentuh (touch). Memanipulasi `flex-basis`, `flex-grow`, `opacity`, dan kelas aktif CSS DOM per elemen setiap kali berinteraksi. Menerapkan pengikatan data dari Astro statis ke eksekusi memori Window (Client) via `define:vars`.
- **Catatan perubahan**: Kalkulasi matematika animasi dan logika *mobile breakpoint* (via `window.innerWidth`) sangat ketat. Menambah/mengubah DOM node anak tanpa memperbarui query selector di dalam blok skrip akan langsung membuat antarmuka macet tanpa pesan *error* konsol yang jelas.

## 4. sanity.ts (Utility Module)
- **File**: `src/lib/sanity.ts`
- **Fungsi singkat**: Tulang punggung (backbone) integrasi Headless CMS proyek ini. Mendefinisikan kontrak TypeScript sekaligus menyambungkan klien.
- **Props/Parameters**: Tidak berlaku (ini adalah file modul library, bukan komponen UI). Fungsi tunggalnya adalah mengekspor `sanityClient` dan utilitas pembangun gambar (`urlFor`).
- **Return/Output**: Klien *configured* dan tipe statis Sanity (Interface TypeScript).
- **Efek samping**: Membaca Variabel Lingkungan (`import.meta.env`). Saat `sanityClient.fetch` dijalankan, akan melakukan *HTTP Request* ke Content Lake Sanity. Saat ini `useCdn: false` diaktifkan agar data pada *build-time* selalu segar (fresh).
- **Catatan perubahan**: Apapun perubahan yang dilakukan pada *Sanity Studio* (menambahkan kolom *schema* baru, merename *field* data), *wajib* disinkronisasikan ke dalam file ini (TypeScript Interfaces-nya). Kelalaian *sync* akan mengakibatkan Astro Checker membunuh *build pipeline*.

## 5. Projects (Fallback Hybrid Logic)
- **File**: `src/components/landing/Projects.astro`
- **Fungsi singkat**: Menampilkan daftar Proyek Video Yokai (Youtube) dengan mekanisme hibrida (memprioritaskan API Sanity, dengan jaring pengaman data lokal).
- **Props/Parameters**: 
  - `projects`: Kumpulan entri proyek (dari API Sanity).
  - `ctaText` & `ctaLink`: Opsi penyesuaian navigasi "Lihat Selengkapnya".
- **Return/Output**: Menghasilkan barisan daftar (rows) elemen tautan proyek berserta cuplikan gambar dari thumbnail Youtube (yang diekstrak secara dinamis).
- **Efek samping**: Memuat utilitas regex Youtube (`getYouTubeId`) saat di-*build*. Memicu transisi masuk yang tertunda (staggered delay animation) menggunakan Anime.js.
- **Catatan perubahan**: Logika persilangan (*fallback mapping*) tipe objeknya cukup rapuh. Tipe khusus (`AnyProject`) didefinisikan secara lokal untuk merangkum ketidaksinkronan properti antara skema Sanity (misal `.youtubeUrl`) dengan data lokal lama (misal `.videoId`). Mengubah argumen ini memerlukan perhatian esktra pada TypeScript casting.
