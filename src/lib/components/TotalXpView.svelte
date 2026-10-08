<script lang="ts">
	import { dashboardUserStore } from '$lib/stores/authStore';
	import { progressStore } from '$lib/stores/progressStore';
	import { levelsData } from '$lib/challenges/levelsData';
	import { learningLevelsData } from '$lib/questions/learningLevelsData';
	import Icon from './Icon.svelte';

	let {
		onBackToHome
	}: {
		onBackToHome: () => void;
	} = $props();

	// Calculations for XP Breakdown
	let codingXp = $derived.by(() => {
		const completedSet = new Set($progressStore.completedChallenges || []);
		let total = 0;
		levelsData.forEach((lvl) => {
			lvl.challenges.forEach((ch) => {
				if (completedSet.has(ch.id)) {
					total += ch.xpReward || ch.xp || 20;
				}
			});
		});
		return total;
	});

	let learningXp = $derived.by(() => {
		const completedSet = new Set($progressStore.completedLearningLevels || []);
		let total = 0;
		learningLevelsData.forEach((lvl) => {
			if (completedSet.has(lvl.id)) {
				const score = $progressStore.learningLevelScores?.[lvl.id];
				if (score) {
					total += Math.round((score.correctAnswers / score.totalQuestions) * (lvl.xpReward || 30));
				} else {
					total += lvl.xpReward || 30;
				}
			}
		});
		return total;
	});

	let achievementXp = $derived.by(() => {
		const completedLvlSet = new Set($progressStore.completedLevels || []);
		let total = 0;
		levelsData.forEach((lvl) => {
			if (completedLvlSet.has(lvl.id) && lvl.achievement) {
				total += lvl.achievement.xpReward || 25;
			}
		});
		return total;
	});

	// Current XP & Level Progression
	let totalXp = $derived($dashboardUserStore.xp || 0);
	let currentLevel = $derived($dashboardUserStore.level || 1);
	let xpForNextLevel = $derived(currentLevel * 100);
	let xpCurrentLevelFloor = $derived((currentLevel - 1) * 100);
	let xpProgressInLevel = $derived(Math.max(0, totalXp - xpCurrentLevelFloor));
	let progressPercentage = $derived(
		Math.min(100, Math.round((xpProgressInLevel / 100) * 100))
	);

	// Rank Titles
	function getRankTitle(lvl: number): string {
		if (lvl >= 30) return 'Grandmaster Python';
		if (lvl >= 25) return 'Arsitek Kode Senior';
		if (lvl >= 20) return 'Peretas Labirin Ahli';
		if (lvl >= 15) return 'Pakar Logika Komputasi';
		if (lvl >= 10) return 'Insinyur Algoritma';
		if (lvl >= 5) return 'Programmer Muda';
		return 'Penjelajah Pemula';
	}
</script>

<div class="max-w-4xl mx-auto w-full py-4 sm:py-6 px-3 sm:px-4 select-none space-y-6 animate-fade-in">
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
			Progres Pengalaman
		</div>
	</div>

	<!-- Main Total XP Hero Card (Solid Colors, No Gradients) -->
	<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
		<div class="flex flex-col md:flex-row items-center justify-between gap-6">
			<div class="text-center md:text-left space-y-2">
				<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
					<Icon name="star" size={13} />
					<span>Koleksi Pengalaman</span>
				</div>
				<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
					{totalXp} <span class="text-amber-400 text-2xl sm:text-3xl">XP</span>
				</h2>
				<p class="text-xs sm:text-sm text-slate-400 max-w-md">
					Gelar Saat Ini: <span class="text-cyan-400 font-bold">{getRankTitle(currentLevel)}</span> (Level {currentLevel})
				</p>
			</div>

			<!-- Circular or Large Level Badge -->
			<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border-2 border-indigo-500/40 p-3 shadow-xl flex flex-col items-center justify-center shrink-0">
				<Icon name="shield" size={28} class="text-indigo-400 mb-1" />
				<span class="text-xs font-bold text-slate-400 uppercase">Level</span>
				<span class="text-xl sm:text-2xl font-black text-white">{currentLevel}</span>
			</div>
		</div>

		<!-- Progress Bar to Next Level -->
		<div class="mt-6 pt-5 border-t border-slate-800 space-y-2">
			<div class="flex items-center justify-between text-xs font-bold">
				<span class="text-slate-400">Menuju Level {currentLevel + 1}</span>
				<span class="text-amber-400 font-mono">{xpProgressInLevel} / 100 XP ({progressPercentage}%)</span>
			</div>
			<div class="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
				<div
					class="h-full bg-amber-500 rounded-full transition-all duration-500"
					style="width: {progressPercentage}%"
				></div>
			</div>
		</div>
	</div>

	<!-- Breakdown Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
		<!-- Coding Game XP -->
		<div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
			<div class="flex items-center justify-between">
				<div class="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
					<Icon name="compass" size={20} />
				</div>
				<span class="text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20">
					Labirin
				</span>
			</div>
			<div>
				<div class="text-xl sm:text-2xl font-black text-white">{codingXp} XP</div>
				<div class="text-xs text-slate-400 font-medium">Dari Coding Block Game</div>
			</div>
			<div class="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
				{($progressStore.completedChallenges || []).length} tantangan diselesaikan
			</div>
		</div>

		<!-- Learning Modules XP -->
		<div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
			<div class="flex items-center justify-between">
				<div class="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center">
					<Icon name="book-open" size={20} />
				</div>
				<span class="text-xs font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/20">
					Modul
				</span>
			</div>
			<div>
				<div class="text-xl sm:text-2xl font-black text-white">{learningXp} XP</div>
				<div class="text-xs text-slate-400 font-medium">Dari Kuis Modul Python</div>
			</div>
			<div class="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
				{($progressStore.completedLearningLevels || []).length} level kuis diselesaikan
			</div>
		</div>

		<!-- Achievements Bonus XP -->
		<div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
			<div class="flex items-center justify-between">
				<div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
					<Icon name="award" size={20} />
				</div>
				<span class="text-xs font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/20">
					Bonus
				</span>
			</div>
			<div>
				<div class="text-xl sm:text-2xl font-black text-white">{achievementXp} XP</div>
				<div class="text-xs text-slate-400 font-medium">Dari Lencana Level</div>
			</div>
			<div class="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
				{($progressStore.completedLevels || []).length} lencana prestasi diraih
			</div>
		</div>
	</div>

	<!-- Tips to earn more XP -->
	<div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
		<h4 class="text-sm font-black text-white flex items-center gap-2">
			<Icon name="zap" size={16} class="text-amber-400" />
			<span>Cara Mengumpulkan Lebih Banyak XP</span>
		</h4>
		<ul class="text-xs text-slate-400 space-y-2 list-disc list-inside">
			<li>Selesaikan setiap misi baru di <strong class="text-slate-200">Coding Game</strong> untuk memperoleh 20-40 XP per tantangan.</li>
			<li>Jawab kuis di <strong class="text-slate-200">Modul Python</strong> dengan sempurna (5/5 benar) untuk meraih reward XP penuh.</li>
			<li>Tuntaskan seluruh misi dalam 1 level untuk membuka <strong class="text-slate-200">Lencana Level</strong> dan bonus 25-50 XP!</li>
			<li>Jaga streak belajar harianmu agar tidak terputus.</li>
		</ul>
	</div>
</div>
