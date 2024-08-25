<script lang='ts'>
	import { joinURL } from 'ufo';
	import PullRequest from './PullRequest.svelte';
	import Head from './Head.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	const { data } = $props();
	const user = data.user;
	const prs = data.prs;
	const userUrl = joinURL('https://github.com', user.username);
	const title = `${user.name} is Contributing...`;
	const description = `${user.username}'s recent pull requests on GitHub`;
</script>

<Head {description} {title} {userUrl} />

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
