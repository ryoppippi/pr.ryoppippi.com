import {
	defineConfig,
	presetAttributify,
	presetTypography,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

import { presetRyoppippi } from '@ryoppippi/unocss-preset';

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetTypography(),
		presetRyoppippi(),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	shortcuts: {
		'mergedPR': 'text-purple-500 dark:text-purple-400',
		'openPR': 'text-green-500 dark:text-green-400',
		'fcol': 'flex flex-col',
		'sliding-animation-delay-base': '[--delay:80ms] sm:[--delay:150ms]',
	},
	rules: [
	],
});
