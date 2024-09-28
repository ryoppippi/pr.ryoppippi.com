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
		'mergedPR': 'text-purple-500 dark:text-purple-400',
		'openPR': 'text-green-500 dark:text-green-400',
		'fcol': 'flex flex-col',
		'sliding-animation-delay-base': '[--delay:80ms] sm:[--delay:150ms]',
	},
	rules: [
		[/^sliding-animation$/, function* ([,], { symbols }) {
			yield `
@keyframes enter {
	0% {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: none;
	}
}
`;

			yield {
				'opacity': 0,
				'animation': `enter 0.6s both`,
				'animation-iteration-count': 1,
				'animation-delay': `calc(var(--stagger, 0) * var(--delay, 80ms) + var(--start, 0ms))`,
			};

			yield {
				[symbols.parent]: `@media (prefers-reduced-motion: reduce)`,
				animation: 'none',
			};
		}],
	],

});
