# Innflow

Innflow is a new multi-tenant restaurant operations platform scaffold.

It is intended to become the clean SaaS foundation for:

- reservations and availability
- waitlists and table status
- operating hours and blocked hours
- guest notes and service context
- SMS confirmations/reminders
- versioned public APIs for custom restaurant sites

## Workspace layout

```txt
apps/platform      SvelteKit SaaS dashboard, API, webhooks, cron jobs
packages/db        Drizzle schema and database package
packages/shared    Shared types and API contract utilities
packages/ui        Custom UI primitives, no DaisyUI
```

Future additions:

```txt
apps/gasthaus-site      Custom public site consuming the platform API
packages/booking-kit    Reusable booking components and typed API client
```

## Development

```sh
npm install
npm run dev
npm run check
npm run build
```

## Principles

- SvelteKit + Svelte 5 runes.
- Tailwind v4 without DaisyUI.
- Custom, refined hospitality UI.
- Multi-tenant schema from day one.
- Public API is versioned and stable.
- Guest reservation flows use opaque tokens, not raw UUID links.
- SMS provider is abstracted so Twilio/Telnyx/SignalWire can be swapped later.
