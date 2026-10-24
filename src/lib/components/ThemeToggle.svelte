<script lang="ts">
	let theme = $state<'light' | 'dark'>('light');

	$effect(() => {
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	function toggle() {
		const next = theme === 'dark' ? 'light' : 'dark';
		theme = next;
		document.documentElement.dataset.theme = next;
		const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
		if (meta) meta.content = next === 'dark' ? '#0b0b0f' : '#ffffff';
		try {
			localStorage.setItem('theme', next);
		} catch {
			// 隐私模式下 localStorage 不可用，忽略即可
		}
	}
</script>

<button
	class="icon-button"
	type="button"
	onclick={toggle}
	aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
	title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
>
	{#if theme === 'dark'}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="4.2" />
			<path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
		</svg>
	{:else}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M20.5 14.3A8.6 8.6 0 1 1 9.7 3.5a7 7 0 0 0 10.8 10.8Z" />
		</svg>
	{/if}
</button>
