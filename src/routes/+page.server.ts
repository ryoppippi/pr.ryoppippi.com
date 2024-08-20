import type { Contributions } from '$lib';

export async function load({ fetch }) {
	const res = await fetch(`/api/contributions`);
	const { user, prs } = await res.json() as Contributions;

	return { user, prs };
}
