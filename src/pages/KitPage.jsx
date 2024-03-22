import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
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
import { BiCollection, BiMinus, BiPlus, BiShareAlt } from "react-icons/bi";
import AddKitToCollectionButton from "../components/buttons/AddKitToCollectionButton";
import AddKitToWishlistButton from "../components/buttons/AddKitToWishlistButton";
import NoticeButton from "../components/buttons/NoticeButton.jsx";
import SlideArrowIcon from "../components/icons/SlideArrowIcon";
import { UserContext } from "../context/User";
import BlackButtonIconLogo from "../assets/icons/blackButtonIconLogo.svg";
import WhiteButtonIconLogo from "../assets/icons/whiteButtonIconLogo.svg";
import ROGLogo from "../assets/icons/ROG_Cover_transparent.png";

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
        <Box h="min-content">
          <SimpleGrid
            h="100%"
            columns={2}
            templateColumns="1fr 2fr"
            justifyContent="center"
            pb="1.25em"
            gap="2em"
          >
            <Stack
              w="fit-content"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              bgColor="brand.100"
              borderRadius="25px"
              p="2.5rem"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                w="100%"
                gap={4}
                pb="1em"
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
                <NoticeButton />
              </Box>
              <Stack
                w="max-content"
                display="flex"
                flexDir="row"
                alignItems="center"
                gap="0.25em"
                pb="2em"
              >
                <BiCollection size="1em" />
                <Text fontSize="12px" fontWeight="700">
                  598
                </Text>
                <Text fontSize="12px">ajouts à la collection</Text>
                <Text fontSize="12px"> - </Text>
                <Text fontSize="12px" fontWeight="700">
                  135
                </Text>
                <Text fontSize="12px">favoris</Text>
                <Box
                  as="button"
                  display="flex"
                  pl="2em"
                  size="sm"
                  variant="ghost"
                  fontSize="12px"
                  fontWeight="400"
                  gap={1}
                >
                  <BiShareAlt size="1.5em" />
                  Partager
                </Box>
              </Stack>
              <Stack display="flex" flexDir="row">
                <Image
                  src={BlackButtonIconLogo}
                  alt="Logo triangulaire noir"
                  boxSize="16px"
                />
                <Heading
                  textTransform="uppercase"
                  fontSize="14px"
                  pb="0.5em"
                  fontWeight="700"
                  letterSpacing={1.75}
                >
                  Détails
                </Heading>
              </Stack>
              <Stack gap={0.5}>
                <Stack display="flex" flexDir="row" gap={1}>
                  <Text fontSize="12px" fontWeight="700">
                    Date de sortie :
                  </Text>
                  <Text fontSize="12px" fontWeight="400">
                    {item.release_date
                      ? item.release_date.split("/").reverse().join("/")
                      : "Date de sortie non disponible"}
                  </Text>
                </Stack>
                <Stack display="flex" flexDir="row" gap={1}>
                  <Text fontSize="12px" fontWeight="700">
                    Code-barres :
                  </Text>
                  <Text fontSize="12px" fontWeight="400">
                    {item.barcode ? item.barcode : "Pas de code-barres"}
                  </Text>
                </Stack>
                <Stack display="flex" flexDir="row" gap={1}>
                  <Text fontSize="12px" fontWeight="700">
                    Échelle :
                  </Text>
                  <Text fontSize="12px" fontWeight="400">
                    {item.Items_props && item.Items_props.scale
                      ? item.Items_props.scale
                      : "Aucune échelle indiquée"}
                  </Text>
                </Stack>
                <Stack display="flex" flexDir="row" gap={1}>
                  <Text fontSize="12px" fontWeight="700">
                    Grade :
                  </Text>
                  <Text fontSize="12px" fontWeight="400">
                    {item.Items_props && item.Items_props.grade
                      ? item.Items_props.grade
                      : "Pas de grade indiqué"}
                  </Text>
                </Stack>
                <Stack display="flex" flexDir="row" gap={1}>
                  <Text fontSize="12px" fontWeight="700">
                    Série :
                  </Text>
                  <Text fontSize="12px" fontWeight="400">
                    {item.Items_props && item.Items_props.series
                      ? item.Items_props.series
                      : "Aucune série indiquée"}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            <Stack w="100%" display="flex" flexDir="column">
              <Accordion defaultIndex={[0]} allowMultiple borderWidth={0}>
                <AccordionItem borderWidth={0}>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            fontSize={14}
                            fontWeight={700}
                            textAlign="left"
                            textTransform="uppercase"
                            letterSpacing={1.5}
                          >
                            description
                          </Box>
                          {isExpanded ? (
                            <BiMinus fontSize="16px" />
                          ) : (
                            <BiPlus fontSize="16px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        pb={4}
                        textAlign="justify"
                        style={{ hyphens: "auto" }}
                      >
                        {item.description}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>

                <AccordionItem borderWidth={0}>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            fontSize={14}
                            fontWeight={700}
                            textAlign="left"
                            textTransform="uppercase"
                            letterSpacing={1.5}
                          >
                            statistiques
                          </Box>
                          {isExpanded ? (
                            <BiMinus fontSize="16px" />
                          ) : (
                            <BiPlus fontSize="16px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        pb={4}
                        textAlign="center"
                        textTransform="uppercase"
                        fontSize={20}
                        fontWeight={700}
                      >
                        à venir...
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Stack>
          </SimpleGrid>
        </Box>
      </Box>
      <Box w="100%" pb="2em" display="flex" flexDir="column" gap={6}>
        <Heading
          pt="2em"
          fontSize={14}
          fontWeight={700}
          textTransform="uppercase"
          letterSpacing={1.5}
        >
          achat au meilleur prix
        </Heading>
        <Text fontSize={12} fontWeight={400}>
          Obtenez le {item.name} dans notre boutique Rise Of Gunpla :
        </Text>
        <Box
          w="50%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          borderWidth={1}
          borderRadius={30}
          py={2.5}
          px={3.5}
        >
          <Image
            w="30%"
            src={ROGLogo}
            alt="Logo Rise Of Gunpla"
            objectFit="contain"
          />
          <Text fontSize={14}>
            {item.name.length > 25
              ? `${item.name.substring(0, 25)}...`
              : item.name}{" "}
            {/* - {item.price ? item.price : "pas de prix indiqué"} */}
          </Text>
          <Box
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            py={2.5}
            px={3.5}
            bgColor="brand.500"
            fontSize={14}
            fontWeight={400}
            textColor="white"
            textTransform="uppercase"
          >
            <Image
              src={WhiteButtonIconLogo}
              alt="Logo triangulaire blanc"
              boxSize="16px"
            />
            voir en ligne
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
