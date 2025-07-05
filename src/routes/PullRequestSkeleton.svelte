<div flex='~ items-center gap-4'
>
	<!-- Avatar skeleton -->
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		animate-pulse
		bg='gray-100 dark:gray-800'
		rounded-md
		shrink-0
		size-12
	/>

	<div
		flex='~ 1 justify-between'
		gap='2 lg:4'
		min-w-0
	>
		<div
			flex='~ col'
			gap-1
			min-w-0
		>
			<!-- PR title skeleton -->
			<div flex='~ items-center gap-1'>
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<div animate-pulse bg='gray-100 dark:gray-800' rounded shrink-0 size-5 />
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<div animate-pulse bg='gray-100 dark:gray-800' h-5 rounded w='75%' />
			</div>

			<!-- Repo name skeleton -->
			<div flex='~ gap-1'>
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<div animate-pulse bg='gray-100 dark:gray-800' h-4 rounded w-16 />
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<div animate-pulse bg='gray-100 dark:gray-800' h-4 rounded w-20 />
			</div>
		</div>

		<div
			flex='~ col justify-between shrink-0'
			text-right
		>
			<!-- PR number skeleton -->
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div animate-pulse bg='gray-100 dark:gray-800' h-5 ml-auto rounded w-12 />

			<!-- Time skeleton -->
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div animate-pulse bg='gray-100 dark:gray-800' h-4 ml-auto rounded w-20 />
		</div>
	</div>
</div>
