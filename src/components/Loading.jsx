import { Box, Center } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box h={{ sm: "79vh", md: "100vh" }}>
      <Center>
        <h1>Loading...</h1>
      </Center>
    </Box>
  );
}
