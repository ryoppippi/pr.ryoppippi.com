<script lang='ts'>
	import { route } from '$lib/ROUTES';

	const { title, description, userUrl }: { title: string; description: string; userUrl: string } = $props();

	const faviconURL = `${userUrl}.png`;

</script>

{#snippet meta(kind: string, property: string, content: string)}
	<meta name='{kind}:{property}' {content} />
{/snippet}

<svelte:head>
	<title>{title}</title>
	<meta name='description' content={description} />
	<link href={faviconURL} rel='icon' />
	<link href={route('GET /feed.xml')} rel='alternate' title={description} type='application/rss+xml' />

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
