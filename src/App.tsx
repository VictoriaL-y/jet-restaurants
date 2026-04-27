import { Box, Container, Paper, Title } from "@mantine/core";
import RestaurantsList from "./components/RestaurantsList";
import { POSTCODE_OPTIONS } from "./constants";
import { useState } from "react";
import PostcodeSelect from "./components/PostcodeSelect";

function App() {
  const [postcode, setPostcode] = useState<string>(POSTCODE_OPTIONS[0].value);

  return (
    <Box
      mih="100vh"
      bg="linear-gradient(135deg, #FF8000 0%, #FFB347 50%, #FCE8C7 100%)"
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
