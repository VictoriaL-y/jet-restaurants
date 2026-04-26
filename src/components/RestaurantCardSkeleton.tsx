import { Box, Card, Group, Skeleton } from "@mantine/core";

function RestaurantCardSkeleton() {
  return (
    <Card shadow="sm" orientation="horizontal">
      <Card.Section
        px="md"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton height={100} width={100} />
      </Card.Section>

      <Box pt="sm" style={{ flex: 1 }}>
        <Skeleton height={20} width="80%" mb="xs" mih={40} />

        <Box mih={40} mb="xs">
          <Skeleton height={16} width="90%" mb={6} />
          <Skeleton height={16} width="65%" />
        </Box>

        <Box mih={30} mb="xs">
          <Skeleton height={16} width="85%" />
        </Box>

        <Group justify="left" wrap="nowrap" gap="xs" mih={50}>
          <Skeleton height={16} width={100} />
          <Skeleton height={16} width={32} />
          <Skeleton height={16} width={48} />
        </Group>
      </Box>
    </Card>
  );
}

export default RestaurantCardSkeleton;
