<script lang="ts">
	import Icon from './Icon.svelte';
	import { playClick } from '$lib/stores/soundStore';

	export const TUTORIAL_VIDEO_CONFIG = {
		id: 'rTYO5_IfQDw',
		embedUrl: 'https://www.youtube.com/embed/rTYO5_IfQDw',
		shortUrl: 'https://www.youtube.com/shorts/rTYO5_IfQDw',
		title: 'Tutorial Coding Game PyQuest'
	};

	let {
		isOpen = false,
		onClose
	}: {
		isOpen: boolean;
		onClose: () => void;
	} = $props();

	function handleClose() {
		playClick();
		onClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
		role="dialog"
		aria-modal="true"
		aria-labelledby="tutorial-modal-title"
	>
		<!-- Backdrop click to close -->
		<button
			type="button"
			class="fixed inset-0 w-full h-full cursor-default bg-transparent -z-10"
			onclick={handleClose}
			tabindex="-1"
			aria-label="Tutup tutorial"
		></button>

		<!-- Modal Container -->
		<div class="w-full max-w-2xl max-h-[92dvh] overflow-y-auto bg-slate-900 border-2 border-indigo-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-indigo-950/50 flex flex-col relative text-slate-200">
			<!-- Header -->
			<div class="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
				<div class="flex items-center gap-2.5 min-w-0">
					<div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0">
						<Icon name="gamepad" size={20} />
					</div>
					<div class="min-w-0">
						<h2 id="tutorial-modal-title" class="text-base sm:text-lg font-black text-white truncate">
							Tutorial Coding Game PyQuest
						</h2>
						<p class="text-xs text-slate-400 truncate">
							Pelajari cara menyusun blok kode dan menggerakkan PyBot
						</p>
					</div>
				</div>

				<button
					type="button"
					onclick={handleClose}
					class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
					aria-label="Tutup jendela tutorial"
				>
					<Icon name="x" size={18} />
				</button>
			</div>

			<!-- Embedded Video Player Section -->
			<div class="w-full mb-4">
				<div class="relative w-full max-w-md mx-auto aspect-[9/16] sm:aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
					<iframe
						src={TUTORIAL_VIDEO_CONFIG.embedUrl}
						title={TUTORIAL_VIDEO_CONFIG.title}
						class="w-full h-full border-0"
						allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						loading="lazy"
					></iframe>
				</div>

				<!-- Fallback External Link -->
				<div class="flex items-center justify-center gap-2 mt-2.5 text-xs text-slate-400">
					<span>Mengalami kendala pemutaran?</span>
					<a
						href={TUTORIAL_VIDEO_CONFIG.shortUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-indigo-400 hover:text-indigo-300 underline font-semibold flex items-center gap-1"
					>
						<span>Buka di YouTube</span>
						<Icon name="chevron-right" size={13} />
					</a>
				</div>
			</div>

			<!-- Pedagogical Quick Guide (Teaching Goals) -->
			<div class="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 mb-4 text-xs space-y-2.5">
				<h3 class="font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
					<Icon name="sparkles" size={14} class="text-indigo-400 shrink-0" />
					<span>Panduan Cepat Bermain PyQuest</span>
				</h3>
				<ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
					<li class="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
						<span class="w-5 h-5 rounded-md bg-indigo-900/60 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
						<span><strong>Pilih Misi:</strong> Setiap level menyediakan 3 misi tantangan bergradasi.</span>
					</li>
					<li class="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
						<span class="w-5 h-5 rounded-md bg-indigo-900/60 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
						<span><strong>Susun Balok:</strong> Tarik blok <code>MAJU</code>, <code>BELOK KIRI</code>, atau <code>BELOK KANAN</code> ke workspace.</span>
					</li>
					<li class="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
						<span class="w-5 h-5 rounded-md bg-indigo-900/60 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
						<span><strong>Gunakan Loop:</strong> Manfaatkan blok <code>ULANGI</code> agar kodemu lebih ringkas dan efisien.</span>
					</li>
					<li class="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
						<span class="w-5 h-5 rounded-md bg-indigo-900/60 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
						<span><strong>Jalankan & Evaluasi:</strong> Klik <strong>JALANKAN KODE</strong> untuk menguji rute PyBot menuju bintang emas.</span>
					</li>
					<li class="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/50 sm:col-span-2">
						<span class="w-5 h-5 rounded-md bg-amber-900/60 text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">★</span>
						<span><strong>Raih Hadiah XP:</strong> Kemenangan memberikan XP dan otomatis tersimpan ke akunmu!</span>
					</li>
				</ul>
			</div>

			<!-- Footer Action -->
			<div class="flex items-center justify-end gap-3 pt-2">
				<button
					type="button"
					onclick={handleClose}
					class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<Icon name="check" size={16} />
					<span>Saya Mengerti, Mulai Bermain!</span>
				</button>
			</div>
		</div>
	</div>
{/if}
