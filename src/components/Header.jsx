import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import Header_Icon from "../assets/header/Header_Icon.svg";
import { Search2Icon } from "@chakra-ui/icons";
import BrandLogo from "../assets/header/BrandLogo.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box w="100%">
      <ChakraLink as={ReactRouterLink} to="/home" w="100vw">
        <Box
          h="108px"
          position="sticky"
          backgroundImage={Header_Icon}
          display={{ base: "flex", md: "none" }}
        />
      </ChakraLink>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        display={{ base: "none", md: "flex" }}
        bgColor="brand.500"
      >
        <HStack>
          <Image src={MyGunplaListLogo} boxSize="7.5%" ml="1em" />
          <Image src={BrandLogo} />
        </HStack>
        <ButtonGroup
          spacing={3}
          variant="ghost"
          size="md"
          ml="-20%"
          gap={{ md: "1em", lg: "2em" }}
        >
          <ChakraLink as={ReactRouterLink} to="/admin">
            <Button color="white" _hover={{ bg: "#314095" }}>
              Dashboard
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/add_kit">
            <Button color="white" _hover={{ bg: "#314095" }}>
              Ajouter
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/collection">
            <Button color="white" _hover={{ bg: "#314095" }}>
              Collection
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/wishlist">
            <Button color="white" _hover={{ bg: "#314095" }}>
              Wishlist
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/search">
            <Button color="white" _hover={{ bg: "#314095" }}>
              Recherche
            </Button>
          </ChakraLink>
        </ButtonGroup>
        <HStack spacing={3} display="flex" alignItems="center" py="0.5em">
          <InputGroup display="none">
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="white" />
            </InputLeftElement>
            <Input
              placeholder="Recherche..."
              sx={{ "::placeholder": { color: "white" } }}
            />
          </InputGroup>
          <Menu>
            <MenuButton>
              <Avatar
                size="md"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                mr="1em"
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<HiOutlineUser />}
                onClick={() => navigate("/users/me")}
              >
                Profil
              </MenuItem>
              <MenuItem
                icon={<BiLogOut />}
                textColor="brand.500"
                //onClick={logout}
              >
                Déconnexion
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}
