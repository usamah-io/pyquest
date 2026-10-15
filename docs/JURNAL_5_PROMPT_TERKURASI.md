# JURNAL 5 PROMPT TERKURASI — PYQUEST
## Dokumentasi Rekayasa Prompt untuk Pengajuan Kompetisi Telkomsel

---

**Informasi Proyek:**
- **Nama Proyek:** PyQuest — Petualangan Logika Python
- **Kategori Lomba:** Telkomsel Coding Competition — Web Education for Kids
- **Target Pengguna:** Anak Sekolah Dasar (SD)
- **Tautan Repositori:** https://github.com/usamah-io/pyquest
- **Tautan Aplikasi Live:** https://pyquest.vercel.app

---

### RINGKASAN EKSEKUTIF

Dokumen ini menyajikan 5 (lima) interaksi prompt utama paling berdampak yang digunakan bersama AI Agent dalam merekayasa, melakukan debugging, mengoptimasi, dan memvalidasi aplikasi PyQuest. Kelima prompt ini merepresentasikan siklus hidup pengembangan perangkat lunak (Software Development Life Cycle - SDLC) yang terstruktur:
1. **Fase 1:** Inisiasi, Ideasi & Spesifikasi Kebutuhan Produk (PRD)
2. **Fase 2:** Investigasi Masalah, Analisis Bug & Validasi Logika Labirin
3. **Fase 3:** Optimasi Performa, Keamanan Autentikasi & Arsitektur Serverless
4. **Fase 4:** Penyempurnaan UI/UX, Responsivitas Mobile & Interaksi Balok
5. **Fase 5:** Arsitektur Sistem, Alur End-to-End & Validasi Menyeluruh

---

### 1. PROMPT FASE 1: INISIASI, IDEASI & SPESIFIKASI KEBUTUHAN PRODUK

#### Metadata Prompt
- **Kategori:** Ideation & Product Requirements Engineering
- **Fase Proyek:** Perancangan Arsitektur dan Visi Awal
- **Model / Agen:** AI Agent

#### Isi Teks Asli Prompt
```text
Saya ingin membuat aplikasi edukasi bernama **PyQuest**, "Py" terinspirasi dari Python, sedangkan "Quest" menggambarkan pertanyaan dan tantangan dalam petualangan belajar. Aplikasi ini ditujukan untuk anak SD agar belajar coding lebih menyenangkan dan mudah dipahami.

**Fitur utama:**
- Beranda
- Modul belajar Python
- Kuis interaktif
- Coding Game labirin dengan robot PyBot
- Level, tantangan, dan progres belajar
- Profil pengguna

**Teknologi:**
- Frontend: Svelte
- Backend/runtime: Bun
- Target arsitektur: Serverless
- Deployment: Dokploy

Bantu saya merencanakan struktur aplikasi, alur pengguna, dan kebutuhan fitur PyQuest secara ringkas dan terarah. Periksa proyek yang tersedia sebelum menentukan implementasinya.
```

#### Alasan & Strategi Rekayasa Prompt
Prompt ini dirancang dengan teknik penetapan visi produk dan batasan arsitektural awal:
1. Menetapkan nama, filosofi brand, dan sasaran audiens spesifik (anak SD).
2. Membatasi ruang lingkup pada 6 pilar fitur utama agar pengembangan fokus dan tidak melebar.
3. Menetapkan stack teknologi modern (Svelte, Bun, Serverless) untuk efisiensi eksekusi.
4. Menginstruksikan AI untuk memeriksa struktur yang tersedia sebelum menentukan implementasi demi mencegah duplikasi kode.

#### Tindakan AI Agent & Hasil Implementasi
- AI menyusun blueprint arsitektur SvelteKit dengan struktur modular: `/learn`, `/quiz`, `/maze`, dan `/profile`.
- Menghasilkan kerangka awal 30 level kurikulum logika Python bertahap dan simulator labirin PyBot 2D.
- Menghasilkan inisiasi fondasi kode repositori yang deterministik dan siap dikembangkan.

---

### 2. PROMPT FASE 2: INVESTIGASI MASALAH, ANALISIS BUG & VALIDASI LABIRIN

#### Metadata Prompt
- **Kategori:** Root-Cause Debugging & Engine Stabilization
- **Fase Proyek:** Pengujian dan Stabilisasi Gameplay
- **Model / Agen:** AI Agent

#### Isi Teks Asli Prompt
```text
Lakukan analisis terhadap proyek PyQuest untuk menemukan bug dan masalah implementasi.

Periksa file, komponen, alur fitur, serta bagian Coding Game yang bermasalah. Analisis penyebabnya terlebih dahulu, kemudian lakukan perbaikan yang diperlukan.

Prioritaskan:
- Logika blok kode dan pergerakan PyBot
- Aturan labirin dan penyelesaian level
- Kuis, progres, dan navigasi
- Error serta inkonsistensi antar fitur

Pastikan perubahan tidak merusak fungsi yang sudah berjalan. Jalankan pengujian yang relevan dan laporkan hasilnya.
```

#### Alasan & Strategi Rekayasa Prompt
Prompt ini menerapkan teknik *priority-based auditing* dan *safety constraint*:
1. Menuntut AI melakukan analisis akar masalah (*root-cause analysis*) sebelum mengubah kode.
2. Memprioritaskan integritas logika blok kode dan pergerakan robot PyBot.
3. Memberikan batasan tegas agar perbaikan tidak merusak fitur yang sudah berjalan (*regression protection*).

#### Tindakan AI Agent & Hasil Implementasi
- Mengisolasi inkonsistensi level dan menyinkronkan data antar-komponen.
- Menambahkan proteksi double-counting pada kuis dan evaluator skor (`quizEvaluator.ts`).
- Mengimplementasikan guard riwayat browser (`ROOT_GUARD`) agar tombol Back fisik tidak keluar aplikasi secara tiba-tiba.
- Seluruh 90 tantangan labirin divalidasi solvabilitasnya menggunakan solver otomatis tanpa tabrakan rintangan.

---

### 3. PROMPT FASE 3: OPTIMASI PERFORMA, KEAMANAN & ARSITEKTUR SERVERLESS

#### Metadata Prompt
- **Kategori:** Performance Optimization, Security & Serverless Readiness
- **Fase Proyek:** Peningkatan Kualitas Produksi & Keamanan
- **Model / Agen:** AI Agent

#### Isi Teks Asli Prompt
```text
Optimalkan performa dan kualitas teknis PyQuest agar aplikasi lebih cepat, stabil, dan aman.

Fokus pada:
- Optimasi loading dan ukuran bundle
- Efisiensi kode dan pengelolaan data
- Integrasi autentikasi Google
- Keamanan API dan penyimpanan data
- Kompatibilitas serverless dengan Vercel
- Konfigurasi PWA

Periksa implementasi yang ada, lakukan optimasi berdasarkan temuan, lalu uji perubahan. Jangan mengklaim autentikasi atau serverless berhasil sebelum benar-benar terverifikasi.
```

#### Alasan & Strategi Rekayasa Prompt
Prompt ini berfokus pada efisiensi teknis dan integritas verifikasi:
1. Menetapkan 6 area fokus audit performa (bundle size, serverless, Google OAuth, PWA).
2. Memuat aturan integritas (*anti-hallucination constraint*): melarang AI mengklaim keberhasilan sebelum diverifikasi lewat pengujian terminal.
3. Menjaga kerahasiaan kredensial autentikasi agar tidak bocor ke bundle frontend.

#### Tindakan AI Agent & Hasil Implementasi
- Mengonfigurasi `@sveltejs/adapter-vercel` untuk kompilasi edge serverless yang mulus.
- Memisahkan secret server dengan public client ID pada autentikasi Google Identity Services.
- Menghasilkan build produksi cepat (~3-4 detik) dengan bundle terkompresi optimal.
- Memperkuat konfigurasi service worker untuk kapabilitas PWA offline-ready.

---

### 4. PROMPT FASE 4: PENYEMPURNAAN UI/UX, RESPONSIVITAS & INTERAKSI BALOK

#### Metadata Prompt
- **Kategori:** Human-Computer Interaction (HCI) & Mobile UX Optimization
- **Fase Proyek:** Penyesuaian Antarmuka Pengguna Ramah Anak
- **Model / Agen:** AI Agent

#### Isi Teks Asli Prompt
```text
Sempurnakan UI/UX PyQuest agar lebih nyaman, responsif, dan mudah digunakan oleh anak SD.

Fokus pada:
- Penyempurnaan layout desktop dan mobile
- Navigasi yang muncul saat pengguna scroll ke atas dan menghilang saat scroll ke bawah
- Tampilan Coding Game dan blok kode
- Konsistensi tema gelap dan terang
- Integrasi serta pengalaman penggunaan PWA
- Loading, feedback, dan interaksi pengguna

Pertahankan identitas PyBot, gunakan desain tanpa gradient, dan hindari redesign besar yang tidak diperlukan. Pastikan semua perubahan berfungsi pada perangkat yang berbeda.
```

#### Alasan & Strategi Rekayasa Prompt
Prompt ini dirancang dengan pendekatan *user-centered design*:
1. Menyesuaikan ergonomi interaksi bagi anak SD (tampilan bersih, tombol jelas, interaksi intuitif).
2. Meminta implementasi navigasi cerdas (*auto-hide navbar*) untuk memaksimalkan ruang vertikal layar HP.
3. Menetapkan batasan visual tegas: tanpa gradien warna yang berlebihan, mempertahankan maskot PyBot, dan mencegah redesign layout yang tidak perlu.

#### Tindakan AI Agent & Hasil Implementasi
- Mengimplementasikan sistem navigasi auto-hide yang responsif terhadap arah scroll pengguna.
- Memperbaiki proporsi balok interlocking (MAJU, BELOK, ULANGI) agar menyerupai standar Scratch 3 tanpa celah tampilan.
- Menetapkan kontras warna solid dengan standar keterbacaan tinggi yang nyaman bagi mata anak di perangkat seluler maupun desktop.

---

### 5. PROMPT FASE 5: ARSITEKTUR SISTEM, FLOWCHART & VALIDASI MENYELURUH

#### Metadata Prompt
- **Kategori:** Systems Architecture & Comprehensive Verification
- **Fase Proyek:** Dokumentasi Sistem & Verifikasi Akhir
- **Model / Agen:** AI Agent

#### Isi Teks Asli Prompt
```text
Periksa keseluruhan proyek PyQuest dan buat **flowchart sistem** yang menggambarkan cara kerja aplikasi secara menyeluruh.

Flowchart harus mencakup:
- Alur pengguna dari beranda hingga fitur utama
- Alur modul belajar dan kuis
- Alur Coding Game, eksekusi blok, dan penyelesaian level
- Alur autentikasi Google
- Alur penyimpanan progres pengguna
- Hubungan frontend, backend, API, dan penyimpanan data
- Alur deployment sesuai arsitektur yang digunakan

Gunakan struktur flowchart yang jelas, ringkas, dan mudah dipahami. Sesuaikan diagram dengan implementasi aktual, bedakan fitur yang belum tersedia, dan jangan mengasumsikan alur yang belum terverifikasi. Sertakan penjelasan singkat untuk setiap bagian.
```

#### Alasan & Strategi Rekayasa Prompt
Prompt ini berfokus pada pemetaan arsitektural menyeluruh dan dokumentasi berbasis fakta:
1. Menuntut AI meninjau seluruh repositori untuk memetakan alur end-to-end tanpa mengasumsikan komponen fiktif.
2. Membedakan secara transparan antara fitur yang sudah terverifikasi dan fitur roadmap.
3. Menghubungkan 7 dimensi sistem: autentikasi, game loop, evaluasi kuis, compiler balok, state management, API, dan deployment.

#### Tindakan AI Agent & Hasil Implementasi
- Menghasilkan diagram alur data menyeluruh dari client (Svelte), AST compiler (`compiler.ts`), game loop (`engine.ts`), hingga storage lokal dan verifikasi server.
- Menyusun matriks verifikasi fitur aktual yang transparan dan dapat dibuktikan melalui source code.
- Memastikan seluruh dokumentasi proyek sinkron 100% dengan kondisi rilis produksi PyQuest.

---

### KESIMPULAN REKAYASA PROMPT

Penerapan 5 prompt terkurasi ini menunjukkan bahwa interaksi manusia dan AI dalam pengembangan PyQuest berlangsung secara metodis, terukur, dan disiplin. Dengan menetapkan batasan arsitektur sejak awal, menuntut audit akar masalah sebelum perbaikan, dan mewajibkan verifikasi empiris di terminal, proyek berhasil diselesaikan dengan standar kode yang bersih, stabil, dan ramah anak.
