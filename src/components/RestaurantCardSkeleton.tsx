import { Box, Card, Group, Skeleton } from "@mantine/core";

function RestaurantCardSkeleton() {
  return (
    <Card shadow="sm" withBorder>
      <Card.Section>
        <Skeleton height={160} />
      </Card.Section>

      <Group justify="space-between" align="flex-start" mt="md" mb="xs">
        <Skeleton height={20} width="70%" mih={40} />
      </Group>

      <Box mt="auto" mih={30}>
        <Skeleton height={20} mb="xs" />
        <Skeleton height={20} width="75%" mb="md" />

        <Group justify="center" wrap="nowrap" gap="xs" mih={50}>
          <Skeleton height={20} width={32} />
          <Skeleton height={20} width={120} />
          <Skeleton height={20} width={48} />
        </Group>
      </Box>
    </Card>
  );
}

export default RestaurantCardSkeleton;
