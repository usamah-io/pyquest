<script lang="ts">
	import type { Question } from '$lib/types';
	import { shuffleArray } from '$lib/questions/questionsData';
	import Icon from './Icon.svelte';

	let {
		question,
		questionNumber = 1,
		totalQuestions = 5,
		onAnswer,
		onBackToLevels
	}: {
		question: Question;
		questionNumber?: number;
		totalQuestions?: number;
		onAnswer: (selectedOptionId: string) => void;
		onBackToLevels?: () => void;
	} = $props();

	let selectedId = $state<string | null>(null);
	let currentHintIndex = $state<number>(-1);
	let hintsUsedCount = $state<number>(0);
	let showExhaustedNotice = $state<boolean>(false);

	// Quota is capped at 2 tips per question
	const MAX_TIPS_QUOTA = 2;

	// Randomize option order cleanly while preserving stable IDs
	let shuffledOptions = $state<typeof question.options>([]);

	// Re-shuffle when question prop changes (tracked via question.id)
	$effect(() => {
		// track question.id
		question.id;
		selectedId = null;
		currentHintIndex = -1;
		hintsUsedCount = 0;
		showExhaustedNotice = false;
		shuffledOptions = shuffleArray(question.options);
	});

	let maxAvailableHints = $derived(Math.min(question.hints?.length || 0, MAX_TIPS_QUOTA));
	let remainingHintsQuota = $derived(Math.max(0, maxAvailableHints - hintsUsedCount));

	function chooseOption(id: string) {
		selectedId = id;
	}

	function submit() {
		if (selectedId) {
			onAnswer(selectedId);
		}
	}

	function handleRequestNextHint() {
		if (hintsUsedCount >= maxAvailableHints) {
			showExhaustedNotice = true;
			return;
		}

		currentHintIndex = hintsUsedCount;
		hintsUsedCount++;
		showExhaustedNotice = false;
	}
</script>

<div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 max-w-3xl mx-auto w-full">
	<!-- Top Navigation & Level Tracker -->
	<div class="w-full flex items-center justify-between mb-4 gap-3 flex-wrap">
		<div class="flex items-center gap-2.5">
			{#if onBackToLevels}
				<button
					type="button"
					onclick={onBackToLevels}
					class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
					title="Pilih Level Lain"
					aria-label="Pilih Level Lain"
				>
					<Icon name="chevron-left" size={18} />
				</button>
			{/if}

			<span class="px-3 py-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-lg uppercase tracking-wide">
				Level {question.level} • {question.topic}
			</span>
			<span class="text-xs text-slate-400 font-medium">Soal {questionNumber} dari {totalQuestions}</span>
		</div>

		<div class="flex items-center gap-2">
			<!-- Difficulty Pill -->
			<span class="text-[11px] font-semibold px-2 py-0.5 rounded-md border {question.difficulty === 'easy'
				? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
				: question.difficulty === 'medium'
				? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
				: question.difficulty === 'hard'
				? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
				: 'bg-purple-500/15 text-purple-300 border-purple-500/30'}">
				{question.difficulty === 'easy' ? 'Mudah' : question.difficulty === 'medium' ? 'Menengah' : question.difficulty === 'hard' ? 'Sulit' : 'Tantangan'}
			</span>

			<div class="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
				<Icon name="zap" size={14} class="text-amber-400" />
				<span>+{question.xp || 15} XP</span>
			</div>
		</div>
	</div>

	<!-- Question Card -->
	<div class="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
		<!-- Question Text -->
		<h2 class="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
			{question.question}
		</h2>

		<!-- Code Snippet Box (if available) -->
		{#if question.code || question.codeSnippet}
			<div class="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-emerald-400 shadow-inner overflow-x-auto relative">
				<div class="text-[10px] uppercase font-bold text-slate-500 mb-1 select-none flex items-center gap-1.5">
					<Icon name="python" size={13} class="text-slate-400" />
					<span>Kode Python</span>
				</div>
				<pre class="leading-relaxed whitespace-pre-wrap">{question.code || question.codeSnippet}</pre>
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
						<span class="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold flex items-center justify-center text-slate-400 shrink-0">
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

		<!-- Hints Section with Quota System -->
		{#if question.hints && question.hints.length > 0}
			<div class="mb-6">
				{#if currentHintIndex === -1}
					<button
						type="button"
						onclick={handleRequestNextHint}
						class="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-semibold bg-amber-400/10 hover:bg-amber-400/20 px-3.5 py-2 rounded-xl border border-amber-400/20 transition-colors cursor-pointer"
					>
						<Icon name="lightbulb" size={14} class="text-amber-400" />
						<span>Butuh Petunjuk? ({remainingHintsQuota} tersisa)</span>
					</button>
				{:else}
					<div class="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs sm:text-sm space-y-2">
						{#each question.hints.slice(0, currentHintIndex + 1) as hint, idx}
							<div class="flex items-start gap-2">
								<Icon name="lightbulb" size={14} class="text-amber-400 shrink-0 mt-0.5" />
								<div>
									<strong class="text-amber-400">Petunjuk {idx + 1}:</strong>
									<span class="text-slate-200 ml-1">{hint}</span>
								</div>
							</div>
						{/each}

						<div class="flex items-center justify-between pt-1">
							{#if remainingHintsQuota > 0}
								<button
									type="button"
									onclick={handleRequestNextHint}
									class="text-xs font-bold text-amber-400 underline hover:text-white cursor-pointer"
								>
									+ Buka Petunjuk Berikutnya ({remainingHintsQuota} tersisa)
								</button>
							{:else}
								<span class="text-[11px] text-amber-300/70 italic">
									Tidak ada tips tersisa untuk soal ini.
								</span>
							{/if}
						</div>
					</div>
				{/if}

				{#if showExhaustedNotice}
					<div class="mt-2 text-xs text-slate-400 italic">
						Tidak ada tips tersisa untuk soal ini.
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
