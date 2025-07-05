<script lang='ts'>
	import { formatTimeAgo } from '@vueuse/core';
	import Divider from './Divider.svelte';

	const { fetchedAt }: { fetchedAt: string } = $props();

</script>

<div op50 text-center>
	<Divider />
	<div flex='~ gap-1 wrap justify-center'>
		<span op75>Last Updated:</span>
		<time datetime={fetchedAt.toString()}>
			{formatTimeAgo(new Date(fetchedAt))}
		</time>
	</div>
	<span op75>
		GitHub API is not always realtime, it might take a couple hours to update.
	</span>
</div>
