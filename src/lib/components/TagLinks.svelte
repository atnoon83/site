<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index';
	import { cn } from '#lib/utils';

	let {
		tags,
		size = 'normal'
	}: {
		tags: string[];
		size?: 'normal' | 'small';
	} = $props();
</script>

{#if tags.length > 0}
	<ul class="flex flex-wrap gap-2">
		{#each tags as tag (tag)}
			<li>
				<Badge
					href={`/tags/${encodeURIComponent(tag)}`}
					variant="secondary"
					class={cn(size === 'small' && 'text-[11px]')}>{tag}</Badge
				>
			</li>
		{/each}
	</ul>
{/if}
