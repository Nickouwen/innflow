import {
	boolean,
	date,
	index,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	time,
	timestamp,
	uniqueIndex,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const restaurantRoleEnum = pgEnum('restaurant_role', [
	'owner',
	'admin',
	'host',
	'platform_operator'
]);

export const reservationStatusEnum = pgEnum('reservation_status', [
	'pending',
	'confirmed',
	'cancelled',
	'completed'
]);

export const waitlistStatusEnum = pgEnum('waitlist_status', [
	'waiting',
	'notified',
	'seated',
	'left'
]);

export const dayOfWeekEnum = pgEnum('day_of_week', [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday'
]);

export const smsProviderEnum = pgEnum('sms_provider', ['twilio', 'telnyx', 'signalwire']);

export const restaurants = pgTable(
	'restaurants',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		slug: varchar('slug', { length: 80 }).notNull(),
		name: varchar('name', { length: 160 }).notNull(),
		timezone: varchar('timezone', { length: 80 }).notNull().default('America/Vancouver'),
		publicSiteUrl: varchar('public_site_url', { length: 500 }).notNull(),
		isActive: boolean('is_active').notNull().default(true),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [uniqueIndex('restaurants_slug_idx').on(table.slug)]
);

export const restaurantSettings = pgTable('restaurant_settings', {
	id: uuid('id').defaultRandom().primaryKey(),
	restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
	maxPartySize: integer('max_party_size').notNull().default(8),
	maxPeoplePerInterval: integer('max_people_per_interval').notNull().default(15),
	timeIntervalMinutes: integer('time_interval_minutes').notNull().default(30),
	maxAdvanceBookingDays: integer('max_advance_booking_days').notNull().default(30),
	minHoursNotice: integer('min_hours_notice').notNull().default(2),
	cutoffBeforeClose: integer('cutoff_before_close').notNull().default(0),
	defaultReservationLengthMinutes: integer('default_reservation_length_minutes').notNull().default(90),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const memberships = pgTable(
	'memberships',
	{
		userId: varchar('user_id', { length: 191 }).notNull(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		role: restaurantRoleEnum('role').notNull().default('host'),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [primaryKey({ columns: [table.userId, table.restaurantId] })]
);

export const operatingHours = pgTable(
	'operating_hours',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		dayOfWeek: dayOfWeekEnum('day_of_week').notNull(),
		openTime: time('open_time').notNull(),
		closeTime: time('close_time').notNull(),
		label: varchar('label', { length: 100 }),
		isClosed: boolean('is_closed').notNull().default(false),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [uniqueIndex('operating_hours_restaurant_day_idx').on(table.restaurantId, table.dayOfWeek)]
);

export const blockedHours = pgTable(
	'blocked_hours',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		reason: varchar('reason', { length: 255 }).notNull(),
		startTime: timestamp('start_time', { withTimezone: true }).notNull(),
		endTime: timestamp('end_time', { withTimezone: true }).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [index('blocked_hours_restaurant_range_idx').on(table.restaurantId, table.startTime, table.endTime)]
);

export const reservations = pgTable(
	'reservations',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		name: varchar('name', { length: 100 }).notNull(),
		email: varchar('email', { length: 255 }),
		phone: varchar('phone', { length: 32 }).notNull(),
		partySize: integer('party_size').notNull(),
		date: date('date', { mode: 'string' }).notNull(),
		time: time('time').notNull(),
		notes: text('notes'),
		status: reservationStatusEnum('status').notNull().default('pending'),
		smsOptOut: boolean('sms_opt_out').notNull().default(false),
		createdBy: varchar('created_by', { length: 120 }).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [
		index('reservations_restaurant_date_time_status_idx').on(
			table.restaurantId,
			table.date,
			table.time,
			table.status
		),
		index('reservations_restaurant_phone_idx').on(table.restaurantId, table.phone)
	]
);

export const reservationTokens = pgTable(
	'reservation_tokens',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		reservationId: uuid('reservation_id').notNull().references(() => reservations.id, { onDelete: 'cascade' }),
		tokenHash: varchar('token_hash', { length: 128 }).notNull(),
		purpose: varchar('purpose', { length: 40 }).notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		usedAt: timestamp('used_at', { withTimezone: true }),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [uniqueIndex('reservation_tokens_hash_idx').on(table.tokenHash)]
);

export const waitlist = pgTable(
	'waitlist',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		name: varchar('name', { length: 100 }).notNull(),
		phone: varchar('phone', { length: 32 }).notNull(),
		partySize: integer('party_size').notNull(),
		notes: text('notes'),
		status: waitlistStatusEnum('status').notNull().default('waiting'),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [index('waitlist_restaurant_status_idx').on(table.restaurantId, table.status)]
);

export const tables = pgTable('tables', {
	id: uuid('id').defaultRandom().primaryKey(),
	restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 50 }).notNull(),
	capacity: integer('capacity').notNull(),
	section: varchar('section', { length: 50 }),
	notes: text('notes'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const reservationTables = pgTable(
	'reservation_tables',
	{
		reservationId: uuid('reservation_id').notNull().references(() => reservations.id, { onDelete: 'cascade' }),
		tableId: uuid('table_id').notNull().references(() => tables.id, { onDelete: 'cascade' })
	},
	(table) => [primaryKey({ columns: [table.reservationId, table.tableId] })]
);

export const menus = pgTable(
	'menus',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		name: varchar('name', { length: 100 }).notNull(),
		slug: varchar('slug', { length: 255 }).notNull(),
		content: text('content').notNull(),
		isActive: boolean('is_active').notNull().default(true),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [uniqueIndex('menus_restaurant_slug_idx').on(table.restaurantId, table.slug)]
);

export const smsSettings = pgTable(
	'sms_settings',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		provider: smsProviderEnum('provider').notNull().default('twilio'),
		senderNumber: varchar('sender_number', { length: 32 }),
		messagingServiceSid: varchar('messaging_service_sid', { length: 80 }),
		isEnabled: boolean('is_enabled').notNull().default(false),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [uniqueIndex('sms_settings_restaurant_idx').on(table.restaurantId)]
);

export const smsMessages = pgTable(
	'sms_messages',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
		reservationId: uuid('reservation_id').references(() => reservations.id, { onDelete: 'set null' }),
		providerMessageId: varchar('provider_message_id', { length: 120 }),
		direction: varchar('direction', { length: 20 }).notNull(),
		fromNumber: varchar('from_number', { length: 32 }).notNull(),
		toNumber: varchar('to_number', { length: 32 }).notNull(),
		bodyRedacted: text('body_redacted'),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [index('sms_messages_restaurant_created_idx').on(table.restaurantId, table.createdAt)]
);
