import { Card, Group, Image, Text, Rating, Box } from "@mantine/core";
import type { RestaurantDetails } from "../types";

function RestaurantCard({ restaurant }: { restaurant: RestaurantDetails }) {
  return (
    <Card key={restaurant.id} shadow="sm" orientation="horizontal">
      <Card.Section
        px="md"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={restaurant.logoUrl} alt={restaurant.name} loading="lazy" />
      </Card.Section>

      <Box pt="sm">
        <Text fw={600} lineClamp={2} mb="xs" mih={50}>
          {restaurant.name}
        </Text>

        <Text size="sm" mb="xs" lineClamp={2} mih={40}>
          {restaurant.cuisines.map((cuisine) => cuisine.name).join(", ")}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={2} mih={30}>
          {restaurant.address.firstLine}, {restaurant.address.city},{" "}
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
