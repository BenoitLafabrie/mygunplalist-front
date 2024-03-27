import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import BottomNavBar from "../components/BottomNavBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeHeader from "../components/HomeHeader";
import { UserContext } from "../context/User";

export default function Root() {
  const location = useLocation();
  const { userData, userToken } = useContext(UserContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {location.pathname === "/" ? <HomeHeader /> : <Header />}
      {/* <Header /> */}
      <Outlet style={{ justifyContent: "center" }} minH="87.9vh" />
      <Footer />
      <BottomNavBar />
    </div>
  );
}
