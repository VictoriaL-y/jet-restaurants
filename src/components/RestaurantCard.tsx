import { Card, Group, Image, Text, Rating, Box } from "@mantine/core";
import type { IRestaurantDetails } from "../interfaces";

interface IRestaurantCardProps {
  restaurant: IRestaurantDetails;
  imageSrc: string;
}

function RestaurantCard({ restaurant, imageSrc }: IRestaurantCardProps) {
  return (
    <Card key={restaurant.id} shadow="sm" withBorder>
      <Card.Section>
        <Image
          src={imageSrc}
          height={160}
          alt={restaurant.name}
          loading="lazy"
        />
      </Card.Section>

      <Text fw={600} lineClamp={2} mt="md" mb="xs">
        {restaurant.name}
      </Text>

      <Box mt="auto">
        <Text size="sm" mb="xs" lineClamp={2} mih={40}>
          {restaurant.cuisines.map((cuisine) => cuisine.name).join(", ")}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={2} mih={30}>
          {restaurant.address.firstLine} {restaurant.address.city},{" "}
          {restaurant.address.postalCode}
        </Text>

        <Group justify="left" wrap="nowrap" gap="xs" mih={50}>
          <Text fw={600}>{restaurant.rating.starRating}</Text>{" "}
          <Rating value={restaurant.rating.starRating} fractions={2} readOnly />{" "}
          <Text fw={600}>({restaurant.rating.count})</Text>{" "}
        </Group>
      </Box>
    </Card>
  );
}

export default RestaurantCard;
