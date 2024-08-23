import { Feed } from 'feed';
import { joinURL } from 'ufo';
import type { RequestHandler } from './$types';
import type { Contributions } from '$lib';
import { route } from '$lib/ROUTES';
import { assets } from '$app/paths';

export const prerender = true;

export const GET = (async ({ fetch }) => {
	const domain = new URL(assets).origin;
	const res = await fetch(route('GET /api/contributions'));
	const { user, prs } = await res.json() as Contributions;

	const feed = new Feed({
		title: `${user.name} is contributing...`,
		description: `Discover ${user.name}'s recent pull requests on GitHub`,
		id: domain,
		link: domain,
		language: 'en',
		image: joinURL(domain, 'favicon.png'),
		favicon: joinURL(domain, 'favicon.png'),
		copyright: `MIT 2024 © ${user.name}`,
		feedLinks: {
			rss: `${domain}/rss.xml`,
		},
	});

	for (const pr of prs) {
		feed.addItem({
			link: pr.url,
			date: new Date(pr.created_at),
			title: pr.title,
			image: `https://github.com/${pr.repo.split('/')[0]}.png`,
			description: `<a href="${pr.url}">${pr.title}</a>`,
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
}) satisfies RequestHandler;
