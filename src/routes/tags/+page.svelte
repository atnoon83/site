<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container page">
	<header class="page-head">
		<h1>标签</h1>
		<p class="muted">共 {data.tags.length} 个标签。</p>
	</header>

	{#if data.tags.length === 0}
		<p class="muted">还没有标签，在文章 frontmatter 里加上 tags 就会出现。</p>
	{:else}
		<ul class="tags">
			{#each data.tags as { tag, posts } (tag)}
				<li>
					<a class="chip" href={`/tags/${encodeURIComponent(tag)}`}>
						<span>{tag}</span>
						<span class="count">{posts.length}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.page {
		padding-block: clamp(2.5rem, 6vw, 4rem);
	}

	.page-head {
		margin-bottom: 1.75rem;
	}

	h1 {
		margin: 0 0 0.5rem;
		font-size: clamp(1.9rem, 4vw, 2.4rem);
		letter-spacing: -0.03em;
		font-weight: 650;
	}

	.page-head p {
		margin: 0;
		font-size: 0.9375rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.count {
		color: var(--text-muted);
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
	}
</style>
