import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  filteredItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClickNext = () => {
    setCurrentPage((prevPageNumber) =>
      Math.min(prevPageNumber + 1, totalPages)
    );
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };
  return (
    <Stack alignItems="center">
      <ButtonGroup py={4}>
        {currentPage > 1 && (
          <>
            <IconButton
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              variant="outline"
              color="#314095"
              icon={<ArrowLeftIcon />}
            />

            <IconButton
              onClick={handleClickPrev}
              disabled={currentPage === 1}
              variant="outline"
              color="#314095"
              icon={<ArrowBackIcon />}
            />
          </>
        )}
        {pageNumbers
          .slice(currentPage - 1, currentPage + (currentPage === 1 ? 2 : 1))
          .map((number) => (
            <Button
              key={number}
              onClick={() => setCurrentPage(number)}
              disabled={currentPage === number}
              variant="outline"
              color="#314095"
            >
              {number}
            </Button>
          ))}
        {currentPage < Math.ceil(filteredItems.length / itemsPerPage) && (
          <>
            <IconButton
              onClick={handleClickNext}
              disabled={currentPage === totalPages}
              variant="outline"
              color="#314095"
              icon={<ArrowForwardIcon />}
            />
            <IconButton
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              variant="outline"
              color="#314095"
              icon={<ArrowRightIcon />}
            />
          </>
        )}
      </ButtonGroup>
    </Stack>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  filteredItems: PropTypes.array.isRequired,
};

export default Pagination;
