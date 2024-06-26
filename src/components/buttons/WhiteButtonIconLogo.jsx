import { Image } from "@chakra-ui/react";
import WhiteButtonIconLogo from "../../assets/icons/whiteButtonIconLogo.svg";

export default function ButtonLogo() {
  return (
    <Image
      src={WhiteButtonIconLogo}
      alt="Logo triangulaire blanc"
      boxSize="16px"
      mr="0.25em"
    />
  );
}
