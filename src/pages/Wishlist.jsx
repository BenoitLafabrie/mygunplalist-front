import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Image,
  Link as ChakraLink,
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  Checkbox,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import BuyButton from "../components/buttons/BuyButton";
import { UserContext } from "../context/User";
import { deleteWishlistItems } from "../api/item";

export default function Wishlist() {
  const { userData, userToken, myWishlist, setMyWishlist, isLoading } =
    useContext(UserContext);
  const toast = useToast();
  console.log(myWishlist);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredItems = myWishlist?.Items;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems?.slice(startIndex, endIndex);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      // Pass all the selected ids at once
      await deleteWishlistItems(
        selectedRows,
        userToken,
        myWishlist.wishlist_id
      );

      // Remove the deleted items from the local state
      const newItems = currentItems.filter(
        (item) => !selectedRows.includes(item.item_id)
      );
      setMyWishlist({ ...myWishlist, Items: newItems });
      setIsAllSelected(false);
      setSelectedRows([]);
      onClose();

      toast({
        title: "Kit(s) supprimé(s)",
        description: "Le(s) kit(s) a(ont) bien été supprimé(s)",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Oups",
        description: "Suppression échouée, réessayez plus tard",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!userData || !myWishlist || myWishlist.length === 0 || isLoading) {
    return <Loading />;
  } else {
    return (
      <Box w={{ base: "80%", md: "90%" }} mb="1em" minH="calc(93vh - 82px)">
        <Center flexDirection="column">
          <Heading my="1.5em" textTransform="uppercase" size="md">
            La wishlist de {userData.username}
          </Heading>
          {currentItems.length > 0 ? (
            <>
              <Stack w="100%">
                <TableContainer m="2%">
                  <Table
                    size={{ base: "sm", md: "md" }}
                    variant="striped"
                    colorScheme="brand"
                    w="100%"
                  >
                    <TableCaption placement="top" m={0}>
                      <HStack spacing={1.5} my="1em">
                        <Button
                          size={{ base: "xs", md: "sm" }}
                          variant="solid"
                          colorScheme="brand"
                          fontWeight="400"
                          onClick={onOpen}
                        >
                          Supprimer
                        </Button>

                        <AlertDialog
                          isOpen={isOpen}
                          onClose={onClose}
                          motionPreset="scale"
                          isCentered
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent
                              width={{ base: "90%", md: "40%" }}
                            >
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                Supprimer un/des kit(s)
                              </AlertDialogHeader>

                              <AlertDialogBody>
                                Êtes-vous sûr de vouloir supprimer ce(s) kit(s)?
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                <Button onClick={onClose}>Non</Button>
                                <Button
                                  colorScheme="red"
                                  onClick={handleDelete}
                                  ml={3}
                                >
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
                        <Th textAlign="center">Box Art</Th>
                        <Th px={1} py={2}>
                          Nom
                        </Th>
                        <Th px={1} py={2} textAlign="center">
                          Lien
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody fontSize="sm">
                      {currentItems.map((item) => {
                        return (
                          <Tr key={item.item_id} p={2}>
                            <Td px={1}>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Checkbox
                                  size={{ base: "sm", md: "md" }}
                                  colorScheme="brand"
                                  isChecked={selectedRows.includes(
                                    item.item_id
                                  )}
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
                            <Td px={1} py={2}>
                              <Box display="flex" justifyContent="center">
                                {item.Items_images && item.Items_images[0] ? (
                                  <Image
                                    src={item.Items_images[0].image_path}
                                    alt={item.name}
                                    boxSize={{ base: "60px", md: "120px" }}
                                    objectFit="cover"
                                    borderRadius="sm"
                                  />
                                ) : (
                                  "Pas d'image"
                                )}
                              </Box>
                            </Td>
                            <Td px={1} py={2}>
                              <ChakraLink
                                as={ReactRouterLink}
                                to={`/kits/${item.item_id}`}
                                _hover={{ textDecoration: "none" }}
                              >
                                <Text
                                  fontWeight="400"
                                  fontSize={{ base: "xs", md: "sm" }}
                                  maxWidth={{ base: "175px", md: "unset" }}
                                  overflow="hidden"
                                  textTransform="uppercase"
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                >
                                  {item.name}
                                </Text>
                              </ChakraLink>
                            </Td>

                            <Td p={2}>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                {item.ROG_Url ? (
                                  <BuyButton url={item.ROG_Url} />
                                ) : null}
                              </Box>
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
            </>
          ) : (
            <Center h="50vh" w="85%">
              <Text textAlign="justify">
                Rien ici pour l&apos;instant, utilisez le bouton pour ajouter
                des kits ou faites votre recherche{" "}
                <ChakraLink
                  as={ReactRouterLink}
                  to="/search"
                  fontWeight="400"
                  textColor="brand.500"
                >
                  là
                </ChakraLink>
              </Text>
            </Center>
          )}
        </Center>
      </Box>
    );
  }
}
