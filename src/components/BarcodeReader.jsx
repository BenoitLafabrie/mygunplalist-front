import { useState, useRef, useEffect, useContext } from "react";
import { useZxing } from "react-zxing";
import {
  Box,
  Button,
  List,
  ListItem,
  Text,
  VStack,
  HStack,
  Image,
  Card,
  CardBody,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AddToCollectionButton from "./AddToCollectionButton";
import { UserContext } from "../context/User";

export default function BarcodeReader() {
  // Define state variables for the last result and all scanned barcodes
  const [result, setResult] = useState("");
  const [scannedBarcodes, setScannedBarcodes] = useState([]);
  const [uniqueBarcodes, setUniqueBarcodes] = useState(new Set());

  const { userData, userToken } = useContext(UserContext);

  // Define a ref for the video element
  const videoRef = useRef(null);

  // Create a new state variable to hold the items
  const [items, setItems] = useState([]);

  // Create a new state variable to hold the scanned items
  const [scannedItems, setScannedItems] = useState([]);

  // Fetch the items when the component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_URL}/kits`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des kits");
        }
        return response.json();
      })
      .then((items) => {
        fetch(`${import.meta.env.VITE_APP_URL}/kits-images`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des images");
            }
            return response.json();
          })
          .then((images) => {
            const itemsWithImages = items.map((item) => ({
              ...item,
              images: images.filter((image) => image.item_id === item.item_id),
            }));
            setItems(itemsWithImages);
          });
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
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    },
    // If an error occurs during scanning, log it to the console
    onError(error) {
      console.error(error);
    },
  });

  // Define a function to start the scan
  const startScan = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((err) => console.error(err));
    }
  };

  // Define a function to stop the scan
  const stopScan = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
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
  }, [scannedBarcodes]);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <VStack
      spacing={5}
      flex={1}
      overflowY="auto"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Text mt="1.25em" fontSize="xl" align="center">
        Ajoutons un kit à votre collection !
      </Text>
      <Box as="video" ref={ref} w="80%" borderRadius={10} />
      <HStack>
        <Button colorScheme="teal" onClick={startScan}>
          Démarrer le scan
        </Button>
        <Button colorScheme="red" onClick={stopScan}>
          Arrêter le scan
        </Button>
      </HStack>

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
              to={`/kits/${scannedItems[scannedItems.length - 1].item_id}`}
            >
              <CardBody>
                {/* Render the first image of the item if it exists */}
                {scannedItems[scannedItems.length - 1].images &&
                scannedItems[scannedItems.length - 1].images.length > 0 ? (
                  <Image
                    src={
                      scannedItems[scannedItems.length - 1].images[0].image_path
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

      <Box display="flex" flexDirection="column" alignItems="center">
        <Text mb="1em">Code-barres scannés:</Text>
        <List spacing={1}>
          {Array.from(uniqueBarcodes).map((barcode, index) => (
            <ListItem key={index}>{barcode}</ListItem>
          ))}
        </List>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Text mb="1em">Kits scannés:</Text>
        <List spacing={1} mb="1em">
          {scannedItems.map((item, index) => (
            <ListItem key={index}>{item.name}</ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
}
