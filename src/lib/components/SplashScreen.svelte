<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { authStore, isReturningUser } from '$lib/stores/authStore';

	let {
		onFinish
	}: {
		onFinish?: () => void;
	} = $props();

	let textVisible = $state(false);
	let mascotVisible = $state(false);
	let isFadingOut = $state(false);
	let isReturning = $state(false);

	let timers: any[] = [];

	onMount(() => {
		// Session check: Never replay splash on normal internal navigation or page reloads in same session
		if (typeof window !== 'undefined') {
			try {
				if (sessionStorage.getItem('pyquest_splash_shown')) {
					onFinish?.();
					return;
				}
			} catch {}
		}

		// Detect if user has a returning authenticated session
		isReturning = isReturningUser() || $authStore.isAuthenticated;

		const prefersReducedMotion =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		function completeSplash() {
			try {
				sessionStorage.setItem('pyquest_splash_shown', 'true');
			} catch {}
			onFinish?.();
		}

		if (prefersReducedMotion) {
			textVisible = true;
			if (!isReturning) mascotVisible = true;
			const t1 = setTimeout(() => {
				isFadingOut = true;
				const t2 = setTimeout(() => {
					completeSplash();
				}, 100);
				timers.push(t2);
			}, isReturning ? 200 : 350);
			timers.push(t1);
			return;
		}

		if (isReturning) {
			// RETURNING AUTHENTICATED USER:
			// Fast, lightweight welcome (~0.5s) without mascot replay, directly to Beranda
			const t1 = setTimeout(() => {
				textVisible = true;
			}, 40);
			timers.push(t1);

			const t2 = setTimeout(() => {
				isFadingOut = true;
			}, 360);
			timers.push(t2);

			const t3 = setTimeout(() => {
				completeSplash();
			}, 500);
			timers.push(t3);
		} else {
			// NEW OR UNAUTHENTICATED USER:
			// Short 0.5–1s welcome animation displaying the original PyBot mascot
			const t1 = setTimeout(() => {
				textVisible = true;
			}, 50);
			timers.push(t1);

			const t2 = setTimeout(() => {
				mascotVisible = true;
			}, 240);
			timers.push(t2);

			const t3 = setTimeout(() => {
				isFadingOut = true;
			}, 680);
			timers.push(t3);

			const t4 = setTimeout(() => {
				completeSplash();
			}, 880);
			timers.push(t4);
		}
	});

	onDestroy(() => {
		timers.forEach((t) => clearTimeout(t));
	});
</script>

<div
	class="fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center p-6 select-none transition-opacity duration-200 ease-out {isFadingOut
		? 'opacity-0 pointer-events-none'
		: 'opacity-100'}"
	role="status"
	aria-live="polite"
	aria-label="Memuat PyQuest"
>
	<div class="flex flex-col items-center text-center max-w-sm mx-auto">
		<!-- 1. Welcome text -->
		<div
			class="flex flex-col items-center transition-all duration-300 ease-out {textVisible
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-2'}"
		>
			<h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
				{isReturning ? 'Selamat datang kembali di PyQuest' : 'Selamat datang di PyQuest'}
			</h1>
			<p class="text-xs sm:text-sm font-semibold text-slate-300 mt-2 tracking-wide">
				{isReturning ? 'Melanjutkan petualangan logika Python' : 'Belajar Python Sambil Bermain'}
			</p>
		</div>

		<!-- 2. Original PyBot robot mascot (displayed for new/unauthenticated users only) -->
		{#if !isReturning}
			<div
				class="mt-6 sm:mt-8 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center transition-all duration-400 ease-out {mascotVisible
					? 'opacity-100 scale-100'
					: 'opacity-0 scale-95'}"
			>
				<img
					src="/mascot/pybot-front-idle.webp"
					alt="Maskot Robot PyQuest"
					width="144"
					height="144"
					class="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(34,211,238,0.25)]"
				/>
			</div>
		{/if}
	</div>
</div>
