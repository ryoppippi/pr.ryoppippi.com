import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import Icons from 'unplugin-icons/vite';
import { isDevelopment } from 'std-env';

export default defineConfig({
	plugins: [
		UnoCSS({
			extractors: [
				extractorSvelte(),
			],
		}),
		Icons({
			compiler: 'svelte',
			autoInstall: isDevelopment,
		}),
		sveltekit(),
	],
});
