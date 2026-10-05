// PyQuest Domain Types

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export interface GridCoord {
	x: number;
	y: number;
}

export type BlockType = 'MOVE' | 'TURN_LEFT' | 'TURN_RIGHT' | 'REPEAT';

export interface CodingBlock {
	id: string;
	type: BlockType;
	repeatCount?: number; // for REPEAT block
	children?: CodingBlock[]; // inner blocks for REPEAT
}

export interface Question {
	id: string;
	topic: string;
	difficulty: 1 | 2 | 3;
	question: string;
	code?: string;
	codeSnippet?: string; // backward compatibility
	options: {
		id: string;
		text: string;
		explanation?: string;
	}[];
	correctAnswer: string;
	correctAnswerId: string; // stable ID matching options[].id
	explanation: string;
	hints?: string[];
	xp: number;
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
}

export interface GameLevel {
	id: number;
	title: string;
	description: string;
	concept: string;
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
	completedLevels: number[];
	streak: number;
}

export type AppScreen =
	| 'LANDING'
	| 'QUESTION'
	| 'FEEDBACK'
	| 'LEVEL_SELECT'
	| 'CHALLENGE'
	| 'REWARD'
	| 'LEVEL_SUCCESS'
	| 'SUMMARY';
