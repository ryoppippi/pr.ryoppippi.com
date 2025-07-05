import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Set cache headers for all responses
	// Individual pages can override this with setHeaders
	if (!response.headers.has('cache-control')) {
		response.headers.set('cache-control', 'public, max-age=300, s-maxage=300');
	}

	return response;
};
