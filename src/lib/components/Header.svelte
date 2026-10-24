<script lang="ts">
	import MenuIcon from '@lucide/svelte/icons/menu';
	import { page } from '$app/state';
	import { buttonVariants } from '#lib/components/ui/button/index';
	import * as Sheet from '#lib/components/ui/sheet/index';
	import { navigation, site } from '#lib/site';
	import { cn } from '#lib/utils';
	import ModeToggle from './ModeToggle.svelte';

	let open = $state(false);

	function isActive(href: string): boolean {
		const path = page.url.pathname;
		return href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
	}

	const linkClass = (href: string) =>
		cn(
			'rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
			isActive(href) ? 'font-medium text-foreground' : 'text-muted-foreground'
		);
</script>

<header
	class="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="mx-auto flex h-16 w-full max-w-5xl items-center gap-6 px-6">
		<a href="/" class="text-base font-semibold tracking-tight">{site.name}</a>

		<nav class="hidden items-center gap-1 md:flex" aria-label="主导航">
			{#each navigation as item (item.href)}
				<a
					href={item.href}
					class={linkClass(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a
				>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-1">
			<ModeToggle />

			<Sheet.Root bind:open>
				<Sheet.Trigger
					class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'md:hidden')}
					aria-label="打开菜单"
				>
					<MenuIcon class="size-5" />
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-72">
					<Sheet.Header>
						<Sheet.Title>{site.name}</Sheet.Title>
						<Sheet.Description>{site.role}</Sheet.Description>
					</Sheet.Header>
					<nav class="flex flex-col gap-1 px-4" aria-label="移动端导航">
						{#each navigation as item (item.href)}
							<a
								href={item.href}
								class={cn(
									'rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
									isActive(item.href) ? 'bg-accent/60 font-medium' : 'text-muted-foreground'
								)}
								onclick={() => (open = false)}
								aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a
							>
						{/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
