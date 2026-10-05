<script lang="ts">
	import type { Question } from '$lib/types';
	import { shuffleArray } from '$lib/questions/questionsData';
	import Icon from './Icon.svelte';

	let {
		question,
		questionNumber = 1,
		totalQuestions = 3,
		onAnswer
	}: {
		question: Question;
		questionNumber?: number;
		totalQuestions?: number;
		onAnswer: (selectedOptionId: string) => void;
	} = $props();

	let selectedId = $state<string | null>(null);
	let currentHintIndex = $state<number>(-1);

	// Randomize option order cleanly while preserving stable IDs
	let shuffledOptions = $state<typeof question.options>([]);

	// Re-shuffle when question prop changes
	$effect(() => {
		selectedId = null;
		currentHintIndex = -1;
		shuffledOptions = shuffleArray(question.options);
	});

	function chooseOption(id: string) {
		selectedId = id;
	}

	function submit() {
		if (selectedId) {
			onAnswer(selectedId);
		}
	}

	function showNextHint() {
		if (question.hints && currentHintIndex < question.hints.length - 1) {
			currentHintIndex++;
		}
	}
</script>

<div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 max-w-3xl mx-auto w-full">
	<!-- Top Module Tracker -->
	<div class="w-full flex items-center justify-between mb-4">
		<div class="flex items-center gap-2.5">
			<span class="px-3 py-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-lg uppercase tracking-wide">
				{question.topic}
			</span>
			<span class="text-xs text-slate-400 font-medium">Soal {questionNumber} dari {totalQuestions}</span>
		</div>
		<div class="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
			<Icon name="zap" size={14} class="text-amber-400" />
			<span>+15 XP</span>
		</div>
	</div>

	<!-- Question Card -->
	<div class="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
		<!-- Question Text -->
		<h2 class="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
			{question.question}
		</h2>

		<!-- Code Snippet Box (if available) -->
		{#if question.codeSnippet}
			<div class="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-emerald-400 shadow-inner overflow-x-auto relative">
				<div class="text-[10px] uppercase font-bold text-slate-500 mb-1 select-none flex items-center gap-1.5">
					<Icon name="python" size={13} class="text-slate-400" />
					<span>Kode Python</span>
				</div>
				<pre class="leading-relaxed whitespace-pre-wrap">{question.codeSnippet}</pre>
			</div>
		{/if}

		<!-- Options Grid (Randomized with stable IDs) -->
		<div class="grid grid-cols-1 gap-3 mb-6">
			{#each shuffledOptions as opt, idx}
				<button
					type="button"
					onclick={() => chooseOption(opt.id)}
					class="w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer {selectedId === opt.id
						? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-500/20 scale-[1.01]'
						: 'bg-slate-800/60 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800'}"
				>
					<div class="flex items-center gap-3">
						<span class="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold flex items-center justify-center text-slate-400">
							{String.fromCharCode(65 + idx)}
						</span>
						<span class="font-medium text-sm sm:text-base">{opt.text}</span>
					</div>

					<div
						class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-3 {selectedId === opt.id
							? 'border-indigo-400 bg-indigo-500 text-white'
							: 'border-slate-600'}"
					>
						{#if selectedId === opt.id}
							<Icon name="check" size={13} />
						{/if}
					</div>
				</button>
			{/each}
		</div>

		<!-- Hints Section -->
		{#if question.hints && question.hints.length > 0}
			<div class="mb-6">
				{#if currentHintIndex === -1}
					<button
						type="button"
						onclick={showNextHint}
						class="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-semibold bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-xl border border-amber-400/20 transition-colors cursor-pointer"
					>
						<Icon name="lightbulb" size={14} class="text-amber-400" />
						<span>Butuh Petunjuk? ({question.hints.length} tersedia)</span>
					</button>
				{:else}
					<div class="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs sm:text-sm space-y-2">
						{#each question.hints.slice(0, currentHintIndex + 1) as hint, idx}
							<div class="flex items-start gap-2">
								<Icon name="lightbulb" size={14} class="text-amber-400 shrink-0 mt-0.5" />
								<div>
									<strong class="text-amber-400">Petunjuk {idx + 1}:</strong>
									<span>{hint}</span>
								</div>
							</div>
						{/each}
						{#if currentHintIndex < question.hints.length - 1}
							<button
								type="button"
								onclick={showNextHint}
								class="text-xs font-bold text-amber-400 underline hover:text-white mt-1 cursor-pointer block"
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
					? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95'
					: 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}"
			>
				<span>Periksa Jawaban</span>
				<Icon name="chevron-right" size={16} />
			</button>
		</div>
	</div>
</div>
