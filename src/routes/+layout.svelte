<script lang='ts'>
	import 'uno.css';
	import '@unocss/reset/tailwind.css';

	import { ModeWatcher } from 'mode-watcher';
	import { CheckTransitions } from '$lib/logic.svelte';

	const { children } = $props();

	const ct = new CheckTransitions();

	$inspect(ct.isAppearanceTransition);
</script>

<!-- disable transition when reducing motion & transition api is available -->
<ModeWatcher disableTransitions={ct.isAppearanceTransition} themeColors={{ dark: '#121212', light: '#ffffff' }} />

{@render children()}

<style>
:global{
  body {
    --at-apply: min-h-screen bg-white text-gray-700 font-sans dark:(bg-[#121212] text-gray-200) motion-safe:(transition transition-duration-1s)
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
  ::view-transition-old(root) {
    z-index: 1;
  }
  ::view-transition-new(root) {
    z-index: 9999;
  }
  .dark::view-transition-old(root) {
    z-index: 9999;
  }
  .dark::view-transition-new(root) {
    z-index: 1;
  }
}
</style>
