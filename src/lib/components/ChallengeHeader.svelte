<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		title,
		objective,
		topic,
		hints,
		activeHintIndex,
		isFocusMode = false,
		onToggleFocusMode,
		onShowHint,
		onBackToModes
	}: {
		title: string;
		objective: string;
		topic: string;
		hints: string[];
		activeHintIndex: number;
		isFocusMode?: boolean;
		onToggleFocusMode?: () => void;
		onShowHint: () => void;
		onBackToModes?: () => void;
	} = $props();
</script>

<div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg shrink-0">
	<!-- Left: Back Button & Objective Info -->
	<div class="flex items-start sm:items-center gap-3">
		{#if onBackToModes}
			<button
				type="button"
				onclick={onBackToModes}
				class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
				title="Pilih Mode Lain"
				aria-label="Pilih Mode Lain"
			>
				<Icon name="chevron-left" size={18} />
			</button>
		{/if}

		<div>
			<div class="flex items-center gap-2">
				<span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
					{topic}
				</span>
				<h2 class="text-base sm:text-lg font-black text-white">{title}</h2>
			</div>
			<p class="text-xs sm:text-sm text-slate-300 mt-0.5">{objective}</p>
		</div>
	</div>

	<!-- Right: Focus Mode Toggle & Hints -->
	<div class="flex items-center gap-2.5 shrink-0">
		<!-- Focus Mode Toggle Button -->
		{#if onToggleFocusMode}
			<button
				type="button"
				onclick={onToggleFocusMode}
				class="text-xs px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-colors cursor-pointer {isFocusMode
					? 'bg-purple-600/30 border-purple-400 text-purple-200'
					: 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'}"
				title="Mode Fokus Anti-Distraksi"
			>
				<Icon name={isFocusMode ? 'minimize' : 'maximize'} size={14} />
				<span>{isFocusMode ? 'Keluar Fokus' : 'Mode Fokus'}</span>
			</button>
		{/if}

		<!-- Hints Button -->
		{#if hints && hints.length > 0}
			{#if activeHintIndex === -1}
				<button
					type="button"
					onclick={onShowHint}
					class="text-xs px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
				>
					<Icon name="lightbulb" size={14} class="text-amber-400" />
					<span>Petunjuk Misi</span>
				</button>
			{:else}
				<div class="px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-200 text-xs max-w-sm flex items-center gap-2">
					<Icon name="lightbulb" size={14} class="text-amber-400 shrink-0" />
					<span><strong>Tips:</strong> {hints[activeHintIndex % hints.length]}</span>
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
		{/if}
	</div>
</div>
