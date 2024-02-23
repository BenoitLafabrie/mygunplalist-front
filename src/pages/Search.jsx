import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Link as ChakraLink,
  Divider,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getAllItems } from "../api/item";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import AddToCollectionButton from "../components/buttons/AddToCollectionButton";
import AddToWishlistButton from "../components/buttons/AddToWishlistButton";
import { UserContext } from "../context/User";

export default function Search() {
  const { userData, userToken, isLoading } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // items filtered by search
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortType, setSortType] = useState("name");
  const itemsPerPage = 10;

  const fetchAllItems = async () => {
    const allItems = await getAllItems();
    if (allItems) {
      setItems(allItems);
    }
  };

  // Fetch the items when the component mounts
  useEffect(() => {
    try {
      fetchAllItems();
    } catch (error) {
      console.error("Erreur:", error);
    }
  }, []);

  const filterFunction = () => {
    if (sortType === "name") {
      const itemsFiltering = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(itemsFiltering);
    } else if (sortType !== "name") {
      const itemsFiltering = items.filter(
        (item) => item.Items_props.grade === sortType
      );
      const itemsSearched = itemsFiltering.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(itemsSearched);
    }
  };

  useEffect(() => {
    filterFunction();
  }, [sortType, items, search]);

  useEffect(() => {
    const topElement = document.getElementById("search-page");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box w="80%" id="search-page" minH="calc(93vh - 66px)">
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        my="2em"
        minH="100%"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Trouvez votre gunpla"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightElement>
            {search && (
              <IconButton
                onClick={() => setSearch("")}
                variant="ghost"
                icon={<CloseIcon color="gray.500" />}
                _hover={{}}
                _active={{}}
              />
            )}
          </InputRightElement>
        </InputGroup>
        <Select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </Select>
        <Select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="name">Tous</option>
          <option value="Entry Grade">Entry Grade</option>
          <option value="High Grade">High Grade</option>
          <option value="Real Grade">Real Grade</option>
          <option value="SD/BB Grade">SD/BB Grade</option>
          <option value="Master Grade">Master Grade</option>
          <option value="Perfect Grade">Perfect Grade</option>
        </Select>
      </Stack>
      <SimpleGrid
        spacing={8}
        columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        mx="auto"
      >
        {currentItems.map((item) => (
          <Card
            key={item.item_id}
            align="center"
            justifyContent="space-between"
          >
            <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
              <CardBody>
                {/* Render the first image of the item if it exists */}
                {item.Items_images && item.Items_images.length > 0 ? (
                  <Image
                    src={item.Items_images[0].image_path}
                    alt={item.name}
                    borderRadius="lg"
                  />
                ) : (
                  <p>Aucune image pour ce gunpla</p>
                )}
                <Heading size="xs" pt="2" textAlign="center" fontWeight="500">
                  {item.name}
                </Heading>
              </CardBody>
            </ChakraLink>
            <Divider color="red" />
            <CardFooter justifyContent="center">
              <ButtonGroup spacing={12}>
                <AddToCollectionButton
                  token={userToken}
                  id={userData?.user_id}
                  item_id={item.item_id}
                />
                <AddToWishlistButton
                  token={userToken}
                  id={userData?.user_id}
                  item_id={item.item_id}
                />
              </ButtonGroup>
            </CardFooter>
          </Card>
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
    </Box>
  );
}
