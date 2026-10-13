<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let {
		onFinish
	}: {
		onFinish?: () => void;
	} = $props();

	let textVisible = $state(false);
	let mascotVisible = $state(false);
	let isFadingOut = $state(false);

	let timers: any[] = [];

	onMount(() => {
		// Respect reduced-motion preference
		const prefersReducedMotion =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			textVisible = true;
			mascotVisible = true;
			const t1 = setTimeout(() => {
				isFadingOut = true;
				const t2 = setTimeout(() => {
					onFinish?.();
				}, 150);
				timers.push(t2);
			}, 500);
			timers.push(t1);
			return;
		}

		// Stage 1: Welcome text fades in smoothly first
		const t1 = setTimeout(() => {
			textVisible = true;
		}, 60);
		timers.push(t1);

		// Stage 2: Reveal the PyQuest robot mascot
		const t2 = setTimeout(() => {
			mascotVisible = true;
		}, 380);
		timers.push(t2);

		// Stage 3: Begin smooth fade-out to application
		const t3 = setTimeout(() => {
			isFadingOut = true;
		}, 1050);
		timers.push(t3);

		// Stage 4: Finish and unmount (total 1350ms, well within 1.5s requirement)
		const t4 = setTimeout(() => {
			onFinish?.();
		}, 1350);
		timers.push(t4);
	});

	onDestroy(() => {
		timers.forEach((t) => clearTimeout(t));
	});
</script>

<div
	class="fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center p-6 select-none transition-opacity duration-300 ease-out {isFadingOut
		? 'opacity-0 pointer-events-none'
		: 'opacity-100'}"
	role="status"
	aria-live="polite"
	aria-label="Memuat PyQuest"
>
	<div class="flex flex-col items-center text-center max-w-sm mx-auto">
		<!-- 1. Welcome text (revealed first) -->
		<div
			class="flex flex-col items-center transition-all duration-400 ease-out {textVisible
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-2'}"
		>
			<h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
				Selamat datang di PyQuest
			</h1>
			<p class="text-xs sm:text-sm font-semibold text-slate-300 mt-2 tracking-wide">
				Belajar Python Sambil Bermain
			</p>
		</div>

		<!-- 2. PyQuest robot mascot (revealed second) -->
		<div
			class="mt-6 sm:mt-8 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center transition-all duration-500 ease-out {mascotVisible
				? 'opacity-100 scale-100'
				: 'opacity-0 scale-90'}"
		>
			<img
				src="/mascot/pybot-front-idle.webp"
				alt="Maskot Robot PyQuest"
				width="160"
				height="160"
				class="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(34,211,238,0.25)]"
			/>
		</div>
	</div>
</div>
