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
      description: 'Ini adalah panduan singkat cara mengupdate konten website.',
      initialValue: `PANDUAN MENGELOLA KONTEN WEBSITE YOKAI

1. LANDING PAGE
- Hero Images: Untuk mengubah gambar latar belakang Hero Section di Landing Page.
- Landing Page Content: Untuk mengubah teks (motto, Who Are We) dan gambar background Who Are We.

2. ABOUT US
- About Us Page: Mengelola teks utama, foto tim, dan visi-misi di halaman About.
- Member: Menambahkan, mengubah, atau menghapus profil member Yokai (nama, generasi, warna, sosmed).

3. PROJECTS & PERFORMANCES
- Project: Mempublikasikan karya/project Yokai (muncul di Landing Page & Portfolio).
- Live Performance: Menambahkan jadwal event atau gig (Live Performances).

4. GALLERY & LIBRARY
- Photo Gallery: Mengupload dokumentasi event (muncul di halaman Gallery).
- Video Gallery: Menyematkan link YouTube (muncul di halaman Gallery).
- Waza Library: Daftar gerakan / waza wotagei beserta penjelasannya.
- Article: Menulis blog atau artikel panjang.
- Update: Mengumumkan update singkat atau berita Yokai.

5. SHOP (MERCH & CHEKI)
- Shop Item: Menambahkan barang jualan. Saat membuat item baru, pilih kategori "Merch" atau "Cheki (Polaroid)".
- Cheki Configuration: Untuk BUKA / TUTUP pemesanan Cheki secara instan, dan mengubah banner/teks saat tutup.
- Merch Configuration: Untuk BUKA / TUTUP pemesanan Merchandise secara instan.

** CARA PEMESANAN SHOP (GOOGLE SHEETS) **
Setiap kali ada pesanan dari form di website, data akan otomatis terkirim melalui POST Request ke Google Sheets App Script (tersimpan di Google Sheets). 
Untuk Cheki, pastikan nama member yang dimasukkan di Shop Item (kategori Cheki) benar agar muncul di dropdown pilihan form Cheki.

** CARA SETUP GOOGLE SHEETS APP SCRIPT (UNTUK CHEKI & MERCH) **
Langkah ini sama persis untuk Cheki maupun Merch (Anda bisa membuat spreadsheet terpisah untuk masing-masing, atau satu sheet yang sama).
1. Buat Spreadsheet baru di Google Sheets (misal: "Yokai Cheki Orders" atau "Yokai Merch Orders").
2. Buat header di baris pertama persis seperti ini (huruf kecil):
   Kolom A: entry.name
   Kolom B: entry.wa
   Kolom C: entry.product
   Kolom D: entry.qty
3. Klik menu Extensions > Apps Script.
4. Hapus semua kode, lalu paste kode berikut:

const sheetName = 'Sheet1';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    const newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow })).setMimeType(ContentService.MimeType.JSON);
  }
  catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e })).setMimeType(ContentService.MimeType.JSON);
  }
  finally {
    lock.releaseLock();
  }
}

5. Klik Run pada fungsi 'initialSetup' (izinkan akses / authorize jika diminta).
6. Di kanan atas, klik tombol Deploy > New deployment.
7. Pilih type (ikon gir): Web app.
8. Isi kolom:
   - Description: (terserah, misal: "Cheki API")
   - Execute as: Me
   - Who has access: Anyone
9. Klik Deploy. Copy "Web app URL" yang muncul.
10. Masukkan URL tersebut ke kolom "Google Sheets Endpoint URL" di menu Cheki Configuration ATAU Merch Configuration pada Sanity.`
    })
  ]
});
