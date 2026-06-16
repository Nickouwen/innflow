<script lang="ts">
	import Button from '@innflow/ui/button';

	const serviceItems = [
		{ label: 'Reservations', value: '42', note: 'covers on the books' },
		{ label: 'Waitlist', value: '7', note: 'parties waiting' },
		{ label: 'Tables', value: '18', note: 'tracked by section' }
	];
</script>

<svelte:head>
	<title>Innflow</title>
	<meta
		name="description"
		content="Innflow is a multi-tenant restaurant operations platform for reservations, waitlists, tables, and service flow."
	/>
</svelte:head>

<main class="min-h-[100dvh] px-4 py-6 md:px-8 md:py-10">
	<section class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
		<div class="max-w-2xl pt-10 md:pt-20">
			<p class="mb-5 w-fit rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.72)] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
				Restaurant operations
			</p>
			<h1 class="text-5xl leading-[0.95] tracking-[-0.055em] text-[hsl(var(--foreground))] md:text-7xl">
				The flow of the house, kept in one place.
			</h1>
			<p class="mt-6 max-w-[62ch] text-base leading-7 text-[hsl(var(--muted))] md:text-lg">
				Innflow is the clean foundation for reservations, waitlists, guest notes, table status,
				menus, SMS reminders, and service rhythm across independent restaurants.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button>Start platform scaffold</Button>
				<Button variant="secondary">View architecture</Button>
			</div>
		</div>

		<div class="relative min-h-[32rem] rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.76)] p-4 shadow-[0_24px_70px_-45px_rgba(64,43,28,0.45)] backdrop-blur">
			<div class="absolute left-6 top-6 h-16 w-16 rounded-full border border-[hsl(var(--border))] opacity-70"></div>
			<div class="absolute bottom-8 right-8 h-24 w-24 rounded-[2rem] border border-dashed border-[hsl(var(--accent)/0.35)]"></div>
			<div class="relative grid gap-4">
				<div class="rounded-[1.35rem] border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-5">
					<div class="flex items-start justify-between gap-4">
						<div>
							<p class="text-sm text-[hsl(var(--muted))]">Tonight</p>
							<h2 class="mt-1 text-3xl tracking-[-0.04em]">Service board</h2>
						</div>
						<span class="rounded-full bg-[hsl(var(--success)/0.12)] px-3 py-1 text-sm font-medium text-[hsl(var(--success))]">Live</span>
					</div>
					<div class="mt-6 grid gap-3 sm:grid-cols-3">
						{#each serviceItems as item (item.label)}
							<div class="rounded-[1rem] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
								<p class="text-sm text-[hsl(var(--muted))]">{item.label}</p>
								<p class="mt-2 text-3xl tracking-[-0.05em]">{item.value}</p>
								<p class="mt-1 text-xs text-[hsl(var(--muted))]">{item.note}</p>
							</div>
						{/each}
					</div>
				</div>

				<div class="grid gap-3">
					{#each ['5:30 · Arlen Voss · 4 guests', '6:15 · Maribel Cato · 2 guests', '7:45 · Ren Ito · 6 guests'] as reservation, index (reservation)}
						<div class="flex items-center justify-between rounded-[1rem] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3" style:--index={index}>
							<span class="text-sm font-medium">{reservation}</span>
							<span class="text-xs text-[hsl(var(--muted))]">Table {index + 4}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>
