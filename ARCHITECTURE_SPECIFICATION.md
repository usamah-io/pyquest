# PyQuest — Software & System Architecture Specification

> **Judul Diagram:** PyQuest — System Architecture & Data Flow  
> **Subjudul:** Full-stack interactive Python learning game  
> **Fokus Utama:** Hubungan teknis antarkomponen perangkat lunak, pemisahan *Client-Side vs Server-Side*, deterministik non-LLM engine, dan strategi performa gameplay.

---

## Berkas Diagram

1. **Interactive Viewer & Print / PDF Ready**: [`pyquest_system_architecture.html`](file:///c:/Users/ASUS/Desktop/pyquest/pyquest_system_architecture.html)
2. **Standalone Vector SVG (Resolusi Tinggi 16:9 Landscape)**: [`pyquest_system_architecture.svg`](file:///c:/Users/ASUS/Desktop/pyquest/pyquest_system_architecture.svg)

---

## 1. Client-Side Architecture (Sisi Klien)

Frontend PyQuest dibangun menggunakan **Svelte / SvelteKit** yang beroperasi secara reaktif tanpa beban *virtual DOM overhead*, memastikan pemuatan instan pada laptop, tablet, dan smartphone (Landscape-First).

Sisi Klien dikelompokkan secara terstruktur menjadi:
- **Learning UI Subsystem**:
  - `Question Interface`: Menampilkan soal Python, pertanyaan konseptual, dan syntax highlighter.
  - `Answer Options`: Pilihan ganda, penyusunan urutan kode (*Code Ordering*), atau input *Predict Output*.
  - `Explanation Panel`: Modal/kartu penjelasan materi ramah pemula yang muncul setelah menjawab.
  - `Hint System UI`: Tombol bantuan bertingkat (*Tiered Hints 1, 2, 3*) yang membuka petunjuk progresif.
- **Coding UI Subsystem**:
  - `Block Palette`: Kumpulan balok perintah visual (`MOVE`, `TURN_LEFT`, `TURN_RIGHT`, `REPEAT(N)`).
  - `Code Workspace`: Area docking drag-and-drop dengan *magnetic snap* tempat anak menyusun balok.
  - `Run & Reset Action`: Tombol pemicu kompilasi balok dan tombol reset arena.
- **Game UI Subsystem**:
  - `Game Board / Grid`: Kanvas ubin 2D (Tile Map) yang menampilkan target koin, dinding, dan rintangan.
  - `Character Actor`: Sprite karakter dinamis yang bergerak dan berotasi sesuai instruksi.
  - `Game Feedback Overlay`: Banner hasil simulasi (*Success*, *Failure*, *Retry*).
- **Progress UI (Gamification HUD)**:
  - Indikator bilah XP, skor akurasi, tingkat Level, dan icon *Streak* harian (🔥).
- **Client Reactive Stores (Svelte Stores)**:
  - `questStore`, `workspaceStore`, dan `progressStore` sebagai *Single Source of Truth* lokal.
  - Didukung **IndexedDB Storage Adapter** untuk menyimpan level dan progres secara *offline-first* (PWA-ready).

---

## 2. Game Engine & Block Compiler Layer

Untuk menjaga responsivitas gameplay sub-10ms tanpa lag jaringan, eksekusi game **100% berjalan di Sisi Klien**:
1. **Coding Block UI** → Pengguna menyusun blok visual pada workspace.
2. **Block Parser / Compiler Layer**:
   - Memvalidasi pohon sintaks blok (*AST Validation*).
   - Mendeteksi *infinite loop* atau parameter yang kosong sebelum eksekusi dijalankan.
   - Mengompilasi blok iterasi (`REPEAT`) menjadi instruksi atomic diskrit.
3. **Command List** → Menghasilkan array instruksi in-memory sederhana, contoh: `['MOVE', 'MOVE', 'TURN_RIGHT', 'MOVE']`.
4. **Game Engine (2D Grid Runtime)**:
   - Menjalankan loop eksekusi berbasis *tick timer* visual (~350ms per aksi) dengan *highlight* balok yang sedang aktif.
   - Mengelola koordinat $(x, y)$, orientasi arah hadap (Utara, Timur, Selatan, Barat).
   - **Collision & Rule Checker**: Mengecek tabrakan tembok, lubang/rintangan (*obstacle*), dan batas peta grid (*out-of-bounds*).
5. **Game State Machine**:
   - `SUCCESS STATE`: Karakter berhasil menggapai seluruh titik target koin / bendera.
   - `FAILURE STATE`: Karakter menabrak rintangan atau jatuh dari grid.
   - `INCOMPLETE STATE`: Rangkaian perintah habis sebelum target tercapai.
   - Memancarkan hasil ke *Progress System* dan *Feedback Engine*.

---

## 3. Question & Feedback System (Deterministic & Non-LLM)

PyQuest dirancang agar **100% mandiri tanpa ketergantungan API LLM berbayar** (Gemini/OpenAI/Claude):
- **Question Engine**:
  - Mengelola kurasi tipe soal: *Multiple Choice*, *Predict Output*, *True/False*, *Code Ordering*, dan *Code Completion*.
  - Menyesuaikan tingkat kesulitan (*Adaptive Difficulty*) secara deterministik: Level 1 (Sintaks & Variabel), Level 2 (Percabangan `if-else`), Level 3 (Perulangan `for`/`while`).
  - Melakukan validasi jawaban kanonikal tanpa interpreter eksternal.
- **Feedback Engine (Rule-Based)**:
  - **Misconception Detection Table**: Mendeteksi pola kesalahan spesifik pemula (seperti kerancuan assignment `=` dengan equality `==`, atau indeks array Python yang berbasis 0).
  - **Progressive Hint Ladder**:
    - *Hint Level 1*: Petunjuk logika dasar tanpa membuka jawaban.
    - *Hint Level 2*: Panduan struktur sintaksis yang benar.
    - *Hint Level 3*: Contoh kode analogi serupa untuk membantu anak menyelesaikan tantangan.
  - **Kelebihan**: Bebas halusinasi (*zero hallucination*), aman bagi anak, waktu respon instan (<5ms), dan tanpa biaya operasional token API.

---

## 4. Backend Architecture (Bun Server)

Backend berfungsi menangani persistensi data, integritas skor, dan pengiriman katalog materi tanpa membebani interaksi game real-time:
- **Runtime**: **Bun** (lingkungan server TypeScript berperforma tinggi dan konsumsi memori hemat).
- **API Endpoints**:
  - `GET /api/v1/quests/next`: Pengambilan soal & konfigurasi grid tantangan berikutnya.
  - `POST /api/v1/answers/validate`: Validasi jawaban server-side untuk memastikan integritas sesi.
  - `POST /api/v1/progress/sync`: Sinkronisasi batch XP, streak, dan log level selesai.
- **Server Responsibilities**:
  - Validasi schema payload dengan library Zod.
  - Rate limiting untuk mencegah brute-force.
  - Memverifikasi perhitungan XP agar tidak dimanipulasi dari sisi klien (*Anti-cheat scoring*).
  - Manajemen sesi pengguna (Anonymous Guest Token / Profil Akun).

---

## 5. Data Layer & Storage

Menggunakan model data terstruktur di atas **Database / Persistent Storage** generik:

### Skema Entitas Utama:
1. **Question Data**:
   - `id`: UUID / string
   - `topic`: Kategori materi (misal: "Variabel", "Looping")
   - `type`: Tipe pertanyaan (*MultipleChoice*, *PredictOutput*, dll.)
   - `question`: Teks pertanyaan materi
   - `options`: Daftar opsi pilihan
   - `correctAnswer`: Kunci jawaban kanonikal
   - `explanation`: Teks penjelasan lengkap
   - `hints`: Array petunjuk bertingkat
   - `difficulty`: Skala 1 - 3
2. **Challenge Data**:
   - `id`: UUID / string
   - `title`: Judul tantangan game
   - `objective`: Target misi yang harus diselesaikan
   - `gridLayout`: Matriks ubin 2D arena game
   - `availableBlocks`: Daftar blok yang diizinkan untuk digunakan
   - `solution`: Rangkaian urutan solusi optimal
   - `hints`: Petunjuk blok
   - `reward`: Objek perolehan `{ xp, badge }`
3. **Progress Data**:
   - `userId`: Pengenal unik pemain
   - `XP`: Total poin pengalaman
   - `score`: Akumulasi skor akurasi
   - `level`: Tingkat kemahiran saat ini
   - `streak`: Jumlah hari aktif berturut-turut
   - `completedChallenges`: Array ID tantangan yang telah diselesaikan
   - `badges`: Lencana penghargaan yang telah terbuka
   - `lastActive`: Timestamp aktivitas terakhir

---

## 6. Progress & Reward System

- **Reward Calculation**:
  - Soal dijawab benar: $+10\text{ XP}$.
  - Tantangan koding blok berhasil diselesaikan: $+25\text{ XP}$.
  - Bonus percobaan pertama: $+5\text{ XP}$.
- **Gamifikasi Edukatif**:
  - Penghargaan lencana (*Badge Unlock*): "First Script", "Loop Master", "Bug Squasher".
  - *Daily Streak Counter*: Memicu kebiasaan belajar harian yang konsisten.
- **Alur Sinkronisasi**:
  Kalkulasi dilakukan secara optimistik di sisi klien terlebih dahulu untuk UX instan, lalu dikirim via `POST /api/v1/progress/sync` ke server untuk dicatat secara permanen di database.

---

## 7. Performance Strategy

1. **Client-Side Game Isolation**: Interaksi kuis dan pergerakan blok koding sama sekali tidak bergantung pada koneksi internet setelah modul level dimuat.
2. **Minimal Bundle Size**: Pemanfaatan Svelte mengompilasi kode ke vanilla JavaScript murni tanpa runtime framework yang berat.
3. **Asset Lazy-Loading**: Suara efek audio (SFX), sprite partikel, dan animasi perayaan dimuat secara *on-demand*.
4. **Offline Capability (PWA)**: IndexedDB menyimpan state level sehingga anak-anak di daerah dengan sinyal internet tidak stabil tetap dapat bermain.
5. **60 FPS Animation Engine**: Menggunakan transisi native Svelte (`svelte/motion`, `svelte/transition`) yang dioptimalkan dengan CSS GPU acceleration dan `requestAnimationFrame`.

---

## 8. Deployment & Security Boundary

- **Hosting Svelte Frontend**: Diarahkan ke platform **Vercel** dengan arsitektur Edge SSR dan CDN Anycast global untuk pengiriman aset instan ke berbagai perangkat.
- **Hosting Backend**: Berjalan pada Bun VPS Container / Vercel Serverless Function yang terisolasi.
- **Security Boundary**:
  - **Zero Client Secrets**: Kunci otentikasi internal dan environment variables hanya disimpan pada sisi server.
  - Komunikasi antara klien dan server diamankan melalui protokol HTTPS/TLS dan pembatasan CORS yang ketat.
