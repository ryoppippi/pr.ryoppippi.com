<script lang='ts'>
	import type { User } from '$lib/types.js';
	import { PUBLIC_REPO } from '$env/static/public';
	import * as DarkMode from 'svelte-fancy-darkmode';
	import GitHub from '~icons/line-md/github-loop';
	import MoonToSunny from '~icons/line-md/moon-filled-to-sunny-filled-loop-transition';
	import RSS from '~icons/line-md/rss';

	import SunnyToMoon from '~icons/line-md/sunny-filled-loop-to-moon-filled-transition';
	import Divider from './Divider.svelte';

	const {
		user,
		userUrl,
		description,
	}: {
		user: User;
		userUrl: string;
		description: string;
	} = $props();
</script>

<div flex='~ col'>
	<h1
		flex='~ gap-2 wrap justify-center items-center'
		text-3xl
	>
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
	<div
		flex='~ gap-3 justify-center'
		p3
	>
		<DarkMode.ToggleButton>
			{#snippet dark()}
				<SunnyToMoon />
			{/snippet}

			{#snippet light()}
				<MoonToSunny />
			{/snippet}
		</DarkMode.ToggleButton>
		<a
			aria-label='GitHub Repository'
			href={PUBLIC_REPO}
			target='_blank'
		>
			<GitHub />
		</a>
		<a
			aria-label='RSS Feed'
			href='/feed.xml'
		>
			<RSS />
		</a>
	</div>

	<Divider />
</div>
