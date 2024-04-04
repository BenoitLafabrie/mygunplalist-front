import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import {
  BiSearch,
  BiCollection,
  BiHeart,
  BiBarcodeReader,
  BiUser,
  BiPowerOff,
} from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import BrandLogo from "../assets/header/BrandLogo.svg";
import Header_Mobile_Logo from "../assets/header/Header_Mobile_Logo.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";
import { UserContext } from "../context/User";

export default function Header() {
  const navigate = useNavigate();
  const toast = useToast();
  const { userData, setUserData, setUserToken } = useContext(UserContext);
  console.log(userData);

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
        height: { base: "37px", md: "38px" },
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
        height: { base: "37px", md: "38px" },
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
        justifyContent="space-around"
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
          <Stack
            display="flex"
            flexDir="row"
            alignItems="center"
            gap={2}
            maxH="60px"
            pt="0.5em"
          >
            <Image src={MyGunplaListLogo} alt="Logo MyGunplaList" maxH="50px" />
            <Image
              src={BrandLogo}
              alt="Logo texte : MyGunplaList"
              maxH="20px"
            />
          </Stack>
        </ChakraLink>
        <ButtonGroup spacing={3} variant="ghost" size="xs" pt="0.5em">
          {userData?.role === "admin" && (
            <ChakraLink as={ReactRouterLink} to="/admin">
              <Button
                color="white"
                leftIcon={<GrUserAdmin size={20} />}
                fontWeight="400"
                _hover={{ bg: "transparent", border: "none" }}
              >
                ADMIN
              </Button>
            </ChakraLink>
          )}
          <ChakraLink as={ReactRouterLink} to="/search">
            <Button
              color="white"
              leftIcon={<BiSearch size={20} />}
              fontWeight="400"
              _hover={{ bg: "transparent", border: "none" }}
            >
              RECHERCHER
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/collection">
            <Button
              color="white"
              leftIcon={<BiCollection size={20} />}
              fontWeight="400"
              _hover={{ bg: "transparent", border: "none" }}
            >
              COLLECTION
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/wishlist">
            <Button
              color="white"
              leftIcon={<BiHeart size={20} />}
              fontWeight="400"
              _hover={{ bg: "transparent", border: "none" }}
            >
              WISHLIST
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/add_kit">
            <Button
              color="white"
              leftIcon={<BiBarcodeReader size={20} />}
              fontWeight="400"
              _hover={{ bg: "transparent", border: "none" }}
            >
              AJOUTER
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/users/me">
            <Button
              color="white"
              leftIcon={<BiUser size={20} />}
              fontWeight="400"
              _hover={{ bg: "transparent", border: "none" }}
            >
              PROFIL
            </Button>
          </ChakraLink>
          <Button
            color="white"
            leftIcon={<BiPowerOff size={20} />}
            fontWeight="400"
            _hover={{ bg: "transparent", border: "none" }}
            onClick={handleLogout}
          />
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
