import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionCookie = cookies.get('pyquest_session');
	if (!sessionCookie) {
		return json({ authenticated: false });
	}

	try {
		const raw = Buffer.from(sessionCookie, 'base64').toString('utf-8');
		const user = JSON.parse(raw);
		if (!user || !user.id) {
			return json({ authenticated: false });
		}
		return json({ authenticated: true, user });
	} catch {
		return json({ authenticated: false });
	}
};
