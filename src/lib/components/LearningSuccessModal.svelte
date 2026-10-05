<script lang="ts">
	import type { LearningLevel } from '$lib/types';
	import Icon from './Icon.svelte';

	let {
		level,
		xpEarned,
		isLastLevel = false,
		onNextLevel,
		onReplayLevel,
		onBackToSelect
	}: {
		level: LearningLevel;
		xpEarned: number;
		isLastLevel?: boolean;
		onNextLevel: () => void;
		onReplayLevel?: () => void;
		onBackToSelect?: () => void;
	} = $props();
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
	<div class="w-full max-w-lg bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/20 text-center relative overflow-hidden">
		<!-- Trophy icon -->
		<div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 mb-4 shadow-xl shadow-indigo-500/20">
			<div class="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-indigo-400">
				<Icon name="trophy" size={44} />
			</div>
		</div>

		<!-- Title -->
		<h2 class="text-2xl sm:text-3xl font-black text-white mb-2">
			Level {level.id} Selesai!
		</h2>
		<p class="text-sm text-slate-300 mb-6 leading-relaxed">
			Selamat! Kamu berhasil menuntaskan seluruh 5 soal pada <strong class="text-white">{level.title}</strong>.
			{#if !isLastLevel}
				Level berikutnya telah terbuka!
			{:else}
				Kamu telah menyelesaikan seluruh 10 Level Modul Belajar Python!
			{/if}
		</p>

		<!-- Rewards Summary Box -->
		<div class="grid grid-cols-2 gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 text-left">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl {xpEarned > 0 ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-400'} flex items-center justify-center">
					<Icon name="zap" size={20} />
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase font-bold">Reward XP Level</div>
					{#if xpEarned > 0}
						<div class="text-lg font-black text-amber-400">+{xpEarned} XP</div>
					{:else}
						<div class="text-sm font-black text-slate-300">
							+0 XP
							<span class="text-[10px] text-slate-500 font-normal block">(Replay Level)</span>
						</div>
					{/if}
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
					<Icon name="check-circle" size={20} />
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase font-bold">Materi Selesai</div>
					<div class="text-base font-black text-slate-200">5 / 5 Soal</div>
				</div>
			</div>
		</div>

		<!-- Actions -->
		<div class="space-y-2.5">
			<button
				type="button"
				onclick={onNextLevel}
				class="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 hover:from-indigo-600 hover:via-purple-600 hover:to-emerald-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-indigo-500/30 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
			>
				<span>{isLastLevel ? 'Kembali ke Menu Level' : 'Lanjut ke Level Berikutnya'}</span>
				<Icon name="chevron-right" size={18} />
			</button>

			<div class="flex gap-2">
				{#if onReplayLevel}
					<button
						type="button"
						onclick={onReplayLevel}
						class="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
					>
						<Icon name="rotate-ccw" size={14} />
						<span>Ulangi Level Ini</span>
					</button>
				{/if}
				{#if onBackToSelect}
					<button
						type="button"
						onclick={onBackToSelect}
						class="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
					>
						<Icon name="book-open" size={14} />
						<span>Pilih Level Belajar</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
