import {
  Box,
  Button,
  Image,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  // useToast,
} from "@chakra-ui/react";
import { /* useContext, */ useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/User.jsx";
import WhiteButtonIconLogo from "../assets/icons/whiteButtonIconLogo.svg";

export default function ForgottenPassword() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const toast = useToast();

  // const { setUserToken } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }),
    [];

  return (
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
          // onSubmit={handleSubmit}
        >
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            w={{ base: "80%", md: "110%" }}
          >
            <Text
              align="center"
              textTransform="uppercase"
              fontSize="2xl"
              fontWeight="700"
            >
              réinitialisation du mot de passe
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
          <Button
            colorScheme="brand"
            mt={{ base: "0.5em", md: "1em" }}
            type="submit"
            fontWeight="400"
            gap={4}
            p="1.5em"
            textTransform="uppercase"
          >
            <Image
              boxSize={4}
              src={WhiteButtonIconLogo}
              alt="Logo triangulaire blanc"
            />
            envoi du mail de réinitialisation
          </Button>
        </Box>
      </VStack>
    </div>
  );
}
