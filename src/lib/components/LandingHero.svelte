<script lang="ts">
	import { progressStore } from '$lib/stores/progressStore';
	import { dashboardUserStore } from '$lib/stores/authStore';
	import { levelsData } from '$lib/challenges/levelsData';
	import { learningLevelsData } from '$lib/questions/learningLevelsData';
	import Icon from './Icon.svelte';

	let {
		onStartLearning,
		onStartCodingGame,
		onContinueCoding,
		onContinueLearning
	}: {
		onStartLearning: () => void;
		onStartCodingGame: () => void;
		onContinueCoding?: (lvlIdx: number, chIdx: number) => void;
		onContinueLearning?: (levelId: number) => void;
	} = $props();

	// PyBot Companion State & Cursor Tracking
	type MascotPose = 'idle' | 'left' | 'right' | 'waving' | 'happy';
	let mascotPose = $state<MascotPose>('waving');
	let isHoveringMascot = $state(false);

	const poseMap: Record<MascotPose, string> = {
		idle: '/mascot/pybot-front-idle.png',
		left: '/mascot/pybot-looking-left.png',
		right: '/mascot/pybot-looking-right.png',
		waving: '/mascot/pybot-waving.png',
		happy: '/mascot/pybot-happy-success.png'
	};

	let mascotContainer = $state<HTMLDivElement | null>(null);

	function handleMouseMove(e: MouseEvent) {
		if (isHoveringMascot) return;
		if (!mascotContainer) return;
		const rect = mascotContainer.getBoundingClientRect();
		const mascotCenterX = rect.left + rect.width / 2;
		const diffX = e.clientX - mascotCenterX;

		if (diffX < -120) {
			mascotPose = 'left';
		} else if (diffX > 120) {
			mascotPose = 'right';
		} else {
			mascotPose = 'waving';
		}
	}

	function handleMascotClick() {
		mascotPose = 'happy';
		setTimeout(() => {
			mascotPose = 'waving';
		}, 3000);
	}

	function handleMascotMouseEnter() {
		isHoveringMascot = true;
		mascotPose = 'happy';
	}

	function handleMascotMouseLeave() {
		isHoveringMascot = false;
		mascotPose = 'waving';
	}

	// Calculate Real Player Progress from $progressStore
	let completedChallengesSet = $derived(new Set($progressStore.completedChallenges));
	let totalChallengesCount = $derived(
		levelsData.reduce((acc, lvl) => acc + lvl.challenges.length, 0)
	);
	let completedChallengesCount = $derived($progressStore.completedChallenges.length);
	let totalQuestionsCount = $derived(
		learningLevelsData.reduce((acc, lvl) => acc + lvl.questionIds.length, 0)
	);
	let completedQuestionsCount = $derived($progressStore.completedQuestions.length);

	// Find the Next Active Challenge for "Lanjutkan Petualangan"
	let nextCodingAdventure = $derived.by(() => {
		for (let lIdx = 0; lIdx < levelsData.length; lIdx++) {
			const lvl = levelsData[lIdx];
			for (let cIdx = 0; cIdx < lvl.challenges.length; cIdx++) {
				const ch = lvl.challenges[cIdx];
				if (!completedChallengesSet.has(ch.id)) {
					const completedInThisLevel = lvl.challenges.filter((c) =>
						completedChallengesSet.has(c.id)
					).length;
					return {
						lvlIdx: lIdx,
						chIdx: cIdx,
						levelId: lvl.id,
						levelTitle: lvl.title,
						challengeTitle: ch.title,
						objective: ch.objective,
						progressStr: `${completedInThisLevel} / ${lvl.challenges.length} Misi`,
						progressPercent: Math.round((completedInThisLevel / lvl.challenges.length) * 100),
						isFinished: false
					};
				}
			}
		}
		// All challenges completed!
		return {
			lvlIdx: 0,
			chIdx: 0,
			levelId: 1,
			levelTitle: 'Semua Misi Selesai!',
			challengeTitle: 'Master PyQuest',
			objective: 'Kamu telah menuntaskan seluruh tantangan koding. Ulangi untuk melatih kecepatan!',
			progressStr: `${totalChallengesCount} / ${totalChallengesCount} Misi`,
			progressPercent: 100,
			isFinished: true
		};
	});

	// Find Next Learning Level for Module Card
	let nextLearningLevel = $derived.by(() => {
		const completedSet = new Set($progressStore.completedLearningLevels || []);
		for (const lvl of learningLevelsData) {
			if (!completedSet.has(lvl.id)) return lvl;
		}
		return learningLevelsData[0];
	});

	// Dynamic Recent Activities based on real stored completions
	let recentActivities = $derived.by(() => {
		const items: Array<{
			id: string;
			title: string;
			category: string;
			timeAgo: string;
			status: 'completed' | 'available' | 'locked';
		}> = [];

		if ($progressStore.completedLearningLevels && $progressStore.completedLearningLevels.length > 0) {
			const lastLvl = $progressStore.completedLearningLevels[$progressStore.completedLearningLevels.length - 1];
			items.push({
				id: 'act-learn',
				title: `Menyelesaikan Level ${lastLvl}`,
				category: 'Modul Python',
				timeAgo: 'Baru saja',
				status: 'completed'
			});
		} else {
			items.push({
				id: 'act-learn-init',
				title: 'Level 1 Tersedia',
				category: 'Modul Python',
				timeAgo: 'Mulai sekarang',
				status: 'available'
			});
		}

		if ($progressStore.completedChallenges && $progressStore.completedChallenges.length > 0) {
			items.push({
				id: 'act-game',
				title: `Menyelesaikan Misi ${$progressStore.completedChallenges.length}`,
				category: 'Coding Game',
				timeAgo: 'Hari ini',
				status: 'completed'
			});
		} else {
			items.push({
				id: 'act-game-init',
				title: 'Misi 1 Siap Dimainkan',
				category: 'Coding Game',
				timeAgo: 'Siap meluncur',
				status: 'available'
			});
		}

		const nextLvlNum = nextCodingAdventure.levelId;
		items.push({
			id: 'act-next',
			title: `Level ${nextLvlNum} Tersedia`,
			category: 'Lanjutkan petualanganmu!',
			timeAgo: 'Target berikutnya',
			status: 'available'
		});

		return items.slice(0, 3);
	});
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="flex-1 flex flex-col space-y-5 sm:space-y-6 max-w-6xl mx-auto w-full select-none pb-8 animate-fade-in">
	<!-- ======================================================== -->
	<!-- 1. CINEMATIC DASHBOARD HERO                              -->
	<!-- ======================================================== -->
	<section
		class="relative w-full rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/90 shadow-2xl backdrop-blur-md"
	>
		<!-- Background Panorama Artwork -->
		<div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
			<img
				src="/art/hero_banner_panorama.png"
				alt="Dunia Petualangan Python"
				class="w-full h-full object-cover object-right md:object-center opacity-40 mix-blend-screen scale-105"
			/>
			<div class="absolute inset-0 bg-slate-950/60"></div>
		</div>

		<!-- Hero Content Grid -->
		<div class="relative z-10 p-5 sm:p-7 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
			<!-- Left: Greeting & Description & Stats Pills -->
			<div class="flex-1 flex flex-col space-y-4 max-w-xl text-left">
				<div>
					<div class="text-xs sm:text-sm font-semibold text-slate-400 mb-1 flex items-center gap-2">
						<span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
						<span>Selamat datang kembali,</span>
					</div>
					<h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
						Hi, {$dashboardUserStore.firstName || $dashboardUserStore.name}!
					</h1>
					<p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
						Teruskan petualanganmu, kuasai logika pemrograman, dan jadilah programmer hebat!
					</p>
				</div>

				<!-- Compact Stats Pills (Dynamic from authenticated user / progressStore) -->
				<div class="flex flex-wrap items-center gap-2 pt-1">
					<!-- XP Pill -->
					<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-xs">
						<Icon name="star" size={14} class="text-amber-400" />
						<span>{$dashboardUserStore.xp} XP</span>
					</div>

					<!-- Level Pill -->
					<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-xs">
						<Icon name="shield" size={14} class="text-indigo-400" />
						<span>Level {$dashboardUserStore.level}</span>
					</div>

					<!-- Misi Pill -->
					<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-xs">
						<Icon name="check-circle" size={14} class="text-cyan-400" />
						<span>{completedChallengesCount} / {totalChallengesCount} Misi</span>
					</div>

					<!-- Soal Pill -->
					<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold shadow-xs">
						<Icon name="book-open" size={14} class="text-purple-400" />
						<span>{completedQuestionsCount} / {totalQuestionsCount} Soal</span>
					</div>

					<!-- Streak Pill -->
					<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-xs">
						<Icon name="flame" size={14} class="text-amber-400" />
						<span>{$dashboardUserStore.streak} Hari</span>
					</div>
				</div>
			</div>

			<!-- Right: PyBot Mascot Companion with Speech Bubble -->
			<div
				bind:this={mascotContainer}
				class="relative shrink-0 flex flex-col items-center justify-center cursor-pointer group"
				onclick={handleMascotClick}
				onmouseenter={handleMascotMouseEnter}
				onmouseleave={handleMascotMouseLeave}
				role="button"
				tabindex="0"
				aria-label="Maskot PyBot"
				onkeydown={(e) => e.key === 'Enter' && handleMascotClick()}
			>

				<!-- PyBot 3D Image -->
				<div class="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
					<img
						src={poseMap[mascotPose]}
						alt="PyBot Mascot"
						class="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(34,211,238,0.25)] transition-all duration-300"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- ======================================================== -->
	<!-- 2. LANJUTKAN PETUALANGAN (LAST UNFINISHED ACTIVITY)       -->
	<!-- ======================================================== -->
	<section
		class="w-full rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 hover:border-slate-700 transition-all relative overflow-hidden group"
	>
		<!-- Background Artwork Layer -->
		<div class="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
			<img src="/art/adventure_maze_thumb.png" alt="" class="w-full h-full object-cover filter blur-xs scale-105" />
			<div class="absolute inset-0 bg-slate-900/90"></div>
		</div>

		<!-- Left Thumbnail Artwork + Mission Info -->
		<div class="flex items-center gap-4 sm:gap-5 w-full sm:w-auto relative z-10">
			<!-- Maze Thumbnail Art -->
			<div class="w-24 h-18 sm:w-36 sm:h-22 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0 shadow-md relative group-hover:scale-[1.02] transition-transform">
				<img
					src="/art/adventure_maze_thumb.png"
					alt="Thumbnail Labirin Petualangan"
					class="w-full h-full object-cover"
				/>
				<div class="absolute inset-0 bg-slate-950/20"></div>
			</div>

			<!-- Mission Info & Progress -->
			<div class="flex-1 min-w-0 text-left">
				<div class="flex items-center gap-2 mb-1">
					<span class="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 px-2 py-0.5 rounded-full">
						Lanjutkan Petualangan
					</span>
				</div>
				<h3 class="text-sm sm:text-base font-black text-white truncate group-hover:text-cyan-300 transition-colors">
					{nextCodingAdventure.levelTitle} · {nextCodingAdventure.challengeTitle}
				</h3>
				<p class="text-xs text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
					{nextCodingAdventure.objective}
				</p>

				<!-- Progress Bar -->
				<div class="mt-2.5 flex items-center gap-3">
					<div class="flex-1 h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden max-w-xs">
						<div
							class="h-full bg-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
							style="width: {nextCodingAdventure.progressPercent}%;"
						></div>
					</div>
					<span class="text-[11px] font-mono text-slate-400 font-bold shrink-0">
						{nextCodingAdventure.progressStr}
					</span>
				</div>
			</div>
		</div>

		<!-- Right: Action Button -->
		<div class="w-full sm:w-auto shrink-0 flex justify-end relative z-10">
			<button
				type="button"
				onclick={() => {
					if (onContinueCoding) {
						onContinueCoding(nextCodingAdventure.lvlIdx, nextCodingAdventure.chIdx);
					} else {
						onStartCodingGame();
					}
				}}
				class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:scale-105 active:scale-95"
			>
				<span>Lanjutkan</span>
				<Icon name="arrow-right" size={16} class="group-hover:translate-x-1 transition-transform" />
			</button>
		</div>
	</section>

	<!-- ======================================================== -->
	<!-- 3. MAIN FEATURE CARDS (2 COLUMNS: MODUL BELAJAR & GAME) -->
	<!-- ======================================================== -->
	<section class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
		<!-- CARD 1: MODUL BELAJAR PYTHON -->
		<div
			class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/50 transition-all relative overflow-hidden group"
		>
			<!-- Ambient Card Art Overlay -->
			<div class="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
				<img src="/art/module_learn_art.png" alt="" class="w-full h-full object-cover filter blur-[2px] scale-105" />
				<div class="absolute inset-0 bg-slate-900/80"></div>
			</div>

			<div class="flex items-start justify-between gap-4 relative z-10">
				<div class="flex-1 text-left">
					<!-- Icon Badge -->
					<div class="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-3 shadow-md">
						<Icon name="book-open" size={20} />
					</div>
					<h3 class="text-lg font-black text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
						Modul Belajar Python
					</h3>
					<p class="text-xs text-slate-400 leading-relaxed max-w-xs">
						Pelajari konsep Python lewat tantangan singkat dan materi interaktif.
					</p>
				</div>

				<!-- Artwork Thumbnail -->
				<div class="w-24 h-20 sm:w-28 sm:h-22 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
					<img
						src="/art/module_learn_art.png"
						alt="Modul Belajar Python"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>

			<!-- Footer: Progress & Button -->
			<div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 relative z-10">
				<div>
					<div class="text-[11px] font-mono text-slate-400">
						{completedQuestionsCount} / {totalQuestionsCount} Soal
					</div>
					<div class="w-24 sm:w-32 h-1.5 bg-slate-950 rounded-full mt-1.5 overflow-hidden">
						<div
							class="h-full bg-indigo-500 rounded-full transition-all duration-500"
							style="width: {Math.round((completedQuestionsCount / totalQuestionsCount) * 100)}%;"
						></div>
					</div>
				</div>

				<button
					type="button"
					onclick={() => {
						if (onContinueLearning) {
							onContinueLearning(nextLearningLevel.id);
						} else {
							onStartLearning();
						}
					}}
					class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
				>
					<span>Mulai Belajar</span>
					<Icon name="arrow-right" size={14} />
				</button>
			</div>
		</div>

		<!-- CARD 2: CODING GAME -->
		<div
			class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/50 transition-all relative overflow-hidden group"
		>
			<!-- Ambient Card Art Overlay -->
			<div class="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
				<img src="/art/coding_game_art.png" alt="" class="w-full h-full object-cover filter blur-[2px] scale-105" />
				<div class="absolute inset-0 bg-slate-900/80"></div>
			</div>

			<div class="flex items-start justify-between gap-4 relative z-10">
				<div class="flex-1 text-left">
					<!-- Icon Badge -->
					<div class="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mb-3 shadow-md">
						<Icon name="gamepad" size={20} />
					</div>
					<h3 class="text-lg font-black text-white mb-1.5 group-hover:text-teal-300 transition-colors">
						Coding Game
					</h3>
					<p class="text-xs text-slate-400 leading-relaxed max-w-xs">
						Susun blok kode, atasi rintangan, dan bantu PyBot mencapai bintang emas.
					</p>
				</div>

				<!-- Artwork Thumbnail -->
				<div class="w-24 h-20 sm:w-28 sm:h-22 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
					<img
						src="/art/coding_game_art.png"
						alt="Coding Game"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>


			<!-- Footer: Progress & Button -->
			<div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
				<div>
					<div class="text-[11px] font-mono text-slate-400">
						{completedChallengesCount} / {totalChallengesCount} Misi
					</div>
					<div class="w-24 sm:w-32 h-1.5 bg-slate-950 rounded-full mt-1.5 overflow-hidden">
						<div
							class="h-full bg-teal-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(45,212,191,0.5)]"
							style="width: {Math.round((completedChallengesCount / totalChallengesCount) * 100)}%;"
						></div>
					</div>
				</div>

				<button
					type="button"
					onclick={onStartCodingGame}
					class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
				>
					<span>Mainkan</span>
					<Icon name="arrow-right" size={14} class="text-slate-950" />
				</button>
			</div>
		</div>
	</section>

	<!-- ======================================================== -->
	<!-- 4. PERJALANAN TERAKHIR (RECENT ACTIVITY FEED)             -->
	<!-- ======================================================== -->
	<section
		class="w-full rounded-3xl bg-slate-900/70 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md text-left"
	>
		<!-- Section Header -->
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-2">
				<Icon name="rotate-ccw" size={16} class="text-indigo-400" />
				<h3 class="font-black text-white text-sm tracking-wide">Perjalanan Terakhir</h3>
			</div>
			<button
				type="button"
				onclick={onStartCodingGame}
				class="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
			>
				<span>Lihat Semua</span>
				<Icon name="arrow-right" size={12} />
			</button>
		</div>

		<!-- 3 Activity Cards Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
			{#each recentActivities as act (act.id)}
				<div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition-colors">
					<!-- Status Icon -->
					<div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 {act.status === 'completed'
						? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
						: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'}">
						{#if act.status === 'completed'}
							<Icon name="check" size={15} />
						{:else}
							<Icon name="play" size={13} />
						{/if}
					</div>

					<!-- Title & Category -->
					<div class="flex-1 min-w-0">
						<div class="text-xs font-bold text-white truncate">{act.title}</div>
						<div class="text-[10px] text-slate-400 truncate">{act.category}</div>
						<div class="text-[9px] text-slate-500 mt-0.5">{act.timeAgo}</div>
					</div>

					<Icon name="arrow-right" size={13} class="text-slate-600 shrink-0" />
				</div>
			{/each}
		</div>
	</section>
</div>
