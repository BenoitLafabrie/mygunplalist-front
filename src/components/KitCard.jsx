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

export const KitCard = ({ item, children, ...props }) => {
  return (
    <Card
      key={item.item_id}
      bgColor="#F4F9FB"
      justifyContent="center"
      transition="transform 0.15s"
      _hover={{
        transform: "scale(1.04)",
      }}
      p={0}
      {...props}
    >
      <ChakraLink
        as={ReactRouterLink}
        to={`/kits/${item.item_id}`}
        _hover={{ textDecoration: "none", color: "inherit" }}
      >
        <CardBody p="0">
          <Grid templateRows="2fr 1fr" alignItems="center" p={0}>
            <Box
              w="100%"
              h="0"
              pb="100%"
              position="relative"
              overflow="hidden"
              zIndex="0"
            >
              <Box
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                bgColor="white"
                bgImage={item.Items_images[0].image_path}
                bgSize="contain"
                bgRepeat="no-repeat"
                bgPosition="center center"
                transform="scale(1.9)"
                filter="blur(2px)"
                opacity="0.225"
                zIndex={-1}
              />
              {item.Items_images && item.Items_images.length > 0 ? (
                <Image
                  src={item.Items_images[0].image_path}
                  alt={item.name}
                  borderRadius="lg"
                  position="absolute"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  objectPosition="center center"
                  p="0"
                  mixBlendMode="multiply"
                  filter="brightness(1.15)"
                />
              ) : (
                <p>Aucune image pour ce gunpla</p>
              )}
            </Box>
            <Box bgColor="#F4F9FB" p={0}>
              <Heading
                size="xs"
                pt="1em"
                px="1em"
                fontWeight="400"
                fontSize="12px"
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
