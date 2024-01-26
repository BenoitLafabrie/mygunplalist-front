import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import Pagination from "../components/Pagination";

export default function BackOffice() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Changer le nombre d'items par page pour

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
            return itemsWithImages;
          })
          .then((itemsWithImages) => {
            fetch(`${import.meta.env.VITE_APP_URL}/kits-props`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    "Erreur lors de la récupération des propriétés"
                  );
                }
                return response.json();
              })
              .then((props) => {
                const itemsWithImagesAndProps = itemsWithImages.map((item) => ({
                  ...item,
                  props: props.filter((prop) => prop.item_id === item.item_id),
                }));
                setItems(itemsWithImagesAndProps);
              });
          });
      });
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortDirection === "none") return 0;
    const aValue = sortField === "name" ? a[sortField] : a.props[0][sortField];
    const bValue = sortField === "name" ? b[sortField] : b.props[0][sortField];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    const topElement = document.getElementById("dashboard");
    topElement.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  BackOffice.propTypes = {
    filter: PropTypes.func,
  };

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
      <Stack w="50%">
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
            <Thead>
              <Tr>
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
                <Th textAlign="center">Description</Th>
                <Th textAlign="center">Lien ROG</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="sm">
              {currentItems.map((item) => {
                return (
                  <Tr key={item.item_id}>
                    <Td>
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`/kits/${item.item_id}`}
                      >
                        {item.name}
                      </ChakraLink>
                    </Td>
                    <Td>
                      {item.images && item.images[0] ? (
                        <Image
                          src={item.images[0].image_path}
                          alt={item.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="sm"
                        />
                      ) : (
                        "No Image"
                      )}
                    </Td>
                    <Td>
                      {item.props && item.props[0] && item.props[0].grade
                        ? item.props[0].grade
                        : "Pas de grade indiqué"}
                    </Td>
                    <Td>
                      {item.props && item.props[0] && item.props[0].scale
                        ? item.props[0].scale
                        : "Aucune échelle indiquée"}
                    </Td>
                    <Td>
                      {item.props && item.props[0] && item.props[0].series
                        ? item.props[0].series
                        : "Aucune série indiquée"}
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
