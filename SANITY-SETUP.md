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
PUBLIC_SANITY_API_VERSION=2025-02-19
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

#### Untuk Cloudflare Pages:

**Langkah 1 — Buat Deploy Hook di Cloudflare:**

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com) → pilih akun Anda
2. Di sidebar kiri, klik **Workers & Pages**
3. Klik nama project Yokai Anda
4. Buka tab **Settings → Build & deployments**
5. Scroll ke bagian **Deploy hooks**
6. Klik **Add deploy hook**
7. Isi:
   - Hook name: `Sanity Content Update`
   - Branch: `main` (atau branch production Anda)
8. Klik **Save**
9. **Copy URL** yang muncul (formatnya: `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/...`)

**Langkah 2 — Daftarkan Hook ke Sanity:**

1. Buka [sanity.io/manage](https://sanity.io/manage) → pilih project Yokai
2. Klik tab **API** di sidebar
3. Scroll ke bagian **Webhooks** → klik **Add webhook**
4. Isi form:
   - **Name:** `Cloudflare Pages Deploy`
   - **URL:** paste URL dari Cloudflare di atas
   - **Dataset:** `production`
   - **Trigger on:** centang ✅ `publish`, ✅ `unpublish`
   - **HTTP method:** `POST`
   - **HTTP Headers:** biarkan kosong
5. Klik **Save**

Sekarang setiap kali Anda klik **"Publish"** di Studio, Cloudflare Pages otomatis memulai build baru (biasanya selesai dalam 1–3 menit).

**Cara memantau build:**
- Cloudflare Dashboard → Workers & Pages → nama project → tab **Deployments**
- Setiap deploy baru akan muncul di sini beserta status dan log-nya

#### Environment Variables di Cloudflare Pages:

Jangan lupa menambahkan environment variables di Cloudflare — file `.env` lokal tidak ikut di-deploy:

1. Cloudflare Dashboard → Workers & Pages → project Yokai
2. Tab **Settings → Environment variables**
3. Klik **Add variable** untuk setiap variable:
   - `PUBLIC_SANITY_PROJECT_ID` = nilai Project ID Sanity Anda
   - `PUBLIC_SANITY_DATASET` = `production`
   - `PUBLIC_SANITY_API_VERSION` = `2025-02-19`
4. Pastikan pilih environment **Production** (dan **Preview** jika perlu)
5. Klik **Save**
6. Trigger deploy ulang agar variable baru terbaca

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
