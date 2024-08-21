import {
	defineConfig,
	presetAttributify,
	presetTypography,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetTypography(),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	shortcuts: {
		mergedPR: 'text-purple-500 dark:text-purple-400',
		openPR: 'text-green-500 dark:text-green-400',
		fcol: 'flex flex-col',
	},
});
