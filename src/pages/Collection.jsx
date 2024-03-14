import {
  Box,
  CardFooter,
  Center,
  Heading,
  SimpleGrid,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { KitCard } from "../components/KitCard";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { updateItemStatus } from "../api/myGunplaList";
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
    <Box w="80%" mb="1em" minH="calc(93vh - 82px)">
      <Center flexDirection="column">
        <Heading my="1.5em" textTransform="uppercase" size="md">
          La gunplalist de {userData.username}
        </Heading>
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
