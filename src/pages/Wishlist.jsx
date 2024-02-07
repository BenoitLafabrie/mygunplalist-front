import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Link as ChakraLink,
  Heading,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { UserContext } from "../context/User";

export default function Wishlist() {
  const { userData, myWishlist, userToken, isLoading } =
    useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredItems = myWishlist?.Items;

  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userToken || userToken.length === 0) {
        navigate("/login");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [userToken, navigate]);

  if (!userData || !myWishlist || isLoading) {
    return <p>loading</p>;
  } else {
    return (
      <Box w="80%" mb="1em" minH="calc(93vh - 82px)">
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
}
