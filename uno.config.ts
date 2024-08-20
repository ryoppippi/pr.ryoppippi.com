import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import presetTagify from '@unocss/preset-tagify';
import { isDevelopment } from 'std-env';

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			autoInstall: isDevelopment,
		}),
		presetTypography(),
		presetTagify(),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	shortcuts: {
		mergedPR: 'text-purple-500 dark:text-purple-400',
		openPR: 'text-green-500 dark:text-green-400',
	},
});
