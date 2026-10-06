<script lang="ts">
	let {
		size = 'md',
		showSubtitle = true,
		clickable = true,
		onclick
	}: {
		size?: 'sm' | 'md' | 'lg';
		showSubtitle?: boolean;
		clickable?: boolean;
		onclick?: () => void;
	} = $props();

	const iconSizeClasses = {
		sm: 'w-7 h-7 text-xs',
		md: 'w-9 h-9 text-sm',
		lg: 'w-11 h-11 text-base'
	};

	const titleSizeClasses = {
		sm: 'text-sm font-black',
		md: 'text-base sm:text-lg font-black',
		lg: 'text-xl sm:text-2xl font-black'
	};
</script>

<button
	type="button"
	{onclick}
	disabled={!clickable}
	class="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none {clickable
		? 'cursor-pointer'
		: 'cursor-default'}"
	title="PyQuest — Petualangan Logika Python"
>
	<!-- Geometric Brand Mark: Futuristic Python Hex-Shield with Interlocking Logic Nodes -->
	<div
		class="{iconSizeClasses[size]} relative rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-0.5 shadow-lg shadow-indigo-600/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all duration-200"
	>
		<div class="w-full h-full rounded-[14px] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-1.5 border border-indigo-400/30">
			<svg
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="w-full h-full transform group-hover:rotate-6 transition-transform duration-300"
			>
				<!-- Top loop (Cyan Python head) -->
				<path
					d="M16 4C11.5 4 8 7 8 11V13H16V15H6C3.5 15 2 17 2 20C2 23 4 25 7 25H9V22C9 19.5 11 18 14 18H20C22.5 18 24 16.5 24 14V11C24 7 20.5 4 16 4Z"
					fill="url(#cyan-grad)"
				/>
				<!-- Eye top -->
				<circle cx="12" cy="8.5" r="1.5" fill="#030712" />

				<!-- Bottom loop (Purple/Gold Python tail/body) -->
				<path
					d="M16 28C20.5 28 24 25 24 21V19H16V17H26C28.5 17 30 15 30 12C30 9 28 7 25 7H23V10C23 12.5 21 14 18 14H12C9.5 14 8 15.5 8 18V21C8 25 11.5 28 16 28Z"
					fill="url(#indigo-grad)"
				/>
				<!-- Eye bottom -->
				<circle cx="20" cy="23.5" r="1.5" fill="#030712" />

				<defs>
					<linearGradient id="cyan-grad" x1="2" y1="4" x2="24" y2="25" gradientUnits="userSpaceOnUse">
						<stop stop-color="#38BDF8" />
						<stop offset="1" stop-color="#22D3EE" />
					</linearGradient>
					<linearGradient id="indigo-grad" x1="8" y1="7" x2="30" y2="28" gradientUnits="userSpaceOnUse">
						<stop stop-color="#818CF8" />
						<stop offset="1" stop-color="#A855F7" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	</div>

	<!-- Typography -->
	<div class="flex flex-col justify-center">
		<div class="flex items-center gap-1 leading-none">
			<span class="{titleSizeClasses[size]} tracking-tight text-white group-hover:text-cyan-300 transition-colors">
				Py<span class="text-indigo-400">Quest</span>
			</span>
		</div>
		{#if showSubtitle}
			<p class="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight mt-0.5 hidden xs:block">
				Petualangan Logika Python
			</p>
		{/if}
	</div>
</button>
