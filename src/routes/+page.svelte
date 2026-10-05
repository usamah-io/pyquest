<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import LandingHero from '$lib/components/LandingHero.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import FeedbackModal from '$lib/components/FeedbackModal.svelte';
	import ChallengeHeader from '$lib/components/ChallengeHeader.svelte';
	import BlockWorkspace from '$lib/components/BlockWorkspace.svelte';
	import GameCanvas from '$lib/components/GameCanvas.svelte';
	import ChallengeSuccessModal from '$lib/components/ChallengeSuccessModal.svelte';
	import SummaryModal from '$lib/components/SummaryModal.svelte';
	import OrientationGuard from '$lib/components/OrientationGuard.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import { questionsData } from '$lib/questions/questionsData';
	import { challengesData } from '$lib/challenges/challengesData';
	import { compileBlocksToCommands } from '$lib/game/compiler';
	import { simulateCommands, type SimulationStep } from '$lib/game/engine';
	import { progressStore } from '$lib/stores/progressStore';
	import type { AppScreen, CodingBlock, Direction, GridCoord } from '$lib/types';

	// Screen Flow State: Mode-separated
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
	let challengeIndex = $state(0);

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

	// Current Active Question & Challenge
	let activeQuestion = $derived(questionsData[questionIndex] || questionsData[0]);
	let activeChallenge = $derived(challengesData[challengeIndex] || challengesData[0]);

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
				// Best-effort: browser permissions may block fullscreen, fallback cleanly
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
				showFocusAlert('Peringatan: Kamu keluar dari Mode Layar Penuh (Fullscreen). Tetap fokus menyelesaikan tantangan!');
			}
		}

		function onVisibilityChange() {
			if (currentScreen === 'CHALLENGE' && document.hidden) {
				showFocusAlert('Peringatan: Kamu berpindah tab browser saat tantangan koding aktif. Tetap fokus di PyQuest!');
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
		challengeIndex = 0;
		syncChallengeArena();
		currentScreen = 'CHALLENGE';
	}

	function handleSelectNavbarMode(mode: 'HOME' | 'LEARN' | 'GAME') {
		if (mode === 'HOME') {
			currentScreen = 'LANDING';
		} else if (mode === 'LEARN') {
			currentScreen = 'QUESTION';
		} else if (mode === 'GAME') {
			syncChallengeArena();
			currentScreen = 'CHALLENGE';
		}
	}

	// Question Flow Handlers
	function handleAnswerQuestion(selectedOptionId: string) {
		userSelectedOptionId = selectedOptionId;
		if (selectedOptionId === activeQuestion.correctAnswerId) {
			progressStore.completeQuestion(activeQuestion.id, 15);
		}
		currentScreen = 'FEEDBACK';
	}

	function handleContinueAfterQuestionFeedback() {
		if (questionIndex < questionsData.length - 1) {
			questionIndex++;
			currentScreen = 'QUESTION';
		} else {
			// Finished all questions! Show summary
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
				progressStore.completeChallenge(activeChallenge.id, activeChallenge.xpReward);
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

	function handleNextChallengeOrSummary() {
		if (challengeIndex < challengesData.length - 1) {
			challengeIndex++;
			syncChallengeArena();
			currentScreen = 'CHALLENGE';
		} else {
			currentScreen = 'SUMMARY';
		}
	}

	function handleRestartAll() {
		progressStore.reset();
		questionIndex = 0;
		challengeIndex = 0;
		currentScreen = 'LANDING';
	}
</script>

<svelte:head>
	<title>PyQuest — Petualangan Logika Pemrograman Python</title>
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

		<!-- 4. CODING GAME MODE -->
		{:else if currentScreen === 'CHALLENGE'}
			<div class="flex-1 flex flex-col h-full max-w-7xl mx-auto w-full">
				<!-- Header Objective, Mode info & Focus Toggle -->
				<ChallengeHeader
					title={activeChallenge.title}
					objective={activeChallenge.objective}
					topic={activeChallenge.topic}
					hints={activeChallenge.hints}
					activeHintIndex={activeChallengeHintIndex}
					{isFocusMode}
					onToggleFocusMode={toggleFocusMode}
					onShowHint={handleCycleChallengeHint}
					onBackToModes={() => (currentScreen = 'LANDING')}
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
							onRun={handleRunCode}
							onReset={handleResetGame}
							{isRunning}
						/>
					</div>
				</div>
			</div>

		<!-- 5. SUMMARY SCREEN -->
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
			isLastChallenge={challengeIndex === challengesData.length - 1}
			onNext={handleNextChallengeOrSummary}
		/>
	{/if}
</div>
