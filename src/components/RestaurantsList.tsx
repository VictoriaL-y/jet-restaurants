import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IRestaurantsResponse } from "../interfaces";
import { SimpleGrid } from "@mantine/core";
import { RESTAURANT_IMAGES } from "../constants";
import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export interface RestaurantsListProps {
  postcode: string;
}

const RestaurantsList = ({ postcode }: RestaurantsListProps) => {
  const { data, isSuccess, isLoading, isError, error } =
    useQuery<IRestaurantsResponse>({
      queryKey: ["GET/restaurants", postcode],
      queryFn: async () => {
        const { data } = await axios.get(
          `/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
        );
        return data;
      },
      refetchOnWindowFocus: false,
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

  if (isError) return <p>Error: {error.message}</p>;

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
