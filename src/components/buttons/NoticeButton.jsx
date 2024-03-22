import { Box } from "@chakra-ui/react";
import NoticeIcon from "../icons/NoticeIcon"; // Update with your actual import path

const NoticeButton = () => (
  <Box
    as="button"
    minW="33%"
    bgColor="black"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    variant="solid"
    textColor="white"
    textTransform="uppercase"
    fontSize="12px"
    fontWeight="600"
    borderRadius="xl"
    px="1.25rem"
    py="0.5rem"
    aria-disabled="true"
  >
    <NoticeIcon width="24" />
    Notice
  </Box>
);

export default NoticeButton;
