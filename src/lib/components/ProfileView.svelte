<script lang="ts">
	import { authStore, dashboardUserStore } from '$lib/stores/authStore';
	import { soundStore, playClick } from '$lib/stores/soundStore';
	import { themeStore } from '$lib/stores/themeStore';
	import { pwaStore } from '$lib/stores/pwaStore';
	import { progressStore } from '$lib/stores/progressStore';
	import { levelsData } from '$lib/challenges/levelsData';
	import type { GameLevel } from '$lib/types';
	import { avatarStorage, validateImageFile, processAndCompressImage } from '$lib/utils/avatarStorage';
	import Icon from './Icon.svelte';

	let {
		onBackToHome,
		onOpenXp,
		onOpenStreak,
		onOpenMissions
	}: {
		onBackToHome: () => void;
		onOpenXp?: () => void;
		onOpenStreak?: () => void;
		onOpenMissions?: () => void;
	} = $props();

	let selectedBadge = $state<GameLevel | null>(null);

	function handleOpenBadgeDetail(lvl: GameLevel) {
		playClick();
		selectedBadge = lvl;
	}

	function handleCloseBadgeDetail() {
		playClick();
		selectedBadge = null;
	}

	function handleBadgeKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && selectedBadge) {
			selectedBadge = null;
		}
	}

	const DEFAULT_AVATAR = '/mascot/pybot-front-idle.webp';
	const AVATAR_OPTIONS = [
		{ id: 'pybot-idle', src: '/mascot/pybot-front-idle.webp', label: 'PyBot Normal' },
		{ id: 'pybot-happy', src: '/mascot/pybot-happy-success.webp', label: 'PyBot Juara' },
		{ id: 'pybot-waving', src: '/mascot/pybot-waving.webp', label: 'PyBot Ramah' },
		{ id: 'pybot-left', src: '/mascot/pybot-looking-left.webp', label: 'PyBot Waspada' },
		{ id: 'pybot-right', src: '/mascot/pybot-looking-right.webp', label: 'PyBot Fokus' }
	];

	let displayName = $state($dashboardUserStore.name || 'Penjelajah Kode');
	let chosenAvatar = $state($dashboardUserStore.avatar || DEFAULT_AVATAR);
	let saveSuccessMessage = $state<string | null>(null);
	let errorMessage = $state<string | null>(null);
	let isUploading = $state(false);
	let fileInput = $state<HTMLInputElement | null>(null);
	let selectedImageFile = $state<File | null>(null);

	$effect(() => {
		if ($dashboardUserStore.name && displayName === 'Penjelajah Kode') {
			displayName = $dashboardUserStore.name;
		}
		if ($dashboardUserStore.avatar && chosenAvatar === DEFAULT_AVATAR) {
			chosenAvatar = $dashboardUserStore.avatar;
		}
	});

	function handleSelectAvatar(src: string) {
		chosenAvatar = src;
		selectedImageFile = null;
		errorMessage = null;
	}

	function handleOpenFilePicker() {
		if (fileInput) {
			fileInput.value = '';
			fileInput.click();
		}
	}

	async function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		const validation = validateImageFile(file);
		if (!validation.valid) {
			errorMessage = validation.error || 'File tidak valid.';
			return;
		}

		try {
			isUploading = true;
			errorMessage = null;
			const compressedDataUrl = await processAndCompressImage(file);
			chosenAvatar = compressedDataUrl;
			selectedImageFile = file;
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Gagal memproses gambar.';
		} finally {
			isUploading = false;
		}
	}

	async function handleRemovePhoto() {
		chosenAvatar = DEFAULT_AVATAR;
		selectedImageFile = null;
		errorMessage = null;
		const userId = $dashboardUserStore.id || 'guest-1';
		await avatarStorage.removeAvatar(userId);
	}

	async function handleSaveProfile(e: SubmitEvent) {
		e.preventDefault();
		const trimmedName = displayName.trim();
		if (!trimmedName) {
			errorMessage = 'Nama tampilan tidak boleh kosong.';
			return;
		}

		errorMessage = null;
		const userId = $dashboardUserStore.id || 'guest-1';

		if (selectedImageFile) {
			await avatarStorage.saveAvatar(userId, selectedImageFile);
		} else if (chosenAvatar === DEFAULT_AVATAR) {
			await avatarStorage.removeAvatar(userId);
		}

		authStore.updateProfile({
			name: trimmedName,
			avatar: chosenAvatar
		});

		saveSuccessMessage = 'Perubahan profil berhasil disimpan!';
		setTimeout(() => {
			saveSuccessMessage = null;
		}, 3000);
	}

	const BANNER_STORAGE_KEY = 'pyquest-profile-pwa-dismissed';
	let showInstallBanner = $state(true);

	$effect(() => {
		if (typeof window !== 'undefined') {
			try {
				const dismissed =
					localStorage.getItem(BANNER_STORAGE_KEY) === 'true' ||
					document.cookie.includes('pyquest-profile-pwa-dismissed=true') ||
					document.cookie.includes('pyquest_hide_pwa_banner=true');
				if (dismissed) {
					showInstallBanner = false;
				}
			} catch {}
		}
	});

	function dismissBanner() {
		playClick();
		showInstallBanner = false;
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(BANNER_STORAGE_KEY, 'true');
				document.cookie = 'pyquest-profile-pwa-dismissed=true; max-age=315360000; path=/; SameSite=Lax';
				document.cookie = 'pyquest_hide_pwa_banner=true; max-age=315360000; path=/; SameSite=Lax';
			} catch {}
		}
	}

	async function handleInstallApp() {
		playClick();
		await pwaStore.promptInstall();
	}

	function handleLogout() {
		playClick();
		authStore.logout();
		onBackToHome();
	}
</script>

<div class="max-w-4xl mx-auto w-full py-4 sm:py-6 px-3 sm:px-4 select-none space-y-6">
	<!-- Top Navigation / Back -->
	<div class="flex items-center justify-between">
		<button
			type="button"
			onclick={onBackToHome}
			class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-300 dark:border-slate-700 shadow-xs"
		>
			<Icon name="arrow-left" size={15} />
			<span>Kembali ke Beranda</span>
		</button>
		<div class="text-xs font-bold text-slate-500 uppercase tracking-wider">
			Pengaturan Akun
		</div>
	</div>

	<!-- Dismissible PWA Install Notification Banner -->
	{#if !$pwaStore.isInstalled && showInstallBanner}
		<div class="relative p-3.5 sm:p-4 rounded-2xl bg-indigo-50/90 dark:bg-slate-900/95 border border-indigo-200 dark:border-indigo-500/40 shadow-sm dark:shadow-xl flex items-center justify-between gap-3 text-left animate-fade-in backdrop-blur-md">
			<div class="flex items-center gap-3 min-w-0">
				<div class="w-10 h-10 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-cyan-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 shrink-0">
					<Icon name="download" size={20} />
				</div>
				<div class="min-w-0">
					<div class="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
						<span>Pasang Aplikasi PyQuest</span>
						<span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-cyan-300 font-mono font-bold">PWA</span>
					</div>
					<p class="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
						Akses lebih cepat & mainkan langsung dari layar utama HP kamu!
					</p>
				</div>
			</div>

			<div class="flex items-center gap-2 shrink-0">
				<button
					type="button"
					onclick={handleInstallApp}
					class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-indigo-600/20 active:scale-95 flex items-center gap-1.5"
				>
					<Icon name="download" size={13} class="text-white" />
					<span>Pasang</span>
				</button>
				<button
					type="button"
					onclick={dismissBanner}
					class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer"
					aria-label="Tutup pemberitahuan"
					title="Tutup"
				>
					<Icon name="x" size={16} />
				</button>
			</div>
		</div>
	{/if}

	<!-- Success Banner -->
	{#if saveSuccessMessage}
		<div class="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-lg animate-fade-in">
			<Icon name="check-circle" size={18} class="text-emerald-400 shrink-0" />
			<span>{saveSuccessMessage}</span>
		</div>
	{/if}

	<!-- Error Banner -->
	{#if errorMessage}
		<div class="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2 shadow-lg animate-fade-in">
			<Icon name="alert-circle" size={18} class="text-rose-400 shrink-0" />
			<span>{errorMessage}</span>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<!-- Left: Profile Identity Card -->
		<div class="md:col-span-1 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden">
			<!-- Hidden Native File Input for Device Image Selection -->
			<input
				bind:this={fileInput}
				type="file"
				accept="image/jpeg,image/png,image/webp"
				onchange={handleFileChange}
				class="hidden"
			/>

			<div
				class="relative group cursor-pointer mb-3"
				onclick={handleOpenFilePicker}
				role="button"
				tabindex="0"
				onkeydown={(e) => e.key === 'Enter' && handleOpenFilePicker()}
				title="Klik untuk ubah foto"
			>
				<div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-950 border-2 border-indigo-500/40 p-0 shadow-xl shadow-indigo-500/20 flex items-center justify-center overflow-hidden hover:border-cyan-400 transition-colors">
					<img
						src={chosenAvatar}
						alt="Avatar"
						class="w-full h-full object-cover object-center rounded-full"
						onerror={(e) => {
							(e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
						}}
					/>
				</div>
				<div class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-white shadow transition-transform group-hover:scale-110">
					<Icon name="camera" size={14} />
				</div>
			</div>

			<div class="flex items-center gap-2 mb-4">
				<button
					type="button"
					onclick={handleOpenFilePicker}
					disabled={isUploading}
					class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-600/30 dark:hover:bg-indigo-600/50 border border-indigo-200 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
				>
					<Icon name="upload" size={13} class="text-indigo-600 dark:text-indigo-200" />
					<span>{isUploading ? 'Memproses...' : 'Ubah Foto'}</span>
				</button>
				{#if chosenAvatar !== DEFAULT_AVATAR}
					<button
						type="button"
						onclick={handleRemovePhoto}
						class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 text-xs font-semibold transition-all cursor-pointer shadow-xs"
					>
						Hapus
					</button>
				{/if}
			</div>

			<h3 class="text-xl font-black text-white mb-1">
				{$dashboardUserStore.name}
			</h3>
			<p class="text-xs text-indigo-400 font-mono mb-4">
				{$dashboardUserStore.email || 'Penjelajah Mandiri'}
			</p>

			<div class="w-full pt-4 border-t border-slate-800 space-y-2">
				<div class="flex items-center justify-between text-xs py-1 text-slate-400">
					<span>Tipe Akun:</span>
					<span class="font-bold text-slate-200 uppercase tracking-wider text-[11px] bg-slate-800 px-2 py-0.5 rounded">
						{$dashboardUserStore.provider === 'google' ? 'Google OAuth' : 'Tamu'}
					</span>
				</div>
				<div class="flex items-center justify-between text-xs py-1 text-slate-400">
					<span>Status:</span>
					<span class="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
						<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
						Aktif
					</span>
				</div>
			</div>

			<!-- Preferensi Aplikasi (Tema & Efek Suara) -->
			<div class="w-full pt-4 border-t border-slate-800 space-y-3 text-left">
				<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
					Preferensi Aplikasi
				</span>

				<!-- Tema Tampilan -->
				<div class="space-y-1.5">
					<div class="flex items-center justify-between text-xs text-slate-400">
						<span>Tema:</span>
						<span class="font-bold text-indigo-400 capitalize text-[11px] font-mono">
							{$themeStore === 'light' ? 'Terang' : 'Gelap'}
						</span>
					</div>
					<div class="grid grid-cols-2 gap-2">
						<button
							type="button"
							onclick={() => {
								if ($themeStore !== 'dark') themeStore.setTheme('dark');
								playClick();
							}}
							class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border {$themeStore === 'dark' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-300 dark:border-slate-700/60'}"
						>
							<Icon name="moon" size={14} class={$themeStore === 'dark' ? 'text-white' : 'text-slate-600 dark:text-slate-400'} />
							<span>Gelap</span>
						</button>
						<button
							type="button"
							onclick={() => {
								if ($themeStore !== 'light') themeStore.setTheme('light');
								playClick();
							}}
							class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border {$themeStore === 'light' ? 'bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-500/30' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-300 dark:border-slate-700/60'}"
						>
							<Icon name="sun" size={14} class={$themeStore === 'light' ? 'text-white' : 'text-slate-600 dark:text-slate-400'} />
							<span>Terang</span>
						</button>
					</div>
				</div>

				<!-- Efek Suara -->
				<div class="space-y-1.5 pt-1">
					<div class="flex items-center justify-between text-xs text-slate-400">
						<span>Efek Suara:</span>
						<span class="font-bold {$soundStore ? 'text-emerald-400' : 'text-slate-400'} capitalize text-[11px]">
							{$soundStore ? 'Aktif' : 'Nonaktif'}
						</span>
					</div>
					<div class="grid grid-cols-2 gap-2">
						<button
							type="button"
							onclick={() => {
								soundStore.setSound(true);
								playClick();
							}}
							class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border {$soundStore ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-300 dark:border-slate-700/60'}"
						>
							<Icon name="volume-2" size={14} class={$soundStore ? 'text-white' : 'text-slate-600 dark:text-slate-400'} />
							<span>Aktif</span>
						</button>
						<button
							type="button"
							onclick={() => {
								soundStore.setSound(false);
							}}
							class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border {!$soundStore ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-300 dark:border-slate-700/60'}"
						>
							<Icon name="volume-x" size={14} class={!$soundStore ? 'text-white' : 'text-slate-600 dark:text-slate-400'} />
							<span>Nonaktif</span>
						</button>
					</div>
				</div>
			</div>

			<div class="w-full mt-4 pt-4 border-t border-slate-800">
				{#if !$pwaStore.isInstalled}
					<div class="flex items-center gap-2">
						<button
							type="button"
							onclick={handleInstallApp}
							class="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/25 active:scale-98"
							title="Pasang aplikasi PyQuest di HP / Perangkat"
						>
							<Icon name="download" size={15} class="text-cyan-300" />
							<span>Pasang Aplikasi</span>
						</button>
						<button
							type="button"
							onclick={handleLogout}
							class="py-2.5 px-3.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-500/30 text-rose-700 hover:text-rose-800 dark:text-rose-300 dark:hover:text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0"
							title="Keluar dari akun"
						>
							<Icon name="log-out" size={15} class="text-rose-600 dark:text-rose-400" />
							<span>Keluar</span>
						</button>
					</div>
				{:else}
					<button
						type="button"
						onclick={handleLogout}
						class="w-full py-2.5 px-3.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-500/30 text-rose-700 hover:text-rose-800 dark:text-rose-300 dark:hover:text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
						title="Keluar dari akun"
					>
						<Icon name="log-out" size={15} class="text-rose-600 dark:text-rose-400" />
						<span>Keluar Akun</span>
					</button>
				{/if}
			</div>
		</div>

		<!-- Right: Edit Form & Stats -->
		<div class="md:col-span-2 space-y-6">
			<!-- Statistics Bar (Clickable Stat Summary Cards) -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
				<!-- Total XP Button -->
				<button
					type="button"
					onclick={() => onOpenXp && onOpenXp()}
					class="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 flex flex-col items-center text-center transition-all cursor-pointer group shadow-xs active:scale-95"
					title="Buka Rincian Total XP"
				>
					<Icon name="zap" size={20} class="text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
					<span class="text-xl font-black text-white group-hover:text-amber-300 transition-colors">{$dashboardUserStore.xp}</span>
					<span class="text-[10px] text-slate-400 group-hover:text-slate-300 uppercase font-bold tracking-wider">Total XP</span>
				</button>

				<!-- Peringkat Button -->
				<button
					type="button"
					onclick={() => onOpenXp && onOpenXp()}
					class="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex flex-col items-center text-center transition-all cursor-pointer group shadow-xs active:scale-95"
					title="Buka Peringkat & Progres Level"
				>
					<Icon name="award" size={20} class="text-indigo-400 mb-1 group-hover:scale-110 transition-transform" />
					<span class="text-xl font-black text-white group-hover:text-indigo-300 transition-colors">Lvl {$dashboardUserStore.level}</span>
					<span class="text-[10px] text-slate-400 group-hover:text-slate-300 uppercase font-bold tracking-wider">Peringkat</span>
				</button>

				<!-- Hari Beruntun Button -->
				<button
					type="button"
					onclick={() => onOpenStreak && onOpenStreak()}
					class="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/50 flex flex-col items-center text-center transition-all cursor-pointer group shadow-xs active:scale-95"
					title="Buka Kalender Streak Konsistensi"
				>
					<Icon
						name="flame"
						size={20}
						class="{$dashboardUserStore.streak > 0 ? 'text-orange-400' : 'text-slate-500'} mb-1 group-hover:scale-110 transition-transform"
					/>
					<span class="text-xl font-black text-white group-hover:text-orange-300 transition-colors">{$dashboardUserStore.streak}</span>
					<span class="text-[10px] text-slate-400 group-hover:text-slate-300 uppercase font-bold tracking-wider">Hari Beruntun</span>
				</button>

				<!-- Misi Selesai Button -->
				<button
					type="button"
					onclick={() => onOpenMissions && onOpenMissions()}
					class="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex flex-col items-center text-center transition-all cursor-pointer group shadow-xs active:scale-95"
					title="Buka Arsip Misi Selesai"
				>
					<Icon name="check-circle" size={20} class="text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
					<span class="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">{$dashboardUserStore.completedMissions}</span>
					<span class="text-[10px] text-slate-400 group-hover:text-slate-300 uppercase font-bold tracking-wider">Misi Selesai</span>
				</button>
			</div>

			<!-- Edit Form -->
			<div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
				<h4 class="text-base font-black text-white mb-4 flex items-center gap-2">
					<Icon name="edit-3" size={17} class="text-indigo-400" />
					<span>Ubah Data Profil</span>
				</h4>

				<form onsubmit={handleSaveProfile} class="space-y-5">
					<!-- Display Name Input -->
					<div class="space-y-1.5">
						<label for="profileNameInput" class="block text-xs font-bold text-slate-300">
							Nama
						</label>
						<input
							id="profileNameInput"
							type="text"
							bind:value={displayName}
							maxlength={32}
							class="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none transition-colors"
						/>
					</div>

					<!-- Akun Google Read-only Identity -->
					<div class="space-y-1.5">
						<span class="block text-xs font-bold text-slate-300">
							Akun Google
						</span>
						<div class="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-sm font-mono select-text">
							<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
								<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
								<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
								<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
								<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
							</svg>
							<span class="truncate">{$dashboardUserStore.email || 'user@example.com'}</span>
							<span class="ml-auto text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 shrink-0">Terhubung</span>
						</div>
					</div>

					<!-- Choose Avatar Presets -->
					<div class="space-y-2">
						<span class="block text-xs font-bold text-slate-300">
							Atau Pilih Avatar Karakter PyBot
						</span>
						<div class="flex items-center gap-2.5 flex-wrap">
							{#each AVATAR_OPTIONS as opt}
								<button
									type="button"
									onclick={() => handleSelectAvatar(opt.src)}
									class="w-12 h-12 rounded-2xl bg-slate-950 border-2 transition-all p-1.5 cursor-pointer {chosenAvatar === opt.src
										? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/30'
										: 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'}"
									title={opt.label}
								>
									<img src={opt.src} alt={opt.label} class="w-full h-full object-contain" />
								</button>
							{/each}
						</div>
					</div>

					<!-- Submit Button -->
					<div class="pt-3 border-t border-slate-800 flex justify-end">
						<button
							type="submit"
							class="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
						>
							<Icon name="check" size={16} />
							<span>Simpan Perubahan</span>
						</button>
					</div>
				</form>
			</div>

			<!-- Koleksi Lencana Pencapaian (Achievements Showcase) -->
			<div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
				<div class="flex items-center justify-between mb-4">
					<h4 class="text-base font-black text-white flex items-center gap-2">
						<Icon name="trophy" size={18} class="text-amber-400" />
						<span>Koleksi Lencana Level</span>
					</h4>
					<span class="text-xs font-bold text-slate-400 font-mono">
						{($progressStore.completedLevels || []).length} / {levelsData.length} Lencana
					</span>
				</div>

				<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
					{#each levelsData as lvl}
						{@const isUnlocked = ($progressStore.completedLevels || []).includes(lvl.id)}
						<button
							type="button"
							onclick={() => handleOpenBadgeDetail(lvl)}
							class="p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer group active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/40 {isUnlocked
								? 'bg-amber-950/20 hover:bg-amber-950/30 border-amber-500/40 hover:border-amber-400 shadow-xs'
								: 'bg-slate-950/40 hover:bg-slate-950/60 border-slate-800/80 hover:border-slate-700'}"
							title="Klik untuk melihat detail lencana {lvl.achievement?.title || `Level ${lvl.id}`}"
						>
							<div class="flex items-start justify-between gap-1 w-full mb-2">
								<div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform {isUnlocked
									? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
									: 'bg-slate-800 text-slate-400 border border-slate-700/60'}">
									<Icon name={isUnlocked ? (lvl.achievement?.icon || 'trophy') : 'lock'} size={17} />
								</div>
								<span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 {isUnlocked ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-slate-800 text-slate-400 border border-slate-700/60'}">
									Lvl {lvl.id}
								</span>
							</div>

							<div class="w-full min-w-0">
								<div class="text-xs font-black truncate {isUnlocked ? 'text-white group-hover:text-amber-300 transition-colors' : 'text-slate-300'}">
									{lvl.achievement?.title || `Level ${lvl.id}`}
								</div>
								<div class="text-[10px] text-slate-400 truncate mt-0.5 flex items-center justify-between">
									<span>{isUnlocked ? 'Terbuka' : 'Terkunci'}</span>
									<span class="text-cyan-400 font-mono font-semibold">+{lvl.achievement?.xpReward || 25} XP</span>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<svelte:window onkeydown={handleBadgeKeydown} />

<!-- Badge Detail Modal Dialog -->
{#if selectedBadge}
	{@const isUnlocked = ($progressStore.completedLevels || []).includes(selectedBadge.id)}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
		role="dialog"
		aria-modal="true"
		aria-labelledby="badge-dialog-title"
	>
		<!-- Backdrop button -->
		<button
			type="button"
			class="fixed inset-0 z-0 bg-transparent border-none cursor-default"
			onclick={handleCloseBadgeDetail}
			aria-label="Tutup dialog rincian lencana"
		></button>

		<div class="relative z-10 w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 text-center space-y-4">
			<!-- Close button -->
			<button
				type="button"
				onclick={handleCloseBadgeDetail}
				class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
				aria-label="Tutup"
			>
				<Icon name="x" size={16} />
			</button>

			<!-- Badge Icon -->
			<div class="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center {isUnlocked ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40 shadow-lg shadow-amber-400/10' : 'bg-slate-800 text-slate-400 border border-slate-700/60'}">
				<Icon name={isUnlocked ? (selectedBadge.achievement?.icon || 'trophy') : 'lock'} size={32} />
			</div>

			<!-- Title & Status -->
			<div>
				<div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold mb-2 {isUnlocked ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-slate-800 text-slate-400 border border-slate-700/60'}">
					<Icon name={isUnlocked ? 'check' : 'lock'} size={12} />
					<span>{isUnlocked ? 'Lencana Terbuka' : 'Lencana Terkunci'}</span>
					<span>•</span>
					<span>Level {selectedBadge.id}</span>
				</div>
				<h3 id="badge-dialog-title" class="text-lg font-black text-white">
					{selectedBadge.achievement?.title || `Level ${selectedBadge.id}`}
				</h3>
			</div>

			<!-- Description -->
			<p class="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
				{isUnlocked
					? (selectedBadge.achievement?.description || 'Berhasil menyelesaikan level ini!')
					: `Selesaikan Level ${selectedBadge.id} (${selectedBadge.title}) untuk membuka lencana ini.`}
			</p>

			<!-- Details: XP & Mission -->
			<div class="text-[11px] text-slate-400 space-y-1.5">
				<div class="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 rounded-xl">
					<span class="text-slate-400">Hadiah XP:</span>
					<span class="font-bold font-mono text-cyan-400">+{selectedBadge.achievement?.xpReward || 25} XP</span>
				</div>
				<div class="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 rounded-xl">
					<span class="text-slate-400">Target Misi:</span>
					<span class="font-bold text-slate-200 truncate max-w-[180px]">{selectedBadge.title}</span>
				</div>
			</div>

			<!-- Action Button -->
			<button
				type="button"
				onclick={handleCloseBadgeDetail}
				class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
			>
				Tutup
			</button>
		</div>
	</div>
{/if}
