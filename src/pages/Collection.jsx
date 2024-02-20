import { Box, Center, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { KitCard } from "../components/KitCard";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { UserContext } from "../context/User";

export default function Collection() {
  const { userData, myGunplaList } = useContext(UserContext);

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
        <Heading my="0.5em" textTransform="uppercase" size="md">
          La gunplalist de {userData.username}
        </Heading>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          mx="auto"
        >
          {currentItems.map((item) => (
            <KitCard key={item.item_id} item={item} />
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
