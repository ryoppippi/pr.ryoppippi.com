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
});
