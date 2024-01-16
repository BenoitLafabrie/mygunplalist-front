import { Box, Image, List, ListItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Add_Kit_Icon from "../assets/bottomNavBar/add_kit_icon.svg";
import Collection_Icon from "../assets/bottomNavBar/Collection_Icon.svg";
import Profile_Icon from "../assets/bottomNavBar/profile_icon.svg";
import Search_Icon from "../assets/bottomNavBar/search_icon.svg";
import Wishlist_Icon from "../assets/bottomNavBar/wishlist_icon.svg";

export default function BottomNavBar() {
  return (
    <Box
      h="7.5vh"
      w="100%"
      position="fixed"
      bg="rgba(240, 13, 50, 1)"
      mb={0}
      bottom={0}
      boxShadow="0 0 4px #071D26"
      display={{ md: "none" }}
      zIndex={3}
    >
      <List>
        <Box
          display="flex"
          justifyContent="space-around"
          w="100%"
          color="white"
          fontSize="0.75rem"
        >
          <ChakraLink
            as={ReactRouterLink}
            to="/search"
            _hover={{ textDecoration: "none" }}
          >
            <ListItem
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              marginY="0.5em"
            >
              <Image
                src={Search_Icon}
                alt="Search icon"
                boxSize="24px"
                marginBottom="0.5em"
              />
              Recherche
            </ListItem>
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/collection"
            _hover={{ textDecoration: "none" }}
          >
            <ListItem
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              marginY="0.5em"
            >
              <Image
                src={Collection_Icon}
                alt="Collection icon"
                boxSize="24px"
                marginBottom="0.5em"
              />
              Collection
            </ListItem>
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/wishlist"
            _hover={{ textDecoration: "none" }}
          >
            <ListItem
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              marginY="0.5em"
            >
              <Image
                src={Wishlist_Icon}
                alt="Wishlist icon"
                boxSize="24px"
                marginBottom="0.5em"
              />
              Wishlist
            </ListItem>
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/add_kit"
            _hover={{ textDecoration: "none" }}
          >
            <ListItem
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              marginY="0.5em"
            >
              <Image
                src={Add_Kit_Icon}
                alt="Add a kit icon"
                boxSize="24px"
                marginBottom="0.5em"
              />
              Ajouter
            </ListItem>
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to={`/users/me`}
            _hover={{ textDecoration: "none" }}
          >
            <ListItem
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              marginY="0.5em"
            >
              <Image
                src={Profile_Icon}
                alt="Profile icon"
                boxSize="24px"
                marginBottom="0.5em"
              />
              Profil
            </ListItem>
          </ChakraLink>
        </Box>
      </List>
    </Box>
  );
}
