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
  useToast,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/header/BrandLogo.svg";
import Header_Icon from "../assets/header/Header_Icon.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";
import { UserContext } from "../context/User";

export default function Header() {
  const toast = useToast();
  const { userData, setUserData, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserToken("");
    setUserData(null);
    localStorage.removeItem("userToken");

    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté :(",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box as="header" w="100%">
      <ChakraLink as={ReactRouterLink} to="/" w="100vw">
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
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          display="flex"
          gap={2}
          maxW="400px"
        >
          <Image src={MyGunplaListLogo} boxSize="7.5%" ml="1em" />
          <Image src={BrandLogo} />
        </ChakraLink>
        <ButtonGroup spacing={3} variant="ghost" size="md" gap="1em">
          <ChakraLink as={ReactRouterLink} to="/admin">
            <Button color="white" _hover={{ bg: "#314095" }} fontWeight="400">
              Dashboard
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/add_kit">
            <Button color="white" _hover={{ bg: "#314095" }} fontWeight="400">
              Ajouter
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/collection">
            <Button color="white" _hover={{ bg: "#314095" }} fontWeight="400">
              Collection
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/wishlist">
            <Button color="white" _hover={{ bg: "#314095" }} fontWeight="400">
              Wishlist
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/search">
            <Button color="white" _hover={{ bg: "#314095" }} fontWeight="400">
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
                name={`${userData?.firstname} ${userData?.lastname}`}
                mr="1em"
                fontWeight="400"
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<HiOutlineUser />}
                onClick={() => navigate("/users/me")}
                fontWeight="400"
              >
                Profil
              </MenuItem>
              <MenuItem
                icon={<BiLogOut />}
                textColor="brand.500"
                onClick={handleLogout}
                fontWeight="400"
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
