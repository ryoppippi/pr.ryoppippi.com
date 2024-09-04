<script lang='ts'>
	import 'uno.css';
	import '@unocss/reset/tailwind.css';

	import DarkMode from '$lib/DarkMode';

	const { children } = $props();

</script>

<DarkMode themeColors={{ dark: '#121212', light: '#ffffff' }} />

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

  @keyframes enter {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  [data-animate] {
    --stagger: 0;
    --delay: 60ms;
    --start: 0ms;
  }

  @media (prefers-reduced-motion: no-preference) {
    [data-animate] {
      animation: enter 0.6s both;
      animation-iteration-count: 1;
      animation-delay: calc(var(--stagger) * var(--delay) + var(--start));
    }
  }

  [data-animation-controller='false'] [data-animate] {
    animation: none;
  }
}
</style>
