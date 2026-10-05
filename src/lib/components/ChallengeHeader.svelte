<script lang="ts">
	let {
		title,
		objective,
		topic,
		hints,
		activeHintIndex,
		onShowHint
	}: {
		title: string;
		objective: string;
		topic: string;
		hints: string[];
		activeHintIndex: number;
		onShowHint: () => void;
	} = $props();
</script>

<div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg shrink-0">
	<div class="flex items-start sm:items-center gap-3">
		<div class="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl shrink-0">
			🎯
		</div>
		<div>
			<div class="flex items-center gap-2">
				<span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300">
					{topic}
				</span>
				<h2 class="text-base sm:text-lg font-black text-white">{title}</h2>
			</div>
			<p class="text-xs sm:text-sm text-slate-300 mt-0.5">{objective}</p>
		</div>
	</div>

	<!-- Hint Toggle -->
	{#if hints && hints.length > 0}
		<div class="flex items-center gap-2 shrink-0">
			{#if activeHintIndex === -1}
				<button
					type="button"
					onclick={onShowHint}
					class="text-xs px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
				>
					<span>💡 Petunjuk Misi</span>
				</button>
			{:else}
				<div class="px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-200 text-xs max-w-sm flex items-center gap-2">
					<span>💡 <strong>Tips:</strong> {hints[activeHintIndex % hints.length]}</span>
					{#if hints.length > 1}
						<button
							type="button"
							onclick={onShowHint}
							class="text-[10px] text-amber-400 underline font-bold ml-1 cursor-pointer"
						>
							Lainnya
						</button>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
