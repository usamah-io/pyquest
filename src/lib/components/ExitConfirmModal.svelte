<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		isOpen = false,
		onCancel,
		onConfirm
	}: {
		isOpen: boolean;
		onCancel: () => void;
		onConfirm: () => void;
	} = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			onCancel();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none animate-fade-in"
		role="dialog"
		aria-modal="true"
		aria-labelledby="exit-modal-title"
		tabindex="-1"
	>
		<!-- Backdrop click to dismiss -->
		<button
			type="button"
			class="fixed inset-0 w-full h-full cursor-default bg-transparent -z-10"
			onclick={onCancel}
			aria-label="Batal dan tutup modal"
			tabindex="-1"
		></button>
		<div
			class="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl flex flex-col items-center text-center relative animate-scale-up"
		>
			<!-- Warning / Exit Badge -->
			<div class="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400 shadow-inner">
				<Icon name="help-circle" size={28} />
			</div>

			<h3 id="exit-modal-title" class="text-xl font-black text-white tracking-tight mb-2">
				Yakin mau keluar?
			</h3>

			<p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
				Progres belajarmu tersimpan. Kamu yakin ingin keluar dari PyQuest?
			</p>

			<div class="grid grid-cols-2 gap-3 w-full">
				<button
					type="button"
					onclick={onCancel}
					class="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer"
				>
					Batal
				</button>
				<button
					type="button"
					onclick={onConfirm}
					class="w-full py-2.5 px-4 rounded-xl border border-rose-500/50 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-950/40 transition-all active:scale-95 cursor-pointer"
				>
					Keluar
				</button>
			</div>
		</div>
	</div>
{/if}
