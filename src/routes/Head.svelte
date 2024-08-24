<script lang='ts'>
	import type { User } from '$lib';

	const { user, userUrl }: { user: User; userUrl: string } = $props();

	const faviconURL = `${userUrl}.png`;

	const title = `${user.name} is Contributing...`;
	const description = `${user.username}'s recent pull requests`;
</script>

{#snippet meta(kind: string, property: string, content: string)}
	<meta name='{kind}:{property}' {content} />
{/snippet}

<svelte:head>
	<title>{title}</title>
	<meta name='description' content={description} />
	<link href={faviconURL} rel='icon' />

	<meta name='theme-color' content='#121212' media='(prefers-color-scheme: dark)' />
	<meta name='theme-color' content='#ffffff' media='(prefers-color-scheme: light)' />

	{@render meta('twitter', 'title', title)}
	{@render meta('twitter', 'description', description)}
	{@render meta('twitter', 'image', faviconURL)}
	{@render meta('twitter', 'image:alt', title)}
	{@render meta('twitter', 'card', 'summary')}

	{@render meta('og', 'title', title)}
	{@render meta('og', 'description', description)}
	{@render meta('og', 'image', faviconURL)}
	{@render meta('og', 'image:alt', title)}
</svelte:head>
