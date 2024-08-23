<script lang='ts'>
	import type { User } from '$lib';

	const { user, userUrl }: { user: User; userUrl: string } = $props();

	const faviconURL = `${userUrl}.png`;

	const title = `${user.name} is Contributing...`;
	const description = `${user.username}'s recent pull requests`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name='description' content={description} />
	<meta name='theme-color' content='#121212' media='(prefers-color-scheme: dark)' />
	<meta name='theme-color' content='#ffffff' media='(prefers-color-scheme: light)' />
	<meta name='twitter:title' content={title} />
	<meta name='twitter:description' content={description} />
	<meta name='twitter:card' content='summary_large_image' />
	<meta name='twitter:image' content={faviconURL} />
	<meta name='twitter:image:alt' content={title} />
	<meta name='og:title' content={title} />
	<meta name='og:description' content={description} />
	<meta name='og:image' content={faviconURL} />
	<meta name='og:image:alt' content={title} />
	<link href={faviconURL} rel='icon' />
</svelte:head>
