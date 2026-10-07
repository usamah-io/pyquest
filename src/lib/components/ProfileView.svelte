<script lang="ts">
	import { authStore, dashboardUserStore } from '$lib/stores/authStore';
	import { progressStore } from '$lib/stores/progressStore';
	import { levelsData } from '$lib/challenges/levelsData';
	import Icon from './Icon.svelte';

	let {
		onBackToHome
	}: {
		onBackToHome: () => void;
	} = $props();

	const AVATAR_OPTIONS = [
		{ id: 'pybot-idle', src: '/mascot/pybot-front-idle.png', label: 'PyBot Normal' },
		{ id: 'pybot-happy', src: '/mascot/pybot-happy-success.png', label: 'PyBot Juara' },
		{ id: 'pybot-waving', src: '/mascot/pybot-waving.png', label: 'PyBot Ramah' },
		{ id: 'pybot-left', src: '/mascot/pybot-looking-left.png', label: 'PyBot Waspada' },
		{ id: 'pybot-right', src: '/mascot/pybot-looking-right.png', label: 'PyBot Fokus' }
	];

	let displayName = $state($dashboardUserStore.name || 'Penjelajah Kode');
	let chosenAvatar = $state($dashboardUserStore.avatar || '/mascot/pybot-front-idle.png');
	let customUrl = $state('');
	let showCustomUrlInput = $state(false);
	let saveSuccessMessage = $state<string | null>(null);

	function handleSelectAvatar(src: string) {
		chosenAvatar = src;
		showCustomUrlInput = false;
	}

	function handleCustomUrlApply() {
		if (customUrl.trim()) {
			chosenAvatar = customUrl.trim();
		}
	}

	function handleSaveProfile(e: SubmitEvent) {
		e.preventDefault();
		const trimmedName = displayName.trim();
		if (!trimmedName) return;

		authStore.updateProfile({
			name: trimmedName,
			avatar: chosenAvatar
		});

		saveSuccessMessage = 'Perubahan profil berhasil disimpan!';
		setTimeout(() => {
			saveSuccessMessage = null;
		}, 3000);
	}

	function handleLogout() {
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
			class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-700"
		>
			<Icon name="arrow-left" size={15} />
			<span>Kembali ke Beranda</span>
		</button>
		<div class="text-xs font-bold text-slate-500 uppercase tracking-wider">
			Pengaturan Akun
		</div>
	</div>

	<!-- Success Banner -->
	{#if saveSuccessMessage}
		<div class="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-lg animate-fade-in">
			<Icon name="check-circle" size={18} class="text-emerald-400 shrink-0" />
			<span>{saveSuccessMessage}</span>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<!-- Left: Profile Identity Card -->
		<div class="md:col-span-1 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden">
			<div class="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-950 border-2 border-indigo-500/40 p-2 shadow-xl shadow-indigo-500/20 mb-4 flex items-center justify-center overflow-hidden">
				<img
					src={chosenAvatar}
					alt="Avatar"
					class="w-full h-full object-contain"
					onerror={(e) => {
						(e.currentTarget as HTMLImageElement).src = '/mascot/pybot-front-idle.png';
					}}
				/>
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

			<div class="w-full mt-6 pt-4 border-t border-slate-800">
				<button
					type="button"
					onclick={handleLogout}
					class="w-full py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 hover:text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<Icon name="log-out" size={15} />
					<span>Keluar Akun</span>
				</button>
			</div>
		</div>

		<!-- Right: Edit Form & Stats -->
		<div class="md:col-span-2 space-y-6">
			<!-- Statistics Bar -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
				<div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
					<Icon name="zap" size={20} class="text-amber-400 mb-1" />
					<span class="text-xl font-black text-white">{$dashboardUserStore.xp}</span>
					<span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total XP</span>
				</div>

				<div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
					<Icon name="award" size={20} class="text-indigo-400 mb-1" />
					<span class="text-xl font-black text-white">Lvl {$dashboardUserStore.level}</span>
					<span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Peringkat</span>
				</div>

				<div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
					<Icon name="flame" size={20} class="text-orange-400 mb-1" />
					<span class="text-xl font-black text-white">{$dashboardUserStore.streak}</span>
					<span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hari Beruntun</span>
				</div>

				<div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
					<Icon name="check-circle" size={20} class="text-emerald-400 mb-1" />
					<span class="text-xl font-black text-white">{$dashboardUserStore.completedMissions}</span>
					<span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Misi Selesai</span>
				</div>
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
							Pilih Avatar Karakter
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

						<div class="pt-1">
							{#if !showCustomUrlInput}
								<button
									type="button"
									onclick={() => (showCustomUrlInput = true)}
									class="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
								>
									+ Gunakan tautan foto kustom
								</button>
							{:else}
								<div class="flex gap-2 items-center mt-1">
									<input
										type="url"
										bind:value={customUrl}
										placeholder="https://... URL gambar"
										class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
									/>
									<button
										type="button"
										onclick={handleCustomUrlApply}
										class="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer"
									>
										Terapkan
									</button>
								</div>
							{/if}
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

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{#each levelsData as lvl}
						{@const isUnlocked = ($progressStore.completedLevels || []).includes(lvl.id)}
						<div class="p-3 rounded-2xl border transition-all flex items-start gap-3 {isUnlocked
							? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
							: 'bg-slate-950/40 border-slate-800/80 opacity-60'}">
							<div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 {isUnlocked
								? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
								: 'bg-slate-800 text-slate-500'}">
								<Icon name={isUnlocked ? (lvl.achievement?.icon || 'trophy') : 'lock'} size={18} />
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-center justify-between gap-1 mb-0.5">
									<span class="text-xs font-black text-white truncate">
										{lvl.achievement?.title || `Level ${lvl.id}`}
									</span>
									<span class="text-[9px] font-mono px-1.5 py-0.5 rounded {isUnlocked ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-500'}">
										Lvl {lvl.id}
									</span>
								</div>
								<p class="text-[10px] text-slate-400 leading-snug line-clamp-2">
									{isUnlocked
										? (lvl.achievement?.description || 'Berhasil menuntaskan level!')
										: `Selesaikan Level ${lvl.id} (${lvl.title}) untuk membuka lencana ini.`}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
