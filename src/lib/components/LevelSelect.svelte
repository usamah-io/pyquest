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

	// Modal detail state for viewing level objectives, concepts & achievements
	let activeDetailLevel = $state<GameLevel | null>(null);
	let activeDetailIndex = $state<number>(0);
	let lockedNotice = $state<string | null>(null);
	let lockedTimer = $state<any>(null);

	function showLockedNotice(msg: string) {
		lockedNotice = msg;
		if (lockedTimer) clearTimeout(lockedTimer);
		lockedTimer = setTimeout(() => {
			lockedNotice = null;
		}, 3000);
	}

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

	// Identify the current active level player should play next
	let currentActiveLevelIndex = $derived.by(() => {
		for (let i = 0; i < levels.length; i++) {
			const status = getLevelStatus(levels[i], i);
			if (status === 'AVAILABLE') return i;
		}
		return levels.length - 1;
	});

	// Units structure (3 educational units across 10 levels)
	const UNITS = [
		{
			id: 1,
			title: 'Unit 1: Langkah Dasar & Orientasi',
			description: 'Kuasai eksekusi instruksi berurutan, belokan sudut, dan cara menghindari rintangan labirin.',
			color: 'teal',
			badgeClass: 'bg-teal-500/15 border-teal-500/30 text-teal-300',
			bannerClass: 'bg-slate-900 border-teal-500/30',
			levelIds: [1, 2, 3]
		},
		{
			id: 2,
			title: 'Unit 2: Pola Iterasi & Looping',
			description: 'Otomatisasi gerakan berulang dengan blok REPEAT dan pecahkan pola jalur berundak secara efisien.',
			color: 'indigo',
			badgeClass: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
			bannerClass: 'bg-slate-900 border-indigo-500/30',
			levelIds: [4, 5, 6]
		},
		{
			id: 3,
			title: 'Unit 3: Navigasi Kompleks & Algoritma',
			description: 'Rancang strategi langkah minimal, siklus berputar, dan taklukkan labirin puncak PyQuest.',
			color: 'emerald',
			badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
			bannerClass: 'bg-slate-900 border-emerald-500/30',
			levelIds: [7, 8, 9, 10]
		}
	];

	function getLevelNodeOffset(levelId: number): string {
		// Duolingo-inspired zigzag path: left, center, right, center
		const mod = levelId % 4;
		if (mod === 1) return '-translate-x-8 sm:-translate-x-16';
		if (mod === 2) return 'translate-x-0';
		if (mod === 3) return 'translate-x-8 sm:translate-x-16';
		return 'translate-x-0';
	}

	// Selected mission inside compact level overview modal
	let selectedMissionIndex = $state<number>(0);
	let isExplainOpen = $state<boolean>(false);

	function getConceptBadgeStyle(concept: string) {
		const lower = concept.toLowerCase();
		if (lower.includes('loop') || lower.includes('repeat') || lower.includes('siklus') || lower.includes('zig-zag')) {
			return { icon: 'repeat', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' };
		}
		if (lower.includes('belok') || lower.includes('arah') || lower.includes('putar') || lower.includes('rotasi')) {
			return { icon: 'corner-up-right', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
		}
		if (lower.includes('maju') || lower.includes('langkah') || lower.includes('jalan')) {
			return { icon: 'arrow-up', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
		}
		return { icon: 'sparkles', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
	}

	function handleNodeClick(level: GameLevel, index: number) {
		const status = getLevelStatus(level, index);
		if (status === 'LOCKED') {
			showLockedNotice(`Selesaikan Level ${index} terlebih dahulu untuk membuka jalur ini!`);
			return;
		}
		const firstUncompletedIdx = level.challenges.findIndex(
			(ch) => !$progressStore.completedChallenges.includes(ch.id)
		);
		selectedMissionIndex = firstUncompletedIdx !== -1 ? firstUncompletedIdx : 0;
		isExplainOpen = false;
		activeDetailLevel = level;
		activeDetailIndex = index;
	}

	function handleLaunchMission(levelIndex: number, challengeIndex: number) {
		activeDetailLevel = null;
		onSelectLevelChallenge(levelIndex, challengeIndex);
	}
</script>

<div class="flex-1 flex flex-col max-w-4xl mx-auto w-full p-2.5 sm:p-5 overflow-y-auto select-none relative">
	<!-- Top Bar -->
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
					<span class="truncate">Jalur Petualangan Koding</span>
				</h1>
				<p class="text-[11px] sm:text-xs text-slate-400 truncate">
					Pelajari konsep koding Python melalui misi labirin PyBot
				</p>
			</div>
		</div>

		<!-- Progress Pills -->
		<div class="flex items-center gap-2 shrink-0">
			<div class="flex items-center gap-1.5 text-[11px] sm:text-xs bg-slate-900 border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-emerald-400">
				<Icon name="trophy" size={14} class="text-emerald-400 shrink-0" />
				<span>{$progressStore.completedChallenges.length} / 30</span>
				<span class="text-slate-500 font-normal hidden md:inline">Misi</span>
			</div>
			<div class="flex items-center gap-1.5 text-[11px] sm:text-xs bg-slate-900 border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-amber-400">
				<Icon name="zap" size={14} class="text-amber-400 shrink-0" />
				<span>{$progressStore.xp} XP</span>
			</div>
		</div>
	</div>

	<!-- Locked Notice Toast -->
	{#if lockedNotice}
		<div class="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-rose-950/90 border border-rose-500 text-rose-200 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold backdrop-blur-md animate-fade-in">
			<Icon name="lock" size={16} class="text-rose-400 shrink-0" />
			<span>{lockedNotice}</span>
		</div>
	{/if}

	<!-- VERTICAL LEARNING PATH BY UNITS -->
	<div class="flex flex-col space-y-10 sm:space-y-14 pb-16">
		{#each UNITS as unit}
			{@const unitLevels = levels.filter((lvl) => unit.levelIds.includes(lvl.id))}
			{@const unitCompletedCount = unitLevels.filter(
				(lvl) => getLevelStatus(lvl, lvl.id - 1) === 'COMPLETED'
			).length}

			<section class="flex flex-col items-center relative">
				<!-- Unit Header Card (Duolingo-inspired Banner) -->
				<div class="w-full max-w-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 border {unit.bannerClass} shadow-xl mb-6 relative overflow-hidden">
					<div class="flex items-center justify-between gap-2 mb-1.5">
						<span class="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-lg border {unit.badgeClass}">
							Bagian {unit.id}
						</span>
						<span class="text-xs font-bold text-slate-400 font-mono">
							{unitCompletedCount}/{unitLevels.length} Level Selesai
						</span>
					</div>
					<h2 class="text-sm sm:text-lg font-black text-white mb-1">
						{unit.title}
					</h2>
					<p class="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-md">
						{unit.description}
					</p>
				</div>

				<!-- Stepping Stone Vertical Pathway -->
				<div class="w-full max-w-md flex flex-col items-center space-y-6 sm:space-y-8 relative">
					{#each unitLevels as level, uIdx}
						{@const globalIndex = level.id - 1}
						{@const status = getLevelStatus(level, globalIndex)}
						{@const { completed, total } = getLevelProgress(level)}
						{@const isCompleted = status === 'COMPLETED'}
						{@const isCurrent = globalIndex === currentActiveLevelIndex}
						{@const isLocked = status === 'LOCKED'}
						{@const offsetClass = getLevelNodeOffset(level.id)}

						<div class="flex flex-col items-center relative transition-transform {offsetClass}">
							<!-- PyBot Mascot Sitting Beside Current Node -->
							{#if isCurrent}
								<div class="absolute -right-24 sm:-right-32 top-0 flex items-center gap-2 pointer-events-none z-20 animate-fade-in hidden xs:flex">
									<div class="relative bg-slate-900/90 border border-cyan-400/50 rounded-2xl p-2 sm:p-2.5 shadow-xl max-w-[130px] sm:max-w-[150px] text-left">
										<p class="text-[10px] sm:text-[11px] font-bold text-cyan-200 leading-tight">
											Ayo taklukkan level ini!
										</p>
										<div class="text-[9px] text-slate-400 mt-0.5 truncate">
											{level.achievement?.title || 'Buka Lencana'}
										</div>
									</div>
									<img
										src="/mascot/pybot-looking-right.png"
										alt="PyBot Companion"
										class="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_4px_12px_rgba(6,182,212,0.4)] animate-bounce"
									/>
								</div>
							{/if}

							<!-- 3D Tactile Stepping Stone Node Button -->
							<button
								type="button"
								onclick={() => handleNodeClick(level, globalIndex)}
								class="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all duration-200 cursor-pointer {isCompleted
									? 'bg-emerald-600 border-4 border-emerald-300 shadow-[0_8px_0_#0f5132] hover:bg-emerald-500 active:translate-y-1 active:shadow-[0_4px_0_#0f5132]'
									: isCurrent
									? 'bg-cyan-400 border-4 border-white shadow-[0_8px_0_#065f46] ring-4 ring-cyan-400/50 ring-offset-4 ring-offset-slate-950 animate-pulse hover:bg-cyan-300 active:translate-y-1 active:shadow-[0_4px_0_#065f46]'
									: 'bg-slate-800 border-4 border-slate-700/80 shadow-[0_6px_0_#0f172a] text-slate-500 hover:border-slate-600'}"
								title={isLocked ? `Selesaikan Level ${globalIndex} terlebih dahulu` : `Level ${level.id}: ${level.title}`}
								aria-label={`Buka rincian Level ${level.id}`}
							>
								<!-- Top Bevel Highlight for 3D depth -->
								<div class="absolute inset-x-2 top-1.5 h-3 bg-white/20 rounded-full blur-[1px] pointer-events-none"></div>

								<!-- Center Icon / Number -->
								<div class="flex flex-col items-center justify-center text-white z-10">
									{#if isCompleted}
										<Icon name={level.achievement?.icon || 'trophy'} size={26} class="text-amber-300 drop-shadow-md" />
										<span class="text-[10px] font-black tracking-tight text-white/90 mt-0.5">Lvl {level.id}</span>
									{:else if isCurrent}
										<Icon name="play" size={26} class="text-slate-950 fill-current ml-0.5" />
										<span class="text-[10px] font-black tracking-tight text-slate-950 mt-0.5">Lvl {level.id}</span>
									{:else}
										<Icon name="lock" size={22} class="text-slate-500" />
										<span class="text-[10px] font-bold text-slate-500 mt-0.5">Lvl {level.id}</span>
									{/if}
								</div>

								<!-- Crown / Star Badge on Completed Nodes -->
								{#if isCompleted}
									<div class="absolute -top-2 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-black shadow-md border border-amber-300 flex items-center gap-0.5">
										<Icon name="star" size={10} class="fill-current text-slate-950" />
										<span>3/3</span>
									</div>
								{:else if isCurrent}
									<div class="absolute -top-2 bg-cyan-400 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-black shadow-md border border-cyan-200 uppercase tracking-wider animate-bounce">
										Mainkan
									</div>
								{/if}
							</button>

							<!-- Informative Level Milestone Card Below Node -->
							<button
								type="button"
								onclick={() => handleNodeClick(level, globalIndex)}
								class="mt-2.5 px-3 py-1.5 rounded-2xl border transition-all text-center max-w-[200px] cursor-pointer {isCompleted
									? 'bg-slate-900/90 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
									: isCurrent
									? 'bg-slate-900 border-cyan-400/60 text-white shadow-lg shadow-cyan-500/10 hover:border-cyan-400'
									: 'bg-slate-950/60 border-slate-800 text-slate-500'}"
							>
								<div class="text-xs font-black truncate">{level.title}</div>
								<div class="text-[10px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
									{#if isCompleted}
										<Icon name="check" size={11} class="text-emerald-400" />
										<span>Selesai ({completed}/{total})</span>
									{:else if isCurrent}
										<span class="text-cyan-300 font-bold font-mono">{completed}/{total} Misi Selesai</span>
									{:else}
										<span>Terkunci</span>
									{/if}
								</div>
								{#if level.achievement}
									<div class="text-[9px] text-amber-400/90 font-medium truncate mt-0.5">
										🏆 {level.achievement.title}
									</div>
								{/if}
							</button>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>

	<!-- ========================================== -->
	<!-- COMPACT GAME LEVEL OVERVIEW MODAL -->
	<!-- ========================================== -->
	{#if activeDetailLevel}
		{@const level = activeDetailLevel}
		{@const levelIdx = activeDetailIndex}
		{@const status = getLevelStatus(level, levelIdx)}
		{@const { completed, total } = getLevelProgress(level)}
		{@const isCompleted = status === 'COMPLETED'}
		{@const activeChallenge = level.challenges[selectedMissionIndex] || level.challenges[0]}
		{@const isSelectedDone = $progressStore.completedChallenges.includes(activeChallenge.id)}
		{@const isSelectedPrevDone = selectedMissionIndex === 0 || $progressStore.completedChallenges.includes(level.challenges[selectedMissionIndex - 1].id)}
		{@const isSelectedLocked = status === 'LOCKED' || (!isSelectedPrevDone && !isSelectedDone)}

		<div
			role="dialog"
			aria-modal="true"
			class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
		>
			<div class="w-full max-w-md max-h-[92dvh] overflow-y-auto bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl relative text-left">
				<!-- Close Button -->
				<button
					type="button"
					onclick={() => (activeDetailLevel = null)}
					class="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
					aria-label="Tutup Ringkasan Level"
				>
					<Icon name="x" size={18} />
				</button>

				<!-- 1. Header (Level Number & Title) -->
				<div class="flex items-center gap-2 mb-1">
					<span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
						Level {level.id}
					</span>
					<span class="text-[10px] text-slate-400 font-mono">
						{completed}/{total} Misi Selesai
					</span>
				</div>

				<h3 class="text-base sm:text-xl font-black text-white mb-2 truncate">
					{level.title}
				</h3>

				<!-- 2. Compact Learning Goal Card with Progressive Disclosure Button -->
				<div class="p-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/25 mb-2.5 flex items-center justify-between gap-2">
					<div class="flex items-center gap-2 min-w-0">
						<div class="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
							<Icon name="target" size={13} />
						</div>
						<p class="text-xs font-bold text-indigo-200 truncate">
							{level.objective || 'Pelajari konsep koding.'}
						</p>
					</div>

					<!-- Progressive Disclosure Toggle -->
					<button
						type="button"
						onclick={() => (isExplainOpen = !isExplainOpen)}
						class="px-2 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-[10px] font-bold text-cyan-300 hover:text-white transition-colors cursor-pointer shrink-0 flex items-center gap-1"
						title="Pelajari lebih lanjut"
					>
						<Icon name="help-circle" size={11} />
						<span>{isExplainOpen ? 'Tutup' : 'Apa ini?'}</span>
					</button>
				</div>

				<!-- Progressive Disclosure Popover / Bottom Sheet -->
				{#if isExplainOpen}
					<div class="p-3 rounded-2xl bg-slate-950 border border-cyan-400/40 shadow-xl text-xs text-slate-200 mb-2.5 animate-fade-in">
						<div class="text-[10px] uppercase font-black tracking-wider text-cyan-300 mb-1 flex items-center gap-1.5">
							<Icon name="sparkles" size={12} />
							<span>Apa yang Kamu Pelajari?</span>
						</div>
						<p class="text-[11px] leading-relaxed text-slate-300">
							{level.quickTip || level.concept}
						</p>
						<button
							type="button"
							onclick={() => (isExplainOpen = false)}
							class="mt-2 text-[10px] font-bold text-cyan-400 hover:text-cyan-200 cursor-pointer block"
						>
							Oke, mengerti!
						</button>
					</div>
				{/if}

				<!-- 3. Visual Concept Indicators (Block Style Chips) -->
				{#if level.concepts && level.concepts.length > 0}
					<div class="flex flex-wrap items-center gap-1.5 mb-3">
						{#each level.concepts as conceptTag}
							{@const style = getConceptBadgeStyle(conceptTag)}
							<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-lg border {style.bg}">
								<Icon name={style.icon} size={11} />
								<span>{conceptTag}</span>
							</span>
						{/each}
					</div>
				{/if}

				<!-- 4. Game-like Mission Progression (Visual Stepping Stones) -->
				<div class="mb-3 p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
					<div class="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 mb-2">
						<span>Pilih Misi</span>
						<span class="font-mono text-cyan-400 font-bold">Misi {selectedMissionIndex + 1} Terpilih</span>
					</div>

					<div class="flex items-center justify-center gap-2">
						{#each level.challenges as ch, chIdx}
							{@const chDone = $progressStore.completedChallenges.includes(ch.id)}
							{@const isPrevDone = chIdx === 0 || $progressStore.completedChallenges.includes(level.challenges[chIdx - 1].id)}
							{@const isChLocked = status === 'LOCKED' || (!isPrevDone && !chDone)}
							{@const isSelected = selectedMissionIndex === chIdx}

							<button
								type="button"
								disabled={isChLocked}
								onclick={() => (selectedMissionIndex = chIdx)}
								class="flex-1 py-2 px-1.5 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer {isSelected
									? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/20 ring-2 ring-cyan-400/30 text-white'
									: chDone
									? 'bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-400 text-emerald-300'
									: isChLocked
									? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
									: 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300'}"
								title={isChLocked ? 'Selesaikan misi sebelumnya' : `Misi ${chIdx + 1}: ${ch.title}`}
							>
								<div class="flex items-center gap-1 mb-0.5">
									<span class="text-xs font-black">M{chIdx + 1}</span>
									{#if chDone}
										<Icon name="check-circle" size={11} class="text-emerald-400" />
									{:else if isChLocked}
										<Icon name="lock" size={10} class="text-slate-600" />
									{:else}
										<Icon name="star" size={10} class="text-amber-400 fill-current" />
									{/if}
								</div>
								<span class="text-[9px] font-mono text-amber-400">+{ch.xpReward} XP</span>
							</button>
						{/each}
					</div>

					<!-- Selected Mission Name & Goal Info -->
					<div class="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
						<div class="min-w-0 pr-2">
							<span class="font-bold text-white text-[11px] truncate block">
								M{selectedMissionIndex + 1}: {activeChallenge.title}
							</span>
							<span class="text-[10px] text-slate-400 truncate block">
								{activeChallenge.objective}
							</span>
						</div>
						<span class="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold shrink-0">
							+{activeChallenge.xpReward} XP
						</span>
					</div>
				</div>

				<!-- 5. Achievement (Compact 1-Row Card) -->
				{#if level.achievement}
					<div class="p-2 rounded-xl bg-slate-950/60 border border-amber-500/30 flex items-center justify-between gap-2 mb-3">
						<div class="flex items-center gap-2 min-w-0">
							<div class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
								<Icon name={level.achievement.icon || 'trophy'} size={13} />
							</div>
							<div class="min-w-0">
								<span class="text-[10px] text-amber-300 font-bold block truncate">
									🏆 Pencapaian: {level.achievement.title}
								</span>
							</div>
						</div>
						<span class="text-[10px] font-black text-amber-400 shrink-0 font-mono">
							+{level.achievement.xpReward} XP
						</span>
					</div>
				{/if}

				<!-- 6. Primary Action CTA Button -->
				<button
					type="button"
					disabled={isSelectedLocked}
					onclick={() => handleLaunchMission(levelIdx, selectedMissionIndex)}
					class="w-full py-3 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-cyan-400/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
				>
					<Icon name="play" size={15} class="fill-current text-slate-950" />
					<span>
						{isSelectedDone ? `MAIN ULANG MISI ${selectedMissionIndex + 1}` : `MULAI MISI ${selectedMissionIndex + 1}`}
					</span>
				</button>
			</div>
		</div>
	{/if}
</div>
