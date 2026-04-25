import { Box, Select } from "@mantine/core";
import { POSTCODE_OPTIONS } from "../constants";

interface PostcodeSelectProps {
  postcode: string;
  onPostcodeChange: (postcode: string) => void;
}

function PostcodeSelect({ postcode, onPostcodeChange }: PostcodeSelectProps) {
  return (
    <Box maw={320} mx="auto" mb="xl">
      <Select
        label="Choose UK postcode"
        data={POSTCODE_OPTIONS}
        value={postcode}
        onChange={(value) => {
          if (value) {
            onPostcodeChange(value);
          }
        }}
      />
    </Box>
  );
}

export default PostcodeSelect;
