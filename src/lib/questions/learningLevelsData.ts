import type { LearningLevel } from '../types';

export const learningLevelsData: LearningLevel[] = [
	{
		id: 1,
		unitId: 1,
		unitTitle: 'Unit 1: Sintaksis & Tipe Data Dasar',
		title: 'Level 1: Dasar Output & print()',
		topic: 'print()',
		description: 'Tampilkan teks dan angka ke layar konsol Python.',
		objective: 'Belajar menampilkan teks dengan print().',
		quickTip: 'Teks di dalam print() harus diapit tanda kutip agar dibaca sebagai string.',
		concepts: ['print()', 'String', 'Tanda Kutip'],
		concept: 'Output Konsol: print() mengirim data ke layar terminal.',
		achievement: {
			id: 'ach-learn-1',
			levelId: 1,
			title: 'Pencetak Pertama',
			description: 'Tampilkan teks dan angka pertama ke konsol Python.',
			icon: 'terminal',
			xpReward: 30
		},
		difficulty: 'easy',
		questionIds: ['lvl1-q1', 'lvl1-q2', 'lvl1-q3', 'lvl1-q4', 'lvl1-q5'],
		xpReward: 30
	},
	{
		id: 2,
		unitId: 1,
		unitTitle: 'Unit 1: Sintaksis & Tipe Data Dasar',
		title: 'Level 2: Variabel & Nilai',
		topic: 'variable',
		description: 'Simpan data ke dalam variabel dan perbarui nilainya.',
		objective: 'Belajar menyimpan data di variabel.',
		quickTip: 'Variabel ibarat kotak berlabel nama untuk menyimpan data di memori.',
		concepts: ['Variabel', 'Simbol =', 'Ganti Nilai'],
		concept: 'Penyimpanan Nilai: Variabel adalah wadah berlabel untuk menyimpan data.',
		achievement: {
			id: 'ach-learn-2',
			levelId: 2,
			title: 'Penyimpan Memori',
			description: 'Buat dan perbarui variabel di memori.',
			icon: 'database',
			xpReward: 35
		},
		difficulty: 'easy',
		questionIds: ['lvl2-q1', 'lvl2-q2', 'lvl2-q3', 'lvl2-q4', 'lvl2-q5'],
		xpReward: 35
	},
	{
		id: 3,
		unitId: 1,
		unitTitle: 'Unit 1: Sintaksis & Tipe Data Dasar',
		title: 'Level 3: Tipe Data & String',
		topic: 'string & types',
		description: 'Pahami perbedaan data teks (str) dan angka (int/float).',
		objective: 'Kenali perbedaan teks dan angka.',
		quickTip: 'Angka bisa dihitung dengan matematika, sedangkan teks diapit tanda kutip.',
		concepts: ['str (Teks)', 'int (Angka)', 'type()'],
		concept: 'Tipe Data: Python membedakan data teks dan angka dalam operasi.',
		achievement: {
			id: 'ach-learn-3',
			levelId: 3,
			title: 'Analis Tipe Data',
			description: 'Bedakan tipe teks, integer, dan desimal.',
			icon: 'layers',
			xpReward: 35
		},
		difficulty: 'easy',
		questionIds: ['lvl3-q1', 'lvl3-q2', 'lvl3-q3', 'lvl3-q4', 'lvl3-q5'],
		xpReward: 35
	},
	{
		id: 4,
		unitId: 2,
		unitTitle: 'Unit 2: Interaksi & Operasi Logika',
		title: 'Level 4: Input Pengguna & Konversi',
		topic: 'input() & conversion',
		description: 'Tangkap masukan pengguna dan ubah menjadi angka.',
		objective: 'Minta masukan dari pengguna dengan input().',
		quickTip: 'Hasil input() selalu berupa teks; gunakan int() jika ingin mengubahnya jadi angka.',
		concepts: ['input()', 'int()', 'Ubah Tipe Data'],
		concept: 'Interaktivitas: input() selalu menghasilkan string sehingga membutuhkan konversi tipe data.',
		achievement: {
			id: 'ach-learn-4',
			levelId: 4,
			title: 'Komunikator Input',
			description: 'Buat program interaktif dengan masukan pengguna.',
			icon: 'message-square',
			xpReward: 40
		},
		difficulty: 'medium',
		questionIds: ['lvl4-q1', 'lvl4-q2', 'lvl4-q3', 'lvl4-q4', 'lvl4-q5'],
		xpReward: 40
	},
	{
		id: 5,
		unitId: 2,
		unitTitle: 'Unit 2: Interaksi & Operasi Logika',
		title: 'Level 5: Operator Aritmatika',
		topic: 'operator',
		description: 'Hitung matematika dengan operator +, -, *, /, //, dan %.',
		objective: 'Hitung angka dengan rumus matematika.',
		quickTip: 'Gunakan * untuk kali, / untuk bagi, dan % untuk mencari sisa bagi.',
		concepts: ['Aritmatika', 'Modulo %', 'Pangkat **'],
		concept: 'Kalkulasi: Python mengevaluasi ekspresi matematika sesuai urutan prioritas operator.',
		achievement: {
			id: 'ach-learn-5',
			levelId: 5,
			title: 'Kalkulator Cerdas',
			description: 'Kuasai seluruh perhitungan matematika Python.',
			icon: 'cpu',
			xpReward: 40
		},
		difficulty: 'medium',
		questionIds: ['lvl5-q1', 'lvl5-q2', 'lvl5-q3', 'lvl5-q4', 'lvl5-q5'],
		xpReward: 40
	},
	{
		id: 6,
		unitId: 2,
		unitTitle: 'Unit 2: Interaksi & Operasi Logika',
		title: 'Level 6: Boolean & Perbandingan',
		topic: 'boolean & comparison',
		description: 'Kuasai nilai True/False serta operator perbandingan.',
		objective: 'Bandingkan nilai dengan True atau False.',
		quickTip: 'Gunakan == untuk mengecek sama dengan dan != untuk tidak sama dengan.',
		concepts: ['True / False', '== dan !=', '> dan <'],
		concept: 'Logika Kebenaran: Operator perbandingan menghasilkan nilai boolean True atau False.',
		achievement: {
			id: 'ach-learn-6',
			levelId: 6,
			title: 'Detektif Logika',
			description: 'Evaluasi kondisi kebenaran boolean secara akurat.',
			icon: 'check-circle',
			xpReward: 45
		},
		difficulty: 'medium',
		questionIds: ['lvl6-q1', 'lvl6-q2', 'lvl6-q3', 'lvl6-q4', 'lvl6-q5'],
		xpReward: 45
	},
	{
		id: 7,
		unitId: 3,
		unitTitle: 'Unit 3: Alur Percabangan & Perulangan',
		title: 'Level 7: Percabangan if & else',
		topic: 'if & else',
		description: 'Buat keputusan alur program dengan syarat if dan else.',
		objective: 'Buat keputusan dengan percabangan IF.',
		quickTip: 'Kode di dalam if hanya berjalan jika syarat kondisinya bernilai True.',
		concepts: ['if Syarat', 'else Penutup', 'Indentasi Spasi'],
		concept: 'Alur Kondisional: Blok kode dieksekusi hanya jika syarat kondisi bernilai True.',
		achievement: {
			id: 'ach-learn-7',
			levelId: 7,
			title: 'Pengambil Keputusan',
			description: 'Arahkan alur keputusan program berdasarkan kondisi.',
			icon: 'git-branch',
			xpReward: 50
		},
		difficulty: 'hard',
		questionIds: ['lvl7-q1', 'lvl7-q2', 'lvl7-q3', 'lvl7-q4', 'lvl7-q5'],
		xpReward: 50
	},
	{
		id: 8,
		unitId: 3,
		unitTitle: 'Unit 3: Alur Percabangan & Perulangan',
		title: 'Level 8: Percabangan Majemuk elif',
		topic: 'elif',
		description: 'Evaluasi banyak kondisi berurutan dengan rantai elif.',
		objective: 'Tangani banyak pilihan dengan ELIF.',
		quickTip: 'elif akan dicek berurutan dari atas jika syarat if sebelumnya False.',
		concepts: ['elif Pilihan', 'Banyak Syarat'],
		concept: 'Multi-kondisi: elif dievaluasi berurutan dan berhenti saat syarat pertama terpenuhi.',
		achievement: {
			id: 'ach-learn-8',
			levelId: 8,
			title: 'Strategis Multi-Kondisi',
			description: 'Tangani berbagai skenario kondisi bertingkat.',
			icon: 'git-merge',
			xpReward: 50
		},
		difficulty: 'hard',
		questionIds: ['lvl8-q1', 'lvl8-q2', 'lvl8-q3', 'lvl8-q4', 'lvl8-q5'],
		xpReward: 50
	},
	{
		id: 9,
		unitId: 3,
		unitTitle: 'Unit 3: Alur Percabangan & Perulangan',
		title: 'Level 9: Perulangan for & range()',
		topic: 'for loop & range()',
		description: 'Otomatisasi aksi berulang dengan for loop dan range().',
		objective: 'Ulangi aksi berkali-kali dengan FOR.',
		quickTip: 'for i in range(5) akan mengulang aksi sebanyak 5 kali secara otomatis.',
		concepts: ['for Loop', 'range()', 'Otomatisasi'],
		concept: 'Iterasi Terhitung: for loop mengulangi blok kode sesuai jumlah elemen dalam urutan.',
		achievement: {
			id: 'ach-learn-9',
			levelId: 9,
			title: 'Pengulang Ulung',
			description: 'Otomatisasi perulangan terhitung menggunakan loop for.',
			icon: 'repeat',
			xpReward: 60
		},
		difficulty: 'challenge',
		questionIds: ['lvl9-q1', 'lvl9-q2', 'lvl9-q3', 'lvl9-q4', 'lvl9-q5'],
		xpReward: 60
	},
	{
		id: 10,
		unitId: 3,
		unitTitle: 'Unit 3: Alur Percabangan & Perulangan',
		title: 'Level 10: Perulangan while & Logika',
		topic: 'while loop & basic logic',
		description: 'Gunakan loop berbasis syarat kondisi while dan logika penuh.',
		objective: 'Kuasai loop bersyarat WHILE!',
		quickTip: 'while terus berulang selama kondisi True, pastikan ada langkah berhenti.',
		concepts: ['while Loop', 'Syarat Berhenti', 'Master Teori'],
		concept: 'Iterasi Kondisional: while terus berjalan selama kondisi True dan berhenti saat False.',
		achievement: {
			id: 'ach-learn-10',
			levelId: 10,
			title: 'Master Teori Python',
			description: 'Tuntaskan seluruh fondasi materi Python pemula!',
			icon: 'award',
			xpReward: 70
		},
		difficulty: 'challenge',
		questionIds: ['lvl10-q1', 'lvl10-q2', 'lvl10-q3', 'lvl10-q4', 'lvl10-q5'],
		xpReward: 70
	}
];

export function getLearningLevelById(levelId: number): LearningLevel | undefined {
	return learningLevelsData.find((lvl) => lvl.id === levelId);
}
