import type { PageServerLoad } from './$types';
import { getPRs, getUser } from '$lib';

export const load: PageServerLoad = async () => {
	const [user, prs] = await Promise.all([getUser(), getPRs()]);
	const now = new Date().toJSON();

	return { user, prs, now };
};
