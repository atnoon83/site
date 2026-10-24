<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import TagLinks from '#lib/components/TagLinks.svelte';
	import { formatDate } from '#lib/format';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const post = $derived(data.post);
	const toc = $derived(post.headings);
</script>

<svelte:head>
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.date} />
	{#each post.tags as tag (tag)}
		<meta property="article:tag" content={tag} />
	{/each}
</svelte:head>

<div class="container article">
	<nav class="back" aria-label="返回">
		<a class="muted" href="/blog">← 返回博客</a>
	</nav>

	<header class="post-head">
		<h1>{post.title}</h1>
		<p class="meta muted">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			{#if post.updated}
				<span class="sep">·</span>更新于 {formatDate(post.updated)}
			{/if}
			<span class="sep">·</span>约 {post.readingMinutes} 分钟读完
		</p>
		<TagLinks tags={post.tags} />
	</header>

	{#if post.description}
		<p class="summary">{post.description}</p>
	{/if}

	{#if toc.length >= 2}
		<nav class="toc" aria-labelledby="toc-title">
			<p class="toc-title" id="toc-title">目录</p>
			<ol>
				{#each toc as heading (heading.id)}
					<li class:sub={heading.depth === 3}>
						<a href={`#${heading.id}`}>{heading.text}</a>
					</li>
				{/each}
			</ol>
		</nav>
	{/if}

	<article class="prose">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html post.html}
	</article>

	<nav class="adjacent" aria-label="相邻文章">
		{#if data.adjacent.newer}
			<a class="adjacent-link" href={`/blog/${data.adjacent.newer.slug}`}>
				<span class="label muted">← 上一篇</span>
				<span class="title">{data.adjacent.newer.title}</span>
			</a>
		{:else}
			<span></span>
		{/if}
		{#if data.adjacent.older}
			<a class="adjacent-link next" href={`/blog/${data.adjacent.older.slug}`}>
				<span class="label muted">下一篇 →</span>
				<span class="title">{data.adjacent.older.title}</span>
			</a>
		{/if}
	</nav>

	{#if data.related.length > 0}
		<section class="related">
			<h2>相关文章</h2>
			<PostList posts={data.related} />
		</section>
	{/if}
</div>

<style>
	.article {
		width: min(100% - 2.5rem, 46rem);
		padding-block: 2rem 4rem;
	}

	.back {
		margin-bottom: 1.75rem;
		font-size: 0.9375rem;
	}

	.back a:hover {
		color: var(--text);
	}

	.post-head h1 {
		margin: 0 0 0.9rem;
		font-size: clamp(1.9rem, 4.5vw, 2.5rem);
		line-height: 1.25;
		letter-spacing: -0.03em;
		font-weight: 650;
	}

	.meta {
		margin: 0 0 0.9rem;
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
	}

	.sep {
		margin-inline: 0.4rem;
	}

	.summary {
		margin: 1.5rem 0 0;
		padding: 0.9rem 1.1rem;
		background: var(--bg-soft);
		border-left: 3px solid var(--accent);
		border-radius: 0 0.4rem 0.4rem 0;
		font-size: 0.9375rem;
		line-height: 1.75;
		color: var(--text-muted);
	}

	.toc {
		margin-top: 2rem;
		padding: 1rem 1.25rem;
		border: 1px solid var(--border);
		border-radius: 0.6rem;
		background: var(--bg-soft);
		font-size: 0.9375rem;
	}

	.toc-title {
		margin: 0 0 0.5rem;
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.toc ol {
		margin: 0;
		padding-left: 1.1rem;
		list-style: disc;
	}

	.toc li.sub {
		margin-left: 0.9rem;
		list-style: circle;
		font-size: 0.875rem;
	}

	.toc a {
		color: var(--text-muted);
	}

	.toc a:hover {
		color: var(--accent);
	}

	.prose {
		margin-top: 2.25rem;
	}

	.adjacent {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 3.5rem;
		padding-top: 1.75rem;
		border-top: 1px solid var(--border);
	}

	.adjacent-link {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0.9rem 1rem;
		border: 1px solid var(--border);
		border-radius: 0.6rem;
		transition: border-color 0.15s ease, background-color 0.15s ease;
	}

	.adjacent-link:hover {
		border-color: var(--accent);
		background: var(--bg-soft);
	}

	.adjacent-link.next {
		text-align: right;
	}

	.label {
		font-size: 0.8125rem;
	}

	.title {
		font-size: 0.9375rem;
		font-weight: 500;
		line-height: 1.5;
	}

	.related {
		margin-top: 3rem;
	}

	.related h2 {
		margin: 0 0 0.5rem;
		font-size: 1.0625rem;
		font-weight: 600;
	}

	@media (max-width: 40rem) {
		.adjacent {
			grid-template-columns: 1fr;
		}

		.adjacent-link.next {
			text-align: left;
		}
	}
</style>
