<script lang="ts">
	import { onMount } from 'svelte';
	import { dashboardUserStore } from '$lib/stores/authStore';
	import { progressStore } from '$lib/stores/progressStore';
	import { learningLevelsData } from '$lib/questions/learningLevelsData';
	import Icon from './Icon.svelte';

	let {
		onBackToHome
	}: {
		onBackToHome: () => void;
	} = $props();

	onMount(() => {
		progressStore.refreshStreak();
	});

	type CalendarTab = 'WEEK' | 'MONTH';
	let selectedTab = $state<CalendarTab>('WEEK');

	// Real-time user metrics
	let currentStreak = $derived($dashboardUserStore.streak ?? 0);
	let longestStreak = $derived($dashboardUserStore.longestStreak ?? currentStreak);
	let isStreakActiveToday = $derived($dashboardUserStore.isStreakActiveToday ?? false);
	let activeDates = $derived($dashboardUserStore.activeDates ?? []);
	let totalActiveDays = $derived(activeDates.length);

	// Count completed missions and modules
	let completedLearningCount = $derived(
		($progressStore.completedLearningLevels || []).length
	);
	let completedChallengesCount = $derived(
		($progressStore.completedChallenges || []).length
	);

	function toLocalDateStr(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const todayStr = toLocalDateStr(new Date());

	// WEEK CALENDAR GENERATION (Monday to Sunday)
	const WEEKDAY_NAMES = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

	let weekDays = $derived.by(() => {
		const now = new Date();
		const jsDay = now.getDay(); // 0 is Sunday, 1 is Monday...
		// In Indonesia, week starts on Monday
		const mondayDiff = jsDay === 0 ? -6 : 1 - jsDay;

		const monday = new Date(now);
		monday.setDate(now.getDate() + mondayDiff);

		const activeSet = new Set(activeDates);

		return WEEKDAY_NAMES.map((name, idx) => {
			const dayDate = new Date(monday);
			dayDate.setDate(monday.getDate() + idx);
			const dateStr = toLocalDateStr(dayDate);

			return {
				name,
				dayNumber: dayDate.getDate(),
				dateStr,
				isToday: dateStr === todayStr,
				isPast: dateStr < todayStr,
				isFuture: dateStr > todayStr,
				isActive: activeSet.has(dateStr)
			};
		});
	});

	// MONTH CALENDAR GENERATION
	const MONTH_NAMES = [
		'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
		'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
	];

	let monthCalendar = $derived.by(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth();
		const monthTitle = `${MONTH_NAMES[month]} ${year}`;

		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const totalDays = lastDay.getDate();

		// Monday-based offset (0 = Mon, 6 = Sun)
		const firstDayOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
		const activeSet = new Set(activeDates);

		const days: Array<{
			dayNumber: number;
			dateStr: string;
			isToday: boolean;
			isPast: boolean;
			isFuture: boolean;
			isActive: boolean;
		}> = [];

		for (let d = 1; d <= totalDays; d++) {
			const dayDate = new Date(year, month, d);
			const dateStr = toLocalDateStr(dayDate);
			days.push({
				dayNumber: d,
				dateStr,
				isToday: dateStr === todayStr,
				isPast: dateStr < todayStr,
				isFuture: dateStr > todayStr,
				isActive: activeSet.has(dateStr)
			});
		}

		const activeCountInMonth = days.filter((d) => d.isActive).length;

		return {
			monthTitle,
			firstDayOffset,
			days,
			activeCountInMonth
		};
	});
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
		<div class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
			<Icon name="flame" size={14} class={currentStreak > 0 ? 'text-orange-400' : 'text-slate-500'} />
			<span>Konsistensi Belajar</span>
		</div>
	</div>

	<!-- Main Streak Card (Solid Dark Gaming Style) -->
	<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
		<div class="flex flex-col md:flex-row items-center justify-between gap-6">
			<!-- Streak Status Text -->
			<div class="text-center md:text-left space-y-2">
				{#if currentStreak === 0}
					<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold">
						<span class="w-2 h-2 rounded-full bg-slate-500"></span>
						<span>Streak Padam</span>
					</div>
					<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
						0 <span class="text-slate-400">Hari Beruntun</span>
					</h2>
					<p class="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
						Streak kamu padam karena tidak ada aktivitas kemarin. Selesaikan <strong class="text-slate-200">1 kuis atau tantangan coding hari ini</strong> untuk menyalakan kembali streakmu!
					</p>
				{:else if isStreakActiveToday}
					<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold">
						<Icon name="flame" size={13} />
						<span>Streak Menyala · Hari Ini Aktif</span>
					</div>
					<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
						{currentStreak} <span class="text-orange-400">Hari Beruntun!</span>
					</h2>
					<p class="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
						Luar biasa! Kamu sudah menyelesaikan aktivitas hari ini dan apimu terus berkobar. Pertahankan konsistensi ini besok!
					</p>
				{:else}
					<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
						<Icon name="clock" size={13} />
						<span>Jaga Streakmu Hari Ini</span>
					</div>
					<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
						{currentStreak} <span class="text-amber-400">Hari Beruntun</span>
					</h2>
					<p class="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
						Streakmu dari kemarin masih aman! Tuntaskan minimal <strong class="text-amber-300">1 tantangan hari ini</strong> sebelum jam 00:00 agar streakmu tidak padam.
					</p>
				{/if}
			</div>

			<!-- Large Streak Flame Badge -->
			<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border-2 {currentStreak > 0 ? (isStreakActiveToday ? 'border-orange-500/50 shadow-orange-500/10' : 'border-amber-500/40') : 'border-slate-800'} p-3 shadow-xl flex flex-col items-center justify-center shrink-0">
				<Icon
					name="flame"
					size={34}
					class="{currentStreak > 0 ? (isStreakActiveToday ? 'text-orange-400 animate-pulse' : 'text-amber-400') : 'text-slate-600'} mb-1"
				/>
				<span class="text-xl sm:text-2xl font-black text-white">{currentStreak}</span>
				<span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
					{currentStreak > 0 ? 'Hari' : 'Padam'}
				</span>
			</div>
		</div>

		<!-- Timeframe Toggle: Minggu Ini vs Bulan Ini -->
		<div class="mt-8 pt-6 border-t border-slate-800">
			<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
				<div class="flex items-center gap-2">
					<Icon name="calendar" size={16} class="text-indigo-400" />
					<span class="text-xs font-black text-slate-200 tracking-wide uppercase">
						Riwayat Aktivitas Harian
					</span>
				</div>

				<div class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
					<button
						type="button"
						onclick={() => (selectedTab = 'WEEK')}
						class="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer {selectedTab === 'WEEK'
							? 'bg-indigo-600 text-white shadow-xs'
							: 'text-slate-400 hover:text-slate-200'}"
					>
						Minggu Ini
					</button>
					<button
						type="button"
						onclick={() => (selectedTab = 'MONTH')}
						class="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer {selectedTab === 'MONTH'
							? 'bg-indigo-600 text-white shadow-xs'
							: 'text-slate-400 hover:text-slate-200'}"
					>
						Bulan Ini
					</button>
				</div>
			</div>

			<!-- TAB 1: WEEK STRIP (7 Days) -->
			{#if selectedTab === 'WEEK'}
				<div class="space-y-3">
					<div class="grid grid-cols-7 gap-2 sm:gap-3">
						{#each weekDays as day}
							<div
								class="flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition-all text-center {day.isToday
									? 'bg-orange-950/30 border-orange-500/60 ring-1 ring-orange-500/30 shadow-md'
									: day.isActive
									? 'bg-slate-950 border-orange-500/40 shadow-xs'
									: day.isPast
									? 'bg-slate-950/70 border-slate-800/80 text-slate-500'
									: 'bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60'}"
							>
								<!-- Day Name -->
								<span class="text-[10px] font-black uppercase {day.isToday ? 'text-orange-400' : 'text-slate-400'} mb-1">
									{day.name}
								</span>

								<!-- Day Number -->
								<span class="text-[11px] font-mono font-bold {day.isToday ? 'text-white' : 'text-slate-300'} mb-2">
									{day.dayNumber}
								</span>

								<!-- Active Indicator Icon / Badge -->
								<div
									class="w-7 h-7 rounded-xl flex items-center justify-center transition-all {day.isActive
										? 'bg-orange-500 text-white shadow-sm'
										: day.isToday
										? 'bg-orange-950/50 border border-orange-500/40 text-orange-400'
										: day.isPast
										? 'bg-slate-800/70 text-slate-600'
										: 'bg-slate-900/60 text-slate-700'}"
								>
									{#if day.isActive}
										<Icon name="flame" size={14} />
									{:else if day.isToday}
										<span class="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping"></span>
									{:else if day.isPast}
										<span class="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
									{:else}
										<span class="w-1 h-1 rounded-full bg-slate-700"></span>
									{/if}
								</div>

								<!-- Status Text -->
								<span class="text-[9px] font-bold mt-1.5 {day.isActive ? 'text-orange-400' : day.isToday ? 'text-amber-400' : 'text-slate-600'}">
									{#if day.isActive}
										Aktif
									{:else if day.isToday}
										Hari Ini
									{:else}
										—
									{/if}
								</span>
							</div>
						{/each}
					</div>

					<div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
						<span class="flex items-center gap-1.5">
							<span class="w-2.5 h-2.5 rounded-md bg-orange-500 inline-block"></span>
							<span>Hari belajar tuntas</span>
						</span>
						<span class="flex items-center gap-1.5">
							<span class="w-2.5 h-2.5 rounded-md bg-slate-800 inline-block"></span>
							<span>Belum ada aktivitas</span>
						</span>
					</div>
				</div>

			<!-- TAB 2: MONTH CALENDAR (Full month dates) -->
			{:else}
				<div class="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-black text-white">{monthCalendar.monthTitle}</span>
						<span class="text-xs font-mono font-bold text-orange-400">
							{monthCalendar.activeCountInMonth} Hari Aktif di Bulan Ini
						</span>
					</div>

					<!-- Day Headers -->
					<div class="grid grid-cols-7 gap-1 text-center pb-1 border-b border-slate-800/80">
						{#each WEEKDAY_NAMES as wd}
							<span class="text-[10px] font-black uppercase text-slate-400 py-1">{wd}</span>
						{/each}
					</div>

					<!-- Days Grid -->
					<div class="grid grid-cols-7 gap-1">
						<!-- Empty Offset Cells -->
						{#each Array(monthCalendar.firstDayOffset) as _}
							<div class="h-10 rounded-xl bg-transparent"></div>
						{/each}

						<!-- Calendar Days -->
						{#each monthCalendar.days as day}
							<div
								class="h-10 rounded-xl flex flex-col items-center justify-center p-1 border transition-all text-center relative {day.isToday
									? 'border-orange-500/80 bg-orange-950/40 ring-1 ring-orange-500/40'
									: day.isActive
									? 'bg-orange-950/20 border-orange-500/40 text-white'
									: day.isPast
									? 'bg-slate-900/60 border-slate-800/60 text-slate-400'
									: 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60'}"
							>
								<span class="text-xs font-bold leading-none {day.isToday ? 'text-orange-300 font-black' : day.isActive ? 'text-white' : 'text-slate-300'}">
									{day.dayNumber}
								</span>

								{#if day.isActive}
									<span class="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1"></span>
								{:else if day.isToday}
									<span class="w-1 h-1 rounded-full bg-orange-400/80 mt-1"></span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Streak Stats Grid (Clean 4-Card Statistics Panel) -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
		<!-- Streak Saat Ini -->
		<div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
			<div class="space-y-1">
				<div class="text-[10px] text-slate-400 font-black uppercase tracking-wider">Streak Saat Ini</div>
				<div class="text-2xl font-black {currentStreak > 0 ? 'text-orange-400' : 'text-slate-400'}">
					{currentStreak} Hari
				</div>
			</div>
			<div class="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800 font-medium">
				{currentStreak > 0 ? (isStreakActiveToday ? 'Aktif hari ini' : 'Menunggu belajar') : 'Padam saat ini'}
			</div>
		</div>

		<!-- Rekor Terpanjang -->
		<div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
			<div class="space-y-1">
				<div class="text-[10px] text-slate-400 font-black uppercase tracking-wider">Rekor Terpanjang</div>
				<div class="text-2xl font-black text-amber-400">
					{longestStreak} Hari
				</div>
			</div>
			<div class="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800 font-medium">
				Rekor streak terbaikmu
			</div>
		</div>

		<!-- Total Hari Belajar -->
		<div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
			<div class="space-y-1">
				<div class="text-[10px] text-slate-400 font-black uppercase tracking-wider">Total Hari Belajar</div>
				<div class="text-2xl font-black text-indigo-400">
					{totalActiveDays} Hari
				</div>
			</div>
			<div class="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800 font-medium">
				Hari aktif tercatat
			</div>
		</div>

		<!-- Aktivitas Tuntas -->
		<div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
			<div class="space-y-1">
				<div class="text-[10px] text-slate-400 font-black uppercase tracking-wider">Misi & Modul</div>
				<div class="text-2xl font-black text-cyan-400">
					{completedChallengesCount + completedLearningCount}
				</div>
			</div>
			<div class="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800 font-medium">
				{completedChallengesCount} Misi · {completedLearningCount} Kuis
			</div>
		</div>
	</div>

	<!-- Consistency Tips & Rules -->
	<div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
		<h4 class="text-sm font-black text-white flex items-center gap-2">
			<Icon name="sparkles" size={16} class="text-amber-400" />
			<span>Aturan & Cara Menjaga Streak Belajar</span>
		</h4>
		<ul class="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
			<li>Cukup selesaikan <strong class="text-slate-200">1 tantangan koding</strong> atau <strong class="text-slate-200">1 kuis materi</strong> setiap hari untuk menjaga streak tetap menyala.</li>
			<li>Jika kamu tidak menyelesaikan aktivitas apa pun kemarin dan belum bermain hari ini, streak akan <strong class="text-rose-400">padam (0 Hari)</strong>.</li>
			<li>Ketika streakmu padam, jangan berkecil hati! Cukup mainkan 1 aktivitas hari ini dan apimu akan <strong class="text-orange-400">langsung menyala kembali</strong>.</li>
			<li>Belajar 10-15 menit secara konsisten setiap hari jauh lebih efektif untuk menguasai Python daripada belajar berjam-jam sekali seminggu.</li>
		</ul>
	</div>
</div>
