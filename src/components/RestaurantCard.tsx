import { Card, Group, Image, Text, Rating, Box } from "@mantine/core";
import type { IRestaurantDetails } from "../interfaces";

interface IRestaurantCardProps {
  restaurant: IRestaurantDetails;
  imageSrc: string;
}

function RestaurantCard({ restaurant, imageSrc }: IRestaurantCardProps) {
  return (
    <Card key={restaurant.id} shadow="sm" padding="lg" withBorder>
      <Card.Section>
        <Image
          src={imageSrc}
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
          <Rating value={restaurant.rating.starRating} fractions={2} readOnly />
          <Text fw={500}>({restaurant.rating.count})</Text>
        </Group>
      </Group>

      <Box mt="auto">
        <Text size="sm" mb="xs" lineClamp={2} mih={40}>
          {restaurant.cuisines.map((cuisine) => cuisine.name).join(", ")}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={2} mih={40}>
          {restaurant.address.firstLine} {restaurant.address.city},{" "}
          {restaurant.address.postalCode}
        </Text>
      </Box>
    </Card>
  );
}

export default RestaurantCard;
