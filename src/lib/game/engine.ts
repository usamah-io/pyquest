import type { Direction, GridCoord, ChallengeGrid } from '../types';
import type { AtomicCommand } from './compiler';

export const DIRECTION_ORDER: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

export function turnLeft(dir: Direction): Direction {
	const idx = DIRECTION_ORDER.indexOf(dir);
	return DIRECTION_ORDER[(idx + 3) % 4];
}

export function turnRight(dir: Direction): Direction {
	const idx = DIRECTION_ORDER.indexOf(dir);
	return DIRECTION_ORDER[(idx + 1) % 4];
}

export function getNextCoord(pos: GridCoord, dir: Direction): GridCoord {
	switch (dir) {
		case 'UP':
			return { x: pos.x, y: pos.y - 1 };
		case 'RIGHT':
			return { x: pos.x + 1, y: pos.y };
		case 'DOWN':
			return { x: pos.x, y: pos.y + 1 };
		case 'LEFT':
			return { x: pos.x - 1, y: pos.y };
	}
}

export function isCoordEqual(a: GridCoord, b: GridCoord): boolean {
	return a.x === b.x && a.y === b.y;
}

export function isOutOfBounds(pos: GridCoord, grid: ChallengeGrid): boolean {
	return pos.x < 0 || pos.x >= grid.cols || pos.y < 0 || pos.y >= grid.rows;
}

export function isObstacle(pos: GridCoord, grid: ChallengeGrid): boolean {
	return grid.obstacles.some((obs) => isCoordEqual(obs, pos));
}

export interface SimulationStep {
	playerPos: GridCoord;
	playerDirection: Direction;
	collectedCoins: GridCoord[];
	command: AtomicCommand | 'INIT';
	status: 'RUNNING' | 'SUCCESS' | 'FAILED' | 'OUT_OF_BOUNDS';
	message: string;
}

export interface SimulationOptions {
	maxMoves?: number;
	maxActions?: number;
}

/**
 * Runs a deterministic simulation of commands over the grid with strict termination conditions:
 * 1. Target reached -> SUCCESS & STOP immediately
 * 2. Obstacle collision -> FAILED & STOP immediately
 * 3. Out of bounds -> OUT_OF_BOUNDS & STOP immediately
 * 4. maxMoves limit reached on MOVE action -> FAILED & STOP (only actual moves consume movement energy)
 * 5. maxActions safety limit reached -> FAILED & STOP immediately (no infinite loops)
 * 6. All commands finished without target -> FAILED & STOP
 */
export function simulateCommands(
	grid: ChallengeGrid,
	commands: AtomicCommand[],
	maxMovesOrOptions: number | SimulationOptions = 30
): SimulationStep[] {
	let maxMoves: number;
	let maxActions: number;

	if (typeof maxMovesOrOptions === 'object' && maxMovesOrOptions !== null) {
		maxMoves = maxMovesOrOptions.maxMoves ?? 30;
		maxActions = maxMovesOrOptions.maxActions ?? 150;
	} else {
		// When called as a number:
		// If commands contain MOVE commands, maxMovesOrOptions represents the move quota
		// If commands contain only turns (e.g. infinite turn loop test), it represents maxActions
		const hasMoves = commands.some((c) => c === 'MOVE');
		if (hasMoves) {
			maxMoves = maxMovesOrOptions;
			maxActions = Math.max(120, maxMoves * 15);
		} else {
			maxMoves = maxMovesOrOptions;
			maxActions = maxMovesOrOptions;
		}
	}

	const steps: SimulationStep[] = [];

	let currentPos: GridCoord = { ...grid.startPos };
	let currentDir: Direction = grid.startDirection;
	let collectedCoins: GridCoord[] = [];

	// Initial step
	steps.push({
		playerPos: { ...currentPos },
		playerDirection: currentDir,
		collectedCoins: [...collectedCoins],
		command: 'INIT',
		status: 'RUNNING',
		message: 'PyBot siap meluncur!'
	});

	if (commands.length === 0) {
		steps[0].status = 'FAILED';
		steps[0].message = 'Belum ada balok instruksi yang dijalankan.';
		return steps;
	}

	// Check if already at target
	if (isCoordEqual(currentPos, grid.targetPos)) {
		steps[0].status = 'SUCCESS';
		steps[0].message = 'PyBot sudah berada di Bintang Emas!';
		return steps;
	}

	let executedMoveCount = 0;
	let executedActionCount = 0;

	for (let i = 0; i < commands.length; i++) {
		// Enforce max actions safety ceiling before executing next action
		if (executedActionCount >= maxActions) {
			steps.push({
				playerPos: { ...currentPos },
				playerDirection: currentDir,
				collectedCoins: [...collectedCoins],
				command: 'INIT',
				status: 'FAILED',
				message: `Batas maksimum ${maxActions} aksi tercapai! PyBot kehabisan energi langkah.`
			});
			return steps;
		}

		const cmd = commands[i];
		executedActionCount++;

		if (cmd === 'TURN_LEFT') {
			currentDir = turnLeft(currentDir);
			steps.push({
				playerPos: { ...currentPos },
				playerDirection: currentDir,
				collectedCoins: [...collectedCoins],
				command: cmd,
				status: 'RUNNING',
				message: 'PyBot berputar 90° ke kiri.'
			});
		} else if (cmd === 'TURN_RIGHT') {
			currentDir = turnRight(currentDir);
			steps.push({
				playerPos: { ...currentPos },
				playerDirection: currentDir,
				collectedCoins: [...collectedCoins],
				command: cmd,
				status: 'RUNNING',
				message: 'PyBot berputar 90° ke kanan.'
			});
		} else if (cmd === 'MOVE') {
			executedMoveCount++;

			// Enforce maxMoves limit strictly on actual MOVE actions
			if (executedMoveCount > maxMoves) {
				steps.push({
					playerPos: { ...currentPos },
					playerDirection: currentDir,
					collectedCoins: [...collectedCoins],
					command: cmd,
					status: 'FAILED',
					message: `Batas maksimum ${maxMoves} langkah tercapai! PyBot kehabisan energi langkah.`
				});
				return steps;
			}

			const nextPos = getNextCoord(currentPos, currentDir);

			// 1. Check out of bounds -> STOP immediately
			if (isOutOfBounds(nextPos, grid)) {
				steps.push({
					playerPos: { ...nextPos },
					playerDirection: currentDir,
					collectedCoins: [...collectedCoins],
					command: cmd,
					status: 'OUT_OF_BOUNDS',
					message: 'Oops! PyBot keluar dari batas arena!'
				});
				return steps;
			}

			// 2. Check obstacle collision -> STOP immediately
			if (isObstacle(nextPos, grid)) {
				steps.push({
					playerPos: { ...nextPos },
					playerDirection: currentDir,
					collectedCoins: [...collectedCoins],
					command: cmd,
					status: 'FAILED',
					message: 'Aduh! PyBot menabrak rintangan batu!'
				});
				return steps;
			}

			currentPos = nextPos;

			// Check coin collection
			if (grid.coins && grid.coins.some((c) => isCoordEqual(c, currentPos))) {
				if (!collectedCoins.some((c) => isCoordEqual(c, currentPos))) {
					collectedCoins = [...collectedCoins, { ...currentPos }];
				}
			}

			// 3. Check target arrival -> SUCCESS & STOP immediately
			if (isCoordEqual(currentPos, grid.targetPos)) {
				steps.push({
					playerPos: { ...currentPos },
					playerDirection: currentDir,
					collectedCoins: [...collectedCoins],
					command: cmd,
					status: 'SUCCESS',
					message: 'Luar biasa! PyBot berhasil meraih Bintang Emas!'
				});
				return steps;
			}

			steps.push({
				playerPos: { ...currentPos },
				playerDirection: currentDir,
				collectedCoins: [...collectedCoins],
				command: cmd,
				status: 'RUNNING',
				message: 'PyBot melangkah 1 petak maju.'
			});
		}

		// Enforce max actions limit on current step
		if (executedActionCount >= maxActions && !isCoordEqual(currentPos, grid.targetPos)) {
			const lastStep = steps[steps.length - 1];
			lastStep.status = 'FAILED';
			lastStep.message = `Batas maksimum ${maxActions} aksi tercapai! PyBot kehabisan energi langkah.`;
			return steps;
		}
	}

	// If all commands finished and target not reached -> STOP with FAILED
	const finalStep = steps[steps.length - 1];
	if (finalStep.status === 'RUNNING') {
		finalStep.status = 'FAILED';
		finalStep.message = 'Program selesai, tetapi PyBot belum mencapai Bintang target. Coba sesuaikan balokmu!';
	}

	return steps;
}
