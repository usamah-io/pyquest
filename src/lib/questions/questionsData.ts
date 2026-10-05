import type { Question, QuestionDifficulty } from '../types';

export const questionsData: Question[] = [
	// ========================================================
	// LEVEL 1: Dasar Output & print() (Difficulty: easy)
	// ========================================================
	{
		id: 'lvl1-q1',
		level: 1,
		topic: 'print()',
		difficulty: 'easy',
		type: 'concept',
		question: 'Apa fungsi utama dari perintah print() dalam Python?',
		code: 'print("Halo Dunia")',
		options: [
			{ id: 'opt-l1q1-a', text: 'Mencetak dokumen ke mesin printer fisik' },
			{ id: 'opt-l1q1-b', text: 'Menampilkan teks atau data ke layar konsol' },
			{ id: 'opt-l1q1-c', text: 'Menyimpan berkas teks baru ke hard disk' },
			{ id: 'opt-l1q1-d', text: 'Menghapus baris kode yang salah' }
		],
		correctAnswer: 'Menampilkan teks atau data ke layar konsol',
		correctAnswerId: 'opt-l1q1-b',
		explanation: 'print() adalah fungsi bawaan Python untuk menampilkan keluaran (output) ke konsol terminal.',
		hints: [
			'Pikirkan bagian layar tempat program menampilkan tulisan hasil eksekusinya.',
			'Fungsi ini berhubungan dengan aliran keluaran standar (standard output) teks.'
		],
		xp: 15
	},
	{
		id: 'lvl1-q2',
		level: 1,
		topic: 'print()',
		difficulty: 'easy',
		type: 'output-prediction',
		question: 'Apa hasil output dari pemanggilan print() dengan dua teks terpisah koma berikut?',
		code: 'print("Halo", "Python")',
		options: [
			{ id: 'opt-l1q2-a', text: 'Halo, Python' },
			{ id: 'opt-l1q2-b', text: 'HaloPython' },
			{ id: 'opt-l1q2-c', text: 'Halo Python' },
			{ id: 'opt-l1q2-d', text: '"Halo" "Python"' }
		],
		correctAnswer: 'Halo Python',
		correctAnswerId: 'opt-l1q2-c',
		explanation: 'Secara default, parameter ganda yang dipisahkan tanda koma pada print() akan digabungkan dengan satu spasi.',
		hints: [
			'Perhatikan pemisah default antar argumen pada fungsi print().',
			'Python secara otomatis menyisipkan karakter spasi di antara nilai yang dipisahkan tanda koma.'
		],
		xp: 15
	},
	{
		id: 'lvl1-q3',
		level: 1,
		topic: 'print()',
		difficulty: 'easy',
		type: 'choose-code',
		question: 'Manakah baris kode yang benar untuk mencetak angka 25 sebagai nilai bilangan?',
		code: '# Pilih sintaks yang valid:',
		options: [
			{ id: 'opt-l1q3-a', text: 'print(25)' },
			{ id: 'opt-l1q3-b', text: 'display 25' },
			{ id: 'opt-l1q3-c', text: 'echo(25)' },
			{ id: 'opt-l1q3-d', text: 'print: 25' }
		],
		correctAnswer: 'print(25)',
		correctAnswerId: 'opt-l1q3-a',
		explanation: 'Pemanggilan fungsi di Python 3 selalu menggunakan tanda kurung buka dan tutup mengapit argumen: print(25).',
		hints: [
			'Setiap pemanggilan fungsi resmi di Python wajib menggunakan tanda kurung lengkung ().',
			'Nama fungsi baku di Python untuk menampilkan data adalah print.'
		],
		xp: 15
	},
	{
		id: 'lvl1-q4',
		level: 1,
		topic: 'print()',
		difficulty: 'easy',
		type: 'syntax',
		question: 'Apa yang akan terjadi jika kita menulis perintah print("Halo) tanpa tanda kutip penutup?',
		code: 'print("Halo)',
		options: [
			{ id: 'opt-l1q4-a', text: 'Program tetap mencetak teks "Halo"' },
			{ id: 'opt-l1q4-b', text: 'Muncul SyntaxError karena tanda kutip tidak berpasangan' },
			{ id: 'opt-l1q4-c', text: 'Program otomatis menambahkan tanda kutip sendiri' },
			{ id: 'opt-l1q4-d', text: 'Teks dicetak menjadi huruf besar semua' }
		],
		correctAnswer: 'Muncul SyntaxError karena tanda kutip tidak berpasangan',
		correctAnswerId: 'opt-l1q4-b',
		explanation: 'String di Python harus ditutup dengan pasangan tanda kutip yang sama. Jika tidak, Python menghasilkan SyntaxError.',
		hints: [
			'Python membaca data teks dari kutip pembuka hingga menemukan kutip penutup.',
			'Ketidaksesuaian struktur penulisan kode akan memicu pesan kesalahan sintaksis.'
		],
		xp: 15
	},
	{
		id: 'lvl1-q5',
		level: 1,
		topic: 'basic logic',
		difficulty: 'easy',
		type: 'code-reading',
		question: 'Bagaimana tampilan hasil dari dua perintah print() yang dieksekusi berurutan ini?',
		code: 'print("Maju")\nprint("Belok")',
		options: [
			{ id: 'opt-l1q5-a', text: 'MajuBelok di baris yang sama' },
			{ id: 'opt-l1q5-b', text: 'Maju Belok di baris yang sama dengan spasi' },
			{ id: 'opt-l1q5-c', text: 'Maju di baris pertama, Belok di baris kedua' },
			{ id: 'opt-l1q5-d', text: 'Belok di baris pertama, Maju di baris kedua' }
		],
		correctAnswer: 'Maju di baris pertama, Belok di baris kedua',
		correctAnswerId: 'opt-l1q5-c',
		explanation: 'Secara default, fungsi print() menambahkan karakter baris baru (newline) di akhir setiap panggilannya.',
		hints: [
			'Perhatikan karakter akhir default dari fungsi print() di Python.',
			'Setelah mencetak argumennya, print() otomatis memindahkan kursor ke baris berikutnya.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 2: Variabel & Nilai (Difficulty: easy)
	// ========================================================
	{
		id: 'lvl2-q1',
		level: 2,
		topic: 'variable',
		difficulty: 'easy',
		type: 'concept',
		question: 'Apa fungsi utama sebuah variabel dalam pemrograman Python?',
		code: 'skor = 100',
		options: [
			{ id: 'opt-l2q1-a', text: 'Mengunci komputer agar tidak bisa digunakan' },
			{ id: 'opt-l2q1-b', text: 'Wadah berlabel di memori untuk menyimpan dan mengelola data' },
			{ id: 'opt-l2q1-c', text: 'Menghubungkan komputer ke jaringan internet' },
			{ id: 'opt-l2q1-d', text: 'Mengubah warna teks pada editor' }
		],
		correctAnswer: 'Wadah berlabel di memori untuk menyimpan dan mengelola data',
		correctAnswerId: 'opt-l2q1-b',
		explanation: 'Variabel adalah nama referensi atau label yang menunjuk ke lokasi penyimpanan data di dalam memori komputer.',
		hints: [
			'Bayangkan kotak penyimpanan barang yang diberi label nama di luarnya.',
			'Data yang disimpan dapat diambil atau diperbarui sewaktu-waktu menggunakan nama variabel tersebut.'
		],
		xp: 15
	},
	{
		id: 'lvl2-q2',
		level: 2,
		topic: 'variable',
		difficulty: 'easy',
		type: 'choose-code',
		question: 'Manakah nama variabel yang sah dan valid menurut aturan penamaan Python?',
		code: '# Pilih nama variabel yang diperbolehkan:',
		options: [
			{ id: 'opt-l2q2-a', text: '2skor_pemain' },
			{ id: 'opt-l2q2-b', text: 'skor pemain' },
			{ id: 'opt-l2q2-c', text: 'skor_pemain' },
			{ id: 'opt-l2q2-d', text: 'for' }
		],
		correctAnswer: 'skor_pemain',
		correctAnswerId: 'opt-l2q2-c',
		explanation: 'Nama variabel tidak boleh diawali angka, tidak boleh mengandung spasi, dan tidak boleh menggunakan kata kunci bawaan seperti for.',
		hints: [
			'Variabel tidak boleh menggunakan spasi dan tidak boleh diawali karakter angka.',
			'Tanda garis bawah (underscore) sering dipakai untuk memisahkan kata dalam nama variabel.'
		],
		xp: 15
	},
	{
		id: 'lvl2-q3',
		level: 2,
		topic: 'variable',
		difficulty: 'easy',
		type: 'code-reading',
		question: 'Berapakah nilai akhir yang akan dicetak oleh baris kode berikut?',
		code: 'skor = 10\nskor = 25\nprint(skor)',
		options: [
			{ id: 'opt-l2q3-a', text: '10' },
			{ id: 'opt-l2q3-b', text: '35' },
			{ id: 'opt-l2q3-c', text: '25' },
			{ id: 'opt-l2q3-d', text: 'Error' }
		],
		correctAnswer: '25',
		correctAnswerId: 'opt-l2q3-c',
		explanation: 'Ketika nilai baru dimasukkan ke variabel yang sama, nilai lama akan ditimpa (overwritten) dengan nilai yang paling baru.',
		hints: [
			'Eksekusi program berjalan berurutan dari atas ke bawah.',
			'Perhatikan baris penugasan nilai terakhir sebelum fungsi print() dipanggil.'
		],
		xp: 15
	},
	{
		id: 'lvl2-q4',
		level: 2,
		topic: 'basic logic',
		difficulty: 'easy',
		type: 'output-prediction',
		question: 'Apa output yang dihasilkan dari kode pengisian antar-variabel ini?',
		code: 'x = 5\ny = x\nprint(y)',
		options: [
			{ id: 'opt-l2q4-a', text: '5' },
			{ id: 'opt-l2q4-b', text: 'x' },
			{ id: 'opt-l2q4-c', text: 'y' },
			{ id: 'opt-l2q4-d', text: '0' }
		],
		correctAnswer: '5',
		correctAnswerId: 'opt-l2q4-a',
		explanation: 'Pernyataan y = x menyalin nilai yang dimiliki x (yaitu 5) ke dalam variabel y.',
		hints: [
			'Tanda sama dengan (=) memasukkan nilai dari ruas kanan ke variabel di ruas kiri.',
			'Evaluasi nilai yang saat itu disimpan dalam variabel x.'
		],
		xp: 15
	},
	{
		id: 'lvl2-q5',
		level: 2,
		topic: 'variable',
		difficulty: 'easy',
		type: 'find-error',
		question: 'Mengapa kode berikut memunculkan pesan NameError?',
		code: 'nama = "Budi"\nprint(Nama)',
		options: [
			{ id: 'opt-l2q5-a', text: 'Python bersifat case-sensitive (huruf besar dan kecil dianggap berbeda)' },
			{ id: 'opt-l2q5-b', text: 'Nama "Budi" tidak boleh dipakai di Python' },
			{ id: 'opt-l2q5-c', text: 'Tanda kutip ganda tidak diperbolehkan' },
			{ id: 'opt-l2q5-d', text: 'Fungsi print tidak bisa mencetak teks nama orang' }
		],
		correctAnswer: 'Python bersifat case-sensitive (huruf besar dan kecil dianggap berbeda)',
		correctAnswerId: 'opt-l2q5-a',
		explanation: 'Variabel nama (huruf n kecil) dan Nama (huruf N besar) dianggap sebagai dua variabel yang berbeda oleh Python.',
		hints: [
			'Perhatikan huruf pertama pada saat variabel dibuat dan saat variabel dipanggil.',
			'Python membedakan penggunaan huruf kapital dan huruf non-kapital secara ketat.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 3: Tipe Data & String (Difficulty: easy)
	// ========================================================
	{
		id: 'lvl3-q1',
		level: 3,
		topic: 'float',
		difficulty: 'easy',
		type: 'type-understanding',
		question: 'Apa tipe data dari nilai bilangan berkoma 3.14 di Python?',
		code: 'pi = 3.14',
		options: [
			{ id: 'opt-l3q1-a', text: 'int (integer)' },
			{ id: 'opt-l3q1-b', text: 'str (string)' },
			{ id: 'opt-l3q1-c', text: 'float (floating-point)' },
			{ id: 'opt-l3q1-d', text: 'bool (boolean)' }
		],
		correctAnswer: 'float (floating-point)',
		correctAnswerId: 'opt-l3q1-c',
		explanation: 'Bilangan yang memiliki komponen pecahan desimal (tanda titik) bertipe data float.',
		hints: [
			'Tanda titik dalam angka Python merepresentasikan pecahan desimal.',
			'Tipe data untuk bilangan riil berkoma disebut floating-point.'
		],
		xp: 15
	},
	{
		id: 'lvl3-q2',
		level: 3,
		topic: 'string',
		difficulty: 'easy',
		type: 'output-prediction',
		question: 'Apa hasil yang dicetak ketika dua string digabungkan menggunakan tanda tambah (+) ini?',
		code: 'kata = "Py" + "thon"\nprint(kata)',
		options: [
			{ id: 'opt-l3q2-a', text: 'Py thon' },
			{ id: 'opt-l3q2-b', text: 'Python' },
			{ id: 'opt-l3q2-c', text: 'Py+thon' },
			{ id: 'opt-l3q2-d', text: 'Error' }
		],
		correctAnswer: 'Python',
		correctAnswerId: 'opt-l3q2-b',
		explanation: 'Operator + pada tipe data string berfungsi untuk menyambung teks (concatenation) tanpa spasi otomatis.',
		hints: [
			'Operator tambah pada teks menyambungkan karakter secara langsung dari ujung ke ujung.',
			'Konkatenasi string tidak menambahkan spasi kecuali spasi tersebut ditulis eksplisit.'
		],
		xp: 15
	},
	{
		id: 'lvl3-q3',
		level: 3,
		topic: 'type conversion',
		difficulty: 'easy',
		type: 'concept',
		question: 'Fungsi bawaan Python apa yang dapat digunakan untuk mengetahui tipe data suatu nilai?',
		code: 'x = 100\nprint(type(x))',
		options: [
			{ id: 'opt-l3q3-a', text: 'check()' },
			{ id: 'opt-l3q3-b', text: 'type()' },
			{ id: 'opt-l3q3-c', text: 'whatis()' },
			{ id: 'opt-l3q3-d', text: 'datatype()' }
		],
		correctAnswer: 'type()',
		correctAnswerId: 'opt-l3q3-b',
		explanation: 'Fungsi type() mengembalikan informasi kelas atau tipe data dari objek atau variabel yang diberikan.',
		hints: [
			'Kata bahasa Inggris untuk jenis atau tipe adalah "type".',
			'Fungsi ini sering digunakan untuk memeriksa apakah suatu data berupa int, str, atau float.'
		],
		xp: 15
	},
	{
		id: 'lvl3-q4',
		level: 3,
		topic: 'string',
		difficulty: 'easy',
		type: 'output-prediction',
		question: 'Perhatikan tanda kutip pada kode berikut. Apa hasil yang dicetak ke layar?',
		code: 'a = "3"\nb = "4"\nprint(a + b)',
		options: [
			{ id: 'opt-l3q4-a', text: '7' },
			{ id: 'opt-l3q4-b', text: '34' },
			{ id: 'opt-l3q4-c', text: '12' },
			{ id: 'opt-l3q4-d', text: '"7"' }
		],
		correctAnswer: '34',
		correctAnswerId: 'opt-l3q4-b',
		explanation: 'Karena angka berada di dalam tanda kutip, a dan b adalah string. Operator + menyambung kedua teks menjadi "34", bukan 7.',
		hints: [
			'Perhatikan tanda kutip yang membungkus nilai tersebut.',
			'Teks "3" dan teks "4" digabungkan sebagai karakter tulisan, bukan nilai aritmatika.'
		],
		xp: 15
	},
	{
		id: 'lvl3-q5',
		level: 3,
		topic: 'integer',
		difficulty: 'easy',
		type: 'type-understanding',
		question: 'Manakah di antara nilai berikut yang memiliki tipe data int (integer)?',
		code: '# Tentukan nilai yang bertipe int:',
		options: [
			{ id: 'opt-l3q5-a', text: '"50"' },
			{ id: 'opt-l3q5-b', text: '50.0' },
			{ id: 'opt-l3q5-c', text: '50' },
			{ id: 'opt-l3q5-d', text: '[50]' }
		],
		correctAnswer: '50',
		correctAnswerId: 'opt-l3q5-c',
		explanation: 'Integer adalah bilangan bulat tanpa tanda kutip dan tanpa tanda titik desimal.',
		hints: [
			'Integer mewakili bilangan bulat murni.',
			'Nilai tidak diapit tanda kutip dan tidak memiliki tanda titik desimal.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 4: Input Pengguna & Konversi (Difficulty: medium)
	// ========================================================
	{
		id: 'lvl4-q1',
		level: 4,
		topic: 'input()',
		difficulty: 'medium',
		type: 'concept',
		question: 'Secara default, apa tipe data dari nilai yang dikembalikan oleh fungsi input() di Python?',
		code: 'nama = input("Masukkan nama: ")',
		options: [
			{ id: 'opt-l4q1-a', text: 'int (integer)' },
			{ id: 'opt-l4q1-b', text: 'str (string/teks)' },
			{ id: 'opt-l4q1-c', text: 'bool (boolean)' },
			{ id: 'opt-l4q1-d', text: 'auto (menyesuaikan otomatis)' }
		],
		correctAnswer: 'str (string/teks)',
		correctAnswerId: 'opt-l4q1-b',
		explanation: 'Fungsi input() selalu membaca masukan keyboard pengguna sebagai tipe data string (str), meskipun yang diketik adalah angka.',
		hints: [
			'Semua masukan dari papan ketik (keyboard) diperlakukan sebagai urutan karakter tulisan.',
			'Jika ingin menjadikannya angka, programmer harus melakukan konversi tipe data terlebih dahulu.'
		],
		xp: 15
	},
	{
		id: 'lvl4-q2',
		level: 4,
		topic: 'input()',
		difficulty: 'medium',
		type: 'find-error',
		question: 'Mengapa kode berikut menimbulkan TypeError saat dijalankan?',
		code: 'umur = input("Berapa umurmu? ")\nprint(umur + 5)',
		options: [
			{ id: 'opt-l4q2-a', text: 'input() menghasilkan string sehingga tidak bisa ditambah langsung dengan int 5' },
			{ id: 'opt-l4q2-b', text: 'Kata "umur" adalah kata terlarang di Python' },
			{ id: 'opt-l4q2-c', text: 'Fungsi input tidak boleh memiliki teks pertanyaan' },
			{ id: 'opt-l4q2-d', text: 'Angka 5 harus ditulis di baris terpisah' }
		],
		correctAnswer: 'input() menghasilkan string sehingga tidak bisa ditambah langsung dengan int 5',
		correctAnswerId: 'opt-l4q2-a',
		explanation: 'Di Python, tipe data str tidak dapat dijumlahkan secara langsung dengan int menggunakan operator +.',
		hints: [
			'Periksa tipe data dari variabel umur yang dihasilkan oleh fungsi input().',
			'Operasi penjumlahan matematika membutuhkan kedua operand bertipe numerik.'
		],
		xp: 15
	},
	{
		id: 'lvl4-q3',
		level: 4,
		topic: 'type conversion',
		difficulty: 'medium',
		type: 'choose-code',
		question: 'Bagaimana cara yang tepat agar input angka dari pengguna langsung dikonversi menjadi bilangan bulat?',
		code: '# Pilih sintaks konversi yang benar:',
		options: [
			{ id: 'opt-l4q3-a', text: 'angka = str(input())' },
			{ id: 'opt-l4q3-b', text: 'angka = int(input())' },
			{ id: 'opt-l4q3-c', text: 'angka = input().to_int()' },
			{ id: 'opt-l4q3-d', text: 'angka = parse(input())' }
		],
		correctAnswer: 'angka = int(input())',
		correctAnswerId: 'opt-l4q3-b',
		explanation: 'Membungkus fungsi input() ke dalam fungsi int() akan langsung mengonversi teks masukan menjadi bilangan bulat.',
		hints: [
			'Fungsi konversi ke bilangan bulat di Python memiliki nama int().',
			'Hasil dari input() dimasukkan sebagai argumen di dalam int(...).'
		],
		xp: 15
	},
	{
		id: 'lvl4-q4',
		level: 4,
		topic: 'type conversion',
		difficulty: 'medium',
		type: 'code-reading',
		question: 'Berapakah hasil keluaran yang dicetak dari kode berikut?',
		code: 'teks = "10"\nangka = int(teks)\nprint(angka + 5)',
		options: [
			{ id: 'opt-l4q4-a', text: '105' },
			{ id: 'opt-l4q4-b', text: '15' },
			{ id: 'opt-l4q4-c', text: '"15"' },
			{ id: 'opt-l4q4-d', text: 'Error' }
		],
		correctAnswer: '15',
		correctAnswerId: 'opt-l4q4-b',
		explanation: 'Fungsi int("10") mengubah teks "10" menjadi bilangan bulat 10, sehingga 10 + 5 menghasilkan 15.',
		hints: [
			'Teks "10" telah berhasil diubah menjadi bilangan bulat oleh fungsi int().',
			'Penjumlahan 10 + 5 berlangsung sebagai operasi matematika biasa.'
		],
		xp: 15
	},
	{
		id: 'lvl4-q5',
		level: 4,
		topic: 'float',
		difficulty: 'medium',
		type: 'output-prediction',
		question: 'Apa hasil dari perkalian nilai float hasil konversi berikut?',
		code: 'nilai = float("7.5")\nprint(nilai * 2)',
		options: [
			{ id: 'opt-l4q5-a', text: '15.0' },
			{ id: 'opt-l4q5-b', text: '7.57.5' },
			{ id: 'opt-l4q5-c', text: '15' },
			{ id: 'opt-l4q5-d', text: 'Error' }
		],
		correctAnswer: '15.0',
		correctAnswerId: 'opt-l4q5-a',
		explanation: 'Operasi perkalian pada float menghasilkan nilai float juga: 7.5 * 2 = 15.0.',
		hints: [
			'float("7.5") menghasilkan bilangan desimal 7.5.',
			'Operasi aritmatika pada float tetap mempertahankan format desimalnya.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 5: Operator Aritmatika (Difficulty: medium)
	// ========================================================
	{
		id: 'lvl5-q1',
		level: 5,
		topic: 'operator',
		difficulty: 'medium',
		type: 'output-prediction',
		question: 'Apa hasil yang dicetak oleh operasi pembagian bulat (floor division //) berikut?',
		code: 'print(10 // 3)',
		options: [
			{ id: 'opt-l5q1-a', text: '3.33' },
			{ id: 'opt-l5q1-b', text: '3' },
			{ id: 'opt-l5q1-c', text: '1' },
			{ id: 'opt-l5q1-d', text: '4' }
		],
		correctAnswer: '3',
		correctAnswerId: 'opt-l5q1-b',
		explanation: 'Operator // membagi angka lalu membulatkan ke bawah ke bilangan bulat terdekat (floor division), membuang sisa desimalnya.',
		hints: [
			'Simbol // adalah pembagian bulat, bukan pembagian desimal biasa.',
			'Angka di belakang koma diabaikan atau dibulatkan ke bawah.'
		],
		xp: 15
	},
	{
		id: 'lvl5-q2',
		level: 5,
		topic: 'operator',
		difficulty: 'medium',
		type: 'output-prediction',
		question: 'Apa hasil yang dicetak oleh operator modulus (%) berikut?',
		code: 'print(11 % 4)',
		options: [
			{ id: 'opt-l5q2-a', text: '2.75' },
			{ id: 'opt-l5q2-b', text: '2' },
			{ id: 'opt-l5q2-c', text: '3' },
			{ id: 'opt-l5q2-d', text: '0' }
		],
		correctAnswer: '3',
		correctAnswerId: 'opt-l5q2-c',
		explanation: 'Operator modulus (%) menghitung sisa hasil bagi. 11 dibagi 4 adalah 2 dengan sisa 3.',
		hints: [
			'Operator % mencari sisa pembagian, bukan hasil baginya.',
			'Hitung kelipatan 4 terdekat di bawah 11, lalu cari selisihnya.'
		],
		xp: 15
	},
	{
		id: 'lvl5-q3',
		level: 5,
		topic: 'operator',
		difficulty: 'medium',
		type: 'concept',
		question: 'Operator apakah yang digunakan untuk operasi pemangkatan (eksponensial) di Python?',
		code: '# Contoh menghitung 2 pangkat 3:\nhasil = 2 ... 3',
		options: [
			{ id: 'opt-l5q3-a', text: '^' },
			{ id: 'opt-l5q3-b', text: '**' },
			{ id: 'opt-l5q3-c', text: 'pangkat' },
			{ id: 'opt-l5q3-d', text: '//' }
		],
		correctAnswer: '**',
		correctAnswerId: 'opt-l5q3-b',
		explanation: 'Di Python, operator dua tanda bintang (**) digunakan untuk pemangkatan: 2 ** 3 = 8. Simbol ^ adalah operator bitwise XOR.',
		hints: [
			'Python menggunakan tanda bintang ganda untuk menghitung pangkat.',
			'Tanda ^ di Python bukan untuk eksponen, melainkan operasi biner.'
		],
		xp: 15
	},
	{
		id: 'lvl5-q4',
		level: 5,
		topic: 'integer',
		difficulty: 'medium',
		type: 'code-reading',
		question: 'Berapakah nilai x berdasarkan urutan prioritas operator matematika?',
		code: 'x = 2 + 3 * 4\nprint(x)',
		options: [
			{ id: 'opt-l5q4-a', text: '20' },
			{ id: 'opt-l5q4-b', text: '14' },
			{ id: 'opt-l5q4-c', text: '24' },
			{ id: 'opt-l5q4-d', text: '9' }
		],
		correctAnswer: '14',
		correctAnswerId: 'opt-l5q4-b',
		explanation: 'Operator perkalian (*) memiliki prioritas lebih tinggi daripada penjumlahan (+), sehingga 3 * 4 dihitung dulu (=12), lalu ditambah 2 (=14).',
		hints: [
			'Ingat aturan prioritas operasi matematika standar (KABATAKU / PEMDAS).',
			'Perkalian diselesaikan terlebih dahulu sebelum penjumlahan.'
		],
		xp: 15
	},
	{
		id: 'lvl5-q5',
		level: 5,
		topic: 'operator',
		difficulty: 'medium',
		type: 'output-prediction',
		question: 'Apa hasil yang dicetak setelah eksekusi operator penugasan majemuk (+=) ini?',
		code: 'skor = 10\nskor += 5\nprint(skor)',
		options: [
			{ id: 'opt-l5q5-a', text: '15' },
			{ id: 'opt-l5q5-b', text: '5' },
			{ id: 'opt-l5q5-c', text: '10' },
			{ id: 'opt-l5q5-d', text: 'skor5' }
		],
		correctAnswer: '15',
		correctAnswerId: 'opt-l5q5-a',
		explanation: 'skor += 5 adalah penulisan singkat dari skor = skor + 5, sehingga 10 + 5 menghasilkan 15.',
		hints: [
			'Bentuk += menjumlahkan nilai lama variabel dengan nilai di sisi kanan.',
			'Nilai awal 10 ditambah dengan 5 dan disimpan kembali.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 6: Logika Boolean & Perbandingan (Difficulty: medium)
	// ========================================================
	{
		id: 'lvl6-q1',
		level: 6,
		topic: 'boolean',
		difficulty: 'medium',
		type: 'concept',
		question: 'Apa dua kemungkinan nilai yang dimiliki oleh tipe data Boolean di Python?',
		code: 'aktif = True',
		options: [
			{ id: 'opt-l6q1-a', text: 'yes dan no' },
			{ id: 'opt-l6q1-b', text: 'True dan False (diawali huruf kapital)' },
			{ id: 'opt-l6q1-c', text: '1 dan -1' },
			{ id: 'opt-l6q1-d', text: 'benar dan salah' }
		],
		correctAnswer: 'True dan False (diawali huruf kapital)',
		correctAnswerId: 'opt-l6q1-b',
		explanation: 'Di Python, nilai kebenaran Boolean ditulis baku sebagai True dan False dengan huruf pertama kapital.',
		hints: [
			'Perhatikan ejaan bahasa Inggris baku untuk benar dan salah di Python.',
			'Huruf pertama pada kata tersebut wajib ditulis dengan huruf besar.'
		],
		xp: 15
	},
	{
		id: 'lvl6-q2',
		level: 6,
		topic: 'comparison',
		difficulty: 'medium',
		type: 'condition-logic',
		question: 'Apa hasil evaluasi perbandingan nilai dan tipe data berikut?',
		code: 'print(5 == "5")',
		options: [
			{ id: 'opt-l6q2-a', text: 'True' },
			{ id: 'opt-l6q2-b', text: 'False' },
			{ id: 'opt-l6q2-c', text: 'None' },
			{ id: 'opt-l6q2-d', text: 'TypeError' }
		],
		correctAnswer: 'False',
		correctAnswerId: 'opt-l6q2-b',
		explanation: 'Angka integer 5 tidak sama dengan teks string "5" karena keduanya memiliki tipe data yang berbeda.',
		hints: [
			'Bandingkan tipe data dari kedua nilai tersebut.',
			'Python tidak menganggap sama antara bilangan integer dan teks string.'
		],
		xp: 15
	},
	{
		id: 'lvl6-q3',
		level: 6,
		topic: 'boolean',
		difficulty: 'medium',
		type: 'condition-logic',
		question: 'Apa hasil dari pembalikan kondisi menggunakan operator not berikut?',
		code: 'print(not (10 > 5))',
		options: [
			{ id: 'opt-l6q3-a', text: 'True' },
			{ id: 'opt-l6q3-b', text: 'False' },
			{ id: 'opt-l6q3-c', text: '10' },
			{ id: 'opt-l6q3-d', text: 'Error' }
		],
		correctAnswer: 'False',
		correctAnswerId: 'opt-l6q3-b',
		explanation: '10 > 5 bernilai True. Operator not membalikkan nilai True menjadi False.',
		hints: [
			'Evaluasi terlebih dahulu kondisi di dalam tanda kurung: apakah 10 lebih besar dari 5?',
			'Operator not membalikkan nilai kebenaran dari ekspresi tersebut.'
		],
		xp: 15
	},
	{
		id: 'lvl6-q4',
		level: 6,
		topic: 'comparison',
		difficulty: 'medium',
		type: 'output-prediction',
		question: 'Apa hasil evaluasi logika gabungan dengan operator and berikut?',
		code: 'x = 7\nprint(x >= 5 and x < 10)',
		options: [
			{ id: 'opt-l6q4-a', text: 'True' },
			{ id: 'opt-l6q4-b', text: 'False' },
			{ id: 'opt-l6q4-c', text: '7' },
			{ id: 'opt-l6q4-d', text: 'None' }
		],
		correctAnswer: 'True',
		correctAnswerId: 'opt-l6q4-a',
		explanation: '7 >= 5 bernilai True dan 7 < 10 juga True. True and True menghasilkan nilai True.',
		hints: [
			'Operator and mensyaratkan kedua kondisi kiri dan kanan bernilai benar.',
			'Cek apakah angka 7 berada dalam rentang minimal 5 dan kurang dari 10.'
		],
		xp: 15
	},
	{
		id: 'lvl6-q5',
		level: 6,
		topic: 'comparison',
		difficulty: 'medium',
		type: 'choose-code',
		question: 'Manakah operator perbandingan yang digunakan untuk memeriksa apakah dua nilai TIDAK sama?',
		code: '# Pilih operator ketidaksamaan:',
		options: [
			{ id: 'opt-l6q5-a', text: '<>' },
			{ id: 'opt-l6q5-b', text: '!=' },
			{ id: 'opt-l6q5-c', text: 'not==' },
			{ id: 'opt-l6q5-d', text: '==' }
		],
		correctAnswer: '!=',
		correctAnswerId: 'opt-l6q5-b',
		explanation: 'Di Python modern, operator != digunakan untuk memeriksa ketidaksamaan dua nilai.',
		hints: [
			'Tanda seru (!) dalam banyak bahasa pemrograman melambangkan negasi/bukan.',
			'Kombinasi tanda seru dan sama dengan membentuk operator tidak sama dengan.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 7: Percabangan if & else (Difficulty: hard)
	// ========================================================
	{
		id: 'lvl7-q1',
		level: 7,
		topic: 'syntax',
		difficulty: 'hard',
		type: 'syntax',
		question: 'Tanda baca apa yang wajib diletakkan di akhir baris pernyataan kondisi if?',
		code: 'if nilai >= 75...\n    print("Lulus")',
		options: [
			{ id: 'opt-l7q1-a', text: 'Tanda titik koma (;)' },
			{ id: 'opt-l7q1-b', text: 'Tanda titik dua (:)' },
			{ id: 'opt-l7q1-c', text: 'Tanda panah (->)' },
			{ id: 'opt-l7q1-d', text: 'Tanda kurung kurawal ({})' }
		],
		correctAnswer: 'Tanda titik dua (:)',
		correctAnswerId: 'opt-l7q1-b',
		explanation: 'Setiap baris pembuka blok kontrol di Python (seperti if, else, for, def) wajib diakhiri tanda titik dua (:).',
		hints: [
			'Tanda baca ini menandakan bahwa blok kode baru yang menjorok akan dimulai di baris bawahnya.',
			'Bentuk tanda bacanya adalah dua titik bersusun vertikal.'
		],
		xp: 15
	},
	{
		id: 'lvl7-q2',
		level: 7,
		topic: 'if',
		difficulty: 'hard',
		type: 'condition-logic',
		question: 'Apa teks yang dicetak oleh blok percabangan if-else ini?',
		code: 'nilai = 80\nif nilai >= 75:\n    print("Lulus")\nelse:\n    print("Remedial")',
		options: [
			{ id: 'opt-l7q2-a', text: 'Remedial' },
			{ id: 'opt-l7q2-b', text: 'Lulus' },
			{ id: 'opt-l7q2-c', text: 'Lulus Remedial' },
			{ id: 'opt-l7q2-d', text: 'Tidak mencetak apapun' }
		],
		correctAnswer: 'Lulus',
		correctAnswerId: 'opt-l7q2-b',
		explanation: 'Karena nilai 80 >= 75 bernilai True, blok kode di bawah if yang dieksekusi, sedangkan blok else dilewati.',
		hints: [
			'Periksa apakah kondisi 80 >= 75 bernilai True atau False.',
			'Jika kondisi if bernilai True, blok else tidak akan pernah dijalankan.'
		],
		xp: 15
	},
	{
		id: 'lvl7-q3',
		level: 7,
		topic: 'if',
		difficulty: 'hard',
		type: 'concept',
		question: 'Mengapa indentasi (spasi menjorok) sangat penting di bawah baris if?',
		code: 'if siap:\n    print("Jalan")',
		options: [
			{ id: 'opt-l7q3-a', text: 'Hanya sebagai hiasan agar kode terlihat rapi' },
			{ id: 'opt-l7q3-b', text: 'Memberitahu Python bahwa baris tersebut adalah isi dari blok if' },
			{ id: 'opt-l7q3-c', text: 'Membuat program berjalan lebih cepat' },
			{ id: 'opt-l7q3-d', text: 'Wajib ada 10 spasi tepat' }
		],
		correctAnswer: 'Memberitahu Python bahwa baris tersebut adalah isi dari blok if',
		correctAnswerId: 'opt-l7q3-b',
		explanation: 'Python tidak menggunakan tanda kurung kurawal untuk blok kode, melainkan mengandalkan indentasi untuk menentukan hierarki cakupan blok.',
		hints: [
			'Python menggunakan spasi indentasi untuk mengelompokkan baris instruksi.',
			'Tanpa indentasi, Python tidak tahu baris mana yang terikat di dalam kondisi if.'
		],
		xp: 15
	},
	{
		id: 'lvl7-q4',
		level: 7,
		topic: 'else',
		difficulty: 'hard',
		type: 'output-prediction',
		question: 'Apa hasil output dari kode dengan baris di luar indentasi berikut?',
		code: 'skor = 40\nif skor > 50:\n    print("Hebat")\nprint("Selesai")',
		options: [
			{ id: 'opt-l7q4-a', text: 'Hebat' },
			{ id: 'opt-l7q4-b', text: 'Selesai' },
			{ id: 'opt-l7q4-c', text: 'Hebat Selesai' },
			{ id: 'opt-l7q4-d', text: 'Error IndentationError' }
		],
		correctAnswer: 'Selesai',
		correctAnswerId: 'opt-l7q4-b',
		explanation: 'skor > 50 bernilai False sehingga "Hebat" tidak dicetak. Namun print("Selesai") tidak menjorok, jadi selalu dieksekusi setelah if selesai.',
		hints: [
			'Perhatikan baris print("Selesai") yang posisinya sejajar dengan if (tidak menjorok).',
			'Instruksi yang tidak menjorok berada di luar kendali blok if.'
		],
		xp: 15
	},
	{
		id: 'lvl7-q5',
		level: 7,
		topic: 'if',
		difficulty: 'hard',
		type: 'find-error',
		question: 'Apa kesalahan sintaksis yang menyebabkan kode ini gagal dijalankan?',
		code: 'x = 10\nif x > 5 print("Besar")',
		options: [
			{ id: 'opt-l7q5-a', text: 'Kurang tanda titik dua (:) setelah x > 5' },
			{ id: 'opt-l7q5-b', text: 'Variabel x harus berupa huruf besar' },
			{ id: 'opt-l7q5-c', text: 'Angka 5 tidak boleh dibandingkan dengan 10' },
			{ id: 'opt-l7q5-d', text: 'Kata "Besar" harus menggunakan petik tunggal' }
		],
		correctAnswer: 'Kurang tanda titik dua (:) setelah x > 5',
		correctAnswerId: 'opt-l7q5-a',
		explanation: 'Pernyataan if wajib diakhiri dengan tanda titik dua (:) sebelum blok instruksinya ditulis.',
		hints: [
			'Lihat tanda baca di akhir pernyataan kondisi if sebelum perintah print.',
			'Setiap kepala blok di Python harus ditutup dengan karakter titik dua.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 8: Percabangan Majemuk elif (Difficulty: hard)
	// ========================================================
	{
		id: 'lvl8-q1',
		level: 8,
		topic: 'elif',
		difficulty: 'hard',
		type: 'concept',
		question: 'Kapan blok kondisi elif akan dievaluasi oleh Python?',
		code: 'if a:\n    ...\nelif b:\n    ...',
		options: [
			{ id: 'opt-l8q1-a', text: 'Selalu dievaluasi bersamaan dengan if' },
			{ id: 'opt-l8q1-b', text: 'Hanya jika kondisi if di atasnya bernilai False' },
			{ id: 'opt-l8q1-c', text: 'Hanya jika kondisi if di atasnya bernilai True' },
			{ id: 'opt-l8q1-d', text: 'Hanya setelah blok else selesai dieksekusi' }
		],
		correctAnswer: 'Hanya jika kondisi if di atasnya bernilai False',
		correctAnswerId: 'opt-l8q1-b',
		explanation: 'elif adalah singkatan dari "else if". Blok ini hanya diperiksa jika kondisi sebelumnya bernilai False.',
		hints: [
			'Pikirkan elif sebagai rencana cadangan jika kondisi utama di atasnya tidak terpenuhi.',
			'Jika kondisi pertama sudah True, blok elif di bawahnya otomatis dilewati.'
		],
		xp: 15
	},
	{
		id: 'lvl8-q2',
		level: 8,
		topic: 'elif',
		difficulty: 'hard',
		type: 'condition-logic',
		question: 'Berapakah grade yang akan dicetak oleh percabangan multi-kondisi ini?',
		code: 'skor = 85\nif skor >= 90:\n    print("A")\nelif skor >= 80:\n    print("B")\nelse:\n    print("C")',
		options: [
			{ id: 'opt-l8q2-a', text: 'A' },
			{ id: 'opt-l8q2-b', text: 'B' },
			{ id: 'opt-l8q2-c', text: 'C' },
			{ id: 'opt-l8q2-d', text: 'A dan B' }
		],
		correctAnswer: 'B',
		correctAnswerId: 'opt-l8q2-b',
		explanation: 'skor >= 90 bernilai False (85 < 90), lalu Python memeriksa elif skor >= 80 yang bernilai True. Maka "B" dicetak.',
		hints: [
			'Cek kondisi pertama: apakah 85 >= 90? (False).',
			'Lanjut ke kondisi kedua: apakah 85 >= 80? (True).'
		],
		xp: 15
	},
	{
		id: 'lvl8-q3',
		level: 8,
		topic: 'elif',
		difficulty: 'hard',
		type: 'code-reading',
		question: 'Perhatikan urutan kondisi berikut. Teks apa yang dicetak ke layar konsol?',
		code: 'x = 10\nif x > 5:\n    print("Satu")\nelif x > 8:\n    print("Dua")\nelse:\n    print("Tiga")',
		options: [
			{ id: 'opt-l8q3-a', text: 'Satu' },
			{ id: 'opt-l8q3-b', text: 'Dua' },
			{ id: 'opt-l8q3-c', text: 'Satu dan Dua' },
			{ id: 'opt-l8q3-d', text: 'Tiga' }
		],
		correctAnswer: 'Satu',
		correctAnswerId: 'opt-l8q3-a',
		explanation: 'Meskipun 10 > 8 juga benar, Python langsung berhenti mengecek elif setelah kondisi pertama (x > 5) terpenuhi.',
		hints: [
			'Pada struktur if-elif-else, hanya SATU blok pertama yang kondisinya True yang dieksekusi.',
			'Setelah satu cabang terpenuhi, seluruh cabang lainnya diabaikan.'
		],
		xp: 15
	},
	{
		id: 'lvl8-q4',
		level: 8,
		topic: 'elif',
		difficulty: 'hard',
		type: 'choose-code',
		question: 'Berapa banyak blok elif yang diperbolehkan di antara satu if dan else di Python?',
		code: '# Batas jumlah elif dalam satu struktur if:',
		options: [
			{ id: 'opt-l8q4-a', text: 'Hanya boleh 1 elif saja' },
			{ id: 'opt-l8q4-b', text: 'Maksimal 3 elif' },
			{ id: 'opt-l8q4-c', text: 'Sebanyak yang dibutuhkan tanpa batas' },
			{ id: 'opt-l8q4-d', text: 'Wajib tepat 2 elif' }
		],
		correctAnswer: 'Sebanyak yang dibutuhkan tanpa batas',
		correctAnswerId: 'opt-l8q4-c',
		explanation: 'Python mengizinkan penulisan blok elif sebanyak apapun sesuai dengan kebutuhan logika pemecahan masalah.',
		hints: [
			'Pikirkan logika menu pilihan atau sistem penilaian dengan banyak kategori.',
			'Tidak ada aturan bahasa Python yang membatasi jumlah percabangan elif.'
		],
		xp: 15
	},
	{
		id: 'lvl8-q5',
		level: 8,
		topic: 'else',
		difficulty: 'hard',
		type: 'condition-logic',
		question: 'Apa hasil output dari kode evaluasi kondisi cuaca berikut?',
		code: 'cuaca = "hujan"\nif cuaca == "panas":\n    print("Topi")\nelif cuaca == "dingin":\n    print("Jaket")\nelse:\n    print("Payung")',
		options: [
			{ id: 'opt-l8q5-a', text: 'Topi' },
			{ id: 'opt-l8q5-b', text: 'Jaket' },
			{ id: 'opt-l8q5-c', text: 'Payung' },
			{ id: 'opt-l8q5-d', text: 'None' }
		],
		correctAnswer: 'Payung',
		correctAnswerId: 'opt-l8q5-c',
		explanation: 'Kondisi if ("panas") dan elif ("dingin") keduanya False, sehingga program mengeksekusi cabang cadangan terakhir yaitu else ("Payung").',
		hints: [
			'Apakah nilai cuaca sama dengan "panas"? (Bukan).',
			'Apakah nilai cuaca sama dengan "dingin"? (Bukan). Perhatikan blok penanganan terakhir.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 9: Perulangan for & range() (Difficulty: challenge)
	// ========================================================
	{
		id: 'lvl9-q1',
		level: 9,
		topic: 'range()',
		difficulty: 'challenge',
		type: 'concept',
		question: 'Urutan angka apakah yang dihasilkan oleh fungsi pemanggil range(4)?',
		code: 'for i in range(4):\n    print(i)',
		options: [
			{ id: 'opt-l9q1-a', text: '1, 2, 3, 4' },
			{ id: 'opt-l9q1-b', text: '0, 1, 2, 3' },
			{ id: 'opt-l9q1-c', text: '0, 1, 2, 3, 4' },
			{ id: 'opt-l9q1-d', text: '1, 2, 3' }
		],
		correctAnswer: '0, 1, 2, 3',
		correctAnswerId: 'opt-l9q1-b',
		explanation: 'range(n) menghasilkan urutan angka mulai dari 0 sampai n-1. Jadi range(4) menghasilkan 0, 1, 2, dan 3 (total 4 angka).',
		hints: [
			'Indeks dan deret bawaan di Python selalu dimulai dari angka nol (0).',
			'Angka batas akhir (stop) bersifat eksklusif, artinya tidak diikutsertakan.'
		],
		xp: 15
	},
	{
		id: 'lvl9-q2',
		level: 9,
		topic: 'for loop',
		difficulty: 'challenge',
		type: 'output-prediction',
		question: 'Berapakah nilai total yang dicetak setelah for loop selesai mengakumulasi nilai?',
		code: 'total = 0\nfor i in range(3):\n    total += i\nprint(total)',
		options: [
			{ id: 'opt-l9q2-a', text: '6' },
			{ id: 'opt-l9q2-b', text: '3' },
			{ id: 'opt-l9q2-c', text: '0' },
			{ id: 'opt-l9q2-d', text: '5' }
		],
		correctAnswer: '3',
		correctAnswerId: 'opt-l9q2-b',
		explanation: 'range(3) menghasilkan i = 0, 1, 2. Penjumlahan akumulasinya adalah total = 0 + 0 + 1 + 2 = 3.',
		hints: [
			'Tentukan angka-angka yang dihasilkan oleh range(3): yaitu 0, 1, dan 2.',
			'Jumlahkan angka-angka tersebut satu demi satu ke dalam variabel total.'
		],
		xp: 15
	},
	{
		id: 'lvl9-q3',
		level: 9,
		topic: 'for loop',
		difficulty: 'challenge',
		type: 'code-reading',
		question: 'Bagaimana hasil keluaran saat for loop mengiterasi setiap huruf dalam string ini?',
		code: 'for huruf in "Py":\n    print(huruf)',
		options: [
			{ id: 'opt-l9q3-a', text: 'Py di baris yang sama' },
			{ id: 'opt-l9q3-b', text: 'P di baris pertama, y di baris kedua' },
			{ id: 'opt-l9q3-c', text: 'huruf huruf' },
			{ id: 'opt-l9q3-d', text: 'Error karena string tidak bisa di-loop' }
		],
		correctAnswer: 'P di baris pertama, y di baris kedua',
		correctAnswerId: 'opt-l9q3-b',
		explanation: 'String adalah objek iterable. For loop mengambil satu karakter per putaran dan print() mencetaknya di baris baru.',
		hints: [
			'For loop dapat mengiterasi string karakter demi karakter dari awal hingga akhir.',
			'Ingat bahwa setiap pemanggilan print() otomatis berpindah ke baris baru.'
		],
		xp: 15
	},
	{
		id: 'lvl9-q4',
		level: 9,
		topic: 'range()',
		difficulty: 'challenge',
		type: 'condition-logic',
		question: 'Berapa kali blok instruksi di dalam perulangan ini akan dieksekusi?',
		code: 'for i in range(1, 5):\n    print("Langkah")',
		options: [
			{ id: 'opt-l9q4-a', text: '5 kali' },
			{ id: 'opt-l9q4-b', text: '4 kali' },
			{ id: 'opt-l9q4-c', text: '1 kali' },
			{ id: 'opt-l9q4-d', text: '6 kali' }
		],
		correctAnswer: '4 kali',
		correctAnswerId: 'opt-l9q4-b',
		explanation: 'range(1, 5) dimulai dari 1 dan berhenti sebelum 5 (yaitu 1, 2, 3, 4), sehingga perulangan berjalan tepat 4 kali.',
		hints: [
			'Format range(start, stop) dimulai dari nilai start hingga stop - 1.',
			'Hitung berapa banyak bilangan dari 1 hingga 4.'
		],
		xp: 15
	},
	{
		id: 'lvl9-q5',
		level: 9,
		topic: 'range()',
		difficulty: 'challenge',
		type: 'output-prediction',
		question: 'Apa urutan angka yang dihasilkan saat range() menggunakan parameter lompatan (step) ini?',
		code: 'for i in range(2, 8, 2):\n    print(i, end=" ")',
		options: [
			{ id: 'opt-l9q5-a', text: '2 4 6 8' },
			{ id: 'opt-l9q5-b', text: '2 4 6' },
			{ id: 'opt-l9q5-c', text: '2 3 4 5 6 7' },
			{ id: 'opt-l9q5-d', text: '2 8' }
		],
		correctAnswer: '2 4 6',
		correctAnswerId: 'opt-l9q5-b',
		explanation: 'range(2, 8, 2) mulai dari 2 dengan lompatan 2 hingga sebelum 8: nilainya adalah 2, 4, dan 6 (angka 8 tidak diikutsertakan).',
		hints: [
			'Parameter ketiga pada range(start, stop, step) adalah besar kelipatan penambahan.',
			'Ingat kembali bahwa batas atas 8 tidak diikutsertakan ke dalam hasil.'
		],
		xp: 15
	},

	// ========================================================
	// LEVEL 10: Perulangan while & Logika (Difficulty: challenge)
	// ========================================================
	{
		id: 'lvl10-q1',
		level: 10,
		topic: 'while loop',
		difficulty: 'challenge',
		type: 'concept',
		question: 'Apa prinsip dasar yang membedakan perulangan while loop dengan for loop?',
		code: 'while kondisi:\n    aksi()',
		options: [
			{ id: 'opt-l10q1-a', text: 'while loop hanya bisa berjalan tepat 10 kali' },
			{ id: 'opt-l10q1-b', text: 'while loop terus mengulang selama kondisi bernilai True dan berhenti saat False' },
			{ id: 'opt-l10q1-c', text: 'while loop tidak membutuhkan kondisi pemeriksaan' },
			{ id: 'opt-l10q1-d', text: 'while loop tidak dapat digabungkan dengan variabel angka' }
		],
		correctAnswer: 'while loop terus mengulang selama kondisi bernilai True dan berhenti saat False',
		correctAnswerId: 'opt-l10q1-b',
		explanation: 'while loop adalah perulangan kondisional yang terus berulang selama ekspresi syarat bernilai True.',
		hints: [
			'Kata "while" bermakna "selama".',
			'Perulangan memeriksa kebenaran kondisi sebelum memulai setiap putaran.'
		],
		xp: 15
	},
	{
		id: 'lvl10-q2',
		level: 10,
		topic: 'while loop',
		difficulty: 'challenge',
		type: 'condition-logic',
		question: 'Berapakah nilai akhir x yang dicetak setelah perulangan while berikut selesai?',
		code: 'x = 1\nwhile x < 4:\n    x += 1\nprint(x)',
		options: [
			{ id: 'opt-l10q2-a', text: '3' },
			{ id: 'opt-l10q2-b', text: '4' },
			{ id: 'opt-l10q2-c', text: '5' },
			{ id: 'opt-l10q2-d', text: '1' }
		],
		correctAnswer: '4',
		correctAnswerId: 'opt-l10q2-b',
		explanation: 'Saat x=3 (3 < 4 True), x bertambah jadi 4. Pada putaran berikutnya, kondisi 4 < 4 adalah False, loop berhenti, dan 4 dicetak.',
		hints: [
			'Lacak nilai x pada setiap iterasi: x bertambah dari 1 menjadi 2, lalu 3, lalu 4.',
			'Tentukan kapan kondisi x < 4 berubah menjadi False dan loop berhenti.'
		],
		xp: 15
	},
	{
		id: 'lvl10-q3',
		level: 10,
		topic: 'while loop',
		difficulty: 'challenge',
		type: 'find-error',
		question: 'Apa bahaya yang terjadi jika baris pembaruan variabel angka += 1 dihilangkan dari kode ini?',
		code: 'angka = 1\nwhile angka <= 5:\n    print(angka)\n    # angka += 1 dihilangkan',
		options: [
			{ id: 'opt-l10q3-a', text: 'Program langsung berhenti tanpa mencetak apapun' },
			{ id: 'opt-l10q3-b', text: 'Terjadi infinite loop (perulangan tanpa henti yang menghabiskan memori)' },
			{ id: 'opt-l10q3-c', text: 'Python otomatis menambahkan angka menjadi 5' },
			{ id: 'opt-l10q3-d', text: 'Muncul SyntaxError pada baris while' }
		],
		correctAnswer: 'Terjadi infinite loop (perulangan tanpa henti yang menghabiskan memori)',
		correctAnswerId: 'opt-l10q3-b',
		explanation: 'Jika variabel angka tidak pernah ditambah, kondisi angka <= 5 akan selalu bernilai True selamanya (infinite loop).',
		hints: [
			'Jika nilai angka tetap 1, periksa apakah kondisi 1 <= 5 akan pernah berubah menjadi False.',
			'Perulangan yang tidak memiliki jalan keluar akan berjalan terus-menerus tanpa henti.'
		],
		xp: 15
	},
	{
		id: 'lvl10-q4',
		level: 10,
		topic: 'basic logic',
		difficulty: 'challenge',
		type: 'output-prediction',
		question: 'Berapakah nilai hitung mundur terakhir yang dicetak oleh kode berikut?',
		code: 'hitung = 3\nwhile hitung > 0:\n    hitung -= 1\nprint(hitung)',
		options: [
			{ id: 'opt-l10q4-a', text: '1' },
			{ id: 'opt-l10q4-b', text: '0' },
			{ id: 'opt-l10q4-c', text: '-1' },
			{ id: 'opt-l10q4-d', text: '3' }
		],
		correctAnswer: '0',
		correctAnswerId: 'opt-l10q4-b',
		explanation: 'Saat hitung bernilai 1 (1 > 0 True), hitung dikurangi 1 menjadi 0. Saat dicek kembali, 0 > 0 bernilai False, loop selesai, mencetak 0.',
		hints: [
			'Saat variabel hitung bernilai 1, ia dikurangi 1 menjadi 0 di dalam perulangan.',
			'Periksa apakah 0 > 0 bernilai True atau False untuk menghentikan loop.'
		],
		xp: 15
	},
	{
		id: 'lvl10-q5',
		level: 10,
		topic: 'basic logic',
		difficulty: 'challenge',
		type: 'code-reading',
		question: 'Berapakah total akumulasi s yang dihasilkan dari kombinasi variabel dan while loop ini?',
		code: 's = 0\ni = 1\nwhile i <= 3:\n    s += i\n    i += 1\nprint(s)',
		options: [
			{ id: 'opt-l10q5-a', text: '3' },
			{ id: 'opt-l10q5-b', text: '6' },
			{ id: 'opt-l10q5-c', text: '4' },
			{ id: 'opt-l10q5-d', text: '10' }
		],
		correctAnswer: '6',
		correctAnswerId: 'opt-l10q5-b',
		explanation: 'Perulangan menjumlahkan nilai i=1, i=2, dan i=3 ke variabel s: s = 0 + 1 + 2 + 3 = 6.',
		hints: [
			'Telusuri perulangan untuk setiap nilai i: 1, 2, dan 3.',
			'Jumlahkan nilai-nilai tersebut: 1 + 2 + 3.'
		],
		xp: 15
	}
];

// Helper functions for topic, level, and difficulty filtering
export function getQuestionsByLevel(levelId: number): Question[] {
	return questionsData.filter((q) => q.level === levelId);
}

export function getQuestionsByTopic(topic: string): Question[] {
	return questionsData.filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()));
}

export function getQuestionsByDifficulty(diff: QuestionDifficulty): Question[] {
	return questionsData.filter((q) => q.difficulty === diff);
}

export function getQuestionById(questionId: string): Question | undefined {
	return questionsData.find((q) => q.id === questionId);
}

// Deterministic array shuffler that returns a new array copy
export function shuffleArray<T>(array: T[]): T[] {
	const copy = [...array];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}
