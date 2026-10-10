<script lang="ts">
	import { pwaStore } from '$lib/stores/pwaStore';
	import { playClick } from '$lib/stores/soundStore';
	import Icon from './Icon.svelte';

	let {
		compact = false
	}: {
		compact?: boolean;
	} = $props();

	function handleInstallClick() {
		playClick();
		pwaStore.promptInstall();
	}
</script>

{#if !$pwaStore.isInstalled}
	<div class="relative inline-block w-full">
		{#if compact}
			<button
				type="button"
				onclick={handleInstallClick}
				class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
				title="Pasang aplikasi PyQuest di perangkatmu"
			>
				<Icon name="download" size={14} class="text-cyan-400" />
				<span class="hidden sm:inline">Pasang App</span>
			</button>
		{:else}
			<button
				type="button"
				onclick={handleInstallClick}
				class="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/30 hover:border-indigo-400 text-slate-200 hover:text-white font-bold text-xs transition-all cursor-pointer shadow-md group active:scale-98"
			>
				<div class="flex items-center gap-2.5">
					<div class="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-cyan-400 flex items-center justify-center">
						<Icon name="download" size={15} />
					</div>
					<div class="text-left">
						<div class="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
							Pasang PyQuest
						</div>
						<div class="text-[10px] text-slate-400">
							Akses cepat tanpa browser
						</div>
					</div>
				</div>
				<Icon name="chevron-right" size={14} class="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
			</button>
		{/if}
	</div>
{/if}
