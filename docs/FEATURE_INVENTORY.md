# PyQuest — Feature Inventory & Verification Matrix

> **Daftar Inventaris Fitur Lengkap, Status Kesiapan, Berkas Sumber, dan Bukti Verifikasi**  
> Repositori: `pyquest` | Seluruh entri diaudit langsung berdasarkan implementasi aktual di kode sumber.

---

## 1. Modul Autentikasi & Profil Pengguna

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **AUTH-01** | Google Sign-In (GSI) | Masuk aman menggunakan akun Google resmi tanpa kata sandi manual | **PASS** | `src/lib/components/LoginView.svelte`<br/>`src/routes/api/auth/google/+server.ts` | 6 unit tests auth lolos di `src/engine.test.ts`, verifikasi aud token Google via Google API. |
| **AUTH-02** | HTTP-Only Session Cookie | Penyimpanan token sesi aman dari serangan XSS | **PASS** | `src/routes/api/auth/session/+server.ts`<br/>`src/routes/api/auth/logout/+server.ts` | Cookie `pyquest_session` disetel dengan flag `httpOnly`, `sameSite=lax`, `maxAge=30 hari`. |
| **AUTH-03** | Profile Setup Onboarding | Membimbing siswa baru memilih nama panggilan & avatar ramah anak | **PASS** | `src/lib/components/ProfileSetup.svelte`<br/>`src/lib/stores/authStore.ts` | Terverifikasi via `completeProfileSetup()` test case di `src/engine.test.ts`. |
| **AUTH-04** | Penyuntingan Profil | Mengubah nama tampilan dan avatar dari halaman Profil | **PASS** | `src/lib/components/ProfileView.svelte`<br/>`src/lib/stores/authStore.ts` | Teruji via `updateProfile()` test case di `src/engine.test.ts`. |
| **AUTH-05** | Penyimpanan Avatar IndexedDB | Menyimpan foto avatar kustom berukuran besar tanpa membebani localStorage | **PASS** | `src/lib/utils/avatarStorage.ts` | Object store `avatars` di database `pyquest_db`. |
| **AUTH-06** | Multi-Account Isolation | Isolasi total progres belajar antar-akun berbeda di perangkat yang sama | **PASS** | `src/lib/stores/progressStore.ts`<br/>`src/lib/stores/authStore.ts` | Teruji di `src/engine.test.ts` (test case multi-account isolation). |

---

## 2. Modul Belajar Teori Python & Kuis Interaktif

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **LRN-01** | Kurikulum 30 Level Python | Struktur materi terorganisir dari variabel, percabangan, hingga loop | **PASS** | `src/lib/questions/learningLevelsData.ts` | Teruji 30 level lengkap di `src/engine.test.ts`. |
| **LRN-02** | Bank 150 Soal Python | Bank soal kurasi tanpa duplikasi pilihan jawaban dan topik beragam | **PASS** | `src/lib/questions/questionsData.ts` | Teruji 150 soal valid dengan minimal 4 opsi dan metadata lengkap di `src/engine.test.ts`. |
| **LRN-03** | Cakupan 17 Topik Python | Mencakup `print()`, tipe data, operator, `if/else/elif`, `for/while`, `range()` | **PASS** | `src/lib/questions/questionsData.ts` | Terverifikasi pada unit test topik Python di `src/engine.test.ts`. |
| **LRN-04** | Petunjuk Bertingkat (*Tiered Hints*) | Bantuan bertahap tanpa membocorkan jawaban langsung | **PASS** | `src/lib/components/QuestionCard.svelte` | Teruji pada assertion petunjuk pedagogis di `src/engine.test.ts`. |
| **LRN-05** | Pengacakan Opsi Pilihan | Mengacak posisi opsi jawaban tanpa merusak ID kunci jawaban | **PASS** | `src/lib/questions/questionsData.ts` | Fungsi `shuffleArray()` teruji di `src/engine.test.ts`. |
| **LRN-06** | Evaluator Kuis Deterministik | Menilai jawaban instan di memori browser dengan proteksi klik ganda | **PASS** | `src/lib/questions/quizEvaluator.ts` | 6 unit tests scoring kuis lolos di `src/engine.test.ts`. |
| **LRN-07** | Kartu Penjelasan Konsep | Umpan balik edukatif yang langsung muncul setelah menjawab | **PASS** | `src/lib/components/FeedbackModal.svelte` | Komponen aktif pada alur layar `FEEDBACK`. |
| **LRN-08** | Modal Kelulusan Level Kuis | Menampilkan skor kelulusan, persentase nilai, dan lencana kelulusan | **PASS** | `src/lib/components/LearningSuccessModal.svelte` | Terintegrasi dengan kalkulasi kelulusan di `+page.svelte`. |

---

## 3. Sistem Coding Game & Balok Visual Scratch-Style

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **GAME-01** | 30 Level Permainan (90 Misi) | Setiap level memiliki 3 misi tantangan bergradasi | **PASS** | `src/lib/challenges/challengesData.ts`<br/>`src/lib/challenges/levelsData.ts` | Teruji 90 misi lengkap di `src/engine.test.ts`. |
| **GAME-02** | Taklimat Misi (*Mission Briefing*) | Penjelasan target objektif sebelum memasuki arena permainan | **PASS** | `src/lib/components/MissionBriefing.svelte` | Layar `MISSION_BRIEFING` di `+page.svelte`. |
| **GAME-03** | Balok Instruksi Scratch-Style | Balok aksi `MAJU`, `BELOK KIRI`, `BELOK KANAN` dengan sudut membulat | **PASS** | `src/lib/components/BlockWorkspace.svelte` | Commit `10086d4`, `2ad551e`, dan unit test balok. |
| **GAME-04** | Balok Kontrol C-Block (`ULANGI`) | Balok iterasi perulangan $N$-kali dengan slot anak bersarang | **PASS** | `src/lib/components/BlockWorkspace.svelte` | Commit `14d078e` (foot bar tebal simetris Scratch 3). |
| **GAME-05** | Balok Kontrol C-Block (`SELAMANYA`) | Balok infinite loop `while True:` dengan proteksi batas aksi | **PASS** | `src/lib/components/BlockWorkspace.svelte`<br/>`src/lib/game/compiler.ts` | Unit test anti-infinite loop & cap 150 langkah di `src/engine.test.ts`. |
| **GAME-06** | Generator Kode Python Real-time | Mengonversi susunan balok ke kode Python asli secara otomatis | **PASS** | `src/lib/game/compiler.ts` | Fungsi `blocksToPythonCode()` teruji di `src/engine.test.ts`. |
| **GAME-07** | Drag-and-Drop & Magnetic Snap | Penyusunan balok interaktif sentuh/kursor dengan slot puzzle | **PASS** | `src/lib/components/BlockWorkspace.svelte` | Handler pointer interaktif di `BlockWorkspace.svelte`. |
| **GAME-08** | Reset Posisi Tanpa Menghapus Balok | Mengembalikan robot ke titik awal tanpa menghapus susunan kode anak | **PASS** | `src/routes/+page.svelte` | Fungsi `resetRobotPosition()` teruji di `+page.svelte`. |

---

## 4. Simulator Arena 2D Labirin & Validasi Logika

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **SIM-01** | Kanvas Arena Grid 2D | Visualisasi ubin arena, koordinat, rintangan batu, dan koin | **PASS** | `src/lib/components/GameCanvas.svelte` | Komponen visual canvas di `GameCanvas.svelte`. |
| **SIM-02** | Animasi Robot PyBot Bertahap | Langkah robot bergerak mulus dengan interval tick 380ms | **PASS** | `src/routes/+page.svelte`<br/>`src/lib/game/engine.ts` | Simulation loop `setInterval` dengan pemutaran SFX langkah. |
| **SIM-03** | Deteksi Tabrakan Rintangan | Menghentikan simulasi saat menabrak batu dengan status `FAILED` | **PASS** | `src/lib/game/engine.ts` | Teruji pada Test Case 3 di `src/engine.test.ts`. |
| **SIM-04** | Deteksi Keluar Batas (*Out-of-Bounds*) | Menghentikan simulasi saat robot keluar dari batas grid | **PASS** | `src/lib/game/engine.ts` | Teruji pada Test Case 4 di `src/engine.test.ts`. |
| **SIM-05** | Pengambilan Koin & Target Bintang | Mengoleksi koin di jalur langkah dan mengecek pencapaian target | **PASS** | `src/lib/game/engine.ts` | Teruji pada Test Case 1 & 2 di `src/engine.test.ts`. |
| **SIM-06** | Batasan Gerakan (*Max Moves Energy*) | Batasan jumlah langkah `MAJU` tanpa membatasi jumlah putaran arah | **PASS** | `src/lib/game/engine.ts` | Teruji pada Test Case Level 5 di `src/engine.test.ts`. |
| **SIM-07** | Validator Solvabilitas BFS | Memverifikasi seluruh 90 tantangan 100% memiliki solusi yang dapat dicapai | **PASS** | `src/lib/game/validator.ts` | Fungsi `validateAllChallenges()` teruji lolos di `src/engine.test.ts`. |

---

## 5. Sistem Gamifikasi (XP, Streak, Level, Lencana)

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **GAM-01** | Perolehan XP Transparan | Poin pengalaman dari soal kuis (+15 XP) dan misi tantangan (+20–50 XP) | **PASS** | `src/lib/stores/progressStore.ts` | Assertion XP reward teruji di `src/engine.test.ts`. |
| **GAM-02** | Proteksi Anti-Duplikasi XP | Mencegah penambahan XP berganda saat mengulang level yang sudah tamat | **PASS** | `src/lib/stores/progressStore.ts` | Teruji pada Test Case 10 di `src/engine.test.ts`. |
| **GAM-03** | Bonus Lencana Tamat Level | Memberikan bonus XP pencapaian saat seluruh 3 misi dalam 1 level selesai | **PASS** | `src/lib/stores/progressStore.ts` | Teruji pada assertion level achievement di `src/engine.test.ts`. |
| **GAM-04** | Daily Streak Kalender Nyata | Pelacakan kebiasaan belajar harian berbasis tanggal `YYYY-MM-DD` | **PASS** | `src/lib/stores/progressStore.ts` | Fungsi `recordActivity()` dan `evaluateStreakExpiry()`. |
| **GAM-05** | Layar Rincian XP & Streak | Halaman detail statistik perkembangan belajar anak | **PASS** | `src/lib/components/TotalXpView.svelte`<br/>`src/lib/components/StreakView.svelte` | Layar `XP_PROGRESS` dan `STREAK_VIEW` di `+page.svelte`. |
| **GAM-06** | Galeri Riwayat Misi Selesai | Rekap seluruh tantangan dan kuis yang berhasil dituntaskan | **PASS** | `src/lib/components/CompletedMissionsView.svelte` | Layar `MISSIONS` di `+page.svelte`. |

---

## 6. Aksesibilitas, UX & Navigasi Mobile Pintar

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **UX-01** | Orientasi Landscape-First | Perlindungan orientasi otomatis dengan pesan pemandu putar layar | **PASS** | `src/lib/components/OrientationGuard.svelte` | Komponen `OrientationGuard.svelte` aktif di arena game. |
| **UX-02** | Navigasi Bawah Auto-Hide | Bilah navigasi mobile menyembunyikan diri saat scroll ke bawah | **PASS** | `src/lib/components/BottomNav.svelte`<br/>`src/routes/+page.svelte` | Handler `handleMainScroll` di `+page.svelte`. |
| **UX-03** | Intersepsi Tombol Back Fisik | Tombol back Android menutup modal atau mundur ke menu induk tanpa keluar | **PASS** | `src/routes/+page.svelte` | Handler `handlePopState` di `+page.svelte`. |
| **UX-04** | Layar Pembuka (*Splash Screen*) | Animasi robot PyBot saat pertama kali aplikasi dibuka | **PASS** | `src/lib/components/SplashScreen.svelte` | Komponen splash screen di `+layout.svelte`. |
| **UX-05** | Stabilisasi Viewport Mobile | Mencegah pinch-zoom tak sengaja yang merusak layout layar | **PASS** | `src/app.html` | Script pencegah pinch gesture multi-touch di `src/app.html`. |

---

## 7. Progressive Web App (PWA) & Operasi Offline

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **PWA-01** | Service Worker Precache | Meng-cache shell aplikasi, favicon, maskot WebP, dan bundle JS | **PASS** | `src/service-worker.js` | Berhasil di-bundle dalam `npm run build` (output 7.7 kB). |
| **PWA-02** | Manifest Web App Lengkap | File manifest dengan ikon standar dan maskable (16px–512px) | **PASS** | `static/manifest.webmanifest`<br/>`static/manifest.json` | Teruji via skrip `scripts/test_pwa.py`. |
| **PWA-03** | Deteksi Offline Reaktif | Menampilkan banner peringatan koneksi terputus secara otomatis | **PASS** | `src/lib/stores/pwaStore.ts`<br/>`src/routes/+layout.svelte` | Reactive banner di `+layout.svelte`. |
| **PWA-04** | Dialog Panduan Pasang PWA | Panduan instalasi ramah anak untuk Android Chrome & iOS Safari | **PASS** | `src/lib/components/InstallGuideModal.svelte`<br/>`src/lib/components/PwaInstallButton.svelte` | Terintegrasi dengan event `beforeinstallprompt`. |

---

## 8. Manajemen Tema & Efek Suara Web Audio

| ID | Nama Fitur | Deskripsi & Tujuan | Status | Berkas Sumber | Bukti Verifikasi |
|---|---|---|---|---|---|
| **SYS-01** | Tema Gelap / Terang | Pengendali tema persisten dengan sinkronisasi ke meta theme-color | **PASS** | `src/lib/stores/themeStore.ts`<br/>`src/app.html` | Atribut `data-theme` dan script pencegah flash di `app.html`. |
| **SYS-02** | Efek Suara Web Audio Sintetis | Suara klik, benar, salah, robot melangkah, dan koin via osilator web audio | **PASS** | `src/lib/stores/soundStore.ts` | 7 generator nada audio sintesis instan tanpa beban file eksternal. |
