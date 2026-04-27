import type { RestaurantDetails } from "../../types";

export const mockRestaurant: RestaurantDetails = {
  id: "195350",
  name: "Munchies",
  address: {
    firstLine: "15 Saint Peter's Street",
    city: "Canterbury",
    postalCode: "CT1 2EH",
  },
  rating: { count: 157, starRating: 3.25, userRating: null },
  logoUrl:
    "https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/195350.gif",
  cuisines: [
    { name: "Kebab", uniqueName: "kebabs" },
    { name: "Pizza", uniqueName: "pizza" },
  ],
};
