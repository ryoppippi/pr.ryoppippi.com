import type { RequestHandler } from './$types';
import {
	getPRs,
	getUser,
} from '$lib/api.remote';
import { isIncludeYourOwnPRs } from '$lib/consts';
import { route } from '$lib/ROUTES';
import { error } from '@sveltejs/kit';
import { Feed } from 'feed';
import { joinURL } from 'ufo';

const DOMAIN = route('domain');

export const GET = (async () => {
	if (!URL.canParse(DOMAIN)) {
		return error(500, 'Invalid domain');
	}

	const domain = new URL(DOMAIN).origin;
	const [user, prData] = await Promise.all([
		getUser(),
		getPRs({ isIncludeYourOwnPRs }),
	]);

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

	for (const pr of prData.prs) {
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
