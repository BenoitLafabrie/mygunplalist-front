import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  CardFooter,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as ChakraLink,
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
import { KitCard } from "../components/KitCard";
import { BiBarcodeReader } from "react-icons/bi";

export default function Search() {
  const { userData, userToken, isLoading } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("A-Z");
  const [sortType, setSortType] = useState("name");
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
        item?.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(itemsFiltering);
    } else if (sortType !== "name") {
      const itemsFiltering = items.filter(
        (item) => item?.Items_props?.grade === sortType
      );
      const itemsSearched = itemsFiltering.filter((item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(itemsSearched);
    }
  };

  useEffect(() => {
    filterFunction();
    if (sortDirection === "A-Z") {
      setFilteredItems((prevItems) =>
        [...prevItems].sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1))
      );
    } else if (sortDirection === "Z-A") {
      setFilteredItems((prevItems) =>
        [...prevItems].sort((a, b) => (a[sortType] < b[sortType] ? 1 : -1))
      );
    }
  }, [sortType, items, search, sortDirection]);

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
    <Box
      w={{ base: "80%", md: "90%" }}
      id="search-page"
      minH="calc(93vh - 66px)"
      mt="1em"
    >
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
            onChange={(e) => setSearch(e?.target?.value)}
          />
          <InputRightElement>
            {!search && (
              <ChakraLink as={ReactRouterLink} to="/add_kit">
                <IconButton
                  color="gray.500"
                  variant="ghost"
                  icon={<BiBarcodeReader size={20} />}
                  _hover={{}}
                  _active={{}}
                />
              </ChakraLink>
            )}
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
          placeholder="Tri par ordre alphabétique"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </Select>
        <Select
          placeholder="Tri par grade"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="name">Tous</option>
          <option value="Entry Grade">Entry Grade</option>
          <option value="Figure-rise Standard">Figure-rise Standard</option>
          <option value="High Grade">High Grade</option>
          <option value="HIRM">HIRM</option>
          <option value="Master Grade">Master Grade</option>
          <option value="Perfect Grade">Perfect Grade</option>
          <option value="Real Grade">Real Grade</option>
          <option value="RE/100">RE/100</option>
          <option value="SD/BB Grade">SD/BB Grade</option>
        </Select>
        <Select
          placeholder="Kits par page"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </Select>
      </Stack>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        mx="2em"
      >
        {currentItems.map((item) => (
          <KitCard key={item?.item_id} item={item}>
            <CardFooter justifyContent="center">
              <ButtonGroup spacing={4}>
                <AddToCollectionButton
                  token={userToken}
                  id={userData?.user_id}
                  item_id={item?.item_id}
                />
                <AddToWishlistButton
                  token={userToken}
                  id={userData?.user_id}
                  item_id={item?.item_id}
                />
              </ButtonGroup>
            </CardFooter>
          </KitCard>
        ))}
      </SimpleGrid>
      <Stack alignItems="center" mt="1.5em">
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
