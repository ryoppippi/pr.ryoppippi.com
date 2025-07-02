import type { PageServerLoad } from './$types';
import { getPRs, getUser, isIncludeYourOwnPRs } from '$lib';

export const load: PageServerLoad = async ({ setHeaders }) => {
	const [user, prs] = await Promise.all([
		getUser(),
		getPRs(isIncludeYourOwnPRs),
	]);
	const now = new Date().toJSON();

	// Cache for 5 minutes (300 seconds)
	setHeaders({
		'cache-control': 'public, max-age=300, s-maxage=300',
	});

	return { user, prs, now };
};
