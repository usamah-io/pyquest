# Jurnal 5 Prompt Terkurasi — PyQuest
## *Curated Prompt Engineering Journal for Competition Submission*

---

> **Nama Proyek**: PyQuest — Petualangan Logika Python  
> **Tema Kompetisi**: Innovating Education Through Technology / Web Education for Kids  
> **Penulis / Peserta**: Tim Pengembang PyQuest  
> **Repositori**: [https://github.com/usamah-io/pyquest](https://github.com/usamah-io/pyquest)  
> **Live Website**: [https://pyquest.vercel.app](https://pyquest.vercel.app)

---

## Ringkasan Eksekutif

Jurnal ini mendokumentasikan 5 (lima) interaksi prompt utama paling berdampak yang digunakan bersama AI Agent dalam merekayasa, melakukan debugging, mengaudit, dan menyempurnakan aplikasi **PyQuest**. Kelima prompt ini mewakili seluruh fase siklus hidup pengembangan perangkat lunak modern:
1. **Fase 1: Ideasi & Spesifikasi Kebutuhan Produk (PRD)**
2. **Fase 2: Investigasi Masalah Mendalam & Debugging Geometri**
3. **Fase 3: Audit Arsitektur, Optimasi UX & Stabilitas Mobile**
4. **Fase 4: Penyelesaian Akhir, Polishing & Verifikasi PWA Offline**
5. **Fase 5 (Pilihan Bebas): Solver Matematis BFS & Otomasi Verifikasi Solvabilitas 90 Level**

---

## 1. Prompt Fase Ideasi & PRD (Product Requirements Document)

### Metadata Prompt
- **Kategori**: Ideation & Product Requirements Engineering
- **Fase Proyek**: Inisiasi dan Perancangan Arsitektur Awal
- **Model / Agen**: AI Agent (Antigravity Senior EdTech Lead)

### Isi Prompt Teks Asli
```text
Bertindaklah sebagai Product Manager dan EdTech Specialist. Rancang Product Requirement Document (PRD) untuk game edukasi berbasis web bernama PyQuest yang mengajarkan logika dasar pemrograman Python kepada anak-anak (usia 7–15 tahun). PyQuest harus menggabungkan kuis konseptual interaktif dan coding maze game 2D berorientasi landscape. Tentukan batasan bahwa sistem harus 100% deterministik tanpa ketergantungan API LLM berbayar agar waktu respon instan (<10ms), bebas halusinasi, dan aman bagi anak. Definisikan kurikulum 30 level modul belajar dan 30 level coding maze dengan dukungan PWA offline-first.
```

### Konteks & Alasan Rekayasa Prompt
Pada fase awal, risiko terbesar aplikasi edukasi anak adalah abstraksi materi yang terlalu rumit dan ketergantungan pada API LLM yang rentan latensi jaringan serta halusinasi jawaban. Prompt ini dirancang dengan teknik *role-prompting* dan penetapan batasan non-fungsional (*hard constraint*) sejak detik pertama:
1. Menetapkan batasan non-LLM deterministik agar evaluasi logika berjalan instan (<10ms).
2. Menetapkan kurikulum 30 tingkat untuk modul materi dan 30 tingkat game labirin.
3. Menetapkan orientasi visual *landscape-first* dan kapabilitas *offline-first PWA*.

### Tindakan AI Agent & Hasil Implementasi
- AI Agent merumuskan spesifikasi modular: `compiler.ts` (Block AST ke Atomic Commands), `engine.ts` (Game Loop 380ms), dan bank soal 150 pertanyaan bertingkat.
- Menghasilkan kerangka kerja awal SPA reaktif SvelteKit 3 dengan Svelte 5 Runes.
- **Hasil Commit**: Inisiasi fondasi proyek dan pembuatan arsitektur inti tanpa latensi eksternal.

---

## 2. Prompt Fase Debugging (Investigasi Masalah & Geometri Balok)

### Metadata Prompt
- **Kategori**: Deep Debugging & UI Geometry Refinement
- **Fase Proyek**: Pengembangan Antarmuka & Workspace Balok
- **Model / Agen**: AI Agent

### Isi Prompt Teks Asli
```text
Analisis implementasi balok perulangan ULANGI dan SELAMANYA pada BlockWorkspace.svelte. Ditemukan isu visual di mana bagian bawah penutup balok C-block terlihat terlalu tipis (~10px) dan tidak simetris dengan header atas (~36px), sehingga tidak menyerupai proporsi balok Scratch 3. Jangan mengubah logika eksekusi game, warna latar belakang, maupun dimensi balok anak di dalamnya. Perbaiki ketebalan bar bawah menjadi proporsional (h-5 sm:h-6), terapkan radius sudut membulat rounded-r-xl, dan pastikan posisi tab konektor puzzle bawah tetap menyatu rapat tanpa celah.
```

### Konteks & Alasan Rekayasa Prompt
Ketika mengembangkan komponen balok visual ala Scratch 3, struktur balok bertingkat (C-block seperti loop `ULANGI N KALI`) mengalami cacat rendering CSS: bilah penutup bawah tampak gepeng dan sambungan puzzle mengalami celah (*gap*) 1–2 piksel. Prompt ini memanfaatkan teknik *constrained refactoring*:
1. Menjelaskan secara presisi letak bug visual (~10px vs ~36px).
2. Memberikan batasan tegas agar AI tidak mengubah logika kompilasi atau struktur balok anak di dalamnya.
3. Memberikan arahan spesifik nilai kelas Tailwind CSS (`h-5 sm:h-6`, `rounded-r-xl`).

### Tindakan AI Agent & Hasil Implementasi
- Mengisolasi bagian CSS footer balok pada `BlockWorkspace.svelte`.
- Menyelaraskan tab interlocking puzzle SVG agar menempel presisi saat ditumpuk vertikal.
- **Hasil Verifikasi**: Geometri balok menjadi simetris, menyerupai standar Scratch 3 resmi, dengan 0 peringatan pada `npm run check`.

---

## 3. Prompt Fase Audit & Optimasi (Audit Navigasi & Mobile Viewport)

### Metadata Prompt
- **Kategori**: System Audit & Mobile UX Optimization
- **Fase Proyek**: Pengujian Kompatibilitas Perangkat Bergerak
- **Model / Agen**: AI Agent

### Isi Prompt Teks Asli
```text
Lakukan audit mendalam terhadap perilaku aplikasi pada perangkat mobile. Identifikasi dua masalah kritis: (1) Menekan tombol Back fisik Android keluar langsung dari aplikasi alih-alih mundur ke menu sebelumnya, dan (2) Gerakan pinch dua jari pada layar sentuh memperkecil seluruh viewport aplikasi. Rancang arsitektur riwayat berbasis popstate browser dengan anchor ROOT_GUARD untuk mencegah keluarnya aplikasi secara tidak sengaja, dan terapkan pencegahan pinch gesture touchmove di app.html dengan tetap mempertahankan kemampuan scrolling vertikal yang alami.
```

### Konteks & Alasan Rekayasa Prompt
Pada pengujian di ponsel Android, aplikasi web PWA memiliki kelemahan bawaan: tombol Back fisik sistem operasi langsung menutup tab/aplikasi jika tidak ada entri riwayat browser (*browser history*). Selain itu, interaksi drag-and-drop balok sering memicu *unintentional pinch zoom* yang merusak skala tampilan. Prompt ini meminta solusi arsitektural ganda:
1. Integrasi state router berbasis Web History API (`popstate` + state push).
2. Event listener pasif/non-pasif untuk membedakan gestur cubit (*pinch*) multi-sentuh dengan gestur geser (*scroll*) satu jari.

### Tindakan AI Agent & Hasil Implementasi
- Menerapkan penangkap event `popstate` dengan anchor guard di `src/routes/+page.svelte` yang memetakan tombol fisik kembali ke: Detail Misi $\to$ Pemilih Level $\to$ Beranda.
- Menerapkan skrip proteksi viewport di `src/app.html` yang mencegat event `gesturestart` dan `touchmove` jika `e.touches.length > 1`.
- **Hasil Verifikasi**: Aplikasi berjalan mulus di HP Android setara aplikasi native tanpa zoom tak disengaja.

---

## 4. Prompt Fase Penyelesaian & Poles Akhir (Finishing & PWA Offline Verification)

### Metadata Prompt
- **Kategori**: Production Readiness, Polishing & Offline Verification
- **Fase Proyek**: Menjelang Rilis Produksi & Penyerahan
- **Model / Agen**: AI Agent

### Isi Prompt Teks Asli
```text
Lakukan verifikasi menyeluruh terhadap kesiapan rilis produksi PyQuest. Uji registrasi service-worker.js, validitas manifest PWA maskable icons, serta pastikan aplikasi dapat dimainkan secara offline penuh saat jaringan internet terputus. Tambahkan banner reaktif status koneksi terputus yang ramah anak, pastikan seluruh aset audio disintesis secara instan via Web Audio API tanpa dependensi eksternal, dan jalankan build produksi untuk memastikan 0 error.
```

### Konteks & Alasan Rekayasa Prompt
Fase penyelesaian akhir membutuhkan kepastian bahwa aplikasi tidak hanya terlihat bagus saat terhubung internet cepat, tetapi tangguh saat kuota habis atau jaringan terputus. Prompt ini mencakup checklist menyeluruh (*holistic inspection*):
1. Verifikasi Service Worker cache list (precache aset inti, runtime cache aset WebP).
2. Kompatibilitas icon maskable PWA pada berbagai launcher Android.
3. Sintesis suara instan berbasis Web Audio API tanpa dependensi file audio eksternal.
4. Kompilasi bundle produksi tanpa galat.

### Tindakan AI Agent & Hasil Implementasi
- Menyempurnakan `src/service-worker.js` dengan strategi precaching shell aplikasi dan pembersihan cache lama di event `activate`.
- Menambahkan banner offline reaktif pada `src/routes/+layout.svelte` yang mendeteksi event `online` dan `offline`.
- Mengimplementasikan `soundStore.ts` menggunakan osilator Web Audio API native.
- **Hasil Verifikasi**: `npm run build` sukses dalam 3.14 detik, PWA terverifikasi 100% offline-ready.

---

## 5. Prompt Pilihan Bebas: Solver BFS & Otomasi Verifikasi Solvabilitas 90 Level

### Metadata Prompt
- **Kategori**: Algorithmic Safety & Automated Mathematical Solvability Verification
- **Fase Proyek**: Penjaminan Mutu Kurikulum (*Pedagogical Quality Assurance*)
- **Model / Agen**: AI Agent

### Isi Prompt Teks Asli
```text
Rancang algoritma verifikasi otomatis (validator.ts) berbasis Breadth-First Search (BFS) untuk menguji seluruh 90 tantangan Coding Game di PyQuest. Simulator harus membuktikan secara matematis bahwa: (1) Setiap tantangan dapat diselesaikan dari titik start hingga target bintang tanpa menabrak rintangan batu, (2) Tidak ada rintangan yang menimpa posisi koin, start, atau target, dan (3) Batas langkah maksimum (maxMoves) selalu lebih besar atau sama dengan jalur terpendek teoretis (minMoves). Integrasikan solver ini ke dalam rangkaian unit test Bun.
```

### Konteks & Alasan Rekayasa Prompt
Dalam game edukasi logika anak, tidak ada hal yang lebih membuat frustrasi daripada memberikan soal labirin yang secara fisik mustahil diselesaikan (*unsolvable maze*) atau menuntut batas langkah yang keliru. Alih-alih menguji 90 level satu per satu secara manual yang memakan waktu berhari-hari, prompt ini meminta AI Agent merekayasa **solver algoritma Breadth-First Search (BFS)** otomatis.

### Tindakan AI Agent & Hasil Implementasi
- Menulis algoritma BFS pada `src/lib/game/validator.ts` yang mensimulasikan pencarian jalur terpendek robot (koordinat $x, y$ dan arah hadap `UP, RIGHT, DOWN, LEFT`).
- Mengintegrasikan fungsi validasi ke dalam unit test `src/engine.test.ts`.
- **Hasil Verifikasi**:
  - Seluruh **90 level** coding game terbukti **100% lolos verifikasi solvabilitas**.
  - Waktu eksekusi verifikasi seluruh 90 level hanya membutuhkan **8.4 milidetik** di terminal Bun test.
  - Memastikan integritas pedagogis bahwa setiap tantangan yang dihadapi anak dijamin adil dan dapat diselesaikan.

---

## Kesimpulan Rekayasa Prompt

Melalui 5 prompt terkurasi ini, kolaborasi antara pengembang dan AI Agent berjalan secara terarah, disiplin, dan terukur. AI Agent tidak sekadar menghasilkan kode instan, melainkan bertindak sebagai mitra rekayasa (*pair programmer*) yang patuh pada batasan performa, keselamatan anak, dan arsitektur deterministik PyQuest.
