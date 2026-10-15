# Dokumen Acuan AI Agent & PRD — PyQuest
## *Master AI Agent Reference & Product Requirements Document*

---

> **Nama Proyek**: PyQuest — Petualangan Logika Python  
> **Tema Kompetisi**: Innovating Education Through Technology / Web Education for Kids  
> **Kategori**: Game Edukasi Berbasis Web (EdTech Web App & PWA)  
> **Target Pengguna**: Siswa Sekolah Dasar & Menengah Pertama (Usia 7–15 Tahun), Guru, dan Orang Tua  
> **Status Repositori**: Publik ([https://github.com/usamah-io/pyquest](https://github.com/usamah-io/pyquest))  
> **Lisensi**: Hak Cipta Dilindungi Undang-Undang (*Academic & Competition Submission*)

---

# DAFTAR ISI

1. **BAGIAN I: PRODUCT REQUIREMENTS DOCUMENT (PRD)**
   - 1.1 Visi & Latar Belakang Masalah
   - 1.2 Target Pengguna & Persona
   - 1.3 Nilai Keunggulan Produk (*Value Proposition*)
   - 1.4 Spesifikasi Modul Belajar Python (30 Level, 150 Soal)
   - 1.5 Spesifikasi Coding Game Labirin 2D (30 Level, 90 Misi)
   - 1.6 Visualisasi Kode Python Real-Time
   - 1.7 Gamifikasi, XP, Badge & Daily Streak
   - 1.8 Fitur Progressive Web App (PWA) & Offline Mode
   - 1.9 Kebutuhan Non-Fungsional & Kriteria Penerimaan
2. **BAGIAN II: PEDOMAN OPERASIONAL AI AGENT (12 ATURAN UTAMA)**
   - 2.1 Tujuan Dokumen Acuan AI Agent
   - 2.2 Aturan Utama Kerja AI Agent
   - 2.3 Standar Stack Teknologi & Arsitektur
   - 2.4 Alur 7-Langkah Pengerjaan Task
   - 2.5 Pedoman UI/UX, Tema Kontras Tinggi & Landscape Mobile
   - 2.6 Aturan Khusus Coding Game Engine
   - 2.7 Aturan Data, Progres, dan Autentikasi Multi-Akun
   - 2.8 Aturan Performa, Keamanan, dan Kompatibilitas
   - 2.9 Standar Pengujian dan Matriks Verifikasi
   - 2.10 Konsistensi Dokumentasi dan Kode
   - 2.11 Format Laporan Pengerjaan Task
   - 2.12 Prinsip Pengambilan Keputusan
3. **BAGIAN III: SPESIFIKASI ARSITEKTUR & VERIFIKASI SISTEM**
   - 3.1 Skema Arsitektur Sistem Klien & Server
   - 3.2 Data Store & Struktur State Reaktif
   - 3.3 Hasil Verifikasi Otomatis (66 Unit Tests Pass)

---

# BAGIAN I: PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1.1 Visi & Latar Belakang Masalah
Di era digital, pemahaman logika pemrograman (computational thinking) menjadi salah satu kecakapan paling krusial bagi generasi muda. Namun, anak-anak usia sekolah dasar sering kali mengalami hambatan besar ketika mulai belajar bahasa pemrograman Python:
1. **Sintaksis Kaku (*Syntax Anxiety*)**: Pemula merasa terintimidasi oleh baris teks hitam-putih di terminal komputer dan pesan galat (*error message*) yang membingungkan.
2. **Ketergantungan Eksternal & Halusinasi**: Platform AI edukasi modern sering menggunakan model AI generatif daring yang lambat (latensi >2 detik), berbayar mahal, dan rentan menghasilkan kode keliru (*halusinasi*).
3. **Keterbatasan Infrastruktur Internet**: Sekolah di banyak daerah memiliki konektivitas internet yang kurang stabil, sehingga platform edukasi murni *cloud-based* sering gagal digunakan di kelas.

**Visi PyQuest**: Menciptakan platform web edukasi coding anak yang ceria, interaktif, 100% deterministik, cepat (<10ms), aman bagi anak (*child-safe*), dan dapat dijalankan secara luring (*offline-first PWA*).

## 1.2 Target Pengguna & Persona
1. **Siswa Pemula (Usia 7–12 Tahun / SD)**:
   - Menyukai visual kartun interaktif, membutuhkan panduan bertahap tanpa teks rumit, serta termotivasi oleh sistem lencana dan suara selebrasi. Karakter maskot robot **PyBot** bertindak sebagai kawan belajar.
2. **Siswa Lanjutan (Usia 13–15 Tahun / SMP)**:
   - Membutuhkan pemahaman sintaksis Python nyata untuk persiapan olimpiade atau kurikulum informatika sekolah. Mengamati panel visualisasi kode Python asli yang ter-generate dari susunan balok.
3. **Guru & Orang Tua**:
   - Membutuhkan materi ajar yang terstruktur rapi, tanpa iklan yang mengganggu, tanpa pelacakan data sensitif, dan mudah dipasang di HP/tablet/laptop.

## 1.3 Nilai Keunggulan Produk (*Value Proposition*)
- **100% Deterministik Tanpa Biaya API**: Seluruh validasi kode, kompilasi balok, dan simulasi gerakan labirin dieksekusi instan di peramban klien tanpa API LLM berbayar.
- **Jembatan Visual ke Teks Nyata**: Balok visual bergaya Scratch 3 langsung memproduksi teks kode Python murni secara *live* (`pybot.move()`, `pybot.turn_left()`, `for _ in range(3):`).
- **Offline-First PWA**: Dilengkapi Service Worker dan Web App Manifest sehingga aplikasi dapat dipasang ke layar utama dan dimainkan tanpa kuota internet.
- **Isolasi Progres Multi-Akun**: Mendukung banyak siswa menggunakan gawai yang sama tanpa risiko progres atau XP saling menimpa.

## 1.4 Spesifikasi Modul Belajar Python (30 Level, 150 Soal)
Kurikulum terbagi menjadi 30 tingkatan pembelajaran bertahap yang mencakup seluruh konsep fundamental Python:
- **Level 1–5 (Dasar Sintaksis)**: Perkenalan Python, fungsi `print()`, teks (*string*), angka bulat (*integer*), dan angka desimal (*float*).
- **Level 6–10 (Operasi & Variabel)**: Aturan penamaan variabel, operator matematika (`+`, `-`, `*`, `/`, `//`, `%`, `**`), dan penggabungan teks (*string concatenation*).
- **Level 11–15 (Logika & Kondisi)**: Tipe data *boolean*, operator pembanding (`==`, `!=`, `>`, `<`, `>=`, `<=`), operator logika (`and`, `or`, `not`), dan percabangan `if-else`.
- **Level 16–20 (Kondisi Bersarang & Kompleks)**: Percabangan bertingkat `if-elif-else`, validasi kondisi majemuk, dan studi kasus keputusan logika.
- **Level 21–25 (Perulangan / Loops)**: Fungsi `range()`, perulangan `for`, perulangan `while`, batas terminasi, dan kata kunci `break` serta `continue`.
- **Level 26–30 (Struktur Data & Studi Kasus)**: Pengenalan list (indeks dan panjang `len()`), operasi list dasar, dan penggabungan seluruh konsep ke dalam studi kasus terpadu.

*Spesifikasi Teknis Kuis*:
- Setiap level berisi 5 soal terkurasi (total 150 soal).
- Pilihan jawaban diacak menggunakan algoritma Fisher-Yates shuffle untuk mencegah hafalan posisi pilihan (A/B/C/D).
- Sistem petunjuk bertingkat (*Tiered Hints*) membimbing anak saat kesulitan tanpa membocorkan jawaban langsung.
- Penjelasan konsep langsung muncul secara edukatif setelah siswa memilih jawaban.

## 1.5 Spesifikasi Coding Game Labirin 2D (30 Level, 90 Misi)
Arena labirin 2D berukuran grid $(N \times M)$ tempat robot PyBot bertualang:
- **Balok Perintah Tersedia**:
  - `MAJU`: Menggerakkan robot 1 petak ke arah hadapnya.
  - `BELOK KIRI` / `BELOK KANAN`: Memutar orientasi robot 90 derajat.
  - `ULANGI [N] KALI`: Struktur perulangan C-block untuk mengeksekusi instruksi anak di dalamnya sebanyak $N$ kali.
  - `SELAMANYA`: Perulangan tak berhingga untuk melintasi pola labirin berulang.
- **Mekanika Labirin**:
  - Deteksi rintangan batu (*obstacles*) yang memicu status gagal tabrakan secara aman.
  - Batas arena grid (*out of bounds*) yang mencegah robot keluar area permainan.
  - Pengumpulan koin bintang emas (*collectibles*) untuk melatih efisiensi langkah.
  - Batas langkah maksimum (*maxMoves*) yang mendorong anak merancang algoritma paling ringkas.
- **Jaminan Solvabilitas 100%**:
  - Seluruh 90 misi labirin telah diverifikasi secara matematis menggunakan algoritma Breadth-First Search (BFS) pada berkas `validator.ts`, memastikan tidak ada level yang mustahil diselesaikan.

## 1.6 Visualisasi Kode Python Real-Time
Setiap perubahan pada balok perintah di *workspace* dikonversi oleh `compiler.ts` menjadi kode Python murni secara *live*:
```python
# Contoh keluaran live generator:
for _ in range(3):
    pybot.move()
pybot.turn_right()
pybot.move()
```
Anak dapat melihat langsung bagaimana balok visual mereka bertransformasi menjadi kode bahasa Python standar.

## 1.7 Gamifikasi, XP, Badge & Daily Streak
- **Aturan XP**: Setiap misi pertama kali memberikan XP penuh (+50 hingga +120 XP). Pengulangan misi yang sudah selesai tidak menambah XP (proteksi anti-farming).
- **Daily Streak**: Menggunakan perhitungan kalender lokal nyata untuk mencatat konsistensi belajar harian.
- **Sistem Badge**: 30 trofi kelulusan dengan metadata konsep yang dapat dibuka setelah menyelesaikan level tantangan.

## 1.8 Progressive Web App (PWA) & Dukungan Offline
- Menggunakan Service Worker kustom (`src/service-worker.js`) dengan strategi *cache-first* untuk shell aplikasi dan aset statis WebP.
- Web App Manifest lengkap (`name`, `short_name`, `start_url`, `display: standalone`, `theme_color`, dan icon maskable hingga `512x512`).
- Fitur uninstalasi adaptif: Jika pengguna meng-uninstall aplikasi lalu membuka kembali browser, website mendeteksi uninstalasi secara real-time dan menawarkan tombol instalasi kembali tanpa terkunci di status lama.
- Modal panduan interaktif ([`InstallGuideModal.svelte`](file:///c:/Users/ASUS/Desktop/pyquest/src/lib/components/InstallGuideModal.svelte)) memandu langkah pemasangan di desktop, Android (menu titik tiga ⋮), maupun iOS Safari (menu Bagikan).

## 1.9 Kebutuhan Non-Fungsional & Kriteria Penerimaan
- **Latensi Respon**: Kompilasi balok $<10\text{ ms}$, langkah gerak simulator 380 ms per frame.
- **Responsivitas**: Tampilan adaptif pada HP (360px+), tablet, dan laptop. Mode Coding Game mengutamakan orientasi landscape yang lapang.
- **Kontras Tinggi**: Menggunakan tema gelap (*dark theme*) tunggal berstandar kontras WCAG AA yang konsisten di semua halaman.
- **Kriteria Penerimaan**:
  1. Akun baru wajib mulai dari Level 1 dengan 0 XP.
  2. Level berikutnya terkunci sebelum level sebelumnya selesai.
  3. Seluruh 90 misi dan 150 soal kuis dapat diselesaikan tanpa bug.
  4. Aplikasi dapat dibuka dan dimainkan secara offline setelah install PWA.
  5. 0 error pada TypeScript, Svelte check, dan unit tests.

---

# BAGIAN II: PEDOMAN OPERASIONAL AI AGENT (12 ATURAN UTAMA)

## 2.1 Tujuan Dokumen Acuan AI Agent
Dokumen ini adalah pedoman operasional tertinggi bagi setiap AI Agent (Antigravity, Claude, ChatGPT, Cursor, Copilot, dll) yang bertugas mengembangkan, mengaudit, memperbaiki, atau menguji PyQuest. AI Agent wajib membaca PRD dan dokumen ini sebelum melakukan intervensi kode apa pun.

## 2.2 Aturan Utama Kerja AI Agent
1. **Pahami Sebelum Mengubah**: Selalu baca `docs/PRD.md` dan berkas kode terkait sebelum menyentuh logika aplikasi.
2. **Periksa Implementasi Aktual**: Jangan berasumsi; selalu periksa struktur direktori, `package.json`, dan file nyata di repositori.
3. **Anti-Halusinasi & Faktual**: Dilarang keras mengarang file, API, database, atau library yang tidak ada di codebase.
4. **Jaga Keutuhan Stack**: Dilarang mengganti framework (SvelteKit), runtime (Bun), atau bundler (Vite) tanpa persetujuan eksplisit.
5. **Pertahankan Fitur Berjalan**: Dilarang menghapus fitur, logika game, progres XP, kuis, atau PWA yang sudah terbukti berfungsi.
6. **Verifikasi Sebelum Mengklaim**: Dilarang menyatakan task berhasil sebelum menjalankan `bun test`, `npm run check`, dan `npm run build`.
7. **Disiplin Git & Otorisasi**: Dilarang melakukan commit, force push, atau deployment tanpa instruksi dan konfirmasi pengguna.

## 2.3 Standar Stack Teknologi & Arsitektur
- **Frontend**: Svelte 5 (menggunakan Runes murni: `$state`, `$derived`, `$props`, `$effect`) dan SvelteKit 3.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`.
- **Runtime**: Bun 1.4+ (mendukung pengujian native via `bun test`) dan Node.js 20+ compatibility.
- **Type Safety**: TypeScript dengan pemeriksaan ketat (`svelte-check --tsconfig ./tsconfig.json`).
- **Penyimpanan**: Client-side first (`localStorage` + `IndexedDB`), server session verification jika diperlukan.

## 2.4 Alur 7-Langkah Pengerjaan Task
Setiap kali AI Agent menerima instruksi, wajib menerapkan alur:
1. **Pahami**: Identifikasi akar masalah, batasan teknis, dan target hasil.
2. **Periksa**: Baca file terkait, telusuri alur pemanggilan fungsi dan tipe data.
3. **Rencanakan**: Rumuskan solusi terarah dengan perubahan seminimal mungkin (*minimal diff*).
4. **Implementasikan**: Tulis kode bersih tanpa merusak komentar atau dokumentasi yang sudah ada.
5. **Uji**: Jalankan pengujian unit (`bun test`), typecheck (`npm run check`), dan build (`npm run build`).
6. **Audit Regresi**: Periksa apakah ada efek samping pada komponen atau alur lain.
7. **Laporkan**: Sajikan laporan terstruktur mencakup penyebab masalah, berkas yang diubah, dan bukti hasil pengujian.

## 2.5 Pedoman UI/UX, Tema Kontras Tinggi & Landscape Mobile
- **Identitas Visual**: Pertahankan maskot 3D PyBot, warna aksen neon (*indigo, cyan, emerald, amber*), dan tipografi yang jelas.
- **Kontras Konsisten**: Terapkan tema gelap (*dark theme*) dengan kontras tinggi (`#020617` / `#0b1120` dengan teks `slate-100`/`white`).
- **Orientasi Landscape**: Coding Game dirancang berdampingan (Arena 2D di kiri, Workspace balok di kanan). Pada ponsel dalam posisi portrait, sediakan panduan putar layar.
- **Pencegahan Zoom Tak Sengaja**: Gunakan pencegahan *multi-touch gesture pinch-zoom* di `src/app.html` agar interaksi drag-and-drop balok tetap presisi di layar sentuh.

## 2.6 Aturan Khusus Coding Game Engine
- **Kesesuaian Blok & Aksi**: Blok `MAJU` wajib memicu 1 petak pergerakan, blok belok wajib memutar orientasi hadap robot 90 derajat.
- **Deterministik**: Eksekusi balok dijalankan per tick (380ms) secara sekuensial berdasarkan urutan AST yang dihasilkan `compiler.ts`.
- **Proteksi Loop Tak Hingga**: Blok `SELAMANYA` dan loop bertingkat wajib dilindungi oleh *maxActions safety guard* (maksimal 200–500 aksi) agar peramban tidak mengalami crash/hang.
- **Kejujuran Istilah**: Hindari menyebutkan game menjalankan interpreter Python sungguhan jika implementasinya adalah compiler balok ke AST dan simulator robot.

## 2.7 Aturan Data, Progres, dan Autentikasi Multi-Akun
- **Inisialisasi Pengguna Baru**: Pengguna yang baru pertama kali login wajib mendapatkan state awal: Level 1 terbuka, XP = 0, streak = 0, riwayat tantangan kosong.
- **Isolasi Akun**: Kunci penyimpanan `localStorage` wajib menggunakan prefix berbasis ID pengguna unik (`pyquest_progress_v2_{id}`). Data antar-akun di satu gawai tidak boleh tercampur.
- **Keamanan Kredensial**: Dilarang memasukkan client secret, API key privat, atau password ke dalam repositori publik atau bundle klien.

## 2.8 Aturan Performa, Keamanan, dan Kompatibilitas
- **Zero-Dependency Bloat**: Jangan menambahkan paket npm pihak ketiga jika masalah dapat diselesaikan dengan Web API standar (misal: Web Audio API untuk efek suara).
- **Efisiensi Memori**: Bersihkan *timer*, *event listener*, dan *media query listener* saat komponen di-unmount.
- **Aset Terkompresi**: Gunakan format WebP untuk gambar maskot dan SVG untuk ikon antarmuka.

## 2.9 Standar Pengujian dan Matriks Verifikasi
AI Agent wajib memverifikasi kode dengan status pelaporan yang jujur:
- **Lulus (PASS)**: Telah dijalankan di terminal dan lolos 100% tanpa error.
- **Gagal (FAIL)**: Pengujian menemukan masalah yang harus segera diperbaiki.
- **Belum Diuji (NOT TESTED)**: Pengujian belum dilakukan di lingkungan riil.
- **Tidak Relevan (N/A)**: Pengujian tidak berlaku untuk jenis perubahan tersebut.

## 2.10 Konsistensi Dokumentasi dan Kode
Jika terjadi perubahan fungsional pada kode:
- Perbarui `docs/PRD.md` jika ada penyesuaian batasan atau fitur.
- Perbarui `docs/ARCHITECTURE.md` jika ada perubahan struktur aliran data.
- Perbarui `README.md` jika ada perubahan perintah atau panduan instalasi.

## 2.11 Format Laporan Pengerjaan Task
Setiap laporan pasca-pengerjaan task harus disusun dengan format standar:
1. **Tujuan**: Masalah yang diperbaiki atau fitur yang ditambahkan.
2. **Penyebab Masalah (*Root Cause*)**: Analisis teknis mengapa bug/kebutuhan terjadi.
3. **Perubahan**: Berkas yang diubah beserta rasional teknisnya.
4. **Hasil Pengujian**: Bukti eksekusi `bun test`, `npm run check`, dan `npm run build`.
5. **Dampak & Status Terkini**: Kepastian tidak adanya regresi pada subsistem lain.

## 2.12 Prinsip Pengambilan Keputusan
Setiap keputusan rekayasa perangkat lunak pada PyQuest wajib didasarkan pada:
1. Kemudahan anak memahami logika pemrograman.
2. Kecepatan dan keandalan sistem (*zero-latency, offline-capable*).
3. Keamanan privasi anak (*privacy by design, child-safe*).
4. Kemudahan pemeliharaan dan pengujian kode (*clean code, high testability*).

---

# BAGIAN III: SPESIFIKASI ARSITEKTUR & VERIFIKASI SISTEM

## 3.1 Skema Arsitektur Sistem Klien & Server
Arsitektur PyQuest mengusung model Client-Side Engine dengan integrasi SvelteKit:

```
[ Siswa / Pengguna (HP, Tablet, Laptop) ]
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Frontend Svelte 5 (+page.svelte)               │
│  - Arena Labirin 2D (GameCanvas.svelte)                    │
│  - Workspace Balok Scratch (BlockWorkspace.svelte)          │
│  - Kartu Soal Kuis (QuestionCard.svelte)                    │
│  - Pemilih Level & Modal Panduan PWA (LevelSelect.svelte)   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌───────────────────────────────┐ ┌───────────────────────────┐
│     Core Engine TypeScript    │ │   State Stores SvelteKit  │
│  - compiler.ts (Balok -> AST) │ │  - progressStore.ts (XP)  │
│  - engine.ts (Tick 380ms)     │ │  - authStore.ts (Sesi)    │
│  - validator.ts (BFS Solver)  │ │  - pwaStore.ts (Offline)  │
│  - quizEvaluator.ts (Shuffle) │ │  - soundStore.ts (Audio)  │
└──────────────┬────────────────┘ └───────────┬───────────────┘
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Penyimpanan Lokal Browser                  │
│  - localStorage: Progres terisolasi pyquest_progress_v2_{id}│
│  - IndexedDB: Penyimpanan foto avatar kustom                │
│  - Service Worker Cache: Shell PWA & aset WebP maskot       │
└─────────────────────────────────────────────────────────────┘
```

## 3.2 Data Store & Struktur State Reaktif
- `progressStore`: Mengelola `completedChallenges: string[]`, `completedQuestions: number[]`, `xp: number`, `dailyStreak: number`, dan `lastActiveDate: string`.
- `authStore`: Mengelola status guest vs akun terhubung Google OAuth, nama siswa, dan foto profil.
- `pwaStore`: Mengelola deteksi mandiri `isStandaloneWindow()`, kesiapan prompt `deferredPrompt`, dan pemulihan uninstalasi `clearInstalledStatus()`.
- `soundStore`: Mengontrol volume dan saklar mute audio Web Audio API.

## 3.3 Hasil Verifikasi Otomatis
Rangkaian pengujian otomatis dijalankan menggunakan Bun Test Runner (`src/engine.test.ts`):
- **Jumlah Pengujian**: **66 Unit & Integration Tests Lolos (100% PASS)**.
- **Assertion Calls**: **6.060 `expect()` checks tervalidasi**.
- **Waktu Eksekusi**: **~132 ms**.
- **Cakupan Pengujian**:
  1. Validasi 30 level modul belajar & 150 soal kuis terkurasi.
  2. Validasi kelayakan (*solvability*) 90 misi labirin via solver BFS.
  3. Keamanan pergerakan robot PyBot & proteksi anti-loop tak terbatas.
  4. Perhitungan skor kuis & pencegahan duplikasi nilai.
  5. Sistem perolehan XP dan bonus pencapaian lencana.
  6. Isolasi progres multi-akun pada perpindahan login/logout.
  7. Deteksi perangkat PWA, persistensi instalasi, dan pemulihan uninstalasi.
- **Pemeriksaan Tipe Svelte & TypeScript (`npm run check`)**: **0 errors, 0 warnings**.
- **Kompilasi Produksi (`npm run build`)**: **Berhasil dikompilasi sempurna** (`✔ done` via `@sveltejs/adapter-node` dan Service Worker PWA).
