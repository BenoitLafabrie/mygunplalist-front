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
      <HomePage />
    </div>
  );
}
