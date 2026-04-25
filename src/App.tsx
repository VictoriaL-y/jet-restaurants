import { Box, Container, Paper, Title } from "@mantine/core";
import RestaurantsList from "./components/RestaurantsList";
import { BACKGROUND_IMAGE } from "./constants";

function App() {
  return (
    <Box
      mih="100vh"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container size="95%" pt="lg">
        <Paper p="xl" radius="lg" shadow="md" bg="rgba(255, 255, 255, 0.8)">
          <Title order={1} mb="xl" ta="center">
            Restaurants nearby
          </Title>

          <RestaurantsList />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
