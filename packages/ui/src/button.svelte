<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Props = {
		children: Snippet;
		variant?: Variant;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
	};

	let {
		children,
		variant = 'primary',
		type = 'button',
		disabled = false,
		class: className = '',
		onclick
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	{onclick}
	class={[
		'inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium tracking-[-0.01em] transition duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-45',
		variant === 'primary' && 'bg-[hsl(var(--accent))] text-white shadow-[0_10px_22px_-14px_hsl(var(--accent))] hover:brightness-95',
		variant === 'secondary' && 'border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-surface))]',
		variant === 'ghost' && 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-surface))]',
		variant === 'danger' && 'bg-[hsl(var(--danger))] text-white hover:brightness-95',
		className
	]}
>
	{@render children()}
</button>
