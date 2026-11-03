import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'tutorial',
  title: '📚 Panduan Penggunaan CMS',
  type: 'document',
  fields: [
    defineField({
      name: 'guide',
      title: 'Panduan Mengelola Website Yokai',
      type: 'text',
      readOnly: true,
      rows: 35,
      description: 'Panduan ini hanya untuk dibaca. Jangan mengubah struktur schema dari menu ini.',
      initialValue: `PANDUAN MENGELOLA KONTEN WEBSITE YOKAI

==================================================
A. ATURAN UMUM
==================================================

1. Masuk ke Sanity Studio melalui menu admin website.
2. Pilih menu sesuai jenis konten yang ingin diubah.
3. Klik dokumen yang ingin diedit, lakukan perubahan, lalu klik Publish.
4. Draft yang belum di-publish tidak dianggap sebagai konten publik.
5. Website menggunakan static build. Setelah publish di Sanity, perubahan perlu masuk ke proses build/deploy website sebelum terlihat di website publik.
6. Jangan mengubah atau menghapus field yang tidak dipahami. Nama field terhubung langsung dengan kode website.
7. Untuk gambar, gunakan foto yang tajam, relevan, dan tidak memiliki watermark yang tidak diperlukan.
8. Untuk URL, gunakan alamat lengkap yang diawali https://.

==================================================
B. LANDING PAGE / BERANDA
==================================================

Menu: Settings & Pages > Landing Page

Dokumen ini mengatur teks dan gambar utama halaman beranda.

- Hero Section:
  Ubah judul besar, subtitle, dan Hero Marquee Images.
  Hero Marquee Images adalah kumpulan foto yang bergerak di halaman utama.
  Upload minimal 4 foto. Gunakan beberapa foto agar kolom marquee tetap terlihat seimbang.

- Motto Section:
  Ubah tiga baris motto, subtitle, dan teks badge.

- Who Are We Section:
  Ubah judul, kalimat highlight, deskripsi, dan teks tombol.
  Who Are We Background Images digunakan sebagai gambar latar bagian ini.

- Schedule Section:
  Ubah judul dan subtitle bagian jadwal.
  Acara jadwal dibuat terpisah melalui menu Team & Schedule > Schedule Events.

==================================================
C. ABOUT US DAN MEMBERS
==================================================

Menu About:
Settings & Pages > About Us

Gunakan About Us untuk mengubah teks hero, cerita Yokai, track record, email, dan tautan sosial.
Track Records adalah daftar pencapaian. Setiap entri dapat memiliki nama event, tanggal, pencapaian, deskripsi, foto, dan URL YouTube.

Menu Members:
Team & Schedule > Members

Untuk menambah member:
1. Buat dokumen Member baru.
2. Isi First Name dan Role / Position.
3. Isi Personal Quote, Favorite Waza, dan Favorite Uchishi.
4. Upload satu Strip Photo sebagai foto portrait utama.
5. Upload tepat 4 Gallery Photos untuk grid foto 2x2.
6. Isi Instagram dan X/Twitter tanpa tanda @ jika tersedia.
7. Isi Sort Order. Angka lebih kecil tampil lebih dahulu.

==================================================
D. SCHEDULE, PROJECTS, DAN LIVE PERFORMANCES
==================================================

Schedule:
Menu Team & Schedule > Schedule Events

Isi Event Name, Date, dan Time jika diperlukan.
Jadwal diurutkan berdasarkan tanggal.

Projects:
Menu Team & Schedule > Projects

Isi Project Title, YouTube URL, Description, Release Date, dan Sort Order.
Gunakan URL video YouTube yang benar. Project ditampilkan di beranda dan halaman Updates.

Live Performances:
Menu Team & Schedule > Live Performances

Isi Performance Title, YouTube URL, Performance Date, Venue / Location, Description, dan Sort Order.
Gunakan URL video YouTube yang benar.

==================================================
E. EVENTS DAN BATTLE MATCHES
==================================================

Menu Events:
Events & Battles > Events

Buat Event terlebih dahulu:
1. Isi Event Name.
2. Generate Slug setelah nama selesai. Slug menjadi bagian URL halaman.
3. Isi Date.
4. Upload Cover Image atau Hero Video. Hero Video bersifat opsional.
5. Isi The Story / Impressions jika event memiliki cerita.
6. Upload Highlight Photos untuk foto-foto event.

Menu Battle Matches:
Events & Battles > Battle Matches

Battle Match dibuat sebagai dokumen terpisah:
1. Pilih Event yang sudah dibuat.
2. Isi Category, misalnya Rookie, Open, 1v1, atau Cyalume Dance.
3. Isi Battler 1 dan Battler 2 jika ada.
4. Isi Download URL dengan URL https:// yang valid.

Jika Event belum dibuat, Battle Match belum dapat dihubungkan dengan benar.

==================================================
F. GALLERY
==================================================

Photo Gallery:
Gallery & Shop > Photo Events

Untuk setiap dokumentasi:
1. Isi Event Name dan Event Date.
2. Upload satu Cover Image.
3. Upload Gallery Images.
4. Isi Event Caption jika diperlukan.

Video Gallery:
Gallery & Shop > Videos

Ada dua cara:

1. Upload file:
   Upload File GIF / WebM, pilih Tipe File Animasi yang sesuai, dan tambahkan Thumbnail.
   WebM lebih disarankan karena ukuran file biasanya lebih kecil daripada GIF.

2. Link YouTube:
   Isi YouTube Video URL dan upload Thumbnail.
   Tidak perlu mengisi File GIF / WebM jika hanya menggunakan link YouTube.

Thumbnail adalah gambar preview. ThumbnailGif adalah field legacy lama dan sebaiknya tidak digunakan untuk konten baru.

==================================================
G. LIBRARY: ARTICLES DAN WAZA
==================================================

Articles:
Library & Content > Articles

Isi Article Title, Slug, Short Description, Cover Image, Publish Date, Author, Tags, dan Article Body.
Gunakan Draft untuk menyembunyikan artikel dari website publik.
Pastikan Draft tidak aktif saat artikel sudah siap dipublikasikan.

Waza:
Library & Content > Waza (Moves)

Isi Waza Name, Slug, Japanese Name jika ada, Original Creator jika ada, Short Description, Cover Image, Date, Tags, Body, dan Video Tutorial URL jika tersedia.

Pilih Waza Type dengan benar:
- Original Member Waza: teknik orisinal anggota Yokai.
- Wotagei Waza: teknik wotagei umum atau ensiklopedis.

Pilihan ini menentukan halaman library tempat Waza ditampilkan.

==================================================
H. UPDATES DAN SNS UPDATES
==================================================

Updates:
Library & Content > Updates

Isi Judul, Slug, Tanggal Publish, Ringkasan Singkat, Cover Image, Tags, dan Konten Lengkap.
Ringkasan Singkat tampil di kartu daftar. Konten Lengkap tampil di halaman detail.

SNS Updates:
Library & Content > SNS Updates

Isi Platform, Post URL, Author / Account Name, Post Date, Content Snippet, dan Screenshot / Image.
Gunakan URL posting yang benar dan upload gambar yang sesuai dengan posting tersebut.

Updates Config:
Settings & Pages > Updates Config

Gunakan menu ini untuk mengatur gambar hero Updates dan tautan CTA menuju YouTube.

==================================================
I. SHOP: MERCH DAN CHEKI
==================================================

Shop Items:
Gallery & Shop > Shop Items

Untuk membuat item:
1. Isi Item Name dan generate Slug.
2. Pilih Category: Official Merch atau Cheki (Polaroid).
3. Isi Price (IDR).
4. Upload Main Product Image.
5. Isi Description dan Available for Purchase.

Untuk Merch, gunakan Additional Images dan Size / Variant Options jika diperlukan.
Untuk Cheki, isi Member Name dengan nama member yang benar.

Merch Configuration:
Settings & Pages > Merch Config

- Is Merch Open?: aktifkan hanya saat pesanan merch dibuka.
- Closed Message: pesan saat pesanan ditutup.
- Tally Form URL: URL form pemesanan merch.

Cheki Configuration:
Settings & Pages > Cheki Config

- Cheki Orders are OPEN: aktifkan hanya saat pesanan Cheki dibuka.
- Closed Message: pesan saat pesanan ditutup.
- Tally Form URL: URL form pemesanan Cheki.

Periksa kembali URL Tally sebelum membuka pesanan. Lakukan uji pemesanan setelah perubahan di-deploy.

==================================================
J. SEBELUM DAN SESUDAH PUBLISH
==================================================

Sebelum publish:
- Periksa ejaan, tanggal, slug, gambar, dan URL.
- Pastikan field wajib tidak kosong.
- Pastikan referensi Event pada Battle Match benar.
- Pastikan kategori Shop Item benar.

Sesudah publish:
- Pastikan perubahan masuk ke proses build/deploy website.
- Buka halaman terkait setelah deploy.
- Periksa gambar, tautan, teks, dan tampilan mobile.
- Jika terjadi masalah, jangan membuat dokumen duplikat. Catat perubahan terakhir dan hubungi pengelola website.

Jangan menghapus dokumen lama sebelum memastikan dokumen tersebut tidak lagi digunakan di website.`,
    }),
  ],
});
