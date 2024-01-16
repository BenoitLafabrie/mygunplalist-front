import { useState, useContext } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { UserContext } from "../context/User";
import {
  Box,
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import Pagination from "../components/Pagination";

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
    <Box w="80%" mb="1em">
      <Center flexDirection="column">
        <Heading my="0.5em" textTransform="uppercase" size="md">
          La gunplalist de {userData.username}
        </Heading>
        <Stack spacing={8}>
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
                  <Heading size="xs" pt="2">
                    {item.name}
                  </Heading>
                </CardBody>
              </ChakraLink>
            </Card>
          ))}
        </Stack>
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
