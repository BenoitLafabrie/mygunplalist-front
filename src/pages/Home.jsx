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
      h="100%"
      w={{ base: "80%", md: "85%" }}
      minHeight="calc(100vh - 7.5vh)"
      flexDirection="column"
    >
      <Flex
        flexDirection="row"
        alignItems="baseline"
        justifyContent={{ base: "space-around", md: "unset" }}
        gap={{ base: "unset", md: "4" }}
        pl={{ base: "auto", md: "3em" }}
        mt={{ base: "1em", md: "2.5em" }}
        mb="2em"
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
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        mx="2em"
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
