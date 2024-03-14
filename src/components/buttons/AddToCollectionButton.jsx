import { Button, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  getMygunplalistById,
  updateMygunplalistById,
} from "../../api/myGunplaList.js";

import { useContext } from "react";
import { UserContext } from "../../context/User.jsx";

const AddToCollectionButton = ({ token, id, item_id, ...props }) => {
  const { myGunplaList, setMyGunplaList } = useContext(UserContext);
  const toast = useToast();

  const handleClick = async () => {
    try {
      const existingItem = myGunplaList.Items.find(
        (item) => item.item_id === item_id
      );
      if (existingItem) {
        toast({
          title: "Déjà chez vous ;)",
          description: "Ce kit est déjà présent dans votre gunplalist",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const gunplalist = await updateMygunplalistById(token, id, item_id);

      console.log("Gunplalist:", gunplalist);

      const updatedGunplaList = await getMygunplalistById(token, id);

      setMyGunplaList(updatedGunplaList);
      toast({
        title: "Ajout réussi",
        description: "Le kit a bien été ajouté à votre gunplalist",
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
        variant="solid"
        colorScheme="brand"
        onClick={handleClick}
        fontWeight="400"
        {...props}
      >
        Ajouter
      </Button>
    </>
  );
};

AddToCollectionButton.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  item_id: PropTypes.number,
};

export default AddToCollectionButton;
