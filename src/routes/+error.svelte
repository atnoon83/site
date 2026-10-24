<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariants } from '#lib/components/ui/button/index';
	import { Badge } from '#lib/components/ui/badge/index';

	const isNotFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? '页面不存在' : '出错了'}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto flex w-full max-w-2xl flex-col items-start px-6 py-24 sm:py-32">
	<Badge variant="outline" class="mb-6 tabular-nums">{page.status}</Badge>
	<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
		{isNotFound ? '页面不存在' : '出了点问题'}
	</h1>
	<p class="mt-4 text-sm leading-relaxed text-muted-foreground">
		{isNotFound
			? '这个地址下没有内容，可能是链接过期了，也可能是文章被移动过。'
			: page.error?.message || '服务器遇到未知错误，请稍后再试。'}
	</p>
	<div class="mt-8 flex flex-wrap gap-2">
		<a href="/" class={buttonVariants({ size: 'sm' })}>回到首页</a>
		<a href="/blog" class={buttonVariants({ variant: 'outline', size: 'sm' })}>看看博客</a>
	</div>
</div>
