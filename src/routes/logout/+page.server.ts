import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.set('auth', '', {
		path: '/',
		expires: new Date(0)
	});

	redirect(302, '/login');
};
