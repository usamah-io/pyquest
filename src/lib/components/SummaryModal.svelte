<script lang="ts">
	import type { UserProgress } from '$lib/types';

	let {
		progress,
		onRestart
	}: {
		progress: UserProgress;
		onRestart: () => void;
	} = $props();
</script>

<div class="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 max-w-2xl mx-auto w-full text-center">
	<div class="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10">
		<div class="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-500 p-1 mb-6 shadow-xl shadow-indigo-500/30">
			<div class="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-5xl">
				👑
			</div>
		</div>

		<h1 class="text-3xl sm:text-4xl font-black text-white mb-2">
			Selamat! Kamu Menyelesaikan Modul PyQuest!
		</h1>
		<p class="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8">
			Kamu telah membuktikan kemampuan logika Python pemula dan berhasil mengendalikan robot melalui susunan balok koding.
		</p>

		<!-- Statistics Summary -->
		<div class="grid grid-cols-3 gap-3 mb-8">
			<div class="bg-slate-950 p-4 rounded-2xl border border-slate-800">
				<div class="text-2xl font-black text-amber-400">{progress.xp}</div>
				<div class="text-xs text-slate-400 font-bold uppercase mt-1">Total XP</div>
			</div>
			<div class="bg-slate-950 p-4 rounded-2xl border border-slate-800">
				<div class="text-2xl font-black text-emerald-400">{progress.completedQuestions.length}</div>
				<div class="text-xs text-slate-400 font-bold uppercase mt-1">Soal Selesai</div>
			</div>
			<div class="bg-slate-950 p-4 rounded-2xl border border-slate-800">
				<div class="text-2xl font-black text-indigo-400">{progress.completedChallenges.length}</div>
				<div class="text-xs text-slate-400 font-bold uppercase mt-1">Tantangan Game</div>
			</div>
		</div>

		<!-- Restart -->
		<button
			type="button"
			onclick={onRestart}
			class="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-500/30 cursor-pointer active:scale-95 transition-all"
		>
			🔄 Ulangi Petualangan Dari Awal
		</button>
	</div>
</div>
