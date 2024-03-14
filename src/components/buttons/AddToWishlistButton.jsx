import { Button, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getWishlistById, updateWishlistById } from "../../api/myWishlist.js";

import { useContext } from "react";
import { UserContext } from "../../context/User.jsx";

const AddToWishlistButton = ({ token, id, item_id, ...props }) => {
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
      <Button
        variant="outline"
        colorScheme="brand"
        onClick={handleClick}
        fontWeight="400"
        {...props}
      >
        Wishlist
      </Button>
    </>
  );
};

AddToWishlistButton.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  item_id: PropTypes.number,
};

export default AddToWishlistButton;
