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
      h={{ base: "28%", md: "25%" }}
      flexDirection={{ md: "column" }}
      position={{ md: "relative" }}
      bottom={{ base: "0", md: "unset" }}
      mb={{ base: "7.5vh", md: "unset" }}
      pb={{ md: "0.5em" }}
      alignItems={{ base: "center", md: "start" }}
      alignContent={{ md: "start" }}
      backgroundColor="brand.500"
      zIndex={2}
      justifyContent={{ base: "normal", md: "center" }}
      _before={{
        backgroundImage: `url(https://test.mygunplalist.com/images/assets/separator_curve-r.svg)`,
        bgSize: "100% 38px, 100% 76px",
        bgRepeat: "no-repeat",
        content: '""',
        position: "absolute",
        width: "70px",
        height: { base: "38px", md: "39px" },
        left: "0",
        bottom: { base: "256", md: "84" },
        zIndex: "-1",
        transform: "scaleX(-1)",
      }}
      _after={{
        backgroundImage: `url(https://test.mygunplalist.com/images/assets/separator_curve-r.svg)`,
        bgSize: "100% 38px, 100% 76px",
        bgRepeat: "no-repeat",
        content: '""',
        position: "absolute",
        width: "70px",
        height: { base: "38px", md: "39px" },
        right: "0",
        bottom: { base: "256", md: "84" },
        zIndex: "-1",
      }}
    >
      <Box
        as="footer-gradient-div"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgGradient="linear-gradient(180deg, brand.500 94.55%, #fff 50%, #fff 100%)"
        zIndex="-2"
      />
      <Box
        w={{ base: "80%", md: "100%" }}
        display="flex"
        justifySelf="center"
        px={{ md: "1em" }}
        mt={{ base: "-2.25em", md: "-1.75em" }}
        mb={{ base: "0.75em" }}
        justifyContent={{ md: "center" }}
      >
        <Text
          fontSize={{ base: "55%", md: "85%" }}
          fontWeight="400"
          align="center"
        >
          Les logos, produits et noms de sociétés mentionnés sont la propriété
          de leurs auteurs respectifs. ©MyGunplaList 2024
        </Text>
      </Box>
      <Box
        display={{ md: "flex" }}
        alignItems={{ md: "center" }}
        justifyContent={{ md: "center" }}
        w={{ md: "100%" }}
      >
        <Box
          display="flex"
          justifyContent={{ base: "space-evenly", md: "center" }}
          alignItems="center"
          flexWrap={{ base: "wrap" }}
          h="70%"
          gap={{ md: "0.5em" }}
          my={{ base: "1em" }}
        >
          <Image
            src={MyGunplaListLogo}
            alt="Logo MyGunplaList"
            w={{ base: "18%", md: "10%" }}
            h={{ base: "100%", md: "80%" }}
          />
          <Box
            display="flex"
            flexDirection="column"
            h={{ base: "50%", md: "80%" }}
            w={{ base: "70%", md: "60%" }}
          >
            <Image
              src={BrandLogo}
              alt="Logo texte : MyGunplaList"
              pb="0.25em"
            />
            <Image
              src={Tagline}
              alt="Logo texte : Backlog & Collection showcase by Rise Of Gunpla"
            />
          </Box>
        </Box>
        <Box
          alignContent="center"
          alignItems="center"
          justifyItems="center"
          marginBottom={{ base: "auto", md: "0" }}
          display={{ base: "grid", md: "flex" }}
          gridTemplateColumns="2fr"
          gridTemplateRows="1fr"
          w={{ base: "100%", md: "100%" }}
          justifyContent={{ base: "center", md: "space-around" }}
        >
          <Box
            display={{ base: "grid", md: "flex" }}
            flexDirection={{ base: "row", md: "row-reverse" }}
            justifyContent={{ base: "center", md: "space-between" }}
            alignItems={{ base: "center" }}
            gridTemplateColumns="1fr 1fr"
            pb={{ base: "0.5em" }}
          >
            <Box
              display="flex"
              px={{ md: "1em" }}
              pl={{ base: "0.5em" }}
              flexDirection="column"
              alignItems={{ md: "flex-end" }}
              gap={{ base: "0.75em", md: "0" }}
              fontSize={{ base: "85%", md: "90%" }}
              textColor="white"
            >
              <ChakraLink
                as={ReactRouterLink}
                to="/about"
                _hover={{ textDecoration: "none", textColor: "white" }}
              >
                <Text fontWeight="400">À propos</Text>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/terms-of-use"
                _hover={{ textDecoration: "none", textColor: "white" }}
              >
                <Text fontWeight="400">Conditions d&apos;utilisation</Text>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/privacy-policy"
                _hover={{ textDecoration: "none", textColor: "white" }}
              >
                <Text fontWeight="400">Politique de confidentialité</Text>
              </ChakraLink>
            </Box>
            <Stack
              display={{ base: "grid", md: "flex" }}
              flexDirection={{ md: "row" }}
              gridTemplateColumns="1fr"
              gridTemplateRows="2fr"
            >
              <Box
                display="flex"
                flexDirection={{ md: "row" }}
                flexWrap={{ base: "wrap" }}
                justifyContent={{ base: "center" }}
                alignItems={{ base: "baseline" }}
                px={{ base: "0", md: "1em" }}
                gap={{ base: "1.5em", md: "1.5em" }}
                pb={{ base: "auto", md: "0.5em" }}
              >
                <ChakraLink
                  as={ReactRouterLink}
                  to="https://www.facebook.com/riseofgunpla"
                >
                  <Image
                    src={FaceBookIcon}
                    alt="Icône FaceBook"
                    boxSize={{ base: "32px" }}
                  />
                </ChakraLink>
                <ChakraLink
                  as={ReactRouterLink}
                  to="https://www.instagram.com/riseofgunpla"
                >
                  <Image
                    src={InstagramIcon}
                    alt="Icône Instagram"
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
                    alt="Icône Twitter"
                    mt={{ base: "0", md: "0.25em" }}
                    boxSize={{ base: "32px" }}
                  />
                </ChakraLink>
                <ChakraLink
                  as={ReactRouterLink}
                  to="https://discord.gg/J2VYmbd"
                >
                  <Image
                    src={DiscordIcon}
                    alt="Icône Discord"
                    boxSize={{ base: "32px" }}
                  />
                </ChakraLink>
                <ChakraLink
                  as={ReactRouterLink}
                  to="https://www.tiktok.com/@riseofgunpla"
                >
                  <Image
                    src={TiktokIcon}
                    alt="Icône TikTok"
                    boxSize={{ base: "32px" }}
                  />
                </ChakraLink>
                <ChakraLink
                  as={ReactRouterLink}
                  to="https://www.youtube.com/channel/UC_CCjUpIV-cBKGAwwrMVzow"
                >
                  <Image
                    src={YoutubeIcon}
                    alt="Icône YouTube"
                    mt={{ base: "0", md: "0.25em" }}
                    boxSize={{ base: "32px" }}
                  />
                </ChakraLink>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
