import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { RestaurantsResponse } from "../types";
import { SimpleGrid, Text } from "@mantine/core";
import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export interface RestaurantsListProps {
  postcode: string;
}

const RestaurantsList = ({ postcode }: RestaurantsListProps) => {
  const { data, isSuccess, isLoading, isError, error } =
    useQuery<RestaurantsResponse>({
      queryKey: ["GET/restaurants", postcode],
      queryFn: async () => {
        const { data } = await axios.get<RestaurantsResponse>(
          `/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
        );
        return data;
      },
    });

  const restaurants = data?.restaurants ?? [];

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {Array.from({ length: 10 }).map((_, index) => (
          <RestaurantCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  if (isError) {
    return (
      <Text ta="center" c="red" fw={600}>
        {error.message}
      </Text>
    );
  }

  if (restaurants.length === 0) {
    return (
      <Text ta="center" fw={600}>
        No restaurants found for this postcode.
      </Text>
    );
  }

  return (
    <>
      {isSuccess && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {restaurants.slice(0, 10).map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default RestaurantsList;
