import { Box, Container, Paper, Title } from "@mantine/core";
import RestaurantsList from "./components/RestaurantsList";
import { BACKGROUND_IMAGE, POSTCODE_OPTIONS } from "./constants";
import { useState } from "react";
import PostcodeSelect from "./components/PostcodeSelect";

function App() {
  const [postcode, setPostcode] = useState<string>(POSTCODE_OPTIONS[0].value);

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
          py="5vh"
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
