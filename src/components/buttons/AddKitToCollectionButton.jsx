import { Button, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  getMygunplalistById,
  updateMygunplalistById,
} from "../../api/myGunplaList.js";
import AddToCollectionIcon from "../icons/AddToCollectionIcon.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/User.jsx";

const AddKitToCollectionButton = ({ token, id, item_id, ...props }) => {
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
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        variant="solid"
        colorScheme="whiteAlpha"
        onClick={handleClick}
        textColor="black"
        textTransform="uppercase"
        fontWeight="600"
        leftIcon={<AddToCollectionIcon />}
        borderRadius="xl"
        p="1rem"
        {...props}
      >
        Ajouter
      </Button>
    </>
  );
};

AddKitToCollectionButton.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  item_id: PropTypes.number,
};

export default AddKitToCollectionButton;
