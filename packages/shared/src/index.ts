export type RestaurantRole = 'owner' | 'admin' | 'host' | 'platform_operator';

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type PublicRestaurant = {
	id: string;
	slug: string;
	name: string;
	timezone: string;
	publicSiteUrl: string;
};
