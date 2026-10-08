import { writable } from 'svelte/store';
import type { UserProgress } from '../types';

export function getLocalDateStr(date: Date = new Date()): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function getYesterdayDateStr(date: Date = new Date()): string {
	const yesterday = new Date(date);
	yesterday.setDate(yesterday.getDate() - 1);
	return getLocalDateStr(yesterday);
}

const INITIAL_PROGRESS: UserProgress = {
	xp: 0,
	score: 0,
	currentModuleIndex: 0,
	completedQuestions: [],
	completedChallenges: [],
	completedLevels: [],
	completedLearningLevels: [],
	learningLevelScores: {},
	streak: 0,
	longestStreak: 0,
	lastActiveDate: undefined,
	activeDates: []
};

// Activity-based streak processor
function recordActivity(p: UserProgress): UserProgress {
	const today = getLocalDateStr();
	const yesterday = getYesterdayDateStr();
	const activeDatesSet = new Set(p.activeDates || []);
	activeDatesSet.add(today);

	let newStreak: number;
	if (p.lastActiveDate === today) {
		// Already active today, maintain active streak
		newStreak = Math.max(1, p.streak || 1);
	} else if (p.lastActiveDate === yesterday) {
		// Active yesterday, consecutive streak increases
		newStreak = (p.streak || 0) + 1;
	} else {
		// Inactive yesterday or brand new -> streak starts fresh at 1
		newStreak = 1;
	}

	const newLongest = Math.max(p.longestStreak || 0, newStreak);

	return {
		...p,
		streak: newStreak,
		longestStreak: newLongest,
		lastActiveDate: today,
		activeDates: Array.from(activeDatesSet).sort()
	};
}

// Inactivity check: if user missed yesterday and has not played today, streak drops to 0
function evaluateStreakExpiry(p: UserProgress): UserProgress {
	const today = getLocalDateStr();
	const yesterday = getYesterdayDateStr();

	// Migration / seed: if user has historical completed challenges but no lastActiveDate, seed today
	if (!p.lastActiveDate) {
		const hasActivity =
			(p.completedChallenges && p.completedChallenges.length > 0) ||
			(p.completedLearningLevels && p.completedLearningLevels.length > 0) ||
			(p.completedQuestions && p.completedQuestions.length > 0);
		if (hasActivity) {
			const activeDates = p.activeDates?.length ? p.activeDates : [today];
			const streakVal = p.streak ?? 1;
			return {
				...p,
				streak: streakVal,
				longestStreak: Math.max(p.longestStreak || 0, streakVal),
				lastActiveDate: today,
				activeDates
			};
		}
		return {
			...p,
			streak: 0,
			longestStreak: p.longestStreak || 0,
			activeDates: p.activeDates || []
		};
	}

	// If last active date is neither today nor yesterday, the streak is DEAD (0)
	if (p.lastActiveDate !== today && p.lastActiveDate !== yesterday) {
		return {
			...p,
			streak: 0
		};
	}

	return p;
}

const STORAGE_KEY = 'pyquest_progress_v2';
let currentStorageKey = STORAGE_KEY;
const userProgressCache: Record<string, UserProgress> = {};

function getStorageKey(userId?: string): string {
	if (!userId || userId === 'guest-1') return STORAGE_KEY;
	return `${STORAGE_KEY}_${userId}`;
}

function saveProgressToStorage(data: UserProgress) {
	userProgressCache[currentStorageKey] = data;
	if (typeof window !== 'undefined') {
		localStorage.setItem(currentStorageKey, JSON.stringify(data));
		if (currentStorageKey !== STORAGE_KEY) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	}
}

function createProgressStore() {
	let initial = INITIAL_PROGRESS;

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				initial = evaluateStreakExpiry({
					...INITIAL_PROGRESS,
					...parsed,
					completedLearningLevels: parsed.completedLearningLevels || [],
					learningLevelScores: parsed.learningLevelScores || {},
					activeDates: parsed.activeDates || []
				});
			} catch {
				initial = INITIAL_PROGRESS;
			}
		}
	}

	const { subscribe, set, update } = writable<UserProgress>(initial);

	return {
		subscribe,
		loadForUser: (userId?: string) => {
			currentStorageKey = getStorageKey(userId);
			let loaded = INITIAL_PROGRESS;
			if (typeof window !== 'undefined') {
				let saved = localStorage.getItem(currentStorageKey);
				if (!saved && currentStorageKey !== STORAGE_KEY) {
					saved = localStorage.getItem(STORAGE_KEY);
					if (saved) {
						localStorage.setItem(currentStorageKey, saved);
					}
				}
				if (saved) {
					try {
						const parsed = JSON.parse(saved);
						loaded = evaluateStreakExpiry({
							...INITIAL_PROGRESS,
							...parsed,
							completedLearningLevels: parsed.completedLearningLevels || [],
							learningLevelScores: parsed.learningLevelScores || {},
							activeDates: parsed.activeDates || []
						});
					} catch {
						loaded = INITIAL_PROGRESS;
					}
				}
			} else if (userProgressCache[currentStorageKey]) {
				loaded = evaluateStreakExpiry(userProgressCache[currentStorageKey]);
			}
			set(loaded);
		},
		addXp: (amount: number) => {
			update((p) => {
				const updated = recordActivity({ ...p, xp: p.xp + amount, score: p.score + amount * 10 });
				saveProgressToStorage(updated);
				return updated;
			});
		},
		completeQuestion: (questionId: string, xpGain = 15) => {
			let rewarded = false;
			update((p) => {
				if (p.completedQuestions.includes(questionId)) {
					const touched = recordActivity(p);
					saveProgressToStorage(touched);
					return touched;
				}
				rewarded = true;
				const updated = recordActivity({
					...p,
					xp: p.xp + xpGain,
					score: p.score + xpGain * 10,
					completedQuestions: [...p.completedQuestions, questionId]
				});
				saveProgressToStorage(updated);
				return updated;
			});
			return rewarded;
		},
		completeChallenge: (challengeId: string, xpGain = 35) => {
			let isFirstCompletion = false;
			update((p) => {
				const existing = p.completedChallenges || [];
				if (existing.includes(challengeId)) {
					const touched = recordActivity(p);
					saveProgressToStorage(touched);
					return touched;
				}
				isFirstCompletion = true;
				const safeGain = Math.max(0, Math.round(Number(xpGain)) || 0);
				const updated = recordActivity({
					...p,
					xp: (Number(p.xp) || 0) + safeGain,
					score: (Number(p.score) || 0) + safeGain * 10,
					completedChallenges: [...existing, challengeId]
				});
				saveProgressToStorage(updated);
				return updated;
			});
			return isFirstCompletion;
		},
		completeLevel: (levelId: number, achievementXp = 0) => {
			let isFirstLevelCompletion = false;
			update((p) => {
				const existing = p.completedLevels || [];
				if (existing.includes(levelId)) {
					const touched = recordActivity(p);
					saveProgressToStorage(touched);
					return touched;
				}
				isFirstLevelCompletion = true;
				const safeBonus = Math.max(0, Math.round(Number(achievementXp)) || 0);
				const updated = recordActivity({
					...p,
					xp: (Number(p.xp) || 0) + safeBonus,
					score: (Number(p.score) || 0) + safeBonus * 10,
					completedLevels: [...existing, levelId]
				});
				saveProgressToStorage(updated);
				return updated;
			});
			return isFirstLevelCompletion;
		},
		completeLearningLevel: (
			levelId: number,
			bonusXp = 50,
			stats?: { correctAnswers: number; totalQuestions: number; isPerfect: boolean }
		) => {
			let isFirstCompletion = false;
			update((p) => {
				const existing = p.completedLearningLevels || [];
				isFirstCompletion = !existing.includes(levelId);

				const updatedScores = {
					...(p.learningLevelScores || {})
				};
				if (stats) {
					const prevScore = updatedScores[levelId];
					if (!prevScore || stats.correctAnswers >= prevScore.correctAnswers) {
						updatedScores[levelId] = stats;
					}
				}

				if (!isFirstCompletion) {
					const updated = recordActivity({
						...p,
						learningLevelScores: updatedScores
					});
					saveProgressToStorage(updated);
					return updated;
				}

				const updated = recordActivity({
					...p,
					xp: p.xp + bonusXp,
					score: p.score + bonusXp * 10,
					completedLearningLevels: [...existing, levelId],
					learningLevelScores: updatedScores
				});
				saveProgressToStorage(updated);
				return updated;
			});
			return isFirstCompletion;
		},
		nextModule: () => {
			update((p) => {
				const updated = { ...p, currentModuleIndex: p.currentModuleIndex + 1 };
				saveProgressToStorage(updated);
				return updated;
			});
		},
		refreshStreak: () => {
			update((p) => {
				const updated = evaluateStreakExpiry(p);
				if (updated.streak !== p.streak) {
					saveProgressToStorage(updated);
				}
				return updated;
			});
		},
		reset: () => {
			delete userProgressCache[currentStorageKey];
			delete userProgressCache[STORAGE_KEY];
			if (typeof window !== 'undefined') {
				localStorage.removeItem(currentStorageKey);
				localStorage.removeItem(STORAGE_KEY);
			}
			set(INITIAL_PROGRESS);
		}
	};
}

export const progressStore = createProgressStore();
