import { UserContextProvider } from "./context/User.jsx";
import Home from "./pages/Home.jsx";
import Root from "./pages/Root.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Collection from "./pages/Collection.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import About from "./pages/About.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.js";
import "@fontsource/rubik";
import ErrorPage from "./components/ErrorPage.jsx";
import AddKit from "./pages/AddKit.jsx";
import KitPage from "./pages/KitPage.jsx";
import BackOffice from "./pages/BackOffice.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/search", element: <Search /> },
      {
        path: "/collection",
        element: <Collection />,
      },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/add_kit", element: <AddKit /> },
      { path: "/users", element: <Profile /> },
      {
        path: "/users/me",
        element: <Profile />,
      },
      { path: "/kits", element: <Profile /> },
      { path: "/kits/:id", element: <KitPage /> },
      { path: "/admin", element: <BackOffice /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <About /> },
      { path: "/terms-of-use", element: <TermsOfUse /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
    ],
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);
function App() {
  return (
    <>
      <UserContextProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <RouterProvider router={router} />
        </ChakraProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
