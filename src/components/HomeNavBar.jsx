import {
  Button,
  ButtonGroup,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import {
  BiSearch,
  BiCollection,
  BiHeart,
  BiBarcodeReader,
  BiUser,
} from "react-icons/bi";
import { Link as ReactRouterLink } from "react-router-dom";

export default function HomeNavBar() {
  return (
    <HStack
      w="90%"
      justifyContent="space-around"
      backgroundColor="white"
      display={{ base: "none", md: "flex" }}
    >
      <ButtonGroup spacing={3} variant="ghost" size="sm" gap="1em">
        <ChakraLink as={ReactRouterLink} to="/search">
          <Button
            color="brand.500"
            leftIcon={<BiSearch size={20} />}
            fontWeight="400"
            _hover={{ bg: "transparent", border: "none" }}
          >
            RECHERCHER
          </Button>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/collection">
          <Button
            color="brand.500"
            leftIcon={<BiCollection size={20} />}
            fontWeight="400"
            _hover={{ bg: "transparent", border: "none" }}
          >
            COLLECTION
          </Button>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/wishlist">
          <Button
            color="brand.500"
            leftIcon={<BiHeart size={20} />}
            fontWeight="400"
            _hover={{ bg: "transparent", border: "none" }}
          >
            WISHLIST
          </Button>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/add_kit">
          <Button
            color="brand.500"
            leftIcon={<BiBarcodeReader size={20} />}
            fontWeight="400"
            _hover={{ bg: "transparent", border: "none" }}
          >
            AJOUTER
          </Button>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/users/me">
          <Button
            color="brand.500"
            leftIcon={<BiUser size={20} />}
            fontWeight="400"
            _hover={{ bg: "transparent", border: "none" }}
          >
            PROFIL
          </Button>
        </ChakraLink>
      </ButtonGroup>
    </HStack>
  );
}
