import type { Challenge, ChallengeGrid, Direction, GridCoord } from '../types';
import { simulateCommands } from './engine';
import type { AtomicCommand } from './compiler';

export interface PathfindingResult {
	reachable: boolean;
	minMoves: number;
	path: GridCoord[];
}

export interface ChallengeValidationResult {
	id: string;
	title: string;
	valid: boolean;
	minMoves: number;
	maxMoves: number;
	shortestPath: GridCoord[];
	errors: string[];
	warnings: string[];
}

/**
 * Checks if a coordinate is blocked by arena boundaries or obstacles
 */
export function isCellBlocked(coord: GridCoord, grid: ChallengeGrid): boolean {
	if (coord.x < 0 || coord.x >= grid.cols || coord.y < 0 || coord.y >= grid.rows) {
		return true;
	}
	return grid.obstacles.some((obs) => obs.x === coord.x && obs.y === coord.y);
}

/**
 * Calculates the exact shortest movement path (minimum MOVE actions) using BFS.
 */
export function findShortestMovementPath(grid: ChallengeGrid): PathfindingResult {
	if (isCellBlocked(grid.startPos, grid) || isCellBlocked(grid.targetPos, grid)) {
		return { reachable: false, minMoves: Infinity, path: [] };
	}

	if (grid.startPos.x === grid.targetPos.x && grid.startPos.y === grid.targetPos.y) {
		return { reachable: true, minMoves: 0, path: [{ ...grid.startPos }] };
	}

	const queue: { pos: GridCoord; dist: number; path: GridCoord[] }[] = [
		{ pos: { ...grid.startPos }, dist: 0, path: [{ ...grid.startPos }] }
	];

	const visited = new Set<string>();
	visited.add(`${grid.startPos.x},${grid.startPos.y}`);

	const directions: [number, number][] = [
		[0, -1], // UP
		[1, 0],  // RIGHT
		[0, 1],  // DOWN
		[-1, 0]  // LEFT
	];

	while (queue.length > 0) {
		const current = queue.shift()!;

		if (current.pos.x === grid.targetPos.x && current.pos.y === grid.targetPos.y) {
			return {
				reachable: true,
				minMoves: current.dist,
				path: current.path
			};
		}

		for (const [dx, dy] of directions) {
			const nx = current.pos.x + dx;
			const ny = current.pos.y + dy;
			const key = `${nx},${ny}`;

			if (!visited.has(key) && !isCellBlocked({ x: nx, y: ny }, grid)) {
				visited.add(key);
				queue.push({
					pos: { x: nx, y: ny },
					dist: current.dist + 1,
					path: [...current.path, { x: nx, y: ny }]
				});
			}
		}
	}

	return { reachable: false, minMoves: Infinity, path: [] };
}

/**
 * Validates a single challenge against strict gameplay design rules:
 * 1. Start, Target, and Coins must be within bounds and NOT on obstacles.
 * 2. START -> valid path -> GOAL must exist.
 * 3. minimum required movement count <= maxMoves.
 * 4. If canonical commands are provided, they must achieve SUCCESS within maxMoves.
 */
export function validateChallenge(ch: Challenge): ChallengeValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];
	const grid = ch.grid;
	const maxMoves = ch.maxMoves ?? 30;

	// 1. Boundary & Collision Checks
	if (grid.startPos.x < 0 || grid.startPos.x >= grid.cols || grid.startPos.y < 0 || grid.startPos.y >= grid.rows) {
		errors.push(`Posisi awal (${grid.startPos.x}, ${grid.startPos.y}) di luar batas grid ${grid.cols}x${grid.rows}.`);
	}
	if (grid.targetPos.x < 0 || grid.targetPos.x >= grid.cols || grid.targetPos.y < 0 || grid.targetPos.y >= grid.rows) {
		errors.push(`Posisi target (${grid.targetPos.x}, ${grid.targetPos.y}) di luar batas grid ${grid.cols}x${grid.rows}.`);
	}

	if (grid.obstacles.some((o) => o.x === grid.startPos.x && o.y === grid.startPos.y)) {
		errors.push(`Posisi awal PyBot (${grid.startPos.x}, ${grid.startPos.y}) bertabrakan dengan rintangan batu.`);
	}
	if (grid.obstacles.some((o) => o.x === grid.targetPos.x && o.y === grid.targetPos.y)) {
		errors.push(`Posisi target Bintang (${grid.targetPos.x}, ${grid.targetPos.y}) bertabrakan dengan rintangan batu.`);
	}

	if (grid.coins) {
		for (const coin of grid.coins) {
			if (grid.obstacles.some((o) => o.x === coin.x && o.y === coin.y)) {
				errors.push(`Koin bintang di (${coin.x}, ${coin.y}) bertabrakan dengan rintangan batu.`);
			}
		}
	}

	// 2. Pathfinding verification
	const pathResult = findShortestMovementPath(grid);
	if (!pathResult.reachable) {
		errors.push(`Tidak ada jalur yang dapat dilalui dari Start (${grid.startPos.x},${grid.startPos.y}) ke Target (${grid.targetPos.x},${grid.targetPos.y}).`);
	} else if (pathResult.minMoves > maxMoves) {
		errors.push(
			`Jalur terpendek membutuhkan ${pathResult.minMoves} langkah perpindahan, melebihi maxMoves (${maxMoves}). Tantangan tidak dapat diselesaikan!`
		);
	}

	// 3. Canonical commands verification if present
	if (ch.canonicalCommands && ch.canonicalCommands.length > 0) {
		const steps = simulateCommands(grid, ch.canonicalCommands, { maxMoves, maxActions: 100 });
		const lastStep = steps[steps.length - 1];
		if (lastStep.status !== 'SUCCESS') {
			errors.push(`Solusi kanonik gagal mencapai target: ${lastStep.message}`);
		}
	}

	return {
		id: ch.id,
		title: ch.title,
		valid: errors.length === 0,
		minMoves: pathResult.reachable ? pathResult.minMoves : Infinity,
		maxMoves,
		shortestPath: pathResult.path,
		errors,
		warnings
	};
}

/**
 * Validates a list of challenges, returning overall health and any errors found.
 */
export function validateAllChallenges(challenges: Challenge[]): {
	allValid: boolean;
	results: ChallengeValidationResult[];
	failedChallenges: ChallengeValidationResult[];
} {
	const results = challenges.map(validateChallenge);
	const failedChallenges = results.filter((r) => !r.valid);

	return {
		allValid: failedChallenges.length === 0,
		results,
		failedChallenges
	};
}
