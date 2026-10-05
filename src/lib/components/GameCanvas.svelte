<script lang="ts">
	import type { ChallengeGrid, Direction, GridCoord } from '$lib/types';
	import { isCoordEqual } from '$lib/game/engine';

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
	<div class="flex items-center justify-between pb-3 border-b border-slate-800">
		<div class="flex items-center gap-2">
			<span class="text-lg">🗺️</span>
			<h3 class="font-bold text-white text-sm sm:text-base">Arena Labirin 2D</h3>
		</div>
		<div class="text-xs px-3 py-1 rounded-full font-bold {status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'}">
			{status === 'SUCCESS' ? '🏆 BERHASIL' : status === 'RUNNING' ? '⚡ SEDANG BERJALAN' : status === 'FAILED' ? '❌ GAGAL' : 'SIAP'}
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

						<!-- Obstacle Rock -->
						{#if isObstacle}
							<div class="text-lg sm:text-2xl filter drop-shadow">🪨</div>
						{/if}

						<!-- Target Goal (Gold Star) -->
						{#if isTarget}
							<div class="text-xl sm:text-2xl animate-pulse filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
								⭐
							</div>
						{/if}

						<!-- Collectible Coin -->
						{#if isCoin && !isCoinCollected && !isTarget}
							<div class="text-base sm:text-lg animate-bounce filter drop-shadow">
								🪙
							</div>
						{/if}

						<!-- Player Robot (PyBot) -->
						{#if isPlayer}
							<div
								class="absolute inset-0 flex items-center justify-center transition-transform duration-300 z-10"
								style="transform: rotate({getPlayerRotation(playerDirection)}deg);"
							>
								<div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 border-2 border-white flex items-center justify-center shadow-lg shadow-indigo-500/50">
									<span class="text-base sm:text-xl select-none" style="transform: rotate({-getPlayerRotation(playerDirection)}deg);">
										🤖
									</span>
								</div>
								<!-- Direction Pointer Triangle -->
								<div class="absolute -right-1 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-white drop-shadow"></div>
							</div>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>

	<!-- Status Message Bar at Bottom -->
	<div class="pt-2 border-t border-slate-800">
		<div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-center font-medium {status === 'SUCCESS' ? 'text-emerald-400 font-bold' : status === 'FAILED' || status === 'OUT_OF_BOUNDS' ? 'text-rose-400 font-bold' : 'text-slate-300'}">
			{statusMessage || 'Susun balok instruksi lalu tekan tombol JALANKAN KODE.'}
		</div>
	</div>
</div>
