<script lang="ts">
	import { site } from '#lib/site';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border/70">
	<div
		class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground"
	>
		<p>© {year} {site.copyright || site.name}</p>
		<ul class="flex flex-wrap items-center gap-5">
			{#each site.socials as social (social.href)}
				<li>
					<a class="transition-colors hover:text-foreground" href={social.href} rel="me"
						>{social.label}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</footer>
