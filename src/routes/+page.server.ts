import type { PageServerLoad } from './$types';
import { getPRs, getUser, isIncludeYourOwnPRs } from '$lib';
import { CACHE_DURATION_SECONDS } from '$lib/consts';

export const load: PageServerLoad = async (event) => {
	const { setHeaders } = event;

	// Cache for 15 minutes
	setHeaders({
		'cache-control': `public, max-age=${CACHE_DURATION_SECONDS}, s-maxage=${CACHE_DURATION_SECONDS}`,
	});

	// Return promises instead of awaited values for streaming
	return {
		streamed: {
			user: getUser(event),
			prs: getPRs(isIncludeYourOwnPRs, event),
		},
	};
};
