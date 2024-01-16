import BarcodeReader from "../components/BarcodeReader";

export default function AddKit() {
  return (
    <div style={{ height: "79vh" }} id="BarcodeReader">
      <div>
        <BarcodeReader />
      </div>
    </div>
  );
}
