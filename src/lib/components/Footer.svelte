<script lang="ts">
	import { site } from '#lib/site';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container footer-inner">
		<p class="muted">© {year} {site.copyright || site.name}</p>
		<ul class="socials">
			{#each site.socials as social (social.href)}
				<li><a href={social.href} rel="me">{social.label}</a></li>
			{/each}
		</ul>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: auto;
		padding-block: 2.5rem 3rem;
		border-top: 1px solid var(--border);
	}

	.footer-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.875rem;
	}

	p {
		margin: 0;
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 1.1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.socials a {
		color: var(--text-muted);
		transition: color 0.15s ease;
	}

	.socials a:hover {
		color: var(--text);
	}
</style>
