<script lang="ts">
	import type { UserProgress } from '$lib/types';
	import Icon from './Icon.svelte';

	let {
		progress,
		onBackToHome,
		onRestart
	}: {
		progress: UserProgress;
		onBackToHome: () => void;
		onRestart: () => void;
	} = $props();
</script>

<div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 max-w-2xl mx-auto w-full text-center">
	<div class="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/10">
		<!-- Award Badge Icon -->
		<div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-400 p-1 mb-6 shadow-xl shadow-amber-500/20">
			<div class="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-amber-400">
				<Icon name="trophy" size={44} />
			</div>
		</div>

		<h1 class="text-2xl sm:text-3xl font-black text-white mb-2">
			Selamat! Modul Telah Selesai
		</h1>
		<p class="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
			Kamu telah berhasil membuktikan pemahaman konsep pemrograman Python dan menyelesaikan misi tantangan koding PyBot.
		</p>

		<!-- Statistics Summary -->
		<div class="grid grid-cols-3 gap-3 mb-8">
			<div class="bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
				<div class="text-xl sm:text-2xl font-black text-amber-400">{progress.xp}</div>
				<div class="text-[10px] text-slate-400 font-bold uppercase mt-1">Total XP</div>
			</div>
			<div class="bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
				<div class="text-xl sm:text-2xl font-black text-emerald-400">{progress.completedQuestions.length}</div>
				<div class="text-[10px] text-slate-400 font-bold uppercase mt-1">Soal Selesai</div>
			</div>
			<div class="bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
				<div class="text-xl sm:text-2xl font-black text-indigo-400">{progress.completedChallenges.length}</div>
				<div class="text-[10px] text-slate-400 font-bold uppercase mt-1">Tantangan Game</div>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
			<button
				type="button"
				onclick={onBackToHome}
				class="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
			>
				<Icon name="book-open" size={16} />
				<span>Kembali ke Beranda</span>
			</button>
			<button
				type="button"
				onclick={onRestart}
				class="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
			>
				<Icon name="rotate-ccw" size={15} />
				<span>Ulangi Petualangan</span>
			</button>
		</div>
	</div>
</div>
