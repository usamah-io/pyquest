import { writable, derived } from 'svelte/store';
import { progressStore, getLocalDateStr } from './progressStore';
import { avatarStorage } from '../utils/avatarStorage';

export interface UserProfile {
	id: string;
	googleSub?: string;
	name: string;
	firstName: string;
	email?: string;
	avatar?: string;
	provider: 'google' | 'guest';
	createdAt: string;
	hasCompletedProfileSetup: boolean;
}

const DEFAULT_GUEST_USER: UserProfile = {
	id: 'guest-1',
	name: 'Penjelajah Kode',
	firstName: 'Penjelajah',
	email: '',
	avatar: '/mascot/pybot-front-idle.png',
	provider: 'guest',
	createdAt: new Date().toISOString(),
	hasCompletedProfileSetup: false
};

const CURRENT_USER_KEY = 'pyquest_current_user_v4';
const USERS_REGISTRY_KEY = 'pyquest_users_registry_v4';
export const GOOGLE_CLIENT_ID_FALLBACK =
	'823254379418-71l1aq5ushc1u4j57eccdlvsl3m4rjgs.apps.googleusercontent.com';

export function getGoogleClientId(): string {
	const metaEnv = (import.meta as any).env;
	const envId = metaEnv?.PUBLIC_GOOGLE_CLIENT_ID || metaEnv?.VITE_GOOGLE_CLIENT_ID;
	if (envId && typeof envId === 'string' && envId.trim().length > 0) {
		return envId.trim();
	}
	return GOOGLE_CLIENT_ID_FALLBACK;
}

function loadInitialAuthState(): { user: UserProfile; isAuthenticated: boolean } {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(CURRENT_USER_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				if (parsed?.user && parsed.isAuthenticated) {
					return {
						user: parsed.user,
						isAuthenticated: true
					};
				}
			} catch {}
		}
	}
	return {
		user: DEFAULT_GUEST_USER,
		isAuthenticated: false
	};
}

function createAuthStore() {
	const initial = loadInitialAuthState();

	const state = writable<{
		isAuthenticated: boolean;
		user: UserProfile;
		isGoogleModalOpen: boolean;
		isLoading: boolean;
	}>({
		isAuthenticated: initial.isAuthenticated,
		user: initial.user,
		isGoogleModalOpen: false,
		isLoading: false
	});

	function saveCurrentSession(user: UserProfile, isAuth: boolean) {
		if (typeof window !== 'undefined') {
			if (isAuth) {
				localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ user, isAuthenticated: true }));
				// Update registry of persistent accounts
				try {
					const registryRaw = localStorage.getItem(USERS_REGISTRY_KEY);
					const registry: Record<string, UserProfile> = registryRaw ? JSON.parse(registryRaw) : {};
					registry[user.id] = user;
					localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(registry));
				} catch {}
			} else {
				localStorage.removeItem(CURRENT_USER_KEY);
			}
		}
	}

	return {
		subscribe: state.subscribe,

		// Open / Close Google Auth Modal if used
		openGoogleModal: () => {
			state.update((s) => ({ ...s, isGoogleModalOpen: true }));
		},

		closeGoogleModal: () => {
			state.update((s) => ({ ...s, isGoogleModalOpen: false }));
		},

		// Client ID getter (always returns verified Developer configuration, never prompts user)
		getGoogleClientId,

		// Initialize & verify session with backend on startup
		initAuth: async () => {
			if (typeof window === 'undefined') return;

			// Initialize user-keyed progress if already authenticated in localStorage
			const initial = loadInitialAuthState();
			if (initial.isAuthenticated && initial.user?.id) {
				progressStore.loadForUser(initial.user.id);
			}

			// Load persistent avatar from IndexedDB if stored
			if (initial.user?.id) {
				try {
					const idbAvatar = await avatarStorage.getAvatar(initial.user.id);
					if (idbAvatar) {
						state.update((s) => ({
							...s,
							user: { ...s.user, avatar: idbAvatar }
						}));
					}
				} catch {}
			}

			// Validate with backend session cookie
			try {
				const res = await fetch('/api/auth/session');
				if (res.ok) {
					const data = await res.json();
					if (data.authenticated && data.user) {
						// Session valid on server
						const verified = data.user;
						let userProfile: UserProfile;

						// Check local registry for saved display name / avatar preferences
						const registryRaw = localStorage.getItem(USERS_REGISTRY_KEY);
						const registry: Record<string, UserProfile> = registryRaw ? JSON.parse(registryRaw) : {};
						const existing = registry[verified.id];

						// Check persistent avatar in IndexedDB
						let avatarUrl = existing?.avatar || verified.avatar;
						try {
							const idbAvatar = await avatarStorage.getAvatar(verified.id);
							if (idbAvatar) {
								avatarUrl = idbAvatar;
							}
						} catch {}

						if (existing) {
							userProfile = {
								...verified,
								name: existing.name || verified.name,
								firstName: existing.firstName || verified.firstName,
								avatar: avatarUrl,
								hasCompletedProfileSetup: existing.hasCompletedProfileSetup
							};
						} else {
							userProfile = {
								...verified,
								avatar: avatarUrl,
								hasCompletedProfileSetup: false
							};
						}

						saveCurrentSession(userProfile, true);
						progressStore.loadForUser(userProfile.id);

						state.update((s) => ({
							...s,
							isAuthenticated: true,
							user: userProfile
						}));
					}
				}
			} catch (err) {
				console.warn('Session check warning:', err);
			}
		},

		// Real Google Credential Login flow (sent to server verification)
		loginWithGoogleCredential: async (
			credential: string
		): Promise<{ success: boolean; user?: UserProfile; needsSetup?: boolean; error?: string }> => {
			state.update((s) => ({ ...s, isLoading: true }));

			try {
				const res = await fetch('/api/auth/google', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ credential })
				});

				if (!res.ok) {
					const errBody = await res.json().catch(() => ({}));
					state.update((s) => ({ ...s, isLoading: false }));
					return {
						success: false,
						error: errBody.error || 'Login Google gagal. Coba lagi.'
					};
				}

				const { user: verifiedUser } = await res.json();

				// Check persistent registry for returning user
				let existingProfile: UserProfile | null = null;
				if (typeof window !== 'undefined') {
					const registryRaw = localStorage.getItem(USERS_REGISTRY_KEY);
					if (registryRaw) {
						try {
							const registry = JSON.parse(registryRaw);
							existingProfile = registry[verifiedUser.id] || null;
						} catch {}
					}
				}

				let finalUser: UserProfile;
				let needsSetup = false;

				if (existingProfile && existingProfile.hasCompletedProfileSetup) {
					// Returning user with completed profile setup
					finalUser = {
						...verifiedUser,
						name: existingProfile.name || verifiedUser.name,
						firstName: existingProfile.firstName || verifiedUser.firstName,
						avatar: existingProfile.avatar || verifiedUser.avatar,
						hasCompletedProfileSetup: true
					};
					needsSetup = false;
				} else {
					// New user or incomplete profile setup
					finalUser = {
						...verifiedUser,
						hasCompletedProfileSetup: false
					};
					needsSetup = true;
				}

				saveCurrentSession(finalUser, true);
				progressStore.loadForUser(finalUser.id);

				state.update((s) => ({
					...s,
					isAuthenticated: true,
					user: finalUser,
					isGoogleModalOpen: false,
					isLoading: false
				}));

				return {
					success: true,
					user: finalUser,
					needsSetup
				};
			} catch (err) {
				console.error('Login request error:', err);
				state.update((s) => ({ ...s, isLoading: false }));
				return {
					success: false,
					error: 'Koneksi bermasalah. Coba lagi.'
				};
			}
		},

		// Complete first-time profile setup
		completeProfileSetup: (data: { name: string; avatar: string }): UserProfile => {
			let updatedUser: UserProfile = DEFAULT_GUEST_USER;

			state.update((s) => {
				const trimmed = data.name.trim() || s.user.name;
				const firstName = trimmed.split(' ')[0] || trimmed;
				updatedUser = {
					...s.user,
					name: trimmed,
					firstName,
					avatar: data.avatar || s.user.avatar,
					hasCompletedProfileSetup: true
				};

				saveCurrentSession(updatedUser, true);
				return {
					...s,
					user: updatedUser
				};
			});

			return updatedUser;
		},

		// Update profile details from Profile page
		updateProfile: (data: { name?: string; avatar?: string }): UserProfile => {
			let updatedUser: UserProfile = DEFAULT_GUEST_USER;

			state.update((s) => {
				const trimmed = data.name !== undefined ? data.name.trim() : s.user.name;
				const firstName = trimmed.split(' ')[0] || trimmed;
				updatedUser = {
					...s.user,
					name: trimmed,
					firstName,
					avatar: data.avatar !== undefined ? data.avatar : s.user.avatar
				};

				saveCurrentSession(updatedUser, s.isAuthenticated);
				return {
					...s,
					user: updatedUser
				};
			});

			return updatedUser;
		},

		// Logout back to unauthenticated / login screen
		logout: async () => {
			try {
				await fetch('/api/auth/logout', { method: 'POST' });
			} catch {}

			saveCurrentSession(DEFAULT_GUEST_USER, false);
			progressStore.loadForUser('guest-1');

			state.update((s) => ({
				...s,
				isAuthenticated: false,
				user: DEFAULT_GUEST_USER,
				isGoogleModalOpen: false,
				isLoading: false
			}));
		}
	};
}

export const authStore = createAuthStore();

// Derived dynamic dashboard user view combining profile and progress
export const dashboardUserStore = derived(
	[authStore, progressStore],
	([$auth, $progress]) => {
		const level = Math.max(1, Math.floor(($progress.xp || 0) / 100) + 1);
		const today = getLocalDateStr();
		const isStreakActiveToday = $progress.lastActiveDate === today;
		const streak = $progress.streak ?? 0;
		const longestStreak = $progress.longestStreak ?? streak;
		return {
			...$auth.user,
			isAuthenticated: $auth.isAuthenticated,
			hasCompletedProfileSetup: $auth.user.hasCompletedProfileSetup,
			xp: $progress.xp || 0,
			level,
			streak,
			longestStreak,
			lastActiveDate: $progress.lastActiveDate,
			activeDates: $progress.activeDates || [],
			isStreakActiveToday,
			completedMissions: ($progress.completedChallenges || []).length,
			completedQuestions: ($progress.completedQuestions || []).length
		};
	}
);
