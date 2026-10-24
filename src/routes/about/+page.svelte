<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index';
	import { site } from '#lib/site';

	const stack = ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'shadcn-svelte', 'Markdown', 'Docker'];
</script>

<div class="mx-auto w-full max-w-3xl px-6 py-14">
	<header class="mb-10">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">关于</h1>
		<p class="mt-3 text-sm text-muted-foreground">更新于 2026 年</p>
	</header>

	<div class="prose prose-article max-w-none">
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
			站点用 SvelteKit 和 TypeScript 写成，界面选的是 shadcn-svelte 的默认风格，
			构建时静态预渲染，所以访问很快、也不需要数据库。文章是
			<code>src/posts</code> 下的 Markdown 文件，带 frontmatter 元信息，构建时会自动生成列表、标签和 RSS。
		</p>

		<h2>技术栈</h2>
		<ul class="not-prose mt-4 flex flex-wrap gap-2">
			{#each stack as item (item)}
				<li><Badge variant="secondary">{item}</Badge></li>
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
