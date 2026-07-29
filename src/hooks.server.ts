import type { Handle } from '@sveltejs/kit';
import { CACHE_BROWSER_MAX_AGE_SECONDS, CACHE_EDGE_MAX_AGE_SECONDS } from '$lib/consts';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Set cache headers for all responses
	// Individual pages can override this with setHeaders
	// s-maxage is honored by Workers Cache (enabled in wrangler.jsonc), which serves
	// cached responses without invoking the Worker; stale-while-revalidate lets the edge
	// return a stale response instantly while refreshing it in the background
	if (!response.headers.has('cache-control')) {
		response.headers.set('cache-control', `public, max-age=${CACHE_BROWSER_MAX_AGE_SECONDS}, s-maxage=${CACHE_EDGE_MAX_AGE_SECONDS}, stale-while-revalidate=${CACHE_EDGE_MAX_AGE_SECONDS}`);
	}

	return response;
};
