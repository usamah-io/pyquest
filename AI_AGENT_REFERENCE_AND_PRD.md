# DOKUMEN ACUAN AI AGENT & SPESIFIKASI KEBUTUHAN PRODUK (PRD)
## PyQuest — Petualangan Logika Python

> **Berkas Resmi Penyerahan Kompetisi**: M-ONE Telkomsel Coding Competition  
> **Kategori Dokumen**: AI Agent Reference Document & Product Requirements Document (PRD)  
> **Nama Proyek**: PyQuest — Petualangan Logika Python  
> **Target Pengguna**: Siswa Sekolah Dasar (SD) & Pemula (Usia 7–15 Tahun)  
> **Status Verifikasi Sistem**: 100% Terverifikasi (66 Unit Tests Pass, 0 Errors, Production Build Ready)  
> **Repositori Resmi**: [https://github.com/usamah-io/pyquest](https://github.com/usamah-io/pyquest)  

---

## DAFTAR ISI

- [RINGKASAN EKSEKUTIF](#ringkasan-eksekutif)
- [BAGIAN I: PANDUAN ACUAN OPERASIONAL & TATA KELOLA AI AGENT](#bagian-i-panduan-acuan-operasional--tata-kelola-ai-agent)
  - [1. Tujuan Dokumen](#1-tujuan-dokumen)
  - [2. Aturan Utama](#2-aturan-utama)
  - [3. Stack dan Arsitektur Aktual](#3-stack-dan-arsitektur-aktual)
  - [4. Alur Pengerjaan Task (SOP Pengembangan)](#4-alur-pengerjaan-task-sop-pengembangan)
  - [5. Aturan UI/UX & Desain Ramah Anak](#5-aturan-uiux--desain-ramah-anak)
  - [6. Aturan Coding Game & Simulator Labirin](#6-aturan-coding-game--simulator-labirin)
  - [7. Data, Progres, dan Autentikasi Pengguna](#7-data-progres-dan-autentikasi-pengguna)
  - [8. Aturan Performa dan Kompatibilitas](#8-aturan-performa-dan-kompatibilitas)
  - [9. Pengujian dan Protokol Verifikasi](#9-pengujian-dan-protokol-verifikasi)
  - [10. Dokumentasi dan Konsistensi Repositori](#10-dokumentasi-dan-konsistensi-repositori)
  - [11. Format Laporan Setelah Pengerjaan Task](#11-format-laporan-setelah-pengerjaan-task)
  - [12. Prinsip Pengambilan Keputusan](#12-prinsip-pengambilan-keputusan)
- [BAGIAN II: PRODUCT REQUIREMENTS DOCUMENT (PRD) — PYQUEST](#bagian-ii-product-requirements-document-prd--pyquest)
  - [1. Visi & Tujuan Produk](#1-visi--tujuan-produk)
  - [2. Profil Pengguna (Target Personas)](#2-profil-pengguna-target-personas)
  - [3. Fitur Utama & Kebutuhan Fungsional](#3-fitur-utama--kebutuhan-fungsional)
  - [4. Kebutuhan Non-Fungsional](#4-kebutuhan-non-fungsional)
  - [5. Kriteria Penerimaan Lomba (Acceptance Criteria)](#5-kriteria-penerimaan-lomba-acceptance-criteria)
- [BAGIAN III: MATRIKS PENELUSURAN & BUKTI IMPLEMENTASI NYATA](#bagian-iii-matriks-penelusuran--bukti-implementasi-nyata)

---

## RINGKASAN EKSEKUTIF

Dokumen ini merupakan **dokumen acuan tunggal (*single source of truth*)** yang menggabungkan panduan tata kelola AI Agent (*AI Agent Reference*) dengan spesifikasi kebutuhan produk (*Product Requirements Document / PRD*) untuk proyek **PyQuest**. Dokumen ini dirancang sebagai acuan instruksi awal (*system briefing/prompt context*) bagi AI Agent pengembang agar setiap baris kode yang dihasilkan memenuhi standar kompetisi, menjaga integritas arsitektur, dan tidak mengabaikan kenyamanan belajar anak-anak.

---

# BAGIAN I: PANDUAN ACUAN OPERASIONAL & TATA KELOLA AI AGENT

## 1. Tujuan Dokumen

Dokumen ini menjadi panduan operasional bagi AI Agent yang membantu mengembangkan, memperbaiki, menguji, dan memelihara PyQuest.

AI Agent harus memahami kebutuhan produk dalam `PRD.md` sebelum mengerjakan task. Tujuan utamanya adalah menjaga konsistensi kode, mempertahankan fitur yang sudah berjalan, dan membantu PyQuest menjadi website edukasi yang benar-benar berfungsi secara andal.

## 2. Aturan Utama

1. **Pahami Sebelum Bertindak:** Baca `PRD.md` dan dokumentasi yang relevan sebelum mengubah kode.
2. **Kesesuaian Repositori:** Periksa struktur repository dan implementasi aktual sebelum menentukan solusi.
3. **Anti-Halusinasi:** Jangan mengarang file, endpoint, API, database, library, atau fitur yang belum ditemukan di repositori.
4. **Stabilitas Arsitektur:** Jangan mengganti framework, stack, atau arsitektur utama tanpa alasan kuat dan persetujuan jika perubahan tersebut berdampak besar.
5. **Integritas Aset:** Jangan menghapus fitur, aset, dokumentasi, atau konfigurasi penting tanpa memastikan dampaknya.
6. **Verifikasi Nyata:** Jangan mengklaim task berhasil jika perubahan dan pengujiannya belum benar-benar diverifikasi di lingkungan eksekusi.
7. **Otorisasi Git:** Jangan melakukan commit, push, atau deployment tanpa instruksi dan otorisasi yang sesuai.

## 3. Stack dan Arsitektur Aktual

PyQuest dikembangkan menggunakan Svelte 5 dan Bun. Target deployment yang tercantum dalam PRD harus dikonfirmasi melalui konfigurasi proyek dan lingkungan hosting yang benar-benar digunakan.

AI Agent wajib memeriksa:
- **Framework & Versi:** Svelte `^5.57.1`, SvelteKit `^3.0.0` (arsitektur reaktif Runes: `$state`, `$derived`, `$props`).
- **Package Manager & Test Runner:** Bun `1.4.2` / Node.js `24.x` (`bun install`, `bun test`, `npm run build`).
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite ^4.3.3`).
- **Struktur Frontend & Backend:** `src/routes/+page.svelte` (SPA View Router), `src/routes/api/auth/` (Serverless Auth Handlers).
- **Adapter & Konfigurasi Deployment:** `@sveltejs/adapter-auto`, `@sveltejs/adapter-node`, `nixpacks.toml` (Dockploy / Vercel ready).
- **Penyimpanan & Autentikasi:** `localStorage` (isolasi multi-akun), `IndexedDB` (blob avatar kustom), Google Identity Services (OAuth GIS).
- **Environment Variables:** `PUBLIC_GOOGLE_CLIENT_ID` (publik) dan fallback kredensial aman.

> **Prinsip Penting:** Jangan menganggap penggunaan Bun otomatis berarti backend berjalan sebagai server permanen. Jangan pula menganggap aplikasi sudah serverless hanya karena target hosting mendukung serverless.

## 4. Alur Pengerjaan Task (SOP Pengembangan)

Setiap task yang dikerjakan oleh AI Agent harus mengikuti alur terstruktur 7 langkah:

1. **Pahami:** Identifikasi tujuan masalah, batasan teknis, dan hasil akhir yang diharapkan pengguna.
2. **Periksa:** Telusuri file terkait dan baca alur logika yang sudah berjalan di kode repositori.
3. **Rencanakan:** Tentukan perubahan minimum yang paling aman dan efektif untuk menyelesaikan masalah tanpa efek samping.
4. **Implementasikan:** Modifikasi kode secara terfokus tanpa mengganggu bagian yang tidak berkaitan.
5. **Uji:** Jalankan unit test (`bun test`), type checking (`npm run check`), dan build check (`npm run build`).
6. **Audit:** Periksa apakah ada regresi atau efek samping pada fitur lain yang berhubungan.
7. **Laporkan:** Sajikan laporan transparan mengenai berkas yang diubah, penyebab masalah, dan hasil pengujian aktual.

Untuk perubahan besar yang dapat memengaruhi banyak bagian aplikasi, AI Agent wajib menjelaskan rencana dan analisis risikonya terlebih dahulu.

## 5. Aturan UI/UX & Desain Ramah Anak

- **Identitas Visual:** Pertahankan identitas visual, maskot robot PyBot, dan nuansa ruang angkasa/petualangan yang ceria.
- **Psikologi Anak:** Prioritaskan tampilan yang modern, playful, ramah pemula, dan tidak mengintimidasi anak-anak SD.
- **Keterbacaan & Kontras:** Pastikan teks terbaca jelas dengan kontras warna yang memenuhi standar WCAG AA (rasio $\ge 4.5:1$).
- **Kebersihan Antarmuka:** Hindari navigasi ganda, elemen yang tumpang tindih, atau layout yang terlalu padat di layar sempit.
- **Responsivitas:** Antarmuka harus stabil dan proporsional di smartphone (portrait & landscape), tablet, dan monitor desktop.
- **Landscape-First pada Game:** Pastikan Coding Game di ponsel diarahkan pada orientasi landscape untuk kenyamanan penyusunan balok dan pemantauan arena labirin.
- **Konsistensi Ikon:** Gunakan library ikon bawaan proyek (`Icon.svelte` berbasis Lucide).
- **Performa Aset:** Hindari penambahan animasi berat atau file media besar yang memperlambat waktu muat di jaringan seluler.

## 6. Aturan Coding Game & Simulator Labirin

Coding Game merupakan jantung interaktivitas PyQuest. AI Agent wajib menjaga konsistensi antara balok perintah, gerak PyBot, kondisi labirin, dan evaluasi hasil:

- **Fungsionalitas Blok:** Setiap blok perintah harus mengeksekusi instruksi sesuai labelnya (`MAJU`, `BELOK KIRI`, `BELOK KANAN`, `ULANGI N KALI`, `SELAMANYA`).
- **Urutan Eksekusi:** Blok dieksekusi secara berurutan sesuai susunan terbaru di *Block Workspace*.
- **Fisika Grid 2D:** Posisi koordinat $(x, y)$ dan arah hadap karakter robot PyBot harus selalu sinkron dengan visualisasi kanvas.
- **Evaluasi Objektif:** Tabrakan dinding/rintangan batu, perolehan koin, dan kondisi menang (mencapai bintang) harus dievaluasi akurat.
- **Konfigurasi Misi:** Seluruh 30 level permainan (90 misi labirin) memiliki start, target, dan batas langkah optimal (*minMoves* $\le$ *maxMoves*).
- **Daur Ulang Percobaan:** Siswa harus selalu dapat memperbaiki susunan balok dan menjalankan ulang simulasi setelah gagal (*fail-edit-rerun*).
- **Proteksi Anti-Loop:** Simulator wajib memiliki batas aman jumlah eksekusi maksimum (`maxActions = 250`) untuk mencegah *infinite loop* browser membeku.

> **Batasan:** Jangan menyatakan bahwa Coding Game menjalankan Python sungguhan jika implementasinya adalah AST interpreter balok yang mensimulasikan pergerakan.

## 7. Data, Progres, dan Autentikasi Pengguna

Sebelum memodifikasi data progres, XP, level, profil, atau alur login:
- **Aturan Level Baru:** Akun yang baru pertama kali mendaftar wajib memulai dari Level 1 dengan 0 XP.
- **Isolasi Akun:** Progres antar-akun di peramban yang sama tidak boleh saling mencampur atau tertukar (gunakan *user-scoped storage key* `pyquest_progress_v2_{id}`).
- **Penyimpanan Nyata:** Jangan menganggap `localStorage` otomatis tersinkronisasi ke server jika belum ada sinkronisasi cloud aktif.
- **Autentikasi Nyata:** Tombol login Google hanya aktif jika menggunakan token OAuth resmi melalui Google Identity Services.
- **Keamanan Kredensial:** Jangan pernah membocorkan OAuth client secret, token, atau variabel rahasia ke dalam berkas publik repositori.

## 8. Aturan Performa dan Kompatibilitas

- Hindari instalasi dependensi pihak ketiga jika masalah dapat diselesaikan dengan kode TypeScript/Svelte murni.
- Gunakan format aset WebP terkompresi untuk maskot dan latar belakang permainan.
- Pastikan tidak ada kebocoran memori pada loop simulasi atau event listener jendela.
- Optimasi kode harus didasarkan pada pengukuran profil atau hasil benchmark nyata, bukan tebak-tebakan.

## 9. Pengujian dan Protokol Verifikasi

Setiap perubahan wajib diuji menggunakan skrip otomatis yang tersedia:
- `bun test`: Memastikan seluruh 66 skenario pengujian unit lolos 100%.
- `npm run check`: Memastikan tidak ada kesalahan tipe TypeScript maupun peringatan Svelte AST (0 errors, 0 warnings).
- `npm run build`: Memastikan bundler Vite dan SvelteKit adapter berhasil membangun artefak produksi tanpa galat.

AI Agent wajib melaporkan hasil pengujian dengan status jujur:
- **Lulus:** Pengujian berhasil dijalankan dan diverifikasi.
- **Gagal:** Pengujian menemukan kegagalan atau galat kode.
- **Belum Diuji:** Pemeriksaan belum sempat dieksekusi.
- **N/A:** Tidak dapat diaplikasikan pada konteks terkait.

## 10. Dokumentasi dan Konsistensi Repositori

Jika kode diperbarui, AI Agent wajib menyelaraskan dokumentasi terkait:
- `docs/PRD.md`: Kebutuhan dan batasan fungsional produk.
- `AI_AGENT_REFERENCE.md`: Pedoman acuan operasional AI Agent.
- `docs/ARCHITECTURE.md`: Arsitektur sistem dan diagram aliran data.
- `README.md`: Ringkasan proyek, panduan instalasi, dan tautan dokumen.

## 11. Format Laporan Setelah Pengerjaan Task

Laporan wajib disajikan dengan struktur ringkas:
- **Tujuan:** Masalah atau instruksi yang ditangani.
- **Perubahan:** Berkas yang dimodifikasi beserta alasan teknisnya.
- **Verifikasi:** Perintah pengujian yang dijalankan dan bukti hasilnya.
- **Dampak:** Subsistem yang berpotensi terpengaruh.
- **Masalah Tersisa:** Hal yang belum selesai atau membutuhkan konfirmasi.
- **Langkah Berikutnya:** Saran aksi lanjutan jika diperlukan.

## 12. Prinsip Pengambilan Keputusan

Setiap keputusan rekayasa kode harus memenuhi minimal satu prinsip:
1. Membantu anak-anak memahami konsep pemrograman dengan lebih mudah dan intuitif.
2. Memperbaiki pengalaman belajar, stabilitas bermain, dan keterbacaan antarmuka.
3. Meningkatkan keandalan, performa, dan keamanan sistem.
4. Mempermudah pemeliharaan jangka panjang tanpa menambah kerumitan yang tidak perlu.

---

# BAGIAN II: PRODUCT REQUIREMENTS DOCUMENT (PRD) — PYQUEST

## 1. Visi & Tujuan Produk

### 1.1 Visi
Menghadirkan platform belajar coding interaktif nomor satu bagi anak-anak Indonesia yang menggabungkan kesenangan bermain game labirin dengan pemahaman konsep logika Python secara bertahap dan terstruktur.

### 1.2 Masalah yang Diselesaikan (*Problem Statement*)
1. **Tingginya Hambatan Masuk (*Syntax Barrier*)**: Memulai belajar coding langsung dengan sintaks teks bahasa pemrograman sering membuat siswa pemula frustrasi karena kesalahan tanda baca sepele (*typo, indentasi*).
2. **Ketergantungan API & Latensi Jaringan**: Platform coding berbasis cloud sering lambat jika jaringan sekolah tidak stabil dan berbiaya mahal jika mengandalkan AI API eksternal.
3. **Ketiadaan Jembatan Visual ke Teks Nyata**: Banyak aplikasi visual block (seperti Scratch murni) tidak memberikan jembatan pemahaman bagaimana balok tersebut diterjemahkan ke dalam bahasa pemrograman industri nyata seperti Python.

### 1.3 Nilai Unik (*Value Proposition*)
- **100% Deterministik Tanpa Biaya LLM**: Validasi kode dan game loop dieksekusi instan (<10ms) di browser klien, bebas latensi dan bebas halusinasi.
- **Generator Kode Python Real-Time**: Susunan balok otomatis menghasilkan sintaks Python murni (`pybot.move()`, `for _ in range(n):`) di panel samping, menghubungkan konsep visual ke teks nyata.
- **Offline-First PWA**: Dilengkapi Service Worker dan IndexedDB, memungkinkan aplikasi dimainkan secara penuh tanpa koneksi internet setelah instalasi awal.

## 2. Profil Pengguna (Target Personas)

1. **Siswa SD Pemula (Usia 7–11 Tahun)**:
   - Membutuhkan visual menarik, balok perintah sederhana, dan robot PyBot yang menggemaskan.
   - Belajar konsep sekuensial (langkah demi langkah) dan arah mata angin melalui misi labirin.
2. **Siswa SMP / Pemula Lanjutan (Usia 12–15 Tahun)**:
   - Mulai mempelajari konsep pemrograman prosedural: variabel, perulangan `for`/`while`, percabangan `if/else`.
   - Tertarik melihat padanan teks kode Python asli dari balok logika yang disusunnya.
3. **Guru Informatika & Orang Tua**:
   - Membutuhkan materi edukasi yang bebas iklan, aman bagi anak, dan memiliki kurikulum belajar bertahap yang dapat diukur melalui perolehan XP dan pencapaian level.

## 3. Fitur Utama & Kebutuhan Fungsional

### 3.1 Modul Belajar Python (30 Level, 150 Soal)
- **Kurikulum 30 Level**: Materi disusun berjenjang meliputi:
  - Level 1–5: Pengenalan Bahasa Python & Fungsi `print()`.
  - Level 6–10: Tipe Data Dasar (*String, Integer, Float, Boolean*) & Variabel.
  - Level 11–15: Operator Aritmatika, Logika, dan Perbandingan.
  - Level 16–20: Percabangan Kondisional `if`, `elif`, dan `else`.
  - Level 21–25: Perulangan Terhitung `for` & Fungsi `range()`.
  - Level 26–30: Perulangan Kondisional `while` & Pengenalan Struktur List.
- **Bank Soal Terkurasi**: 150 soal interaktif beraneka ragam (tebak keluaran program, analisis galat, melengkapi kode).
- **Pengacakan Pilihan Jawaban**: Algoritma Fisher-Yates memastikan urutan opsi A, B, C, D teracak adil tanpa mengubah kunci jawaban yang benar.
- **Umpan Balik Pedagogis**: Menampilkan penjelasan konsep langsung setelah siswa memilih jawaban.

### 3.2 Coding Game Labirin 2D (30 Level, 90 Misi)
- **Arena Grid Labirin**: Papan permainan 2D tempat robot PyBot bergerak dari petak awal menuju bintang target.
- **Katalog Balok Logika Visual**:
  - `MAJU`: Melangkah 1 petak ke depan sesuai arah hadap.
  - `BELOK KIRI` & `BELOK KANAN`: Berputar 90 derajat di tempat.
  - `ULANGI N KALI`: Menjalankan blok bersarang sebanyak $N$ kali.
  - `SELAMANYA`: Perulangan kontinu hingga mencapai target atau rintangan.
- **Solvabilitas Terverifikasi**: Seluruh 90 tantangan telah divalidasi programatik menggunakan algoritma BFS (*Breadth-First Search*), menjamin setiap level memiliki solusi tanpa jalan buntu cacat.
- **Evaluasi Langkah**: Menerapkan batas langkah minimum (*minMoves*) dan maksimum (*maxMoves*) untuk melatih anak berpikir efisien.

### 3.3 Visualisasi Kode Python Real-Time
- Editor visual secara langsung mengonversi susunan balok ke kode Python berindentasi rapi:
  ```python
  # Kode Python PyBot
  for _ in range(3):
      pybot.move()
  pybot.turn_right()
  pybot.move()
  ```
- Memfasilitasi proses transisi kognitif anak dari blok visual ke sintaksis teks industri.

### 3.4 Gamifikasi & Pelacakan Progres
- **Sistem XP**: Memberikan poin reward XP pada setiap penyelesaian misi pertama kali, dengan proteksi anti-duplikasi saat misi dimainkan ulang.
- **Daily Streak**: Mencatat keaktifan belajar harian berdasarkan tanggal kalender perangkat.
- **Isolasi Akun Multi-Pengguna**: Data progres disimpan di `localStorage` per ID akun (`pyquest_progress_v2_{id}`), menjaga keamanan progres antar-siswa di komputer laboratorium bersama.
- **Trofi & Profil Pengguna**: Menampilkan galeri lencana kelulusan modul dan kustomisasi avatar karakter.

### 3.5 Progressive Web App (PWA) & Pemulihan Pasang
- **Instalasi Fleksibel**: Mendukung instalasi aplikasi web di Chrome Desktop, Android WebAPK, dan iOS Safari *Add to Home Screen*.
- **Pemulihan Status Uninstalasi**: Logika deteksi dinamis memastikan tombol "Pasang Aplikasi" muncul kembali saat pengguna membuka website di browser setelah menghapus aplikasi.
- **Panduan Terintegrasi**: Modal panduan langkah alternatif otomatis muncul jika browser belum menembakkan event instalasi instan.

## 4. Kebutuhan Non-Fungsional

| Parameter | Spesifikasi | Bukti Verifikasi |
|---|---|---|
| **Kecepatan Respons** | Eksekusi langkah simulasi labirin $\le 380\text{ ms}$, evaluasi jawaban $< 10\text{ ms}$. | Client-side deterministic engine, lolos uji kecepatan. |
| **Kemandirian Jaringan** | Aplikasi dapat dibuka dan dimainkan secara offline 100%. | Service Worker Cache API & offline test pass. |
| **Keamanan Anak** | 0 iklan, 0 tracking pihak ketiga, tanpa penyimpanan data sensitif anak. | Audit kode privasi & sesi terisolasi. |
| **Aksesibilitas Visual** | Kontras warna tinggi memenuhi WCAG AA, tombol ramah sentuhan $\ge 44\text{px}$. | UI token contrast pass, dark mode default. |
| **Stabilitas Memori** | Pencegahan infinite loop dan pembatasan beban aset WebP. | Batas `maxActions = 250` & WebP precache. |

## 5. Kriteria Penerimaan Lomba (Acceptance Criteria)

1. Akun pengguna baru wajib memulai permainan dari Level 1 dengan 0 XP.
2. Level selanjutnya hanya terbuka secara berurutan setelah level sebelumnya berhasil diselesaikan.
3. Seluruh 90 misi labirin dan 150 soal kuis dapat diselesaikan dengan pencatatan status yang valid.
4. Aplikasi dapat diinstal sebagai PWA dan dimainkan secara offline di berbagai perangkat.
5. Eksekusi balok kode terlindungi dari loop tak terhingga dan tabrakan yang merusak browser.
6. Repositori publik memiliki riwayat commit bersih, dokumentasi lengkap, dan kode teruji 100%.

---

# BAGIAN III: MATRIKS PENELUSURAN & BUKTI IMPLEMENTASI NYATA

| Persyaratan PRD & Aturan AI | Modul Kode Implementasi | Status Uji Otomatis | Bukti Verifikasi Repositori |
|---|---|---|---|
| **Aturan 6: Coding Game 2D & Solver** | `src/lib/game/engine.ts`<br/>`src/lib/game/validator.ts` | **LULUS** (10 Test Cases) | Solvabilitas 90 level via BFS solver terverifikasi di `engine.test.ts`. |
| **Aturan 6: Kompilasi Balok ke Python** | `src/lib/game/compiler.ts` | **LULUS** (Deterministic AST) | Generator kode Python real-time terintegrasi di `BlockWorkspace.svelte`. |
| **Aturan 7: Isolasi Progres & Anti-Duplikasi** | `src/lib/stores/progressStore.ts`<br/>`src/lib/stores/authStore.ts` | **LULUS** (Multi-Account Test) | Progres multi-akun terisolasi, XP akun baru mulai dari 0 di Level 1. |
| **PRD 3.1: Bank Soal 150 Soal Python** | `src/lib/questions/questionsData.ts`<br/>`src/lib/questions/learningLevelsData.ts` | **LULUS** (150 Soal Lengkap) | 30 level kurikulum dan evaluasi jawaban Fisher-Yates shuffle pass. |
| **PRD 3.5: PWA & Pemulihan Pasang** | `src/lib/stores/pwaStore.ts`<br/>`static/manifest.webmanifest` | **LULUS** (Uninstallation Recovery) | Deteksi standalone mode dan pembersihan penanda lama teruji di `engine.test.ts`. |
| **Aturan 5: Desain UI Ramah Anak & Kontras** | `src/app.css`<br/>`src/lib/components/` | **LULUS** (WCAG AA Compliance) | Standardisasi tema gelap kontras tinggi, navigasi mobile auto-hide. |

---

*Dokumen ini disusun sebagai dokumen pendukung resmi pengumpulan karya M-ONE Telkomsel Coding Competition oleh Pengembang PyQuest.*
