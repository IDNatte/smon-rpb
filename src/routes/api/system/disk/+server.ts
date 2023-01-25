import { json, type RequestHandler } from '@sveltejs/kit';
import { diskInfo } from '$lib/server/system/system';

export const GET: RequestHandler = async () => {
	const option: ResponseInit = {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	return json(await diskInfo(), option);
};
