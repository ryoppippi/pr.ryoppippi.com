import type { PageServerLoad } from './$types';
import { getPRs, getUser, isIncludeYourOwnPRs } from '$lib';

export const load: PageServerLoad = async () => {
	const [user, prs] = await Promise.all([
		getUser(),
		getPRs(isIncludeYourOwnPRs),
	]);
	const now = new Date().toJSON();

	return { user, prs, now };
};
