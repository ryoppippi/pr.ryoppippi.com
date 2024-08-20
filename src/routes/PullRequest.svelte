<script lang='ts'>
	import type { PR } from '$lib';
	import { formatDate } from '$lib/date-utils';

	const { pr }: { pr: PR } = $props();
</script>
<!-- svelte-ignore element_invalid_self_closing_tag -->

<div class='flex items-center gap-4'>
	<a
		class='size-12 shrink-0 rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm'
		href='https://github.com/{pr.repo}'
		relative
		target='_blank'
	>
		<img class='size-full' alt={pr.repo} src="https://github.com/{pr.repo.split('/')[0]}.png" />
	</a>

	<div class='flex-1 flex justify-between gap-2 lg:gap-4 min-w-0'>
		<div class='flex flex-col min-w-0 gap-1'>
			<a class='flex items-center gap-1 hover:underline text-gray-900 dark:text-white' href={pr.url} target='_blank'>
				<i-ph-git-pull-request-duotone
					class='size-5 shrink-0'
					class:dark:text-green-400={pr.state === 'open'}
					class:dark:text-purple-400={pr.state === 'merged'}
					class:text-green-500={pr.state === 'open'}
					class:text-purple-500={pr.state === 'merged'}
				/>

				<span class='truncate'>{pr.title}</span>
			</a>

			<a class='flex gap-1 hover:underline' href='https://github.com/{pr.repo}' target='_blank'>
				<span class='opacity-75'>{pr.repo.split('/')[0]}</span>
				<span class='opacity-50'>/</span>
				<span class='truncate'>{pr.repo.split('/')[1]}</span>
			</a>
		</div>

		<div class='flex flex-col justify-between shrink-0 text-right'>
			<a class='hover:underline' href={pr.url} target='_blank'>
				#{pr.number}
			</a>

			<time
				class='text-sm text-gray-500 dark:text-gray-400'
				datatime={pr.created_at}
			>
				{formatDate(new Date(pr.created_at))}
			</time>
		</div>
	</div>
</div>
