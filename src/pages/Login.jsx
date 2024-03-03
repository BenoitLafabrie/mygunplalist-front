import {
  Button,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
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
      localStorage.setItem("userToken", token.token);
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
      console.error(error);
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
        <Image
          src={ButtonIconLogo}
          alt="Logo triangulaire rouge"
          boxSize="18px"
        />
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
            <FormLabel fontWeight="400">E-mail</FormLabel>
            <Input
              autoComplete="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired borderColor="#314095" w="80%">
            <FormLabel fontWeight="400">Mot de passe</FormLabel>
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
            fontWeight="500"
          >
            CONNEXION
          </Button>
        </form>
        <Text>
          Pas encore inscrit?{" "}
          <ChakraLink
            as={ReactRouterLink}
            to="/register"
            color="brand.500"
            _hover={{ textDecoration: "none", textColor: "brand.700" }}
            fontWeight="400"
          >
            C&apos;est par ici
          </ChakraLink>
        </Text>
      </VStack>
    </div>
  );
}
