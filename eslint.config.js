import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	type: 'app',
	svelte: true,
	ignores: ['src/lib/ROUTES.ts', '.claude/**'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
}, {
	rules: {
		'antfu/no-top-level-await': 'off',
	},
});
