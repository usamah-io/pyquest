import type { GameLevel } from '../types';

export const levelsData: GameLevel[] = [
	// ==========================================
	// LEVEL 1: Langkah Pertama (Sekuensial)
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
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 4,
				maxMoves: 3,
				xpReward: 20,
				hints: [
					'Perhatikan arah hadap PyBot: robot sudah menghadap langsung ke arah bintang di sebelah kanan.',
					'Hitung jumlah petak kosong di antara posisi PyBot dan Bintang Emas untuk menentukan berapa kali melangkah maju.'
				]
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
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 5,
				maxMoves: 4,
				xpReward: 25,
				hints: [
					'Cek arah hadap PyBot terlebih dahulu apakah perlu berputar atau cukup melangkah lurus.',
					'Hitung jarak petak lurus melintasi jembatan tanpa berbelok ke arah air di sisi atas dan bawah.'
				]
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
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 6,
				maxMoves: 5,
				xpReward: 30,
				hints: [
					'PyBot berada di koridor lurus. Perhatikan apakah ada rintangan di hadapannya sebelum melangkah.',
					'Langkah maju secara berurutan akan membawa PyBot menyeberang koridor menuju target di ujung.'
				]
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
						{ x: 0, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 1 },
						{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 3, y: 2 }
					],
					coins: [{ x: 2, y: 1 }]
				},
				availableBlocks: ['MOVE', 'TURN_RIGHT', 'TURN_LEFT'],
				maxBlocks: 5,
				maxMoves: 4,
				xpReward: 25,
				hints: [
					'Saat PyBot berada di persimpangan, bayangkan arah hadap robot dari sudut pandangnya sendiri.',
					'Setelah melangkah maju, robot harus memutar 90 derajat searah jarum jam untuk menghadap koridor bawah.'
				]
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
				maxBlocks: 6,
				maxMoves: 5,
				xpReward: 30,
				hints: [
					'Perhatikan bentuk jalur L: tentukan berapa petak harus maju sebelum mencapai titik belokan.',
					'Putar robot berlawanan arah jarum jam untuk mengarahkannya ke bintang di sebelah atas.'
				]
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
				maxBlocks: 7,
				maxMoves: 6,
				xpReward: 35,
				hints: [
					'Pecah rute ini menjadi dua tikungan berurutan: tikungan pertama menuju ke bawah, lalu luruskan kembali.',
					'Pastikan arah hadap PyBot sejajar dengan lorong sebelum mengeksekusi langkah maju berikutnya.'
				]
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
				hints: [
					'Amati posisi batu penghalang: jalan lurus terhalang, cari jalur samping yang terbuka.',
					'Gunakan belokan untuk memutari batu dari jalur bawah, lalu belok kembali menuju tujuan.'
				]
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
				maxBlocks: 8,
				maxMoves: 7,
				xpReward: 40,
				hints: [
					'Jalur berbentuk huruf U membutuhkan perubahan arah bertahap mengikuti lekukan lorong.',
					'Hindari dinding lorong dengan berbelok tepat saat berada di petak persimpangan.'
				]
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
				maxBlocks: 7,
				maxMoves: 6,
				xpReward: 40,
				hints: [
					'Periksa kedua cabang jalan di depan: salah satu cabang ditutup oleh batu rintangan.',
					'Arahkan PyBot ke cabang yang bebas rintangan menuju posisi target.'
				]
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
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 4,
				maxMoves: 5,
				xpReward: 40,
				hints: [
					'Alih-alih menyusun banyak balok yang sama, cari aksi identik yang dilakukan berulang kali.',
					'Balok perulangan (REPEAT) dapat mengulang aksi di dalamnya sesuai jumlah langkah yang dibutuhkan.'
				]
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
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 4,
				maxMoves: 6,
				xpReward: 45,
				hints: [
					'Koridor ini cukup panjang. Tentukan berapa kali PyBot harus melangkah maju lurus.',
					'Manfaatkan balok REPEAT agar kode lebih ringkas dan mematuhi batasan balok maksimal.'
				]
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
				availableBlocks: ['MOVE', 'TURN_RIGHT', 'TURN_LEFT', 'REPEAT'],
				maxBlocks: 5,
				maxMoves: 6,
				xpReward: 45,
				hints: [
					'Perhatikan urutan aksi: ada aksi persiapan belok sebelum PyBot memasuki lorong panjang.',
					'Selesaikan belokan terlebih dahulu, lalu manfaatkan loop untuk melintasi lorong vertikal.'
				]
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
				hints: [
					'Setiap anak tangga memiliki pola pergerakan identik: melangkah, berputar, melangkah, lalu kembali ke arah semula.',
					'Temukan satu siklus anak tangga utuh, lalu masukkan ke dalam blok perulangan.'
				]
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
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT'],
				maxBlocks: 8,
				maxMoves: 8,
				xpReward: 50,
				hints: [
					'Perhatikan lekukan sungai: robot harus berganti arah hadap secara teratur di setiap persimpangan.',
					'Pastikan kamu tidak melangkah maju saat robot masih menghadap dinding sungai.'
				]
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
				hints: [
					'Tiga anak tangga berarti pola gerakan tangga yang sama dilakukan berulang tiga kali.',
					'Susun satu siklus tangga yang tepat di dalam blok REPEAT untuk menghemat kuota balok.'
				]
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
						{ x: 1, y: 1 }, { x: 1, y: 3 }
					],
					coins: [{ x: 2, y: 3 }, { x: 3, y: 3 }]
				},
				availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
				maxBlocks: 7,
				maxMoves: 7,
				xpReward: 55,
				hints: [
					'Analisis rute atas dan bawah: perhatikan cabang mana yang terhalang batu.',
					'Arahkan PyBot ke lorong terbuka di bawah agar terhindar dari jalan buntu.'
				]
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
				hints: [
					'Kurva ganda membutuhkan ketelitian arah hadap: belok pertama mengubah arah ke bawah, belok berikutnya meluruskan kembali.',
					'Jangan melangkah maju sebelum memastikan robot menghadap ke celah terbuka.'
				]
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
				hints: [
					'Dinding tengah tidak dapat ditembus secara langsung; telusuri tepi luar untuk mencari celah masuk.',
					'Gunakan perulangan jika ada jalur lurus panjang di sepanjang dinding pembatas.'
				]
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
				hints: [
					'Jalur mengelilingi pulau terdiri dari dua segmen lurus panjang yang dihubungkan satu belokan.',
					'Gunakan blok perulangan pada masing-masing segmen lurus untuk mematuhi batas maksimal balok.'
				]
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
				hints: [
					'Gerakan spiral menyusut ke dalam membutuhkan langkah yang terukur di setiap sudut dinding.',
					'Cek koordinat target di bagian dalam: masuklah melalui jalur lingkar terluar terlebih dahulu.'
				]
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
				hints: [
					'Untuk berbalik arah ke lorong sebelah, PyBot perlu melakukan dua kali belokan yang searah.',
					'Pastikan PyBot melangkah ke lorong sebelah sebelum memutar kembali arah hadapnya.'
				]
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
					coins: [{ x: 3, y: 1 }, { x: 3, y: 4 }]
				},
				availableBlocks: ['REPEAT', 'MOVE', 'TURN_RIGHT', 'TURN_LEFT'],
				maxBlocks: 6,
				maxMoves: 10,
				xpReward: 75,
				hints: [
					'Keliling persegi memiliki pola sisi yang simetris: melangkah sepanjang sisi lalu membelokkan arah.',
					'Ulangi siklus satu sisi tersebut beberapa kali hingga robot tiba di sisi target.'
				]
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
				hints: [
					'Perhatikan posisi kedua lorong: setelah membersihkan lorong pertama, ubah jalur menuju lorong kedua.',
					'Pola pergerakan di lorong kedua menyerupai lorong pertama, temukan keteraturan gerakannya.'
				]
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
				hints: [
					'Dinding vertikal memisahkan kolom; naiklah ke baris yang bebas rintangan untuk berpindah kolom.',
					'Setelah melewati dinding pembatas, turunkan kembali posisi PyBot ke jalur target.'
				]
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
				hints: [
					'Lintasan W terdiri dari dua puncak: naik melewati rintangan pertama, lalu ulangi manuver untuk rintangan kedua.',
					'Pecah manuver melewati satu rintangan menjadi sub-langkah: naik, melangkah, lalu turun.'
				]
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
				hints: [
					'Benteng atas terlalu rapat untuk ditembus; carilah koridor terbuka di bagian bawah.',
					'Gunakan belokan awal untuk mengarahkan PyBot ke jalur bawah yang lapang menuju target.'
				]
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
				hints: [
					'Target berada di ruang dalam labirin; hindari dinding tebal dengan memutar dari sisi terluar.',
					'Perhitungkan setiap belokan agar PyBot tidak terjebak di lorong sempit tanpa jalan keluar.'
				]
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
				hints: [
					'Gerbang istana memiliki rintangan simetris di sisi kiri dan kanan lorong.',
					'Cari pola langkah zigzag yang dapat diulang untuk melewati setiap sekat gerbang.'
				]
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
				hints: [
					'Bintang berada di tengah mahkota; temukan jalur melingkar dari sisi atas untuk masuk ke dalamnya.',
					'Kombinasikan gerakan lurus teratur dengan belokan tepat di setiap sudut mahkota.'
				]
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
				hints: [
					'Untuk menyapu seluruh koin di sekeliling arena, buat PyBot berpatroli memutari 4 sudut perimeter.',
					'Setiap sisi arena memiliki panjang langkah yang serupa sebelum melakukan rotasi 90 derajat.'
				]
			}
		]
	}
];
