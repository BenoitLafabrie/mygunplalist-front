import { Box, Image, Stack, Text } from "@chakra-ui/react";
import BrandLogo from "../assets/header/BrandLogo.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";

export default function Maintenance() {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        w="100%"
        bgColor="brand.600"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt="4em"
        gap={8}
      >
        <Image src={MyGunplaListLogo} alt="Logo MyGunplaList" />
        <Image
          boxSize={{ base: "80%", md: "30%" }}
          src={BrandLogo}
          alt="Logo texte : MyGunplaList"
        />
      </Box>
      <Box
        h="100%"
        w="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgColor="brand.600"
        gap={4}
      >
        <Stack
          w={{ base: "80%", md: "100%" }}
          display="flex"
          flexDirection="column"
        >
          <Text
            textColor="white"
            textAlign="center"
            fontSize="2xl"
            textTransform="uppercase"
            fontWeight="700"
          >
            En maintenance suite à un problème de déploiement.
          </Text>
          <Text
            textColor="white"
            textAlign="center"
            fontSize="2xl"
            textTransform="uppercase"
            fontWeight="700"
          >
            Nous vous tiendrons informés sur nos réseaux sociaux.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
