<script lang="ts">
	import { progressStore } from '$lib/stores/progressStore';
	import Icon from './Icon.svelte';

	let {
		currentMode = 'HOME',
		onSelectMode,
		onReset
	}: {
		currentMode?: 'HOME' | 'LEARN' | 'GAME';
		onSelectMode?: (mode: 'HOME' | 'LEARN' | 'GAME') => void;
		onReset?: () => void;
	} = $props();
</script>

<header class="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 select-none z-30 sticky top-0">
	<!-- Left: Logo & Modes -->
	<div class="flex items-center gap-4 sm:gap-6">
		<button
			type="button"
			onclick={() => onSelectMode && onSelectMode('HOME')}
			class="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
			title="Kembali ke Beranda"
		>
			<div class="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
				<Icon name="python" size={20} class="text-indigo-400" />
			</div>
			<div>
				<div class="flex items-center gap-1.5">
					<span class="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
						PyQuest
					</span>
				</div>
				<p class="text-[11px] text-slate-400 font-medium hidden md:block">Petualangan Logika Python</p>
			</div>
		</button>

		<!-- Mode Switch Tabs -->
		{#if onSelectMode}
			<nav class="hidden sm:flex items-center p-1 bg-slate-950/70 border border-slate-800 rounded-xl">
				<button
					type="button"
					onclick={() => onSelectMode('LEARN')}
					class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer {currentMode === 'LEARN'
						? 'bg-indigo-600 text-white shadow-sm'
						: 'text-slate-400 hover:text-slate-200'}"
				>
					<Icon name="book-open" size={14} />
					<span>Modul Belajar</span>
				</button>
				<button
					type="button"
					onclick={() => onSelectMode('GAME')}
					class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer {currentMode === 'GAME'
						? 'bg-emerald-600 text-white shadow-sm'
						: 'text-slate-400 hover:text-slate-200'}"
				>
					<Icon name="gamepad" size={14} />
					<span>Coding Game</span>
				</button>
			</nav>
		{/if}
	</div>

	<!-- Right: Stats & HUD -->
	<div class="flex items-center gap-2.5 sm:gap-4">
		<!-- Streak Counter -->
		<div
			class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-amber-400 text-xs font-bold"
			title="Hari Belajar Berturut-turut"
		>
			<Icon name="flame" size={15} class="text-amber-400" />
			<span>{$progressStore.streak} Hari</span>
		</div>

		<!-- XP Counter -->
		<div
			class="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 text-xs font-bold"
			title="Total Poin Pengalaman"
		>
			<Icon name="zap" size={15} class="text-amber-400" />
			<span>{$progressStore.xp} <span class="text-[10px] text-indigo-400 uppercase">XP</span></span>
		</div>

		<!-- Reset Button -->
		{#if onReset}
			<button
				type="button"
				onclick={onReset}
				class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
				title="Atur Ulang Sesi"
				aria-label="Atur Ulang Sesi"
			>
				<Icon name="rotate-ccw" size={16} />
			</button>
		{/if}
	</div>
</header>
