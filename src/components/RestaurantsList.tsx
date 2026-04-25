import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IRestaurantsResponse } from "../interfaces";
import { SimpleGrid, Text } from "@mantine/core";
import { RESTAURANT_IMAGES } from "../constants";
import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export interface RestaurantsListProps {
  postcode: string;
}

const RestaurantsList = ({ postcode }: RestaurantsListProps) => {
  const { data, isSuccess, isLoading, isError, error } = useQuery<
    IRestaurantsResponse,
    Error
  >({
    queryKey: ["GET/restaurants", postcode],
    queryFn: async () => {
      const { data } = await axios.get<IRestaurantsResponse>(
        `/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      );
      if (!data.restaurants || data.restaurants.length === 0) {
        throw new Error("No restaurants found for this postcode.");
      }
      return data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) {
    return (
      <SimpleGrid cols={5} spacing="xl">
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

  return (
    <>
      {isSuccess && (
        <SimpleGrid cols={5} spacing="xl">
          {data.restaurants.slice(0, 10).map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              imageSrc={RESTAURANT_IMAGES[index]}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default RestaurantsList;
