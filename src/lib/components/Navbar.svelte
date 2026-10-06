<script lang="ts">
	import { authStore, dashboardUserStore } from '$lib/stores/authStore';
	import PyQuestLogo from './PyQuestLogo.svelte';
	import Icon from './Icon.svelte';

	let {
		onSelectMode,
		onOpenProfile
	}: {
		onSelectMode?: (mode: 'HOME' | 'LEARN' | 'GAME') => void;
		onOpenProfile?: () => void;
	} = $props();

	let isProfileMenuOpen = $state(false);

	function toggleProfileMenu() {
		isProfileMenuOpen = !isProfileMenuOpen;
	}

	function handleOpenLogin() {
		isProfileMenuOpen = false;
		authStore.openGoogleModal();
	}

	function handleNavigateProfile() {
		isProfileMenuOpen = false;
		if (onOpenProfile) onOpenProfile();
	}
</script>

<header class="flex items-center justify-between px-3 sm:px-6 py-2.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 select-none z-30 sticky top-0">
	<!-- Left: Logo & Brand -->
	<div class="flex items-center gap-3 sm:gap-6">
		<PyQuestLogo
			size="md"
			showSubtitle={true}
			clickable={true}
			onclick={() => onSelectMode && onSelectMode('HOME')}
		/>
	</div>

	<!-- Right: Minimal Clean Avatar Button & Quick Dropdown -->
	<div class="flex items-center gap-2 sm:gap-3 relative">
		<!-- Dynamic Profile Button -->
		<button
			type="button"
			onclick={toggleProfileMenu}
			class="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all cursor-pointer group hover:border-indigo-500/50"
			title="Profil Siswa"
		>
			<div class="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/40 overflow-hidden flex items-center justify-center shrink-0">
				{#if $dashboardUserStore.avatar}
					<img
						src={$dashboardUserStore.avatar}
						alt={$dashboardUserStore.name}
						class="w-full h-full object-cover"
						onerror={(e) => {
							(e.currentTarget as HTMLImageElement).src = '/mascot/pybot-front-idle.png';
						}}
					/>
				{:else}
					<Icon name="user" size={16} class="text-indigo-300" />
				{/if}
			</div>

			<div class="hidden sm:flex flex-col pr-1">
				<span class="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[110px]">
					{$dashboardUserStore.firstName}
				</span>
				<span class="text-[10px] text-indigo-400 font-mono">
					Lvl {$dashboardUserStore.level}
				</span>
			</div>

			<Icon
				name="chevron-down"
				size={14}
				class="text-slate-400 transition-transform duration-200 {isProfileMenuOpen ? 'rotate-180' : ''}"
			/>
		</button>

		<!-- Profile Dropdown Popup -->
		{#if isProfileMenuOpen}
			<!-- Backdrop dismiss -->
			<button
				type="button"
				class="fixed inset-0 z-40 bg-transparent border-none cursor-default"
				onclick={() => (isProfileMenuOpen = false)}
				aria-label="Tutup Menu"
			></button>

			<div class="absolute right-0 top-12 mt-1 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-fade-in space-y-2">
				<!-- Header Info -->
				<div class="px-2 py-1.5 border-b border-slate-800">
					<div class="text-xs font-bold text-white truncate">{$dashboardUserStore.name}</div>
					<div class="text-[11px] text-slate-400 font-mono truncate">
						{$dashboardUserStore.email || 'Mode Tamu'}
					</div>
					<div class="mt-2 flex items-center gap-2">
						<span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 font-bold">
							Level {$dashboardUserStore.level}
						</span>
						<span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
							{$dashboardUserStore.xp} XP
						</span>
					</div>
				</div>

				<!-- Navigation Actions -->
				<div class="space-y-1">
					<button
						type="button"
						onclick={handleNavigateProfile}
						class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-left"
					>
						<Icon name="user" size={15} class="text-indigo-400" />
						<span>Buka Halaman Profil</span>
					</button>

					{#if !$dashboardUserStore.isAuthenticated}
						<button
							type="button"
							onclick={handleOpenLogin}
							class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/30 transition-all cursor-pointer text-left"
						>
							<Icon name="log-in" size={15} class="text-indigo-400" />
							<span>Hubungkan Akun Google</span>
						</button>
					{:else}
						<button
							type="button"
							onclick={() => {
								authStore.logout();
								isProfileMenuOpen = false;
							}}
							class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 transition-colors cursor-pointer text-left"
						>
							<Icon name="log-out" size={15} class="text-rose-400" />
							<span>Keluar Akun</span>
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</header>
