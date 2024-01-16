import BottomNavBar from "../components/BottomNavBar";
import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";
import HomePage from "../components/HomePage";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        minHeight: "calc(100vh - 7.5vh)",
        overflow: "auto",
      }}
    >
      <HomeHeader />
      <HomePage />
      <Footer />
      <BottomNavBar />
    </div>
  );
}
