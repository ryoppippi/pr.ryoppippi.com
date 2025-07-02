import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (globalThis.caches == null) {
		return resolve(event);
	}

	const cache = await caches.open('sveltekit-cache');

	const cachedResponse = await cache.match(event.request.url);
	if (cachedResponse != null) {
		return cachedResponse;
	}
	const response = await resolve(event);

	const cacheMaxAgeSec = 60 * 15; // 15 minutes
	response.headers.set('Cache-Control', `public, max-age=${cacheMaxAgeSec}, s-maxage=${cacheMaxAgeSec}`);

	event.platform?.context.waitUntil(
		cache.put(event.request, response.clone()), // Clone the response to avoid consuming it
	);
	return response;
};
