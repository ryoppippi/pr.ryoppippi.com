import type { PR } from './types';
import { query } from '$app/server';
import { minimatch } from 'minimatch';
import { useOctokit } from './octokit.server';
import { route } from './ROUTES';

/**
 * Checks if a target string is hidden by a list of patterns
 * @param target - The target string
 * @param hideList - The list of patterns to hide
 */
function isHidden(target: string, hideList: string[]): boolean {
	return hideList.some(pattern => minimatch(target, pattern));
}

export const getUser = query(async () => {
	const octokit = useOctokit();

	// Fetch user from token
	const userResponse = await octokit.request('GET /users/{username}', {
		username: route('username'),
	});

	const user = {
		name: userResponse.data.name ?? userResponse.data.login,
		username: userResponse.data.login,
		avatar: userResponse.data.avatar_url,
	};

	return user;
});

/**
 * Fetches the pull requests of the user
 * @param includeYourOwnPRs - Include the user's own pull requests
 */
export const getPRs = query(async (): Promise<PR[]> => {
	const isIncludeYourOwnPRs = route('includeYourOwnPRs') === 'true';

	const octokit = useOctokit();

	const user = await getUser();

	// Fetch pull requests from user
	const { data } = await octokit.request('GET /search/issues', {
		q: isIncludeYourOwnPRs
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

	return prs;
});

export const getCurrentTime = query(async () => {
	return new Date().toJSON();
});
