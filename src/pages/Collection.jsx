import {
  Box,
  Card,
  CardBody,
  Center,
  Link as ChakraLink,
  Heading,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import Pagination from "../components/Pagination";
import { UserContext } from "../context/User";

export default function Collection() {
  const { userData, myGunplaList } = useContext(UserContext);
  console.log(myGunplaList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredItems = myGunplaList?.Items;

  if (!userData || !myGunplaList) {
    return <p>loading</p>;
  }

  return (
    <Box w="80%" mb="1em" minH="calc(93vh - 82px)">
      <Center flexDirection="column">
        <Heading my="0.5em" textTransform="uppercase" size="md">
          La gunplalist de {userData.username}
        </Heading>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          mx="auto"
        >
          {myGunplaList?.Items?.map((item) => (
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
