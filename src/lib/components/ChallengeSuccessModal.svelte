<script lang="ts">
	import type { Challenge } from '$lib/types';
	import Icon from './Icon.svelte';

	let {
		challenge,
		xpEarned,
		attemptsCount = 1,
		isLevelCompleted = false,
		isLastChallengeInLevel = false,
		onNext,
		onReplay,
		onBackToLevelSelect
	}: {
		challenge: Challenge;
		xpEarned: number;
		attemptsCount?: number;
		isLevelCompleted?: boolean;
		isLastChallengeInLevel?: boolean;
		onNext: () => void;
		onReplay?: () => void;
		onBackToLevelSelect?: () => void;
	} = $props();
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
	<div class="w-full max-w-md max-h-[92dvh] overflow-y-auto bg-slate-900 border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 landscape:p-4 shadow-2xl shadow-emerald-500/20 text-center relative">
		<!-- Trophy icon -->
		<div class="w-12 h-12 sm:w-16 sm:h-16 landscape:w-11 landscape:h-11 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 sm:p-1 mb-2.5 sm:mb-3 shadow-lg shadow-amber-400/20 shrink-0">
			<div class="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-400">
				<Icon name="trophy" size={26} class="sm:hidden" />
				<Icon name="trophy" size={32} class="hidden sm:inline" />
			</div>
		</div>

		<!-- Title -->
		<h2 class="text-lg sm:text-2xl landscape:text-lg font-black text-white mb-1">
			{isLevelCompleted ? 'Level Selesai!' : 'Misi Berhasil!'}
		</h2>
		<p class="text-xs sm:text-sm text-slate-400 mb-3 landscape:mb-2.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
			{#if isLevelCompleted}
				Luar biasa! Seluruh misi pada level ini berhasil kamu selesaikan. Level berikutnya telah terbuka!
			{:else}
				{challenge.title} — PyBot berhasil mencapai Bintang Emas sesuai rancangan kodemu.
			{/if}
		</p>

		<!-- Rewards Summary Box -->
		<div class="grid grid-cols-2 gap-2 sm:gap-3 bg-slate-950/80 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 mb-3.5 sm:mb-5 landscape:mb-2.5 text-left">
			<div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
				<div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl {xpEarned > 0 ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-400'} flex items-center justify-center shrink-0">
					<Icon name="zap" size={17} />
				</div>
				<div class="min-w-0">
					<div class="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold truncate">Reward XP</div>
					{#if xpEarned > 0}
						<div class="text-base sm:text-lg font-black text-amber-400 truncate">+{xpEarned} XP</div>
					{:else}
						<div class="text-xs sm:text-sm font-black text-slate-300 truncate">
							+0 XP
						</div>
					{/if}
				</div>
			</div>
			<div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
				<div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
					<Icon name="repeat" size={16} />
				</div>
				<div class="min-w-0">
					<div class="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold truncate">Percobaan</div>
					<div class="text-xs sm:text-base font-black text-slate-200 truncate">{attemptsCount}x RUN</div>
				</div>
			</div>
		</div>

		<!-- Actions -->
		<div class="space-y-2">
			<button
				type="button"
				onclick={onNext}
				class="w-full py-2.5 sm:py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 hover:from-emerald-600 hover:via-teal-600 hover:to-indigo-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
			>
				<span>{isLastChallengeInLevel ? 'Pilih Level Berikutnya' : 'Misi Berikutnya'}</span>
				<Icon name="chevron-right" size={16} class="text-slate-950" />
			</button>

			<div class="flex gap-2">
				{#if onReplay}
					<button
						type="button"
						onclick={onReplay}
						class="flex-1 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
					>
						<Icon name="rotate-ccw" size={13} />
						<span>Ulangi Misi</span>
					</button>
				{/if}
				{#if onBackToLevelSelect}
					<button
						type="button"
						onclick={onBackToLevelSelect}
						class="flex-1 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
					>
						<Icon name="gamepad" size={13} />
						<span>Menu Level</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
