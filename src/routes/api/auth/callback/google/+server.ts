import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const errorParam = url.searchParams.get('error');

	if (errorParam || !code) {
		throw redirect(303, '/?auth_error=' + encodeURIComponent(errorParam || 'cancelled'));
	}

	const clientId =
		process.env.GOOGLE_CLIENT_ID ||
		'823254379418-71l1aq5ushc1u4j57eccdlvsl3m4rjgs.apps.googleusercontent.com';
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

	const redirectUri = `${url.origin}/api/auth/callback/google`;

	try {
		const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				code,
				client_id: clientId,
				client_secret: clientSecret,
				redirect_uri: redirectUri,
				grant_type: 'authorization_code'
			})
		});

		if (!tokenRes.ok) {
			console.error('Failed to exchange code in callback:', await tokenRes.text());
			throw redirect(303, '/?auth_error=exchange_failed');
		}

		const tokenData = await tokenRes.json();
		const accessToken = tokenData.access_token;

		const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		if (!userinfoRes.ok) {
			throw redirect(303, '/?auth_error=userinfo_failed');
		}

		const profile = await userinfoRes.json();
		const googleSub = profile.sub;
		const name = profile.name || 'Penjelajah PyQuest';
		const firstName = (profile.given_name || name.trim().split(' ')[0] || name).trim();
		const email = profile.email || '';
		const avatar = profile.picture || '/mascot/pybot-front-idle.png';

		const sessionData = JSON.stringify({
			id: 'google-' + googleSub,
			googleSub,
			email,
			name,
			firstName,
			avatar,
			provider: 'google',
			issuedAt: Date.now()
		});

		cookies.set('pyquest_session', Buffer.from(sessionData).toString('base64'), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(303, '/?auth_success=1');
	} catch (err: any) {
		if (err?.status === 303) throw err;
		console.error('Error in google callback handler:', err);
		throw redirect(303, '/?auth_error=callback_failed');
	}
};
