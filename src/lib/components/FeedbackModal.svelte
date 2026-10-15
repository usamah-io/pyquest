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
		<!-- Status Icon & PyBot Mascot & Title -->
		<div class="mb-5 flex flex-col items-center">
			{#if isCorrect}
				<div class="relative mb-3">
					<img
						src="/mascot/pybot-happy-success.webp"
						alt="PyBot Senang"
						width="88"
						height="88"
						decoding="async"
						class="w-20 h-20 sm:w-24 sm:h-24 object-contain animate-bounce drop-shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
					/>
					<div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md font-bold">
						<Icon name="check" size={16} />
					</div>
				</div>
				<h2 class="text-2xl sm:text-3xl font-black text-emerald-400">Jawaban Tepat!</h2>
				<p class="text-xs sm:text-sm text-slate-400 mt-1">Kamu mendapatkan bonus <strong class="text-amber-400 font-bold">+{question.xp || 15} XP</strong></p>
			{:else}
				<div class="relative mb-3">
					<img
						src="/mascot/pybot-waving.webp"
						alt="PyBot Semangat"
						width="88"
						height="88"
						decoding="async"
						class="w-20 h-20 sm:w-24 sm:h-24 object-contain animate-float drop-shadow-[0_8px_20px_rgba(244,63,94,0.3)]"
					/>
					<div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md font-bold">
						<Icon name="x" size={16} />
					</div>
				</div>
				<h2 class="text-2xl sm:text-3xl font-black text-rose-400">Belum Tepat, Mari Pelajari!</h2>
				<p class="text-xs sm:text-sm text-slate-400 mt-1">Jangan berkecil hati! Kesalahan adalah bagian wajar dalam memahami logika Python.</p>
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
			<span>{isLastQuestion ? 'Selesaikan Level Ini' : 'Lanjut ke Soal Berikutnya'}</span>
			<Icon name="chevron-right" size={18} />
		</button>
	</div>
</div>
