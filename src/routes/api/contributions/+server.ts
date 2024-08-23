import { json } from '@sveltejs/kit';
import { Octokit } from 'octokit';
import type { RequestHandler } from './$types';
import { USERNAME } from '$env/static/private';
import type { Contributions, PR } from '$lib';

export const prerender = true;

export const GET = (async () => {
	const octokit = new Octokit();
	// Fetch user from token
	const userResponse = await octokit.request('GET /users/{username}', {
		username: USERNAME,
	});
	const user = {
		name: userResponse.data.name ?? userResponse.data.login,
		username: userResponse.data.login,
		avatar: userResponse.data.avatar_url,
	};
	// Fetch pull requests from user
	const { data } = await octokit.request('GET /search/issues', {
		q: `type:pr+author:"${user.username}"+-user:"${user.username}"`,
		per_page: 50,
		page: 1,
	});
	const prs = data.items.filter(pr => !(pr.state === 'closed' && pr.pull_request?.merged_at == null)).map(pr => ({
		repo: pr.repository_url.split('/').slice(-2).join('/'),
		title: pr.title,
		url: pr.html_url,
		created_at: pr.created_at,
		state: pr.pull_request?.merged_at != null ? 'merged' : pr.state as PR['state'],
		number: pr.number,
	}));

	return json({ user, prs } satisfies Contributions);
}) satisfies RequestHandler;
