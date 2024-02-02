import BottomNavBar from "../components/BottomNavBar";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";

export default function Root() {
  const location = useLocation();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "auto",
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
