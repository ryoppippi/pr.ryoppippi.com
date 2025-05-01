<script lang='ts'>
	import { route } from '$lib/ROUTES';
	import { MetaTags } from 'svelte-meta-tags';

	import { joinURL } from 'ufo';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import PullRequest from './PullRequest.svelte';

	const { data } = $props();
	const user = data.user;
	const prs = data.prs;
	const userUrl = joinURL('https://github.com', user.username);
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

<div
	flex='~ col gap-8'
	font-sans
	max-w-2xl
	mxa
	p='4 sm:6 lg:8'
>
	<Header {description} {user} {userUrl} />

	{#each prs as pr, count (pr.url)}
		<PullRequest {count} {pr} />
	{/each}

	<Footer {...data} />
</div>
