import PropTypes from "prop-types";
import { Button, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const BuyButton = ({ url }) => {
  return (
    <LinkBox>
      <LinkOverlay as={ReactRouterLink} to={url} isExternal>
        <Button
          variant="solid"
          colorScheme="brand"
          fontWeight="400"
          boxShadow="5px 5px 50px 0px rgba(7,29,38,0.25)"
        >
          Acheter
        </Button>
      </LinkOverlay>
    </LinkBox>
  );
};

BuyButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BuyButton;
