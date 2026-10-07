// PyQuest Domain Types

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export interface GridCoord {
	x: number;
	y: number;
}

export type BlockType = 'MOVE' | 'TURN_LEFT' | 'TURN_RIGHT' | 'REPEAT' | 'FOREVER';

export interface CodingBlock {
	id: string;
	type: BlockType;
	repeatCount?: number;
	children?: CodingBlock[];
}

export type QuestionType =
	| 'output-prediction'
	| 'concept'
	| 'code-reading'
	| 'choose-code'
	| 'find-error'
	| 'condition-logic'
	| 'syntax'
	| 'type-understanding';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'challenge';

export interface QuestionOption {
	id: string;
	text: string;
	explanation?: string;
}

export interface Question {
	id: string;
	level: number;
	topic: string;
	difficulty: QuestionDifficulty;
	type: QuestionType;
	question: string;
	code?: string;
	codeSnippet?: string; // backward compatibility
	options: QuestionOption[];
	correctAnswer: string;
	correctAnswerId: string; // stable ID matching options[].id
	explanation: string;
	hints: string[];
	xp: number;
}

export interface LevelAchievement {
	id: string;
	levelId: number;
	title: string;
	description: string;
	icon: string;
	xpReward: number;
}

export interface LearningLevel {
	id: number;
	unitId?: number;
	unitTitle?: string;
	title: string;
	topic: string;
	description: string;
	objective?: string;
	quickTip?: string;
	concepts?: string[];
	concept: string;
	achievement?: LevelAchievement;
	difficulty: QuestionDifficulty;
	questionIds: string[];
	xpReward: number;
}

export interface ChallengeGrid {
	cols: number;
	rows: number;
	startPos: GridCoord;
	startDirection: Direction;
	targetPos: GridCoord;
	obstacles: GridCoord[];
	coins?: GridCoord[];
}

export interface Challenge {
	id: string;
	title: string;
	topic?: string;
	objective: string;
	pythonContext: string;
	grid: ChallengeGrid;
	availableBlocks: BlockType[];
	maxBlocks?: number;
	maxMoves?: number;
	xpReward: number;
	xp?: number;
	hints: string[];
	concept?: string;
	canonicalCommands?: ('MOVE' | 'TURN_LEFT' | 'TURN_RIGHT')[];
}

export interface GameLevel {
	id: number;
	unitId?: number;
	unitTitle?: string;
	title: string;
	description: string;
	objective?: string;
	quickTip?: string;
	concepts?: string[];
	concept: string;
	achievement?: LevelAchievement;
	difficulty: 1 | 2 | 3 | 4 | 5;
	challenges: Challenge[];
}

export type GameStatus = 'IDLE' | 'READY' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'OUT_OF_BOUNDS';

export interface GameExecutionState {
	playerPos: GridCoord;
	playerDirection: Direction;
	collectedCoins: GridCoord[];
	currentStepIndex: number;
	totalSteps: number;
	status: GameStatus;
	message: string;
}

export interface UserProgress {
	xp: number;
	score: number;
	currentModuleIndex: number;
	completedQuestions: string[];
	completedChallenges: string[];
	completedLevels: number[]; // Coding game levels
	completedLearningLevels: number[]; // Learning module levels
	learningLevelScores?: Record<number, { correctAnswers: number; totalQuestions: number; isPerfect: boolean }>;
	streak: number;
}

export type AppScreen =
	| 'LOGIN'
	| 'LANDING'
	| 'LEARN_SELECT'
	| 'QUESTION'
	| 'FEEDBACK'
	| 'LEARN_SUCCESS'
	| 'LEVEL_SELECT'
	| 'MISSION_BRIEFING'
	| 'CHALLENGE'
	| 'REWARD'
	| 'SUMMARY'
	| 'PROFILE_SETUP'
	| 'PROFILE';

