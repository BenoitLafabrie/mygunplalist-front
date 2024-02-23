import { Button, useToast } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";

import { useContext } from "react";
import { UserContext } from "../../context/User";

const LogoutButton = () => {
  const toast = useToast();

  const { setUserToken, setUserData } = useContext(UserContext);

  const handleLogout = () => {
    setUserToken("");
    setUserData(null);
    localStorage.removeItem("userToken");

    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté :(",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Button
      leftIcon={<BiLogOut size={24} />}
      borderColor="brand.500"
      textColor="brand.500"
      fontSize="20px"
      fontWeight="500"
      onClick={handleLogout}
      display={{ base: "flex", md: "none" }}
      alignItems="center"
      justifyContent="center"
      variant="outline"
      m="1.5rem"
      p="1.5rem"
    >
      Déconnexion
    </Button>
  );
};

export default LogoutButton;
