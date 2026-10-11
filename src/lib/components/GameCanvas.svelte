<script lang="ts">
	import type { ChallengeGrid, Direction, GridCoord } from '$lib/types';
	import { isCoordEqual } from '$lib/game/engine';
	import Icon from './Icon.svelte';

	let {
		grid,
		playerPos,
		playerDirection,
		collectedCoins = [],
		statusMessage = '',
		status = 'IDLE'
	}: {
		grid: ChallengeGrid;
		playerPos: GridCoord;
		playerDirection: Direction;
		collectedCoins: GridCoord[];
		statusMessage: string;
		status: 'IDLE' | 'READY' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'OUT_OF_BOUNDS';
	} = $props();

	// History of tiles visited in current run for active path illumination
	let visitedHistory = $state<GridCoord[]>([]);

	$effect(() => {
		const pos = playerPos;
		if (status === 'IDLE' || status === 'READY') {
			visitedHistory = [{ x: pos.x, y: pos.y }];
		} else {
			if (!visitedHistory.some((v) => isCoordEqual(v, pos))) {
				visitedHistory = [...visitedHistory, { x: pos.x, y: pos.y }];
			}
		}
	});

	function getPlayerRotation(dir: Direction): number {
		switch (dir) {
			case 'UP':
				return -90;
			case 'RIGHT':
				return 0;
			case 'DOWN':
				return 90;
			case 'LEFT':
				return 180;
			default:
				return 0;
		}
	}

	function getMascotSprite(dir: Direction): string {
		switch (dir) {
			case 'LEFT':
				return '/mascot/pybot-looking-left.webp';
			case 'RIGHT':
				return '/mascot/pybot-looking-right.webp';
			case 'DOWN':
			case 'UP':
			default:
				return '/mascot/pybot-front-idle.webp';
		}
	}
</script>

<style>
	@keyframes pybotFloat {
		0%, 100% {
			transform: translateY(0px) scale(1);
		}
		50% {
			transform: translateY(-3px) scale(1.02);
		}
	}
	.animate-pybot-float {
		animation: pybotFloat 2.2s ease-in-out infinite;
	}

	@keyframes starPulse {
		0%, 100% {
			transform: scale(1);
			filter: drop-shadow(var(--star-pulse-1));
		}
		50% {
			transform: scale(1.14);
			filter: drop-shadow(var(--star-pulse-2));
		}
	}
	.animate-star-pulse {
		animation: starPulse 2s ease-in-out infinite;
	}

	@keyframes victorySparkle {
		0%, 100% {
			opacity: 0.3;
			transform: scale(0.9);
		}
		50% {
			opacity: 1;
			transform: scale(1.15);
		}
	}
	.animate-victory-sparkle {
		animation: victorySparkle 1.2s ease-in-out infinite;
	}

	/* ========================================================================= */
	/* THEME TOKENS FOR 2D MAZE (Dark Mode as Default, Light Mode via [data-theme="light"]) */
	/* ========================================================================= */
	.maze-panel {
		--panel-bg: #0f172a;
		--panel-border: rgba(6, 182, 212, 0.25);
		--panel-shadow: 0 25px 50px -12px rgba(30, 27, 75, 0.4);
		--divider-color: rgba(6, 182, 212, 0.15);
		--header-icon-bg: rgba(6, 182, 212, 0.2);
		--header-icon-border: rgba(34, 211, 238, 0.4);
		--header-icon-color: #67e8f9;
		--header-title-color: #ffffff;
		--badge-idle-bg: rgba(30, 41, 59, 0.9);
		--badge-idle-border: #334155;
		--badge-idle-color: #cbd5e1;
		--badge-success-bg: rgba(16, 185, 129, 0.2);
		--badge-success-border: rgba(52, 211, 153, 0.5);
		--badge-success-color: #6ee7b7;
		--badge-failed-bg: rgba(244, 63, 94, 0.2);
		--badge-failed-border: rgba(251, 113, 133, 0.5);
		--badge-failed-color: #fda4af;
		--badge-running-bg: rgba(245, 158, 11, 0.2);
		--badge-running-border: rgba(251, 191, 36, 0.5);
		--badge-running-color: #fde68a;
		--floor-bg: #0c1830;
		--floor-border: rgba(6, 182, 212, 0.3);
		--floor-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.08);
		--led-cyan-bg: rgba(34, 211, 238, 0.6);
		--led-cyan-shadow: 0 0 6px rgba(34, 211, 238, 0.8);
		--led-indigo-bg: rgba(129, 140, 248, 0.6);
		--led-indigo-shadow: 0 0 6px rgba(129, 140, 248, 0.8);
		--cell-empty-bg: #142138;
		--cell-empty-border: rgba(6, 182, 212, 0.2);
		--cell-empty-border-t: rgba(103, 232, 249, 0.3);
		--cell-empty-border-b: #0a1220;
		--cell-empty-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
		--cell-empty-hover: rgba(34, 211, 238, 0.4);
		--cell-start-bg: #13233c;
		--cell-start-border: rgba(6, 182, 212, 0.4);
		--cell-start-shadow: inset 0 0 8px rgba(34, 211, 238, 0.2);
		--cell-start-bracket: rgba(34, 211, 238, 0.25);
		--cell-visited-bg: #132c45;
		--cell-visited-border: rgba(34, 211, 238, 0.5);
		--cell-visited-shadow: 0 0 10px rgba(34, 211, 238, 0.25);
		--cell-target-bg: #1b2214;
		--cell-target-border: rgba(251, 191, 36, 0.6);
		--cell-target-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
		--target-ring-border: rgba(251, 191, 36, 0.4);
		--target-glow-bg: rgba(251, 191, 36, 0.2);
		--star-color: #fcd34d;
		--star-pulse-1: 0 0 10px rgba(251, 191, 36, 0.8);
		--star-pulse-2: 0 0 20px rgba(251, 191, 36, 1);
		--cell-obstacle-bg: #1e293b;
		--cell-obstacle-border: rgba(71, 85, 105, 0.6);
		--cell-obstacle-border-t: rgba(100, 116, 139, 0.8);
		--cell-obstacle-border-b: #020617;
		--cell-obstacle-shadow: 0 5px 8px rgba(0, 0, 0, 0.6);
		--obstacle-inner-bg: #334155;
		--obstacle-inner-border: rgba(100, 116, 139, 0.5);
		--obstacle-inner-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
		--obstacle-svg-fill: rgba(100, 116, 139, 0.4);
		--obstacle-svg-stroke: #e2e8f0;
		--coin-bg: #fbbf24;
		--coin-border: #fef08a;
		--coin-color: #020617;
		--coin-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
		--coord-color: rgba(103, 232, 249, 0.3);
		--dot-color: rgba(34, 211, 238, 0.15);
		--bot-card-bg: #0f172a;
		--bot-card-border: #22d3ee;
		--bot-card-shadow: 0 0 16px rgba(34, 211, 238, 0.6);
		--bot-arrow-color: #67e8f9;
		--bot-arrow-shadow: 0 0 6px rgba(34, 211, 238, 1);
		--bot-glow: rgba(34, 211, 238, 0.35);
		--status-bar-bg: rgba(9, 21, 43, 0.9);
		--status-bar-border: rgba(6, 182, 212, 0.25);
		--status-bar-color: #a5f3fc;
		--status-success-color: #6ee7b7;
		--status-success-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
		--status-failed-color: #fda4af;
		--status-failed-shadow: 0 0 10px rgba(244, 63, 94, 0.2);
		--status-running-color: #fde68a;
		--victory-sparkle-bg: rgba(251, 191, 36, 0.4);
	}

	:global([data-theme="light"]) .maze-panel,
	:global(.light) .maze-panel {
		--panel-bg: #FFFFFF;
		--panel-border: #E2E8F0;
		--panel-shadow: 0 10px 25px -5px rgba(23, 32, 51, 0.08), 0 8px 10px -6px rgba(23, 32, 51, 0.04);
		--divider-color: #E2E8F0;
		--header-icon-bg: #ECFEFF;
		--header-icon-border: #A5F3FC;
		--header-icon-color: #0891B2;
		--header-title-color: #172033;
		--badge-idle-bg: #EDF1F8;
		--badge-idle-border: #D5DCE8;
		--badge-idle-color: #334155;
		--badge-success-bg: #ECFDF5;
		--badge-success-border: #A7F3D0;
		--badge-success-color: #047857;
		--badge-failed-bg: #FFF1F2;
		--badge-failed-border: #FECDD3;
		--badge-failed-color: #E11D48;
		--badge-running-bg: #FFFBEB;
		--badge-running-border: #FDE68A;
		--badge-running-color: #B45309;
		--floor-bg: #E8EDF6;
		--floor-border: #AAB9D0;
		--floor-shadow: 0 10px 25px rgba(38, 54, 79, 0.12), inset 0 1px 3px rgba(255, 255, 255, 0.8);
		--led-cyan-bg: rgba(8, 145, 178, 0.6);
		--led-cyan-shadow: 0 0 4px rgba(8, 145, 178, 0.4);
		--led-indigo-bg: rgba(81, 69, 205, 0.6);
		--led-indigo-shadow: 0 0 4px rgba(81, 69, 205, 0.4);
		--cell-empty-bg: #FFFFFF;
		--cell-empty-border: #AAB9D0;
		--cell-empty-border-t: #C8D5E6;
		--cell-empty-border-b: #8296B4;
		--cell-empty-shadow: 0 2px 4px rgba(38, 54, 79, 0.08);
		--cell-empty-hover: rgba(8, 145, 178, 0.6);
		--cell-start-bg: #F0F7FF;
		--cell-start-border: rgba(8, 145, 178, 0.6);
		--cell-start-shadow: inset 0 0 8px rgba(8, 145, 178, 0.12);
		--cell-start-bracket: rgba(8, 145, 178, 0.4);
		--cell-visited-bg: #E0F2FE;
		--cell-visited-border: rgba(8, 145, 178, 0.7);
		--cell-visited-shadow: 0 0 8px rgba(8, 145, 178, 0.2);
		--cell-target-bg: #FEF9C3;
		--cell-target-border: #D99A00;
		--cell-target-shadow: 0 0 12px rgba(217, 154, 0, 0.25);
		--target-ring-border: rgba(217, 154, 0, 0.5);
		--target-glow-bg: rgba(217, 154, 0, 0.2);
		--star-color: #D99A00;
		--star-pulse-1: 0 1px 4px rgba(217, 154, 0, 0.6);
		--star-pulse-2: 0 2px 8px rgba(217, 154, 0, 0.9);
		--cell-obstacle-bg: #DCE5F2;
		--cell-obstacle-border: #8296B4;
		--cell-obstacle-border-t: #BACADB;
		--cell-obstacle-border-b: #64748B;
		--cell-obstacle-shadow: 0 3px 6px rgba(38, 54, 79, 0.15);
		--obstacle-inner-bg: #C8D5E6;
		--obstacle-inner-border: #8296B4;
		--obstacle-inner-shadow: 0 1px 3px rgba(38, 54, 79, 0.12);
		--obstacle-svg-fill: rgba(130, 150, 180, 0.5);
		--obstacle-svg-stroke: #26364F;
		--coin-bg: #F59E0B;
		--coin-border: #FEF08A;
		--coin-color: #451A03;
		--coin-shadow: 0 2px 8px rgba(217, 119, 6, 0.45);
		--coord-color: #526580;
		--dot-color: rgba(130, 150, 180, 0.4);
		--bot-card-bg: #FFFFFF;
		--bot-card-border: #0891B2;
		--bot-card-shadow: 0 4px 14px rgba(8, 145, 178, 0.35);
		--bot-arrow-color: #0891B2;
		--bot-arrow-shadow: 0 1px 3px rgba(8, 145, 178, 0.7);
		--bot-glow: rgba(8, 145, 178, 0.25);
		--status-bar-bg: #E8EDF6;
		--status-bar-border: rgba(170, 185, 208, 0.7);
		--status-bar-color: #26364F;
		--status-success-color: #087F5B;
		--status-success-shadow: 0 1px 3px rgba(8, 127, 91, 0.15);
		--status-failed-color: #BE123C;
		--status-failed-shadow: 0 1px 3px rgba(190, 18, 60, 0.15);
		--status-running-color: #B45309;
		--victory-sparkle-bg: rgba(217, 154, 0, 0.4);
	}

	.maze-panel {
		background-color: var(--panel-bg);
		border: 1px solid var(--panel-border);
		box-shadow: var(--panel-shadow);
	}
	.maze-header {
		border-bottom: 1px solid var(--divider-color);
	}
	.maze-header-icon {
		background-color: var(--header-icon-bg);
		border: 1px solid var(--header-icon-border);
		color: var(--header-icon-color);
	}
	.maze-header-title {
		color: var(--header-title-color);
	}
	.maze-header-badge.badge-success {
		background-color: var(--badge-success-bg);
		border: 1px solid var(--badge-success-border);
		color: var(--badge-success-color);
	}
	.maze-header-badge.badge-failed {
		background-color: var(--badge-failed-bg);
		border: 1px solid var(--badge-failed-border);
		color: var(--badge-failed-color);
	}
	.maze-header-badge.badge-running {
		background-color: var(--badge-running-bg);
		border: 1px solid var(--badge-running-border);
		color: var(--badge-running-color);
	}
	.maze-header-badge.badge-idle {
		background-color: var(--badge-idle-bg);
		border: 1px solid var(--badge-idle-border);
		color: var(--badge-idle-color);
	}
	.maze-floor {
		background-color: var(--floor-bg);
		border: 2px solid var(--floor-border);
		box-shadow: var(--floor-shadow);
	}
	.maze-led-cyan {
		background-color: var(--led-cyan-bg);
		box-shadow: var(--led-cyan-shadow);
	}
	.maze-led-indigo {
		background-color: var(--led-indigo-bg);
		box-shadow: var(--led-indigo-shadow);
	}
	.maze-cell-empty {
		background-color: var(--cell-empty-bg);
		border: 1px solid var(--cell-empty-border);
		border-top: 1px solid var(--cell-empty-border-t);
		border-bottom: 2px solid var(--cell-empty-border-b);
		box-shadow: var(--cell-empty-shadow);
	}
	.maze-cell-empty:hover {
		border-color: var(--cell-empty-hover);
	}
	.maze-cell-start {
		background-color: var(--cell-start-bg);
		border: 1px solid var(--cell-start-border);
		box-shadow: var(--cell-start-shadow);
	}
	.maze-cell-visited {
		background-color: var(--cell-visited-bg);
		border: 1px solid var(--cell-visited-border);
		box-shadow: var(--cell-visited-shadow);
	}
	.maze-cell-target {
		background-color: var(--cell-target-bg);
		border: 2px solid var(--cell-target-border);
		box-shadow: var(--cell-target-shadow);
	}
	.maze-cell-obstacle {
		background-color: var(--cell-obstacle-bg);
		border: 1px solid var(--cell-obstacle-border);
		border-top: 1px solid var(--cell-obstacle-border-t);
		border-bottom: 3px solid var(--cell-obstacle-border-b);
		box-shadow: var(--cell-obstacle-shadow);
	}
	.maze-tile-dot {
		background-color: var(--dot-color);
	}
	.maze-start-bracket {
		border-color: var(--cell-start-bracket);
	}
	.maze-coord {
		color: var(--coord-color);
	}
	.maze-obstacle-inner {
		background-color: var(--obstacle-inner-bg);
		border: 1px solid var(--obstacle-inner-border);
		box-shadow: var(--obstacle-inner-shadow);
	}
	.maze-obstacle-svg {
		fill: var(--obstacle-svg-fill);
		stroke: var(--obstacle-svg-stroke);
	}
	.maze-target-ring {
		border-color: var(--target-ring-border);
	}
	.maze-target-glow {
		background-color: var(--target-glow-bg);
	}
	.maze-star-icon {
		color: var(--star-color);
		fill: var(--star-color);
	}
	.maze-victory-glow {
		background-color: var(--victory-sparkle-bg);
	}
	.maze-coin {
		background-color: var(--coin-bg);
		border: 2px solid var(--coin-border);
		color: var(--coin-color);
		box-shadow: var(--coin-shadow);
	}
	.maze-bot-glow {
		background-color: var(--bot-glow);
	}
	.maze-bot-card {
		background-color: var(--bot-card-bg);
		border: 2px solid var(--bot-card-border);
		box-shadow: var(--bot-card-shadow);
	}
	.maze-bot-arrow {
		border-left-color: var(--bot-arrow-color);
		filter: drop-shadow(var(--bot-arrow-shadow));
	}
	.maze-status-container {
		border-top: 1px solid var(--divider-color);
	}
	.maze-status-box {
		background-color: var(--status-bar-bg);
		border: 1px solid var(--status-bar-border);
		color: var(--status-bar-color);
	}
	.maze-status-box.status-success {
		color: var(--status-success-color);
		box-shadow: var(--status-success-shadow);
	}
	.maze-status-box.status-failed {
		color: var(--status-failed-color);
		box-shadow: var(--status-failed-shadow);
	}
	.maze-status-box.status-running {
		color: var(--status-running-color);
	}
</style>

<div class="maze-panel flex flex-col h-full rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 landscape:p-2.5 shadow-2xl overflow-hidden relative backdrop-blur-md">
	<!-- Game Panel Header -->
	<div class="maze-header flex items-center justify-between pb-2 sm:pb-3 landscape:pb-1.5 shrink-0 relative z-10">
		<div class="flex items-center gap-2">
			<div class="maze-header-icon w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center shadow-xs">
				<Icon name="gamepad" size={14} />
			</div>
			<div class="flex items-center gap-1.5">
				<h3 class="maze-header-title font-black text-xs sm:text-base landscape:text-xs tracking-wide">Arena Labirin 2D</h3>
				<div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background-color: var(--header-icon-color);"></div>
			</div>
		</div>

		<!-- Status Badge -->
		<div class="maze-header-badge text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-black flex items-center gap-1.5 shadow-sm {status === 'SUCCESS' ? 'badge-success' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'badge-failed' : status === 'RUNNING' ? 'badge-running' : 'badge-idle'}">
			{#if status === 'SUCCESS'}
				<Icon name="check" size={12} class="shrink-0" />
				<span>BERHASIL</span>
			{:else if status === 'RUNNING'}
				<div class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></div>
				<span>MENJALANKAN</span>
			{:else if status === 'FAILED' || status === 'OUT_OF_BOUNDS'}
				<Icon name="alert-triangle" size={12} class="shrink-0" />
				<span>BELUM TEPAT</span>
			{:else}
				<div class="w-1.5 h-1.5 rounded-full" style="background-color: var(--header-icon-color);"></div>
				<span>SIAP</span>
			{/if}
		</div>
	</div>

	<!-- Arena Canvas / Tile Grid Area -->
	<div
		class="flex-1 flex items-center justify-center p-1 sm:p-2.5 landscape:p-1 relative min-h-0 overflow-hidden z-10"
		style="container-type: size;"
	>
		<!-- The Game World Floor with elevated depth & environmental details -->
		<div
			class="maze-floor relative p-2 sm:p-3 landscape:p-1.5 rounded-2xl select-none max-h-full max-w-full"
			style="width: min(100%, 100cqw, calc(100cqh * ({grid.cols} / {grid.rows})), 350px); aspect-ratio: {grid.cols} / {grid.rows};"
		>
			<!-- Decorative Corner Sci-Fi LED Nodes -->
			<div class="maze-led-cyan absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full"></div>
			<div class="maze-led-cyan absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"></div>
			<div class="maze-led-indigo absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full"></div>
			<div class="maze-led-indigo absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full"></div>

			<!-- Grid Tiles Map -->
			<div
				class="grid gap-1 sm:gap-1.5 landscape:gap-1 w-full h-full relative"
				style="grid-template-columns: repeat({grid.cols}, minmax(0, 1fr)); grid-template-rows: repeat({grid.rows}, minmax(0, 1fr));"
			>
				{#each Array(grid.rows) as _, r}
					{#each Array(grid.cols) as _, c}
						{@const currentCoord = { x: c, y: r }}
						{@const isTarget = isCoordEqual(grid.targetPos, currentCoord)}
						{@const isObstacle = grid.obstacles.some((o: GridCoord) => isCoordEqual(o, currentCoord))}
						{@const isCoin = grid.coins && grid.coins.some((coin: GridCoord) => isCoordEqual(coin, currentCoord))}
						{@const isCoinCollected = collectedCoins.some((coin: GridCoord) => isCoordEqual(coin, currentCoord))}
						{@const isVisited = visitedHistory.some((v) => isCoordEqual(v, currentCoord))}
						{@const isStartTile = isCoordEqual(grid.startPos, currentCoord)}

						<div
							class="relative rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden {isObstacle
								? 'maze-cell-obstacle'
								: isTarget
									? 'maze-cell-target'
									: isVisited
										? 'maze-cell-visited'
										: isStartTile
											? 'maze-cell-start'
											: 'maze-cell-empty'}"
						>
							<!-- Subtle Tile Grid Intersection Dots / Circuit Details -->
							<div class="maze-tile-dot absolute top-1 left-1 w-1 h-1 rounded-full pointer-events-none"></div>

							<!-- Start Launchpad Corner Bracket Accent -->
							{#if isStartTile && !isObstacle}
								<div class="maze-start-bracket absolute inset-1 border border-dashed rounded-lg pointer-events-none"></div>
							{/if}

							<!-- Tile Coordinate Label -->
							<span class="maze-coord absolute bottom-0.5 right-1 text-[7px] sm:text-[8px] font-mono pointer-events-none select-none">
								{c},{r}
							</span>

							<!-- Obstacle Rock / 3D Barrier Block -->
							{#if isObstacle}
								<div class="maze-obstacle-inner w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center">
									<svg viewBox="0 0 24 24" class="maze-obstacle-svg w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-2">
										<path d="M4 18h16l-3-11-5 4-4-5z" />
									</svg>
								</div>
							{/if}

							<!-- Target Goal (Pulsating Golden Star + Target Rings) -->
							{#if isTarget}
								<div class="relative flex items-center justify-center">
									<!-- Target floor ring -->
									<div class="maze-target-ring absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full border animate-ping pointer-events-none"></div>
									<div class="maze-target-glow absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full blur-xs pointer-events-none"></div>

									<!-- Floating Star Vector -->
									<div class="animate-star-pulse flex items-center justify-center maze-star-icon">
										<Icon name="star" size={20} class="fill-current" />
									</div>

									{#if status === 'SUCCESS'}
										<div class="maze-victory-glow absolute -inset-1.5 rounded-full blur-md animate-victory-sparkle pointer-events-none"></div>
									{/if}
								</div>
							{/if}

							<!-- Collectible Energy Coin -->
							{#if isCoin && !isCoinCollected && !isTarget}
								<div class="maze-coin w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full flex items-center justify-center animate-bounce">
									<Icon name="zap" size={10} class="fill-current" />
								</div>
							{/if}
						</div>
					{/each}
				{/each}

				<!-- ======================================================== -->
				<!-- SMOOTHLY GLIDING PYBOT MASCOT OVERLAY                    -->
				<!-- (Transitions smoothly between coordinates without teleport) -->
				<!-- ======================================================== -->
				<div
					class="absolute z-20 pointer-events-none flex items-center justify-center transition-all duration-300 ease-out"
					style="
						width: calc(100% / {grid.cols});
						height: calc(100% / {grid.rows});
						left: calc({playerPos.x} * 100% / {grid.cols});
						top: calc({playerPos.y} * 100% / {grid.rows});
					"
				>
					<div class="animate-pybot-float relative flex items-center justify-center w-full h-full">
						<!-- Moving cyan under-glow underneath PyBot -->
						<div class="maze-bot-glow absolute -inset-1.5 rounded-full blur-md pointer-events-none animate-pulse"></div>

						<!-- Ground contact shadow -->
						<div class="absolute bottom-1 w-6 h-1.5 rounded-full bg-black/60 blur-[1px]"></div>

						<!-- PyBot Mascot Card -->
						<div class="maze-bot-card w-7 h-7 sm:w-9 sm:h-9 landscape:w-7 landscape:h-7 rounded-xl p-0.5 sm:p-1 flex items-center justify-center relative">
							<img
								src={getMascotSprite(playerDirection)}
								alt="PyBot"
								class="w-full h-full object-contain filter drop-shadow transition-transform duration-200 {playerDirection === 'UP' ? 'scale-95 -translate-y-0.5' : ''}"
							/>
						</div>

						<!-- Smoothly Rotating Direction Heading Triangle Indicator (Centered Anchor) -->
						<div
							class="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
							style="transform: rotate({getPlayerRotation(playerDirection)}deg);"
						>
							<div class="translate-x-[18px] sm:translate-x-[22px] flex items-center">
								<div class="maze-bot-arrow w-0 h-0 border-y-[4px] sm:border-y-[5px] border-y-transparent border-l-[7px] sm:border-l-[8px] animate-pulse"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Status Message Bar at Bottom -->
	<div class="maze-status-container pt-1.5 sm:pt-2 landscape:pt-1 shrink-0 relative z-10">
		<div class="maze-status-box p-2 sm:p-2.5 landscape:p-1.5 rounded-xl text-[11px] sm:text-xs text-center font-bold truncate sm:whitespace-normal {status === 'SUCCESS' ? 'status-success' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'status-failed' : status === 'RUNNING' ? 'status-running' : ''}">
			{statusMessage || 'Susun balok instruksi lalu tekan tombol JALANKAN KODE.'}
		</div>
	</div>
</div>
