import BottomNavBar from "../components/BottomNavBar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Root() {
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
      <Header />
      <Outlet style={{ justifyContent: "center" }} />
      <Footer />
      <BottomNavBar />
    </div>
  );
}
