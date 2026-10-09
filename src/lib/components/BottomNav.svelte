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

<nav class="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ease-in-out {isVisible ? 'translate-y-0' : 'translate-y-full pointer-events-none'}">
	<div class="grid grid-cols-4 gap-1 max-w-md mx-auto">
		<!-- Beranda -->
		<button
			type="button"
			onclick={() => onSelectMode && onSelectMode('HOME')}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer {currentMode === 'HOME'
				? 'text-cyan-400 font-bold'
				: 'text-slate-400 hover:text-slate-200'}"
		>
			<div class="p-1 rounded-lg transition-colors {currentMode === 'HOME' ? 'bg-cyan-500/15' : ''}">
				<Icon name="home" size={20} class={currentMode === 'HOME' ? 'text-cyan-400' : 'text-slate-400'} />
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight">Beranda</span>
		</button>

		<!-- Modul -->
		<button
			type="button"
			onclick={() => onSelectMode && onSelectMode('LEARN')}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer {currentMode === 'LEARN'
				? 'text-indigo-400 font-bold'
				: 'text-slate-400 hover:text-slate-200'}"
		>
			<div class="p-1 rounded-lg transition-colors {currentMode === 'LEARN' ? 'bg-indigo-500/15' : ''}">
				<Icon name="book-open" size={20} class={currentMode === 'LEARN' ? 'text-indigo-400' : 'text-slate-400'} />
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight">Modul</span>
		</button>

		<!-- Game -->
		<button
			type="button"
			onclick={() => onSelectMode && onSelectMode('GAME')}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer {currentMode === 'GAME'
				? 'text-emerald-400 font-bold'
				: 'text-slate-400 hover:text-slate-200'}"
		>
			<div class="p-1 rounded-lg transition-colors {currentMode === 'GAME' ? 'bg-emerald-500/15' : ''}">
				<Icon name="gamepad" size={20} class={currentMode === 'GAME' ? 'text-emerald-400' : 'text-slate-400'} />
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight">Game</span>
		</button>

		<!-- Profil -->
		<button
			type="button"
			onclick={() => onOpenProfile && onOpenProfile()}
			class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer {currentMode === 'PROFILE'
				? 'text-purple-400 font-bold'
				: 'text-slate-400 hover:text-slate-200'}"
		>
			<div class="p-1 rounded-lg transition-colors {currentMode === 'PROFILE' ? 'bg-purple-500/15' : ''}">
				<Icon name="user" size={20} class={currentMode === 'PROFILE' ? 'text-purple-400' : 'text-slate-400'} />
			</div>
			<span class="text-[10px] mt-0.5 tracking-tight">Profil</span>
		</button>
	</div>
</nav>
