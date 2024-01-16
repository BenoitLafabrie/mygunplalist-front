import { Button, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getWishlistById, updateWishlistById } from "../api/myWishlist.js";

import { UserContext } from "../context/User.jsx";
import { useContext } from "react";

const AddToWishlistButton = ({ token, id, item_id }) => {
  const { setMyWishlist } = useContext(UserContext);
  const toast = useToast();

  const handleClick = async () => {
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
  };
  return (
    <>
      <Button variant="outline" colorScheme="red" onClick={handleClick}>
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
