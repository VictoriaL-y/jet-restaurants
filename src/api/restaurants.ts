import axios from "axios";
import type { RestaurantsResponse } from "../types";

export const getRestaurants = async (
  postcode: string,
): Promise<RestaurantsResponse> => {
  const { data } = await axios.get<RestaurantsResponse>(
    `/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
  );
  return data;
};
