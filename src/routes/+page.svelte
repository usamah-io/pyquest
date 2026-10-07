<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import LandingHero from '$lib/components/LandingHero.svelte';
	import LearningLevelSelect from '$lib/components/LearningLevelSelect.svelte';
	import LearningSuccessModal from '$lib/components/LearningSuccessModal.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import FeedbackModal from '$lib/components/FeedbackModal.svelte';
	import LevelSelect from '$lib/components/LevelSelect.svelte';
	import ChallengeHeader from '$lib/components/ChallengeHeader.svelte';
	import BlockWorkspace from '$lib/components/BlockWorkspace.svelte';
	import GameCanvas from '$lib/components/GameCanvas.svelte';
	import ChallengeSuccessModal from '$lib/components/ChallengeSuccessModal.svelte';
	import SummaryModal from '$lib/components/SummaryModal.svelte';
	import OrientationGuard from '$lib/components/OrientationGuard.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import MissionBriefing from '$lib/components/MissionBriefing.svelte';
	import GoogleAuthModal from '$lib/components/GoogleAuthModal.svelte';
	import ProfileSetup from '$lib/components/ProfileSetup.svelte';
	import ProfileView from '$lib/components/ProfileView.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import { learningLevelsData } from '$lib/questions/learningLevelsData';
	import { questionsData, getQuestionsByLevel } from '$lib/questions/questionsData';
	import { levelsData } from '$lib/challenges/levelsData';
	import { compileBlocksToCommands, hasForeverBlock } from '$lib/game/compiler';
	import { simulateCommands, type SimulationStep } from '$lib/game/engine';
	import { progressStore } from '$lib/stores/progressStore';
	import { authStore } from '$lib/stores/authStore';
	import { requestAppFullscreen, isFullscreenActive } from '$lib/utils/fullscreen';
	import type { AppScreen, CodingBlock, Direction, GridCoord } from '$lib/types';

	// Screen Flow State
	let currentScreen = $state<AppScreen>('LANDING');

	// Active Mode identifier for Navigation: 'HOME' | 'LEARN' | 'GAME' | 'PROFILE'
	let activeNavbarMode = $derived<'HOME' | 'LEARN' | 'GAME' | 'PROFILE'>(
		currentScreen === 'PROFILE'
			? 'PROFILE'
			: currentScreen === 'LANDING' || currentScreen === 'SUMMARY'
			? 'HOME'
			: currentScreen === 'LEARN_SELECT' ||
			  currentScreen === 'QUESTION' ||
			  currentScreen === 'FEEDBACK' ||
			  currentScreen === 'LEARN_SUCCESS'
			? 'LEARN'
			: 'GAME'
	);


	// Pointers for Learning Module (10-Level System)
	let currentLearningLevelIndex = $state(0);
	let currentQuestionInLevelIndex = $state(0);
	let earnedLearningXpThisRun = $state(0);
	let userSelectedOptionId = $state<string | null>(null);

	// Pointers for Coding Game (10-Level System)
	let currentLevelIndex = $state(0);
	let currentChallengeIndex = $state(0);
	let attemptsCount = $state(0);
	let earnedXpThisRun = $state(0);

	// Coding Game State
	let workspaceBlocks = $state<CodingBlock[]>([]);
	let isRunning = $state(false);
	let simulationTimer = $state<any>(null);
	let rewardModalTimer = $state<any>(null);

	function stopSimulation() {
		if (simulationTimer) {
			clearInterval(simulationTimer);
			simulationTimer = null;
		}
		if (rewardModalTimer) {
			clearTimeout(rewardModalTimer);
			rewardModalTimer = null;
		}
		isRunning = false;
	}

	// Game Engine Live State
	let playerPos = $state<GridCoord>({ x: 0, y: 0 });
	let playerDirection = $state<Direction>('RIGHT');
	let collectedCoins = $state<GridCoord[]>([]);
	let gameStatus = $state<'IDLE' | 'READY' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'OUT_OF_BOUNDS'>('IDLE');
	let gameStatusMessage = $state('');

	// Current Active Learning Level, Question List & Question
	let activeLearningLevel = $derived(learningLevelsData[currentLearningLevelIndex] || learningLevelsData[0]);
	let activeLevelQuestions = $derived(getQuestionsByLevel(activeLearningLevel.id));
	let activeQuestion = $derived(activeLevelQuestions[currentQuestionInLevelIndex] || activeLevelQuestions[0] || questionsData[0]);

	// Current Active Coding Level & Challenge
	let activeLevel = $derived(levelsData[currentLevelIndex] || levelsData[0]);
	let activeChallenge = $derived(activeLevel.challenges[currentChallengeIndex] || activeLevel.challenges[0]);

	// Whether current challenge completion triggers Level completion
	let isLevelCompleted = $derived(
		activeLevel.challenges.every((ch) =>
			$progressStore.completedChallenges.includes(ch.id)
		)
	);

	// Focus Mode Pause Overlay & Anti-Cheat detection
	let isFocusPauseOverlayOpen = $state(false);
	let focusWarning = $state<string | null>(null);
	let focusWarningTimeout = $state<any>(null);

	function showFocusAlert(msg: string) {
		focusWarning = msg;
		if (focusWarningTimeout) clearTimeout(focusWarningTimeout);
		focusWarningTimeout = setTimeout(() => {
			focusWarning = null;
		}, 4500);
	}

	async function handleResumeFocusMode() {
		await requestAppFullscreen();
		isFocusPauseOverlayOpen = false;
	}

	function handleExitFocus() {
		stopSimulation();
		isFocusPauseOverlayOpen = false;
		if (currentScreen === 'CHALLENGE') {
			currentScreen = 'LEVEL_SELECT';
		} else {
			currentScreen = 'LEARN_SELECT';
		}
	}

	// Browser listeners for automatic focus / anti-cheat detection
	$effect(() => {
		function onFullscreenChange() {
			if ((currentScreen === 'CHALLENGE' || currentScreen === 'QUESTION') && !isFullscreenActive()) {
				isFocusPauseOverlayOpen = true;
			}
		}

		function onVisibilityChange() {
			if ((currentScreen === 'CHALLENGE' || currentScreen === 'QUESTION') && document.hidden) {
				showFocusAlert('Peringatan: Kamu berpindah tab browser saat sesi aktif.');
			}
		}

		function onWindowBlur() {
			if ((currentScreen === 'CHALLENGE' || currentScreen === 'QUESTION') && !isFocusPauseOverlayOpen) {
				showFocusAlert('Perhatian: Jendela kehilangan fokus. Silakan klik kembali area permainan/kuis.');
			}
		}

		document.addEventListener('fullscreenchange', onFullscreenChange);
		document.addEventListener('visibilitychange', onVisibilityChange);
		window.addEventListener('blur', onWindowBlur);

		return () => {
			stopSimulation();
			document.removeEventListener('fullscreenchange', onFullscreenChange);
			document.removeEventListener('visibilitychange', onVisibilityChange);
			window.removeEventListener('blur', onWindowBlur);
		};
	});

	// Reset robot and arena state without deleting the arranged coding blocks
	function resetRobotPosition() {
		if (activeChallenge) {
			playerPos = { ...activeChallenge.grid.startPos };
			playerDirection = activeChallenge.grid.startDirection;
			collectedCoins = [];
			gameStatus = 'READY';
			gameStatusMessage = 'Posisi PyBot kembali ke awal. Balokmu tersimpan, siap disesuaikan atau dijalankan kembali!';
		}
	}

	// Initialize Grid Positions when challenge changes (clears blocks for the new challenge)
	function syncChallengeArena() {
		if (activeChallenge) {
			playerPos = { ...activeChallenge.grid.startPos };
			playerDirection = activeChallenge.grid.startDirection;
			collectedCoins = [];
			gameStatus = 'IDLE';
			gameStatusMessage = 'Susun balok instruksi lalu tekan tombol JALANKAN KODE.';
			workspaceBlocks = [];
		}
	}

	// Mode Entry Handlers
	function handleStartLearning() {
		currentScreen = 'LEARN_SELECT';
	}

	function handleStartCodingGame() {
		currentScreen = 'LEVEL_SELECT';
	}

	function handleSelectNavbarMode(mode: 'HOME' | 'LEARN' | 'GAME') {
		stopSimulation();
		if (mode === 'HOME') {
			currentScreen = 'LANDING';
		} else if (mode === 'LEARN') {
			currentScreen = 'LEARN_SELECT';
		} else if (mode === 'GAME') {
			currentScreen = 'LEVEL_SELECT';
		}
	}

	function handleOpenProfile() {
		stopSimulation();
		currentScreen = 'PROFILE';
	}


	// Learning Level Flow
	function handleSelectLearningLevel(levelId: number) {
		const idx = learningLevelsData.findIndex((lvl) => lvl.id === levelId);
		currentLearningLevelIndex = idx !== -1 ? idx : 0;
		currentQuestionInLevelIndex = 0;
		userSelectedOptionId = null;
		earnedLearningXpThisRun = 0;
		isFocusPauseOverlayOpen = false;
		currentScreen = 'QUESTION';
		requestAppFullscreen();
	}

	function handleAnswerQuestion(selectedOptionId: string) {
		userSelectedOptionId = selectedOptionId;
		if (selectedOptionId === activeQuestion.correctAnswerId) {
			progressStore.completeQuestion(activeQuestion.id, activeQuestion.xp || 15);
		}
		currentScreen = 'FEEDBACK';
	}

	function handleContinueAfterQuestionFeedback() {
		if (currentQuestionInLevelIndex < activeLevelQuestions.length - 1) {
			currentQuestionInLevelIndex++;
			userSelectedOptionId = null;
			currentScreen = 'QUESTION';
		} else {
			// All 5 questions in level finished
			const isFirst = progressStore.completeLearningLevel(activeLearningLevel.id, activeLearningLevel.xpReward);
			earnedLearningXpThisRun = isFirst ? activeLearningLevel.xpReward : 0;
			currentScreen = 'LEARN_SUCCESS';
		}
	}

	function handleNextLearningLevel() {
		if (currentLearningLevelIndex < learningLevelsData.length - 1) {
			currentLearningLevelIndex++;
			currentQuestionInLevelIndex = 0;
			userSelectedOptionId = null;
			earnedLearningXpThisRun = 0;
			currentScreen = 'QUESTION';
			requestAppFullscreen();
		} else {
			currentScreen = 'LEARN_SELECT';
		}
	}

	function handleReplayLearningLevel() {
		currentQuestionInLevelIndex = 0;
		userSelectedOptionId = null;
		earnedLearningXpThisRun = 0;
		currentScreen = 'QUESTION';
		requestAppFullscreen();
	}

	// Coding Game Flow Handlers
	function handleSelectLevelChallenge(lvlIdx: number, chIdx: number) {
		stopSimulation();
		currentLevelIndex = lvlIdx;
		currentChallengeIndex = chIdx;
		attemptsCount = 0;
		earnedXpThisRun = 0;
		isFocusPauseOverlayOpen = false;
		syncChallengeArena();
		currentScreen = 'MISSION_BRIEFING';
	}

	function handleStartActualMission() {
		currentScreen = 'CHALLENGE';
		requestAppFullscreen();
	}

	function handleResetGame() {
		stopSimulation();
		resetRobotPosition();
	}

	function handleRunCode() {
		if (isRunning || workspaceBlocks.length === 0) return;

		// Immediately stop any lingering intervals and set isRunning to prevent double-run race conditions
		stopSimulation();
		isRunning = true;
		attemptsCount++;

		const { commands, error } = compileBlocksToCommands(workspaceBlocks);
		if (error) {
			isRunning = false;
			gameStatus = 'FAILED';
			gameStatusMessage = error;
			return;
		}

		if (commands.length === 0) {
			isRunning = false;
			gameStatus = 'FAILED';
			gameStatusMessage = 'Tidak ada balok instruksi untuk dijalankan.';
			return;
		}

		const effectiveMaxActions = activeChallenge.maxMoves || 30;
		const steps: SimulationStep[] = simulateCommands(activeChallenge.grid, commands, effectiveMaxActions);

		gameStatus = 'RUNNING';
		let stepIdx = 0;

		simulationTimer = setInterval(() => {
			if (stepIdx >= steps.length) {
				stopSimulation();
				if (gameStatus === 'RUNNING') {
					gameStatus = 'FAILED';
					gameStatusMessage = 'Program selesai, tetapi PyBot belum mencapai Bintang target.';
				}
				return;
			}

			const frame = steps[stepIdx];
			playerPos = frame.playerPos;
			playerDirection = frame.playerDirection;
			collectedCoins = frame.collectedCoins;
			gameStatus = frame.status;
			gameStatusMessage =
				frame.status === 'FAILED' && frame.message.includes('Batas maksimum') && hasForeverBlock(workspaceBlocks)
					? 'Kodenya berjalan terlalu lama. Coba periksa blok SELAMANYA.'
					: frame.message;

			if (frame.status === 'SUCCESS') {
				stopSimulation();

				const isFirst = progressStore.completeChallenge(activeChallenge.id, activeChallenge.xpReward);
				earnedXpThisRun = isFirst ? activeChallenge.xpReward : 0;

				const levelNowFinished = activeLevel.challenges.every(
					(c) => c.id === activeChallenge.id || $progressStore.completedChallenges.includes(c.id)
				);
				if (levelNowFinished) {
					progressStore.completeLevel(activeLevel.id);
				}

				rewardModalTimer = setTimeout(() => {
					currentScreen = 'REWARD';
					rewardModalTimer = null;
				}, 600);
			} else if (frame.status === 'FAILED' || frame.status === 'OUT_OF_BOUNDS') {
				stopSimulation();
			}

			stepIdx++;
		}, 380);
	}

	function handleNextChallengeOrLevel() {
		stopSimulation();
		if (currentChallengeIndex < activeLevel.challenges.length - 1) {
			currentChallengeIndex++;
			attemptsCount = 0;
			earnedXpThisRun = 0;
			syncChallengeArena();
			currentScreen = 'MISSION_BRIEFING';
		} else {
			if (currentLevelIndex < levelsData.length - 1) {
				currentScreen = 'LEVEL_SELECT';
			} else {
				currentScreen = 'SUMMARY';
			}
		}
	}

	function handleReplayCurrentChallenge() {
		stopSimulation();
		handleResetGame();
		earnedXpThisRun = 0;
		currentScreen = 'CHALLENGE';
		requestAppFullscreen();
	}

	function handleRestartAll() {
		stopSimulation();
		progressStore.reset();
		currentLearningLevelIndex = 0;
		currentQuestionInLevelIndex = 0;
		currentLevelIndex = 0;
		currentChallengeIndex = 0;
		attemptsCount = 0;
		earnedXpThisRun = 0;
		earnedLearningXpThisRun = 0;
		currentScreen = 'LANDING';
	}
</script>

<svelte:head>
	<title>PyQuest — Petualangan Logika Python</title>
</svelte:head>

<div class="bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white {currentScreen === 'CHALLENGE' ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : 'min-h-screen'}">
	<!-- Mobile Orientation Guard (Active during Coding Game mode in portrait) -->
	{#if currentScreen === 'CHALLENGE'}
		<OrientationGuard />
	{/if}

	<!-- Top Nav with Mode Switcher -->
	{#if currentScreen === 'CHALLENGE'}
		<div class="hidden md:block">
			<Navbar
				onSelectMode={handleSelectNavbarMode}
				onOpenProfile={handleOpenProfile}
			/>
		</div>
	{:else}
		<Navbar
			onSelectMode={handleSelectNavbarMode}
			onOpenProfile={handleOpenProfile}
		/>
	{/if}

	<!-- Focus Mode / Anti-Cheat Warning Toast Banner -->
	{#if focusWarning}
		<div class="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-lg bg-amber-950/90 border border-amber-500 text-amber-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fade-in">
			<Icon name="alert-triangle" size={20} class="text-amber-400 shrink-0" />
			<div class="text-xs sm:text-sm font-medium flex-1">
				{focusWarning}
			</div>
			<button
				type="button"
				onclick={() => (focusWarning = null)}
				class="text-amber-400 hover:text-white p-1 rounded-lg"
			>
				<Icon name="x" size={14} />
			</button>
		</div>
	{/if}

	<!-- Dedicated Pause Overlay When Fullscreen Focus is Exited in Challenge or Quiz Mode -->
	{#if isFocusPauseOverlayOpen && (currentScreen === 'CHALLENGE' || currentScreen === 'QUESTION')}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
			<div class="w-full max-w-md bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-amber-500/10 text-center relative overflow-hidden">
				<div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
					<Icon name="maximize" size={32} />
				</div>

				<h3 class="text-xl sm:text-2xl font-black text-white mb-2">
					MODE FOKUS BERHENTI
				</h3>
				<p class="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
					Sesi dijeda karena jendela keluar dari Mode Layar Penuh. Kembalikan mode fokus untuk melanjutkan {currentScreen === 'CHALLENGE' ? 'tantangan koding' : 'soal latihan'} tanpa kehilangan progresmu.
				</p>

				<div class="space-y-2.5">
					<button
						type="button"
						onclick={handleResumeFocusMode}
						class="w-full py-3 bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-400/20 transition-all cursor-pointer flex items-center justify-center gap-2"
					>
						<Icon name="play" size={16} class="text-slate-950" />
						<span>Kembali ke Permainan</span>
					</button>

					<button
						type="button"
						onclick={handleExitFocus}
						class="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
					>
						<Icon name="arrow-left" size={14} />
						<span>{currentScreen === 'CHALLENGE' ? 'Keluar ke Menu Game' : 'Keluar ke Menu Level'}</span>
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Google Authentication Modal -->
	<GoogleAuthModal
		isOpen={$authStore.isGoogleModalOpen}
		onClose={() => authStore.closeGoogleModal()}
		onLoginSuccess={(needsSetup) => {
			if (needsSetup) {
				currentScreen = 'PROFILE_SETUP';
			}
		}}
	/>

	<!-- Body Layout with Desktop Sidebar -->
	<div class="flex-1 flex overflow-hidden min-h-0">
		{#if currentScreen === 'LANDING' || currentScreen === 'LEARN_SELECT' || currentScreen === 'LEVEL_SELECT' || currentScreen === 'PROFILE'}
			<Sidebar
				currentMode={activeNavbarMode}
				onSelectMode={handleSelectNavbarMode}
				onOpenProfile={handleOpenProfile}
			/>
		{/if}

		<!-- Main Stage -->
		<main class="flex-1 flex flex-col {currentScreen === 'CHALLENGE' ? 'p-1.5 sm:p-2.5 landscape:p-1 overflow-hidden h-full max-h-full' : 'p-2 sm:p-4 md:p-6 pb-20 lg:pb-6 overflow-y-auto'} min-h-0">
			<!-- 1. LANDING / HOME -->
			{#if currentScreen === 'LANDING'}
				<LandingHero
					onStartLearning={handleStartLearning}
					onStartCodingGame={handleStartCodingGame}
					onContinueCoding={(lvlIdx, chIdx) => handleSelectLevelChallenge(lvlIdx, chIdx)}
					onContinueLearning={(levelId) => handleSelectLearningLevel(levelId)}
				/>

			<!-- 2. LEARNING LEVEL SELECTION (10 LEVELS) -->
			{:else if currentScreen === 'LEARN_SELECT'}
				<LearningLevelSelect
					learningLevels={learningLevelsData}
					onSelectLearningLevel={handleSelectLearningLevel}
					onBackToHome={() => (currentScreen = 'LANDING')}
				/>

			<!-- 3. LEARNING / QUESTION MODE -->
			{:else if currentScreen === 'QUESTION'}
				<QuestionCard
					question={activeQuestion}
					questionNumber={currentQuestionInLevelIndex + 1}
					totalQuestions={activeLevelQuestions.length}
					onAnswer={handleAnswerQuestion}
					onBackToLevels={() => (currentScreen = 'LEARN_SELECT')}
				/>

			<!-- 4. LEARNING FEEDBACK -->
			{:else if currentScreen === 'FEEDBACK'}
				<FeedbackModal
					question={activeQuestion}
					userSelectedId={userSelectedOptionId || ''}
					isLastQuestion={currentQuestionInLevelIndex === activeLevelQuestions.length - 1}
					onContinue={handleContinueAfterQuestionFeedback}
				/>

			<!-- 5. LEARNING LEVEL SUCCESS MODAL -->
			{:else if currentScreen === 'LEARN_SUCCESS'}
				<LearningSuccessModal
					level={activeLearningLevel}
					xpEarned={earnedLearningXpThisRun}
					isLastLevel={currentLearningLevelIndex === learningLevelsData.length - 1}
					onNextLevel={handleNextLearningLevel}
					onReplayLevel={handleReplayLearningLevel}
					onBackToSelect={() => (currentScreen = 'LEARN_SELECT')}
				/>

			<!-- 6. LEVEL SELECTION (CODING GAME) -->
			{:else if currentScreen === 'LEVEL_SELECT'}
				<LevelSelect
					levels={levelsData}
					onSelectLevelChallenge={handleSelectLevelChallenge}
					onBackToHome={() => (currentScreen = 'LANDING')}
				/>

			<!-- 7. MISSION BRIEFING SCREEN -->
			{:else if currentScreen === 'MISSION_BRIEFING'}
				<MissionBriefing
					level={activeLevel}
					challenge={activeChallenge}
					challengeIndex={currentChallengeIndex}
					totalChallengesInLevel={activeLevel.challenges.length}
					onStartMission={handleStartActualMission}
					onBack={() => (currentScreen = 'LEVEL_SELECT')}
				/>

			<!-- 8. CODING GAME CHALLENGE -->
			{:else if currentScreen === 'CHALLENGE'}
				<div class="flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full h-full overflow-hidden">
					<ChallengeHeader
						title={`${activeLevel.title} — ${activeChallenge.title}`}
						objective={activeChallenge.objective}
						topic={`Level ${activeLevel.id} • Misi ${currentChallengeIndex + 1}/${activeLevel.challenges.length}`}
						hints={activeChallenge.hints}
						onBackToModes={() => {
							stopSimulation();
							currentScreen = 'LEVEL_SELECT';
						}}
					/>

					<div class="flex-1 grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3 landscape:gap-2 min-h-0 h-full overflow-hidden">
						<div class="h-full min-h-0 overflow-hidden">
							<GameCanvas
								grid={activeChallenge.grid}
								{playerPos}
								{playerDirection}
								{collectedCoins}
								statusMessage={gameStatusMessage}
								status={gameStatus}
							/>
						</div>

						<div class="h-full min-h-0 overflow-hidden">
							<BlockWorkspace
								bind:workspaceBlocks
								availableBlocks={activeChallenge.availableBlocks}
								maxMoves={activeChallenge.maxMoves}
								attempts={attemptsCount}
								onRun={handleRunCode}
								onReset={handleResetGame}
								{isRunning}
							/>
						</div>
					</div>
				</div>

			<!-- 9. CODING GAME SUMMARY -->
			{:else if currentScreen === 'SUMMARY'}
				<SummaryModal
					progress={$progressStore}
					onBackToHome={() => (currentScreen = 'LANDING')}
					onRestart={handleRestartAll}
				/>

			<!-- 10. PROFILE SETUP SCREEN (First Google Login) -->
			{:else if currentScreen === 'PROFILE_SETUP'}
				<ProfileSetup
					onComplete={() => (currentScreen = 'LANDING')}
				/>

			<!-- 11. DEDICATED PROFILE PAGE -->
			{:else if currentScreen === 'PROFILE'}
				<ProfileView
					onBackToHome={() => (currentScreen = 'LANDING')}
				/>
			{/if}
		</main>
	</div>

	<!-- Mobile Fixed Bottom Navigation Bar -->
	{#if currentScreen !== 'CHALLENGE' && currentScreen !== 'QUESTION' && currentScreen !== 'PROFILE_SETUP'}
		<BottomNav
			currentMode={activeNavbarMode}
			onSelectMode={handleSelectNavbarMode}
			onOpenProfile={handleOpenProfile}
		/>
	{/if}


	<!-- Success Reward Modal Popup (Coding Game Mode) -->
	{#if currentScreen === 'REWARD'}
		<ChallengeSuccessModal
			challenge={activeChallenge}
			xpEarned={earnedXpThisRun}
			{attemptsCount}
			isLevelCompleted={isLevelCompleted}
			isLastChallengeInLevel={currentChallengeIndex === activeLevel.challenges.length - 1}
			onNext={handleNextChallengeOrLevel}
			onReplay={handleReplayCurrentChallenge}
			onBackToLevelSelect={() => {
				stopSimulation();
				currentScreen = 'LEVEL_SELECT';
			}}
		/>
	{/if}
</div>
