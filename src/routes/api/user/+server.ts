import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { useOctokit } from '$lib/octokit.server';
import { route } from '$lib/ROUTES';
import type { User } from '$lib';

export const prerender = true;

export const GET = (async () => {
	const octokit = useOctokit();

	// Fetch user from token
	const userResponse = await octokit.request('GET /users/{username}', {
		username: route('username'),
	});
	const user = {
		name: userResponse.data.name ?? userResponse.data.login,
		username: userResponse.data.login,
		avatar: userResponse.data.avatar_url,
	} as const satisfies User;

	return json({ user });
}) satisfies RequestHandler;
