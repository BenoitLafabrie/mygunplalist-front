import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/User";
import {
  Box,
  ButtonGroup,
  Card,
  CardFooter,
  CardBody,
  Divider,
  Heading,
  Image,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import AddToWishlistButton from "../components/AddToWishlistButton";
import AddToCollectionButton from "../components/AddToCollectionButton";
import Pagination from "../components/Pagination";

export default function Search() {
  const { userData, userToken } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 10;

  // Fetch the items when the component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_URL}/kits`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des kits");
        }
        return response.json();
      })
      .then((items) => {
        fetch(`${import.meta.env.VITE_APP_URL}/kits-images`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des images");
            }
            return response.json();
          })
          .then((images) => {
            const itemsWithImages = items.map((item) => ({
              ...item,
              images: images.filter((image) => image.item_id === item.item_id),
            }));
            setItems(itemsWithImages);
          });
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const topElement = document.getElementById("search-page");
    topElement.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box w="80%" id="search-page">
      <Stack direction="column" spacing={4} my="2em">
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
      </Stack>
      <Stack spacing={8}>
        {currentItems.map((item) => (
          <Card key={item.item_id} align="center">
            <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
              <CardBody>
                {/* Render the first image of the item if it exists */}
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0].image_path}
                    alt={item.name}
                    borderRadius="lg"
                  />
                ) : (
                  <p>Aucune image pour ce gunpla</p>
                )}
                <Heading size="xs" pt="2">
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
