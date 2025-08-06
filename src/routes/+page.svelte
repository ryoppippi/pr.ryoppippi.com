<script lang='ts'>
	import { getPRs } from '$lib/api.remote';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Meta from './Meta.svelte';
	import PullRequest from './PullRequest.svelte';
	import PullRequestSkeleton from './PullRequestSkeleton.svelte';
	import UserSkeleton from './UserSkeleton.svelte';
</script>

<svelte:boundary>
	<Meta />
	{#snippet pending()}
		<!-- Wait for the data to load... -->
	{/snippet}
</svelte:boundary>

<div
	flex='~ col gap-8'
	font-sans
	max-w-2xl
	mxa
	p='4 sm:6 lg:8'
>
	<svelte:boundary>
		<Header />

		{#snippet pending()}
			<UserSkeleton />
		{/snippet}
	</svelte:boundary>

	<svelte:boundary>
		{#each await getPRs() as pr, count (pr.url)}
			<PullRequest {count} {pr} />
		{/each}

		{#snippet pending()}
			<!-- Show 5 skeleton PRs while loading -->
			{#each { length: 5 }, i (i)}
				<PullRequestSkeleton />
			{/each}
		{/snippet}
	</svelte:boundary>

	<svelte:boundary>
		<Footer />
		{#snippet pending()}
			<!-- Wait for the data to load... -->
		{/snippet}
	</svelte:boundary>
</div>
