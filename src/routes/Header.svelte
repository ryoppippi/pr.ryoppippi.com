<script lang='ts'>
	import Divider from './Divider.svelte';
	import * as DarkMode from '$lib/DarkMode';
	import { route } from '$lib/ROUTES';
	import type { User } from '$lib/types.js';

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
		fcc
		flex='~ gap-2 wrap'
		text-3xl>
		<a
			fyc
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
	<div fxc gap-3 p3>
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
