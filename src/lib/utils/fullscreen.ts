/**
 * PyQuest Fullscreen Utility
 * Provides cross-browser, safe, and resilient fullscreen controls.
 */

export function isFullscreenActive(): boolean {
	if (typeof document === 'undefined') return false;
	return Boolean(
		document.fullscreenElement ||
		(document as any).webkitFullscreenElement ||
		(document as any).mozFullScreenElement ||
		(document as any).msFullscreenElement
	);
}

export async function requestAppFullscreen(): Promise<boolean> {
	if (typeof document === 'undefined') return false;
	if (isFullscreenActive()) return true;

	const elem = document.documentElement as any;
	try {
		if (elem.requestFullscreen) {
			await elem.requestFullscreen();
			return true;
		} else if (elem.webkitRequestFullscreen) {
			await elem.webkitRequestFullscreen();
			return true;
		} else if (elem.mozRequestFullScreen) {
			await elem.mozRequestFullScreen();
			return true;
		} else if (elem.msRequestFullscreen) {
			await elem.msRequestFullscreen();
			return true;
		}
	} catch (err) {
		// Browser might deny if not called inside user gesture or if blocked by iframe permissions
		console.warn('[PyQuest] Fullscreen request was not permitted:', err);
		return false;
	}
	return false;
}

export async function exitAppFullscreen(): Promise<boolean> {
	if (typeof document === 'undefined') return false;
	if (!isFullscreenActive()) return true;

	const doc = document as any;
	try {
		if (doc.exitFullscreen) {
			await doc.exitFullscreen();
			return true;
		} else if (doc.webkitExitFullscreen) {
			await doc.webkitExitFullscreen();
			return true;
		} else if (doc.mozCancelFullScreen) {
			await doc.mozCancelFullScreen();
			return true;
		} else if (doc.msExitFullscreen) {
			await doc.msExitFullscreen();
			return true;
		}
	} catch (err) {
		console.warn('[PyQuest] Fullscreen exit encountered an error:', err);
		return false;
	}
	return false;
}
