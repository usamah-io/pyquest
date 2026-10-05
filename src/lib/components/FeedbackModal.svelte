<script lang="ts">
	import type { Question } from '$lib/types';
	import Icon from './Icon.svelte';

	let {
		question,
		userSelectedId,
		isLastQuestion = false,
		onContinue
	}: {
		question: Question;
		userSelectedId: string;
		isLastQuestion?: boolean;
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
		<div class="mb-5">
			{#if isCorrect}
				<div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3">
					<Icon name="check" size={36} />
				</div>
				<h2 class="text-2xl sm:text-3xl font-black text-emerald-400">Jawaban Tepat!</h2>
				<p class="text-xs sm:text-sm text-slate-400 mt-1">Kamu mendapatkan bonus <strong class="text-amber-400 font-bold">+15 XP</strong></p>
			{:else}
				<div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-rose-500/20 border border-rose-400 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20 mb-3">
					<Icon name="x" size={36} />
				</div>
				<h2 class="text-2xl sm:text-3xl font-black text-rose-400">Belum Tepat, Mari Pelajari!</h2>
				<p class="text-xs sm:text-sm text-slate-400 mt-1">Kesalahan adalah bagian wajar dalam proses memahami logika koding.</p>
			{/if}
		</div>

		<!-- Explanation Box -->
		<div class="text-left bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-7">
			<div class="flex items-center gap-2 mb-2 text-indigo-300">
				<Icon name="book-open" size={16} />
				<h3 class="font-bold text-xs uppercase tracking-wider">Penjelasan Konsep Python</h3>
			</div>
			<p class="text-slate-300 text-sm sm:text-base leading-relaxed">
				{question.explanation}
			</p>
		</div>

		<!-- Next Action Button -->
		<button
			type="button"
			onclick={onContinue}
			class="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2 mx-auto {isCorrect
				? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
				: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'}"
		>
			<span>{isLastQuestion ? 'Selesaikan Modul Belajar' : 'Lanjut ke Soal Berikutnya'}</span>
			<Icon name="chevron-right" size={18} />
		</button>
	</div>
</div>
