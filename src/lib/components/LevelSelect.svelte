<script lang="ts">
	import type { GameLevel } from '$lib/types';
	import { progressStore } from '$lib/stores/progressStore';
	import Icon from './Icon.svelte';

	let {
		levels,
		onSelectLevelChallenge,
		onBackToHome
	}: {
		levels: GameLevel[];
		onSelectLevelChallenge: (levelIndex: number, challengeIndex: number) => void;
		onBackToHome: () => void;
	} = $props();

	function getLevelStatus(level: GameLevel, index: number): 'LOCKED' | 'AVAILABLE' | 'COMPLETED' {
		const completedInLevel = level.challenges.filter((ch) =>
			$progressStore.completedChallenges.includes(ch.id)
		).length;

		if (completedInLevel === level.challenges.length) {
			return 'COMPLETED';
		}

		// Level 1 is always unlocked
		if (index === 0) {
			return 'AVAILABLE';
		}

		// Subsequent level unlocks if previous level is completed
		const prevLevel = levels[index - 1];
		const prevCompletedCount = prevLevel.challenges.filter((ch) =>
			$progressStore.completedChallenges.includes(ch.id)
		).length;

		if (prevCompletedCount === prevLevel.challenges.length || ($progressStore.completedLevels && $progressStore.completedLevels.includes(prevLevel.id))) {
			return 'AVAILABLE';
		}

		return 'LOCKED';
	}

	function getLevelProgress(level: GameLevel): { completed: number; total: number } {
		const completed = level.challenges.filter((ch) =>
			$progressStore.completedChallenges.includes(ch.id)
		).length;
		return { completed, total: level.challenges.length };
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
					<Icon name="gamepad" size={24} class="text-emerald-400" />
					<span>Pilih Level Coding Game</span>
				</h1>
				<p class="text-xs sm:text-sm text-slate-400">10 Level tantangan logika pemrograman labirin 2D PyQuest</p>
			</div>
		</div>

		<!-- Overall stats -->
		<div class="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-bold text-emerald-400">
			<Icon name="trophy" size={16} />
			<span>{$progressStore.completedChallenges.length} / 30 Misi Selesai</span>
		</div>
	</div>

	<!-- Level Cards Grid (10 Levels) -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
		{#each levels as level, idx}
			{@const status = getLevelStatus(level, idx)}
			{@const { completed, total } = getLevelProgress(level)}
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
						<span
							class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg {isCompleted
								? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
								: isLocked
								? 'bg-slate-800 text-slate-500'
								: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}"
						>
							Level {level.id}
						</span>

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
								<span class="text-amber-400 flex items-center gap-1">
									<span>{completed} / {total} Misi</span>
								</span>
							{/if}
						</div>
					</div>

					<!-- Title & Concept -->
					<h2 class="text-base sm:text-lg font-black text-white mb-1">
						{level.title}
					</h2>
					<p class="text-xs text-slate-400 mb-3 leading-relaxed">
						{level.description}
					</p>

					<!-- Concept Pill -->
					<div class="text-[11px] text-slate-300 bg-slate-950/80 border border-slate-800 rounded-xl p-2 mb-4 font-mono">
						<span class="text-indigo-400 font-bold">Konsep:</span> {level.concept}
					</div>
				</div>

				<!-- Challenges List Inside Level (Mission Sequential Progression) -->
				<div class="space-y-2 pt-3 border-t border-slate-800/80">
					<div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
						<span>Misi Tantangan:</span>
						<span class="text-[10px] text-slate-400 lowercase font-normal">berurutan</span>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
						{#each level.challenges as ch, chIdx}
							{@const chDone = $progressStore.completedChallenges.includes(ch.id)}
							{@const isPrevDone = chIdx === 0 || $progressStore.completedChallenges.includes(level.challenges[chIdx - 1].id)}
							{@const isMissionLocked = isLocked || !isPrevDone}

							<button
								type="button"
								disabled={isMissionLocked}
								onclick={() => onSelectLevelChallenge(idx, chIdx)}
								title={isMissionLocked ? `Selesaikan Misi ${chIdx} terlebih dahulu untuk membuka misi ini` : chDone ? `Misi Selesai (Klik untuk Replay)` : `Mulai Misi ${chIdx + 1}`}
								class="p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between {isMissionLocked
									? 'bg-slate-950/70 text-slate-600 border-slate-900 cursor-not-allowed'
									: chDone
									? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/40 cursor-pointer shadow-sm shadow-emerald-950'
									: 'bg-indigo-950/30 border-indigo-500/40 hover:border-indigo-400 text-indigo-100 hover:bg-indigo-900/30 cursor-pointer shadow-sm'}"
							>
								<div class="flex items-center gap-1.5 truncate">
									<span class="truncate">Misi {chIdx + 1}</span>
								</div>

								{#if chDone}
									<span class="flex items-center gap-1 text-[10px] text-emerald-400 font-bold shrink-0" title="Telah Selesai">
										<Icon name="check" size={13} class="text-emerald-400" />
									</span>
								{:else if isMissionLocked}
									<Icon name="lock" size={12} class="text-slate-600 shrink-0" />
								{:else}
									<span class="flex items-center gap-1 text-[10px] text-indigo-300 font-bold shrink-0" title="Tersedia">
										<Icon name="play" size={11} class="text-indigo-400" />
									</span>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
