import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/rubik";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import { UserContextProvider } from "./context/User.jsx";
import About from "./pages/About.jsx";
import AddKit from "./pages/AddKit.jsx";
import BackOffice from "./pages/BackOffice.jsx";
import Collection from "./pages/Collection.jsx";
import Home from "./pages/Home.jsx";
import KitPage from "./pages/KitPage.jsx";
import Login from "./pages/Login.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Root from "./pages/Root.jsx";
import Search from "./pages/Search.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import theme from "./theme.js";
import ForgottenPassword from "./pages/ForgottenPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [],
      },
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
      { path: "/forgotten-password", element: <ForgottenPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/about", element: <About /> },
      { path: "/terms-of-use", element: <TermsOfUse /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
    ],
  },
]);
function App() {
  return (
    <UserContextProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </UserContextProvider>
  );
}

export default App;
