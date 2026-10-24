<script lang="ts">
	import '../app.css';
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

<a class="skip-link" href="#main">跳到正文</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />
