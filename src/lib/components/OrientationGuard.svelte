<script lang="ts">
	import Icon from './Icon.svelte';
</script>

<div class="fixed inset-0 z-40 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-md md:hidden portrait:flex landscape:hidden">
	<div class="w-20 h-20 rounded-3xl bg-indigo-500/15 border-2 border-indigo-400/40 text-indigo-400 flex items-center justify-center mb-5 shadow-xl shadow-indigo-500/20">
		<Icon name="device-mobile-rotated" size={38} class="text-indigo-400 animate-pulse" />
	</div>
	<h2 class="text-xl font-black text-white mb-2">
		Putar Perangkatmu ke Landscape!
	</h2>
	<p class="text-slate-300 text-sm max-w-xs leading-relaxed mb-5">
		"Putar perangkatmu ke landscape untuk bermain."
	</p>
	<div class="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-indigo-300 font-mono inline-flex items-center gap-2">
		<Icon name="maximize" size={13} />
		<span>Mode Horizontal (Landscape) Diperlukan</span>
	</div>
</div>
