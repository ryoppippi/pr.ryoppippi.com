<script lang='ts'>
	import Divider from './Divider.svelte';
	import * as DarkMode from '$lib/DarkMode';
	import { route } from '$lib/ROUTES';
	import type { User } from '$lib';

	import GitHub from '~icons/line-md/github-loop';
	import RSS from '~icons/line-md/rss';

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
		<DarkMode.ToggleButton />
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

	<Divider />
</div>
