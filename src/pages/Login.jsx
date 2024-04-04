import {
  Box,
  Button,
  Image,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { login } from "../api/auth";
import { UserContext } from "../context/User.jsx";
import WhiteButtonIconLogo from "../assets/icons/whiteButtonIconLogo.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const toast = useToast();

  const { setUserToken } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }),
    [];

  const handleRecaptcha = useCallback((token) => {
    setCaptchaToken(token);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaToken) {
      toast({
        title: "Vérification captcha échouée",
        description: "Réessayez ultérieurement",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = await login(email, password);
      setUserToken(token.token);
      console.log(token.token);
      localStorage.setItem("userToken", token.token);
      if (token) {
        toast({
          title: "Connexion réussie",
          description: "Bon retour parmi nous!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
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
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          minHeight: "calc(100vh - 7.5vh)",
          overflow: "auto",
        }}
      >
        <VStack w={{ base: "90%", md: "50%" }} mt="4em" mx="auto" spacing={8}>
          <Box
            as="form"
            pt="2em"
            pr={{ base: "0", md: "9em" }}
            pb="3em"
            pl={{ base: "0", md: "9em" }}
            bgColor="#f4f9fb"
            borderRadius="lg"
            h="100%"
            w="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={{ base: "1.25em", md: "1.5em" }}
            onSubmit={handleSubmit}
          >
            <Stack
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              w={{ base: "80%", md: "70%" }}
            >
              <Text
                align="center"
                textTransform="uppercase"
                fontSize="xl"
                fontWeight="700"
              >
                me connecter
              </Text>
            </Stack>
            <FormControl
              id="email"
              isRequired
              position="relative"
              w={{ base: "90%", md: "100%" }}
              borderRadius="lg"
              bgColor="white"
            >
              <FormLabel
                position="absolute"
                left="1em"
                top={email ? "-35%" : "15%"}
                transition="all .1s linear"
                boxSizing="border-box"
                padding="0.1em"
                bgColor="white"
                pointerEvents="none"
                _focus={{ top: "-35%", fontSize: "0.875em" }}
                zIndex={2}
                fontWeight="400"
              >
                Adresse email
              </FormLabel>
              <Input
                autoComplete="email"
                border="none"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl
              id="password"
              isRequired
              position="relative"
              w={{ base: "90%", md: "100%" }}
              borderRadius="lg"
              bgColor="white"
            >
              <FormLabel
                position="absolute"
                left="1em"
                top={password ? "-35%" : "15%"}
                transition="all .1s linear"
                boxSizing="border-box"
                padding="0.1em"
                bgColor="white"
                pointerEvents="none"
                _focus={{ top: "-35%", fontSize: "0.875em" }}
                zIndex={2}
                fontWeight="400"
              >
                Mot de passe
              </FormLabel>
              <Input
                autoComplete="current-password"
                border="none"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <GoogleReCaptcha onVerify={handleRecaptcha} />
            <Button
              colorScheme="brand"
              mt={{ base: "0.5em", md: "1em" }}
              type="submit"
              fontWeight="400"
              gap={4}
              p="1.5em"
            >
              <Image
                boxSize={4}
                src={WhiteButtonIconLogo}
                alt="Logo triangulaire blanc"
              />
              CONNEXION
            </Button>
          </Box>
          <Text>
            Nouveau?{" "}
            <ChakraLink
              as={ReactRouterLink}
              to="/register"
              color="brand.500"
              _hover={{ textDecoration: "none", textColor: "brand.700" }}
              fontWeight="400"
            >
              Créer un compte
            </ChakraLink>
          </Text>
        </VStack>
      </div>
    </GoogleReCaptchaProvider>
  );
}
