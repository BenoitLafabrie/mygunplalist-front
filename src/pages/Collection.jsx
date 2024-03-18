import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Link as ChakraLink,
  HStack,
  Heading,
  Image,
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
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BiBarcodeReader, BiSolidShareAlt } from "react-icons/bi";
import { Link as ReactRouterLink } from "react-router-dom";
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
  console.log(myGunplaList);

  const handleStatusChange = async (item, newStatus) => {
    try {
      const item_status_id = item?.Item_status?.item_status_id;

      await updateItemStatus(userToken, item_status_id, newStatus);
      setStatusUpdated(true);
      // Create a deep copy of myGunplaList.Items
      const newItems = JSON.parse(JSON.stringify(myGunplaList?.Items));
      // Find the item with the given id and update its status
      const itemIndex = newItems?.findIndex((i) => i.id === item.id);

      if (itemIndex !== -1) {
        newItems[itemIndex].Item_status.status = newStatus;
      }

      // Update myGunplaList.Items with the new array
      setMyGunplaList({ ...myGunplaList, Items: newItems });

      toast({
        title: "Statut mis à jour",
        description: "Le status du kit a bien été modifié",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Oups",
        description:
          "Impossible de mettre à jour le statut du kit, réessayez plus tard",
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
            w="55%"
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
              p="0.25em"
            >
              <BiBarcodeReader size={20} color="white" />
              <Text
                textTransform="uppercase"
                textColor="white"
                fontSize="sm"
                fontWeight="400"
                textAlign="center"
              >
                ajouter des kits
              </Text>
            </Stack>
          </ChakraLink>
          <ChakraLink
            w="45%"
            as={ReactRouterLink}
            to={"/add_kit"}
            _hover={{ textDecoration: "none" }}
          >
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-around"
              bgColor="brand.100"
              borderRadius="8"
              p="0.35em"
            >
              <BiSolidShareAlt size={20} color="gray" />
              <Text
                textTransform="uppercase"
                textColor="gray"
                fontSize="sm"
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
        >
          <HStack justifyContent="center">
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
        {/*         <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          mx="1em"
          mb="1em"
        >
          {currentItems.map((item) => (
            <KitCard key={item.item_id} item={item}>
              <CardFooter mt="-1em" p="0.5em">
                <Select
                  colorScheme="brand"
                  size="sm"
                  defaultValue={item?.Item_status?.status}
                  onChange={(event) =>
                    handleStatusChange(item, event.target.value)
                  }
                >
                  <option value="Garage">Hangar</option>
                  <option value="Assembling">Assemblage</option>
                  <option value="Deployed">Déployé</option>
                </Select>
              </CardFooter>
            </KitCard>
          ))}
        </SimpleGrid> */}
        <Stack w="100%">
          <TableContainer m="2%">
            <Table
              size={{ base: "sm" }}
              variant="striped"
              colorScheme="brand"
              w="100%"
            >
              <TableCaption placement="top" m={0}>
                <HStack spacing={2} my="1em">
                  <Box w="4" h="4" borderRadius="2" bg="#005778" />
                  <Text fontSize="sm" fontWeight="400">
                    Hangar
                  </Text>
                  <Box w="4" h="4" borderRadius="2" bg="#FF9300" />
                  <Text fontSize="sm" fontWeight="400">
                    Assemblage
                  </Text>
                  <Box w="4" h="4" borderRadius="2" bg="#A4DD70" />
                  <Text fontSize="sm" fontWeight="400">
                    Déployé
                  </Text>
                </HStack>
              </TableCaption>
              <Thead>
                <Tr>
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
                        >
                          <Text
                            fontWeight="400"
                            fontSize={{ base: "xs", md: "sm" }}
                            maxWidth={{ base: "175px", md: "unset" }}
                            overflow="hidden"
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
                          {item.Item_status.status === "Garage" && (
                            <Box w="4" h="4" borderRadius="full" bg="#005778" />
                          )}
                          {item.Item_status.status === "Assembling" && (
                            <Box w="4" h="4" borderRadius="full" bg="#FF9300" />
                          )}
                          {item.Item_status.status === "Deployed" && (
                            <Box w="4" h="4" borderRadius="full" bg="#A4DD70" />
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
      </Center>
    </Box>
  );
}
