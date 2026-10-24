<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/state';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import { site } from '#lib/site';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const title = $derived(page.data.title ?? `${site.name} · ${site.role}`);
	const description = $derived(page.data.description ?? site.description);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.name} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content="zh_CN" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<ModeWatcher />

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
>
	跳到正文
</a>

<div class="flex min-h-svh flex-col">
	<Header />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
