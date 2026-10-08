import type { Question, QuestionDifficulty } from '../types';

export const questionsData: Question[] = [
	{
		"id": "lvl1-q1",
		"level": 1,
		"topic": "print()",
		"difficulty": "easy",
		"type": "concept",
		"question": "Apa fungsi utama dari perintah print() dalam Python?",
		"code": "print(\"Halo Dunia\")",
		"options": [
			{
				"id": "opt-l1q1-a",
				"text": "Mencetak dokumen ke mesin printer fisik"
			},
			{
				"id": "opt-l1q1-b",
				"text": "Menampilkan teks atau data ke layar konsol"
			},
			{
				"id": "opt-l1q1-c",
				"text": "Menyimpan berkas teks baru ke hard disk"
			},
			{
				"id": "opt-l1q1-d",
				"text": "Menghapus baris kode yang salah"
			}
		],
		"correctAnswer": "Menampilkan teks atau data ke layar konsol",
		"correctAnswerId": "opt-l1q1-b",
		"explanation": "print() adalah fungsi bawaan Python untuk menampilkan keluaran (output) ke konsol terminal.",
		"hints": [
			"Pikirkan bagian layar tempat program menampilkan tulisan hasil eksekusinya.",
			"Fungsi ini berhubungan dengan aliran keluaran standar (standard output) teks."
		],
		"xp": 15
	},
	{
		"id": "lvl1-q2",
		"level": 1,
		"topic": "print()",
		"difficulty": "easy",
		"type": "output-prediction",
		"question": "Apa hasil output dari pemanggilan print() dengan dua teks terpisah koma berikut?",
		"code": "print(\"Halo\", \"Python\")",
		"options": [
			{
				"id": "opt-l1q2-a",
				"text": "Halo, Python"
			},
			{
				"id": "opt-l1q2-b",
				"text": "HaloPython"
			},
			{
				"id": "opt-l1q2-c",
				"text": "Halo Python"
			},
			{
				"id": "opt-l1q2-d",
				"text": "\"Halo\" \"Python\""
			}
		],
		"correctAnswer": "Halo Python",
		"correctAnswerId": "opt-l1q2-c",
		"explanation": "Secara default, parameter ganda yang dipisahkan tanda koma pada print() akan digabungkan dengan satu spasi.",
		"hints": [
			"Perhatikan pemisah default antar argumen pada fungsi print().",
			"Python secara otomatis menyisipkan karakter spasi di antara nilai yang dipisahkan tanda koma."
		],
		"xp": 15
	},
	{
		"id": "lvl1-q3",
		"level": 1,
		"topic": "print()",
		"difficulty": "easy",
		"type": "choose-code",
		"question": "Manakah baris kode yang benar untuk mencetak angka 25 sebagai nilai bilangan?",
		"code": "# Pilih sintaks yang valid:",
		"options": [
			{
				"id": "opt-l1q3-a",
				"text": "print(25)"
			},
			{
				"id": "opt-l1q3-b",
				"text": "display 25"
			},
			{
				"id": "opt-l1q3-c",
				"text": "echo(25)"
			},
			{
				"id": "opt-l1q3-d",
				"text": "print: 25"
			}
		],
		"correctAnswer": "print(25)",
		"correctAnswerId": "opt-l1q3-a",
		"explanation": "Pemanggilan fungsi di Python 3 selalu menggunakan tanda kurung buka dan tutup mengapit argumen: print(25).",
		"hints": [
			"Setiap pemanggilan fungsi resmi di Python wajib menggunakan tanda kurung lengkung ().",
			"Nama fungsi baku di Python untuk menampilkan data adalah print."
		],
		"xp": 15
	},
	{
		"id": "lvl1-q4",
		"level": 1,
		"topic": "print()",
		"difficulty": "easy",
		"type": "syntax",
		"question": "Apa yang akan terjadi jika kita menulis perintah print(\"Halo) tanpa tanda kutip penutup?",
		"code": "print(\"Halo)",
		"options": [
			{
				"id": "opt-l1q4-a",
				"text": "Program tetap mencetak teks \"Halo\""
			},
			{
				"id": "opt-l1q4-b",
				"text": "Muncul SyntaxError karena tanda kutip tidak berpasangan"
			},
			{
				"id": "opt-l1q4-c",
				"text": "Program otomatis menambahkan tanda kutip sendiri"
			},
			{
				"id": "opt-l1q4-d",
				"text": "Teks dicetak menjadi huruf besar semua"
			}
		],
		"correctAnswer": "Muncul SyntaxError karena tanda kutip tidak berpasangan",
		"correctAnswerId": "opt-l1q4-b",
		"explanation": "String di Python harus ditutup dengan pasangan tanda kutip yang sama. Jika tidak, Python menghasilkan SyntaxError.",
		"hints": [
			"Python membaca data teks dari kutip pembuka hingga menemukan kutip penutup.",
			"Ketidaksesuaian struktur penulisan kode akan memicu pesan kesalahan sintaksis."
		],
		"xp": 15
	},
	{
		"id": "lvl1-q5",
		"level": 1,
		"topic": "basic logic",
		"difficulty": "easy",
		"type": "code-reading",
		"question": "Bagaimana tampilan hasil dari dua perintah print() yang dieksekusi berurutan ini?",
		"code": "print(\"Maju\")\nprint(\"Belok\")",
		"options": [
			{
				"id": "opt-l1q5-a",
				"text": "MajuBelok di baris yang sama"
			},
			{
				"id": "opt-l1q5-b",
				"text": "Maju Belok di baris yang sama dengan spasi"
			},
			{
				"id": "opt-l1q5-c",
				"text": "Maju di baris pertama, Belok di baris kedua"
			},
			{
				"id": "opt-l1q5-d",
				"text": "Belok di baris pertama, Maju di baris kedua"
			}
		],
		"correctAnswer": "Maju di baris pertama, Belok di baris kedua",
		"correctAnswerId": "opt-l1q5-c",
		"explanation": "Secara default, fungsi print() menambahkan karakter baris baru (newline) di akhir setiap panggilannya.",
		"hints": [
			"Perhatikan karakter akhir default dari fungsi print() di Python.",
			"Setelah mencetak argumennya, print() otomatis memindahkan kursor ke baris berikutnya."
		],
		"xp": 15
	},
	{
		"id": "lvl2-q1",
		"level": 2,
		"topic": "variable",
		"difficulty": "easy",
		"type": "concept",
		"question": "Apa fungsi utama sebuah variabel dalam pemrograman Python?",
		"code": "skor = 100",
		"options": [
			{
				"id": "opt-l2q1-a",
				"text": "Mengunci komputer agar tidak bisa digunakan"
			},
			{
				"id": "opt-l2q1-b",
				"text": "Wadah berlabel di memori untuk menyimpan dan mengelola data"
			},
			{
				"id": "opt-l2q1-c",
				"text": "Menghubungkan komputer ke jaringan internet"
			},
			{
				"id": "opt-l2q1-d",
				"text": "Mengubah warna teks pada editor"
			}
		],
		"correctAnswer": "Wadah berlabel di memori untuk menyimpan dan mengelola data",
		"correctAnswerId": "opt-l2q1-b",
		"explanation": "Variabel adalah nama referensi atau label yang menunjuk ke lokasi penyimpanan data di dalam memori komputer.",
		"hints": [
			"Bayangkan kotak penyimpanan barang yang diberi label nama di luarnya.",
			"Data yang disimpan dapat diambil atau diperbarui sewaktu-waktu menggunakan nama variabel tersebut."
		],
		"xp": 15
	},
	{
		"id": "lvl2-q2",
		"level": 2,
		"topic": "variable",
		"difficulty": "easy",
		"type": "choose-code",
		"question": "Manakah nama variabel yang sah dan valid menurut aturan penamaan Python?",
		"code": "# Pilih nama variabel yang diperbolehkan:",
		"options": [
			{
				"id": "opt-l2q2-a",
				"text": "2skor_pemain"
			},
			{
				"id": "opt-l2q2-b",
				"text": "skor pemain"
			},
			{
				"id": "opt-l2q2-c",
				"text": "skor_pemain"
			},
			{
				"id": "opt-l2q2-d",
				"text": "for"
			}
		],
		"correctAnswer": "skor_pemain",
		"correctAnswerId": "opt-l2q2-c",
		"explanation": "Nama variabel tidak boleh diawali angka, tidak boleh mengandung spasi, dan tidak boleh menggunakan kata kunci bawaan seperti for.",
		"hints": [
			"Variabel tidak boleh menggunakan spasi dan tidak boleh diawali karakter angka.",
			"Tanda garis bawah (underscore) sering dipakai untuk memisahkan kata dalam nama variabel."
		],
		"xp": 15
	},
	{
		"id": "lvl2-q3",
		"level": 2,
		"topic": "variable",
		"difficulty": "easy",
		"type": "code-reading",
		"question": "Berapakah nilai akhir yang akan dicetak oleh baris kode berikut?",
		"code": "skor = 10\nskor = 25\nprint(skor)",
		"options": [
			{
				"id": "opt-l2q3-a",
				"text": "10"
			},
			{
				"id": "opt-l2q3-b",
				"text": "35"
			},
			{
				"id": "opt-l2q3-c",
				"text": "25"
			},
			{
				"id": "opt-l2q3-d",
				"text": "Error"
			}
		],
		"correctAnswer": "25",
		"correctAnswerId": "opt-l2q3-c",
		"explanation": "Ketika nilai baru dimasukkan ke variabel yang sama, nilai lama akan ditimpa (overwritten) dengan nilai yang paling baru.",
		"hints": [
			"Eksekusi program berjalan berurutan dari atas ke bawah.",
			"Perhatikan baris penugasan nilai terakhir sebelum fungsi print() dipanggil."
		],
		"xp": 15
	},
	{
		"id": "lvl2-q4",
		"level": 2,
		"topic": "basic logic",
		"difficulty": "easy",
		"type": "output-prediction",
		"question": "Apa output yang dihasilkan dari kode pengisian antar-variabel ini?",
		"code": "x = 5\ny = x\nprint(y)",
		"options": [
			{
				"id": "opt-l2q4-a",
				"text": "5"
			},
			{
				"id": "opt-l2q4-b",
				"text": "x"
			},
			{
				"id": "opt-l2q4-c",
				"text": "y"
			},
			{
				"id": "opt-l2q4-d",
				"text": "0"
			}
		],
		"correctAnswer": "5",
		"correctAnswerId": "opt-l2q4-a",
		"explanation": "Pernyataan y = x menyalin nilai yang dimiliki x (yaitu 5) ke dalam variabel y.",
		"hints": [
			"Tanda sama dengan (=) memasukkan nilai dari ruas kanan ke variabel di ruas kiri.",
			"Evaluasi nilai yang saat itu disimpan dalam variabel x."
		],
		"xp": 15
	},
	{
		"id": "lvl2-q5",
		"level": 2,
		"topic": "variable",
		"difficulty": "easy",
		"type": "find-error",
		"question": "Mengapa kode berikut memunculkan pesan NameError?",
		"code": "nama = \"Budi\"\nprint(Nama)",
		"options": [
			{
				"id": "opt-l2q5-a",
				"text": "Python bersifat case-sensitive (huruf besar dan kecil dianggap berbeda)"
			},
			{
				"id": "opt-l2q5-b",
				"text": "Nama \"Budi\" tidak boleh dipakai di Python"
			},
			{
				"id": "opt-l2q5-c",
				"text": "Tanda kutip ganda tidak diperbolehkan"
			},
			{
				"id": "opt-l2q5-d",
				"text": "Fungsi print tidak bisa mencetak teks nama orang"
			}
		],
		"correctAnswer": "Python bersifat case-sensitive (huruf besar dan kecil dianggap berbeda)",
		"correctAnswerId": "opt-l2q5-a",
		"explanation": "Variabel nama (huruf n kecil) dan Nama (huruf N besar) dianggap sebagai dua variabel yang berbeda oleh Python.",
		"hints": [
			"Perhatikan huruf pertama pada saat variabel dibuat dan saat variabel dipanggil.",
			"Python membedakan penggunaan huruf kapital dan huruf non-kapital secara ketat."
		],
		"xp": 15
	},
	{
		"id": "lvl3-q1",
		"level": 3,
		"topic": "float",
		"difficulty": "easy",
		"type": "type-understanding",
		"question": "Apa tipe data dari nilai bilangan berkoma 3.14 di Python?",
		"code": "pi = 3.14",
		"options": [
			{
				"id": "opt-l3q1-a",
				"text": "int (integer)"
			},
			{
				"id": "opt-l3q1-b",
				"text": "str (string)"
			},
			{
				"id": "opt-l3q1-c",
				"text": "float (floating-point)"
			},
			{
				"id": "opt-l3q1-d",
				"text": "bool (boolean)"
			}
		],
		"correctAnswer": "float (floating-point)",
		"correctAnswerId": "opt-l3q1-c",
		"explanation": "Bilangan yang memiliki komponen pecahan desimal (tanda titik) bertipe data float.",
		"hints": [
			"Tanda titik dalam angka Python merepresentasikan pecahan desimal.",
			"Tipe data untuk bilangan riil berkoma disebut floating-point."
		],
		"xp": 15
	},
	{
		"id": "lvl3-q2",
		"level": 3,
		"topic": "string",
		"difficulty": "easy",
		"type": "output-prediction",
		"question": "Apa hasil yang dicetak ketika dua string digabungkan menggunakan tanda tambah (+) ini?",
		"code": "kata = \"Py\" + \"thon\"\nprint(kata)",
		"options": [
			{
				"id": "opt-l3q2-a",
				"text": "Py thon"
			},
			{
				"id": "opt-l3q2-b",
				"text": "Python"
			},
			{
				"id": "opt-l3q2-c",
				"text": "Py+thon"
			},
			{
				"id": "opt-l3q2-d",
				"text": "Error"
			}
		],
		"correctAnswer": "Python",
		"correctAnswerId": "opt-l3q2-b",
		"explanation": "Operator + pada tipe data string berfungsi untuk menyambung teks (concatenation) tanpa spasi otomatis.",
		"hints": [
			"Operator tambah pada teks menyambungkan karakter secara langsung dari ujung ke ujung.",
			"Konkatenasi string tidak menambahkan spasi kecuali spasi tersebut ditulis eksplisit."
		],
		"xp": 15
	},
	{
		"id": "lvl3-q3",
		"level": 3,
		"topic": "type conversion",
		"difficulty": "easy",
		"type": "concept",
		"question": "Fungsi bawaan Python apa yang dapat digunakan untuk mengetahui tipe data suatu nilai?",
		"code": "x = 100\nprint(type(x))",
		"options": [
			{
				"id": "opt-l3q3-a",
				"text": "check()"
			},
			{
				"id": "opt-l3q3-b",
				"text": "type()"
			},
			{
				"id": "opt-l3q3-c",
				"text": "whatis()"
			},
			{
				"id": "opt-l3q3-d",
				"text": "datatype()"
			}
		],
		"correctAnswer": "type()",
		"correctAnswerId": "opt-l3q3-b",
		"explanation": "Fungsi type() mengembalikan informasi kelas atau tipe data dari objek atau variabel yang diberikan.",
		"hints": [
			"Kata bahasa Inggris untuk jenis atau tipe adalah \"type\".",
			"Fungsi ini sering digunakan untuk memeriksa apakah suatu data berupa int, str, atau float."
		],
		"xp": 15
	},
	{
		"id": "lvl3-q4",
		"level": 3,
		"topic": "string",
		"difficulty": "easy",
		"type": "output-prediction",
		"question": "Perhatikan tanda kutip pada kode berikut. Apa hasil yang dicetak ke layar?",
		"code": "a = \"3\"\nb = \"4\"\nprint(a + b)",
		"options": [
			{
				"id": "opt-l3q4-a",
				"text": "7"
			},
			{
				"id": "opt-l3q4-b",
				"text": "34"
			},
			{
				"id": "opt-l3q4-c",
				"text": "12"
			},
			{
				"id": "opt-l3q4-d",
				"text": "\"7\""
			}
		],
		"correctAnswer": "34",
		"correctAnswerId": "opt-l3q4-b",
		"explanation": "Karena angka berada di dalam tanda kutip, a dan b adalah string. Operator + menyambung kedua teks menjadi \"34\", bukan 7.",
		"hints": [
			"Perhatikan tanda kutip yang membungkus nilai tersebut.",
			"Teks \"3\" dan teks \"4\" digabungkan sebagai karakter tulisan, bukan nilai aritmatika."
		],
		"xp": 15
	},
	{
		"id": "lvl3-q5",
		"level": 3,
		"topic": "integer",
		"difficulty": "easy",
		"type": "type-understanding",
		"question": "Manakah di antara nilai berikut yang memiliki tipe data int (integer)?",
		"code": "# Tentukan nilai yang bertipe int:",
		"options": [
			{
				"id": "opt-l3q5-a",
				"text": "\"50\""
			},
			{
				"id": "opt-l3q5-b",
				"text": "50.0"
			},
			{
				"id": "opt-l3q5-c",
				"text": "50"
			},
			{
				"id": "opt-l3q5-d",
				"text": "[50]"
			}
		],
		"correctAnswer": "50",
		"correctAnswerId": "opt-l3q5-c",
		"explanation": "Integer adalah bilangan bulat tanpa tanda kutip dan tanpa tanda titik desimal.",
		"hints": [
			"Integer mewakili bilangan bulat murni.",
			"Nilai tidak diapit tanda kutip dan tidak memiliki tanda titik desimal."
		],
		"xp": 15
	},
	{
		"id": "lvl4-q1",
		"level": 4,
		"topic": "input()",
		"difficulty": "medium",
		"type": "concept",
		"question": "Secara default, apa tipe data dari nilai yang dikembalikan oleh fungsi input() di Python?",
		"code": "nama = input(\"Masukkan nama: \")",
		"options": [
			{
				"id": "opt-l4q1-a",
				"text": "int (integer)"
			},
			{
				"id": "opt-l4q1-b",
				"text": "str (string/teks)"
			},
			{
				"id": "opt-l4q1-c",
				"text": "bool (boolean)"
			},
			{
				"id": "opt-l4q1-d",
				"text": "auto (menyesuaikan otomatis)"
			}
		],
		"correctAnswer": "str (string/teks)",
		"correctAnswerId": "opt-l4q1-b",
		"explanation": "Fungsi input() selalu membaca masukan keyboard pengguna sebagai tipe data string (str), meskipun yang diketik adalah angka.",
		"hints": [
			"Semua masukan dari papan ketik (keyboard) diperlakukan sebagai urutan karakter tulisan.",
			"Jika ingin menjadikannya angka, programmer harus melakukan konversi tipe data terlebih dahulu."
		],
		"xp": 15
	},
	{
		"id": "lvl4-q2",
		"level": 4,
		"topic": "input()",
		"difficulty": "medium",
		"type": "find-error",
		"question": "Mengapa kode berikut menimbulkan TypeError saat dijalankan?",
		"code": "umur = input(\"Berapa umurmu? \")\nprint(umur + 5)",
		"options": [
			{
				"id": "opt-l4q2-a",
				"text": "input() menghasilkan string sehingga tidak bisa ditambah langsung dengan int 5"
			},
			{
				"id": "opt-l4q2-b",
				"text": "Kata \"umur\" adalah kata terlarang di Python"
			},
			{
				"id": "opt-l4q2-c",
				"text": "Fungsi input tidak boleh memiliki teks pertanyaan"
			},
			{
				"id": "opt-l4q2-d",
				"text": "Angka 5 harus ditulis di baris terpisah"
			}
		],
		"correctAnswer": "input() menghasilkan string sehingga tidak bisa ditambah langsung dengan int 5",
		"correctAnswerId": "opt-l4q2-a",
		"explanation": "Di Python, tipe data str tidak dapat dijumlahkan secara langsung dengan int menggunakan operator +.",
		"hints": [
			"Periksa tipe data dari variabel umur yang dihasilkan oleh fungsi input().",
			"Operasi penjumlahan matematika membutuhkan kedua operand bertipe numerik."
		],
		"xp": 15
	},
	{
		"id": "lvl4-q3",
		"level": 4,
		"topic": "type conversion",
		"difficulty": "medium",
		"type": "choose-code",
		"question": "Bagaimana cara yang tepat agar input angka dari pengguna langsung dikonversi menjadi bilangan bulat?",
		"code": "# Pilih sintaks konversi yang benar:",
		"options": [
			{
				"id": "opt-l4q3-a",
				"text": "angka = str(input())"
			},
			{
				"id": "opt-l4q3-b",
				"text": "angka = int(input())"
			},
			{
				"id": "opt-l4q3-c",
				"text": "angka = input().to_int()"
			},
			{
				"id": "opt-l4q3-d",
				"text": "angka = parse(input())"
			}
		],
		"correctAnswer": "angka = int(input())",
		"correctAnswerId": "opt-l4q3-b",
		"explanation": "Membungkus fungsi input() ke dalam fungsi int() akan langsung mengonversi teks masukan menjadi bilangan bulat.",
		"hints": [
			"Fungsi konversi ke bilangan bulat di Python memiliki nama int().",
			"Hasil dari input() dimasukkan sebagai argumen di dalam int(...)."
		],
		"xp": 15
	},
	{
		"id": "lvl4-q4",
		"level": 4,
		"topic": "type conversion",
		"difficulty": "medium",
		"type": "code-reading",
		"question": "Berapakah hasil keluaran yang dicetak dari kode berikut?",
		"code": "teks = \"10\"\nangka = int(teks)\nprint(angka + 5)",
		"options": [
			{
				"id": "opt-l4q4-a",
				"text": "105"
			},
			{
				"id": "opt-l4q4-b",
				"text": "15"
			},
			{
				"id": "opt-l4q4-c",
				"text": "\"15\""
			},
			{
				"id": "opt-l4q4-d",
				"text": "Error"
			}
		],
		"correctAnswer": "15",
		"correctAnswerId": "opt-l4q4-b",
		"explanation": "Fungsi int(\"10\") mengubah teks \"10\" menjadi bilangan bulat 10, sehingga 10 + 5 menghasilkan 15.",
		"hints": [
			"Teks \"10\" telah berhasil diubah menjadi bilangan bulat oleh fungsi int().",
			"Penjumlahan 10 + 5 berlangsung sebagai operasi matematika biasa."
		],
		"xp": 15
	},
	{
		"id": "lvl4-q5",
		"level": 4,
		"topic": "float",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa hasil dari perkalian nilai float hasil konversi berikut?",
		"code": "nilai = float(\"7.5\")\nprint(nilai * 2)",
		"options": [
			{
				"id": "opt-l4q5-a",
				"text": "15.0"
			},
			{
				"id": "opt-l4q5-b",
				"text": "7.57.5"
			},
			{
				"id": "opt-l4q5-c",
				"text": "15"
			},
			{
				"id": "opt-l4q5-d",
				"text": "Error"
			}
		],
		"correctAnswer": "15.0",
		"correctAnswerId": "opt-l4q5-a",
		"explanation": "Operasi perkalian pada float menghasilkan nilai float juga: 7.5 * 2 = 15.0.",
		"hints": [
			"float(\"7.5\") menghasilkan bilangan desimal 7.5.",
			"Operasi aritmatika pada float tetap mempertahankan format desimalnya."
		],
		"xp": 15
	},
	{
		"id": "lvl5-q1",
		"level": 5,
		"topic": "operator",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa hasil yang dicetak oleh operasi pembagian bulat (floor division //) berikut?",
		"code": "print(10 // 3)",
		"options": [
			{
				"id": "opt-l5q1-a",
				"text": "3.33"
			},
			{
				"id": "opt-l5q1-b",
				"text": "3"
			},
			{
				"id": "opt-l5q1-c",
				"text": "1"
			},
			{
				"id": "opt-l5q1-d",
				"text": "4"
			}
		],
		"correctAnswer": "3",
		"correctAnswerId": "opt-l5q1-b",
		"explanation": "Operator // membagi angka lalu membulatkan ke bawah ke bilangan bulat terdekat (floor division), membuang sisa desimalnya.",
		"hints": [
			"Simbol // adalah pembagian bulat, bukan pembagian desimal biasa.",
			"Angka di belakang koma diabaikan atau dibulatkan ke bawah."
		],
		"xp": 15
	},
	{
		"id": "lvl5-q2",
		"level": 5,
		"topic": "operator",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa hasil yang dicetak oleh operator modulus (%) berikut?",
		"code": "print(11 % 4)",
		"options": [
			{
				"id": "opt-l5q2-a",
				"text": "2.75"
			},
			{
				"id": "opt-l5q2-b",
				"text": "2"
			},
			{
				"id": "opt-l5q2-c",
				"text": "3"
			},
			{
				"id": "opt-l5q2-d",
				"text": "0"
			}
		],
		"correctAnswer": "3",
		"correctAnswerId": "opt-l5q2-c",
		"explanation": "Operator modulus (%) menghitung sisa hasil bagi. 11 dibagi 4 adalah 2 dengan sisa 3.",
		"hints": [
			"Operator % mencari sisa pembagian, bukan hasil baginya.",
			"Hitung kelipatan 4 terdekat di bawah 11, lalu cari selisihnya."
		],
		"xp": 15
	},
	{
		"id": "lvl5-q3",
		"level": 5,
		"topic": "operator",
		"difficulty": "medium",
		"type": "concept",
		"question": "Operator apakah yang digunakan untuk operasi pemangkatan (eksponensial) di Python?",
		"code": "# Contoh menghitung 2 pangkat 3:\nhasil = 2 ... 3",
		"options": [
			{
				"id": "opt-l5q3-a",
				"text": "^"
			},
			{
				"id": "opt-l5q3-b",
				"text": "**"
			},
			{
				"id": "opt-l5q3-c",
				"text": "pangkat"
			},
			{
				"id": "opt-l5q3-d",
				"text": "//"
			}
		],
		"correctAnswer": "**",
		"correctAnswerId": "opt-l5q3-b",
		"explanation": "Di Python, operator dua tanda bintang (**) digunakan untuk pemangkatan: 2 ** 3 = 8. Simbol ^ adalah operator bitwise XOR.",
		"hints": [
			"Python menggunakan tanda bintang ganda untuk menghitung pangkat.",
			"Tanda ^ di Python bukan untuk eksponen, melainkan operasi biner."
		],
		"xp": 15
	},
	{
		"id": "lvl5-q4",
		"level": 5,
		"topic": "integer",
		"difficulty": "medium",
		"type": "code-reading",
		"question": "Berapakah nilai x berdasarkan urutan prioritas operator matematika?",
		"code": "x = 2 + 3 * 4\nprint(x)",
		"options": [
			{
				"id": "opt-l5q4-a",
				"text": "20"
			},
			{
				"id": "opt-l5q4-b",
				"text": "14"
			},
			{
				"id": "opt-l5q4-c",
				"text": "24"
			},
			{
				"id": "opt-l5q4-d",
				"text": "9"
			}
		],
		"correctAnswer": "14",
		"correctAnswerId": "opt-l5q4-b",
		"explanation": "Operator perkalian (*) memiliki prioritas lebih tinggi daripada penjumlahan (+), sehingga 3 * 4 dihitung dulu (=12), lalu ditambah 2 (=14).",
		"hints": [
			"Ingat aturan prioritas operasi matematika standar (KABATAKU / PEMDAS).",
			"Perkalian diselesaikan terlebih dahulu sebelum penjumlahan."
		],
		"xp": 15
	},
	{
		"id": "lvl5-q5",
		"level": 5,
		"topic": "operator",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa hasil yang dicetak setelah eksekusi operator penugasan majemuk (+=) ini?",
		"code": "skor = 10\nskor += 5\nprint(skor)",
		"options": [
			{
				"id": "opt-l5q5-a",
				"text": "15"
			},
			{
				"id": "opt-l5q5-b",
				"text": "5"
			},
			{
				"id": "opt-l5q5-c",
				"text": "10"
			},
			{
				"id": "opt-l5q5-d",
				"text": "skor5"
			}
		],
		"correctAnswer": "15",
		"correctAnswerId": "opt-l5q5-a",
		"explanation": "skor += 5 adalah penulisan singkat dari skor = skor + 5, sehingga 10 + 5 menghasilkan 15.",
		"hints": [
			"Bentuk += menjumlahkan nilai lama variabel dengan nilai di sisi kanan.",
			"Nilai awal 10 ditambah dengan 5 dan disimpan kembali."
		],
		"xp": 15
	},
	{
		"id": "lvl6-q1",
		"level": 6,
		"topic": "boolean",
		"difficulty": "medium",
		"type": "concept",
		"question": "Apa dua kemungkinan nilai yang dimiliki oleh tipe data Boolean di Python?",
		"code": "aktif = True",
		"options": [
			{
				"id": "opt-l6q1-a",
				"text": "yes dan no"
			},
			{
				"id": "opt-l6q1-b",
				"text": "True dan False (diawali huruf kapital)"
			},
			{
				"id": "opt-l6q1-c",
				"text": "1 dan -1"
			},
			{
				"id": "opt-l6q1-d",
				"text": "benar dan salah"
			}
		],
		"correctAnswer": "True dan False (diawali huruf kapital)",
		"correctAnswerId": "opt-l6q1-b",
		"explanation": "Di Python, nilai kebenaran Boolean ditulis baku sebagai True dan False dengan huruf pertama kapital.",
		"hints": [
			"Perhatikan ejaan bahasa Inggris baku untuk benar dan salah di Python.",
			"Huruf pertama pada kata tersebut wajib ditulis dengan huruf besar."
		],
		"xp": 15
	},
	{
		"id": "lvl6-q2",
		"level": 6,
		"topic": "comparison",
		"difficulty": "medium",
		"type": "condition-logic",
		"question": "Apa hasil evaluasi perbandingan nilai dan tipe data berikut?",
		"code": "print(5 == \"5\")",
		"options": [
			{
				"id": "opt-l6q2-a",
				"text": "True"
			},
			{
				"id": "opt-l6q2-b",
				"text": "False"
			},
			{
				"id": "opt-l6q2-c",
				"text": "None"
			},
			{
				"id": "opt-l6q2-d",
				"text": "TypeError"
			}
		],
		"correctAnswer": "False",
		"correctAnswerId": "opt-l6q2-b",
		"explanation": "Angka integer 5 tidak sama dengan teks string \"5\" karena keduanya memiliki tipe data yang berbeda.",
		"hints": [
			"Bandingkan tipe data dari kedua nilai tersebut.",
			"Python tidak menganggap sama antara bilangan integer dan teks string."
		],
		"xp": 15
	},
	{
		"id": "lvl6-q3",
		"level": 6,
		"topic": "boolean",
		"difficulty": "medium",
		"type": "condition-logic",
		"question": "Apa hasil dari pembalikan kondisi menggunakan operator not berikut?",
		"code": "print(not (10 > 5))",
		"options": [
			{
				"id": "opt-l6q3-a",
				"text": "True"
			},
			{
				"id": "opt-l6q3-b",
				"text": "False"
			},
			{
				"id": "opt-l6q3-c",
				"text": "10"
			},
			{
				"id": "opt-l6q3-d",
				"text": "Error"
			}
		],
		"correctAnswer": "False",
		"correctAnswerId": "opt-l6q3-b",
		"explanation": "10 > 5 bernilai True. Operator not membalikkan nilai True menjadi False.",
		"hints": [
			"Evaluasi terlebih dahulu kondisi di dalam tanda kurung: apakah 10 lebih besar dari 5?",
			"Operator not membalikkan nilai kebenaran dari ekspresi tersebut."
		],
		"xp": 15
	},
	{
		"id": "lvl6-q4",
		"level": 6,
		"topic": "comparison",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa hasil evaluasi logika gabungan dengan operator and berikut?",
		"code": "x = 7\nprint(x >= 5 and x < 10)",
		"options": [
			{
				"id": "opt-l6q4-a",
				"text": "True"
			},
			{
				"id": "opt-l6q4-b",
				"text": "False"
			},
			{
				"id": "opt-l6q4-c",
				"text": "7"
			},
			{
				"id": "opt-l6q4-d",
				"text": "None"
			}
		],
		"correctAnswer": "True",
		"correctAnswerId": "opt-l6q4-a",
		"explanation": "7 >= 5 bernilai True dan 7 < 10 juga True. True and True menghasilkan nilai True.",
		"hints": [
			"Operator and mensyaratkan kedua kondisi kiri dan kanan bernilai benar.",
			"Cek apakah angka 7 berada dalam rentang minimal 5 dan kurang dari 10."
		],
		"xp": 15
	},
	{
		"id": "lvl6-q5",
		"level": 6,
		"topic": "comparison",
		"difficulty": "medium",
		"type": "choose-code",
		"question": "Manakah operator perbandingan yang digunakan untuk memeriksa apakah dua nilai TIDAK sama?",
		"code": "# Pilih operator ketidaksamaan:",
		"options": [
			{
				"id": "opt-l6q5-a",
				"text": "<>"
			},
			{
				"id": "opt-l6q5-b",
				"text": "!="
			},
			{
				"id": "opt-l6q5-c",
				"text": "not=="
			},
			{
				"id": "opt-l6q5-d",
				"text": "=="
			}
		],
		"correctAnswer": "!=",
		"correctAnswerId": "opt-l6q5-b",
		"explanation": "Di Python modern, operator != digunakan untuk memeriksa ketidaksamaan dua nilai.",
		"hints": [
			"Tanda seru (!) dalam banyak bahasa pemrograman melambangkan negasi/bukan.",
			"Kombinasi tanda seru dan sama dengan membentuk operator tidak sama dengan."
		],
		"xp": 15
	},
	{
		"id": "lvl7-q1",
		"level": 7,
		"topic": "syntax",
		"difficulty": "hard",
		"type": "syntax",
		"question": "Tanda baca apa yang wajib diletakkan di akhir baris pernyataan kondisi if?",
		"code": "if nilai >= 75...\n    print(\"Lulus\")",
		"options": [
			{
				"id": "opt-l7q1-a",
				"text": "Tanda titik koma (;)"
			},
			{
				"id": "opt-l7q1-b",
				"text": "Tanda titik dua (:)"
			},
			{
				"id": "opt-l7q1-c",
				"text": "Tanda panah (->)"
			},
			{
				"id": "opt-l7q1-d",
				"text": "Tanda kurung kurawal ({})"
			}
		],
		"correctAnswer": "Tanda titik dua (:)",
		"correctAnswerId": "opt-l7q1-b",
		"explanation": "Setiap baris pembuka blok kontrol di Python (seperti if, else, for, def) wajib diakhiri tanda titik dua (:).",
		"hints": [
			"Tanda baca ini menandakan bahwa blok kode baru yang menjorok akan dimulai di baris bawahnya.",
			"Bentuk tanda bacanya adalah dua titik bersusun vertikal."
		],
		"xp": 15
	},
	{
		"id": "lvl7-q2",
		"level": 7,
		"topic": "if",
		"difficulty": "hard",
		"type": "condition-logic",
		"question": "Apa teks yang dicetak oleh blok percabangan if-else ini?",
		"code": "nilai = 80\nif nilai >= 75:\n    print(\"Lulus\")\nelse:\n    print(\"Remedial\")",
		"options": [
			{
				"id": "opt-l7q2-a",
				"text": "Remedial"
			},
			{
				"id": "opt-l7q2-b",
				"text": "Lulus"
			},
			{
				"id": "opt-l7q2-c",
				"text": "Lulus Remedial"
			},
			{
				"id": "opt-l7q2-d",
				"text": "Tidak mencetak apapun"
			}
		],
		"correctAnswer": "Lulus",
		"correctAnswerId": "opt-l7q2-b",
		"explanation": "Karena nilai 80 >= 75 bernilai True, blok kode di bawah if yang dieksekusi, sedangkan blok else dilewati.",
		"hints": [
			"Periksa apakah kondisi 80 >= 75 bernilai True atau False.",
			"Jika kondisi if bernilai True, blok else tidak akan pernah dijalankan."
		],
		"xp": 15
	},
	{
		"id": "lvl7-q3",
		"level": 7,
		"topic": "if",
		"difficulty": "hard",
		"type": "concept",
		"question": "Mengapa indentasi (spasi menjorok) sangat penting di bawah baris if?",
		"code": "if siap:\n    print(\"Jalan\")",
		"options": [
			{
				"id": "opt-l7q3-a",
				"text": "Hanya sebagai hiasan agar kode terlihat rapi"
			},
			{
				"id": "opt-l7q3-b",
				"text": "Memberitahu Python bahwa baris tersebut adalah isi dari blok if"
			},
			{
				"id": "opt-l7q3-c",
				"text": "Membuat program berjalan lebih cepat"
			},
			{
				"id": "opt-l7q3-d",
				"text": "Wajib ada 10 spasi tepat"
			}
		],
		"correctAnswer": "Memberitahu Python bahwa baris tersebut adalah isi dari blok if",
		"correctAnswerId": "opt-l7q3-b",
		"explanation": "Python tidak menggunakan tanda kurung kurawal untuk blok kode, melainkan mengandalkan indentasi untuk menentukan hierarki cakupan blok.",
		"hints": [
			"Python menggunakan spasi indentasi untuk mengelompokkan baris instruksi.",
			"Tanpa indentasi, Python tidak tahu baris mana yang terikat di dalam kondisi if."
		],
		"xp": 15
	},
	{
		"id": "lvl7-q4",
		"level": 7,
		"topic": "else",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Apa hasil output dari kode dengan baris di luar indentasi berikut?",
		"code": "skor = 40\nif skor > 50:\n    print(\"Hebat\")\nprint(\"Selesai\")",
		"options": [
			{
				"id": "opt-l7q4-a",
				"text": "Hebat"
			},
			{
				"id": "opt-l7q4-b",
				"text": "Selesai"
			},
			{
				"id": "opt-l7q4-c",
				"text": "Hebat Selesai"
			},
			{
				"id": "opt-l7q4-d",
				"text": "Error IndentationError"
			}
		],
		"correctAnswer": "Selesai",
		"correctAnswerId": "opt-l7q4-b",
		"explanation": "skor > 50 bernilai False sehingga \"Hebat\" tidak dicetak. Namun print(\"Selesai\") tidak menjorok, jadi selalu dieksekusi setelah if selesai.",
		"hints": [
			"Perhatikan baris print(\"Selesai\") yang posisinya sejajar dengan if (tidak menjorok).",
			"Instruksi yang tidak menjorok berada di luar kendali blok if."
		],
		"xp": 15
	},
	{
		"id": "lvl7-q5",
		"level": 7,
		"topic": "if",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Apa kesalahan sintaksis yang menyebabkan kode ini gagal dijalankan?",
		"code": "x = 10\nif x > 5 print(\"Besar\")",
		"options": [
			{
				"id": "opt-l7q5-a",
				"text": "Kurang tanda titik dua (:) setelah x > 5"
			},
			{
				"id": "opt-l7q5-b",
				"text": "Variabel x harus berupa huruf besar"
			},
			{
				"id": "opt-l7q5-c",
				"text": "Angka 5 tidak boleh dibandingkan dengan 10"
			},
			{
				"id": "opt-l7q5-d",
				"text": "Kata \"Besar\" harus menggunakan petik tunggal"
			}
		],
		"correctAnswer": "Kurang tanda titik dua (:) setelah x > 5",
		"correctAnswerId": "opt-l7q5-a",
		"explanation": "Pernyataan if wajib diakhiri dengan tanda titik dua (:) sebelum blok instruksinya ditulis.",
		"hints": [
			"Lihat tanda baca di akhir pernyataan kondisi if sebelum perintah print.",
			"Setiap kepala blok di Python harus ditutup dengan karakter titik dua."
		],
		"xp": 15
	},
	{
		"id": "lvl8-q1",
		"level": 8,
		"topic": "elif",
		"difficulty": "hard",
		"type": "concept",
		"question": "Kapan blok kondisi elif akan dievaluasi oleh Python?",
		"code": "if a:\n    ...\nelif b:\n    ...",
		"options": [
			{
				"id": "opt-l8q1-a",
				"text": "Selalu dievaluasi bersamaan dengan if"
			},
			{
				"id": "opt-l8q1-b",
				"text": "Hanya jika kondisi if di atasnya bernilai False"
			},
			{
				"id": "opt-l8q1-c",
				"text": "Hanya jika kondisi if di atasnya bernilai True"
			},
			{
				"id": "opt-l8q1-d",
				"text": "Hanya setelah blok else selesai dieksekusi"
			}
		],
		"correctAnswer": "Hanya jika kondisi if di atasnya bernilai False",
		"correctAnswerId": "opt-l8q1-b",
		"explanation": "elif adalah singkatan dari \"else if\". Blok ini hanya diperiksa jika kondisi sebelumnya bernilai False.",
		"hints": [
			"Pikirkan elif sebagai rencana cadangan jika kondisi utama di atasnya tidak terpenuhi.",
			"Jika kondisi pertama sudah True, blok elif di bawahnya otomatis dilewati."
		],
		"xp": 15
	},
	{
		"id": "lvl8-q2",
		"level": 8,
		"topic": "elif",
		"difficulty": "hard",
		"type": "condition-logic",
		"question": "Berapakah grade yang akan dicetak oleh percabangan multi-kondisi ini?",
		"code": "skor = 85\nif skor >= 90:\n    print(\"A\")\nelif skor >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")",
		"options": [
			{
				"id": "opt-l8q2-a",
				"text": "A"
			},
			{
				"id": "opt-l8q2-b",
				"text": "B"
			},
			{
				"id": "opt-l8q2-c",
				"text": "C"
			},
			{
				"id": "opt-l8q2-d",
				"text": "A dan B"
			}
		],
		"correctAnswer": "B",
		"correctAnswerId": "opt-l8q2-b",
		"explanation": "skor >= 90 bernilai False (85 < 90), lalu Python memeriksa elif skor >= 80 yang bernilai True. Maka \"B\" dicetak.",
		"hints": [
			"Cek kondisi pertama: apakah 85 >= 90? (False).",
			"Lanjut ke kondisi kedua: apakah 85 >= 80? (True)."
		],
		"xp": 15
	},
	{
		"id": "lvl8-q3",
		"level": 8,
		"topic": "elif",
		"difficulty": "hard",
		"type": "code-reading",
		"question": "Perhatikan urutan kondisi berikut. Teks apa yang dicetak ke layar konsol?",
		"code": "x = 10\nif x > 5:\n    print(\"Satu\")\nelif x > 8:\n    print(\"Dua\")\nelse:\n    print(\"Tiga\")",
		"options": [
			{
				"id": "opt-l8q3-a",
				"text": "Satu"
			},
			{
				"id": "opt-l8q3-b",
				"text": "Dua"
			},
			{
				"id": "opt-l8q3-c",
				"text": "Satu dan Dua"
			},
			{
				"id": "opt-l8q3-d",
				"text": "Tiga"
			}
		],
		"correctAnswer": "Satu",
		"correctAnswerId": "opt-l8q3-a",
		"explanation": "Meskipun 10 > 8 juga benar, Python langsung berhenti mengecek elif setelah kondisi pertama (x > 5) terpenuhi.",
		"hints": [
			"Pada struktur if-elif-else, hanya SATU blok pertama yang kondisinya True yang dieksekusi.",
			"Setelah satu cabang terpenuhi, seluruh cabang lainnya diabaikan."
		],
		"xp": 15
	},
	{
		"id": "lvl8-q4",
		"level": 8,
		"topic": "elif",
		"difficulty": "hard",
		"type": "choose-code",
		"question": "Berapa banyak blok elif yang diperbolehkan di antara satu if dan else di Python?",
		"code": "# Batas jumlah elif dalam satu struktur if:",
		"options": [
			{
				"id": "opt-l8q4-a",
				"text": "Hanya boleh 1 elif saja"
			},
			{
				"id": "opt-l8q4-b",
				"text": "Maksimal 3 elif"
			},
			{
				"id": "opt-l8q4-c",
				"text": "Sebanyak yang dibutuhkan tanpa batas"
			},
			{
				"id": "opt-l8q4-d",
				"text": "Wajib tepat 2 elif"
			}
		],
		"correctAnswer": "Sebanyak yang dibutuhkan tanpa batas",
		"correctAnswerId": "opt-l8q4-c",
		"explanation": "Python mengizinkan penulisan blok elif sebanyak apapun sesuai dengan kebutuhan logika pemecahan masalah.",
		"hints": [
			"Pikirkan logika menu pilihan atau sistem penilaian dengan banyak kategori.",
			"Tidak ada aturan bahasa Python yang membatasi jumlah percabangan elif."
		],
		"xp": 15
	},
	{
		"id": "lvl8-q5",
		"level": 8,
		"topic": "else",
		"difficulty": "hard",
		"type": "condition-logic",
		"question": "Apa hasil output dari kode evaluasi kondisi cuaca berikut?",
		"code": "cuaca = \"hujan\"\nif cuaca == \"panas\":\n    print(\"Topi\")\nelif cuaca == \"dingin\":\n    print(\"Jaket\")\nelse:\n    print(\"Payung\")",
		"options": [
			{
				"id": "opt-l8q5-a",
				"text": "Topi"
			},
			{
				"id": "opt-l8q5-b",
				"text": "Jaket"
			},
			{
				"id": "opt-l8q5-c",
				"text": "Payung"
			},
			{
				"id": "opt-l8q5-d",
				"text": "None"
			}
		],
		"correctAnswer": "Payung",
		"correctAnswerId": "opt-l8q5-c",
		"explanation": "Kondisi if (\"panas\") dan elif (\"dingin\") keduanya False, sehingga program mengeksekusi cabang cadangan terakhir yaitu else (\"Payung\").",
		"hints": [
			"Apakah nilai cuaca sama dengan \"panas\"? (Bukan).",
			"Apakah nilai cuaca sama dengan \"dingin\"? (Bukan). Perhatikan blok penanganan terakhir."
		],
		"xp": 15
	},
	{
		"id": "lvl9-q1",
		"level": 9,
		"topic": "range()",
		"difficulty": "challenge",
		"type": "concept",
		"question": "Urutan angka apakah yang dihasilkan oleh fungsi pemanggil range(4)?",
		"code": "for i in range(4):\n    print(i)",
		"options": [
			{
				"id": "opt-l9q1-a",
				"text": "1, 2, 3, 4"
			},
			{
				"id": "opt-l9q1-b",
				"text": "0, 1, 2, 3"
			},
			{
				"id": "opt-l9q1-c",
				"text": "0, 1, 2, 3, 4"
			},
			{
				"id": "opt-l9q1-d",
				"text": "1, 2, 3"
			}
		],
		"correctAnswer": "0, 1, 2, 3",
		"correctAnswerId": "opt-l9q1-b",
		"explanation": "range(n) menghasilkan urutan angka mulai dari 0 sampai n-1. Jadi range(4) menghasilkan 0, 1, 2, dan 3 (total 4 angka).",
		"hints": [
			"Indeks dan deret bawaan di Python selalu dimulai dari angka nol (0).",
			"Angka batas akhir (stop) bersifat eksklusif, artinya tidak diikutsertakan."
		],
		"xp": 15
	},
	{
		"id": "lvl9-q2",
		"level": 9,
		"topic": "for loop",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah nilai total yang dicetak setelah for loop selesai mengakumulasi nilai?",
		"code": "total = 0\nfor i in range(3):\n    total += i\nprint(total)",
		"options": [
			{
				"id": "opt-l9q2-a",
				"text": "6"
			},
			{
				"id": "opt-l9q2-b",
				"text": "3"
			},
			{
				"id": "opt-l9q2-c",
				"text": "0"
			},
			{
				"id": "opt-l9q2-d",
				"text": "5"
			}
		],
		"correctAnswer": "3",
		"correctAnswerId": "opt-l9q2-b",
		"explanation": "range(3) menghasilkan i = 0, 1, 2. Penjumlahan akumulasinya adalah total = 0 + 0 + 1 + 2 = 3.",
		"hints": [
			"Tentukan angka-angka yang dihasilkan oleh range(3): yaitu 0, 1, dan 2.",
			"Jumlahkan angka-angka tersebut satu demi satu ke dalam variabel total."
		],
		"xp": 15
	},
	{
		"id": "lvl9-q3",
		"level": 9,
		"topic": "for loop",
		"difficulty": "challenge",
		"type": "code-reading",
		"question": "Bagaimana hasil keluaran saat for loop mengiterasi setiap huruf dalam string ini?",
		"code": "for huruf in \"Py\":\n    print(huruf)",
		"options": [
			{
				"id": "opt-l9q3-a",
				"text": "Py di baris yang sama"
			},
			{
				"id": "opt-l9q3-b",
				"text": "P di baris pertama, y di baris kedua"
			},
			{
				"id": "opt-l9q3-c",
				"text": "huruf huruf"
			},
			{
				"id": "opt-l9q3-d",
				"text": "Error karena string tidak bisa di-loop"
			}
		],
		"correctAnswer": "P di baris pertama, y di baris kedua",
		"correctAnswerId": "opt-l9q3-b",
		"explanation": "String adalah objek iterable. For loop mengambil satu karakter per putaran dan print() mencetaknya di baris baru.",
		"hints": [
			"For loop dapat mengiterasi string karakter demi karakter dari awal hingga akhir.",
			"Ingat bahwa setiap pemanggilan print() otomatis berpindah ke baris baru."
		],
		"xp": 15
	},
	{
		"id": "lvl9-q4",
		"level": 9,
		"topic": "range()",
		"difficulty": "challenge",
		"type": "condition-logic",
		"question": "Berapa kali blok instruksi di dalam perulangan ini akan dieksekusi?",
		"code": "for i in range(1, 5):\n    print(\"Langkah\")",
		"options": [
			{
				"id": "opt-l9q4-a",
				"text": "5 kali"
			},
			{
				"id": "opt-l9q4-b",
				"text": "4 kali"
			},
			{
				"id": "opt-l9q4-c",
				"text": "1 kali"
			},
			{
				"id": "opt-l9q4-d",
				"text": "6 kali"
			}
		],
		"correctAnswer": "4 kali",
		"correctAnswerId": "opt-l9q4-b",
		"explanation": "range(1, 5) dimulai dari 1 dan berhenti sebelum 5 (yaitu 1, 2, 3, 4), sehingga perulangan berjalan tepat 4 kali.",
		"hints": [
			"Format range(start, stop) dimulai dari nilai start hingga stop - 1.",
			"Hitung berapa banyak bilangan dari 1 hingga 4."
		],
		"xp": 15
	},
	{
		"id": "lvl9-q5",
		"level": 9,
		"topic": "range()",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Apa urutan angka yang dihasilkan saat range() menggunakan parameter lompatan (step) ini?",
		"code": "for i in range(2, 8, 2):\n    print(i, end=\" \")",
		"options": [
			{
				"id": "opt-l9q5-a",
				"text": "2 4 6 8"
			},
			{
				"id": "opt-l9q5-b",
				"text": "2 4 6"
			},
			{
				"id": "opt-l9q5-c",
				"text": "2 3 4 5 6 7"
			},
			{
				"id": "opt-l9q5-d",
				"text": "2 8"
			}
		],
		"correctAnswer": "2 4 6",
		"correctAnswerId": "opt-l9q5-b",
		"explanation": "range(2, 8, 2) mulai dari 2 dengan lompatan 2 hingga sebelum 8: nilainya adalah 2, 4, dan 6 (angka 8 tidak diikutsertakan).",
		"hints": [
			"Parameter ketiga pada range(start, stop, step) adalah besar kelipatan penambahan.",
			"Ingat kembali bahwa batas atas 8 tidak diikutsertakan ke dalam hasil."
		],
		"xp": 15
	},
	{
		"id": "lvl10-q1",
		"level": 10,
		"topic": "while loop",
		"difficulty": "challenge",
		"type": "concept",
		"question": "Apa prinsip dasar yang membedakan perulangan while loop dengan for loop?",
		"code": "while kondisi:\n    aksi()",
		"options": [
			{
				"id": "opt-l10q1-a",
				"text": "while loop hanya bisa berjalan tepat 10 kali"
			},
			{
				"id": "opt-l10q1-b",
				"text": "while loop terus mengulang selama kondisi bernilai True dan berhenti saat False"
			},
			{
				"id": "opt-l10q1-c",
				"text": "while loop tidak membutuhkan kondisi pemeriksaan"
			},
			{
				"id": "opt-l10q1-d",
				"text": "while loop tidak dapat digabungkan dengan variabel angka"
			}
		],
		"correctAnswer": "while loop terus mengulang selama kondisi bernilai True dan berhenti saat False",
		"correctAnswerId": "opt-l10q1-b",
		"explanation": "while loop adalah perulangan kondisional yang terus berulang selama ekspresi syarat bernilai True.",
		"hints": [
			"Kata \"while\" bermakna \"selama\".",
			"Perulangan memeriksa kebenaran kondisi sebelum memulai setiap putaran."
		],
		"xp": 15
	},
	{
		"id": "lvl10-q2",
		"level": 10,
		"topic": "while loop",
		"difficulty": "challenge",
		"type": "condition-logic",
		"question": "Berapakah nilai akhir x yang dicetak setelah perulangan while berikut selesai?",
		"code": "x = 1\nwhile x < 4:\n    x += 1\nprint(x)",
		"options": [
			{
				"id": "opt-l10q2-a",
				"text": "3"
			},
			{
				"id": "opt-l10q2-b",
				"text": "4"
			},
			{
				"id": "opt-l10q2-c",
				"text": "5"
			},
			{
				"id": "opt-l10q2-d",
				"text": "1"
			}
		],
		"correctAnswer": "4",
		"correctAnswerId": "opt-l10q2-b",
		"explanation": "Saat x=3 (3 < 4 True), x bertambah jadi 4. Pada putaran berikutnya, kondisi 4 < 4 adalah False, loop berhenti, dan 4 dicetak.",
		"hints": [
			"Lacak nilai x pada setiap iterasi: x bertambah dari 1 menjadi 2, lalu 3, lalu 4.",
			"Tentukan kapan kondisi x < 4 berubah menjadi False dan loop berhenti."
		],
		"xp": 15
	},
	{
		"id": "lvl10-q3",
		"level": 10,
		"topic": "while loop",
		"difficulty": "challenge",
		"type": "find-error",
		"question": "Apa bahaya yang terjadi jika baris pembaruan variabel angka += 1 dihilangkan dari kode ini?",
		"code": "angka = 1\nwhile angka <= 5:\n    print(angka)\n    # angka += 1 dihilangkan",
		"options": [
			{
				"id": "opt-l10q3-a",
				"text": "Program langsung berhenti tanpa mencetak apapun"
			},
			{
				"id": "opt-l10q3-b",
				"text": "Terjadi infinite loop (perulangan tanpa henti yang menghabiskan memori)"
			},
			{
				"id": "opt-l10q3-c",
				"text": "Python otomatis menambahkan angka menjadi 5"
			},
			{
				"id": "opt-l10q3-d",
				"text": "Muncul SyntaxError pada baris while"
			}
		],
		"correctAnswer": "Terjadi infinite loop (perulangan tanpa henti yang menghabiskan memori)",
		"correctAnswerId": "opt-l10q3-b",
		"explanation": "Jika variabel angka tidak pernah ditambah, kondisi angka <= 5 akan selalu bernilai True selamanya (infinite loop).",
		"hints": [
			"Jika nilai angka tetap 1, periksa apakah kondisi 1 <= 5 akan pernah berubah menjadi False.",
			"Perulangan yang tidak memiliki jalan keluar akan berjalan terus-menerus tanpa henti."
		],
		"xp": 15
	},
	{
		"id": "lvl10-q4",
		"level": 10,
		"topic": "basic logic",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah nilai hitung mundur terakhir yang dicetak oleh kode berikut?",
		"code": "hitung = 3\nwhile hitung > 0:\n    hitung -= 1\nprint(hitung)",
		"options": [
			{
				"id": "opt-l10q4-a",
				"text": "1"
			},
			{
				"id": "opt-l10q4-b",
				"text": "0"
			},
			{
				"id": "opt-l10q4-c",
				"text": "-1"
			},
			{
				"id": "opt-l10q4-d",
				"text": "3"
			}
		],
		"correctAnswer": "0",
		"correctAnswerId": "opt-l10q4-b",
		"explanation": "Saat hitung bernilai 1 (1 > 0 True), hitung dikurangi 1 menjadi 0. Saat dicek kembali, 0 > 0 bernilai False, loop selesai, mencetak 0.",
		"hints": [
			"Saat variabel hitung bernilai 1, ia dikurangi 1 menjadi 0 di dalam perulangan.",
			"Periksa apakah 0 > 0 bernilai True atau False untuk menghentikan loop."
		],
		"xp": 15
	},
	{
		"id": "lvl10-q5",
		"level": 10,
		"topic": "basic logic",
		"difficulty": "challenge",
		"type": "code-reading",
		"question": "Berapakah total akumulasi s yang dihasilkan dari kombinasi variabel dan while loop ini?",
		"code": "s = 0\ni = 1\nwhile i <= 3:\n    s += i\n    i += 1\nprint(s)",
		"options": [
			{
				"id": "opt-l10q5-a",
				"text": "3"
			},
			{
				"id": "opt-l10q5-b",
				"text": "6"
			},
			{
				"id": "opt-l10q5-c",
				"text": "4"
			},
			{
				"id": "opt-l10q5-d",
				"text": "10"
			}
		],
		"correctAnswer": "6",
		"correctAnswerId": "opt-l10q5-b",
		"explanation": "Perulangan menjumlahkan nilai i=1, i=2, dan i=3 ke variabel s: s = 0 + 1 + 2 + 3 = 6.",
		"hints": [
			"Telusuri perulangan untuk setiap nilai i: 1, 2, dan 3.",
			"Jumlahkan nilai-nilai tersebut: 1 + 2 + 3."
		],
		"xp": 15
	},
	{
		"id": "lvl11-q1",
		"level": 11,
		"topic": "list & indexing",
		"difficulty": "medium",
		"type": "concept",
		"question": "Simbol tanda kurung manakah yang digunakan untuk membuat struktur data List di Python?",
		"code": "# Contoh inisialisasi kumpulan data:",
		"options": [
			{
				"id": "opt-l11q1-a",
				"text": "Kurung kurawal { }"
			},
			{
				"id": "opt-l11q1-b",
				"text": "Kurung siku [ ]"
			},
			{
				"id": "opt-l11q1-c",
				"text": "Kurung bulat ( )"
			},
			{
				"id": "opt-l11q1-d",
				"text": "Tanda petik ganda \" \""
			}
		],
		"correctAnswer": "Kurung siku [ ]",
		"correctAnswerId": "opt-l11q1-b",
		"explanation": "List di Python selalu dideklarasikan menggunakan kurung siku [ ], misalnya angka = [1, 2, 3].",
		"hints": [
			"Pikirkan tanda kurung yang bentuknya persegi atau siku-siku.",
			"Kurung siku mengelompokkan elemen berurutan yang dapat diubah."
		],
		"xp": 20
	},
	{
		"id": "lvl11-q2",
		"level": 11,
		"topic": "list & indexing",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Berapakah nilai yang dihasilkan dari kode pembacaan indeks elemen berikut?",
		"code": "buah = [\"Apel\", \"Mangga\", \"Jeruk\", \"Pisang\"]\nprint(buah[0])",
		"options": [
			{
				"id": "opt-l11q2-a",
				"text": "Mangga"
			},
			{
				"id": "opt-l11q2-b",
				"text": "Pisang"
			},
			{
				"id": "opt-l11q2-c",
				"text": "Apel"
			},
			{
				"id": "opt-l11q2-d",
				"text": "Jeruk"
			}
		],
		"correctAnswer": "Apel",
		"correctAnswerId": "opt-l11q2-c",
		"explanation": "Indeks dalam Python berbasis nol (zero-indexed), sehingga buah[0] mengambil elemen pertama yaitu \"Apel\".",
		"hints": [
			"Ingat bahwa urutan penghitungan indeks komputer dimulai dari angka nol.",
			"Indeks 0 mewakili urutan terdepan dalam deret list."
		],
		"xp": 20
	},
	{
		"id": "lvl11-q3",
		"level": 11,
		"topic": "list & indexing",
		"difficulty": "medium",
		"type": "code-reading",
		"question": "Apa arti dari penggunaan indeks negatif [-1] pada list dalam Python?",
		"code": "nilai = [80, 85, 90, 95]\nprint(nilai[-1])",
		"options": [
			{
				"id": "opt-l11q3-a",
				"text": "Mengambil elemen paling belakang / terakhir"
			},
			{
				"id": "opt-l11q3-b",
				"text": "Menghapus satu elemen dari list"
			},
			{
				"id": "opt-l11q3-c",
				"text": "Mengubah nilai angka menjadi bilangan negatif"
			},
			{
				"id": "opt-l11q3-d",
				"text": "Memicu error karena indeks tidak boleh negatif"
			}
		],
		"correctAnswer": "Mengambil elemen paling belakang / terakhir",
		"correctAnswerId": "opt-l11q3-a",
		"explanation": "Indeks negatif menghitung posisi dari arah kanan (belakang). Indeks -1 selalu menunjuk elemen terakhir.",
		"hints": [
			"Hitungan mundur dari elemen paling kanan.",
			"Tanda negatif memudahkan kita mengakses ujung akhir list tanpa tahu panjangnya."
		],
		"xp": 20
	},
	{
		"id": "lvl11-q4",
		"level": 11,
		"topic": "list & indexing",
		"difficulty": "medium",
		"type": "find-error",
		"question": "Pesan galat apa yang muncul jika kita membaca indeks yang melampaui ukuran list?",
		"code": "data = [10, 20]\nprint(data[5])",
		"options": [
			{
				"id": "opt-l11q4-a",
				"text": "ValueError"
			},
			{
				"id": "opt-l11q4-b",
				"text": "IndexError: list index out of range"
			},
			{
				"id": "opt-l11q4-c",
				"text": "KeyError"
			},
			{
				"id": "opt-l11q4-d",
				"text": "TypeError"
			}
		],
		"correctAnswer": "IndexError: list index out of range",
		"correctAnswerId": "opt-l11q4-b",
		"explanation": "IndexError terjadi ketika mencoba mengakses nomor indeks yang berada di luar jangkauan ukuran list.",
		"hints": [
			"Error ini berkaitan langsung dengan penomoran indeks yang melampaui batas batas.",
			"Perhatikan kata \"Index\" pada jenis pengecualiannya."
		],
		"xp": 20
	},
	{
		"id": "lvl11-q5",
		"level": 11,
		"topic": "list & indexing",
		"difficulty": "medium",
		"type": "choose-code",
		"question": "Bagaimana cara mengganti elemen kedua dari list hewan menjadi \"Kucing\"?",
		"code": "hewan = [\"Ayam\", \"Bebek\", \"Kelinci\"]\n# Ganti \"Bebek\" dengan \"Kucing\"",
		"options": [
			{
				"id": "opt-l11q5-a",
				"text": "hewan[1] = \"Kucing\""
			},
			{
				"id": "opt-l11q5-b",
				"text": "hewan(2) = \"Kucing\""
			},
			{
				"id": "opt-l11q5-c",
				"text": "hewan.replace(\"Kucing\")"
			},
			{
				"id": "opt-l11q5-d",
				"text": "hewan[2] = \"Kucing\""
			}
		],
		"correctAnswer": "hewan[1] = \"Kucing\"",
		"correctAnswerId": "opt-l11q5-a",
		"explanation": "Elemen kedua berada pada indeks 1. Mengubahnya dilakukan dengan pemberian nilai hewan[1] = \"Kucing\".",
		"hints": [
			"Elemen kedua memiliki indeks 1.",
			"Gunakan tanda sama dengan untuk menugaskan nilai baru ke indeks tersebut."
		],
		"xp": 20
	},
	{
		"id": "lvl12-q1",
		"level": 12,
		"topic": "list slicing",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Berapakah output dari operasi slicing berikut?",
		"code": "angka = [10, 20, 30, 40, 50]\nprint(angka[1:3])",
		"options": [
			{
				"id": "opt-l12q1-a",
				"text": "[10, 20]"
			},
			{
				"id": "opt-l12q1-b",
				"text": "[20, 30, 40]"
			},
			{
				"id": "opt-l12q1-c",
				"text": "[20, 30]"
			},
			{
				"id": "opt-l12q1-d",
				"text": "[30, 40]"
			}
		],
		"correctAnswer": "[20, 30]",
		"correctAnswerId": "opt-l12q1-c",
		"explanation": "Slicing [1:3] mengambil indeks 1 dan 2 (indeks batas akhir 3 bersifat eksklusif / tidak diikutsertakan).",
		"hints": [
			"Indeks awal (1) disertakan, namun indeks akhir (3) tidak dimasukkan.",
			"Elemen di indeks 1 adalah 20 dan indeks 2 adalah 30."
		],
		"xp": 20
	},
	{
		"id": "lvl12-q2",
		"level": 12,
		"topic": "list slicing",
		"difficulty": "medium",
		"type": "concept",
		"question": "Fungsi bawaan Python apa yang digunakan untuk menghitung jumlah total elemen dalam list?",
		"code": "skor = [90, 80, 70, 85, 95]\njumlah = len(skor)",
		"options": [
			{
				"id": "opt-l12q2-a",
				"text": "count()"
			},
			{
				"id": "opt-l12q2-b",
				"text": "size()"
			},
			{
				"id": "opt-l12q2-c",
				"text": "length()"
			},
			{
				"id": "opt-l12q2-d",
				"text": "len()"
			}
		],
		"correctAnswer": "len()",
		"correctAnswerId": "opt-l12q2-d",
		"explanation": "len() (kependekan dari length) adalah fungsi bawaan Python untuk mengukur panjang koleksi atau urutan.",
		"hints": [
			"Fungsi ini adalah singkatan dari tiga huruf kata length.",
			"Sering digunakan untuk mengetahui seberapa banyak isi dalam sebuah kontainer data."
		],
		"xp": 20
	},
	{
		"id": "lvl12-q3",
		"level": 12,
		"topic": "list slicing",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa hasil dari pemotongan list tanpa batas awal berikut [:2]?",
		"code": "huruf = [\"A\", \"B\", \"C\", \"D\"]\nprint(huruf[:2])",
		"options": [
			{
				"id": "opt-l12q3-a",
				"text": "[\"A\", \"B\"]"
			},
			{
				"id": "opt-l12q3-b",
				"text": "[\"C\", \"D\"]"
			},
			{
				"id": "opt-l12q3-c",
				"text": "[\"A\", \"B\", \"C\"]"
			},
			{
				"id": "opt-l12q3-d",
				"text": "[\"B\", \"C\"]"
			}
		],
		"correctAnswer": "[\"A\", \"B\"]",
		"correctAnswerId": "opt-l12q3-a",
		"explanation": "Jika indeks awal diabaikan [:2], Python otomatis memotong mulai dari indeks 0 hingga sebelum indeks 2.",
		"hints": [
			"Jika batas awal kosong, irisan dimulai tepat dari elemen paling pertama.",
			"Berhenti sebelum mencapai indeks 2."
		],
		"xp": 20
	},
	{
		"id": "lvl12-q4",
		"level": 12,
		"topic": "list slicing",
		"difficulty": "medium",
		"type": "code-reading",
		"question": "Trik slicing apa yang menghasilkan salinan list dengan urutan elemen terbalik?",
		"code": "data = [1, 2, 3, 4]\nterbalik = data[::-1]",
		"options": [
			{
				"id": "opt-l12q4-a",
				"text": "data[-1:0]"
			},
			{
				"id": "opt-l12q4-b",
				"text": "data[::-1]"
			},
			{
				"id": "opt-l12q4-c",
				"text": "data.reverse_slice()"
			},
			{
				"id": "opt-l12q4-d",
				"text": "data[1:4:-1]"
			}
		],
		"correctAnswer": "data[::-1]",
		"correctAnswerId": "opt-l12q4-b",
		"explanation": "Sintaks [::-1] berarti mengambil seluruh rentang elemen dengan nilai langkah (step) -1, membalikkan urutannya.",
		"hints": [
			"Perhatikan nilai step bernilai negatif di bagian ketiga parameter slicing.",
			"Dua titik dua diikuti angka minus satu."
		],
		"xp": 20
	},
	{
		"id": "lvl12-q5",
		"level": 12,
		"topic": "list slicing",
		"difficulty": "medium",
		"type": "choose-code",
		"question": "Manakah ekspresi slicing untuk mengambil 3 elemen terakhir dari sebuah list berukuran sembarang?",
		"code": "items = [10, 20, 30, 40, 50, 60]",
		"options": [
			{
				"id": "opt-l12q5-a",
				"text": "items[-3:]"
			},
			{
				"id": "opt-l12q5-b",
				"text": "items[:-3]"
			},
			{
				"id": "opt-l12q5-c",
				"text": "items[3:0]"
			},
			{
				"id": "opt-l12q5-d",
				"text": "items[-1:-3]"
			}
		],
		"correctAnswer": "items[-3:]",
		"correctAnswerId": "opt-l12q5-a",
		"explanation": "items[-3:] memulai irisan dari 3 elemen dari belakang hingga ujung paling akhir list.",
		"hints": [
			"Mulai dari indeks -3 dan biarkan batas akhir kosong agar berjalan sampai akhir.",
			"Tanda titik dua diletakkan setelah angka negatif."
		],
		"xp": 20
	},
	{
		"id": "lvl13-q1",
		"level": 13,
		"topic": "list methods",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Berapakah isi list setelah pemanggilan metode append() berikut?",
		"code": "warna = [\"Merah\", \"Hijau\"]\nwarna.append(\"Biru\")\nprint(warna)",
		"options": [
			{
				"id": "opt-l13q1-a",
				"text": "[\"Biru\", \"Merah\", \"Hijau\"]"
			},
			{
				"id": "opt-l13q1-b",
				"text": "[\"Merah\", \"Hijau\", \"Biru\"]"
			},
			{
				"id": "opt-l13q1-c",
				"text": "[\"Merah\", \"Biru\"]"
			},
			{
				"id": "opt-l13q1-d",
				"text": "[\"Merah\", \"Hijau\"]"
			}
		],
		"correctAnswer": "[\"Merah\", \"Hijau\", \"Biru\"]",
		"correctAnswerId": "opt-l13q1-b",
		"explanation": "append() selalu menambahkan elemen baru di posisi paling akhir (ujung belakang) dari list.",
		"hints": [
			"Metode append menambahkan data ke ujung deretan.",
			"Elemen baru berada di urutan paling belakang."
		],
		"xp": 20
	},
	{
		"id": "lvl13-q2",
		"level": 13,
		"topic": "list methods",
		"difficulty": "medium",
		"type": "code-reading",
		"question": "Apa fungsi dari metode pop() jika dipanggil tanpa menyertakan argumen indeks?",
		"code": "angka = [1, 2, 3]\nterambil = angka.pop()",
		"options": [
			{
				"id": "opt-l13q2-a",
				"text": "Menghapus elemen pertama di indeks 0"
			},
			{
				"id": "opt-l13q2-b",
				"text": "Mengosongkan seluruh isi list"
			},
			{
				"id": "opt-l13q2-c",
				"text": "Menghapus dan mengembalikan elemen paling terakhir"
			},
			{
				"id": "opt-l13q2-d",
				"text": "Menghapus angka terbesar dalam list"
			}
		],
		"correctAnswer": "Menghapus dan mengembalikan elemen paling terakhir",
		"correctAnswerId": "opt-l13q2-c",
		"explanation": "pop() tanpa argumen secara default menghapus elemen paling akhir dari list dan mengembalikannya ke pemanggil.",
		"hints": [
			"Metode ini mengangkat elemen dari ujung kanan list.",
			"Nilai yang dihapus juga dapat disimpan ke variabel."
		],
		"xp": 20
	},
	{
		"id": "lvl13-q3",
		"level": 13,
		"topic": "list methods",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa hasil akhir dari urutan pemanggilan metode list berikut?",
		"code": "tas = [\"Buku\", \"Pulpen\", \"Penggaris\"]\ntas.remove(\"Pulpen\")\nprint(len(tas))",
		"options": [
			{
				"id": "opt-l13q3-a",
				"text": "1"
			},
			{
				"id": "opt-l13q3-b",
				"text": "3"
			},
			{
				"id": "opt-l13q3-c",
				"text": "2"
			},
			{
				"id": "opt-l13q3-d",
				"text": "0"
			}
		],
		"correctAnswer": "2",
		"correctAnswerId": "opt-l13q3-c",
		"explanation": "remove(\"Pulpen\") menghapus kecocokan pertama nilai \"Pulpen\", sehingga isi tas tersisa 2 elemen.",
		"hints": [
			"Awalnya ada 3 benda di dalam tas.",
			"Satu benda tertentu dikeluarkan dari daftar."
		],
		"xp": 20
	},
	{
		"id": "lvl13-q4",
		"level": 13,
		"topic": "list methods",
		"difficulty": "medium",
		"type": "choose-code",
		"question": "Metode apa yang digunakan untuk menyisipkan nilai \"Kuning\" tepat pada indeks 1?",
		"code": "palet = [\"Merah\", \"Biru\"]\n# Sisipkan \"Kuning\" di antara keduanya",
		"options": [
			{
				"id": "opt-l13q4-a",
				"text": "palet.insert(1, \"Kuning\")"
			},
			{
				"id": "opt-l13q4-b",
				"text": "palet.add(1, \"Kuning\")"
			},
			{
				"id": "opt-l13q4-c",
				"text": "palet.append(1, \"Kuning\")"
			},
			{
				"id": "opt-l13q4-d",
				"text": "palet.push(\"Kuning\", 1)"
			}
		],
		"correctAnswer": "palet.insert(1, \"Kuning\")",
		"correctAnswerId": "opt-l13q4-a",
		"explanation": "insert(indeks, nilai) menyisipkan elemen pada indeks tertentu tanpa menimpa elemen yang sudah ada.",
		"hints": [
			"Kata kerjanya berarti menyisipkan ke dalam deretan.",
			"Argumen pertama adalah nomor indeks target penyisipan."
		],
		"xp": 20
	},
	{
		"id": "lvl13-q5",
		"level": 13,
		"topic": "list methods",
		"difficulty": "medium",
		"type": "concept",
		"question": "Apa perbedaan mendasar antara metode sort() dan fungsi sorted()?",
		"code": "angka = [5, 2, 8]\nangka.sort()",
		"options": [
			{
				"id": "opt-l13q5-a",
				"text": "sort() mengubah list asli di tempat, sedangkan sorted() mengembalikan list baru"
			},
			{
				"id": "opt-l13q5-b",
				"text": "sort() hanya untuk teks, sedangkan sorted() hanya untuk angka"
			},
			{
				"id": "opt-l13q5-c",
				"text": "sorted() mengubah list asli, sedangkan sort() membuat list baru"
			},
			{
				"id": "opt-l13q5-d",
				"text": "Kedua fungsi bekerja identik tanpa ada perbedaan teknis"
			}
		],
		"correctAnswer": "sort() mengubah list asli di tempat, sedangkan sorted() mengembalikan list baru",
		"correctAnswerId": "opt-l13q5-a",
		"explanation": "list.sort() memodifikasi list asli secara in-place, sementara fungsi bawaan sorted(list) menghasilkan salinan baru.",
		"hints": [
			"Satu metode memodifikasi objek di tempat, satu fungsi membuat koleksi baru.",
			"Perhatikan kata in-place modification."
		],
		"xp": 20
	},
	{
		"id": "lvl14-q1",
		"level": 14,
		"topic": "list iteration",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Berapakah nilai akhir total setelah perulangan list berikut selesai?",
		"code": "nilai = [10, 20, 30]\ntotal = 0\nfor n in nilai:\n    total += n\nprint(total)",
		"options": [
			{
				"id": "opt-l14q1-a",
				"text": "30"
			},
			{
				"id": "opt-l14q1-b",
				"text": "60"
			},
			{
				"id": "opt-l14q1-c",
				"text": "50"
			},
			{
				"id": "opt-l14q1-d",
				"text": "0"
			}
		],
		"correctAnswer": "60",
		"correctAnswerId": "opt-l14q1-b",
		"explanation": "Loop menambahkan setiap elemen: 0 + 10 = 10, + 20 = 30, + 30 = 60.",
		"hints": [
			"Jumlahkan ketiga angka tersebut secara bertahap.",
			"10 ditambah 20 ditambah 30."
		],
		"xp": 20
	},
	{
		"id": "lvl14-q2",
		"level": 14,
		"topic": "list iteration",
		"difficulty": "medium",
		"type": "concept",
		"question": "Fungsi pembantu apa yang memberikan pasangan indeks dan elemen saat melakukan iterasi list?",
		"code": "hewan = [\"Kucing\", \"Anjing\"]\nfor i, h in enumerate(hewan):\n    print(i, h)",
		"options": [
			{
				"id": "opt-l14q2-a",
				"text": "range()"
			},
			{
				"id": "opt-l14q2-b",
				"text": "zip()"
			},
			{
				"id": "opt-l14q2-c",
				"text": "enumerate()"
			},
			{
				"id": "opt-l14q2-d",
				"text": "index()"
			}
		],
		"correctAnswer": "enumerate()",
		"correctAnswerId": "opt-l14q2-c",
		"explanation": "enumerate() menghasilkan pasangan tuple berisi nomor indeks dan nilai elemen pada setiap putaran loop.",
		"hints": [
			"Fungsi ini berarti mencacah atau menomori satu per satu.",
			"Memberikan dua variabel pada deklarasi loop for."
		],
		"xp": 20
	},
	{
		"id": "lvl14-q3",
		"level": 14,
		"topic": "list iteration",
		"difficulty": "medium",
		"type": "condition-logic",
		"question": "Berapa banyak angka yang dicetak oleh kondisi perulangan di bawah?",
		"code": "angka = [5, 12, 8, 20, 3]\nfor x in angka:\n    if x > 10:\n        print(x)",
		"options": [
			{
				"id": "opt-l14q3-a",
				"text": "3 angka"
			},
			{
				"id": "opt-l14q3-b",
				"text": "5 angka"
			},
			{
				"id": "opt-l14q3-c",
				"text": "1 angka"
			},
			{
				"id": "opt-l14q3-d",
				"text": "2 angka"
			}
		],
		"correctAnswer": "2 angka",
		"correctAnswerId": "opt-l14q3-d",
		"explanation": "Hanya angka 12 dan 20 yang bernilai lebih besar dari 10, sehingga hanya ada 2 angka yang dicetak.",
		"hints": [
			"Hitung berapa banyak elemen yang nilainya lebih dari sepuluh.",
			"5, 8, dan 3 tidak lolos syarat if."
		],
		"xp": 20
	},
	{
		"id": "lvl14-q4",
		"level": 14,
		"topic": "list iteration",
		"difficulty": "medium",
		"type": "choose-code",
		"question": "Bagaimana cara menggabungkan dua list a dan b menjadi satu list baru?",
		"code": "a = [1, 2]\nb = [3, 4]\n# Gabungkan keduanya",
		"options": [
			{
				"id": "opt-l14q4-a",
				"text": "c = a + b"
			},
			{
				"id": "opt-l14q4-b",
				"text": "c = a.merge(b)"
			},
			{
				"id": "opt-l14q4-c",
				"text": "c = a * b"
			},
			{
				"id": "opt-l14q4-d",
				"text": "c = [a, b].combine()"
			}
		],
		"correctAnswer": "c = a + b",
		"correctAnswerId": "opt-l14q4-a",
		"explanation": "Operator penjumlahan (+) pada dua list melakukan konkatenasi, menyatukan kedua deret data.",
		"hints": [
			"Gunakan operator matematika dasar untuk penggabungan urutan data.",
			"Sama seperti menggabungkan dua string dengan tanda plus."
		],
		"xp": 20
	},
	{
		"id": "lvl14-q5",
		"level": 14,
		"topic": "list iteration",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa isi dari list hasil setelah perulangan pemangkatan berikut?",
		"code": "hasil = []\nfor i in [1, 2, 3]:\n    hasil.append(i * 2)\nprint(hasil)",
		"options": [
			{
				"id": "opt-l14q5-a",
				"text": "[1, 2, 3]"
			},
			{
				"id": "opt-l14q5-b",
				"text": "[2, 4, 6]"
			},
			{
				"id": "opt-l14q5-c",
				"text": "[2, 2, 2]"
			},
			{
				"id": "opt-l14q5-d",
				"text": "[4, 6, 8]"
			}
		],
		"correctAnswer": "[2, 4, 6]",
		"correctAnswerId": "opt-l14q5-b",
		"explanation": "Setiap elemen dikalikan dua: 1*2=2, 2*2=4, 3*2=6, lalu ditambahkan ke list hasil.",
		"hints": [
			"Setiap angka pada list sumber digandakan dua kali lipat.",
			"1 menjadi 2, 2 menjadi 4, 3 menjadi 6."
		],
		"xp": 20
	},
	{
		"id": "lvl15-q1",
		"level": 15,
		"topic": "list search & membership",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Apa nilai boolean yang dihasilkan dari pengecekan operator in berikut?",
		"code": "tim = [\"Ali\", \"Budi\", \"Cici\"]\nprint(\"Budi\" in tim)",
		"options": [
			{
				"id": "opt-l15q1-a",
				"text": "False"
			},
			{
				"id": "opt-l15q1-b",
				"text": "1"
			},
			{
				"id": "opt-l15q1-c",
				"text": "True"
			},
			{
				"id": "opt-l15q1-d",
				"text": "None"
			}
		],
		"correctAnswer": "True",
		"correctAnswerId": "opt-l15q1-c",
		"explanation": "Karena string \"Budi\" ada di dalam list tim, ekspresi menghasilkan nilai boolean True.",
		"hints": [
			"Operator in memeriksa apakah sebuah elemen merupakan anggota dari kumpulan data.",
			"Nama yang dicari memang tercantum di dalam list."
		],
		"xp": 20
	},
	{
		"id": "lvl15-q2",
		"level": 15,
		"topic": "list search & membership",
		"difficulty": "medium",
		"type": "code-reading",
		"question": "Berapakah output dari metode index() pada list di bawah ini?",
		"code": "huruf = [\"x\", \"y\", \"z\"]\nprint(huruf.index(\"y\"))",
		"options": [
			{
				"id": "opt-l15q2-a",
				"text": "1"
			},
			{
				"id": "opt-l15q2-b",
				"text": "2"
			},
			{
				"id": "opt-l15q2-c",
				"text": "0"
			},
			{
				"id": "opt-l15q2-d",
				"text": "\"y\""
			}
		],
		"correctAnswer": "1",
		"correctAnswerId": "opt-l15q2-a",
		"explanation": "huruf.index(\"y\") mengembalikan posisi indeks pertama tempat \"y\" ditemukan, yaitu indeks 1.",
		"hints": [
			"Hitung posisi elemen mulai dari 0.",
			"\"x\" berada di 0, maka \"y\" berada di indeks berikutnya."
		],
		"xp": 20
	},
	{
		"id": "lvl15-q3",
		"level": 15,
		"topic": "list search & membership",
		"difficulty": "medium",
		"type": "output-prediction",
		"question": "Berapa angka yang dikembalikan oleh metode count() berikut?",
		"code": "angka = [1, 2, 2, 3, 2, 4]\nprint(angka.count(2))",
		"options": [
			{
				"id": "opt-l15q3-a",
				"text": "2"
			},
			{
				"id": "opt-l15q3-b",
				"text": "3"
			},
			{
				"id": "opt-l15q3-c",
				"text": "6"
			},
			{
				"id": "opt-l15q3-d",
				"text": "1"
			}
		],
		"correctAnswer": "3",
		"correctAnswerId": "opt-l15q3-b",
		"explanation": "angka.count(2) menghitung frekuensi kemunculan angka 2, yang muncul sebanyak 3 kali di dalam list.",
		"hints": [
			"Hitung seberapa sering angka 2 muncul dalam deretan.",
			"Muncul di posisi kedua, ketiga, dan kelima."
		],
		"xp": 20
	},
	{
		"id": "lvl15-q4",
		"level": 15,
		"topic": "list search & membership",
		"difficulty": "medium",
		"type": "concept",
		"question": "Bagaimana perilaku metode index() jika nilai yang dicari sama sekali tidak ada di dalam list?",
		"code": "angka = [10, 20, 30]\nposisi = angka.index(99)",
		"options": [
			{
				"id": "opt-l15q4-a",
				"text": "Mengembalikan angka -1"
			},
			{
				"id": "opt-l15q4-b",
				"text": "Menghasilkan galat ValueError"
			},
			{
				"id": "opt-l15q4-c",
				"text": "Mengembalikan nilai None"
			},
			{
				"id": "opt-l15q4-d",
				"text": "Mengembalikan boolean False"
			}
		],
		"correctAnswer": "Menghasilkan galat ValueError",
		"correctAnswerId": "opt-l15q4-b",
		"explanation": "Di Python, memanggil list.index(x) untuk elemen yang tidak ada memicu ValueError, bukan mengembalikan -1.",
		"hints": [
			"Python lebih memilih memicu error tipe nilai dibanding mengembalikan nilai semu -1.",
			"Pastikan cek dengan operator in sebelum memanggil index()."
		],
		"xp": 20
	},
	{
		"id": "lvl15-q5",
		"level": 15,
		"topic": "list search & membership",
		"difficulty": "medium",
		"type": "choose-code",
		"question": "Fungsi bawaan apa yang dipakai untuk mencari nilai terkecil dan terbesar dalam list angka?",
		"code": "skor = [45, 92, 18, 77]\nterendah = min(skor)\ntertinggi = max(skor)",
		"options": [
			{
				"id": "opt-l15q5-a",
				"text": "min() dan max()"
			},
			{
				"id": "opt-l15q5-b",
				"text": "low() dan high()"
			},
			{
				"id": "opt-l15q5-c",
				"text": "smallest() dan largest()"
			},
			{
				"id": "opt-l15q5-d",
				"text": "bottom() dan top()"
			}
		],
		"correctAnswer": "min() dan max()",
		"correctAnswerId": "opt-l15q5-a",
		"explanation": "Fungsi bawaan Python min() mencari nilai minimum dan max() mencari nilai maksimum pada koleksi numerik.",
		"hints": [
			"Singkatan standar matematika untuk minimum dan maksimum.",
			"Tiga huruf awal dari kata minimum dan maksimum."
		],
		"xp": 20
	},
	{
		"id": "lvl16-q1",
		"level": 16,
		"topic": "tuple & immutability",
		"difficulty": "hard",
		"type": "concept",
		"question": "Apa arti dari sifat \"immutable\" pada struktur data Tuple di Python?",
		"code": "titik = (10, 20)\n# Sifat dasar tuple",
		"options": [
			{
				"id": "opt-l16q1-a",
				"text": "Elemen di dalamnya tidak dapat diubah, ditambah, atau dihapus setelah dibuat"
			},
			{
				"id": "opt-l16q1-b",
				"text": "Hanya dapat menyimpan angka dan tidak bisa menyimpan teks"
			},
			{
				"id": "opt-l16q1-c",
				"text": "Secara otomatis mengurutkan elemen dari kecil ke besar"
			},
			{
				"id": "opt-l16q1-d",
				"text": "Dapat diubah ukurannya kapan saja tanpa batasan memori"
			}
		],
		"correctAnswer": "Elemen di dalamnya tidak dapat diubah, ditambah, atau dihapus setelah dibuat",
		"correctAnswerId": "opt-l16q1-a",
		"explanation": "Objek immutable (tidak dapat dimutasi) bersifat tetap permanen; perubahan isi akan memicu TypeError.",
		"hints": [
			"Pikirkan kata dasar mutasi yang berarti perubahan bentuk atau isi.",
			"Immutable berarti kebal terhadap perubahan konten."
		],
		"xp": 25
	},
	{
		"id": "lvl16-q2",
		"level": 16,
		"topic": "tuple & immutability",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Apa yang terjadi jika kita mencoba memodifikasi elemen tuple secara langsung seperti kode berikut?",
		"code": "koordinat = (5, 9)\nkoordinat[0] = 7",
		"options": [
			{
				"id": "opt-l16q2-a",
				"text": "Nilai elemen pertama berganti menjadi 7 dengan sukses"
			},
			{
				"id": "opt-l16q2-b",
				"text": "Muncul TypeError: tuple object does not support item assignment"
			},
			{
				"id": "opt-l16q2-c",
				"text": "Muncul ValueError karena nilai tidak cocok"
			},
			{
				"id": "opt-l16q2-d",
				"text": "Tuple otomatis berubah menjadi list"
			}
		],
		"correctAnswer": "Muncul TypeError: tuple object does not support item assignment",
		"correctAnswerId": "opt-l16q2-b",
		"explanation": "Tuple tidak mendukung penugasan elemen (item assignment) karena sifat kekekalannya (immutability).",
		"hints": [
			"Karena sifat kekal dari tuple, operasi penugasan nilai akan ditolak oleh Python.",
			"Tipe data ini melarang modifikasi elemen tunggalnya."
		],
		"xp": 25
	},
	{
		"id": "lvl16-q3",
		"level": 16,
		"topic": "tuple & immutability",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah nilai b setelah proses pembongkaran tuple (tuple unpacking) berikut?",
		"code": "a, b = (100, 200)\nprint(b)",
		"options": [
			{
				"id": "opt-l16q3-a",
				"text": "100"
			},
			{
				"id": "opt-l16q3-b",
				"text": "(100, 200)"
			},
			{
				"id": "opt-l16q3-c",
				"text": "200"
			},
			{
				"id": "opt-l16q3-d",
				"text": "300"
			}
		],
		"correctAnswer": "200",
		"correctAnswerId": "opt-l16q3-c",
		"explanation": "Unpacking memetakan nilai berdasarkan urutan posisi: variabel a menerima 100 dan b menerima 200.",
		"hints": [
			"Perhatikan posisi variabel kedua di sisi kiri persamaan.",
			"Variabel b berpasangan dengan elemen kedua di dalam tuple."
		],
		"xp": 25
	},
	{
		"id": "lvl16-q4",
		"level": 16,
		"topic": "tuple & immutability",
		"difficulty": "hard",
		"type": "concept",
		"question": "Bagaimana cara membuat sebuah tuple yang hanya memiliki satu elemen bernilai 5?",
		"code": "# Deklarasi tuple tunggal yang benar:",
		"options": [
			{
				"id": "opt-l16q4-a",
				"text": "(5)"
			},
			{
				"id": "opt-l16q4-b",
				"text": "[5,]"
			},
			{
				"id": "opt-l16q4-c",
				"text": "tuple:5"
			},
			{
				"id": "opt-l16q4-d",
				"text": "(5,)"
			}
		],
		"correctAnswer": "(5,)",
		"correctAnswerId": "opt-l16q4-d",
		"explanation": "Tanpa tanda koma penutup (5,), tanda kurung (5) hanya dianggap sebagai pengelompokan matematika biasa berjenis int.",
		"hints": [
			"Tanda koma setelah angka adalah pembeda utama antara ekspresi matematika dan tuple.",
			"Perhatikan kurung bulat yang diakhiri tanda koma."
		],
		"xp": 25
	},
	{
		"id": "lvl16-q5",
		"level": 16,
		"topic": "tuple & immutability",
		"difficulty": "hard",
		"type": "choose-code",
		"question": "Kapan sebaiknya kita memilih menggunakan Tuple dibandingkan List?",
		"code": "# Pertimbangan pemilihan struktur data:",
		"options": [
			{
				"id": "opt-l16q5-a",
				"text": "Ketika data bersifat konstan dan ingin dilindungi dari modifikasi tak disengaja"
			},
			{
				"id": "opt-l16q5-b",
				"text": "Ketika kita perlu sering menambah dan menghapus elemen secara dinamis"
			},
			{
				"id": "opt-l16q5-c",
				"text": "Ketika data membutuhkan pengurutan sort() secara berkala"
			},
			{
				"id": "opt-l16q5-d",
				"text": "Ketika jumlah elemen tidak diketahui dan akan terus bertambah"
			}
		],
		"correctAnswer": "Ketika data bersifat konstan dan ingin dilindungi dari modifikasi tak disengaja",
		"correctAnswerId": "opt-l16q5-a",
		"explanation": "Tuple ideal untuk data tetap seperti koordinat geografis, konfigurasi sistem, atau hari dalam seminggu.",
		"hints": [
			"Gunakan untuk data yang tidak boleh dirubah di tengah jalan.",
			"Memberikan jaminan integritas data yang stabil."
		],
		"xp": 25
	},
	{
		"id": "lvl17-q1",
		"level": 17,
		"topic": "dictionary basics",
		"difficulty": "hard",
		"type": "concept",
		"question": "Struktur pasangan apakah yang menjadi fondasi dasar penyimpanan data di Dictionary?",
		"code": "profil = {\"nama\": \"PyBot\", \"level\": 17}",
		"options": [
			{
				"id": "opt-l17q1-a",
				"text": "Indeks dan Offset"
			},
			{
				"id": "opt-l17q1-b",
				"text": "Kunci (Key) dan Nilai (Value)"
			},
			{
				"id": "opt-l17q1-c",
				"text": "Baris dan Kolom"
			},
			{
				"id": "opt-l17q1-d",
				"text": "Elemen dan Pointer"
			}
		],
		"correctAnswer": "Kunci (Key) dan Nilai (Value)",
		"correctAnswerId": "opt-l17q1-b",
		"explanation": "Dictionary memetakan setiap kunci (key) unik ke sebuah nilai (value) yang berasosiasi dengannya.",
		"hints": [
			"Mirip kamus bahasa: ada kata yang dicari, dan ada arti/penjelasannya.",
			"Istilah bahasa Inggrisnya adalah key-value pair."
		],
		"xp": 25
	},
	{
		"id": "lvl17-q2",
		"level": 17,
		"topic": "dictionary basics",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah output dari kode pengaksesan nilai dictionary di bawah ini?",
		"code": "hero = {\"nama\": \"Ksatria\", \"hp\": 100}\nprint(hero[\"hp\"])",
		"options": [
			{
				"id": "opt-l17q2-a",
				"text": "\"nama\""
			},
			{
				"id": "opt-l17q2-b",
				"text": "100"
			},
			{
				"id": "opt-l17q2-c",
				"text": "\"Ksatria\""
			},
			{
				"id": "opt-l17q2-d",
				"text": "None"
			}
		],
		"correctAnswer": "100",
		"correctAnswerId": "opt-l17q2-b",
		"explanation": "Menggunakan nama kunci hero[\"hp\"] membaca nilai yang tersimpan di kunci tersebut yaitu angka 100.",
		"hints": [
			"Lihat nilai yang diletakkan setelah tanda titik dua di belakang kunci \"hp\".",
			"Nilai numerik poin kesehatan hero."
		],
		"xp": 25
	},
	{
		"id": "lvl17-q3",
		"level": 17,
		"topic": "dictionary basics",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Error apa yang dilempar Python jika kita mengakses kunci yang tidak ada dengan kurung siku?",
		"code": "data = {\"kota\": \"Jakarta\"}\nprint(data[\"provinsi\"])",
		"options": [
			{
				"id": "opt-l17q3-a",
				"text": "IndexError"
			},
			{
				"id": "opt-l17q3-b",
				"text": "ValueError"
			},
			{
				"id": "opt-l17q3-c",
				"text": "KeyError"
			},
			{
				"id": "opt-l17q3-d",
				"text": "AttributeError"
			}
		],
		"correctAnswer": "KeyError",
		"correctAnswerId": "opt-l17q3-c",
		"explanation": "KeyError muncul saat kunci yang diminta tidak terdaftar di dalam dictionary.",
		"hints": [
			"Galat ini berkaitan langsung dengan nama kata kunci (key).",
			"Perhatikan kata \"Key\" dalam nama exception."
		],
		"xp": 25
	},
	{
		"id": "lvl17-q4",
		"level": 17,
		"topic": "dictionary basics",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Apa isi dictionary siswa setelah baris penugasan nilai dijalankan?",
		"code": "siswa = {\"nama\": \"Budi\", \"skor\": 80}\nsiswa[\"skor\"] = 95\nprint(siswa[\"skor\"])",
		"options": [
			{
				"id": "opt-l17q4-a",
				"text": "80"
			},
			{
				"id": "opt-l17q4-b",
				"text": "95"
			},
			{
				"id": "opt-l17q4-c",
				"text": "175"
			},
			{
				"id": "opt-l17q4-d",
				"text": "[80, 95]"
			}
		],
		"correctAnswer": "95",
		"correctAnswerId": "opt-l17q4-b",
		"explanation": "Menugaskan nilai ke kunci yang sudah ada akan memperbarui (overwrite) nilai lama menjadi 95.",
		"hints": [
			"Kunci yang sudah ada akan diperbarui nilainya, bukan diduplikasi.",
			"Nilai baru menimpa nilai yang lama."
		],
		"xp": 25
	},
	{
		"id": "lvl17-q5",
		"level": 17,
		"topic": "dictionary basics",
		"difficulty": "hard",
		"type": "choose-code",
		"question": "Tipe data manakah yang TIDAK BISA digunakan sebagai kunci (key) dictionary?",
		"code": "# Aturan kunci dictionary:",
		"options": [
			{
				"id": "opt-l17q5-a",
				"text": "String teks"
			},
			{
				"id": "opt-l17q5-b",
				"text": "Integer bilangan bulat"
			},
			{
				"id": "opt-l17q5-c",
				"text": "List"
			},
			{
				"id": "opt-l17q5-d",
				"text": "Tuple berisi angka"
			}
		],
		"correctAnswer": "List",
		"correctAnswerId": "opt-l17q5-c",
		"explanation": "Kunci dictionary harus berupa tipe data yang immutable (hashable). List bersifat mutable sehingga memicu TypeError: unhashable type.",
		"hints": [
			"Hanya objek yang kebal perubahan (hashable) yang boleh dijadikan kunci.",
			"Struktur data berkurung siku dapat diubah sehingga dilarang menjadi key."
		],
		"xp": 25
	},
	{
		"id": "lvl18-q1",
		"level": 18,
		"topic": "dictionary methods",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah nilai yang dikembalikan oleh metode get() jika kunci tidak ditemukan?",
		"code": "poin = {\"emas\": 50}\nhasil = poin.get(\"perak\", 0)\nprint(hasil)",
		"options": [
			{
				"id": "opt-l18q1-a",
				"text": "0"
			},
			{
				"id": "opt-l18q1-b",
				"text": "None"
			},
			{
				"id": "opt-l18q1-c",
				"text": "50"
			},
			{
				"id": "opt-l18q1-d",
				"text": "Crash dengan KeyError"
			}
		],
		"correctAnswer": "0",
		"correctAnswerId": "opt-l18q1-a",
		"explanation": "dict.get(key, default) mengembalikan nilai default (dalam hal ini 0) jika key tidak ditemukan, tanpa memicu error.",
		"hints": [
			"Argumen kedua adalah nilai cadangan jika kunci tidak ada.",
			"Nilai nol disediakan sebagai fallback."
		],
		"xp": 25
	},
	{
		"id": "lvl18-q2",
		"level": 18,
		"topic": "dictionary methods",
		"difficulty": "hard",
		"type": "code-reading",
		"question": "Apa yang dihasilkan oleh pemanggilan metode keys() pada sebuah dictionary?",
		"code": "biodata = {\"nama\": \"Ayu\", \"usia\": 15}\nprint(list(biodata.keys()))",
		"options": [
			{
				"id": "opt-l18q2-a",
				"text": "[\"nama\", \"usia\"]"
			},
			{
				"id": "opt-l18q2-b",
				"text": "[\"Ayu\", 15]"
			},
			{
				"id": "opt-l18q2-c",
				"text": "[(\"nama\", \"Ayu\"), (\"usia\", 15)]"
			},
			{
				"id": "opt-l18q2-d",
				"text": "[\"Ayu\", \"nama\"]"
			}
		],
		"correctAnswer": "[\"nama\", \"usia\"]",
		"correctAnswerId": "opt-l18q2-a",
		"explanation": "keys() mengembalikan tampilan seluruh nama kunci di dalam dictionary.",
		"hints": [
			"Metode ini khusus mengumpulkan label kuncinya, bukan isi datanya.",
			"\"nama\" dan \"usia\" adalah kunci yang dipakai."
		],
		"xp": 25
	},
	{
		"id": "lvl18-q3",
		"level": 18,
		"topic": "dictionary methods",
		"difficulty": "hard",
		"type": "concept",
		"question": "Metode apa yang digunakan untuk mengiterasi pasangan kunci dan nilai secara bersamaan dalam loop for?",
		"code": "kontak = {\"Budi\": \"0812\", \"Cici\": \"0813\"}\nfor nama, no in kontak.items():\n    print(nama, no)",
		"options": [
			{
				"id": "opt-l18q3-a",
				"text": "pairs()"
			},
			{
				"id": "opt-l18q3-b",
				"text": "elements()"
			},
			{
				"id": "opt-l18q3-c",
				"text": "items()"
			},
			{
				"id": "opt-l18q3-d",
				"text": "entries()"
			}
		],
		"correctAnswer": "items()",
		"correctAnswerId": "opt-l18q3-c",
		"explanation": "dict.items() mengembalikan objek tampilan berisi pasangan tuple (key, value) untuk setiap entri.",
		"hints": [
			"Kata bahasa Inggris yang berarti butir-butir atau item.",
			"Mengizinkan pembongkaran menjadi dua variabel di header loop."
		],
		"xp": 25
	},
	{
		"id": "lvl18-q4",
		"level": 18,
		"topic": "dictionary methods",
		"difficulty": "hard",
		"type": "choose-code",
		"question": "Bagaimana cara menghapus kunci \"alamat\" beserta nilainya dari dictionary profil?",
		"code": "profil = {\"nama\": \"Doni\", \"alamat\": \"Bandung\"}\n# Hapus entri alamat",
		"options": [
			{
				"id": "opt-l18q4-a",
				"text": "del profil[\"alamat\"]"
			},
			{
				"id": "opt-l18q4-b",
				"text": "profil.remove(\"alamat\")"
			},
			{
				"id": "opt-l18q4-c",
				"text": "profil.discard(\"alamat\")"
			},
			{
				"id": "opt-l18q4-d",
				"text": "profil[\"alamat\"].clear()"
			}
		],
		"correctAnswer": "del profil[\"alamat\"]",
		"correctAnswerId": "opt-l18q4-a",
		"explanation": "Kata kunci del atau metode profil.pop(\"alamat\") adalah cara resmi menghapus entri dari dictionary.",
		"hints": [
			"Kata kunci pendek tiga huruf untuk mendelete.",
			"del singkatan dari delete."
		],
		"xp": 25
	},
	{
		"id": "lvl18-q5",
		"level": 18,
		"topic": "dictionary methods",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah output dari kode pengosongan dictionary dengan clear() berikut?",
		"code": "keranjang = {\"apel\": 2, \"jeruk\": 5}\nkeranjang.clear()\nprint(keranjang)",
		"options": [
			{
				"id": "opt-l18q5-a",
				"text": "None"
			},
			{
				"id": "opt-l18q5-b",
				"text": "{}"
			},
			{
				"id": "opt-l18q5-c",
				"text": "[]"
			},
			{
				"id": "opt-l18q5-d",
				"text": "{\"apel\": 0, \"jeruk\": 0}"
			}
		],
		"correctAnswer": "{}",
		"correctAnswerId": "opt-l18q5-b",
		"explanation": "clear() mengosongkan seluruh pasangan kunci-nilai sehingga menyisakan dictionary kosong {}.",
		"hints": [
			"Kamus dikosongkan total tetapi variabelnya tetap ada.",
			"Bentuk representasi kamus kosong dengan kurung kurawal."
		],
		"xp": 25
	},
	{
		"id": "lvl19-q1",
		"level": 19,
		"topic": "set basics",
		"difficulty": "hard",
		"type": "concept",
		"question": "Apakah karakteristik paling utama dari struktur data Set di Python?",
		"code": "angka = {1, 2, 2, 3, 3, 3}\nprint(angka)",
		"options": [
			{
				"id": "opt-l19q1-a",
				"text": "Menyimpan nilai secara berurutan sesuai indeks"
			},
			{
				"id": "opt-l19q1-b",
				"text": "Hanya menyimpan elemen-elemen unik tanpa duplikasi"
			},
			{
				"id": "opt-l19q1-c",
				"text": "Elemen selalu tersimpan berpasangan dengan key"
			},
			{
				"id": "opt-l19q1-d",
				"text": "Semua elemen wajib bertipe teks string"
			}
		],
		"correctAnswer": "Hanya menyimpan elemen-elemen unik tanpa duplikasi",
		"correctAnswerId": "opt-l19q1-b",
		"explanation": "Set adalah kumpulan tak berurutan (unordered) yang secara otomatis menolak dan membuang elemen duplikat.",
		"hints": [
			"Struktur himpunan matematika yang menjamin tidak ada data kembar.",
			"Setiap anggota himpunan bersifat tunggal."
		],
		"xp": 25
	},
	{
		"id": "lvl19-q2",
		"level": 19,
		"topic": "set basics",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah jumlah elemen len() dari set yang dibuat dari list duplikat berikut?",
		"code": "data = [1, 2, 2, 3, 3, 3, 4]\nhimpunan = set(data)\nprint(len(himpunan))",
		"options": [
			{
				"id": "opt-l19q2-a",
				"text": "7"
			},
			{
				"id": "opt-l19q2-b",
				"text": "4"
			},
			{
				"id": "opt-l19q2-c",
				"text": "3"
			},
			{
				"id": "opt-l19q2-d",
				"text": "1"
			}
		],
		"correctAnswer": "4",
		"correctAnswerId": "opt-l19q2-b",
		"explanation": "Angka unik di dalam list data adalah 1, 2, 3, dan 4 (total ada 4 nilai unik). Duplikat dibuang.",
		"hints": [
			"Hitung berapa banyak jenis angka yang berbeda.",
			"Hanya ada angka satu, dua, tiga, dan empat."
		],
		"xp": 25
	},
	{
		"id": "lvl19-q3",
		"level": 19,
		"topic": "set basics",
		"difficulty": "hard",
		"type": "choose-code",
		"question": "Metode apa yang digunakan untuk menambahkan elemen baru ke dalam Set?",
		"code": "warna = {\"Merah\", \"Kuning\"}\n# Tambahkan \"Hijau\"",
		"options": [
			{
				"id": "opt-l19q3-a",
				"text": "warna.append(\"Hijau\")"
			},
			{
				"id": "opt-l19q3-b",
				"text": "warna.push(\"Hijau\")"
			},
			{
				"id": "opt-l19q3-c",
				"text": "warna.add(\"Hijau\")"
			},
			{
				"id": "opt-l19q3-d",
				"text": "warna.insert(\"Hijau\")"
			}
		],
		"correctAnswer": "warna.add(\"Hijau\")",
		"correctAnswerId": "opt-l19q3-c",
		"explanation": "Untuk Set, metode penambahan elemen adalah add(). append() hanya milik List.",
		"hints": [
			"Kata bahasa Inggris tiga huruf untuk menambah.",
			"Berbeda dengan list yang memakai append."
		],
		"xp": 25
	},
	{
		"id": "lvl19-q4",
		"level": 19,
		"topic": "set basics",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Mengapa kode pengaksesan indeks himpunan angka[0] di bawah ini menghasilkan galat?",
		"code": "angka = {10, 20, 30}\nprint(angka[0])",
		"options": [
			{
				"id": "opt-l19q4-a",
				"text": "Set tidak memiliki urutan (unordered) sehingga tidak mendukung indexing"
			},
			{
				"id": "opt-l19q4-b",
				"text": "Indeks 0 khusus untuk tipe list saja"
			},
			{
				"id": "opt-l19q4-c",
				"text": "Angka dalam set harus diubah menjadi huruf terlebih dahulu"
			},
			{
				"id": "opt-l19q4-d",
				"text": "Set memerlukan tanda koma ekstra di akhir kurung"
			}
		],
		"correctAnswer": "Set tidak memiliki urutan (unordered) sehingga tidak mendukung indexing",
		"correctAnswerId": "opt-l19q4-a",
		"explanation": "Set adalah himpunan tanpa urutan posisi pasti, sehingga TypeError: set object is not subscriptable akan muncul.",
		"hints": [
			"Dalam himpunan tidak dikenal konsep nomor urut pertama atau kedua.",
			"Objek set tidak berindeks."
		],
		"xp": 25
	},
	{
		"id": "lvl19-q5",
		"level": 19,
		"topic": "set basics",
		"difficulty": "hard",
		"type": "concept",
		"question": "Bagaimana cara membuat sebuah Set kosong yang benar di Python?",
		"code": "# Inisialisasi set kosong:",
		"options": [
			{
				"id": "opt-l19q5-a",
				"text": "set_kosong = {}"
			},
			{
				"id": "opt-l19q5-b",
				"text": "set_kosong = set()"
			},
			{
				"id": "opt-l19q5-c",
				"text": "set_kosong = []"
			},
			{
				"id": "opt-l19q5-d",
				"text": "set_kosong = {0}"
			}
		],
		"correctAnswer": "set_kosong = set()",
		"correctAnswerId": "opt-l19q5-b",
		"explanation": "Sintaks {} dicadangkan untuk dictionary kosong. Untuk membuat set kosong, wajib memakai fungsi set().",
		"hints": [
			"Kurung kurawal kosong {} akan dianggap dictionary kosong oleh Python.",
			"Gunakan konstruktor fungsi set bawaan."
		],
		"xp": 25
	},
	{
		"id": "lvl20-q1",
		"level": 20,
		"topic": "set operations",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah hasil operasi irisan (intersection &) antara dua set berikut?",
		"code": "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)",
		"options": [
			{
				"id": "opt-l20q1-a",
				"text": "{1, 4}"
			},
			{
				"id": "opt-l20q1-b",
				"text": "{2, 3}"
			},
			{
				"id": "opt-l20q1-c",
				"text": "{1, 2, 3, 4}"
			},
			{
				"id": "opt-l20q1-d",
				"text": "{5}"
			}
		],
		"correctAnswer": "{2, 3}",
		"correctAnswerId": "opt-l20q1-b",
		"explanation": "Operator & mencari irisan yaitu elemen yang ada di kedua himpunan a dan b, yaitu 2 dan 3.",
		"hints": [
			"Cari angka yang sama-sama dimiliki oleh himpunan a dan b.",
			"Angka 2 dan 3 ada di kedua kelompok."
		],
		"xp": 25
	},
	{
		"id": "lvl20-q2",
		"level": 20,
		"topic": "set operations",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Apa hasil operasi gabungan (union |) antara set x dan y berikut?",
		"code": "x = {\"A\", \"B\"}\ny = {\"B\", \"C\"}\nprint(x | y)",
		"options": [
			{
				"id": "opt-l20q2-a",
				"text": "{\"A\", \"B\", \"C\"}"
			},
			{
				"id": "opt-l20q2-b",
				"text": "{\"B\"}"
			},
			{
				"id": "opt-l20q2-c",
				"text": "{\"A\", \"C\"}"
			},
			{
				"id": "opt-l20q2-d",
				"text": "{\"A\", \"B\", \"B\", \"C\"}"
			}
		],
		"correctAnswer": "{\"A\", \"B\", \"C\"}",
		"correctAnswerId": "opt-l20q2-a",
		"explanation": "Operator garis tegak | menggabungkan seluruh elemen kedua set dan otomatis menghapus duplikat \"B\".",
		"hints": [
			"Satukan seluruh anggota dari kedua himpunan.",
			"Huruf \"B\" cukup ditulis satu kali."
		],
		"xp": 25
	},
	{
		"id": "lvl20-q3",
		"level": 20,
		"topic": "set operations",
		"difficulty": "hard",
		"type": "code-reading",
		"question": "Apa arti dari operasi selisih himpunan a - b di bawah?",
		"code": "a = {10, 20, 30}\nb = {20, 40}\nprint(a - b)",
		"options": [
			{
				"id": "opt-l20q3-a",
				"text": "{10, 30}"
			},
			{
				"id": "opt-l20q3-b",
				"text": "{40}"
			},
			{
				"id": "opt-l20q3-c",
				"text": "{-10}"
			},
			{
				"id": "opt-l20q3-d",
				"text": "{10, 20, 30, 40}"
			}
		],
		"correctAnswer": "{10, 30}",
		"correctAnswerId": "opt-l20q3-a",
		"explanation": "Selisih (difference) a - b mengambil elemen yang ada di a tetapi TIDAK ada di b, yaitu 10 dan 30.",
		"hints": [
			"Ambil elemen milik himpunan a, lalu buang apa pun yang juga dimiliki b.",
			"20 dibuang karena dimiliki b."
		],
		"xp": 25
	},
	{
		"id": "lvl20-q4",
		"level": 20,
		"topic": "set operations",
		"difficulty": "hard",
		"type": "concept",
		"question": "Operator apa yang digunakan untuk mencari selisih simetris (elemen di a atau b tapi bukan di keduanya)?",
		"code": "# Symmetric difference:",
		"options": [
			{
				"id": "opt-l20q4-a",
				"text": "Operator caret ^"
			},
			{
				"id": "opt-l20q4-b",
				"text": "Operator modulo %"
			},
			{
				"id": "opt-l20q4-c",
				"text": "Operator tilde ~"
			},
			{
				"id": "opt-l20q4-d",
				"text": "Operator bintang ganda **"
			}
		],
		"correctAnswer": "Operator caret ^",
		"correctAnswerId": "opt-l20q4-a",
		"explanation": "Operator ^ (caret) menghitung symmetric difference, mengembalikan elemen yang eksklusif di salah satu himpunan.",
		"hints": [
			"Simbol topi segitiga pada tombol angka 6.",
			"Mirip operasi XOR logika."
		],
		"xp": 25
	},
	{
		"id": "lvl20-q5",
		"level": 20,
		"topic": "set operations",
		"difficulty": "hard",
		"type": "condition-logic",
		"question": "Berapakah nilai boolean dari metode issubset() pada kode berikut?",
		"code": "sub = {1, 2}\ninduk = {1, 2, 3, 4}\nprint(sub.issubset(induk))",
		"options": [
			{
				"id": "opt-l20q5-a",
				"text": "True"
			},
			{
				"id": "opt-l20q5-b",
				"text": "False"
			},
			{
				"id": "opt-l20q5-c",
				"text": "None"
			},
			{
				"id": "opt-l20q5-d",
				"text": "Error"
			}
		],
		"correctAnswer": "True",
		"correctAnswerId": "opt-l20q5-a",
		"explanation": "Karena setiap elemen dalam sub (1 dan 2) ada di dalam himpunan induk, sub adalah himpunan bagian (subset).",
		"hints": [
			"Semua anggota sub terkandung lengkap di dalam himpunan induk.",
			"Menghasilkan nilai kebenaran positif."
		],
		"xp": 25
	},
	{
		"id": "lvl21-q1",
		"level": 21,
		"topic": "function definition",
		"difficulty": "hard",
		"type": "concept",
		"question": "Kata kunci apa yang digunakan untuk mendefinisikan sebuah fungsi baru dalam Python?",
		"code": "# Deklarasi fungsi baru:\ndef sapa_pengguna():\n    print(\"Halo!\")",
		"options": [
			{
				"id": "opt-l21q1-a",
				"text": "function"
			},
			{
				"id": "opt-l21q1-b",
				"text": "def"
			},
			{
				"id": "opt-l21q1-c",
				"text": "func"
			},
			{
				"id": "opt-l21q1-d",
				"text": "define"
			}
		],
		"correctAnswer": "def",
		"correctAnswerId": "opt-l21q1-b",
		"explanation": "Python menggunakan kata kunci def (singkatan dari define) untuk membuat fungsi baru.",
		"hints": [
			"Singkatan tiga huruf dari kata bahasa Inggris define.",
			"Tiga huruf kecil: d-e-f."
		],
		"xp": 25
	},
	{
		"id": "lvl21-q2",
		"level": 21,
		"topic": "function definition",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah output dari kode pemanggilan fungsi berikut?",
		"code": "def bunyikan_bel():\n    print(\"Tring!\")\n\nbunyikan_bel()\nbunyikan_bel()",
		"options": [
			{
				"id": "opt-l21q2-a",
				"text": "Tring!"
			},
			{
				"id": "opt-l21q2-b",
				"text": "Tring!\nTring!"
			},
			{
				"id": "opt-l21q2-c",
				"text": "2"
			},
			{
				"id": "opt-l21q2-d",
				"text": "None"
			}
		],
		"correctAnswer": "Tring!\nTring!",
		"correctAnswerId": "opt-l21q2-b",
		"explanation": "Fungsi bunyikan_bel() dipanggil dua kali, sehingga pesan \"Tring!\" dicetak dua kali berturut-turut.",
		"hints": [
			"Setiap baris pemanggilan menjalankan seluruh isi blok fungsi dari awal.",
			"Fungsi dieksekusi sebanyak pemanggilannya."
		],
		"xp": 25
	},
	{
		"id": "lvl21-q3",
		"level": 21,
		"topic": "function definition",
		"difficulty": "hard",
		"type": "choose-code",
		"question": "Manakah penulisan pemanggilan fungsi yang sah untuk fungsi bernama hitung_luas?",
		"code": "# Pemanggilan fungsi:",
		"options": [
			{
				"id": "opt-l21q3-a",
				"text": "hitung_luas()"
			},
			{
				"id": "opt-l21q3-b",
				"text": "call hitung_luas"
			},
			{
				"id": "opt-l21q3-c",
				"text": "run(hitung_luas)"
			},
			{
				"id": "opt-l21q3-d",
				"text": "hitung_luas[]"
			}
		],
		"correctAnswer": "hitung_luas()",
		"correctAnswerId": "opt-l21q3-a",
		"explanation": "Memanggil fungsi di Python dilakukan dengan menulis nama fungsi diikuti tanda kurung bulat ().",
		"hints": [
			"Sertakan tanda kurung buka dan tutup di samping nama fungsi.",
			"Tanda kurung adalah operator pemanggilan (call operator)."
		],
		"xp": 25
	},
	{
		"id": "lvl21-q4",
		"level": 21,
		"topic": "function definition",
		"difficulty": "hard",
		"type": "concept",
		"question": "Apa filosofi utama pembuatan fungsi dalam rekayasa perangkat lunak (prinsip DRY)?",
		"code": "# Don't Repeat Yourself",
		"options": [
			{
				"id": "opt-l21q4-a",
				"text": "Mencegah duplikasi kode dengan membungkus instruksi berulang ke satu tempat"
			},
			{
				"id": "opt-l21q4-b",
				"text": "Mengharuskan setiap baris kode dijalankan secara acak"
			},
			{
				"id": "opt-l21q4-c",
				"text": "Menghindari penggunaan variabel di seluruh aplikasi"
			},
			{
				"id": "opt-l21q4-d",
				"text": "Membuat kode hanya bisa berjalan di satu sistem komputer"
			}
		],
		"correctAnswer": "Mencegah duplikasi kode dengan membungkus instruksi berulang ke satu tempat",
		"correctAnswerId": "opt-l21q4-a",
		"explanation": "DRY (Don't Repeat Yourself) menekankan agar kode yang berulang dijadikan fungsi modular terpusat.",
		"hints": [
			"Membantu pemeliharaan kode agar tidak menyalin baris yang sama berulang kali.",
			"Tingkatkan modularitas dan keterbacaan kode."
		],
		"xp": 25
	},
	{
		"id": "lvl21-q5",
		"level": 21,
		"topic": "function definition",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Mengapa kode di bawah menghasilkan NameError saat dieksekusi?",
		"code": "cetak_pesan()\n\ndef cetak_pesan():\n    print(\"Halo!\")",
		"options": [
			{
				"id": "opt-l21q5-a",
				"text": "Fungsi dipanggil sebelum baris definisinya dieksekusi oleh Python"
			},
			{
				"id": "opt-l21q5-b",
				"text": "Fungsi tidak boleh memiliki kata print di dalamnya"
			},
			{
				"id": "opt-l21q5-c",
				"text": "Nama fungsi terlalu panjang untuk didaftarkan"
			},
			{
				"id": "opt-l21q5-d",
				"text": "Huruf besar wajib digunakan untuk mendeklarasikan fungsi"
			}
		],
		"correctAnswer": "Fungsi dipanggil sebelum baris definisinya dieksekusi oleh Python",
		"correctAnswerId": "opt-l21q5-a",
		"explanation": "Python membaca kode dari atas ke bawah. Fungsi harus didefinisikan terlebih dahulu sebelum dapat dipanggil.",
		"hints": [
			"Perhatikan urutan baris atas dan baris bawah pada kode.",
			"Python belum mengenal nama fungsi tersebut saat baris pertama dijalankan."
		],
		"xp": 25
	},
	{
		"id": "lvl22-q1",
		"level": 22,
		"topic": "function parameters",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah output dari kode pengiriman parameter ke fungsi di bawah?",
		"code": "def salam(nama):\n    print(\"Halo, \" + nama)\n\nsalam(\"Citra\")",
		"options": [
			{
				"id": "opt-l22q1-a",
				"text": "Halo, nama"
			},
			{
				"id": "opt-l22q1-b",
				"text": "Halo, Citra"
			},
			{
				"id": "opt-l22q1-c",
				"text": "Citra"
			},
			{
				"id": "opt-l22q1-d",
				"text": "Error"
			}
		],
		"correctAnswer": "Halo, Citra",
		"correctAnswerId": "opt-l22q1-b",
		"explanation": "Nilai \"Citra\" dikirimkan ke parameter nama dan digabungkan dengan string \"Halo, \".",
		"hints": [
			"Argumen \"Citra\" mengisi posisi parameter nama di dalam fungsi.",
			"Teks disatukan secara langsung."
		],
		"xp": 25
	},
	{
		"id": "lvl22-q2",
		"level": 22,
		"topic": "function parameters",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Apa output jika fungsi dengan default parameter dipanggil tanpa argumen?",
		"code": "def sapa(nama=\"Sahabat\"):\n    print(\"Hai \" + nama)\n\nsapa()",
		"options": [
			{
				"id": "opt-l22q2-a",
				"text": "TypeError: missing 1 required positional argument"
			},
			{
				"id": "opt-l22q2-b",
				"text": "Hai Sahabat"
			},
			{
				"id": "opt-l22q2-c",
				"text": "Hai None"
			},
			{
				"id": "opt-l22q2-d",
				"text": "Hai nama"
			}
		],
		"correctAnswer": "Hai Sahabat",
		"correctAnswerId": "opt-l22q2-b",
		"explanation": "Karena tidak ada argumen yang dikirim, parameter nama otomatis mengambil nilai defaultnya yaitu \"Sahabat\".",
		"hints": [
			"Parameter memiliki nilai cadangan yang aktif jika tidak ada masukan.",
			"Nilai default terpasang di tanda sama dengan."
		],
		"xp": 25
	},
	{
		"id": "lvl22-q3",
		"level": 22,
		"topic": "function parameters",
		"difficulty": "hard",
		"type": "code-reading",
		"question": "Berapa hasil output dari pemanggilan dengan keyword argument berikut?",
		"code": "def perkenalan(kota, negara):\n    print(kota + \", \" + negara)\n\nperkenalan(negara=\"Indonesia\", kota=\"Bandung\")",
		"options": [
			{
				"id": "opt-l22q3-a",
				"text": "Indonesia, Bandung"
			},
			{
				"id": "opt-l22q3-b",
				"text": "Bandung, Indonesia"
			},
			{
				"id": "opt-l22q3-c",
				"text": "kota, negara"
			},
			{
				"id": "opt-l22q3-d",
				"text": "TypeError"
			}
		],
		"correctAnswer": "Bandung, Indonesia",
		"correctAnswerId": "opt-l22q3-b",
		"explanation": "Dengan keyword arguments, parameter dipasangkan berdasarkan namanya secara eksplisit terlepas dari urutan kirim.",
		"hints": [
			"Perhatikan nama variabel parameter yang dituju pada pemanggilan.",
			"kota tetap terisi \"Bandung\" dan negara terisi \"Indonesia\"."
		],
		"xp": 25
	},
	{
		"id": "lvl22-q4",
		"level": 22,
		"topic": "function parameters",
		"difficulty": "hard",
		"type": "concept",
		"question": "Simbol awalan apakah yang digunakan untuk menerima argumen posisi variabel bebas (*args) dalam fungsi?",
		"code": "def jumlahkan(*angka):\n    pass",
		"options": [
			{
				"id": "opt-l22q4-a",
				"text": "Tanda bintang satu *"
			},
			{
				"id": "opt-l22q4-b",
				"text": "Tanda pagar #"
			},
			{
				"id": "opt-l22q4-c",
				"text": "Tanda persen %"
			},
			{
				"id": "opt-l22q4-d",
				"text": "Tanda dolar $"
			}
		],
		"correctAnswer": "Tanda bintang satu *",
		"correctAnswerId": "opt-l22q4-a",
		"explanation": "Satu tanda bintang (*args) memungkinkan fungsi menerima sejumlah argumen posisi fleksibel sebagai tuple.",
		"hints": [
			"Simbol asterisk yang biasa dipakai untuk operasi perkalian.",
			"Tanda bintang mengemas banyak argumen menjadi satu tuple."
		],
		"xp": 25
	},
	{
		"id": "lvl22-q5",
		"level": 22,
		"topic": "function parameters",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Aturan penempatan parameter manakah yang dilanggar oleh definisi fungsi berikut?",
		"code": "def pesan(makanan=\"Nasi\", nama):\n    pass",
		"options": [
			{
				"id": "opt-l22q5-a",
				"text": "Parameter dengan nilai default tidak boleh mendahului parameter non-default"
			},
			{
				"id": "opt-l22q5-b",
				"text": "Parameter wajib menggunakan huruf kapital semua"
			},
			{
				"id": "opt-l22q5-c",
				"text": "Nilai default harus berupa bilangan angka"
			},
			{
				"id": "opt-l22q5-d",
				"text": "Nama fungsi tidak boleh lebih dari satu suku kata"
			}
		],
		"correctAnswer": "Parameter dengan nilai default tidak boleh mendahului parameter non-default",
		"correctAnswerId": "opt-l22q5-a",
		"explanation": "SyntaxError: non-default argument follows default argument. Parameter ber-default wajib ditaruh di paling belakang.",
		"hints": [
			"Parameter wajib harus ditaruh sebelum parameter opsional (yang punya nilai default).",
			"Posisikan nilai default di akhir daftar parameter."
		],
		"xp": 25
	},
	{
		"id": "lvl23-q1",
		"level": 23,
		"topic": "function return",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah nilai yang tersimpan di variabel hasil dari kode fungsi di bawah?",
		"code": "def kali_tiga(n):\n    return n * 3\n\nhasil = kali_tiga(5)\nprint(hasil)",
		"options": [
			{
				"id": "opt-l23q1-a",
				"text": "8"
			},
			{
				"id": "opt-l23q1-b",
				"text": "15"
			},
			{
				"id": "opt-l23q1-c",
				"text": "5"
			},
			{
				"id": "opt-l23q1-d",
				"text": "None"
			}
		],
		"correctAnswer": "15",
		"correctAnswerId": "opt-l23q1-b",
		"explanation": "return n * 3 menghitung 5 * 3 = 15 dan mengirimkannya kembali ke variabel penampung hasil.",
		"hints": [
			"Kalikan angka 5 dengan 3.",
			"Nilai kembalian disimpan ke variabel pemanggil."
		],
		"xp": 25
	},
	{
		"id": "lvl23-q2",
		"level": 23,
		"topic": "function return",
		"difficulty": "hard",
		"type": "concept",
		"question": "Apa perbedaan mendasar antara pernyataan return dan pemanggilan fungsi print() di dalam fungsi?",
		"code": "# return vs print",
		"options": [
			{
				"id": "opt-l23q2-a",
				"text": "return mengembalikan nilai ke program untuk diolah lebih lanjut, print() hanya menampilkan teks ke layar"
			},
			{
				"id": "opt-l23q2-b",
				"text": "return hanya untuk angka, sedangkan print() hanya untuk teks"
			},
			{
				"id": "opt-l23q2-c",
				"text": "print() menghentikan fungsi, sedangkan return melanjutkan baris berikutnya"
			},
			{
				"id": "opt-l23q2-d",
				"text": "Tidak ada perbedaan teknis di antara keduanya"
			}
		],
		"correctAnswer": "return mengembalikan nilai ke program untuk diolah lebih lanjut, print() hanya menampilkan teks ke layar",
		"correctAnswerId": "opt-l23q2-a",
		"explanation": "return menghasilkan nilai keluaran yang bisa disimpan atau dihitung lagi. print() hanya efek samping konsol.",
		"hints": [
			"Satu menghasilkan data untuk variabel, satu sekadar mencetak di terminal.",
			"Nilai dari print() tidak bisa dihitung dalam rumus matematika berikutnya."
		],
		"xp": 25
	},
	{
		"id": "lvl23-q3",
		"level": 23,
		"topic": "function return",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Apa nilai yang dikembalikan oleh sebuah fungsi yang tidak memiliki pernyataan return?",
		"code": "def tugas():\n    a = 10\n\nx = tugas()\nprint(x)",
		"options": [
			{
				"id": "opt-l23q3-a",
				"text": "0"
			},
			{
				"id": "opt-l23q3-b",
				"text": "None"
			},
			{
				"id": "opt-l23q3-c",
				"text": "10"
			},
			{
				"id": "opt-l23q3-d",
				"text": "False"
			}
		],
		"correctAnswer": "None",
		"correctAnswerId": "opt-l23q3-b",
		"explanation": "Di Python, fungsi tanpa return secara implisit mengembalikan objek khusus None (menandakan ketiadaan nilai).",
		"hints": [
			"Nilai khusus bawaan Python yang melambangkan objek kosong.",
			"Empat huruf diawali huruf kapital N."
		],
		"xp": 25
	},
	{
		"id": "lvl23-q4",
		"level": 23,
		"topic": "function return",
		"difficulty": "hard",
		"type": "code-reading",
		"question": "Mengapa baris print(\"Selesai\") pada kode di bawah tidak pernah dieksekusi?",
		"code": "def cek_angka(x):\n    return x * 2\n    print(\"Selesai\")\n\ncek_angka(4)",
		"options": [
			{
				"id": "opt-l23q4-a",
				"text": "Pernyataan return langsung mengakhiri eksekusi fungsi dan keluar"
			},
			{
				"id": "opt-l23q4-b",
				"text": "Fungsi print tidak kompatibel dengan angka"
			},
			{
				"id": "opt-l23q4-c",
				"text": "Indentasi print terlalu dalam"
			},
			{
				"id": "opt-l23q4-d",
				"text": "Angka 4 adalah bilangan genap"
			}
		],
		"correctAnswer": "Pernyataan return langsung mengakhiri eksekusi fungsi dan keluar",
		"correctAnswerId": "opt-l23q4-a",
		"explanation": "Begitu pernyataan return dicapai, fungsi seketika berhenti dieksekusi sehingga baris di bawahnya menjadi unreachable code.",
		"hints": [
			"Pernyataan return bertindak sebagai titik akhir mutlak fungsi.",
			"Komputer langsung melompat keluar dari blok fungsi begitu return disentuh."
		],
		"xp": 25
	},
	{
		"id": "lvl23-q5",
		"level": 23,
		"topic": "function return",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah nilai variabel y saat fungsi mengembalikan dua nilai sekaligus?",
		"code": "def min_max(a, b):\n    return a, b\n\nx, y = min_max(3, 7)\nprint(y)",
		"options": [
			{
				"id": "opt-l23q3-a",
				"text": "3"
			},
			{
				"id": "opt-l23q3-b",
				"text": "7"
			},
			{
				"id": "opt-l23q3-c",
				"text": "(3, 7)"
			},
			{
				"id": "opt-l23q3-d",
				"text": "10"
			}
		],
		"correctAnswer": "7",
		"correctAnswerId": "opt-l23q3-b",
		"explanation": "Mengembalikan beberapa nilai dipaketkan sebagai tuple (3, 7) dan di-unpack: x menerima 3 dan y menerima 7.",
		"hints": [
			"Variabel kedua menerima nilai kembalian urutan kedua.",
			"Nilai y berpasangan dengan nilai b yaitu 7."
		],
		"xp": 25
	},
	{
		"id": "lvl24-q1",
		"level": 24,
		"topic": "variable scope",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Error apa yang terjadi saat mencoba mencetak variabel lokal dari luar fungsi?",
		"code": "def rahasia():\n    kunci = \"xyz\"\n\nrahasia()\nprint(kunci)",
		"options": [
			{
				"id": "opt-l24q1-a",
				"text": "IndexError"
			},
			{
				"id": "opt-l24q1-b",
				"text": "TypeError"
			},
			{
				"id": "opt-l24q1-c",
				"text": "NameError: name 'kunci' is not defined"
			},
			{
				"id": "opt-l24q1-d",
				"text": "ValueError"
			}
		],
		"correctAnswer": "NameError: name 'kunci' is not defined",
		"correctAnswerId": "opt-l24q1-c",
		"explanation": "Variabel kunci dideklarasikan di dalam rahasia() sehingga bersifat lokal dan tidak dikenal di luar lingkup fungsi tersebut.",
		"hints": [
			"Python di luar fungsi tidak mengenali nama variabel yang terkunci di dalam fungsi.",
			"Galat nama tidak terdefinisi."
		],
		"xp": 25
	},
	{
		"id": "lvl24-q2",
		"level": 24,
		"topic": "variable scope",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah nilai skor di tingkat global setelah fungsi main() dijalankan?",
		"code": "skor = 10\n\ndef main():\n    skor = 50\n\nmain()\nprint(skor)",
		"options": [
			{
				"id": "opt-l24q2-a",
				"text": "50"
			},
			{
				"id": "opt-l24q2-b",
				"text": "10"
			},
			{
				"id": "opt-l24q2-c",
				"text": "60"
			},
			{
				"id": "opt-l24q2-d",
				"text": "0"
			}
		],
		"correctAnswer": "10",
		"correctAnswerId": "opt-l24q2-b",
		"explanation": "Penugasan skor = 50 di dalam fungsi membuat variabel lokal baru. Variabel global skor tetap utuh bernilai 10.",
		"hints": [
			"Tanpa kata kunci khusus, penugasan di dalam fungsi hanya membuat variabel lokal.",
			"Variabel global di luar fungsi tidak terpengaruh."
		],
		"xp": 25
	},
	{
		"id": "lvl24-q3",
		"level": 24,
		"topic": "variable scope",
		"difficulty": "hard",
		"type": "concept",
		"question": "Kata kunci apakah yang wajib digunakan di dalam fungsi jika ingin memodifikasi variabel tingkat global?",
		"code": "poin = 0\ndef tambah():\n    # Kata kunci pengubah variabel luar\n    global poin\n    poin += 5",
		"options": [
			{
				"id": "opt-l24q3-a",
				"text": "public"
			},
			{
				"id": "opt-l24q3-b",
				"text": "global"
			},
			{
				"id": "opt-l24q3-c",
				"text": "outer"
			},
			{
				"id": "opt-l24q3-d",
				"text": "static"
			}
		],
		"correctAnswer": "global",
		"correctAnswerId": "opt-l24q3-b",
		"explanation": "Kata kunci global memberitahu Python bahwa variabel yang dimaksud merujuk pada variabel di cakupan global modul.",
		"hints": [
			"Kata bahasa Inggris yang berarti mencakup seluruh dunia / cakupan umum.",
			"Enam huruf: g-l-o-b-a-l."
		],
		"xp": 25
	},
	{
		"id": "lvl24-q4",
		"level": 24,
		"topic": "variable scope",
		"difficulty": "hard",
		"type": "code-reading",
		"question": "Apakah fungsi di bawah ini diperbolehkan MEMBACA nilai variabel global tanpa kata kunci global?",
		"code": "pesan = \"Halo Dunia\"\ndef tampil():\n    print(pesan)\n\ntampil()",
		"options": [
			{
				"id": "opt-l24q4-a",
				"text": "Boleh, membaca nilai variabel global diperbolehkan secara default"
			},
			{
				"id": "opt-l24q4-b",
				"text": "Tidak boleh, akan langsung terjadi SyntaxError"
			},
			{
				"id": "opt-l24q4-c",
				"text": "Hanya boleh jika variabel berupa angka"
			},
			{
				"id": "opt-l24q4-d",
				"text": "Boleh hanya sekali pemanggilan saja"
			}
		],
		"correctAnswer": "Boleh, membaca nilai variabel global diperbolehkan secara default",
		"correctAnswerId": "opt-l24q4-a",
		"explanation": "Aturan LEGB mengizinkan fungsi membaca (read-only) variabel di lingkup global secara langsung.",
		"hints": [
			"Membaca (read) tidak sama dengan menulis/menugaskan ulang (write).",
			"Python secara otomatis mencari ke lingkup luar jika variabel tidak ditemukan secara lokal."
		],
		"xp": 25
	},
	{
		"id": "lvl24-q5",
		"level": 24,
		"topic": "variable scope",
		"difficulty": "hard",
		"type": "concept",
		"question": "Apa kepanjangan dari hierarki pencarian variabel LEGB di Python?",
		"code": "# Urutan pencarian scope:",
		"options": [
			{
				"id": "opt-l24q5-a",
				"text": "Local, Enclosing, Global, Built-in"
			},
			{
				"id": "opt-l24q5-b",
				"text": "Loop, Entry, Ground, Base"
			},
			{
				"id": "opt-l24q5-c",
				"text": "List, Element, Group, Byte"
			},
			{
				"id": "opt-l24q5-d",
				"text": "Level, Execution, Goal, Branch"
			}
		],
		"correctAnswer": "Local, Enclosing, Global, Built-in",
		"correctAnswerId": "opt-l24q5-a",
		"explanation": "LEGB adalah aturan prioritas resolusi nama di Python: Local -> Enclosing -> Global -> Built-in.",
		"hints": [
			"Dimulai dari lingkup paling dalam (lokal) hingga ke fungsi bawaan sistem.",
			"Lokal, pelingkup, global, bawaan."
		],
		"xp": 25
	},
	{
		"id": "lvl25-q1",
		"level": 25,
		"topic": "lambda functions",
		"difficulty": "hard",
		"type": "concept",
		"question": "Apakah fungsi anonim (lambda) di Python dan bagaimana sintaks dasarnya?",
		"code": "kuadrat = lambda x: x ** 2",
		"options": [
			{
				"id": "opt-l25q1-a",
				"text": "Fungsi satu baris tanpa nama yang dievaluasi sebagai ekspresi tunggal"
			},
			{
				"id": "opt-l25q1-b",
				"text": "Fungsi yang hanya bisa berjalan saat ada koneksi internet"
			},
			{
				"id": "opt-l25q1-c",
				"text": "Fungsi khusus yang hanya dapat menerima teks string"
			},
			{
				"id": "opt-l25q1-d",
				"text": "Metode untuk menghapus variabel secara otomatis"
			}
		],
		"correctAnswer": "Fungsi satu baris tanpa nama yang dievaluasi sebagai ekspresi tunggal",
		"correctAnswerId": "opt-l25q1-a",
		"explanation": "lambda argumen: ekspresi adalah fungsi kecil tanpa nama yang langsung mengembalikan hasil ekspresinya.",
		"hints": [
			"Fungsi ringkas satu baris yang tidak memerlukan pernyataan def formal.",
			"Kerap digunakan untuk kalkulasi cepat dan ringkas."
		],
		"xp": 25
	},
	{
		"id": "lvl25-q2",
		"level": 25,
		"topic": "lambda functions",
		"difficulty": "hard",
		"type": "output-prediction",
		"question": "Berapakah output dari evaluasi pemanggilan fungsi lambda berikut?",
		"code": "tambah = lambda a, b: a + b\nprint(tambah(3, 4))",
		"options": [
			{
				"id": "opt-l25q2-a",
				"text": "7"
			},
			{
				"id": "opt-l25q2-b",
				"text": "12"
			},
			{
				"id": "opt-l25q2-c",
				"text": "34"
			},
			{
				"id": "opt-l25q2-d",
				"text": "None"
			}
		],
		"correctAnswer": "7",
		"correctAnswerId": "opt-l25q2-a",
		"explanation": "Lambda menerima parameter a=3 dan b=4 lalu mengevaluasi a + b = 7.",
		"hints": [
			"Jumlahkan angka 3 dan 4.",
			"Ekspresi mengembalikan hasil penjumlahan."
		],
		"xp": 25
	},
	{
		"id": "lvl25-q3",
		"level": 25,
		"topic": "lambda functions",
		"difficulty": "hard",
		"type": "code-reading",
		"question": "Bagaimana fungsi lambda digunakan sebagai kunci pengurutan pada fungsi sorted() di bawah?",
		"code": "kata = [\"apel\", \"pisang\", \"kiwi\"]\nurut = sorted(kata, key=lambda k: len(k))\nprint(urut[0])",
		"options": [
			{
				"id": "opt-l25q3-a",
				"text": "\"pisang\""
			},
			{
				"id": "opt-l25q3-b",
				"text": "\"kiwi\""
			},
			{
				"id": "opt-l25q3-c",
				"text": "\"apel\""
			},
			{
				"id": "opt-l25q3-d",
				"text": "4"
			}
		],
		"correctAnswer": "\"kiwi\"",
		"correctAnswerId": "opt-l25q3-b",
		"explanation": "Pengurutan diatur berdasarkan panjang kata len(k). \"kiwi\" memiliki 4 huruf terpendek sehingga menjadi elemen pertama.",
		"hints": [
			"Kata diurutkan dari yang hurufnya paling sedikit.",
			"Perhatikan kata terpendek di posisi terdepan."
		],
		"xp": 25
	},
	{
		"id": "lvl25-q4",
		"level": 25,
		"topic": "lambda functions",
		"difficulty": "hard",
		"type": "find-error",
		"question": "Manakah batasan teknis dari fungsi lambda di Python?",
		"code": "# Batasan fungsi lambda:",
		"options": [
			{
				"id": "opt-l25q4-a",
				"text": "Hanya boleh berisi satu ekspresi tunggal dan tidak boleh berisi pernyataan kompleks seperti while"
			},
			{
				"id": "opt-l25q4-b",
				"text": "Tidak dapat menerima lebih dari 1 argumen"
			},
			{
				"id": "opt-l25q4-c",
				"text": "Tidak boleh menghasilkan nilai kembalian"
			},
			{
				"id": "opt-l25q4-d",
				"text": "Hanya bisa dipakai di versi Python lama"
			}
		],
		"correctAnswer": "Hanya boleh berisi satu ekspresi tunggal dan tidak boleh berisi pernyataan kompleks seperti while",
		"correctAnswerId": "opt-l25q4-a",
		"explanation": "Lambda dibatasi secara tata bahasa hanya untuk satu baris ekspresi tunggal tanpa blok pernyataan majemuk.",
		"hints": [
			"Fungsi ini dirancang minimalis tanpa blok multi-baris rumit.",
			"Ekspresi tunggal yang langsung dihitung."
		],
		"xp": 25
	},
	{
		"id": "lvl25-q5",
		"level": 25,
		"topic": "lambda functions",
		"difficulty": "hard",
		"type": "choose-code",
		"question": "Kapan sebaiknya kita menggunakan lambda dibanding fungsi def standar?",
		"code": "# Praktik terbaik lambda:",
		"options": [
			{
				"id": "opt-l25q5-a",
				"text": "Untuk fungsi kecil sekali pakai sebagai argumen ke higher-order function seperti map atau sorted"
			},
			{
				"id": "opt-l25q5-b",
				"text": "Untuk seluruh logika aplikasi bisnis yang kompleks"
			},
			{
				"id": "opt-l25q5-c",
				"text": "Ketika ingin mendefinisikan dokumentasi docstring yang panjang"
			},
			{
				"id": "opt-l25q5-d",
				"text": "Hanya saat kode membutuhkan penanganan error try-except"
			}
		],
		"correctAnswer": "Untuk fungsi kecil sekali pakai sebagai argumen ke higher-order function seperti map atau sorted",
		"correctAnswerId": "opt-l25q5-a",
		"explanation": "Lambda ideal untuk callback atau fungsi utilitas satu baris sementara yang disematkan ke dalam fungsi lain.",
		"hints": [
			"Cocok untuk fungsi pembantu sementara yang ringkas.",
			"Menghindari keharusan memberi nama pada fungsi pembantu kecil."
		],
		"xp": 25
	},
	{
		"id": "lvl26-q1",
		"level": 26,
		"topic": "string manipulation",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah jumlah elemen dalam list hasil pemanggilan split() berikut?",
		"code": "kalimat = \"Belajar Python Menyenangkan Sekali\"\nkata = kalimat.split()\nprint(len(kata))",
		"options": [
			{
				"id": "opt-l26q1-a",
				"text": "1"
			},
			{
				"id": "opt-l26q1-b",
				"text": "4"
			},
			{
				"id": "opt-l26q1-c",
				"text": "35"
			},
			{
				"id": "opt-l26q1-d",
				"text": "5"
			}
		],
		"correctAnswer": "4",
		"correctAnswerId": "opt-l26q1-b",
		"explanation": "split() memecah teks berdasarkan spasi menjadi 4 kata: [\"Belajar\", \"Python\", \"Menyenangkan\", \"Sekali\"].",
		"hints": [
			"Hitung berapa banyak kata yang dipisahkan oleh spasi dalam kalimat tersebut.",
			"Empat kata terpisah dalam kalimat."
		],
		"xp": 25
	},
	{
		"id": "lvl26-q2",
		"level": 26,
		"topic": "string manipulation",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Apa hasil penggabungan elemen list dengan metode join() di bawah?",
		"code": "huruf = [\"P\", \"Y\", \"Q\"]\nhasil = \"-\".join(huruf)\nprint(hasil)",
		"options": [
			{
				"id": "opt-l26q2-a",
				"text": "\"P-Y-Q\""
			},
			{
				"id": "opt-l26q2-b",
				"text": "\"-P-Y-Q-\""
			},
			{
				"id": "opt-l26q2-c",
				"text": "\"PYQ\""
			},
			{
				"id": "opt-l26q2-d",
				"text": "[\"P\", \"-\", \"Y\", \"-\", \"Q\"]"
			}
		],
		"correctAnswer": "\"P-Y-Q\"",
		"correctAnswerId": "opt-l26q2-a",
		"explanation": "join() merekatkan setiap elemen list dengan pembatas karakter pemisah di antaranya.",
		"hints": [
			"Karakter tanda minus disisipkan di antara setiap huruf.",
			"Hanya ditaruh di antara elemen, bukan di awal atau akhir."
		],
		"xp": 25
	},
	{
		"id": "lvl26-q3",
		"level": 26,
		"topic": "string manipulation",
		"difficulty": "challenge",
		"type": "code-reading",
		"question": "Apa kegunaan utama metode strip() pada sebuah string?",
		"code": "input_user = \"   admin   \"\nbersih = input_user.strip()",
		"options": [
			{
				"id": "opt-l26q3-a",
				"text": "Menghapus spasi putih di awal dan akhir teks"
			},
			{
				"id": "opt-l26q3-b",
				"text": "Mengubah semua huruf menjadi kapital"
			},
			{
				"id": "opt-l26q3-c",
				"text": "Menghitung jumlah karakter vokal"
			},
			{
				"id": "opt-l26q3-d",
				"text": "Membalik urutan karakter teks"
			}
		],
		"correctAnswer": "Menghapus spasi putih di awal dan akhir teks",
		"correctAnswerId": "opt-l26q3-a",
		"explanation": "strip() memangkas karakter spasi, tab, atau baris baru di kedua ujung string.",
		"hints": [
			"Sangat berguna untuk membersihkan input pengguna dari spasi berlebih.",
			"Memotong bagian kosong di sisi kiri dan kanan."
		],
		"xp": 25
	},
	{
		"id": "lvl26-q4",
		"level": 26,
		"topic": "string manipulation",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah hasil penggantian teks dengan replace() berikut?",
		"code": "teks = \"kucing lucu\"\nbaru = teks.replace(\"kucing\", \"kelinci\")\nprint(baru)",
		"options": [
			{
				"id": "opt-l26q4-a",
				"text": "\"kelinci lucu\""
			},
			{
				"id": "opt-l26q4-b",
				"text": "\"kucing kelinci\""
			},
			{
				"id": "opt-l26q4-c",
				"text": "\"kelinci\""
			},
			{
				"id": "opt-l26q4-d",
				"text": "\"lucu kucing\""
			}
		],
		"correctAnswer": "\"kelinci lucu\"",
		"correctAnswerId": "opt-l26q4-a",
		"explanation": "replace(lama, baru) mengganti kemunculan kata lama \"kucing\" dengan kata baru \"kelinci\".",
		"hints": [
			"Ganti kata pertama dengan kata penggantinya.",
			"Kata \"lucu\" di belakang tetap tidak berubah."
		],
		"xp": 25
	},
	{
		"id": "lvl26-q5",
		"level": 26,
		"topic": "string manipulation",
		"difficulty": "challenge",
		"type": "condition-logic",
		"question": "Apa nilai boolean yang dihasilkan dari metode startswith() di bawah?",
		"code": "berkas = \"laporan.pdf\"\nprint(berkas.endswith(\".pdf\"))",
		"options": [
			{
				"id": "opt-l26q5-a",
				"text": "True"
			},
			{
				"id": "opt-l26q5-b",
				"text": "False"
			},
			{
				"id": "opt-l26q5-c",
				"text": "None"
			},
			{
				"id": "opt-l26q5-d",
				"text": "\".pdf\""
			}
		],
		"correctAnswer": "True",
		"correctAnswerId": "opt-l26q5-a",
		"explanation": "endswith() memeriksa apakah string berakhiran dengan pola yang ditentukan; karena benar berakhiran \".pdf\", hasilnya True.",
		"hints": [
			"Nama berkas memang diakhiri dengan ekstensi format tersebut.",
			"Pengecekan akhiran string bernilai benar."
		],
		"xp": 25
	},
	{
		"id": "lvl27-q1",
		"level": 27,
		"topic": "f-string formatting",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah output dari kode interpolasi f-string berikut?",
		"code": "nama = \"PyBot\"\nlevel = 27\nprint(f\"{nama} berada di level {level}\")",
		"options": [
			{
				"id": "opt-l27q1-a",
				"text": "PyBot berada di level 27"
			},
			{
				"id": "opt-l27q1-b",
				"text": "{nama} berada di level {level}"
			},
			{
				"id": "opt-l27q1-c",
				"text": "PyBot level 27"
			},
			{
				"id": "opt-l27q1-d",
				"text": "Error: f-string syntax"
			}
		],
		"correctAnswer": "PyBot berada di level 27",
		"correctAnswerId": "opt-l27q1-a",
		"explanation": "f-string mengganti ekspresi di dalam kurung kurawal { } dengan nilai variabel yang sesuai secara dinamis.",
		"hints": [
			"Variabel nama diganti nilainya, begitu pula variabel level.",
			"Teks penghubung di antara keduanya tetap ditampilkan."
		],
		"xp": 25
	},
	{
		"id": "lvl27-q2",
		"level": 27,
		"topic": "f-string formatting",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah hasil evaluasi perhitungan ekspresi matematika langsung di dalam f-string?",
		"code": "harga = 5000\njumlah = 3\nprint(f\"Total: {harga * jumlah}\")",
		"options": [
			{
				"id": "opt-l27q2-a",
				"text": "Total: 15000"
			},
			{
				"id": "opt-l27q2-b",
				"text": "Total: {harga * jumlah}"
			},
			{
				"id": "opt-l27q2-c",
				"text": "Total: 50003"
			},
			{
				"id": "opt-l27q2-d",
				"text": "15000"
			}
		],
		"correctAnswer": "Total: 15000",
		"correctAnswerId": "opt-l27q2-a",
		"explanation": "Ekspresi matematika harga * jumlah langsung dihitung oleh Python sebelum dimasukkan ke teks (5000 * 3 = 15000).",
		"hints": [
			"Hitung hasil perkalian 5000 dengan 3.",
			"f-string mampu mengevaluasi ekspresi aritmatika secara langsung."
		],
		"xp": 25
	},
	{
		"id": "lvl27-q3",
		"level": 27,
		"topic": "f-string formatting",
		"difficulty": "challenge",
		"type": "code-reading",
		"question": "Apa fungsi dari penentu format :.2f pada ekspresi f-string berikut?",
		"code": "pi = 3.14159\nprint(f\"{pi:.2f}\")",
		"options": [
			{
				"id": "opt-l27q3-a",
				"text": "Membulatkan dan menampilkan angka dengan 2 angka di belakang koma desimal"
			},
			{
				"id": "opt-l27q3-b",
				"text": "Mengalikan angka dengan 2"
			},
			{
				"id": "opt-l27q3-c",
				"text": "Menghapus dua digit pertama dari angka"
			},
			{
				"id": "opt-l27q3-d",
				"text": "Mengubah format menjadi bilangan biner"
			}
		],
		"correctAnswer": "Membulatkan dan menampilkan angka dengan 2 angka di belakang koma desimal",
		"correctAnswerId": "opt-l27q3-a",
		"explanation": ":.2f memformat angka float ke presisi 2 digit desimal (menghasilkan string \"3.14\").",
		"hints": [
			"Huruf f mewakili floating-point, dan .2 menentukan jumlah digit desimal.",
			"Format presisi dua angka di belakang tanda titik."
		],
		"xp": 25
	},
	{
		"id": "lvl27-q4",
		"level": 27,
		"topic": "f-string formatting",
		"difficulty": "challenge",
		"type": "choose-code",
		"question": "Bagaimana cara menampilkan karakter kurung kurawal literal { } di dalam f-string tanpa dianggap ekspresi?",
		"code": "# Tampilkan: \"{Kode}\"",
		"options": [
			{
				"id": "opt-l27q4-a",
				"text": "f\"{{Kode}}\""
			},
			{
				"id": "opt-l27q4-b",
				"text": "f\"\\{Kode\\}\""
			},
			{
				"id": "opt-l27q4-c",
				"text": "f\"[Kode]\""
			},
			{
				"id": "opt-l27q4-d",
				"text": "f\"*Kode*\""
			}
		],
		"correctAnswer": "f\"{{Kode}}\"",
		"correctAnswerId": "opt-l27q4-a",
		"explanation": "Di f-string, tanda kurung kurawal ganda {{ dan }} berfungsi sebagai karakter escape untuk mencetak { dan } biasa.",
		"hints": [
			"Gunakan dua kurung kurawal berdampingan untuk meloloskan karakter literal.",
			"Pola kurung kurawal ganda."
		],
		"xp": 25
	},
	{
		"id": "lvl27-q5",
		"level": 27,
		"topic": "f-string formatting",
		"difficulty": "challenge",
		"type": "concept",
		"question": "Mengapa f-string (dikenalkan di Python 3.6) menjadi standar terbaik dibanding format % atau .format()?",
		"code": "# Keunggulan f-string",
		"options": [
			{
				"id": "opt-l27q5-a",
				"text": "Lebih cepat dieksekusi, sintaks lebih ringkas, dan jauh lebih mudah dibaca langsung"
			},
			{
				"id": "opt-l27q5-b",
				"text": "Hanya bisa digunakan untuk tipe data boolean"
			},
			{
				"id": "opt-l27q5-c",
				"text": "Menggunakan lebih banyak memori daripada cara lama"
			},
			{
				"id": "opt-l27q5-d",
				"text": "Tidak mengizinkan adanya nama variabel"
			}
		],
		"correctAnswer": "Lebih cepat dieksekusi, sintaks lebih ringkas, dan jauh lebih mudah dibaca langsung",
		"correctAnswerId": "opt-l27q5-a",
		"explanation": "f-string diurai pada saat parsing sehingga memiliki performa lebih kencang dan sintaks ekspresif yang rapi.",
		"hints": [
			"Menggabungkan kecepatan eksekusi dengan keindahan penulisan kode.",
			"Menjadi standar industri Python modern saat ini."
		],
		"xp": 25
	},
	{
		"id": "lvl28-q1",
		"level": 28,
		"topic": "try except error handling",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah output dari blok try-except saat terjadi pembagian dengan nol berikut?",
		"code": "try:\n    hasil = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Tidak bisa membagi nol\")\nprint(\"Lanjut\")",
		"options": [
			{
				"id": "opt-l28q1-a",
				"text": "Tidak bisa membagi nol\nLanjut"
			},
			{
				"id": "opt-l28q1-b",
				"text": "ZeroDivisionError: division by zero"
			},
			{
				"id": "opt-l28q1-c",
				"text": "Lanjut"
			},
			{
				"id": "opt-l28q1-d",
				"text": "Tidak bisa membagi nol"
			}
		],
		"correctAnswer": "Tidak bisa membagi nol\nLanjut",
		"correctAnswerId": "opt-l28q1-a",
		"explanation": "Galat ditangkap oleh blok except yang mencetak pesan aman, dan alur berlanjut ke baris print(\"Lanjut\").",
		"hints": [
			"Blok except mencegah aplikasi crash dan menangani error secara ramah.",
			"Program tetap melanjutkan eksekusi ke baris setelahnya."
		],
		"xp": 25
	},
	{
		"id": "lvl28-q2",
		"level": 28,
		"topic": "try except error handling",
		"difficulty": "challenge",
		"type": "concept",
		"question": "Apa jenis error yang muncul saat mencoba mengubah teks bukan-angka menjadi integer int()?",
		"code": "angka = int(\"abc\")",
		"options": [
			{
				"id": "opt-l28q2-a",
				"text": "ValueError"
			},
			{
				"id": "opt-l28q2-b",
				"text": "TypeError"
			},
			{
				"id": "opt-l28q2-c",
				"text": "IndexError"
			},
			{
				"id": "opt-l28q2-d",
				"text": "KeyError"
			}
		],
		"correctAnswer": "ValueError",
		"correctAnswerId": "opt-l28q2-a",
		"explanation": "ValueError: invalid literal for int() with base 10 muncul karena nilai string tidak merepresentasikan angka yang valid.",
		"hints": [
			"Kesalahan ini berkaitan dengan ketidaksesuaian nilai (value) masukan.",
			"Perhatikan kata \"Value\" pada nama galat."
		],
		"xp": 25
	},
	{
		"id": "lvl28-q3",
		"level": 28,
		"topic": "try except error handling",
		"difficulty": "challenge",
		"type": "code-reading",
		"question": "Kapan blok finally di dalam struktur penanganan error dieksekusi?",
		"code": "try:\n    # kode operasi\n    pass\nfinally:\n    print(\"Pembersihan selesai\")",
		"options": [
			{
				"id": "opt-l28q3-a",
				"text": "Hanya jika terjadi error saja"
			},
			{
				"id": "opt-l28q3-b",
				"text": "Selalu dieksekusi baik terjadi error maupun tidak"
			},
			{
				"id": "opt-l28q3-c",
				"text": "Hanya jika program berhenti paksa"
			},
			{
				"id": "opt-l28q3-d",
				"text": "Tidak pernah dieksekusi"
			}
		],
		"correctAnswer": "Selalu dieksekusi baik terjadi error maupun tidak",
		"correctAnswerId": "opt-l28q3-b",
		"explanation": "Blok finally dijamin selalu berjalan apa pun yang terjadi, sangat cocok untuk menutup file atau koneksi database.",
		"hints": [
			"Pikirkan kata finally yang berarti pada akhirnya pasti dijalankan.",
			"Menjamin tahap pembersihan tetap terlaksana."
		],
		"xp": 25
	},
	{
		"id": "lvl28-q4",
		"level": 28,
		"topic": "try except error handling",
		"difficulty": "challenge",
		"type": "choose-code",
		"question": "Kata kunci apakah yang digunakan programmer untuk memicu sebuah pengecualian (exception) secara sengaja?",
		"code": "if umur < 0:\n    # Picu error secara manual\n    raise ValueError(\"Umur tidak valid\")",
		"options": [
			{
				"id": "opt-l28q4-a",
				"text": "throw"
			},
			{
				"id": "opt-l28q4-b",
				"text": "raise"
			},
			{
				"id": "opt-l28q4-c",
				"text": "trigger"
			},
			{
				"id": "opt-l28q4-d",
				"text": "emit"
			}
		],
		"correctAnswer": "raise",
		"correctAnswerId": "opt-l28q4-b",
		"explanation": "Di Python, kita menggunakan kata kunci raise untuk melempar/memicu exception kustom.",
		"hints": [
			"Kata bahasa Inggris lima huruf yang berarti mengangkat atau membangkitkan.",
			"r-a-i-s-e."
		],
		"xp": 25
	},
	{
		"id": "lvl28-q5",
		"level": 28,
		"topic": "try except error handling",
		"difficulty": "challenge",
		"type": "concept",
		"question": "Mengapa menggunakan blok except kosong (bare except:) tanpa nama jenis error dianggap praktik buruk?",
		"code": "# Jangan lakukan ini:\ntry:\n    jalankan()\nexcept:\n    pass",
		"options": [
			{
				"id": "opt-l28q5-a",
				"text": "Dapat secara tidak sengaja menelan error kritis seperti KeyboardInterrupt atau bug ketik"
			},
			{
				"id": "opt-l28q5-b",
				"text": "Python akan langsung berhenti berfungsi"
			},
			{
				"id": "opt-l28q5-c",
				"text": "Hanya bisa dipakai di Windows dan gagal di Linux"
			},
			{
				"id": "opt-l28q5-d",
				"text": "Membuat kode berjalan dua kali lebih lambat"
			}
		],
		"correctAnswer": "Dapat secara tidak sengaja menelan error kritis seperti KeyboardInterrupt atau bug ketik",
		"correctAnswerId": "opt-l28q5-a",
		"explanation": "Menangkap semua error secara buta menyembunyikan bug tersembunyi dan menghentikan interupsi pengguna Ctrl+C.",
		"hints": [
			"Spesifikkan jenis error yang ingin ditangani agar tidak menutupi bug tak terduga.",
			"Praktik terbaik menganjurkan except Exception atau jenis galat spesifik."
		],
		"xp": 25
	},
	{
		"id": "lvl29-q1",
		"level": 29,
		"topic": "list comprehension",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah output dari kode list comprehension berikut?",
		"code": "angka = [1, 2, 3]\nkuadrat = [x * x for x in angka]\nprint(kuadrat)",
		"options": [
			{
				"id": "opt-l29q1-a",
				"text": "[1, 4, 9]"
			},
			{
				"id": "opt-l29q1-b",
				"text": "[1, 2, 3]"
			},
			{
				"id": "opt-l29q1-c",
				"text": "[2, 4, 6]"
			},
			{
				"id": "opt-l29q1-d",
				"text": "[x, x, x]"
			}
		],
		"correctAnswer": "[1, 4, 9]",
		"correctAnswerId": "opt-l29q1-a",
		"explanation": "List comprehension menghitung kuadrat untuk setiap angka: 1*1=1, 2*2=4, 3*3=9.",
		"hints": [
			"Kalikan setiap angka dengan dirinya sendiri.",
			"Satu kuadrat, dua kuadrat, dan tiga kuadrat."
		],
		"xp": 25
	},
	{
		"id": "lvl29-q2",
		"level": 29,
		"topic": "list comprehension",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah elemen yang dihasilkan dari list comprehension dengan penyaring if di bawah?",
		"code": "bilangan = [1, 2, 3, 4, 5, 6]\ngenap = [x for x in bilangan if x % 2 == 0]\nprint(genap)",
		"options": [
			{
				"id": "opt-l29q2-a",
				"text": "[1, 3, 5]"
			},
			{
				"id": "opt-l29q2-b",
				"text": "[2, 4, 6]"
			},
			{
				"id": "opt-l29q2-c",
				"text": "[6]"
			},
			{
				"id": "opt-l29q2-d",
				"text": "[2, 2, 2]"
			}
		],
		"correctAnswer": "[2, 4, 6]",
		"correctAnswerId": "opt-l29q2-b",
		"explanation": "Klausa if x % 2 == 0 hanya meloloskan bilangan yang habis dibagi dua (bilangan genap: 2, 4, 6).",
		"hints": [
			"Pilih angka yang merupakan bilangan genap.",
			"Dua, empat, dan enam lolos penyaringan."
		],
		"xp": 25
	},
	{
		"id": "lvl29-q3",
		"level": 29,
		"topic": "list comprehension",
		"difficulty": "challenge",
		"type": "code-reading",
		"question": "Bagaimana padanan dari kode list comprehension ini dalam bentuk loop for biasa?",
		"code": "hasil = [k.upper() for k in kata]",
		"options": [
			{
				"id": "opt-l29q3-a",
				"text": "hasil = []\nfor k in kata:\n    hasil.append(k.upper())"
			},
			{
				"id": "opt-l29q3-b",
				"text": "hasil = kata.upper()"
			},
			{
				"id": "opt-l29q3-c",
				"text": "for k in kata:\n    k.upper()"
			},
			{
				"id": "opt-l29q3-d",
				"text": "hasil = [kata.upper()]"
			}
		],
		"correctAnswer": "hasil = []\nfor k in kata:\n    hasil.append(k.upper())",
		"correctAnswerId": "opt-l29q3-a",
		"explanation": "List comprehension adalah bentuk ringkas dan ekspresif dari perulangan for yang menambahkan elemen ke list baru.",
		"hints": [
			"Membuat list kosong lalu menggunakan append di dalam loop for.",
			"Tiga baris kode terstruktur."
		],
		"xp": 25
	},
	{
		"id": "lvl29-q4",
		"level": 29,
		"topic": "list comprehension",
		"difficulty": "challenge",
		"type": "choose-code",
		"question": "Manakah sintaks list comprehension untuk mengambil panjang setiap kata dalam list kata_kata?",
		"code": "kata_kata = [\"apel\", \"belimbing\", \"ceri\"]",
		"options": [
			{
				"id": "opt-l29q4-a",
				"text": "[len(k) for k in kata_kata]"
			},
			{
				"id": "opt-l29q4-b",
				"text": "[k.length for k in kata_kata]"
			},
			{
				"id": "opt-l29q4-c",
				"text": "for k in kata_kata: len(k)"
			},
			{
				"id": "opt-l29q4-d",
				"text": "len([k for k in kata_kata])"
			}
		],
		"correctAnswer": "[len(k) for k in kata_kata]",
		"correctAnswerId": "opt-l29q4-a",
		"explanation": "[len(k) for k in kata_kata] memanggil fungsi len() untuk setiap kata k dan mengumpulkannya ke list baru.",
		"hints": [
			"Fungsi len() diterapkan di posisi ekspresi paling kiri.",
			"Dikelilingi tanda kurung siku."
		],
		"xp": 25
	},
	{
		"id": "lvl29-q5",
		"level": 29,
		"topic": "list comprehension",
		"difficulty": "challenge",
		"type": "concept",
		"question": "Apa prinsip Zen of Python terkait kapan TIDAK sebaiknya memakai list comprehension?",
		"code": "# Keterbacaan kode (Readability counts)",
		"options": [
			{
				"id": "opt-l29q5-a",
				"text": "Jika ekspresinya terlalu rumit atau bersarang banyak sehingga menurunkan keterbacaan kode"
			},
			{
				"id": "opt-l29q5-b",
				"text": "Hanya boleh dipakai maksimal 5 kali dalam satu program"
			},
			{
				"id": "opt-l29q5-c",
				"text": "Tidak boleh dipakai untuk angka lebih besar dari seratus"
			},
			{
				"id": "opt-l29q5-d",
				"text": "Wajib dihindari jika file berformat .py"
			}
		],
		"correctAnswer": "Jika ekspresinya terlalu rumit atau bersarang banyak sehingga menurunkan keterbacaan kode",
		"correctAnswerId": "opt-l29q5-a",
		"explanation": "Jika logika terlalu rumit, loop biasa lebih mudah dibaca dan di-debug dibanding list comprehension yang terlalu panjang.",
		"hints": [
			"Keterbacaan dan kejelasan kode lebih penting daripada memaksakan satu baris semata.",
			"Keterbacaan adalah prioritas utama (readability counts)."
		],
		"xp": 25
	},
	{
		"id": "lvl30-q1",
		"level": 30,
		"topic": "algorithms & python mastery",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah output dari algoritma penghitungan frekuensi karakter berikut?",
		"code": "teks = \"abracadabra\"\nhitungan = {}\nfor huruf in teks:\n    hitungan[huruf] = hitungan.get(huruf, 0) + 1\nprint(hitungan[\"a\"])",
		"options": [
			{
				"id": "opt-l30q1-a",
				"text": "3"
			},
			{
				"id": "opt-l30q1-b",
				"text": "5"
			},
			{
				"id": "opt-l30q1-c",
				"text": "4"
			},
			{
				"id": "opt-l30q1-d",
				"text": "2"
			}
		],
		"correctAnswer": "5",
		"correctAnswerId": "opt-l30q1-b",
		"explanation": "Huruf \"a\" muncul sebanyak 5 kali di dalam kata \"abracadabra\" (posisi indeks 0, 3, 5, 7, 10).",
		"hints": [
			"Hitung berapa kali huruf \"a\" ditulis dalam kata abracadabra.",
			"a - b - r - a - c - a - d - a - b - r - a."
		],
		"xp": 30
	},
	{
		"id": "lvl30-q2",
		"level": 30,
		"topic": "algorithms & python mastery",
		"difficulty": "challenge",
		"type": "code-reading",
		"question": "Berapa nilai kembalian dari fungsi pencarian bilangan prima sederhana di bawah?",
		"code": "def apakah_prima(n):\n    if n < 2: return False\n    for i in range(2, n):\n        if n % i == 0: return False\n    return True\n\nprint(apakah_prima(7))",
		"options": [
			{
				"id": "opt-l30q2-a",
				"text": "True"
			},
			{
				"id": "opt-l30q2-b",
				"text": "False"
			},
			{
				"id": "opt-l30q2-c",
				"text": "None"
			},
			{
				"id": "opt-l30q2-d",
				"text": "7"
			}
		],
		"correctAnswer": "True",
		"correctAnswerId": "opt-l30q2-a",
		"explanation": "Angka 7 tidak habis dibagi angka 2 hingga 6, sehingga fungsi mengembalikan boolean True.",
		"hints": [
			"7 adalah bilangan prima yang hanya habis dibagi 1 dan 7.",
			"Hasil evaluasi kebenaran bilangan prima."
		],
		"xp": 30
	},
	{
		"id": "lvl30-q3",
		"level": 30,
		"topic": "algorithms & python mastery",
		"difficulty": "challenge",
		"type": "output-prediction",
		"question": "Berapakah output dari algoritma penggabungan list angka unik terurut berikut?",
		"code": "daftar1 = [3, 1, 4]\ndaftar2 = [1, 5, 9, 3]\ngabung = sorted(list(set(daftar1 + daftar2)))\nprint(gabung[:3])",
		"options": [
			{
				"id": "opt-l30q3-a",
				"text": "[1, 3, 4]"
			},
			{
				"id": "opt-l30q3-b",
				"text": "[3, 1, 4]"
			},
			{
				"id": "opt-l30q3-c",
				"text": "[1, 1, 3]"
			},
			{
				"id": "opt-l30q3-d",
				"text": "[5, 9, 3]"
			}
		],
		"correctAnswer": "[1, 3, 4]",
		"correctAnswerId": "opt-l30q3-a",
		"explanation": "set() menyaring nilai unik {1, 3, 4, 5, 9}, sorted() mengurutkannya, dan [:3] mengambil 3 angka pertama yaitu [1, 3, 4].",
		"hints": [
			"Nilai unik diurutkan dari kecil ke besar: 1, 3, 4, 5, 9.",
			"Tiga nilai terkecil pertama."
		],
		"xp": 30
	},
	{
		"id": "lvl30-q4",
		"level": 30,
		"topic": "algorithms & python mastery",
		"difficulty": "challenge",
		"type": "condition-logic",
		"question": "Apakah hasil dari penelusuran binary-like condition pada kode berikut?",
		"code": "data = [10, 20, 30, 40, 50]\ntarget = 40\nada = False\nfor item in data:\n    if item == target:\n        ada = True\n        break\nprint(ada)",
		"options": [
			{
				"id": "opt-l30q4-a",
				"text": "True"
			},
			{
				"id": "opt-l30q4-b",
				"text": "False"
			},
			{
				"id": "opt-l30q4-c",
				"text": "40"
			},
			{
				"id": "opt-l30q4-d",
				"text": "None"
			}
		],
		"correctAnswer": "True",
		"correctAnswerId": "opt-l30q4-a",
		"explanation": "Ketika item mencapai 40, ada diubah menjadi True dan break menghentikan loop seketika.",
		"hints": [
			"Pencarian linier menemukan elemen target 40.",
			"Variabel bendera ada berubah menjadi benar."
		],
		"xp": 30
	},
	{
		"id": "lvl30-q5",
		"level": 30,
		"topic": "algorithms & python mastery",
		"difficulty": "challenge",
		"type": "concept",
		"question": "Kutipan pertama dari filosofi Zen of Python (PEP 20) oleh Tim Peters berbunyi:",
		"code": "import this\n# Filosofi Python:",
		"options": [
			{
				"id": "opt-l30q5-a",
				"text": "Beautiful is better than ugly. (Indah lebih baik daripada buruk rupa.)"
			},
			{
				"id": "opt-l30q5-b",
				"text": "Fast is better than correct. (Cepat lebih baik daripada benar.)"
			},
			{
				"id": "opt-l30q5-c",
				"text": "Complex is better than simple. (Rumit lebih baik daripada sederhana.)"
			},
			{
				"id": "opt-l30q5-d",
				"text": "Hard is better than easy. (Sulit lebih baik daripada mudah.)"
			}
		],
		"correctAnswer": "Beautiful is better than ugly. (Indah lebih baik daripada buruk rupa.)",
		"correctAnswerId": "opt-l30q5-a",
		"explanation": "Prinsip pertama Zen of Python menegaskan bahwa kejelasan, kebersihan, dan keindahan kode adalah prioritas utama.",
		"hints": [
			"Keindahan dan keterbacaan kode adalah jiwa utama komunitas Python.",
			"Prinsip pertama dari dokumen panduan import this."
		],
		"xp": 30
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
