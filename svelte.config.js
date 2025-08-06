import path from 'node:path';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		experimental: {
			remoteFunctions: true,
		},
		typescript: {
			config(config) {
				config.include.push(path.join(import.meta.dirname, 'uno.config.ts'));
			},
		},
		adapter: adapter(),
	},
};

export default config;
