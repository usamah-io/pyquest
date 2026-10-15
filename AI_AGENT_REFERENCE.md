# AI Agent Reference — PyQuest

**Nama Proyek:** PyQuest — Petualangan Logika Python  
**Jenis Proyek:** Website edukasi coding berbentuk game  
**Target Pengguna:** Anak-anak sekolah dasar (SD), terutama pemula  
**Dokumen Acuan Utama:** `docs/PRD.md` / `AI_AGENT_REFERENCE_AND_PRD.md`  
**Repositori:** [https://github.com/usamah-io/pyquest](https://github.com/usamah-io/pyquest)

---

## 1. Tujuan Dokumen

Dokumen ini menjadi panduan operasional bagi AI Agent yang membantu mengembangkan, memperbaiki, menguji, dan memelihara PyQuest.

AI Agent harus memahami kebutuhan produk dalam `PRD.md` sebelum mengerjakan task. Tujuan utamanya adalah menjaga konsistensi kode, mempertahankan fitur yang sudah berjalan, dan membantu PyQuest menjadi website edukasi yang benar-benar berfungsi.

---

## 2. Aturan Utama

1. Baca `PRD.md` dan dokumentasi yang relevan sebelum mengubah kode.
2. Periksa struktur repository dan implementasi aktual sebelum menentukan solusi.
3. Jangan mengarang file, endpoint, API, database, library, atau fitur yang belum ditemukan.
4. Jangan mengganti framework, stack, atau arsitektur utama tanpa alasan kuat dan persetujuan jika perubahan tersebut berdampak besar.
5. Jangan menghapus fitur, aset, dokumentasi, atau konfigurasi penting tanpa memastikan dampaknya.
6. Jangan mengklaim task berhasil jika perubahan dan pengujiannya belum diverifikasi.
7. Jangan melakukan commit, push, atau deployment tanpa instruksi dan otorisasi yang sesuai.

---

## 3. Stack dan Arsitektur

PyQuest dikembangkan menggunakan Svelte dan Bun. Target deployment yang tercantum dalam PRD harus dikonfirmasi melalui konfigurasi proyek dan lingkungan hosting yang benar-benar digunakan.

AI Agent wajib memeriksa:
- Framework dan versi yang digunakan (Svelte 5 Runes, SvelteKit 3).
- Package manager, script, dan perintah build (`bun install`, `bun test`, `npm run build`).
- Struktur frontend dan backend/API jika tersedia (`src/routes/+page.svelte`, `src/routes/api/`).
- Adapter dan konfigurasi deployment (`@sveltejs/adapter-auto`, `@sveltejs/adapter-node`, `nixpacks.toml`).
- Sistem penyimpanan serta autentikasi jika diterapkan (`localStorage`, `IndexedDB`, Google OAuth GIS).
- Environment variables dan kebutuhan layanan eksternal (`PUBLIC_GOOGLE_CLIENT_ID`).

> **Catatan Penting:** Jangan menganggap penggunaan Bun otomatis berarti backend berjalan sebagai server permanen. Jangan pula menganggap aplikasi sudah serverless hanya karena target hosting mendukung serverless.

---

## 4. Alur Pengerjaan Task

Setiap task harus mengikuti alur terstruktur berikut:

1. **Pahami:** Identifikasi tujuan, batasan, dan hasil yang diharapkan.
2. **Periksa:** Baca file terkait dan telusuri alur kode yang sudah ada.
3. **Rencanakan:** Tentukan perubahan minimum yang dapat menyelesaikan masalah secara presisi.
4. **Implementasikan:** Ubah kode tanpa mengganggu bagian yang tidak berkaitan.
5. **Uji:** Jalankan pemeriksaan yang relevan (`bun test`, `npm run check`, `npm run build`) dan catat hasil sebenarnya.
6. **Audit:** Periksa kemungkinan regresi pada fitur terkait.
7. **Laporkan:** Jelaskan perubahan, file yang terdampak, hasil pengujian, dan masalah yang belum terselesaikan secara transparan.

Untuk perubahan besar yang dapat memengaruhi banyak bagian aplikasi, jelaskan rencana dan risikonya terlebih dahulu sebelum mengeksekusi.

---

## 5. Aturan UI/UX

- Pertahankan identitas visual, maskot PyBot, dan gaya desain yang sudah digunakan.
- Prioritaskan tampilan yang modern, playful, dan mudah dipahami anak-anak.
- Pastikan teks terbaca dan kontras warna memadai (WCAG AA).
- Hindari navigasi ganda, komponen berulang, dan tampilan yang terlalu padat.
- Pastikan layout responsif pada HP, tablet, dan desktop.
- Perhatikan penggunaan Coding Game pada orientasi landscape di HP.
- Gunakan ikon yang konsisten dengan library yang tersedia (Lucide via `Icon.svelte`).
- Jangan mengganti keseluruhan desain tanpa kebutuhan yang jelas.
- Hindari menambahkan fitur visual yang justru mengurangi performa atau kemudahan penggunaan.

---

## 6. Aturan Coding Game

Coding Game merupakan fitur utama PyQuest. Setiap perubahan harus mempertahankan konsistensi antara coding block, pergerakan karakter, kondisi arena, dan evaluasi hasil.

AI Agent harus memastikan:
- Blok menjalankan fungsi sesuai labelnya (`MAJU`, `BELOK KIRI`, `BELOK KANAN`, `ULANGI`, `SELAMANYA`).
- Perintah dieksekusi sesuai urutan terbaru di workspace.
- Posisi dan arah hadap karakter sesuai aturan game diskrit grid 2D.
- Rintangan, batas langkah, dan kondisi menang diperiksa dengan benar.
- Level memiliki konfigurasi serta kondisi penyelesaian yang jelas (30 level game, 90 misi labirin).
- Pengguna dapat memperbaiki program setelah gagal.
- Interaksi workspace mendukung perangkat yang menjadi target (touch drag-and-drop & tap actions).
- Eksekusi memiliki batas pengaman (`maxActions`) yang mencegah perulangan tanpa akhir (*infinite loop*).

> **Batasan:** Jangan menyatakan bahwa Coding Game menjalankan Python sungguhan jika implementasinya hanya mensimulasikan perintah gerakan melalui AST interpreter.

---

## 7. Data, Progres, dan Autentikasi

Sebelum mengubah progres, XP, status level, profil, atau login, periksa sumber data dan aturan penyimpanan yang sebenarnya:
- Jangan memberikan progres atau level yang tidak sesuai dengan kondisi pengguna (akun baru wajib mulai dari Level 1 dengan 0 XP).
- Pastikan akun berbeda tidak dapat mengakses atau mencampur progres satu sama lain (isolasi per ID akun pada `localStorage`).
- Jangan menganggap `localStorage` atau `IndexedDB` otomatis tersinkronisasi dengan server.
- Jangan menganggap tombol login berfungsi tanpa alur autentikasi yang nyata.
- Jangan menampilkan keberhasilan penyimpanan sebelum ada konfirmasi yang sesuai.
- Jangan mengekspos secret, token sensitif, atau kredensial di repository publik maupun bundle frontend.

Fitur yang belum diterapkan harus diperlakukan sebagai belum tersedia, bukan dibuat seolah-olah sudah berfungsi.

---

## 8. Aturan Performa dan Kompatibilitas

- Hindari dependensi baru jika tidak diperlukan.
- Periksa kompatibilitas library sebelum memasang atau menggantinya.
- Hindari memuat aset berat jika belum dibutuhkan (gunakan format WebP terkompresi).
- Periksa error build dan console yang relevan.
- Pastikan perubahan tidak merusak navigasi, state, atau fitur lain.
- Lakukan optimasi berdasarkan hasil pemeriksaan atau pengukuran, bukan asumsi.

---

## 9. Pengujian dan Verifikasi

Pilih pengujian berdasarkan perubahan yang dilakukan, termasuk jika relevan:
- Pemeriksaan build produksi (`npm run build`).
- Pemeriksaan error dan warning tipe (`npm run check`).
- Pengujian unit test suite otomatis (`bun test`).
- Pengujian alur modul dan kuis (scoring, grading, shuffle).
- Pengujian penyusunan blok dan eksekusi Coding Game (BFS solver, collision, goal).
- Pengujian validasi level serta progres (isolasi multi-akun).
- Pengujian responsivitas mobile & tablet.
- Pengujian autentikasi dan penyimpanan lokal.
- Pengujian PWA offline dan uninstallation recovery.

Laporkan setiap pengujian dengan status yang jujur:
- **Lulus:** Pengujian berhasil dilakukan dan diverifikasi.
- **Gagal:** Pengujian dilakukan dan ditemukan masalah.
- **Belum diuji:** Pemeriksaan belum dilakukan.
- **N/A:** Pengujian tidak relevan dengan implementasi.

> **Peringatan:** Jangan pernah mengubah status menjadi lulus hanya karena kode terlihat benar secara sintaksis.

---

## 10. Dokumentasi dan Konsistensi

Jika perubahan kode memengaruhi dokumentasi, perbarui dokumen yang relevan:
- `docs/PRD.md`: Kebutuhan dan batasan produk.
- `AI_AGENT_REFERENCE.md`: Aturan kerja dan operasional AI Agent.
- `docs/ARCHITECTURE.md`: Arsitektur yang sesuai dengan implementasi aktual.
- `README.md`: Ringkasan proyek, cara menjalankan, dan tautan dokumentasi.

Bedakan fitur yang direncanakan, diimplementasikan, dan terverifikasi. Jika dokumentasi bertentangan dengan kode, identifikasi perbedaannya dan periksa bukti sebelum memperbaikinya.

---

## 11. Format Laporan Setelah Mengerjakan Task

Setelah menyelesaikan task, berikan laporan ringkas dengan format standar berikut:

- **Tujuan:** Masalah atau kebutuhan yang ditangani.
- **Perubahan:** File yang diubah dan alasan perubahannya.
- **Verifikasi:** Pemeriksaan yang dijalankan beserta hasil sebenarnya.
- **Dampak:** Fitur terkait yang mungkin terpengaruh.
- **Masalah Tersisa:** Hal yang belum selesai atau belum bisa diverifikasi.
- **Langkah Berikutnya:** Tindakan lanjutan jika memang diperlukan.

---

## 12. Prinsip Keputusan

Setiap perubahan harus mendukung setidaknya satu tujuan berikut:
- Membantu anak memahami logika pemrograman dengan lebih mudah.
- Memperbaiki pengalaman belajar dan bermain.
- Meningkatkan keandalan, keamanan, aksesibilitas, atau performa.
- Mempermudah pemeliharaan dan pengembangan PyQuest.

Utamakan solusi yang terarah, mudah dipahami, dapat diuji, dan sesuai dengan arsitektur yang sudah ada. Jangan menambah kompleksitas tanpa manfaat yang jelas.
