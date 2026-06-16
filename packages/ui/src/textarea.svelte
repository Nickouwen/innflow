<script lang="ts">
	type Props = {
		id?: string;
		name?: string;
		value?: string;
		placeholder?: string;
		rows?: number;
		required?: boolean;
		disabled?: boolean;
		class?: string;
	};

	let {
		id,
		name,
		value = $bindable(''),
		placeholder,
		rows = 4,
		required = false,
		disabled = false,
		class: className = ''
	}: Props = $props();
</script>

<textarea
	{id}
	{name}
	bind:value
	{placeholder}
	{rows}
	{required}
	{disabled}
	class={[
		'w-full resize-y rounded-[var(--radius-sm)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2 text-sm text-[hsl(var(--foreground))] outline-none transition duration-200 placeholder:text-[hsl(var(--muted))] focus:border-[hsl(var(--accent))] focus:ring-4 focus:ring-[hsl(var(--accent)/0.12)] disabled:cursor-not-allowed disabled:opacity-50',
		className
	]}
/>
