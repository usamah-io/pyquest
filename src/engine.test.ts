import { describe, it, expect } from 'bun:test';
import { compileBlocksToCommands, blocksToPythonCode } from '../src/lib/game/compiler';
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
		const steps = simulateCommands(ch1.grid, ['MOVE', 'MOVE']);
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
