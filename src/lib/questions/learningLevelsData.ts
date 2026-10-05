import type { LearningLevel } from '../types';

export const learningLevelsData: LearningLevel[] = [
	{
		id: 1,
		title: 'Level 1: Dasar Output & print()',
		topic: 'print()',
		description: 'Pelajari cara menampilkan teks, angka, pemisah spasi, dan output data di konsol Python.',
		concept: 'Output Konsol: print() mengirim data ke layar terminal.',
		difficulty: 'easy',
		questionIds: ['lvl1-q1', 'lvl1-q2', 'lvl1-q3', 'lvl1-q4', 'lvl1-q5'],
		xpReward: 30
	},
	{
		id: 2,
		title: 'Level 2: Variabel & Nilai',
		topic: 'variable',
		description: 'Pahami cara menyimpan data dalam variabel, aturan penamaan, dan pembaharuan nilai di memori.',
		concept: 'Penyimpanan Nilai: Variabel adalah wadah berlabel untuk menyimpan data.',
		difficulty: 'easy',
		questionIds: ['lvl2-q1', 'lvl2-q2', 'lvl2-q3', 'lvl2-q4', 'lvl2-q5'],
		xpReward: 35
	},
	{
		id: 3,
		title: 'Level 3: Tipe Data & String',
		topic: 'string & types',
		description: 'Eksplorasi tipe teks (str), angka bulat (int), desimal (float), dan fungsi pemeriksaan type().',
		concept: 'Tipe Data: Python membedakan data teks dan angka dalam operasi.',
		difficulty: 'easy',
		questionIds: ['lvl3-q1', 'lvl3-q2', 'lvl3-q3', 'lvl3-q4', 'lvl3-q5'],
		xpReward: 35
	},
	{
		id: 4,
		title: 'Level 4: Input Pengguna & Konversi Tipe',
		topic: 'input() & conversion',
		description: 'Tangkap masukan pengguna dengan input() dan ubah teks menjadi angka dengan int() atau float().',
		concept: 'Interaktivitas: input() selalu menghasilkan string sehingga membutuhkan konversi tipe data.',
		difficulty: 'medium',
		questionIds: ['lvl4-q1', 'lvl4-q2', 'lvl4-q3', 'lvl4-q4', 'lvl4-q5'],
		xpReward: 40
	},
	{
		id: 5,
		title: 'Level 5: Operator Aritmatika',
		topic: 'operator',
		description: 'Gunakan operator matematika Python: +, -, *, /, // (floor division), %, dan ** (pangkat).',
		concept: 'Kalkulasi: Python mengevaluasi ekspresi matematika sesuai urutan prioritas operator.',
		difficulty: 'medium',
		questionIds: ['lvl5-q1', 'lvl5-q2', 'lvl5-q3', 'lvl5-q4', 'lvl5-q5'],
		xpReward: 40
	},
	{
		id: 6,
		title: 'Level 6: Boolean & Perbandingan',
		topic: 'boolean & comparison',
		description: 'Kuasai nilai True/False serta operator perbandingan ==, !=, >, <, >=, dan <=.',
		concept: 'Logika Kebenaran: Operator perbandingan menghasilkan nilai boolean True atau False.',
		difficulty: 'medium',
		questionIds: ['lvl6-q1', 'lvl6-q2', 'lvl6-q3', 'lvl6-q4', 'lvl6-q5'],
		xpReward: 45
	},
	{
		id: 7,
		title: 'Level 7: Percabangan if & else',
		topic: 'if & else',
		description: 'Buat keputusan alur program menggunakan blok syarat if, penutup else, dan indentasi.',
		concept: 'Alur Kondisional: Blok kode dieksekusi hanya jika syarat kondisi bernilai True.',
		difficulty: 'hard',
		questionIds: ['lvl7-q1', 'lvl7-q2', 'lvl7-q3', 'lvl7-q4', 'lvl7-q5'],
		xpReward: 50
	},
	{
		id: 8,
		title: 'Level 8: Percabangan Majemuk elif',
		topic: 'elif',
		description: 'Evaluasi banyak kondisi berurutan secara terstruktur dengan rantai if, elif, dan else.',
		concept: 'Multi-kondisi: elif dievaluasi berurutan dan berhenti saat syarat pertama terpenuhi.',
		difficulty: 'hard',
		questionIds: ['lvl8-q1', 'lvl8-q2', 'lvl8-q3', 'lvl8-q4', 'lvl8-q5'],
		xpReward: 50
	},
	{
		id: 9,
		title: 'Level 9: Perulangan for & range()',
		topic: 'for loop & range()',
		description: 'Otomatisasi aksi berulang dengan for loop dan generator urutan angka range().',
		concept: 'Iterasi Terhitung: for loop mengulangi blok kode sesuai jumlah elemen dalam urutan.',
		difficulty: 'challenge',
		questionIds: ['lvl9-q1', 'lvl9-q2', 'lvl9-q3', 'lvl9-q4', 'lvl9-q5'],
		xpReward: 60
	},
	{
		id: 10,
		title: 'Level 10: Perulangan while & Logika',
		topic: 'while loop & basic logic',
		description: 'Gunakan perulangan berbasis kondisi while loop dan integrasi logika komprehensif.',
		concept: 'Iterasi Kondisional: while terus berjalan selama kondisi True dan berhenti saat False.',
		difficulty: 'challenge',
		questionIds: ['lvl10-q1', 'lvl10-q2', 'lvl10-q3', 'lvl10-q4', 'lvl10-q5'],
		xpReward: 70
	}
];

export function getLearningLevelById(levelId: number): LearningLevel | undefined {
	return learningLevelsData.find((lvl) => lvl.id === levelId);
}
