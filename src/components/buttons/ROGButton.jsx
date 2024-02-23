import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import WhiteButtonIconLogo from "../buttons/WhiteButtonIconLogo";

export default function ROGButton() {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to="https://www.riseofgunpla.com"
      isExternal
    >
      <Button
        variant="solid"
        colorScheme="brand"
        leftIcon={<WhiteButtonIconLogo />}
        fontSize="18px"
        fontWeight="400"
        px="2em"
        py="1.5em"
      >
        WWW.RISEOFGUNPLA.COM
      </Button>
    </ChakraLink>
  );
}
