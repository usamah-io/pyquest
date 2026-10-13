import { writable } from 'svelte/store';

export interface PwaState {
	canInstall: boolean;
	isInstalled: boolean;
	isOffline: boolean;
	isIOS: boolean;
	isAndroid: boolean;
	showIOSInstallGuide: boolean;
	showInstallGuide: boolean;
	deviceId: string;
}

export const DEVICE_INSTALLED_KEY = 'pyquest-device-installed-v2';
export const LEGACY_STORAGE_KEY_INSTALLED = 'pyquest-pwa-installed';
export const DEVICE_COOKIE_NAME = 'pyquest_device_installed';
export const DEVICE_ID_KEY = 'pyquest_device_id_v2';
export const BANNER_HIDE_KEY = 'pyquest-hide-pwa-banner';

const DEVICE_DB_NAME = 'pyquest_device_db';
const DEVICE_DB_VERSION = 1;
const DEVICE_STORE_NAME = 'device_meta';

let memoryDeviceId = '';
let memoryDeviceInstalled = false;

export function getOrCreateDeviceId(): string {
	if (memoryDeviceId) return memoryDeviceId;

	const storage = typeof window !== 'undefined' ? window.localStorage : (typeof globalThis !== 'undefined' ? (globalThis as any).localStorage : null);
	const doc = typeof document !== 'undefined' ? document : (typeof globalThis !== 'undefined' ? (globalThis as any).document : null);

	let deviceId = '';
	try {
		if (storage) {
			deviceId = storage.getItem(DEVICE_ID_KEY) || '';
		}
	} catch {}

	if (!deviceId && doc && typeof doc.cookie === 'string') {
		const match = doc.cookie.match(/(?:^|;\s*)pyquest_device_id=([^;]+)/);
		if (match) {
			deviceId = decodeURIComponent(match[1]);
		}
	}

	if (!deviceId) {
		deviceId = 'dev_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
	}

	memoryDeviceId = deviceId;

	try {
		if (storage) {
			storage.setItem(DEVICE_ID_KEY, deviceId);
		}
		if (doc && typeof doc.cookie === 'string') {
			doc.cookie = `pyquest_device_id=${encodeURIComponent(deviceId)}; max-age=315360000; path=/; SameSite=Lax`;
		}
	} catch {}

	return deviceId;
}

/**
 * Checks whether the physical device or browser profile already has PyQuest installed.
 * This is device-scoped and independent of which user account is logged in.
 */
export function checkDeviceInstalled(): boolean {
	if (memoryDeviceInstalled) return true;

	const win = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? (globalThis as any).window : null);
	const doc = typeof document !== 'undefined' ? document : (typeof globalThis !== 'undefined' ? (globalThis as any).document : null);
	const storage = typeof window !== 'undefined' ? window.localStorage : (typeof globalThis !== 'undefined' ? (globalThis as any).localStorage : null);

	// 1. Standalone / Fullscreen / Minimal-UI / iOS Home Screen / Android TWA
	if (win) {
		const isStandalone =
			(typeof win.matchMedia === 'function' &&
				(win.matchMedia('(display-mode: standalone)').matches ||
					win.matchMedia('(display-mode: fullscreen)').matches ||
					win.matchMedia('(display-mode: minimal-ui)').matches)) ||
			(win.navigator as any)?.standalone === true ||
			(doc && doc.referrer?.includes('android-app://'));

		if (isStandalone) return true;

		// 2. Android WebView / APK wrapper detection
		const ua = win.navigator?.userAgent || '';
		const isAndroidWebView =
			/\bwv\b/.test(ua) ||
			(/Android/.test(ua) && /Version\/4\.0/.test(ua)) ||
			typeof (win as any).Android !== 'undefined';

		if (isAndroidWebView) return true;
	}

	// 3. Persistent LocalStorage device markers (shared across all accounts on this device)
	if (storage) {
		try {
			if (
				storage.getItem(DEVICE_INSTALLED_KEY) === 'true' ||
				storage.getItem(LEGACY_STORAGE_KEY_INSTALLED) === 'true'
			) {
				return true;
			}
		} catch {}
	}

	// 4. Persistent Cookie marker (survives tab partition and multi-account switches on this device)
	if (doc && typeof doc.cookie === 'string') {
		try {
			if (doc.cookie.includes(`${DEVICE_COOKIE_NAME}=true`)) {
				return true;
			}
		} catch {}
	}

	return false;
}

function openDeviceDatabase(): Promise<IDBDatabase | null> {
	return new Promise((resolve) => {
		if (typeof window === 'undefined' || !window.indexedDB) {
			resolve(null);
			return;
		}
		try {
			const req = window.indexedDB.open(DEVICE_DB_NAME, DEVICE_DB_VERSION);
			req.onupgradeneeded = (e) => {
				const db = (e.target as IDBOpenDBRequest).result;
				if (!db.objectStoreNames.contains(DEVICE_STORE_NAME)) {
					db.createObjectStore(DEVICE_STORE_NAME, { keyPath: 'key' });
				}
			};
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => resolve(null);
		} catch {
			resolve(null);
		}
	});
}

export async function saveDeviceInstalledToIndexedDB(): Promise<void> {
	try {
		const db = await openDeviceDatabase();
		if (!db) return;
		await new Promise<void>((resolve) => {
			const tx = db.transaction(DEVICE_STORE_NAME, 'readwrite');
			const store = tx.objectStore(DEVICE_STORE_NAME);
			store.put({ key: 'isInstalled', value: true, updatedAt: new Date().toISOString() });
			tx.oncomplete = () => resolve();
			tx.onerror = () => resolve();
		});
	} catch {}
}

export async function checkDeviceInstalledFromIndexedDB(): Promise<boolean> {
	try {
		const db = await openDeviceDatabase();
		if (!db) return false;
		return await new Promise<boolean>((resolve) => {
			const tx = db.transaction(DEVICE_STORE_NAME, 'readonly');
			const store = tx.objectStore(DEVICE_STORE_NAME);
			const req = store.get('isInstalled');
			req.onsuccess = () => {
				resolve(req.result?.value === true);
			};
			req.onerror = () => resolve(false);
		});
	} catch {
		return false;
	}
}

function createPwaStore() {
	let deferredPrompt: any = null;
	const initialInstalled = checkDeviceInstalled();
	const initialDeviceId = typeof window !== 'undefined' ? getOrCreateDeviceId() : '';

	const { subscribe, update, set } = writable<PwaState>({
		canInstall: !initialInstalled,
		isInstalled: initialInstalled,
		isOffline: false,
		isIOS: false,
		isAndroid: false,
		showIOSInstallGuide: false,
		showInstallGuide: false,
		deviceId: initialDeviceId
	});

	function markAsInstalled() {
		memoryDeviceInstalled = true;
		try {
			const storage = typeof window !== 'undefined' ? window.localStorage : (typeof globalThis !== 'undefined' ? (globalThis as any).localStorage : null);
			const doc = typeof document !== 'undefined' ? document : (typeof globalThis !== 'undefined' ? (globalThis as any).document : null);
			if (storage) {
				storage.setItem(DEVICE_INSTALLED_KEY, 'true');
				storage.setItem(LEGACY_STORAGE_KEY_INSTALLED, 'true');
				storage.setItem(BANNER_HIDE_KEY, 'true');
			}
			if (doc && typeof doc.cookie === 'string') {
				doc.cookie = `${DEVICE_COOKIE_NAME}=true; max-age=315360000; path=/; SameSite=Lax`;
				doc.cookie = `pyquest_hide_pwa_banner=true; max-age=315360000; path=/; SameSite=Lax`;
			}
		} catch {}

		saveDeviceInstalledToIndexedDB();

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

		const deviceId = getOrCreateDeviceId();
		const isInstalled = checkDeviceInstalled();

		const userAgent = window.navigator.userAgent.toLowerCase();
		const isIOSDevice =
			/iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
		const isAndroidDevice = /android/.test(userAgent);

		update((s) => ({
			...s,
			deviceId,
			isInstalled,
			canInstall: !isInstalled && !!deferredPrompt,
			isIOS: isIOSDevice && !isInstalled,
			isAndroid: isAndroidDevice,
			isOffline: !navigator.onLine
		}));

		// If this device was already detected as installed, persist all markers
		if (isInstalled) {
			markAsInstalled();
		}

		// Asynchronously verify against IndexedDB in case browser cache was cleaned
		checkDeviceInstalledFromIndexedDB().then((idbInstalled) => {
			if (idbInstalled) {
				markAsInstalled();
			}
		});

		// Check getInstalledRelatedApps on Chromium browsers
		if ('getInstalledRelatedApps' in navigator && typeof (navigator as any).getInstalledRelatedApps === 'function') {
			(navigator as any)
				.getInstalledRelatedApps()
				.then((relatedApps: any[]) => {
					if (Array.isArray(relatedApps) && relatedApps.length > 0) {
						markAsInstalled();
					}
				})
				.catch(() => {});
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

			// If device was already detected as installed, NEVER set isInstalled to false!
			if (checkDeviceInstalled()) {
				update((s) => ({ ...s, canInstall: false, isInstalled: true }));
				return;
			}

			update((s) => ({ ...s, canInstall: true, isInstalled: false }));
		});

		// Listen for app installed event
		window.addEventListener('appinstalled', () => {
			deferredPrompt = null;
			markAsInstalled();
			console.log('[PWA] PyQuest was successfully installed on this device!');
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
		toggleIOSGuide,
		checkDeviceInstalled
	};
}

export const pwaStore = createPwaStore();
