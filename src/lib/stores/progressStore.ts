import { writable } from 'svelte/store';
import type { UserProgress } from '../types';

const INITIAL_PROGRESS: UserProgress = {
	xp: 0,
	score: 0,
	currentModuleIndex: 0,
	completedQuestions: [],
	completedChallenges: [],
	completedLevels: [],
	streak: 1
};

const STORAGE_KEY = 'pyquest_progress_v2';

function createProgressStore() {
	let initial = INITIAL_PROGRESS;

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				initial = { ...INITIAL_PROGRESS, ...JSON.parse(saved) };
			} catch {
				initial = INITIAL_PROGRESS;
			}
		}
	}

	const { subscribe, set, update } = writable<UserProgress>(initial);

	return {
		subscribe,
		addXp: (amount: number) => {
			update((p) => {
				const updated = { ...p, xp: p.xp + amount, score: p.score + amount * 10 };
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			});
		},
		completeQuestion: (questionId: string, xpGain = 15) => {
			let rewarded = false;
			update((p) => {
				if (p.completedQuestions.includes(questionId)) {
					return p;
				}
				rewarded = true;
				const updated = {
					...p,
					xp: p.xp + xpGain,
					score: p.score + xpGain * 10,
					completedQuestions: [...p.completedQuestions, questionId]
				};
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			});
			return rewarded;
		},
		completeChallenge: (challengeId: string, xpGain = 35) => {
			let isFirstCompletion = false;
			update((p) => {
				if (p.completedChallenges.includes(challengeId)) {
					return p; // No duplicate XP on replay
				}
				isFirstCompletion = true;
				const updated = {
					...p,
					xp: p.xp + xpGain,
					score: p.score + xpGain * 10,
					completedChallenges: [...p.completedChallenges, challengeId]
				};
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			});
			return isFirstCompletion;
		},
		completeLevel: (levelId: number) => {
			update((p) => {
				if (p.completedLevels && p.completedLevels.includes(levelId)) return p;
				const updated = {
					...p,
					completedLevels: [...(p.completedLevels || []), levelId]
				};
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			});
		},
		nextModule: () => {
			update((p) => {
				const updated = { ...p, currentModuleIndex: p.currentModuleIndex + 1 };
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			});
		},
		reset: () => {
			if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
			set(INITIAL_PROGRESS);
		}
	};
}

export const progressStore = createProgressStore();
