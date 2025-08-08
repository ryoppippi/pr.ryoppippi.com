<script lang='ts'>
	import { getUser } from '$lib/api.remote';
	import { route } from '$lib/ROUTES';
	import { MetaTags } from 'svelte-meta-tags';

	const user = await getUser();
	const userUrl = new URL(user.username, 'https://github.com/').toString();
	const title = `${user.name} is Contributing...`;
	const description = `${user.username}'s recent pull requests on GitHub`;
	const faviconURL = `${userUrl}.png`;
</script>

<MetaTags
	additionalLinkTags={[
		{
			rel: 'alternate',
			title: description,
			type: 'application/rss+xml',
			href: route('GET /feed.xml'),
		},
		{
			rel: 'icon',
			href: faviconURL,
		},
	]}
	{description}
	openGraph={{
		url: route('domain'),
		title,
		description,
		images: [
			{
				url: faviconURL,
				alt: title,
			},
		],
	}}
	{title}
	twitter={{
		title,
		description,
		image: faviconURL,
		imageAlt: title,
		cardType: 'summary',
	}}
/>
