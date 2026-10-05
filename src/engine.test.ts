import { describe, it, expect } from 'bun:test';
import { compileBlocksToCommands, blocksToPythonCode } from '../src/lib/game/compiler';
import { simulateCommands } from '../src/lib/game/engine';
import { challengesData } from '../src/lib/challenges/challengesData';
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

describe('Game Engine Simulation', () => {
	it('should successfully reach target for challenge 1 with correct commands', () => {
		const ch1 = challengesData[0];
		// Start at (1,2) facing RIGHT, Target at (3,2) -> 2 moves
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
		// Facing RIGHT at (1,2). Turn UP -> facing UP -> MOVE -> hits (1,1) obstacle!
		const steps = simulateCommands(ch1.grid, ['TURN_LEFT', 'MOVE']);
		const lastStep = steps[steps.length - 1];
		expect(lastStep.status).toBe('FAILED');
		expect(lastStep.message).toContain('menabrak rintangan');
	});
});
