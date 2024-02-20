import {
  Card,
  CardBody,
  CardFooter,
  Link as ChakraLink,
  Image,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";

export const ProfileCard = ({ item, ...props }) => {
  return (
    <Card key={item.item_id} {...props}>
      <CardBody p={0}>
        <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
          {item.Items_images && item.Items_images.length > 0 ? (
            <Image
              src={item.Items_images[0].image_path}
              alt={item.name}
              borderRadius="md"
              fit="cover"
              h="100%"
              w="100%"
            />
          ) : (
            <p>Aucune image pour ce gunpla</p>
          )}
        </ChakraLink>
      </CardBody>
      <CardFooter>
        <Text
          fontSize={14}
          textAlign="center"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {item.name}
        </Text>
      </CardFooter>
    </Card>
  );
};

ProfileCard.propTypes = {
  item: PropTypes.shape({
    item_id: PropTypes.number.isRequired,
    Items_images: PropTypes.arrayOf(
      PropTypes.shape({
        image_path: PropTypes.string.isRequired,
      })
    ),
    name: PropTypes.string.isRequired,
  }).isRequired,
};
