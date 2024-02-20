import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Link as ChakraLink,
  Divider,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useZxing } from "react-zxing";
import { getAllItems } from "../api/item"; // replace with actual path to item.js
import {
  getMygunplalistById,
  updateMygunplalistById,
} from "../api/myGunplaList";
import { getWishlistById, updateWishlistById } from "../api/myWishlist";
import AddToCollectionButton from "../components/buttons/AddToCollectionButton";
import AddToWishlistButton from "../components/buttons/AddToWishlistButton";
import { UserContext } from "../context/User";

export default function BarcodeReader() {
  // Define state variables for the last result and all scanned barcodes
  const [, setResult] = useState("");
  const [scannedBarcodes, setScannedBarcodes] = useState([]);
  const [, setUniqueBarcodes] = useState(new Set());
  const toast = useToast();
  const [snapshotOpacity, setSnapshotOpacity] = useState(0);
  const [guideOpacity, setGuideOpacity] = useState(1);
  const [imgOpacity, setImgOpacity] = useState(0);
  const [, setScanner] = useState(true);

  const { userData, userToken, setMyGunplaList, setMyWishlist } =
    useContext(UserContext);

  // Define a ref for the video element
  const videoRef = useRef(null);

  // Create a new state variable to hold the items
  const [items, setItems] = useState([]);

  // Create a new state variable to hold the scanned items
  const [scannedItems, setScannedItems] = useState([]);

  // Fetch the items when the component mounts
  useEffect(() => {
    getAllItems()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }, []);

  // Use the useZxing hook to handle barcode scanning
  const { ref } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      setResult(barcode);
      setScannedBarcodes((prevBarcodes) => [...prevBarcodes, barcode]);
      const item = items.find((item) => item.barcode === barcode);
      if (item && !scannedItems.includes(item)) {
        setScannedItems((prevItems) => [...prevItems, item]);
      }
      // if (videoRef.current && videoRef.current.srcObject) {
      //   const tracks = videoRef.current.srcObject.getTracks();
      //   tracks.forEach((track) => track.stop());
      // }
    },
    // If an error occurs during scanning, log it to the console
    onError(error) {
      console.error(error);
    },
  });

  // Define a function to start the scan
  const startScan = () => {
    setScanner(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setGuideOpacity(1);
          setImgOpacity(0);
        })
        .catch((err) => console.error(err));
    }
  };

  // Define a function to stop the scan
  const stopScan = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setGuideOpacity(0);
      setImgOpacity(1);
      setScanner(false);
    }
  };

  useEffect(() => {
    if (ref.current) {
      videoRef.current = ref.current;
    }
  }, [ref]);

  useEffect(() => {
    // When a new barcode is scanned, add it to the uniqueBarcodes Set
    setUniqueBarcodes((prevBarcodes) => {
      const newBarcodes = new Set(prevBarcodes);
      scannedBarcodes.forEach((barcode) => newBarcodes.add(barcode));
      return newBarcodes;
    });
    setSnapshotOpacity(1);
    setGuideOpacity(0);
    setTimeout(() => {
      setSnapshotOpacity(0);
      setGuideOpacity(1);
    }, 300);
  }, [scannedBarcodes]);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const addAllToCollection = async () => {
    try {
      // Iterate through each item in the items array
      scannedItems.forEach(async (item) => {
        //   // Call the updateMyGunplaListById function for each item
        const collection = await updateMygunplalistById(
          userToken,
          userData?.user_id,
          item.item_id
        );
        console.log("Collection:", collection);
      });

      // After updating all items, fetch the updated list
      const updatedGunplaList = await getMygunplalistById(
        userToken,
        userData?.user_id
      );

      // Update the items state with the updated list
      setMyGunplaList(updatedGunplaList);

      toast({
        title: "Ajout réussi",
        description: "Les kits ont bien été ajoutés à votre collection",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding to collection:", error);
      // Handle error if necessary
    }
  };

  const addAllToWishlist = async () => {
    try {
      // Iterate through each item in the items array
      scannedItems.forEach(async (item) => {
        //   // Call the updateMyGunplaListById function for each item
        const wishlist = await updateWishlistById(
          userToken,
          userData?.user_id,
          item.item_id
        );
        console.log("Wishlist:", wishlist);
      });

      // After updating all items, fetch the updated list
      const updatedWishlist = await getWishlistById(
        userToken,
        userData?.user_id
      );

      // Update the items state with the updated list
      setMyWishlist(updatedWishlist);

      toast({
        title: "Ajout réussi",
        description: "Les kits ont bien été ajoutés à votre wishlist",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      // Handle error if necessary
    }
  };
  return (
    <Box minH="87.9vh" id="BarcodeReader">
      <Text mt="1.25em" fontSize="xl" align="center">
        Ajoutons un kit à votre collection !
      </Text>
      <VStack overflowY="auto">
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <Box
            w={{ base: "90%", md: "50%" }}
            position="relative"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            alignItems="center"
            minH="75vh"
          >
            <Box position="relative" overflow="hidden" marginBottom="20px">
              <Box borderRadius={10} as="video" ref={ref} />
              <Box
                w="100%"
                h="100%"
                className="snapshot"
                position="absolute"
                left={0}
                top={0}
                background={"black"}
                borderRadius={10}
                // zIndex="0"
                opacity={snapshotOpacity}
                transition="0.3s ease-in-out"
              />
              <Box
                transition="0.3s ease-in-out"
                position="absolute"
                left="25%" // Adjust the left position as needed
                top="35%" // Adjust the top position as needed
                right="25%" // Adjust the right position as needed
                bottom="35%" // Adjust the bottom position as needed
                border="2px solid white"
                pointerEvents="none" // Ensure the frame doesn't interfere with clicks
                opacity={guideOpacity}
                borderRadius={5}
              />
              <Box
                position="absolute"
                left={0}
                w={{ base: "100%", md: "50%" }}
                h={"100%"}
                top="0"
                opacity={imgOpacity}
                transition="0.3s ease-in-out"
                borderRadius={10}
                overflow={"hidden"}
              >
                <Image
                  position={"absolute"}
                  top="-30px"
                  src="https://riseofgunpla.com/wp-content/uploads/2022/12/1000183861_1_6SUf2xWmjHXvIa0Ub4uZoDPhtvMQoKGC-1000x1000.webp"
                  alt="gundam camera"
                />
              </Box>
            </Box>
            <HStack>
              <Button colorScheme="teal" onClick={startScan}>
                Démarrer le scan
              </Button>
              <Button colorScheme="red" onClick={stopScan}>
                Arrêter le scan
              </Button>
            </HStack>
          </Box>
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Text mb="1em">Dernier scan:</Text>
              {scannedItems.length > 0 ? (
                // scannedItems[scannedItems.length - 1].name
                <Card
                  key={scannedItems[scannedItems.length - 1].item_id}
                  align="center"
                >
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/kits/${
                      scannedItems[scannedItems.length - 1].item_id
                    }`}
                  >
                    <CardBody>
                      {/* Render the first image of the item if it exists */}
                      {scannedItems[scannedItems.length - 1].Items_images &&
                      scannedItems[scannedItems.length - 1].Items_images
                        .length > 0 ? (
                        <Image
                          src={
                            scannedItems[scannedItems.length - 1]
                              .Items_images[0].image_path
                          }
                          alt={scannedItems[scannedItems.length - 1].name}
                          borderRadius="lg"
                        />
                      ) : (
                        <p>Aucune image pour ce gunpla</p>
                      )}
                      <Heading size="xs" pt="2">
                        {scannedItems[scannedItems.length - 1].name}
                      </Heading>
                    </CardBody>
                  </ChakraLink>
                  <Divider color="red" />
                  <CardFooter justifyContent="center">
                    <ButtonGroup spacing={12}>
                      <AddToCollectionButton
                        token={userToken}
                        id={userData.user_id}
                        item_id={scannedItems[scannedItems.length - 1].item_id}
                      />
                      <Button variant="outline" colorScheme="red">
                        Wishlist
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              ) : (
                "Aucun kit scanné pour l'instant"
              )}
            </Box>

            <Box
              gap={2}
              display="flex"
              flexDirection="column"
              // alignItems="center"
            >
              <Button
                variant="solid"
                colorScheme="red"
                onClick={addAllToCollection}
              >
                Ajouter tous les kits scannés à la collection
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={addAllToWishlist}
              >
                Ajouter tous les kits scannés à la wishlist
              </Button>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              <Text mb="1em">Kits scannés:</Text>
              <List spacing={1} mb="1em">
                {scannedItems.map((item, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={3}>
                    <ListItem overflow="hidden">{item.name}</ListItem>
                    <ButtonGroup spacing={1}>
                      <AddToCollectionButton
                        token={userToken}
                        id={userData?.user_id}
                        item_id={item.item_id}
                      />
                      <AddToWishlistButton
                        token={userToken}
                        id={userData?.user_id}
                        item_id={item.item_id}
                      />
                    </ButtonGroup>
                  </Box>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
