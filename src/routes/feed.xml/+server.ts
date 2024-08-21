import { Feed } from 'feed';
import { joinURL } from 'ufo';
import type { RequestHandler } from './$types';
import type { Contributions } from '$lib';

export const prerender = true;

export const GET = (async ({ fetch, url }) => {
	const domain = `${url.protocol}//${url.host}`;
	const res = await fetch(`/api/contributions`);
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
