import { useState } from "react";
import { Box, Button, Link as ChakraLink, Image, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import BrandLogo from "../assets/header/BrandLogo.svg";
import Header_Mobile_Logo from "../assets/header/Header_Mobile_Logo.svg";
import Home_Header_ROG from "../assets/header/Home_Header_ROG.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";
import ButtonLogo from "../components/buttons/ButtonLogo";
import WhiteButtonIconLogo from "../components/buttons/WhiteButtonIconLogo";

export default function HomeHeader() {
  const [hoveredButton, setHoveredButton] = useState(null);

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
          px={{ base: "1em", md: "3em" }}
          py="0.5em"
          justifyContent="space-between"
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
            fontSize="xl"
            letterSpacing="0.25em"
            fontWeight="800"
            mb="0.25em"
          >
            BIENVENUE SUR
          </Text>
          <Image src={BrandLogo} pb="0.25em" />
          <Box my={{ base: "1.5em", md: "2.5em" }}>
            <Text
              color="white"
              align="center"
              fontSize="sm"
              fontWeight="300"
              mt="0.25em"
              style={{ hyphens: "auto" }}
            >
              COMMENCEZ À SUIVRE, PARTAGER ET COMPLÉTER VOTRE COLLECTION DE
              GUNPLA
            </Text>
            <Text
              color="white"
              align="center"
              fontSize="sm"
              fontWeight="300"
              mb="0.25em"
            >
              AVEC MYGUNPLALIST PAR RISE OF GUNPLA
            </Text>
          </Box>
        </Box>
      </ChakraLink>
      <Box
        display="flex"
        h="80px"
        justifyContent="center"
        alignItems="center"
        mx={{ base: "1em" }}
      >
        <ChakraLink
          as={ReactRouterLink}
          to="/register"
          onMouseEnter={() => setHoveredButton("register")}
          onMouseLeave={() => setHoveredButton(null)}
          _hover={{ textDecoration: "none" }}
        >
          <Button
            textColor={hoveredButton === "login" ? "brand.100" : "brand.500"}
            leftIcon={
              hoveredButton === "login" ? (
                <WhiteButtonIconLogo />
              ) : (
                <ButtonLogo />
              )
            }
            boxShadow={
              hoveredButton === "login"
                ? "none"
                : "5px 5px 50px 0px rgba(7,29,38,0.25)"
            }
            p="1.5em"
            fontWeight="400"
            variant={hoveredButton === "login" ? "outline" : "solid"}
            transition="all 0.3s ease"
          >
            JE M&apos;INSCRIS
          </Button>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/login"
          onMouseEnter={() => setHoveredButton("login")}
          onMouseLeave={() => setHoveredButton(null)}
          _hover={{ textDecoration: "none" }}
        >
          <Button
            textColor={hoveredButton === "login" ? "brand.500" : "brand.100"}
            variant={hoveredButton === "login" ? "solid" : "outline"}
            ml="-0.5em"
            px="2.5em"
            py="1.5em"
            boxShadow={
              hoveredButton === "login"
                ? "5px 5px 50px 0px rgba(7,29,38,0.25)"
                : "none"
            }
            fontWeight="400"
            zIndex={hoveredButton === "login" ? "2" : "-1"}
            transition="all 0.3s ease"
          >
            CONNEXION
          </Button>
        </ChakraLink>
      </Box>
    </Box>
  );
}
