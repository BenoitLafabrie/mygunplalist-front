import { useState, useContext } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { UserContext } from "../context/User";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import Pagination from "../components/Pagination";

export default function Wishlist() {
  const { userData, myWishlist } = useContext(UserContext);
  console.log(myWishlist);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredItems = myWishlist?.Items;

  if (!userData || !myWishlist) {
    return <p>loading</p>;
  }

  return (
    <Box w="80%" mb="1em">
      <Center flexDirection="column">
        <Heading my="0.5em" textTransform="uppercase" size="md">
          La wishlist de {userData.username}
        </Heading>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          mx="auto"
        >
          {myWishlist?.Items?.map((item) => (
            <Card key={item.item_id}>
              <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
                <CardBody>
                  {item.Items_images && item.Items_images.length > 0 ? (
                    <Image
                      src={item.Items_images[0].image_path}
                      alt={item.name}
                      borderRadius="lg"
                    />
                  ) : (
                    <p>Aucune image pour ce gunpla</p>
                  )}
                  <Heading size="xs" pt="2" textAlign="center">
                    {item.name}
                  </Heading>
                </CardBody>
              </ChakraLink>
              {item.ROG_Url && (
                <CardFooter justifyContent="center">
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`${item.ROG_Url}`}
                    isExternal
                  >
                    <Button variant="solid" colorScheme="red">
                      Acheter
                    </Button>
                  </ChakraLink>
                </CardFooter>
              )}
            </Card>
          ))}
        </SimpleGrid>
        <Stack alignItems="center">
          <Pagination
            totalItems={filteredItems.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            filteredItems={filteredItems}
          />
        </Stack>
      </Center>
    </Box>
  );
}
