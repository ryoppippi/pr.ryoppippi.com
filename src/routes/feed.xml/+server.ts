import type { RequestHandler } from './$types';
import {
	getPRs,
	getUser,
} from '$lib/api.remote';
import { route } from '$lib/ROUTES';
import { error } from '@sveltejs/kit';
import { Feed } from 'feed';

const DOMAIN = route('domain');

export const GET = (async () => {
	if (!URL.canParse(DOMAIN)) {
		return error(500, 'Invalid domain');
	}

	const domain = new URL(DOMAIN).origin;
	const [user, prs] = await Promise.all([
		getUser(),
		getPRs(),
	]);

	const feed = new Feed({
		title: `${user.name} is contributing...`,
		description: `Discover ${user.name}'s recent pull requests on GitHub`,
		id: domain,
		link: domain,
		language: 'en',
		image: new URL('favicon.png', domain).toString(),
		favicon: new URL('favicon.png', domain).toString(),
		copyright: `MIT 2024 © ${user.name}`,
		feedLinks: {
			rss: `${domain}/rss.xml`,
		},
	});

	for (const pr of prs) {
		if (pr == null) {
			continue;
		}
		feed.addItem({
			link: pr.url,
			date: new Date(pr.created_at),
			title: pr.title,
			image: `https://github.com/${pr.repo.split('/')[0]}.png`,
			description: `<a href="${pr.url}">${pr.title}</a>`,
		});
	}

	const xml = feed.rss2();
	const response = new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});

	return response;
}) satisfies RequestHandler;
