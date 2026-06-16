# Innflow Architecture

Innflow is planned as a multi-tenant restaurant operations platform: reservations, availability, waitlist, hours, menus, guest notes, SMS, and dashboard workflows.

## Shape

```txt
apps/platform      SaaS dashboard, public API, webhooks, cron jobs
packages/db        Drizzle schema and database client
packages/shared    API contract types, validation schemas, time utilities
packages/ui        Custom UI primitives, no DaisyUI
```

Future packages/apps:

```txt
apps/gasthaus-site      Custom public site consuming /api/v1
packages/booking-kit    Reusable booking flow and typed API client
```

## Design principles

- Multi-tenant from day one: every domain row belongs to a restaurant.
- Public API is stable and versioned.
- Dashboard auth is session/org based.
- Guest flows use opaque expiring tokens, never raw reservation UUIDs.
- SMS provider is abstracted so Twilio/Telnyx/SignalWire can be swapped.
- UI is custom, warm, refined, and tablet-first; headless primitives only where behavior requires them.
