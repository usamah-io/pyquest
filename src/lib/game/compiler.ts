import type { CodingBlock } from '../types';

export type AtomicCommand = 'MOVE' | 'TURN_LEFT' | 'TURN_RIGHT';

/**
 * Compiles a visual coding block hierarchy into a flattened list of atomic commands.
 * Resolves REPEAT loops deterministically without unbounded infinite loops.
 */
export function compileBlocksToCommands(
	blocks: CodingBlock[],
	maxInstructions = 100
): { commands: AtomicCommand[]; error?: string } {
	const commands: AtomicCommand[] = [];

	function processBlock(block: CodingBlock) {
		if (commands.length >= maxInstructions) {
			throw new Error('Maksimum instruksi terlampaui (mencegah loop tak terhingga).');
		}

		if (block.type === 'MOVE') {
			commands.push('MOVE');
		} else if (block.type === 'TURN_LEFT') {
			commands.push('TURN_LEFT');
		} else if (block.type === 'TURN_RIGHT') {
			commands.push('TURN_RIGHT');
		} else if (block.type === 'REPEAT') {
			const count = Math.min(Math.max(block.repeatCount || 2, 1), 10);
			const innerBlocks =
				block.children && block.children.length > 0
					? block.children
					: [{ id: 'default', type: 'MOVE' as const }];
			for (let i = 0; i < count; i++) {
				for (const inner of innerBlocks) {
					processBlock(inner);
				}
			}
		}
	}

	try {
		for (const block of blocks) {
			processBlock(block);
		}
		return { commands };
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Kesalahan saat kompilasi blok.';
		return { commands, error: message };
	}
}

/**
 * Converts coding blocks into equivalent formatted Python source code for kids to read.
 */
export function blocksToPythonCode(blocks: CodingBlock[], indent = ''): string {
	if (blocks.length === 0) {
		return `${indent}# Belum ada balok instruksi`;
	}

	const lines: string[] = [];

	for (const block of blocks) {
		if (block.type === 'MOVE') {
			lines.push(`${indent}pybot.move()`);
		} else if (block.type === 'TURN_LEFT') {
			lines.push(`${indent}pybot.turn_left()`);
		} else if (block.type === 'TURN_RIGHT') {
			lines.push(`${indent}pybot.turn_right()`);
		} else if (block.type === 'REPEAT') {
			const count = block.repeatCount || 2;
			lines.push(`${indent}for step in range(${count}):`);
			if (block.children && block.children.length > 0) {
				lines.push(blocksToPythonCode(block.children, indent + '    '));
			} else {
				lines.push(`${indent}    pass # Kosong`);
			}
		}
	}

	return lines.join('\n');
}
