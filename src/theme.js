import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/rubik/wght.css";

//Add color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

//Extend the theme
const theme = extendTheme({
  config,
  fonts: {
    heading: `"Rubik Variable", sans-serif`,
    body: `"Rubik Variable", sans-serif`,
  },
  colors: {
    brand: {
      100: "#f4f9fb",
      200: "#FECACA",
      300: "#FCA5A5",
      400: "#06425b",
      500: "#F00D32",
      600: "#DC2626",
      700: "#B91C1C",
      800: "#991B1B",
      900: "#7F1D1D",
    },
  },
  styles: {
    global: {
      body: {
        overscrollBehavior: "none",
      },
    },
  },
});

export default theme;
