# Product Requirements Document (PRD) — PyQuest

> **Nama Produk**: PyQuest — Petualangan Logika Python  
> **Kategori**: EdTech / Web-Based Educational Game  
> **Target Pengguna**: Siswa SD & SMP (Usia 7–15 tahun), Guru, dan Orang Tua  
> **Tema Kompetisi**: Innovating Education Through Technology / Web Education for Kids  
> **Repositori**: [https://github.com/usamah-io/pyquest](https://github.com/usamah-io/pyquest)

---

## 1. Visi & Tujuan Produk

### 1.1 Visi
Menjadikan pembelajaran logika dasar pemrograman Python mudah diakses, interaktif, dan menyenangkan bagi pemula melalui perpaduan kuis konseptual terstruktur dan Coding Game labirin 2D.

### 1.2 Masalah yang Diselesaikan (*Problem Statement*)
1. **Abstraksi Berlebihan pada Pemula**: Siswa usia sekolah dasar sering mengalami kebingungan (*syntax anxiety*) ketika langsung dihadapkan pada terminal hitam putih dan sintaks teks kaku.
2. **Ketergantungan Eksternal & Halusinasi AI**: Banyak platform coding anak mengandalkan API LLM daring yang lambat, rentan berhalusinasi jawaban, dan membutuhkan biaya langganan.
3. **Keterbatasan Konektivitas**: Sekolah di berbagai daerah sering mengalami kendala kestabilan internet saat sesi belajar coding di lab komputer atau gawai pribadi siswa.

### 1.3 Nilai Unik (*Value Proposition*)
- **100% Deterministik Tanpa Biaya API**: Seluruh validasi kode, kompilasi balok, dan simulasi labirin dieksekusi instan (<10ms) di sisi klien tanpa model AI eksternal.
- **Jembatan Visual ke Teks Nyata**: Balok visual (Scratch-like) langsung memproduksi kode Python murni secara *live*, membantu anak memahami hubungan antara balok logika dan sintaks kode nyata.
- **Offline-First PWA**: Dilengkapi Web App Manifest dan Service Worker agar aplikasi dapat dipasang di desktop, tablet, maupun ponsel dan dimainkan tanpa kuota internet.

---

## 2. Profil Pengguna (*Target Personas*)

1. **Siswa Pemula (Usia 7–12 Tahun - SD)**:
   - *Karakteristik*: Suka visual kartun warna-warni, butuh panduan bertahap, menyukai tantangan berbasis game dan hadiah bintang/trofi.
   - *Kebutuhan*: Antarmuka ramah sentuhan, pesan kesalahan yang mudah dimengerti, dan karakter pendamping (robot PyBot).
2. **Siswa Menengah (Usia 13–15 Tahun - SMP)**:
   - *Karakteristik*: Ingin memahami sintaksis Python asli untuk persiapan kurikulum informatika sekolah.
   - *Kebutuhan*: Editor kode Python, penjelasan konsep sintaksis, tantangan labirin dengan batasan langkah optimal (*minMoves*).
3. **Guru & Orang Tua**:
   - *Karakteristik*: Membutuhkan platform edukasi yang aman, bebas iklan, tanpa konten berbahaya, dan tidak memungut biaya langganan.

---

## 3. Fitur Utama & Kebutuhan Fungsional

### 3.1 Modul Belajar Python (30 Level, 150 Soal)
- **Struktur Kurikulum**: 30 tingkat materi berurutan mulai dari `print()`, tipe data (*string, integer, float, boolean*), operator matematika, percabangan `if-elif-else`, hingga perulangan `for` dan `while`.
- **Bank Soal Terkurasi**: 150 soal interaktif beraneka ragam (prediksi output, melengkapi kode, analisis tipe data) dengan sistem acak pilihan jawaban berbasis Fisher-Yates shuffle.
- **Feedback Edukatif**: Setiap jawaban yang dipilih langsung menampilkan pembahasan ringkas yang ramah anak.

### 3.2 Coding Game Labirin 2D (30 Level, 90 Misi)
- **Arena Labirin Grid 2D**: Robot PyBot ditempatkan pada titik awal (Start) dan harus diarahkan menuju titik akhir (Target / Bintang) sambil mengoleksi koin.
- **Balok Logika Visual**:
  - `MAJU`: Menggerakkan robot 1 petak ke arah hadapnya.
  - `BELOK KIRI` & `BELOK KANAN`: Memutar arah hadap robot 90 derajat.
  - `ULANGI N KALI`: Melakukan loop perulangan sejumlah angka tertentu.
  - `SELAMANYA`: Perulangan kontinu dengan batas aman *max actions* anti-loop tak terbatas.
- **Solvabilitas Terjamin**: Seluruh 90 misi labirin telah diverifikasi secara programatik melalui solver BFS (*Breadth-First Search*) sehingga dipastikan 100% dapat diselesaikan tanpa tabrakan.

### 3.3 Visualisasi Kode Python Real-Time
- Setiap balok yang disusun pada *workspace* otomatis dikonversi secara instan ke teks kode Python murni (`pybot.move()`, `pybot.turn_left()`, `for _ in range(3):`).
- Panel kode Python dapat diperiksa oleh siswa untuk mempelajari korelasi antara logika balok dan bahasa pemrograman Python sesungguhnya.

### 3.4 Gamifikasi & Pelacakan Progres
- **Sistem XP Transparan**: Pemberian XP pada setiap penyelesaian misi pertama kali, dengan proteksi anti-duplikasi saat misi dimainkan ulang.
- **Isolasi Akun Multi-Pengguna**: Progres disimpan pada `localStorage` terisolasi berbasis ID pengguna, sehingga progres antar-akun di gawai yang sama tidak saling menimpa.
- **Daily Streak**: Pencatatan keaktifan belajar harian berdasarkan tanggal kalender nyata.
- **Trofi & Lencana Kelulusan**: Visualisasi pencapaian saat menyelesaikan level dan modul.

### 3.5 Progressive Web App (PWA) & Dukungan Offline
- **Instalasi Fleksibel**: Dapat diinstal melalui Chrome Desktop, Android, maupun menu *Add to Home Screen* Safari iOS.
- **Recovery Uninstalasi**: Tombol pasang aplikasi dapat kembali muncul secara adaptif jika pengguna membuka website di browser setelah uninstalasi.
- **Mode Mandiri (*Standalone*)**: Menghilangkan bilah alamat browser saat dibuka melalui ikon aplikasi terpasang.

---

## 4. Kebutuhan Non-Fungsional

| Kategori | Spesifikasi |
|---|---|
| **Performa & Latensi** | Eksekusi langkah simulasi labirin $\le 380\text{ ms}$ per langkah, evaluasi balok $< 10\text{ ms}$. |
| **Responsivitas Layar** | Mendukung layar ponsel (360px+), tablet, dan desktop landscape. |
| **Keamanan Anak** | Tidak ada iklan pihak ketiga, tidak ada pelacakan analitik invasif, cookie sesi terlindungi `SameSite=Lax`. |
| **Aksesibilitas & Kontras** | Rasio kontras teks memenuhi standar WCAG AA dengan tipografi jelas dan tombol berukuran ramah sentuh ($\ge 44\text{px}$). |
| **Keandalan Offline** | Service worker menyimpan shell aplikasi, maskot WebP, dan modul soal untuk akses tanpa internet. |

---

## 5. Kriteria Penerimaan (*Acceptance Criteria*)

1. Akun pengguna baru memulai permainan dari Level 1 dengan 0 XP.
2. Level selanjutnya hanya terbuka setelah level sebelumnya diselesaikan.
3. Seluruh 90 misi labirin dan 150 soal modul belajar dapat diselesaikan dengan skor dan status yang tercatat akurat.
4. Aplikasi dapat dibuka dan dimainkan secara offline setelah instalasi awal PWA.
5. Eksekusi kode balok terlindungi dari infinite loop menggunakan batas aman tindakan (*maxActions safety guard*).
