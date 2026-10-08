/**
 * PyQuest Avatar Storage Service
 * 
 * Persistent client-side avatar storage using IndexedDB.
 * Compresses images client-side before saving to prevent localStorage quota issues
 * and avoid ephemeral blob URLs that break upon refresh.
 */

const DB_NAME = 'pyquest_avatar_db';
const DB_VERSION = 1;
const STORE_NAME = 'user_avatars';
const MAX_RAW_FILE_SIZE = 5 * 1024 * 1024; // 5 MB max file size
const TARGET_SIZE = 320; // 320x320 px avatar output
const COMPRESSION_QUALITY = 0.85;

export interface StoredAvatarRecord {
	userId: string;
	dataUrl: string;
	updatedAt: string;
	mimeType: string;
	fileSize: number;
}

/**
 * Open or upgrade the IndexedDB instance
 */
function openAvatarDatabase(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		if (typeof window === 'undefined' || !window.indexedDB) {
			reject(new Error('IndexedDB tidak didukung pada peramban ini.'));
			return;
		}

		const request = window.indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: 'userId' });
			}
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error || new Error('Gagal membuka database avatar.'));
		};
	});
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
	if (!file) {
		return { valid: false, error: 'Silakan pilih file gambar.' };
	}

	const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
	if (!validTypes.includes(file.type.toLowerCase())) {
		return {
			valid: false,
			error: 'Format file tidak didukung. Gunakan file JPG, PNG, atau WEBP.'
		};
	}

	if (file.size > MAX_RAW_FILE_SIZE) {
		const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
		return {
			valid: false,
			error: `Ukuran file terlalu besar (${sizeInMb} MB). Maksimal 5 MB.`
		};
	}

	return { valid: true };
}

/**
 * Resize and compress image file to standard square avatar data URL using HTML Canvas
 */
export function processAndCompressImage(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const validation = validateImageFile(file);
		if (!validation.valid) {
			reject(new Error(validation.error));
			return;
		}

		if (typeof window === 'undefined') {
			reject(new Error('Pemrosesan gambar hanya dapat dijalankan di peramban.'));
			return;
		}

		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result as string;
			if (!result) {
				reject(new Error('Gagal membaca data file.'));
				return;
			}

			const img = new Image();
			img.onload = () => {
				try {
					const canvas = document.createElement('canvas');
					canvas.width = TARGET_SIZE;
					canvas.height = TARGET_SIZE;
					const ctx = canvas.getContext('2d');

					if (!ctx) {
						reject(new Error('Gagal menginisialisasi canvas grafis.'));
						return;
					}

					// Center-crop to square aspect ratio
					const sourceWidth = img.width;
					const sourceHeight = img.height;
					let srcX = 0;
					let srcY = 0;
					let srcSize = sourceWidth;

					if (sourceWidth > sourceHeight) {
						srcSize = sourceHeight;
						srcX = (sourceWidth - sourceHeight) / 2;
						srcY = 0;
					} else {
						srcSize = sourceWidth;
						srcX = 0;
						srcY = (sourceHeight - sourceWidth) / 2;
					}

					// High-quality image smoothing
					ctx.imageSmoothingEnabled = true;
					ctx.imageSmoothingQuality = 'high';

					ctx.drawImage(
						img,
						srcX,
						srcY,
						srcSize,
						srcSize,
						0,
						0,
						TARGET_SIZE,
						TARGET_SIZE
					);

					// Prefer webp, fallback to jpeg
					let compressedDataUrl = '';
					try {
						compressedDataUrl = canvas.toDataURL('image/webp', COMPRESSION_QUALITY);
					} catch {
						compressedDataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
					}

					if (!compressedDataUrl || compressedDataUrl === 'data:,') {
						compressedDataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
					}

					resolve(compressedDataUrl);
				} catch (err) {
					reject(err instanceof Error ? err : new Error('Gagal memproses gambar.'));
				}
			};

			img.onerror = () => {
				reject(new Error('File yang dipilih bukan gambar yang valid.'));
			};

			img.src = result;
		};

		reader.onerror = () => {
			reject(new Error('Gagal membaca file gambar dari perangkat.'));
		};

		reader.readAsDataURL(file);
	});
}

/**
 * Avatar Storage Public API
 */
export const avatarStorage = {
	/**
	 * Save an uploaded image file for a user into persistent IndexedDB storage
	 */
	async saveAvatar(
		userId: string,
		file: File
	): Promise<{ success: boolean; dataUrl?: string; error?: string }> {
		try {
			const validation = validateImageFile(file);
			if (!validation.valid) {
				return { success: false, error: validation.error };
			}

			const dataUrl = await processAndCompressImage(file);
			const record: StoredAvatarRecord = {
				userId,
				dataUrl,
				updatedAt: new Date().toISOString(),
				mimeType: file.type || 'image/webp',
				fileSize: dataUrl.length
			};

			const db = await openAvatarDatabase();
			await new Promise<void>((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, 'readwrite');
				const store = tx.objectStore(STORE_NAME);
				const request = store.put(record);

				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error || new Error('Gagal menyimpan ke IndexedDB.'));
			});

			return { success: true, dataUrl };
		} catch (err) {
			console.error('Error saving avatar to IndexedDB:', err);
			return {
				success: false,
				error: err instanceof Error ? err.message : 'Gagal menyimpan foto profil.'
			};
		}
	},

	/**
	 * Retrieve a user's persistent avatar data URL from IndexedDB
	 */
	async getAvatar(userId: string): Promise<string | null> {
		try {
			const db = await openAvatarDatabase();
			return await new Promise<string | null>((resolve) => {
				const tx = db.transaction(STORE_NAME, 'readonly');
				const store = tx.objectStore(STORE_NAME);
				const request = store.get(userId);

				request.onsuccess = () => {
					const record = request.result as StoredAvatarRecord | undefined;
					resolve(record?.dataUrl || null);
				};

				request.onerror = () => {
					resolve(null);
				};
			});
		} catch (err) {
			console.warn('Could not read avatar from IndexedDB:', err);
			return null;
		}
	},

	/**
	 * Remove a user's avatar from IndexedDB (resets to default mascot)
	 */
	async removeAvatar(userId: string): Promise<void> {
		try {
			const db = await openAvatarDatabase();
			await new Promise<void>((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, 'readwrite');
				const store = tx.objectStore(STORE_NAME);
				const request = store.delete(userId);

				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		} catch (err) {
			console.warn('Error removing avatar from IndexedDB:', err);
		}
	}
};
