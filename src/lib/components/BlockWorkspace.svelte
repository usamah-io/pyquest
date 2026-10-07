<script lang="ts">
	import type { CodingBlock, BlockType } from '$lib/types';
	import { blocksToPythonCode } from '$lib/game/compiler';
	import Icon from './Icon.svelte';

	let {
		workspaceBlocks = $bindable<CodingBlock[]>([]),
		availableBlocks,
		maxMoves,
		attempts = 0,
		onRun,
		onReset,
		isRunning
	}: {
		workspaceBlocks: CodingBlock[];
		availableBlocks: BlockType[];
		maxMoves?: number;
		attempts?: number;
		onRun: () => void;
		onReset: () => void;
		isRunning: boolean;
	} = $props();

	let showPythonCode = $state(false);

	// ==========================================
	// TRUE DRAG & DROP ENGINE (POINTER EVENTS)
	// ==========================================
	interface PendingDrag {
		source: 'palette' | 'workspace';
		type: BlockType;
		blockId?: string;
		parentId?: string | null;
		index?: number;
		data?: CodingBlock;
		startX: number;
		startY: number;
		pointerId: number;
		isHandle: boolean;
	}

	let pendingDrag = $state<PendingDrag | null>(null);
	let isDragging = $state(false);
	let dragInfo = $state<{
		source: 'palette' | 'workspace';
		type: BlockType;
		blockId?: string;
		parentId?: string | null;
		index?: number;
		data?: CodingBlock;
	} | null>(null);

	let pointerPos = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isOverTrash = $state(false);
	let dropTarget = $state<{ parentId: string | null; index: number } | null>(null);

	// Unique ID generator
	function makeId() {
		return 'blk-' + Math.random().toString(36).substring(2, 9);
	}

	function createDefaultBlock(type: BlockType): CodingBlock {
		if (type === 'REPEAT') {
			return {
				id: makeId(),
				type: 'REPEAT',
				repeatCount: 4,
				children: [{ id: makeId(), type: 'MOVE' }]
			};
		}
		if (type === 'FOREVER') {
			return {
				id: makeId(),
				type: 'FOREVER',
				children: [{ id: makeId(), type: 'MOVE' }]
			};
		}
		return {
			id: makeId(),
			type
		};
	}

	function cloneBlock(block: CodingBlock): CodingBlock {
		return {
			id: makeId(),
			type: block.type,
			repeatCount: block.repeatCount,
			children: block.children ? block.children.map(cloneBlock) : undefined
		};
	}

	// Recursive block manipulation
	function removeBlockById(list: CodingBlock[], id: string): CodingBlock[] {
		return list
			.filter((b) => b.id !== id)
			.map((b) => {
				if (b.children && b.children.length > 0) {
					return { ...b, children: removeBlockById(b.children, id) };
				}
				return b;
			});
	}

	function insertBlockAt(
		list: CodingBlock[],
		blockToInsert: CodingBlock,
		targetParentId: string | null,
		targetIndex: number
	): CodingBlock[] {
		if (targetParentId === null) {
			const copy = [...list];
			const safeIdx = Math.min(Math.max(0, targetIndex), copy.length);
			copy.splice(safeIdx, 0, blockToInsert);
			return copy;
		}

		return list.map((b) => {
			if (b.id === targetParentId) {
				const currentChildren = b.children ? [...b.children] : [];
				const safeIdx = Math.min(Math.max(0, targetIndex), currentChildren.length);
				currentChildren.splice(safeIdx, 0, blockToInsert);
				return { ...b, children: currentChildren };
			}
			if (b.children && b.children.length > 0) {
				return {
					...b,
					children: insertBlockAt(b.children, blockToInsert, targetParentId, targetIndex)
				};
			}
			return b;
		});
	}

	function findBlockById(list: CodingBlock[], id: string): CodingBlock | null {
		for (const b of list) {
			if (b.id === id) return b;
			if (b.children) {
				const found = findBlockById(b.children, id);
				if (found) return found;
			}
		}
		return null;
	}

	function updateRepeatCount(id: string, count: number) {
		if (isRunning) return;
		const intVal = Math.round(Number(count)) || 1;
		const safe = Math.min(Math.max(1, intVal), 10);
		function updateRec(list: CodingBlock[]): CodingBlock[] {
			return list.map((b) => {
				if (b.id === id) {
					return { ...b, repeatCount: safe };
				}
				if (b.children) {
					return { ...b, children: updateRec(b.children) };
				}
				return b;
			});
		}
		workspaceBlocks = updateRec(workspaceBlocks);
	}


	function handleDuplicate(id: string) {
		if (isRunning) return;
		const target = findBlockById(workspaceBlocks, id);
		if (!target) return;
		const cloned = cloneBlock(target);

		function insertAfter(list: CodingBlock[]): CodingBlock[] {
			const idx = list.findIndex((b) => b.id === id);
			if (idx !== -1) {
				const copy = [...list];
				copy.splice(idx + 1, 0, cloned);
				return copy;
			}
			return list.map((b) => (b.children ? { ...b, children: insertAfter(b.children) } : b));
		}
		workspaceBlocks = insertAfter(workspaceBlocks);
	}

	function moveBlock(id: string, direction: 'UP' | 'DOWN') {
		if (isRunning) return;
		function moveInList(list: CodingBlock[]): CodingBlock[] {
			const idx = list.findIndex((b) => b.id === id);
			if (idx !== -1) {
				const targetIdx = direction === 'UP' ? idx - 1 : idx + 1;
				if (targetIdx < 0 || targetIdx >= list.length) return list;
				const copy = [...list];
				const [item] = copy.splice(idx, 1);
				copy.splice(targetIdx, 0, item);
				return copy;
			}
			return list.map((b) => (b.children ? { ...b, children: moveInList(b.children) } : b));
		}
		workspaceBlocks = moveInList(workspaceBlocks);
		if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
			try { navigator.vibrate(10); } catch {}
		}
	}

	let lastTapBlockTime = 0;
	let lastTapBlockType: BlockType | null = null;
	function handleTapPaletteBlock(type: BlockType) {
		if (isRunning) return;
		const now = performance.now();
		// Only ignore immediate synthetic duplicates of the same block from pointerup+click (< 60ms)
		if (now - lastTapBlockTime < 60 && lastTapBlockType === type) return;
		lastTapBlockTime = now;
		lastTapBlockType = type;

		const newBlock = createDefaultBlock(type);
		workspaceBlocks = [...workspaceBlocks, newBlock];
		if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
			try { navigator.vibrate(15); } catch {}
		}
	}

	// Block visual and semantic metadata
	function getBlockMeta(type: BlockType) {
		switch (type) {
			case 'MOVE':
				return {
					name: 'MAJU',
					subtext: 'Langkah maju',
					icon: 'arrow-up',
					category: 'Gerak',
					accentColor: 'emerald',
					bgClass: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white shadow-emerald-950/40 border-b-[3px] border-b-emerald-800',
					tabColor: 'bg-emerald-600',
					pyBadge: 'pybot.move()'
				};
			case 'TURN_LEFT':
				return {
					name: 'BELOK KIRI',
					subtext: '90° Kiri',
					icon: 'corner-up-left',
					category: 'Putar',
					accentColor: 'amber',
					bgClass: 'bg-amber-600 hover:bg-amber-500 border-amber-400 text-white shadow-amber-950/40 border-b-[3px] border-b-amber-900',
					tabColor: 'bg-amber-600',
					pyBadge: 'pybot.turn_left()'
				};
			case 'TURN_RIGHT':
				return {
					name: 'BELOK KANAN',
					subtext: '90° Kanan',
					icon: 'corner-up-right',
					category: 'Putar',
					accentColor: 'orange',
					bgClass: 'bg-orange-600 hover:bg-orange-500 border-orange-400 text-white shadow-orange-950/40 border-b-[3px] border-b-orange-900',
					tabColor: 'bg-orange-600',
					pyBadge: 'pybot.turn_right()'
				};
			case 'REPEAT':
				return {
					name: 'ULANGI',
					subtext: 'Perulangan kali',
					icon: 'repeat',
					category: 'Loop',
					accentColor: 'indigo',
					bgClass: 'bg-indigo-600 hover:bg-indigo-500 border-indigo-400 text-white shadow-indigo-950/40 border-b-[3px] border-b-indigo-900',
					tabColor: 'bg-indigo-600',
					pyBadge: 'for _ in range(n):'
				};
			case 'FOREVER':
				return {
					name: 'SELAMANYA',
					subtext: 'Loop terus-menerus',
					icon: 'refresh-cw',
					category: 'Loop',
					accentColor: 'purple',
					bgClass: 'bg-purple-600 hover:bg-purple-500 border-purple-400 text-white shadow-purple-950/40 border-b-[3px] border-b-purple-900',
					tabColor: 'bg-purple-600',
					pyBadge: 'while True:'
				};
		}
	}

	// Palette availability: GUARANTEE that MAJU, BELOK KIRI, and BELOK KANAN are always available
	let fullPalette = $derived.by<BlockType[]>(() => {
		const baseBlocks: BlockType[] = ['MOVE', 'TURN_LEFT', 'TURN_RIGHT'];
		const set = new Set<BlockType>(baseBlocks);
		if (availableBlocks && availableBlocks.length > 0) {
			for (const b of availableBlocks) {
				set.add(b);
			}
		}
		// If loop blocks are introduced in progression, provide both REPEAT and FOREVER
		if (set.has('REPEAT') || set.has('FOREVER')) {
			set.add('REPEAT');
			set.add('FOREVER');
		}
		const order: BlockType[] = ['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'REPEAT', 'FOREVER'];
		return order.filter((t) => set.has(t));
	});

	// ==========================================
	// TRUE DRAG & DROP ENGINE (POINTER EVENTS)
	// ==========================================
	let holdTimer: ReturnType<typeof setTimeout> | null = null;
	let activePointerEl: HTMLElement | null = null;
	let isTouchPointer = $state(false);
	let paletteScrollEl: HTMLElement | null = $state(null);

	function clearHoldTimer() {
		if (holdTimer) {
			clearTimeout(holdTimer);
			holdTimer = null;
		}
	}

	function startDrag() {
		if (!pendingDrag || isDragging) return;
		isDragging = true;
		dragInfo = {
			source: pendingDrag.source,
			type: pendingDrag.type,
			blockId: pendingDrag.blockId,
			parentId: pendingDrag.parentId,
			index: pendingDrag.index,
			data: pendingDrag.data
		};
		if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
			try {
				navigator.vibrate(20);
			} catch {}
		}
	}

	function handlePointerDown(
		e: PointerEvent,
		source: 'palette' | 'workspace',
		type: BlockType,
		blockId?: string,
		parentId?: string | null,
		index?: number,
		data?: CodingBlock
	) {
		if (isRunning) return;
		if (e.button !== 0) return; // Only primary mouse/touch button

		// If user tapped on an interactive control (input or sub-button) INSIDE a workspace block, let that handle it
		const targetEl = e.target as HTMLElement;
		if (source === 'workspace' && targetEl.closest('input, button')) return;

		clearHoldTimer();

		isTouchPointer = e.pointerType === 'touch';
		activePointerEl = e.currentTarget as HTMLElement;
		try {
			activePointerEl?.setPointerCapture?.(e.pointerId);
		} catch {}

		const isHandle =
			source === 'palette' ||
			e.pointerType === 'mouse' ||
			Boolean(targetEl.closest('[data-drag-handle]'));

		pendingDrag = {
			source,
			type,
			blockId,
			parentId: parentId ?? null,
			index,
			data,
			startX: e.clientX,
			startY: e.clientY,
			pointerId: e.pointerId,
			isHandle
		};

		pointerPos = { x: e.clientX, y: e.clientY };

		if (!isHandle && e.pointerType === 'touch') {
			// On touch outside handle, start drag if held for 150ms
			holdTimer = setTimeout(() => {
				if (pendingDrag && !isDragging) {
					startDrag();
				}
			}, 150);
		}

		window.addEventListener('pointermove', onGlobalPointerMove, { passive: false });
		window.addEventListener('pointerup', onGlobalPointerUp);
		window.addEventListener('pointercancel', onGlobalPointerCancel);
	}

	function onGlobalPointerMove(e: PointerEvent) {
		if (!pendingDrag) return;
		if (e.pointerId !== pendingDrag.pointerId) return;

		pointerPos = { x: e.clientX, y: e.clientY };

		if (!isDragging) {
			const dx = e.clientX - pendingDrag.startX;
			const dy = e.clientY - pendingDrag.startY;
			const dist = Math.hypot(dx, dy);

			if (pendingDrag.source === 'palette') {
				if (e.pointerType === 'touch') {
					// Allow smooth horizontal scrolling if swipe is mostly horizontal
					if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dy) < 14) {
						if (paletteScrollEl) {
							paletteScrollEl.scrollLeft -= (e.clientX - pointerPos.x);
						}
						return;
					}
					// Drag downward into workspace or drag pulled out
					if (dy > 10 || dist > 16) {
						startDrag();
					}
				} else {
					// Mouse drag threshold
					if (dist > 5) {
						startDrag();
					}
				}
			} else if (pendingDrag.isHandle) {
				// Immediate drag detection for handle or mouse in workspace
				if (dist > 5) {
					startDrag();
				}
			} else {
				// Touch on block body in workspace:
				// If user moves primarily vertically quickly, it's an intentional vertical scroll of workspace
				if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
					clearHoldTimer();
					cleanupPointerListeners();
					pendingDrag = null;
					return;
				}
				// If moved horizontally or threshold exceeded, initiate drag
				if (dist > 12) {
					clearHoldTimer();
					startDrag();
				}
			}
		}

		if (isDragging) {
			if (e.cancelable) {
				e.preventDefault();
			}

			// Accurate hit testing using document.elementsFromPoint
			const elements = document.elementsFromPoint(e.clientX, e.clientY);

			// 1. Check Trash Drop Zone
			const trashEl = elements.find((el) => el.hasAttribute('data-drop-zone-trash'));
			if (trashEl) {
				isOverTrash = true;
				dropTarget = null;
				return;
			}
			isOverTrash = false;

			// 2. Check explicit slot indicators: [data-slot-parent] [data-slot-index]
			const slotEl = elements.find((el) => el.hasAttribute('data-slot-parent'));
			if (slotEl) {
				const pId = slotEl.getAttribute('data-slot-parent');
				const sIdx = parseInt(slotEl.getAttribute('data-slot-index') || '0', 10);
				dropTarget = {
					parentId: pId === 'root' ? null : pId,
					index: sIdx
				};
				return;
			}

			// 3. Check elements in order (deepest / topmost child first)
			let foundTarget: { parentId: string | null; index: number } | null = null;
			for (const el of elements) {
				if (el.hasAttribute('data-block-id')) {
					const bId = el.getAttribute('data-block-id');
					// Prevent dropping directly onto itself
					if (dragInfo?.blockId && bId === dragInfo.blockId) {
						continue;
					}
					const pId = el.getAttribute('data-block-parent');
					const bIdx = parseInt(el.getAttribute('data-block-index') || '0', 10);
					const rect = el.getBoundingClientRect();
					const midY = rect.top + rect.height / 2;
					const targetIndex = e.clientY < midY ? bIdx : bIdx + 1;
					foundTarget = {
						parentId: pId === 'root' ? null : pId,
						index: targetIndex
					};
					break;
				}

				if (el.hasAttribute('data-repeat-inner-id')) {
					const repId = el.getAttribute('data-repeat-inner-id');
					if (dragInfo?.blockId && repId === dragInfo.blockId) continue;
					const childCount = parseInt(el.getAttribute('data-child-count') || '0', 10);
					foundTarget = {
						parentId: repId,
						index: childCount
					};
					break;
				}

				if (el.hasAttribute('data-empty-canvas')) {
					foundTarget = { parentId: null, index: 0 };
					break;
				}

				if (el.hasAttribute('data-workspace-area')) {
					foundTarget = { parentId: null, index: workspaceBlocks.length };
					break;
				}
			}

			dropTarget = foundTarget;
		}
	}

	function cleanupPointerListeners() {
		clearHoldTimer();
		if (activePointerEl && pendingDrag) {
			try {
				activePointerEl.releasePointerCapture?.(pendingDrag.pointerId);
			} catch {}
		}
		activePointerEl = null;
		window.removeEventListener('pointermove', onGlobalPointerMove);
		window.removeEventListener('pointerup', onGlobalPointerUp);
		window.removeEventListener('pointercancel', onGlobalPointerCancel);
	}

	function onGlobalPointerUp(e: PointerEvent) {
		const wasDragging = isDragging;
		const currentDragInfo = dragInfo;
		const currentDropTarget = dropTarget;
		const currentPendingDrag = pendingDrag;

		cleanupPointerListeners();

		if (!wasDragging) {
			if (currentPendingDrag && currentPendingDrag.source === 'palette') {
				handleTapPaletteBlock(currentPendingDrag.type);
			}
			pendingDrag = null;
			return;
		}

		if (wasDragging && currentDragInfo) {
			if (isOverTrash) {
				// Drag to trash drop zone -> delete block
				if (currentDragInfo.source === 'workspace' && currentDragInfo.blockId) {
					workspaceBlocks = removeBlockById(workspaceBlocks, currentDragInfo.blockId);
				}
			} else if (currentDropTarget) {
				if (currentDragInfo.source === 'palette') {
					// Insert new block from palette
					const newBlock = createDefaultBlock(currentDragInfo.type);
					workspaceBlocks = insertBlockAt(workspaceBlocks, newBlock, currentDropTarget.parentId, currentDropTarget.index);
				} else if (currentDragInfo.source === 'workspace' && currentDragInfo.blockId) {
					// Reorder or move existing block
					const movingBlock = findBlockById(workspaceBlocks, currentDragInfo.blockId);
					if (movingBlock) {
						function isDescendant(parent: CodingBlock, targetId: string | null): boolean {
							if (!targetId || !parent.children) return false;
							return parent.children.some((c) => c.id === targetId || isDescendant(c, targetId));
						}

						// Guard: cannot drop container into itself or its own descendants
						if (currentDropTarget.parentId !== movingBlock.id && !isDescendant(movingBlock, currentDropTarget.parentId)) {
							const sameParent = (currentDragInfo.parentId ?? null) === currentDropTarget.parentId;
							let targetIndex = currentDropTarget.index;
							if (sameParent && currentDragInfo.index !== undefined && currentDragInfo.index < targetIndex) {
								targetIndex -= 1;
							}
							const cleaned = removeBlockById(workspaceBlocks, currentDragInfo.blockId);
							workspaceBlocks = insertBlockAt(cleaned, movingBlock, currentDropTarget.parentId, targetIndex);
						}
					}
				}
			} else {
				if (currentDragInfo.source === 'palette') {
					// Fallback: If drag was initiated from palette but released near origin or without target, treat as tap-to-add
					const dist = currentPendingDrag ? Math.hypot(e.clientX - currentPendingDrag.startX, e.clientY - currentPendingDrag.startY) : 0;
					if (dist < 36) {
						handleTapPaletteBlock(currentDragInfo.type);
					}
				} else if (currentDragInfo.source === 'workspace' && currentDragInfo.blockId) {
					// Dragged completely outside workspace area -> delete from sequence
					const elements = document.elementsFromPoint(e.clientX, e.clientY);
					const isInsideWorkspace = elements.some((el) => el.closest('[data-workspace-root]'));
					if (!isInsideWorkspace) {
						workspaceBlocks = removeBlockById(workspaceBlocks, currentDragInfo.blockId);
					}
				}
			}
		}

		isDragging = false;
		dragInfo = null;
		pendingDrag = null;
		dropTarget = null;
		isOverTrash = false;
	}

	function onGlobalPointerCancel() {
		cleanupPointerListeners();
		isDragging = false;
		dragInfo = null;
		pendingDrag = null;
		dropTarget = null;
		isOverTrash = false;
	}
</script>

<div
	data-workspace-root
	class="flex flex-col portrait:h-auto portrait:overflow-visible landscape:h-full md:h-full bg-slate-900/95 border border-slate-800 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 landscape:p-2.5 shadow-2xl overflow-hidden portrait:overflow-visible backdrop-blur-md select-none relative"
>
	<!-- Workspace Header -->
	<div class="flex items-center justify-between pb-2 sm:pb-3 landscape:pb-1.5 border-b border-slate-800 shrink-0">
		<div class="flex items-center gap-2">
			<div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
				<Icon name="puzzle" size={15} />
			</div>
			<div>
				<h3 class="font-bold text-white text-xs sm:text-sm landscape:text-xs tracking-wide">Penyusun Blok Logika</h3>
			</div>
			{#if attempts > 0}
				<span class="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
					{attempts}x RUN
				</span>
			{/if}
		</div>

		<div class="flex items-center gap-2">
			{#if maxMoves}
				<span class="text-[10px] sm:text-[11px] text-slate-400 font-mono hidden sm:inline bg-slate-950/60 px-2 py-0.5 sm:py-1 rounded-lg border border-slate-800">
					Batas: {maxMoves} langkah
				</span>
			{/if}
			<button
				type="button"
				onclick={() => (showPythonCode = !showPythonCode)}
				class="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border font-mono transition-colors flex items-center gap-1.5 cursor-pointer {showPythonCode
					? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
					: 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}"
			>
				<Icon name="python" size={13} />
				<span>{showPythonCode ? 'Tutup Python' : 'Lihat Python'}</span>
			</button>
		</div>
	</div>

	<!-- Python Live Code Preview Overlay -->
	{#if showPythonCode}
		<div class="mt-2 p-2 sm:p-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 shrink-0 animate-fade-in max-h-36 overflow-y-auto">
			<div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[11px] text-slate-400">
				<span>Kode Python Ekuivalen</span>
				<span class="text-[10px] text-slate-500 font-sans">Dihasilkan otomatis</span>
			</div>
			<pre class="overflow-x-auto p-1 leading-relaxed whitespace-pre-wrap">{blocksToPythonCode(workspaceBlocks)}</pre>
		</div>
	{/if}

	<!-- PALETTE BLOK KODING (DRAGGABLE + TAP TO ADD) -->
	<div class="py-2 sm:py-3 landscape:py-1.5 border-b border-slate-800 shrink-0">
		<div class="flex items-center justify-between mb-1.5 sm:mb-2">
			<span class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
				<Icon name="layout-grid" size={12} class="text-indigo-400" />
				<span>Palet Balok Kode</span>
			</span>
			<span class="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
				<Icon name="touch" size={11} class="sm:hidden text-cyan-400" />
				<Icon name="grip-vertical" size={11} class="hidden sm:inline" />
				<span class="sm:hidden">Ketuk / Tarik untuk menambah</span>
				<span class="hidden sm:inline">Ketuk atau tarik balok ke kanvas</span>
			</span>
		</div>

		<div
			bind:this={paletteScrollEl}
			class="flex flex-nowrap overflow-x-auto pb-2 scrollbar-none sm:flex-wrap gap-1.5 sm:gap-2"
		>
			{#each fullPalette as bType}
				{@const meta = getBlockMeta(bType)}
				<button
					type="button"
					tabindex="0"
					style="touch-action: none;"
					onpointerdown={(e) => handlePointerDown(e, 'palette', bType)}
					onclick={() => handleTapPaletteBlock(bType)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							handleTapPaletteBlock(bType);
						}
					}}
					class="group relative shrink-0 select-none rounded-xl border px-3 sm:px-3 py-2 sm:py-2 text-[11px] sm:text-xs font-black shadow-md cursor-grab active:cursor-grabbing transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:opacity-50 {meta.bgClass} flex items-center gap-1.5 sm:gap-2 min-h-[44px] touch-none"
					title="Ketuk atau tarik balok ini ke kanvas"
				>
					<!-- Puzzle connector hints on palette piece -->
					<div class="absolute -top-[2px] left-4 w-5 h-1 bg-slate-900/90 rounded-b-sm border-x border-b border-black/40 pointer-events-none"></div>
					<div class="absolute -bottom-1.5 left-4 w-5 h-1.5 rounded-b-sm border-x border-b border-black/30 shadow-xs pointer-events-none {meta.tabColor}"></div>

					<Icon name="grip-vertical" size={11} class="opacity-60 group-hover:opacity-100 shrink-0" />
					<Icon name={meta.icon} size={14} class="shrink-0" />
					<span>{meta.name}</span>
					<span class="hidden sm:inline text-[9px] font-mono text-white/75 bg-black/20 px-1 py-0.5 rounded border border-white/10">
						{meta.pyBadge}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- WORKSPACE SEQUENCE CANVAS -->
	<div
		data-workspace-area
		class="flex-1 flex flex-col pt-2.5 sm:pt-3 portrait:overflow-visible portrait:min-h-[160px] overflow-y-auto landscape:min-h-[220px] md:min-h-[220px] pb-16 sm:pb-2.5 relative rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-slate-800/80 bg-slate-950/40 backdrop-blur-sm"
		style="touch-action: pan-y;"
	>
		<!-- DRAG-TO-DELETE DROP ZONE (Appears dynamically while dragging from workspace) -->
		{#if isDragging && dragInfo?.source === 'workspace'}
			<div
				data-drop-zone-trash
				class="mb-3 py-2.5 px-4 rounded-2xl border-2 border-dashed transition-all duration-150 flex items-center justify-center gap-2 text-xs font-black shadow-lg select-none {isOverTrash
					? 'border-rose-400 bg-rose-950/80 text-rose-200 scale-[1.02] shadow-[0_0_25px_rgba(244,63,94,0.4)]'
					: 'border-rose-500/40 bg-rose-950/30 text-rose-400/90'}"
			>
				<Icon name="trash-2" size={16} class={isOverTrash ? 'animate-bounce text-rose-300' : ''} />
				<span>🗑 Lepaskan di sini untuk menghapus balok</span>
			</div>
		{/if}

		<!-- Empty State when no blocks are arranged -->
		{#if workspaceBlocks.length === 0}
			<div
				data-empty-canvas
				data-slot-parent="root"
				data-slot-index="0"
				class="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-6 text-slate-500 text-xs sm:text-sm border-2 border-dashed rounded-2xl transition-all duration-200 {isDragging
					? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.25)]'
					: 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700/80'}"
			>
				<div class="relative mb-3 flex items-center justify-center">
					<img
						src="/mascot/pybot-front-idle.png"
						alt="PyBot Mascot"
						class="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_8px_16px_rgba(6,182,212,0.3)] animate-pulse"
					/>
				</div>
				<p class="font-bold text-white text-sm sm:text-base mb-1">
					{isDragging ? 'LEPAS BLOK DI SINI!' : 'Mulai Program PyBot'}
				</p>
				<p class="text-xs text-slate-400 max-w-xs leading-relaxed">
					{isDragging
						? 'Lepaskan balok sekarang untuk menyusun langkah pertama PyBot.'
						: 'Tarik balok dari palet di atas ke kanvas ini untuk memprogram robot.'}
				</p>
				{#if isDragging}
					<div class="mt-3 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-black animate-bounce flex items-center gap-1.5 shadow-md shadow-cyan-500/30">
						<Icon name="corner-down-left" size={13} />
						<span>LEPASKAN DI SINI</span>
					</div>
				{/if}
			</div>

		{:else}
			<div class="flex flex-col space-y-1">
				<!-- Topmost insertion indicator before the first block -->
				{#if isDragging && dropTarget?.parentId === null && dropTarget?.index === 0}
					<div
						data-slot-parent="root"
						data-slot-index="0"
						class="my-1.5 py-1 px-3 rounded-xl border-2 border-dashed border-cyan-400 bg-cyan-950/60 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 text-[11px] font-black text-cyan-300 animate-pulse select-none"
					>
						<div class="h-0.5 flex-1 bg-cyan-400"></div>
						<div class="flex items-center gap-1.5 shrink-0">
							<Icon name="arrow-down" size={13} class="text-cyan-300" />
							<span>DROP DI SINI</span>
							<Icon name="arrow-down" size={13} class="text-cyan-300" />
						</div>
						<div class="h-0.5 flex-1 bg-cyan-400"></div>
					</div>
				{/if}

				{#each workspaceBlocks as block, i (block.id)}
					<!-- C-BLOCK (REPEAT / FOREVER) -->
					{#if block.type === 'REPEAT' || block.type === 'FOREVER'}
						<div
							role="group"
							aria-label="Balok Loop"
							data-block-id={block.id}
							data-block-parent="root"
							data-block-index={i}
							style="touch-action: none;"
							onpointerdown={(e) => handlePointerDown(e, 'workspace', block.type, block.id, null, i, block)}
							class="relative rounded-2xl border-2 shadow-lg overflow-visible transition-all duration-150 {block.type === 'REPEAT'
								? 'border-indigo-500 bg-indigo-950/40 shadow-indigo-900/20'
								: 'border-purple-500 bg-purple-950/40 shadow-purple-900/20'} {isDragging && dragInfo?.blockId === block.id
								? 'opacity-40 border-dashed scale-95'
								: ''}"
						>
							<!-- Top puzzle notch socket on C-block -->
							<div class="absolute -top-[2px] left-6 sm:left-8 w-7 h-2 bg-slate-900/90 rounded-b-md border-x border-b border-black/50 z-20 pointer-events-none"></div>

							<!-- C-Block Top Header -->
							<div
								class="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-t-[14px] flex items-center justify-between text-xs sm:text-sm font-black text-white cursor-grab active:cursor-grabbing {block.type === 'REPEAT'
									? 'bg-indigo-600'
									: 'bg-purple-600'}"
							>
								<div class="flex items-center gap-2 flex-wrap">
									<div
										data-drag-handle
										class="p-1 -m-1 cursor-grab active:cursor-grabbing text-white/70 hover:text-white touch-none flex items-center justify-center shrink-0"
										title="Tarik untuk memindahkan loop"
									>
										<Icon name="grip-vertical" size={13} class="shrink-0" />
									</div>
									<div class="w-6 h-6 rounded-lg bg-black/20 border border-white/20 flex items-center justify-center shrink-0">
										<Icon name={block.type === 'REPEAT' ? 'repeat' : 'refresh-cw'} size={14} />
									</div>
									<span>{block.type === 'REPEAT' ? 'ULANGI' : 'SELAMANYA'}</span>

									{#if block.type === 'REPEAT'}
										<!-- Editable repeat count with +/- buttons and direct input -->
										<div class="flex items-center bg-black/40 rounded-lg border border-white/20 px-1 py-0.5 ml-1">
											<button
												type="button"
												disabled={isRunning || (block.repeatCount || 4) <= 1}
												onclick={(e) => {
													e.stopPropagation();
													updateRepeatCount(block.id, (block.repeatCount || 4) - 1);
												}}
												class="w-5 h-5 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded cursor-pointer disabled:opacity-30"
												title="Kurangi jumlah perulangan"
											>-</button>
											<input
												type="number"
												min="1"
												max="10"
												value={block.repeatCount || 4}
												disabled={isRunning}
												onclick={(e) => e.stopPropagation()}
												onchange={(e) => {
													const val = parseInt((e.target as HTMLInputElement).value, 10);
													if (!isNaN(val)) updateRepeatCount(block.id, val);
												}}
												class="w-7 text-center bg-transparent font-mono font-black text-white text-xs outline-none focus:text-cyan-300"
											/>
											<button
												type="button"
												disabled={isRunning || (block.repeatCount || 4) >= 10}
												onclick={(e) => {
													e.stopPropagation();
													updateRepeatCount(block.id, (block.repeatCount || 4) + 1);
												}}
												class="w-5 h-5 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded cursor-pointer disabled:opacity-30"
												title="Tambah jumlah perulangan"
											>+</button>
										</div>
										<span class="text-[11px] text-white/90">KALI</span>
									{:else}
										<span class="text-[10px] font-mono text-purple-200 bg-black/20 px-1.5 py-0.5 rounded border border-purple-400/30">
											Loop Aman (Max 30)
										</span>
									{/if}
								</div>

								<div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											moveBlock(block.id, 'UP');
										}}
										disabled={isRunning || i === 0}
										class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-20 cursor-pointer"
										title="Geser loop ke atas"
										aria-label="Geser loop ke atas"
									>
										<Icon name="arrow-up" size={13} />
									</button>
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											moveBlock(block.id, 'DOWN');
										}}
										disabled={isRunning || i === workspaceBlocks.length - 1}
										class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-20 cursor-pointer"
										title="Geser loop ke bawah"
										aria-label="Geser loop ke bawah"
									>
										<Icon name="arrow-down" size={13} />
									</button>
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											handleDuplicate(block.id);
										}}
										disabled={isRunning}
										class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
										title="Duplikasi loop"
										aria-label="Duplikasi loop"
									>
										<Icon name="copy" size={13} />
									</button>
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											workspaceBlocks = removeBlockById(workspaceBlocks, block.id);
										}}
										disabled={isRunning}
										class="p-1 text-rose-200 hover:text-white hover:bg-rose-500/30 rounded transition-colors cursor-pointer"
										title="Hapus loop"
										aria-label="Hapus loop"
									>
										<Icon name="x" size={14} />
									</button>
								</div>
							</div>

							<!-- C-Block Nested Body (Indented Inner Slot with Left Spine) -->
							<div
								data-repeat-inner-id={block.id}
								data-child-count={block.children?.length || 0}
								class="pl-4 sm:pl-5 pr-2 py-2 flex flex-col space-y-2 border-l-[10px] sm:border-l-[12px] {block.type === 'REPEAT'
									? 'border-indigo-600 bg-indigo-950/25'
									: 'border-purple-600 bg-purple-950/25'}"
							>
								{#if !block.children || block.children.length === 0}
									<div
										data-slot-parent={block.id}
										data-slot-index="0"
										class="py-2.5 px-3 border border-dashed rounded-xl text-center text-xs font-bold transition-all duration-150 {isDragging && dropTarget?.parentId === block.id
											? 'border-cyan-400 bg-cyan-950/70 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-[1.01]'
											: 'border-slate-700 text-slate-400 bg-slate-900/60'}"
									>
										{#if isDragging && dropTarget?.parentId === block.id}
											<div class="flex items-center justify-center gap-1.5 text-cyan-300 animate-pulse">
												<Icon name="arrow-down" size={13} />
												<span>LEPAS KE DALAM LOOP</span>
												<Icon name="arrow-down" size={13} />
											</div>
										{:else}
											Tarik aksi ke dalam loop ini
										{/if}
									</div>
								{:else}
									{#each block.children as child, ci (child.id)}
										<!-- Inner Insertion Indicator -->
										{#if isDragging && dropTarget?.parentId === block.id && dropTarget?.index === ci}
											<div
												data-slot-parent={block.id}
												data-slot-index={ci}
												class="w-full my-1 py-0.5 rounded-lg border border-dashed border-cyan-400 bg-cyan-950/80 shadow-[0_0_15px_rgba(34,211,238,0.6)] flex items-center justify-center gap-1 text-[10px] font-black text-cyan-300 animate-pulse select-none"
											>
												<Icon name="arrow-down" size={11} />
												<span>MASUKKAN KE LOOP</span>
												<Icon name="arrow-down" size={11} />
											</div>
										{/if}

										{@const childMeta = getBlockMeta(child.type)}
										<div
											role="group"
											aria-label="Aksi dalam loop"
											data-block-id={child.id}
											data-block-parent={block.id}
											data-block-index={ci}
											style="touch-action: none;"
											onpointerdown={(e) => handlePointerDown(e, 'workspace', child.type, child.id, block.id, ci, child)}
											class="relative flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-bold shadow-md cursor-grab active:cursor-grabbing transition-transform hover:-translate-y-0.5 {childMeta.bgClass} {isDragging && dragInfo?.blockId === child.id
												? 'opacity-40 border-dashed scale-95'
												: ''}"
										>
											<!-- Inner child notch and tab -->
											<div class="absolute -top-[2px] left-5 w-5 h-1.5 bg-slate-900/90 rounded-b-sm border-x border-b border-black/50 pointer-events-none"></div>
											<div class="absolute -bottom-1.5 left-5 w-5 h-1.5 rounded-b-sm border-x border-b border-black/30 shadow-xs pointer-events-none {childMeta.tabColor}"></div>

											<div class="flex items-center gap-2">
												<div
													data-drag-handle
													class="p-1 -m-1 cursor-grab active:cursor-grabbing text-white/70 hover:text-white touch-none flex items-center justify-center shrink-0"
													title="Tarik untuk memindahkan balok"
												>
													<Icon name="grip-vertical" size={11} class="shrink-0" />
												</div>
												<div class="w-5 h-5 rounded bg-black/20 border border-white/20 flex items-center justify-center shrink-0">
													<Icon name={childMeta.icon} size={13} class="text-white" />
												</div>
												<span>{childMeta.name}</span>
											</div>
											<div class="flex items-center gap-1">
												<span class="text-[9px] font-mono text-white/70 hidden sm:inline mr-1">
													{childMeta.pyBadge}
												</span>
												<button
													type="button"
													onclick={(e) => {
														e.stopPropagation();
														moveBlock(child.id, 'UP');
													}}
													disabled={isRunning || ci === 0}
													class="p-0.5 text-white/70 hover:text-white rounded hover:bg-white/10 disabled:opacity-20 cursor-pointer"
													title="Geser ke atas"
													aria-label="Geser ke atas"
												>
													<Icon name="arrow-up" size={12} />
												</button>
												<button
													type="button"
													onclick={(e) => {
														e.stopPropagation();
														moveBlock(child.id, 'DOWN');
													}}
													disabled={isRunning || ci === block.children.length - 1}
													class="p-0.5 text-white/70 hover:text-white rounded hover:bg-white/10 disabled:opacity-20 cursor-pointer"
													title="Geser ke bawah"
													aria-label="Geser ke bawah"
												>
													<Icon name="arrow-down" size={12} />
												</button>
												<button
													type="button"
													onclick={(e) => {
														e.stopPropagation();
														workspaceBlocks = removeBlockById(workspaceBlocks, child.id);
													}}
													disabled={isRunning}
													class="p-0.5 text-rose-200 hover:text-white rounded hover:bg-rose-500/30 cursor-pointer"
													title="Hapus aksi"
													aria-label="Hapus aksi"
												>
													<Icon name="x" size={13} />
												</button>
											</div>
										</div>
									{/each}

									<!-- Quick Add Action to Loop Button -->
									<button
										type="button"
										disabled={isRunning}
										onclick={(e) => {
											e.stopPropagation();
											const m = createDefaultBlock('MOVE');
											workspaceBlocks = insertBlockAt(workspaceBlocks, m, block.id, block.children?.length || 0);
										}}
										class="mt-1 text-[10px] font-bold text-cyan-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 py-1 px-2.5 rounded-lg w-fit transition-colors cursor-pointer flex items-center gap-1 self-start shadow-sm"
									>
										<Icon name="plus" size={11} />
										<span>+ Tambah Gerak ke Loop</span>
									</button>

									<!-- Inner trailing indicator -->
									{#if isDragging && dropTarget?.parentId === block.id && dropTarget?.index === block.children.length}
										<div
											data-slot-parent={block.id}
											data-slot-index={block.children.length}
											class="w-full my-1 py-0.5 rounded-lg border border-dashed border-cyan-400 bg-cyan-950/80 shadow-[0_0_15px_rgba(34,211,238,0.6)] flex items-center justify-center gap-1 text-[10px] font-black text-cyan-300 animate-pulse select-none"
										>
											<Icon name="arrow-down" size={11} />
											<span>MASUKKAN KE LOOP</span>
											<Icon name="arrow-down" size={11} />
										</div>
									{/if}
								{/if}
							</div>

							<!-- C-Block Bottom Closing Bar -->
							<div
								class="h-3 rounded-b-[14px] px-3 relative {block.type === 'REPEAT'
									? 'bg-indigo-700'
									: 'bg-purple-700'}"
							>
								<!-- Bottom puzzle tab protrusion on C-block foot -->
								<div class="absolute -bottom-2 left-6 sm:left-8 w-7 h-2 rounded-b-md border-x border-b border-black/40 shadow-sm z-20 pointer-events-none {block.type === 'REPEAT' ? 'bg-indigo-700' : 'bg-purple-700'}"></div>
							</div>
						</div>
					{:else}
						<!-- STACK BLOCK (MAJU / BELOK KIRI / BELOK KANAN) -->
						{@const meta = getBlockMeta(block.type)}
						<div
							role="group"
							aria-label="Balok instruksi"
							data-block-id={block.id}
							data-block-parent="root"
							data-block-index={i}
							style="touch-action: none;"
							onpointerdown={(e) => handlePointerDown(e, 'workspace', block.type, block.id, null, i, block)}
							class="group relative flex items-center justify-between px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl border text-xs sm:text-sm font-black shadow-lg cursor-grab active:cursor-grabbing transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl {meta.bgClass} {isDragging && dragInfo?.blockId === block.id
								? 'opacity-40 border-dashed scale-95'
								: ''}"
						>
							<!-- Top puzzle notch socket -->
							<div class="absolute -top-[2px] left-6 sm:left-8 w-7 h-2 bg-slate-900/90 rounded-b-md border-x border-b border-black/50 z-20 pointer-events-none"></div>

							<!-- Bottom puzzle tab protrusion -->
							<div class="absolute -bottom-2 left-6 sm:left-8 w-7 h-2 rounded-b-md border-x border-b border-black/40 shadow-sm z-20 pointer-events-none {meta.tabColor}"></div>

							<!-- Left: Grab handle + Direction Icon + Name + Subtext -->
							<div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
								<div
									data-drag-handle
									class="p-1 -m-1 cursor-grab active:cursor-grabbing text-white/70 hover:text-white touch-none flex items-center justify-center shrink-0"
									title="Tarik untuk memindahkan balok"
								>
									<Icon name="grip-vertical" size={13} class="shrink-0" />
								</div>
								<div class="w-6 h-6 rounded-lg bg-black/20 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
									<Icon name={meta.icon} size={15} class="text-white" />
								</div>
								<span class="truncate">{meta.name}</span>
								<span class="text-[10px] font-normal text-white/80 hidden sm:inline ml-0.5 font-sans">
									({meta.subtext})
								</span>
							</div>

							<!-- Right: Python Badge + Actions -->
							<div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
								<span class="text-[9px] sm:text-[10px] font-mono text-white/70 hidden md:inline mr-1 bg-black/20 px-2 py-0.5 rounded-md">
									{meta.pyBadge}
								</span>
								<button
									type="button"
									onclick={(e) => {
										e.stopPropagation();
										moveBlock(block.id, 'UP');
									}}
									disabled={isRunning || i === 0}
									class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-20 cursor-pointer"
									title="Geser balok ke atas"
									aria-label="Geser balok ke atas"
								>
									<Icon name="arrow-up" size={13} />
								</button>
								<button
									type="button"
									onclick={(e) => {
										e.stopPropagation();
										moveBlock(block.id, 'DOWN');
									}}
									disabled={isRunning || i === workspaceBlocks.length - 1}
									class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-20 cursor-pointer"
									title="Geser balok ke bawah"
									aria-label="Geser balok ke bawah"
								>
									<Icon name="arrow-down" size={13} />
								</button>
								<button
									type="button"
									onclick={(e) => {
										e.stopPropagation();
										handleDuplicate(block.id);
									}}
									disabled={isRunning}
									class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
									title="Duplikasi balok"
									aria-label="Duplikasi balok"
								>
									<Icon name="copy" size={13} />
								</button>
								<button
									type="button"
									onclick={(e) => {
										e.stopPropagation();
										workspaceBlocks = removeBlockById(workspaceBlocks, block.id);
									}}
									disabled={isRunning}
									class="p-1 text-rose-200 hover:text-white hover:bg-rose-500/30 rounded transition-colors cursor-pointer"
									title="Hapus balok"
									aria-label="Hapus balok"
								>
									<Icon name="x" size={14} />
								</button>
							</div>
						</div>
					{/if}

					<!-- Insertion indicator between blocks or after last block -->
					{#if isDragging && dropTarget?.parentId === null && dropTarget?.index === i + 1}
						<div
							data-slot-parent="root"
							data-slot-index={i + 1}
							class="my-1.5 py-1 px-3 rounded-xl border-2 border-dashed border-cyan-400 bg-cyan-950/60 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 text-[11px] font-black text-cyan-300 animate-pulse select-none"
						>
							<div class="h-0.5 flex-1 bg-cyan-400"></div>
							<div class="flex items-center gap-1.5 shrink-0">
								<Icon name="arrow-down" size={13} class="text-cyan-300" />
								<span>DROP DI SINI</span>
								<Icon name="arrow-down" size={13} class="text-cyan-300" />
							</div>
							<div class="h-0.5 flex-1 bg-cyan-400"></div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<!-- Bottom Section: Run & Reset Buttons (Sticky on mobile portrait) -->
	<div class="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 landscape:pt-1.5 border-t border-slate-800 mt-1 sm:mt-2 landscape:mt-1 shrink-0 sticky bottom-0 z-20 bg-slate-900/95 backdrop-blur-md p-2 -mx-2.5 -mb-2.5 rounded-b-2xl sm:static sm:bg-transparent sm:p-0 sm:m-0 sm:border-t">
		<button
			type="button"
			onclick={onReset}
			disabled={isRunning}
			class="group px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800/90 hover:bg-slate-700/90 active:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-amber-500/10 active:scale-95"
			title="Kembalikan posisi PyBot ke titik awal"
		>
			<Icon name="rotate-ccw" size={15} class="text-amber-400 group-hover:-rotate-45 transition-transform duration-200" />
			<span class="hidden sm:inline">Reset Posisi</span>
			<span class="sm:hidden">Reset</span>
		</button>

		<button
			type="button"
			onclick={onRun}
			disabled={workspaceBlocks.length === 0 || isRunning}
			class="flex-1 py-2 sm:py-2.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 border-b-2 border-emerald-700 uppercase"
		>
			{#if isRunning}
				<span class="relative flex h-3 w-3">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
				</span>
				<span class="animate-pulse">Menjalankan Kode...</span>
			{:else}
				<Icon name="play" size={15} class="fill-current text-slate-950" />
				<span>JALANKAN KODE (RUN)</span>
			{/if}
		</button>
	</div>
</div>

<!-- ========================================== -->
<!-- FLOATING GHOST PREVIEW (FOLLOWS CURSOR/FINGER) -->
<!-- ========================================== -->
{#if isDragging && dragInfo}
	{@const meta = getBlockMeta(dragInfo.type)}
	<div
		class="fixed pointer-events-none z-[99999] select-none will-change-transform {isTouchPointer
			? '-translate-x-1/2 -translate-y-[125%]'
			: '-translate-x-1/2 -translate-y-1/2'}"
		style="left: {pointerPos.x}px; top: {pointerPos.y}px;"
	>
		<div
			class="relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border-2 font-black text-xs sm:text-sm text-white flex items-center gap-2 sm:gap-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-md rotate-2 scale-105 {meta.bgClass} {isOverTrash
				? 'opacity-60 grayscale ring-4 ring-rose-500/60'
				: 'ring-4 ring-cyan-400/50'}"
		>
			<div class="absolute -top-[2px] left-6 w-6 h-1.5 bg-slate-900/90 rounded-b-md border-x border-b border-black/50"></div>
			<div class="absolute -bottom-1.5 left-6 w-6 h-1.5 rounded-b-md border-x border-b border-black/30 shadow-xs {meta.tabColor}"></div>

			<Icon name="grip-vertical" size={13} class="text-white/70" />
			<Icon name={meta.icon} size={16} />
			<span>{meta.name}</span>
			{#if dragInfo.type === 'REPEAT' && dragInfo.data?.repeatCount}
				<span class="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono border border-white/20">
					{dragInfo.data.repeatCount}x
				</span>
			{/if}
			<span class="text-[10px] font-mono text-white/70 ml-1">
				{meta.pyBadge}
			</span>
		</div>
	</div>
{/if}
