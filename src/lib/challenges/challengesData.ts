import { levelsData } from './levelsData';
import type { Challenge } from '../types';

// Flattened list of all challenges across all 10 levels for lookup or sequential index
export const challengesData: Challenge[] = levelsData.flatMap((lvl) =>
	lvl.challenges.map((ch) => ({
		...ch,
		xp: ch.xpReward,
		topic: lvl.title,
		concept: lvl.concept
	}))
);

export { levelsData };
