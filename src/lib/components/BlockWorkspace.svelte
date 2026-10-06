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

	function addBlock(type: BlockType) {
		const newBlock: CodingBlock = {
			id: 'blk-' + Math.random().toString(36).substring(2, 9),
			type,
			repeatCount: type === 'REPEAT' ? 3 : undefined,
			children: type === 'REPEAT' ? [{ id: 'blk-' + Math.random().toString(36).substring(2, 9), type: 'MOVE' }] : undefined
		};
		workspaceBlocks = [...workspaceBlocks, newBlock];
	}

	function removeBlock(index: number) {
		workspaceBlocks = workspaceBlocks.filter((_, i) => i !== index);
	}

	function moveBlockUp(index: number) {
		if (index === 0) return;
		const copy = [...workspaceBlocks];
		const temp = copy[index - 1];
		copy[index - 1] = copy[index];
		copy[index] = temp;
		workspaceBlocks = copy;
	}

	function moveBlockDown(index: number) {
		if (index >= workspaceBlocks.length - 1) return;
		const copy = [...workspaceBlocks];
		const temp = copy[index + 1];
		copy[index + 1] = copy[index];
		copy[index] = temp;
		workspaceBlocks = copy;
	}

	function updateRepeatCount(index: number, newCount: number) {
		if (isRunning) return;
		if (newCount < 1 || newCount > 10) return;
		workspaceBlocks = workspaceBlocks.map((b, i) => (i === index ? { ...b, repeatCount: newCount } : b));
	}

	function updateRepeatChildType(blockIndex: number, childIndex: number, newType: BlockType) {
		if (isRunning) return;
		workspaceBlocks = workspaceBlocks.map((b, i) => {
			if (i !== blockIndex || !b.children) return b;
			const newChildren = b.children.map((child, ci) =>
				ci === childIndex ? { ...child, type: newType } : child
			);
			return { ...b, children: newChildren };
		});
	}

	function addRepeatChild(blockIndex: number) {
		if (isRunning) return;
		workspaceBlocks = workspaceBlocks.map((b, i) => {
			if (i !== blockIndex) return b;
			const currentChildren = b.children || [];
			if (currentChildren.length >= 4) return b;
			return {
				...b,
				children: [
					...currentChildren,
					{ id: 'blk-' + Math.random().toString(36).substring(2, 9), type: 'MOVE' }
				]
			};
		});
	}

	function removeRepeatChild(blockIndex: number, childIndex: number) {
		if (isRunning) return;
		workspaceBlocks = workspaceBlocks.map((b, i) => {
			if (i !== blockIndex || !b.children) return b;
			if (b.children.length <= 1) return b;
			return {
				...b,
				children: b.children.filter((_, ci) => ci !== childIndex)
			};
		});
	}

	function getBlockMeta(type: BlockType) {
		switch (type) {
			case 'MOVE':
				return {
					name: 'MAJU (MOVE)',
					icon: 'arrow-up',
					color: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white',
					badge: 'pybot.move()'
				};
			case 'TURN_LEFT':
				return {
					name: 'BELOK KIRI',
					icon: 'corner-up-left',
					color: 'bg-amber-600 hover:bg-amber-500 border-amber-400 text-white',
					badge: 'pybot.turn_left()'
				};
			case 'TURN_RIGHT':
				return {
					name: 'BELOK KANAN',
					icon: 'corner-up-right',
					color: 'bg-orange-600 hover:bg-orange-500 border-orange-400 text-white',
					badge: 'pybot.turn_right()'
				};
			case 'REPEAT':
				return {
					name: 'ULANGI (REPEAT)',
					icon: 'repeat',
					color: 'bg-indigo-600 hover:bg-indigo-500 border-indigo-400 text-white',
					badge: 'for i in range(n):'
				};
		}
	}
</script>

<div class="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl overflow-hidden backdrop-blur-md">
	<!-- Top Bar -->
	<div class="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
		<div class="flex items-center gap-2">
			<Icon name="puzzle" size={18} class="text-indigo-400" />
			<h3 class="font-bold text-white text-sm sm:text-base">Area Balok Koding</h3>
			{#if attempts > 0}
				<span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
					Percobaan: {attempts}
				</span>
			{/if}
		</div>
		<div class="flex items-center gap-2">
			{#if maxMoves}
				<span class="text-xs text-slate-400 font-mono hidden sm:inline">
					Maks: {maxMoves} instruksi
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
				<span>{showPythonCode ? 'Sembunyikan Python' : 'Lihat Python'}</span>
			</button>
		</div>
	</div>

	<!-- Python Live Code Preview -->
	{#if showPythonCode}
		<div class="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 shrink-0">
			<div class="text-[10px] text-slate-500 font-sans uppercase font-bold mb-1 flex items-center gap-1">
				<Icon name="python" size={12} class="text-emerald-400" />
				<span>Kode Python Otomatis:</span>
			</div>
			<pre class="overflow-x-auto whitespace-pre-wrap max-h-20 leading-snug">{blocksToPythonCode(workspaceBlocks)}</pre>
		</div>
	{/if}

	<!-- Palette / Block Choices -->
	<div class="my-3 shrink-0">
		<div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pilih Balok (Klik untuk Menambah):</div>
		<div class="flex flex-wrap gap-2">
			{#each availableBlocks as bType}
				{@const meta = getBlockMeta(bType)}
				<button
					type="button"
					onclick={() => addBlock(bType)}
					disabled={isRunning}
					class="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95 disabled:opacity-50 cursor-pointer {meta.color}"
				>
					<Icon name={meta.icon} size={14} />
					<span>{meta.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Workspace Dock -->
	<div class="flex-1 flex flex-col min-h-0 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3 overflow-y-auto">
		<div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center">
			<span>Urutan Balok yang Disusun ({workspaceBlocks.length})</span>
			{#if workspaceBlocks.length > 0}
				<button
					type="button"
					onclick={() => (workspaceBlocks = [])}
					disabled={isRunning}
					class="text-[10px] text-rose-400 hover:underline cursor-pointer"
				>
					Kosongkan
				</button>
			{/if}
		</div>

		{#if workspaceBlocks.length === 0}
			<div class="flex-1 flex flex-col items-center justify-center text-center p-4 text-slate-500 text-xs sm:text-sm border-2 border-dashed border-slate-800 rounded-xl">
				<Icon name="puzzle" size={28} class="mb-2 text-slate-600" />
				<p>Klik tombol balok di atas untuk mulai menyusun urutan aksi PyBot!</p>
			</div>
		{:else}
			<div class="space-y-2">
				{#each workspaceBlocks as block, i}
					{@const meta = getBlockMeta(block.type)}
					<div
						class="flex flex-col p-2.5 rounded-xl border bg-slate-800/90 border-slate-700 shadow-md group hover:border-slate-500 transition-colors"
					>
						<div class="flex items-center justify-between">
							<!-- Left: Index + Name -->
							<div class="flex items-center gap-2">
								<span class="text-xs font-bold text-slate-500 w-4">{i + 1}.</span>
								<Icon name={meta.icon} size={15} class="text-slate-300" />
								<span class="text-xs sm:text-sm font-bold text-white">{meta.name}</span>
								{#if block.type === 'REPEAT'}
									<div class="flex items-center gap-1 ml-2 bg-indigo-950 px-2 py-0.5 rounded-lg border border-indigo-700">
										<span class="text-xs text-indigo-300">kali:</span>
										<button
											type="button"
											onclick={() => updateRepeatCount(i, (block.repeatCount || 2) - 1)}
											class="px-1 text-xs font-bold text-slate-300 hover:text-white"
											disabled={isRunning}
										>-</button>
										<span class="text-xs font-mono font-bold text-white px-1">{block.repeatCount || 2}</span>
										<button
											type="button"
											onclick={() => updateRepeatCount(i, (block.repeatCount || 2) + 1)}
											class="px-1 text-xs font-bold text-slate-300 hover:text-white"
											disabled={isRunning}
										>+</button>
									</div>
								{/if}
							</div>

							<!-- Right: Move Up/Down + Delete -->
							<div class="flex items-center gap-1">
								<button
									type="button"
									onclick={() => moveBlockUp(i)}
									disabled={i === 0 || isRunning}
									class="p-1 text-slate-400 hover:text-white disabled:opacity-30 text-xs rounded hover:bg-slate-700 cursor-pointer"
									title="Pindah ke Atas"
									aria-label="Pindah ke Atas"
								>
									<Icon name="arrow-up" size={14} />
								</button>
								<button
									type="button"
									onclick={() => moveBlockDown(i)}
									disabled={i === workspaceBlocks.length - 1 || isRunning}
									class="p-1 text-slate-400 hover:text-white disabled:opacity-30 text-xs rounded hover:bg-slate-700 cursor-pointer"
									title="Pindah ke Bawah"
									aria-label="Pindah ke Bawah"
								>
									<Icon name="arrow-down" size={14} />
								</button>
								<button
									type="button"
									onclick={() => removeBlock(i)}
									disabled={isRunning}
									class="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 rounded disabled:opacity-30 text-xs cursor-pointer"
									title="Hapus Balok"
									aria-label="Hapus Balok"
								>
									<Icon name="x" size={14} />
								</button>
							</div>
						</div>

						<!-- Repeat Inner Actions Editor -->
						{#if block.type === 'REPEAT'}
							<div class="mt-2.5 pt-2 border-t border-indigo-900/60 pl-2 sm:pl-3 border-l-2 border-indigo-500/50 ml-1 space-y-1.5">
								<div class="flex items-center justify-between text-[11px] text-indigo-300 font-semibold mb-1">
									<span>Aksi di dalam loop ({block.children?.length || 1}):</span>
									{#if (!block.children || block.children.length < 4)}
										<button
											type="button"
											onclick={() => addRepeatChild(i)}
											disabled={isRunning}
											class="text-[10px] px-2 py-0.5 rounded bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border border-indigo-600 cursor-pointer disabled:opacity-40"
										>
											+ Tambah Aksi
										</button>
									{/if}
								</div>

								{#each (block.children || []) as child, ci}
									{@const childMeta = getBlockMeta(child.type)}
									<div class="flex items-center justify-between gap-1.5 bg-slate-900/90 px-2 py-1.5 rounded-lg border border-indigo-800/40">
										<div class="flex items-center gap-1.5">
											<span class="text-[10px] text-indigo-400 font-mono">{ci + 1}.</span>
											<Icon name={childMeta.icon} size={13} class="text-indigo-400" />
											<select
												value={child.type}
												onchange={(e) => updateRepeatChildType(i, ci, (e.target as HTMLSelectElement).value as BlockType)}
												disabled={isRunning}
												class="bg-slate-800 text-white text-xs rounded px-1.5 py-0.5 border border-slate-700 focus:outline-none focus:border-indigo-400 cursor-pointer disabled:opacity-50"
											>
												<option value="MOVE">MAJU (MOVE)</option>
												<option value="TURN_LEFT">BELOK KIRI</option>
												<option value="TURN_RIGHT">BELOK KANAN</option>
											</select>
										</div>

										{#if (block.children && block.children.length > 1)}
											<button
												type="button"
												onclick={() => removeRepeatChild(i, ci)}
												disabled={isRunning}
												class="text-rose-400 hover:text-rose-300 p-0.5 rounded hover:bg-rose-900/30 text-xs cursor-pointer disabled:opacity-40"
												title="Hapus aksi ini"
												aria-label="Hapus aksi"
											>
												<Icon name="x" size={12} />
											</button>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Bottom Run / Reset Actions -->
	<div class="flex items-center gap-3 pt-3 border-t border-slate-800 mt-3 shrink-0">
		<button
			type="button"
			onclick={onReset}
			disabled={isRunning}
			class="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
		>
			<Icon name="rotate-ccw" size={15} />
			<span>Reset</span>
		</button>
		<button
			type="button"
			onclick={onRun}
			disabled={workspaceBlocks.length === 0 || isRunning}
			class="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
		>
			{#if isRunning}
				<Icon name="repeat" size={18} class="animate-spin text-slate-950" />
				<span>Menjalankan Kodemu...</span>
			{:else}
				<Icon name="play" size={16} class="text-slate-950" />
				<span>JALANKAN KODE (RUN)</span>
			{/if}
		</button>
	</div>
</div>
