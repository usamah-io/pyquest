<script lang="ts">
	import type { LearningLevel } from '$lib/types';
	import { progressStore } from '$lib/stores/progressStore';
	import Icon from './Icon.svelte';

	let {
		learningLevels,
		onSelectLearningLevel,
		onBackToHome
	}: {
		learningLevels: LearningLevel[];
		onSelectLearningLevel: (levelId: number) => void;
		onBackToHome: () => void;
	} = $props();

	function getLevelStatus(level: LearningLevel, index: number): 'LOCKED' | 'AVAILABLE' | 'COMPLETED' {
		const completedCount = level.questionIds.filter((qid) =>
			$progressStore.completedQuestions.includes(qid)
		).length;

		if (
			completedCount === level.questionIds.length ||
			($progressStore.completedLearningLevels && $progressStore.completedLearningLevels.includes(level.id))
		) {
			return 'COMPLETED';
		}

		// Level 1 is always unlocked
		if (index === 0) {
			return 'AVAILABLE';
		}

		// Subsequent level unlocks if previous level is completed
		const prevLevel = learningLevels[index - 1];
		const prevCompletedCount = prevLevel.questionIds.filter((qid) =>
			$progressStore.completedQuestions.includes(qid)
		).length;

		if (
			prevCompletedCount === prevLevel.questionIds.length ||
			($progressStore.completedLearningLevels && $progressStore.completedLearningLevels.includes(prevLevel.id))
		) {
			return 'AVAILABLE';
		}

		return 'LOCKED';
	}

	function getLevelProgress(level: LearningLevel): { completed: number; total: number; percent: number } {
		const completed = level.questionIds.filter((qid) =>
			$progressStore.completedQuestions.includes(qid)
		).length;
		const total = level.questionIds.length;
		const percent = Math.round((completed / total) * 100);
		return { completed, total, percent };
	}

	function getDifficultyBadge(diff: string) {
		switch (diff) {
			case 'easy':
				return { label: 'Mudah', class: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
			case 'medium':
				return { label: 'Sedang', class: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
			case 'hard':
				return { label: 'Sulit', class: 'bg-orange-500/15 text-orange-300 border-orange-500/30' };
			case 'challenge':
				return { label: 'Tantangan', class: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
			default:
				return { label: diff, class: 'bg-slate-800 text-slate-300 border-slate-700' };
		}
	}
</script>

<div class="flex-1 flex flex-col max-w-5xl mx-auto w-full p-2.5 sm:p-5 overflow-y-auto select-none">
	<!-- Polished Header -->
	<div class="flex items-center justify-between gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800/80">
		<div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
			<button
				type="button"
				onclick={onBackToHome}
				class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
				title="Kembali ke Beranda"
				aria-label="Kembali ke Beranda"
			>
				<Icon name="chevron-left" size={18} />
			</button>
			<div class="min-w-0">
				<h1 class="text-base sm:text-2xl font-black text-white flex items-center gap-2 truncate">
					<Icon name="book-open" size={20} class="text-indigo-400 shrink-0 hidden sm:inline" />
					<span class="truncate">Modul Belajar Python</span>
				</h1>
				<p class="text-[11px] sm:text-xs text-slate-400 truncate">
					10 Level konsep Python terstruktur dari dasar
				</p>
			</div>
		</div>

		<!-- Overall stats pill -->
		<div class="flex items-center gap-1.5 text-[11px] sm:text-xs bg-slate-900 border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-indigo-400 shrink-0">
			<Icon name="zap" size={14} class="text-amber-400 shrink-0" />
			<span>{$progressStore.completedQuestions.length} / 50</span>
			<span class="text-slate-500 font-normal hidden sm:inline">Soal Selesai</span>
		</div>
	</div>

	<!-- 2-COLUMN LEVEL CARDS GRID (Side by side on all screens) -->
	<div class="grid grid-cols-2 gap-2.5 sm:gap-4 pb-8">
		{#each learningLevels as level, idx}
			{@const status = getLevelStatus(level, idx)}
			{@const { completed, total, percent } = getLevelProgress(level)}
			{@const diffBadge = getDifficultyBadge(level.difficulty)}
			{@const isLocked = status === 'LOCKED'}
			{@const isCompleted = status === 'COMPLETED'}

			<div
				class="rounded-2xl sm:rounded-3xl p-3 sm:p-4 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden group {isLocked
					? 'bg-slate-950/40 border-slate-800/60 opacity-65'
					: isCompleted
					? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5 hover:border-emerald-400/60'
					: 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 shadow-lg'}"
			>
				<div>
					<!-- Top Row: Badge & Status -->
					<div class="flex items-center justify-between gap-1 mb-2">
						<div class="flex items-center gap-1 sm:gap-1.5 flex-wrap">
							<span
								class="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg {isCompleted
									? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
									: isLocked
									? 'bg-slate-800 text-slate-500'
									: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}"
							>
								Lvl {level.id}
							</span>
							<span class="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-md border hidden xs:inline {diffBadge.class}">
								{diffBadge.label}
							</span>
						</div>

						<div class="text-[10px] sm:text-xs font-bold shrink-0">
							{#if isCompleted}
								<span class="text-emerald-400 flex items-center gap-1" title="Selesai">
									<Icon name="check" size={13} class="text-emerald-400" />
									<span class="hidden sm:inline">Selesai</span>
								</span>
							{:else if isLocked}
								<span class="text-slate-500 flex items-center gap-1" title="Terkunci">
									<Icon name="lock" size={13} />
								</span>
							{:else}
								<span class="text-indigo-300 font-mono text-[10px] sm:text-xs">
									{completed}/{total}
								</span>
							{/if}
						</div>
					</div>

					<!-- Title -->
					<h2 class="text-xs sm:text-base font-black text-white mb-1 line-clamp-1 group-hover:text-indigo-300 transition-colors" title={level.title}>
						{level.title}
					</h2>

					<!-- Description -->
					<p class="text-[10px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
						{level.description}
					</p>

					<!-- Concept Snippet -->
					<div class="text-[9px] sm:text-[10px] text-slate-300 bg-slate-950/80 border border-slate-800/80 rounded-xl px-2 py-1.5 mb-3 font-mono truncate" title={level.concept}>
						<span class="text-indigo-400 font-bold">Konsep:</span> {level.concept}
					</div>

					<!-- Progress Bar -->
					<div class="mb-3">
						<div class="flex justify-between items-center text-[9px] sm:text-[10px] font-bold mb-1 text-slate-400">
							<span class="truncate">Kemajuan</span>
							<span class="{isCompleted ? 'text-emerald-400' : 'text-indigo-300'} font-mono">{percent}%</span>
						</div>
						<div class="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
							<div
								class="h-full rounded-full transition-all duration-300 {isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}"
								style="width: {percent}%"
							></div>
						</div>
					</div>
				</div>

				<!-- Action Button -->
				<div class="pt-2 sm:pt-2.5 border-t border-slate-800/80">
					<button
						type="button"
						disabled={isLocked}
						onclick={() => onSelectLearningLevel(level.id)}
						class="w-full py-2 px-2 sm:px-3 rounded-xl border text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 {isLocked
							? 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed'
							: isCompleted
							? 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-600/40 text-emerald-300 cursor-pointer shadow-xs active:scale-95'
							: 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white cursor-pointer shadow-md shadow-indigo-600/20 active:scale-95'}"
					>
						{#if isLocked}
							<Icon name="lock" size={13} />
							<span class="truncate">Terkunci</span>
						{:else if isCompleted}
							<Icon name="rotate-ccw" size={13} />
							<span class="truncate">Ulangi</span>
						{:else}
							<Icon name="play" size={13} />
							<span class="truncate">Mulai</span>
						{/if}
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
