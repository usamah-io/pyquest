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

<div class="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl overflow-hidden backdrop-blur-md">
	<!-- Grid Header / Status Message -->
	<div class="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
		<div class="flex items-center gap-2">
			<Icon name="target" size={18} class="text-indigo-400" />
			<h3 class="font-bold text-white text-sm sm:text-base">Arena Labirin 2D</h3>
		</div>
		<div class="text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 {status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : status === 'RUNNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'}">
			{#if status === 'SUCCESS'}
				<Icon name="check" size={13} />
				<span>BERHASIL</span>
			{:else if status === 'RUNNING'}
				<Icon name="repeat" size={13} class="animate-spin" />
				<span>MENJALANKAN</span>
			{:else if status === 'FAILED' || status === 'OUT_OF_BOUNDS'}
				<Icon name="alert-triangle" size={13} />
				<span>BELUM TEPAT</span>
			{:else}
				<span>SIAP</span>
			{/if}
		</div>
	</div>

	<!-- Arena Canvas / Tile Grid Area -->
	<div class="flex-1 flex items-center justify-center p-3 relative min-h-[260px]">
		<!-- The Grid Map -->
		<div
			class="grid gap-1.5 p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative select-none"
			style="grid-template-columns: repeat({grid.cols}, minmax(0, 1fr)); width: min(100%, 360px); aspect-ratio: {grid.cols} / {grid.rows};"
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
						class="relative rounded-xl flex items-center justify-center transition-all duration-300 {isObstacle
							? 'bg-slate-800/90 border border-slate-700 shadow-inner'
							: 'bg-slate-900/60 border border-slate-800 hover:bg-slate-800/30'}"
					>
						<!-- Coordinate hint (subtle) -->
						<span class="absolute bottom-1 right-1 text-[8px] font-mono text-slate-700 pointer-events-none">
							{c},{r}
						</span>

						<!-- Obstacle Rock / Barrier (Vector Icon) -->
						{#if isObstacle}
							<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-700/80 border border-slate-600 flex items-center justify-center text-slate-400 shadow-inner">
								<svg viewBox="0 0 24 24" class="w-4 h-4 fill-none stroke-current stroke-2">
									<path d="M4 18h16l-3-11-5 4-4-5z" />
								</svg>
							</div>
						{/if}

						<!-- Target Goal (Gold Star Vector Icon) -->
						{#if isTarget}
							<div class="text-amber-400 animate-pulse filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
								<Icon name="star" size={26} />
							</div>
						{/if}

						<!-- Collectible Coin (Zap Coin Vector Icon) -->
						{#if isCoin && !isCoinCollected && !isTarget}
							<div class="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400 text-amber-400 flex items-center justify-center animate-bounce shadow-sm">
								<Icon name="zap" size={13} />
							</div>
						{/if}

						<!-- Player Robot (PyBot Mascot Character) -->
						{#if isPlayer}
							<div
								class="absolute inset-0 flex items-center justify-center transition-transform duration-300 z-10"
								style="transform: rotate({getPlayerRotation(playerDirection)}deg);"
							>
								<div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border-2 border-cyan-400 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/40 relative">
									<div style="transform: rotate({-getPlayerRotation(playerDirection)}deg);" class="w-full h-full flex items-center justify-center">
										<img
											src="/mascot/pybot-front-idle.png"
											alt="PyBot"
											class="w-full h-full object-contain filter drop-shadow"
										/>
									</div>
								</div>
								<!-- Direction Pointer Triangle -->
								<div class="absolute -right-1 w-0 h-0 border-y-4 border-y-transparent border-l-[7px] border-l-cyan-300 drop-shadow"></div>
							</div>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>

	<!-- Status Message Bar at Bottom -->
	<div class="pt-2 border-t border-slate-800 shrink-0">
		<div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-center font-medium {status === 'SUCCESS' ? 'text-emerald-400 font-bold' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'text-rose-400 font-bold' : 'text-slate-300'}">
			{statusMessage || 'Susun balok instruksi lalu tekan tombol JALANKAN KODE.'}
		</div>
	</div>
</div>
