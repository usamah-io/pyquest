<script lang="ts">
	import { progressStore } from '$lib/stores/progressStore';
	import { levelsData } from '$lib/challenges/levelsData';
	import { learningLevelsData } from '$lib/questions/learningLevelsData';
	import Icon from './Icon.svelte';

	let {
		onBackToHome,
		onPlayChallenge,
		onPlayLearningLevel
	}: {
		onBackToHome: () => void;
		onPlayChallenge?: (levelIndex: number, challengeIndex: number) => void;
		onPlayLearningLevel?: (levelId: number) => void;
	} = $props();

	type FilterTab = 'ALL' | 'CODING' | 'LEARN';
	let activeTab = $state<FilterTab>('ALL');

	// Extract completed coding challenges
	let completedCodingItems = $derived.by(() => {
		const completedIds = new Set($progressStore.completedChallenges || []);
		const items: Array<{
			id: string;
			type: 'CODING';
			title: string;
			levelId: number;
			levelTitle: string;
			levelIndex: number;
			challengeIndex: number;
			xp: number;
			objective: string;
		}> = [];

		levelsData.forEach((lvl, lvlIdx) => {
			lvl.challenges.forEach((ch, chIdx) => {
				if (completedIds.has(ch.id)) {
					items.push({
						id: ch.id,
						type: 'CODING',
						title: ch.title,
						levelId: lvl.id,
						levelTitle: lvl.title,
						levelIndex: lvlIdx,
						challengeIndex: chIdx,
						xp: ch.xpReward || ch.xp || 20,
						objective: ch.objective
					});
				}
			});
		});

		return items;
	});

	// Extract completed learning levels
	let completedLearningItems = $derived.by(() => {
		const completedIds = new Set($progressStore.completedLearningLevels || []);
		const items: Array<{
			id: string;
			type: 'LEARN';
			title: string;
			levelId: number;
			levelTitle: string;
			xp: number;
			objective: string;
			scorePercentage?: number;
		}> = [];

		learningLevelsData.forEach((lvl) => {
			if (completedIds.has(lvl.id)) {
				const score = $progressStore.learningLevelScores?.[lvl.id];
				const percent = score ? Math.round((score.correctAnswers / score.totalQuestions) * 100) : 100;
				items.push({
					id: `learn-lvl-${lvl.id}`,
					type: 'LEARN',
					title: lvl.title,
					levelId: lvl.id,
					levelTitle: lvl.unitTitle || `Unit Level ${lvl.id}`,
					xp: lvl.xpReward || 30,
					objective: lvl.objective || lvl.description,
					scorePercentage: percent
				});
			}
		});

		return items;
	});

	let displayedItems = $derived.by(() => {
		if (activeTab === 'CODING') return completedCodingItems;
		if (activeTab === 'LEARN') return completedLearningItems;
		return [...completedCodingItems, ...completedLearningItems];
	});

	let totalCompletedCount = $derived(
		completedCodingItems.length + completedLearningItems.length
	);

	let totalEarnedMissionsXp = $derived(
		completedCodingItems.reduce((acc, c) => acc + c.xp, 0) +
		completedLearningItems.reduce((acc, l) => acc + l.xp, 0)
	);
</script>

<div class="max-w-5xl mx-auto w-full py-4 sm:py-6 px-3 sm:px-4 select-none space-y-6 animate-fade-in">
	<!-- Top Navigation / Back -->
	<div class="flex items-center justify-between">
		<button
			type="button"
			onclick={onBackToHome}
			class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-700 active:scale-95"
		>
			<Icon name="arrow-left" size={15} />
			<span>Kembali ke Beranda</span>
		</button>
		<div class="text-xs font-bold text-slate-500 uppercase tracking-wider">
			Arsip Capaian
		</div>
	</div>

	<!-- Header Banner (Solid Colors, No Gradients) -->
	<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<div class="space-y-1">
				<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-1">
					<Icon name="check-circle" size={13} />
					<span>Katalog Petualangan</span>
				</div>
				<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
					Misi Terselesaikan
				</h2>
				<p class="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
					Daftar seluruh tantangan labirin koding dan modul materi Python yang telah kamu taklukkan.
				</p>
			</div>

			<!-- Summary Stats -->
			<div class="flex items-center gap-3 w-full sm:w-auto">
				<div class="flex-1 sm:flex-initial p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center min-w-[110px]">
					<div class="text-xs text-slate-400 font-bold uppercase">Total Misi</div>
					<div class="text-xl sm:text-2xl font-black text-white">{totalCompletedCount}</div>
				</div>
				<div class="flex-1 sm:flex-initial p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center min-w-[110px]">
					<div class="text-xs text-amber-400 font-bold uppercase">XP Misi</div>
					<div class="text-xl sm:text-2xl font-black text-amber-300">+{totalEarnedMissionsXp}</div>
				</div>
			</div>
		</div>

		<!-- Filter Tabs -->
		<div class="flex items-center gap-2 mt-6 pt-5 border-t border-slate-800 flex-wrap">
			<button
				type="button"
				onclick={() => (activeTab = 'ALL')}
				class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer {activeTab === 'ALL'
					? 'bg-indigo-600 text-white shadow-md'
					: 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}"
			>
				Semua ({totalCompletedCount})
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'CODING')}
				class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 {activeTab === 'CODING'
					? 'bg-cyan-600 text-white shadow-md'
					: 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}"
			>
				<Icon name="compass" size={13} />
				<span>Coding Game ({completedCodingItems.length})</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'LEARN')}
				class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 {activeTab === 'LEARN'
					? 'bg-purple-600 text-white shadow-md'
					: 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}"
			>
				<Icon name="book-open" size={13} />
				<span>Modul Python ({completedLearningItems.length})</span>
			</button>
		</div>
	</div>

	<!-- List of Completed Missions -->
	{#if displayedItems.length === 0}
		<div class="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
			<div class="w-14 h-14 mx-auto rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center">
				<Icon name="compass" size={28} />
			</div>
			<h4 class="text-base font-bold text-white">Belum Ada Misi yang Selesai</h4>
			<p class="text-xs text-slate-400 max-w-sm mx-auto">
				Mulai petualangan koding pertamamu di Coding Game atau pelajari konsep dasar di Modul Belajar Python.
			</p>
			<button
				type="button"
				onclick={onBackToHome}
				class="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition-all active:scale-95"
			>
				Mulai Petualangan Sekarang
			</button>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
			{#each displayedItems as item}
				<div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 shadow-md">
					<div class="flex items-start justify-between gap-3">
						<div class="space-y-1">
							<div class="flex items-center gap-2">
								<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md {item.type === 'CODING'
									? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
									: 'bg-purple-950 text-purple-300 border border-purple-500/30'}">
									{item.type === 'CODING' ? 'Labirin Kode' : 'Kuis Modul'}
								</span>
								<span class="text-xs font-semibold text-slate-400">
									Level {item.levelId}
								</span>
							</div>
							<h4 class="text-sm font-black text-white leading-snug">
								{item.title}
							</h4>
							<p class="text-xs text-slate-400 line-clamp-2">
								{item.objective}
							</p>
						</div>

						<div class="flex flex-col items-end gap-1 shrink-0">
							<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-black">
								<Icon name="check" size={12} class="text-emerald-400" />
								<span>Selesai</span>
							</span>
							<span class="text-[11px] font-mono font-bold text-amber-400">
								+{item.xp} XP
							</span>
						</div>
					</div>

					<!-- Replay Action -->
					<div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
						<span class="text-[11px] text-slate-500">
							{item.levelTitle}
						</span>
						{#if item.type === 'CODING' && onPlayChallenge}
							<button
								type="button"
								onclick={() => onPlayChallenge(item.levelIndex, item.challengeIndex)}
								class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
							>
								<Icon name="play" size={12} />
								<span>Mainkan Lagi</span>
							</button>
						{:else if item.type === 'LEARN' && onPlayLearningLevel}
							<button
								type="button"
								onclick={() => onPlayLearningLevel(item.levelId)}
								class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
							>
								<Icon name="rotate-ccw" size={12} />
								<span>Ulangi Kuis</span>
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
