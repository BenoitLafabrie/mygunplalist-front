import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../api/item";
import AddToCollectionButton from "../components/AddToCollectionButton";
import AddToWishlistButton from "../components/AddToWishlistButton";
import Loading from "../components/Loading";
import { UserContext } from "../context/User";

export default function KitPage() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const { userData, userToken, isLoading } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpen = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % item.Items_images.length
    );
  };

  const handlePrev = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + item.Items_images.length) % item.Items_images.length
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }),
    [];

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await getItemById(id, userToken);
        setItem(item);
        console.log(item);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchItem();
  }, [id, userToken]);

  if (isLoading || !item) {
    return <Loading />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="80%"
    >
      <Heading size="md" textAlign="center" py="1em">
        {item.name}
      </Heading>
      <Box display="flex" overflowX="auto" w="100%" gap={4} py="1em">
        {item.Items_images.map((image, index) => (
          <Card
            key={index}
            minW="200px"
            minH="200px"
            onClick={() => handleOpen(index)}
          >
            <Image
              src={image.image_path}
              alt={`Image ${index + 1} for ${item.name}`}
              flexShrink={0}
              borderRadius="md"
              fit="contain"
              h="100%"
              w="100%"
            />
          </Card>
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={handleClose} isCentered="true">
        <ModalOverlay />
        <ModalContent w="95%">
          <ModalBody>
            <Image
              src={item.Items_images[selectedImageIndex].image_path}
              alt="Selected"
              objectFit="contain"
              w="100%"
              h="50vh"
            />
            <Flex justifyContent="space-between">
              <IconButton
                onClick={handlePrev}
                variant="ghost"
                colorScheme="red"
                icon={<ArrowBackIcon />}
                size="lg"
              />
              <IconButton
                onClick={handleNext}
                variant="ghost"
                colorScheme="red"
                icon={<ArrowForwardIcon />}
                size="lg"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box py="1em" w="100%">
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          pb="1.25em"
        >
          <AddToCollectionButton
            token={userToken}
            id={userData?.user_id}
            item_id={item.item_id}
            variant={item.ROG_Url ? "outline" : "solid"}
          />
          <AddToWishlistButton
            token={userToken}
            id={userData?.user_id}
            item_id={item.item_id}
          />
        </Stack>
        <Stack display="flex" flexDirection="column" gap={0}>
          <Text>Grade: {item.Items_props.grade}</Text>
          <Text>Échelle: {item.Items_props.scale}</Text>
          <Text>Série: {item.Items_props.series}</Text>
        </Stack>
      </Box>
      <Box pb="2em">
        <Heading fontSize="18px" pb="0.5em">
          Description
        </Heading>
        <Text textAlign="justify">{item.description}</Text>
      </Box>
    </Box>
  );
}
