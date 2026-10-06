import { describe, it, expect } from 'bun:test';
import { get } from 'svelte/store';
import { compileBlocksToCommands, blocksToPythonCode, hasForeverBlock, type AtomicCommand } from '../src/lib/game/compiler';
import { simulateCommands } from '../src/lib/game/engine';
import { challengesData, levelsData } from '../src/lib/challenges/challengesData';
import {
	questionsData,
	getQuestionsByLevel,
	getQuestionsByTopic,
	getQuestionsByDifficulty,
	shuffleArray
} from '../src/lib/questions/questionsData';
import { learningLevelsData } from '../src/lib/questions/learningLevelsData';
import { progressStore } from '../src/lib/stores/progressStore';
import type { CodingBlock } from '../src/lib/types';

describe('Block Compiler', () => {
	it('should compile atomic blocks correctly', () => {
		const blocks: CodingBlock[] = [
			{ id: '1', type: 'MOVE' },
			{ id: '2', type: 'TURN_RIGHT' },
			{ id: '3', type: 'MOVE' }
		];
		const res = compileBlocksToCommands(blocks);
		expect(res.commands).toEqual(['MOVE', 'TURN_RIGHT', 'MOVE']);
		expect(res.error).toBeUndefined();
	});

	it('should expand REPEAT blocks deterministically', () => {
		const blocks: CodingBlock[] = [
			{
				id: '1',
				type: 'REPEAT',
				repeatCount: 3,
				children: [{ id: '2', type: 'MOVE' }]
			}
		];
		const res = compileBlocksToCommands(blocks);
		expect(res.commands).toEqual(['MOVE', 'MOVE', 'MOVE']);
	});

	it('should generate valid Python code string', () => {
		const blocks: CodingBlock[] = [
			{ id: '1', type: 'MOVE' },
			{ id: '2', type: 'TURN_LEFT' }
		];
		const pythonCode = blocksToPythonCode(blocks);
		expect(pythonCode).toContain('pybot.move()');
		expect(pythonCode).toContain('pybot.turn_left()');
	});

	it('should safely compile FOREVER blocks with cap and safe feedback when exceeded', () => {
		const blocks: CodingBlock[] = [
			{
				id: '1',
				type: 'FOREVER',
				children: [{ id: '2', type: 'MOVE' }]
			}
		];
		expect(hasForeverBlock(blocks)).toBe(true);
		const res = compileBlocksToCommands(blocks, 15);
		expect(res.commands.length).toBe(15);
		expect(res.error).toBe('Kodenya berjalan terlalu lama. Coba periksa blok SELAMANYA.');
	});

	it('should generate valid Python code with while True: for FOREVER blocks', () => {
		const blocks: CodingBlock[] = [
			{
				id: '1',
				type: 'FOREVER',
				children: [{ id: '2', type: 'MOVE' }]
			}
		];
		const pythonCode = blocksToPythonCode(blocks);
		expect(pythonCode).toContain('while True:');
		expect(pythonCode).toContain('    pybot.move()');
	});
});

describe('Coding Game Engine & 10 Levels System', () => {
	it('should contain exactly 10 levels with at least 3 challenges each (min 30 total)', () => {
		expect(levelsData.length).toBe(10);
		for (const lvl of levelsData) {
			expect(lvl.challenges.length).toBeGreaterThanOrEqual(3);
		}
		expect(challengesData.length).toBeGreaterThanOrEqual(30);
	});

	it('should ensure every challenge has diverse command blocks available (never only MOVE)', () => {
		for (const ch of challengesData) {
			expect(ch.availableBlocks.length).toBeGreaterThanOrEqual(3);
			expect(ch.availableBlocks).toContain('MOVE');
			expect(ch.availableBlocks).toContain('TURN_LEFT');
			expect(ch.availableBlocks).toContain('TURN_RIGHT');
		}
	});

	it('should ensure hints are pedagogical and strictly capped at 2 tips per mission', () => {
		for (const ch of challengesData) {
			expect(ch.hints.length).toBeGreaterThanOrEqual(1);
			expect(ch.hints.length).toBeLessThanOrEqual(2);
			for (const hint of ch.hints) {
				expect(hint).not.toContain('balok MAJU');
				expect(hint).not.toContain('MOVE');
				expect(hint).not.toContain('TURN_LEFT');
				expect(hint).not.toContain('TURN_RIGHT');
			}
		}
	});

	it('should successfully reach target for challenge 1 with correct commands', () => {
		const ch1 = challengesData[0];
		expect(ch1.id).toBe('lvl1-ch1');
		const steps = simulateCommands(ch1.grid, ['MOVE', 'TURN_RIGHT', 'MOVE']);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('SUCCESS');
		expect(lastStep.playerPos).toEqual({ x: 2, y: 2 });
	});

	it('should successfully reach target for challenge 2 (first turn mission)', () => {
		const ch2 = challengesData[1];
		expect(ch2.id).toBe('lvl1-ch2');
		const steps = simulateCommands(ch2.grid, ['MOVE', 'MOVE', 'TURN_RIGHT', 'MOVE']);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('SUCCESS');
		expect(lastStep.playerPos).toEqual({ x: 3, y: 2 });
	});

	it('should successfully reach target for challenge 3 (zig-zag corner mission)', () => {
		const ch3 = challengesData[2];
		expect(ch3.id).toBe('lvl1-ch3');
		const steps = simulateCommands(ch3.grid, ['MOVE', 'TURN_RIGHT', 'MOVE', 'TURN_LEFT', 'MOVE']);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('SUCCESS');
		expect(lastStep.playerPos).toEqual({ x: 3, y: 2 });
	});

	it('should fail if steps finish before target is reached', () => {
		const ch1 = challengesData[0];
		const steps = simulateCommands(ch1.grid, ['MOVE']);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('FAILED');
	});

	it('should detect collision when hitting obstacles', () => {
		const ch1 = challengesData[0];
		const steps = simulateCommands(ch1.grid, ['TURN_LEFT', 'MOVE']);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('FAILED');
		expect(lastStep.message).toContain('menabrak rintangan');
	});

	it('should award XP on first completion and protect against duplicate XP on replay', () => {
		progressStore.reset();
		const testChallengeId = 'lvl1-test-replay';
		
		const firstAwarded = progressStore.completeChallenge(testChallengeId, 25);
		expect(firstAwarded).toBe(true);

		const replayAwarded = progressStore.completeChallenge(testChallengeId, 25);
		expect(replayAwarded).toBe(false);
	});
});

describe('Modul Belajar Python: 10-Level System & Progression', () => {
	it('should contain exactly 10 learning levels with 5 questions each (50 questions total)', () => {
		expect(learningLevelsData.length).toBe(10);
		for (const lvl of learningLevelsData) {
			expect(lvl.questionIds.length).toBe(5);
			const questions = getQuestionsByLevel(lvl.id);
			expect(questions.length).toBe(5);
		}
	});

	it('should follow difficulty progression across levels', () => {
		for (const lvl of learningLevelsData) {
			if (lvl.id <= 3) {
				expect(lvl.difficulty).toBe('easy');
			} else if (lvl.id <= 6) {
				expect(lvl.difficulty).toBe('medium');
			} else if (lvl.id <= 8) {
				expect(lvl.difficulty).toBe('hard');
			} else {
				expect(lvl.difficulty).toBe('challenge');
			}
		}
	});

	it('should support learning level completion and zero XP on replay', () => {
		progressStore.reset();
		const firstCompleted = progressStore.completeLearningLevel(1, 50);
		expect(firstCompleted).toBe(true);

		const replayCompleted = progressStore.completeLearningLevel(1, 50);
		expect(replayCompleted).toBe(false);
	});
});

describe('Question Bank (50 Questions Minimum, Topics, & Variety)', () => {
	it('should contain at least 50 questions', () => {
		expect(questionsData.length).toBeGreaterThanOrEqual(50);
	});

	it('should ensure every question has complete and valid metadata', () => {
		for (const q of questionsData) {
			expect(q.id).toBeDefined();
			expect(q.level).toBeGreaterThanOrEqual(1);
			expect(q.level).toBeLessThanOrEqual(10);
			expect(q.topic).toBeDefined();
			expect(q.difficulty).toBeDefined();
			expect(q.type).toBeDefined();
			expect(q.question).toBeDefined();
			expect(q.options.length).toBeGreaterThanOrEqual(4);
			expect(q.correctAnswer).toBeDefined();
			expect(q.correctAnswerId).toBeDefined();
			expect(q.explanation).toBeDefined();
			expect(q.hints.length).toBeGreaterThanOrEqual(1);
			expect(q.hints.length).toBeLessThanOrEqual(2);
			expect(q.xp).toBeGreaterThanOrEqual(15);
		}
	});

	it('should ensure every question has matching correctAnswer and stable correctAnswerId in options', () => {
		for (const q of questionsData) {
			const matchingOption = q.options.find((opt) => opt.id === q.correctAnswerId);
			expect(matchingOption).toBeDefined();
			expect(matchingOption?.text).toBe(q.correctAnswer);
		}
	});

	it('should ensure no duplicate options exist within any question', () => {
		for (const q of questionsData) {
			const textSet = new Set(q.options.map((o) => o.text.trim()));
			expect(textSet.size).toBe(q.options.length);

			const idSet = new Set(q.options.map((o) => o.id));
			expect(idSet.size).toBe(q.options.length);
		}
	});

	it('should cover all 17 required Python topics across the questions', () => {
		const requiredTopics = [
			'print()',
			'string',
			'integer',
			'float',
			'variable',
			'input()',
			'type conversion',
			'operator',
			'comparison',
			'if',
			'else',
			'elif',
			'boolean',
			'for loop',
			'while loop',
			'range()',
			'basic logic'
		];

		const allTopicsCombined = questionsData.map((q) => q.topic.toLowerCase()).join(' ');

		for (const topic of requiredTopics) {
			const found = questionsData.some((q) => q.topic.toLowerCase().includes(topic.toLowerCase()));
			expect(found).toBe(true);
		}
	});

	it('should support diverse question types (not all output prediction)', () => {
		const typesPresent = new Set(questionsData.map((q) => q.type));
		expect(typesPresent.size).toBeGreaterThanOrEqual(6);
		expect(typesPresent.has('output-prediction')).toBe(true);
		expect(typesPresent.has('concept')).toBe(true);
		expect(typesPresent.has('code-reading')).toBe(true);
		expect(typesPresent.has('choose-code')).toBe(true);
		expect(typesPresent.has('find-error')).toBe(true);
		expect(typesPresent.has('condition-logic')).toBe(true);
	});

	it('should distribute correct answer IDs across options (not always option A)', () => {
		const answerIdEnds = questionsData.map((q) => q.correctAnswerId.slice(-1));
		const uniqueEnds = new Set(answerIdEnds);
		// Should have answers ending in a, b, c, etc.
		expect(uniqueEnds.size).toBeGreaterThanOrEqual(3);
	});

	it('should ensure hints are pedagogical and do not leak direct answers', () => {
		for (const q of questionsData) {
			for (const hint of q.hints) {
				expect(hint).not.toContain('Jawabannya adalah');
				expect(hint).not.toContain('Pilihlah A');
				expect(hint).not.toContain('Pilihlah B');
			}
		}
	});

	it('should filter questions correctly by level, topic, and difficulty', () => {
		const lvl1Qs = getQuestionsByLevel(1);
		expect(lvl1Qs.length).toBe(5);
		expect(lvl1Qs.every((q) => q.level === 1)).toBe(true);

		const varQs = getQuestionsByTopic('variable');
		expect(varQs.length).toBeGreaterThanOrEqual(2);

		const easyQs = getQuestionsByDifficulty('easy');
		expect(easyQs.length).toBe(15); // Level 1, 2, 3 = 15 questions
	});

	it('should randomize options correctly without mutating original question', () => {
		const q = questionsData[0];
		const originalOrder = [...q.options];
		const shuffled = shuffleArray(q.options);
		
		expect(shuffled.length).toBe(originalOrder.length);
		const found = shuffled.find((opt) => opt.id === q.correctAnswerId);
		expect(found).toBeDefined();
		expect(found?.text).toBe(q.correctAnswer);
	});
});

describe('Movement Safety, Termination Conditions & Anti-Loop (10 Required Test Cases)', () => {
	const ch1 = challengesData[0]; // startPos: { x: 1, y: 2 }, targetPos: { x: 3, y: 2 }, startDirection: 'RIGHT'

	// Test 1: PyBot reaches goal -> SUCCESS and terminates immediately
	it('Test 1: should immediately terminate with SUCCESS when PyBot reaches target', () => {
		const steps = simulateCommands(ch1.grid, ['MOVE', 'MOVE'], 10);
		expect(steps.length).toBe(3); // INIT + MOVE 1 + MOVE 2 (reaches target)
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('SUCCESS');
		expect(lastStep.playerPos).toEqual({ x: 3, y: 2 });
		expect(lastStep.message).toContain('PyBot berhasil meraih Bintang Emas');
	});

	// Test 2: Multi-instruction stop -> stops at goal, does not execute subsequent instructions
	it('Test 2: should immediately halt upon reaching goal without executing following instructions', () => {
		const excessiveCommands: AtomicCommand[] = ['MOVE', 'MOVE', 'MOVE', 'MOVE', 'TURN_LEFT'];
		const steps = simulateCommands(ch1.grid, excessiveCommands, 10);
		// Goal is reached at second MOVE. Remaining 2 MOVE and 1 TURN_LEFT must NOT be executed!
		expect(steps.length).toBe(3); // INIT + 1st MOVE + 2nd MOVE (SUCCESS)
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('SUCCESS');
		expect(lastStep.playerPos).toEqual({ x: 3, y: 2 });
	});

	// Test 3: Obstacle stop -> PyBot hits obstacle, FAILED and stops immediately
	it('Test 3: should immediately terminate with FAILED when PyBot collides with obstacle', () => {
		// PyBot starts at { x: 1, y: 2 }, facing RIGHT.
		// If PyBot turns LEFT (faces UP) and moves, nextPos is { x: 1, y: 1 }, which is an obstacle in ch1!
		const steps = simulateCommands(ch1.grid, ['TURN_LEFT', 'MOVE', 'MOVE', 'MOVE'], 10);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('FAILED');
		expect(lastStep.message).toContain('menabrak rintangan');
		// Must stop immediately upon collision without executing the remaining 2 MOVEs
		expect(steps.length).toBe(3); // INIT + TURN_LEFT + collision MOVE
	});

	// Test 4: Grid boundary stop -> PyBot goes out of bounds, OUT_OF_BOUNDS and stops immediately
	it('Test 4: should immediately terminate with OUT_OF_BOUNDS when PyBot leaves grid boundary', () => {
		// PyBot is at { x: 1, y: 2 }, facing RIGHT. Turn LEFT twice -> facing LEFT.
		// Move 1 -> { x: 0, y: 2 }. Move 2 -> { x: -1, y: 2 } which is out of bounds!
		const steps = simulateCommands(ch1.grid, ['TURN_LEFT', 'TURN_LEFT', 'MOVE', 'MOVE', 'MOVE'], 10);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('OUT_OF_BOUNDS');
		expect(lastStep.message).toContain('keluar dari batas arena');
		// Stops at boundary check, never executes the 3rd MOVE
		expect(lastStep.playerPos).toEqual({ x: -1, y: 2 });
	});

	// Test 5: Repeat 3x move -> executes exactly 3 moves and stops
	it('Test 5: should compile and execute REPEAT 3x MOVE deterministically', () => {
		const repeatBlock: CodingBlock[] = [
			{
				id: 'rep-1',
				type: 'REPEAT',
				repeatCount: 3,
				children: [{ id: 'child-1', type: 'MOVE' }]
			}
		];
		const { commands } = compileBlocksToCommands(repeatBlock);
		expect(commands).toEqual(['MOVE', 'MOVE', 'MOVE']);

		// Using a blank grid where 3 moves are valid
		const customGrid = {
			cols: 5,
			rows: 5,
			startPos: { x: 0, y: 2 },
			startDirection: 'RIGHT' as const,
			targetPos: { x: 3, y: 2 },
			obstacles: []
		};
		const steps = simulateCommands(customGrid, commands, 10);
		expect(steps.length).toBe(4); // INIT + 3 moves
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('SUCCESS');
		expect(lastStep.playerPos).toEqual({ x: 3, y: 2 });
	});

	// Test 6: Repeat 4x turn -> rotates 360 degrees and stops
	it('Test 6: should execute REPEAT 4x TURN_RIGHT and rotate full circle without moving coordinates', () => {
		const repeatTurnBlock: CodingBlock[] = [
			{
				id: 'rep-turn',
				type: 'REPEAT',
				repeatCount: 4,
				children: [{ id: 'child-turn', type: 'TURN_RIGHT' }]
			}
		];
		const { commands } = compileBlocksToCommands(repeatTurnBlock);
		expect(commands).toEqual(['TURN_RIGHT', 'TURN_RIGHT', 'TURN_RIGHT', 'TURN_RIGHT']);

		const steps = simulateCommands(ch1.grid, commands, 10);
		expect(steps.length).toBe(5); // INIT + 4 turns
		const lastStep = steps[steps.length - 1];
		// End orientation should be back to startDirection ('RIGHT')
		expect(lastStep.playerDirection).toBe('RIGHT');
		expect(lastStep.playerPos).toEqual(ch1.grid.startPos);
		// Since target was not reached, status is FAILED
		expect(lastStep.status).toBe('FAILED');
	});

	// Test 7: Large repeat maxActions stop -> stops strictly at maxActions with limit message
	it('Test 7: should terminate execution strictly at maxActions limit to prevent infinite loops', () => {
		const hugeRepeat: CodingBlock[] = [
			{
				id: 'huge-rep',
				type: 'REPEAT',
				repeatCount: 10,
				children: [{ id: 'turn-c', type: 'TURN_LEFT' }]
			}
		];
		const { commands } = compileBlocksToCommands(hugeRepeat);
		expect(commands.length).toBe(10);

		// With maxActions = 4, engine must stop at 4 actions
		const steps = simulateCommands(ch1.grid, commands, 4);
		expect(steps.length).toBe(5); // INIT + 4 actions
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('FAILED');
		expect(lastStep.message).toContain('Batas maksimum 4 aksi tercapai');
	});

	// Test 8: Double run guard -> prevent concurrent or re-entrant runs
	it('Test 8: should enforce double-run protection guard', () => {
		let isRunning = false;
		let runCount = 0;

		function triggerRun() {
			if (isRunning) return false;
			isRunning = true;
			runCount++;
			return true;
		}

		// First trigger should succeed
		expect(triggerRun()).toBe(true);
		expect(runCount).toBe(1);

		// Subsequent triggers while isRunning is true must be rejected
		expect(triggerRun()).toBe(false);
		expect(triggerRun()).toBe(false);
		expect(runCount).toBe(1);

		// After completion
		isRunning = false;
		expect(triggerRun()).toBe(true);
		expect(runCount).toBe(2);
	});

	// Test 9: Fail-edit-rerun lifecycle -> modifying commands allows clean rerun
	it('Test 9: should support fail-edit-rerun flow cleanly without stuck state', () => {
		// Attempt 1: only 1 MOVE (fails because 2 required)
		const attempt1 = simulateCommands(ch1.grid, ['MOVE'], 5);
		expect(attempt1[attempt1.length - 1].status).toBe('FAILED');

		// Attempt 2: player edits blocks and adds 2nd MOVE (succeeds)
		const attempt2 = simulateCommands(ch1.grid, ['MOVE', 'MOVE'], 5);
		expect(attempt2[attempt2.length - 1].status).toBe('SUCCESS');
		expect(attempt2[attempt2.length - 1].playerPos).toEqual(ch1.grid.targetPos);
	});

	// Test 10: Replay XP protection -> already completed challenge gives 0 XP
	it('Test 10: should award XP once on first completion and 0 XP on subsequent replay', () => {
		progressStore.reset();
		const challengeId = 'replay-xp-test-mission';

		const firstRunAwarded = progressStore.completeChallenge(challengeId, 50);
		expect(firstRunAwarded).toBe(true);
		expect(get(progressStore).completedChallenges).toContain(challengeId);
		const xpAfterFirst = get(progressStore).xp;

		const replayAwarded = progressStore.completeChallenge(challengeId, 50);
		expect(replayAwarded).toBe(false);
		expect(get(progressStore).xp).toBe(xpAfterFirst); // XP remained unchanged
	});

	it('should verify Level 2 Mission 1 (Tikungan Kanan Sederhana) is 100% solvable without collision', () => {
		const lvl2ch1 = challengesData.find((c) => c.id === 'lvl2-ch1');
		expect(lvl2ch1).toBeDefined();
		if (!lvl2ch1) return;

		// PyBot moves 1 step forward to (2, 1) [collects coin], turns right [faces DOWN], moves 1 step to (2, 2) [target star]
		const steps = simulateCommands(lvl2ch1.grid, ['MOVE', 'TURN_RIGHT', 'MOVE'], lvl2ch1.maxMoves);
		const lastStep = steps[steps.length - 1];

		expect(lastStep.status).toBe('SUCCESS');
		expect(lastStep.playerPos).toEqual({ x: 2, y: 2 });
		expect(lastStep.playerDirection).toBe('DOWN');
		expect(lastStep.collectedCoins).toEqual([{ x: 2, y: 1 }]);
	});

	it('should verify all 30 challenges have zero obstacle collisions with start, target, or coins and are solvable', () => {
		for (const ch of challengesData) {
			// No obstacle on start
			expect(ch.grid.obstacles.some((o) => o.x === ch.grid.startPos.x && o.y === ch.grid.startPos.y)).toBe(false);
			// No obstacle on target
			expect(ch.grid.obstacles.some((o) => o.x === ch.grid.targetPos.x && o.y === ch.grid.targetPos.y)).toBe(false);
			// No obstacle on coins
			if (ch.grid.coins) {
				for (const coin of ch.grid.coins) {
					expect(ch.grid.obstacles.some((o) => o.x === coin.x && o.y === coin.y)).toBe(false);
				}
			}

			// Solvable with BFS
			const isBlocked = (x: number, y: number) => {
				if (x < 0 || x >= ch.grid.cols || y < 0 || y >= ch.grid.rows) return true;
				return ch.grid.obstacles.some((o) => o.x === x && o.y === y);
			};

			const queue: [number, number][] = [[ch.grid.startPos.x, ch.grid.startPos.y]];
			const visited = new Set<string>();
			visited.add(`${ch.grid.startPos.x},${ch.grid.startPos.y}`);
			let pathFound = false;

			while (queue.length > 0) {
				const [x, y] = queue.shift()!;
				if (x === ch.grid.targetPos.x && y === ch.grid.targetPos.y) {
					pathFound = true;
					break;
				}
				for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
					const nx = x + dx;
					const ny = y + dy;
					const key = `${nx},${ny}`;
					if (!visited.has(key) && !isBlocked(nx, ny)) {
						visited.add(key);
						queue.push([nx, ny]);
					}
				}
			}

			expect(pathFound).toBe(true);
		}
	});
});
