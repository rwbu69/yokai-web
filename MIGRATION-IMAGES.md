# MIGRATION-IMAGES.md — Panduan Upload Image Manual ke Sanity

Setelah menjalankan script migrasi, semua dokumen sudah ada di Sanity Studio **tanpa gambar**.
Dokumen ini menjelaskan cara menghubungkan gambar ke setiap dokumen.

> **Mengapa tidak otomatis?**
> Sanity menyimpan aset gambar di CDN-nya sendiri melalui proses binary upload.
> Script migrasi hanya bisa menulis data teks — untuk gambar, kamu harus upload
> melalui Studio agar Sanity bisa memproses dan mengoptimalkan file-nya.

---

## Daftar Collection yang Membutuhkan Upload Manual

| Collection | Field | Keterangan |
|-----------|-------|-----------|
| **Members** | `image` | Foto profil setiap anggota |
| **Photo Events** | `coverImage`, `images[]` | Cover event + semua foto dalam galeri |
| **Video Items** | `thumbnailGif` | Preview GIF/thumbnail setiap video |
| **Shop Item (Merch)** | `image`, `images[]` | Foto produk utama + foto tambahan |
| **Shop Item (Cheki)** | `image` | Foto polaroid setiap member |
| **About Us** | `image`, `heroBackground` | Foto feature dan background hero |

---

## Cara Upload Image di Sanity Studio

### Langkah Umum (berlaku untuk semua collection)

1. Buka Sanity Studio di browser:
   - Development: `http://localhost:4321/admin`
   - Production: URL studio yang sudah di-deploy

2. Di sidebar kiri, pilih collection yang ingin diedit.

3. Klik dokumen yang ingin ditambahkan gambarnya.

4. Temukan field bertipe gambar (biasanya bertuliskan **"Member Photo"**, **"Cover Image"**, dll.)

5. Klik area upload atau **drag & drop** file langsung ke field tersebut.

6. Setelah upload selesai, atur **focal point** jika diperlukan:
   - Klik ikon titik merah/biru setelah gambar ter-upload
   - Drag titik ke area paling penting dari foto (misalnya: wajah orang)
   - Focal point memastikan gambar ter-crop dengan benar di berbagai ukuran tampilan

7. Klik **"Publish"** di pojok kanan bawah.

---

## Per-Collection: File yang Perlu Di-upload

### 👥 Members

Setiap member butuh satu foto profil di field `image`.

| Member ID | Nama | File yang Disarankan |
|-----------|------|---------------------|
| `member-kai` | KAI | Foto portrait wajah, square 800×800 |
| `member-ryu` | RYU | Foto portrait wajah, square 800×800 |

**Cara:**
1. Studio → **Member** → klik nama member
2. Field **"Member Photo"** → upload foto
3. Publish

---

### 📸 Photo Events

Setiap Photo Event butuh:
- **`coverImage`**: Satu foto cover (landscape, 1600×900px ideal)
- **`images[]`**: Semua foto galeri event tersebut

| Event ID | Nama Event | File dari |
|----------|-----------|----------|
| `photo-event-zepp-jakarta-2026` | ZEPP JAKARTA: THE FIRST RITUAL | `src/assets/photos/` |
| `photo-event-underground-fes-4` | UNDERGROUND FES VOL.4 | `src/assets/photos/` |
| `photo-event-anisong-matsuri-26` | ANISONG MATSURI | `src/assets/photos/` |
| dst. | ... | ... |

**Cara:**
1. Studio → **Photo Event** → klik nama event
2. Field **"Cover Image"** → upload 1 foto cover
3. Field **"Gallery Images"** → klik **"+"** → upload satu per satu
4. Publish

---

### 🎬 Video Items

Setiap Video Item butuh satu thumbnail/preview di field `thumbnailGif`.

**⚠️ Tentang GIF:** File `placeholder.gif` (13 MB!) terlalu besar untuk di-upload langsung.
Konversi ke WebP statis dulu menggunakan [Squoosh](https://squoosh.app) atau ffmpeg:

```bash
# Ambil frame pertama dari GIF sebagai WebP
ffmpeg -i src/assets/videos/placeholder.gif -vframes 1 thumbnail.webp
```

**Cara:**
1. Studio → **Video Item** → klik judul video
2. Field **"Thumbnail / Preview GIF"** → upload file WebP/GIF (max 5 MB)
3. Publish

---

### 🎽 Shop Items (Merch)

Setiap Merch item butuh:
- **`image`**: Foto produk utama (square, 800×800px)
- **`images[]`**: Foto tambahan dari angle berbeda (opsional)

| Item ID | Nama | Field |
|---------|------|-------|
| `merch-yokai-classic-tee` | YOKAI CLASSIC TEE | `image` + optional `images[]` |
| `merch-blade-lightstick` | MURAMASA LUMINA BLADE | `image` |
| `merch-yokai-hoodie-2026` | UNDERGROUND CIRCUIT HOODIE | `image` + optional `images[]` |

**Cara:**
1. Studio → **Shop Item** → filter by **Category: Merch** → klik item
2. Field **"Main Product Image"** → upload foto utama
3. Field **"Additional Images"** → klik **"+"** untuk foto tambahan
4. Publish

---

### 📷 Shop Items (Cheki)

Setiap Cheki item butuh satu foto di field `image`.

| Item ID | Nama | Catatan |
|---------|------|---------|
| `shop-cheki-solo-kai` | SOLO: KAI | Foto polaroid KAI |
| `shop-cheki-solo-ryu` | SOLO: RYU | Foto polaroid RYU |
| `shop-cheki-group` | GROUP SHOT | Foto polaroid grup |

**Cara:**
1. Studio → **Shop Item** → filter by **Category: Cheki** → klik item
2. Field **"Main Product Image"** → upload foto polaroid
3. Publish

---

### 📖 About Us

About Us butuh:
- **`image`**: Foto feature utama (landscape, 1200×800px)
- **`heroBackground`**: Foto background hero (portrait, 1080×1920px — bisa sama dengan foto hero landing)

**Cara:**
1. Studio → **About Us** → klik satu-satunya dokumen
2. Field **"Hero Background Image"** → upload foto background
3. Field **"Main Feature Image"** → upload foto utama
4. Di section **Track Record**, setiap item juga punya field **"Event Photo"** (opsional)
5. Publish

---

## Format & Ukuran yang Diterima Sanity

| Format | Diterima | Catatan |
|--------|---------|---------|
| JPEG / JPG | ✅ | Format terbaik untuk foto |
| WebP | ✅ | Lebih kecil dari JPEG, disarankan |
| PNG | ✅ | Untuk gambar dengan transparansi |
| GIF | ✅ | Tapi max 20 MB — lebih baik konversi ke WebP dulu |
| SVG | ✅ | Untuk icon / logo saja |
| HEIC / HEIF | ❌ | Tidak didukung — konversi ke JPEG dulu |

**Ukuran maksimal:** 20 MB per file
**Rekomendasi:** Optimasi ke <500 KB sebelum upload (lihat `ASSETS-GUIDE.md`)

---

## Cara Mengoptimasi Sebelum Upload

Gunakan [Squoosh](https://squoosh.app) (browser-based, gratis):
1. Drag & drop foto ke squoosh.app
2. Pilih format **WebP** di panel kanan
3. Quality: **80** untuk foto event, **85** untuk foto produk
4. Download → upload ke Sanity

---

## Tips: Upload Batch (Banyak Foto Sekaligus)

Untuk Photo Events yang punya banyak foto galeri:
1. Buka dokumen Photo Event di Studio
2. Di field **"Gallery Images"**, kamu bisa drag & drop **beberapa file sekaligus**
3. Tunggu semua selesai upload sebelum klik Publish

---

*Dokumen ini diperbarui terakhir: Mei 2026*
