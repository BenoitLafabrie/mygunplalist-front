import {
  Avatar,
  Box,
  Link as ChakraLink,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { ProfileCard } from "../components/ProfileKitCard";
import LogoutButton from "../components/buttons/LogoutButton";
import { UserContext } from "../context/User";

export default function Profile() {
  const navigate = useNavigate();

  const { userData, myGunplaList, myWishlist, isLoading } =
    useContext(UserContext);

  if (!userData) {
    navigate("/login");
  }

  const createdAt = new Date(userData?.createdAt);
  const now = new Date();
  const diffInTime = now.getTime() - createdAt.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (
    !userData ||
    !myGunplaList ||
    myGunplaList.length === 0 ||
    !myWishlist ||
    myWishlist.length === 0 ||
    isLoading
  ) {
    return <Loading />;
  }

  return (
    <Box
      minH={{ base: "55.7vh", md: "85vh" }}
      display={{ base: "flex", md: "grid" }}
      flexDirection={{ base: "column" }}
      justifyContent={{ base: "center" }}
      alignItems={{ base: "center" }}
      w="100%"
      ml={{ base: "unset", md: "4em" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          size="xl"
          name={`${userData?.firstname} ${userData?.lastname}`}
          my="1rem"
          fontWeight="400"
        />
        <Heading size={{ base: "lg", md: "xl" }} mb="0.25rem" fontWeight="400">
          {userData?.username}
        </Heading>
        <Text
          fontSize={{ base: "sm", md: "lg" }}
          as="em"
          opacity="50%"
          mb="1rem"
        >
          Membre depuis le{" "}
          {new Date(userData?.createdAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          ({diffInDays} jour(s))
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        w="90%"
      >
        <Heading size={{ base: "md", md: "lg" }} fontWeight="500">
          Ma Gunplalist
        </Heading>
        <ChakraLink as={ReactRouterLink} to="/collection">
          <Text
            casing="uppercase"
            fontSize="14px"
            color="brand.500"
            fontWeight="400"
          >
            tout voir
          </Text>
        </ChakraLink>
      </Box>
      <Box display="flex" overflowX="auto" w="90%" gap={4} py="1.5em">
        {myGunplaList?.Items?.map((item) => (
          <ProfileCard
            key={item.item_id}
            item={item}
            minW="150px"
            minH="150px"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)", textDecoration: "none" }}
          />
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        w="90%"
      >
        <Heading size={{ base: "md", md: "lg" }} fontWeight="500">
          Ma Wishlist
        </Heading>
        <ChakraLink as={ReactRouterLink} to="/wishlist">
          <Text
            casing="uppercase"
            fontSize="14px"
            color="brand.500"
            fontWeight="400"
          >
            tout voir
          </Text>
        </ChakraLink>
      </Box>
      <Box
        display="flex"
        overflowX="auto"
        w="90%"
        gap={4}
        py="1.5em"
        mb={{ base: "unset", md: "1.5em" }}
      >
        {myWishlist?.Items?.map((item) => (
          <ProfileCard
            key={item.item_id}
            item={item}
            minW="150px"
            minH="150px"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          />
        ))}
      </Box>
      <LogoutButton />
    </Box>
  );
}
