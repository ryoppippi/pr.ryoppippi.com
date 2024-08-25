import { Octokit } from 'octokit';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';

let octokit: Octokit | undefined;

export function useOctokit(): Octokit {
	return octokit ?? new Octokit({
		/* you can add optional auth here */
		auth: !building ? env.GITHUB_TOKEN : undefined,
	});
}
