<script lang='ts'>
	import * as DarkMode from 'svelte-fancy-darkmode';
	import 'uno.css';

	import '@unocss/reset/tailwind.css';

	const { children } = $props();

</script>

<DarkMode.Header themeColors={{ dark: '#121212', light: '#ffffff' }} />

{@render children()}

<style>
:global{
  body {
    --at-apply: min-h-screen bg-white text-gray-700 font-sans dark:(bg-[#121212] text-gray-200) motion-safe:(transition transition-duration-1s)
  }
}
</style>
