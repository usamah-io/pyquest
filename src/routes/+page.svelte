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

	import { questionsData } from '$lib/questions/questionsData';
	import { challengesData } from '$lib/challenges/challengesData';
	import { compileBlocksToCommands } from '$lib/game/compiler';
	import { simulateCommands, type SimulationStep } from '$lib/game/engine';
	import { progressStore } from '$lib/stores/progressStore';
	import type { AppScreen, CodingBlock, Direction, GridCoord } from '$lib/types';

	// Screen Flow State
	let currentScreen = $state<AppScreen>('LANDING');

	// Current Quest pointers
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

	// Flow Actions
	function handleStartAdventure() {
		questionIndex = 0;
		challengeIndex = 0;
		currentScreen = 'QUESTION';
	}

	function handleAnswerQuestion(selectedOptionId: string) {
		userSelectedOptionId = selectedOptionId;
		if (selectedOptionId === activeQuestion.correctAnswerId) {
			progressStore.completeQuestion(activeQuestion.id, 15);
		}
		currentScreen = 'FEEDBACK';
	}

	function handleContinueToChallenge() {
		syncChallengeArena();
		currentScreen = 'CHALLENGE';
	}

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
			// Advance question index too if available
			if (questionIndex < questionsData.length - 1) {
				questionIndex++;
				currentScreen = 'QUESTION';
			} else {
				syncChallengeArena();
				currentScreen = 'CHALLENGE';
			}
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
	<title>PyQuest — Petualangan Koding Python Ramah Anak</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
	<!-- Mobile Orientation Guard (Active during Challenge in portrait) -->
	{#if currentScreen === 'CHALLENGE'}
		<OrientationGuard />
	{/if}

	<!-- Top Nav -->
	<Navbar onReset={handleRestartAll} />

	<!-- Main Stage -->
	<main class="flex-1 flex flex-col p-2 sm:p-4 md:p-6 overflow-hidden">
		{#if currentScreen === 'LANDING'}
			<LandingHero onStart={handleStartAdventure} />
		{:else}
			{#if currentScreen === 'QUESTION'}
				<QuestionCard
					question={activeQuestion}
					onAnswer={handleAnswerQuestion}
				/>
			{:else}
				{#if currentScreen === 'FEEDBACK'}
					<FeedbackModal
						question={activeQuestion}
						userSelectedId={userSelectedOptionId || ''}
						onContinue={handleContinueToChallenge}
					/>
				{:else}
					{#if currentScreen === 'CHALLENGE'}
						<!-- Landscape Game Screen -->
						<div class="flex-1 flex flex-col h-full max-w-7xl mx-auto w-full">
							<!-- Header Objective & Hints -->
							<ChallengeHeader
								title={activeChallenge.title}
								objective={activeChallenge.objective}
								topic={activeChallenge.topic}
								hints={activeChallenge.hints}
								activeHintIndex={activeChallengeHintIndex}
								onShowHint={handleCycleChallengeHint}
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
					{:else}
						{#if currentScreen === 'SUMMARY'}
							<SummaryModal
								progress={$progressStore}
								onRestart={handleRestartAll}
							/>
						{/if}
					{/if}
				{/if}
			{/if}
		{/if}
	</main>

	<!-- Success Reward Modal Popup -->
	{#if currentScreen === 'REWARD'}
		<ChallengeSuccessModal
			challenge={activeChallenge}
			xpEarned={activeChallenge.xpReward}
			onNext={handleNextChallengeOrSummary}
		/>
	{/if}
</div>
