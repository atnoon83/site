<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { buttonVariants } from '#lib/components/ui/button/index';
	import PostList from '#lib/components/PostList.svelte';
	import { cn } from '#lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto w-full max-w-3xl px-6 py-10">
	<a
		href="/tags"
		class={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-3 mb-8 gap-1.5')}
	>
		<ArrowLeftIcon class="size-4" />
		全部标签
	</a>

	<header class="mb-8">
		<p class="text-sm text-muted-foreground">标签</p>
		<h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{data.tag}</h1>
		<p class="mt-3 text-sm text-muted-foreground">共 {data.posts.length} 篇文章</p>
	</header>

	<PostList posts={data.posts} />
</div>
