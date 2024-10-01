<script lang='ts'>
	import { formatTimeAgo } from '@vueuse/core';
	import Divider from './Divider.svelte';

	const { now }: { now: string } = $props();

</script>

<div op50 text-center>
	<Divider />
	<div fw fxc gap-1>
		<span op75>Last Updated:</span>
		<time datetime={now.toString()}>
			{formatTimeAgo(new Date(now))}
		</time>
	</div>
	<span op75>
		GitHub API is not always realtime, it might take a couple hours to update.
	</span>
</div>
