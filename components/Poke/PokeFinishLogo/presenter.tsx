import { ComponentProps } from "react";
import PokeFinishLogo from "./container";
import styles from "@/styles/Top.module.css";

type Props = ComponentProps<typeof PokeFinishLogo>;

export default function PokeFinishLogoPresenter({ finishType }: Props) {
  return (
    <h3
      className={`text-success text-uppercase position-fixed top-50 start-50 translate-middle text-nowrap ${styles.finishLogoCenter}`}
    >
      you {finishType} {finishType == "win" ? "!!" : "..."}
    </h3>
  );
}
