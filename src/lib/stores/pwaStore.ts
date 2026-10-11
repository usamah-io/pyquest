import { writable } from 'svelte/store';

export interface PwaState {
	canInstall: boolean;
	isInstalled: boolean;
	isOffline: boolean;
	isIOS: boolean;
	isAndroid: boolean;
	showIOSInstallGuide: boolean;
	showInstallGuide: boolean;
}

const STORAGE_KEY_INSTALLED = 'pyquest-pwa-installed';

function createPwaStore() {
	let deferredPrompt: any = null;

	const { subscribe, update, set } = writable<PwaState>({
		canInstall: false,
		isInstalled: false,
		isOffline: false,
		isIOS: false,
		isAndroid: false,
		showIOSInstallGuide: false,
		showInstallGuide: false
	});

	function markAsInstalled() {
		try {
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY_INSTALLED, 'true');
			}
		} catch {}
		update((s) => ({
			...s,
			isInstalled: true,
			canInstall: false,
			showInstallGuide: false,
			showIOSInstallGuide: false
		}));
	}

	function init() {
		if (typeof window === 'undefined') return;

		const isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone === true;

		let savedInstalled = false;
		try {
			savedInstalled = localStorage.getItem(STORAGE_KEY_INSTALLED) === 'true';
		} catch {}

		const isInstalled = isStandalone || savedInstalled;

		const userAgent = window.navigator.userAgent.toLowerCase();
		const isIOSDevice =
			/iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
		const isAndroidDevice = /android/.test(userAgent);

		update((s) => ({
			...s,
			isInstalled,
			isIOS: isIOSDevice && !isInstalled,
			isAndroid: isAndroidDevice,
			isOffline: !navigator.onLine
		}));

		if (isStandalone && !savedInstalled) {
			try {
				localStorage.setItem(STORAGE_KEY_INSTALLED, 'true');
			} catch {}
		}

		// Check getInstalledRelatedApps on Chromium browsers
		if ('getInstalledRelatedApps' in navigator && typeof (navigator as any).getInstalledRelatedApps === 'function') {
			(navigator as any).getInstalledRelatedApps().then((relatedApps: any[]) => {
				if (Array.isArray(relatedApps) && relatedApps.length > 0) {
					markAsInstalled();
				}
			}).catch(() => {});
		}

		// Listen for display-mode standalone changes
		try {
			const mql = window.matchMedia('(display-mode: standalone)');
			mql.addEventListener?.('change', (e) => {
				if (e.matches) {
					markAsInstalled();
				}
			});
		} catch {}

		// Listen for PWA installation prompt event
		window.addEventListener('beforeinstallprompt', (e: Event) => {
			e.preventDefault();
			deferredPrompt = e;
			if (!isStandalone) {
				try {
					localStorage.removeItem(STORAGE_KEY_INSTALLED);
				} catch {}
				update((s) => ({ ...s, canInstall: true, isInstalled: false }));
			}
		});

		// Listen for app installed event
		window.addEventListener('appinstalled', () => {
			deferredPrompt = null;
			markAsInstalled();
			console.log('[PWA] PyQuest was successfully installed!');
		});

		// Online/Offline status listeners
		window.addEventListener('online', () => {
			update((s) => ({ ...s, isOffline: false }));
		});

		window.addEventListener('offline', () => {
			update((s) => ({ ...s, isOffline: true }));
		});
	}

	async function promptInstall(): Promise<boolean> {
		if (deferredPrompt) {
			try {
				deferredPrompt.prompt();
				const { outcome } = await deferredPrompt.userChoice;
				deferredPrompt = null;
				update((s) => ({ ...s, canInstall: false }));
				if (outcome === 'accepted') {
					markAsInstalled();
					return true;
				}
				return false;
			} catch (err) {
				console.error('[PWA] Prompt error:', err);
				update((s) => ({ ...s, showInstallGuide: true }));
				return false;
			}
		}

		// When browser does not provide deferredPrompt (e.g. iOS or manual browser menu required)
		update((s) => ({ ...s, showInstallGuide: true }));
		return false;
	}

	function toggleInstallGuide(show?: boolean) {
		update((s) => ({
			...s,
			showInstallGuide: show !== undefined ? show : !s.showInstallGuide
		}));
	}

	function toggleIOSGuide(show?: boolean) {
		update((s) => ({
			...s,
			showIOSInstallGuide: show !== undefined ? show : !s.showIOSInstallGuide,
			showInstallGuide: show !== undefined ? show : !s.showInstallGuide
		}));
	}

	return {
		subscribe,
		init,
		markAsInstalled,
		promptInstall,
		toggleInstallGuide,
		toggleIOSGuide
	};
}

export const pwaStore = createPwaStore();
