/**
 * Google Identity Services (GIS) Resilient Loader & Helper
 */

export function isGoogleGisAvailable(): boolean {
	return typeof window !== 'undefined' && !!(window as any).google?.accounts?.id;
}

export function loadGoogleGis(): Promise<boolean> {
	if (typeof window === 'undefined') return Promise.resolve(false);
	if (isGoogleGisAvailable()) return Promise.resolve(true);

	return new Promise((resolve) => {
		let script = document.querySelector(
			'script[src*="accounts.google.com/gsi/client"]'
		) as HTMLScriptElement | null;

		if (!script) {
			script = document.createElement('script');
			script.src = 'https://accounts.google.com/gsi/client';
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);
		}

		let attempts = 0;
		const maxAttempts = 60; // 6 seconds polling
		const timer = setInterval(() => {
			attempts++;
			if (isGoogleGisAvailable()) {
				clearInterval(timer);
				resolve(true);
			} else if (attempts >= maxAttempts) {
				clearInterval(timer);
				resolve(isGoogleGisAvailable());
			}
		}, 100);

		script.addEventListener('load', () => {
			if (isGoogleGisAvailable()) {
				clearInterval(timer);
				resolve(true);
			}
		});

		script.addEventListener('error', () => {
			clearInterval(timer);
			resolve(false);
		});
	});
}
