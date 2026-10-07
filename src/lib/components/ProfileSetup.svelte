<script lang="ts">
	import { authStore, dashboardUserStore } from '$lib/stores/authStore';
	import PyQuestLogo from './PyQuestLogo.svelte';
	import Icon from './Icon.svelte';

	let {
		onComplete
	}: {
		onComplete: () => void;
	} = $props();

	const AVATAR_OPTIONS = [
		{ id: 'pybot-idle', src: '/mascot/pybot-front-idle.png', label: 'PyBot Normal' },
		{ id: 'pybot-happy', src: '/mascot/pybot-happy-success.png', label: 'PyBot Juara' },
		{ id: 'pybot-waving', src: '/mascot/pybot-waving.png', label: 'PyBot Ramah' },
		{ id: 'pybot-left', src: '/mascot/pybot-looking-left.png', label: 'PyBot Waspada' },
		{ id: 'pybot-right', src: '/mascot/pybot-looking-right.png', label: 'PyBot Fokus' }
	];

	let chosenAvatar = $state($dashboardUserStore.avatar || '/mascot/pybot-front-idle.png');
	let displayName = $state($dashboardUserStore.name || 'Penjelajah Kode');
	let customUrl = $state('');
	let showCustomUrlInput = $state(false);
	let errorMessage = $state<string | null>(null);

	// Sync when user store changes
	$effect(() => {
		if ($dashboardUserStore.name && displayName === 'Penjelajah Kode') {
			displayName = $dashboardUserStore.name;
		}
		if ($dashboardUserStore.avatar && chosenAvatar === '/mascot/pybot-front-idle.png') {
			chosenAvatar = $dashboardUserStore.avatar;
		}
	});

	function handleSelectAvatar(src: string) {
		chosenAvatar = src;
		showCustomUrlInput = false;
	}

	function handleCustomUrlApply() {
		if (customUrl.trim()) {
			chosenAvatar = customUrl.trim();
		}
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const trimmedName = displayName.trim();
		if (!trimmedName) {
			errorMessage = 'Nama tampilan tidak boleh kosong.';
			return;
		}

		errorMessage = null;
		authStore.completeProfileSetup({
			name: trimmedName,
			avatar: chosenAvatar
		});

		onComplete();
	}
</script>

<div class="min-h-full flex flex-col items-center justify-center py-6 sm:py-8 px-4 select-none animate-fade-in">
	<div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
		<!-- Logo & Welcoming Header -->
		<div class="flex flex-col items-center text-center mb-6">
			<div class="mb-3">
				<PyQuestLogo size="md" showSubtitle={false} />
			</div>
			<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-2">
				<Icon name="sparkles" size={13} />
				<span>Langkah Awal Petualangan</span>
			</div>
			<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
				Siapkan Profilmu
			</h2>
			<p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
				Tentukan avatar dan nama panggilan yang akan menemanimu belajar koding di PyQuest.
			</p>
		</div>

		{#if errorMessage}
			<div class="mb-4 p-3 rounded-2xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
				<Icon name="alert-circle" size={16} class="shrink-0 text-rose-400" />
				<span>{errorMessage}</span>
			</div>
		{/if}

		<form onsubmit={handleSubmit} class="space-y-6">
			<!-- Avatar Preview & Selector -->
			<div class="flex flex-col items-center">
				<div class="relative group">
					<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border-2 border-indigo-500/50 p-2 shadow-xl shadow-indigo-500/10 flex items-center justify-center overflow-hidden">
						<img
							src={chosenAvatar}
							alt="Avatar Pilihan"
							class="w-full h-full object-contain drop-shadow"
							onerror={(e) => {
								(e.currentTarget as HTMLImageElement).src = '/mascot/pybot-front-idle.png';
							}}
						/>
					</div>
					<div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-white shadow">
						<Icon name="camera" size={14} />
					</div>
				</div>
				<span class="text-[11px] font-bold text-slate-400 mt-3 mb-2">Pilih Avatar Karakter</span>

				<!-- Avatar Presets Grid -->
				<div class="flex items-center justify-center gap-2.5 flex-wrap">
					<!-- If user has Google Avatar, show it as first option -->
					{#if $dashboardUserStore.avatar && $dashboardUserStore.avatar.startsWith('http')}
						<button
							type="button"
							onclick={() => handleSelectAvatar($dashboardUserStore.avatar || '')}
							class="w-12 h-12 rounded-2xl bg-slate-950 border-2 transition-all p-1 cursor-pointer {chosenAvatar === $dashboardUserStore.avatar
								? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/30'
								: 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'}"
							title="Foto Profil Google"
						>
							<img src={$dashboardUserStore.avatar} alt="Google" class="w-full h-full object-cover rounded-xl" />
						</button>
					{/if}

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

				<!-- Custom URL toggle -->
				<div class="mt-3">
					{#if !showCustomUrlInput}
						<button
							type="button"
							onclick={() => (showCustomUrlInput = true)}
							class="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
						>
							+ Gunakan link foto kustom
						</button>
					{:else}
						<div class="flex gap-2 items-center mt-1">
							<input
								type="url"
								bind:value={customUrl}
								placeholder="https://... URL gambar"
								class="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 font-mono text-[11px]"
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

			<!-- Display Name Input -->
			<div class="space-y-1.5 text-left">
				<label for="displayNameInput" class="block text-xs font-bold text-slate-300">
					Nama kamu?
				</label>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
						<Icon name="user" size={16} />
					</div>
					<input
						id="displayNameInput"
						type="text"
						bind:value={displayName}
						placeholder="Ketik namamu..."
						required
						maxlength={32}
						class="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 font-bold focus:outline-none transition-colors shadow-inner"
					/>
				</div>
				<p class="text-[11px] text-slate-500">
					Ini nama yang akan tampil di PyQuest.
				</p>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				class="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 border border-indigo-400/50 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99]"
			>
				<span>Mulai Petualangan</span>
				<Icon name="arrow-right" size={16} class="group-hover:translate-x-1 transition-transform" />
			</button>
		</form>
	</div>
</div>
