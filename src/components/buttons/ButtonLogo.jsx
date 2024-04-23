import { Image } from "@chakra-ui/react";
import ButtonIconLogo from "../../assets/icons/buttonIconLogo.svg";

export default function ButtonLogo() {
  return (
    <Image
      src={ButtonIconLogo}
      alt="Logo triangulaire rouge"
      boxSize="16px"
      mr="0.25em"
    />
  );
}
