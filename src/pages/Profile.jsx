import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Link as ChakraLink,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { UserContext } from "../context/User";

export default function Profile() {
  const navigate = useNavigate();

  const { userData, myGunplaList, myWishlist } = useContext(UserContext);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const createdAt = new Date(userData?.createdAt);
  const now = new Date();
  const diffInTime = now.getTime() - createdAt.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (!userData || !myGunplaList || !myWishlist) {
    <p>loading</p>;
  }

  return (
    <Box
      minH={{ base: "55.7vh", md: "85vh" }}
      display={{ base: "flex", md: "grid" }}
      flexDirection={{ base: "column" }}
      justifyContent={{ base: "center" }}
      alignItems={{ base: "center" }}
      w="100%"
    >
      <Avatar
        size="xl"
        name={`${userData?.firstname} ${userData?.lastname}`}
        mb="1rem"
      />
      <Heading size={{ base: "lg", md: "xl" }} mb="0.25rem">
        {userData?.username}
      </Heading>
      <Text fontSize={{ base: "sm", md: "lg" }} as="em" opacity="50%" mb="1rem">
        Membre depuis le{" "}
        {new Date(userData?.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        ({diffInDays} jour(s))
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        w="90%"
      >
        <Heading size={{ base: "md", md: "lg" }}>Ma Gunplalist</Heading>
        <ChakraLink as={ReactRouterLink} to="/collection">
          <Text casing="uppercase" fontSize="14px" color="brand.500">
            tout voir
          </Text>
        </ChakraLink>
      </Box>
      <Box display="flex" overflowX="auto" w="90%" gap={4} py="1em">
        {myGunplaList?.Items?.map((item) => (
          <Card
            key={item.item_id}
            minW="150px"
            minH="150px"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <CardBody p={0}>
              <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
                {item.Items_images && item.Items_images.length > 0 ? (
                  <Image
                    src={item.Items_images[0].image_path}
                    alt={item.name}
                    borderRadius="md"
                    fit="cover"
                    h="100%"
                    w="100%"
                  />
                ) : (
                  <p>Aucune image pour ce gunpla</p>
                )}
              </ChakraLink>
            </CardBody>
            <CardFooter>
              <Text
                fontSize={14}
                textAlign="center"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {item.name}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        w="90%"
      >
        <Heading size={{ base: "md", md: "lg" }}>Ma Wishlist</Heading>
        <ChakraLink as={ReactRouterLink} to="/wishlist">
          <Text casing="uppercase" fontSize="14px" color="brand.500">
            tout voir
          </Text>
        </ChakraLink>
      </Box>
      <Box display="flex" overflowX="auto" w="90%" gap={4} py="1em">
        {myWishlist?.Items?.map((item) => (
          <Card key={item.item_id} minW="150px" minH="150px">
            <CardBody p={0}>
              <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
                {item.Items_images && item.Items_images.length > 0 ? (
                  <Image
                    src={item.Items_images[0].image_path}
                    alt={item.name}
                    borderRadius="lg"
                    fit="cover"
                    h="100%"
                    w="100%"
                  />
                ) : (
                  <p>Aucune image pour ce gunpla</p>
                )}
              </ChakraLink>
            </CardBody>
            <CardFooter>
              <Text
                fontSize={14}
                textAlign="center"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {item.name}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Box>
      <LogoutButton />
    </Box>
  );
}
