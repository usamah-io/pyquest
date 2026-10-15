import { writable } from 'svelte/store';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'pyquest-theme';

function createThemeStore() {
	// Standardized single theme: Dark Mode (consistent high contrast)
	const currentTheme: ThemeMode = 'dark';

	const { subscribe, set } = writable<ThemeMode>(currentTheme);

	function applyThemeToDocument() {
		if (typeof document === 'undefined') return;

		const root = document.documentElement;
		root.setAttribute('data-theme', 'dark');
		root.classList.remove('light');
		root.classList.add('dark');

		// Clean up any previously stored light mode preference
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}

		// Update mobile status bar theme-color to deep dark navy
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', '#020617');
		}
	}

	// Initialize theme on document if in browser
	if (typeof window !== 'undefined') {
		applyThemeToDocument();
	}

	return {
		subscribe,
		setTheme(_theme: ThemeMode) {
			// Enforce dark mode
			if (typeof window !== 'undefined') {
				applyThemeToDocument();
			}
			set('dark');
		},
		toggleTheme() {
			// Theme toggle temporarily disabled; always enforce dark mode
			if (typeof window !== 'undefined') {
				applyThemeToDocument();
			}
			set('dark');
		},
		init() {
			if (typeof window !== 'undefined') {
				applyThemeToDocument();
				set('dark');
			}
		}
	};
}

export const themeStore = createThemeStore();
