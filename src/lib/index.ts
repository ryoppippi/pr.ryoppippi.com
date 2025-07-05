import type { RequestEvent } from '@sveltejs/kit';
import type { PR, User } from './types';
import { minimatch } from 'minimatch';
import { useOctokit } from './octokit.server';
import { route } from './ROUTES';

const CACHE_DURATION = 5 * 60; // 5 minutes in seconds

/**
 * Checks if a target string is hidden by a list of patterns
 * @param target - The target string
 * @param hideList - The list of patterns to hide
 */
function isHidden(target: string, hideList: string[]): boolean {
	return hideList.some(pattern => minimatch(target, pattern));
}

export async function getUser(event?: RequestEvent): Promise<User & { fetchedAt: string }> {
	const cacheKey = new URL(`https://cache.pr.ryoppippi.com/user/${route('username')}`).toString();
	const now = Date.now();

	// Try to get from Cloudflare Cache if available
	if (globalThis.caches != null) {
		const cache = await caches.open('github-data');
		const cachedResponse = await cache.match(cacheKey);
		if (cachedResponse != null) {
			return cachedResponse.json();
		}
	}

	const octokit = useOctokit();

	// Fetch user from token
	const userResponse = await octokit.request('GET /users/{username}', {
		username: route('username'),
	});

	const user = {
		name: userResponse.data.name ?? userResponse.data.login,
		username: userResponse.data.login,
		avatar: userResponse.data.avatar_url,
		fetchedAt: new Date(now).toJSON(),
	};

	// Cache in Cloudflare Cache if available
	if (globalThis.caches != null && event?.platform?.context != null) {
		const cache = await caches.open('github-data');
		const response = new Response(JSON.stringify(user), {
			headers: {
				'content-type': 'application/json',
				'cache-control': `public, max-age=${CACHE_DURATION}`,
			},
		});
		// Use waitUntil to cache the response without blocking the main response
		// This allows the cache write to happen asynchronously after the response is sent
		event.platform.context.waitUntil(cache.put(cacheKey, response));
	}

	return user;
}

/**
 * Fetches the pull requests of the user
 * @param includeYourOwnPRs - Include the user's own pull requests
 */
export async function getPRs(includeYourOwnPRs = false, event?: RequestEvent): Promise<{ prs: PR[]; fetchedAt: string }> {
	const cacheKey = new URL(`https://cache.pr.ryoppippi.com/prs/${route('username')}/${includeYourOwnPRs}`).toString();
	const now = Date.now();

	// Try to get from Cloudflare Cache if available
	if (globalThis.caches != null) {
		const cache = await caches.open('github-data');
		const cachedResponse = await cache.match(cacheKey);
		if (cachedResponse != null) {
			return cachedResponse.json();
		}
	}

	const octokit = useOctokit();

	const user = await getUser(event);

	// Fetch pull requests from user
	const { data } = await octokit.request('GET /search/issues', {
		q: includeYourOwnPRs
			? `type:pr+author:"${user.username}"`
			: `type:pr+author:"${user.username}"+-user:"${user.username}"`,
		per_page: 100,
		page: 1,
		advanced_search: 'true',
	});

	const hideList = route('hideList').split(',');

	const prs = data.items.filter(pr => !(pr.state === 'closed' && pr.pull_request?.merged_at == null)).map(pr => ({
		repo: pr.repository_url.split('/').slice(-2).join('/'),
		title: pr.title,
		url: pr.html_url,
		created_at: pr.created_at,
		state: pr.pull_request?.merged_at != null ? 'merged' : pr.state as PR['state'],
		number: pr.number,
	})).filter(pr => !isHidden(pr.repo, hideList));

	const result = {
		prs,
		fetchedAt: new Date(now).toJSON(),
	};

	// Cache in Cloudflare Cache if available
	if (globalThis.caches != null && event?.platform?.context != null) {
		const cache = await caches.open('github-data');
		const response = new Response(JSON.stringify(result), {
			headers: {
				'content-type': 'application/json',
				'cache-control': `public, max-age=${CACHE_DURATION}`,
			},
		});
		// Use waitUntil to cache the response without blocking the main response
		// This allows the cache write to happen asynchronously after the response is sent
		event.platform.context.waitUntil(cache.put(cacheKey, response));
	}

	return result;
}

export const isIncludeYourOwnPRs = route('includeYourOwnPRs') === 'true';
