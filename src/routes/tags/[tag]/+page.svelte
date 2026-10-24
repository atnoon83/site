<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container page">
	<nav class="back" aria-label="返回">
		<a class="muted" href="/tags">← 全部标签</a>
	</nav>

	<header class="page-head">
		<p class="eyebrow muted">标签</p>
		<h1>{data.tag}</h1>
		<p class="muted">共 {data.posts.length} 篇文章</p>
	</header>

	<PostList posts={data.posts} />
</div>

<style>
	.page {
		padding-block: 2rem 4rem;
	}

	.back {
		margin-bottom: 1.75rem;
		font-size: 0.9375rem;
	}

	.back a:hover {
		color: var(--text);
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.9375rem;
	}

	h1 {
		margin: 0 0 0.5rem;
		font-size: clamp(1.9rem, 4vw, 2.4rem);
		letter-spacing: -0.03em;
		font-weight: 650;
	}

	.page-head p:last-child {
		margin: 0;
		font-size: 0.9375rem;
	}
</style>
