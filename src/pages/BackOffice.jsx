import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Link as ChakraLink,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import {
  addItem,
  addItemImages,
  addItemProps,
  getAllItems,
  getItemById,
  deleteItems,
  updateItems,
} from "../api/item";
import Pagination from "../components/Pagination";

export default function BackOffice() {
  // Context, toast and navigation
  const { userData, userToken } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  // States for data
  const [, setSelectedItem] = useState(null);
  const [name, setName] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [barcode, setBarcode] = useState("");
  const [description, setDescription] = useState("");
  const [scale, setScale] = useState("");
  const [grade, setGrade] = useState("");
  const [series, setSeries] = useState("");
  const [ROG_Url, setROG_Url] = useState("");
  const [image_path, setImage_path] = useState([]);
  const [imageTextareaValue, setImageTextareaValue] = useState("");

  // States for functions
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      const item = await getItemById(selectedRows, userToken);
      setSelectedItem(item);
      setName(item ? item.name : "");
      setRelease_date(item ? item.release_date : "");
      setBarcode(item ? item.barcode : "");
      setDescription(item ? item.description : "");
      setScale(item ? item.Items_props.scale : "");
      setGrade(item ? item.Items_props.grade : "");
      setSeries(item ? item.Items_props.series : "");
      setROG_Url(item ? item.ROG_Url : "");
      setImage_path(item ? item.Items_images : []);
    };

    if (selectedRows.length > 0) {
      fetchItem();
    }
  }, [selectedRows, userToken]);

  // Variables to represent the data to be added to the database on 3 different tables
  const itemData = { name, release_date, barcode, description, ROG_Url };
  const itemPropsData = { scale, grade, series };
  const itemImagesData = { image_path };

  // Modals and alert management
  const onDeleteAlertOpen = () => setIsDeleteAlertOpen(true);
  const onAddModalOpen = () => setIsAddModalOpen(true);
  const onUpdateModalOpen = () => setIsUpdateModalOpen(true);
  const onDeleteAlertClose = () => setIsDeleteAlertOpen(false);
  const onAddModalClose = () => setIsAddModalOpen(false);
  const onUpdateModalClose = () => setIsUpdateModalOpen(false);

  // Function to handle the addition of a new kit
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const item_id = await addItem(itemData, userToken);
      await addItemProps(item_id, itemPropsData, userToken);
      await addItemImages(item_id, itemImagesData, userToken);
      onAddModalClose();

      const newItem = {
        ...itemData,
        item_id,
        Items_props: itemPropsData,
        Items_images: itemImagesData.image_path[0],
      };

      setItems((prevItems) => [...prevItems, newItem]);

      toast({
        title: "Kit ajouté",
        description: "Ajout dans la base de données réussi",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Oups",
        description: "L'ajout a échoué, réessayez plus tard",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to handle the update of one or more kits
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const itemsToUpdate = selectedRows.map((itemId) => ({
        item_id: itemId,
        ...itemData,
        Items_props: itemPropsData,
        Items_images: itemImagesData.image_path[0],
      }));

      await updateItems(itemsToUpdate, userToken);

      const updatedItems = items.map((item) => {
        if (selectedRows.includes(item.item_id)) {
          return {
            ...item,
            ...itemData,
            Items_props: itemPropsData,
            Items_images: itemImagesData.image_path,
          };
        }
        return item;
      });

      setItems(updatedItems);
      setSelectedRows([]);
      onUpdateModalClose();

      toast({
        title: "Kit(s) modifié(s)",
        description: "Le(s) kit(s) a(ont) bien été modifié(s)",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Oups",
        description: "La modification a échoué, réessayez plus tard",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to handle the deletion of one or more kits
  const handleDelete = async () => {
    try {
      await deleteItems(selectedRows, userToken);
      const newItems = items.filter(
        (item) => !selectedRows.includes(item.item_id)
      );
      setItems(newItems);
      setIsAllSelected(false);
      setSelectedRows([]);
      onDeleteAlertClose();

      toast({
        title: "Kit(s) supprimé(s)",
        description: "Le(s) kit(s) a(ont) bien été supprimé(s)",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Oups",
        description: "Suppression échouée, réessayez plus tard",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // useEffect to fetch all kits from the database
  useEffect(() => {
    const fetchAllItems = async () => {
      const allItems = await getAllItems();
      if (allItems) {
        setItems(allItems);
      }
    };

    try {
      fetchAllItems();
    } catch (error) {
      console.error("Erreur:", error);
    }
  }, []);

  // Filtering and sorting
  const filteredItems = items?.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const requestSort = (field) => {
    let newSortDirection = "none";
    if (sortField === field) {
      if (sortDirection === "asc") {
        newSortDirection = "desc";
      } else if (sortDirection === "desc") {
        newSortDirection = "none";
      } else if (sortDirection === "none") {
        newSortDirection = "asc";
      }
    } else {
      newSortDirection = "asc";
    }
    setSortField(field);
    setSortDirection(newSortDirection);
  };

  const sortedItems = [...filteredItems]?.sort((a, b) => {
    if (sortDirection === "none") return 0;
    const aValue =
      sortField === "name" ? a[sortField] : a.Items_props?.[sortField];
    const bValue =
      sortField === "name" ? b[sortField] : b.Items_props?.[sortField];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  BackOffice.propTypes = {
    filter: PropTypes.func,
  };

  // Pagination
  useEffect(() => {
    const topElement = document.getElementById("dashboard");
    topElement.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Prevent access to non-admin users
  if (userData?.role !== "admin") {
    navigate("/");
  }

  return (
    <Box
      id="dashboard"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH="calc(93vh - 66px)"
    >
      <Stack w="50%" py="1.5em">
        <InputGroup borderColor="#314095">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="#314095" />
          </InputLeftElement>
          <Input
            placeholder="Recherche"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ "::placeholder": { color: "#314095" } }}
          />
          <InputRightElement>
            {search && (
              <IconButton
                onClick={() => setSearch("")}
                variant="ghost"
                icon={<CloseIcon color="#314095" />}
                _hover={{}}
                _active={{}}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack w="100%">
        <TableContainer m="2%">
          <Table variant="striped" colorScheme="brand" w="100%">
            <TableCaption placement="top" m={0}>
              <HStack spacing={1.5} my="1em">
                <Button
                  size={{ base: "xs", md: "sm" }}
                  colorScheme="green"
                  fontWeight="400"
                  onClick={onAddModalOpen}
                >
                  Ajouter
                </Button>
                <Modal isOpen={isAddModalOpen} onClose={onAddModalClose}>
                  <ModalOverlay />
                  <ModalContent bg="brand.100">
                    <ModalHeader>Ajouter un nouveau kit</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleAddItem}>
                      <ModalBody>
                        <Flex
                          direction="column"
                          alignItems="center"
                          gap={4}
                          w="100%"
                        >
                          <FormControl
                            id="name"
                            isRequired
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={name ? "-35%" : "15%"}
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
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="release_date"
                            isRequired
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={release_date ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Date de sortie
                            </FormLabel>
                            <Input
                              border="none"
                              type="date"
                              value={release_date}
                              onChange={(e) => setRelease_date(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="barcode"
                            isRequired
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={barcode ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Code-barres
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={barcode}
                              onChange={(e) => setBarcode(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="description"
                            isRequired
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={description ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-15%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Description
                            </FormLabel>
                            <Textarea
                              border="none"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="scale"
                            isRequired
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={scale ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Échelle
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={scale}
                              onChange={(e) => setScale(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="grade"
                            isRequired
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={grade ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Grade
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="series"
                            isRequired
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={series ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Série
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={series}
                              onChange={(e) => setSeries(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="ROG_Url"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={ROG_Url ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Lien ROG
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={ROG_Url}
                              onChange={(e) => setROG_Url(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="image_path"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={image_path ? "5%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-10%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Lien Images
                            </FormLabel>
                            <Textarea
                              border="none"
                              value={imageTextareaValue}
                              onChange={(e) =>
                                setImageTextareaValue(e.target.value)
                              }
                            />
                            <Stack
                              display="flex"
                              alignItems="flex-end"
                              bgColor="brand.100"
                              pt="1em"
                            >
                              <Button
                                w="50%"
                                variant="outline"
                                colorScheme="blue"
                                size="sm"
                                onClick={() => {
                                  setImage_path((prevUrls) => [
                                    ...prevUrls,
                                    imageTextareaValue,
                                  ]);
                                  setImageTextareaValue("");
                                }}
                              >
                                Ajout du lien de l&apos;image
                              </Button>
                            </Stack>
                          </FormControl>
                        </Flex>
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="green" mr={3} type="submit">
                          Valider
                        </Button>
                        <Button colorScheme="brand" onClick={onAddModalClose}>
                          Annuler
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>

                <Button
                  size={{ base: "xs", md: "sm" }}
                  colorScheme="blue"
                  fontWeight="400"
                  onClick={onUpdateModalOpen}
                >
                  Modifier
                </Button>
                <Modal isOpen={isUpdateModalOpen} onClose={onUpdateModalClose}>
                  <ModalOverlay />
                  <ModalContent bg="brand.100">
                    <ModalHeader>Modifier kit</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleUpdateItem}>
                      <ModalBody>
                        <Flex
                          direction="column"
                          alignItems="center"
                          gap={4}
                          w="100%"
                        >
                          <FormControl
                            id="name"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={name ? "-35%" : "15%"}
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
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="release_date"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={release_date ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Date de sortie
                            </FormLabel>
                            <Input
                              border="none"
                              type="date"
                              value={release_date}
                              onChange={(e) => setRelease_date(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="barcode"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={barcode ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Code-barres
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={barcode}
                              onChange={(e) => setBarcode(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="description"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={description ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-15%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Description
                            </FormLabel>
                            <Textarea
                              border="none"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="scale"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={scale ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Échelle
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={scale}
                              onChange={(e) => setScale(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="grade"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={grade ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Grade
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="series"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={series ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Série
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={series}
                              onChange={(e) => setSeries(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="ROG_Url"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={ROG_Url ? "-35%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-35%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Lien ROG
                            </FormLabel>
                            <Input
                              border="none"
                              type="text"
                              value={ROG_Url}
                              onChange={(e) => setROG_Url(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            id="image_path"
                            position="relative"
                            borderRadius="lg"
                            bgColor="white"
                          >
                            <FormLabel
                              position="absolute"
                              left="1em"
                              top={image_path ? "5%" : "15%"}
                              transition="all .1s linear"
                              boxSizing="border-box"
                              padding="0.1em"
                              bgColor="white"
                              pointerEvents="none"
                              _focus={{ top: "-10%", fontSize: "0.875em" }}
                              zIndex={2}
                              fontWeight="400"
                            >
                              Lien Images
                            </FormLabel>
                            <Textarea
                              border="none"
                              value={imageTextareaValue}
                              onChange={(e) =>
                                setImageTextareaValue(e.target.value)
                              }
                            />
                            <Stack
                              display="flex"
                              alignItems="flex-end"
                              bgColor="brand.100"
                              pt="1em"
                            >
                              <Button
                                w="50%"
                                variant="outline"
                                colorScheme="blue"
                                size="sm"
                                onClick={() => {
                                  setImage_path((prevUrls) => [
                                    ...prevUrls,
                                    imageTextareaValue,
                                  ]);
                                  setImageTextareaValue("");
                                }}
                              >
                                Ajout du lien de l&apos;image
                              </Button>
                            </Stack>
                          </FormControl>
                        </Flex>
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="green" mr={3} type="submit">
                          Valider
                        </Button>
                        <Button
                          colorScheme="brand"
                          onClick={onUpdateModalClose}
                        >
                          Annuler
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>

                <Button
                  size={{ base: "xs", md: "sm" }}
                  colorScheme="brand"
                  fontWeight="400"
                  onClick={onDeleteAlertOpen}
                >
                  Supprimer
                </Button>

                <AlertDialog
                  isOpen={isDeleteAlertOpen}
                  onClose={onDeleteAlertClose}
                  motionPreset="scale"
                  isCentered
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent width={{ base: "90%", md: "40%" }}>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer un/des kit(s)
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        Êtes-vous sûr de vouloir supprimer ce(s) kit(s)?
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button onClick={onDeleteAlertClose}>Non</Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                          Oui
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </HStack>
            </TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">
                  <Checkbox
                    size={{ base: "sm", md: "md" }}
                    colorScheme="brand"
                    isChecked={isAllSelected}
                    onChange={(e) => {
                      setIsAllSelected(e.target.checked);
                      if (e.target.checked) {
                        setSelectedRows(
                          filteredItems.map((item) => item.item_id)
                        );
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </Th>
                <Th onClick={() => requestSort("name")}>
                  Nom
                  {sortField === "name" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th>Box Art</Th>
                <Th onClick={() => requestSort("grade")}>
                  Grade
                  {sortField === "grade" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th onClick={() => requestSort("scale")}>
                  Échelle
                  {sortField === "scale" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th onClick={() => requestSort("series")}>
                  Série
                  {sortField === "series" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th textAlign="center">Code-barres</Th>
                <Th textAlign="center">Date de sortie</Th>
                <Th textAlign="center">Description</Th>
                <Th textAlign="center">Lien ROG</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="sm">
              {currentItems.map((item) => {
                return (
                  <Tr key={item.item_id}>
                    <Td px={1}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Checkbox
                          size={{ base: "sm", md: "md" }}
                          colorScheme="brand"
                          isChecked={selectedRows.includes(item.item_id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRows((prev) => [
                                ...prev,
                                item.item_id,
                              ]);
                            } else {
                              setSelectedRows((prev) =>
                                prev.filter((id) => id !== item.item_id)
                              );
                            }
                          }}
                        />
                      </Box>
                    </Td>
                    <Td>
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`/kits/${item.item_id}`}
                        _hover={{ textDecoration: "none" }}
                      >
                        <Text
                          fontWeight="400"
                          fontSize={{ base: "xs", md: "sm" }}
                          maxWidth={{ base: "175px", md: "500px" }}
                          overflow="hidden"
                          textTransform="uppercase"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {item.name}
                        </Text>
                      </ChakraLink>
                    </Td>
                    <Td>
                      {item.Items_images && item.Items_images[0] ? (
                        <Image
                          src={item.Items_images[0].image_path}
                          alt={item.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="sm"
                        />
                      ) : (
                        "Pas d'image"
                      )}
                    </Td>
                    <Td>
                      {item.Items_props && item.Items_props.grade
                        ? item.Items_props.grade
                        : "Pas de grade indiqué"}
                    </Td>
                    <Td>
                      {item.Items_props && item.Items_props.scale
                        ? item.Items_props.scale
                        : "Aucune échelle indiquée"}
                    </Td>
                    <Td>
                      {item.Items_props && item.Items_props.series
                        ? item.Items_props.series
                        : "Aucune série indiquée"}
                    </Td>
                    <Td>
                      {item.barcode
                        ? item.barcode
                        : "Code-barres non disponible"}
                    </Td>
                    <Td>
                      {item.release_date
                        ? item.release_date.split("/").reverse().join("/")
                        : "Date de sortie non disponible"}
                    </Td>
                    <Td textAlign="center">
                      {item.description ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      )}
                    </Td>
                    <Td textAlign="center">
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`${item.ROG_Url}`}
                        isExternal
                      >
                        {item.ROG_Url ? "Lien" : "Pas de lien"}
                      </ChakraLink>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack alignItems="center">
        <Pagination
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filteredItems={filteredItems}
        />
      </Stack>
    </Box>
  );
}
