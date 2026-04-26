export interface RestaurantsResponse {
  restaurants: RestaurantDetails[];
}

export interface RestaurantDetails {
  id: string;
  name: string;
  address: RestaurantAddress;
  rating: RestaurantRating;
  logoUrl: string;
  cuisines: RestaurantCuisine[];
}

export interface RestaurantAddress {
  city: string;
  firstLine: string;
  location: RestaurantLocation;
  postalCode: string;
}

export interface RestaurantLocation {
  coordinates: number[];
  type: string;
}

export interface RestaurantRating {
  count: number;
  starRating: number;
  userRating: number | null;
}

export interface RestaurantCuisine {
  name: string;
  uniqueName: string;
}
