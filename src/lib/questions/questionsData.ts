import type { Question } from '../types';

export const questionsData: Question[] = [
	{
		id: 'q-var-1',
		topic: 'Variables (Variabel)',
		type: 'multiple-choice',
		question: 'Di Python, bagaimana cara yang benar untuk menyimpan angka 5 ke dalam variabel bernama "langkah"?',
		codeSnippet: '# Pilihan mana yang benar?',
		options: [
			{ id: 'opt-a', text: 'langkah = 5' },
			{ id: 'opt-b', text: '5 = langkah' },
			{ id: 'opt-c', text: 'var langkah : 5' },
			{ id: 'opt-d', text: 'langkah == 5' }
		],
		correctAnswerId: 'opt-a',
		explanation: 'Di Python, kita menulis nama variabel di sisi kiri tanda sama dengan (=), lalu nilainya di sebelah kanan: langkah = 5. Tanda == digunakan untuk membandingkan, bukan menyimpan nilai!',
		hints: [
			'Nama variabel selalu berada di sisi kiri tanda sama dengan.',
			'Tanda sama dengan tunggal (=) digunakan untuk assignment (menyimpan nilai).'
		],
		difficulty: 1
	},
	{
		id: 'q-print-2',
		topic: 'Print & Strings (Teks)',
		type: 'multiple-choice',
		question: 'Apa fungsi dari perintah print("Maju!") di Python?',
		codeSnippet: 'print("Maju!")',
		options: [
			{ id: 'opt-a', text: 'Menampilkan tulisan "Maju!" ke layar komputer' },
			{ id: 'opt-b', text: 'Membuat karakter game melompat' },
			{ id: 'opt-c', text: 'Menghapus kode yang sudah ditulis' },
			{ id: 'opt-d', text: 'Mematikan komputer' }
		],
		correctAnswerId: 'opt-a',
		explanation: 'Fungsi print() digunakan untuk mencetak atau menampilkan teks/angka ke layar terminal. Teks di dalam tanda petik disebut String.',
		hints: [
			'Fikirkan arti kata "print" dalam bahasa Indonesia: mencetak.',
			'Perintah print() tidak menggerakkan robot secara fisik, melainkan menampilkan pesan.'
		],
		difficulty: 1
	},
	{
		id: 'q-loop-3',
		topic: 'Loops (Perulangan)',
		type: 'predict-output',
		question: 'Jika robot ingin melangkah maju sebanyak 3 kali, pola Python mana yang paling ringkas?',
		codeSnippet: 'for i in range(3):\n    robot.maju()',
		options: [
			{ id: 'opt-a', text: 'for i in range(3): robot.maju() — Mengulangi maju 3 kali' },
			{ id: 'opt-b', text: 'robot.maju() * 3 — Mengalikan robot' },
			{ id: 'opt-c', text: 'repeat 3 robot — Sintaks bukan Python' },
			{ id: 'opt-d', text: 'robot.berhenti() — Berhenti' }
		],
		correctAnswerId: 'opt-a',
		explanation: 'Perulangan `for i in range(3):` adalah cara standar Python untuk mengulangi sebuah perintah sebanyak 3 kali secara otomatis tanpa menulisnya berulang-ulang!',
		hints: [
			'range(3) menghasilkan 3 kali putaran (0, 1, 2).',
			'Ini sama seperti coding block REPEAT 3!'
		],
		difficulty: 2
	}
];
