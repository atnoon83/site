<script lang="ts">
	let { tags, size = 'normal' }: { tags: string[]; size?: 'normal' | 'small' } = $props();
</script>

{#if tags.length > 0}
	<ul class="tags" class:small={size === 'small'}>
		{#each tags as tag (tag)}
			<li>
				<a class="chip" href={`/tags/${encodeURIComponent(tag)}`}>{tag}</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.small :global(.chip) {
		font-size: 0.75rem;
		padding: 0.05rem 0.5rem;
	}
</style>
