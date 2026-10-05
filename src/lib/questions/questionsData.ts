import type { Question } from '../types';

export const questionsData: Question[] = [
	{
		id: 'q-var-1',
		topic: 'Variabel',
		type: 'multiple-choice',
		question: 'Bagaimana cara yang benar untuk menyimpan angka 5 ke dalam variabel bernama "langkah" di Python?',
		codeSnippet: '# Pilihan mana sintaks assignment yang tepat?',
		options: [
			{ id: 'opt-var-a', text: 'langkah = 5' },
			{ id: 'opt-var-b', text: '5 = langkah' },
			{ id: 'opt-var-c', text: 'var langkah : 5' },
			{ id: 'opt-var-d', text: 'langkah == 5' }
		],
		correctAnswerId: 'opt-var-a',
		explanation: 'Di Python, nama variabel ditulis di sisi kiri dan nilainya di sebelah kanan tanda sama dengan tunggal (=). Tanda == dipakai untuk membandingkan kesamaan, bukan menetapkan nilai variabel.',
		hints: [
			'Nama penampung (variabel) selalu berada di sebelah kiri.',
			'Gunakan tanda sama dengan tunggal (=) untuk assignment.'
		],
		difficulty: 1
	},
	{
		id: 'q-print-2',
		topic: 'Fungsi Print & String',
		type: 'multiple-choice',
		question: 'Apa hasil yang terjadi saat komputer menjalankan perintah print("Maju!") di Python?',
		codeSnippet: 'print("Maju!")',
		options: [
			{ id: 'opt-prt-a', text: 'Menampilkan teks "Maju!" ke layar terminal' },
			{ id: 'opt-prt-b', text: 'Membuat karakter robot melompat' },
			{ id: 'opt-prt-c', text: 'Menghapus kode yang tersimpan' },
			{ id: 'opt-prt-d', text: 'Mengulang langkah program' }
		],
		correctAnswerId: 'opt-prt-a',
		explanation: 'Fungsi print() berguna untuk menampilkan keluaran pesan atau nilai ke layar konsol. Teks di dalam tanda kutip disebut string.',
		hints: [
			'Print dalam istilah pemrograman berarti mencetak keluaran ke layar.',
			'Perintah print() tidak mengendalikan gerakan fisik, melainkan menyajikan teks.'
		],
		difficulty: 1
	},
	{
		id: 'q-loop-3',
		topic: 'Perulangan (Loop)',
		type: 'predict-output',
		question: 'Jika ingin menjalankan robot.maju() sebanyak 3 kali secara otomatis, penulisan Python mana yang benar?',
		codeSnippet: 'for i in range(3):\n    robot.maju()',
		options: [
			{ id: 'opt-loop-a', text: 'for i in range(3): robot.maju() (Mengulang blok 3 kali)' },
			{ id: 'opt-loop-b', text: 'robot.maju() * 3 (Bukan sintaks pemanggilan berulang)' },
			{ id: 'opt-loop-c', text: 'repeat 3: robot.maju() (Bukan sintaks bawaan Python)' },
			{ id: 'opt-loop-d', text: 'while robot == 3 (Kondisi logika tidak cocok)' }
		],
		correctAnswerId: 'opt-loop-a',
		explanation: 'Sintaks for i in range(3): adalah cara standar Python untuk mengulangi baris perintah berindentasi di bawahnya sebanyak 3 kali tanpa duplikasi kode manual.',
		hints: [
			'Fungsi range(3) menghasilkan urutan hitungan 3 kali.',
			'Ini setara dengan balok visual ULANGI 3 KALI.'
		],
		difficulty: 2
	}
];

/**
 * Fisher-Yates array shuffle that returns a new randomized array.
 */
export function shuffleArray<T>(array: T[]): T[] {
	const copy = [...array];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}
