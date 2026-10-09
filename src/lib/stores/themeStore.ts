import { writable } from 'svelte/store';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'pyquest-theme';

function createThemeStore() {
	// Default to dark mode as approved in PyQuest
	let initialTheme: ThemeMode = 'dark';

	if (typeof window !== 'undefined') {
		try {
			const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
			if (saved === 'light' || saved === 'dark') {
				initialTheme = saved;
			}
		} catch {}
	}

	const { subscribe, set, update } = writable<ThemeMode>(initialTheme);

	function applyThemeToDocument(theme: ThemeMode) {
		if (typeof document === 'undefined') return;

		const root = document.documentElement;
		root.setAttribute('data-theme', theme);

		if (theme === 'light') {
			root.classList.remove('dark');
			root.classList.add('light');
		} else {
			root.classList.remove('light');
			root.classList.add('dark');
		}

		// Update mobile status bar theme-color
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', theme === 'light' ? '#F5F7FC' : '#020617');
		}
	}

	// Initialize theme on document if in browser
	if (typeof window !== 'undefined') {
		applyThemeToDocument(initialTheme);
	}

	return {
		subscribe,
		setTheme(theme: ThemeMode) {
			if (typeof window !== 'undefined') {
				try {
					localStorage.setItem(STORAGE_KEY, theme);
				} catch {}
				applyThemeToDocument(theme);
			}
			set(theme);
		},
		toggleTheme() {
			update((current) => {
				const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
				if (typeof window !== 'undefined') {
					try {
						localStorage.setItem(STORAGE_KEY, next);
					} catch {}
					applyThemeToDocument(next);
				}
				return next;
			});
		},
		init() {
			if (typeof window !== 'undefined') {
				try {
					const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
					const theme = saved === 'light' ? 'light' : 'dark';
					applyThemeToDocument(theme);
					set(theme);
				} catch {}
			}
		}
	};
}

export const themeStore = createThemeStore();
