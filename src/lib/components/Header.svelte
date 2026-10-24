<script lang="ts">
	import { page } from '$app/state';
	import { navigation, site } from '#lib/site';
	import ThemeToggle from './ThemeToggle.svelte';

	function isActive(href: string): boolean {
		const path = page.url.pathname;
		return href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
	}
</script>

<header class="site-header">
	<div class="container header-inner">
		<a class="brand" href="/">{site.name}</a>
		<nav class="nav" aria-label="主导航">
			{#each navigation as item (item.href)}
				<a
					href={item.href}
					class:active={isActive(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a
				>
			{/each}
		</nav>
		<ThemeToggle />
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		border-bottom: 1px solid var(--border);
		backdrop-filter: saturate(180%) blur(12px);
	}

	.header-inner {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		height: 4rem;
	}

	.brand {
		font-weight: 650;
		letter-spacing: -0.02em;
		font-size: 1.0625rem;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-left: auto;
		font-size: 0.9375rem;
	}

	.nav a {
		color: var(--text-muted);
		transition: color 0.15s ease;
	}

	.nav a:hover,
	.nav a.active {
		color: var(--text);
	}

	.nav a.active {
		font-weight: 550;
	}

	@media (max-width: 30rem) {
		.header-inner {
			gap: 0.75rem;
		}

		.nav {
			gap: 0.9rem;
			font-size: 0.875rem;
		}
	}
</style>
