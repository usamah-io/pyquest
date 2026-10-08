<script lang="ts">
	import { authStore, dashboardUserStore } from '$lib/stores/authStore';
	import PyQuestLogo from './PyQuestLogo.svelte';
	import PwaInstallButton from './PwaInstallButton.svelte';
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

	<!-- Right: ONLY User's Profile Avatar -->
	<div class="flex items-center relative">
		<!-- Profile Avatar Button (Clickable) -->
		<button
			type="button"
			onclick={toggleProfileMenu}
			class="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-indigo-500/40 hover:border-cyan-400 p-0.5 transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shrink-0 overflow-hidden"
			title="Profil {$dashboardUserStore.name}"
			aria-label="Buka Menu Profil"
		>
			<img
				src={$dashboardUserStore.avatar || '/mascot/pybot-front-idle.png'}
				alt={$dashboardUserStore.name}
				class="w-full h-full object-cover rounded-full"
				onerror={(e) => {
					(e.currentTarget as HTMLImageElement).src = '/mascot/pybot-front-idle.png';
				}}
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
