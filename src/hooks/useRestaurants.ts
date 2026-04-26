import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../api/restaurants";

export const RESTAURANTS_PER_PAGE = 10;

export function useRestaurants(postcode: string) {
  return useQuery({
    queryKey: ["GET/restaurants", postcode],
    queryFn: () => getRestaurants(postcode),
    select: (data) => data.restaurants.slice(0, RESTAURANTS_PER_PAGE),
  });
}
