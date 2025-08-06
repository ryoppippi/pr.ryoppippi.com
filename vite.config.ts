import { sveltekit } from '@sveltejs/kit/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import { isDevelopment } from 'std-env';
import UnoCSS from 'unocss/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { kitRoutes } from 'vite-plugin-kit-routes';

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
		kitRoutes({
			LINKS: {
				domain: `https://pr.ryoppippi.com`,
				repo: 'https://github.com/ryoppippi/pr.ryoppippi.com',
				username: 'ryoppippi',
				includeYourOwnPRs: 'true', // Include your own PRs 'true' or 'false'
				hideList: ([
					'ryoppippi/ryoppippi.com',
					'ryoppippi/talks',
					'ryoppippi/cv',
					'samchon/*',
					'wrtnlabs/*',
					'StackOneHQ/*',
				]).join(','),
			},
		}),
	],
});
