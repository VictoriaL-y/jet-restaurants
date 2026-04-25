import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IRestaurantsResponse } from "../interfaces";
import {
  Card,
  Group,
  Image,
  Text,
  SimpleGrid,
  Rating,
  Box,
} from "@mantine/core";
import { RESTAURANT_IMAGES } from "../constants";

const RestaurantsList = () => {
  const postcode = "EC4M7RF";

  const { data, isSuccess, isLoading, isError, error } =
    useQuery<IRestaurantsResponse>({
      queryKey: ["GET/restaurants", postcode],
      queryFn: async () => {
        const { data } = await axios.get(
          `/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
        );
        console.log(data);
        return data;
      },
      refetchOnWindowFocus: false,
    });

  if (isLoading) return <p>Loading brands...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      {isSuccess && (
        <SimpleGrid cols={5} spacing="xl">
          {data.restaurants.slice(0, 10).map((restaurant, index) => (
            <Card key={restaurant.id} shadow="sm" padding="lg" withBorder>
              <Card.Section>
                <Image
                  src={RESTAURANT_IMAGES[index]}
                  height={160}
                  alt={restaurant.name}
                  loading="lazy"
                />
              </Card.Section>

              <Group
                justify="space-between"
                align="flex-start"
                mt="md"
                mb="xs"
                wrap="nowrap"
                mih={30}
              >
                <Text fw={500} lineClamp={2}>
                  {restaurant.name}
                </Text>

                <Group wrap="nowrap" gap="xs">
                  <Text fw={500}>{restaurant.rating.starRating}</Text>
                  <Rating
                    value={restaurant.rating.starRating}
                    fractions={2}
                    readOnly
                  />
                  <Text fw={500}>({restaurant.rating.count})</Text>
                </Group>
              </Group>

              <Box mt="auto">
                <Text size="sm" mb="xs" lineClamp={2} mih={40}>
                  {restaurant.cuisines
                    .map((cuisine) => cuisine.name)
                    .join(", ")}
                </Text>

                <Text size="sm" c="dimmed" lineClamp={2} mih={40}>
                  {restaurant.address.firstLine} {restaurant.address.city},{" "}
                  {restaurant.address.postalCode}
                </Text>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default RestaurantsList;
