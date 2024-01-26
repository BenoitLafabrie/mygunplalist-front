import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import ButtonIconLogo from "../assets/icons/ButtonIconLogo.svg";
import { createCollection } from "../api/myGunplaList";

export default function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    console.log("Submitting user data:", userData);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User creation successful. Server response:", response);

        toast({
          title: "Compte créé",
          description: "Bienvenue!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        createCollection();

        if (response.ok) {
          navigate("/users/me");
        } else {
          console.error("Error creating collection");
        }
      } else {
        console.error("Error creating user. Server response:", response);

        try {
          const errorDetails = await response.json();
          console.error("Server error details:", errorDetails);
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
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
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt="1em"
      >
        <Image src={ButtonIconLogo} boxSize="18px" />
        <Text align="center" textColor="brand.500" fontSize="lg">
          CRÉER VOTRE COMPTE
        </Text>
      </Stack>
      <VStack
        minH="100vh"
        w="80%"
        mt="2em"
        mx="auto"
        spacing={3}
        textColor="brand.400"
      >
        <form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5em",
            borderColor: "brand.400",
          }}
        >
          <FormControl
            id="username"
            isRequired
            borderColor="brand.400"
            position="relative"
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
            >
              Pseudo
            </FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              transition="all .1s linear"
            />
          </FormControl>
          <FormControl
            id="lastname"
            borderColor="brand.400"
            position="relative"
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
            >
              Nom
            </FormLabel>
            <Input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
          <FormControl
            id="firstname"
            borderColor="brand.400"
            position="relative"
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
            >
              Prénom
            </FormLabel>
            <Input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl
            id="email"
            isRequired
            borderColor="brand.400"
            position="relative"
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
            >
              E-Mail
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl
            id="password"
            isRequired
            borderColor="brand.400"
            position="relative"
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
            >
              Mot de passe
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="birthdate" isRequired borderColor="brand.400">
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
            >
              Date de naissance
            </FormLabel>
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </FormControl>
          <FormControl id="address" borderColor="brand.400" position="relative">
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
            >
              Adresse
            </FormLabel>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <FormControl
            id="postcode"
            borderColor="brand.400"
            position="relative"
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
            >
              Code Postal
            </FormLabel>
            <Input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </FormControl>
          <FormControl id="city" borderColor="brand.400" position="relative">
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
            >
              Ville
            </FormLabel>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
          <FormControl id="country" borderColor="brand.400" position="relative">
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
            >
              Pays
            </FormLabel>
            <Input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>
          <FormControl id="gender">
            <Select
              placeholder="Choisissez votre genre"
              borderColor="brand.400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Mr</option>
              <option>Mme</option>
              <option>Gunpla</option>
            </Select>
          </FormControl>
          <Button colorScheme="red" variant="outline" mt="1em" type="submit">
            S&apos;ENREGISTRER
          </Button>
        </form>
        <Text my="1em">
          Déja membre?{" "}
          <ChakraLink as={ReactRouterLink} to="/login" color="brand.500">
            Connectez-vous
          </ChakraLink>
        </Text>
      </VStack>
    </div>
  );
}
