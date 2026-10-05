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

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
	<div class="w-full max-w-lg bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/20 text-center relative overflow-hidden">
		<!-- Trophy icon -->
		<div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-1 mb-4 shadow-xl shadow-amber-400/20">
			<div class="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-amber-400">
				<Icon name="trophy" size={44} />
			</div>
		</div>

		<!-- Title -->
		<h2 class="text-2xl sm:text-3xl font-black text-white mb-2">
			{isLevelCompleted ? 'Level Selesai!' : 'Misi Berhasil!'}
		</h2>
		<p class="text-sm text-slate-400 mb-6 leading-relaxed">
			{#if isLevelCompleted}
				Luar biasa! Seluruh misi pada level ini berhasil kamu selesaikan. Level berikutnya telah terbuka!
			{:else}
				{challenge.title} — PyBot berhasil mencapai Bintang Emas sesuai rancangan algoritma kodemu.
			{/if}
		</p>

		<!-- Rewards Summary Box -->
		<div class="grid grid-cols-2 gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 text-left">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl {xpEarned > 0 ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-400'} flex items-center justify-center">
					<Icon name="zap" size={20} />
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase font-bold">Reward XP</div>
					{#if xpEarned > 0}
						<div class="text-lg font-black text-amber-400">+{xpEarned} XP</div>
					{:else}
						<div class="text-sm font-black text-slate-300">
							+0 XP
							<span class="text-[10px] text-slate-500 font-normal block">(Replay Misi Selesai)</span>
						</div>
					{/if}
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
					<Icon name="repeat" size={18} />
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase font-bold">Percobaan</div>
					<div class="text-base font-black text-slate-200">{attemptsCount}x RUN</div>
				</div>
			</div>
		</div>

		<!-- Actions -->
		<div class="space-y-2.5">
			<button
				type="button"
				onclick={onNext}
				class="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 hover:from-emerald-600 hover:via-teal-600 hover:to-indigo-600 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-500/30 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
			>
				<span>{isLastChallengeInLevel ? 'Pilih Level Berikutnya' : 'Misi Berikutnya'}</span>
				<Icon name="chevron-right" size={18} class="text-slate-950" />
			</button>

			<div class="flex gap-2">
				{#if onReplay}
					<button
						type="button"
						onclick={onReplay}
						class="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
					>
						<Icon name="rotate-ccw" size={14} />
						<span>Ulangi Misi Ini</span>
					</button>
				{/if}
				{#if onBackToLevelSelect}
					<button
						type="button"
						onclick={onBackToLevelSelect}
						class="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
					>
						<Icon name="gamepad" size={14} />
						<span>Menu Level</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
