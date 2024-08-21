<script lang='ts'>
	import 'uno.css';
	import '@unocss/reset/tailwind.css';

	import DarkModeHeader from './DarkModeHeader.svelte';
	import { assets } from '$app/paths';

	const { children } = $props();

	const faviconURL = `${assets}/favicon.png`;
</script>

<svelte:head>
	<meta name='theme-color' content='#121212' media='(prefers-color-scheme: dark)' />
	<meta name='theme-color' content='#ffffff' media='(prefers-color-scheme: light)' />
	<meta name='twitter:card' content='summary_large_image' />
	<meta name='twitter:image' content={faviconURL} />
	<meta name='og:image' content={faviconURL} />
</svelte:head>

<DarkModeHeader />

{@render children()}

<style>
:global{
  body {
    --at-apply: min-h-screen bg-white text-gray-700 font-sans dark:(bg-[#121212] text-gray-200);
    transition: background-color 1s;
  }
}
</style>
