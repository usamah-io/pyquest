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
				return '/mascot/pybot-looking-left.png';
			case 'RIGHT':
				return '/mascot/pybot-looking-right.png';
			case 'DOWN':
			case 'UP':
			default:
				return '/mascot/pybot-front-idle.png';
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
			filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.8));
		}
		50% {
			transform: scale(1.14);
			filter: drop-shadow(0 0 20px rgba(251, 191, 36, 1));
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
</style>

<div class="flex flex-col h-full bg-slate-900 border border-cyan-500/25 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 landscape:p-2.5 shadow-2xl shadow-indigo-950/40 overflow-hidden relative backdrop-blur-md">
	<!-- Game Panel Header -->
	<div class="flex items-center justify-between pb-2 sm:pb-3 landscape:pb-1.5 border-b border-cyan-500/15 shrink-0 relative z-10">
		<div class="flex items-center gap-2">
			<div class="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-xs shadow-cyan-500/20">
				<Icon name="gamepad" size={14} />
			</div>
			<div class="flex items-center gap-1.5">
				<h3 class="font-black text-white text-xs sm:text-base landscape:text-xs tracking-wide">Arena Labirin 2D</h3>
				<div class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
			</div>
		</div>

		<!-- Status Badge -->
		<div class="text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-black flex items-center gap-1.5 shadow-sm {status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-emerald-500/20' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'bg-rose-500/20 text-rose-300 border border-rose-400/50 shadow-rose-500/20' : status === 'RUNNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-amber-500/20' : 'bg-slate-800/90 text-slate-300 border border-slate-700'}">
			{#if status === 'SUCCESS'}
				<Icon name="check" size={12} class="text-emerald-400" />
				<span>BERHASIL</span>
			{:else if status === 'RUNNING'}
				<div class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></div>
				<span>MENJALANKAN</span>
			{:else if status === 'FAILED' || status === 'OUT_OF_BOUNDS'}
				<Icon name="alert-triangle" size={12} class="text-rose-400" />
				<span>BELUM TEPAT</span>
			{:else}
				<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
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
			class="relative p-2 sm:p-3 landscape:p-1.5 rounded-2xl bg-[#0c1830] border-2 border-cyan-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.08)] select-none max-h-full max-w-full"
			style="width: min(100%, 100cqw, calc(100cqh * ({grid.cols} / {grid.rows})), 350px); aspect-ratio: {grid.cols} / {grid.rows};"
		>
			<!-- Decorative Corner Sci-Fi LED Nodes -->
			<div class="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400/60 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></div>
			<div class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400/60 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></div>
			<div class="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400/60 shadow-[0_0_6px_rgba(129,140,248,0.8)]"></div>
			<div class="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400/60 shadow-[0_0_6px_rgba(129,140,248,0.8)]"></div>

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
								? 'bg-slate-800 border border-slate-600/60 border-t-slate-500/80 border-b-[3px] border-b-slate-950 shadow-[0_5px_8px_rgba(0,0,0,0.6)]'
								: isTarget
									? 'bg-[#1b2214] border-2 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
									: isVisited
										? 'bg-[#132c45] border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.25)]'
										: isStartTile
											? 'bg-[#13233c] border border-cyan-500/40 shadow-[inset_0_0_8px_rgba(34,211,238,0.2)]'
											: 'bg-[#142138] border border-cyan-500/20 border-t-cyan-300/30 border-b-2 border-b-[#0a1220] shadow-[0_3px_5px_rgba(0,0,0,0.4)] hover:border-cyan-400/40'}"
						>
							<!-- Subtle Tile Grid Intersection Dots / Circuit Details -->
							<div class="absolute top-1 left-1 w-1 h-1 rounded-full bg-cyan-400/15 pointer-events-none"></div>

							<!-- Start Launchpad Corner Bracket Accent -->
							{#if isStartTile && !isObstacle}
								<div class="absolute inset-1 border border-cyan-400/25 border-dashed rounded-lg pointer-events-none"></div>
							{/if}

							<!-- Tile Coordinate Label -->
							<span class="absolute bottom-0.5 right-1 text-[7px] sm:text-[8px] font-mono text-cyan-300/30 pointer-events-none select-none">
								{c},{r}
							</span>

							<!-- Obstacle Rock / 3D Barrier Block -->
							{#if isObstacle}
								<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-700 border border-slate-500/50 flex items-center justify-center text-slate-200 shadow-md">
									<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-slate-500/40 stroke-slate-200 stroke-2">
										<path d="M4 18h16l-3-11-5 4-4-5z" />
									</svg>
								</div>
							{/if}

							<!-- Target Goal (Pulsating Golden Star + Target Rings) -->
							{#if isTarget}
								<div class="relative flex items-center justify-center">
									<!-- Target floor ring -->
									<div class="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-amber-400/30 animate-ping pointer-events-none"></div>
									<div class="absolute w-6 h-6 rounded-full bg-amber-400/25 blur-sm pointer-events-none"></div>

									<!-- Floating Star Vector -->
									<div class="animate-star-pulse text-amber-300">
										<Icon name="star" size={26} class="fill-amber-300" />
									</div>

									{#if status === 'SUCCESS'}
										<div class="absolute -inset-2 rounded-full bg-amber-400/40 blur-md animate-victory-sparkle pointer-events-none"></div>
									{/if}
								</div>
							{/if}

							<!-- Collectible Energy Coin -->
							{#if isCoin && !isCoinCollected && !isTarget}
								<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400 border-2 border-yellow-200 text-slate-950 flex items-center justify-center animate-bounce shadow-[0_0_12px_rgba(251,191,36,0.8)]">
									<Icon name="zap" size={12} class="fill-current" />
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
						<div class="absolute -inset-1.5 rounded-full bg-cyan-400/35 blur-md pointer-events-none animate-pulse"></div>

						<!-- Ground contact shadow -->
						<div class="absolute bottom-1 w-6 h-1.5 rounded-full bg-black/60 blur-[1px]"></div>

						<!-- PyBot Mascot Card -->
						<div class="w-7 h-7 sm:w-9 sm:h-9 landscape:w-7 landscape:h-7 rounded-xl bg-slate-900 border-2 border-cyan-400 p-0.5 sm:p-1 flex items-center justify-center shadow-[0_0_16px_rgba(34,211,238,0.6)] relative">
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
								<div class="w-0 h-0 border-y-[4px] sm:border-y-[5px] border-y-transparent border-l-[7px] sm:border-l-[8px] border-l-cyan-300 filter drop-shadow-[0_0_6px_rgba(34,211,238,1)] animate-pulse"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Status Message Bar at Bottom -->
	<div class="pt-1.5 sm:pt-2 landscape:pt-1 border-t border-cyan-500/15 shrink-0 relative z-10">
		<div class="p-2 sm:p-2.5 landscape:p-1.5 rounded-xl bg-[#09152b]/90 border border-cyan-500/25 text-[11px] sm:text-xs text-center font-bold truncate sm:whitespace-normal {status === 'SUCCESS' ? 'text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : status === 'RUNNING' ? 'text-amber-200' : 'text-cyan-200'}">
			{statusMessage || 'Susun balok instruksi lalu tekan tombol JALANKAN KODE.'}
		</div>
	</div>
</div>
