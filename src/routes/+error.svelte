<script lang="ts">
	import { page } from '$app/state';

	const isNotFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? '页面不存在' : '出错了'}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container error-page">
	<p class="status muted">{page.status}</p>
	<h1>{isNotFound ? '页面不存在' : '出了点问题'}</h1>
	<p class="muted">
		{isNotFound
			? '这个地址下没有内容，可能是链接过期了，也可能是文章被移动过。'
			: page.error?.message || '服务器遇到未知错误，请稍后再试。'}
	</p>
	<div class="actions">
		<a class="chip" href="/">回到首页</a>
		<a class="chip" href="/blog">看看博客</a>
	</div>
</div>

<style>
	.error-page {
		padding-block: clamp(4rem, 12vw, 8rem);
		max-width: 40rem;
	}

	.status {
		margin: 0 0 0.5rem;
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.08em;
	}

	h1 {
		margin: 0 0 0.75rem;
		font-size: clamp(1.8rem, 4vw, 2.3rem);
		letter-spacing: -0.03em;
		font-weight: 650;
	}

	p {
		margin: 0 0 1.75rem;
	}

	.actions {
		display: flex;
		gap: 0.6rem;
	}
</style>
