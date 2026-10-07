<script lang="ts">
	import type { GameLevel, Challenge } from '$lib/types';
	import Icon from './Icon.svelte';

	let {
		level,
		challenge,
		challengeIndex = 0,
		totalChallengesInLevel = 3,
		onStartMission,
		onBack
	}: {
		level: GameLevel;
		challenge: Challenge;
		challengeIndex?: number;
		totalChallengesInLevel?: number;
		onStartMission: () => void;
		onBack: () => void;
	} = $props();
</script>

<div class="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 max-w-3xl mx-auto w-full select-none animate-fade-in">
	<!-- Top Bar / Back button -->
	<div class="w-full flex items-center justify-between mb-4 sm:mb-6">
		<button
			type="button"
			onclick={onBack}
			class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer group"
		>
			<Icon name="arrow-left" size={16} class="group-hover:-translate-x-1 transition-transform" />
			<span>Kembali ke Coding Game</span>
		</button>

		<span class="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
			Misi {challengeIndex + 1} dari {totalChallengesInLevel}
		</span>
	</div>

	<!-- Main Mission Briefing Card (Works in Portrait & Landscape) -->
	<div class="w-full bg-slate-900/90 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md flex flex-col relative">
		<!-- Large Mission Art Banner -->
		<div class="relative w-full h-48 sm:h-64 bg-slate-950 overflow-hidden">
			<img
				src="/art/adventure_maze_thumb.png"
				alt="Arena Misi Labirin"
				class="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 opacity-90"
			/>
			<div class="absolute inset-0 bg-slate-950/40"></div>

			<!-- Floating PyBot Mascot Badge -->
			<div class="absolute bottom-4 left-4 sm:left-6 flex items-center gap-3">
				<div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-950/80 border-2 border-cyan-400/60 p-1 shadow-xl shadow-cyan-500/20 backdrop-blur-md shrink-0">
					<img
						src="/mascot/pybot-front-idle.png"
						alt="PyBot"
						class="w-full h-full object-contain"
					/>
				</div>
				<div>
					<span class="inline-block text-[11px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 px-2.5 py-0.5 rounded-full mb-1">
						LEVEL {level.id}
					</span>
					<h2 class="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
						{level.title}
					</h2>
				</div>
			</div>
		</div>

		<!-- Mission Details Content -->
		<div class="p-5 sm:p-7 flex flex-col space-y-5">
			<!-- Challenge Title & Objective -->
			<div>
				<h3 class="text-lg sm:text-xl font-black text-white mb-2 flex items-center gap-2">
					<span class="text-amber-400">★</span>
					<span>{challenge.title}</span>
				</h3>
				<div class="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed">
					"{challenge.objective}"
				</div>
			</div>

			<!-- Stats Chips: Misi, XP, Max Moves -->
			<div class="grid grid-cols-3 gap-2.5 sm:gap-3">
				<div class="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
					<div class="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Tantangan</div>
					<div class="text-xs sm:text-sm font-black text-indigo-300">
						{totalChallengesInLevel} Misi
					</div>
				</div>

				<div class="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-center">
					<div class="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Hadiah</div>
					<div class="text-xs sm:text-sm font-black text-amber-400 flex items-center justify-center gap-1">
						<Icon name="zap" size={13} class="text-amber-400" />
						<span>+{challenge.xpReward} XP</span>
					</div>
				</div>

				<div class="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
					<div class="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Batas Langkah</div>
					<div class="text-xs sm:text-sm font-black text-cyan-300">
						{challenge.maxMoves || 6} Langkah
					</div>
				</div>
			</div>

			<!-- Hint Tip Box -->
			{#if challenge.hints && challenge.hints.length > 0}
				<div class="flex items-start gap-2.5 p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 text-xs leading-relaxed">
					<Icon name="sparkles" size={16} class="text-cyan-400 shrink-0 mt-0.5" />
					<p>
						<strong class="text-white">Petunjuk PyBot:</strong> {challenge.hints[0]}
					</p>
				</div>
			{/if}

			<!-- Primary Action CTA -->
			<div class="pt-2">
				<button
					type="button"
					onclick={onStartMission}
					class="w-full py-4 px-6 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-cyan-400/20 transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99]"
				>
					<span>MULAI MISI</span>
					<Icon name="arrow-right" size={20} class="group-hover:translate-x-1 transition-transform" />
				</button>
			</div>
		</div>
	</div>
</div>
