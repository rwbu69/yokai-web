# SANITY-SETUP.md — Panduan Setup Sanity CMS

Panduan ini menjelaskan cara menyiapkan dan menggunakan Sanity Studio sebagai CMS untuk website Yokai Wotagei.

---

## Prerequisites

- **Node.js v22+** (sesuai `package.json` engines)
- **Akun Sanity** — daftar gratis di [sanity.io](https://sanity.io)
- **npm / bun** — bun sudah digunakan di proyek ini

---

## Langkah Setup Awal (Step-by-Step)

### 1. Buat Project di Sanity Dashboard

1. Login ke [sanity.io/manage](https://sanity.io/manage)
2. Klik **"New project"**
3. Pilih nama project: `Yokai Web`
4. Pilih plan: **Free** sudah cukup untuk penggunaan standar
5. Dataset: biarkan default sebagai `production`
6. Klik **"Create project"**

### 2. Dapatkan Project ID dan Dataset

Setelah project dibuat:
1. Di dashboard, klik project Anda
2. Lihat di bagian **"Project ID"** — copy nilai ini (contoh: `abc123def`)
3. Dataset biasanya sudah `production`

### 3. Isi File `.env`

Buat file `.env` di root proyek (sejajar dengan `package.json`):

```bash
# Copy dari template
cp .env.example .env
```

Lalu edit `.env` dan isi nilai yang benar:

```env
PUBLIC_SANITY_PROJECT_ID=abc123def   # ← Ganti dengan Project ID Anda
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-03-01
SANITY_API_TOKEN=                    # Opsional, untuk draft access
```

> ⚠ **JANGAN** commit file `.env` ke git. File ini sudah ada di `.gitignore`.

### 4. Install Dependencies (jika belum)

Dari root proyek:
```bash
bun install
```

Dependency Sanity (`@sanity/astro`, `@sanity/client`, `@sanity/image-url`) sudah ada di `package.json`.

### 5. Jalankan Sanity Studio

Sanity Studio sudah terintegrasi di proyek Astro ini. Akses Studio melalui:

```bash
# Jalankan dev server Astro
bun run dev

# Studio tersedia di:
# http://localhost:4321/admin
```

> Studio di-serve langsung oleh Astro — tidak perlu menjalankan proses terpisah.

### 6. (Opsional) Deploy Sanity Studio ke Cloud

Agar tim bisa mengakses Studio tanpa perlu menjalankan dev server:

```bash
# Login ke Sanity CLI
npx sanity login

# Deploy Studio (akan tersedia di URL sanity.io)
npx sanity deploy
```

Pilih subdomain saat diminta (contoh: `yokai-studio`). Studio akan tersedia di `yokai-studio.sanity.studio`.

---

## Cara Menggunakan Sanity Studio

### Login ke Studio

Buka browser → `localhost:4321/admin` (saat dev) atau URL yang sudah di-deploy.
Login dengan akun Sanity Anda.

### Menambah Konten Baru

**Foto Event (Gallery Photos):**
1. Klik **"Photo Event"** di sidebar
2. Klik **"+"** untuk entri baru
3. Isi: Event Name, Date, Cover Image, gallery images
4. Klik **"Publish"**

**Video:**
1. Klik **"Video Item"**
2. Isi judul, URL YouTube, thumbnail
3. Klik **"Publish"**

**Merch / Cheki:**
1. Klik **"Shop Item"**
2. Pilih Category: `Official Merch` atau `Cheki (Polaroid)`
3. Isi semua field yang relevan
4. Isi **"Available for Purchase"**: centang jika tersedia
5. Klik **"Publish"**

**Blog Post (Articles, Updates, Waza):**
1. Pilih tipe konten yang sesuai dari sidebar
2. Isi `Title` → **Slug akan otomatis ter-generate**
3. Isi semua field
4. Untuk body text: gunakan toolbar di bagian **"Portable Text"** untuk format Markdown-like
5. Klik **"Publish"**

**Member:**
1. Klik **"Member"**
2. Upload foto, isi nama, role, dan bio
3. Klik **"Publish"**

### Cara Upload Image di Sanity

Di field bertipe Image:
1. Drag & drop file langsung ke area upload
2. Atau klik **"Upload"** → pilih file dari komputer
3. Setelah upload, klik ikon **hotspot** (titik merah) untuk mengatur focal point

**Format diterima:** JPG, PNG, WebP, GIF, SVG  
**Ukuran maksimal:** 20 MB — tapi sangat disarankan optimasi dulu ke <500 KB (lihat `ASSETS-GUIDE.md`)

### Mengubah Status Cheki (Open/Closed) Tanpa Rebuild

1. Klik **"Cheki Configuration"** di sidebar Studio
2. Toggle field **"Cheki Orders are OPEN"**
3. Klik **"Publish"**

> ✅ Status Cheki akan berubah **langsung** tanpa perlu rebuild website (menggunakan real-time fetch).

### Mempublish Konten agar Muncul di Website

1. Buat atau edit dokumen
2. Pastikan semua field wajib sudah diisi (ditandai merah jika kosong)
3. Klik tombol **"Publish"** di pojok kanan bawah
4. Tunggu konfirmasi "Document published"
5. Trigger rebuild website (lihat bagian di bawah)

---

## Cara Rebuild Website Setelah Update Konten

Website Yokai adalah **static site** (Astro dengan output: static). Artinya:
- Konten yang diambil saat **build time** membutuhkan **rebuild** untuk terlihat di website.
- Pengecualian: **Cheki status** (`isOpen`) diambil secara real-time — tidak perlu rebuild.

### Rebuild Manual (Development)

```bash
bun run build
bun run preview   # Untuk melihat hasil build
```

### Auto-Rebuild via Webhook (Produksi — Rekomendasi)

Setup webhook agar Sanity otomatis trigger rebuild ketika konten dipublish.

#### Untuk Vercel:

1. Di Vercel dashboard → project Anda → **Settings → Git → Deploy Hooks**
2. Buat hook baru: nama `Sanity Content Update`, branch `main`
3. Copy URL webhook yang dihasilkan (contoh: `https://api.vercel.com/v1/integrations/deploy/...`)

4. Di Sanity dashboard → project Anda → **API → Webhooks**
5. Klik **"Add webhook"**
6. Isi:
   - Name: `Vercel Deploy`
   - URL: paste URL dari Vercel
   - Dataset: `production`
   - Trigger on: centang **"publish"** dan **"unpublish"**
7. Klik **"Save"**

Sekarang setiap kali Anda klik **"Publish"** di Studio, website otomatis rebuild di Vercel (biasanya selesai dalam 1–3 menit).

#### Untuk Netlify:

1. Netlify dashboard → **Site configuration → Build & deploy → Build hooks**
2. Buat hook baru → copy URL
3. Ikuti langkah Sanity webhook di atas, gunakan URL Netlify

---

## Troubleshooting

### Konten tidak muncul setelah dipublish
**Kemungkinan penyebab:**
- Website belum di-rebuild → trigger rebuild manual atau cek webhook
- Konten masih dalam status "Draft" → klik **"Publish"** di Studio
- Environment variable `PUBLIC_SANITY_PROJECT_ID` salah → cek file `.env`

**Solusi:**
```bash
# Cek apakah env variable terbaca
echo $PUBLIC_SANITY_PROJECT_ID

# Rebuild manual
bun run build
```

### Image tidak muncul
**Kemungkinan penyebab:**
- `PUBLIC_SANITY_PROJECT_ID` atau `PUBLIC_SANITY_DATASET` di `.env` salah
- Image belum dipublish di Studio (masih draft)

**Solusi:**
1. Buka browser → `http://localhost:4321/admin`
2. Cek apakah Studio bisa login dan menampilkan data
3. Verifikasi isi `.env` sesuai Project ID di `sanity.io/manage`

### Studio tidak bisa diakses (`/admin` menampilkan 404)
**Kemungkinan penyebab:**
- `PUBLIC_SANITY_PROJECT_ID` kosong di `.env`
- Astro dev server tidak berjalan

**Solusi:**
1. Pastikan file `.env` ada dan terisi
2. Restart dev server: `bun run dev`
3. Jika masih error, cek `astro.config.mjs` — pastikan `sanity()` integration sudah dikonfigurasi

### Build gagal dengan error "Cannot find module '@lib/sanity'"
Path alias `@lib/` didefinisikan di `tsconfig.json`. Pastikan `tsconfig.json` sudah memiliki:
```json
"paths": {
  "@lib/*": ["src/lib/*"]
}
```
Restart editor Anda setelah mengubah `tsconfig.json`.

### Error "SANITY_PROJECT_ID is not defined"
File `.env` tidak terbaca. Pastikan:
1. File bernama `.env` (bukan `.env.local` atau `.env.production`)
2. File berada di **root proyek** (sejajar dengan `package.json`)
3. Restart dev server setelah mengubah `.env`

---

## Referensi

- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro + Sanity Integration](https://docs.astro.build/en/guides/cms/sanity/)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URL Builder](https://www.sanity.io/docs/image-url)

---

*Dokumen ini diperbarui terakhir: Mei 2026*
