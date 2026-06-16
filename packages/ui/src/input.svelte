<script lang="ts">
	type Props = {
		id?: string;
		name?: string;
		type?: string;
		value?: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		class?: string;
	};

	let {
		id,
		name,
		type = 'text',
		value = $bindable(''),
		placeholder,
		required = false,
		disabled = false,
		class: className = ''
	}: Props = $props();
</script>

<input
	{id}
	{name}
	{type}
	bind:value
	{placeholder}
	{required}
	{disabled}
	class={[
		'h-11 w-full rounded-[var(--radius-sm)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 text-sm text-[hsl(var(--foreground))] outline-none transition duration-200 placeholder:text-[hsl(var(--muted))] focus:border-[hsl(var(--accent))] focus:ring-4 focus:ring-[hsl(var(--accent)/0.12)] disabled:cursor-not-allowed disabled:opacity-50',
		className
	]}
/>
