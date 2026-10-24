<script lang="ts">
	import { site } from '#lib/site';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const stack = ['SvelteKit', 'TypeScript', 'Markdown', 'Docker'];
</script>

<div class="container page">
	<header class="page-head">
		<h1>关于</h1>
		<p class="muted">更新于 2026 年</p>
	</header>

	<div class="prose about">
		<p>
			你好，我是 <strong>{site.name}</strong>，{site.role}。这里是我的个人主页，也是我的笔记本。
		</p>

		<h2>我在做什么</h2>
		<p>
			大部分时间在写 Web 应用，前端偏多，后端够用就好。喜欢把复杂的东西拆成简单的部分，
			也喜欢把用过的东西写下来——写清楚的过程，往往能发现自己其实没完全想明白。
		</p>

		<h2>这个站点</h2>
		<p>
			站点用 SvelteKit 和 TypeScript 写成，构建时静态预渲染，所以访问很快、也不需要数据库。
			文章是 <code>src/posts</code> 下的 Markdown 文件，带 frontmatter 元信息，
			构建时会自动生成列表、标签和 RSS。
		</p>

		<h2>技术栈</h2>
		<ul class="stack">
			{#each stack as item (item)}
				<li class="chip">{item}</li>
			{/each}
		</ul>

		<h2>联系我</h2>
		<p>
			可以通过
			{#each site.socials as social, i (social.href)}{i > 0 ? '、' : ''}<a href={social.href}
					>{social.label}</a
				>{/each}
			找到我。欢迎交流，但请尽量把问题描述清楚。
		</p>
	</div>
</div>

<style>
	.page {
		width: min(100% - 2.5rem, 46rem);
		padding-block: clamp(2.5rem, 6vw, 4rem);
	}

	.page-head {
		margin-bottom: 2rem;
	}

	h1 {
		margin: 0 0 0.4rem;
		font-size: clamp(1.9rem, 4vw, 2.4rem);
		letter-spacing: -0.03em;
		font-weight: 650;
	}

	.page-head p {
		margin: 0;
		font-size: 0.9375rem;
	}

	.about > :first-child {
		margin-top: 0;
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
