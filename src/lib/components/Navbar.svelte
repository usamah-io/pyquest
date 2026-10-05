<script lang="ts">
	import { progressStore } from '$lib/stores/progressStore';

	let { onReset }: { onReset?: () => void } = $props();
</script>

<header class="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white select-none z-30 sticky top-0">
	<div class="flex items-center gap-3">
		<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30">
			<span class="text-xl">🐍</span>
		</div>
		<div>
			<div class="flex items-center gap-2">
				<span class="text-lg font-black tracking-wide bg-gradient-to-r from-amber-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
					PyQuest
				</span>
				<span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
					Kids Python Game
				</span>
			</div>
			<p class="text-xs text-slate-400 hidden sm:block">Belajar Koding Python Seru & Visual</p>
		</div>
	</div>

	<!-- Stats & Gamification HUD -->
	<div class="flex items-center gap-3 sm:gap-5">
		<!-- Streak -->
		<div class="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-sm text-amber-400 font-bold text-sm">
			<span class="text-base animate-pulse">🔥</span>
			<span>{$progressStore.streak}d</span>
		</div>

		<!-- XP Counter -->
		<div class="flex items-center gap-2 px-3.5 py-1 rounded-xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 shadow-sm text-indigo-200 font-bold text-sm">
			<span class="text-base text-yellow-400">⚡</span>
			<span>{$progressStore.xp} <span class="text-xs font-normal text-indigo-400">XP</span></span>
		</div>

		<!-- Reset Button -->
		{#if onReset}
			<button
				type="button"
				onclick={onReset}
				class="text-xs text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-800 transition-colors"
				title="Mulai Ulang Sesi"
			>
				↺ Reset
			</button>
		{/if}
	</div>
</header>
