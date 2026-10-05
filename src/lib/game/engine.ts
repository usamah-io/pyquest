import type { Direction, GridCoord, ChallengeGrid, GameExecutionState } from '../types';
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

/**
 * Runs a deterministic simulation of all commands over the grid and yields individual frame states.
 */
export function simulateCommands(grid: ChallengeGrid, commands: AtomicCommand[]): SimulationStep[] {
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

	for (let i = 0; i < commands.length; i++) {
		const cmd = commands[i];

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
			const nextPos = getNextCoord(currentPos, currentDir);

			// Check out of bounds
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

			// Check obstacle collision
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

			// Check target arrival
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
	}

	// If commands finished and target not reached
	const lastStep = steps[steps.length - 1];
	if (lastStep.status === 'RUNNING') {
		lastStep.status = 'FAILED';
		lastStep.message = 'Program selesai, tetapi PyBot belum mencapai Bintang target. Coba sesuaikan balokmu!';
	}

	return steps;
}
