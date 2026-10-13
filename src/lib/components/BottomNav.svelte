<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		currentMode = 'HOME',
		onSelectMode,
		onOpenProfile,
		isVisible = true
	}: {
		currentMode?: 'HOME' | 'LEARN' | 'GAME' | 'PROFILE';
		onSelectMode?: (mode: 'HOME' | 'LEARN' | 'GAME') => void;
		onOpenProfile?: () => void;
		isVisible?: boolean;
	} = $props();
</script>

<nav
	class="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ease-in-out {isVisible
		? 'translate-y-0'
		: 'translate-y-full pointer-events-none'}"
	aria-label="Navigasi Utama"
>
	<div class="grid grid-cols-4 gap-1 max-w-md mx-auto">
		<!-- 1. Beranda -->
		<button
			type="button"
			onclick={() => onSelectMode && onSelectMode('HOME')}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all cursor-pointer group active:scale-95 {currentMode === 'HOME'
				? 'text-cyan-600 dark:text-cyan-400 font-bold'
				: 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}"
			aria-current={currentMode === 'HOME' ? 'page' : undefined}
		>
			<div
				class="p-1.5 rounded-xl transition-all {currentMode === 'HOME'
					? 'bg-cyan-500/15 dark:bg-cyan-500/20 shadow-xs'
					: 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50'}"
			>
				<Icon
					name="house"
					size={22}
					class={currentMode === 'HOME' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}
				/>
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight font-medium {currentMode === 'HOME' ? 'font-bold' : ''}">Beranda</span>
		</button>

		<!-- 2. Modul -->
		<button
			type="button"
			onclick={() => onSelectMode && onSelectMode('LEARN')}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all cursor-pointer group active:scale-95 {currentMode === 'LEARN'
				? 'text-indigo-600 dark:text-indigo-400 font-bold'
				: 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}"
			aria-current={currentMode === 'LEARN' ? 'page' : undefined}
		>
			<div
				class="p-1.5 rounded-xl transition-all {currentMode === 'LEARN'
					? 'bg-indigo-500/15 dark:bg-indigo-500/20 shadow-xs'
					: 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50'}"
			>
				<Icon
					name="book-open"
					size={22}
					class={currentMode === 'LEARN' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}
				/>
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight font-medium {currentMode === 'LEARN' ? 'font-bold' : ''}">Modul</span>
		</button>

		<!-- 3. Game -->
		<button
			type="button"
			onclick={() => onSelectMode && onSelectMode('GAME')}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all cursor-pointer group active:scale-95 {currentMode === 'GAME'
				? 'text-emerald-600 dark:text-emerald-400 font-bold'
				: 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}"
			aria-current={currentMode === 'GAME' ? 'page' : undefined}
		>
			<div
				class="p-1.5 rounded-xl transition-all {currentMode === 'GAME'
					? 'bg-emerald-500/15 dark:bg-emerald-500/20 shadow-xs'
					: 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50'}"
			>
				<Icon
					name="gamepad-2"
					size={22}
					class={currentMode === 'GAME' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}
				/>
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight font-medium {currentMode === 'GAME' ? 'font-bold' : ''}">Game</span>
		</button>

		<!-- 4. Profil -->
		<button
			type="button"
			onclick={() => onOpenProfile && onOpenProfile()}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all cursor-pointer group active:scale-95 {currentMode === 'PROFILE'
				? 'text-purple-600 dark:text-purple-400 font-bold'
				: 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}"
			aria-current={currentMode === 'PROFILE' ? 'page' : undefined}
		>
			<div
				class="p-1.5 rounded-xl transition-all {currentMode === 'PROFILE'
					? 'bg-purple-500/15 dark:bg-purple-500/20 shadow-xs'
					: 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50'}"
			>
				<Icon
					name="user-round"
					size={22}
					class={currentMode === 'PROFILE' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 dark:text-slate-400'}
				/>
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight font-medium {currentMode === 'PROFILE' ? 'font-bold' : ''}">Profil</span>
		</button>
	</div>
</nav>
