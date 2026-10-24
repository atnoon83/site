<script lang="ts">
	import { formatDate } from '#lib/format';
	import type { PostMeta } from '#lib/posts';

	let { posts, empty = '还没有文章。' }: { posts: PostMeta[]; empty?: string } = $props();
</script>

{#if posts.length === 0}
	<p class="muted">{empty}</p>
{:else}
	<ul class="post-list">
		{#each posts as post (post.slug)}
			<li>
				<a class="post-link" href={`/blog/${post.slug}`}>
					<time class="date muted" datetime={post.date}>{formatDate(post.date)}</time>
					<span class="body">
						<span class="title">{post.title}</span>
						{#if post.description}
							<span class="desc muted">{post.description}</span>
						{/if}
					</span>
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.post-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.post-list li + li {
		border-top: 1px solid var(--border);
	}

	.post-link {
		display: grid;
		grid-template-columns: 7.5rem 1fr;
		gap: 1.25rem;
		padding-block: 1.25rem;
		align-items: baseline;
	}

	.date {
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.title {
		font-size: 1.0625rem;
		font-weight: 550;
		letter-spacing: -0.01em;
		transition: color 0.15s ease;
	}

	.post-link:hover .title {
		color: var(--accent);
	}

	.desc {
		font-size: 0.9375rem;
		line-height: 1.65;
	}

	@media (max-width: 40rem) {
		.post-link {
			grid-template-columns: 1fr;
			gap: 0.35rem;
			padding-block: 1.1rem;
		}

		.date {
			order: -1;
			font-size: 0.8125rem;
		}
	}
</style>
