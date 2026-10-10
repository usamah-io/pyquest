import { writable } from 'svelte/store';

const STORAGE_KEY = 'pyquest-sound-enabled';

// Sound cooldown / throttling map to prevent ear fatigue and excessive overlapping
const lastPlayedTimes: Record<string, number> = {};

function shouldPlay(soundKey: string, cooldownMs: number): boolean {
	const now = Date.now();
	const last = lastPlayedTimes[soundKey] || 0;
	if (now - last < cooldownMs) {
		return false;
	}
	lastPlayedTimes[soundKey] = now;
	return true;
}

// Singleton Web Audio Context
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
	if (typeof window === 'undefined') return null;
	try {
		const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
		if (!AudioContextClass) return null;
		if (!audioCtx) {
			audioCtx = new AudioContextClass();
		}
		if (audioCtx.state === 'suspended') {
			audioCtx.resume().catch(() => {});
		}
		return audioCtx;
	} catch {
		return null;
	}
}

// Global unlock on first user gesture
if (typeof window !== 'undefined') {
	const unlock = () => {
		try {
			if (audioCtx && audioCtx.state === 'suspended') {
				audioCtx.resume().catch(() => {});
			}
		} catch {}
		window.removeEventListener('pointerdown', unlock);
		window.removeEventListener('keydown', unlock);
	};
	window.addEventListener('pointerdown', unlock, { passive: true });
	window.addEventListener('keydown', unlock, { passive: true });
}

function createSoundStore() {
	let initialEnabled = true;

	if (typeof window !== 'undefined') {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved !== null) {
				initialEnabled = saved === 'true';
			}
		} catch {}
	}

	const { subscribe, set, update } = writable<boolean>(initialEnabled);
	let currentEnabled = initialEnabled;

	subscribe((val) => {
		currentEnabled = val;
	});

	function setSound(enabled: boolean) {
		currentEnabled = enabled;
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, String(enabled));
			} catch {}
		}
		set(enabled);
	}

	function toggleSound() {
		update((current) => {
			const next = !current;
			currentEnabled = next;
			if (typeof window !== 'undefined') {
				try {
					localStorage.setItem(STORAGE_KEY, String(next));
				} catch {}
			}
			return next;
		});
	}

	// 1. Subtle, crisp UI click (for buttons, tabs, modal actions, block drops)
	function playClick() {
		if (!currentEnabled) return;
		if (!shouldPlay('click', 40)) return;

		try {
			const ctx = getAudioContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = 'sine';
			osc.frequency.setValueAtTime(800, now);
			osc.frequency.exponentialRampToValueAtTime(350, now + 0.025);

			gain.gain.setValueAtTime(0.12, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start(now);
			osc.stop(now + 0.03);
		} catch {}
	}

	// 2. Cheerful, uplifting confirmation chime for correct quiz answers
	function playCorrect() {
		if (!currentEnabled) return;
		if (!shouldPlay('correct', 250)) return;

		try {
			const ctx = getAudioContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			// Harmonious two-tone major chime: C5 (523Hz) -> E5 (659Hz)
			const notes = [
				{ freq: 523.25, start: 0, dur: 0.14 },
				{ freq: 659.25, start: 0.10, dur: 0.22 }
			];

			notes.forEach(({ freq, start, dur }) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();

				osc.type = 'triangle';
				osc.frequency.setValueAtTime(freq, now + start);

				gain.gain.setValueAtTime(0.001, now + start);
				gain.gain.linearRampToValueAtTime(0.22, now + start + 0.02);
				gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

				osc.connect(gain);
				gain.connect(ctx.destination);

				osc.start(now + start);
				osc.stop(now + start + dur);
			});
		} catch {}
	}

	// 3. Gentle, encouraging low tone for incorrect answers (never harsh or punishing)
	function playIncorrect() {
		if (!currentEnabled) return;
		if (!shouldPlay('incorrect', 250)) return;

		try {
			const ctx = getAudioContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			// Soft, warm downward bend 310Hz -> 220Hz
			osc.type = 'sine';
			osc.frequency.setValueAtTime(310, now);
			osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);

			gain.gain.setValueAtTime(0.001, now);
			gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start(now);
			osc.stop(now + 0.22);
		} catch {}
	}

	// 4. Celebratory fanfare for completing a Coding Game challenge or Learning Level
	function playMissionComplete() {
		if (!currentEnabled) return;
		if (!shouldPlay('mission-complete', 600)) return;

		try {
			const ctx = getAudioContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			// Vibrant ascending fanfare: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
			const notes = [
				{ freq: 523.25, start: 0.00, dur: 0.12 },
				{ freq: 659.25, start: 0.11, dur: 0.12 },
				{ freq: 783.99, start: 0.22, dur: 0.14 },
				{ freq: 1046.5, start: 0.35, dur: 0.32 }
			];

			notes.forEach(({ freq, start, dur }) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();

				osc.type = 'triangle';
				osc.frequency.setValueAtTime(freq, now + start);

				gain.gain.setValueAtTime(0.001, now + start);
				gain.gain.linearRampToValueAtTime(0.24, now + start + 0.015);
				gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

				osc.connect(gain);
				gain.connect(ctx.destination);

				osc.start(now + start);
				osc.stop(now + start + dur);
			});
		} catch {}
	}

	// 5. Bright sparkly chime when collecting stars/coins or receiving an XP reward
	function playCollectReward() {
		if (!currentEnabled) return;
		if (!shouldPlay('collect-reward', 180)) return;

		try {
			const ctx = getAudioContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			// Dual bell chime shimmer (1174Hz and 1568Hz)
			[1174.66, 1567.98].forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();

				osc.type = 'sine';
				osc.frequency.setValueAtTime(freq, now);

				const startDelay = idx * 0.04;
				gain.gain.setValueAtTime(0.001, now + startDelay);
				gain.gain.linearRampToValueAtTime(0.18, now + startDelay + 0.015);
				gain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + 0.24);

				osc.connect(gain);
				gain.connect(ctx.destination);

				osc.start(now + startDelay);
				osc.stop(now + startDelay + 0.26);
			});
		} catch {}
	}

	// 6. Subtle, mechanical blip for PyBot moving across maze cells
	function playRobotMove() {
		if (!currentEnabled) return;
		if (!shouldPlay('robot-move', 65)) return;

		try {
			const ctx = getAudioContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			// Soft subtle retro chirp 240Hz -> 320Hz (35ms)
			osc.type = 'sine';
			osc.frequency.setValueAtTime(240, now);
			osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

			gain.gain.setValueAtTime(0.08, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start(now);
			osc.stop(now + 0.04);
		} catch {}
	}

	// 7. Cheerful chirp when code execution starts
	function playCodeStart() {
		if (!currentEnabled) return;
		if (!shouldPlay('code-start', 250)) return;

		try {
			const ctx = getAudioContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			// Ascending chirp 440Hz -> 880Hz (70ms)
			osc.type = 'triangle';
			osc.frequency.setValueAtTime(440, now);
			osc.frequency.exponentialRampToValueAtTime(880, now + 0.07);

			gain.gain.setValueAtTime(0.001, now);
			gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start(now);
			osc.stop(now + 0.09);
		} catch {}
	}

	return {
		subscribe,
		isEnabled: () => currentEnabled,
		setSound,
		toggleSound,
		playClick,
		playCorrect,
		playIncorrect,
		playMissionComplete,
		playCollectReward,
		playRobotMove,
		playCodeStart
	};
}

export const soundStore = createSoundStore();

export const playClick = () => soundStore.playClick();
export const playCorrect = () => soundStore.playCorrect();
export const playIncorrect = () => soundStore.playIncorrect();
export const playMissionComplete = () => soundStore.playMissionComplete();
export const playCollectReward = () => soundStore.playCollectReward();
export const playRobotMove = () => soundStore.playRobotMove();
export const playCodeStart = () => soundStore.playCodeStart();
