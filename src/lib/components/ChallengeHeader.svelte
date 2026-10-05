<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		title,
		objective,
		topic,
		hints = [],
		onBackToModes
	}: {
		title: string;
		objective: string;
		topic: string;
		hints: string[];
		onBackToModes?: () => void;
	} = $props();

	// Quota is strictly limited to 2 tips per challenge
	const MAX_TIPS_QUOTA = 2;
	let currentHintIndex = $state(-1);
	let tipsViewedCount = $state(0);
	let showExhaustedNotice = $state(false);

	// Reset when title / challenge changes
	$effect(() => {
		// track title dependency
		title;
		currentHintIndex = -1;
		tipsViewedCount = 0;
		showExhaustedNotice = false;
	});

	let maxAvailableTips = $derived(Math.min(hints.length, MAX_TIPS_QUOTA));
	let remainingQuota = $derived(Math.max(0, maxAvailableTips - tipsViewedCount));

	function handleRequestNextHint() {
		if (tipsViewedCount >= maxAvailableTips) {
			showExhaustedNotice = true;
			return;
		}

		currentHintIndex = tipsViewedCount;
		tipsViewedCount++;
		showExhaustedNotice = false;
	}
</script>

<div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg shrink-0">
	<!-- Left: Back Button & Objective Info -->
	<div class="flex items-start sm:items-center gap-3">
		{#if onBackToModes}
			<button
				type="button"
				onclick={onBackToModes}
				class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
				title="Pilih Misi / Level Lain"
				aria-label="Pilih Misi / Level Lain"
			>
				<Icon name="chevron-left" size={18} />
			</button>
		{/if}

		<div>
			<div class="flex items-center gap-2 flex-wrap">
				<span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
					{topic}
				</span>
				<h2 class="text-base sm:text-lg font-black text-white">{title}</h2>
			</div>
			<p class="text-xs sm:text-sm text-slate-300 mt-0.5">{objective}</p>
		</div>
	</div>

	<!-- Right: Hints Quota System (Focus Mode is now automatic) -->
	<div class="flex items-center gap-2.5 shrink-0">
		{#if hints && hints.length > 0}
			{#if currentHintIndex === -1}
				<!-- Initial Hint Trigger -->
				<button
					type="button"
					onclick={handleRequestNextHint}
					class="text-xs px-3.5 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold flex items-center gap-2 transition-colors cursor-pointer"
					title="Buka petunjuk logika misi"
				>
					<Icon name="lightbulb" size={15} class="text-amber-400" />
					<span>Petunjuk Misi</span>
					<span class="text-[10px] bg-amber-400/20 text-amber-200 px-1.5 py-0.5 rounded-full font-mono">
						{remainingQuota} tersisa
					</span>
				</button>
			{:else}
				<!-- Active Hint Card with Quota Controls -->
				<div class="px-3.5 py-2 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-200 text-xs max-w-md flex items-center gap-2.5 shadow-md">
					<Icon name="lightbulb" size={16} class="text-amber-400 shrink-0" />
					<div class="flex-1 leading-snug">
						<span class="font-bold text-amber-300">Tips #{currentHintIndex + 1}:</span>
						<span class="text-slate-100 ml-1">{hints[currentHintIndex]}</span>
					</div>

					{#if remainingQuota > 0}
						<button
							type="button"
							onclick={handleRequestNextHint}
							class="text-[11px] bg-amber-400/25 hover:bg-amber-400/35 text-amber-100 px-2.5 py-1 rounded-lg border border-amber-400/40 font-bold transition-colors cursor-pointer shrink-0"
						>
							Tips Lain ({remainingQuota})
						</button>
					{:else}
						<div class="text-[10px] text-amber-300/80 italic font-medium px-1.5 py-0.5 bg-amber-400/10 rounded-md shrink-0">
							Kuota habis
						</div>
					{/if}
				</div>
			{/if}
		{/if}

		{#if showExhaustedNotice}
			<div class="px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs flex items-center gap-1.5 animate-fade-in">
				<Icon name="alert-circle" size={13} class="text-slate-400" />
				<span>Tidak ada tips tersisa untuk misi ini.</span>
			</div>
		{/if}
	</div>
</div>
