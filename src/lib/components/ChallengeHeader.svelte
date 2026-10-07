<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		title,
		objective,
		topic,
		hints = [],
		playerXp = 0,
		rewardXp = 0,
		onBackToModes
	}: {
		title: string;
		objective: string;
		topic: string;
		hints: string[];
		playerXp?: number;
		rewardXp?: number;
		onBackToModes?: () => void;
	} = $props();

	// Quota is strictly limited to 2 tips per challenge
	const MAX_TIPS_QUOTA = 2;
	let currentHintIndex = $state(0);
	let tipsViewedCount = $state(0);
	let isHintModalOpen = $state(false);

	// Reset when title / challenge changes
	$effect(() => {
		// track title dependency
		title;
		currentHintIndex = 0;
		tipsViewedCount = 0;
		isHintModalOpen = false;
	});

	let maxAvailableTips = $derived(Math.min(hints.length, MAX_TIPS_QUOTA));
	let remainingQuota = $derived(Math.max(0, maxAvailableTips - tipsViewedCount));

	function handleOpenHintModal() {
		if (tipsViewedCount === 0 && maxAvailableTips > 0) {
			tipsViewedCount = 1;
			currentHintIndex = 0;
		}
		isHintModalOpen = true;
	}

	function handleRequestNextHint() {
		if (tipsViewedCount < maxAvailableTips) {
			tipsViewedCount++;
			currentHintIndex = tipsViewedCount - 1;
		}
	}
</script>

<div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 sm:p-3 landscape:p-1.5 landscape:py-1 mb-2 sm:mb-3 landscape:mb-1.5 flex items-center justify-between gap-2.5 shadow-lg shrink-0 select-none">
	<!-- Left: Back Button & Objective Info -->
	<div class="flex items-center gap-2 sm:gap-3 min-w-0">
		{#if onBackToModes}
			<button
				type="button"
				onclick={onBackToModes}
				class="w-8 h-8 sm:w-9 sm:h-9 landscape:w-7 landscape:h-7 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
				title="Pilih Misi / Level Lain"
				aria-label="Pilih Misi / Level Lain"
			>
				<Icon name="chevron-left" size={16} />
			</button>
		{/if}

		<div class="min-w-0">
			<div class="flex items-center gap-2 flex-wrap">
				<span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 shrink-0">
					{topic}
				</span>
				<h2 class="text-xs sm:text-base landscape:text-xs font-black text-white truncate">{title}</h2>
			</div>
			<p class="text-[11px] sm:text-xs landscape:text-[10px] text-slate-300 mt-0.5 truncate max-w-xl">{objective}</p>
		</div>
	</div>

	<!-- Right: Mission Reward, Live Player XP & Hint Button -->
	<div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
		{#if rewardXp > 0}
			<div
				class="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold select-none"
				title="Hadiah jika misi ini berhasil diselesaikan"
			>
				<Icon name="zap" size={13} class="text-indigo-400 shrink-0" />
				<span>+{rewardXp} XP</span>
			</div>
		{/if}

		<!-- Live Player XP Badge -->
		<div
			class="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-black text-xs shadow-sm select-none"
			title="Total XP Kamu Saat Ini"
		>
			<Icon name="zap" size={13} class="text-amber-400 fill-current shrink-0" />
			<span>{playerXp} XP</span>
		</div>

		{#if hints && hints.length > 0}
			<button
				type="button"
				onclick={handleOpenHintModal}
				class="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
				title="Lihat Petunjuk PyBot"
			>
				<Icon name="lightbulb" size={13} class="text-amber-400" />
				<span class="hidden sm:inline">Tips</span>
				<span class="text-[10px] bg-amber-400/20 text-amber-200 px-1 py-0.2 rounded-full font-mono">
					{remainingQuota}
				</span>
			</button>
		{/if}
	</div>
</div>

<!-- Compact Hint Modal / Popover -->
{#if isHintModalOpen}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
	>
		<div class="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
			<!-- Header -->
			<div class="flex items-center justify-between pb-3 border-b border-slate-800">
				<div class="flex items-center gap-2.5">
					<div class="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
						<Icon name="lightbulb" size={18} />
					</div>
					<div>
						<h3 class="text-sm font-black text-white">Petunjuk Misi PyBot</h3>
						<span class="text-[10px] text-amber-400 font-mono">
							Tips #{currentHintIndex + 1} dari {maxAvailableTips}
						</span>
					</div>
				</div>

				<button
					type="button"
					onclick={() => (isHintModalOpen = false)}
					class="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
					aria-label="Tutup"
				>
					<Icon name="x" size={16} />
				</button>
			</div>

			<!-- Hint Content -->
			<div class="py-4 space-y-3">
				<div class="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-amber-100 text-xs sm:text-sm leading-relaxed">
					{hints[currentHintIndex] || 'Perhatikan pola jalan dan posisi target bintang!'}
				</div>

				{#if tipsViewedCount > 1}
					<div class="flex items-center justify-center gap-1.5 pt-1">
						{#each Array(tipsViewedCount) as _, idx}
							<button
								type="button"
								onclick={() => (currentHintIndex = idx)}
								class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer {currentHintIndex === idx
									? 'bg-amber-400 text-slate-950 shadow'
									: 'bg-slate-800 text-slate-400 hover:text-white'}"
							>
								Tips #{idx + 1}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Footer Controls -->
			<div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
				{#if remainingQuota > 0}
					<button
						type="button"
						onclick={handleRequestNextHint}
						class="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
					>
						<Icon name="help-circle" size={14} />
						<span>Buka Tips Selanjutnya ({remainingQuota} tersisa)</span>
					</button>
				{:else}
					<span class="text-[11px] text-slate-500 italic">Semua tips untuk misi ini telah terbuka.</span>
				{/if}

				<button
					type="button"
					onclick={() => (isHintModalOpen = false)}
					class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
				>
					Mengerti
				</button>
			</div>
		</div>
	</div>
{/if}
