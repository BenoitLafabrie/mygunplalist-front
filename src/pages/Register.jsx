import {
  Box,
  Button,
  Link as ChakraLink,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { createCollection } from "../api/myGunplaList";
import WhiteButtonIconLogo from "../assets/icons/whiteButtonIconLogo.svg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const userData = {
      username,
      firstname,
      lastname,
      email,
      password,
      birthdate,
      address,
      city,
      postcode,
      country,
      gender,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        toast({
          title: "Compte créé",
          description: "Bienvenue!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("User created:", userData);
        await createCollection();

        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error creating collection");
        }
      } else {
        console.error("Error creating user. Server response:", response);

        try {
          // Consume the response body as JSON
          const errorDetails = await response.json();
          console.error("Server error details:", errorDetails);
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);

          // If parsing as JSON fails, attempt to read the response body as text
          try {
            const errorText = await response.text();
            console.error("Server error body (text):", errorText);
          } catch (textError) {
            console.error("Error reading response body as text:", textError);
          }
        }

        toast({
          title: "Inscription échouée",
          description: "Réessayez plus tard",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "calc(100vh - 7.5vh)",
        overflow: "auto",
      }}
    >
      <VStack
        minH="100vh"
        w={{ base: "85%", md: "45%" }}
        pt={{ base: "3em", md: "4em" }}
        pb={{ base: "3em", md: "2em" }}
        mx="auto"
        spacing={3}
        textColor="brand.400"
      >
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
              créer un compte mygunplalist
            </Text>
          </Stack>
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            w={{ base: "80%", md: "130%" }}
          >
            <Text
              textColor="orange"
              align="center"
              textTransform="uppercase"
              fontSize="md"
              fontWeight="700"
            >
              avertissement : la réinitialisation du mot de passe n&apos;étant
              pas encore implémentée, veuillez ne pas oublier votre mot de
              passe.
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
              border="none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl
            id="username"
            isRequired
            position="relative"
            w={{ base: "90%", md: "100%" }}
            borderRadius="lg"
            bgColor="white"
          >
            <FormLabel
              position="absolute"
              left="1em"
              top={username ? "-35%" : "15%"}
              transition="all .1s linear"
              boxSizing="border-box"
              padding="0.1em"
              bgColor="white"
              pointerEvents="none"
              _focus={{ top: "-35%", fontSize: "0.875em" }}
              zIndex={2}
              fontWeight="400"
            >
              @Pseudo
            </FormLabel>
            <Input
              border="none"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              transition="all .1s linear"
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
            <InputGroup>
              <Input
                border="none"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="3.5rem">
                <Button
                  p="1rem"
                  h="1.75rem"
                  variant="ghost"
                  size="md"
                  onClick={handleClick}
                  opacity={0.25}
                >
                  {show ? (
                    <GrFormViewHide size={24} />
                  ) : (
                    <GrFormView size={24} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl
            id="password-confirm"
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
              Confirmer le mot de passe
            </FormLabel>
            <InputGroup>
              <Input
                border="none"
                type={show ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value !== password) {
                    setErrorMessage("Les mots de passe ne correspondent pas.");
                  } else {
                    setErrorMessage("");
                  }
                }}
              />
              <InputRightElement width="3.5rem">
                <Button
                  p="1rem"
                  h="1.75rem"
                  variant="ghost"
                  size="md"
                  onClick={handleClick}
                  opacity={0.25}
                >
                  {show ? (
                    <GrFormViewHide size={24} />
                  ) : (
                    <GrFormView size={24} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errorMessage && (
              <Text bgColor="brand.100" color="red">
                {errorMessage}
              </Text>
            )}
          </FormControl>
          <Box w="100%" py={{ base: "1em", md: "0.5em" }}>
            <Stack spacing={1}>
              <Divider
                colorScheme="blackAlpha"
                opacity={1}
                mx={{ base: 1, md: 0 }}
              />
              <Text
                textAlign="center"
                textTransform="uppercase"
                textColor="gray"
                bg="brand.100"
                mx={{ base: 6, md: 14 }}
                px={{ base: 1, md: 1 }}
                my={-4}
                zIndex={1}
              >
                informations personnelles
              </Text>
            </Stack>
          </Box>
          <Box w="100%">
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-start" }}
              gap={4}
              w="100%"
            >
              <FormControl
                id="gender"
                bgColor="white"
                borderRadius="lg"
                w={{ base: "90%", md: "35%" }}
              >
                <Select
                  border="none"
                  placeholder="Titre"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Mme</option>
                  <option>Mr</option>
                  <option>Gunpla</option>
                </Select>
              </FormControl>
              <FormControl
                id="firstname"
                position="relative"
                w={{ base: "90%", md: "100%" }}
                borderRadius="lg"
                bgColor="white"
              >
                <FormLabel
                  position="absolute"
                  left="1em"
                  top={username ? "-35%" : "15%"}
                  transition="all .1s linear"
                  boxSizing="border-box"
                  padding="0.1em"
                  bgColor="white"
                  pointerEvents="none"
                  _focus={{ top: "-35%", fontSize: "0.875em" }}
                  zIndex={2}
                  fontWeight="400"
                >
                  Prénom
                </FormLabel>
                <Input
                  border="none"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </FormControl>
            </Flex>
          </Box>
          <FormControl
            id="lastname"
            position="relative"
            w={{ base: "90%", md: "100%" }}
            borderRadius="lg"
            bgColor="white"
          >
            <FormLabel
              position="absolute"
              left="1em"
              top={lastname ? "-35%" : "15%"}
              transition="all .1s linear"
              boxSizing="border-box"
              padding="0.1em"
              bgColor="white"
              pointerEvents="none"
              _focus={{ top: "-35%", fontSize: "0.875em" }}
              zIndex={2}
              fontWeight="400"
            >
              Nom
            </FormLabel>
            <Input
              border="none"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
          <FormControl
            id="birthdate"
            isRequired
            bgColor="white"
            w={{ base: "90%", md: "100%" }}
          >
            <FormLabel
              position="absolute"
              left="1em"
              top={birthdate ? "-35%" : "15%"}
              transition="all .1s linear"
              boxSizing="border-box"
              padding="0.1em"
              bgColor="white"
              pointerEvents="none"
              _focus={{ top: "-35%", fontSize: "0.875em" }}
              zIndex={2}
              fontWeight="400"
            >
              Date de naissance
            </FormLabel>
            <Input
              border="none"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </FormControl>
          <FormControl
            id="address"
            position="relative"
            w={{ base: "90%", md: "100%" }}
            borderRadius="lg"
            bgColor="white"
          >
            <FormLabel
              position="absolute"
              left="1em"
              top={address ? "-35%" : "15%"}
              transition="all .1s linear"
              boxSizing="border-box"
              padding="0.1em"
              bgColor="white"
              pointerEvents="none"
              _focus={{ top: "-35%", fontSize: "0.875em" }}
              zIndex={2}
              fontWeight="400"
            >
              Adresse
            </FormLabel>
            <Input
              border="none"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <Box w="100%">
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-start" }}
              gap={4}
              w="100%"
            >
              <FormControl
                id="postcode"
                position="relative"
                w={{ base: "90%", md: "auto" }}
                borderRadius="lg"
                bgColor="white"
              >
                <FormLabel
                  position="absolute"
                  left="1em"
                  top={postcode ? "-35%" : "15%"}
                  transition="all .1s linear"
                  boxSizing="border-box"
                  padding="0.1em"
                  bgColor="white"
                  pointerEvents="none"
                  _focus={{ top: "-35%", fontSize: "0.875em" }}
                  zIndex={2}
                  fontWeight="400"
                >
                  Code Postal
                </FormLabel>
                <Input
                  border="none"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </FormControl>
              <FormControl
                id="city"
                position="relative"
                w={{ base: "90%", md: "100%" }}
                borderRadius="lg"
                bgColor="white"
              >
                <FormLabel
                  position="absolute"
                  left="1em"
                  top={city ? "-35%" : "15%"}
                  transition="all .1s linear"
                  boxSizing="border-box"
                  padding="0.1em"
                  bgColor="white"
                  pointerEvents="none"
                  _focus={{ top: "-35%", fontSize: "0.875em" }}
                  zIndex={2}
                  fontWeight="400"
                >
                  Ville
                </FormLabel>
                <Input
                  border="none"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
            </Flex>
          </Box>
          <FormControl
            id="country"
            position="relative"
            w={{ base: "90%", md: "100%" }}
            borderRadius="lg"
            bgColor="white"
          >
            <FormLabel
              position="absolute"
              left="1em"
              top={country ? "-35%" : "15%"}
              transition="all .1s linear"
              boxSizing="border-box"
              padding="0.1em"
              bgColor="white"
              pointerEvents="none"
              _focus={{ top: "-35%", fontSize: "0.875em" }}
              zIndex={2}
              fontWeight="400"
            >
              Pays
            </FormLabel>
            <Input
              border="none"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>
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
            S&apos;INSCRIRE
          </Button>
        </Box>
        <Text py={{ base: "0.5em", md: "2em" }}>
          Vous avez déjà un compte?{" "}
          <ChakraLink
            as={ReactRouterLink}
            to="/login"
            color="brand.500"
            fontWeight="400"
          >
            Se connecter
          </ChakraLink>
        </Text>
      </VStack>
    </div>
  );
}
