import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Contributions, PR, User } from '$lib';
import { route } from '$lib/ROUTES';
import { useOctokit } from '$lib/octokit.server';

export const prerender = true;

export const GET = (async ({ fetch }) => {
	const octokit = useOctokit();

	const userRes = await fetch(route('GET /api/user'));
	const { user } = await userRes.json() as { user: User };

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
