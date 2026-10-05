import type { Question } from '../types';

export const questionsData: Question[] = [
	// ==========================================
	// 1. print()
	// ==========================================
	{
		id: 'q-prt-1',
		topic: 'print()',
		difficulty: 1,
		question: 'Apa fungsi utama dari perintah print() dalam Python?',
		code: 'print("Halo Dunia")',
		options: [
			{ id: 'opt-prt1-a', text: 'Menampilkan teks atau data ke layar konsol' },
			{ id: 'opt-prt1-b', text: 'Mencetak dokumen ke mesin printer fisik' },
			{ id: 'opt-prt1-c', text: 'Menyimpan berkas teks baru ke hard disk' },
			{ id: 'opt-prt1-d', text: 'Menghapus baris kode yang salah' }
		],
		correctAnswer: 'Menampilkan teks atau data ke layar konsol',
		correctAnswerId: 'opt-prt1-a',
		explanation: 'print() adalah fungsi bawaan Python untuk menampilkan keluaran (output) ke konsol/terminal.',
		hints: ['Pikirkan konsol teks tempat hasil program muncul.'],
		xp: 15
	},
	{
		id: 'q-prt-2',
		topic: 'print()',
		difficulty: 1,
		question: 'Manakah sintaks yang benar untuk mencetak angka 10 ke layar?',
		code: '# Pilih sintaks yang valid:',
		options: [
			{ id: 'opt-prt2-a', text: 'print(10)' },
			{ id: 'opt-prt2-b', text: 'print 10' },
			{ id: 'opt-prt2-c', text: 'echo(10)' },
			{ id: 'opt-prt2-d', text: 'display: 10' }
		],
		correctAnswer: 'print(10)',
		correctAnswerId: 'opt-prt2-a',
		explanation: 'Di Python 3, pemanggilan fungsi wajib menggunakan tanda kurung buka dan tutup: print(10).',
		hints: ['Fungsi di Python selalu memerlukan tanda kurung ().'],
		xp: 15
	},
	{
		id: 'q-prt-3',
		topic: 'print()',
		difficulty: 1,
		question: 'Apa keluaran dari kode berikut?',
		code: 'print("A", "B", "C")',
		options: [
			{ id: 'opt-prt3-a', text: 'A B C' },
			{ id: 'opt-prt3-b', text: 'ABC' },
			{ id: 'opt-prt3-c', text: 'A, B, C' },
			{ id: 'opt-prt3-d', text: '"A" "B" "C"' }
		],
		correctAnswer: 'A B C',
		correctAnswerId: 'opt-prt3-a',
		explanation: 'Secara default, parameter ganda pada print() dipisahkan dengan spasi.',
		hints: ['Tanda koma pada argumen print() diganti spasi oleh Python.'],
		xp: 15
	},

	// ==========================================
	// 2. string
	// ==========================================
	{
		id: 'q-str-1',
		topic: 'string',
		difficulty: 1,
		question: 'Tanda baca apa yang digunakan untuk membungkus data tipe String (teks)?',
		code: 'pesan = ...',
		options: [
			{ id: 'opt-str1-a', text: 'Tanda petik tunggal (\') atau ganda (")' },
			{ id: 'opt-str1-b', text: 'Tanda kurung siku ([ ])' },
			{ id: 'opt-str1-c', text: 'Tanda pagar (#)' },
			{ id: 'opt-str1-d', text: 'Tanda kurung kurawal ({ })' }
		],
		correctAnswer: 'Tanda petik tunggal (\') atau ganda (")',
		correctAnswerId: 'opt-str1-a',
		explanation: 'String di Python dapat diapit tanda petik tunggal (\'teks\') atau tanda petik ganda ("teks").',
		hints: ['Lihat bagaimana teks "Halo" ditulis di Python.'],
		xp: 15
	},
	{
		id: 'q-str-2',
		topic: 'string',
		difficulty: 2,
		question: 'Berapa panjang teks (len) dari kata berikut?',
		code: 'kata = "Python"\nprint(len(kata))',
		options: [
			{ id: 'opt-str2-a', text: '6' },
			{ id: 'opt-str2-b', text: '5' },
			{ id: 'opt-str2-c', text: '7' },
			{ id: 'opt-str2-d', text: 'Error' }
		],
		correctAnswer: '6',
		correctAnswerId: 'opt-str2-a',
		explanation: 'Kata "Python" memiliki 6 karakter: P-y-t-h-o-n.',
		hints: ['Hitung jumlah huruf dalam kata "Python".'],
		xp: 15
	},
	{
		id: 'q-str-3',
		topic: 'string',
		difficulty: 2,
		question: 'Apa hasil penggabungan string berikut?',
		code: 'a = "Py"\nb = "Bot"\nprint(a + b)',
		options: [
			{ id: 'opt-str3-a', text: 'PyBot' },
			{ id: 'opt-str3-b', text: 'Py Bot' },
			{ id: 'opt-str3-c', text: 'a + b' },
			{ id: 'opt-str3-d', text: 'Error' }
		],
		correctAnswer: 'PyBot',
		correctAnswerId: 'opt-str3-a',
		explanation: 'Operator + pada dua buah string menyatukan keduanya secara langsung (concatenation).',
		hints: ['Operator + pada teks tidak menambahkan spasi secara otomatis.'],
		xp: 15
	},

	// ==========================================
	// 3. integer & float
	// ==========================================
	{
		id: 'q-num-1',
		topic: 'integer',
		difficulty: 1,
		question: 'Manakah nilai yang bertipe Integer (bilangan bulat)?',
		code: '# Perhatikan nilai berikut:',
		options: [
			{ id: 'opt-num1-a', text: '42' },
			{ id: 'opt-num1-b', text: '3.14' },
			{ id: 'opt-num1-c', text: '"42"' },
			{ id: 'opt-num1-d', text: 'True' }
		],
		correctAnswer: '42',
		correctAnswerId: 'opt-num1-a',
		explanation: 'Integer adalah bilangan bulat positif atau negatif tanpa tanda desimal/koma.',
		hints: ['Bilangan tanpa titik desimal dan tanpa tanda petik.'],
		xp: 15
	},
	{
		id: 'q-num-2',
		topic: 'float',
		difficulty: 1,
		question: 'Tipe data angka berkoma/desimal seperti 7.5 disebut apa di Python?',
		code: 'skor = 7.5',
		options: [
			{ id: 'opt-num2-a', text: 'float' },
			{ id: 'opt-num2-b', text: 'int' },
			{ id: 'opt-num2-c', text: 'str' },
			{ id: 'opt-num2-d', text: 'decimal_number' }
		],
		correctAnswer: 'float',
		correctAnswerId: 'opt-num2-a',
		explanation: 'Bilangan pecahan bertanda titik desimal memiliki tipe float (floating-point).',
		hints: ['Singkatan dari floating-point number.'],
		xp: 15
	},
	{
		id: 'q-num-3',
		topic: 'integer',
		difficulty: 2,
		question: 'Apa tipe data hasil dari pembagian 10 / 2 di Python?',
		code: 'hasil = 10 / 2\nprint(type(hasil))',
		options: [
			{ id: 'opt-num3-a', text: 'float' },
			{ id: 'opt-num3-b', text: 'int' },
			{ id: 'opt-num3-c', text: 'double' },
			{ id: 'opt-num3-d', text: 'number' }
		],
		correctAnswer: 'float',
		correctAnswerId: 'opt-num3-a',
		explanation: 'Operator pembagian tunggal / selalu menghasilkan float (contoh: 5.0).',
		hints: ['Pembagian / selalu menghasilkan angka desimal di Python 3.'],
		xp: 20
	},

	// ==========================================
	// 4. variable
	// ==========================================
	{
		id: 'q-var-1',
		topic: 'variable',
		difficulty: 1,
		question: 'Manakah nama variabel yang sah dan valid menurut aturan Python?',
		code: '# Pilih nama variabel yang diperbolehkan:',
		options: [
			{ id: 'opt-var1-a', text: 'nama_robot' },
			{ id: 'opt-var1-b', text: '2robot' },
			{ id: 'opt-var1-c', text: 'nama-robot' },
			{ id: 'opt-var1-d', text: 'nama robot' }
		],
		correctAnswer: 'nama_robot',
		correctAnswerId: 'opt-var1-a',
		explanation: 'Nama variabel tidak boleh diawali angka, tidak boleh mengandung spasi atau tanda hubung (-). Karakter underscore (_) diperbolehkan.',
		hints: ['Gunakan garis bawah (_) sebagai pengganti spasi.'],
		xp: 15
	},
	{
		id: 'q-var-2',
		topic: 'variable',
		difficulty: 2,
		question: 'Berapakah nilai akhir variabel x pada baris terakhir?',
		code: 'x = 5\nx = x + 3\nprint(x)',
		options: [
			{ id: 'opt-var2-a', text: '8' },
			{ id: 'opt-var2-b', text: '5' },
			{ id: 'opt-var2-c', text: '3' },
			{ id: 'opt-var2-d', text: '53' }
		],
		correctAnswer: '8',
		correctAnswerId: 'opt-var2-a',
		explanation: 'Variabel x mula-mula 5, lalu ditambah 3 menjadi 8.',
		hints: ['5 ditambah 3.'],
		xp: 15
	},
	{
		id: 'q-var-3',
		topic: 'variable',
		difficulty: 1,
		question: 'Tanda sama dengan tunggal (=) pada Python berfungsi untuk apa?',
		code: 'energi = 100',
		options: [
			{ id: 'opt-var3-a', text: 'Menyimpan nilai ke dalam variabel (assignment)' },
			{ id: 'opt-var3-b', text: 'Memeriksa apakah nilainya sama' },
			{ id: 'opt-var3-c', text: 'Menghitung rumus matematika' },
			{ id: 'opt-var3-d', text: 'Mendefinisikan fungsi' }
		],
		correctAnswer: 'Menyimpan nilai ke dalam variabel (assignment)',
		correctAnswerId: 'opt-var3-a',
		explanation: 'Tanda = digunakan untuk menugaskan (assign) nilai dari sisi kanan ke variabel di sisi kiri.',
		hints: ['Untuk pengecekan kesamaan digunakan ==.'],
		xp: 15
	},

	// ==========================================
	// 5. input() & type conversion
	// ==========================================
	{
		id: 'q-inp-1',
		topic: 'input()',
		difficulty: 1,
		question: 'Tipe data default dari nilai yang dikembalikan oleh fungsi input() adalah...',
		code: 'jawaban = input("Masukkan umurmu: ")',
		options: [
			{ id: 'opt-inp1-a', text: 'str (string)' },
			{ id: 'opt-inp1-b', text: 'int (integer)' },
			{ id: 'opt-inp1-c', text: 'float (desimal)' },
			{ id: 'opt-inp1-d', text: 'bool (boolean)' }
		],
		correctAnswer: 'str (string)',
		correctAnswerId: 'opt-inp1-a',
		explanation: 'Fungsi input() selalu membaca masukan dari keyboard sebagai string teks.',
		hints: ['Meskipun mengetik angka 10, nilainya tersimpan sebagai "10".'],
		xp: 20
	},
	{
		id: 'q-cnv-1',
		topic: 'type conversion',
		difficulty: 2,
		question: 'Bagaimana cara mengubah string "25" menjadi bilangan bulat (integer)?',
		code: 'teks = "25"\nangka = ...',
		options: [
			{ id: 'opt-cnv1-a', text: 'int(teks)' },
			{ id: 'opt-cnv1-b', text: 'to_int(teks)' },
			{ id: 'opt-cnv1-c', text: 'teks.toInteger()' },
			{ id: 'opt-cnv1-d', text: 'str(teks)' }
		],
		correctAnswer: 'int(teks)',
		correctAnswerId: 'opt-cnv1-a',
		explanation: 'Fungsi int() digunakan untuk mengonversi nilai yang kompatibel menjadi integer.',
		hints: ['Gunakan fungsi int().'],
		xp: 20
	},
	{
		id: 'q-cnv-2',
		topic: 'type conversion',
		difficulty: 2,
		question: 'Apa hasil dari ekspresi str(100) + " koin"?',
		code: 'hasil = str(100) + " koin"',
		options: [
			{ id: 'opt-cnv2-a', text: '"100 koin"' },
			{ id: 'opt-cnv2-b', text: 'Error tipe data' },
			{ id: 'opt-cnv2-c', text: '100' },
			{ id: 'opt-cnv2-d', text: '"koin 100"' }
		],
		correctAnswer: '"100 koin"',
		correctAnswerId: 'opt-cnv2-a',
		explanation: 'str(100) mengubah angka menjadi "100", lalu digabungkan dengan " koin".',
		hints: ['Keduanya menjadi string sebelum digabungkan.'],
		xp: 20
	},

	// ==========================================
	// 6. operator & perbandingan
	// ==========================================
	{
		id: 'q-opr-1',
		topic: 'operator',
		difficulty: 1,
		question: 'Operator apa yang digunakan untuk menghitung sisa hasil bagi (modulo)?',
		code: 'sisa = 7 % 3',
		options: [
			{ id: 'opt-opr1-a', text: '%' },
			{ id: 'opt-opr1-b', text: '//' },
			{ id: 'opt-opr1-c', text: '/' },
			{ id: 'opt-opr1-d', text: '^' }
		],
		correctAnswer: '%',
		correctAnswerId: 'opt-opr1-a',
		explanation: 'Operator % menghitung sisa pembagian. 7 % 3 menghasilkan 1.',
		hints: ['Simbol persen % adalah operator modulo.'],
		xp: 15
	},
	{
		id: 'q-opr-2',
		topic: 'operator',
		difficulty: 2,
		question: 'Berapakah hasil dari 2 ** 3 di Python?',
		code: 'print(2 ** 3)',
		options: [
			{ id: 'opt-opr2-a', text: '8' },
			{ id: 'opt-opr2-b', text: '6' },
			{ id: 'opt-opr2-c', text: '5' },
			{ id: 'opt-opr2-d', text: '9' }
		],
		correctAnswer: '8',
		correctAnswerId: 'opt-opr2-a',
		explanation: 'Operator ** adalah pangkat. 2 pangkat 3 adalah 2 * 2 * 2 = 8.',
		hints: ['** berarti pangkat, bukan perkalian biasa.'],
		xp: 20
	},
	{
		id: 'q-cmp-1',
		topic: 'perbandingan',
		difficulty: 1,
		question: 'Manakah operator perbandingan untuk memeriksa "sama dengan"?',
		code: 'if nilai ... 10:',
		options: [
			{ id: 'opt-cmp1-a', text: '==' },
			{ id: 'opt-cmp1-b', text: '=' },
			{ id: 'opt-cmp1-c', text: '===' },
			{ id: 'opt-cmp1-d', text: 'equals' }
		],
		correctAnswer: '==',
		correctAnswerId: 'opt-cmp1-a',
		explanation: 'Tanda == ganda digunakan untuk membandingkan kesamaan nilai dua sisi.',
		hints: ['Tanda sama dengan ganda.'],
		xp: 15
	},
	{
		id: 'q-cmp-2',
		topic: 'perbandingan',
		difficulty: 2,
		question: 'Apa hasil evaluasi ekspresi 15 != 10?',
		code: 'print(15 != 10)',
		options: [
			{ id: 'opt-cmp2-a', text: 'True' },
			{ id: 'opt-cmp2-b', text: 'False' },
			{ id: 'opt-cmp2-c', text: 'None' },
			{ id: 'opt-cmp2-d', text: 'Error' }
		],
		correctAnswer: 'True',
		correctAnswerId: 'opt-cmp2-a',
		explanation: 'Operator != berarti "tidak sama dengan". Karena 15 memang tidak sama dengan 10, hasilnya True.',
		hints: ['Tanda ! melambangkan not/tidak.'],
		xp: 15
	},

	// ==========================================
	// 7. boolean
	// ==========================================
	{
		id: 'q-bol-1',
		topic: 'boolean',
		difficulty: 1,
		question: 'Dua nilai yang dimiliki oleh tipe data Boolean di Python adalah...',
		code: '# Tipe data kebenaran',
		options: [
			{ id: 'opt-bol1-a', text: 'True dan False' },
			{ id: 'opt-bol1-b', text: 'true dan false (huruf kecil)' },
			{ id: 'opt-bol1-c', text: '1 dan 0 saja' },
			{ id: 'opt-bol1-d', text: 'Yes dan No' }
		],
		correctAnswer: 'True dan False',
		correctAnswerId: 'opt-bol1-a',
		explanation: 'Di Python, nilai boolean diawali huruf kapital: True dan False.',
		hints: ['Huruf pertama harus kapital.'],
		xp: 15
	},
	{
		id: 'q-bol-2',
		topic: 'boolean',
		difficulty: 2,
		question: 'Apa hasil dari ekspresi (True and False)?',
		code: 'kondisi = True and False\nprint(kondisi)',
		options: [
			{ id: 'opt-bol2-a', text: 'False' },
			{ id: 'opt-bol2-b', text: 'True' },
			{ id: 'opt-bol2-c', text: 'None' },
			{ id: 'opt-bol2-d', text: 'Error' }
		],
		correctAnswer: 'False',
		correctAnswerId: 'opt-bol2-a',
		explanation: 'Operator and hanya bernilai True jika kedua sisi bernilai True.',
		hints: ['Jika salah satu bernilai False, operator and menghasilkan False.'],
		xp: 20
	},

	// ==========================================
	// 8. if, else, elif
	// ==========================================
	{
		id: 'q-cnd-1',
		topic: 'if',
		difficulty: 1,
		question: 'Tanda baca apa yang wajib ada di akhir baris pernyataan if?',
		code: 'if nilai > 5...',
		options: [
			{ id: 'opt-cnd1-a', text: 'Titik dua (:)' },
			{ id: 'opt-cnd1-b', text: 'Titik koma (;)' },
			{ id: 'opt-cnd1-c', text: 'Tanda seru (!)' },
			{ id: 'opt-cnd1-d', text: 'Tanda kurung kurawal ({)' }
		],
		correctAnswer: 'Titik dua (:)',
		correctAnswerId: 'opt-cnd1-a',
		explanation: 'Di Python, kepala blok pernyataan (seperti if, else, for) selalu diakhiri titik dua (:).',
		hints: ['Simbol titik dua : mengawali blok indentasi baru.'],
		xp: 15
	},
	{
		id: 'q-cnd-2',
		topic: 'else',
		difficulty: 1,
		question: 'Kapan blok di dalam pernyataan else akan dieksekusi?',
		code: 'if kondisi:\n    print("A")\nelse:\n    print("B")',
		options: [
			{ id: 'opt-cnd2-a', text: 'Ketika kondisi pada if bernilai False' },
			{ id: 'opt-cnd2-b', text: 'Ketika kondisi pada if bernilai True' },
			{ id: 'opt-cnd2-c', text: 'Selalu dijalankan setiap saat' },
			{ id: 'opt-cnd2-d', text: 'Tidak pernah dijalankan' }
		],
		correctAnswer: 'Ketika kondisi pada if bernilai False',
		correctAnswerId: 'opt-cnd2-a',
		explanation: 'Blok else adalah cabang alternatif yang dijalankan saat kondisi pengujian bernilai False.',
		hints: ['Else adalah rute cadangan.'],
		xp: 15
	},
	{
		id: 'q-cnd-3',
		topic: 'elif',
		difficulty: 2,
		question: 'Kata kunci apa di Python untuk menulis "else if"?',
		code: 'if x == 1:\n    pass\n... x == 2:\n    pass',
		options: [
			{ id: 'opt-cnd3-a', text: 'elif' },
			{ id: 'opt-cnd3-b', text: 'else if' },
			{ id: 'opt-cnd3-c', text: 'elseif' },
			{ id: 'opt-cnd3-d', text: 'elsif' }
		],
		correctAnswer: 'elif',
		correctAnswerId: 'opt-cnd3-a',
		explanation: 'Python menggunakan singkatan khusus "elif" untuk cabang alternatif kondisional.',
		hints: ['Singkatan 4 huruf: e-l-i-f.'],
		xp: 20
	},
	{
		id: 'q-cnd-4',
		topic: 'if',
		difficulty: 2,
		question: 'Apa keluaran dari kode percabangan berikut?',
		code: 'skor = 85\nif skor >= 90:\n    print("A")\nelif skor >= 80:\n    print("B")\nelse:\n    print("C")',
		options: [
			{ id: 'opt-cnd4-a', text: 'B' },
			{ id: 'opt-cnd4-b', text: 'A' },
			{ id: 'opt-cnd4-c', text: 'C' },
			{ id: 'opt-cnd4-d', text: 'A dan B' }
		],
		correctAnswer: 'B',
		correctAnswerId: 'opt-cnd4-a',
		explanation: '85 tidak >= 90, tetapi 85 >= 80, sehingga cabang elif skor >= 80 yang mencetak "B" dieksekusi.',
		hints: ['Uji kondisi dari atas ke bawah.'],
		xp: 20
	},

	// ==========================================
	// 9. range()
	// ==========================================
	{
		id: 'q-rng-1',
		topic: 'range()',
		difficulty: 2,
		question: 'Angka apa saja yang dihasilkan oleh range(3)?',
		code: 'for i in range(3):\n    print(i)',
		options: [
			{ id: 'opt-rng1-a', text: '0, 1, 2' },
			{ id: 'opt-rng1-b', text: '1, 2, 3' },
			{ id: 'opt-rng1-c', text: '0, 1, 2, 3' },
			{ id: 'opt-rng1-d', text: '3 saja' }
		],
		correctAnswer: '0, 1, 2',
		correctAnswerId: 'opt-rng1-a',
		explanation: 'range(3) menghasilkan 3 angka yang dimulai dari 0 dan berhenti sebelum angka 3 (yaitu 0, 1, 2).',
		hints: ['Indeks di Python dimulai dari angka 0.'],
		xp: 20
	},
	{
		id: 'q-rng-2',
		topic: 'range()',
		difficulty: 2,
		question: 'Berapa kali perulangan berikut akan berjalan?',
		code: 'for step in range(1, 5):\n    pass',
		options: [
			{ id: 'opt-rng2-a', text: '4 kali (angka 1, 2, 3, 4)' },
			{ id: 'opt-rng2-b', text: '5 kali (angka 1, 2, 3, 4, 5)' },
			{ id: 'opt-rng2-c', text: '3 kali' },
			{ id: 'opt-rng2-d', text: '1 kali' }
		],
		correctAnswer: '4 kali (angka 1, 2, 3, 4)',
		correctAnswerId: 'opt-rng2-a',
		explanation: 'range(mulai, berhenti) mencakup batas awal 1 hingga 5 - 1 = 4 (total 4 putaran).',
		hints: ['Batas akhir tidak diikutsertakan.'],
		xp: 20
	},

	// ==========================================
	// 10. for loop
	// ==========================================
	{
		id: 'q-for-1',
		topic: 'for loop',
		difficulty: 1,
		question: 'Perintah apa yang digunakan untuk mengulangi elemen dari sekumpulan data?',
		code: '... huruf in "ABC":\n    print(huruf)',
		options: [
			{ id: 'opt-for1-a', text: 'for' },
			{ id: 'opt-for1-b', text: 'repeat' },
			{ id: 'opt-for1-c', text: 'loop' },
			{ id: 'opt-for1-d', text: 'iterate' }
		],
		correctAnswer: 'for',
		correctAnswerId: 'opt-for1-a',
		explanation: 'Pernyataan for digunakan untuk iterasi melintasi sekumpulan item.',
		hints: ['Kata kunci standar Python adalah for.'],
		xp: 15
	},
	{
		id: 'q-for-2',
		topic: 'for loop',
		difficulty: 2,
		question: 'Berapa nilai total setelah loop selesai?',
		code: 'total = 0\nfor x in [1, 2, 3]:\n    total = total + x\nprint(total)',
		options: [
			{ id: 'opt-for2-a', text: '6' },
			{ id: 'opt-for2-b', text: '3' },
			{ id: 'opt-for2-c', text: '5' },
			{ id: 'opt-for2-d', text: '0' }
		],
		correctAnswer: '6',
		correctAnswerId: 'opt-for2-a',
		explanation: 'total bertambah: 0 + 1 = 1, lalu 1 + 2 = 3, lalu 3 + 3 = 6.',
		hints: ['1 + 2 + 3 = 6.'],
		xp: 20
	},

	// ==========================================
	// 11. while loop
	// ==========================================
	{
		id: 'q-whl-1',
		topic: 'while loop',
		difficulty: 2,
		question: 'Kapan sebuah while loop akan berhenti berjalan?',
		code: 'while kondisi:\n    aksi()',
		options: [
			{ id: 'opt-whl1-a', text: 'Saat kondisinya berubah menjadi False' },
			{ id: 'opt-whl1-b', text: 'Saat kondisinya menjadi True' },
			{ id: 'opt-whl1-c', text: 'Setelah berjalan tepat 10 kali' },
			{ id: 'opt-whl1-d', text: 'Saat kode mencapai akhir file' }
		],
		correctAnswer: 'Saat kondisinya berubah menjadi False',
		correctAnswerId: 'opt-whl1-a',
		explanation: 'while loop terus mengulang selama kondisinya True dan segera berhenti saat kondisi bernilai False.',
		hints: ['While berjalan selama kondisi masih terpenuhi.'],
		xp: 20
	},
	{
		id: 'q-whl-2',
		topic: 'while loop',
		difficulty: 2,
		question: 'Apa keluaran dari perulangan while berikut?',
		code: 'n = 1\nwhile n < 4:\n    n = n + 1\nprint(n)',
		options: [
			{ id: 'opt-whl2-a', text: '4' },
			{ id: 'opt-whl2-b', text: '3' },
			{ id: 'opt-whl2-c', text: '5' },
			{ id: 'opt-whl2-d', text: '1' }
		],
		correctAnswer: '4',
		correctAnswerId: 'opt-whl2-a',
		explanation: 'Saat n = 3, n < 4 masih True, n ditambah menjadi 4. Lalu 4 < 4 adalah False sehingga loop berhenti dan mencetak 4.',
		hints: ['Loop berhenti saat n mencapai 4.'],
		xp: 20
	},
	{
		id: 'q-whl-3',
		topic: 'while loop',
		difficulty: 3,
		question: 'Apa yang terjadi jika kondisi while selalu bernilai True tanpa perubahan?',
		code: 'while True:\n    print("Maju")',
		options: [
			{ id: 'opt-whl3-a', text: 'Terjadi infinite loop (perulangan tak terbatas)' },
			{ id: 'opt-whl3-b', text: 'Program langsung keluar tanpa mencetak' },
			{ id: 'opt-whl3-c', text: 'Program mencetak 1 kali saja' },
			{ id: 'opt-whl3-d', text: 'Python otomatis memperbaiki kodenya' }
		],
		correctAnswer: 'Terjadi infinite loop (perulangan tak terbatas)',
		correctAnswerId: 'opt-whl3-a',
		explanation: 'Jika kondisi tidak pernah berubah menjadi False atau tanpa break, loop akan terus berjalan selamanya.',
		hints: ['Loop yang tidak pernah berhenti.'],
		xp: 25
	},

	// ==========================================
	// 12. basic logic & syntax
	// ==========================================
	{
		id: 'q-lgc-1',
		topic: 'basic logic',
		difficulty: 1,
		question: 'Bagaimana cara menulis komentar 1 baris yang tidak dieksekusi di Python?',
		code: '# Contoh komentar',
		options: [
			{ id: 'opt-lgc1-a', text: 'Diawali tanda pagar (#)' },
			{ id: 'opt-lgc1-b', text: 'Diawali dua garis miring (//)' },
			{ id: 'opt-lgc1-c', text: 'Diapit tanda <!-- -->' },
			{ id: 'opt-lgc1-d', text: 'Diawali kata kunci comment' }
		],
		correctAnswer: 'Diawali tanda pagar (#)',
		correctAnswerId: 'opt-lgc1-a',
		explanation: 'Tanda pagar (#) digunakan untuk komentar satu baris di Python.',
		hints: ['Simbol pagar.'],
		xp: 15
	},
	{
		id: 'q-lgc-2',
		topic: 'basic logic',
		difficulty: 1,
		question: 'Mengapa indentasi (spasi menjorok ke dalam) sangat penting di Python?',
		code: 'if True:\n    print("Halo")',
		options: [
			{ id: 'opt-lgc2-a', text: 'Menentukan kelompok/blok kode yang dijalankan' },
			{ id: 'opt-lgc2-b', text: 'Hanya hiasan agar rapi dan tidak wajib' },
			{ id: 'opt-lgc2-c', text: 'Menentukan ukuran memori variabel' },
			{ id: 'opt-lgc2-d', text: 'Agar program berjalan lebih cepat' }
		],
		correctAnswer: 'Menentukan kelompok/blok kode yang dijalankan',
		correctAnswerId: 'opt-lgc2-a',
		explanation: 'Python menggunakan indentasi spasi untuk mendefinisikan blok struktur perintah.',
		hints: ['Indentasi menggantikan kurung kurawal di bahasa pemrograman lain.'],
		xp: 15
	},
	{
		id: 'q-lgc-3',
		topic: 'basic logic',
		difficulty: 2,
		question: 'Pernyataan apa yang dipakai untuk menghentikan loop seketika?',
		code: 'for i in range(10):\n    if i == 3:\n        ...',
		options: [
			{ id: 'opt-lgc3-a', text: 'break' },
			{ id: 'opt-lgc3-b', text: 'stop' },
			{ id: 'opt-lgc3-c', text: 'exit' },
			{ id: 'opt-lgc3-d', text: 'halt' }
		],
		correctAnswer: 'break',
		correctAnswerId: 'opt-lgc3-a',
		explanation: 'Kata kunci break digunakan untuk keluar paksa dari loop seketika itu juga.',
		hints: ['Break berarti memutus loop.'],
		xp: 20
	},
	{
		id: 'q-lgc-4',
		topic: 'basic logic',
		difficulty: 2,
		question: 'Pernyataan apa yang dipakai untuk melompati iterasi saat ini dan lanjut ke iterasi berikutnya?',
		code: 'for i in range(5):\n    if i == 2:\n        ...\n    print(i)',
		options: [
			{ id: 'opt-lgc4-a', text: 'continue' },
			{ id: 'opt-lgc4-b', text: 'pass' },
			{ id: 'opt-lgc4-c', text: 'skip' },
			{ id: 'opt-lgc4-d', text: 'next' }
		],
		correctAnswer: 'continue',
		correctAnswerId: 'opt-lgc4-a',
		explanation: 'Kata kunci continue melompati sisa kode di dalam loop untuk putaran tersebut.',
		hints: ['Continue melanjutkan ke putaran berikutnya.'],
		xp: 20
	},
	{
		id: 'q-lgc-5',
		topic: 'basic logic',
		difficulty: 2,
		question: 'Apa keluaran dari kode perbandingan berikut?',
		code: 'a = 10\nb = 20\nprint(not (a > b))',
		options: [
			{ id: 'opt-lgc5-a', text: 'True' },
			{ id: 'opt-lgc5-b', text: 'False' },
			{ id: 'opt-lgc5-c', text: 'None' },
			{ id: 'opt-lgc5-d', text: 'Error' }
		],
		correctAnswer: 'True',
		correctAnswerId: 'opt-lgc5-a',
		explanation: '10 > 20 adalah False. Operator not False membalikkan nilainya menjadi True.',
		hints: ['Not membalik False menjadi True.'],
		xp: 20
	},

	// ==========================================
	// 13. Pertanyaan Tambahan Pemahaman Praktis (20+ Soal Variatif)
	// ==========================================
	{
		id: 'q-add-1',
		topic: 'string',
		difficulty: 1,
		question: 'Apa hasil dari ekspresi "Py" * 3?',
		code: 'print("Py" * 3)',
		options: [
			{ id: 'opt-add1-a', text: 'PyPyPy' },
			{ id: 'opt-add1-b', text: 'Py3' },
			{ id: 'opt-add1-c', text: 'Error' },
			{ id: 'opt-add1-d', text: 'Py Py Py' }
		],
		correctAnswer: 'PyPyPy',
		correctAnswerId: 'opt-add1-a',
		explanation: 'Mengalikan string dengan angka n akan mengulangi teks sebanyak n kali.',
		hints: ['Operator perkalian pada string mengulang teks.'],
		xp: 15
	},
	{
		id: 'q-add-2',
		topic: 'integer',
		difficulty: 2,
		question: 'Berapakah hasil pembagian bulat (floor division) dari 7 // 2?',
		code: 'print(7 // 2)',
		options: [
			{ id: 'opt-add2-a', text: '3' },
			{ id: 'opt-add2-b', text: '3.5' },
			{ id: 'opt-add2-c', text: '4' },
			{ id: 'opt-add2-d', text: '1' }
		],
		correctAnswer: '3',
		correctAnswerId: 'opt-add2-a',
		explanation: 'Operator // membulatkan hasil pembagian ke bawah ke bilangan bulat terdekat.',
		hints: ['Floor division membuang angka desimal di belakang koma.'],
		xp: 20
	},
	{
		id: 'q-add-3',
		topic: 'variable',
		difficulty: 1,
		question: 'Apakah Python membedakan huruf besar dan huruf kecil (case-sensitive)?',
		code: 'skor = 10\nSkor = 20',
		options: [
			{ id: 'opt-add3-a', text: 'Ya, skor dan Skor adalah dua variabel yang berbeda' },
			{ id: 'opt-add3-b', text: 'Tidak, keduanya merujuk ke variabel yang sama' },
			{ id: 'opt-add3-c', text: 'Hanya jika dideklarasikan khusus' },
			{ id: 'opt-add3-d', text: 'Akan menghasilkan SyntaxError' }
		],
		correctAnswer: 'Ya, skor dan Skor adalah dua variabel yang berbeda',
		correctAnswerId: 'opt-add3-a',
		explanation: 'Python bersifat case-sensitive. Nama dengan perbedaan kapitalisasi dianggap entitas berbeda.',
		hints: ['Huruf kapital dibedakan dari huruf kecil.'],
		xp: 15
	},
	{
		id: 'q-add-4',
		topic: 'operator',
		difficulty: 1,
		question: 'Apa urutan prioritas operasi matematika dalam ekspresi 2 + 3 * 4?',
		code: 'print(2 + 3 * 4)',
		options: [
			{ id: 'opt-add4-a', text: '14 (perkalian 3 * 4 dihitung lebih dulu)' },
			{ id: 'opt-add4-b', text: '20 (penjumlahan 2 + 3 dihitung lebih dulu)' },
			{ id: 'opt-add4-c', text: '24' },
			{ id: 'opt-add4-d', text: '10' }
		],
		correctAnswer: '14 (perkalian 3 * 4 dihitung lebih dulu)',
		correctAnswerId: 'opt-add4-a',
		explanation: 'Sesuai aturan matematika, perkalian memiliki prioritas lebih tinggi daripada penjumlahan.',
		hints: ['3 * 4 = 12, lalu 2 + 12.'],
		xp: 15
	},
	{
		id: 'q-add-5',
		topic: 'string',
		difficulty: 2,
		question: 'Karakter pertama pada kata = "Koding" berada pada indeks berapa?',
		code: 'kata = "Koding"\nprint(kata[0])',
		options: [
			{ id: 'opt-add5-a', text: '0' },
			{ id: 'opt-add5-b', text: '1' },
			{ id: 'opt-add5-c', text: '-1' },
			{ id: 'opt-add5-d', text: 'None' }
		],
		correctAnswer: '0',
		correctAnswerId: 'opt-add5-a',
		explanation: 'Pengindeksan string di Python dimulai dari indeks 0 (zero-based index).',
		hints: ['Python selalu mulai dari 0.'],
		xp: 20
	},
	{
		id: 'q-add-6',
		topic: 'string',
		difficulty: 2,
		question: 'Bagaimana cara mengambil karakter terakhir dari sebuah string di Python?',
		code: 'teks = "Robot"\nkarakter = ...',
		options: [
			{ id: 'opt-add6-a', text: 'teks[-1]' },
			{ id: 'opt-add6-b', text: 'teks.last()' },
			{ id: 'opt-add6-c', text: 'teks[last]' },
			{ id: 'opt-add6-d', text: 'teks[len(teks)]' }
		],
		correctAnswer: 'teks[-1]',
		correctAnswerId: 'opt-add6-a',
		explanation: 'Indeks negatif [-1] merujuk ke elemen paling terakhir dari sebuah urutan teks.',
		hints: ['Indeks negatif menghitung dari belakang.'],
		xp: 20
	},
	{
		id: 'q-add-7',
		topic: 'boolean',
		difficulty: 2,
		question: 'Apa hasil dari ekspresi (False or True)?',
		code: 'print(False or True)',
		options: [
			{ id: 'opt-add7-a', text: 'True' },
			{ id: 'opt-add7-b', text: 'False' },
			{ id: 'opt-add7-c', text: 'None' },
			{ id: 'opt-add7-d', text: 'Error' }
		],
		correctAnswer: 'True',
		correctAnswerId: 'opt-add7-a',
		explanation: 'Operator or bernilai True jika salah satu atau kedua sisi bernilai True.',
		hints: ['Cukup satu sisi bernilai benar.'],
		xp: 15
	},
	{
		id: 'q-add-8',
		topic: 'type conversion',
		difficulty: 2,
		question: 'Apa hasil dari float("3.5") + 1.5?',
		code: 'print(float("3.5") + 1.5)',
		options: [
			{ id: 'opt-add8-a', text: '5.0' },
			{ id: 'opt-add8-b', text: '5' },
			{ id: 'opt-add8-c', text: '"3.51.5"' },
			{ id: 'opt-add8-d', text: 'Error' }
		],
		correctAnswer: '5.0',
		correctAnswerId: 'opt-add8-a',
		explanation: 'float("3.5") menjadi angka desimal 3.5, lalu 3.5 + 1.5 menghasilkan 5.0.',
		hints: ['3.5 + 1.5 = 5.0.'],
		xp: 20
	},
	{
		id: 'q-add-9',
		topic: 'perbandingan',
		difficulty: 1,
		question: 'Apakah ekspresi 5 <= 5 bernilai True?',
		code: 'print(5 <= 5)',
		options: [
			{ id: 'opt-add9-a', text: 'Ya, bernilai True' },
			{ id: 'opt-add9-b', text: 'Tidak, bernilai False' },
			{ id: 'opt-add9-c', text: 'Menghasilkan Error' },
			{ id: 'opt-add9-d', text: 'None' }
		],
		correctAnswer: 'Ya, bernilai True',
		correctAnswerId: 'opt-add9-a',
		explanation: 'Operator <= memeriksa apakah nilai lebih kecil atau sama dengan. Karena 5 sama dengan 5, hasilnya True.',
		hints: ['Lebih kecil atau sama dengan.'],
		xp: 15
	},
	{
		id: 'q-add-10',
		topic: 'for loop',
		difficulty: 2,
		question: 'Berapa baris teks yang akan dicetak oleh loop ini?',
		code: 'for x in range(3):\n    print("Halo")',
		options: [
			{ id: 'opt-add10-a', text: '3 baris' },
			{ id: 'opt-add10-b', text: '4 baris' },
			{ id: 'opt-add10-c', text: '2 baris' },
			{ id: 'opt-add10-d', text: '1 baris' }
		],
		correctAnswer: '3 baris',
		correctAnswerId: 'opt-add10-a',
		explanation: 'range(3) menghasilkan 3 putaran (0, 1, 2), sehingga kata "Halo" dicetak 3 kali.',
		hints: ['Setiap putaran mencetak 1 baris.'],
		xp: 15
	},
	{
		id: 'q-add-11',
		topic: 'basic logic',
		difficulty: 2,
		question: 'Manakah baris kode yang mengalami kesalahan penulisan (SyntaxError)?',
		code: '# Amati 4 pilihan ini:',
		options: [
			{ id: 'opt-add11-a', text: 'if x == 5 (tanpa tanda titik dua)' },
			{ id: 'opt-add11-b', text: 'print("Halo")' },
			{ id: 'opt-add11-c', text: 'x = 10' },
			{ id: 'opt-add11-d', text: 'nama = "PyBot"' }
		],
		correctAnswer: 'if x == 5 (tanpa tanda titik dua)',
		correctAnswerId: 'opt-add11-a',
		explanation: 'Pernyataan kondisional di Python wajib diakhiri tanda titik dua (:).',
		hints: ['Pernyataan if harus diakhiri :.'],
		xp: 20
	},
	{
		id: 'q-add-12',
		topic: 'operator',
		difficulty: 1,
		question: 'Operator apa yang digunakan untuk perkalian di Python?',
		code: 'luas = panjang * lebar',
		options: [
			{ id: 'opt-add12-a', text: 'Tanda bintang (*)' },
			{ id: 'opt-add12-b', text: 'Huruf x' },
			{ id: 'opt-add12-c', text: 'Tanda titik (.)' },
			{ id: 'opt-add12-d', text: 'Tanda silang (×)' }
		],
		correctAnswer: 'Tanda bintang (*)',
		correctAnswerId: 'opt-add12-a',
		explanation: 'Perkalian aritmetika di Python selalu menggunakan karakter bintang (*).',
		hints: ['Simbol asterisk *.'],
		xp: 15
	},
	{
		id: 'q-add-13',
		topic: 'input()',
		difficulty: 2,
		question: 'Agar masukan umur dari input() dapat dijumlahkan dengan angka lain, apa yang harus dilakukan?',
		code: 'umur = input("Umur: ")',
		options: [
			{ id: 'opt-add13-a', text: 'Mengonversinya dengan int(umur)' },
			{ id: 'opt-add13-b', text: 'Langsung menjumlahkannya tanpa konversi' },
			{ id: 'opt-add13-c', text: 'Menghapus tanda petiknya dengan string.clear()' },
			{ id: 'opt-add13-d', text: 'Menggunakan print(umur)' }
		],
		correctAnswer: 'Mengonversinya dengan int(umur)',
		correctAnswerId: 'opt-add13-a',
		explanation: 'Karena input() menghasilkan string, kita harus mengonversinya menjadi integer menggunakan int().',
		hints: ['Konversi ke integer sebelum operasi penjumlahan.'],
		xp: 20
	},
	{
		id: 'q-add-14',
		topic: 'range()',
		difficulty: 3,
		question: 'Parameter ketiga pada range(0, 10, 2) berfungsi sebagai apa?',
		code: 'for i in range(0, 10, 2):\n    print(i)',
		options: [
			{ id: 'opt-add14-a', text: 'Ukuran langkah loncatan (step)' },
			{ id: 'opt-add14-b', text: 'Batas akhir perhitungan' },
			{ id: 'opt-add14-c', text: 'Jumlah maksimal putaran' },
			{ id: 'opt-add14-d', text: 'Nilai pengali' }
		],
		correctAnswer: 'Ukuran langkah loncatan (step)',
		correctAnswerId: 'opt-add14-a',
		explanation: 'Format range(start, stop, step) menggunakan parameter ketiga sebagai besar loncatan angka.',
		hints: ['Angka yang dihasilkan melompat 2: 0, 2, 4, 6, 8.'],
		xp: 25
	},
	{
		id: 'q-add-15',
		topic: 'basic logic',
		difficulty: 1,
		question: 'Kata kunci pass di Python berfungsi untuk apa?',
		code: 'if siap:\n    pass',
		options: [
			{ id: 'opt-add15-a', text: 'Operasi kosong (placeholder) agar tidak terjadi SyntaxError' },
			{ id: 'opt-add15-b', text: 'Menghentikan program seketika' },
			{ id: 'opt-add15-c', text: 'Mencetak kata "pass" ke layar' },
			{ id: 'opt-add15-d', text: 'Melompati baris berikutnya' }
		],
		correctAnswer: 'Operasi kosong (placeholder) agar tidak terjadi SyntaxError',
		correctAnswerId: 'opt-add15-a',
		explanation: 'pass adalah perintah null yang tidak melakukan aksi apa pun, biasa dipakai sebagai placeholder.',
		hints: ['Penanda sementara agar blok tidak kosong.'],
		xp: 15
	},
	{
		id: 'q-add-16',
		topic: 'string',
		difficulty: 2,
		question: 'Metode apa yang dipakai untuk mengubah string menjadi huruf kapital semua?',
		code: 'pesan = "halo"\nprint(pesan.upper())',
		options: [
			{ id: 'opt-add16-a', text: 'upper()' },
			{ id: 'opt-add16-b', text: 'capitalize_all()' },
			{ id: 'opt-add16-c', text: 'toUpper()' },
			{ id: 'opt-add16-d', text: 'caps()' }
		],
		correctAnswer: 'upper()',
		correctAnswerId: 'opt-add16-a',
		explanation: 'Metode .upper() mengembalikan salinan string dengan semua karakter berupa huruf besar.',
		hints: ['Lawan dari .lower().'],
		xp: 20
	},
	{
		id: 'q-add-17',
		topic: 'variable',
		difficulty: 2,
		question: 'Apa nilai variabel b setelah operasi berikut?',
		code: 'a = 10\nb = a\na = 20\nprint(b)',
		options: [
			{ id: 'opt-add17-a', text: '10' },
			{ id: 'opt-add17-b', text: '20' },
			{ id: 'opt-add17-c', text: '30' },
			{ id: 'opt-add17-d', text: 'None' }
		],
		correctAnswer: '10',
		correctAnswerId: 'opt-add17-a',
		explanation: 'Variabel b menyalin nilai a saat nilainya 10. Perubahan a berikutnya tidak memengaruhi b.',
		hints: ['Nilai primitif integer disalin saat penugasan.'],
		xp: 20
	},
	{
		id: 'q-add-18',
		topic: 'perbandingan',
		difficulty: 2,
		question: 'Apa keluaran dari perbandingan berantai 1 < 3 < 5 di Python?',
		code: 'print(1 < 3 < 5)',
		options: [
			{ id: 'opt-add18-a', text: 'True' },
			{ id: 'opt-add18-b', text: 'False' },
			{ id: 'opt-add18-c', text: 'SyntaxError' },
			{ id: 'opt-add18-d', text: 'None' }
		],
		correctAnswer: 'True',
		correctAnswerId: 'opt-add18-a',
		explanation: 'Python mendukung chained comparison. 1 < 3 and 3 < 5 keduanya benar, sehingga hasilnya True.',
		hints: ['Keduanya benar: 1 < 3 dan 3 < 5.'],
		xp: 20
	},
	{
		id: 'q-add-19',
		topic: 'while loop',
		difficulty: 2,
		question: 'Berapa kali kata "Tes" dicetak oleh program berikut?',
		code: 'i = 0\nwhile i < 2:\n    print("Tes")\n    i += 1',
		options: [
			{ id: 'opt-add19-a', text: '2 kali' },
			{ id: 'opt-add19-b', text: '1 kali' },
			{ id: 'opt-add19-c', text: '3 kali' },
			{ id: 'opt-add19-d', text: '0 kali' }
		],
		correctAnswer: '2 kali',
		correctAnswerId: 'opt-add19-a',
		explanation: 'Loop berjalan saat i = 0 dan i = 1 (2 kali putaran).',
		hints: ['i = 0 dan i = 1.'],
		xp: 20
	},
	{
		id: 'q-add-20',
		topic: 'basic logic',
		difficulty: 2,
		question: 'Simbol apa yang digunakan untuk operator penugasan penjumlahan bertambah (increment)?',
		code: 'skor = skor + 1\n# Dapat disingkat menjadi:',
		options: [
			{ id: 'opt-add20-a', text: '+=' },
			{ id: 'opt-add20-b', text: '++' },
			{ id: 'opt-add20-c', text: '=+' },
			{ id: 'opt-add20-d', text: 'add=' }
		],
		correctAnswer: '+=',
		correctAnswerId: 'opt-add20-a',
		explanation: 'Python tidak memiliki operator ++, melainkan menggunakan += untuk penugasan penambahan.',
		hints: ['Tanda plus diikuti sama dengan.'],
		xp: 20
	}
];

/**
 * Fisher-Yates array shuffle that returns a new randomized array.
 */
export function shuffleArray<T>(array: T[]): T[] {
	const copy = [...array];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[j], copy[i]] = [copy[i], copy[j]];
	}
	return copy;
}
