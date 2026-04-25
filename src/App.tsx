import { Box, Container, Paper, Title } from "@mantine/core";
import RestaurantsList from "./components/RestaurantsList";
import { BACKGROUND_IMAGE } from "./constants";
import { useState } from "react";
import PostcodeSelect from "./components/PostcodeSelect";

function App() {
  const [postcode, setPostcode] = useState<string>("CT1 2EH");

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
      <Container size="95%" py="8vh">
        <Paper
          p="xl"
          py="6vh"
          mih="1100px"
          radius="lg"
          shadow="md"
          bg="rgba(255, 255, 255, 0.8)"
        >
          <Title order={1} mb="md" ta="center">
            Restaurants nearby
          </Title>
          <PostcodeSelect postcode={postcode} onPostcodeChange={setPostcode} />
          <RestaurantsList postcode={postcode} />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
