import type { PR, User } from './types';
import * as devalue from 'devalue';
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

export async function getUser(): Promise<User> {
	const octokit = useOctokit();

	// Fetch user from token
	const userResponse = await octokit.request('GET /users/{username}', {
		username: route('username'),
	});

	return {
		name: userResponse.data.name ?? userResponse.data.login,
		username: userResponse.data.login,
		avatar: userResponse.data.avatar_url,
	};
}

/**
 * Fetches the pull requests of the user
 * @param includeYourOwnPRs - Include the user's own pull requests
 */
export async function getPRs(includeYourOwnPRs = false): Promise<PR[]> {
	const octokit = useOctokit();

	const user = await getUser();

	// Fetch pull requests from user
	const { data } = await octokit.request('GET /search/issues', {
		q: includeYourOwnPRs
			? `type:pr+author:"${user.username}"`
			: `type:pr+author:"${user.username}"+-user:"${user.username}"`,
		per_page: 100,
		page: 1,
		advanced_search: 'true',
	});

	const hideList = devalue.parse(route('hideList')) as string[];

	return data.items.filter(pr => !(pr.state === 'closed' && pr.pull_request?.merged_at == null)).map(pr => ({
		repo: pr.repository_url.split('/').slice(-2).join('/'),
		title: pr.title,
		url: pr.html_url,
		created_at: pr.created_at,
		state: pr.pull_request?.merged_at != null ? 'merged' : pr.state as PR['state'],
		number: pr.number,
	})).filter(pr => !isHidden(pr.repo, hideList));
}

export const isIncludeYourOwnPRs = route('includeYourOwnPRs') === 'true';
