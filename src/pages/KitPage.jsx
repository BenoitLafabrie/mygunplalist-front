import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import {
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../api/item";
import Loading from "../components/Loading";
import AddKitToCollectionButton from "../components/buttons/AddKitToCollectionButton";
import AddKitToWishlistButton from "../components/buttons/AddKitToWishlistButton";
import Collection_Icon from "../assets/bottomNavBar/collection_icon.svg";
import NoticeIcon from "../components/icons/NoticeIcon.jsx";
import SlideArrowIcon from "../components/icons/SlideArrowIcon";
import { UserContext } from "../context/User";

export default function KitPage() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const { userData, userToken, isLoading } = useContext(UserContext);

  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef([]);
  const [loaded, setLoaded] = useState(false);
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

  const handleCarouselPrev = () => {
    setActiveSlide((oldSlide) => {
      if (oldSlide === 0) {
        return item.Items_images.length - 1;
      } else {
        return oldSlide - 1;
      }
    });
  };

  const handleCarouselNext = () => {
    setActiveSlide((oldSlide) => {
      if (oldSlide === item.Items_images.length - 1) {
        return 0;
      } else {
        return oldSlide + 1;
      }
    });
  };

  useLayoutEffect(() => {
    if (slideRefs.current[activeSlide] && loaded) {
      slideRefs.current[activeSlide].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeSlide, loaded]);

  useEffect(() => {
    if (item?.Items_images) {
      const preloadImages = item.Items_images.map((image) => {
        const img = new window.Image();
        img.src = image.image_path;
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(preloadImages)
        .then(() => setLoaded(true))
        .catch((error) => console.error("Failed to load images:", error));
    }
  }, [item?.Items_images]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await getItemById(id, userToken);
        setItem(item);
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
      w={{ base: "80%", md: "90%" }}
    >
      <Heading size="md" textAlign="center" py="2em" fontWeight="800">
        {item.name}
      </Heading>
      <Box position="relative" display="flex" w="100%">
        <Button
          aria-label="Image précédente"
          position="absolute"
          bgColor="brand.100"
          borderRadius="full"
          top="50%"
          left="-1.25%"
          transform="translateY(-50%) rotate(180deg)"
          onClick={handleCarouselPrev}
          size="xs"
          zIndex={2}
        >
          <Icon as={SlideArrowIcon} size="10px" />
        </Button>
        <Box
          bgColor="brand.100"
          display="flex"
          overflowX="auto"
          w="100%"
          borderRadius="xl"
          gap={1}
          p="0.35em"
        >
          {item.Items_images.map((image, index) => (
            <Card
              key={index}
              minW={{ base: "200px", md: "500px" }}
              minH={{ base: "200px", md: "300px" }}
              onClick={() => handleOpen(index)}
              shadow="none"
            >
              <Box ref={(el) => (slideRefs.current[index] = el)}>
                <Image
                  src={image.image_path}
                  alt={`Image ${index + 1} du ${item.name}`}
                  flexShrink={0}
                  borderRadius="lg"
                  fit="contain"
                  h="100%"
                  w="100%"
                />
              </Box>
            </Card>
          ))}
        </Box>
        <Button
          aria-label="Image suivante"
          position="absolute"
          bgColor="brand.100"
          borderRadius="full"
          top="50%"
          right="-1.25%"
          transform="translateY(-50%)"
          onClick={handleCarouselNext}
          size="xs"
          zIndex={2}
        >
          <Icon as={SlideArrowIcon} size="10px" />
        </Button>
        <Box
          position="absolute"
          bottom="3.5%"
          left="50%"
          transform="translateX(-50%)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {item.Items_images.map((_, index) => (
            <Box
              key={index}
              as="button"
              h={index === activeSlide ? "8px" : "12px"}
              w={index === activeSlide ? "24px" : "12px"}
              borderRadius={index === activeSlide ? "20px" : "50%"}
              borderWidth={index === activeSlide ? "0px" : "1px"}
              borderColor={index === activeSlide ? "unset" : "brand.100"}
              bg={index === activeSlide ? "brand.500" : "brand.100"}
              onClick={() => setActiveSlide(index)}
              mx={1}
              transition="all 0.2s ease-in-out"
            />
          ))}
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={handleClose} isCentered="true">
        <ModalOverlay />
        <ModalContent w="95%">
          <ModalBody>
            <Image
              src={item.Items_images[selectedImageIndex].image_path}
              alt={`Image ${selectedImageIndex + 1} du ${item.name}`}
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
        <Box h="300px">
          <SimpleGrid
            h="100%"
            columns={2}
            justifyContent="center"
            pb="1.25em"
            gap="5em"
          >
            <Stack
              display="flex"
              flexDirection="row"
              bgColor="brand.100"
              borderRadius="xl"
            >
              <ButtonGroup
                alignItems="center"
                justifyContent="center"
                size="lg"
              >
                <AddKitToCollectionButton
                  token={userToken}
                  id={userData?.user_id}
                  item_id={item.item_id}
                />
                <AddKitToWishlistButton
                  token={userToken}
                  id={userData?.user_id}
                  item_id={item.item_id}
                />
                <Button
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  variant="solid"
                  colorScheme="blackAlpha"
                  textColor="white"
                  textTransform="uppercase"
                  fontWeight="600"
                  leftIcon={<NoticeIcon width="24" />}
                  borderRadius="xl"
                  p="1rem"
                  isDisabled
                >
                  Notice
                </Button>
              </ButtonGroup>
              <Stack
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
              >
                <Image
                  src={Collection_Icon}
                  fill="black"
                  alt="Icône Collection"
                  boxSize="24px"
                  marginBottom="0.5em"
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Box>
        <Stack display="flex" flexDirection="row" gap={4}>
          <Tag colorScheme="brand" variant="outline">
            <span style={{ marginRight: "0.5em" }}>Date de sortie :</span>
            <TagLabel>
              {item.release_date
                ? item.release_date.split("/").reverse().join("/")
                : "Date de sortie non disponible"}
            </TagLabel>
          </Tag>
          <Tag colorScheme="brand" variant="outline">
            <span style={{ marginRight: "0.5em" }}>Échelle :</span>
            {item.Items_props && item.Items_props.scale
              ? item.Items_props.scale
              : "Aucune échelle indiquée"}
          </Tag>
          <Tag colorScheme="brand" variant="outline">
            <span style={{ marginRight: "0.5em" }}>Grade :</span>
            {item.Items_props && item.Items_props.grade
              ? item.Items_props.grade
              : "Pas de grade indiqué"}
          </Tag>
          <Tag colorScheme="brand" variant="outline">
            <span style={{ marginRight: "0.5em" }}>Série :</span>
            {item.Items_props && item.Items_props.series
              ? item.Items_props.series
              : "Aucune série indiquée"}
          </Tag>
        </Stack>
      </Box>
      <Box pb="2em" mb="2em">
        <Heading fontSize="18px" pb="0.5em" fontWeight="500">
          Description
        </Heading>
        <Text textAlign="justify" style={{ hyphens: "auto" }}>
          {item.description}
        </Text>
      </Box>
    </Box>
  );
}
