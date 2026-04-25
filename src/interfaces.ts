export interface IRestaurantsResponse {
  deliveryFees: unknown;
  enrichedLists: unknown;
  filters: unknown;
  layout: unknown;
  metaData: unknown;
  promotedPlacement: unknown;
  restaurants: IRestaurantDetails[];
}

export interface IRestaurantDetails {
  id: string;
  name: string;
  cuisines: {
    name: string;
    uniqueName: string;
  }[];
  rating: {
    count: number;
    starRating: number;
    userRating: number | null;
  };
  address: {
    city: string;
    firstLine: string;
    location: {
      coordinates: number[];
      type: string;
    };
    postalCode: string;
  };
}
