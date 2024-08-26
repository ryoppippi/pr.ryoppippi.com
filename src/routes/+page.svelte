<script lang='ts'>
	import { joinURL } from 'ufo';
	import { MetaTags } from 'svelte-meta-tags';

	import PullRequest from './PullRequest.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { route } from '$lib/ROUTES';

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
	fcol
	font-sans
	gap-8
	max-w-2xl
	mxa
	p='4 sm:6 lg:8'
>
	<Header {description} {user} {userUrl} />

	{#each prs as pr (pr.url)}
		<PullRequest {pr} />
	{/each}

	<Footer {...data} />
</div>
