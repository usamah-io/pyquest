import type { LearningLevel } from '../types';

export const learningLevelsData: LearningLevel[] = [
	{
		"id": 1,
		"unitId": 1,
		"unitTitle": "Unit 1: Sintaksis & Tipe Data Dasar",
		"title": "Level 1: Dasar Output & print()",
		"topic": "print()",
		"description": "Tampilkan teks dan angka ke layar konsol Python.",
		"objective": "Belajar menampilkan teks dengan print().",
		"quickTip": "Teks di dalam print() harus diapit tanda kutip agar dibaca sebagai string.",
		"concepts": [
			"print()",
			"String",
			"Tanda Kutip"
		],
		"concept": "Output Konsol: print() mengirim data ke layar terminal.",
		"achievement": {
			"id": "ach-learn-1",
			"levelId": 1,
			"title": "Pencetak Pertama",
			"description": "Tampilkan teks dan angka pertama ke konsol Python.",
			"icon": "terminal",
			"xpReward": 30
		},
		"difficulty": "easy",
		"questionIds": [
			"lvl1-q1",
			"lvl1-q2",
			"lvl1-q3",
			"lvl1-q4",
			"lvl1-q5"
		],
		"xpReward": 30
	},
	{
		"id": 2,
		"unitId": 1,
		"unitTitle": "Unit 1: Sintaksis & Tipe Data Dasar",
		"title": "Level 2: Variabel & Nilai",
		"topic": "variable",
		"description": "Simpan data ke dalam variabel dan perbarui nilainya.",
		"objective": "Belajar menyimpan data di variabel.",
		"quickTip": "Variabel ibarat kotak berlabel nama untuk menyimpan data di memori.",
		"concepts": [
			"Variabel",
			"Simbol =",
			"Ganti Nilai"
		],
		"concept": "Penyimpanan Nilai: Variabel adalah wadah berlabel untuk menyimpan data.",
		"achievement": {
			"id": "ach-learn-2",
			"levelId": 2,
			"title": "Penyimpan Memori",
			"description": "Buat dan perbarui variabel di memori.",
			"icon": "database",
			"xpReward": 35
		},
		"difficulty": "easy",
		"questionIds": [
			"lvl2-q1",
			"lvl2-q2",
			"lvl2-q3",
			"lvl2-q4",
			"lvl2-q5"
		],
		"xpReward": 35
	},
	{
		"id": 3,
		"unitId": 1,
		"unitTitle": "Unit 1: Sintaksis & Tipe Data Dasar",
		"title": "Level 3: Tipe Data & String",
		"topic": "string & types",
		"description": "Pahami perbedaan data teks (str) dan angka (int/float).",
		"objective": "Kenali perbedaan teks dan angka.",
		"quickTip": "Angka bisa dihitung dengan matematika, sedangkan teks diapit tanda kutip.",
		"concepts": [
			"str (Teks)",
			"int (Angka)",
			"type()"
		],
		"concept": "Tipe Data: Python membedakan data teks dan angka dalam operasi.",
		"achievement": {
			"id": "ach-learn-3",
			"levelId": 3,
			"title": "Analis Tipe Data",
			"description": "Bedakan tipe teks, integer, dan desimal.",
			"icon": "layers",
			"xpReward": 35
		},
		"difficulty": "easy",
		"questionIds": [
			"lvl3-q1",
			"lvl3-q2",
			"lvl3-q3",
			"lvl3-q4",
			"lvl3-q5"
		],
		"xpReward": 35
	},
	{
		"id": 4,
		"unitId": 2,
		"unitTitle": "Unit 2: Interaksi & Operasi Logika",
		"title": "Level 4: Input Pengguna & Konversi",
		"topic": "input() & conversion",
		"description": "Tangkap masukan pengguna dan ubah menjadi angka.",
		"objective": "Minta masukan dari pengguna dengan input().",
		"quickTip": "Hasil input() selalu berupa teks; gunakan int() jika ingin mengubahnya jadi angka.",
		"concepts": [
			"input()",
			"int()",
			"Ubah Tipe Data"
		],
		"concept": "Interaktivitas: input() selalu menghasilkan string sehingga membutuhkan konversi tipe data.",
		"achievement": {
			"id": "ach-learn-4",
			"levelId": 4,
			"title": "Komunikator Input",
			"description": "Buat program interaktif dengan masukan pengguna.",
			"icon": "message-square",
			"xpReward": 40
		},
		"difficulty": "medium",
		"questionIds": [
			"lvl4-q1",
			"lvl4-q2",
			"lvl4-q3",
			"lvl4-q4",
			"lvl4-q5"
		],
		"xpReward": 40
	},
	{
		"id": 5,
		"unitId": 2,
		"unitTitle": "Unit 2: Interaksi & Operasi Logika",
		"title": "Level 5: Operator Aritmatika",
		"topic": "operator",
		"description": "Hitung matematika dengan operator +, -, *, /, //, dan %.",
		"objective": "Hitung angka dengan rumus matematika.",
		"quickTip": "Gunakan * untuk kali, / untuk bagi, dan % untuk mencari sisa bagi.",
		"concepts": [
			"Aritmatika",
			"Modulo %",
			"Pangkat **"
		],
		"concept": "Kalkulasi: Python mengevaluasi ekspresi matematika sesuai urutan prioritas operator.",
		"achievement": {
			"id": "ach-learn-5",
			"levelId": 5,
			"title": "Kalkulator Cerdas",
			"description": "Kuasai seluruh perhitungan matematika Python.",
			"icon": "cpu",
			"xpReward": 40
		},
		"difficulty": "medium",
		"questionIds": [
			"lvl5-q1",
			"lvl5-q2",
			"lvl5-q3",
			"lvl5-q4",
			"lvl5-q5"
		],
		"xpReward": 40
	},
	{
		"id": 6,
		"unitId": 2,
		"unitTitle": "Unit 2: Interaksi & Operasi Logika",
		"title": "Level 6: Boolean & Perbandingan",
		"topic": "boolean & comparison",
		"description": "Kuasai nilai True/False serta operator perbandingan.",
		"objective": "Bandingkan nilai dengan True atau False.",
		"quickTip": "Gunakan == untuk mengecek sama dengan dan != untuk tidak sama dengan.",
		"concepts": [
			"True / False",
			"== dan !=",
			"> dan <"
		],
		"concept": "Logika Kebenaran: Operator perbandingan menghasilkan nilai boolean True atau False.",
		"achievement": {
			"id": "ach-learn-6",
			"levelId": 6,
			"title": "Detektif Logika",
			"description": "Evaluasi kondisi kebenaran boolean secara akurat.",
			"icon": "check-circle",
			"xpReward": 45
		},
		"difficulty": "medium",
		"questionIds": [
			"lvl6-q1",
			"lvl6-q2",
			"lvl6-q3",
			"lvl6-q4",
			"lvl6-q5"
		],
		"xpReward": 45
	},
	{
		"id": 7,
		"unitId": 3,
		"unitTitle": "Unit 3: Alur Percabangan & Perulangan",
		"title": "Level 7: Percabangan if & else",
		"topic": "if & else",
		"description": "Buat keputusan alur program dengan syarat if dan else.",
		"objective": "Buat keputusan dengan percabangan IF.",
		"quickTip": "Kode di dalam if hanya berjalan jika syarat kondisinya bernilai True.",
		"concepts": [
			"if Syarat",
			"else Penutup",
			"Indentasi Spasi"
		],
		"concept": "Alur Kondisional: Blok kode dieksekusi hanya jika syarat kondisi bernilai True.",
		"achievement": {
			"id": "ach-learn-7",
			"levelId": 7,
			"title": "Pengambil Keputusan",
			"description": "Arahkan alur keputusan program berdasarkan kondisi.",
			"icon": "git-branch",
			"xpReward": 50
		},
		"difficulty": "hard",
		"questionIds": [
			"lvl7-q1",
			"lvl7-q2",
			"lvl7-q3",
			"lvl7-q4",
			"lvl7-q5"
		],
		"xpReward": 50
	},
	{
		"id": 8,
		"unitId": 3,
		"unitTitle": "Unit 3: Alur Percabangan & Perulangan",
		"title": "Level 8: Percabangan Majemuk elif",
		"topic": "elif",
		"description": "Evaluasi banyak kondisi berurutan dengan rantai elif.",
		"objective": "Tangani banyak pilihan dengan ELIF.",
		"quickTip": "elif akan dicek berurutan dari atas jika syarat if sebelumnya False.",
		"concepts": [
			"elif Pilihan",
			"Banyak Syarat"
		],
		"concept": "Multi-kondisi: elif dievaluasi berurutan dan berhenti saat syarat pertama terpenuhi.",
		"achievement": {
			"id": "ach-learn-8",
			"levelId": 8,
			"title": "Strategis Multi-Kondisi",
			"description": "Tangani berbagai skenario kondisi bertingkat.",
			"icon": "git-merge",
			"xpReward": 50
		},
		"difficulty": "hard",
		"questionIds": [
			"lvl8-q1",
			"lvl8-q2",
			"lvl8-q3",
			"lvl8-q4",
			"lvl8-q5"
		],
		"xpReward": 50
	},
	{
		"id": 9,
		"unitId": 3,
		"unitTitle": "Unit 3: Alur Percabangan & Perulangan",
		"title": "Level 9: Perulangan for & range()",
		"topic": "for loop & range()",
		"description": "Otomatisasi aksi berulang dengan for loop dan range().",
		"objective": "Ulangi aksi berkali-kali dengan FOR.",
		"quickTip": "for i in range(5) akan mengulang aksi sebanyak 5 kali secara otomatis.",
		"concepts": [
			"for Loop",
			"range()",
			"Otomatisasi"
		],
		"concept": "Iterasi Terhitung: for loop mengulangi blok kode sesuai jumlah elemen dalam urutan.",
		"achievement": {
			"id": "ach-learn-9",
			"levelId": 9,
			"title": "Pengulang Ulung",
			"description": "Otomatisasi perulangan terhitung menggunakan loop for.",
			"icon": "repeat",
			"xpReward": 60
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl9-q1",
			"lvl9-q2",
			"lvl9-q3",
			"lvl9-q4",
			"lvl9-q5"
		],
		"xpReward": 60
	},
	{
		"id": 10,
		"unitId": 3,
		"unitTitle": "Unit 3: Alur Percabangan & Perulangan",
		"title": "Level 10: Perulangan while & Logika",
		"topic": "while loop & basic logic",
		"description": "Gunakan loop berbasis syarat kondisi while dan logika penuh.",
		"objective": "Kuasai loop bersyarat WHILE!",
		"quickTip": "while terus berulang selama kondisi True, pastikan ada langkah berhenti.",
		"concepts": [
			"while Loop",
			"Syarat Berhenti",
			"Master Teori"
		],
		"concept": "Iterasi Kondisional: while terus berjalan selama kondisi True dan berhenti saat False.",
		"achievement": {
			"id": "ach-learn-10",
			"levelId": 10,
			"title": "Master Teori Python",
			"description": "Tuntaskan seluruh fondasi materi Python pemula!",
			"icon": "award",
			"xpReward": 70
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl10-q1",
			"lvl10-q2",
			"lvl10-q3",
			"lvl10-q4",
			"lvl10-q5"
		],
		"xpReward": 70
	},
	{
		"id": 11,
		"unitId": 3,
		"unitTitle": "Unit 3: Struktur Data List & Operasi",
		"title": "Level 11: Dasar List & Indeks",
		"topic": "list & indexing",
		"description": "Koleksi data terurut menggunakan List dan akses elemen dengan indeks.",
		"objective": "Pahami cara membuat list dan membaca elemen dengan indeks.",
		"quickTip": "Indeks Python dimulai dari 0 untuk elemen pertama dan -1 untuk elemen terakhir.",
		"concepts": [
			"List []",
			"Indeks Positif [0]",
			"Indeks Negatif [-1]"
		],
		"concept": "Struktur Data List: Kumpulan nilai terurut yang dapat diakses melalui nomor indeks.",
		"achievement": {
			"id": "ach-learn-11",
			"levelId": 11,
			"title": "Penjelajah List",
			"description": "Kuasai pembuatan dan pengindeksan data list Python.",
			"icon": "list",
			"xpReward": 50
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl11-q1",
			"lvl11-q2",
			"lvl11-q3",
			"lvl11-q4",
			"lvl11-q5"
		],
		"xpReward": 50
	},
	{
		"id": 12,
		"unitId": 3,
		"unitTitle": "Unit 3: Struktur Data List & Operasi",
		"title": "Level 12: List Slicing & Panjang len()",
		"topic": "list slicing & len",
		"description": "Ambil sub-bagian list menggunakan teknik slicing dan hitung ukuran dengan len().",
		"objective": "Pelajari pemotongan list [start:stop] dan fungsi len().",
		"quickTip": "Slicing [a:b] mengambil elemen dari indeks a hingga b-1 (b tidak termasuk).",
		"concepts": [
			"Slicing [a:b]",
			"Panjang len()",
			"Step Slicing [::2]"
		],
		"concept": "Sub-Koleksi: Slicing mengekstrak rentang elemen baru dari koleksi list.",
		"achievement": {
			"id": "ach-learn-12",
			"levelId": 12,
			"title": "Pemotong Presisi",
			"description": "Potong dan ambil bagian list dengan slicing presisi.",
			"icon": "scissors",
			"xpReward": 50
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl12-q1",
			"lvl12-q2",
			"lvl12-q3",
			"lvl12-q4",
			"lvl12-q5"
		],
		"xpReward": 50
	},
	{
		"id": 13,
		"unitId": 3,
		"unitTitle": "Unit 3: Struktur Data List & Operasi",
		"title": "Level 13: Metode List: append() & pop()",
		"topic": "list methods",
		"description": "Manipulasi isi list secara dinamis dengan metode bawaan append(), pop(), dan remove().",
		"objective": "Tambah dan kurangi isi list saat program berjalan.",
		"quickTip": "append() menambah data di paling belakang, sedangkan pop() mengambil dan menghapus data terakhir.",
		"concepts": [
			"append()",
			"pop()",
			"remove()"
		],
		"concept": "Mutabilitas List: List dapat diubah ukurannya secara dinamis setelah didefinisikan.",
		"achievement": {
			"id": "ach-learn-13",
			"levelId": 13,
			"title": "Manipulator List",
			"description": "Ubah isi list dengan metode dinamis append dan pop.",
			"icon": "edit-3",
			"xpReward": 55
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl13-q1",
			"lvl13-q2",
			"lvl13-q3",
			"lvl13-q4",
			"lvl13-q5"
		],
		"xpReward": 55
	},
	{
		"id": 14,
		"unitId": 3,
		"unitTitle": "Unit 3: Struktur Data List & Operasi",
		"title": "Level 14: Iterasi List & Loop for",
		"topic": "list iteration",
		"description": "Telusuri setiap elemen list secara otomatis menggunakan perulangan for.",
		"objective": "Jalankan operasi untuk setiap elemen di dalam list.",
		"quickTip": "Gunakan sintaks for elemen in daftar: untuk memproses setiap data satu per satu.",
		"concepts": [
			"for in List",
			"enumerate()",
			"Akumulator List"
		],
		"concept": "Iterasi Koleksi: Memproses urutan nilai secara otomatis melalui loop.",
		"achievement": {
			"id": "ach-learn-14",
			"levelId": 14,
			"title": "Penelusur Koleksi",
			"description": "Otomatisasi pemrosesan setiap data list dengan loop.",
			"icon": "repeat",
			"xpReward": 55
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl14-q1",
			"lvl14-q2",
			"lvl14-q3",
			"lvl14-q4",
			"lvl14-q5"
		],
		"xpReward": 55
	},
	{
		"id": 15,
		"unitId": 3,
		"unitTitle": "Unit 3: Struktur Data List & Operasi",
		"title": "Level 15: Pencarian & Operator in pada List",
		"topic": "list search & membership",
		"description": "Periksa keberadaan nilai dalam list menggunakan operator keanggotaan in dan index().",
		"objective": "Cari keberadaan dan posisi nilai dalam kumpulan data.",
		"quickTip": "Operator in menghasilkan boolean True jika nilai ditemukan dalam list.",
		"concepts": [
			"Operator in",
			"Operator not in",
			"Metode index()"
		],
		"concept": "Keanggotaan: Evaluasi cepat apakah sebuah nilai terdapat di dalam koleksi data.",
		"achievement": {
			"id": "ach-learn-15",
			"levelId": 15,
			"title": "Pelacak Elemen",
			"description": "Cari keberadaan nilai dengan operator keanggotaan in.",
			"icon": "search",
			"xpReward": 60
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl15-q1",
			"lvl15-q2",
			"lvl15-q3",
			"lvl15-q4",
			"lvl15-q5"
		],
		"xpReward": 60
	},
	{
		"id": 16,
		"unitId": 4,
		"unitTitle": "Unit 4: Tuple, Dictionary & Kumpulan Data",
		"title": "Level 16: Tuple & Nilai Immutable",
		"topic": "tuple & immutability",
		"description": "Pahami struktur data Tuple yang tidak dapat diubah (immutable) dan efisiensinya.",
		"objective": "Gunakan tuple untuk data konstan yang aman dari perubahan.",
		"quickTip": "Tuple dibuat dengan kurung bulat () dan isinya tidak bisa diganti setelah dideklarasikan.",
		"concepts": [
			"Tuple ()",
			"Immutable",
			"Tuple Unpacking"
		],
		"concept": "Integritas Data: Tuple menjamin nilai di dalamnya tidak dapat diubah secara tidak sengaja.",
		"achievement": {
			"id": "ach-learn-16",
			"levelId": 16,
			"title": "Penjaga Konstanta",
			"description": "Amankan struktur data permanen menggunakan tuple.",
			"icon": "shield",
			"xpReward": 60
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl16-q1",
			"lvl16-q2",
			"lvl16-q3",
			"lvl16-q4",
			"lvl16-q5"
		],
		"xpReward": 60
	},
	{
		"id": 17,
		"unitId": 4,
		"unitTitle": "Unit 4: Tuple, Dictionary & Kumpulan Data",
		"title": "Level 17: Dictionary Dasar: Key & Value",
		"topic": "dictionary basics",
		"description": "Struktur data pemetaan pasangan kunci dan nilai menggunakan kurung kurawal {}.",
		"objective": "Simpan data terasosiasi dengan nama kunci tertentu.",
		"quickTip": "Dictionary diakses menggunakan nama kunci, bukan indeks angka.",
		"concepts": [
			"Dictionary {}",
			"Key & Value",
			"Akses Kunci"
		],
		"concept": "Pemetaan Nilai: Dictionary menghubungkan setiap kata kunci dengan nilai datanya.",
		"achievement": {
			"id": "ach-learn-17",
			"levelId": 17,
			"title": "Arsitek Kamus Data",
			"description": "Bangun struktur data asosiatif pasangan kunci-nilai.",
			"icon": "book",
			"xpReward": 60
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl17-q1",
			"lvl17-q2",
			"lvl17-q3",
			"lvl17-q4",
			"lvl17-q5"
		],
		"xpReward": 60
	},
	{
		"id": 18,
		"unitId": 4,
		"unitTitle": "Unit 4: Tuple, Dictionary & Kumpulan Data",
		"title": "Level 18: Metode Dictionary: get() & keys()",
		"topic": "dictionary methods",
		"description": "Akses aman tanpa risiko KeyError dengan get() dan eksplorasi keys(), values(), items().",
		"objective": "Gunakan metode pencarian aman dan iterasi kamus.",
		"quickTip": "get(\"kunci\", default) tidak akan menimbulkan crash jika kunci tidak ditemukan.",
		"concepts": [
			"dict.get()",
			"dict.keys()",
			"dict.items()"
		],
		"concept": "Pencarian Aman: Menghindari error pembacaan data dictionary yang hilang.",
		"achievement": {
			"id": "ach-learn-18",
			"levelId": 18,
			"title": "Pencari Kunci Aman",
			"description": "Kuasai metode penanganan kunci dictionary tanpa risiko error.",
			"icon": "key",
			"xpReward": 65
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl18-q1",
			"lvl18-q2",
			"lvl18-q3",
			"lvl18-q4",
			"lvl18-q5"
		],
		"xpReward": 65
	},
	{
		"id": 19,
		"unitId": 4,
		"unitTitle": "Unit 4: Tuple, Dictionary & Kumpulan Data",
		"title": "Level 19: Set & Keunikan Elemen",
		"topic": "set basics",
		"description": "Koleksi himpunan data tak terurut yang secara otomatis membuang duplikat nilai.",
		"objective": "Pelajari sifat unik himpunan Set dan cara menghapus duplikasi.",
		"quickTip": "Set hanya menyimpan satu salinan dari setiap nilai; duplikat akan otomatis dibuang.",
		"concepts": [
			"Set {}",
			"Tanpa Duplikat",
			"set.add()"
		],
		"concept": "Keunikan Himpunan: Menjaga setiap nilai di dalam koleksi tetap unik.",
		"achievement": {
			"id": "ach-learn-19",
			"levelId": 19,
			"title": "Penyaring Duplikat",
			"description": "Otomatisasi pembersihan data duplikat dengan Set.",
			"icon": "filter",
			"xpReward": 65
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl19-q1",
			"lvl19-q2",
			"lvl19-q3",
			"lvl19-q4",
			"lvl19-q5"
		],
		"xpReward": 65
	},
	{
		"id": 20,
		"unitId": 4,
		"unitTitle": "Unit 4: Tuple, Dictionary & Kumpulan Data",
		"title": "Level 20: Operasi Himpunan Set",
		"topic": "set operations",
		"description": "Lakukan operasi matematika himpunan seperti irisan, gabungan, dan selisih himpunan.",
		"objective": "Hitung relasi antar dua himpunan data dengan operator matematika.",
		"quickTip": "Gunakan & untuk irisan (data sama) dan | untuk gabungan kedua himpunan.",
		"concepts": [
			"Union |",
			"Intersection &",
			"Difference -"
		],
		"concept": "Relasi Himpunan: Membandingkan dua himpunan data dengan kalkulasi aljabar himpunan.",
		"achievement": {
			"id": "ach-learn-20",
			"levelId": 20,
			"title": "Master Aljabar Himpunan",
			"description": "Gabungkan dan bandingkan himpunan data dengan irisan dan gabungan.",
			"icon": "pie-chart",
			"xpReward": 70
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl20-q1",
			"lvl20-q2",
			"lvl20-q3",
			"lvl20-q4",
			"lvl20-q5"
		],
		"xpReward": 70
	},
	{
		"id": 21,
		"unitId": 5,
		"unitTitle": "Unit 5: Fungsi, Parameter & Modularitas",
		"title": "Level 21: Definisi Fungsi & def",
		"topic": "function definition",
		"description": "Bungkus blok kode ke dalam fungsi modular menggunakan kata kunci def.",
		"objective": "Pahami cara membuat fungsi agar kode dapat digunakan berulang kali.",
		"quickTip": "Definisikan fungsi dengan def nama_fungsi(): lalu panggil fungsinya dengan nama_fungsi().",
		"concepts": [
			"def Kata Kunci",
			"Pemanggilan Fungsi",
			"Prinsip DRY"
		],
		"concept": "Modularitas Kode: Memecah program menjadi modul fungsi yang dapat dipakai kembali.",
		"achievement": {
			"id": "ach-learn-21",
			"levelId": 21,
			"title": "Perancang Modular",
			"description": "Bangun blok fungsi terstruktur menggunakan kata kunci def.",
			"icon": "code",
			"xpReward": 70
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl21-q1",
			"lvl21-q2",
			"lvl21-q3",
			"lvl21-q4",
			"lvl21-q5"
		],
		"xpReward": 70
	},
	{
		"id": 22,
		"unitId": 5,
		"unitTitle": "Unit 5: Fungsi, Parameter & Modularitas",
		"title": "Level 22: Parameter & Argumen Fungsi",
		"topic": "function parameters",
		"description": "Kirim data dinamis ke dalam fungsi menggunakan parameter dan argumen bawaan.",
		"objective": "Buat fungsi dinamis yang menerima parameter dan nilai default.",
		"quickTip": "Nilai default parameter akan digunakan jika pemanggil fungsi tidak menyertakan argumen.",
		"concepts": [
			"Parameter",
			"Argumen Posisi",
			"Default Value"
		],
		"concept": "Parameterisasi: Fungsi menyesuaikan perilakunya berdasarkan input yang dikirimkan.",
		"achievement": {
			"id": "ach-learn-22",
			"levelId": 22,
			"title": "Konfigurator Fungsi",
			"description": "Kirim parameter dinamis dan rancang nilai default fungsi.",
			"icon": "sliders",
			"xpReward": 75
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl22-q1",
			"lvl22-q2",
			"lvl22-q3",
			"lvl22-q4",
			"lvl22-q5"
		],
		"xpReward": 75
	},
	{
		"id": 23,
		"unitId": 5,
		"unitTitle": "Unit 5: Fungsi, Parameter & Modularitas",
		"title": "Level 23: Nilai Kembalian return",
		"topic": "function return",
		"description": "Kirimkan kembali hasil kalkulasi fungsi ke variabel pemanggil dengan return.",
		"objective": "Pahami perbedaan penting return vs print() dan hasil keluaran fungsi.",
		"quickTip": "return mengembalikan nilai untuk diproses lebih lanjut, sedangkan print() hanya menampilkannya ke layar.",
		"concepts": [
			"return Nilai",
			"return vs print",
			"Keluaran None"
		],
		"concept": "Aliran Nilai Balik: Mentransfer hasil kerja fungsi kembali ke alur utama program.",
		"achievement": {
			"id": "ach-learn-23",
			"levelId": 23,
			"title": "Penghasil Output",
			"description": "Kembalikan hasil kalkulasi fungsi dengan pernyataan return.",
			"icon": "corner-down-left",
			"xpReward": 75
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl23-q1",
			"lvl23-q2",
			"lvl23-q3",
			"lvl23-q4",
			"lvl23-q5"
		],
		"xpReward": 75
	},
	{
		"id": 24,
		"unitId": 5,
		"unitTitle": "Unit 5: Fungsi, Parameter & Modularitas",
		"title": "Level 24: Scope Variabel: Lokal vs Global",
		"topic": "variable scope",
		"description": "Pelajari batasan jangkauan hidup variabel di dalam fungsi dan di luar fungsi.",
		"objective": "Pahami perbedaan variabel lokal di dalam fungsi dan variabel global.",
		"quickTip": "Variabel yang dibuat di dalam fungsi bersifat lokal dan tidak dapat dibaca dari luar fungsi.",
		"concepts": [
			"Scope Lokal",
			"Scope Global",
			"global Keyword"
		],
		"concept": "Lingkup Variabel: Menjaga isolasi variabel lokal dari gangguan variabel luar.",
		"achievement": {
			"id": "ach-learn-24",
			"levelId": 24,
			"title": "Pengawas Lingkup",
			"description": "Kendalikan ruang lingkup variabel lokal dan global program.",
			"icon": "box",
			"xpReward": 80
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl24-q1",
			"lvl24-q2",
			"lvl24-q3",
			"lvl24-q4",
			"lvl24-q5"
		],
		"xpReward": 80
	},
	{
		"id": 25,
		"unitId": 5,
		"unitTitle": "Unit 5: Fungsi, Parameter & Modularitas",
		"title": "Level 25: Fungsi Anonim Lambda",
		"topic": "lambda functions",
		"description": "Tulis fungsi ringkas satu baris tanpa nama menggunakan ekspresi lambda.",
		"objective": "Pelajari sintaks cepat fungsi anonim lambda untuk kalkulasi ringkas.",
		"quickTip": "lambda x: x * 2 adalah bentuk ringkas dari fungsi sederhana tanpa memerlukan def.",
		"concepts": [
			"lambda x:",
			"Fungsi Satu Baris",
			"Fungsi Anonim"
		],
		"concept": "Ekspresi Ringkas: Menulis fungsi sederhana langsung pada baris pemanggilannya.",
		"achievement": {
			"id": "ach-learn-25",
			"levelId": 25,
			"title": "Inovator Lambda",
			"description": "Gunakan fungsi anonim ekspresif untuk kalkulasi kilat.",
			"icon": "zap",
			"xpReward": 80
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl25-q1",
			"lvl25-q2",
			"lvl25-q3",
			"lvl25-q4",
			"lvl25-q5"
		],
		"xpReward": 80
	},
	{
		"id": 26,
		"unitId": 6,
		"unitTitle": "Unit 6: String Lanjutan, Error & Algoritma",
		"title": "Level 26: Manipulasi String: split() & join()",
		"topic": "string manipulation",
		"description": "Ubah teks menjadi list kata dengan split() dan satukan kembali dengan join().",
		"objective": "Kuasai pengolahan data teks profesional dalam Python.",
		"quickTip": "\" \".join(kata) menyatukan elemen list kata menjadi sebuah kalimat utuh.",
		"concepts": [
			"str.split()",
			"str.join()",
			"str.strip()"
		],
		"concept": "Transformasi Teks: Mengubah bentuk representasi data antara teks dan kumpulan kata.",
		"achievement": {
			"id": "ach-learn-26",
			"levelId": 26,
			"title": "Pembedah Kalimat",
			"description": "Pisah dan satukan string dengan split dan join profesional.",
			"icon": "type",
			"xpReward": 85
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl26-q1",
			"lvl26-q2",
			"lvl26-q3",
			"lvl26-q4",
			"lvl26-q5"
		],
		"xpReward": 85
	},
	{
		"id": 27,
		"unitId": 6,
		"unitTitle": "Unit 6: String Lanjutan, Error & Algoritma",
		"title": "Level 27: Pemformatan String f-string",
		"topic": "f-string formatting",
		"description": "Sisipkan variabel dan ekspresi langsung ke dalam teks dengan f-string modern.",
		"objective": "Gunakan f-string untuk merangkai teks interaktif yang rapi dan cepat.",
		"quickTip": "Awali string dengan huruf f lalu letakkan variabel di dalam kurung kurawal f\"Halo {nama}\".",
		"concepts": [
			"f-string f\"\"",
			"Format Desimal {:.2f}",
			"Ekspresi Langsung"
		],
		"concept": "Interpolasi String: Menyisipkan nilai variabel langsung ke dalam templat teks.",
		"achievement": {
			"id": "ach-learn-27",
			"levelId": 27,
			"title": "Penata Teks Modern",
			"description": "Format output teks dinamis dengan interpolasi f-string modern.",
			"icon": "sparkles",
			"xpReward": 85
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl27-q1",
			"lvl27-q2",
			"lvl27-q3",
			"lvl27-q4",
			"lvl27-q5"
		],
		"xpReward": 85
	},
	{
		"id": 28,
		"unitId": 6,
		"unitTitle": "Unit 6: String Lanjutan, Error & Algoritma",
		"title": "Level 28: Penanganan Error: try & except",
		"topic": "try except error handling",
		"description": "Cegah aplikasi crash saat terjadi galat tak terduga dengan blok penanganan error.",
		"objective": "Pelajari penanganan error ramah pengguna dengan try dan except.",
		"quickTip": "Kode yang berpotensi error diletakkan di dalam try, dan penanganannya di except.",
		"concepts": [
			"try & except",
			"ValueError",
			"ZeroDivisionError"
		],
		"concept": "Ketahanan Program: Melindungi alur sistem dari kegagalan eksekusi tak terduga.",
		"achievement": {
			"id": "ach-learn-28",
			"levelId": 28,
			"title": "Pencegah Crash",
			"description": "Amankan jalannya program dari galat runtime dengan try-except.",
			"icon": "alert-triangle",
			"xpReward": 90
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl28-q1",
			"lvl28-q2",
			"lvl28-q3",
			"lvl28-q4",
			"lvl28-q5"
		],
		"xpReward": 90
	},
	{
		"id": 29,
		"unitId": 6,
		"unitTitle": "Unit 6: String Lanjutan, Error & Algoritma",
		"title": "Level 29: List Comprehension & Pola Ringkas",
		"topic": "list comprehension",
		"description": "Bangun list baru dari koleksi yang sudah ada hanya dalam satu baris ekspresif.",
		"objective": "Tulis transformasi data yang elegan dengan list comprehension.",
		"quickTip": "[x * 2 for x in angka] membuat list baru dengan mengalikan setiap angka dua kali.",
		"concepts": [
			"List Comprehension",
			"Filter if",
			"Sintaks Pythonic"
		],
		"concept": "Ekspresi Deklaratif: Membuat koleksi data baru secara ringkas dan terbaca.",
		"achievement": {
			"id": "ach-learn-29",
			"levelId": 29,
			"title": "Spesialis Pythonic",
			"description": "Ciptakan transformasi data elegan menggunakan list comprehension.",
			"icon": "cpu",
			"xpReward": 95
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl29-q1",
			"lvl29-q2",
			"lvl29-q3",
			"lvl29-q4",
			"lvl29-q5"
		],
		"xpReward": 95
	},
	{
		"id": 30,
		"unitId": 6,
		"unitTitle": "Unit 6: String Lanjutan, Error & Algoritma",
		"title": "Level 30: Evaluasi Algoritma & Master Python",
		"topic": "algorithms & python mastery",
		"description": "Uji komprehensif seluruh keterampilan logika, algoritma, dan filosofi kode Python.",
		"objective": "Buktikan penguasaan penuh logika pemrograman Python tingkat pemula hingga mandiri.",
		"quickTip": "Gabungkan seluruh konsep: struktur data, fungsi, percabangan, dan penanganan kondisi.",
		"concepts": [
			"Sintesis Logika",
			"Desain Algoritma",
			"Mastery PyQuest"
		],
		"concept": "Penguasaan Penuh: Menyatukan seluruh instrumen bahasa pemrograman untuk memecahkan masalah nyata.",
		"achievement": {
			"id": "ach-learn-30",
			"levelId": 30,
			"title": "Grandmaster PyQuest",
			"description": "Tuntaskan seluruh 30 level kurikulum Python PyQuest!",
			"icon": "award",
			"xpReward": 100
		},
		"difficulty": "challenge",
		"questionIds": [
			"lvl30-q1",
			"lvl30-q2",
			"lvl30-q3",
			"lvl30-q4",
			"lvl30-q5"
		],
		"xpReward": 100
	}
];

export function getLearningLevelById(levelId: number): LearningLevel | undefined {
	return learningLevelsData.find((lvl) => lvl.id === levelId);
}
