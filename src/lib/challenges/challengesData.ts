import type { Challenge } from '../types';

export const challengesData: Challenge[] = [
	{
		id: 'ch-1',
		title: 'Langkah Pertama Python Bot',
		topic: 'Instruksi Berurutan (Sequencing)',
		objective: 'Bimbing PyBot berjalan 2 langkah lurus ke depan untuk mengambil Bintang Emas!',
		pythonContext: '# Kode Python yang setara:\npybot.move()\npybot.move()',
		grid: {
			cols: 5,
			rows: 5,
			startPos: { x: 1, y: 2 },
			startDirection: 'RIGHT',
			targetPos: { x: 3, y: 2 },
			obstacles: [
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 3, y: 1 },
				{ x: 1, y: 3 },
				{ x: 2, y: 3 },
				{ x: 3, y: 3 }
			],
			coins: [{ x: 2, y: 2 }]
		},
		availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
		maxBlocks: 4,
		xpReward: 30,
		hints: [
			'PyBot sedang menghadap ke Kanan.',
			'Target bintang berada tepat 2 petak di depan PyBot.',
			'Tambahkan 2 balok MAJU (MOVE) ke dalam kode area!'
		]
	},
	{
		id: 'ch-2',
		title: 'Belokan Tajam',
		topic: 'Navigasi & Rotasi Arah',
		objective: 'Maju, belok kanan, lalu maju untuk mencapai Bintang tanpa menabrak batu!',
		pythonContext: '# Kode Python yang setara:\npybot.move()\npybot.turn_right()\npybot.move()',
		grid: {
			cols: 5,
			rows: 5,
			startPos: { x: 1, y: 1 },
			startDirection: 'RIGHT',
			targetPos: { x: 2, y: 2 },
			obstacles: [
				{ x: 2, y: 1 }, // Batu di depan setelah langkah 1
				{ x: 0, y: 1 },
				{ x: 1, y: 0 },
				{ x: 3, y: 2 }
			],
			coins: [{ x: 1, y: 2 }]
		},
		availableBlocks: ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'],
		maxBlocks: 5,
		xpReward: 40,
		hints: [
			'Perhatikan ada batu di depan jika kamu maju 2 kali!',
			'Urutan langkah: MOVE → TURN_RIGHT → MOVE.',
			'Ingat, TURN_RIGHT hanya memutar hadap PyBot, belum melangkah maju.'
		]
	},
	{
		id: 'ch-3',
		title: 'Kekuatan Looping (for i in range)',
		topic: 'Perulangan Bersarang & Loop',
		objective: 'Gunakan balok REPEAT untuk melangkah 3 kali dengan ringkas dan cepat!',
		pythonContext: '# Kode Python yang setara:\nfor i in range(3):\n    pybot.move()',
		grid: {
			cols: 6,
			rows: 5,
			startPos: { x: 1, y: 2 },
			startDirection: 'RIGHT',
			targetPos: { x: 4, y: 2 },
			obstacles: [
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 3, y: 1 },
				{ x: 4, y: 1 },
				{ x: 1, y: 3 },
				{ x: 2, y: 3 },
				{ x: 3, y: 3 },
				{ x: 4, y: 3 }
			],
			coins: [{ x: 2, y: 2 }, { x: 3, y: 2 }]
		},
		availableBlocks: ['MOVE', 'REPEAT', 'TURN_LEFT', 'TURN_RIGHT'],
		maxBlocks: 4,
		xpReward: 50,
		hints: [
			'Daripada menaruh 3 balok MOVE, gunakan REPEAT (3x)!',
			'Di Python, ini identik dengan loop `for step in range(3):`.'
		]
	}
];
