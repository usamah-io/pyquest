<script lang="ts">
	let {
		name,
		size = 20,
		class: className = '',
		...restProps
	}: {
		name: string;
		size?: number | string;
		class?: string;
		[key: string]: any;
	} = $props();

	// Clean inline SVGs corresponding to tabler / heroicons / material design icons
	const iconMap: Record<string, string> = {
		// Branding / Python
		'python': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9H7a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h1v-2a2 2 0 0 1 2-2h4a2 2 0 0 0 2-2V7a3 3 0 0 0-3-3h-2v2a2 2 0 0 1-2 2m-4 1h.01M16 14h.01M12 15h5a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-1v2a2 2 0 0 1-2 2h-4a2 2 0 0 0-2 2v2a3 3 0 0 0 3 3h2v-2a2 2 0 0 1 2-2"/>`,
		'robot': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M9 17v4m6-4v4M9 3v2m6-2v2M9 10h.01M15 10h.01M9 13a3 3 0 0 0 6 0"/>`,
		
		// Actions
		'play': `<polygon fill="currentColor" points="6 4 20 12 6 20 6 4"/>`,
		'rotate-ccw': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8m0-5v5h5"/>`,
		'check': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m5 13 4 4L19 7"/>`,
		'x': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m18 6-12 12M6 6l12 12"/>`,
		'chevron-right': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m9 18 6-6-6-6"/>`,
		'chevron-left': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m15 18-6-6 6-6"/>`,
		'arrow-up': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m-7 7 7-7 7 7"/>`,
		'arrow-down': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7-7 7-7-7"/>`,
		
		// Blocks & Arrows
		'corner-up-left': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14 4 9l5-5m11 16v-7a4 4 0 0 0-4-4H4"/>`,
		'corner-up-right': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 14 5-5-5-5M4 20v-7a4 4 0 0 1 4-4h12"/>`,
		'repeat': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 2 4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4m14-1v2a4 4 0 0 1-4 4H3"/>`,
		'puzzle': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8a2 2 0 0 1 2-2h2a2 2 0 1 0 4 0h2a2 2 0 0 1 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 1-2 2h-2a2 2 0 1 0-4 0H6a2 2 0 0 1-2-2v-2a2 2 0 1 0 0-4V8z"/>`,
		
		// Learning, Hints, Target, Shield
		'lightbulb': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18h6m-5 4h4m-7-9.5A7 7 0 1 1 17 12.5a5.5 5.5 0 0 0-2.5 4.5h-5a5.5 5.5 0 0 0-2.5-4.5z"/>`,
		'book-open': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
		'star': `<polygon fill="currentColor" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
		'flame': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>`,
		'zap': `<polygon fill="currentColor" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
		'trophy': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M6 4h12v7a6 6 0 0 1-12 0zm3 14h6m-3-3v5m-4 2h8"/>`,
		'target': `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/>`,
		'shield-check': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"/>`,
		'maximize': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>`,
		'minimize': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14h6v6m10-10h-6V4M14 10l7-7m-7 14 7 7M3 21l7-7M3 3l7 7"/>`,
		'alert-triangle': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3zM12 9v4m0 4h.01"/>`,
		'lock': `<rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
		'unlock': `<rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" d="M7 11V7a5 5 0 0 1 9.9-1"/>`,
		'device-mobile-rotated': `<rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="17" y1="12" x2="17" y2="12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
		'gamepad': `<line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="15" y1="13" x2="15.01" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="11" x2="18.01" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>`
	};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	width={size}
	height={size}
	class="inline-block shrink-0 {className}"
	aria-hidden="true"
	{...restProps}
>
	{@html iconMap[name] || iconMap['zap']}
</svg>
