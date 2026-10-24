<script lang="ts">
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import { buttonVariants } from '#lib/components/ui/button/index';
	import { Separator } from '#lib/components/ui/separator/index';
	import PostList from '#lib/components/PostList.svelte';
	import { site } from '#lib/site';
	import { cn } from '#lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto w-full max-w-5xl px-6">
	<section class="pt-20 pb-12 sm:pt-28">
		<p class="text-sm text-muted-foreground">你好，我是</p>
		<h1 class="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{site.name}</h1>
		<p class="mt-4 text-lg text-muted-foreground">{site.role}</p>
		<p class="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{site.tagline}</p>

		<ul class="mt-8 flex flex-wrap gap-2">
			{#each site.socials as social (social.href)}
				<li>
					<a href={social.href} class={buttonVariants({ variant: 'outline', size: 'sm' })}
						>{social.label}</a
					>
				</li>
			{/each}
		</ul>
	</section>

	<Separator />

	<section class="py-10">
		<div class="mb-6 flex items-baseline justify-between gap-4">
			<h2 class="text-lg font-semibold tracking-tight">最新文章</h2>
			<a
				href="/blog"
				class={cn(buttonVariants({ variant: 'link', size: 'sm' }), 'gap-1 text-muted-foreground')}
			>
				全部文章
				<ArrowRightIcon class="size-4" />
			</a>
		</div>
		<PostList posts={data.posts} empty="还没有发布文章，去 src/posts 里写第一篇吧。" />
	</section>
</div>
