import { useContext, useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ButtonIconLogo from "../assets/icons/buttonIconLogo.svg";

import { login } from "../api/auth";

import { UserContext } from "../context/User.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const { userData, setUserToken } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }),
    [];

  useEffect(() => {
    if (userData) {
      navigate("/users/me");
    }
  }, [userData, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await login(email, password);
      setUserToken(token.token);
      if (token) {
        toast({
          title: "Connexion réussie",
          description: "Bon retour parmi nous!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Mauvais identifiants",
        description: "Mail ou mot de passe incorrect",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        minHeight: "calc(100vh - 7.5vh)",
        overflow: "auto",
      }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt="1em"
      >
        <Image src={ButtonIconLogo} boxSize="18px" />
        <Text align="center" textColor="brand.500" fontSize="lg">
          DE RETOUR? CONNECTEZ-VOUS
        </Text>
      </Stack>
      <VStack w="80%" mt="4em" mx="auto" spacing={8}>
        <form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <FormControl id="email" isRequired borderColor="#314095" w="80%">
            <FormLabel>E-mail</FormLabel>
            <Input
              autoComplete="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired borderColor="#314095" w="80%">
            <FormLabel>Mot de passe</FormLabel>
            <Input
              autoComplete="current-password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="red"
            variant="outline"
            type="submit"
            mt="1em"
            w={{ sm: "40%", md: "20%" }}
          >
            CONNEXION
          </Button>
        </form>
        <Text>
          Pas encore inscrit?{" "}
          <ChakraLink as={ReactRouterLink} to="/register" color="brand.500">
            C&apos;est par ici
          </ChakraLink>
        </Text>
      </VStack>
    </div>
  );
}
