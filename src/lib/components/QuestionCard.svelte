<script lang="ts">
	import type { Question } from '$lib/types';

	let {
		question,
		onAnswer
	}: {
		question: Question;
		onAnswer: (selectedOptionId: string) => void;
	} = $props();

	let selectedId = $state<string | null>(null);
	let currentHintIndex = $state<number>(-1);

	function chooseOption(id: string) {
		selectedId = id;
	}

	function submit() {
		if (selectedId) {
			onAnswer(selectedId);
		}
	}

	function showNextHint() {
		if (currentHintIndex < question.hints.length - 1) {
			currentHintIndex++;
		}
	}
</script>

<div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 max-w-3xl mx-auto w-full">
	<!-- Topic Badge & Difficulty -->
	<div class="w-full flex items-center justify-between mb-4">
		<div class="flex items-center gap-2">
			<span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-lg uppercase tracking-wider">
				{question.topic}
			</span>
			<span class="text-xs text-slate-400 font-medium">Tingkat {question.difficulty}</span>
		</div>
		<span class="text-xs font-bold text-amber-400 flex items-center gap-1">
			<span>⭐</span> +15 XP
		</span>
	</div>

	<!-- Question Card -->
	<div class="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
		<!-- Question Text -->
		<h2 class="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
			{question.question}
		</h2>

		<!-- Code Snippet Box (if available) -->
		{#if question.codeSnippet}
			<div class="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-emerald-400 shadow-inner overflow-x-auto relative">
				<div class="text-[10px] uppercase font-bold text-slate-500 mb-1 select-none">Python Code</div>
				<pre class="leading-relaxed whitespace-pre-wrap">{question.codeSnippet}</pre>
			</div>
		{/if}

		<!-- Options Grid -->
		<div class="grid grid-cols-1 gap-3 mb-6">
			{#each question.options as opt}
				<button
					type="button"
					onclick={() => chooseOption(opt.id)}
					class="w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer {selectedId === opt.id
						? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-500/20 scale-[1.01]'
						: 'bg-slate-800/60 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800'}"
				>
					<span class="font-medium text-sm sm:text-base">{opt.text}</span>
					<div
						class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-3 {selectedId === opt.id
							? 'border-indigo-400 bg-indigo-500 text-white'
							: 'border-slate-600'}"
					>
						{#if selectedId === opt.id}
							<span class="text-xs font-bold">✓</span>
						{/if}
					</div>
				</button>
			{/each}
		</div>

		<!-- Hints Section -->
		{#if question.hints.length > 0}
			<div class="mb-6">
				{#if currentHintIndex === -1}
					<button
						type="button"
						onclick={showNextHint}
						class="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-semibold bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-xl border border-amber-400/20 transition-colors"
					>
						<span>💡 Butuh Petunjuk? ({question.hints.length} tersedia)</span>
					</button>
				{:else}
					<div class="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs sm:text-sm space-y-2">
						{#each question.hints.slice(0, currentHintIndex + 1) as hint, idx}
							<div class="flex items-start gap-2">
								<span class="font-bold text-amber-400">Petunjuk {idx + 1}:</span>
								<span>{hint}</span>
							</div>
						{/each}
						{#if currentHintIndex < question.hints.length - 1}
							<button
								type="button"
								onclick={showNextHint}
								class="text-xs font-bold underline hover:text-white mt-1 cursor-pointer block"
							>
								+ Buka Petunjuk Berikutnya
							</button>
						{/if}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Action Button -->
		<div class="flex justify-end">
			<button
				type="button"
				disabled={!selectedId}
				onclick={submit}
				class="px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 {selectedId
					? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95'
					: 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}"
			>
				Periksa Jawaban ➔
			</button>
		</div>
	</div>
</div>
