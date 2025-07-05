import type { Handle } from '@sveltejs/kit';
import { CACHE_DURATION_SECONDS } from '$lib/consts';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Set cache headers for all responses
	// Individual pages can override this with setHeaders
	if (!response.headers.has('cache-control')) {
		response.headers.set('cache-control', `public, max-age=${CACHE_DURATION_SECONDS}, s-maxage=${CACHE_DURATION_SECONDS}`);
	}

	return response;
};
