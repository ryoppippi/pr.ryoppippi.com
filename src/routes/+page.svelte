<script lang='ts'>
	import { route } from '$lib/ROUTES';
	import { MetaTags } from 'svelte-meta-tags';

	import { joinURL } from 'ufo';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import PullRequest from './PullRequest.svelte';
	import PullRequestSkeleton from './PullRequestSkeleton.svelte';
	import UserSkeleton from './UserSkeleton.svelte';

	const { data } = $props();
</script>

{#await data.streamed.user}
	<!-- Loading state for metadata -->
{:then user}
	{@const userUrl = joinURL('https://github.com', user.username)}
	{@const title = `${user.name} is Contributing...`}
	{@const description = `${user.username}'s recent pull requests on GitHub`}
	{@const faviconURL = `${userUrl}.png`}
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
{/await}

<div
	flex='~ col gap-8'
	font-sans
	max-w-2xl
	mxa
	p='4 sm:6 lg:8'
>
	{#await data.streamed.user}
		<UserSkeleton />
	{:then user}
		{@const userUrl = joinURL('https://github.com', user.username)}
		{@const description = `${user.username}'s recent pull requests on GitHub`}
		<Header {description} {user} {userUrl} />
	{/await}

	{#await data.streamed.prs}
		<!-- Show 5 skeleton PRs while loading -->
		{#each Array.from({ length: 5 }) as _, i (i)}
			<PullRequestSkeleton />
		{/each}
	{:then prData}
		{#each prData.prs as pr, count (pr.url)}
			<PullRequest {count} {pr} />
		{/each}
	{/await}

	{#await Promise.all([data.streamed.user, data.streamed.prs])}
		<!-- Wait for data to show footer -->
	{:then [_user, prData]}
		<Footer fetchedAt={prData.fetchedAt} />
	{/await}
</div>
