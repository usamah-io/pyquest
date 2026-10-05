# 🐍 PyQuest — Interactive Educational Python Game for Kids

> **Game edukasi pemrograman Python interaktif berbasis web untuk anak-anak pemula, menggabungkan kuis konseptual terstruktur, balok kode visual ala Scratch, dan simulasi robotik game 2D.**

---

## 🌟 Apa Itu PyQuest?

**PyQuest** bukan sekadar kuis biasa atau IDE kode teks yang rumit. PyQuest dirancang dari nol (*scratch*) agar pengalaman belajar Python terasa seperti bermain game petualangan:
- **Pertanyaan Interaktif & Konseptual**: Memahami variabel, tipe data teks (string), fungsi `print()`, dan perulangan loop secara ramah anak.
- **Balok Koding Visual (Scratch-inspired)**: Anak menyusun urutan balok aksi (`MAJU`, `BELOK KIRI`, `BELOK KANAN`, `ULANGI/REPEAT`) yang secara otomatis menghasilkan kode Python murni secara *live*.
- **Game Engine 2D Real-time**: Menggerakkan robot penjelajah **PyBot** di arena ubin bergrid untuk menghindari rintangan batu, mengambil koin, dan meraih bintang emas.
- **Gamifikasi & Hadiah**: Sistem reward XP, skor, daily streak, serta lencana kebanggaan tanpa memerlukan akun kompleks.
- **Landscape-First Experience**: Didesain optimal untuk layar mendatar (Desktop, Tablet, dan Smartphone Landscape) dengan proteksi orientasi otomatis.

---

## 🎯 Target Pengguna

- **Anak-anak & Pelajar Pemula** (usia 7–15 tahun) yang baru pertama kali mengenal logika pemrograman.
- **Guru & Pengajar Koding** yang membutuhkan alat bantu ajar visual interaktif untuk kelas dasar Python.

---

## 🛠️ Arsitektur & Teknologi (Tech Stack)

- **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5 Runes) — reaktif tanpa virtual DOM overhead.
- **Runtime & Package Manager**: [Bun](https://bun.sh/) 1.4+ — eksekusi cepat, native TypeScript, dan test runner bawaan.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — antarmuka modern bernuansa game.
- **Deterministic Engine**: Game loop dan validasi kuis berjalan 100% di sisi klien tanpa ketergantungan API AI/LLM eksternal.
- **Testing**: `bun test` dengan unit tests untuk compiler balok kode dan simulasi arena.
- **Deployment**: Siap deploy instan ke **Vercel** (`@sveltejs/adapter-auto`).

---

## 📂 Struktur Proyek

```
pyquest/
├── src/
│   ├── app.css                 # Konfigurasi Tailwind CSS v4 & theme
│   ├── app.html                # Dokumen HTML shell
│   ├── engine.test.ts          # Unit tests engine game & compiler balok
│   ├── routes/
│   │   ├── +layout.svelte      # Layout utama & global styling
│   │   └── +page.svelte        # State machine alur game lengkap
│   └── lib/
│       ├── types/              # Domain TypeScript types
│       ├── questions/          # Bank soal Python kurasi bertingkat
│       ├── challenges/         # Data level arena 2D & konfigurasi grid
│       ├── game/
│       │   ├── compiler.ts     # Kompilasi balok visual ke perintah & Python code
│       │   └── engine.ts       # Simulator pergerakan robot & deteksi tabrakan
│       ├── stores/
│       │   └── progressStore.ts# Store reaktif XP & progres lokal
│       └── components/
│           ├── Navbar.svelte
│           ├── LandingHero.svelte
│           ├── QuestionCard.svelte
│           ├── FeedbackModal.svelte
│           ├── ChallengeHeader.svelte
│           ├── BlockWorkspace.svelte
│           ├── GameCanvas.svelte
│           ├── ChallengeSuccessModal.svelte
│           ├── SummaryModal.svelte
│           └── OrientationGuard.svelte
├── bun.lock                    # Bun lockfile
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat
- [Bun](https://bun.sh/) telah terpasang di sistem (`bun --version` >= 1.2).

### 1. Instalasi Dependensi
```bash
bun install
```

### 2. Menjalankan Server Pengembangan (Dev Server)
```bash
bun run dev
```
Buka browser di alamat `http://localhost:5173/`.

### 3. Menjalankan Pengujian (Unit Tests)
```bash
bun test
```

### 4. Pengecekan Type & Lint
```bash
bun run check
```

---

## 📦 Membangun untuk Produksi (Production Build)

Untuk menguji build produksi lokal:
```bash
bun run build
bun run preview
```

### Deploy ke Vercel
Proyek ini menggunakan konfigurasi standar SvelteKit yang didukung langsung oleh Vercel:
1. Hubungkan repositori Git ke akun [Vercel](https://vercel.com).
2. Framework preset akan terdeteksi otomatis sebagai **SvelteKit**.
3. Klik **Deploy**.

---

## 🏆 Kriteria Selesai MVP (Definition of Done)

Semua 16 kriteria vertikal MVP terpenuhi:
1. Buka aplikasi di browser (Landing Page interaktif).
2. Memahami tujuan PyQuest lewat hero dan fitur penjelas.
3. Memulai petualangan belajar dengan tombol aksi utama.
4. Menampilkan soal Python bertingkat dengan cuplikan sintaks kode.
5. Memilih opsi jawaban dengan feedback visual.
6. Memperoleh feedback langsung (Benar/Salah).
7. Membaca penjelasan ramah pemula beserta petunjuk bertingkat.
8. Masuk ke arena tantangan koding berorientasi landscape.
9. Memilih dan menyusun balok koding (`MOVE`, `TURN_LEFT`, `TURN_RIGHT`, `REPEAT`).
10. Menjalankan program (*Run Code*).
11. Mengamati robot PyBot mengeksekusi instruksi langkah demi langkah di kanvas 2D.
12. Mendeteksi kondisi sukses (mencapai bintang) atau gagal (menabrak rintangan/keluar arena).
13. Menyediakan tombol reset/retry kapan saja.
14. Berhasil menyelesaikan tantangan dan memicu selebrasi kemenangan.
15. Menerima reward penambahan XP dan lencana.
16. Melanjutkan ke tantangan berikutnya hingga layar ringkasan akhir.
