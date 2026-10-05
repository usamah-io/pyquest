import type { GameLevel } from '../types';

export const levelsData: GameLevel[] = [
	// ==========================================
	// LEVEL 1: Langkah Pertama (Hanya MAJU)
	// ==========================================
	{
		id: 1,
		title: 'Level 1: Langkah Lurus',
		description: 'Pahami cara menggerakkan PyBot maju lurus di jalur sederhana.',
		concept: 'Sekuensial: Instruksi dieksekusi secara berurutan baris demi baris.',
		difficulty: 1,
		challenges: [
			{
				id: 'lvl1-ch1',
				title: 'Langkah Pertama',
				objective: 'Gerakkan PyBot 2 langkah ke depan menuju Bintang Emas.',
				pythonContext: 'pybot.move()\npybot.move()',
				grid: {
					cols: 5,
					rows: 5,
					startPos: { x: 1, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 2 },
					obstacles: [
						{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
						{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }
					],
					coins: [{ x: 2, y: 2 }]
				},
				availableBlocks: ['MOVE'],
				maxBlocks: 3,
				maxMoves: 3,
				xpReward: 20,
				hints: ['PyBot menghadap ke kanan.', 'Jarak ke bintang tepat 2 langkah maju.']
			},
			{
				id: 'lvl1-ch2',
				title: 'Tiga Langkah Pasti',
				objective: 'Maju lurus 3 langkah melewati jembatan sempit.',
				pythonContext: 'pybot.move()\npybot.move()\npybot.move()',
				grid: {
					cols: 6,
					rows: 5,
					startPos: { x: 1, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 2 },
					obstacles: [
						{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
						{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }
					],
					coins: [{ x: 2, y: 2 }, { x: 3, y: 2 }]
				},
				availableBlocks: ['MOVE'],
				maxBlocks: 4,
				maxMoves: 4,
				xpReward: 25,
				hints: ['Susun 3 balok MAJU.', 'Bintang berada di koordinat (4, 2).']
			},
			{
				id: 'lvl1-ch3',
				title: 'Menyeberang Koridor',
				objective: 'Langkah maju 4 petak lurus tanpa ragu.',
				pythonContext: 'for step in range(4):\n    pybot.move()',
				grid: {
					cols: 6,
					rows: 5,
					startPos: { x: 0, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 2 },
					obstacles: [
						{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
						{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }
					],
					coins: [{ x: 1, y: 2 }, { x: 3, y: 2 }]
				},
				availableBlocks: ['MOVE'],
				maxBlocks: 5,
				maxMoves: 5,
				xpReward: 30,
				hints: ['Ada 4 petak kosong di depan PyBot.', 'Gunakan 4 balok MAJU.']
			}
		]
	},

	// ==========================================
	// LEVEL 2: Belokan Pertama (MOVE + TURN)
	// ==========================================
	{
		id: 2,
		title: 'Level 2: Belokan Pertama',
		description: 'Pelajari rotasi arah hadap robot menggunakan BELOK KANAN dan KIRI.',
		concept: 'Rotasi Arah: Memutar arah hadap tanpa berpindah koordinat.',
		difficulty: 1,
		challenges: [
			{
				id: 'lvl2-ch1',
				title: 'Tikungan Kanan Sederhana',
				objective: 'Maju 1 langkah, belok kanan, lalu maju 1 langkah menuju bintang.',
				pythonContext: 'pybot.move()\npybot.turn_right()\npybot.move()',
				grid: {
					cols: 5,
					rows: 5,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 2, y: 2 },
					obstacles: [
						{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
						{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 3, y: 2 }
					],
					coins: [{ x: 2, y: 1 }]
				},
				availableBlocks: ['MOVE', 'TURN_RIGHT', 'TURN_LEFT'],
				maxBlocks: 4,
				maxMoves: 4,
				xpReward: 25,
				hints: ['Maju 1 petak ke (2,1).', 'Gunakan BELOK KANAN untuk menghadap ke bawah, lalu MAJU.']
			},
			{
				id: 'lvl2-ch2',
				title: 'Tikungan Kiri L-Shape',
				objective: 'Maju 2 langkah, belok kiri, lalu maju 1 langkah.',
				pythonContext: 'pybot.move()\npybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 5,
					rows: 5,
					startPos: { x: 1, y: 3 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 2 },
					obstacles: [
						{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 },
						{ x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }
					],
					coins: [{ x: 3, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 5,
				maxMoves: 5,
				xpReward: 30,
				hints: ['Maju 2 petak dulu.', 'Belok kiri agar menghadap ke atas, lalu melangkah ke bintang.']
			},
			{
				id: 'lvl2-ch3',
				title: 'Dua Belokan Beruntun',
				objective: 'Navigasi jalur melingkar dengan 2 belokan teratur.',
				pythonContext: 'pybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 5,
					rows: 5,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 2 },
					obstacles: [
						{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 1 },
						{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }
					],
					coins: [{ x: 2, y: 2 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 6,
				maxMoves: 6,
				xpReward: 35,
				hints: ['Maju ke (2,1) -> Belok Kanan -> Maju ke (2,2) -> Belok Kiri -> Maju ke (3,2).']
			}
		]
	},

	// ==========================================
	// LEVEL 3: Menghindari Rintangan Sederhana
	// ==========================================
	{
		id: 3,
		title: 'Level 3: Labirin Rintangan',
		description: 'Pilih jalur alternatif untuk menghindari rintangan batu yang menghalangi jalan.',
		concept: 'Pencegahan Tabrakan: Mengecek rintangan sebelum melangkah.',
		difficulty: 2,
		challenges: [
			{
				id: 'lvl3-ch1',
				title: 'Batu di Tengah Jalan',
				objective: 'Memutar ke samping untuk melewati batu besar di tengah lorong.',
				pythonContext: 'pybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()\npybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 5,
					rows: 5,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 1 },
					obstacles: [
						{ x: 2, y: 1 }, // Batu penghalang utama
						{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
						{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }
					],
					coins: [{ x: 2, y: 2 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 8,
				maxMoves: 8,
				xpReward: 35,
				hints: ['Ada batu di petak (2,1)!', 'Belok ke kanan (turun) ke baris y=2, lalu maju dan kembali naik.']
			},
			{
				id: 'lvl3-ch2',
				title: 'Lembah U-Turn',
				objective: 'Masuk lorong sempit berbentuk huruf U dan ambil bintang.',
				pythonContext: 'pybot.move()\npybot.turn_right()\npybot.move()\npybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 5,
					rows: 5,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 3 },
					obstacles: [
						{ x: 2, y: 1 }, { x: 2, y: 2 },
						{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }
					],
					coins: [{ x: 2, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 7,
				maxMoves: 7,
				xpReward: 40,
				hints: ['Maju 1 langkah, belok kanan menuruni lorong, belok kiri untuk mencapai bintang.']
			},
			{
				id: 'lvl3-ch3',
				title: 'Pilihan Dua Jalur',
				objective: 'Pilih jalur terbuka yang tidak terhalang rintangan ganda.',
				pythonContext: 'pybot.turn_left()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.move()',
				grid: {
					cols: 5,
					rows: 5,
					startPos: { x: 1, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 1 },
					obstacles: [
						{ x: 2, y: 2 }, { x: 3, y: 2 }, // Jalur bawah tertutup
						{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }
					],
					coins: [{ x: 2, y: 1 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 6,
				maxMoves: 6,
				xpReward: 40,
				hints: ['Jalur lurus terblokir batu.', 'Belok kiri naik ke atas (y=1) lalu maju lurus.']
			}
		]
	},

	// ==========================================
	// LEVEL 4: Pengenalan REPEAT (Perulangan)
	// ==========================================
	{
		id: 4,
		title: 'Level 4: Kekuatan Looping',
		description: 'Gunakan balok REPEAT untuk mengeksekusi aksi berulang dengan ringkas.',
		concept: 'Looping: for i in range(n) mempersingkat kode yang berulang.',
		difficulty: 2,
		challenges: [
			{
				id: 'lvl4-ch1',
				title: 'Lari Cepat 4 Petak',
				objective: 'Gunakan REPEAT 4x untuk melangkah lurus di koridor panjang.',
				pythonContext: 'for i in range(4):\n    pybot.move()',
				grid: {
					cols: 6,
					rows: 5,
					startPos: { x: 0, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 2 },
					obstacles: [
						{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
						{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }
					],
					coins: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }]
				},
				availableBlocks: ['REPEAT', 'MOVE'],
				maxBlocks: 2,
				maxMoves: 5,
				xpReward: 40,
				hints: ['Gunakan balok REPEAT dengan angka 4.', 'Di dalam balok REPEAT, masukkan 1 balok MAJU.']
			},
			{
				id: 'lvl4-ch2',
				title: 'Maju Panjang Menuju Target',
				objective: 'Ulangi langkah maju 5 petak berturut-turut.',
				pythonContext: 'for step in range(5):\n    pybot.move()',
				grid: {
					cols: 7,
					rows: 5,
					startPos: { x: 0, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 5, y: 2 },
					obstacles: [
						{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
						{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }
					],
					coins: [{ x: 2, y: 2 }, { x: 4, y: 2 }]
				},
				availableBlocks: ['REPEAT', 'MOVE'],
				maxBlocks: 2,
				maxMoves: 6,
				xpReward: 45,
				hints: ['Masukkan 1 balok MAJU ke dalam REPEAT dan atur ke angka 5.']
			},
			{
				id: 'lvl4-ch3',
				title: 'Maju, Belok, Lalu Loop',
				objective: 'Maju 1 petak, belok kanan, lalu ulangi maju 3 kali.',
				pythonContext: 'pybot.move()\npybot.turn_right()\nfor i in range(3):\n    pybot.move()',
				grid: {
					cols: 5,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 2, y: 4 },
					obstacles: [
						{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 1 },
						{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 },
						{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }
					],
					coins: [{ x: 2, y: 2 }, { x: 2, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 4,
				maxMoves: 6,
				xpReward: 45,
				hints: ['Maju 1 langkah, belok kanan, lalu pasang REPEAT 3x dengan balok MAJU.']
			}
		]
	},

	// ==========================================
	// LEVEL 5: Pola Berulang (Pattern Looping)
	// ==========================================
	{
		id: 5,
		title: 'Level 5: Pola Tangga & Zig-zag',
		description: 'Kombinasikan belokan dan langkah yang berulang membentuk pola geometris.',
		concept: 'Pola Algoritmik: Mengidentifikasi bagian langkah yang berulang teratur.',
		difficulty: 3,
		challenges: [
			{
				id: 'lvl5-ch1',
				title: 'Anak Tangga Pertama',
				objective: 'Naik 2 anak tangga dengan pola: Maju -> Belok Kiri -> Maju -> Belok Kanan.',
				pythonContext: 'for step in range(2):\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 4 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 2 },
					obstacles: [
						{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 4 },
						{ x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }
					],
					coins: [{ x: 2, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 6,
				maxMoves: 9,
				xpReward: 50,
				hints: ['Pola tangga: [Maju, Belok Kiri, Maju, Belok Kanan].', 'Jalankan 2 putaran.']
			},
			{
				id: 'lvl5-ch2',
				title: 'Pola Zig-Zag Sungai',
				objective: 'Lintasi sungai dengan berbelok kanan dan kiri secara bergantian.',
				pythonContext: 'pybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()\npybot.turn_right()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 3 },
					obstacles: [
						{ x: 2, y: 1 }, { x: 1, y: 2 },
						{ x: 3, y: 2 }, { x: 2, y: 3 },
						{ x: 4, y: 3 }
					],
					coins: [{ x: 2, y: 2 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 8,
				maxMoves: 8,
				xpReward: 50,
				hints: ['Perhatikan posisi batu penghalang di kedua sisi sungai.']
			},
			{
				id: 'lvl5-ch3',
				title: 'Tiga Tangga Beruntun',
				objective: 'Ulangi pola tangga 3 kali untuk mencapai puncak bukit.',
				pythonContext: 'for i in range(3):\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 4 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 1 },
					obstacles: [
						{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 4 },
						{ x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 },
						{ x: 3, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }
					],
					coins: [{ x: 2, y: 3 }, { x: 3, y: 2 }]
				},
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 7,
				maxMoves: 14,
				xpReward: 55,
				hints: ['Gunakan REPEAT 3 kali dengan rangkaian instruksi tangga di dalamnya.']
			}
		]
	},

	// ==========================================
	// LEVEL 6: Lorong Ujung Ganda (Forked Path)
	// ==========================================
	{
		id: 6,
		title: 'Level 6: Jalur Bercabang',
		description: 'Analisis percabangan jalan dan pilih rute teraman menuju tujuan.',
		concept: 'Pengambilan Keputusan: Menentukan lintasan yang tidak berujung buntu.',
		difficulty: 3,
		challenges: [
			{
				id: 'lvl6-ch1',
				title: 'Simpang Dua Jalan',
				objective: 'Cabang atas buntu oleh batu. Pilih cabang bawah yang aman.',
				pythonContext: 'pybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()\npybot.move()',
				grid: {
					cols: 6,
					rows: 5,
					startPos: { x: 1, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 3 },
					obstacles: [
						{ x: 3, y: 1 }, { x: 4, y: 1 }, // Cabang atas buntu
						{ x: 2, y: 2 },
						{ x: 1, y: 1 }, { x: 1, y: 3 }
					],
					coins: [{ x: 2, y: 3 }, { x: 3, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 7,
				maxMoves: 7,
				xpReward: 55,
				hints: ['Jangan ke cabang atas karena ada 2 batu penghalang.', 'Turun ke bawah lalu lurus.']
			},
			{
				id: 'lvl6-ch2',
				title: 'Lorong S-Curve',
				objective: 'Melintasi kurva ganda yang menyerupai huruf S.',
				pythonContext: 'pybot.move()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 2, y: 4 },
					obstacles: [
						{ x: 1, y: 2 }, { x: 2, y: 2 },
						{ x: 3, y: 3 }, { x: 4, y: 3 },
						{ x: 1, y: 0 }, { x: 4, y: 1 }
					],
					coins: [{ x: 3, y: 2 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 9,
				maxMoves: 9,
				xpReward: 60,
				hints: ['Maju 2 petak, belok kanan, maju, putar balik ke kiri melewati celah.']
			},
			{
				id: 'lvl6-ch3',
				title: 'Labirin Kotak Dalam',
				objective: 'Memutari dinding perimeter untuk masuk ke ruang tengah.',
				pythonContext: 'pybot.move()\npybot.turn_right()\nfor i in range(3):\n    pybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 3 },
					obstacles: [
						{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
						{ x: 2, y: 3 }, { x: 2, y: 4 }
					],
					coins: [{ x: 4, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 7,
				maxMoves: 9,
				xpReward: 60,
				hints: ['Pintu masuk berada di sisi kanan (x=4). Masuki dari sana.']
			}
		]
	},

	// ==========================================
	// LEVEL 7: Perencanaan Lintasan Panjang
	// ==========================================
	{
		id: 7,
		title: 'Level 7: Lintasan Strategis',
		description: 'Susun instruksi lebih dari 10 langkah dengan efisiensi balok yang tinggi.',
		concept: 'Optimasi Rute: Merencanakan urutan aksi terpendek tanpa pemborosan balok.',
		difficulty: 4,
		challenges: [
			{
				id: 'lvl7-ch1',
				title: 'Perjalanan Keliling Pulau',
				objective: 'Kelilingi pulau batu tengah untuk meraih bintang di seberang.',
				pythonContext: 'for i in range(3):\n    pybot.move()\npybot.turn_right()\nfor i in range(3):\n    pybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 4 },
					obstacles: [
						{ x: 2, y: 2 }, { x: 3, y: 2 },
						{ x: 2, y: 3 }, { x: 3, y: 3 }
					],
					coins: [{ x: 4, y: 1 }, { x: 4, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_RIGHT', 'TURN_LEFT', 'REPEAT'],
				maxBlocks: 6,
				maxMoves: 8,
				xpReward: 65,
				hints: ['Gunakan balok REPEAT untuk menghemat susunan balok maju 3 petak.']
			},
			{
				id: 'lvl7-ch2',
				title: 'Labirin Berputar Spiral',
				objective: 'Ikuti jalur spiral searah jarum jam menuju titik tengah arena.',
				pythonContext: 'for step in range(3):\n    pybot.move()\npybot.turn_right()\npybot.move()\npybot.move()\npybot.turn_right()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 2 },
					obstacles: [
						{ x: 1, y: 2 }, { x: 2, y: 2 },
						{ x: 1, y: 3 }, { x: 4, y: 2 },
						{ x: 2, y: 4 }, { x: 3, y: 4 }
					],
					coins: [{ x: 4, y: 1 }, { x: 4, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 8,
				maxMoves: 10,
				xpReward: 70,
				hints: ['Maju di batas atas, belok kanan di pojok, lalu masuk ke dalam.']
			},
			{
				id: 'lvl7-ch3',
				title: 'Tiga Lorong Paralel',
				objective: 'Pindah antar-lorong paralel dengan belokan tajam 180 derajat.',
				pythonContext: 'pybot.move()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 2 },
					startDirection: 'RIGHT',
					targetPos: { x: 1, y: 3 },
					obstacles: [
						{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
						{ x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }
					],
					coins: [{ x: 3, y: 2 }, { x: 3, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 9,
				maxMoves: 9,
				xpReward: 70,
				hints: ['Maju sampai ujung (x=3), turun 1 petak, putar haluan kembali ke kiri.']
			}
		]
	},

	// ==========================================
	// LEVEL 8: Pengulangan Blok Kompleks
	// ==========================================
	{
		id: 8,
		title: 'Level 8: Algoritma Siklus',
		description: 'Kombinasikan loop dengan beberapa sub-instruksi di dalamnya.',
		concept: 'Iterasi Majemuk: Mengulangi kumpulan instruksi majemuk dalam 1 loop.',
		difficulty: 4,
		challenges: [
			{
				id: 'lvl8-ch1',
				title: 'Putaran Empat Penjuru',
				objective: 'Gunakan perulangan untuk menyusuri 3 sisi persegi pembatas.',
				pythonContext: 'for side in range(3):\n    pybot.move()\n    pybot.move()\n    pybot.turn_right()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 1, y: 3 },
					obstacles: [
						{ x: 2, y: 2 }, { x: 3, y: 2 },
						{ x: 2, y: 3 }, { x: 3, y: 3 }
					],
					coins: [{ x: 3, y: 1 }, { x: 3, y: 3 }]
				},
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_RIGHT', 'TURN_LEFT'],
				maxBlocks: 6,
				maxMoves: 10,
				xpReward: 75,
				hints: ['Setiap sisi adalah: 2x Maju + 1x Belok Kanan.', 'Ulangi 3 kali.']
			},
			{
				id: 'lvl8-ch2',
				title: 'Pembersih Koridor Ganda',
				objective: 'Kumpulkan semua koin di kedua lorong dengan pola simetris.',
				pythonContext: 'for i in range(2):\n    pybot.move()\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_left()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 3 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 2 },
					obstacles: [
						{ x: 2, y: 1 }, { x: 4, y: 1 },
						{ x: 2, y: 4 }, { x: 4, y: 4 }
					],
					coins: [{ x: 3, y: 3 }, { x: 2, y: 2 }]
				},
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 7,
				maxMoves: 10,
				xpReward: 80,
				hints: ['Amati simetri perpindahan antara baris y=3 dan baris y=2.']
			},
			{
				id: 'lvl8-ch3',
				title: 'Lompatan Tiga Kolom',
				objective: 'Pindah kolom demi kolom melewati dinding vertikal.',
				pythonContext: 'for col in range(2):\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 3 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 3 },
					obstacles: [
						{ x: 2, y: 3 }, // Dinding pembatas di tengah
						{ x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }
					],
					coins: [{ x: 2, y: 2 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 9,
				maxMoves: 12,
				xpReward: 80,
				hints: ['Naik ke atas (y=2) untuk melompati rintangan pada x=2.']
			}
		]
	},

	// ==========================================
	// LEVEL 9: Labirin Berliku (Advanced Maze)
	// ==========================================
	{
		id: 9,
		title: 'Level 9: Penjelajah Ulung',
		description: 'Pecahkan teka-teki labirin dengan kombinasi multi-belokan dan rintangan rapat.',
		concept: 'Struktur Kontrol Kompleks: Gabungan rangkaian panjang dengan evaluasi posisi.',
		difficulty: 5,
		challenges: [
			{
				id: 'lvl9-ch1',
				title: 'Labirin Huruf W',
				objective: 'Navigasi lintasan zig-zag ganda menyerupai huruf W.',
				pythonContext: 'for i in range(2):\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 3 },
					startDirection: 'RIGHT',
					targetPos: { x: 5, y: 3 },
					obstacles: [
						{ x: 2, y: 3 }, { x: 4, y: 3 },
						{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }
					],
					coins: [{ x: 2, y: 2 }, { x: 4, y: 2 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 10,
				maxMoves: 15,
				xpReward: 85,
				hints: ['Ada dua bukit yang harus dilewati: naik, lewat atas, turun, ulangi.']
			},
			{
				id: 'lvl9-ch2',
				title: 'Benteng Berduri',
				objective: 'Cari celah sempit di antara deretan rintangan pelindung bintang.',
				pythonContext: 'pybot.turn_right()\npybot.move()\npybot.turn_left()\nfor i in range(3):\n    pybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 2 },
					obstacles: [
						{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
						{ x: 2, y: 2 }, { x: 3, y: 2 }
					],
					coins: [{ x: 1, y: 2 }, { x: 3, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 8,
				maxMoves: 9,
				xpReward: 90,
				hints: ['Jalur atas tertutup rapat. Turunlah ke baris y=3 untuk memutar dari bawah.']
			},
			{
				id: 'lvl9-ch3',
				title: 'Labirin Labah-Labah',
				objective: 'Selesaikan rute melingkar dengan batasan langkah yang efisien.',
				pythonContext: 'for step in range(3):\n    pybot.move()\n    pybot.turn_right()\npybot.move()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 2, y: 3 },
					obstacles: [
						{ x: 2, y: 2 }, { x: 3, y: 2 },
						{ x: 1, y: 2 }, { x: 3, y: 3 }
					],
					coins: [{ x: 4, y: 1 }, { x: 4, y: 4 }]
				},
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_RIGHT', 'TURN_LEFT'],
				maxBlocks: 8,
				maxMoves: 11,
				xpReward: 90,
				hints: ['Kelilingi dinding luar sebelum masuk ke petak target (2,3).']
			}
		]
	},

	// ==========================================
	// LEVEL 10: Tantangan Master Python (Grand Finale)
	// ==========================================
	{
		id: 10,
		title: 'Level 10: Master PyQuest',
		description: 'Puncak ujian logika pemrograman: tantangan terpadu dengan perencanaan algoritma penuh.',
		concept: 'Algoritma Komprehensif: Menggabungkan efisiensi balok, loop, dan navigasi presisi.',
		difficulty: 5,
		challenges: [
			{
				id: 'lvl10-ch1',
				title: 'Gerbang Istana PyBot',
				objective: 'Tembus pertahanan istana dengan kombinasi loop dan belokan presisi.',
				pythonContext: 'for i in range(2):\n    pybot.move()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 0, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 4, y: 3 },
					obstacles: [
						{ x: 1, y: 2 }, { x: 3, y: 2 },
						{ x: 2, y: 0 }, { x: 4, y: 0 },
						{ x: 2, y: 4 }, { x: 4, y: 4 }
					],
					coins: [{ x: 2, y: 1 }, { x: 4, y: 2 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 9,
				maxMoves: 12,
				xpReward: 100,
				hints: ['Gunakan pola zigzag berulang 2x untuk melewati gerbang istana.']
			},
			{
				id: 'lvl10-ch2',
				title: 'Labirin Mahkota Bintang',
				objective: 'Jelajahi labirin simetris untuk mengambil bintang di puncak mahkota.',
				pythonContext: 'for step in range(3):\n    pybot.move()\npybot.turn_left()\nfor step in range(2):\n    pybot.move()\npybot.turn_left()\npybot.move()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 4 },
					startDirection: 'RIGHT',
					targetPos: { x: 3, y: 2 },
					obstacles: [
						{ x: 2, y: 3 }, { x: 3, y: 3 },
						{ x: 1, y: 2 }, { x: 2, y: 2 },
						{ x: 4, y: 2 }, { x: 4, y: 3 }
					],
					coins: [{ x: 3, y: 4 }, { x: 4, y: 1 }]
				},
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 9,
				maxMoves: 12,
				xpReward: 110,
				hints: ['Masuki mahkota dari sisi atas (y=1) lalu belok ke bawah menuju (3,2).']
			},
			{
				id: 'lvl10-ch3',
				title: 'Ujian Terakhir: PyMaster Grand Slam',
				objective: 'Kumpulkan semua koin dan raih Bintang Emas Terakhir dengan kode terbersih!',
				pythonContext: 'for lap in range(4):\n    pybot.move()\n    pybot.move()\n    pybot.turn_right()',
				grid: {
					cols: 6,
					rows: 6,
					startPos: { x: 1, y: 1 },
					startDirection: 'RIGHT',
					targetPos: { x: 1, y: 2 },
					obstacles: [
						{ x: 2, y: 2 }, { x: 3, y: 2 },
						{ x: 2, y: 3 }, { x: 3, y: 3 }
					],
					coins: [{ x: 3, y: 1 }, { x: 4, y: 3 }, { x: 2, y: 4 }]
				},
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_RIGHT', 'TURN_LEFT'],
				maxBlocks: 7,
				maxMoves: 14,
				xpReward: 150,
				hints: ['Rute mengelilingi seluruh arena: 2x maju lalu belok kanan, diulang 4 kali.']
			}
		]
	}
];
