<script lang="ts">
	import { dashboardUserStore } from '$lib/stores/authStore';
	import PwaInstallButton from './PwaInstallButton.svelte';
	import Icon from './Icon.svelte';

	let {
		currentMode = 'HOME',
		onSelectMode,
		onOpenProfile,
		onOpenXp,
		onOpenStreak
	}: {
		currentMode?: 'HOME' | 'LEARN' | 'GAME' | 'PROFILE';
		onSelectMode?: (mode: 'HOME' | 'LEARN' | 'GAME') => void;
		onOpenProfile?: () => void;
		onOpenXp?: () => void;
		onOpenStreak?: () => void;
	} = $props();
</script>

<aside class="hidden lg:flex flex-col w-60 xl:w-64 bg-slate-900/90 border-r border-slate-800/80 p-4 select-none shrink-0 justify-between backdrop-blur-md z-20">
	<!-- Navigation Links -->
	<div class="space-y-6 pt-1">
		<div>
			<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 pb-2 block">
				Navigasi Utama
			</span>
			<nav class="space-y-1.5">
				<!-- Beranda -->
				<button
					type="button"
					onclick={() => onSelectMode && onSelectMode('HOME')}
					class="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer {currentMode === 'HOME'
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
						: 'text-slate-400 hover:text-white hover:bg-slate-800/70'}"
				>
					<Icon name="home" size={18} class={currentMode === 'HOME' ? 'text-white' : 'text-slate-400'} />
					<span>Beranda</span>
				</button>

				<!-- Modul Belajar -->
				<button
					type="button"
					onclick={() => onSelectMode && onSelectMode('LEARN')}
					class="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer {currentMode === 'LEARN'
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
						: 'text-slate-400 hover:text-white hover:bg-slate-800/70'}"
				>
					<Icon name="book-open" size={18} class={currentMode === 'LEARN' ? 'text-white' : 'text-slate-400'} />
					<span>Modul Belajar</span>
				</button>

				<!-- Coding Game -->
				<button
					type="button"
					onclick={() => onSelectMode && onSelectMode('GAME')}
					class="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer {currentMode === 'GAME'
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
						: 'text-slate-400 hover:text-white hover:bg-slate-800/70'}"
				>
					<Icon name="gamepad" size={18} class={currentMode === 'GAME' ? 'text-white' : 'text-slate-400'} />
					<span>Coding Game</span>
				</button>

				<!-- Profil Siswa -->
				<button
					type="button"
					onclick={() => onOpenProfile && onOpenProfile()}
					class="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer {currentMode === 'PROFILE'
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
						: 'text-slate-400 hover:text-white hover:bg-slate-800/70'}"
				>
					<Icon name="user" size={18} class={currentMode === 'PROFILE' ? 'text-white' : 'text-slate-400'} />
					<span>Profil Siswa</span>
				</button>
			</nav>
		</div>

		<!-- Player Live Stats Panel -->
		<div class="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
			<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
				Statistik Siswa
			</span>
			<div class="grid grid-cols-2 gap-2">
				<!-- Streak -->
				<button
					type="button"
					onclick={() => onOpenStreak && onOpenStreak()}
					class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800/80 hover:border-orange-500/40 flex flex-col items-center text-center transition-all cursor-pointer group active:scale-95"
					title="Buka Kalender Streak"
				>
					<Icon
						name="flame"
						size={16}
						class="{$dashboardUserStore.streak > 0 ? 'text-amber-400' : 'text-slate-500'} mb-0.5 group-hover:scale-110 transition-transform"
					/>
					<span class="text-xs font-black text-white group-hover:text-amber-300 transition-colors">{$dashboardUserStore.streak} Hari</span>
					<span class="text-[9px] text-slate-500 group-hover:text-slate-400 font-bold uppercase">Streak</span>
				</button>
				<!-- XP -->
				<button
					type="button"
					onclick={() => onOpenXp && onOpenXp()}
					class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/40 flex flex-col items-center text-center transition-all cursor-pointer group active:scale-95"
					title="Buka Rincian Total XP"
				>
					<Icon name="zap" size={16} class="text-cyan-400 mb-0.5 group-hover:scale-110 transition-transform" />
					<span class="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">{$dashboardUserStore.xp}</span>
					<span class="text-[9px] text-slate-500 group-hover:text-slate-400 font-bold uppercase">XP</span>
				</button>
			</div>

			<!-- PWA Install Prompt (Subtle, visible when installable) -->
			<div class="pt-1">
				<PwaInstallButton />
			</div>
		</div>
	</div>

	<!-- Bottom Sidebar User Card -->
	<div class="p-3 rounded-2xl bg-slate-900 border border-indigo-500/25 relative overflow-hidden group">
		<button
			type="button"
			onclick={() => onOpenProfile && onOpenProfile()}
			class="w-full flex items-center gap-2.5 text-left cursor-pointer group-hover:opacity-90 transition-opacity"
		>
			<div class="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/50 p-1 shrink-0 overflow-hidden shadow-md">
				<img
					src={$dashboardUserStore.avatar}
					alt="Avatar"
					class="w-full h-full object-contain"
					onerror={(e) => {
						(e.currentTarget as HTMLImageElement).src = '/mascot/pybot-front-idle.png';
					}}
				/>
			</div>
			<div class="flex-1 min-w-0">
				<div class="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
					{$dashboardUserStore.name}
				</div>
				<div class="text-[10px] text-indigo-300 font-mono flex items-center gap-1">
					<span>Level {$dashboardUserStore.level}</span>
					<span class="text-slate-500">•</span>
					<span class="text-slate-400">{$dashboardUserStore.completedMissions} Misi</span>
				</div>
			</div>
		</button>
	</div>
</aside>
