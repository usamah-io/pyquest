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

		if (
			prevCompletedCount === prevLevel.challenges.length ||
			($progressStore.completedLevels && $progressStore.completedLevels.includes(prevLevel.id))
		) {
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
					<Icon name="gamepad" size={20} class="text-emerald-400 shrink-0 hidden sm:inline" />
					<span class="truncate">Pilih Level Coding Game</span>
				</h1>
				<p class="text-[11px] sm:text-xs text-slate-400 truncate">
					10 Level tantangan labirin logika Python PyBot
				</p>
			</div>
		</div>

		<!-- Overall stats pill -->
		<div class="flex items-center gap-1.5 text-[11px] sm:text-xs bg-slate-900 border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-emerald-400 shrink-0">
			<Icon name="trophy" size={14} class="text-emerald-400 shrink-0" />
			<span>{$progressStore.completedChallenges.length} / 30</span>
			<span class="text-slate-500 font-normal hidden sm:inline">Misi Selesai</span>
		</div>
	</div>

	<!-- 2-COLUMN LEVEL CARDS GRID (Side by side on all screens) -->
	<div class="grid grid-cols-2 gap-2.5 sm:gap-4 pb-8">
		{#each levels as level, idx}
			{@const status = getLevelStatus(level, idx)}
			{@const { completed, total } = getLevelProgress(level)}
			{@const isLocked = status === 'LOCKED'}
			{@const isCompleted = status === 'COMPLETED'}

			<div
				class="rounded-2xl sm:rounded-3xl p-3 sm:p-4 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden group {isLocked
					? 'bg-slate-950/40 border-slate-800/60 opacity-65'
					: isCompleted
					? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5 hover:border-emerald-400/60'
					: 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 shadow-lg'}"
			>
				<div>
					<!-- Top Row: Badge & Status -->
					<div class="flex items-center justify-between gap-1 mb-2">
						<span
							class="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg {isCompleted
								? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
								: isLocked
								? 'bg-slate-800 text-slate-500'
								: 'bg-teal-500/20 text-teal-300 border border-teal-500/30'}"
						>
							Lvl {level.id}
						</span>

						<div class="text-[10px] sm:text-xs font-bold shrink-0">
							{#if isCompleted}
								<span class="text-emerald-400 flex items-center gap-1" title="Selesai">
									<Icon name="check" size={13} class="text-emerald-400" />
									<span class="hidden sm:inline font-mono">({completed}/{total})</span>
								</span>
							{:else if isLocked}
								<span class="text-slate-500 flex items-center gap-1" title="Terkunci">
									<Icon name="lock" size={13} />
								</span>
							{:else}
								<span class="text-teal-300 font-mono text-[10px] sm:text-xs">
									{completed}/{total} Misi
								</span>
							{/if}
						</div>
					</div>

					<!-- Title -->
					<h2 class="text-xs sm:text-base font-black text-white mb-1 line-clamp-1 group-hover:text-teal-300 transition-colors" title={level.title}>
						{level.title}
					</h2>

					<!-- Description -->
					<p class="text-[10px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
						{level.description}
					</p>

					<!-- Concept Snippet -->
					<div class="text-[9px] sm:text-[10px] text-slate-300 bg-slate-950/80 border border-slate-800/80 rounded-xl px-2 py-1.5 mb-3 font-mono truncate" title={level.concept}>
						<span class="text-teal-400 font-bold">Konsep:</span> {level.concept}
					</div>
				</div>

				<!-- Challenges List: 3 Compact Game-Style Mission Nodes in a Row -->
				<div class="pt-2 sm:pt-2.5 border-t border-slate-800/80">
					<div class="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
						<span>Pilih Misi:</span>
						<span class="font-mono text-slate-400">{completed}/3</span>
					</div>

					<div class="grid grid-cols-3 gap-1 sm:gap-1.5">
						{#each level.challenges as ch, chIdx}
							{@const chDone = $progressStore.completedChallenges.includes(ch.id)}
							{@const isPrevDone = chIdx === 0 || $progressStore.completedChallenges.includes(level.challenges[chIdx - 1].id)}
							{@const isMissionLocked = isLocked || !isPrevDone}

							<button
								type="button"
								disabled={isMissionLocked}
								onclick={() => onSelectLevelChallenge(idx, chIdx)}
								title={isMissionLocked
									? `Selesaikan Misi ${chIdx} terlebih dahulu`
									: chDone
									? `Misi ${chIdx + 1} Selesai (Klik untuk Replay)`
									: `Mulai Misi ${chIdx + 1}`}
								class="py-1.5 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 {isMissionLocked
									? 'bg-slate-950/60 text-slate-600 border-slate-900 cursor-not-allowed'
									: chDone
									? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50 cursor-pointer shadow-xs active:scale-95'
									: 'bg-teal-600 hover:bg-teal-500 border-teal-400 text-slate-950 font-black cursor-pointer shadow-md shadow-teal-500/20 active:scale-95'}"
							>
								<span class="text-[9px] sm:text-[10px] font-bold tracking-tight">
									M{chIdx + 1}
								</span>
								{#if chDone}
									<Icon name="check" size={11} class="text-emerald-400" />
								{:else if isMissionLocked}
									<Icon name="lock" size={10} class="text-slate-600" />
								{:else}
									<Icon name="play" size={10} class="text-slate-950 fill-current" />
								{/if}
							</button>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
