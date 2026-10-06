<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import Icon from './Icon.svelte';

	let {
		isOpen = false,
		onClose,
		onLoginSuccess
	}: {
		isOpen: boolean;
		onClose: () => void;
		onLoginSuccess?: (needsProfileSetup: boolean) => void;
	} = $props();

	let googleButtonContainer = $state<HTMLDivElement | null>(null);
	let errorMessage = $state<string | null>(null);
	let isGisLoaded = $state(false);
	let customClientIdInput = $state('');
	let showClientIdConfig = $state(false);

	let activeClientId = $state('');

	function checkGisReady(): boolean {
		return typeof window !== 'undefined' && !!(window as any).google?.accounts?.id;
	}

	function handleCredentialResponse(response: any) {
		if (!response || !response.credential) {
			errorMessage = 'Gagal menerima kredensial dari Google. Silakan coba lagi.';
			return;
		}

		errorMessage = null;
		const loginResult = authStore.loginWithGoogleCredential(response.credential);
		if (loginResult) {
			if (onLoginSuccess) {
				onLoginSuccess(loginResult.needsSetup);
			}
			onClose();
		} else {
			errorMessage = 'Format token Google tidak valid.';
		}
	}

	function initGoogleIdentity() {
		activeClientId = authStore.getGoogleClientId();
		if (!activeClientId) {
			return;
		}

		if (checkGisReady()) {
			isGisLoaded = true;
			try {
				(window as any).google.accounts.id.initialize({
					client_id: activeClientId,
					callback: handleCredentialResponse,
					auto_select: false,
					cancel_on_tap_outside: true
				});

				if (googleButtonContainer) {
					googleButtonContainer.innerHTML = '';
					(window as any).google.accounts.id.renderButton(googleButtonContainer, {
						theme: 'filled_black',
						size: 'large',
						shape: 'pill',
						width: 320,
						text: 'continue_with',
						logo_alignment: 'left'
					});
				}
			} catch (err) {
				console.error('Error initializing Google GIS:', err);
				errorMessage = 'Gagal memuat Google Sign-In. Pastikan Client ID valid.';
			}
		}
	}

	$effect(() => {
		if (isOpen) {
			errorMessage = null;
			activeClientId = authStore.getGoogleClientId();
			if (!activeClientId) {
				showClientIdConfig = true;
			} else {
				showClientIdConfig = false;
				setTimeout(() => {
					initGoogleIdentity();
				}, 100);
			}
		}
	});

	function handleTriggerPrompt() {
		if (!activeClientId) {
			showClientIdConfig = true;
			return;
		}

		if (checkGisReady()) {
			try {
				(window as any).google.accounts.id.prompt((notification: any) => {
					if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
						console.log('Google Prompt dismissed or suppressed, render button is used.');
					}
				});
			} catch (e) {
				console.error('Google prompt error:', e);
			}
		} else {
			errorMessage = 'Layanan Google Identity sedang dimuat. Silakan tunggu sebentar atau periksa koneksi internet.';
		}
	}

	function handleSaveCustomClientId(e: SubmitEvent) {
		e.preventDefault();
		const trimmed = customClientIdInput.trim();
		if (!trimmed) {
			errorMessage = 'Masukkan Google Client ID yang valid.';
			return;
		}
		authStore.setGoogleClientId(trimmed);
		activeClientId = trimmed;
		showClientIdConfig = false;
		errorMessage = null;
		setTimeout(() => {
			initGoogleIdentity();
		}, 100);
	}
</script>

{#if isOpen}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
	>
		<div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
			<!-- Close Button -->
			<button
				type="button"
				onclick={onClose}
				class="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
				aria-label="Tutup"
			>
				<Icon name="x" size={18} />
			</button>

			<!-- Header -->
			<div class="text-center mb-6">
				<div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
					<Icon name="user" size={28} />
				</div>
				<h3 class="text-xl sm:text-2xl font-black text-white mb-1.5">
					Masuk ke PyQuest
				</h3>
				<p class="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
					Hubungkan akun Google kamu untuk menyimpan progres misi, XP, dan petualangan koding.
				</p>
			</div>

			{#if errorMessage}
				<div class="mb-4 p-3 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
					<Icon name="alert-circle" size={16} class="shrink-0 text-rose-400" />
					<span>{errorMessage}</span>
				</div>
			{/if}

			<!-- Google OAuth Section -->
			<div class="space-y-4">
				{#if activeClientId && !showClientIdConfig}
					<!-- Primary Google OAuth Trigger -->
					<div class="flex flex-col items-center gap-3">
						<button
							type="button"
							onclick={handleTriggerPrompt}
							class="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.01] active:scale-[0.99]"
						>
							<!-- Google G SVG Logo -->
							<svg class="w-5 h-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
								/>
							</svg>
							<span>Lanjutkan dengan Google</span>
						</button>

						<!-- Official GIS rendered container (if loaded) -->
						<div bind:this={googleButtonContainer} class="flex justify-center w-full min-h-[44px]"></div>
					</div>

					<div class="text-center pt-2">
						<button
							type="button"
							onclick={() => (showClientIdConfig = true)}
							class="text-[11px] text-slate-500 hover:text-slate-400 underline cursor-pointer"
						>
							Atur Google Client ID ({activeClientId.substring(0, 12)}...)
						</button>
					</div>
				{:else}
					<!-- Client ID Configuration Box when VITE_GOOGLE_CLIENT_ID is not configured yet -->
					<div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
						<div class="flex items-center gap-2 text-indigo-400 font-bold text-xs">
							<Icon name="settings" size={15} />
							<span>Hubungkan Google Cloud Console</span>
						</div>
						<p class="text-[11px] text-slate-400 leading-relaxed">
							Masukkan <strong>Google OAuth 2.0 Client ID</strong> dari Google Cloud Console kamu (atau atur <code>VITE_GOOGLE_CLIENT_ID</code> di file <code>.env</code>):
						</p>
						<form onsubmit={handleSaveCustomClientId} class="space-y-2.5">
							<input
								type="text"
								bind:value={customClientIdInput}
								placeholder="contoh: 123456789-xyz.apps.googleusercontent.com"
								class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
							/>
							<div class="flex gap-2">
								<button
									type="submit"
									class="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
								>
									Simpan & Aktifkan Google Sign-In
								</button>
								{#if activeClientId}
									<button
										type="button"
										onclick={() => (showClientIdConfig = false)}
										class="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
									>
										Batal
									</button>
								{/if}
							</div>
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
