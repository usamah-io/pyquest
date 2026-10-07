<script lang="ts">
	import Icon from './Icon.svelte';

	let dismissed = $state(false);

	$effect(() => {
		const timer = setTimeout(() => {
			dismissed = true;
		}, 4500);
		return () => clearTimeout(timer);
	});
</script>

{#if !dismissed}
	<aside
		aria-label="Saran Orientasi Layar"
		class="w-full max-w-7xl mx-auto mb-1.5 md:hidden portrait:flex landscape:hidden items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-slate-200 shadow-md animate-fade-in text-xs select-none shrink-0"
	>
		<div class="flex items-center gap-2 min-w-0">
			<div class="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
				<Icon name="device-mobile-rotated" size={13} class="text-indigo-400" />
			</div>
			<span class="truncate text-[11px] font-medium text-slate-300">
				Tips: Mode landscape memberi ruang lebih leluasa.
			</span>
		</div>
		<button
			type="button"
			onclick={() => (dismissed = true)}
			class="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
			title="Tutup tips"
			aria-label="Tutup tips orientasi"
		>
			<Icon name="x" size={13} />
		</button>
	</aside>
{/if}
