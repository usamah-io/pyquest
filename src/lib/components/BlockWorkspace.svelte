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

	// Block visual and semantic metadata
	function getBlockMeta(type: BlockType) {
		switch (type) {
			case 'MOVE':
				return {
					name: 'MAJU',
					subtext: 'Langkah maju',
					icon: 'arrow-up',
					accentColor: 'emerald',
					bgClass: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white',
					pyBadge: 'pybot.move()'
				};
			case 'TURN_LEFT':
				return {
					name: 'BELOK KIRI',
					subtext: 'Putar 90° kiri',
					icon: 'corner-up-left',
					accentColor: 'amber',
					bgClass: 'bg-amber-600 hover:bg-amber-500 border-amber-400 text-white',
					pyBadge: 'pybot.turn_left()'
				};
			case 'TURN_RIGHT':
				return {
					name: 'BELOK KANAN',
					subtext: 'Putar 90° kanan',
					icon: 'corner-up-right',
					accentColor: 'orange',
					bgClass: 'bg-orange-600 hover:bg-orange-500 border-orange-400 text-white',
					pyBadge: 'pybot.turn_right()'
				};
			case 'REPEAT':
				return {
					name: 'ULANGI',
					subtext: 'Perulangan kali',
					icon: 'repeat',
					accentColor: 'indigo',
					bgClass: 'bg-indigo-600 hover:bg-indigo-500 border-indigo-400 text-white',
					pyBadge: 'for _ in range(n):'
				};
			case 'FOREVER':
				return {
					name: 'SELAMANYA',
					subtext: 'Loop terus-menerus',
					icon: 'refresh-cw',
					accentColor: 'purple',
					bgClass: 'bg-purple-600 hover:bg-purple-500 border-purple-400 text-white',
					pyBadge: 'while True:'
				};
		}
	}

	// Palette availability
	let fullPalette = $derived.by<BlockType[]>(() => {
		const set = new Set<BlockType>(availableBlocks);
		if (set.has('REPEAT')) {
			set.add('FOREVER');
		}
		return Array.from(set);
	});


	// ==========================================
	// POINTER EVENT HANDLERS (DESKTOP + MOBILE)
	// ==========================================
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

		// If user tapped on an interactive element inside the block, let that element handle it
		const targetEl = e.target as HTMLElement;
		if (targetEl.closest('input, button')) return;

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

		if (!isDragging) {
			const dist = Math.hypot(e.clientX - pendingDrag.startX, e.clientY - pendingDrag.startY);
			if (dist > 5) {
				isDragging = true;
				dragInfo = {
					source: pendingDrag.source,
					type: pendingDrag.type,
					blockId: pendingDrag.blockId,
					parentId: pendingDrag.parentId,
					index: pendingDrag.index,
					data: pendingDrag.data
				};
			}
		}

		if (isDragging) {
			// Prevent touch scroll on mobile devices while dragging
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

			// 3. Check if hovering over a block item: [data-block-id] [data-block-parent] [data-block-index]
			const blockEl = elements.find((el) => el.hasAttribute('data-block-id'));
			if (blockEl) {
				const bId = blockEl.getAttribute('data-block-id');
				// Prevent dropping directly onto itself
				if (dragInfo?.blockId && bId === dragInfo.blockId) {
					return;
				}
				const pId = blockEl.getAttribute('data-block-parent');
				const bIdx = parseInt(blockEl.getAttribute('data-block-index') || '0', 10);
				const rect = blockEl.getBoundingClientRect();
				const midY = rect.top + rect.height / 2;
				const targetIndex = e.clientY < midY ? bIdx : bIdx + 1;
				dropTarget = {
					parentId: pId === 'root' ? null : pId,
					index: targetIndex
				};
				return;
			}

			// 4. Check if hovering over inner repeat/forever slot: [data-repeat-inner-id]
			const repeatInnerEl = elements.find((el) => el.hasAttribute('data-repeat-inner-id'));
			if (repeatInnerEl) {
				const repId = repeatInnerEl.getAttribute('data-repeat-inner-id');
				if (dragInfo?.blockId && repId === dragInfo.blockId) return;
				const childCount = parseInt(repeatInnerEl.getAttribute('data-child-count') || '0', 10);
				dropTarget = {
					parentId: repId,
					index: childCount
				};
				return;
			}

			// 5. Check if hovering over empty canvas: [data-empty-canvas]
			const emptyCanvas = elements.find((el) => el.hasAttribute('data-empty-canvas'));
			if (emptyCanvas) {
				dropTarget = { parentId: null, index: 0 };
				return;
			}

			// 6. Check if hovering inside workspace area: [data-workspace-area]
			const workspaceEl = elements.find((el) => el.hasAttribute('data-workspace-area'));
			if (workspaceEl) {
				dropTarget = { parentId: null, index: workspaceBlocks.length };
				return;
			}

			dropTarget = null;
		}
	}

	function cleanupPointerListeners() {
		window.removeEventListener('pointermove', onGlobalPointerMove);
		window.removeEventListener('pointerup', onGlobalPointerUp);
		window.removeEventListener('pointercancel', onGlobalPointerCancel);
	}

	function onGlobalPointerUp(e: PointerEvent) {
		cleanupPointerListeners();

		if (!isDragging) {
			// Strict true drag-and-drop: clicking or tapping without moving does nothing
			pendingDrag = null;
			return;
		}


		if (isDragging && dragInfo) {
			if (isOverTrash) {
				// Drag to trash drop zone -> delete block
				if (dragInfo.source === 'workspace' && dragInfo.blockId) {
					workspaceBlocks = removeBlockById(workspaceBlocks, dragInfo.blockId);
				}
			} else if (dropTarget) {
				if (dragInfo.source === 'palette') {
					// Insert new block from palette
					const newBlock = createDefaultBlock(dragInfo.type);
					workspaceBlocks = insertBlockAt(workspaceBlocks, newBlock, dropTarget.parentId, dropTarget.index);
				} else if (dragInfo.source === 'workspace' && dragInfo.blockId) {
					// Reorder or move existing block
					const movingBlock = findBlockById(workspaceBlocks, dragInfo.blockId);
					if (movingBlock) {
						// Guard: cannot drop container into itself
						if (dropTarget.parentId !== movingBlock.id) {
							const cleaned = removeBlockById(workspaceBlocks, dragInfo.blockId);
							workspaceBlocks = insertBlockAt(cleaned, movingBlock, dropTarget.parentId, dropTarget.index);
						}
					}
				}
			} else {
				// Dragged completely outside workspace area -> delete from sequence
				const elements = document.elementsFromPoint(e.clientX, e.clientY);
				const isInsideWorkspace = elements.some((el) => el.closest('[data-workspace-root]'));
				if (!isInsideWorkspace && dragInfo.source === 'workspace' && dragInfo.blockId) {
					workspaceBlocks = removeBlockById(workspaceBlocks, dragInfo.blockId);
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
	class="flex flex-col h-full bg-slate-900/95 border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden backdrop-blur-md select-none relative"
>
	<!-- Workspace Header -->
	<div class="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
		<div class="flex items-center gap-2">
			<div class="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
				<Icon name="puzzle" size={16} />
			</div>
			<div>
				<h3 class="font-bold text-white text-xs sm:text-sm tracking-wide">Penyusun Blok Logika</h3>
			</div>
			{#if attempts > 0}
				<span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
					Percobaan: {attempts}
				</span>
			{/if}
		</div>

		<div class="flex items-center gap-2">
			{#if maxMoves}
				<span class="text-[11px] text-slate-400 font-mono hidden sm:inline bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
					Batas: {maxMoves} langkah
				</span>
			{/if}
			<button
				type="button"
				onclick={() => (showPythonCode = !showPythonCode)}
				class="text-xs px-2.5 py-1 rounded-lg border font-mono transition-colors flex items-center gap-1.5 cursor-pointer {showPythonCode
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
		<div class="mt-2.5 p-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 shrink-0 animate-fade-in">
			<div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[11px] text-slate-400">
				<span>Kode Python Ekuivalen</span>
				<span class="text-[10px] text-slate-500 font-sans">Dihasilkan otomatis</span>
			</div>
			<pre class="overflow-x-auto p-1 leading-relaxed whitespace-pre-wrap">{blocksToPythonCode(workspaceBlocks)}</pre>
		</div>
	{/if}

	<!-- PALETTE BLOK KODING (DRAGGABLE + CLICK FALLBACK) -->
	<div class="py-3 border-b border-slate-800 shrink-0">
		<div class="flex items-center justify-between mb-2">
			<span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
				<Icon name="layout-grid" size={13} class="text-indigo-400" />
				<span>Palet Balok Kode</span>
			</span>
			<span class="text-[10px] text-cyan-400 font-semibold hidden sm:inline flex items-center gap-1">
				<Icon name="grip-vertical" size={11} />
				<span>Tarik & lepas balok ke kanvas editor</span>
			</span>
		</div>

		<div class="flex flex-wrap gap-2">
			{#each fullPalette as bType}
				{@const meta = getBlockMeta(bType)}
				<div
					role="button"
					tabindex="0"
					style="touch-action: none;"
					onpointerdown={(e) => handlePointerDown(e, 'palette', bType)}
					class="group relative select-none rounded-xl border px-3 py-2 text-xs font-black shadow-md cursor-grab active:cursor-grabbing transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:opacity-50 {meta.bgClass} flex items-center gap-2"
					title="Tarik dan letakkan balok ke kanvas editor"
				>
					<Icon name="grip-vertical" size={12} class="opacity-60 group-hover:opacity-100 shrink-0" />
					<Icon name={meta.icon} size={15} class="shrink-0" />
					<span>{meta.name}</span>
					<span class="hidden sm:inline text-[9px] font-mono text-white/70 bg-black/20 px-1 py-0.5 rounded border border-white/10">
						{meta.pyBadge}
					</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- WORKSPACE SEQUENCE CANVAS -->
	<div
		data-workspace-area
		class="flex-1 flex flex-col pt-3 overflow-y-auto min-h-0 relative"
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
				class="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs sm:text-sm border-2 border-dashed rounded-2xl transition-all {isDragging
					? 'border-cyan-400 bg-cyan-950/30 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.25)]'
					: 'border-slate-800 bg-slate-900/30'}"
			>
				<div class="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
					<Icon name="puzzle" size={24} />
				</div>
				<p class="font-bold text-slate-300 mb-1">
					{isDragging ? 'LEPAS BLOK DI SINI' : 'Kanvas Koding Masih Kosong'}
				</p>
				<p class="text-xs text-slate-500 max-w-xs leading-relaxed">
					{isDragging
						? 'Lepaskan balok sekarang untuk menambahkannya ke alur program.'
						: 'Tarik balok dari palet di atas ke sini untuk mulai memprogram PyBot.'}
				</p>
				{#if isDragging}
					<div class="mt-3 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-black animate-pulse flex items-center gap-1.5 shadow-md shadow-cyan-500/20">
						<Icon name="corner-down-left" size={13} />
						<span>LEPAS BLOK DI SINI</span>
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
						<div class="h-0.5 flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-400"></div>
						<div class="flex items-center gap-1.5 shrink-0">
							<Icon name="arrow-down" size={13} class="text-cyan-300" />
							<span>DROP DI SINI</span>
							<Icon name="arrow-down" size={13} class="text-cyan-300" />
						</div>
						<div class="h-0.5 flex-1 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400"></div>
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
							class="rounded-2xl border-2 shadow-lg overflow-hidden transition-all duration-150 {block.type === 'REPEAT'
								? 'border-indigo-500 bg-indigo-950/40 shadow-indigo-900/20'
								: 'border-purple-500 bg-purple-950/40 shadow-purple-900/20'} {isDragging && dragInfo?.blockId === block.id
								? 'opacity-40 border-dashed scale-95'
								: ''}"
						>
							<!-- C-Block Top Header -->
							<div
								class="px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-black text-white cursor-grab active:cursor-grabbing {block.type === 'REPEAT'
									? 'bg-indigo-600'
									: 'bg-purple-600'}"
							>
								<div class="flex items-center gap-2">
									<Icon name="grip-vertical" size={14} class="text-white/60 shrink-0" />
									<Icon name={block.type === 'REPEAT' ? 'repeat' : 'refresh-cw'} size={16} />
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

								<div class="flex items-center gap-1.5">
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											handleDuplicate(block.id);
										}}
										disabled={isRunning}
										class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
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
										class="p-1 text-rose-200 hover:text-white hover:bg-rose-500/30 rounded transition-colors"
										title="Hapus loop"
										aria-label="Hapus loop"
									>
										<Icon name="x" size={14} />
									</button>
								</div>
							</div>

							<!-- C-Block Nested Body (Indented Inner Slot) -->
							<div
								data-repeat-inner-id={block.id}
								data-child-count={block.children?.length || 0}
								class="pl-4 sm:pl-5 pr-2 py-2 flex flex-col space-y-1.5 border-l-8 {block.type === 'REPEAT'
									? 'border-indigo-600 bg-indigo-950/20'
									: 'border-purple-600 bg-purple-950/20'}"
							>
								{#if !block.children || block.children.length === 0}
									<div
										data-slot-parent={block.id}
										data-slot-index="0"
										class="py-3 px-4 border border-dashed rounded-xl text-center text-xs text-slate-400 bg-slate-900/60 {isDragging && dropTarget?.parentId === block.id
											? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
											: 'border-slate-700'}"
									>
										Tarik aksi ke dalam loop ini
									</div>
								{:else}
									{#each block.children as child, ci (child.id)}
										<!-- Inner Insertion Indicator -->
										{#if isDragging && dropTarget?.parentId === block.id && dropTarget?.index === ci}
											<div
												data-slot-parent={block.id}
												data-slot-index={ci}
												class="w-full h-1.5 my-0.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-pulse"
											></div>
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
											class="flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-bold shadow-md cursor-grab active:cursor-grabbing transition-transform hover:-translate-y-0.5 {childMeta.bgClass} {isDragging && dragInfo?.blockId === child.id
												? 'opacity-40 border-dashed scale-95'
												: ''}"
										>
											<div class="flex items-center gap-2">
												<Icon name="grip-vertical" size={12} class="text-white/60 shrink-0" />
												<Icon name={childMeta.icon} size={14} class="shrink-0" />
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
														workspaceBlocks = removeBlockById(workspaceBlocks, child.id);
													}}
													disabled={isRunning}
													class="p-0.5 text-white/70 hover:text-white rounded hover:bg-white/10"
													title="Hapus aksi"
													aria-label="Hapus aksi"
												>
													<Icon name="x" size={13} />
												</button>
											</div>
										</div>
									{/each}

									<!-- Inner trailing indicator -->
									{#if isDragging && dropTarget?.parentId === block.id && dropTarget?.index === block.children.length}
										<div
											data-slot-parent={block.id}
											data-slot-index={block.children.length}
											class="w-full h-1.5 my-0.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-pulse"
										></div>
									{/if}
								{/if}
							</div>

							<!-- C-Block Bottom Closing Bar -->
							<div
								class="h-2.5 px-3 {block.type === 'REPEAT'
									? 'bg-indigo-700'
									: 'bg-purple-700'}"
							></div>
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
							class="group flex items-center justify-between px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-black shadow-lg cursor-grab active:cursor-grabbing transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl {meta.bgClass} {isDragging && dragInfo?.blockId === block.id
								? 'opacity-40 border-dashed scale-95'
								: ''}"
						>
							<!-- Left: Grab handle + Notch circle + Icon + Name -->
							<div class="flex items-center gap-2.5">
								<Icon name="grip-vertical" size={14} class="text-white/60 shrink-0" />
								<div class="w-3 h-3 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
									<div class="w-1.5 h-1.5 rounded-full bg-white"></div>
								</div>
								<Icon name={meta.icon} size={16} class="shrink-0" />
								<span>{meta.name}</span>
								<span class="text-[10px] font-normal text-white/80 hidden sm:inline ml-1 font-sans">
									({meta.subtext})
								</span>
							</div>

							<!-- Right: Python Badge + Actions -->
							<div class="flex items-center gap-1.5">
								<span class="text-[10px] font-mono text-white/70 hidden md:inline mr-2 bg-black/20 px-2 py-0.5 rounded-md">
									{meta.pyBadge}
								</span>
								<button
									type="button"
									onclick={(e) => {
										e.stopPropagation();
										handleDuplicate(block.id);
									}}
									disabled={isRunning}
									class="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
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
									class="p-1 text-rose-200 hover:text-white hover:bg-rose-500/30 rounded transition-colors"
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
							<div class="h-0.5 flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-400"></div>
							<div class="flex items-center gap-1.5 shrink-0">
								<Icon name="arrow-down" size={13} class="text-cyan-300" />
								<span>DROP DI SINI</span>
								<Icon name="arrow-down" size={13} class="text-cyan-300" />
							</div>
							<div class="h-0.5 flex-1 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400"></div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<!-- Bottom Section: Run & Reset Buttons -->
	<div class="flex items-center gap-3 pt-3 border-t border-slate-800 mt-2 shrink-0">
		<button
			type="button"
			onclick={onReset}
			disabled={isRunning}
			class="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5 active:scale-95"
			title="Kembalikan posisi awal robot"
		>
			<Icon name="rotate-ccw" size={15} />
			<span>Reset</span>
		</button>

		<button
			type="button"
			onclick={onRun}
			disabled={workspaceBlocks.length === 0 || isRunning}
			class="flex-1 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
		>
			{#if isRunning}
				<Icon name="refresh-cw" size={18} class="animate-spin text-slate-950" />
				<span>Menjalankan Urutan Blok...</span>
			{:else}
				<Icon name="play" size={18} class="text-slate-950" />
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
		class="fixed pointer-events-none z-[99999] select-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
		style="left: {pointerPos.x}px; top: {pointerPos.y}px;"
	>
		<div
			class="px-4 py-2.5 rounded-2xl border-2 font-black text-xs sm:text-sm text-white flex items-center gap-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-md rotate-2 scale-105 {meta.bgClass} {isOverTrash
				? 'opacity-60 grayscale ring-4 ring-rose-500/60'
				: 'ring-4 ring-cyan-400/50'}"
		>
			<Icon name="grip-vertical" size={14} class="text-white/70" />
			<Icon name={meta.icon} size={18} />
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
