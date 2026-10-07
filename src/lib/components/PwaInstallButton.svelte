<script lang="ts">
	import { pwaStore } from '$lib/stores/pwaStore';
	import Icon from './Icon.svelte';

	let {
		compact = false
	}: {
		compact?: boolean;
	} = $props();

	function handleInstallClick() {
		if ($pwaStore.canInstall) {
			pwaStore.promptInstall();
		} else if ($pwaStore.isIOS) {
			pwaStore.toggleIOSGuide();
		}
	}
</script>

{#if $pwaStore.canInstall || $pwaStore.isIOS}
	<div class="relative inline-block">
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

		<!-- iOS Safari Add to Home Screen Modal / Popover -->
		{#if $pwaStore.showIOSInstallGuide}
			<div
				role="dialog"
				aria-modal="true"
				class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in"
			>
				<div class="w-full max-w-sm bg-slate-900 border border-indigo-500/40 rounded-3xl p-5 shadow-2xl relative text-left">
					<button
						type="button"
						onclick={() => pwaStore.toggleIOSGuide(false)}
						class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
						aria-label="Tutup"
					>
						<Icon name="x" size={16} />
					</button>

					<div class="flex items-center gap-2.5 mb-3">
						<div class="w-9 h-9 rounded-xl bg-indigo-500/20 text-cyan-400 flex items-center justify-center border border-indigo-500/30">
							<Icon name="download" size={18} />
						</div>
						<div>
							<h3 class="text-sm font-black text-white">Pasang di iPhone / iPad</h3>
							<p class="text-[11px] text-slate-400">Instal lewat peramban Safari</p>
						</div>
					</div>

					<ol class="space-y-2 text-xs text-slate-300 py-2 border-y border-slate-800">
						<li class="flex items-start gap-2">
							<span class="w-5 h-5 rounded-full bg-slate-800 font-bold flex items-center justify-center text-[10px] text-cyan-400 shrink-0">1</span>
							<span>Ketuk tombol <strong>Bagikan (Share)</strong> di bilah navigasi Safari bawah.</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="w-5 h-5 rounded-full bg-slate-800 font-bold flex items-center justify-center text-[10px] text-cyan-400 shrink-0">2</span>
							<span>Gulir dan pilih menu <strong>Tambahkan ke Layar Utama</strong> (Add to Home Screen).</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="w-5 h-5 rounded-full bg-slate-800 font-bold flex items-center justify-center text-[10px] text-cyan-400 shrink-0">3</span>
							<span>Ketuk <strong>Tambah</strong> di pojok kanan atas.</span>
						</li>
					</ol>

					<button
						type="button"
						onclick={() => pwaStore.toggleIOSGuide(false)}
						class="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
					>
						Mengerti
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}
