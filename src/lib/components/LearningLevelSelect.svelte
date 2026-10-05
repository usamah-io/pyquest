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

		if (completedCount === level.questionIds.length || ($progressStore.completedLearningLevels && $progressStore.completedLearningLevels.includes(level.id))) {
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
				return { label: 'Menengah', class: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
			case 'hard':
				return { label: 'Sulit', class: 'bg-orange-500/15 text-orange-300 border-orange-500/30' };
			case 'challenge':
				return { label: 'Tantangan', class: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
			default:
				return { label: diff, class: 'bg-slate-800 text-slate-300 border-slate-700' };
		}
	}
</script>

<div class="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 sm:p-6 overflow-y-auto">
	<!-- Header -->
	<div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={onBackToHome}
				class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
				title="Kembali ke Beranda"
				aria-label="Kembali ke Beranda"
			>
				<Icon name="chevron-left" size={20} />
			</button>
			<div>
				<h1 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
					<Icon name="book-open" size={24} class="text-indigo-400" />
					<span>Modul Belajar Python</span>
				</h1>
				<p class="text-xs sm:text-sm text-slate-400">10 Level pembelajaran konsep Python terstruktur dari dasar</p>
			</div>
		</div>

		<!-- Overall stats -->
		<div class="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-bold text-indigo-400">
			<Icon name="zap" size={16} />
			<span>{$progressStore.completedQuestions.length} / 50 Soal Selesai</span>
		</div>
	</div>

	<!-- Level Cards Grid (10 Levels) -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
		{#each learningLevels as level, idx}
			{@const status = getLevelStatus(level, idx)}
			{@const { completed, total, percent } = getLevelProgress(level)}
			{@const diffBadge = getDifficultyBadge(level.difficulty)}
			{@const isLocked = status === 'LOCKED'}
			{@const isCompleted = status === 'COMPLETED'}

			<div
				class="rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between {isLocked
					? 'bg-slate-950/40 border-slate-900 opacity-60'
					: isCompleted
					? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
					: 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/40 shadow-lg'}"
			>
				<div>
					<!-- Top Row: Badge & Status -->
					<div class="flex items-center justify-between mb-3">
						<div class="flex items-center gap-2">
							<span
								class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg {isCompleted
									? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
									: isLocked
									? 'bg-slate-800 text-slate-500'
									: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}"
							>
								Level {level.id}
							</span>
							<span class="text-[10px] font-semibold px-2 py-0.5 rounded-md border {diffBadge.class}">
								{diffBadge.label}
							</span>
						</div>

						<div class="flex items-center gap-1.5 text-xs font-bold">
							{#if isCompleted}
								<span class="text-emerald-400 flex items-center gap-1">
									<Icon name="trophy" size={14} />
									<span>Selesai ({completed}/{total})</span>
								</span>
							{:else if isLocked}
								<span class="text-slate-500 flex items-center gap-1">
									<Icon name="lock" size={14} />
									<span>Terkunci</span>
								</span>
							{:else}
								<span class="text-indigo-400 flex items-center gap-1">
									<span>{completed} / {total} Soal</span>
								</span>
							{/if}
						</div>
					</div>

					<!-- Title & Description -->
					<h2 class="text-base sm:text-lg font-black text-white mb-1">
						{level.title}
					</h2>
					<p class="text-xs text-slate-400 mb-3 leading-relaxed">
						{level.description}
					</p>

					<!-- Concept Pill -->
					<div class="text-[11px] text-slate-300 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 mb-4 font-mono">
						<span class="text-indigo-400 font-bold">Konsep:</span> {level.concept}
					</div>

					<!-- Progress Bar -->
					<div class="mb-4">
						<div class="flex justify-between items-center text-[11px] font-bold mb-1 text-slate-400">
							<span>Kemajuan Materi</span>
							<span class="{isCompleted ? 'text-emerald-400' : 'text-indigo-300'}">{completed}/{total} ({percent}%)</span>
						</div>
						<div class="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
							<div
								class="h-full rounded-full transition-all duration-300 {isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}"
								style="width: {percent}%"
							></div>
						</div>
					</div>
				</div>

				<!-- Action Button -->
				<div class="pt-3 border-t border-slate-800/80">
					<button
						type="button"
						disabled={isLocked}
						onclick={() => onSelectLearningLevel(level.id)}
						class="w-full py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 {isLocked
							? 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed'
							: isCompleted
							? 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-600/40 text-emerald-300 cursor-pointer shadow-sm'
							: 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white cursor-pointer shadow-md'}"
					>
						{#if isLocked}
							<Icon name="lock" size={14} />
							<span>Selesaikan Level Sebelumnya</span>
						{:else if isCompleted}
							<Icon name="rotate-ccw" size={14} />
							<span>Ulangi Level (Replay)</span>
						{:else}
							<Icon name="play" size={14} />
							<span>Mulai Level {level.id}</span>
						{/if}
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
