import { Box, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getWishlistById, updateWishlistById } from "../../api/myWishlist.js";
import AddToWishlistIcon from "../icons/AddToWishlistIcon.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/User.jsx";

const AddKitToWishlistButton = ({ token, id, item_id, ...props }) => {
  const { myWishlist, setMyWishlist } = useContext(UserContext);
  const toast = useToast();

  const handleClick = async () => {
    try {
      const existingItem = myWishlist.Items.find(
        (item) => item.item_id === item_id
      );
      if (existingItem) {
        toast({
          title: "Déjà dans votre wishlist ;)",
          description: "Ce kit est déjà présent dans votre wishlist",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const wishlist = await updateWishlistById(token, id, item_id);

      console.log("Wishlist:", wishlist);

      const updatedWishlist = await getWishlistById(token, id);

      setMyWishlist(updatedWishlist);
      toast({
        title: "Ajout réussi",
        description: "Le kit a bien été ajouté à votre wishlist",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ajout échoué",
        description: "Réessayez plus tard",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box
        as="button"
        minW="33%"
        bgColor="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        onClick={handleClick}
        textColor="black"
        textTransform="uppercase"
        fontSize="12px"
        fontWeight="600"
        borderRadius="xl"
        px="1.25rem"
        py="0.5rem"
        {...props}
      >
        <AddToWishlistIcon width="24" />
        Wishlist
      </Box>
    </>
  );
};

AddKitToWishlistButton.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  item_id: PropTypes.number,
};

export default AddKitToWishlistButton;
