<script lang="ts">
	import type { Question } from '$lib/types';

	let {
		question,
		userSelectedId,
		onContinue
	}: {
		question: Question;
		userSelectedId: string;
		onContinue: () => void;
	} = $props();

	let isCorrect = $derived(userSelectedId === question.correctAnswerId);
</script>

<div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 max-w-2xl mx-auto w-full">
	<div
		class="w-full rounded-3xl p-6 sm:p-8 shadow-2xl border backdrop-blur-md text-center {isCorrect
			? 'bg-slate-900/95 border-emerald-500/40 shadow-emerald-500/10'
			: 'bg-slate-900/95 border-rose-500/40 shadow-rose-500/10'}"
	>
		<!-- Status Icon & Title -->
		<div class="mb-4">
			{#if isCorrect}
				<div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 text-3xl sm:text-4xl flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/30">
					🎉
				</div>
				<h2 class="text-2xl sm:text-3xl font-black text-emerald-400 mt-4">Hebat Sekali! Benar!</h2>
				<p class="text-xs sm:text-sm text-slate-400 mt-1">Kamu mendapatkan <span class="text-amber-400 font-bold">+15 XP</span></p>
			{:else}
				<div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 text-3xl sm:text-4xl flex items-center justify-center shadow-lg shadow-rose-500/30">
					🌱
				</div>
				<h2 class="text-2xl sm:text-3xl font-black text-rose-400 mt-4">Hampir Tepat! Mari Belajar!</h2>
				<p class="text-xs sm:text-sm text-slate-400 mt-1">Kesalahan adalah bagian dari petualangan seorang programmer.</p>
			{/if}
		</div>

		<!-- Explanation Box -->
		<div class="text-left bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-8">
			<div class="flex items-center gap-2 mb-2">
				<span class="text-base">💡</span>
				<h3 class="font-bold text-sm uppercase tracking-wider text-slate-300">Penjelasan Konsep Python</h3>
			</div>
			<p class="text-slate-300 text-sm sm:text-base leading-relaxed">
				{question.explanation}
			</p>
		</div>

		<!-- Next Action Button -->
		<button
			type="button"
			onclick={onContinue}
			class="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base sm:text-lg transition-all duration-200 cursor-pointer shadow-lg active:scale-95 {isCorrect
				? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/30 hover:scale-105'
				: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/30 hover:scale-105'}"
		>
			Lanjut ke Tantangan Koding ➔
		</button>
	</div>
</div>
