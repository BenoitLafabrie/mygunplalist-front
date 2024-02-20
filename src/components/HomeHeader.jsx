import { Box, Button, Link as ChakraLink, Image, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import BrandLogo from "../assets/header/BrandLogo.svg";
import Header_Mobile_Logo from "../assets/header/Header_Mobile_Logo.svg";
import Home_Header_ROG from "../assets/header/Home_Header_ROG.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";
import Tagline from "../assets/header/Tagline.svg";
import ButtonLogo from "../components/buttons/ButtonLogo";

export default function HomeHeader() {
  return (
    <Box
      as="header"
      w="100%"
      h="660px"
      position="sticky"
      backgroundColor="brand.500"
    >
      <ChakraLink
        as={ReactRouterLink}
        to="/"
        _hover={{ textDecoration: "none" }}
      >
        <Box
          display="flex"
          py="0.5em"
          justifyContent="space-around"
          alignContent="center"
        >
          <Image src={Header_Mobile_Logo} />
          <Image src={Home_Header_ROG} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          px="2em"
          pt="1em"
          justifyContent="center"
          alignContent="center"
        >
          <Image src={MyGunplaListLogo} pb="2em" />
          <Text
            color="white"
            align="center"
            fontSize="2xl"
            fontWeight="extra-bold"
            pb="0.5em"
          >
            BIENVENUE SUR
          </Text>
          <Image src={BrandLogo} pb="0.25em" />
          <Image src={Tagline} pb="1.5em" />
        </Box>
      </ChakraLink>
      <Box display="flex" h="80px" justifyContent="center" alignItems="center">
        <ChakraLink
          as={ReactRouterLink}
          to="/register"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            textColor="brand.500"
            leftIcon={<ButtonLogo />}
            boxShadow="-1px 0 1px #071D26"
          >
            JE M&apos;INSCRIS
          </Button>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/login"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            variant="outline"
            textColor="#F0F5F7"
            border="2px"
            ml="-0.5em"
            p="1.125em"
            boxShadow="2px 0 1px -1px #071D26"
          >
            CONNEXION
          </Button>
        </ChakraLink>
      </Box>
    </Box>
  );
}
