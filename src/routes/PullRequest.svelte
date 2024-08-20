<script lang='ts'>
	import type { PR } from '$lib';
	import { formatDate } from '$lib/date-utils';

	const { pr }: { pr: PR } = $props();
</script>
<!-- svelte-ignore element_invalid_self_closing_tag -->

<div
	flex
	gap-4
	items-center
>
	<a
		border='~ gray-200 dark:border-gray-800'
		href='https://github.com/{pr.repo}'
		overflow-hidden
		relative
		rounded-md
		shadow-sm
		shrink-0
		size-12
		target='_blank'
	>
		<img
			alt={pr.repo}
			size-full
			src="https://github.com/{pr.repo.split('/')[0]}.png"
		/>
	</a>

	<div
		flex='~ 1'
		gap='2 lg:4'
		justify-between
		min-w-0
	>
		<div
			flex='~ col'
			gap-1
			min-w-0
		>
			<a
				flex
				gap-1
				href={pr.url}
				items-center
				target='_blank'
				text='gray-900 dark:white'
				underline='hover:~'
			>
				<i-ph-git-pull-request-duotone
					class:mergedPR={pr.state === 'merged'}
					class:openPR={pr.state === 'open'}
					shrink-0
					size-5
				/>

				<span truncate>{pr.title}</span>
			</a>

			<a
				flex
				gap-1
				href='https://github.com/{pr.repo}'
				target='_blank'
				underline='hover:~'
			>
				<span opacity-75>{pr.repo.split('/')[0]}</span>
				<span opacity-50>/</span>
				<span truncate>{pr.repo.split('/')[1]}</span>
			</a>
		</div>

		<div
			flex='~ col'
			justify-between
			shrink-0
			text-right
		>
			<a
				href={pr.url}
				target='_blank'
				underline='hover:~'
			>
				#{pr.number}
			</a>

			<time
				datatime={pr.created_at}
				text='sm gray-500 dark:gray-400'
			>
				{formatDate(new Date(pr.created_at))}
			</time>
		</div>
	</div>
</div>
