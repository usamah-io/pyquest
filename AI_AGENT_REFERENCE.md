# AI Agent Reference Document — PyQuest

> Panduan acuan teknis, aturan arsitektur, batasan sistem, dan konvensi kode untuk AI Agent dan pengembang PyQuest.

---

## 1. Product Goal & Identity
- **Nama Produk**: PyQuest
- **Misi**: Mengajarkan logika dasar pemrograman Python kepada anak-anak pemula melalui pengalaman belajar seperti bermain game.
- **Bukan**: IDE teks kompleks, klon Scratch tanpa koneksi bahasa Python, chatbot AI, atau dashboard SaaS umum.
- **Karakteristik**: Ceria, ramah anak, edukatif, deterministik, dan berorientasi landscape.

---

## 2. Technical Stack
- **Framework**: SvelteKit 3 / Svelte 5 (Runes `$state`, `$derived`, `$props`, `$bindable`)
- **Runtime & Package Manager**: Bun 1.4+
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Testing**: Bun Test (`bun:test`)
- **Deploy**: Vercel ready via `@sveltejs/adapter-auto`

---

## 3. Architecture & Boundaries

### Client-Side (100% Interaktivitas Game)
- Kompilasi balok kode (`compiler.ts`) dilakukan di memori browser.
- Generator kode Python real-time berjalan otomatis dari susunan balok.
- Game loop (`engine.ts`) berbasis diskrit tick step (~380ms per aksi) dengan kalkulasi koordinat $(x, y)$ dan arah hadap (`UP`, `RIGHT`, `DOWN`, `LEFT`).
- Deteksi tabrakan tembok (*out-of-bounds*), rintangan batu (*obstacles*), dan perolehan bintang/koin (*collectibles*).
- State progress tersimpan secara reaktif dengan fallback persistensi `localStorage`.

### Server-Side Boundary
- Tidak ada panggilan jaringan yang memblokir pergerakan karakter atau kuis.
- Tidak menggunakan API LLM berbayar (OpenAI/Gemini/Claude) untuk validasi logika permainan.

---

## 4. UX & Gameplay Rules
1. **Landscape-First**:
   - Area arena game (kiri) dan area susunan balok koding (kanan) harus tampak berdampingan tanpa mewajibkan scroll panjang.
   - Deteksi orientasi mobile portrait menampilkan dialog: *"Putar perangkatmu ke landscape untuk bermain."*
2. **Visual Hierarchy**:
   - Teks besar dan ramah anak.
   - Pilihan ganda dengan tanda centang aktif.
   - Balok kode berwarna cerah dengan penanda ikon dan nama yang jelas.
   - Umpan balik positif bahkan ketika jawaban salah untuk menumbuhkan rasa ingin tahu.
3. **Deterministic Feedback**:
   - Petunjuk bertingkat (*Tiered Hints 1, 2, 3*).
   - Penjelasan konsep langsung muncul setelah siswa menjawab.

---

## 5. Coding & Performance Conventions
- Pertahankan struktur folder modular (`lib/components`, `lib/game`, `lib/questions`, `lib/challenges`, `lib/stores`, `lib/types`).
- Gunakan TypeScript murni dengan tipe data eksplisit.
- Minimalisir instalasi library eksternal yang tidak diperlukan.
- Selalu pastikan `bun test`, `bun run check`, dan `bun run build` lolos tanpa eror sebelum merilis pembaruan.
