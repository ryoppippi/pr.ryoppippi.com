import type { PageServerLoad } from './$types';
import type { Contributions } from '$lib';
import { route } from '$lib/ROUTES';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(route('GET /api/contributions'));
	const { user, prs } = await res.json() as Contributions;

	const now = new Date().toJSON();

	return { user, prs, now };
};
