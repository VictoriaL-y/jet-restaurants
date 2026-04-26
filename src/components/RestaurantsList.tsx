import { useRestaurants } from "../hooks/useRestaurants";
import { SimpleGrid, Text } from "@mantine/core";
import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export interface RestaurantsListProps {
  postcode: string;
}

const RestaurantsList = ({ postcode }: RestaurantsListProps) => {
  const { data, isSuccess, isLoading, isError, error } =
    useRestaurants(postcode);

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

  if (isSuccess && data.length === 0) {
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
          {data.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default RestaurantsList;
