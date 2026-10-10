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

	function init() {
		if (typeof window === 'undefined') return;

		const isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone === true;

		const userAgent = window.navigator.userAgent.toLowerCase();
		const isIOSDevice =
			/iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
		const isAndroidDevice = /android/.test(userAgent);

		update((s) => ({
			...s,
			isInstalled: isStandalone,
			isIOS: isIOSDevice && !isStandalone,
			isAndroid: isAndroidDevice,
			isOffline: !navigator.onLine
		}));

		// Listen for PWA installation prompt event
		window.addEventListener('beforeinstallprompt', (e: Event) => {
			e.preventDefault();
			deferredPrompt = e;
			update((s) => ({ ...s, canInstall: true }));
		});

		// Listen for app installed event
		window.addEventListener('appinstalled', () => {
			deferredPrompt = null;
			update((s) => ({
				...s,
				canInstall: false,
				isInstalled: true,
				showInstallGuide: false,
				showIOSInstallGuide: false
			}));
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
					update((s) => ({ ...s, isInstalled: true }));
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
		promptInstall,
		toggleInstallGuide,
		toggleIOSGuide
	};
}

export const pwaStore = createPwaStore();
