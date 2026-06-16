<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		label: string;
		for?: string;
		help?: string;
		error?: string;
		class?: string;
	};

	let { children, label, for: htmlFor, help, error, class: className = '' }: Props = $props();
</script>

<div class={['grid gap-2', className]}>
	<label for={htmlFor} class="text-sm font-medium text-[hsl(var(--foreground))]">{label}</label>
	{@render children()}
	{#if error}
		<p class="text-sm text-[hsl(var(--danger))]">{error}</p>
	{:else if help}
		<p class="text-sm text-[hsl(var(--muted))]">{help}</p>
	{/if}
</div>
