<script lang='ts'>
	import { joinURL } from 'ufo';
	import { formatTimeAgo } from '@vueuse/core';
	import type { PR } from '$lib';

	import PullRequestIcon from '~icons/ph/git-pull-request-duotone';

	const { pr }: { pr: PR } = $props();

	const prURL = joinURL('https://github.com', pr.repo);
	const prUserName = pr.repo.split('/').at(0) ?? '';
	const prRepoName = pr.repo.split('/').at(1) ?? '';
</script>

<div
	flex
	gap-4
	items-center
>
	<a
		border='~ gray-200 dark:gray-800'
		href={prURL}
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
			loading='lazy'
			size-full
			src='https://github.com/{prUserName}.png'
		/>
	</a>

	<div
		flex='~ 1'
		gap='2 lg:4'
		justify-between
		min-w-0
	>
		<div
			fcol
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
			>
				<span
					class:mergedPR={pr.state === 'merged'}
					class:openPR={pr.state === 'open'}
					shrink-0
					size-5
				>
					<PullRequestIcon />
				</span>

				<span truncate>{pr.title}</span>

			</a>

			<a
				flex
				gap-1
				href={prURL}
				target='_blank'
			>
				<span op75>{prUserName}</span>
				<span op50>/</span>
				<span truncate>{prRepoName}</span>
			</a>
		</div>

		<div
			fcol
			justify-between
			shrink-0
			text-right
		>
			<a
				href={pr.url}
				target='_blank'
			>
				#{pr.number}
			</a>

			<time
				datatime={pr.created_at}
				text='sm gray-500 dark:gray-400'
			>
				{formatTimeAgo(new Date(pr.created_at))}
			</time>
		</div>
	</div>
</div>

<style>
	a {
		--at-apply: hover:underline;
	}
</style>
