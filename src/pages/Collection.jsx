import {
  Box,
  CardFooter,
  Center,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Select,
  Stack,
  useToast,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { KitCard } from "../components/KitCard";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { updateItemStatus } from "../api/myGunplaList";
import { UserContext } from "../context/User";
import { BiBarcodeReader } from "react-icons/bi";
import { BiSolidShareAlt } from "react-icons/bi";

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
      const newItems = JSON.parse(JSON.stringify(myGunplaList.Items));
      // Find the item with the given id and update its status
      const itemIndex = newItems.findIndex((i) => i.id === item.id);

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredItems = myGunplaList?.Items;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems?.slice(startIndex, endIndex);

  if (!userData || !myGunplaList || myGunplaList.length === 0) {
    return <Loading />;
  }

  return (
    <Box w="90%" mb="1em" minH="calc(93vh - 82px)">
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
          w="100%"
          alignItems="center"
          justifyContent="space-around"
          gap={2}
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
          w="100%"
          bgColor="brand.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py="1em"
          mb="1em"
        >
          <HStack justifyContent="center">
            <VStack gap={1}>
              <Text fontSize="sm" fontWeight="600">
                198
              </Text>
              <Text fontSize="sm">kits possédés</Text>
            </VStack>
            <VStack gap={1}>
              <Text fontSize="sm" color="#005778" fontWeight="600">
                105
              </Text>
              <Text fontSize="sm">kits en réserve</Text>
            </VStack>
            <VStack gap={1}>
              <Text fontSize="sm" fontWeight="600">
                93
              </Text>
              <Text fontSize="sm">kits assemblés</Text>
            </VStack>
          </HStack>
        </Box>
        <SimpleGrid
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
        </SimpleGrid>
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
