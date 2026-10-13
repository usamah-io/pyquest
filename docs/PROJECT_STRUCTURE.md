# PyQuest — Project Structure Guide

> **Panduan Struktur Proyek & Peta Navigasi Kode Pengembang**  
> Repositori: `pyquest` | Framework: SvelteKit 3 + Svelte 5 + Tailwind CSS v4 + Bun / Node.js

---

## 1. Peta Direktori Proyek

```
pyquest/
├── src/                               # Kode sumber utama aplikasi
│   ├── app.css                        # Styling global, Tailwind CSS v4 directives, tema & font
│   ├── app.d.ts                       # Deklarasi tipe global SvelteKit
│   ├── app.html                       # HTML Shell: viewport stabil, meta PWA, GSI script
│   ├── engine.test.ts                 # 61 unit tests untuk engine, compiler, kuis, dan auth
│   ├── service-worker.js              # Service Worker: precache shell & offline fallback
│   │
│   ├── lib/                           # Modul pustaka bersama ($lib)
│   │   ├── index.ts                   # Entry point pustaka
│   │   ├── assets/                    # Aset grafis statis yang di-bundle
│   │   │   └── favicon.svg            # Favicon vektor resmi PyQuest
│   │   │
│   │   ├── challenges/                # Bank data level dan arena permainan 2D
│   │   │   ├── challengesData.ts      # Definisi 90 misi arena, grid, rintangan, dan target
│   │   │   └── levelsData.ts          # Katalog 30 tingkat kesulitan Coding Game
│   │   │
│   │   ├── questions/                 # Bank data kuis dan materi Python
│   │   │   ├── learningLevelsData.ts  # Katalog 30 level modul belajar teori & kuis
│   │   │   ├── questionsData.ts       # 150 bank soal kurasi berbagai topik Python
│   │   │   └── quizEvaluator.ts       # Logika evaluasi kuis deterministik & scoring
│   │   │
│   │   ├── game/                      # Inti game engine & compiler balok
│   │   │   ├── compiler.ts            # Parser balok visual ke Python code & perintah atomic
│   │   │   ├── engine.ts              # Simulator 2D grid, collision detector, step executor
│   │   │   └── validator.ts           # Solver BFS untuk validasi solvabilitas 90 level
│   │   │
│   │   ├── stores/                    # Manajemen state reaktif Svelte
│   │   │   ├── authStore.ts           # Autentikasi Google, profil, session cookie
│   │   │   ├── progressStore.ts       # Rekam jejak XP, daily streak, riwayat level
│   │   │   ├── pwaStore.ts            # Status instalasi PWA & konektivitas online/offline
│   │   │   ├── soundStore.ts          # Generator efek suara Web Audio API
│   │   │   └── themeStore.ts          # Pengendali tema Gelap/Terang
│   │   │
│   │   ├── types/                     # Definisi TypeScript domain aplikasi
│   │   │   └── index.ts               # Interface UserProfile, CodingBlock, Challenge, dll.
│   │   │
│   │   ├── utils/                     # Fungsi utilitas pembantu
│   │   │   ├── avatarStorage.ts       # Adapter penyimpanan avatar kustom ke IndexedDB
│   │   │   ├── fullscreen.ts          # Pengendali Fullscreen API untuk mobile landscape
│   │   │   └── googleAuth.ts          # Helper pemuatan Google Identity Services SDK
│   │   │
│   │   └── components/                # Komponen antarmuka Svelte 5 (UI Blocks)
│   │       ├── BlockWorkspace.svelte  # Area docking balok koding Scratch-style
│   │       ├── BottomNav.svelte       # Navigasi bawah mobile pintar (auto-hide saat scroll)
│   │       ├── ChallengeHeader.svelte # Header informasi misi, target, dan petunjuk
│   │       ├── ChallengeSuccessModal.svelte # Modal kemenangan misi Coding Game
│   │       ├── CompletedMissionsView.svelte # Halaman galeri riwayat misi selesai
│   │       ├── FeedbackModal.svelte   # Modal evaluasi jawaban kuis benar/salah
│   │       ├── GameCanvas.svelte      # Kanvas visual arena maze 2D & sprite PyBot
│   │       ├── GoogleAuthModal.svelte # Dialog pop-up masuk dengan akun Google
│   │       ├── Icon.svelte            # Komponen pembungkus ikon ramah anak
│   │       ├── InstallGuideModal.svelte # Panduan instalasi PWA (iOS & Android)
│   │       ├── LandingHero.svelte     # Beranda utama & ringkasan aktivitas siswa
│   │       ├── LearningLevelSelect.svelte # Pemilihan 30 level modul belajar teori
│   │       ├── LearningSuccessModal.svelte # Modal kelulusan level kuis & skor akurasi
│   │       ├── LevelSelect.svelte     # Pemilihan 30 level arena Coding Game
│   │       ├── LoginView.svelte       # Halaman gerbang login Google
│   │       ├── MissionBriefing.svelte # Kartu pengenalan misi sebelum masuk arena
│   │       ├── Navbar.svelte          # Navigasi atas desktop
│   │       ├── OrientationGuard.svelte# Pengingat orientasi layar mendatar (Landscape)
│   │       ├── ProfileSetup.svelte    # Pengaturan nama & avatar pengguna pertama kali
│   │       ├── ProfileView.svelte     # Halaman profil lengkap & statistik belajar
│   │       ├── PwaInstallButton.svelte# Tombol pasang aplikasi PWA
│   │       ├── PyQuestLogo.svelte     # Vektor logo resmi PyQuest
│   │       ├── QuestionCard.svelte    # Tampilan kartu soal kuis, kode, dan pilihan
│   │       ├── Sidebar.svelte         # Menu navigasi samping untuk desktop/tablet
│   │       ├── SplashScreen.svelte    # Layar pembuka animasi PyBot
│   │       ├── StreakView.svelte      # Layar detail streak harian & kalender aktif
│   │       ├── SummaryModal.svelte    # Layar rekapitulasi tamat seluruh permainan
│   │       └── TotalXpView.svelte     # Layar rincian perolehan XP dan level keahlian
│   │
│   └── routes/                        # Arsitektur rute SvelteKit
│       ├── +layout.svelte             # Shell tata letak global (Theme, PWA, Splash)
│       ├── +page.svelte               # Pengendali utama alur SPA (Central State Machine)
│       ├── api/                       # API Endpoints sisi server (SvelteKit server routes)
│       │   └── auth/
│       │       ├── google/+server.ts         # Verifikasi token ID Google via tokeninfo
│       │       ├── callback/google/+server.ts# Handler callback OAuth
│       │       ├── session/+server.ts        # Pengecekan cookie sesi HTTP-only
│       │       └── logout/+server.ts         # Penghapusan cookie sesi
│       ├── dashboard/+page.server.ts  # Redirect 302 ke /?screen=LANDING
│       ├── learning/+page.server.ts   # Redirect 302 ke /?screen=LEARN_SELECT
│       ├── levels/+page.server.ts     # Redirect 302 ke /?screen=LEVEL_SELECT
│       ├── login/+page.server.ts      # Redirect 302 ke /?screen=LOGIN
│       ├── missions/+page.server.ts   # Redirect 302 ke /?screen=MISSIONS
│       ├── profile/
│       │   ├── +page.server.ts        # Redirect 302 ke /?screen=PROFILE
│       │   └── setup/+page.server.ts  # Redirect 302 ke /?screen=PROFILE_SETUP
│       ├── streak/+page.server.ts     # Redirect 302 ke /?screen=STREAK_VIEW
│       └── xp/+page.server.ts         # Redirect 302 ke /?screen=XP_PROGRESS
│
├── static/                            # Aset publik statis tanpa kompilasi
│   ├── apple-touch-icon.png           # Ikon layar utama perangkat Apple iOS
│   ├── favicon.ico / favicon.svg      # Ikon tab browser
│   ├── manifest.json / manifest.webmanifest # Manifest PWA untuk instalasi mobile
│   ├── art/                           # Ilustrasi kartu level dan materi edukasi
│   ├── icons/                         # Ikon aplikasi berbagai ukuran (16px s/d 512px)
│   ├── mascot/                        # Karakter resmi PyBot (idle, waving, front)
│   └── sounds/                        # Cadangan berkas suara
│
├── scripts/                           # Skrip otomasi pengembangan
│   ├── build_icons.py                 # Generator ikon PWA maskable & standard
│   ├── render_maskable.html           # Template pembuatan ikon maskable
│   ├── render_std.html                # Template pembuatan ikon standar
│   └── test_pwa.py                    # Pengujian integritas manifest PWA
│
├── .env.example                       # Contoh variabel lingkungan
├── AI_AGENT_REFERENCE.md              # Pedoman teknis AI Agent PyQuest
├── ARCHITECTURE_SPECIFICATION.md      # Spesifikasi arsitektur awal
├── package.json                       # Konfigurasi dependensi dan skrip proyek
├── tsconfig.json                      # Konfigurasi kompilator TypeScript
└── vite.config.ts                     # Konfigurasi bundler Vite & SvelteKit
```

---

## 2. Panduan Lokasi Modifikasi Fitur Utama

Bagi pengembang yang ingin memperbarui atau memperluas fungsionalitas PyQuest:

| Keperluan Pengembangan | Lokasi Berkas Utama |
|---|---|
| **Menambah / Mengubah Soal Kuis Python** | `src/lib/questions/questionsData.ts` dan `src/lib/questions/learningLevelsData.ts` |
| **Menambah / Menyesuaikan Arena Labirin 2D** | `src/lib/challenges/challengesData.ts` dan `src/lib/challenges/levelsData.ts` |
| **Mengubah Geometri / Tampilan Balok Koding** | `src/lib/components/BlockWorkspace.svelte` dan `src/lib/game/compiler.ts` |
| **Menyesuaikan Logika Fisika / Langkah Robot** | `src/lib/game/engine.ts` |
| **Menyesuaikan Perhitungan XP / Aturan Streak** | `src/lib/stores/progressStore.ts` |
| **Menyesuaikan Alur Autentikasi / Profil Pengguna** | `src/lib/stores/authStore.ts` dan `src/routes/api/auth/google/+server.ts` |
| **Menyesuaikan Efek Suara (Synthesized SFX)** | `src/lib/stores/soundStore.ts` |
| **Menyesuaikan Caching Offline & PWA** | `src/service-worker.js` dan `src/lib/stores/pwaStore.ts` |
| **Menyesuaikan Navigasi Tombol Back Mobile** | `src/routes/+page.svelte` (fungsi `handlePopState` dan `navigateTo`) |
