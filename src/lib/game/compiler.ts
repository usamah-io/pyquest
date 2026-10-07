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
	let inForever = false;

	function processBlock(block: CodingBlock) {
		if (commands.length >= maxInstructions) {
			throw new Error(
				inForever
					? 'Kodenya berjalan terlalu lama. Coba periksa blok SELAMANYA.'
					: 'PyBot berhenti dulu karena perintahnya berulang terlalu lama.'
			);
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
		} else if (block.type === 'FOREVER') {
			const innerBlocks =
				block.children && block.children.length > 0
					? block.children
					: [{ id: 'default', type: 'MOVE' as const }];
			// Safe execution limit for FOREVER to prevent infinite loops and freezing
			const prevInForever = inForever;
			inForever = true;
			const foreverCap = Math.min(30, maxInstructions + 1);
			for (let i = 0; i < foreverCap; i++) {
				for (const inner of innerBlocks) {
					processBlock(inner);
				}
			}
			inForever = prevInForever;
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
 * Checks whether the given block hierarchy contains any FOREVER block.
 */
export function hasForeverBlock(blocks: CodingBlock[]): boolean {
	return blocks.some(
		(b) => b.type === 'FOREVER' || (b.children && hasForeverBlock(b.children))
	);
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
		} else if (block.type === 'FOREVER') {
			lines.push(`${indent}while True:`);
			if (block.children && block.children.length > 0) {
				lines.push(blocksToPythonCode(block.children, indent + '    '));
			} else {
				lines.push(`${indent}    pass # Kosong`);
			}
		}
	}

	return lines.join('\n');
}
