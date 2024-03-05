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
  Text,
  useToast,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/header/BrandLogo.svg";
import Header_Mobile_Logo from "../assets/header/Header_Mobile_Logo.svg";
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
    <Box
      as="header"
      w="100%"
      h="65px"
      backgroundColor="brand.500"
      _before={{
        backgroundImage: `url(https://test.mygunplalist.com/images/assets/separator_curve-r.svg)`,
        bgSize: "100% 38px, 100% 76px",
        bgRepeat: "no-repeat",
        content: '""',
        position: "absolute",
        width: "70px",
        height: "38px",
        top: "65",
        left: "0",
        bottom: "0",
        transform: "scaleX(-1) scaleY(-1)",
      }}
      _after={{
        backgroundImage: `url(https://test.mygunplalist.com/images/assets/separator_curve-r.svg)`,
        bgSize: "100% 38px, 100% 76px",
        bgRepeat: "no-repeat",
        content: '""',
        position: "absolute",
        width: "70px",
        height: "38px",
        top: "65",
        right: "0",
        bottom: "0",
        transform: "scaleY(-1)",
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgGradient="linear-gradient(180deg, brand.500 94.55%, #fff 50%, #fff 100%)"
        zIndex="-2"
      />
      <Box
        display={{ base: "flex", md: "none" }}
        px={{ base: "1em", md: "3em" }}
        py="0.5em"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          _hover={{ textDecoration: "none" }}
        >
          <Image src={Header_Mobile_Logo} alt="Image du header pour mobile" />
        </ChakraLink>

        <ChakraLink
          as={ReactRouterLink}
          to="https://www.riseofgunpla.com"
          _hover={{ textDecoration: "none" }}
        >
          <Text color="white" fontWeight="400" fontSize="12px">
            BY RISEOFGUNPLA.COM
          </Text>
        </ChakraLink>
      </Box>
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
          <Image
            src={MyGunplaListLogo}
            alt="Logo MyGunplaList"
            boxSize="7.5%"
            ml="1em"
          />
          <Image src={BrandLogo} alt="Logo texte : MyGunplaList" />
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
                border="none"
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
