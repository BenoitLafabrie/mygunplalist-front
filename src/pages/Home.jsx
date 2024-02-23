import { useEffect, useState } from "react";
import {
  Center,
  Flex,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getLatestItems } from "../api/item";
import HomeNavBar from "../components/HomeNavBar";
import { KitCard } from "../components/KitCard";
import ROGButton from "../components/buttons/ROGButton";

export default function Home() {
  const [latestItems, setLatestItems] = useState([]);

  const fetchLatestItems = async () => {
    const allLatestItems = await getLatestItems();
    if (allLatestItems) {
      setLatestItems(allLatestItems);
    }
  };

  // Fetch the items when the component mounts
  useEffect(() => {
    try {
      fetchLatestItems();
    } catch (error) {
      console.error("Erreur:", error);
    }
  }, []);

  return (
    <Flex
      h="100vh"
      w="100vw"
      minHeight="calc(100vh - 7.5vh)"
      overflow="auto"
      flexDirection="column"
    >
      <Center>
        <HomeNavBar />
      </Center>
      <Flex
        flexDirection="row"
        alignItems="baseline"
        justifyContent={{ base: "space-around", md: "unset" }}
        gap={{ base: "unset", md: "4" }}
        mx={{ base: "auto", md: "3em" }}
        my="2em"
        w={{ base: "100%" }}
      >
        <Text fontWeight="700">LES DERNIERS GUNPLA</Text>
        <ChakraLink
          as={ReactRouterLink}
          to="/search"
          _hover={{ textDecoration: "none" }}
        >
          <Text fontWeight="400" fontSize="xs" textColor="brand.500">
            VOIR TOUS
          </Text>
        </ChakraLink>
      </Flex>
      <SimpleGrid
        spacing={{ base: 3, md: 8 }}
        columns={{ base: 2, md: 3, lg: 5, xl: 7, "2xl": 9 }}
        mx={{ base: "1em", md: "3em" }}
        w={{ base: "90%" }}
      >
        {latestItems.map((item) => (
          <KitCard key={item.item_id} item={item} />
        ))}
      </SimpleGrid>
      <Heading size="sm" textAlign="center" mt="4em">
        VOUS SOUHAITEZ ACHETER UN GUNPLA?
      </Heading>
      <Center mt="2em" mb="4em">
        <ROGButton />
      </Center>
    </Flex>
  );
}
