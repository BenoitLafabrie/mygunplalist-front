import {
  Box,
  Card,
  CardBody,
  Grid,
  Link as ChakraLink,
  Heading,
  Image,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";

export const KitCard = ({ item, children }) => {
  return (
    <Card
      key={item.item_id}
      bgColor="#F4F9FB"
      justifyContent="center"
      transition="transform 0.2s"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <ChakraLink
        as={ReactRouterLink}
        to={`/kits/${item.item_id}`}
        _hover={{ textDecoration: "none", color: "inherit" }}
      >
        <CardBody p="0">
          <Grid templateRows="2fr 1fr" alignItems="center">
            <Box position="relative" p="0" overflow="hidden">
              <Box
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                bgImage={item.Items_images[0].image_path}
                bgSize="contain"
                filter="blur(2px)"
                zIndex={-1}
              />
              {item.Items_images && item.Items_images.length > 0 ? (
                <Image
                  src={item.Items_images[0].image_path}
                  alt={item.name}
                  borderRadius="lg"
                  p="1.25em"
                />
              ) : (
                <p>Aucune image pour ce gunpla</p>
              )}
            </Box>
            <Box bgColor="#F4F9FB">
              <Heading
                size="xs"
                pt="1em"
                pl="1em"
                fontWeight="400"
                textTransform="uppercase"
              >
                {item.name}
              </Heading>
              <Box
                as="span"
                fontSize="12px"
                fontWeight="400"
                textTransform="uppercase"
                opacity="0.5"
                pl="1em"
                _before={{
                  content: '"• "',
                  color: "currentColor",
                }}
              >
                {item.Items_props.grade}
              </Box>
            </Box>
          </Grid>
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
    Items_props: PropTypes.shape({
      grade: PropTypes.string.isRequired,
      scale: PropTypes.string.isRequired,
      series: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
