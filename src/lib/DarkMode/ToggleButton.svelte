<script>
	import { darkMode } from './runes.svelte';
	import MoonToSunny from '~icons/line-md/moon-filled-to-sunny-filled-loop-transition';
	import SunnyToMoon from '~icons/line-md/sunny-filled-loop-to-moon-filled-transition';

</script>

<button
	aria-label='Toggle Dark Mode'
	onclick={darkMode.toggleDark}
	type='button'
>

	{#if darkMode.isDark}
		<SunnyToMoon />
	{:else}
		<MoonToSunny />
	{/if}
</button>
