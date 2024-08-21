import type { PageServerLoad } from './$types';
import type { Contributions } from '$lib';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(`/api/contributions`);
	const { user, prs } = await res.json() as Contributions;

	return { user, prs };
};
