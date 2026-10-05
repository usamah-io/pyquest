<script lang="ts">
	import type { Challenge } from '$lib/types';

	let {
		challenge,
		xpEarned,
		onNext
	}: {
		challenge: Challenge;
		xpEarned: number;
		onNext: () => void;
	} = $props();
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
	<div class="w-full max-w-lg bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/20 text-center relative overflow-hidden">
		<!-- Confetti / Floating stars badge -->
		<div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-1 mb-4 shadow-xl shadow-amber-400/20 animate-bounce">
			<div class="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl">
				🏆
			</div>
		</div>

		<!-- Title -->
		<h2 class="text-2xl sm:text-3xl font-black text-white mb-2">
			Misi Selesai! Kamu Berhasil!
		</h2>
		<p class="text-sm text-slate-400 mb-6">
			{challenge.title} — PyBot berhasil mencapai Bintang Emas berkat kodemu yang hebat!
		</p>

		<!-- Rewards Summary Box -->
		<div class="grid grid-cols-2 gap-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 text-left">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl">
					⚡
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase font-bold">Reward XP</div>
					<div class="text-lg font-black text-amber-400">+{xpEarned} XP</div>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
					🎖️
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase font-bold">Lencana</div>
					<div class="text-xs font-bold text-indigo-300">PyMaster Rookie</div>
				</div>
			</div>
		</div>

		<!-- Next Challenge Action -->
		<button
			type="button"
			onclick={onNext}
			class="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 hover:from-emerald-600 hover:via-teal-600 hover:to-indigo-600 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-emerald-500/30 transition-all cursor-pointer active:scale-95 hover:scale-[1.02]"
		>
			Lanjut ke Petualangan Berikutnya ➔
		</button>
	</div>
</div>
