# ASSETS-GUIDE.md — Yokai Wotagei Web

Panduan ini menjelaskan cara menyiapkan, menamai, dan mengupload aset gambar untuk website Yokai Wotagei. Dokumen ini bisa dibaca tanpa pengetahuan teknis mendalam.

---

## Inventarisasi Aset Saat Ini

| Folder | Isi | Format | Catatan |
|--------|-----|--------|---------|
| `src/assets/hero-images/` | 12 gambar hero landing page | `.jpg` (4–8 MB) | **⚠ Terlalu besar!** Harus dioptimasi ke max 500KB |
| `src/assets/photos/` | 4 foto event | `.jpg` / `.JPG` (6–10 MB) | **⚠ Terlalu besar!** Harus dioptimasi |
| `src/assets/videos/` | 1 file GIF thumbnail | `.gif` (13 MB!) | **🚨 Sangat berat!** Konversi ke WebM |
| `public/` | Icon SVG, favicon | `.svg` | ✅ Sudah ringan |

---

## Hierarki Folder yang Direkomendasikan

```
src/
└── assets/
    ├── hero-images/          # Foto panel di hero landing page
    │   ├── hero-01.webp
    │   ├── hero-02.webp
    │   └── ...               # 12 foto (1 per panel, 3 set × 4 panel)
    │
    ├── photos/               # Foto event untuk halaman Photos
    │   ├── event-zepp-2026-cover.webp
    │   ├── event-zepp-2026-01.webp
    │   └── ...
    │
    ├── videos/               # Thumbnail/preview untuk halaman Videos
    │   ├── video-muramasa-thumb.webp   # Gunakan WebP diam, bukan GIF
    │   └── ...
    │
    └── members/              # Foto profil anggota (gunakan jika tidak via Sanity)
        ├── member-kai.webp
        └── ...

public/
├── icon.svg
└── icon-navbar.svg
```

> **Catatan:** Setelah Sanity Studio aktif, hampir semua upload gambar dilakukan langsung dari dashboard Sanity — bukan ke folder `src/assets/`. Folder ini dipertahankan sebagai fallback selama development lokal.

---

## Spesifikasi Image per Halaman

### Landing Page — Hero Panels
- **Dimensi:** `1080 × 1920 px` (portrait, 9:16)
- **Atau:** `800 × 1200 px` minimum untuk performa lebih baik
- **Format:** `.webp`
- **Ukuran max:** 300 KB per file
- **Catatan:** Dipotong secara `object-fit: cover` — fokus pada area tengah foto

### Landing Page — Motto & Who Are We
- Tidak ada image khusus — menggunakan foto hero sebagai background dengan CSS.

### About / Members
- **Dimensi:** `800 × 800 px` (1:1, square)
- **Format:** `.webp`
- **Ukuran max:** 150 KB per file
- **Catatan:** Foto wajah anggota — pastikan subjek terpusat karena akan di-crop lingkaran

### Photos (Gallery)
- **Cover Event:** `1600 × 900 px` (16:9)
- **Foto dalam galeri:** `1200 × 800 px` (3:2) atau dimensi asli kamera
- **Format:** `.webp` (atau `.jpg` jika sudah dioptimasi)
- **Ukuran max:** 500 KB per foto, 200 KB untuk cover

### Videos (Thumbnail/Preview)
- **Dimensi:** `960 × 540 px` (16:9, separuh dari 1080p)
- **Format:** `.webp` (BUKAN `.gif` — lihat panduan di bawah)
- **Ukuran max:** 100 KB per thumbnail

### Merch & Cheki (Shop)
- **Dimensi:** `800 × 800 px` (1:1)
- **Format:** `.webp`
- **Ukuran max:** 200 KB per foto

### Library / Blog (Cover Image)
- **Dimensi:** `1200 × 630 px` (16:9, standar Open Graph)
- **Format:** `.webp`
- **Ukuran max:** 200 KB

---

## Format yang Direkomendasikan

| Situasi | Format | Alasan |
|---------|--------|--------|
| Foto umum (event, hero, profil) | **WebP** | 30–50% lebih kecil dari JPEG dengan kualitas sama |
| Foto dengan latar transparan | **WebP** atau **PNG** | Mendukung transparansi |
| Foto untuk browser lama | **JPEG** (fallback) | Jika WebP tidak didukung |
| Icon, logo, ilustrasi vektor | **SVG** | Resolusi tak terbatas |
| Preview video / animasi | **WebM** (bukan GIF!) | GIF 13 MB = WebM ~1 MB |

### ⚠ Tentang GIF
GIF adalah format lama yang **sangat tidak efisien**:
- `placeholder.gif` saat ini berukuran **13 MB** — ini tidak dapat diterima.
- Konversi ke **WebM** atau **MP4** untuk ukuran yang 90% lebih kecil.
- Gunakan tag `<video>` dengan atribut `autoplay loop muted playsinline` sebagai pengganti `<img>`.
- Jika harus mendukung browser sangat lama, sertakan GIF sebagai fallback `<source>`.

```html
<!-- Cara yang benar untuk preview animasi video -->
<video autoplay loop muted playsinline>
  <source src="/videos/preview.webm" type="video/webm">
  <source src="/videos/preview.mp4" type="video/mp4">
  <!-- Fallback untuk browser lama -->
  <img src="/videos/preview.gif" alt="Video preview">
</video>
```

---

## Cara Mengoptimasi Gambar Sebelum Upload

### Option 1: Squoosh (Web-based, Paling Mudah)
1. Buka [squoosh.app](https://squoosh.app)
2. Drag & drop foto Anda
3. Pilih format **WebP** di panel kanan
4. Atur **Quality: 80** untuk foto event, **85** untuk foto produk
5. Klik **Download**

### Option 2: cwebp (Terminal, untuk banyak file sekaligus)
```bash
# Konversi satu file
cwebp -q 80 foto.jpg -o foto.webp

# Konversi semua JPG dalam folder
for f in *.jpg; do cwebp -q 80 "$f" -o "${f%.jpg}.webp"; done
```

### Option 3: ImageOptim (macOS)
Drag foto ke ImageOptim — otomatis mengoptimasi tanpa perlu konfigurasi.

### Option 4: ffmpeg (untuk konversi GIF → WebM)
```bash
ffmpeg -i preview.gif -c vp9 -b:v 0 -crf 41 preview.webm
ffmpeg -i preview.gif -movflags faststart -pix_fmt yuv420p preview.mp4
```

> **Tips:** Astro `<Image />` dari `astro:assets` melakukan optimasi otomatis saat build — tetapi input yang lebih kecil tetap menghasilkan output lebih cepat dan menghemat memori selama build.

---

## Konvensi Penamaan File

### Aturan Umum
- ✅ Semua huruf **kecil** (lowercase)
- ✅ Gunakan **tanda hubung** (`-`) sebagai pemisah kata, bukan spasi atau underscore
- ✅ Sertakan **konteks** dalam nama file
- ❌ Jangan gunakan nama file kamera seperti `IMG_20240315_0023.jpg`
- ❌ Jangan gunakan spasi, karakter khusus (`@`, `#`, `!`, `(`, `)`)
- ❌ Jangan gunakan huruf kapital (kecuali ekstensi sudah ada, tapi lebih baik lowercase semua)

### Pola Penamaan yang Direkomendasikan

```
# Hero images
hero-01.webp
hero-02.webp

# Foto event
event-[nama-event]-[nomor].webp
event-zepp-jakarta-2026-01.webp
event-underground-fes-4-cover.webp

# Foto anggota
member-[nama].webp
member-kai.webp
member-ryu.webp

# Produk merch
merch-[nama-produk]-[nomor].webp
merch-classic-tee-01.webp
merch-blade-lumina-side.webp

# Cheki
cheki-[nama-member].webp
cheki-kai.webp
cheki-group.webp

# Video thumbnail
video-[judul-singkat]-thumb.webp
video-muramasa-waza-thumb.webp

# Blog / artikel cover
blog-[judul-singkat]-cover.webp
blog-sejarah-wotagei-cover.webp
```

---

## Upload via Sanity Studio (Cara yang Disarankan)

Setelah Sanity Studio aktif, upload gambar **tidak perlu dilakukan ke folder** `src/assets/`. Cukup:

1. Buka Sanity Studio di browser (biasanya `localhost:3333` atau `your-site.com/admin`)
2. Pilih dokumen yang ingin diedit (misalnya, tambah Photo Event baru)
3. Klik field **"Cover Image"** atau **"Gallery Images"**
4. Drag & drop file gambar, atau klik **"Upload"**
5. Sanity akan menyimpan gambar di CDN-nya dan menghasilkan URL otomatis
6. Klik **"Publish"** — gambar langsung tersedia

**Format yang diterima Sanity:** JPG, PNG, WebP, GIF, SVG
**Ukuran maksimal:** 20 MB per file (tapi tetap optimasi dulu ke <500 KB!)

---

*Dokumen ini diperbarui terakhir: Mei 2026*

---

## GIF vs WebM untuk Halaman Videos

Halaman Videos sekarang mendukung dua format animasi: **GIF** dan **WebM**.

### Perbandingan Format

| Kriteria | GIF | WebM |
|----------|-----|------|
| Ukuran file | ❌ Sangat besar (13 MB untuk 10 detik) | ✅ Sangat kecil (1–3 MB untuk 10 detik) |
| Kualitas | ❌ 256 warna saja | ✅ Full color, jernih |
| Browser support | ✅ Semua browser | ✅ Semua browser modern (Chrome, Firefox, Safari 12+) |
| Cara render | `<img>` | `<video muted loop playsinline>` |
| Direkomendasikan? | Hanya untuk clip pendek (<3 detik) | **Ya — selalu pilih WebM** |

### Rekomendasi

- **WebM direkomendasikan** — 5–10× lebih kecil dari GIF dengan kualitas yang jauh lebih baik
- Target ukuran: **di bawah 3 MB** per file untuk UX yang cepat
- Resolusi: **maksimal 1280×720 px** untuk halaman Videos

### Cara Konversi GIF → WebM (FFmpeg)

```bash
# Konversi dasar — kualitas bagus, ukuran kecil
ffmpeg -i input.gif -c vp9 -b:v 0 -crf 41 output.webm

# Konversi dengan resize ke 1280x720
ffmpeg -i input.gif -vf scale=1280:720 -c vp9 -b:v 0 -crf 41 output.webm

# Konversi dengan resize ke 960x540 (lebih ringan, cocok untuk thumbnail)
ffmpeg -i input.gif -vf scale=960:540 -c vp9 -b:v 0 -crf 41 output.webm
```

> **Tips CRF:** Nilai CRF yang lebih tinggi = file lebih kecil. Range: 0 (lossless) – 63 (paling kecil).  
> Untuk preview video, **CRF 33–45** memberikan keseimbangan ukuran-kualitas yang baik.

### Alternatif Online (Tanpa FFmpeg)

- **[Cloudconvert.com](https://cloudconvert.com/gif-to-webm)** — Upload GIF, download WebM
- **[Ezgif.com/gif-to-webp](https://ezgif.com/gif-to-webp)** — Juga mendukung konversi ke WebM

### Cara Upload di Sanity Studio

1. Buka Sanity Studio → **Video Item** → pilih atau buat video baru
2. Upload file di field **"File GIF / WebM"**
3. Pilih **"Tipe File Animasi"**: centang **WebM** atau **GIF** sesuai file
4. *(Opsional)* Upload gambar statis di **"Thumbnail (Gambar Statis)"** — dipakai saat tidak hover
5. Publish → website otomatis rebuild (jika webhook sudah dikonfigurasi)

> **Catatan teknis:** WebM render menggunakan `<video>` dengan `muted loop playsinline`.  
> Video **tidak autoplay** saat halaman load — hanya play saat di-hover (UX lebih baik, hemat baterai mobile).

