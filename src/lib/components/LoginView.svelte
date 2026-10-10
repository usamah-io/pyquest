<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { authStore, getGoogleClientId } from '$lib/stores/authStore';
	import { loadGoogleGis, isGoogleGisAvailable } from '$lib/utils/googleAuth';
	import PyQuestLogo from './PyQuestLogo.svelte';
	import Icon from './Icon.svelte';

	let {
		onSuccess
	}: {
		onSuccess: (needsProfileSetup: boolean) => void;
	} = $props();

	let googleButtonContainer = $state<HTMLDivElement | null>(null);
	let errorMessage = $state<string | null>(null);
	let isButtonRendered = $state(false);
	let isGisFailed = $state(false);
	let isConnecting = $state(false);

	let pollInterval: any = null;
	let timeoutTimer: any = null;

	function checkGisReady(): boolean {
		return isGoogleGisAvailable();
	}

	async function handleCredentialResponse(response: any) {
		if (!response || !response.credential) {
			errorMessage = 'Login dibatalkan.';
			isConnecting = false;
			return;
		}

		errorMessage = null;

		try {
			const res = await authStore.loginWithGoogleCredential(response.credential);
			if (res.success && res.user) {
				onSuccess(res.needsSetup ?? false);
			} else {
				errorMessage = res.error || 'Login Google gagal. Coba lagi.';
			}
		} catch (err) {
			console.error('Google login credential handler error:', err);
			errorMessage = 'Koneksi bermasalah. Coba lagi.';
		} finally {
			isConnecting = false;
		}
	}

	function renderGisButton() {
		if (isButtonRendered || !googleButtonContainer) return;

		const clientId = getGoogleClientId();
		if (!clientId) {
			isGisFailed = true;
			return;
		}

		if (checkGisReady()) {
			try {
				(window as any).google.accounts.id.initialize({
					client_id: clientId,
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

				if (pollInterval) {
					clearInterval(pollInterval);
					pollInterval = null;
				}
				if (timeoutTimer) {
					clearTimeout(timeoutTimer);
					timeoutTimer = null;
				}
			} catch (err) {
				console.error('GIS render error:', err);
				isGisFailed = true;
			}
		}
	}

	onMount(() => {
		// Immediately attempt rendering if GIS is already present
		if (checkGisReady()) {
			renderGisButton();
		} else {
			// Proactively load the Google script
			loadGoogleGis().then((ready) => {
				if (ready) {
					renderGisButton();
				} else {
					isGisFailed = true;
				}
			});

			pollInterval = setInterval(() => {
				if (checkGisReady()) {
					renderGisButton();
				}
			}, 100);

			timeoutTimer = setTimeout(() => {
				if (!isButtonRendered) {
					if (pollInterval) clearInterval(pollInterval);
					if (checkGisReady()) {
						renderGisButton();
					} else {
						isGisFailed = true;
					}
				}
			}, 3000);
		}
	});

	onDestroy(() => {
		if (pollInterval) clearInterval(pollInterval);
		if (timeoutTimer) clearTimeout(timeoutTimer);
	});

	async function handleFallbackPrompt() {
		errorMessage = null;
		const clientId = getGoogleClientId();
		if (!clientId) {
			errorMessage = 'Client ID Google belum terkonfigurasi.';
			return;
		}

		// If GIS not yet ready, attempt fast load
		if (!checkGisReady()) {
			isConnecting = true;
			const ready = await loadGoogleGis();
			if (ready) {
				renderGisButton();
				isConnecting = false;
				return;
			}
		}

		if (checkGisReady()) {
			try {
				(window as any).google.accounts.id.initialize({
					client_id: clientId,
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
				errorMessage = 'Login Google gagal. Coba lagi.';
			}
		} else {
			// Direct Google OAuth 2.0 redirect fallback (guarantees login works even if GIS CDN is blocked)
			const redirectUri = `${window.location.origin}/api/auth/callback/google`;
			const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
				clientId
			)}&redirect_uri=${encodeURIComponent(
				redirectUri
			)}&response_type=code&scope=openid%20email%20profile&access_type=online&prompt=select_account`;
			window.location.href = oauthUrl;
		}
	}
</script>

<div class="min-h-[85dvh] flex items-center justify-center p-3 sm:p-6 w-full max-w-5xl mx-auto select-none">
	<div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
		<!-- Desktop Left Column / Mobile Top: PyBot Hero & Welcoming Artwork -->
		<div class="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5">
			<!-- PyBot Mascot with Speech Bubble -->
			<div class="relative flex items-center gap-3">
				<div class="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-slate-900 border border-indigo-500/30 p-2 shadow-xl shadow-indigo-500/10 flex items-center justify-center shrink-0">
					<img
						src="/mascot/pybot-waving.webp"
						alt="PyBot Mascot"
						width="128"
						height="128"
						decoding="async"
						class="w-full h-full object-contain animate-float drop-shadow"
					/>
				</div>
				<div class="bg-slate-900 border border-indigo-500/30 rounded-2xl p-3 sm:p-3.5 shadow-lg text-left max-w-xs relative">
					<div class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-0.5">PyBot Menyapa</div>
					<p class="text-xs sm:text-sm font-black text-white leading-snug">
						"Siap memulai petualangan kodingmu?"
					</p>
				</div>
			</div>

			<!-- Headline & Introduction -->
			<div class="space-y-2 max-w-lg">
				<h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
					Belajar Python <span class="text-cyan-400">Sambil Bermain</span>
				</h1>
				<p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
					Taklukkan labirin seru, susun balok logika kode, kumpulkan XP dan lencana prestasi dari misi pertama hingga mahir.
				</p>
			</div>

			<!-- Feature Highlights (Solid colors, no gradients) -->
			<div class="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg pt-1">
				<div class="p-2.5 sm:p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
					<Icon name="compass" size={18} class="text-cyan-400 mb-1" />
					<span class="text-[11px] sm:text-xs font-black text-white">30+ Misi</span>
					<span class="text-[9px] text-slate-400 uppercase font-bold">Labirin Kode</span>
				</div>
				<div class="p-2.5 sm:p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
					<Icon name="book-open" size={18} class="text-indigo-400 mb-1" />
					<span class="text-[11px] sm:text-xs font-black text-white">50 Soal</span>
					<span class="text-[9px] text-slate-400 uppercase font-bold">Kuis Interaktif</span>
				</div>
				<div class="p-2.5 sm:p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
					<Icon name="award" size={18} class="text-amber-400 mb-1" />
					<span class="text-[11px] sm:text-xs font-black text-white">10 Lencana</span>
					<span class="text-[9px] text-slate-400 uppercase font-bold">Prestasi Level</span>
				</div>
			</div>
		</div>

		<!-- Right Column: Login Card -->
		<div class="lg:col-span-5 w-full max-w-md mx-auto">
			<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
				<!-- Brand Logo & Header -->
				<div class="flex flex-col items-center mb-6">
					<div class="mb-3">
						<PyQuestLogo size="md" showSubtitle={false} />
					</div>
					<h2 class="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
						Selamat datang di PyQuest
					</h2>
					<p class="text-xs sm:text-sm text-slate-400">
						Belajar Python sambil bermain.
					</p>
				</div>

				<!-- Friendly Error Alert -->
				{#if errorMessage}
					<div class="mb-4 p-3 rounded-2xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 text-left animate-fade-in">
						<Icon name="alert-circle" size={16} class="shrink-0 text-rose-400" />
						<span class="leading-snug">{errorMessage}</span>
					</div>
				{/if}

				<!-- Real Google Sign-In Action Area (EXACTLY ONE BUTTON) -->
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
								disabled={isConnecting}
								class="w-full max-w-[300px] py-3 px-4 bg-white hover:bg-slate-100 disabled:opacity-75 text-slate-900 font-bold text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
								title="Lanjutkan dengan Google"
							>
								{#if isConnecting}
									<svg class="w-4 h-4 animate-spin text-slate-800" viewBox="0 0 24 24" fill="none">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
									</svg>
									<span>Menghubungkan ke Google...</span>
								{:else}
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
								{/if}
							</button>
						{/if}
					</div>

					<!-- Trust / Educational Note -->
					<p class="text-[11px] text-slate-400 leading-relaxed pt-1">
						Dengan masuk, progres belajarmu akan tersimpan.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
