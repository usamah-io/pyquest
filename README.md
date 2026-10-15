# 🐍 PyQuest — Petualangan Logika Python

> **Belajar logika pemrograman melalui modul interaktif, kuis, dan petualangan coding.**  
> PyQuest adalah website edukasi coding yang dirancang untuk membantu anak-anak, khususnya siswa SD yang baru mengenal pemrograman, belajar Python dasar dengan cara yang lebih menyenangkan dan mudah dipahami. Melalui materi bertahap, kuis interaktif, dan Coding Game berbentuk labirin, pengguna dapat mempelajari konsep logika pemrograman sambil mencoba menyelesaikan berbagai tantangan.

[![Svelte 5](https://img.shields.io/badge/Svelte-5.57.1-orange.svg)](https://svelte.dev/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-3.0.0-red.svg)](https://kit.svelte.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-4.3.3-blue.svg)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.4.2-black.svg)](https://bun.sh/)
[![Tests](https://img.shields.io/badge/Unit%20Tests-66%20Pass%20%7C%206060%20Asserts-brightgreen.svg)](docs/TEST_REPORT.md)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-success.svg)](docs/APPLICATION_FLOWS.md)

---

## 🚀 Fitur Utama

- **Modul Belajar Python** — Mengenal konsep dasar pemrograman secara bertahap (30 level terstruktur).
- **Kuis Interaktif** — Menguji pemahaman melalui pertanyaan dan feedback langsung yang mendidik.
- **Coding Game Labirin** — Menyusun balok perintah untuk mengarahkan robot PyBot menuju tujuan (30 level, 90 misi).
- **Level dan Tantangan** — Berlatih melalui tantangan dengan tingkat kesulitan yang meningkat secara bertahap.
- **Visualisasi Kode** — Menghubungkan susunan balok logika dengan instruksi kode Python nyata secara real-time.
- **Antarmuka Responsif** — Mendukung penggunaan optimal melalui HP, tablet, dan desktop.
- **PWA (Progressive Web App)** — Mendukung pengalaman instalasi aplikasi web dan mode offline sesuai kemampuan browser dan perangkat pengguna.

---

## 🛠️ Teknologi

Teknologi yang digunakan dalam proyek ini meliputi Svelte, SvelteKit, Tailwind CSS, Bun, dan perangkat pendukung pengembangan lainnya. Detail versi serta konfigurasi mengikuti implementasi aktual di repository:

| Komponen | Teknologi | Deskripsi Implementasi |
|---|---|---|
| **Frontend Framework** | [Svelte 5](https://svelte.dev/) & [SvelteKit 3](https://kit.svelte.dev/) | Arsitektur reaktif modern menggunakan Svelte 5 Runes (`$state`, `$derived`, `$props`). |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utilitas styling terkini dengan token desain kontras tinggi dan performa kompilasi instan. |
| **Runtime & Test Runner** | [Bun](https://bun.sh/) & [Node.js](https://nodejs.org/) | Eksekusi cepat untuk pengembangan dan test runner dengan 66 unit tests tervalidasi. |
| **Build Tool** | [Vite](https://vitejs.dev/) | Bundler aset produksi teroptimasi dan kompilasi service worker PWA. |
| **Audio** | Web Audio API | Sintesis efek suara interaktif tanpa file audio eksternal yang membebani jaringan. |
| **PWA & Offline** | Web App Manifest & Service Worker | Precache shell aplikasi dan aset untuk akses penuh tanpa koneksi internet. |

---

## 🏛️ Arsitektur Sistem

Diagram berikut menjelaskan gambaran hubungan pengguna, antarmuka, modul pembelajaran, Coding Game, dan pengelolaan progres PyQuest:

![Diagram Arsitektur Sistem PyQuest](docs/diagrams/pyquest_system_flowchart.png)

### Penjelasan Singkat Komponen Arsitektur:
- **Pengguna / Siswa**: Mengakses aplikasi melalui browser di HP, tablet, atau laptop.
- **Frontend (Svelte 5 - `src/routes/+page.svelte`)**: Menampilkan halaman, navigasi, modul belajar, kuis, dan Coding Game (`GameCanvas.svelte`, `BlockWorkspace.svelte`, `QuestionCard.svelte`, dll).
- **Game Engine & Core Helpers (`src/lib/game/`, `src/lib/questions/`)**:
  - `compiler.ts`: Mengompilasi susunan balok visual (AST) menjadi urutan instruksi atomik.
  - `engine.ts`: Menjalankan simulasi langkah PyBot (frame 380ms), mendeteksi rintangan, mengumpulkan koin, dan memvalidasi target.
  - `validator.ts`: Memvalidasi solvabilitas labirin menggunakan algoritma BFS (Breadth-First Search).
  - `quizEvaluator.ts`: Mengacak dan mengevaluasi jawaban kuis secara deterministik.
- **State Controller & Stores (`src/lib/stores/`)**:
  - `progressStore.ts`: Mengelola XP, riwayat level selesai, streak harian, dan progres belajar terisolasi per akun.
  - `authStore.ts`: Mengelola sesi autentikasi pengguna dan integrasi Google OAuth.
  - `pwaStore.ts`: Mendeteksi mode mandiri (standalone), kesiapan prompt instalasi, dan status jaringan offline.
  - `soundStore.ts`: Pengaturan efek suara Web Audio API.
  - `themeStore.ts`: Standardisasi tema aplikasi dengan kontras tinggi.
- **Penyimpanan Lokal Browser**:
  - `localStorage`: Menyimpan data progres pengguna (`pyquest_progress_v2_{id}`) dan registri akun.
  - `IndexedDB`: Menyimpan foto avatar kustom pengguna.
  - `Cookie`: Pengamanan sesi pengguna.
- **Layanan Eksternal atau API**: Endpoint backend SvelteKit (`src/routes/api/`) digunakan jika diperlukan untuk verifikasi identitas sesi Google OAuth di sisi server.

---

## 📂 Struktur Proyek

Struktur folder membantu pengembang memahami lokasi kode, komponen, konfigurasi, dan dokumentasi.  
Lihat [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) untuk peta direktori proyek beserta penjelasan fungsi setiap bagian.

---

## ⚡ Menjalankan Proyek

### Prasyarat
- Bun (versi $\ge 1.2$, direkomendasikan 1.4+) ATAU Node.js (versi $\ge 20.0$) dengan npm.
- Git.

### Instalasi
```bash
git clone https://github.com/usamah-io/pyquest.git
cd pyquest
bun install
```
*(Atau gunakan `npm install` jika menggunakan Node.js)*

### Menjalankan Mode Pengembangan
```bash
bun run dev
```
*(Atau `npm run dev`)*  
Buka alamat lokal yang ditampilkan oleh terminal (biasanya `http://localhost:5173`).

### Menjalankan Pengujian (Unit Tests)
```bash
bun test
```
*Hasil aktual: **66 pass**, 0 fail, 6060 assertion calls.*

### Production Build & Preview
```bash
bun run build
bun run preview
```

---

## 📚 Dokumentasi

Dokumentasi teknis lengkap proyek PyQuest tersedia pada direktori [`docs/`](docs/):
- 📄 **[PRD PyQuest](docs/PRD.md)** — Kebutuhan produk, tujuan, fitur, dan kriteria penerimaan.
- 🏛️ **[Arsitektur Sistem](docs/ARCHITECTURE.md)** — Komponen, alur data sistem, dan ADR teknis.
- 🗺️ **[Struktur Proyek](docs/PROJECT_STRUCTURE.md)** — Peta direktori dan fungsi file dalam repositori.
- 🔄 **[Alur Aplikasi](docs/APPLICATION_FLOWS.md)** — Alur pengguna, alur bermain, dan navigasi layar.
- 📋 **[Inventaris Fitur](docs/FEATURE_INVENTORY.md)** — Daftar fitur dan status verifikasi implementasinya.
- 🧪 **[Laporan Pengujian](docs/TEST_REPORT.md)** — Hasil pengujian unit test dan validasi performa.
- 🤖 **[Panduan AI Agent](AI_AGENT_REFERENCE.md)** — Aturan dan acuan pengembangan proyek.

---

## 🎯 Tujuan Proyek

PyQuest dikembangkan untuk membuat pembelajaran coding lebih mudah diakses, interaktif, dan menyenangkan bagi pemula. Fokus utamanya adalah membantu pengguna memahami logika pemrograman melalui proses mencoba, melihat hasil, memperbaiki kesalahan, dan menyelesaikan tantangan.

**Repository**: [usamah-io/pyquest](https://github.com/usamah-io/pyquest)