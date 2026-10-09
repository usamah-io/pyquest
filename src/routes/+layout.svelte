<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { pwaStore } from '$lib/stores/pwaStore';
	import { themeStore } from '$lib/stores/themeStore';
	import Icon from '$lib/components/Icon.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		themeStore.init();
		pwaStore.init();

		// Service Worker handling
		if ('serviceWorker' in navigator) {
			if (import.meta.env.DEV) {
				// In development, unregister any active service worker to avoid stale asset caching
				navigator.serviceWorker.getRegistrations().then((registrations) => {
					for (const registration of registrations) {
						registration.unregister();
					}
				});
			} else {
				// In production, register Service Worker for offline PWA support
				navigator.serviceWorker
					.register('/service-worker.js')
					.then((registration) => {
						console.log('[SW] Registered successfully with scope:', registration.scope);
					})
					.catch((err) => {
						console.warn('[SW] Service worker registration error:', err);
					});
			}
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
</svelte:head>

<!-- Subtle Offline Notification Banner (Appears only when network disconnects) -->
{#if $pwaStore.isOffline}
	<div
		class="fixed top-2 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-amber-950/90 border border-amber-500/40 text-amber-200 text-xs font-bold shadow-xl backdrop-blur-md flex items-center gap-2 animate-fade-in"
	>
		<Icon name="wifi-off" size={15} class="text-amber-400 shrink-0" />
		<span>Koneksi sedang tidak tersedia. Mode offline aktif.</span>
	</div>
{/if}

{@render children()}
