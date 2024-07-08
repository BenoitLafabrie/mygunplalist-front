import {
  Button,
  ButtonGroup,
  Link as ChakraLink,
  HStack,
  useToast,
} from "@chakra-ui/react";
import {
  BiSearch,
  BiCollection,
  BiHeart,
  BiBarcodeReader,
  BiPowerOff,
  BiUser,
} from "react-icons/bi";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/User";

export default function HomeNavBar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUserData, setUserToken } = useContext(UserContext);

  const handleLogout = () => {
    setUserToken("");
    setUserData(null);
    localStorage.removeItem("userToken");
    navigate("/");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté :(",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <HStack
      w="80%"
      justifyContent="space-around"
      backgroundColor="white"
      display={{ base: "none", md: "flex" }}
    >
      <ButtonGroup spacing={10} variant="ghost" size="sm">
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
        <Button
          color="brand.500"
          leftIcon={<BiPowerOff size={20} />}
          fontWeight="400"
          _hover={{ bg: "transparent", border: "none" }}
          onClick={handleLogout}
        />
      </ButtonGroup>
    </HStack>
  );
}
