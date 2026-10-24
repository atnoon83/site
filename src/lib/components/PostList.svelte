<script lang="ts">
	import * as Card from '#lib/components/ui/card/index';
	import { formatDate } from '#lib/format';
	import type { PostMeta } from '#lib/posts';

	let { posts, empty = '还没有文章。' }: { posts: PostMeta[]; empty?: string } = $props();
</script>

{#if posts.length === 0}
	<p class="rounded-xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
		{empty}
	</p>
{:else}
	<div class="flex flex-col gap-3">
		{#each posts as post (post.slug)}
			<a href={`/blog/${post.slug}`} class="group block rounded-xl focus-visible:outline-none">
				<Card.Root
					class="gap-2 border-border/70 bg-card/60 px-5 py-4 transition-colors group-hover:bg-accent/40 group-focus-visible:ring-2 group-focus-visible:ring-ring/50"
				>
					<Card.Header class="gap-1.5 px-0">
						<div class="flex items-center gap-2 text-xs text-muted-foreground">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							<span aria-hidden="true">·</span>
							<span>{post.readingMinutes} 分钟</span>
						</div>
						<Card.Title
							class="text-base font-medium tracking-tight group-hover:underline group-hover:underline-offset-4"
						>
							{post.title}
						</Card.Title>
						{#if post.description}
							<Card.Description class="text-sm leading-relaxed text-muted-foreground">
								{post.description}
							</Card.Description>
						{/if}
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
	</div>
{/if}
