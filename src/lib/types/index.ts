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
	type: 'multiple-choice' | 'predict-output';
	question: string;
	codeSnippet?: string;
	options: {
		id: string;
		text: string;
		explanation?: string;
	}[];
	correctAnswerId: string;
	explanation: string;
	hints: string[];
	difficulty: 1 | 2 | 3;
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
	topic: string;
	objective: string;
	pythonContext: string; // Shows how this maps to Python code (e.g. hero.move(), for i in range(3):)
	grid: ChallengeGrid;
	availableBlocks: BlockType[];
	maxBlocks?: number;
	xpReward: number;
	hints: string[];
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
	streak: number;
}

export type AppScreen = 'LANDING' | 'QUESTION' | 'FEEDBACK' | 'CHALLENGE' | 'REWARD' | 'SUMMARY';
