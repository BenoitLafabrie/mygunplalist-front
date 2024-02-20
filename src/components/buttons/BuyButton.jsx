import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function BuyButton(url) {
  return (
    <ChakraLink as={ReactRouterLink} to={url} isExternal>
      <Button variant="solid" colorScheme="red">
        Acheter
      </Button>
    </ChakraLink>
  );
}
