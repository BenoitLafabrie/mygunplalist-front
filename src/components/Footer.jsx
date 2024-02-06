import { Box, Link as ChakraLink, Image, Stack, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import BrandLogo from "../assets/header/BrandLogo.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";
import Tagline from "../assets/header/Tagline.svg";
import DiscordIcon from "../assets/icons/discordIcon.svg";
import FaceBookIcon from "../assets/icons/facebookIcon.svg";
import InstagramIcon from "../assets/icons/instagramIcon.svg";
import TiktokIcon from "../assets/icons/tiktok_icon.svg";
import TwitterIcon from "../assets/icons/twitterIcon.svg";
import YoutubeIcon from "../assets/icons/youtubeIcon.svg";

export default function Footer() {
  return (
    <Box
      as="footer"
      display={{ base: "grid", md: "flex" }}
      w="100%"
      h={{ base: "28%", md: "7vh" }}
      flexDirection={{ md: "column" }}
      position={{ md: "relative" }}
      bottom={{ base: "0", md: "unset" }}
      mb={{ base: "7.5vh", md: "unset" }}
      pb={{ base: "unset", md: "0.5em" }}
      alignItems={{ base: "center", md: "start" }}
      alignContent={{ base: "unset", md: "start" }}
      backgroundColor="brand.500"
      zIndex={2}
      justifyContent={{ base: "normal", md: "center" }}
    >
      <Box
        w={{ base: "80%", md: "100%" }}
        display="flex"
        justifySelf="center"
        px={{ base: "unset", md: "1em" }}
        mt={{ base: "unset", md: "0.5em" }}
        mb={{ base: "auto", md: "0.5em" }}
        justifyContent={{ base: "unset", md: "center" }}
      >
        <Text
          fontSize="60%"
          fontWeight={{ base: "normal", md: "bold" }}
          align="center"
          textColor={{ base: "auto", md: "white" }}
        >
          Les logos, produits et noms de sociétés mentionnés sont la propriété
          de leurs auteurs respectifs. ©MyGunplaList 2024
        </Text>
      </Box>
      <Box
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        alignItems="center"
        flexWrap={{ base: "wrap" }}
        h="70%"
      >
        <Image src={MyGunplaListLogo} w="20%" h="100%" />
        <Box display="flex" flexDirection="column" h="50%" w="70%">
          <Image src={BrandLogo} pb="0.25em" />
          <Image src={Tagline} />
        </Box>
      </Box>
      <Box
        alignContent="center"
        alignItems="center"
        justifyItems="center"
        marginBottom={{ base: "auto", md: "0" }}
        display={{ base: "grid", md: "flex" }}
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr"
        w={{ base: "100%", md: "100%" }}
        justifyContent={{ base: "center", md: "space-around" }}
      >
        <Box
          display="flex"
          px={{ base: "unset", md: "1em" }}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: "0.5em", md: "1.5em" }}
          fontSize={{ base: "85%", md: "90%" }}
          textColor="white"
          fontWeight="bold"
        >
          <ChakraLink as={ReactRouterLink} to="/about">
            À propos
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/terms-of-use">
            Conditions d&apos;utilisation
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/privacy-policy">
            Politique de confidentialité
          </ChakraLink>
        </Box>
        <Stack display={{ base: "grid", md: "flex" }} flexDirection="row">
          <Box display={{ base: "none", md: "flex" }} px="1em">
            <Text textColor="white" fontWeight="bold">
              Retrouvez-nous sur les réseaux sociaux :
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap={{ base: "wrap" }}
            justifyContent={{ base: "center" }}
            alignItems={{ base: "center" }}
            px={{ base: "0", md: "1em" }}
            gap={{ base: "1.25em", md: "1.5em" }}
          >
            <ChakraLink
              as={ReactRouterLink}
              to="https://www.facebook.com/riseofgunpla"
            >
              <Image src={FaceBookIcon} boxSize={{ base: "32px" }} />
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to="https://www.instagram.com/riseofgunpla"
            >
              <Image
                src={InstagramIcon}
                mt="0.1em"
                boxSize={{ base: "32px" }}
              />
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to="https://twitter.com/Riseofgunpla"
            >
              <Image
                src={TwitterIcon}
                mt={{ base: "0", md: "0.25em" }}
                boxSize={{ base: "32px" }}
              />
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="https://discord.gg/J2VYmbd">
              <Image src={DiscordIcon} boxSize={{ base: "32px" }} />
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to="https://www.tiktok.com/@riseofgunpla"
            >
              <Image src={TiktokIcon} boxSize={{ base: "32px" }} />
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to="https://www.youtube.com/channel/UC_CCjUpIV-cBKGAwwrMVzow"
            >
              <Image
                src={YoutubeIcon}
                mt={{ base: "0", md: "0.25em" }}
                boxSize={{ base: "32px" }}
              />
            </ChakraLink>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
