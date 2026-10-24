<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { buttonVariants } from '#lib/components/ui/button/index';
	import * as Card from '#lib/components/ui/card/index';
	import { Separator } from '#lib/components/ui/separator/index';
	import PostList from '#lib/components/PostList.svelte';
	import TagLinks from '#lib/components/TagLinks.svelte';
	import { formatDate } from '#lib/format';
	import { cn } from '#lib/utils';
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

<div class="mx-auto w-full max-w-3xl px-6 py-10">
	<a
		href="/blog"
		class={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-3 mb-8 gap-1.5')}
	>
		<ArrowLeftIcon class="size-4" />
		返回博客
	</a>

	<header>
		<h1 class="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
			{post.title}
		</h1>
		<p class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			{#if post.updated}
				<span aria-hidden="true">·</span>
				<span>更新于 {formatDate(post.updated)}</span>
			{/if}
			<span aria-hidden="true">·</span>
			<span>约 {post.readingMinutes} 分钟读完</span>
		</p>
		<div class="mt-4">
			<TagLinks tags={post.tags} />
		</div>
	</header>

	{#if post.description}
		<p
			class="mt-8 border-l-2 border-primary/40 bg-muted/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
		>
			{post.description}
		</p>
	{/if}

	{#if toc.length >= 2}
		<Card.Root class="mt-8 gap-3 border-border/70 bg-muted/30 px-5 py-4">
			<Card.Header class="gap-2 px-0">
				<Card.Title class="text-sm font-medium text-muted-foreground">目录</Card.Title>
			</Card.Header>
			<Card.Content class="px-0">
				<ol class="flex list-decimal flex-col gap-1.5 pl-4 text-sm marker:text-muted-foreground">
					{#each toc as heading (heading.id)}
						<li class:pl-4={heading.depth === 3} class="leading-relaxed">
							<a
								class="text-muted-foreground transition-colors hover:text-foreground"
								href={`#${heading.id}`}>{heading.text}</a
							>
						</li>
					{/each}
				</ol>
			</Card.Content>
		</Card.Root>
	{/if}

	<article class="prose prose-article mt-10 max-w-none">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html post.html}
	</article>

	{#if data.adjacent.newer || data.adjacent.older}
		<Separator class="mt-14" />
		<nav class="mt-6 grid gap-3 sm:grid-cols-2" aria-label="相邻文章">
			{#if data.adjacent.newer}
				<a href={`/blog/${data.adjacent.newer.slug}`} class="group rounded-xl focus-visible:outline-none">
					<Card.Root
						class="h-full gap-1.5 border-border/70 px-5 py-4 transition-colors group-hover:bg-accent/40"
					>
						<Card.Header class="gap-1.5 px-0">
							<Card.Description class="text-xs">← 上一篇</Card.Description>
							<Card.Title class="text-sm leading-relaxed font-medium">{data.adjacent.newer.title}</Card.Title>
						</Card.Header>
					</Card.Root>
				</a>
			{:else}
				<span class="hidden sm:block"></span>
			{/if}

			{#if data.adjacent.older}
				<a href={`/blog/${data.adjacent.older.slug}`} class="group rounded-xl focus-visible:outline-none sm:text-right">
					<Card.Root
						class="h-full gap-1.5 border-border/70 px-5 py-4 transition-colors group-hover:bg-accent/40"
					>
						<Card.Header class="gap-1.5 px-0">
							<Card.Description class="text-xs">下一篇 →</Card.Description>
							<Card.Title class="text-sm leading-relaxed font-medium">{data.adjacent.older.title}</Card.Title>
						</Card.Header>
					</Card.Root>
				</a>
			{/if}
		</nav>
	{/if}

	{#if data.related.length > 0}
		<section class="mt-14">
			<h2 class="mb-4 text-lg font-semibold tracking-tight">相关文章</h2>
			<PostList posts={data.related} />
		</section>
	{/if}
</div>
