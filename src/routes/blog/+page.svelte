<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container page">
	<header class="page-head">
		<h1>博客</h1>
		<p class="muted">
			共 {data.posts.length} 篇，按时间倒序排列。也可以订阅 <a href="/rss.xml">RSS</a>。
		</p>
	</header>

	<PostList posts={data.posts} empty="还没有发布文章。" />
</div>

<style>
	.page {
		padding-block: clamp(2.5rem, 6vw, 4rem);
	}

	.page-head {
		margin-bottom: 1.5rem;
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

	.page-head a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
