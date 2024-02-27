import {
  Box,
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
    <Card
      key={item.item_id}
      bgColor="#F4F9FB"
      justifyContent="center"
      transition="transform 0.2s"
      _hover={{
        transform: "scale(1.05)",
      }}
      {...props}
    >
      <CardBody p={0}>
        <ChakraLink
          as={ReactRouterLink}
          to={`/kits/${item.item_id}`}
          _hover={{ textDecoration: "none", color: "inherit" }}
        >
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
      <CardFooter display="flex" flexDirection="column">
        <Text
          fontSize={14}
          fontWeight="400"
          textTransform="uppercase"
          textAlign="center"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {item.name}
        </Text>
        <Box
          as="span"
          fontSize="12px"
          fontWeight="400"
          textTransform="uppercase"
          opacity="0.5"
          _before={{
            content: '"• "',
            color: "currentColor",
          }}
        >
          {item.Items_props.grade}
        </Box>
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
    Items_props: PropTypes.shape({
      grade: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }).isRequired,
};
