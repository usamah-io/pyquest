<script lang="ts">
	import { authStore, dashboardUserStore } from '$lib/stores/authStore';
	import { avatarStorage, validateImageFile, processAndCompressImage } from '$lib/utils/avatarStorage';
	import PyQuestLogo from './PyQuestLogo.svelte';
	import Icon from './Icon.svelte';

	let {
		onComplete
	}: {
		onComplete: () => void;
	} = $props();

	const DEFAULT_AVATAR = '/mascot/pybot-front-idle.png';
	const AVATAR_OPTIONS = [
		{ id: 'pybot-idle', src: '/mascot/pybot-front-idle.png', label: 'PyBot Normal' },
		{ id: 'pybot-happy', src: '/mascot/pybot-happy-success.png', label: 'PyBot Juara' },
		{ id: 'pybot-waving', src: '/mascot/pybot-waving.png', label: 'PyBot Ramah' },
		{ id: 'pybot-left', src: '/mascot/pybot-looking-left.png', label: 'PyBot Waspada' },
		{ id: 'pybot-right', src: '/mascot/pybot-looking-right.png', label: 'PyBot Fokus' }
	];

	let chosenAvatar = $state($dashboardUserStore.avatar || DEFAULT_AVATAR);
	let displayName = $state($dashboardUserStore.name || 'Penjelajah Kode');
	let errorMessage = $state<string | null>(null);
	let isUploading = $state(false);
	let fileInput = $state<HTMLInputElement | null>(null);
	let selectedImageFile = $state<File | null>(null);

	// Sync when user store changes
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

	async function handleSubmit(e: SubmitEvent) {
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
				<!-- Hidden Native File Input for Device Image Selection -->
				<input
					bind:this={fileInput}
					type="file"
					accept="image/jpeg,image/png,image/webp"
					onchange={handleFileChange}
					class="hidden"
				/>

				<div class="flex flex-col items-center">
					<div class="relative group cursor-pointer" onclick={handleOpenFilePicker} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && handleOpenFilePicker()}>
					<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border-2 border-indigo-500/50 p-2 shadow-xl shadow-indigo-500/10 flex items-center justify-center overflow-hidden hover:border-cyan-400 transition-colors">
						<img
							src={chosenAvatar}
							alt="Avatar Pilihan"
							class="w-full h-full object-cover drop-shadow"
							onerror={(e) => {
								(e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
							}}
						/>
					</div>
					<div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-white shadow transition-transform group-hover:scale-110">
						<Icon name="camera" size={14} />
					</div>
				</div>

				<!-- Upload / Remove Actions -->
				<div class="flex items-center gap-2 mt-3 mb-2">
					<button
						type="button"
						onclick={handleOpenFilePicker}
						disabled={isUploading}
						class="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
					>
						<Icon name="upload" size={13} />
						<span>{isUploading ? 'Memproses...' : 'Ubah Foto'}</span>
					</button>

					{#if chosenAvatar !== DEFAULT_AVATAR}
						<button
							type="button"
							onclick={handleRemovePhoto}
							class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
						>
							Hapus Foto
						</button>
					{/if}
				</div>

				<span class="text-[11px] font-bold text-slate-400 mt-2 mb-2">Atau Pilih Avatar PyBot</span>

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
