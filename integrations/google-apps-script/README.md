# AutoRev Lead Delivery

Google Apps Script ini menjadi jembatan server-to-server dari Vercel ke **AutoRev Lead Tracker**. Setiap lead disimpan ke tab `Semua Leads`, lalu status WhatsApp diperbarui tanpa menghapus data bila pengiriman pesan gagal.

## Script Properties

Tambahkan properti berikut melalui **Project Settings → Script Properties**:

- `SPREADSHEET_ID`: `1mr1Ens0FquUOsJcLEG0w8Ekmzp7nlfMElwfE-6deD8I`
- `WEBHOOK_SECRET`: nilai acak yang sama dengan `LEAD_WEBHOOK_SECRET` di Vercel
- `WHATSAPP_ACCESS_TOKEN`: permanent/system-user token Meta
- `WHATSAPP_PHONE_NUMBER_ID`: Phone Number ID dari WhatsApp Business Platform
- `WHATSAPP_GRAPH_VERSION`: opsional, misalnya `v25.0`
- `WHATSAPP_TEMPLATE_ID`: default `autorev_registration_received_id`
- `WHATSAPP_TEMPLATE_EN`: default `autorev_registration_received_en`

Jangan menyimpan token atau secret di Git.

## Deploy

1. Buat Apps Script project dan salin `Code.gs` serta `appsscript.json`.
2. Deploy sebagai **Web app**, jalankan sebagai pemilik script, akses **Anyone**.
3. Salin URL `/exec` ke `LEAD_WEBHOOK_URL` pada Vercel.
4. Set `LEAD_WEBHOOK_SECRET` pada Vercel sama dengan `WEBHOOK_SECRET` pada Apps Script.

## Template WhatsApp

Buat dan minta approval dua template utility dengan tiga variabel body `{{1}}`, `{{2}}`, `{{3}}`.

Bahasa Indonesia:

> Terima kasih, {{1}}. Pendaftaran {{2}} Anda di AutoRev sudah kami terima dengan nomor {{3}}. Tim kami akan menghubungi Anda maksimal 7 hari untuk langkah berikutnya dan, bila diperlukan, menjadwalkan pertemuan di Jakarta Pusat. Jadwal serta titik temu akan dikonfirmasi terlebih dahulu.

English:

> Thank you, {{1}}. We have received your AutoRev {{2}} registration under reference {{3}}. Our team will contact you within 7 days with the next step and, if needed, arrange a meeting in Central Jakarta. The schedule and meeting point will be confirmed in advance.

Nomor pengirim harus terhubung ke WhatsApp Business Platform. Nomor WhatsApp personal biasa tidak dapat dipakai untuk pengiriman otomatis melalui Cloud API tanpa proses registrasi/coexistence Meta.
