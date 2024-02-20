import {
  Card,
  CardBody,
  Link as ChakraLink,
  Heading,
  Image,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";

export const KitCard = ({ item, children }) => {
  return (
    <Card key={item.item_id}>
      <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
        <CardBody>
          {item.Items_images && item.Items_images.length > 0 ? (
            <Image
              src={item.Items_images[0].image_path}
              alt={item.name}
              borderRadius="lg"
            />
          ) : (
            <p>Aucune image pour ce gunpla</p>
          )}
          <Heading size="xs" pt="2" textAlign="center">
            {item.name}
          </Heading>
        </CardBody>
      </ChakraLink>
      {children}
    </Card>
  );
};

KitCard.propTypes = {
  item: PropTypes.shape({
    item_id: PropTypes.number.isRequired,
    Items_images: PropTypes.arrayOf(
      PropTypes.shape({
        image_path: PropTypes.string.isRequired,
      })
    ),
    name: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
