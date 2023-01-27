// import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';

import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			precompress: true
		}),
		files: {
			hooks: {
				server: 'src/lib/hook/hook.server',
				client: 'src/lib/hook/hook.client'
			}
		}
	}
};

export default config;
