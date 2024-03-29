import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Image,
  List,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
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
import { KitCard } from "./KitCard";

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

  // Function to detect if the device is mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

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
        .getUserMedia({
          video: {
            facingMode: isMobile() ? "environment" : "user",
            zoom: 1,
          },
        })
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
    if (scannedBarcodes.length > 0) {
      toast({
        title: "Scan réussi!!",
        description: "Scannez un autre kit ou faîtes votre ajout",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [scannedBarcodes, toast]);

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
      toast({
        title: "Ajout échoué",
        description: "Réessayez plus tard",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
    <Box minH="87.9vh" id="BarcodeReader">
      <Text
        pt={{ base: "2em", md: "1.25em" }}
        pb="1.25em"
        fontSize="xl"
        align="center"
        fontWeight="500"
      >
        AJOUTONS DES KITS À VOTRE COLLECTION!
      </Text>
      <VStack overflowY="auto">
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems={{ base: "center", md: "flex-start" }}
          gap={0}
        >
          <Box
            w={{ base: "90%", md: "50%" }}
            px={{ base: "1em", md: "2em" }}
            position="relative"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            alignItems="center"
            minH="75%"
          >
            <Box
              position="relative"
              overflow="hidden"
              pt={{ base: "0", md: "0.5em" }}
              pb="2em"
            >
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
                left="25%"
                top="35%"
                right="25%"
                bottom="35%"
                border="2px solid white"
                pointerEvents="none"
                opacity={guideOpacity}
                borderRadius={5}
              />
              <Box
                position="absolute"
                left={0}
                w="100%"
                h={"100%"}
                top="0"
                opacity={imgOpacity}
                transition="0.3s ease-in-out"
                borderRadius={10}
                overflow={"hidden"}
              >
                <Image
                  position={"absolute"}
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  src="https://riseofgunpla.com/wp-content/uploads/2022/12/1000183861_1_6SUf2xWmjHXvIa0Ub4uZoDPhtvMQoKGC-1000x1000.webp"
                  alt="gundam camera"
                />
              </Box>
            </Box>
            <HStack pb="1em">
              <Button
                colorScheme="teal"
                onClick={startScan}
                fontWeight="400"
                size={{ base: "xs", md: "sm" }}
                p={4}
              >
                DÉMARRER LE SCAN
              </Button>
              <Button
                colorScheme="brand"
                onClick={stopScan}
                fontWeight="400"
                size={{ base: "xs", md: "sm" }}
                p={4}
              >
                ARRÊTER LE SCAN
              </Button>
            </HStack>
          </Box>
          <Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              pb={{ md: "1em" }}
              py={{ base: "1em", md: "0.5em" }}
            >
              {scannedItems.length > 0 ? (
                <Box
                  display="flex"
                  flexWrap={{ base: "wrap" }}
                  justifyContent={{ base: "center" }}
                  alignItems={{ base: "center" }}
                >
                  <KitCard
                    key={scannedItems[scannedItems.length - 1].item_id}
                    item={scannedItems[scannedItems.length - 1]}
                    toLink={`/kits/${
                      scannedItems[scannedItems.length - 1].item_id
                    }`}
                    imageSrc={
                      scannedItems[scannedItems.length - 1].Items_images[0]
                        .image_path
                    }
                    imageAlt={scannedItems[scannedItems.length - 1].name}
                  />
                  <List spacing={1} pt="1em">
                    {scannedItems.map((item, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        px="1em"
                        gap={3}
                      >
                        <ButtonGroup spacing={8}>
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
              ) : (
                <Box
                  h="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text>Aucun kit scanné pour l&apos;instant</Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </VStack>
      <Box
        gap={4}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        py={{ base: "1em", md: "2em" }}
        pb={{ base: "2em", md: "1em" }}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="solid"
          size={{ base: "sm", md: "md" }}
          colorScheme="brand"
          onClick={addAllToCollection}
          fontWeight="400"
        >
          TOUT AJOUTER À LA COLLECTION
        </Button>
        <Button
          variant="solid"
          size={{ base: "sm", md: "md" }}
          colorScheme="brand"
          onClick={addAllToWishlist}
          fontWeight="400"
        >
          TOUT AJOUTER À LA WISHLIST
        </Button>
      </Box>
    </Box>
  );
}
