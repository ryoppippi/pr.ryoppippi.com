import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	svelte: true,
	ignores: ['src/lib/ROUTES.ts'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
