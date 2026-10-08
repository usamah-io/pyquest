import type { GameLevel } from '../types';

export const levelsData: GameLevel[] = [
	{
		"id": 1,
		"unitId": 1,
		"unitTitle": "Unit 1: Langkah Dasar & Orientasi",
		"title": "Level 1: Langkah & Belokan",
		"description": "Pahami urutan langkah dan belokan pertama PyBot.",
		"objective": "Belajar urutan perintah dasar.",
		"quickTip": "PyBot menjalankan perintah satu per satu dari atas ke bawah mengikuti urutan balokmu.",
		"concepts": [
			"MAJU",
			"BELOK KANAN"
		],
		"concept": "Sekuensial & Arah: Instruksi langkah dan rotasi dieksekusi berurutan menuju target.",
		"achievement": {
			"id": "ach-lvl-1",
			"levelId": 1,
			"title": "Ahli Langkah",
			"description": "Kuasai urutan langkah dan belokan pertama robot.",
			"icon": "compass",
			"xpReward": 25
		},
		"difficulty": 1,
		"challenges": [
			{
				"id": "lvl1-ch1",
				"title": "Langkah & Belokan Pertama",
				"objective": "Maju 1 langkah, belok kanan di sudut lorong, lalu maju menuju Bintang.",
				"pythonContext": "pybot.move()\npybot.turn_right()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 5,
				"maxMoves": 4,
				"xpReward": 20,
				"hints": [
					"Perhatikan rintangan di depan: jalan lurus terhalang, arahkan robot membelok ke celah terbuka.",
					"Putar arah hadap robot 90 derajat searah jarum jam (belok kanan) setelah melangkah maju agar menghadap ke bawah."
				]
			},
			{
				"id": "lvl1-ch2",
				"title": "Lorong Siku",
				"objective": "Maju 2 langkah menyusuri lorong, belok kanan, lalu maju 1 langkah menuju Bintang.",
				"pythonContext": "pybot.move()\npybot.move()\npybot.turn_right()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 6,
				"maxMoves": 5,
				"xpReward": 25,
				"hints": [
					"Telusuri koridor lurus terlebih dahulu hingga mencapai tikungan sebelum memutar robot.",
					"Gunakan belokan kanan di persimpangan agar robot mengarah lurus ke target."
				]
			},
			{
				"id": "lvl1-ch3",
				"title": "Sudut Zig-Zag",
				"objective": "Navigasi sudut belokan: maju, belok kanan, maju, lalu belok kiri menuju bintang.",
				"pythonContext": "pybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 0
						},
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 7,
				"maxMoves": 6,
				"xpReward": 30,
				"hints": [
					"Perhatikan rute berbelok: robot perlu berputar dua kali untuk menyusuri lorong berbentuk tangga.",
					"Gunakan kombinasi putaran kanan lalu putaran kiri untuk mengarahkan robot kembali sejajar ke bintang."
				]
			}
		]
	},
	{
		"id": 2,
		"unitId": 1,
		"unitTitle": "Unit 1: Langkah Dasar & Orientasi",
		"title": "Level 2: Belok Kiri & Kanan",
		"description": "Kuasai arah hadap PyBot dengan belok kiri dan kanan.",
		"objective": "Belajar belok kiri & kanan.",
		"quickTip": "Perhatikan arah hadap robot sebelum memilih belok kiri atau kanan.",
		"concepts": [
			"BELOK KIRI",
			"BELOK KANAN"
		],
		"concept": "Rotasi Arah: Memutar arah hadap tanpa berpindah koordinat.",
		"achievement": {
			"id": "ach-lvl-2",
			"levelId": 2,
			"title": "Navigator PyBot",
			"description": "Kuasai kontrol arah hadap robot di tikungan lorong.",
			"icon": "corner-up-right",
			"xpReward": 30
		},
		"difficulty": 1,
		"challenges": [
			{
				"id": "lvl2-ch1",
				"title": "Tikungan Kanan Sederhana",
				"objective": "Maju 1 langkah, belok kanan, lalu maju 1 langkah menuju bintang.",
				"pythonContext": "pybot.move()\npybot.turn_right()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 2
					},
					"obstacles": [
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_RIGHT",
					"TURN_LEFT"
				],
				"maxBlocks": 5,
				"maxMoves": 4,
				"xpReward": 25,
				"hints": [
					"Saat PyBot berada di persimpangan, bayangkan arah hadap robot dari sudut pandangnya sendiri.",
					"Setelah melangkah maju, robot harus memutar 90 derajat searah jarum jam untuk menghadap koridor bawah."
				]
			},
			{
				"id": "lvl2-ch2",
				"title": "Tikungan Kiri L-Shape",
				"objective": "Maju 2 langkah, belok kiri, lalu maju 1 langkah.",
				"pythonContext": "pybot.move()\npybot.move()\npybot.turn_left()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 3
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 3,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 6,
				"maxMoves": 5,
				"xpReward": 30,
				"hints": [
					"Perhatikan bentuk jalur L: tentukan berapa petak harus maju sebelum mencapai titik belokan.",
					"Putar robot berlawanan arah jarum jam untuk mengarahkannya ke bintang di sebelah atas."
				]
			},
			{
				"id": "lvl2-ch3",
				"title": "Dua Belokan Beruntun",
				"objective": "Navigasi jalur melingkar dengan 2 belokan teratur.",
				"pythonContext": "pybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 7,
				"maxMoves": 6,
				"xpReward": 35,
				"hints": [
					"Pecah rute ini menjadi dua tikungan berurutan: tikungan pertama menuju ke bawah, lalu luruskan kembali.",
					"Pastikan arah hadap PyBot sejajar dengan lorong sebelum mengeksekusi langkah maju berikutnya."
				]
			}
		]
	},
	{
		"id": 3,
		"unitId": 1,
		"unitTitle": "Unit 1: Langkah Dasar & Orientasi",
		"title": "Level 3: Labirin Rintangan",
		"description": "Pilih jalur alternatif untuk menghindari rintangan batu.",
		"objective": "Belajar memilih jalur aman.",
		"quickTip": "Hindari rintangan batu dengan memilih belokan lebih awal.",
		"concepts": [
			"PILIH RUTE",
			"HINDARI BATU"
		],
		"concept": "Pencegahan Tabrakan: Mengecek rintangan sebelum melangkah.",
		"achievement": {
			"id": "ach-lvl-3",
			"levelId": 3,
			"title": "Penemu Rute",
			"description": "Temukan jalan aman tanpa menabrak rintangan batu.",
			"icon": "shield",
			"xpReward": 35
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl3-ch1",
				"title": "Batu di Tengah Jalan",
				"objective": "Memutar ke samping untuk melewati batu besar di tengah lorong.",
				"pythonContext": "pybot.turn_right()\npybot.move()\npybot.turn_left()\npybot.move()\npybot.move()\npybot.turn_left()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 1
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 0
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 8,
				"maxMoves": 8,
				"xpReward": 35,
				"hints": [
					"Amati posisi batu penghalang: jalan lurus terhalang, cari jalur samping yang terbuka.",
					"Gunakan belokan untuk memutari batu dari jalur bawah, lalu belok kembali menuju tujuan."
				]
			},
			{
				"id": "lvl3-ch2",
				"title": "Lembah U-Turn",
				"objective": "Masuk lorong sempit berbentuk huruf U dan ambil bintang.",
				"pythonContext": "pybot.move()\npybot.turn_right()\npybot.move()\npybot.move()\npybot.turn_left()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 0,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 8,
				"maxMoves": 7,
				"xpReward": 40,
				"hints": [
					"Jalur berbentuk huruf U membutuhkan perubahan arah bertahap mengikuti lekukan lorong.",
					"Hindari dinding lorong dengan berbelok tepat saat berada di petak persimpangan."
				]
			},
			{
				"id": "lvl3-ch3",
				"title": "Pilihan Dua Jalur",
				"objective": "Pilih jalur terbuka yang tidak terhalang rintangan ganda.",
				"pythonContext": "pybot.turn_left()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 1
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 7,
				"maxMoves": 6,
				"xpReward": 40,
				"hints": [
					"Periksa kedua cabang jalan di depan: salah satu cabang ditutup oleh batu rintangan.",
					"Arahkan PyBot ke cabang yang bebas rintangan menuju posisi target."
				]
			}
		]
	},
	{
		"id": 4,
		"unitId": 2,
		"unitTitle": "Unit 2: Pola Iterasi & Looping",
		"title": "Level 4: Loop Pengulangan",
		"description": "Gunakan balok REPEAT untuk aksi berulang dengan ringkas.",
		"objective": "Belajar mengulang aksi dengan loop.",
		"quickTip": "Gunakan REPEAT agar perintah yang sama tidak perlu disusun ulang berkali-kali.",
		"concepts": [
			"REPEAT",
			"LOOP"
		],
		"concept": "Looping: for i in range(n) mempersingkat kode yang berulang.",
		"achievement": {
			"id": "ach-lvl-4",
			"levelId": 4,
			"title": "Master Loop",
			"description": "Persingkat kode menggunakan blok perulangan REPEAT.",
			"icon": "repeat",
			"xpReward": 40
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl4-ch1",
				"title": "Lari Cepat 4 Petak",
				"objective": "Gunakan REPEAT 4x untuk melangkah lurus di koridor panjang.",
				"pythonContext": "for i in range(4):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 0,
							"y": 3
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 4,
				"maxMoves": 5,
				"xpReward": 40,
				"hints": [
					"Alih-alih menyusun banyak balok yang sama, cari aksi identik yang dilakukan berulang kali.",
					"Balok perulangan (REPEAT) dapat mengulang aksi di dalamnya sesuai jumlah langkah yang dibutuhkan."
				]
			},
			{
				"id": "lvl4-ch2",
				"title": "Maju Panjang Menuju Target",
				"objective": "Ulangi langkah maju 5 petak berturut-turut.",
				"pythonContext": "for step in range(5):\n    pybot.move()",
				"grid": {
					"cols": 7,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 2
					},
					"obstacles": [
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 0,
							"y": 3
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 5,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 4,
				"maxMoves": 6,
				"xpReward": 45,
				"hints": [
					"Koridor ini cukup panjang. Tentukan berapa kali PyBot harus melangkah maju lurus.",
					"Manfaatkan balok REPEAT agar kode lebih ringkas dan mematuhi batasan balok maksimal."
				]
			},
			{
				"id": "lvl4-ch3",
				"title": "Maju, Belok, Lalu Loop",
				"objective": "Maju 1 petak, belok kanan, lalu ulangi maju 3 kali.",
				"pythonContext": "pybot.move()\npybot.turn_right()\nfor i in range(3):\n    pybot.move()",
				"grid": {
					"cols": 5,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_RIGHT",
					"TURN_LEFT",
					"REPEAT"
				],
				"maxBlocks": 5,
				"maxMoves": 6,
				"xpReward": 45,
				"hints": [
					"Perhatikan urutan aksi: ada aksi persiapan belok sebelum PyBot memasuki lorong panjang.",
					"Selesaikan belokan terlebih dahulu, lalu manfaatkan loop untuk melintasi lorong vertikal."
				]
			}
		]
	},
	{
		"id": 5,
		"unitId": 2,
		"unitTitle": "Unit 2: Pola Iterasi & Looping",
		"title": "Level 5: Pola Tangga & Zig-zag",
		"description": "Pola berulang pada rute geometris: kombinasikan belokan dan loop.",
		"objective": "Temukan pola. Gunakan loop.",
		"quickTip": "Anak tangga punya pola sama: maju & belok yang berulang secara teratur.",
		"concepts": [
			"ZIG-ZAG",
			"LOOP"
		],
		"concept": "Pola Algoritmik: Mengidentifikasi bagian langkah yang berulang teratur.",
		"achievement": {
			"id": "ach-lvl-5",
			"levelId": 5,
			"title": "Arsitek Pola",
			"description": "Eksekusi pola gerak berulang pada lintasan tangga.",
			"icon": "git-commit",
			"xpReward": 45
		},
		"difficulty": 3,
		"challenges": [
			{
				"id": "lvl5-ch1",
				"title": "Anak Tangga Pertama",
				"objective": "Naik 2 anak tangga dengan pola: Maju -> Belok Kiri -> Maju -> Belok Kanan.",
				"pythonContext": "for step in range(2):\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 3
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 1
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxBlocks": 6,
				"maxMoves": 6,
				"xpReward": 50,
				"hints": [
					"Setiap anak tangga memiliki pola pergerakan identik: melangkah, berputar, melangkah, lalu kembali ke arah semula.",
					"Temukan satu siklus anak tangga utuh, lalu masukkan ke dalam blok perulangan."
				],
				"canonicalCommands": [
					"MOVE",
					"TURN_LEFT",
					"MOVE",
					"TURN_RIGHT",
					"MOVE",
					"TURN_LEFT",
					"MOVE",
					"TURN_RIGHT"
				]
			},
			{
				"id": "lvl5-ch2",
				"title": "Pola Zig-Zag Sungai",
				"objective": "Lintasi sungai zig-zag dengan pola: Maju -> Belok Kanan -> Maju -> Belok Kiri.",
				"pythonContext": "for step in range(2):\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxBlocks": 6,
				"maxMoves": 6,
				"xpReward": 50,
				"hints": [
					"Perhatikan lekukan sungai: robot harus berganti arah hadap secara teratur di setiap persimpangan.",
					"Gunakan perulangan untuk mengeksekusi lekukan berulang tanpa perlu menyusun banyak balok manual."
				],
				"canonicalCommands": [
					"MOVE",
					"TURN_RIGHT",
					"MOVE",
					"TURN_LEFT",
					"MOVE",
					"TURN_RIGHT",
					"MOVE",
					"TURN_LEFT"
				]
			},
			{
				"id": "lvl5-ch3",
				"title": "Tiga Tangga Beruntun",
				"objective": "Ulangi pola tangga 3 kali untuk mencapai puncak bukit.",
				"pythonContext": "for i in range(3):\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 4
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 1
					},
					"obstacles": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 2,
							"y": 5
						},
						{
							"x": 3,
							"y": 5
						},
						{
							"x": 4,
							"y": 5
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 6,
				"maxMoves": 8,
				"xpReward": 55,
				"hints": [
					"Tiga anak tangga berarti pola gerakan tangga yang sama dilakukan berulang tiga kali.",
					"Susun satu siklus tangga yang tepat di dalam blok REPEAT untuk menghemat kuota balok."
				],
				"canonicalCommands": [
					"MOVE",
					"TURN_LEFT",
					"MOVE",
					"TURN_RIGHT",
					"MOVE",
					"TURN_LEFT",
					"MOVE",
					"TURN_RIGHT",
					"MOVE",
					"TURN_LEFT",
					"MOVE",
					"TURN_RIGHT"
				]
			}
		]
	},
	{
		"id": 6,
		"unitId": 2,
		"unitTitle": "Unit 2: Pola Iterasi & Looping",
		"title": "Level 6: Pengenalan Loop",
		"description": "Belajar menggunakan perintah ULANGI untuk mengulang gerakan.",
		"objective": "Belajar menggunakan perintah ULANGI untuk mengulang gerakan.",
		"quickTip": "Gunakan balok ULANGI untuk menjalankan perintah berkali-kali secara otomatis.",
		"concepts": [
			"ULANGI",
			"LOOP DASAR"
		],
		"concept": "Konsep Perulangan: Mengelompokkan perintah yang sama menggunakan loop.",
		"achievement": {
			"id": "ach-lvl-6",
			"levelId": 6,
			"title": "Ahli Perulangan",
			"description": "Berhasil menyelesaikan tantangan menggunakan perintah loop.",
			"icon": "repeat",
			"xpReward": 50
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl6-ch1",
				"title": "Langkah Berulang 3 Kali",
				"objective": "Jalan lurus 3 langkah menuju bintang emas menggunakan perintah ULANGI.",
				"pythonContext": "for i in range(3):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxMoves": 10,
				"xpReward": 50,
				"hints": [
					"Gunakan perintah pengulangan untuk melangkah lurus tanpa repot menyusun banyak balok.",
					"Atur angka putaran loop menjadi 3 sesuai jarak petak menuju bintang."
				]
			},
			{
				"id": "lvl6-ch2",
				"title": "Meluncur 5 Langkah",
				"objective": "Gunakan ULANGI 5 kali untuk meluncur sepanjang jalur lurus.",
				"pythonContext": "for i in range(5):\n    pybot.move()",
				"grid": {
					"cols": 7,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 6,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 6,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 5,
							"y": 3
						},
						{
							"x": 6,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxMoves": 12,
				"xpReward": 55,
				"hints": [
					"Jalur lurus kali ini lebih panjang; manfaatkan efisiensi balok perulangan.",
					"Ubah angka perulangan menjadi 5 agar robot mencapai ujung lorong."
				]
			},
			{
				"id": "lvl6-ch3",
				"title": "Ulangi Lalu Belok",
				"objective": "Maju 3 langkah dengan ULANGI, belok kanan, lalu melangkah ke bintang.",
				"pythonContext": "for i in range(3):\n    pybot.move()\npybot.turn_right()\npybot.move()",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxMoves": 12,
				"xpReward": 60,
				"hints": [
					"Gunakan perulangan untuk menelusuri lorong lurus pertama di atas.",
					"Setelah keluar dari loop, sambungkan perintah belok dan langkah ke bawah."
				]
			},
			{
				"id": "lvl6-ch4",
				"title": "Pola Berulang Dua Kali",
				"objective": "Gunakan ULANGI 2 kali untuk mengulang pola maju dan belok kanan.",
				"pythonContext": "for i in range(2):\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 2
					},
					"obstacles": [
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxMoves": 10,
				"xpReward": 65,
				"hints": [
					"Amati langkah robot: maju satu petak lalu belok kanan membentuk pola berulang.",
					"Masukkan aksi gerakan dan belokan ke dalam satu kontainer perulangan 2 kali."
				]
			}
		]
	},
	{
		"id": 7,
		"unitId": 3,
		"unitTitle": "Unit 3: Navigasi Kompleks & Algoritma",
		"title": "Level 7: Langkah Efisien",
		"description": "Susun instruksi lintasan panjang dengan efisiensi balok tinggi.",
		"objective": "Susun langkah paling hemat.",
		"quickTip": "Manfaatkan loop pada lintasan panjang agar hemat kuota balok.",
		"concepts": [
			"EFISIENSI",
			"HEMAT BALOK"
		],
		"concept": "Efisiensi Kode: Menyelesaikan masalah dengan instruksi seminimal mungkin.",
		"achievement": {
			"id": "ach-lvl-7",
			"levelId": 7,
			"title": "Peretas Efisien",
			"description": "Capai target dengan jumlah balok paling sedikit.",
			"icon": "target",
			"xpReward": 55
		},
		"difficulty": 4,
		"challenges": [
			{
				"id": "lvl7-ch1",
				"title": "Perjalanan Keliling Pulau",
				"objective": "Kelilingi pulau batu tengah untuk meraih bintang di seberang.",
				"pythonContext": "for i in range(3):\n    pybot.move()\npybot.turn_right()\nfor i in range(3):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 4
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 4,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_RIGHT",
					"TURN_LEFT",
					"REPEAT"
				],
				"maxBlocks": 6,
				"maxMoves": 8,
				"xpReward": 65,
				"hints": [
					"Jalur mengelilingi pulau terdiri dari dua segmen lurus panjang yang dihubungkan satu belokan.",
					"Gunakan blok perulangan pada masing-masing segmen lurus untuk mematuhi batas maksimal balok."
				]
			},
			{
				"id": "lvl7-ch2",
				"title": "Labirin Berputar Spiral",
				"objective": "Ikuti jalur spiral searah jarum jam menuju titik tengah arena.",
				"pythonContext": "for step in range(3):\n    pybot.move()\npybot.turn_right()\npybot.move()\npybot.move()\npybot.turn_right()\npybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 4,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxBlocks": 8,
				"maxMoves": 10,
				"xpReward": 70,
				"hints": [
					"Gerakan spiral menyusut ke dalam membutuhkan langkah yang terukur di setiap sudut dinding.",
					"Cek koordinat target di bagian dalam: masuklah melalui jalur lingkar terluar terlebih dahulu."
				]
			},
			{
				"id": "lvl7-ch3",
				"title": "Tiga Lorong Paralel",
				"objective": "Pindah antar-lorong paralel dengan belokan tajam 180 derajat.",
				"pythonContext": "pybot.move()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.turn_right()\npybot.move()\npybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 1,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 9,
				"maxMoves": 9,
				"xpReward": 70,
				"hints": [
					"Untuk berbalik arah ke lorong sebelah, PyBot perlu melakukan dua kali belokan yang searah.",
					"Pastikan PyBot melangkah ke lorong sebelah sebelum memutar kembali arah hadapnya."
				]
			}
		]
	},
	{
		"id": 8,
		"unitId": 3,
		"unitTitle": "Unit 3: Navigasi Kompleks & Algoritma",
		"title": "Level 8: Siklus Berulang",
		"description": "Kombinasikan loop dan rotasi untuk menavigasi lorong berbentuk siklus.",
		"objective": "Pecah rute jadi pola siklus.",
		"quickTip": "Satu loop teratur bisa membersihkan seluruh lorong simetris.",
		"concepts": [
			"SIKLUS",
			"MULTI-LOOP"
		],
		"concept": "Iterasi Majemuk: Mengulangi kumpulan instruksi majemuk dalam 1 loop.",
		"achievement": {
			"id": "ach-lvl-8",
			"levelId": 8,
			"title": "Pelacak Jalur",
			"description": "Selesaikan koridor melingkar dengan pola siklus.",
			"icon": "refresh-cw",
			"xpReward": 60
		},
		"difficulty": 4,
		"challenges": [
			{
				"id": "lvl8-ch1",
				"title": "Putaran Empat Penjuru",
				"objective": "Gunakan perulangan untuk menyusuri 3 sisi persegi pembatas.",
				"pythonContext": "for side in range(3):\n    pybot.move()\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 1,
						"y": 3
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 3,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_RIGHT",
					"TURN_LEFT"
				],
				"maxBlocks": 6,
				"maxMoves": 10,
				"xpReward": 75,
				"hints": [
					"Keliling persegi memiliki pola sisi yang simetris: melangkah sepanjang sisi lalu membelokkan arah.",
					"Ulangi siklus satu sisi tersebut beberapa kali hingga robot tiba di sisi target."
				]
			},
			{
				"id": "lvl8-ch2",
				"title": "Pembersih Koridor Ganda",
				"objective": "Kumpulkan semua koin di kedua lorong dengan pola simetris.",
				"pythonContext": "for i in range(2):\n    pybot.move()\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_left()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 3
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 7,
				"maxMoves": 10,
				"xpReward": 80,
				"hints": [
					"Perhatikan posisi kedua lorong: setelah membersihkan lorong pertama, ubah jalur menuju lorong kedua.",
					"Pola pergerakan di lorong kedua menyerupai lorong pertama, temukan keteraturan gerakannya."
				]
			},
			{
				"id": "lvl8-ch3",
				"title": "Lompatan Tiga Kolom",
				"objective": "Pindah kolom demi kolom melewati dinding vertikal.",
				"pythonContext": "for col in range(2):\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 3
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxBlocks": 9,
				"maxMoves": 12,
				"xpReward": 80,
				"hints": [
					"Dinding vertikal memisahkan kolom; naiklah ke baris yang bebas rintangan untuk berpindah kolom.",
					"Setelah melewati dinding pembatas, turunkan kembali posisi PyBot ke jalur target."
				]
			}
		]
	},
	{
		"id": 9,
		"unitId": 3,
		"unitTitle": "Unit 3: Navigasi Kompleks & Algoritma",
		"title": "Level 9: Spiral & Lorong Sempit",
		"description": "Pecahkan teka-teki labirin dengan kombinasi multi-belokan rapat.",
		"objective": "Kuasai navigasi lorong sempit.",
		"quickTip": "Perhatikan perubahan arah hadap di setiap sudut lintasan spiral.",
		"concepts": [
			"SPIRAL",
			"ORIENTASI"
		],
		"concept": "Struktur Kontrol Kompleks: Gabungan rangkaian panjang dengan evaluasi posisi.",
		"achievement": {
			"id": "ach-lvl-9",
			"levelId": 9,
			"title": "Penjelajah Spiral",
			"description": "Taklukkan lorong sempit berputar.",
			"icon": "map-pin",
			"xpReward": 70
		},
		"difficulty": 5,
		"challenges": [
			{
				"id": "lvl9-ch1",
				"title": "Labirin Huruf W",
				"objective": "Navigasi lintasan zig-zag ganda menyerupai huruf W.",
				"pythonContext": "for i in range(2):\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 3
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 3
					},
					"obstacles": [
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxBlocks": 10,
				"maxMoves": 15,
				"xpReward": 85,
				"hints": [
					"Lintasan W terdiri dari dua puncak: naik melewati rintangan pertama, lalu ulangi manuver untuk rintangan kedua.",
					"Pecah manuver melewati satu rintangan menjadi sub-langkah: naik, melangkah, lalu turun."
				]
			},
			{
				"id": "lvl9-ch2",
				"title": "Benteng Berduri",
				"objective": "Cari celah sempit di antara deretan rintangan pelindung bintang.",
				"pythonContext": "pybot.turn_right()\npybot.move()\npybot.turn_left()\nfor i in range(3):\n    pybot.move()\npybot.turn_left()\npybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxBlocks": 8,
				"maxMoves": 9,
				"xpReward": 90,
				"hints": [
					"Benteng atas terlalu rapat untuk ditembus; carilah koridor terbuka di bagian bawah.",
					"Gunakan belokan awal untuk mengarahkan PyBot ke jalur bawah yang lapang menuju target."
				]
			},
			{
				"id": "lvl9-ch3",
				"title": "Labirin Labah-Labah",
				"objective": "Selesaikan rute melingkar dengan batasan langkah yang efisien.",
				"pythonContext": "for step in range(3):\n    pybot.move()\n    pybot.turn_right()\npybot.move()\npybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 3
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 4,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_RIGHT",
					"TURN_LEFT"
				],
				"maxBlocks": 8,
				"maxMoves": 11,
				"xpReward": 90,
				"hints": [
					"Target berada di ruang dalam labirin; hindari dinding tebal dengan memutar dari sisi terluar.",
					"Perhitungkan setiap belokan agar PyBot tidak terjebak di lorong sempit tanpa jalan keluar."
				]
			}
		]
	},
	{
		"id": 10,
		"unitId": 3,
		"unitTitle": "Unit 3: Navigasi Kompleks & Algoritma",
		"title": "Level 10: Master PyQuest",
		"description": "Puncak ujian logika pemrograman: tantangan terpadu algoritma penuh.",
		"objective": "Rancang algoritma lengkap ke puncak!",
		"quickTip": "Gabungkan semua jurus: langkah sekuensial, belokan presisi, dan loop hemat.",
		"concepts": [
			"ALGORITMA",
			"MASTER"
		],
		"concept": "Algoritma Komprehensif: Menggabungkan efisiensi balok, loop, dan navigasi presisi.",
		"achievement": {
			"id": "ach-lvl-10",
			"levelId": 10,
			"title": "Grandmaster PyQuest",
			"description": "Menuntaskan seluruh petualangan koding PyQuest!",
			"icon": "award",
			"xpReward": 100
		},
		"difficulty": 5,
		"challenges": [
			{
				"id": "lvl10-ch1",
				"title": "Gerbang Istana PyBot",
				"objective": "Tembus pertahanan istana dengan kombinasi loop dan belokan presisi.",
				"pythonContext": "for i in range(2):\n    pybot.move()\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"REPEAT"
				],
				"maxBlocks": 9,
				"maxMoves": 12,
				"xpReward": 100,
				"hints": [
					"Gerbang istana memiliki rintangan simetris di sisi kiri dan kanan lorong.",
					"Cari pola langkah zigzag yang dapat diulang untuk melewati setiap sekat gerbang."
				]
			},
			{
				"id": "lvl10-ch2",
				"title": "Labirin Mahkota Bintang",
				"objective": "Jelajahi labirin simetris untuk mengambil bintang di puncak mahkota.",
				"pythonContext": "for step in range(3):\n    pybot.move()\npybot.turn_left()\nfor step in range(2):\n    pybot.move()\npybot.turn_left()\npybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 4
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT"
				],
				"maxBlocks": 9,
				"maxMoves": 12,
				"xpReward": 110,
				"hints": [
					"Bintang berada di tengah mahkota; temukan jalur melingkar dari sisi atas untuk masuk ke dalamnya.",
					"Kombinasikan gerakan lurus teratur dengan belokan tepat di setiap sudut mahkota."
				]
			},
			{
				"id": "lvl10-ch3",
				"title": "Ujian Terakhir: PyMaster Grand Slam",
				"objective": "Kumpulkan semua koin dan raih Bintang Emas Terakhir dengan kode terbersih!",
				"pythonContext": "for lap in range(4):\n    pybot.move()\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 1,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_RIGHT",
					"TURN_LEFT"
				],
				"maxBlocks": 7,
				"maxMoves": 14,
				"xpReward": 150,
				"hints": [
					"Untuk menyapu seluruh koin di sekeliling arena, buat PyBot berpatroli memutari 4 sudut perimeter.",
					"Setiap sisi arena memiliki panjang langkah yang serupa sebelum melakukan rotasi 90 derajat."
				]
			}
		]
	},
	{
		"id": 11,
		"unitId": 3,
		"unitTitle": "Unit 3: Labirin Bersudut & Pola Spiral",
		"title": "Level 11: Koridor Spiral Dalam",
		"description": "Pecahkan rute berputar yang mengarah ke pusat labirin.",
		"objective": "Ikuti alur spiral menuju bintang di titik pusat.",
		"quickTip": "Setiap putaran spiral memperpendek jarak langkah sebelum berbelok.",
		"concepts": [
			"Spiral",
			"Loop Pengurangan",
			"Arah Sudut"
		],
		"concept": "Lintasan Spiral: Navigasi berputar bertingkat menuju pusat koordinat.",
		"achievement": {
			"id": "ach-lvl-11",
			"levelId": 11,
			"title": "Penjelajah Spiral",
			"description": "Taklukkan koridor spiral menuju titik pusat arena.",
			"icon": "compass",
			"xpReward": 35
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl11-ch1",
				"title": "Spiral Searah Jarum Jam",
				"objective": "Telusuri lorong spiral searah jarum jam hingga mencapai pusat labirin.",
				"pythonContext": "pybot.move()\npybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 1,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 4,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 35,
				"hints": [
					"Ikuti dinding pembatas luar searah jarum jam sebelum membelok ke koridor tengah.",
					"Perhatikan celah terbuka di sudut arena untuk masuk ke bagian dalam."
				]
			},
			{
				"id": "lvl11-ch2",
				"title": "Spiral Balik Arah",
				"objective": "Navigasi spiral berlawanan arah jarum jam untuk menjemput bintang.",
				"pythonContext": "pybot.move()\npybot.turn_left()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 4,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 2,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 4
						},
						{
							"x": 0,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 35,
				"hints": [
					"Gunakan rotasi berlawanan jarum jam di setiap tikungan dinding.",
					"Pastikan PyBot melangkah sampai sudut sebelum melakukan rotasi."
				]
			},
			{
				"id": "lvl11-ch3",
				"title": "Pusaran Koin Inti",
				"objective": "Ambil koin di lorong spiral dan raih Bintang Emas di titik tengah.",
				"pythonContext": "for step in range(3):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 2,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 9,
				"maxMoves": 20,
				"xpReward": 40,
				"hints": [
					"Manfaatkan pengulangan langkah untuk menyusuri koridor panjang tepi arena.",
					"Belok ke celah lorong dalam begitu koin di sudut berhasil dikumpulkan."
				]
			}
		]
	},
	{
		"id": 12,
		"unitId": 3,
		"unitTitle": "Unit 3: Labirin Bersudut & Pola Spiral",
		"title": "Level 12: Manuver U-Turn Berganda",
		"description": "Kuasai manuver putar balik ganda untuk menyusuri lorong paralel.",
		"objective": "Jelajahi lorong beruntun dengan belokan U-Turn yang teratur.",
		"quickTip": "U-Turn terdiri dari dua kali belokan searah secara berurutan.",
		"concepts": [
			"U-Turn",
			"Belokan Ganda",
			"Jalur Paralel"
		],
		"concept": "Manuver Putar Balik: Dua rotasi identik untuk berganti arah 180 derajat.",
		"achievement": {
			"id": "ach-lvl-12",
			"levelId": 12,
			"title": "Ahli Putar Balik",
			"description": "Lakukan manuver U-turn beruntun tanpa menabrak dinding batas.",
			"icon": "repeat",
			"xpReward": 35
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl12-ch1",
				"title": "Lorong U Pertama",
				"objective": "Susuri lorong atas, lakukan U-Turn di ujung, lalu kembali melalui lorong bawah.",
				"pythonContext": "pybot.turn_right()\npybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 5,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 35,
				"hints": [
					"Dinding di baris tengah memisahkan dua koridor; lewati celah paling ujung kanan.",
					"Lakukan dua kali belokan ke arah yang sama untuk berputar 180 derajat."
				]
			},
			{
				"id": "lvl12-ch2",
				"title": "Gelombang S Ganda",
				"objective": "Navigasi dua kali putar balik berbentuk huruf S melewati tiga jalur lorong.",
				"pythonContext": "for lap in range(2):\n    # U-turn",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 5,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 22,
				"xpReward": 40,
				"hints": [
					"Jalur ini menyerupai huruf S berlipat; belok kanan di ujung pertama lalu belok kiri di ujung kedua.",
					"Gunakan blok pengulangan jika terdapat deretan langkah maju yang identik."
				]
			},
			{
				"id": "lvl12-ch3",
				"title": "Labirin Sisir Paralel",
				"objective": "Sapu koin di sepanjang empat koridor sisir berurutan hingga tiba di target.",
				"pythonContext": "pybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 5
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 0,
							"y": 5
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 2,
							"y": 5
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 0,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 11,
				"maxMoves": 26,
				"xpReward": 45,
				"hints": [
					"Telusuri setiap koridor bolak-balik dari kiri ke kanan lalu dari kanan ke kiri.",
					"Pastikan orientasi hadap robot selalu sesuai dengan arah lorong berikutnya."
				]
			}
		]
	},
	{
		"id": 13,
		"unitId": 3,
		"unitTitle": "Unit 3: Labirin Bersudut & Pola Spiral",
		"title": "Level 13: Pola Zig-Zag Diagonal",
		"description": "Pola langkah berundak diagonal maju-belok-maju-belok secara ritmis.",
		"objective": "Gunakan pengulangan pola undak diagonal menuju sudut seberang.",
		"quickTip": "Satu siklus undak terdiri dari: Maju, Belok Kanan, Maju, Belok Kiri.",
		"concepts": [
			"Undak Diagonal",
			"Siklus Zig-Zag",
			"REPEAT Ringkas"
		],
		"concept": "Pergerakan Diagonal Teratur: Mengombinasikan rotasi bergantian dalam satu loop.",
		"achievement": {
			"id": "ach-lvl-13",
			"levelId": 13,
			"title": "Penari Zig-Zag",
			"description": "Selesaikan lintasan undak diagonal dengan kode paling efisien.",
			"icon": "activity",
			"xpReward": 40
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl13-ch1",
				"title": "Tangga Undak 3-Tingkat",
				"objective": "Lompati rintangan diagonal dengan 3 kali pola langkah undak tangga.",
				"pythonContext": "for i in range(3):\n    pybot.move()\n    pybot.turn_right()\n    pybot.move()\n    pybot.turn_left()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 6,
				"maxMoves": 10,
				"xpReward": 35,
				"hints": [
					"Rintangan membentuk dinding miring diagonal; telusuri tepi luarnya seperti menuruni anak tangga.",
					"Bungkus satu pasangan belokan dan langkah ke dalam blok pengulangan."
				]
			},
			{
				"id": "lvl13-ch2",
				"title": "Tangga Undak 4-Tingkat Luas",
				"objective": "Ulangi pola undak 4 kali menembus arena 6x6 menuju sudut kanan bawah.",
				"pythonContext": "for step in range(4):\n    # pola tangga",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 5
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 6,
				"maxMoves": 12,
				"xpReward": 40,
				"hints": [
					"Pola gerakan tangga berulang 4 kali secara simetris.",
					"Cukup tulis satu siklus anak tangga lalu gandakan pengulangannya."
				]
			},
			{
				"id": "lvl13-ch3",
				"title": "Zig-Zag Terbalik Menanjak",
				"objective": "Mulai dari bawah dan naik secara zig-zag menuju puncak arena.",
				"pythonContext": "for i in range(3):\n    pybot.move()\n    pybot.turn_left()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 4
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 1
					},
					"obstacles": [
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 0
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 7,
				"maxMoves": 10,
				"xpReward": 40,
				"hints": [
					"Arahkan robot menaiki anak tangga dengan memadukan belok kiri dan belok kanan.",
					"Ambil koin di setiap pijakan anak tangga sebelum melangkah ke tingkat berikutnya."
				]
			}
		]
	},
	{
		"id": 14,
		"unitId": 3,
		"unitTitle": "Unit 3: Labirin Bersudut & Pola Spiral",
		"title": "Level 14: Lintasan Labirin Persegi",
		"description": "Kuasai keliling bujur sangkar 4 sisi dengan rotasi sudut siku 90 derajat.",
		"objective": "Kelilingi batas persegi dan temukan pintu masuk menuju target.",
		"quickTip": "Persegi memiliki 4 sisi sama panjang; gunakan perulangan 4 kali.",
		"concepts": [
			"Geometri Persegi",
			"Loop 4 Sisi",
			"Rotasi 90 Derajat"
		],
		"concept": "Keliling Tertutup: Menelusuri keempat sisi poligon teratur secara simetris.",
		"achievement": {
			"id": "ach-lvl-14",
			"levelId": 14,
			"title": "Penakluk Poligon",
			"description": "Susuri lintasan persegi 4 sisi dengan loop simetris.",
			"icon": "square",
			"xpReward": 40
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl14-ch1",
				"title": "Keliling Kotak Luar",
				"objective": "Kelilingi perimeter luar arena dari sudut kiri atas menuju sudut kiri bawah.",
				"pythonContext": "for sisi in range(3):\n    pybot.move()\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 4,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 40,
				"hints": [
					"Rintangan padat di tengah membentuk blok pulau; berjalanlah mengelilingi tepiannya.",
					"Gunakan belokan kanan di setiap sudut kotak luar."
				]
			},
			{
				"id": "lvl14-ch2",
				"title": "Kotak Masuk Spiral Persegi",
				"objective": "Kelilingi 3 sisi kotak luar lalu masuk melalui pintu samping ke kamar pusat.",
				"pythonContext": "for s in range(2):\n    # langkah sisi",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 9,
				"maxMoves": 20,
				"xpReward": 45,
				"hints": [
					"Kumpulkan koin di tiga sudut perimeter sebelum berbelok masuk ke celah tengah.",
					"Pintu masuk ke bintang berada di sisi lorong dalam."
				]
			},
			{
				"id": "lvl14-ch3",
				"title": "Patroli Kotak Ganda",
				"objective": "Sapu dua lintasan kotak berurutan dan akhiri di pusat labirin.",
				"pythonContext": "for lap in range(4):\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 4,
							"y": 4
						},
						{
							"x": 1,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 20,
				"xpReward": 45,
				"hints": [
					"Buat loop pengulangan untuk menyusuri 3 sisi persegi sebelum memutar masuk.",
					"Hitung panjang sisi secara tepat agar robot tidak menabrak batas dinding."
				]
			}
		]
	},
	{
		"id": 15,
		"unitId": 3,
		"unitTitle": "Unit 3: Labirin Bersudut & Pola Spiral",
		"title": "Level 15: Lorong Ganda & Koin Sudut",
		"description": "Kumpulkan koin yang tersebar di 4 sudut strategis labirin.",
		"objective": "Rancang rute pengumpulan koin di sudut arena sebelum ke bintang.",
		"quickTip": "Rencanakan jalur terpendek yang menyentuh seluruh sudut koin tanpa langkah mundur.",
		"concepts": [
			"Rute Sudut",
			"Koleksi Koin",
			"Optimasi Jalur"
		],
		"concept": "Perjalanan Berantai: Menghubungkan titik-titik pos koin dalam satu garis rute kontinu.",
		"achievement": {
			"id": "ach-lvl-15",
			"levelId": 15,
			"title": "Kolektor Sudut",
			"description": "Ambil seluruh koin sudut dan bawa PyBot ke Bintang Emas.",
			"icon": "star",
			"xpReward": 45
		},
		"difficulty": 2,
		"challenges": [
			{
				"id": "lvl15-ch1",
				"title": "Dua Sudut Sejajar",
				"objective": "Ambil koin di sudut atas dan sudut bawah sebelum mendarat di bintang.",
				"pythonContext": "pybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "UP",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 4,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 9,
				"maxMoves": 16,
				"xpReward": 40,
				"hints": [
					"Dinding penghalang berdiri di kolom tengah; lewati lorong atas untuk menyeberang.",
					"Ambil koin pertama di sudut kiri atas sebelum membelok ke sisi kanan."
				]
			},
			{
				"id": "lvl15-ch2",
				"title": "Persimpangan Empat Sudut",
				"objective": "Jelajahi empat penjuru labirin untuk mengamankan 3 koin emas.",
				"pythonContext": "for i in range(3):\n    # ambil koin",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 4
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 18,
				"xpReward": 45,
				"hints": [
					"Pilar tengah menghalangi jalan pintas diagonal; gunakan koridor tepi untuk bermanuver.",
					"Kumpulkan koin di sudut kanan atas lalu lanjutkan ke sudut kiri bawah."
				]
			},
			{
				"id": "lvl15-ch3",
				"title": "Pesta Bintang Sudut Penuh",
				"objective": "Ambil koin di setiap sudut perhentian dan akhiri perjalanan di gerbang bintang.",
				"pythonContext": "for pojok in range(4):\n    # patroli",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 11,
				"maxMoves": 24,
				"xpReward": 50,
				"hints": [
					"Sapu ketiga koin di perimeter luar terlebih dahulu.",
					"Masuk ke bintang tengah melalui celah lorong yang terbuka di baris ketiga."
				]
			}
		]
	},
	{
		"id": 16,
		"unitId": 4,
		"unitTitle": "Unit 4: Siklus Berulang & Labirin Berundak",
		"title": "Level 16: Tangga Piramida",
		"description": "Daki anak tangga piramida berundak menggunakan perulangan pola langkah.",
		"objective": "Gunakan pengulangan untuk menaiki dan menuruni undakan piramida.",
		"quickTip": "Satu tingkat undakan membutuhkan 1 langkah maju dan 1 belokan terkoordinasi.",
		"concepts": [
			"Tangga Piramida",
			"Pola Naik Turun",
			"REPEAT Sinkron"
		],
		"concept": "Algoritma Bertingkat: Menyusun struktur perulangan untuk menaklukkan medan berundak.",
		"achievement": {
			"id": "ach-lvl-16",
			"levelId": 16,
			"title": "Pendaki Piramida",
			"description": "Daki puncak piramida berundak dengan instruksi paling ringkas.",
			"icon": "triangle",
			"xpReward": 45
		},
		"difficulty": 3,
		"challenges": [
			{
				"id": "lvl16-ch1",
				"title": "Tanjakan Piramida",
				"objective": "Mendaki 3 undakan piramida menuju bintang di puncak.",
				"pythonContext": "for undak in range(3):\n    pybot.move()\n    pybot.turn_left()\n    pybot.move()\n    pybot.turn_right()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 4
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 1
					},
					"obstacles": [
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 0
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 6,
				"maxMoves": 10,
				"xpReward": 40,
				"hints": [
					"Pola pendakian terdiri dari: langkah maju, putar hadap ke atas, langkah maju, lalu putar hadap ke kanan.",
					"Bungkus pola 4 aksi tersebut ke dalam blok pengulangan."
				]
			},
			{
				"id": "lvl16-ch2",
				"title": "Naik dan Turun Piramida",
				"objective": "Daki sisi barat piramida, lalu turun di sisi timur untuk meraih bintang.",
				"pythonContext": "for naik in range(2):\n    # naik\nfor turun in range(2):\n    # turun",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 3
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 9,
				"maxMoves": 14,
				"xpReward": 45,
				"hints": [
					"Rute ini memiliki dua fase: fase mendaki di paruh awal, dan fase menurun di paruh akhir.",
					"Ambil koin kembar di puncak sebelum menuruni lereng seberang."
				]
			},
			{
				"id": "lvl16-ch3",
				"title": "Piramida Bertingkat Ganda",
				"objective": "Navigasi undakan lebar piramida dan kumpulkan koin di setiap pelataran.",
				"pythonContext": "for p in range(3):\n    # undakan lebar",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 5
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 1
					},
					"obstacles": [
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 2,
							"y": 5
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 0,
							"y": 3
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 1
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 50,
				"hints": [
					"Setiap pelataran undakan memiliki jalur yang aman dari rintangan.",
					"Ikuti urutan koin emas sebagai panduan rute pendakian."
				]
			}
		]
	},
	{
		"id": 17,
		"unitId": 4,
		"unitTitle": "Unit 4: Siklus Berulang & Labirin Berundak",
		"title": "Level 17: Loop Ganda Berurutan",
		"description": "Kombinasikan dua blok perulangan berurutan untuk menyelesaikan rute panjang.",
		"objective": "Gunakan dua blok REPEAT berurutan untuk mengendalikan PyBot.",
		"quickTip": "Satu blok REPEAT untuk fase lorong pertama, dan blok REPEAT kedua untuk lorong berikutnya.",
		"concepts": [
			"Dua Loop REPEAT",
			"Fase Berurutan",
			"Efisiensi Blok"
		],
		"concept": "Perulangan Beruntun: Menjalankan urutan perulangan kedua setelah perulangan pertama tuntas.",
		"achievement": {
			"id": "ach-lvl-17",
			"levelId": 17,
			"title": "Insinyur Loop Ganda",
			"description": "Satukan dua perulangan beruntun untuk memangkas jumlah blok instruksi.",
			"icon": "cpu",
			"xpReward": 45
		},
		"difficulty": 3,
		"challenges": [
			{
				"id": "lvl17-ch1",
				"title": "Langkah Lurus Ganda",
				"objective": "Maju 4 langkah dengan loop pertama, belok, lalu maju 4 langkah dengan loop kedua.",
				"pythonContext": "for i in range(4):\n    pybot.move()\npybot.turn_right()\nfor j in range(4):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 6,
				"maxMoves": 12,
				"xpReward": 40,
				"hints": [
					"Gunakan REPEAT pertama untuk menyusuri koridor atas sepanjang 4 langkah.",
					"Lakukan belok kanan tepat di tikungan, lalu gunakan REPEAT kedua untuk bergerak ke bawah."
				]
			},
			{
				"id": "lvl17-ch2",
				"title": "Manuver L-Besar Berbalik",
				"objective": "Bentuk rute huruf L panjang lalu putar balik ke sasaran bintang.",
				"pythonContext": "for i in range(3):\n    pybot.move()\n# belokan\nfor j in range(3):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 4,
						"y": 4
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 7,
				"maxMoves": 12,
				"xpReward": 45,
				"hints": [
					"Fase pertama bergerak lurus ke bawah menyusuri sisi kiri rintangan pilar.",
					"Belok kiri di sudut bawah, lalu gunakan loop kedua untuk melaju ke sisi kanan."
				]
			},
			{
				"id": "lvl17-ch3",
				"title": "Sapu Bersih Koridor Kembar",
				"objective": "Jalankan dua koridor sapu berulang untuk meraup seluruh koin arena.",
				"pythonContext": "for lap in range(2):\n    # koridor",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 9,
				"maxMoves": 22,
				"xpReward": 50,
				"hints": [
					"Rute ini melintasi tiga jalur horizontal bolak-balik.",
					"Kombinasikan loop langkah dengan belokan putar balik di setiap celah ujung."
				]
			}
		]
	},
	{
		"id": 18,
		"unitId": 4,
		"unitTitle": "Unit 4: Siklus Berulang & Labirin Berundak",
		"title": "Level 18: Koridor Cincin Luar",
		"description": "Patroli cincin terluar arena labirin dengan presisi navigasi sudut.",
		"objective": "Kelilingi cincin luar labirin tanpa terperosok ke rintangan tengah.",
		"quickTip": "Cincin luar membentuk jalur lingkaran perimeter yang mengelilingi seluruh arena.",
		"concepts": [
			"Cincin Luar",
			"Perimeter Patroli",
			"Simetri 4 Sudut"
		],
		"concept": "Navigasi Lingkar Luar: Mempertahankan posisi pada jalur tepian terluar arena matriks.",
		"achievement": {
			"id": "ach-lvl-18",
			"levelId": 18,
			"title": "Penjaga Cincin",
			"description": "Patroli penuh satu putaran cincin terluar labirin.",
			"icon": "circle",
			"xpReward": 50
		},
		"difficulty": 3,
		"challenges": [
			{
				"id": "lvl18-ch1",
				"title": "Setengah Cincin",
				"objective": "Susuri setengah putaran cincin dari sudut kiri atas ke kanan bawah.",
				"pythonContext": "for lap in range(2):\n    # sisi cincin",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 6,
				"maxMoves": 10,
				"xpReward": 45,
				"hints": [
					"Seluruh area tengah adalah rintangan pejal; hanya jalur pinggir yang dapat dilewati.",
					"Maju 4 langkah di koridor atas, belok kanan, lalu maju 4 langkah di koridor kanan."
				]
			},
			{
				"id": "lvl18-ch2",
				"title": "Cincin Tiga Sudut",
				"objective": "Lintasi 3 sudut cincin luar mengumpulkan koin hingga sampai di target.",
				"pythonContext": "for sudut in range(3):\n    # langkah & belok",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 5
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 6,
				"maxMoves": 18,
				"xpReward": 50,
				"hints": [
					"Pola setiap sisi cincin identik: melangkah 5 kali lalu belok kanan 90 derajat.",
					"Gunakan satu blok loop REPEAT 3 kali untuk menyelesaikan ketiga sisi."
				]
			},
			{
				"id": "lvl18-ch3",
				"title": "Putaran Cincin Menuju Pusat",
				"objective": "Kelilingi cincin luar lalu temukan celah lorong untuk masuk ke bintang inti.",
				"pythonContext": "for s in range(3):\n    # keliling\npybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 22,
				"xpReward": 55,
				"hints": [
					"Kumpulkan koin di tiga sudut luar sebelum membelok ke celah masuk lorong barat.",
					"Pintu masuk ke pusat terbuka di koordinat baris ketiga."
				]
			}
		]
	},
	{
		"id": 19,
		"unitId": 4,
		"unitTitle": "Unit 4: Siklus Berulang & Labirin Berundak",
		"title": "Level 19: Jalur Ombak Berirama",
		"description": "Pola gerakan naik dan turun berkelok seperti gelombang ombak lautan.",
		"objective": "Gunakan perulangan ritmis untuk menembus rintangan bergelombang.",
		"quickTip": "Satu gelombang ombak: Naik, Maju, Turun, Maju.",
		"concepts": [
			"Jalur Ombak",
			"Gelombang Berirama",
			"Loop Pola Berulang"
		],
		"concept": "Pergerakan Sinusoidal: Siklus naik dan turun berkala yang bergerak maju sepanjang sumbu.",
		"achievement": {
			"id": "ach-lvl-19",
			"levelId": 19,
			"title": "Penunggang Ombak",
			"description": "Jelajahi labirin gelombang ombak dengan ritme kode yang konsisten.",
			"icon": "wind",
			"xpReward": 50
		},
		"difficulty": 3,
		"challenges": [
			{
				"id": "lvl19-ch1",
				"title": "Dua Puncak Ombak",
				"objective": "Navigasi 2 kali siklus ombak naik-turun menembus pilar rintangan.",
				"pythonContext": "for ombak in range(2):\n    # siklus ombak",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 3
					},
					"startDirection": "UP",
					"targetPos": {
						"x": 5,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 3,
							"y": 0
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 45,
				"hints": [
					"Pilar berdiri di baris bawah; naik ke lorong atas untuk melewatinya.",
					"Pola naik-belok-turun-belok berulang dua kali menuju sisi kanan."
				]
			},
			{
				"id": "lvl19-ch2",
				"title": "Tiga Puncak Ombak Emas",
				"objective": "Lompati tiga puncak gelombang untuk mengamankan seluruh koin perak.",
				"pythonContext": "for p in range(3):\n    # puncak ombak",
				"grid": {
					"cols": 7,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 3
					},
					"startDirection": "UP",
					"targetPos": {
						"x": 6,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 5,
							"y": 3
						},
						{
							"x": 5,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 3,
							"y": 0
						},
						{
							"x": 5,
							"y": 0
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 20,
				"xpReward": 50,
				"hints": [
					"Setiap puncak ombak menyimpan satu koin di koordinat atasnya.",
					"Satu blok perulangan 3 kali cukup untuk menuntaskan seluruh gelombang."
				]
			},
			{
				"id": "lvl19-ch3",
				"title": "Ombak Berlawanan Arah",
				"objective": "Mulai dari puncak ombak dan menukik ke lembah untuk meraih bintang.",
				"pythonContext": "for lembah in range(2):\n    # lembah ombak",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 1
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 5,
						"y": 1
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 3,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 50,
				"hints": [
					"Arahkan robot turun melewati celah bawah pilar rintangan.",
					"Ambil koin di dasar lembah sebelum kembali naik ke jalur atas."
				]
			}
		]
	},
	{
		"id": 20,
		"unitId": 4,
		"unitTitle": "Unit 4: Siklus Berulang & Labirin Berundak",
		"title": "Level 20: Rintangan Silang Simetris",
		"description": "Pecahkan labirin bersilang dengan struktur rintangan 4 penjuru simetris.",
		"objective": "Gunakan simetri labirin untuk menyusun kode yang elegan dan efisien.",
		"quickTip": "Rintangan silang membagi arena menjadi 4 kuadran yang serupa.",
		"concepts": [
			"Simetri 4 Kuadran",
			"Pusat Silang",
			"Navigasi Kuadran"
		],
		"concept": "Simetri Spasial: Memanfaatkan kesamaan pola di setiap kuadran untuk mengulang logika navigasi.",
		"achievement": {
			"id": "ach-lvl-20",
			"levelId": 20,
			"title": "Master Simetri",
			"description": "Tembus empat kuadran labirin silang simetris dengan bintang penuh.",
			"icon": "crosshair",
			"xpReward": 55
		},
		"difficulty": 3,
		"challenges": [
			{
				"id": "lvl20-ch1",
				"title": "Menyeberang Palang Salib",
				"objective": "Lewati celah tepi luar untuk menyeberang dari kuadran kiri ke kuadran kanan.",
				"pythonContext": "pybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "UP",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 14,
				"xpReward": 45,
				"hints": [
					"Rintangan membentuk tanda tambah (+) besar di tengah arena.",
					"Gunakan koridor paling luar (baris atas atau bawah) untuk menyeberang."
				]
			},
			{
				"id": "lvl20-ch2",
				"title": "Koleksi Empat Kuadran",
				"objective": "Kunjungi 3 kuadran mengumpulkan koin sebelum menuju bintang tujuan.",
				"pythonContext": "for kuadran in range(3):\n    # keliling kuadran",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 1,
						"y": 4
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 4,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 7,
				"maxMoves": 16,
				"xpReward": 50,
				"hints": [
					"Bermanuverlah mengitari pilar tengah melewati kuadran kanan atas dan kanan bawah.",
					"Kumpulkan koin di sudut setiap kuadran yang dilalui."
				]
			},
			{
				"id": "lvl20-ch3",
				"title": "Pusat Palang Bintang",
				"objective": "Ambil koin di keempat sayap palang dan capai titik akhir penjelajahan.",
				"pythonContext": "for sayap in range(4):\n    # sayap silang",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 5
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 20,
				"xpReward": 55,
				"hints": [
					"Jalur tengah membentuk koridor berliku yang menghubungkan kedua sudut diagonal.",
					"Pilihlah rute luar untuk menjemput koin sebelum melangkah ke garis finish."
				]
			}
		]
	},
	{
		"id": 21,
		"unitId": 5,
		"unitTitle": "Unit 5: Navigasi Kompleks & Multi-Jalur",
		"title": "Level 21: Labirin Labyrinthine",
		"description": "Jelajahi labirin klasik dengan dinding bersekat dan lorong bercabang.",
		"objective": "Temukan jalur utama keluar dari sekat labirin klasik.",
		"quickTip": "Ikuti dinding sebelah kanan atau gunakan lorong utama untuk menghindari jalan buntu.",
		"concepts": [
			"Dinding Sekat",
			"Pemilihan Jalur",
			"Navigasi Labirin"
		],
		"concept": "Penelusuran Graf Labirin: Membedakan cabang buntu dan rute utama menuju target.",
		"achievement": {
			"id": "ach-lvl-21",
			"levelId": 21,
			"title": "Penjelajah Labirin Sejati",
			"description": "Temukan jalan keluar dari lorong bersekat labirin klasik.",
			"icon": "map",
			"xpReward": 55
		},
		"difficulty": 4,
		"challenges": [
			{
				"id": "lvl21-ch1",
				"title": "Lorong Sekat Sederhana",
				"objective": "Navigasi melewati sekat dinding vertikal untuk menjemput bintang.",
				"pythonContext": "pybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 5,
						"y": 0
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 4
						},
						{
							"x": 5,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 18,
				"xpReward": 50,
				"hints": [
					"Sekat pertama terbuka di bagian bawah; turunlah ke baris paling bawah untuk melewatinya.",
					"Sekat kedua terbuka di bagian atas; naik kembali untuk menyeberang ke sisi kanan."
				]
			},
			{
				"id": "lvl21-ch2",
				"title": "Celah Dinding Bertingkat Tiga",
				"objective": "Lewati tiga sekat vertikal berturut-turut untuk mengumpulkan seluruh koin.",
				"pythonContext": "for sekat in range(2):\n    # sekat",
				"grid": {
					"cols": 7,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 6,
						"y": 0
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 5,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 4
						},
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 6,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 24,
				"xpReward": 55,
				"hints": [
					"Pola naik-turun bergantian di setiap sekat dinding.",
					"Gunakan belokan terkoordinasi di setiap celah terbuka."
				]
			},
			{
				"id": "lvl21-ch3",
				"title": "Kamar Tersembunyi Bintang",
				"objective": "Masuki bilik tengah yang terkurung dinding untuk menyentuh Bintang Emas.",
				"pythonContext": "pybot.move()\npybot.turn_left()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 11,
				"maxMoves": 22,
				"xpReward": 60,
				"hints": [
					"Pintu masuk ke bilik tengah terbuka di sisi kiri (koordinat x=2, y=3).",
					"Kelilingi bagian luar arena sebelum berbelok masuk ke pintu bilik."
				]
			}
		]
	},
	{
		"id": 22,
		"unitId": 5,
		"unitTitle": "Unit 5: Navigasi Kompleks & Multi-Jalur",
		"title": "Level 22: Penjelajahan Kisi Terbuka",
		"description": "Bermanuver di antara pilar-pilar rintangan terisolasi pada arena luas.",
		"objective": "Pilih lintasan paling efisien di antara deretan tiang rintangan.",
		"quickTip": "Banyak jalur terbuka tersedia; cari jalur dengan langkah belokan paling sedikit.",
		"concepts": [
			"Kisi Matriks",
			"Pilar Terisolasi",
			"Jalur Optimal"
		],
		"concept": "Optimasi Rute Bebas: Memilih lintasan berbobot terendah pada ruang bebas rintangan.",
		"achievement": {
			"id": "ach-lvl-22",
			"levelId": 22,
			"title": "Penjelajah Bebas",
			"description": "Temukan lintasan terpendek di antara pilar labirin kisi terbuka.",
			"icon": "grid",
			"xpReward": 55
		},
		"difficulty": 4,
		"challenges": [
			{
				"id": "lvl22-ch1",
				"title": "Empat Pilar Kisi",
				"objective": "Lewati lorong tengah di antara empat pilar terpisah menuju bintang.",
				"pythonContext": "for step in range(4):\n    pybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 2,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 6,
				"maxMoves": 12,
				"xpReward": 50,
				"hints": [
					"Koridor tengah pada baris y=2 sepenuhnya lurus dan bebas rintangan.",
					"Anda dapat melaju langsung ke target atau berbelok untuk mengambil koin samping."
				]
			},
			{
				"id": "lvl22-ch2",
				"title": "Matriks Sembilan Tiang",
				"objective": "Slalom di antara deretan tiang matriks untuk mengamankan koin emas.",
				"pythonContext": "pybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 5
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 3,
							"y": 5
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 4,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 55,
				"hints": [
					"Tiang-tiang tersusun pada kolom ganjil; gunakan kolom genap sebagai koridor bebas.",
					"Bergeraklah secara diagonal bertahap menyusuri ruang antar tiang."
				]
			},
			{
				"id": "lvl22-ch3",
				"title": "Jalan Tol Tepi Bebas",
				"objective": "Gunakan koridor tepi bebas hambatan untuk melesat cepat ke target.",
				"pythonContext": "for i in range(5):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 0
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 4,
				"maxMoves": 8,
				"xpReward": 55,
				"hints": [
					"Koridor baris paling atas bebas dari seluruh rintangan.",
					"Cukup satu blok pengulangan langkah maju untuk mencapai bintang di ujung kanan."
				]
			}
		]
	},
	{
		"id": 23,
		"unitId": 5,
		"unitTitle": "Unit 5: Navigasi Kompleks & Multi-Jalur",
		"title": "Level 23: Rute Berliku Dua Arah",
		"description": "Kuasai rute berliku bolak-balik dengan tikungan tajam dan perubahan arah mendadak.",
		"objective": "Kendalikan PyBot melalui belokan tajam 180 derajat yang berurutan.",
		"quickTip": "Perhatikan arah hadap setelah belok kedua agar tidak salah melangkah.",
		"concepts": [
			"Tikungan Tajam",
			"Perubahan Arah",
			"Kendali Hadap"
		],
		"concept": "Orientasi Relatif: Memahami bahwa belok kiri dan kanan bergantung pada orientasi robot saat itu.",
		"achievement": {
			"id": "ach-lvl-23",
			"levelId": 23,
			"title": "Pengendali Tikungan",
			"description": "Kuasai tikungan tajam berliku dengan orientasi arah sempurna.",
			"icon": "navigation",
			"xpReward": 60
		},
		"difficulty": 4,
		"challenges": [
			{
				"id": "lvl23-ch1",
				"title": "Lorong Berliku Tiga Lipat",
				"objective": "Navigasi lorong berbentuk akordeon 3 lipatan.",
				"pythonContext": "for lap in range(3):\n    # lipatan",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 5,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 9,
				"maxMoves": 22,
				"xpReward": 55,
				"hints": [
					"Telusuri lorong atas ke kanan, lorong tengah ke kiri, dan lorong bawah ke kanan.",
					"Belok kanan di ujung pertama dan belok kiri di ujung kedua."
				]
			},
			{
				"id": "lvl23-ch2",
				"title": "Labirin Huruf W",
				"objective": "Ikuti jalur naik dan turun berulang menyerupai huruf W.",
				"pythonContext": "for v in range(2):\n    # pola V",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 5,
						"y": 0
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 4
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 4,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 20,
				"xpReward": 60,
				"hints": [
					"Turun di kolom pertama, naik di kolom kedua, turun di kolom ketiga, lalu naik ke target.",
					"Gunakan celah di baris atas dan baris bawah untuk berbelok."
				]
			},
			{
				"id": "lvl23-ch3",
				"title": "Sirkuit Lingkar Ular",
				"objective": "Selesaikan sirkuit berkelok penuh rintangan untuk mencapai target emas.",
				"pythonContext": "pybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 11,
				"maxMoves": 24,
				"xpReward": 60,
				"hints": [
					"Rute melingkar dari luar menuju lorong dalam.",
					"Pastikan selalu memperhatikan belokan siku di setiap dinding rintangan."
				]
			}
		]
	},
	{
		"id": 24,
		"unitId": 5,
		"unitTitle": "Unit 5: Navigasi Kompleks & Multi-Jalur",
		"title": "Level 24: Manuver Sempit 3-Star",
		"description": "Navigasi lorong sempit selebar 1 sel dengan rintangan padat di kedua sisi.",
		"objective": "Lalui koridor sempit presisi tanpa ada kesalahan langkah satupun.",
		"quickTip": "Di lorong 1 sel tidak ada ruang untuk berbelok salah; periksa kode sebelum RUN.",
		"concepts": [
			"Lorong 1-Sel",
			"Presisi Langkah",
			"Tanpa Toleransi Salah"
		],
		"concept": "Toleransi Nol: Eksekusi instruksi yang membutuhkan akurasi koordinat mutlak.",
		"achievement": {
			"id": "ach-lvl-24",
			"levelId": 24,
			"title": "Pembalap Presisi",
			"description": "Tembus koridor 1-sel sempit dengan akurasi 100%.",
			"icon": "target",
			"xpReward": 60
		},
		"difficulty": 4,
		"challenges": [
			{
				"id": "lvl24-ch1",
				"title": "Celah Sempit Tunggal",
				"objective": "Lewati celah lorong 1-sel di antara dua blok rintangan besar.",
				"pythonContext": "for step in range(4):\n    pybot.move()",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 0
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 3,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 4,
				"maxMoves": 8,
				"xpReward": 55,
				"hints": [
					"Koridor pada baris y=2 adalah satu-satunya jalan tembus lurus.",
					"Maju lurus 5 langkah menggunakan blok pengulangan."
				]
			},
			{
				"id": "lvl24-ch2",
				"title": "Sudut Siku 1-Sel",
				"objective": "Belok di lorong sempit tanpa menyentuh dinding yang menghimpit.",
				"pythonContext": "pybot.move()\npybot.turn_right()\npybot.move()",
				"grid": {
					"cols": 5,
					"rows": 5,
					"startPos": {
						"x": 1,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 4,
						"y": 3
					},
					"obstacles": [
						{
							"x": 0,
							"y": 0
						},
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 0,
							"y": 3
						},
						{
							"x": 0,
							"y": 4
						},
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 7,
				"maxMoves": 10,
				"xpReward": 60,
				"hints": [
					"Turun sampai persimpangan siku di y=3 sebelum membelok ke arah kanan.",
					"Hati-hati, dinding menghimpit di kedua sisi koridor."
				]
			},
			{
				"id": "lvl24-ch3",
				"title": "Labirin Sempit Bertingkat",
				"objective": "Lintasi lorong sempit zig-zag dan raih Bintang Emas di ujung lintasan.",
				"pythonContext": "for i in range(2):\n    # manuver sempit",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 4,
						"y": 5
					},
					"obstacles": [
						{
							"x": 0,
							"y": 0
						},
						{
							"x": 0,
							"y": 1
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 0,
							"y": 3
						},
						{
							"x": 0,
							"y": 4
						},
						{
							"x": 0,
							"y": 5
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 5,
							"y": 3
						},
						{
							"x": 5,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 4,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 18,
				"xpReward": 65,
				"hints": [
					"Langkah navigasi membutuhkan belokan bergantian di celah-celah terbuka.",
					"Jaga arah hadap robot selalu sejajar dengan lorong lorong sempit."
				]
			}
		]
	},
	{
		"id": 25,
		"unitId": 5,
		"unitTitle": "Unit 5: Navigasi Kompleks & Multi-Jalur",
		"title": "Level 25: Pola Kunci Labirin",
		"description": "Pecahkan labirin bergerigi menyerupai bentuk gerigi anak kunci.",
		"objective": "Gunakan pola berulang gerigi kunci untuk menembus ke ruang utama.",
		"quickTip": "Setiap gerigi kunci memiliki ukuran dan jarak langkah yang identik.",
		"concepts": [
			"Gerigi Kunci",
			"Pola Berulang Simetris",
			"Logika Berantai"
		],
		"concept": "Rancangan Modular: Memecah labirin kompleks menjadi modul-modul gerigi kecil.",
		"achievement": {
			"id": "ach-lvl-25",
			"levelId": 25,
			"title": "Pemegang Kunci Utama",
			"description": "Buka seluruh gerigi labirin kunci dan bebaskan bintang.",
			"icon": "key",
			"xpReward": 65
		},
		"difficulty": 4,
		"challenges": [
			{
				"id": "lvl25-ch1",
				"title": "Gerigi Kunci Tunggal",
				"objective": "Telusuri satu lekukan gerigi kunci untuk melewati dinding pembatas.",
				"pythonContext": "pybot.turn_left()\npybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 12,
				"xpReward": 60,
				"hints": [
					"Dinding penghalang di y=2 mengharuskan robot naik ke gerigi atas (y=1).",
					"Belok kiri untuk naik, maju melewati puncak gerigi, lalu belok kanan untuk turun kembali."
				]
			},
			{
				"id": "lvl25-ch2",
				"title": "Kunci Bergigi Dua",
				"objective": "Lompati dua tonjolan gerigi kunci menggunakan blok loop berulang.",
				"pythonContext": "for gigi in range(2):\n    # siklus gigi kunci",
				"grid": {
					"cols": 7,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 3
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 6,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 5,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 65,
				"hints": [
					"Kedua tonjolan gerigi memiliki pola langkah yang persis sama.",
					"Cukup buat satu siklus lompatan gerigi lalu ulangi sebanyak 2 kali."
				]
			},
			{
				"id": "lvl25-ch3",
				"title": "Master Key: Kunci Emas Terakhir",
				"objective": "Taklukkan tiga gerigi kunci beruntun dan ambil bintang kebanggaan.",
				"pythonContext": "for g in range(3):\n    # master key",
				"grid": {
					"cols": 7,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 4
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 6,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 5,
							"y": 4
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 3,
							"y": 5
						},
						{
							"x": 5,
							"y": 5
						}
					],
					"coins": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 18,
				"xpReward": 70,
				"hints": [
					"Pola berulang terdiri dari: belok kiri, maju 2 langkah, belok kanan, maju, belok kanan, maju 2 langkah, belok kiri.",
					"Satu blok loop REPEAT 3 kali akan menyelesaikan ketiga gerigi secara sempurna."
				]
			}
		]
	},
	{
		"id": 26,
		"unitId": 6,
		"unitTitle": "Unit 6: Master Algoritma & Puncak PyQuest",
		"title": "Level 26: Lintasan Helix",
		"description": "Pusaran spiral ganda helix dengan lorong melingkar berlapis.",
		"objective": "Ikuti jalur spiral berlapis menuju titik pusat helix.",
		"quickTip": "Setiap putaran mengikis jarak langkah maju sebelum belokan berikutnya.",
		"concepts": [
			"Helix Spiral",
			"Pusaran Bertingkat",
			"Presisi Putaran"
		],
		"concept": "Lintasan Helix: Kurva berputar berkesinambungan yang mendekat ke inti sasaran.",
		"achievement": {
			"id": "ach-lvl-26",
			"levelId": 26,
			"title": "Penjelajah Helix",
			"description": "Taklukkan pusaran spiral ganda lintasan helix.",
			"icon": "disc",
			"xpReward": 70
		},
		"difficulty": 5,
		"challenges": [
			{
				"id": "lvl26-ch1",
				"title": "Pusaran Helix Luar",
				"objective": "Masuki lingkaran helix lapis pertama menuju koin dan target.",
				"pythonContext": "pybot.move()\npybot.turn_right()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 2,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						},
						{
							"x": 1,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 24,
				"xpReward": 65,
				"hints": [
					"Susuri 3 sisi terluar searah jarum jam untuk mengumpulkan koin.",
					"Masuk ke celah lapis dalam di koordinat kanan bawah untuk meraih bintang."
				]
			},
			{
				"id": "lvl26-ch2",
				"title": "Pusaran Helix Lapis Dua",
				"objective": "Telusuri dua putaran penuh spiral ke dalam inti labirin.",
				"pythonContext": "for lap in range(2):\n    # putaran helix",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 5,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						},
						{
							"x": 0,
							"y": 0
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 11,
				"maxMoves": 26,
				"xpReward": 70,
				"hints": [
					"Mulailah dari sisi timur bergerak ke selatan.",
					"Lakukan belokan kanan bertahap mengelilingi dinding sekat berlapis."
				]
			},
			{
				"id": "lvl26-ch3",
				"title": "Inti Helix Emas",
				"objective": "Kumpulkan koin di setiap putaran helix dan sentuh Bintang Utama.",
				"pythonContext": "for step in range(4):\n    # langkah helix",
				"grid": {
					"cols": 7,
					"rows": 7,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 2,
							"y": 5
						},
						{
							"x": 4,
							"y": 5
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 5,
							"y": 3
						},
						{
							"x": 5,
							"y": 4
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 6,
							"y": 0
						},
						{
							"x": 6,
							"y": 6
						},
						{
							"x": 0,
							"y": 6
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 12,
				"maxMoves": 32,
				"xpReward": 75,
				"hints": [
					"Arena 7x7 ini membutuhkan navigasi spiral berlapis 2 tingkat.",
					"Pintu masuk ke bilik pusat (3,3) berada di sisi selatan."
				]
			}
		]
	},
	{
		"id": 27,
		"unitId": 6,
		"unitTitle": "Unit 6: Master Algoritma & Puncak PyQuest",
		"title": "Level 27: Rute Ular Berpola",
		"description": "Jalur berliku padat horizontal menyerupai permainan Snake klasik.",
		"objective": "Susuri setiap baris arena dari ujung ke ujung tanpa menabrak.",
		"quickTip": "Pola ular berganti arah belokan di setiap ujung baris (kanan-kiri-kanan-kiri).",
		"concepts": [
			"Jalur Ular Snake",
			"Sapu Matriks Penuh",
			"Algoritma Pemindaian"
		],
		"concept": "Raster Scan: Memindai seluruh bidang matriks secara baris demi baris berkesinambungan.",
		"achievement": {
			"id": "ach-lvl-27",
			"levelId": 27,
			"title": "Pawang Ular",
			"description": "Selesaikan pemindaian matriks ular penuh tanpa tersesat.",
			"icon": "terminal",
			"xpReward": 70
		},
		"difficulty": 5,
		"challenges": [
			{
				"id": "lvl27-ch1",
				"title": "Ular Pendek 3-Baris",
				"objective": "Susuri 3 baris secara bolak-balik dari kiri ke kanan lalu kembali ke kiri.",
				"pythonContext": "for baris in range(2):\n    # sapu baris",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 5,
							"y": 3
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 16,
				"xpReward": 65,
				"hints": [
					"Maju 5 langkah di baris atas, belok kanan 2 kali di ujung untuk turun, lalu kembali ke kiri.",
					"Gunakan dinding pembatas tengah sebagai pemandu lorong."
				]
			},
			{
				"id": "lvl27-ch2",
				"title": "Ular Panjang 4-Baris",
				"objective": "Lintasi 4 baris beruntun menyapu koin di setiap tikungan lorong.",
				"pythonContext": "for u in range(3):\n    # tikungan ular",
				"grid": {
					"cols": 6,
					"rows": 5,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 5,
						"y": 4
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 0,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 26,
				"xpReward": 70,
				"hints": [
					"Ujung kanan baris 0 berbelok ke baris 2 melalui celah timur.",
					"Ujung kiri baris 2 berbelok ke baris 4 melalui celah barat."
				]
			},
			{
				"id": "lvl27-ch3",
				"title": "Sapu Matriks Grand Ular",
				"objective": "Sapu seluruh arena 6x6 dengan rute ular sempurna dan raih bintang akhir.",
				"pythonContext": "for lap in range(4):\n    # grand snake",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 5
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 0,
							"y": 2
						},
						{
							"x": 5,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 11,
				"maxMoves": 28,
				"xpReward": 75,
				"hints": [
					"Gunakan kombinasi loop terstruktur untuk melintasi setiap lorong.",
					"Perhatikan arah hadap robot di setiap akhir baris agar belokan tidak terbalik."
				]
			}
		]
	},
	{
		"id": 28,
		"unitId": 6,
		"unitTitle": "Unit 6: Master Algoritma & Puncak PyQuest",
		"title": "Level 28: Labirin Benteng Berdinding",
		"description": "Dinding benteng berlapis tebal dengan parit pertahanan dan gerbang tunggal.",
		"objective": "Cari celah gerbang benteng untuk menyusup ke ruang takhta bintang.",
		"quickTip": "Benteng memiliki dinding ganda; gerbang masuk terletak di koordinat tertentu.",
		"concepts": [
			"Dinding Benteng",
			"Gerbang Tunggal",
			"Penyusupan Taktis"
		],
		"concept": "Struktur Berlapis: Melewati batas konsentris untuk mencapai inti pertahanan labirin.",
		"achievement": {
			"id": "ach-lvl-28",
			"levelId": 28,
			"title": "Penembus Benteng",
			"description": "Bobol gerbang benteng dan taklukkan labirin pertahanan puncak.",
			"icon": "shield",
			"xpReward": 75
		},
		"difficulty": 5,
		"challenges": [
			{
				"id": "lvl28-ch1",
				"title": "Gerbang Parit Luar",
				"objective": "Seberangi parit luar benteng melalui jembatan celah tunggal.",
				"pythonContext": "pybot.move()\npybot.turn_left()",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 2
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 2
					},
					"obstacles": [
						{
							"x": 2,
							"y": 0
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 2,
							"y": 5
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 0
						},
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 4,
							"y": 4
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 8,
				"maxMoves": 14,
				"xpReward": 70,
				"hints": [
					"Parit dinding memotong kolom 2 secara vertikal; hanya koordinat y=2 yang terbuka sebagai gerbang.",
					"Maju lurus menembus gerbang sebelum bermanuver di dalam halaman benteng."
				]
			},
			{
				"id": "lvl28-ch2",
				"title": "Menara Sudut Benteng",
				"objective": "Taklukkan 3 menara sudut benteng dan kumpulkan koin perbendaharaan.",
				"pythonContext": "for menara in range(3):\n    # patroli menara",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 0,
						"y": 4
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 5,
							"y": 0
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 0,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 22,
				"xpReward": 75,
				"hints": [
					"Benteng persegi berada di tengah; jalan keliling perimeter luar sepenuhnya terbuka.",
					"Sapu koin di menara-menara sudut luar sebelum menuju titik target."
				]
			},
			{
				"id": "lvl28-ch3",
				"title": "Ruang Takhta Bintang",
				"objective": "Masuki gerbang terdalam benteng dan rebut Bintang Emas Kerajaan.",
				"pythonContext": "for s in range(2):\n    # masuk takhta",
				"grid": {
					"cols": 7,
					"rows": 7,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 5,
							"y": 4
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 2,
							"y": 5
						},
						{
							"x": 4,
							"y": 5
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 6,
							"y": 0
						},
						{
							"x": 6,
							"y": 6
						},
						{
							"x": 0,
							"y": 6
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 12,
				"maxMoves": 28,
				"xpReward": 80,
				"hints": [
					"Gerbang benteng luar terbuka di selatan pada koordinat x=3, y=5.",
					"Setelah masuk benteng luar, pintu takhta terbuka menuju koordinat tengah (3,3)."
				]
			}
		]
	},
	{
		"id": 29,
		"unitId": 6,
		"unitTitle": "Unit 6: Master Algoritma & Puncak PyQuest",
		"title": "Level 29: Labirin Quantum PyBot",
		"description": "Ujian presisi tinggi dengan labirin kisi berpola mikro dan rute optimal tunggal.",
		"objective": "Gunakan optimasi instruksi tertinggi untuk menyelesaikan labirin quantum.",
		"quickTip": "Hanya ada satu rute paling efisien; hitung langkah dan belokan dengan cermat.",
		"concepts": [
			"Jalur Optimal Tunggal",
			"Logika Quantum",
			"Efisiensi Maksimal"
		],
		"concept": "Kompleksitas Minimal: Menemukan algoritma penyelesaian dengan komputasi paling hemat energi.",
		"achievement": {
			"id": "ach-lvl-29",
			"levelId": 29,
			"title": "Pemikir Quantum",
			"description": "Pecahkan labirin quantum dengan rute matematis paling presisi.",
			"icon": "cpu",
			"xpReward": 80
		},
		"difficulty": 5,
		"challenges": [
			{
				"id": "lvl29-ch1",
				"title": "Kisi Gerbang Quantum",
				"objective": "Bermanuver melewati gerbang logika quantum bersusun.",
				"pythonContext": "for q in range(2):\n    # gerbang quantum",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "DOWN",
					"targetPos": {
						"x": 5,
						"y": 5
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 0
						},
						{
							"x": 4,
							"y": 1
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 5
						},
						{
							"x": 2,
							"y": 0
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 9,
				"maxMoves": 18,
				"xpReward": 75,
				"hints": [
					"Jalur berkelok membentuk lintasan S vertikal melewati kolom-kolom gerbang.",
					"Ambil koin di sudut kiri bawah sebelum menembus lorong tengah ke arah kanan."
				]
			},
			{
				"id": "lvl29-ch2",
				"title": "Resonansi Sirkuit",
				"objective": "Aktifkan koin di 3 simpul sirkuit dan selesaikan rangkaian di bintang.",
				"pythonContext": "for node in range(3):\n    # simpul sirkuit",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 1,
						"y": 1
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 4,
						"y": 4
					},
					"obstacles": [
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 3,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 1,
							"y": 2
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 18,
				"xpReward": 80,
				"hints": [
					"Hubungkan simpul-simpul koin mengikuti alur sirkuit terbuka.",
					"Gunakan belokan terencana agar tidak berputar balik di tempat yang sama."
				]
			},
			{
				"id": "lvl29-ch3",
				"title": "Fluktuasi Quantum Puncak",
				"objective": "Navigasi labirin kisi quantum penuh tanpa meleset 1 koordinat pun.",
				"pythonContext": "for lap in range(3):\n    # fluktuasi",
				"grid": {
					"cols": 7,
					"rows": 7,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 6,
						"y": 6
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 1,
							"y": 3
						},
						{
							"x": 3,
							"y": 3
						},
						{
							"x": 5,
							"y": 3
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 2,
							"y": 5
						},
						{
							"x": 4,
							"y": 5
						},
						{
							"x": 5,
							"y": 5
						}
					],
					"coins": [
						{
							"x": 6,
							"y": 0
						},
						{
							"x": 0,
							"y": 6
						},
						{
							"x": 3,
							"y": 0
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 12,
				"maxMoves": 26,
				"xpReward": 85,
				"hints": [
					"Matriks rintangan teratur di baris ganjil; gunakan baris genap sebagai lorong tol bebas hambatan.",
					"Kumpulkan koin di sudut seberang sebelum menyentuh bintang terminal."
				]
			}
		]
	},
	{
		"id": 30,
		"unitId": 6,
		"unitTitle": "Unit 6: Master Algoritma & Puncak PyQuest",
		"title": "Level 30: Tantangan Puncak PyQuest",
		"description": "Tantangan puncak tertinggi PyQuest: mahakarya algoritma navigasi robot!",
		"objective": "Buktikan penguasaan penuh seluruh konsep blok koding di arena grandmaster.",
		"quickTip": "Gunakan seluruh ilmu: loop berulang, perhitungan belokan, dan pemanfaatan koin efisien.",
		"concepts": [
			"Grandmaster PyQuest",
			"Sintesis Menyeluruh",
			"Mahakarya Algoritma"
		],
		"concept": "Puncak Algoritma: Mengintegrasikan seluruh konsep pemrograman blok dalam satu solusi terpadu.",
		"achievement": {
			"id": "ach-lvl-30",
			"levelId": 30,
			"title": "Grandmaster Pemrograman PyQuest",
			"description": "Tuntaskan seluruh 30 level petualangan labirin PyBot!",
			"icon": "award",
			"xpReward": 100
		},
		"difficulty": 5,
		"challenges": [
			{
				"id": "lvl30-ch1",
				"title": "Gerbang Kehormatan PyMaster",
				"objective": "Lewati gerbang mahkota agung dan kumpulkan koin persembahan pertama.",
				"pythonContext": "for gerbang in range(3):\n    # gerbang agung",
				"grid": {
					"cols": 6,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 5
					},
					"startDirection": "UP",
					"targetPos": {
						"x": 5,
						"y": 0
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 3,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 0,
							"y": 0
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 5,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 10,
				"maxMoves": 22,
				"xpReward": 80,
				"hints": [
					"Maju ke utara di kolom paling kiri untuk mengambil koin kehormatan.",
					"Belok ke timur menyusuri koridor atas untuk mencapai bintang di sudut kanan atas."
				]
			},
			{
				"id": "lvl30-ch2",
				"title": "Mahkota Juara PyQuest",
				"objective": "Navigasi labirin berbentuk mahkota kaisar koding dan ambil koin permata.",
				"pythonContext": "for mahkota in range(4):\n    # mahkota juara",
				"grid": {
					"cols": 7,
					"rows": 6,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 2
					},
					"obstacles": [
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 2,
							"y": 2
						},
						{
							"x": 4,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 2,
							"y": 4
						},
						{
							"x": 3,
							"y": 4
						},
						{
							"x": 4,
							"y": 4
						},
						{
							"x": 5,
							"y": 4
						}
					],
					"coins": [
						{
							"x": 6,
							"y": 0
						},
						{
							"x": 0,
							"y": 5
						},
						{
							"x": 6,
							"y": 5
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 11,
				"maxMoves": 26,
				"xpReward": 90,
				"hints": [
					"Bintang mahkota bersinar tepat di atas takhta tengah (3,2).",
					"Kelilingi tepi luar terlebih dahulu sebelum masuk melalui celah atas mahkota."
				]
			},
			{
				"id": "lvl30-ch3",
				"title": "Ujian Terakhir: Grandmaster PyBot",
				"objective": "Tuntaskan misi terakbar: ambil seluruh koin legendaris dan sentuh Bintang Abadi!",
				"pythonContext": "for grand in range(4):\n    # grandmaster",
				"grid": {
					"cols": 7,
					"rows": 7,
					"startPos": {
						"x": 0,
						"y": 0
					},
					"startDirection": "RIGHT",
					"targetPos": {
						"x": 3,
						"y": 3
					},
					"obstacles": [
						{
							"x": 1,
							"y": 1
						},
						{
							"x": 2,
							"y": 1
						},
						{
							"x": 4,
							"y": 1
						},
						{
							"x": 5,
							"y": 1
						},
						{
							"x": 1,
							"y": 2
						},
						{
							"x": 5,
							"y": 2
						},
						{
							"x": 1,
							"y": 4
						},
						{
							"x": 5,
							"y": 4
						},
						{
							"x": 1,
							"y": 5
						},
						{
							"x": 2,
							"y": 5
						},
						{
							"x": 4,
							"y": 5
						},
						{
							"x": 5,
							"y": 5
						},
						{
							"x": 2,
							"y": 3
						},
						{
							"x": 4,
							"y": 3
						}
					],
					"coins": [
						{
							"x": 6,
							"y": 0
						},
						{
							"x": 6,
							"y": 6
						},
						{
							"x": 0,
							"y": 6
						},
						{
							"x": 3,
							"y": 1
						}
					]
				},
				"availableBlocks": [
					"REPEAT",
					"MOVE",
					"TURN_LEFT",
					"TURN_RIGHT",
					"FOREVER"
				],
				"maxBlocks": 12,
				"maxMoves": 32,
				"xpReward": 150,
				"hints": [
					"Empat sudut arena menyimpan empat koin legendaris.",
					"Setelah menyapu perimeter luar, pintu masuk ke Bintang Abadi terbuka dari sisi utara takhta."
				]
			}
		]
	}
];
