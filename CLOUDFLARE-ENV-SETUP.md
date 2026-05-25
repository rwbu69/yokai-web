# CLOUDFLARE-ENV-SETUP.md — Yokai Wotagei Web

Panduan lengkap untuk menghubungkan Cloudflare Pages dengan Sanity CMS.  
Baca dari atas ke bawah sebelum men-deploy pertama kali.

---

## 1. Environment Variables di Cloudflare Pages

Cloudflare Pages membutuhkan environment variables yang sama dengan file `.env` lokalmu.  
Variables ini **tidak otomatis terbaca** dari `.env` — harus didaftarkan manual di dashboard.

### Cara Mendaftarkan

1. Buka **[Cloudflare Dashboard](https://dash.cloudflare.com)** → pilih akun kamu
2. Klik **Pages** → pilih project `yokai-website`
3. Klik tab **Settings** → klik **Environment Variables**
4. Tambahkan variables berikut untuk environment **Production** DAN **Preview**:

| Variable Name              | Value                          | Notes |
|---------------------------|--------------------------------|-------|
| `PUBLIC_SANITY_PROJECT_ID` | `1upl3nxu`                    | Cek di sanity.io/manage |
| `PUBLIC_SANITY_DATASET`    | `production`                   | |
| `PUBLIC_SANITY_API_VERSION`| `2025-02-19`                   | Jangan ubah sembarangan |
| `SANITY_API_TOKEN`         | `skpjl7B0...` *(token penuh)* | **Sensitive** — set as Secret |

> **⚠️ PENTING:** `SANITY_API_TOKEN` harus di-set sebagai **Encrypted / Secret** agar tidak terekspos di logs. Klik ikon kunci (🔒) saat menambahkan variable ini.

> **⚠️ PENTING:** Variabel dengan prefix `PUBLIC_` akan diekspos ke client-side code. Aman untuk Project ID dan Dataset karena keduanya sudah publik di Sanity. **Jangan beri prefix PUBLIC_ pada SANITY_API_TOKEN.**

5. Klik **Save** setelah menambahkan semua variables
6. Trigger **manual rebuild**: klik tab **Deployments** → klik **Retry deployment** pada deployment terakhir

---

## 2. Verifikasi Environment Variables

Setelah rebuild, cek di Cloudflare Pages build logs:

```
✓ Fetching aboutUs data from Sanity...
✓ Fetching photoEvent data from Sanity...
✓ Fetching videoItem data from Sanity...
```

Jika ada error seperti `Unauthorized` atau `Missing projectId`, berarti env vars belum terbaca.

---

## 3. Setup Webhook: Sanity → Cloudflare (Auto-Rebuild)

Webhook ini memastikan website otomatis di-rebuild setiap kali kamu **publish** konten di Sanity Studio.

### Step A: Buat Deploy Hook di Cloudflare Pages

1. Di Cloudflare Pages → pilih project → **Settings**
2. Klik tab **Builds & deployments**
3. Scroll ke bawah → **Deploy Hooks**
4. Klik **Add Deploy Hook**
5. Isi form:
   - **Hook name:** `sanity-publish`
   - **Branch to build:** `main` (atau branch production-mu)
6. Klik **Save**
7. **Copy URL yang dihasilkan** — bentuknya seperti:
   ```
   https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

### Step B: Buat Webhook di Sanity

1. Buka **[Sanity Dashboard](https://www.sanity.io/manage)** → pilih project `1upl3nxu`
2. Klik tab **API** → klik **Webhooks**
3. Klik **Create webhook**
4. Isi form:
   - **Name:** `Cloudflare Pages Rebuild`
   - **URL:** Paste URL Deploy Hook dari Cloudflare (Step A)
   - **Dataset:** `production`
   - **Trigger on:** centang **Publish**
   - **HTTP Method:** `POST`
   - **Secret:** *(opsional, bisa kosong untuk setup dasar)*
5. Klik **Save**

### Cara Kerja

```
Editor publish konten di Sanity Studio
        ↓
Sanity mengirim POST ke Deploy Hook URL
        ↓
Cloudflare Pages memulai rebuild otomatis
        ↓
Website terupdate dalam ~2-5 menit
```

---

## 4. Checklist Sebelum Deploy

- [ ] `PUBLIC_SANITY_PROJECT_ID` sudah diset di Cloudflare
- [ ] `PUBLIC_SANITY_DATASET` sudah diset di Cloudflare
- [ ] `PUBLIC_SANITY_API_VERSION` sudah diset di Cloudflare
- [ ] `SANITY_API_TOKEN` sudah diset sebagai **Secret** di Cloudflare
- [ ] Variables diset untuk **Production** DAN **Preview** environment
- [ ] Deploy Hook sudah dibuat di Cloudflare
- [ ] Webhook sudah dibuat di Sanity dan mengarah ke Deploy Hook URL
- [ ] Build lokal (`bun run build`) berjalan sukses tanpa error

---

## 5. Troubleshooting

### Build gagal dengan "Unauthorized"
- Pastikan `SANITY_API_TOKEN` sudah benar dan belum expired
- Generate token baru di Sanity: Manage → API → Tokens → Add API Token
- Token harus punya permission **Editor** (minimal **Viewer** untuk read-only)

### Data di website tidak update setelah publish di Sanity
- Cek apakah webhook sudah dikonfigurasi (lihat Step 3)
- Trigger manual rebuild di Cloudflare Pages → Deployments
- Pastikan `useCdn: false` di `src/lib/sanity.ts` (sudah diperbaiki di audit Mei 2026)

### Build gagal dengan "Cannot find module"
- Pastikan semua dependencies ada di `package.json`
- Jalankan `bun install` atau `npm install` sebelum build

### Halaman menampilkan data lama / tidak berubah
- Cek Cloudflare Pages → Deployments — apakah ada deployment terbaru?
- Jika tidak ada, webhook mungkin tidak terkonfigurasi atau gagal dikirim
- Cek Sanity API → Webhooks → klik webhook → lihat log pengiriman

---

*Dokumen ini diperbarui: Mei 2026*
