<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import LandingHero from '$lib/components/LandingHero.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import FeedbackModal from '$lib/components/FeedbackModal.svelte';
	import LevelSelect from '$lib/components/LevelSelect.svelte';
	import ChallengeHeader from '$lib/components/ChallengeHeader.svelte';
	import BlockWorkspace from '$lib/components/BlockWorkspace.svelte';
	import GameCanvas from '$lib/components/GameCanvas.svelte';
	import ChallengeSuccessModal from '$lib/components/ChallengeSuccessModal.svelte';
	import SummaryModal from '$lib/components/SummaryModal.svelte';
	import OrientationGuard from '$lib/components/OrientationGuard.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import { questionsData } from '$lib/questions/questionsData';
	import { levelsData } from '$lib/challenges/levelsData';
	import { compileBlocksToCommands } from '$lib/game/compiler';
	import { simulateCommands, type SimulationStep } from '$lib/game/engine';
	import { progressStore } from '$lib/stores/progressStore';
	import type { AppScreen, CodingBlock, Direction, GridCoord } from '$lib/types';

	// Screen Flow State
	let currentScreen = $state<AppScreen>('LANDING');

	// Active Mode identifier for Navbar: 'HOME' | 'LEARN' | 'GAME'
	let activeNavbarMode = $derived<'HOME' | 'LEARN' | 'GAME'>(
		currentScreen === 'LANDING' || currentScreen === 'SUMMARY'
			? 'HOME'
			: currentScreen === 'QUESTION' || currentScreen === 'FEEDBACK'
			? 'LEARN'
			: 'GAME'
	);

	// Pointers
	let questionIndex = $state(0);
	let currentLevelIndex = $state(0);
	let currentChallengeIndex = $state(0);

	// Attempts counter per challenge
	let attemptsCount = $state(0);

	// Question State
	let userSelectedOptionId = $state<string | null>(null);

	// Challenge State
	let workspaceBlocks = $state<CodingBlock[]>([]);
	let activeChallengeHintIndex = $state(-1);
	let isRunning = $state(false);
	let simulationTimer = $state<any>(null);

	// Game Engine Live State
	let playerPos = $state<GridCoord>({ x: 0, y: 0 });
	let playerDirection = $state<Direction>('RIGHT');
	let collectedCoins = $state<GridCoord[]>([]);
	let gameStatus = $state<'IDLE' | 'READY' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'OUT_OF_BOUNDS'>('IDLE');
	let gameStatusMessage = $state('');

	// Current Active Question, Level, & Challenge
	let activeQuestion = $derived(questionsData[questionIndex] || questionsData[0]);
	let activeLevel = $derived(levelsData[currentLevelIndex] || levelsData[0]);
	let activeChallenge = $derived(activeLevel.challenges[currentChallengeIndex] || activeLevel.challenges[0]);

	// Whether current challenge completion triggers Level completion
	let isLevelCompleted = $derived(
		activeLevel.challenges.every((ch) =>
			$progressStore.completedChallenges.includes(ch.id)
		)
	);

	// Focus Mode State & Anti-Cheat detection
	let isFocusMode = $state(false);
	let focusWarning = $state<string | null>(null);
	let focusWarningTimeout = $state<any>(null);

	function showFocusAlert(msg: string) {
		focusWarning = msg;
		if (focusWarningTimeout) clearTimeout(focusWarningTimeout);
		focusWarningTimeout = setTimeout(() => {
			focusWarning = null;
		}, 4500);
	}

	async function toggleFocusMode() {
		if (!isFocusMode) {
			try {
				if (document.documentElement.requestFullscreen) {
					await document.documentElement.requestFullscreen();
				}
				isFocusMode = true;
			} catch (e) {
				isFocusMode = true;
			}
		} else {
			try {
				if (document.fullscreenElement && document.exitFullscreen) {
					await document.exitFullscreen();
				}
			} catch (e) {
				// ignore
			}
			isFocusMode = false;
		}
	}

	// Browser listeners for focus / anti-cheat detection
	$effect(() => {
		function onFullscreenChange() {
			if (currentScreen === 'CHALLENGE' && isFocusMode && !document.fullscreenElement) {
				isFocusMode = false;
				showFocusAlert('Peringatan: Kamu keluar dari Mode Layar Penuh. Tetap fokus menyelesaikan tantangan!');
			}
		}

		function onVisibilityChange() {
			if (currentScreen === 'CHALLENGE' && document.hidden) {
				showFocusAlert('Peringatan: Kamu berpindah tab browser saat tantangan koding aktif.');
			}
		}

		function onWindowBlur() {
			if (currentScreen === 'CHALLENGE' && isFocusMode) {
				showFocusAlert('Perhatian: Jendela game kehilangan fokus. Silakan klik kembali area permainan.');
			}
		}

		document.addEventListener('fullscreenchange', onFullscreenChange);
		document.addEventListener('visibilitychange', onVisibilityChange);
		window.addEventListener('blur', onWindowBlur);

		return () => {
			document.removeEventListener('fullscreenchange', onFullscreenChange);
			document.removeEventListener('visibilitychange', onVisibilityChange);
			window.removeEventListener('blur', onWindowBlur);
		};
	});

	// Initialize Grid Positions when challenge changes
	function syncChallengeArena() {
		if (activeChallenge) {
			playerPos = { ...activeChallenge.grid.startPos };
			playerDirection = activeChallenge.grid.startDirection;
			collectedCoins = [];
			gameStatus = 'IDLE';
			gameStatusMessage = 'Susun balok instruksi lalu tekan tombol JALANKAN KODE.';
			workspaceBlocks = [];
			activeChallengeHintIndex = -1;
		}
	}

	// Mode Entry Handlers
	function handleStartLearning() {
		questionIndex = 0;
		currentScreen = 'QUESTION';
	}

	function handleStartCodingGame() {
		currentScreen = 'LEVEL_SELECT';
	}

	function handleSelectNavbarMode(mode: 'HOME' | 'LEARN' | 'GAME') {
		if (mode === 'HOME') {
			currentScreen = 'LANDING';
		} else if (mode === 'LEARN') {
			currentScreen = 'QUESTION';
		} else if (mode === 'GAME') {
			currentScreen = 'LEVEL_SELECT';
		}
	}

	function handleSelectLevelChallenge(lvlIdx: number, chIdx: number) {
		currentLevelIndex = lvlIdx;
		currentChallengeIndex = chIdx;
		attemptsCount = 0;
		syncChallengeArena();
		currentScreen = 'CHALLENGE';
	}

	// Question Flow Handlers
	function handleAnswerQuestion(selectedOptionId: string) {
		userSelectedOptionId = selectedOptionId;
		if (selectedOptionId === activeQuestion.correctAnswerId) {
			progressStore.completeQuestion(activeQuestion.id, activeQuestion.xp || 15);
		}
		currentScreen = 'FEEDBACK';
	}

	function handleContinueAfterQuestionFeedback() {
		if (questionIndex < questionsData.length - 1) {
			questionIndex++;
			currentScreen = 'QUESTION';
		} else {
			currentScreen = 'SUMMARY';
		}
	}

	// Challenge Flow Handlers
	function handleCycleChallengeHint() {
		activeChallengeHintIndex = activeChallengeHintIndex + 1;
	}

	function handleResetGame() {
		if (simulationTimer) {
			clearInterval(simulationTimer);
			simulationTimer = null;
		}
		isRunning = false;
		syncChallengeArena();
	}

	function handleRunCode() {
		if (isRunning || workspaceBlocks.length === 0) return;

		attemptsCount++;

		// 1. Compile blocks to atomic commands
		const { commands, error } = compileBlocksToCommands(workspaceBlocks);
		if (error) {
			gameStatus = 'FAILED';
			gameStatusMessage = error;
			return;
		}

		// 2. Pre-simulate entire execution
		const steps: SimulationStep[] = simulateCommands(activeChallenge.grid, commands);

		// 3. Play back steps visually with tick timer (~380ms per tick)
		isRunning = true;
		gameStatus = 'RUNNING';
		let stepIdx = 0;

		if (simulationTimer) clearInterval(simulationTimer);

		simulationTimer = setInterval(() => {
			if (stepIdx >= steps.length) {
				clearInterval(simulationTimer);
				simulationTimer = null;
				isRunning = false;
				return;
			}

			const frame = steps[stepIdx];
			playerPos = frame.playerPos;
			playerDirection = frame.playerDirection;
			collectedCoins = frame.collectedCoins;
			gameStatus = frame.status;
			gameStatusMessage = frame.message;

			if (frame.status === 'SUCCESS') {
				clearInterval(simulationTimer);
				simulationTimer = null;
				isRunning = false;

				// Award XP (duplicate protection handled inside store)
				progressStore.completeChallenge(activeChallenge.id, activeChallenge.xpReward);

				// Check if this was the last unfinished challenge in level
				const levelNowFinished = activeLevel.challenges.every(
					(c) => c.id === activeChallenge.id || $progressStore.completedChallenges.includes(c.id)
				);
				if (levelNowFinished) {
					progressStore.completeLevel(activeLevel.id);
				}

				setTimeout(() => {
					currentScreen = 'REWARD';
				}, 600);
			} else if (frame.status === 'FAILED' || frame.status === 'OUT_OF_BOUNDS') {
				clearInterval(simulationTimer);
				simulationTimer = null;
				isRunning = false;
			}

			stepIdx++;
		}, 380);
	}

	function handleNextChallengeOrLevel() {
		// If more challenges in current level
		if (currentChallengeIndex < activeLevel.challenges.length - 1) {
			currentChallengeIndex++;
			attemptsCount = 0;
			syncChallengeArena();
			currentScreen = 'CHALLENGE';
		} else {
			// Level completed! If there's next level, return to level select or next level
			if (currentLevelIndex < levelsData.length - 1) {
				currentScreen = 'LEVEL_SELECT';
			} else {
				currentScreen = 'SUMMARY';
			}
		}
	}

	function handleReplayCurrentChallenge() {
		handleResetGame();
		currentScreen = 'CHALLENGE';
	}

	function handleRestartAll() {
		progressStore.reset();
		questionIndex = 0;
		currentLevelIndex = 0;
		currentChallengeIndex = 0;
		attemptsCount = 0;
		currentScreen = 'LANDING';
	}
</script>

<svelte:head>
	<title>PyQuest — Belajar Logika Pemrograman Python</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
	<!-- Mobile Orientation Guard (Active during Coding Game mode in portrait) -->
	{#if currentScreen === 'CHALLENGE'}
		<OrientationGuard />
	{/if}

	<!-- Top Nav with Mode Switcher -->
	<Navbar
		currentMode={activeNavbarMode}
		onSelectMode={handleSelectNavbarMode}
		onReset={handleRestartAll}
	/>

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

	<!-- Main Stage -->
	<main class="flex-1 flex flex-col p-2 sm:p-4 md:p-6 overflow-hidden">
		<!-- 1. LANDING / HOME -->
		{#if currentScreen === 'LANDING'}
			<LandingHero
				onStartLearning={handleStartLearning}
				onStartCodingGame={handleStartCodingGame}
			/>

		<!-- 2. LEARNING / QUESTION MODE -->
		{:else if currentScreen === 'QUESTION'}
			<QuestionCard
				question={activeQuestion}
				questionNumber={questionIndex + 1}
				totalQuestions={questionsData.length}
				onAnswer={handleAnswerQuestion}
			/>

		<!-- 3. LEARNING FEEDBACK -->
		{:else if currentScreen === 'FEEDBACK'}
			<FeedbackModal
				question={activeQuestion}
				userSelectedId={userSelectedOptionId || ''}
				isLastQuestion={questionIndex === questionsData.length - 1}
				onContinue={handleContinueAfterQuestionFeedback}
			/>

		<!-- 4. LEVEL SELECTION (CODING GAME) -->
		{:else if currentScreen === 'LEVEL_SELECT'}
			<LevelSelect
				levels={levelsData}
				onSelectLevelChallenge={handleSelectLevelChallenge}
				onBackToHome={() => (currentScreen = 'LANDING')}
			/>

		<!-- 5. CODING GAME CHALLENGE -->
		{:else if currentScreen === 'CHALLENGE'}
			<div class="flex-1 flex flex-col h-full max-w-7xl mx-auto w-full">
				<!-- Header Objective, Mode info & Focus Toggle -->
				<ChallengeHeader
					title={`${activeLevel.title} — ${activeChallenge.title}`}
					objective={activeChallenge.objective}
					topic={`Level ${activeLevel.id} • Misi ${currentChallengeIndex + 1}/${activeLevel.challenges.length}`}
					hints={activeChallenge.hints}
					activeHintIndex={activeChallengeHintIndex}
					{isFocusMode}
					onToggleFocusMode={toggleFocusMode}
					onShowHint={handleCycleChallengeHint}
					onBackToModes={() => (currentScreen = 'LEVEL_SELECT')}
				/>

				<!-- 2-Column Landscape Layout: Left: Game Arena, Right: Block Coding -->
				<div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
					<!-- Game Area (Left) -->
					<div class="h-full min-h-[300px]">
						<GameCanvas
							grid={activeChallenge.grid}
							{playerPos}
							{playerDirection}
							{collectedCoins}
							statusMessage={gameStatusMessage}
							status={gameStatus}
						/>
					</div>

					<!-- Code Blocks & Workspace Area (Right) -->
					<div class="h-full min-h-[350px]">
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

		<!-- 6. SUMMARY SCREEN -->
		{:else if currentScreen === 'SUMMARY'}
			<SummaryModal
				progress={$progressStore}
				onBackToHome={() => (currentScreen = 'LANDING')}
				onRestart={handleRestartAll}
			/>
		{/if}
	</main>

	<!-- Success Reward Modal Popup (Coding Game Mode) -->
	{#if currentScreen === 'REWARD'}
		<ChallengeSuccessModal
			challenge={activeChallenge}
			xpEarned={activeChallenge.xpReward}
			{attemptsCount}
			isLevelCompleted={isLevelCompleted}
			isLastChallengeInLevel={currentChallengeIndex === activeLevel.challenges.length - 1}
			onNext={handleNextChallengeOrLevel}
			onReplay={handleReplayCurrentChallenge}
			onBackToLevelSelect={() => (currentScreen = 'LEVEL_SELECT')}
		/>
	{/if}
</div>
