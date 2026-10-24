<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto w-full max-w-3xl px-6 py-14">
	<header class="mb-8">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">标签</h1>
		<p class="mt-3 text-sm text-muted-foreground">共 {data.tags.length} 个标签。</p>
	</header>

	{#if data.tags.length === 0}
		<p class="text-sm text-muted-foreground">还没有标签，在文章 frontmatter 里加上 tags 就会出现。</p>
	{:else}
		<ul class="flex flex-wrap gap-2">
			{#each data.tags as { tag, posts } (tag)}
				<li>
					<Badge href={`/tags/${encodeURIComponent(tag)}`} variant="secondary" class="h-7 gap-1.5 px-3">
						{tag}
						<span class="text-[11px] text-muted-foreground tabular-nums">{posts.length}</span>
					</Badge>
				</li>
			{/each}
		</ul>
	{/if}
</div>
