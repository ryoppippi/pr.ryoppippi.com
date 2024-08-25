<script lang='ts'>
	import { joinURL } from 'ufo';
	import { mode, toggleMode } from 'mode-watcher';
	import PullRequest from './PullRequest.svelte';
	import Head from './Head.svelte';
	import { route } from '$lib/ROUTES';

	import MoonToSunny from '~icons/line-md/moon-filled-to-sunny-filled-loop-transition';
	import SunnyToMoon from '~icons/line-md/sunny-filled-loop-to-moon-filled-transition';
	import GitHub from '~icons/line-md/github-loop';
	import RSS from '~icons/line-md/rss';

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
					loading='lazy'
					mr1
					rounded-full
					src={user.avatar}
					w-12
				/>
				{user.name}
			</a>
			is <span animate-pulse>Contributing...</span>
		</h1>
		<p
			mt1
			op75
			text-center
		>
			<a href={userUrl} target='_blank'>
				{description}
			</a>
		</p>
		<div flex gap-3 justify-center p3>
			<button
				aria-label='Toggle Dark Mode'
				onclick={toggleMode}
				type='button'
			>
				{#if $mode === 'dark'}
					<SunnyToMoon />
				{:else}
					<MoonToSunny />
				{/if}
			</button>
			<a
				aria-label='GitHub Repository'
				href={route('repo')}
				target='_blank'
			>
				<GitHub />
			</a>
			<a
				aria-label='RSS Feed'
				href={route('GET /feed.xml')}
			>
				<RSS />
			</a>
		</div>

		<div p2>
			<hr ma op25 w-50 />
		</div>
	</div>

	{#each prs as pr (pr.url)}
		<PullRequest {pr} />
	{/each}
</div>
