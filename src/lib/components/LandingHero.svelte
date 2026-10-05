<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		onStartLearning,
		onStartCodingGame
	}: {
		onStartLearning: () => void;
		onStartCodingGame: () => void;
	} = $props();
</script>

<div class="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl mx-auto my-auto text-center">
	<!-- Hero Badge -->
	<div class="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
		<Icon name="python" size={16} class="text-indigo-400" />
		<span>Dasar Pemrograman Python</span>
	</div>

	<!-- Main Title -->
	<h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
		Pelajari Logika Pemrograman <br class="hidden sm:inline" />
		<span class="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-300 bg-clip-text text-transparent">
			Melalui Soal & Game Labirin
		</span>
	</h1>

	<!-- Subtitle -->
	<p class="text-slate-300 text-sm sm:text-base max-w-2xl mb-8 leading-relaxed">
		Pilih jalur belajarmu: latih pemahaman sintaksis Python lewat bank soal terstruktur atau kendalikan PyBot menyelesaikan 10 level tantangan puzzle labirin 2D.
	</p>

	<!-- Mode Choices: Two Clear Portals -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl mb-10 text-left">
		<!-- Mode A: Learning Questions -->
		<button
			type="button"
			onclick={onStartLearning}
			class="group p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 shadow-xl transition-all duration-200 hover:-translate-y-1 text-left flex flex-col justify-between cursor-pointer"
		>
			<div>
				<div class="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
					<Icon name="book-open" size={24} />
				</div>
				<h2 class="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
					Modul Belajar Python
				</h2>
				<p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
					50 soal latihan mencakup variabel, fungsi <code class="text-indigo-300">print()</code>, tipe data, percabangan <code class="text-indigo-300">if-else</code>, dan perulangan loop.
				</p>
			</div>

			<div class="mt-6 flex items-center justify-between text-xs font-bold text-indigo-400 pt-3 border-t border-slate-800">
				<span>Mulai Belajar Soal</span>
				<Icon name="chevron-right" size={16} class="group-hover:translate-x-1 transition-transform" />
			</div>
		</button>

		<!-- Mode B: Coding Game -->
		<button
			type="button"
			onclick={onStartCodingGame}
			class="group p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 shadow-xl transition-all duration-200 hover:-translate-y-1 text-left flex flex-col justify-between cursor-pointer"
		>
			<div>
				<div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
					<Icon name="gamepad" size={24} />
				</div>
				<h2 class="text-lg font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
					Main Coding Game
				</h2>
				<p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
					Selesaikan 10 level labirin (30 misi) menggunakan balok instruksi seperti MAJU, BELOK, dan REPEAT untuk mengarahkan PyBot.
				</p>
			</div>

			<div class="mt-6 flex items-center justify-between text-xs font-bold text-emerald-400 pt-3 border-t border-slate-800">
				<span>Pilih Level Game</span>
				<Icon name="chevron-right" size={16} class="group-hover:translate-x-1 transition-transform" />
			</div>
		</button>
	</div>

	<!-- Small Educational Footnote -->
	<div class="flex items-center gap-2 text-xs text-slate-500">
		<Icon name="shield-check" size={14} class="text-slate-400" />
		<span>Progres otomatis tersimpan di browsermu</span>
	</div>
</div>
