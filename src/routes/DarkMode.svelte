<script context='module'>
	import { mode as modeStore, toggleMode } from 'mode-watcher';
	import { fromStore } from 'svelte/store';

	import { on } from 'svelte/events';
	import { browser } from '$app/environment';

	/**
	 * check if the browser supports appearance transition
	 */
	export class CheckTransitions {
		#isReduced = $state(false);
		#isViewTransitionAvailable = $state(false);
		#mediaQuery: MediaQueryList | undefined = undefined;

		#isAppearanceTransition = $derived(this.#isViewTransitionAvailable && !this.#isReduced);
		constructor() {
			if (!browser) {
				return;
			}

			// @ts-expect-error experimental API
			this.#isViewTransitionAvailable = document.startViewTransition != null;
			this.#mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
			this.#isReduced = this.#mediaQuery.matches;

			on(this.#mediaQuery, 'change', (_event) => {
				const event = _event as MediaQueryListEvent;
				this.#isReduced = event.matches;
			});
		}

		get isAppearanceTransition() {
			return this.#isAppearanceTransition;
		}
	}

	/**
	 * Credit to [@hooray](https://github.com/hooray)
	 * @see https://github.com/vuejs/vitepress/pull/2347
	 */
	export function toggleDark(event: MouseEvent) {
		const ct = new CheckTransitions();
		if (!ct.isAppearanceTransition) {
			toggleMode();
			return;
		}

		const mode = fromStore(modeStore);
		const isDark = $derived(mode.current === 'dark');

		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y),
		);
		// @ts-expect-error: Transition API

		const transition = document.startViewTransition(() => toggleMode());

		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`,
			];
			document.documentElement.animate(
				{
					clipPath: isDark
						? [...clipPath].reverse()
						: clipPath,
				},
				{
					duration: 400,
					easing: 'ease-out',
					pseudoElement: isDark
						? '::view-transition-old(root)'
						: '::view-transition-new(root)',
				},
			);
		});
	}

</script>
<script lang='ts'>
	import { ModeWatcher } from 'mode-watcher';

	const ct = new CheckTransitions();
</script>

<!-- disable transition when reducing motion & transition api is available -->
<ModeWatcher disableTransitions={ct.isAppearanceTransition} themeColors={{ dark: '#121212', light: '#ffffff' }} />

<style>
:global{
  body {
    --at-apply: motion-safe:(transition transition-duration-1s)
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
