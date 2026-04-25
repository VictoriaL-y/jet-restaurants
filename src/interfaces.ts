export interface IRestaurantsResponse {
  deliveryFees: unknown;
  enrichedLists: unknown;
  filters: unknown;
  layout: unknown;
  metaData: unknown;
  promotedPlacement: unknown;
  restaurants: IRestaurantDetails[];
}

interface IRestaurantDetails {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  location: {
    type: string;
    coordinates: number[];
  };
}
