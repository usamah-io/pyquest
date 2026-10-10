/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { immutable, assets, prerendered } from '$app/manifest';
import { version } from '$app/env';
import { resolve } from '$app/paths';

const CACHE_NAME = `pyquest-v${version}`;

// Assets to precache: lightweight application shell and built immutable chunks only.
// Heavy media and art are cached on-demand at runtime to prevent mobile network starvation.
const PRECACHE_ASSETS = [
	resolve('/'),
	resolve('/manifest.webmanifest'),
	resolve('/manifest.json'),
	resolve('/favicon.svg'),
	resolve('/favicon.ico'),
	resolve('/apple-touch-icon.png'),
	...immutable,
	...assets.filter(
		(file) =>
			!file.includes('.DS_Store') &&
			!file.includes('robots.txt') &&
			!file.startsWith('/art/') &&
			!file.startsWith('/mascot/')
	),
	...prerendered
];

// URLs that must NEVER be cached (authentication, dynamic APIs)
function isExemptFromCache(url) {
	const href = url.href;
	if (
		href.includes('accounts.google.com') ||
		href.includes('apis.google.com') ||
		href.includes('oauth') ||
		href.includes('gstatic.com') ||
		href.includes('/api/auth')
	) {
		return true;
	}
	if (!url.protocol.startsWith('http')) {
		return true;
	}
	return false;
}

// Install Event: Precache application shell and static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				return Promise.allSettled(
					PRECACHE_ASSETS.map((asset) =>
						cache.add(asset).catch((err) => {
							console.warn(`[SW] Precache skipped for ${asset}:`, err);
						})
					)
				);
			})
	);
});

// Activate Event: Clean up stale caches from previous versions
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => {
				return Promise.all(
					keys.map((key) => {
						if (key !== CACHE_NAME && key.startsWith('pyquest-')) {
							console.log('[SW] Deleting old cache:', key);
							return caches.delete(key);
						}
					})
				);
			})
			.then(() => {
				return self.clients.claim();
			})
	);
});

// Fetch Event: Smart caching strategies
self.addEventListener('fetch', (event) => {
	const request = event.request;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);

	// Guard: Never cache authentication or dynamic external APIs
	if (isExemptFromCache(url)) {
		return;
	}

	// 1. Navigation requests (Page loading / App shell)
	// Strategy: Network-first with fallback to cached app shell '/'
	if (request.mode === 'navigate') {
		event.respondWith(
			fetch(request)
				.then((networkResponse) => {
					if (networkResponse && networkResponse.status === 200) {
						const responseToCache = networkResponse.clone();
						caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
					}
					return networkResponse;
				})
				.catch(async () => {
					// Offline fallback to cached app shell
					const cache = await caches.open(CACHE_NAME);
					const cachedIndex = (await cache.match(request)) || (await cache.match('/'));
					if (cachedIndex) return cachedIndex;

					return new Response(
						`<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"/><title>PyQuest Offline</title><style>body{background:#020617;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;padding:20px;}</style></head><body><div><h2>Koneksi sedang tidak tersedia</h2><p>Buka kembali saat terhubung ke internet untuk melanjutkan petualangan PyQuest.</p></div></body></html>`,
						{
							status: 503,
							headers: { 'Content-Type': 'text/html; charset=utf-8' }
						}
					);
				})
		);
		return;
	}

	// 2. Static Assets (Hashed Vite builds, static images, icons, manifest)
	// Strategy: Cache-first with background network revalidation
	const isStaticAsset =
		url.origin === self.location.origin &&
		(url.pathname.startsWith('/_app/') ||
			url.pathname.startsWith('/icons/') ||
			url.pathname.startsWith('/art/') ||
			url.pathname.startsWith('/mascot/') ||
			url.pathname === '/manifest.webmanifest' ||
			url.pathname === '/manifest.json' ||
			url.pathname === '/favicon.svg' ||
			url.pathname === '/favicon.ico');

	if (isStaticAsset) {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) {
					fetch(request)
						.then((networkResponse) => {
							if (networkResponse && networkResponse.status === 200) {
								caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
							}
						})
						.catch(() => {});
					return cachedResponse;
				}

				return fetch(request)
					.then((networkResponse) => {
						if (networkResponse && networkResponse.status === 200) {
							const responseClone = networkResponse.clone();
							caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
						}
						return networkResponse;
					})
					.catch(async () => {
						const fallback = await caches.match(request);
						if (fallback) return fallback;
						return new Response(null, { status: 404, statusText: 'Asset not found' });
					});
			})
		);
		return;
	}

	// 3. Other requests: Network with cache fallback
	event.respondWith(
		fetch(request).catch(async () => {
			const cached = await caches.match(request);
			if (cached) return cached;
			return new Response(null, { status: 504, statusText: 'Gateway Timeout' });
		})
	);
});

// Message listener for controlled updates
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
