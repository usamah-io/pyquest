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
		
		// Learning, Hints, Target, Shield, Achievements
		'lightbulb': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18h6m-5 4h4m-7-9.5A7 7 0 1 1 17 12.5a5.5 5.5 0 0 0-2.5 4.5h-5a5.5 5.5 0 0 0-2.5-4.5z"/>`,
		'book-open': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
		'star': `<polygon fill="currentColor" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
		'flame': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>`,
		'zap': `<polygon fill="currentColor" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
		'trophy': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M6 4h12v7a6 6 0 0 1-12 0zm3 14h6m-3-3v5m-4 2h8"/>`,
		'target': `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/>`,
		'shield': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
		'shield-check': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"/>`,
		'compass': `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/>`,
		'award': `<circle cx="12" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'layers': `<polygon points="12 2 2 7 12 12 22 7 12 2" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="2 17 12 22 22 17" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="2 12 12 17 22 12" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'map-pin': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'git-branch': `<line x1="6" y1="3" x2="6" y2="15" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 9a9 9 0 0 1-9 9" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'git-commit': `<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><line x1="1.05" y1="12" x2="7" y2="12" stroke="currentColor" stroke-width="2"/><line x1="17.01" y1="12" x2="22.96" y2="12" stroke="currentColor" stroke-width="2"/>`,
		'git-merge': `<circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 21V9a9 9 0 0 0 9 9" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'refresh-cw': `<path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
		'terminal': `<polyline points="4 17 10 11 4 5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="19" x2="20" y2="19" stroke="currentColor" stroke-width="2"/>`,
		'database': `<ellipse cx="12" cy="5" rx="9" ry="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'cpu': `<rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="9" y="9" width="6" height="6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="9" y1="1" x2="9" y2="4" stroke="currentColor" stroke-width="2"/><line x1="15" y1="1" x2="15" y2="4" stroke="currentColor" stroke-width="2"/><line x1="9" y1="20" x2="9" y2="23" stroke="currentColor" stroke-width="2"/><line x1="15" y1="20" x2="15" y2="23" stroke="currentColor" stroke-width="2"/><line x1="20" y1="9" x2="23" y2="9" stroke="currentColor" stroke-width="2"/><line x1="20" y1="14" x2="23" y2="14" stroke="currentColor" stroke-width="2"/><line x1="1" y1="9" x2="4" y2="9" stroke="currentColor" stroke-width="2"/><line x1="1" y1="14" x2="4" y2="14" stroke="currentColor" stroke-width="2"/>`,
		'message-square': `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'sparkles': `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" fill="currentColor"/>`,
		'user': `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'settings': `<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'check-circle': `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'alert-circle': `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>`,
		'edit-3': `<path d="M12 20h9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'log-out': `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="16 17 21 12 16 7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2"/>`,
		'maximize': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>`,
		'minimize': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14h6v6m10-10h-6V4M14 10l7-7m-7 14 7 7M3 21l7-7M3 3l7 7"/>`,
		'alert-triangle': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3zM12 9v4m0 4h.01"/>`,
		'lock': `<rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
		'unlock': `<rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" d="M7 11V7a5 5 0 0 1 9.9-1"/>`,
		'device-mobile-rotated': `<rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="17" y1="12" x2="17" y2="12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
		'gamepad': `<line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="15" y1="13" x2="15.01" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="11" x2="18.01" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'plus': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14m-7-7h14"/>`,
		'help-circle': `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m0 3.5h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
		'touch': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 13 4 4 7-7M5 8a4 4 0 1 1 8 0v6"/>`,
		'trash-2': `<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
		'copy': `<rect width="13" height="13" x="9" y="9" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'grip-vertical': `<circle cx="9" cy="5" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="19" r="1.5" fill="currentColor"/><circle cx="15" cy="5" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="19" r="1.5" fill="currentColor"/>`,
		'code': `<polyline points="16 18 22 12 16 6" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="8 6 2 12 8 18" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'sun': `<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
		'moon': `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
		'volume-2': `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
		'volume-x': `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
		'download': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/>`,
		'arrow-left': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19-7-7 7-7m-7 7h14"/>`,
		'camera': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4" fill="none" stroke="currentColor" stroke-width="2"/>`,
		'upload': `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12"/>`,
		'wifi-off': `<line x1="1" y1="1" x2="23" y2="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
		'layout-grid': `<rect width="7" height="7" x="3" y="3" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect width="7" height="7" x="14" y="3" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect width="7" height="7" x="14" y="14" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect width="7" height="7" x="3" y="14" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>`
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
