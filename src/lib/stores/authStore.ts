import { writable, derived } from 'svelte/store';
import { progressStore } from './progressStore';

export interface UserProfile {
	id: string;
	name: string;
	firstName: string;
	email?: string;
	avatar?: string;
	provider: 'google' | 'guest';
	createdAt: string;
	hasCompletedProfileSetup: boolean;
}

const DEFAULT_USER: UserProfile = {
	id: 'guest-1',
	name: 'Penjelajah Kode',
	firstName: 'Penjelajah',
	email: 'student@pyquest.dev',
	avatar: '/mascot/pybot-front-idle.png',
	provider: 'guest',
	createdAt: new Date().toISOString(),
	hasCompletedProfileSetup: true
};

const USER_STORAGE_KEY = 'pyquest_user_v3';
const CLIENT_ID_STORAGE_KEY = 'pyquest_google_client_id';

// Helper to decode Google JWT token
export function parseJwt(token: string) {
	try {
		const base64Url = token.split('.')[1];
		if (!base64Url) return null;
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		);
		return JSON.parse(jsonPayload);
	} catch (err) {
		console.error('Failed to parse Google JWT token:', err);
		return null;
	}
}

function createAuthStore() {
	let initialUser = DEFAULT_USER;
	let initialIsAuth = false;

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(USER_STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				initialUser = parsed.user || DEFAULT_USER;
				initialIsAuth = parsed.isAuthenticated ?? false;
			} catch {
				initialUser = DEFAULT_USER;
				initialIsAuth = false;
			}
		}
	}

	const state = writable<{
		isAuthenticated: boolean;
		user: UserProfile;
		isGoogleModalOpen: boolean;
	}>({
		isAuthenticated: initialIsAuth,
		user: initialUser,
		isGoogleModalOpen: false
	});

	function saveToStorage(user: UserProfile, isAuth: boolean) {
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				USER_STORAGE_KEY,
				JSON.stringify({ user, isAuthenticated: isAuth })
			);
		}
	}

	return {
		subscribe: state.subscribe,

		// Open Google OAuth / Sign In Modal
		openGoogleModal: () => {
			state.update((s) => ({ ...s, isGoogleModalOpen: true }));
		},

		closeGoogleModal: () => {
			state.update((s) => ({ ...s, isGoogleModalOpen: false }));
		},

		// Authenticate with Google ID Token credential
		loginWithGoogleCredential: (credential: string): { user: UserProfile; needsSetup: boolean } | null => {
			const payload = parseJwt(credential);
			if (!payload) return null;

			const googleId = payload.sub || String(Date.now());
			const googleName = payload.name || 'Siswa PyQuest';
			const googleEmail = payload.email || '';
			const googleAvatar = payload.picture || '/mascot/pybot-front-idle.png';

			// Check if this Google user has previously set up their profile
			let existingSetup = false;
			let currentName = googleName;
			let currentAvatar = googleAvatar;

			if (typeof window !== 'undefined') {
				const saved = localStorage.getItem(USER_STORAGE_KEY);
				if (saved) {
					try {
						const parsed = JSON.parse(saved);
						if (parsed.user && parsed.user.id === 'google-' + googleId) {
							existingSetup = parsed.user.hasCompletedProfileSetup === true;
							if (parsed.user.name) currentName = parsed.user.name;
							if (parsed.user.avatar) currentAvatar = parsed.user.avatar;
						}
					} catch {}
				}
			}

			const firstName = currentName.trim().split(' ')[0] || currentName;
			const user: UserProfile = {
				id: 'google-' + googleId,
				name: currentName,
				firstName,
				email: googleEmail,
				avatar: currentAvatar,
				provider: 'google',
				createdAt: new Date().toISOString(),
				hasCompletedProfileSetup: existingSetup
			};

			saveToStorage(user, true);
			state.update((s) => ({
				...s,
				isAuthenticated: true,
				user,
				isGoogleModalOpen: false
			}));

			return { user, needsSetup: !existingSetup };
		},

		// Update profile details (photo, username)
		updateProfile: (data: { name?: string; avatar?: string }) => {
			state.update((s) => {
				const trimmed = data.name !== undefined ? data.name.trim() : s.user.name;
				const firstName = trimmed.split(' ')[0] || trimmed;
				const updatedUser: UserProfile = {
					...s.user,
					name: trimmed,
					firstName,
					avatar: data.avatar !== undefined ? data.avatar : s.user.avatar
				};
				saveToStorage(updatedUser, s.isAuthenticated);
				return { ...s, user: updatedUser };
			});
		},

		// Complete first-time profile setup
		completeProfileSetup: (data: { name: string; avatar: string }) => {
			state.update((s) => {
				const trimmed = data.name.trim() || s.user.name;
				const firstName = trimmed.split(' ')[0] || trimmed;
				const updatedUser: UserProfile = {
					...s.user,
					name: trimmed,
					firstName,
					avatar: data.avatar || s.user.avatar,
					hasCompletedProfileSetup: true
				};
				saveToStorage(updatedUser, true);
				return { ...s, user: updatedUser };
			});
		},

		// Logout back to default guest profile
		logout: () => {
			saveToStorage(DEFAULT_USER, false);
			state.update((s) => ({
				...s,
				isAuthenticated: false,
				user: DEFAULT_USER,
				isGoogleModalOpen: false
			}));
		},

		// Client ID helper for dev/runtime configuration if not in .env
		getGoogleClientId: (): string => {
			const envId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
			if (envId && envId.trim().length > 0) return envId.trim();
			if (typeof window !== 'undefined') {
				return localStorage.getItem(CLIENT_ID_STORAGE_KEY) || '';
			}
			return '';
		},

		setGoogleClientId: (clientId: string) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId.trim());
			}
		}
	};
}

export const authStore = createAuthStore();

// Derived dynamic dashboard user view combining profile and progress
export const dashboardUserStore = derived(
	[authStore, progressStore],
	([$auth, $progress]) => {
		const level = Math.max(1, Math.floor($progress.xp / 100) + 1);
		return {
			...$auth.user,
			isAuthenticated: $auth.isAuthenticated,
			hasCompletedProfileSetup: $auth.user.hasCompletedProfileSetup,
			xp: $progress.xp,
			level,
			streak: $progress.streak || 1,
			completedMissions: $progress.completedChallenges.length,
			completedQuestions: $progress.completedQuestions.length
		};
	}
);
