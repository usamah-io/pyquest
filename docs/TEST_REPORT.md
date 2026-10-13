# PyQuest — Comprehensive Test & Verification Report

> **Laporan Pengujian Otomatis, Hasil Kompilasi Produksi, dan Prosedur Uji Manual**  
> Repositori: `pyquest` | Tanggal Audit: 13 Oktober 2026 | Lingkungan Eksekusi: Windows 11

---

## 1. Informasi Lingkungan Pengujian (*Test Environment*)

| Komponen Lingkungan | Versi Terdeteksi | Jalur / Konfigurasi |
|---|---|---|
| **Sistem Operasi** | Windows (x64) | PowerShell 7 / Windows PowerShell |
| **Node.js** | `v24.19.0` | Global Node runtime |
| **npm** | `12.0.2` | Global Node package manager |
| **Bun Runtime** | `1.4.2` | `C:\Users\ASUS\.bun\bin\bun.exe` |
| **Svelte** | `^5.57.1` (Runes Mode) | `node_modules/svelte` |
| **SvelteKit** | `^3.0.0` | `node_modules/@sveltejs/kit` |
| **Vite** | `^8.3.0` (8.3.2 actual) | `node_modules/vite` |
| **Tailwind CSS** | `^4.3.3` | `@tailwindcss/vite` |
| **TypeScript** | `^6.0.3` | `node_modules/typescript` |

---

## 2. Hasil Eksekusi Perintah Otomatis (*Automated Check Outcomes*)

### 2.1 Pengecekan Tipe & Sintaks Svelte (`npm run check`)
- **Perintah Dijalankan**:
  ```powershell
  npm run check
  ```
- **Perilaku Internal**:
  Menjalankan `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`.
- **Keluaran Log Aktual**:
  ```text
  Loading svelte-check in workspace: c:\Users\ASUS\Desktop\pyquest
  Getting Svelte diagnostics...

  svelte-check found 0 errors and 0 warnings
  ```
- **Kode Keluar (*Exit Code*)**: `0` (PASS).
- **Catatan**: Ditemukan pemberitahuan peringatan konfigurasi SvelteKit bawaan: `config.alias option is deprecated, use subpath imports instead`, dan penimpaan opsi `paths` pada `tsconfig.json`. Namun seluruh diagnostik kode TypeScript dan Svelte menghasilkan **0 error dan 0 warning**.

---

### 2.2 Kompilasi Build Produksi (`npm run build`)
- **Perintah Dijalankan**:
  ```powershell
  npm run build
  ```
- **Perilaku Internal**:
  Menjalankan `vite build` untuk kompilasi SSR server, bundle aset client browser, dan service worker.
- **Keluaran Log Aktual**:
  ```text
  ✓ built in 1.86s (Server output: 24 chunks, entrypoints, and manifest)
  ✓ built in 2.21s (Client output: 227 modules transformed, 30 immutable chunks)
  Building service worker
  vite v8.3.2 building serviceWorker environment for production...
  ✓ 19 modules transformed.
  .svelte-kit/output/client/service-worker.js 7.70 kB │ gzip: 2.64 kB
  ✓ built in 378ms

  > Using @sveltejs/adapter-auto
  ✔ done
  ```
- **Kode Keluar (*Exit Code*)**: `0` (PASS).
- **Hasil Artefak**: Direktori `.svelte-kit/output/` terbentuk lengkap dan siap dijalankan dengan `npm run preview` atau di-deploy langsung ke Vercel / Cloudflare Pages.

---

### 2.3 Rangkaian Pengujian Unit Bun (`bun test`)
- **Perintah Dijalankan**:
  ```powershell
  & "C:\Users\ASUS\.bun\bin\bun.exe" test
  ```
- **Berkas Uji**: `src/engine.test.ts`
- **Ringkasan Hasil**:
  - **Total Pengujian**: 61 skenario uji
  - **Lolos (*Pass*)**: **61 pass**
  - **Gagal (*Fail*)**: **0 fail**
  - **Total Panggilan Assertion**: **6.040 `expect()` calls**
  - **Durasi Eksekusi**: **226.00 ms**
- **Kode Keluar (*Exit Code*)**: `0` (PASS).

#### Rincian Distribusi Pengujian Unit:
1. **Block Compiler (5 Skenario Uji)**:
   - Kompilasi balok atomic (`MOVE`, `TURN_RIGHT`, `MOVE`) $\to$ PASS.
   - Ekspansi balok `REPEAT` secara deterministik $\to$ PASS.
   - Generator kode Python real-time (`pybot.move()`, `pybot.turn_left()`) $\to$ PASS.
   - Kompilasi aman balok `FOREVER` dengan batas langkah dan pesan galat ramah $\to$ PASS.
   - Generator sintaks Python `while True:` untuk balok `FOREVER` $\to$ PASS.
2. **Coding Game Engine & 30 Levels System (8 Skenario Uji)**:
   - Verifikasi 30 level permainan dengan minimal 3 misi masing-masing ($\ge 90$ misi total) $\to$ PASS.
   - Variasi balok instruksi di setiap tantangan (tidak pernah hanya balok `MOVE`) $\to$ PASS.
   - Petunjuk pedagogis maksimal 2 tip tanpa membocorkan nama balok $\to$ PASS.
   - Verifikasi pencapaian target Misi 1, 2, dan 3 pada Level 1 $\to$ PASS.
   - Deteksi tabrakan rintangan batu $\to$ PASS.
   - Proteksi anti-duplikasi XP pada replay misi $\to$ PASS.
3. **Modul Belajar Python: 30-Level System (3 Skenario Uji)**:
   - Tepat 30 level belajar dengan 5 soal per level (150 soal total) $\to$ PASS.
   - Progresi tingkat kesulitan (`easy` $\to$ `medium` $\to$ `hard` $\to$ `challenge`) $\to$ PASS.
   - Kelulusan level kuis dan pencegahan duplikasi XP pada replay $\to$ PASS.
4. **Question Bank 150 Soal (9 Skenario Uji)**:
   - Jumlah soal $\ge 150$ butir $\to$ PASS.
   - Validitas metadata (ID, level 1–30, topik, tipe, $\ge 4$ opsi, penjelasan) $\to$ PASS.
   - Kesesuaian teks kunci jawaban dengan opsi ID $\to$ PASS.
   - Ketiadaan opsi pilihan ganda duplikat dalam satu soal $\to$ PASS.
   - Cakupan lengkap 17 topik Python wajib $\to$ PASS.
   - Variasi tipe soal (output prediction, konsep, reading, choose code, find error, logic) $\to$ PASS.
   - Distribusi acak opsi benar (bukan selalu pilihan A) $\to$ PASS.
   - Petunjuk bertingkat yang tidak membocorkan kunci jawaban $\to$ PASS.
   - Fungsi penyaringan filter berdasarkan level, topik, dan kesulitan $\to$ PASS.
5. **Movement Safety, Termination & Anti-Loop (15 Skenario Uji)**:
   - Test 1: Terminasi seketika saat PyBot mencapai bintang target $\to$ PASS.
   - Test 2: Penghentian eksekusi seketika tanpa menjalankan sisa instruksi $\to$ PASS.
   - Test 3: Tabrakan rintangan batu langsung memicu status `FAILED` $\to$ PASS.
   - Test 4: Melewati batas grid langsung memicu status `OUT_OF_BOUNDS` $\to$ PASS.
   - Test 5: Eksekusi balok `REPEAT 3x MOVE` berjalan tepat 3 langkah $\to$ PASS.
   - Test 6: Balok `REPEAT 4x TURN_RIGHT` berotasi 360 derajat tanpa berpindah koordinat $\to$ PASS.
   - Test 7: Penghentian tegas pada batas `maxActions` (pencegah hang) $\to$ PASS.
   - Test 8: Double-run guard untuk mencegah eksekusi beruntun bersamaan $\to$ PASS.
   - Test 9: Alur fail-edit-rerun berjalan bersih tanpa state tersangkut $\to$ PASS.
   - Test 10: Perlindungan perolehan XP pada replay tantangan $\to$ PASS.
   - Verifikasi Misi Level 2 (Tikungan Kanan) dapat diselesaikan 100% $\to$ PASS.
   - Verifikasi BFS otomatis: Seluruh 90 misi terbukti memiliki jalur solusi tanpa tabrakan $\to$ PASS.
   - Validasi formula `minMoves <= maxMoves` pada 90 misi $\to$ PASS.
   - Verifikasi batasan energi Level 5 $\le 9$ langkah $\to$ PASS.
   - Validasi pembedaan konsumsi energi langkah `MOVE` vs rotasi `TURN` $\to$ PASS.
6. **Quiz Scoring & Evaluator (6 Skenario Uji)**:
   - Tes skenario 5/5 benar $\to$ Skor 100%, perfect = true, full XP $\to$ PASS.
   - Tes skenario 4/5 benar, 1 salah $\to$ Skor 80%, perfect = false, proporsional XP $\to$ PASS.
   - Tes skenario 3/5 benar, 2 salah $\to$ Skor 60%, proporsional XP $\to$ PASS.
   - Tes skenario 0/5 benar $\to$ Skor 0%, 0 XP $\to$ PASS.
   - Tes proteksi anti-klik ganda pada soal yang sama $\to$ PASS.
   - Tes persistensi skor level pada `progressStore` $\to$ PASS.
7. **Coding Game XP Rewards (7 Skenario Uji)**:
   - Konfigurasi `xpReward` positif pada 90 tantangan $\to$ PASS.
   - Konfigurasi bonus lencana pada 30 level $\to$ PASS.
   - Akumulasi XP aditif pada berbagai tantangan berbeda $\to$ PASS.
   - Bonus XP kelulusan level penuh $\to$ PASS.
   - Persistensi progres setelah simulasi nyata $\to$ PASS.
8. **Google Authentication & Profile (6 Skenario Uji)**:
   - Client ID Google valid dan tersedia untuk frontend $\to$ PASS.
   - Status awal guest bersih $\to$ PASS.
   - Penyelesaian setup profil memperbarui `dashboardUserStore` $\to$ PASS.
   - Penyuntingan profil memperbarui nama panggilan seketika $\to$ PASS.
   - Isolasi progres per akun ID pengguna $\to$ PASS.
   - Logout membersihkan sesi secara tuntas $\to$ PASS.

---

## 3. Prosedur Uji Manual (*Reproducible Manual Test Cases*)

### Skenario 1: Alur Masuk Pengguna Baru & Setup Profil
1. Buka browser pada mode Incognito di `http://localhost:5173/` (atau URL preview).
2. Amati tampilan: Layar pembuka Splash Screen PyBot muncul sesaat, kemudian menampilkan layar login resmi (`LoginView.svelte`).
3. Klik tombol *"Masuk dengan Google"*.
4. Selesaikan dialog Google Identity Services.
5. Verifikasi: Pengguna diarahkan ke layar `PROFILE_SETUP`.
6. Masukkan nama panggilan (misal: "Budi") dan pilih avatar maskot robot.
7. Klik *"Mulai Petualangan"*.
8. Verifikasi: Beranda menampilkan sapaan *"Halo, Budi!"*, total XP bernilai `0`, dan streak bernilai `0`.

### Skenario 2: Mengerjakan Kuis Python
1. Di Beranda, klik tombol *"Mulai Belajar Python"* atau tab *"Modul"* pada navigasi bawah.
2. Pilih Level 1 ("Mengenal Python & print()").
3. Amati tampilan kartu soal: teks soal jelas, cuplikan kode memiliki highlight kontras tinggi.
4. Klik tombol petunjuk (*Hint 1*) $\to$ amati petunjuk konseptual muncul tanpa membocorkan kunci jawaban.
5. Pilih jawaban yang benar $\to$ terdengar chime nada mayor Web Audio, kartu penjelasan muncul dengan status benar (+15 XP).
6. Klik *"Lanjut Soal Berikutnya"* hingga soal ke-5 selesai.
7. Verifikasi: Modal `LearningSuccessModal.svelte` muncul menampilkan skor 5/5, lencana bintang, dan perolehan bonus XP level.

### Skenario 3: Menyelesaikan Misi Coding Game
1. Dari navigasi bawah, pilih tab *"Game"*.
2. Pilih Level 1 $\to$ pilih Misi 1.
3. Baca taklimat misi $\to$ klik *"Mulai Misi"*.
4. Pada area workspace kanan, seret balok `MAJU` (1x), `BELOK KANAN` (1x), `MAJU` (1x).
5. Amati panel kode Python di bawah workspace: otomatis menampilkan kode `pybot.move()`, `pybot.turn_right()`, `pybot.move()`.
6. Klik tombol *"JALANKAN KODE"*.
7. Amati kanvas kiri: robot PyBot bergerak langkah demi langkah (interval 380ms), mengambil koin emas, dan mencapai bintang emas.
8. Verifikasi: Modal `ChallengeSuccessModal.svelte` terbuka, suara kemenangan berbunyi, dan XP bertambah di bilah HUD.

### Skenario 4: Simulasi Putus Jaringan (*Offline Mode PWA*)
1. Buka DevTools browser $\to$ tab *Network* $\to$ ubah throttling ke **Offline**.
2. Refresh halaman browser.
3. Verifikasi: Halaman tetap dapat dimuat dengan mulus oleh Service Worker.
4. Muncul banner di bagian atas: *"Koneksi sedang tidak tersedia. Mode offline aktif."*
5. Buka modul kuis dan susun balok koding game $\to$ seluruh interaksi tetap berjalan 100% lancar tanpa ada error network.

---

## 4. Masalah yang Diketahui & Catatan Verifikasi

| Item | Status | Dampak | Rekomendasi Tindakan |
|---|---|---|---|
| **Panggilan CLI `bun` pada Windows via global npm wrapper** | Terdeteksi | Menjalankan `bun` via wrapper PowerShell `npm\bun.ps1` menghasilkan error platform OS. Namun eksekusi native Bun langsung di `C:\Users\ASUS\.bun\bin\bun.exe` berjalan lancar (Bun 1.4.2). | Pengembang di Windows disarankan menggunakan `npm run ...` atau memanggil path native Bun. |
| **Peringatan Deprecated `config.alias` pada SvelteKit** | Non-kritis | Peringatan terminal saat build bahwa `config.alias` akan digantikan subpath imports `#lib`. Build tetap berhasil 100%. | Dapat disesuaikan di masa depan menggunakan konfigurasi subpath imports. |
| **Konektivitas Google Sign-In pada Mode Offline Penuh** | Sesuai Desain | Verifikasi token awal memerlukan koneksi internet ke Google. Setelah login pertama kali berhasil, sesi tersimpan lokal di perangkat dan dapat berjalan offline. | Sifat alami OAuth 2.0 Identity Provider. |
