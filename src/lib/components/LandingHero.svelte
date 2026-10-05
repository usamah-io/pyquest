<script lang="ts">
	let { onStart }: { onStart: () => void } = $props();
</script>

<div class="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center max-w-4xl mx-auto my-auto">
	<!-- Hero Icon / Avatar -->
	<div class="relative mb-6">
		<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-amber-400 p-1 shadow-2xl shadow-indigo-500/30 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
			<div class="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-5xl sm:text-6xl select-none">
				🤖
			</div>
		</div>
		<div class="absolute -top-2 -right-2 px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-md animate-bounce">
			BARU!
		</div>
	</div>

	<!-- Title & Subtitle -->
	<h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
		Petualangan Koding Python <br />
		<span class="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
			Untuk Petualang Muda!
		</span>
	</h1>

	<p class="text-slate-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
		Pelajari logika dasar Python tanpa rasa takut. Jawab pertanyaan seru, susun balok kode visual seperti Scratch, dan gerakkan robot <strong class="text-indigo-300">PyBot</strong> untuk mengumpulkan bintang emas!
	</p>

	<!-- Feature Highlights (3 Cards) -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10 text-left">
		<div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-indigo-500/40 transition-colors">
			<div class="text-2xl mb-2">💡</div>
			<h2 class="font-bold text-white text-sm mb-1">Pertanyaan Interaktif</h2>
			<p class="text-xs text-slate-400">Pahami variabel, teks (string), dan loop lewat pertanyaan bergambar ramah anak.</p>
		</div>

		<div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-purple-500/40 transition-colors">
			<div class="text-2xl mb-2">🧩</div>
			<h2 class="font-bold text-white text-sm mb-1">Balok Kode Visual</h2>
			<p class="text-xs text-slate-400">Susun perintah balok yang langsung diterjemahkan menjadi kode Python asli.</p>
		</div>

		<div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-amber-500/40 transition-colors">
			<div class="text-2xl mb-2">🎮</div>
			<h2 class="font-bold text-white text-sm mb-1">Dunia Game 2D</h2>
			<p class="text-xs text-slate-400">Jalankan kodemu dan lihat PyBot bergerak menelusuri arena teka-teki labirin.</p>
		</div>
	</div>

	<!-- Start Button -->
	<button
		type="button"
		onclick={onStart}
		class="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3 cursor-pointer ring-4 ring-indigo-500/20"
	>
		<span>🚀 Mulai Petualangan Sekarang!</span>
	</button>
</div>
