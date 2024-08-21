<script>
	import { joinURL } from 'ufo';
	import PullRequest from './PullRequest.svelte';
	import { browser } from '$app/environment';

	const { data } = $props();
	const user = data.user;
	const prs = data.prs;

	const userUrl = joinURL('https://github.com', user.username);

	let isDark = $state(
		browser
			? localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			: false,
	);

	function toggleDarkMode() {
		document.documentElement.classList.toggle('dark');
		isDark = document.documentElement.classList.contains('dark');
		localStorage.theme = isDark ? 'dark' : 'light';
	}
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<!-- svelte-ignore a11y_missing_content -->
<div
	class='p-4 sm:p-6 lg:p-8 max-w-2xl'
	fcol
	font-sans
	gap-8
	lt-sm='px6'
	max-w-180
	mxa
	p10
>
	<div fcol>
		<h1
			flex='~ gap-2 wrap'
			items-center
			justify-center
			text-3xl>
			<a
				flex='~ items-center'
				gap-2
				href={userUrl}
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
			<a href={userUrl} target='_blank'>
				{user.username}'s recent pull requests on GitHub
			</a>
		</p>
		<div flex gap-3 justify-center p3>
			<!-- eslint-disable-next-line svelte/button-has-type -->
			<button
				class:i-ph-moon-stars-duotone={!isDark}
				class:i-ph-sun-duotone={isDark}
				onclick={toggleDarkMode}
			/>
			<a href={userUrl} i-line-md-github-loop target='_blank' />
			<a href='/feed.xml' i-ph-rss-simple-duotone />
		</div>

		<div p2>
			<hr ma op25 w-50 />
		</div>
	</div>

	{#each prs as pr (pr.url)}
		<PullRequest {pr} />
	{/each}
</div>
