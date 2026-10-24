<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import { site } from '#lib/site';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="hero">
	<div class="container">
		<p class="eyebrow muted">你好，我是</p>
		<h1>{site.name}</h1>
		<p class="role">{site.role}</p>
		<p class="lead">{site.tagline}</p>
		<ul class="socials">
			{#each site.socials as social (social.href)}
				<li>
					<a class="chip" href={social.href}>{social.label}</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="container recent">
	<div class="section-head">
		<h2>最新文章</h2>
		<a class="more muted" href="/blog">全部文章 →</a>
	</div>
	<PostList posts={data.posts} empty="还没有发布文章，去 src/posts 里写第一篇吧。" />
</section>

<style>
	.hero {
		padding-block: clamp(3.5rem, 9vw, 6.5rem) clamp(2.5rem, 6vw, 4rem);
	}

	.eyebrow {
		margin: 0 0 0.6rem;
		font-size: 0.9375rem;
		letter-spacing: 0.02em;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.4rem, 6vw, 3.6rem);
		line-height: 1.1;
		letter-spacing: -0.035em;
		font-weight: 650;
	}

	.role {
		margin: 0.9rem 0 0;
		font-size: 1.0625rem;
		color: var(--accent);
		font-weight: 500;
	}

	.lead {
		max-width: 34rem;
		margin: 1.1rem 0 0;
		font-size: 1.1875rem;
		line-height: 1.7;
		color: var(--text-muted);
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin: 1.75rem 0 0;
		padding: 0;
		list-style: none;
	}

	.recent {
		padding-bottom: 1rem;
	}

	.section-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border);
	}

	.section-head h2 {
		margin: 0;
		font-size: 1.0625rem;
		font-weight: 600;
		letter-spacing: 0.01em;
	}

	.more {
		font-size: 0.9375rem;
		transition: color 0.15s ease;
	}

	.more:hover {
		color: var(--text);
	}
</style>
