<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto w-full max-w-3xl px-6 py-14">
	<header class="mb-8">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">博客</h1>
		<p class="mt-3 text-sm text-muted-foreground">
			共 {data.posts.length} 篇，按时间倒序排列。也可以订阅
			<a class="underline underline-offset-4 transition-colors hover:text-foreground" href="/rss.xml"
				>RSS</a
			>。
		</p>
	</header>

	<PostList posts={data.posts} empty="还没有发布文章。" />
</div>
