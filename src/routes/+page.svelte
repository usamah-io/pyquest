<script lang="ts">
	import { onMount } from 'svelte';
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
	import LoginView from '$lib/components/LoginView.svelte';
	import ProfileSetup from '$lib/components/ProfileSetup.svelte';
	import ProfileView from '$lib/components/ProfileView.svelte';
	import CompletedMissionsView from '$lib/components/CompletedMissionsView.svelte';
	import TotalXpView from '$lib/components/TotalXpView.svelte';
	import StreakView from '$lib/components/StreakView.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import { learningLevelsData } from '$lib/questions/learningLevelsData';
	import { questionsData, getQuestionsByLevel } from '$lib/questions/questionsData';
	import { recordQuizAnswer, calculateQuizSummary, type QuizAnswerRecord } from '$lib/questions/quizEvaluator';
	import { levelsData } from '$lib/challenges/levelsData';
	import { compileBlocksToCommands, hasForeverBlock } from '$lib/game/compiler';
	import { simulateCommands, type SimulationStep } from '$lib/game/engine';
	import { progressStore } from '$lib/stores/progressStore';
	import { authStore } from '$lib/stores/authStore';
	import { requestAppFullscreen, isFullscreenActive } from '$lib/utils/fullscreen';
	import type { AppScreen, CodingBlock, Direction, GridCoord } from '$lib/types';

	// Screen Flow State (Starts at LOGIN for unauthenticated, LANDING for returning users)
	let currentScreen = $state<AppScreen>(
		$authStore.isAuthenticated
			? ($authStore.user.hasCompletedProfileSetup ? 'LANDING' : 'PROFILE_SETUP')
			: 'LOGIN'
	);

	onMount(async () => {
		await authStore.initAuth();
		if (typeof window !== 'undefined') {
			const urlParams = new URLSearchParams(window.location.search);
			const screenParam = urlParams.get('screen') as AppScreen | null;
			const authSuccess = urlParams.get('auth_success');
			if (authSuccess) {
				await authStore.initAuth();
			}
			if (screenParam && ['LOGIN', 'LANDING', 'LEARN_SELECT', 'LEVEL_SELECT', 'PROFILE_SETUP', 'PROFILE', 'MISSIONS', 'XP_PROGRESS', 'STREAK_VIEW'].includes(screenParam)) {
				if ($authStore.isAuthenticated) {
					currentScreen = screenParam;
				}
			}
		}
	});

	// Global Authentication Guard
	$effect(() => {
		if (!$authStore.isAuthenticated) {
			currentScreen = 'LOGIN';
		} else if (!$authStore.user.hasCompletedProfileSetup && currentScreen !== 'PROFILE_SETUP') {
			currentScreen = 'PROFILE_SETUP';
		} else if ($authStore.isAuthenticated && $authStore.user.hasCompletedProfileSetup && currentScreen === 'LOGIN') {
			currentScreen = 'LANDING';
		}
	});

	// Active Mode identifier for Navigation: 'HOME' | 'LEARN' | 'GAME' | 'PROFILE'
	let activeNavbarMode = $derived<'HOME' | 'LEARN' | 'GAME' | 'PROFILE'>(
		currentScreen === 'PROFILE'
			? 'PROFILE'
			: currentScreen === 'LANDING' || currentScreen === 'SUMMARY' || currentScreen === 'LOGIN'
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

	// Quiz Session State (Single source of truth for current quiz run)
	let quizSessionAnswers = $state<Record<string, QuizAnswerRecord>>({});

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
	let currentQuizStats = $derived(
		calculateQuizSummary(quizSessionAnswers, activeLevelQuestions.length || 5, activeLearningLevel.xpReward)
	);

	// Current Active Coding Level & Challenge
	let activeLevel = $derived(levelsData[currentLevelIndex] || levelsData[0]);
	let activeChallenge = $derived(activeLevel.challenges[currentChallengeIndex] || activeLevel.challenges[0]);

	// Whether current challenge completion triggers Level completion
	let isLevelCompleted = $derived(
		activeLevel.challenges.every((ch) =>
			$progressStore.completedChallenges.includes(ch.id)
		)
	);

	// Simulation cleanup on lifecycle unmount
	$effect(() => {
		return () => {
			stopSimulation();
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
		quizSessionAnswers = {}; // Reset session answers for new quiz run
		currentScreen = 'QUESTION';
		requestAppFullscreen();
	}

	function handleAnswerQuestion(selectedOptionId: string) {
		userSelectedOptionId = selectedOptionId;
		const q = activeQuestion;

		// Deterministically record and grade with strict double-count guard
		const result = recordQuizAnswer(quizSessionAnswers, q, selectedOptionId);
		if (result.isNewAnswer) {
			quizSessionAnswers = result.updatedAnswers;
			if (result.isCorrect) {
				// completeQuestion returns true only on first time question is solved
				progressStore.completeQuestion(q.id, q.xp || 15);
			}
		}

		currentScreen = 'FEEDBACK';
	}

	function handleContinueAfterQuestionFeedback() {
		if (currentQuestionInLevelIndex < activeLevelQuestions.length - 1) {
			currentQuestionInLevelIndex++;
			userSelectedOptionId = null;
			currentScreen = 'QUESTION';
		} else {
			// All questions in level finished
			const summary = calculateQuizSummary(
				quizSessionAnswers,
				activeLevelQuestions.length,
				activeLearningLevel.xpReward
			);

			const isFirst = progressStore.completeLearningLevel(
				activeLearningLevel.id,
				summary.earnedLevelXp,
				{
					correctAnswers: summary.correctAnswers,
					totalQuestions: summary.totalQuestions,
					isPerfect: summary.isPerfect
				}
			);

			earnedLearningXpThisRun = isFirst ? summary.earnedLevelXp : 0;
			currentScreen = 'LEARN_SUCCESS';
		}
	}

	function handleNextLearningLevel() {
		if (currentLearningLevelIndex < learningLevelsData.length - 1) {
			currentLearningLevelIndex++;
			currentQuestionInLevelIndex = 0;
			userSelectedOptionId = null;
			earnedLearningXpThisRun = 0;
			quizSessionAnswers = {}; // Reset session answers for next level
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
		quizSessionAnswers = {}; // Reset session answers for replay
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

		// Instantly reset PyBot visual position to startPos
		if (activeChallenge) {
			playerPos = { ...activeChallenge.grid.startPos };
			playerDirection = activeChallenge.grid.startDirection;
			collectedCoins = [];
		}

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

		const effectiveMaxMoves = activeChallenge.maxMoves || 30;
		const steps: SimulationStep[] = simulateCommands(activeChallenge.grid, commands, {
			maxMoves: effectiveMaxMoves,
			maxActions: 150
		});

		gameStatus = 'RUNNING';
		let stepIdx = 0;

		// Smoothly scroll to top on mobile portrait so player can watch PyBot run the maze
		if (typeof window !== 'undefined' && window.innerWidth < 768) {
			const mainEl = document.querySelector('main');
			if (mainEl && mainEl.scrollTop > 40) {
				mainEl.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}

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

				const targetChallenge = activeChallenge;
				const targetLevel = activeLevel;
				const challengeXp = Math.max(0, Math.round(Number(targetChallenge.xpReward ?? targetChallenge.xp)) || 30);

				const isFirst = progressStore.completeChallenge(targetChallenge.id, challengeXp);
				earnedXpThisRun = isFirst ? challengeXp : 0;

				const levelNowFinished = targetLevel.challenges.every(
					(c) => c.id === targetChallenge.id || $progressStore.completedChallenges.includes(c.id)
				);
				if (levelNowFinished) {
					const achXp = Math.max(0, Math.round(Number(targetLevel.achievement?.xpReward)) || 0);
					progressStore.completeLevel(targetLevel.id, achXp);
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
			// Next challenge in current level
			currentChallengeIndex++;
			attemptsCount = 0;
			earnedXpThisRun = 0;
			syncChallengeArena();
			currentScreen = 'MISSION_BRIEFING';
		} else {
			// Level completed! Advance directly to the next level's first challenge
			if (currentLevelIndex < levelsData.length - 1) {
				currentLevelIndex++;
				currentChallengeIndex = 0;
				attemptsCount = 0;
				earnedXpThisRun = 0;
				syncChallengeArena();
				currentScreen = 'MISSION_BRIEFING';
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
		quizSessionAnswers = {};
		currentScreen = 'LANDING';
	}
</script>

<svelte:head>
	<title>PyQuest — Petualangan Logika Python</title>
</svelte:head>

<div class="bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white {currentScreen === 'CHALLENGE' || currentScreen === 'REWARD' ? 'min-h-screen portrait:h-auto portrait:overflow-visible landscape:h-[100dvh] landscape:max-h-[100dvh] landscape:overflow-hidden md:h-[100dvh] md:max-h-[100dvh] md:overflow-hidden' : 'min-h-screen'}">
	<!-- Top Nav with Mode Switcher -->
	{#if currentScreen !== 'LOGIN' && currentScreen !== 'PROFILE_SETUP'}
		{#if currentScreen === 'CHALLENGE' || currentScreen === 'REWARD'}
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
	{/if}


	<!-- Google Authentication Modal -->
	<GoogleAuthModal
		isOpen={$authStore.isGoogleModalOpen && currentScreen !== 'LOGIN'}
		onClose={() => authStore.closeGoogleModal()}
		onLoginSuccess={(needsSetup) => {
			if (needsSetup) {
				currentScreen = 'PROFILE_SETUP';
			}
		}}
	/>

	<!-- Body Layout with Desktop Sidebar -->
	<div class="flex-1 flex {currentScreen === 'CHALLENGE' || currentScreen === 'REWARD' ? 'portrait:h-auto portrait:overflow-visible landscape:overflow-hidden md:overflow-hidden' : 'overflow-hidden'} min-h-0">
		{#if currentScreen === 'LANDING' || currentScreen === 'LEARN_SELECT' || currentScreen === 'LEVEL_SELECT' || currentScreen === 'PROFILE' || currentScreen === 'MISSIONS' || currentScreen === 'XP_PROGRESS' || currentScreen === 'STREAK_VIEW'}
			<Sidebar
				currentMode={activeNavbarMode}
				onSelectMode={handleSelectNavbarMode}
				onOpenProfile={handleOpenProfile}
				onOpenXp={() => (currentScreen = 'XP_PROGRESS')}
				onOpenStreak={() => (currentScreen = 'STREAK_VIEW')}
			/>
		{/if}

		<!-- Main Stage -->
		<main class="flex-1 flex flex-col {currentScreen === 'CHALLENGE' || currentScreen === 'REWARD' ? 'p-1.5 sm:p-2.5 landscape:p-1 portrait:h-auto portrait:overflow-y-auto portrait:pb-24 landscape:h-full landscape:max-h-full landscape:overflow-hidden md:h-full md:max-h-full md:overflow-hidden' : currentScreen === 'LOGIN' ? 'p-2 sm:p-4 overflow-y-auto' : 'p-2 sm:p-4 md:p-6 pb-20 lg:pb-6 overflow-y-auto'} min-h-0">
			<!-- 0. LOGIN SCREEN (Real Google Sign-In) -->
			{#if currentScreen === 'LOGIN'}
				<LoginView
					onSuccess={(needsSetup) => {
						if (needsSetup) {
							currentScreen = 'PROFILE_SETUP';
						} else {
							currentScreen = 'LANDING';
						}
					}}
				/>

			<!-- 1. LANDING / HOME -->
			{:else if currentScreen === 'LANDING'}
				<LandingHero
					onStartLearning={handleStartLearning}
					onStartCodingGame={handleStartCodingGame}
					onContinueCoding={(lvlIdx, chIdx) => handleSelectLevelChallenge(lvlIdx, chIdx)}
					onContinueLearning={(levelId) => handleSelectLearningLevel(levelId)}
					onOpenMissions={() => (currentScreen = 'MISSIONS')}
					onOpenXp={() => (currentScreen = 'XP_PROGRESS')}
					onOpenStreak={() => (currentScreen = 'STREAK_VIEW')}
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
					correctAnswers={currentQuizStats.correctAnswers}
					totalQuestions={currentQuizStats.totalQuestions}
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
			{:else if currentScreen === 'CHALLENGE' || currentScreen === 'REWARD'}
				<OrientationGuard />
				<div class="flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full h-full overflow-hidden">
					<ChallengeHeader
						title={`${activeLevel.title} — ${activeChallenge.title}`}
						objective={activeChallenge.objective}
						topic={`Level ${activeLevel.id} • Misi ${currentChallengeIndex + 1}/${activeLevel.challenges.length}`}
						hints={activeChallenge.hints}
						playerXp={$progressStore.xp}
						rewardXp={activeChallenge.xpReward || activeChallenge.xp || 30}
						onBackToModes={() => {
							stopSimulation();
							currentScreen = 'LEVEL_SELECT';
						}}
					/>

					<div class="flex-1 flex flex-col md:grid md:grid-cols-2 landscape:grid landscape:grid-cols-2 gap-2 sm:gap-3 landscape:gap-2 min-h-0 h-full overflow-hidden">
						<div class="w-full max-w-md mx-auto portrait:h-[295px] sm:portrait:h-[330px] landscape:h-full md:h-full min-h-0 overflow-hidden shrink-0">
							<GameCanvas
								grid={activeChallenge.grid}
								{playerPos}
								{playerDirection}
								{collectedCoins}
								statusMessage={gameStatusMessage}
								status={gameStatus}
							/>
						</div>

						<div class="flex-1 w-full min-h-0 h-full overflow-hidden">
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
					onOpenMissions={() => (currentScreen = 'MISSIONS')}
					onOpenXp={() => (currentScreen = 'XP_PROGRESS')}
					onOpenStreak={() => (currentScreen = 'STREAK_VIEW')}
				/>

			<!-- 12. DEDICATED COMPLETED MISSIONS PAGE -->
			{:else if currentScreen === 'MISSIONS'}
				<CompletedMissionsView
					onBackToHome={() => (currentScreen = 'LANDING')}
					onPlayChallenge={(lvlIdx, chIdx) => {
						handleSelectLevelChallenge(lvlIdx, chIdx);
					}}
					onPlayLearningLevel={(lvlId) => {
						handleSelectLearningLevel(lvlId);
					}}
				/>

			<!-- 13. DEDICATED TOTAL XP PAGE -->
			{:else if currentScreen === 'XP_PROGRESS'}
				<TotalXpView
					onBackToHome={() => (currentScreen = 'LANDING')}
				/>

			<!-- 14. DEDICATED STREAK PAGE -->
			{:else if currentScreen === 'STREAK_VIEW'}
				<StreakView
					onBackToHome={() => (currentScreen = 'LANDING')}
				/>
			{/if}
		</main>
	</div>

	<!-- Mobile Fixed Bottom Navigation Bar -->
	{#if currentScreen !== 'CHALLENGE' && currentScreen !== 'REWARD' && currentScreen !== 'QUESTION' && currentScreen !== 'PROFILE_SETUP' && currentScreen !== 'LOGIN'}
		<BottomNav
			currentMode={activeNavbarMode}
			onSelectMode={handleSelectNavbarMode}
			onOpenProfile={handleOpenProfile}
		/>
	{/if}


	<!-- Success Reward Modal Popup (Coding Game Mode) -->
	{#if currentScreen === 'REWARD'}
		<ChallengeSuccessModal
			level={activeLevel}
			challenge={activeChallenge}
			xpEarned={earnedXpThisRun}
			{attemptsCount}
			isLevelCompleted={isLevelCompleted}
			isLastChallengeInLevel={currentChallengeIndex === activeLevel.challenges.length - 1}
			isLastLevel={currentLevelIndex === levelsData.length - 1}
			onNext={handleNextChallengeOrLevel}
			onReplay={handleReplayCurrentChallenge}
			onBackToLevelSelect={() => {
				stopSimulation();
				currentScreen = 'LEVEL_SELECT';
			}}
		/>
	{/if}
</div>
