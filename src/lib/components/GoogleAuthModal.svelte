<script lang="ts">
	import { onDestroy } from 'svelte';
	import { authStore, getGoogleClientId } from '$lib/stores/authStore';
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
	let activeClientId = $state('');
	let isButtonRendered = $state(false);
	let isGisFailed = $state(false);

	let pollInterval: any = null;
	let timeoutTimer: any = null;

	function checkGisReady(): boolean {
		return typeof window !== 'undefined' && !!(window as any).google?.accounts?.id;
	}

	async function handleCredentialResponse(response: any) {
		if (!response || !response.credential) {
			errorMessage = 'Login dibatalkan.';
			return;
		}

		errorMessage = null;
		try {
			const loginResult = await authStore.loginWithGoogleCredential(response.credential);
			if (loginResult && loginResult.success) {
				if (onLoginSuccess) {
					onLoginSuccess(loginResult.needsSetup ?? false);
				}
				onClose();
			} else {
				errorMessage = loginResult?.error || 'Login Google gagal. Coba lagi.';
			}
		} catch (err) {
			console.error('Google modal login error:', err);
			errorMessage = 'Koneksi bermasalah. Coba lagi.';
		}
	}

	function clearTimers() {
		if (pollInterval) {
			clearInterval(pollInterval);
			pollInterval = null;
		}
		if (timeoutTimer) {
			clearTimeout(timeoutTimer);
			timeoutTimer = null;
		}
	}

	function renderGisButton() {
		if (isButtonRendered || !googleButtonContainer) return;

		activeClientId = getGoogleClientId();
		if (!activeClientId) {
			isGisFailed = true;
			return;
		}

		if (checkGisReady()) {
			try {
				(window as any).google.accounts.id.initialize({
					client_id: activeClientId,
					callback: handleCredentialResponse,
					auto_select: false,
					cancel_on_tap_outside: true
				});

				// Strictly ensure container is empty so only ONE button can exist
				googleButtonContainer.innerHTML = '';
				(window as any).google.accounts.id.renderButton(googleButtonContainer, {
					theme: 'outline',
					size: 'large',
					shape: 'pill',
					width: 300,
					text: 'continue_with',
					logo_alignment: 'left'
				});

				isButtonRendered = true;
				isGisFailed = false;
				clearTimers();
			} catch (err) {
				console.error('Error initializing Google GIS in modal:', err);
				isGisFailed = true;
			}
		}
	}

	$effect(() => {
		if (isOpen) {
			errorMessage = null;
			isButtonRendered = false;
			isGisFailed = false;
			activeClientId = getGoogleClientId();

			if (checkGisReady()) {
				setTimeout(renderGisButton, 50);
			} else {
				pollInterval = setInterval(() => {
					if (checkGisReady()) {
						renderGisButton();
					}
				}, 100);

				timeoutTimer = setTimeout(() => {
					if (!isButtonRendered) {
						clearTimers();
						if (checkGisReady()) {
							renderGisButton();
						} else {
							isGisFailed = true;
						}
					}
				}, 4000);
			}
		} else {
			clearTimers();
			isButtonRendered = false;
		}
	});

	onDestroy(() => {
		clearTimers();
	});

	function handleFallbackPrompt() {
		if (!activeClientId) return;

		if (checkGisReady()) {
			try {
				(window as any).google.accounts.id.initialize({
					client_id: activeClientId,
					callback: handleCredentialResponse,
					auto_select: false,
					cancel_on_tap_outside: true
				});
				(window as any).google.accounts.id.prompt((notification: any) => {
					if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
						renderGisButton();
					}
				});
			} catch (e) {
				console.error('Google prompt error:', e);
			}
		} else {
			errorMessage = 'Layanan Google Identity sedang dimuat. Silakan periksa koneksi internet.';
		}
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
				<div class="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-2 mb-3 flex items-center justify-center">
					<img
						src="/mascot/pybot-front-idle.png"
						alt="PyBot"
						class="w-full h-full object-contain"
					/>
				</div>
				<h3 class="text-xl sm:text-2xl font-black text-white mb-1.5">
					Masuk ke PyQuest
				</h3>
				<p class="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
					Hubungkan akun Google kamu untuk menyimpan progres misi, XP, dan petualangan kodingmu.
				</p>
			</div>

			{#if errorMessage}
				<div class="mb-4 p-3 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
					<Icon name="alert-circle" size={16} class="shrink-0 text-rose-400" />
					<span>{errorMessage}</span>
				</div>
			{/if}

			<!-- Google OAuth Section (EXACTLY ONE BUTTON) -->
			<div class="space-y-3.5">
				<div class="flex flex-col items-center justify-center min-h-[44px]">
					<!-- Official GIS Button Container (Only entry point) -->
					<div
						bind:this={googleButtonContainer}
						class="flex justify-center w-full min-h-[44px] {isButtonRendered ? 'block' : 'hidden'}"
					></div>

					<!-- Loading placeholder only while GIS script initializes -->
					{#if !isButtonRendered && !isGisFailed}
						<div
							class="w-full max-w-[300px] h-[44px] rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center gap-2.5 text-slate-400 text-xs font-semibold animate-pulse"
						>
							<svg class="w-4 h-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
							</svg>
							<span>Memuat Google Sign-In...</span>
						</div>
					{/if}

					<!-- Fallback trigger ONLY if GIS script completely fails to load -->
					{#if isGisFailed}
						<button
							type="button"
							onclick={handleFallbackPrompt}
							class="w-full max-w-[300px] py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
							title="Lanjutkan dengan Google"
						>
							<svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
