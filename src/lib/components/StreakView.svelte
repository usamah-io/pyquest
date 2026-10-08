<script lang="ts">
	import { dashboardUserStore } from '$lib/stores/authStore';
	import { progressStore } from '$lib/stores/progressStore';
	import Icon from './Icon.svelte';

	let {
		onBackToHome
	}: {
		onBackToHome: () => void;
	} = $props();

	let currentStreak = $derived($dashboardUserStore.streak || 1);
	let longestStreak = $derived(Math.max(currentStreak, 3)); // dynamic/minimum

	// 7-day week representation
	const DAYS_OF_WEEK = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
	const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=Mon, 6=Sun

	// Mini 30-day activity simulation based on progress
	const totalCompleted = $derived(
		($progressStore.completedChallenges || []).length +
		($progressStore.completedLearningLevels || []).length
	);
</script>

<div class="max-w-4xl mx-auto w-full py-4 sm:py-6 px-3 sm:px-4 select-none space-y-6 animate-fade-in">
	<!-- Top Navigation / Back -->
	<div class="flex items-center justify-between">
		<button
			type="button"
			onclick={onBackToHome}
			class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-700 active:scale-95"
		>
			<Icon name="arrow-left" size={15} />
			<span>Kembali ke Beranda</span>
		</button>
		<div class="text-xs font-bold text-slate-500 uppercase tracking-wider">
			Konsistensi Belajar
		</div>
	</div>

	<!-- Main Streak Card (Solid Colors, No Gradients) -->
	<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
		<div class="flex flex-col md:flex-row items-center justify-between gap-6">
			<div class="text-center md:text-left space-y-2">
				<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold">
					<Icon name="flame" size={13} />
					<span>Streak Harian</span>
				</div>
				<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
					{currentStreak} <span class="text-orange-400">Hari Beruntun!</span>
				</h2>
				<p class="text-xs sm:text-sm text-slate-400 max-w-md">
					Hebat! Terus pertahankan ritme belajarmu setiap hari untuk menguasai Python selangkah demi selangkah.
				</p>
			</div>

			<!-- Large Streak Flame Badge -->
			<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border-2 border-orange-500/40 p-3 shadow-xl flex flex-col items-center justify-center shrink-0">
				<Icon name="flame" size={32} class="text-orange-400 animate-pulse mb-1" />
				<span class="text-xl sm:text-2xl font-black text-white">{currentStreak}</span>
				<span class="text-[10px] font-bold text-slate-400 uppercase">Hari</span>
			</div>
		</div>

		<!-- 7-Day Week Calendar Strip -->
		<div class="mt-8 pt-6 border-t border-slate-800">
			<div class="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
				<span>Aktivitas Minggu Ini</span>
				<span class="text-[11px] text-emerald-400 flex items-center gap-1">
					<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
					Hari ini aktif
				</span>
			</div>

			<div class="grid grid-cols-7 gap-2 sm:gap-3">
				{#each DAYS_OF_WEEK as day, idx}
					{@const isActive = idx <= todayIndex}
					{@const isToday = idx === todayIndex}
					<div class="flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition-all {isToday
						? 'bg-orange-950/40 border-orange-500/50 shadow-md ring-1 ring-orange-500/30'
						: isActive
							? 'bg-slate-950 border-slate-800 text-slate-300'
							: 'bg-slate-950/40 border-slate-800/60 opacity-50'}">
						<span class="text-[10px] font-bold uppercase text-slate-400 mb-1.5">{day}</span>
						<div class="w-7 h-7 rounded-xl flex items-center justify-center {isActive
							? 'bg-orange-500 text-white'
							: 'bg-slate-800 text-slate-600'}">
							{#if isActive}
								<Icon name="check" size={14} />
							{:else}
								<span class="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Streak Stats Grid -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
		<div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
			<div class="text-xs text-slate-400 font-bold uppercase mb-1">Streak Saat Ini</div>
			<div class="text-2xl font-black text-orange-400">{currentStreak} Hari</div>
			<div class="text-[11px] text-slate-500 mt-1">Aktif hingga tengah malam</div>
		</div>

		<div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
			<div class="text-xs text-slate-400 font-bold uppercase mb-1">Streak Terpanjang</div>
			<div class="text-2xl font-black text-amber-400">{longestStreak} Hari</div>
			<div class="text-[11px] text-slate-500 mt-1">Rekor terbaikmu</div>
		</div>

		<div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
			<div class="text-xs text-slate-400 font-bold uppercase mb-1">Aktivitas Selesai</div>
			<div class="text-2xl font-black text-cyan-400">{totalCompleted} Aktivitas</div>
			<div class="text-[11px] text-slate-500 mt-1">Total misi & modul dituntaskan</div>
		</div>
	</div>

	<!-- Consistency Tips -->
	<div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
		<h4 class="text-sm font-black text-white flex items-center gap-2">
			<Icon name="sparkles" size={16} class="text-cyan-400" />
			<span>Tips Menjaga Streak Belajar</span>
		</h4>
		<ul class="text-xs text-slate-400 space-y-2 list-disc list-inside">
			<li>Cukup selesaikan <strong class="text-slate-200">1 tantangan koding</strong> atau <strong class="text-slate-200">1 kuis</strong> setiap hari untuk menjaga streak tetap menyala.</li>
			<li>Belajar 10 menit setiap hari jauh lebih efektif daripada belajar 2 jam sekali seminggu.</li>
			<li>Streak yang konsisten melatih intuisi algoritma dan pola pikir komputasionalmu secara alami.</li>
		</ul>
	</div>
</div>
