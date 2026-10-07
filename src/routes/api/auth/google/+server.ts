import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const body = await request.json();
		const credential = body?.credential;

		if (!credential || typeof credential !== 'string') {
			return json({ error: 'Kredensial Google wajib disertakan.' }, { status: 400 });
		}

		// Verify Google ID Token via Google tokeninfo endpoint
		const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
		const verifyResponse = await fetch(verifyUrl);

		if (!verifyResponse.ok) {
			console.error('Google token verification failed with status:', verifyResponse.status);
			return json({ error: 'Verifikasi kredensial Google gagal.' }, { status: 401 });
		}

		const payload = await verifyResponse.json();

		const expectedClientId =
			process.env.GOOGLE_CLIENT_ID ||
			process.env.PUBLIC_GOOGLE_CLIENT_ID ||
			'823254379418-71l1aq5ushc1u4j57eccdlvsl3m4rjgs.apps.googleusercontent.com';

		// Verify audience matches our Client ID
		if (payload.aud !== expectedClientId) {
			console.error('Audience mismatch. Received:', payload.aud, 'Expected:', expectedClientId);
			return json({ error: 'Audience kredensial Google tidak sesuai.' }, { status: 401 });
		}

		// Verify token expiration
		const nowSeconds = Math.floor(Date.now() / 1000);
		if (payload.exp && Number(payload.exp) < nowSeconds) {
			return json({ error: 'Token kredensial Google telah kedaluwarsa.' }, { status: 401 });
		}

		const googleSub = payload.sub;
		if (!googleSub) {
			return json({ error: 'ID unik pengguna Google tidak ditemukan.' }, { status: 400 });
		}

		const email = payload.email || '';
		const name = payload.name || 'Penjelajah PyQuest';
		const picture = payload.picture || '/mascot/pybot-front-idle.png';
		const firstName = (payload.given_name || name.trim().split(' ')[0] || name).trim();

		const verifiedUser = {
			id: 'google-' + googleSub,
			googleSub,
			email,
			name,
			firstName,
			avatar: picture,
			provider: 'google' as const
		};

		// Set secure HTTP-only session cookie
		const sessionData = JSON.stringify({
			...verifiedUser,
			issuedAt: Date.now()
		});

		cookies.set('pyquest_session', Buffer.from(sessionData).toString('base64'), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		return json({
			success: true,
			user: verifiedUser
		});
	} catch (err) {
		console.error('Server error in POST /api/auth/google:', err);
		return json({ error: 'Terjadi gangguan server saat memverifikasi login.' }, { status: 500 });
	}
};
