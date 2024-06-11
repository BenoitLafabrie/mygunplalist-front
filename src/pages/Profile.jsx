import {
  Avatar,
  Box,
  Link as ChakraLink,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { KitCard } from "../components/KitCard";
import Loading from "../components/Loading";
import LogoutButton from "../components/buttons/LogoutButton";
import ProfileChart from "../components/ProfileChart";
import { UserContext } from "../context/User";

export default function Profile() {
  const navigate = useNavigate();

  const { userData, myGunplaList, myWishlist, isLoading } =
    useContext(UserContext);

  const createdAt = new Date(userData?.createdAt);
  const now = new Date();
  const diffInTime = now.getTime() - createdAt.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (isLoading || userData === null) {
    return <Loading />;
  }

  if (!userData) {
    navigate("/login");
  }

  if (
    !myGunplaList ||
    myGunplaList.length === 0 ||
    !myWishlist ||
    myWishlist.length === 0
  ) {
    return <Loading />;
  }

  return (
    <Box
      minH={{ base: "55.7%", md: "85%" }}
      display={{ base: "flex", md: "grid" }}
      flexDirection={{ base: "column" }}
      justifyContent={{ base: "center" }}
      alignItems={{ base: "center" }}
      w="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          my="1em"
        >
          <ProfileChart />
          <Avatar
            size="xl"
            name={
              userData?.firstname && userData?.lastname
                ? `${userData?.firstname} ${userData?.lastname}`
                : "G L"
            }
            fontWeight="400"
            style={{ position: "absolute" }}
          />
        </Box>
        <Heading size={{ base: "lg", md: "xl" }} mb="0.25rem" fontWeight="400">
          {userData?.username}
        </Heading>
        <Text
          fontSize={{ base: "sm", md: "lg" }}
          as="em"
          opacity="50%"
          mb="2rem"
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
        w="100%"
        px={{ base: "1em", md: "2em" }}
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
      <Box
        display="flex"
        overflowX="auto"
        w="100%"
        gap={4}
        mr={{ base: "1em", md: "2em" }}
        px={{ base: "1.5em", md: "2em" }}
        py="1.5em"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {myGunplaList?.Item_status?.map((item) => (
          <KitCard
            key={item.Items.item_id}
            item={item.Items}
            minW="190px"
            maxW="200px"
            maxH="350px"
          />
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        w="100%"
        px={{ base: "1em", md: "2em" }}
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
        w="100%"
        gap={4}
        mr={{ base: "1em", md: "2em" }}
        px={{ base: "1.5em", md: "2em" }}
        py="1.5em"
        mb={{ base: "unset", md: "1.5em" }}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {myWishlist?.items?.map((item) => (
          <KitCard
            key={item.item_id}
            item={item}
            minW="190px"
            maxW="200px"
            maxH="350px"
          />
        ))}
      </Box>
      <LogoutButton mb="3em" />
    </Box>
  );
}
