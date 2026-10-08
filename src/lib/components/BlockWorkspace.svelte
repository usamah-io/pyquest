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
				repeatCount: 2,
				children: []
			};
		}
		if (type === 'FOREVER') {
			return {
				id: makeId(),
				type: 'FOREVER',
				children: []
			};
		}
		return {
			id: makeId(),
			type
		};
	}

	function deleteBlock(id: string) {
		if (isRunning) return;
		workspaceBlocks = removeBlockById(workspaceBlocks, id);
		if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
			try {
				navigator.vibrate(20);
			} catch {}
		}
	}

	function extractChildBlock(parentId: string, childId: string) {
		if (isRunning) return;
		const parentIndex = workspaceBlocks.findIndex((b) => b.id === parentId);
		const child = findBlockById(workspaceBlocks, childId);
		if (!child) return;

		const cleaned = removeBlockById(workspaceBlocks, childId);
		const insertIdx = parentIndex !== -1 ? parentIndex + 1 : cleaned.length;
		workspaceBlocks = insertBlockAt(cleaned, child, null, insertIdx);

		if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
			try {
				navigator.vibrate(15);
			} catch {}
		}
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
	// ==========================================
	// TRUE DRAG & DROP ENGINE (POINTER EVENTS ONLY - NO CLICK-TO-ADD)
	// ==========================================
	const DRAG_THRESHOLD = 8; // Movement threshold (px) to distinguish click from intentional drag
	let activePointerEl: HTMLElement | null = null;
	let isTouchPointer = $state(false);
	let paletteScrollEl: HTMLElement | null = $state(null);
	let workspaceAreaEl: HTMLElement | null = $state(null);
	let autoScrollFrameId: number | null = null;
	let currentScrollSpeed = 0;

	function updateAutoScroll(clientY: number) {
		if (!isDragging || !workspaceAreaEl) {
			stopAutoScroll();
			return;
		}

		const rect = workspaceAreaEl.getBoundingClientRect();
		const edgeZone = 45;

		if (clientY < rect.top + edgeZone && clientY >= rect.top - 20) {
			const dist = Math.max(1, rect.top + edgeZone - clientY);
			currentScrollSpeed = -Math.min(18, Math.round(dist / 2));
			startAutoScrollLoop();
		} else if (clientY > rect.bottom - edgeZone && clientY <= rect.bottom + 20) {
			const dist = Math.max(1, clientY - (rect.bottom - edgeZone));
			currentScrollSpeed = Math.min(18, Math.round(dist / 2));
			startAutoScrollLoop();
		} else {
			stopAutoScroll();
		}
	}

	function startAutoScrollLoop() {
		if (autoScrollFrameId !== null) return;
		function step() {
			if (isDragging && workspaceAreaEl && currentScrollSpeed !== 0) {
				workspaceAreaEl.scrollTop += currentScrollSpeed;
				autoScrollFrameId = requestAnimationFrame(step);
			} else {
				stopAutoScroll();
			}
		}
		autoScrollFrameId = requestAnimationFrame(step);
	}

	function stopAutoScroll() {
		if (autoScrollFrameId !== null) {
			cancelAnimationFrame(autoScrollFrameId);
			autoScrollFrameId = null;
		}
		currentScrollSpeed = 0;
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

	function findDropTarget(clientX: number, clientY: number): {
		isTrash: boolean;
		target: { parentId: string | null; index: number } | null;
	} {
		if (typeof document === 'undefined') {
			return { isTrash: false, target: null };
		}

		// 1. If dragging a block from workspace, dropping outside the workspace area deletes it
		if (dragInfo?.source === 'workspace' && workspaceAreaEl) {
			const wRect = workspaceAreaEl.getBoundingClientRect();
			const margin = 10;
			const isOutside =
				clientX < wRect.left - margin ||
				clientX > wRect.right + margin ||
				clientY < wRect.top - margin ||
				clientY > wRect.bottom + margin;

			if (isOutside) {
				return { isTrash: true, target: null };
			}
		}

		// Helper to probe elements at coordinate
		function probeAt(x: number, y: number) {
			const elements = document.elementsFromPoint(x, y);

			// Check Trash Drop Zone
			const trashEl = elements.find((el) => el.hasAttribute('data-drop-zone-trash'));
			if (trashEl) {
				return { isTrash: true, target: null };
			}

			// Check explicit slot indicators: [data-slot-parent] [data-slot-index]
			const slotEl = elements.find((el) => el.hasAttribute('data-slot-parent'));
			if (slotEl) {
				const pId = slotEl.getAttribute('data-slot-parent');
				const sIdx = parseInt(slotEl.getAttribute('data-slot-index') || '0', 10);
				return {
					isTrash: false,
					target: {
						parentId: pId === 'root' ? null : pId,
						index: sIdx
					}
				};
			}

			// Check elements in order (deepest / topmost child first)
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
					const targetIndex = y < midY ? bIdx : bIdx + 1;
					return {
						isTrash: false,
						target: {
							parentId: pId === 'root' ? null : pId,
							index: targetIndex
						}
					};
				}

				if (el.hasAttribute('data-repeat-inner-id')) {
					const repId = el.getAttribute('data-repeat-inner-id');
					if (dragInfo?.blockId && repId === dragInfo.blockId) continue;
					const childCount = parseInt(el.getAttribute('data-child-count') || '0', 10);
					return {
						isTrash: false,
						target: {
							parentId: repId,
							index: childCount
						}
					};
				}

				if (el.hasAttribute('data-empty-canvas')) {
					return {
						isTrash: false,
						target: { parentId: null, index: 0 }
					};
				}

				if (el.hasAttribute('data-workspace-area')) {
					return {
						isTrash: false,
						target: { parentId: null, index: workspaceBlocks.length }
					};
				}
			}

			return null;
		}

		// Primary probe at exact pointer position
		const primaryHit = probeAt(clientX, clientY);
		if (primaryHit) return primaryHit;

		// On touch, if finger is slightly below a block/workspace, probe slightly above
		if (isTouchPointer) {
			const touchForgiveHit = probeAt(clientX, clientY - 45);
			if (touchForgiveHit) return touchForgiveHit;
		}

		return { isTrash: dragInfo?.source === 'workspace', target: null };
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
		if (e.button !== 0) return; // Only primary mouse button or touch contact

		// If user tapped on an interactive control (input or sub-button) INSIDE a block, let that handle it
		const targetEl = e.target as HTMLElement;
		if (targetEl.closest('input, button')) return;

		e.stopPropagation();

		isTouchPointer = e.pointerType === 'touch';
		activePointerEl = e.currentTarget as HTMLElement;
		try {
			activePointerEl?.setPointerCapture?.(e.pointerId);
		} catch {}

		pendingDrag = {
			source,
			type,
			blockId,
			parentId: parentId ?? null,
			index,
			data,
			startX: e.clientX,
			startY: e.clientY,
			pointerId: e.pointerId
		};

		pointerPos = { x: e.clientX, y: e.clientY };

		window.addEventListener('pointermove', onGlobalPointerMove, { passive: false });
		window.addEventListener('pointerup', onGlobalPointerUp);
		window.addEventListener('pointercancel', onGlobalPointerCancel);
	}

	function onGlobalPointerMove(e: PointerEvent) {
		if (!pendingDrag) return;
		if (e.pointerId !== pendingDrag.pointerId) return;

		pointerPos = { x: e.clientX, y: e.clientY };

		// Intentional Drag Start: only activate dragging after movement exceeds threshold
		if (!isDragging) {
			const dx = e.clientX - pendingDrag.startX;
			const dy = e.clientY - pendingDrag.startY;
			const dist = Math.hypot(dx, dy);

			if (dist >= DRAG_THRESHOLD) {
				startDrag();
			}
		}

		if (isDragging) {
			if (e.cancelable) {
				e.preventDefault();
			}

			updateAutoScroll(e.clientY);

			// Hit-testing for drop zones and insertion indicators
			const hit = findDropTarget(e.clientX, e.clientY);
			isOverTrash = hit.isTrash;
			dropTarget = hit.target;
		}
	}

	function cleanupPointerListeners() {
		stopAutoScroll();
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

		// Hit-test at final release coordinates
		let finalDropTarget = dropTarget;
		let finalIsOverTrash = isOverTrash;
		if (wasDragging) {
			const res = findDropTarget(e.clientX, e.clientY);
			finalIsOverTrash = res.isTrash;
			if (res.target) {
				finalDropTarget = res.target;
			}
		}

		cleanupPointerListeners();

		// STRICT RULE: Simple click/tap does NOTHING!
		// Clicking a block alone must NEVER add, move, or modify workspace blocks!
		if (!wasDragging) {
			isDragging = false;
			dragInfo = null;
			pendingDrag = null;
			dropTarget = null;
			isOverTrash = false;
			return;
		}

		// INTENTIONAL DRAG & DROP INSERTION / REORDERING / DELETION
		if (currentDragInfo) {
			if (currentDragInfo.source === 'workspace' && (finalIsOverTrash || !finalDropTarget)) {
				// Dragged outside workspace canvas or to trash -> Delete block
				if (currentDragInfo.blockId) {
					workspaceBlocks = removeBlockById(workspaceBlocks, currentDragInfo.blockId);
					if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
						try { navigator.vibrate(25); } catch {}
					}
				}
			} else if (finalDropTarget) {
				if (currentDragInfo.source === 'palette') {
					// Physical Drag from Palette -> Insert new block at destination
					const newBlock = createDefaultBlock(currentDragInfo.type);
					workspaceBlocks = insertBlockAt(
						workspaceBlocks,
						newBlock,
						finalDropTarget.parentId,
						finalDropTarget.index
					);
					if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
						try { navigator.vibrate(20); } catch {}
					}
				} else if (currentDragInfo.source === 'workspace' && currentDragInfo.blockId) {
					// Reorder or reposition existing workspace block
					const movingBlock = findBlockById(workspaceBlocks, currentDragInfo.blockId);
					if (movingBlock) {
						function isDescendant(parent: CodingBlock, targetId: string | null): boolean {
							if (!targetId || !parent.children) return false;
							return parent.children.some((c) => c.id === targetId || isDescendant(c, targetId));
						}

						// Guard: cannot drop container into itself or its own descendants
						if (
							finalDropTarget.parentId !== movingBlock.id &&
							!isDescendant(movingBlock, finalDropTarget.parentId)
						) {
							const sameParent = (currentDragInfo.parentId ?? null) === finalDropTarget.parentId;
							let targetIndex = finalDropTarget.index;
							if (
								sameParent &&
								currentDragInfo.index !== undefined &&
								currentDragInfo.index < targetIndex
							) {
								targetIndex -= 1;
							}
							const cleaned = removeBlockById(workspaceBlocks, currentDragInfo.blockId);
							workspaceBlocks = insertBlockAt(
								cleaned,
								movingBlock,
								finalDropTarget.parentId,
								targetIndex
							);
							if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
								try { navigator.vibrate(15); } catch {}
							}
						}
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
	class="flex flex-col h-full bg-slate-900/95 border border-slate-800 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 landscape:p-2.5 shadow-2xl overflow-hidden backdrop-blur-md select-none relative"
>
	<!-- Workspace Header -->
	<div class="flex items-center justify-between pb-2 sm:pb-2.5 landscape:pb-1.5 border-b border-slate-800 shrink-0">
		<div class="flex items-center gap-2">
			<div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
				<Icon name="puzzle" size={15} />
			</div>
			<div>
				<h3 class="font-bold text-white text-xs sm:text-sm landscape:text-xs tracking-wide">Penyusun Balok Logika</h3>
			</div>
			{#if attempts > 0}
				<span class="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
					{attempts}x RUN
				</span>
			{/if}
		</div>

		<div class="flex items-center gap-2">
			{#if maxMoves}
				<span class="text-[10px] sm:text-[11px] text-slate-300 font-mono bg-slate-950/80 px-2 py-0.5 sm:py-1 rounded-lg border border-slate-800 flex items-center gap-1 shrink-0">
					<Icon name="zap" size={11} class="text-amber-400" />
					<span>Batas: {maxMoves} langkah</span>
				</span>
			{/if}
			<button
				type="button"
				onclick={() => (showPythonCode = !showPythonCode)}
				class="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border font-mono transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 {showPythonCode
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

	<!-- PALETTE BLOK KODING (DRAG & DROP ONLY) -->
	<div class="py-2 sm:py-2.5 landscape:py-1.5 border-b border-slate-800 shrink-0">
		<div class="flex items-center justify-between mb-1.5 sm:mb-2">
			<span class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
				<Icon name="layout-grid" size={12} class="text-indigo-400" />
				<span>Palet Balok Kode</span>
			</span>
			<span class="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
				<span>Tarik balok ke kanvas</span>
			</span>
		</div>

		<div
			bind:this={paletteScrollEl}
			class="flex flex-wrap gap-1.5 sm:gap-2 pb-1"
		>
			{#each fullPalette as bType}
				{@const meta = getBlockMeta(bType)}
				<div
					role="button"
					tabindex="0"
					style="touch-action: none;"
					onpointerdown={(e) => handlePointerDown(e, 'palette', bType)}
					class="group relative shrink-0 select-none rounded-xl border px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black shadow-md cursor-grab active:cursor-grabbing transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:opacity-50 {meta.bgClass} flex items-center gap-2 min-h-[38px] touch-none w-fit"
					title="Tarik balok ini ke kanvas"
				>
					<!-- Puzzle connector notch & tab -->
					<div class="absolute -top-[2px] left-4 w-5 h-1 bg-slate-900/90 rounded-b-sm border-x border-b border-black/40 pointer-events-none"></div>
					<div class="absolute -bottom-1.5 left-4 w-5 h-1.5 rounded-b-sm border-x border-b border-black/30 shadow-xs pointer-events-none {meta.tabColor}"></div>

					<!-- EXACTLY ONE ICON -->
					<div class="w-5 h-5 rounded-md bg-black/20 border border-white/20 flex items-center justify-center shrink-0">
						<Icon name={meta.icon} size={13} class="text-white" />
					</div>
					<span>{meta.name}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- WORKSPACE SEQUENCE CANVAS (CONTROLLED HEIGHT & VERTICAL SCROLL) -->
	<div
		bind:this={workspaceAreaEl}
		data-workspace-area
		class="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col pt-2 pb-2 px-1 relative rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-950/40 backdrop-blur-sm mt-2"
		style="touch-action: pan-y;"
	>
		<!-- DRAG-TO-DELETE HINT / DROP ZONE -->
		{#if isDragging && dragInfo?.source === 'workspace'}
			<div
				data-drop-zone-trash
				class="mb-2 py-1.5 px-3 rounded-xl border border-dashed transition-all duration-150 flex items-center justify-center gap-1.5 text-[11px] font-bold select-none shrink-0 {isOverTrash
					? 'border-rose-400 bg-rose-950/80 text-rose-200 ring-2 ring-rose-500/50 scale-[1.01]'
					: 'border-rose-500/40 bg-rose-950/30 text-rose-400/90'}"
			>
				<Icon name="trash-2" size={13} class={isOverTrash ? 'animate-bounce text-rose-300' : ''} />
				<span>{isOverTrash ? 'Lepaskan untuk menghapus balok' : 'Tarik ke luar kanvas untuk menghapus'}</span>
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
			<div class="flex flex-col items-start space-y-1">
				<!-- Topmost insertion indicator before the first block -->
				{#if isDragging && dropTarget?.parentId === null && dropTarget?.index === 0}
					<div
						data-slot-parent="root"
						data-slot-index="0"
						class="w-full my-1 py-1 px-3 rounded-xl border-2 border-dashed border-cyan-400 bg-cyan-950/60 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 text-[11px] font-black text-cyan-300 animate-pulse select-none"
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
							class="relative rounded-2xl border-2 shadow-lg overflow-visible transition-all duration-150 w-fit min-w-[210px] max-w-full select-none {block.type === 'REPEAT'
								? 'border-indigo-500 bg-indigo-950/40 shadow-indigo-900/20'
								: 'border-purple-500 bg-purple-950/40 shadow-purple-900/20'} {isDragging && dragInfo?.blockId === block.id
								? 'opacity-40 border-dashed scale-95'
								: ''}"
						>
							<!-- Top puzzle notch socket on C-block -->
							<div class="absolute -top-[2px] left-5 sm:left-6 w-6 h-1.5 bg-slate-900/90 rounded-b-sm border-x border-b border-black/50 z-20 pointer-events-none"></div>

							<!-- C-Block Top Header -->
							<div
								role="button"
								tabindex="0"
								aria-label="Tarik blok loop"
								style="touch-action: none;"
								onpointerdown={(e) => handlePointerDown(e, 'workspace', block.type, block.id, null, i, block)}
								class="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-t-[14px] flex items-center justify-between gap-2 text-xs sm:text-sm font-black text-white cursor-grab active:cursor-grabbing {block.type === 'REPEAT'
									? 'bg-indigo-600'
									: 'bg-purple-600'}"
							>
								<div class="flex items-center gap-1.5 sm:gap-2">
									<!-- Exactly ONE icon -->
									<div class="w-5 h-5 rounded-md bg-black/20 border border-white/20 flex items-center justify-center shrink-0">
										<Icon name={block.type === 'REPEAT' ? 'repeat' : 'refresh-cw'} size={13} />
									</div>
									<span>{block.type === 'REPEAT' ? 'ULANGI' : 'SELAMANYA'}</span>

									{#if block.type === 'REPEAT'}
										<!-- Editable repeat count with +/- buttons and direct input -->
										<div class="flex items-center bg-black/40 rounded-lg border border-white/20 px-1 py-0.5 ml-1">
											<button
												type="button"
												disabled={isRunning || (block.repeatCount || 4) <= 1}
												onpointerdown={(e) => e.stopPropagation()}
												onclick={(e) => {
													e.stopPropagation();
													updateRepeatCount(block.id, (block.repeatCount || 4) - 1);
												}}
												class="w-4 h-4 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded cursor-pointer disabled:opacity-30 text-xs"
												title="Kurangi jumlah perulangan"
											>-</button>
											<input
												type="number"
												min="1"
												max="10"
												value={block.repeatCount || 4}
												disabled={isRunning}
												onpointerdown={(e) => e.stopPropagation()}
												onclick={(e) => e.stopPropagation()}
												onchange={(e) => {
													const val = parseInt((e.target as HTMLInputElement).value, 10);
													if (!isNaN(val)) updateRepeatCount(block.id, val);
												}}
												class="w-6 text-center bg-transparent font-mono font-black text-white text-xs outline-none focus:text-cyan-300"
											/>
											<button
												type="button"
												disabled={isRunning || (block.repeatCount || 4) >= 10}
												onpointerdown={(e) => e.stopPropagation()}
												onclick={(e) => {
													e.stopPropagation();
													updateRepeatCount(block.id, (block.repeatCount || 4) + 1);
												}}
												class="w-4 h-4 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded cursor-pointer disabled:opacity-30 text-xs"
												title="Tambah jumlah perulangan"
											>+</button>
										</div>
										<span class="text-[11px] text-white/90">KALI</span>
									{:else}
										<span class="text-[10px] font-mono text-purple-200 bg-black/20 px-1.5 py-0.5 rounded border border-purple-400/30">
											Loop Aman
										</span>
									{/if}
								</div>

								<!-- Quick delete button for C-block -->
								<button
									type="button"
									disabled={isRunning}
									onpointerdown={(e) => e.stopPropagation()}
									onclick={(e) => {
										e.stopPropagation();
										deleteBlock(block.id);
									}}
									class="w-5 h-5 flex items-center justify-center rounded-md bg-black/20 hover:bg-rose-500 text-white/70 hover:text-white transition-colors cursor-pointer text-xs ml-2"
									title="Hapus loop ini"
								>
									<Icon name="x" size={12} />
								</button>
							</div>

							<!-- C-Block Nested Body (Indented Inner Slot with Left Spine) -->
							<div
								data-repeat-inner-id={block.id}
								data-child-count={block.children?.length || 0}
								class="pl-4 pr-3 py-1.5 flex flex-col items-start space-y-1 border-l-[12px] {block.type === 'REPEAT'
									? 'border-indigo-600 bg-indigo-950/25'
									: 'border-purple-600 bg-purple-950/25'}"
							>
								{#if !block.children || block.children.length === 0}
									<div
										data-slot-parent={block.id}
										data-slot-index="0"
										class="py-2 px-3 border border-dashed rounded-xl text-xs font-bold transition-all duration-150 {isDragging && dropTarget?.parentId === block.id
											? 'border-cyan-400 bg-cyan-950/70 text-cyan-200'
											: 'border-slate-700 text-slate-400 bg-slate-900/60'}"
									>
										Tarik balok ke dalam loop
									</div>
								{:else}
									{#each block.children as child, ci (child.id)}
										<!-- Inner Insertion Indicator -->
										{#if isDragging && dropTarget?.parentId === block.id && dropTarget?.index === ci}
											<div
												data-slot-parent={block.id}
												data-slot-index={ci}
												class="w-full my-0.5 py-0.5 rounded-lg border border-dashed border-cyan-400 bg-cyan-950/80 flex items-center justify-center gap-1 text-[10px] font-black text-cyan-300 animate-pulse select-none"
											>
												<Icon name="arrow-down" size={10} />
												<span>MASUKKAN KE LOOP</span>
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
											onpointerdown={(e) => {
												e.stopPropagation();
												handlePointerDown(e, 'workspace', child.type, child.id, block.id, ci, child);
											}}
											class="group/child relative flex items-center justify-between gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm cursor-grab active:cursor-grabbing transition-transform hover:-translate-y-0.5 select-none w-fit min-w-[140px] {childMeta.bgClass} {isDragging && dragInfo?.blockId === child.id
												? 'opacity-40 border-dashed scale-95'
												: ''}"
										>
											<!-- Inner child notch and tab -->
											<div class="absolute -top-[2px] left-4 w-5 h-1.5 bg-slate-900/90 rounded-b-sm border-x border-b border-black/50 pointer-events-none"></div>
											<div class="absolute -bottom-1.5 left-4 w-5 h-1.5 rounded-b-sm border-x border-b border-black/30 shadow-xs pointer-events-none {childMeta.tabColor}"></div>

											<div class="flex items-center gap-1.5">
												<div class="w-5 h-5 rounded bg-black/20 border border-white/20 flex items-center justify-center shrink-0">
													<Icon name={childMeta.icon} size={13} class="text-white" />
												</div>
												<span>{childMeta.name}</span>
											</div>

											<div class="flex items-center gap-1 ml-auto pl-1.5">
												<!-- Extract button -->
												<button
													type="button"
													disabled={isRunning}
													onpointerdown={(e) => e.stopPropagation()}
													onclick={(e) => {
														e.stopPropagation();
														extractChildBlock(block.id, child.id);
													}}
													class="w-5 h-5 flex items-center justify-center rounded bg-black/20 hover:bg-cyan-500/80 text-white/70 hover:text-white transition-colors cursor-pointer text-xs"
													title="Keluarkan dari loop ke kanvas utama"
												>
													<Icon name="corner-up-left" size={11} />
												</button>
												<!-- Delete button -->
												<button
													type="button"
													disabled={isRunning}
													onpointerdown={(e) => e.stopPropagation()}
													onclick={(e) => {
														e.stopPropagation();
														deleteBlock(child.id);
													}}
													class="w-5 h-5 flex items-center justify-center rounded bg-black/20 hover:bg-rose-500 text-white/70 hover:text-white transition-colors cursor-pointer text-xs"
													title="Hapus balok ini"
												>
													<Icon name="x" size={11} />
												</button>
											</div>
										</div>
									{/each}

									<!-- Inner trailing indicator -->
									{#if isDragging && dropTarget?.parentId === block.id && dropTarget?.index === block.children.length}
										<div
											data-slot-parent={block.id}
											data-slot-index={block.children.length}
											class="w-full my-0.5 py-0.5 rounded-lg border border-dashed border-cyan-400 bg-cyan-950/80 flex items-center justify-center gap-1 text-[10px] font-black text-cyan-300 animate-pulse select-none"
										>
											<Icon name="arrow-down" size={10} />
											<span>MASUKKAN KE LOOP</span>
										</div>
									{/if}
								{/if}
							</div>

							<!-- C-Block Bottom Closing Bar -->
							<div
								role="button"
								tabindex="0"
								aria-label="Tarik penutup loop"
								style="touch-action: none;"
								onpointerdown={(e) => handlePointerDown(e, 'workspace', block.type, block.id, null, i, block)}
								class="h-3 rounded-b-[14px] px-3 relative cursor-grab active:cursor-grabbing {block.type === 'REPEAT'
									? 'bg-indigo-700'
									: 'bg-purple-700'}"
							>
								<!-- Bottom puzzle tab protrusion on C-block foot -->
								<div class="absolute -bottom-1.5 left-5 sm:left-6 w-6 h-1.5 rounded-b-sm border-x border-b border-black/40 shadow-xs z-20 pointer-events-none {block.type === 'REPEAT' ? 'bg-indigo-700' : 'bg-purple-700'}"></div>
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
							class="group relative flex items-center justify-between gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border text-xs sm:text-sm font-black shadow-md cursor-grab active:cursor-grabbing transition-transform hover:-translate-y-0.5 select-none w-fit min-w-[140px] {meta.bgClass} {isDragging && dragInfo?.blockId === block.id
								? 'opacity-40 border-dashed scale-95'
								: ''}"
						>
							<!-- Top puzzle notch socket -->
							<div class="absolute -top-[2px] left-5 w-6 h-1.5 bg-slate-900/90 rounded-b-sm border-x border-b border-black/50 z-20 pointer-events-none"></div>

							<!-- Bottom puzzle tab protrusion -->
							<div class="absolute -bottom-1.5 left-5 w-6 h-1.5 rounded-b-sm border-x border-b border-black/40 shadow-xs z-20 pointer-events-none {meta.tabColor}"></div>

							<div class="flex items-center gap-2">
								<!-- EXACTLY ONE ICON -->
								<div class="w-5 h-5 rounded-md bg-black/20 border border-white/20 flex items-center justify-center shrink-0">
									<Icon name={meta.icon} size={14} class="text-white" />
								</div>
								<span>{meta.name}</span>
							</div>

							<!-- Quick delete button for stack block -->
							<button
								type="button"
								disabled={isRunning}
								onpointerdown={(e) => e.stopPropagation()}
								onclick={(e) => {
									e.stopPropagation();
									deleteBlock(block.id);
								}}
								class="w-5 h-5 flex items-center justify-center rounded-md bg-black/20 hover:bg-rose-500 text-white/70 hover:text-white transition-colors cursor-pointer text-xs ml-1"
								title="Hapus balok ini"
							>
								<Icon name="x" size={12} />
							</button>
						</div>
					{/if}

					<!-- Insertion indicator between blocks or after last block -->
					{#if isDragging && dropTarget?.parentId === null && dropTarget?.index === i + 1}
						<div
							data-slot-parent="root"
							data-slot-index={i + 1}
							class="w-full my-1 py-1 px-3 rounded-xl border-2 border-dashed border-cyan-400 bg-cyan-950/60 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 text-[11px] font-black text-cyan-300 animate-pulse select-none"
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

	<!-- Bottom Section: Run & Reset Buttons (Pinned Footer) -->
	<div class="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-2.5 border-t border-slate-800 mt-2 shrink-0">
		<button
			type="button"
			onclick={onReset}
			disabled={isRunning}
			class="group px-3 sm:px-4 py-2 bg-slate-800/90 hover:bg-slate-700/90 active:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-amber-500/10 active:scale-95"
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
			class="relative px-3.5 py-2 rounded-xl border-2 font-black text-xs sm:text-sm text-white flex items-center gap-2 shadow-[0_16px_32px_rgba(0,0,0,0.8)] backdrop-blur-md rotate-1 scale-105 w-fit {meta.bgClass} {isOverTrash
				? 'opacity-85 ring-4 ring-rose-500 bg-rose-700 border-rose-400'
				: 'ring-2 ring-cyan-400/50'}"
		>
			<div class="absolute -top-[2px] left-5 w-5 h-1 bg-slate-900/90 rounded-b-sm border-x border-b border-black/50"></div>
			<div class="absolute -bottom-1.5 left-5 w-5 h-1.5 rounded-b-sm border-x border-b border-black/30 shadow-xs {meta.tabColor}"></div>

			{#if isOverTrash}
				<Icon name="trash-2" size={15} class="text-white animate-bounce" />
				<span>HAPUS BALOK</span>
			{:else}
				<div class="w-5 h-5 rounded-md bg-black/20 border border-white/20 flex items-center justify-center shrink-0">
					<Icon name={meta.icon} size={13} class="text-white" />
				</div>
				<span>{meta.name}</span>
				{#if dragInfo.type === 'REPEAT' && dragInfo.data?.repeatCount}
					<span class="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono border border-white/20">
						{dragInfo.data.repeatCount}x
					</span>
				{/if}
			{/if}
		</div>
	</div>
{/if}
