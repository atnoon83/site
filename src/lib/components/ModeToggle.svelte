<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';
	import { resetMode, setMode, userPrefersMode } from 'mode-watcher';
	import { buttonVariants } from '#lib/components/ui/button/index';
	import * as DropdownMenu from '#lib/components/ui/dropdown-menu/index';
	import { cn } from '#lib/utils';

	const options = [
		{ value: 'light', label: '浅色', icon: SunIcon },
		{ value: 'dark', label: '深色', icon: MoonIcon },
		{ value: 'system', label: '跟随系统', icon: MonitorIcon }
	] as const;

	function apply(value: (typeof options)[number]['value']) {
		if (value === 'system') {
			resetMode();
			return;
		}
		setMode(value);
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'relative')}
		aria-label="切换主题"
	>
		<SunIcon
			class="size-[1.15rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
		/>
		<MoonIcon
			class="absolute size-[1.15rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">切换主题</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="min-w-36">
		{#each options as option (option.value)}
			{@const Icon = option.icon}
			{@const active = userPrefersMode.current === option.value}
			<DropdownMenu.Item onSelect={() => apply(option.value)} class="gap-2">
				<Icon class="size-4 text-muted-foreground" />
				<span>{option.label}</span>
				{#if active}
					<CheckIcon class="ml-auto size-4" />
				{/if}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
