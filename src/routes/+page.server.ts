import type { PageServerLoad } from './$types';
import { getPRs, getUser, isIncludeYourOwnPRs } from '$lib';

export const load: PageServerLoad = async (event) => {
	const { setHeaders } = event;

	// Cache for 5 minutes (300 seconds)
	setHeaders({
		'cache-control': 'public, max-age=300, s-maxage=300',
	});

	// Return promises instead of awaited values for streaming
	return {
		streamed: {
			user: getUser(event),
			prs: getPRs(isIncludeYourOwnPRs, event),
		},
	};
};
