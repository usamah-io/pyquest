<script lang="ts">
	import { pwaStore } from '$lib/stores/pwaStore';
	import { playClick } from '$lib/stores/soundStore';
	import Icon from './Icon.svelte';

	function handleClose() {
		playClick();
		pwaStore.toggleInstallGuide(false);
	}
</script>

{#if $pwaStore.showInstallGuide}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
	>
		<div class="w-full max-w-sm sm:max-w-md bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl relative text-left">
			<!-- Close Button -->
			<button
				type="button"
				onclick={handleClose}
				class="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
				aria-label="Tutup Panduan"
			>
				<Icon name="x" size={18} />
			</button>

			<!-- Header -->
			<div class="flex items-center gap-3 mb-4">
				<div class="w-11 h-11 rounded-2xl bg-indigo-500/20 text-cyan-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
					<Icon name="download" size={22} />
				</div>
				<div>
					<h3 class="text-base sm:text-lg font-black text-white">
						Pasang Aplikasi PyQuest
					</h3>
					<p class="text-xs text-indigo-300 font-medium">
						{#if $pwaStore.isIOS}
							Panduan untuk iPhone / iPad
						{:else if $pwaStore.isAndroid}
							Panduan untuk HP Android
						{:else}
							Panduan untuk Browser
						{/if}
					</p>
				</div>
			</div>

			<!-- Device-Specific Steps -->
			<div class="space-y-3 py-3 border-y border-slate-800 text-xs text-slate-300">
				{#if $pwaStore.isIOS}
					<!-- iOS Safari Steps -->
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">1</span>
						<p class="leading-relaxed">
							Buka PyQuest di peramban <strong>Safari</strong>, lalu ketuk tombol <strong>Bagikan (Share)</strong> di bilah bawah.
						</p>
					</div>
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">2</span>
						<p class="leading-relaxed">
							Gulir ke bawah dan pilih menu <strong>Tambahkan ke Layar Utama</strong> (Add to Home Screen).
						</p>
					</div>
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">3</span>
						<p class="leading-relaxed">
							Ketuk <strong>Tambah</strong> di pojok kanan atas untuk menyelesaikan.
						</p>
					</div>
				{:else if $pwaStore.isAndroid}
					<!-- Android Steps -->
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">1</span>
						<p class="leading-relaxed">
							Ketuk tombol <strong>menu titik tiga (⋮)</strong> di pojok kanan atas layar browser kamu.
						</p>
					</div>
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">2</span>
						<p class="leading-relaxed">
							Pilih opsi <strong>"Instal aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
						</p>
					</div>
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">3</span>
						<p class="leading-relaxed">
							Ketuk <strong>"Instal"</strong>. Ikon PyQuest akan muncul otomatis di layar HP kamu!
						</p>
					</div>
				{:else}
					<!-- Desktop / Other Browser Steps -->
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">1</span>
						<p class="leading-relaxed">
							Klik ikon <strong>Instal (⊕ atau ⬇)</strong> di sisi kanan bilah alamat (address bar) browser.
						</p>
					</div>
					<div class="flex items-start gap-2.5">
						<span class="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">2</span>
						<p class="leading-relaxed">
							Atau buka menu browser (⋮) lalu pilih <strong>"Instal PyQuest..."</strong>.
						</p>
					</div>
				{/if}
			</div>

			<!-- Notice -->
			<div class="mt-3.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
				<Icon name="sparkles" size={14} class="text-amber-400 shrink-0" />
				<span>Setelah dipasang, PyQuest dapat dibuka layar penuh tanpa bilah URL browser!</span>
			</div>

			<!-- Close Action -->
			<button
				type="button"
				onclick={handleClose}
				class="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md active:scale-98"
			>
				Mengerti
			</button>
		</div>
	</div>
{/if}
