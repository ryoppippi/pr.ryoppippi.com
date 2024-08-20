<script>
	import PullRequest from './PullRequest.svelte';

	const { data } = $props();
	const user = data.user;
	const prs = data.prs;
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->

<div
	class='p-4 sm:p-6 lg:p-8 max-w-2xl'
	flex='~ col gap-8'
	font-sans
	lt-sm='px6'
	max-w-180
	mxa
	p10
>
	<div flex='~ col'>
		<h1
			flex='~ gap-2 wrap'
			items-center
			justify-center
			text-3xl>
			<a
				flex='~ items-center'
				gap-2
				href='https://github.com/{user.username}'
				target='_blank'
			>
				<img
					alt={user.username}
					mr1
					rounded-full
					src={user.avatar}
					w-12
				/>
				{user.name}
			</a>
			is <animate-pulse>Contributing...</animate-pulse>
		</h1>
		<p
			mt1
			op75
			text-center
		>
			<a href='https://github.com/leon-fong' target='_blank'>
				{user.username}'s recent pull requests on GitHub
			</a>
		</p>

		<div p5>
			<hr ma op25 w-20 />
		</div>
	</div>

	{#each prs as pr (pr.url)}
		<PullRequest {pr} />
	{/each}
</div>
