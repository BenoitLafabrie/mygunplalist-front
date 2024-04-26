import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Link as ChakraLink,
  Checkbox,
  HStack,
  Heading,
  Image,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BiBarcodeReader, BiSolidShareAlt } from "react-icons/bi";
import { Link as ReactRouterLink } from "react-router-dom";
import { deleteGunplalistItems } from "../api/item";
import { updateItemStatus } from "../api/myGunplaList";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { UserContext } from "../context/User";

export default function Collection() {
  const {
    userData,
    userToken,
    myGunplaList,
    setMyGunplaList,
    setStatusUpdated,
  } = useContext(UserContext);
  const toast = useToast();
  const iconSize = useBreakpointValue({ base: "20px", md: "24px" });

  const handleStatusChange = async (item, newStatus, showToast = true) => {
    try {
      const item_status_id = item?.Item_status?.item_status_id;

      await updateItemStatus(userToken, item_status_id, newStatus);
      setStatusUpdated(true);

      const newItems = JSON.parse(JSON.stringify(myGunplaList?.Items));
      const itemIndex = newItems?.findIndex((i) => i.id === item.id);

      if (itemIndex !== -1) {
        newItems[itemIndex].Item_status.status = newStatus;
      }

      setMyGunplaList({ ...myGunplaList, Items: newItems });

      if (showToast) {
        toast({
          title: "Statut mis à jour",
          description: "Le status du kit a bien été modifié",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (showToast) {
        toast({
          title: "Oups",
          description:
            "Impossible de mettre à jour le statut du kit, réessayez plus tard",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleAllStatusChange = async (newStatus) => {
    for (const id of selectedRows) {
      const item = currentItems.find((item) => item.item_id === id);
      if (item) {
        await handleStatusChange(item, newStatus, false);
      }
    }
    setIsAllSelected(false);
    setSelectedRows([]);
    toast({
      title: "Statuts mis à jour",
      description: "Le status des kits a bien été modifié",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteGunplalistItems(
        selectedRows,
        userToken,
        myGunplaList.mygunplalist_id
      );
      const newItems = currentItems.filter(
        (item) => !selectedRows.includes(item.item_id)
      );
      setMyGunplaList({ ...myGunplaList, Items: newItems });
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

  const [totalKits, setTotalKits] = useState(0);
  const [garageKits, setGarageKits] = useState(0);
  const [deployedKits, setDeployedKits] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredItems = myGunplaList?.Items;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems?.slice(startIndex, endIndex);

  const [selectValue, setSelectValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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

  useEffect(() => {
    setTotalKits(myGunplaList?.Items?.length);
    setGarageKits(
      myGunplaList?.Items?.filter(
        (item) => item?.Item_status?.status === "Garage"
      ).length
    );
    setDeployedKits(
      myGunplaList?.Items?.filter(
        (item) => item?.Item_status?.status === "Deployed"
      ).length
    );
  }, [myGunplaList?.Items]);

  if (!userData || !myGunplaList || myGunplaList.length === 0) {
    return <Loading />;
  }

  return (
    <Box w="95%" mb="1em" minH="calc(93vh - 82px)">
      <Center flexDirection="column">
        <Box
          my="2em"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading mb="1em" textTransform="uppercase" size="sm">
            gunpla collection
          </Heading>
          <Text color="gray" size="sm">
            @{userData.username}
          </Text>
        </Box>
        <Box
          display="flex"
          mb="1.5em"
          w={{ base: "100%", md: "40%" }}
          alignItems="center"
          justifyContent="space-around"
          gap={3}
        >
          <ChakraLink
            w={{ base: "55%", md: "50%" }}
            as={ReactRouterLink}
            to={"/add_kit"}
            _hover={{ textDecoration: "none" }}
          >
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              bgColor="brand.500"
              borderRadius="8"
              p={{ base: "0.25em", md: "0.5em" }}
            >
              <BiBarcodeReader size={iconSize} color="white" />
              <Text
                textTransform="uppercase"
                textColor="white"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="400"
                textAlign="center"
              >
                ajouter des kits
              </Text>
            </Stack>
          </ChakraLink>
          <ChakraLink
            w={{ base: "45%", md: "50%" }}
            as={ReactRouterLink}
            to={"/collection"}
            _hover={{ textDecoration: "none" }}
          >
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent={{ base: "space-around", md: "center" }}
              bgColor="brand.100"
              borderRadius="8"
              p={{ base: "0.35em", md: "0.6em" }}
            >
              <BiSolidShareAlt size={iconSize} color="gray" />
              <Text
                textTransform="uppercase"
                textColor="gray"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="400"
                textAlign="center"
              >
                partager
              </Text>
            </Stack>
          </ChakraLink>
        </Box>
        <Box
          w={{ base: "100%", md: "40%" }}
          bgColor="brand.100"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          py="1em"
          borderRadius="lg"
        >
          <HStack
            justifyContent={{ base: "center", md: "space-evenly" }}
            w="100%"
          >
            <VStack gap={1}>
              <Text fontSize="sm" color="brand.500" fontWeight="600">
                {totalKits}
              </Text>
              <Text fontSize="sm">kits possédés</Text>
            </VStack>
            <VStack gap={1}>
              <Text fontSize="sm" color="#005778" fontWeight="600">
                {garageKits}
              </Text>
              <Text fontSize="sm">kits en réserve</Text>
            </VStack>
            <VStack gap={1}>
              <Text fontSize="sm" color="#A4DD70" fontWeight="600">
                {deployedKits}
              </Text>
              <Text fontSize="sm">kits assemblés</Text>
            </VStack>
          </HStack>
        </Box>
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
                      <Box w="4" h="4" borderRadius="2" bg="#005778" />
                      <Text fontSize="xs" fontWeight="400">
                        En boîte
                      </Text>
                      <Box w="4" h="4" borderRadius="2" bg="#FF9300" />
                      <Text fontSize="xs" fontWeight="400">
                        En cours
                      </Text>
                      <Box w="4" h="4" borderRadius="2" bg="#A4DD70" />
                      <Text fontSize="xs" fontWeight="400">
                        Terminé
                      </Text>
                      <Select
                        width={{ base: "135px", md: "160px" }}
                        borderRadius="md"
                        value={selectValue}
                        placeholder="Modifier le statut"
                        colorScheme="brand"
                        size={{ base: "xs", md: "sm" }}
                        onChange={(event) => {
                          if (selectedRows.length === 1) {
                            const item = currentItems.find(
                              (item) => item.item_id === selectedRows[0]
                            );
                            if (item) {
                              handleStatusChange(item, event.target.value);
                            }
                          } else {
                            handleAllStatusChange(event.target.value);
                          }
                          setSelectValue("");
                        }}
                      >
                        <option value="Garage">En boîte</option>
                        <option value="Assembling">En cours</option>
                        <option value="Deployed">Terminé</option>
                      </Select>
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
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
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
                      <Th px={1} py={2} onClick={() => requestSort("name")}>
                        Nom
                        {sortField === "name" &&
                          sortDirection !== "none" &&
                          (sortDirection === "asc" ? (
                            <ChevronDownIcon />
                          ) : (
                            <ChevronUpIcon />
                          ))}
                      </Th>
                      <Th px={1} py={2} textAlign="center">
                        Statut
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
                              {item.Item_status?.status === "Garage" && (
                                <Box
                                  w="4"
                                  h="4"
                                  borderRadius="full"
                                  bg="#005778"
                                />
                              )}
                              {item.Item_status?.status === "Assembling" && (
                                <Box
                                  w="4"
                                  h="4"
                                  borderRadius="full"
                                  bg="#FF9300"
                                />
                              )}
                              {item.Item_status?.status === "Deployed" && (
                                <Box
                                  w="4"
                                  h="4"
                                  borderRadius="full"
                                  bg="#A4DD70"
                                />
                              )}
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
              Rien ici pour l&apos;instant, utilisez le bouton pour ajouter des
              kits ou faites votre recherche{" "}
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
