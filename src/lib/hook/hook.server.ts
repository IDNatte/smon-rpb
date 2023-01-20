import type { Handle } from '@sveltejs/kit';
import { database } from '$lib/module/database/database';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('auth');

	if (!session) {
		return await resolve(event);
	}

	const user = await database.user.findUnique({
		where: { userAuthToken: session },
		select: { username: true }
	});

	if (user) {
		event.locals.user = {
			name: user.username
		};
	}

	return await resolve(event);
};
