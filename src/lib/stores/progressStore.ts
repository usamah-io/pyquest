import { writable } from 'svelte/store';
import type { UserProgress } from '../types';

const INITIAL_PROGRESS: UserProgress = {
	xp: 0,
	score: 0,
	currentModuleIndex: 0,
	completedQuestions: [],
	completedChallenges: [],
	completedLevels: [],
	completedLearningLevels: [],
	learningLevelScores: {},
	streak: 1
};

const STORAGE_KEY = 'pyquest_progress_v2';

function createProgressStore() {
	let initial = INITIAL_PROGRESS;

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				initial = {
					...INITIAL_PROGRESS,
					...parsed,
					completedLearningLevels: parsed.completedLearningLevels || [],
					learningLevelScores: parsed.learningLevelScores || {}
				};
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
				const existing = p.completedChallenges || [];
				if (existing.includes(challengeId)) {
					return p; // No duplicate XP on replay
				}
				isFirstCompletion = true;
				const safeGain = Math.max(0, Math.round(Number(xpGain)) || 0);
				const updated = {
					...p,
					xp: (Number(p.xp) || 0) + safeGain,
					score: (Number(p.score) || 0) + safeGain * 10,
					completedChallenges: [...existing, challengeId]
				};
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			});
			return isFirstCompletion;
		},
		completeLevel: (levelId: number, achievementXp = 0) => {
			let isFirstLevelCompletion = false;
			update((p) => {
				const existing = p.completedLevels || [];
				if (existing.includes(levelId)) return p;
				isFirstLevelCompletion = true;
				const safeBonus = Math.max(0, Math.round(Number(achievementXp)) || 0);
				const updated = {
					...p,
					xp: (Number(p.xp) || 0) + safeBonus,
					score: (Number(p.score) || 0) + safeBonus * 10,
					completedLevels: [...existing, levelId]
				};
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
					// On replay: update score if improved, but do not re-award bonus XP
					const updated = {
						...p,
						learningLevelScores: updatedScores
					};
					if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
					return updated;
				}

				const updated = {
					...p,
					xp: p.xp + bonusXp,
					score: p.score + bonusXp * 10,
					completedLearningLevels: [...existing, levelId],
					learningLevelScores: updatedScores
				};
				if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			});
			return isFirstCompletion;
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
