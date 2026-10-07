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
		animation: pybotFloat 2.4s ease-in-out infinite;
	}

	@keyframes starPulse {
		0%, 100% {
			transform: scale(1);
			filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.7));
		}
		50% {
			transform: scale(1.12);
			filter: drop-shadow(0 0 16px rgba(251, 191, 36, 1));
		}
	}
	.animate-star-pulse {
		animation: starPulse 2s ease-in-out infinite;
	}
</style>

<div class="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 landscape:p-2.5 shadow-xl overflow-hidden backdrop-blur-md">
	<!-- Grid Header / Status Message -->
	<div class="flex items-center justify-between pb-2 sm:pb-3 landscape:pb-1.5 border-b border-slate-800 shrink-0">
		<div class="flex items-center gap-2">
			<Icon name="target" size={17} class="text-indigo-400" />
			<h3 class="font-black text-white text-xs sm:text-base landscape:text-xs tracking-wide">Arena Labirin 2D</h3>
		</div>
		<div class="text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold flex items-center gap-1.5 {status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : status === 'RUNNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'}">
			{#if status === 'SUCCESS'}
				<Icon name="check" size={12} />
				<span>BERHASIL</span>
			{:else if status === 'RUNNING'}
				<Icon name="repeat" size={12} class="animate-spin" />
				<span>MENJALANKAN</span>
			{:else if status === 'FAILED' || status === 'OUT_OF_BOUNDS'}
				<Icon name="alert-triangle" size={12} />
				<span>BELUM TEPAT</span>
			{:else}
				<span>SIAP</span>
			{/if}
		</div>
	</div>

	<!-- Arena Canvas / Tile Grid Area -->
	<div class="flex-1 flex items-center justify-center p-1.5 sm:p-3 landscape:p-1 relative min-h-0 overflow-hidden">
		<!-- The Grid Map with elevated tile textures -->
		<div
			class="grid gap-1 sm:gap-1.5 landscape:gap-1 p-2 sm:p-3 landscape:p-1.5 rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl relative select-none max-h-full"
			style="grid-template-columns: repeat({grid.cols}, minmax(0, 1fr)); width: min(100%, 340px); aspect-ratio: {grid.cols} / {grid.rows};"
		>
			{#each Array(grid.rows) as _, r}
				{#each Array(grid.cols) as _, c}
					{@const currentCoord = { x: c, y: r }}
					{@const isPlayer = isCoordEqual(playerPos, currentCoord)}
					{@const isTarget = isCoordEqual(grid.targetPos, currentCoord)}
					{@const isObstacle = grid.obstacles.some((o: GridCoord) => isCoordEqual(o, currentCoord))}
					{@const isCoin = grid.coins && grid.coins.some((coin: GridCoord) => isCoordEqual(coin, currentCoord))}
					{@const isCoinCollected = collectedCoins.some((coin: GridCoord) => isCoordEqual(coin, currentCoord))}

					<div
						class="relative rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden {isObstacle
							? 'bg-gradient-to-b from-slate-700 to-slate-800 border-t border-t-slate-500 border-b-2 border-b-slate-950 shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]'
							: 'bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 border-t-slate-700/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] hover:border-slate-600/60'}"
					>
						<!-- Subtle Grid Line Accents -->
						<div class="absolute inset-0 bg-radial from-transparent to-black/20 pointer-events-none"></div>

						<!-- Coordinate hint (subtle) -->
						<span class="absolute bottom-0.5 right-1 text-[7px] sm:text-[8px] font-mono text-slate-700/70 pointer-events-none select-none">
							{c},{r}
						</span>

						<!-- Obstacle Rock / Barrier (3D block with texture) -->
						{#if isObstacle}
							<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-b from-slate-600 to-slate-800 border border-slate-500/60 flex items-center justify-center text-slate-300 shadow-inner">
								<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current stroke-2">
									<path d="M4 18h16l-3-11-5 4-4-5z" />
								</svg>
							</div>
						{/if}

						<!-- Target Goal (Gold Star with Pulse & Glow Aura) -->
						{#if isTarget}
							<div class="relative flex items-center justify-center">
								<div class="absolute w-8 h-8 rounded-full bg-amber-400/20 blur-md pointer-events-none"></div>
								<div class="animate-star-pulse text-amber-300">
									<Icon name="star" size={24} class="sm:hidden" />
									<Icon name="star" size={28} class="hidden sm:inline" />
								</div>
							</div>
						{/if}

						<!-- Collectible Coin (Zap Coin) -->
						{#if isCoin && !isCoinCollected && !isTarget}
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400/20 border border-amber-400 text-amber-400 flex items-center justify-center animate-bounce shadow-sm">
								<Icon name="zap" size={12} />
							</div>
						{/if}

						<!-- Player Robot (Alive Floating PyBot Mascot + Direction Indicator) -->
						{#if isPlayer}
							<div
								class="absolute inset-0 flex items-center justify-center transition-transform duration-300 z-10"
								style="transform: rotate({getPlayerRotation(playerDirection)}deg);"
							>
								<div class="animate-pybot-float relative flex items-center justify-center">
									<!-- Aura glow behind PyBot -->
									<div class="absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-sm pointer-events-none"></div>

									<!-- PyBot Sprite Container -->
									<div class="w-7 h-7 sm:w-9 sm:h-9 landscape:w-7 landscape:h-7 rounded-xl bg-slate-900 border-2 border-cyan-400 p-0.5 sm:p-1 flex items-center justify-center shadow-lg shadow-cyan-500/40 relative">
										<div style="transform: rotate({-getPlayerRotation(playerDirection)}deg);" class="w-full h-full flex items-center justify-center">
											<img
												src="/mascot/pybot-front-idle.png"
												alt="PyBot"
												class="w-full h-full object-contain filter drop-shadow"
											/>
										</div>
									</div>

									<!-- Direction Heading Indicator Triangle -->
									<div class="absolute -right-2.5 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-cyan-300 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.9)] animate-pulse"></div>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>

	<!-- Status Message Bar at Bottom -->
	<div class="pt-1.5 sm:pt-2 landscape:pt-1 border-t border-slate-800 shrink-0">
		<div class="p-2 sm:p-2.5 landscape:p-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] sm:text-xs text-center font-medium truncate sm:whitespace-normal {status === 'SUCCESS' ? 'text-emerald-400 font-bold' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'text-rose-400 font-bold' : 'text-slate-300'}">
			{statusMessage || 'Susun balok instruksi lalu tekan tombol JALANKAN KODE.'}
		</div>
	</div>
</div>
