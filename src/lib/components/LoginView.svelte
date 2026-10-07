<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore, getGoogleClientId } from '$lib/stores/authStore';
	import PyQuestLogo from './PyQuestLogo.svelte';
	import Icon from './Icon.svelte';

	let {
		onSuccess
	}: {
		onSuccess: (needsProfileSetup: boolean) => void;
	} = $props();

	let googleButtonContainer = $state<HTMLDivElement | null>(null);
	let errorMessage = $state<string | null>(null);
	let isLoading = $state(false);

	function checkGisReady(): boolean {
		return typeof window !== 'undefined' && !!(window as any).google?.accounts?.id;
	}

	async function handleCredentialResponse(response: any) {
		if (!response || !response.credential) {
			errorMessage = 'Login dibatalkan.';
			return;
		}

		isLoading = true;
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
			isLoading = false;
		}
	}

	function initGoogleIdentity() {
		const clientId = getGoogleClientId();
		if (!clientId) return;

		if (checkGisReady()) {
			try {
				(window as any).google.accounts.id.initialize({
					client_id: clientId,
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
						width: 280,
						text: 'continue_with',
						logo_alignment: 'left'
					});
				}
			} catch (err) {
				console.error('GIS initialize error:', err);
			}
		}
	}

	onMount(() => {
		if (checkGisReady()) {
			initGoogleIdentity();
		} else {
			const interval = setInterval(() => {
				if (checkGisReady()) {
					clearInterval(interval);
					initGoogleIdentity();
				}
			}, 150);
			return () => clearInterval(interval);
		}
	});

	function handleTriggerGooglePrompt() {
		if (isLoading) return;
		errorMessage = null;

		const clientId = getGoogleClientId();
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
						console.log('Google Prompt dismissed or suppressed.');
					}
				});
			} catch (e) {
				console.error('Google prompt trigger error:', e);
				errorMessage = 'Login Google gagal. Coba lagi.';
			}
		} else {
			errorMessage = 'Layanan Google Identity sedang dimuat. Periksa koneksi internet lalu coba lagi.';
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
						src="/mascot/pybot-waving.png"
						alt="PyBot Mascot"
						class="w-full h-full object-contain animate-bounce drop-shadow"
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

				<!-- Real Google Sign-In Action Area -->
				<div class="space-y-3.5">
					<!-- Styled Google Sign-In Button with Official Google Branding -->
					<button
						type="button"
						onclick={handleTriggerGooglePrompt}
						disabled={isLoading}
						class="w-full py-3.5 px-4 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
						title="Masuk menggunakan akun Google"
					>
						<!-- Official Google 'G' Mark -->
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
						<span>{isLoading ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}</span>
					</button>

					<!-- GIS Embedded Official Button Container -->
					<div bind:this={googleButtonContainer} class="flex justify-center w-full min-h-[44px]"></div>

					<!-- Trust / Educational Note -->
					<p class="text-[11px] text-slate-400 leading-relaxed pt-1">
						Dengan masuk, progres belajarmu akan tersimpan.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
