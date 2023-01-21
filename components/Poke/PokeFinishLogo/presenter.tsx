import { ComponentProps } from "react";
import PokeFinishLogo from "./container";

type Props = ComponentProps<typeof PokeFinishLogo>;

export default function PokeFinishLogoPresenter({ finishType }: Props) {
  return (
    <h3
      style={{
        fontSize: "5rem",
        zIndex: 1000,
        opacity: 0,
        animation: "fade-keyframe 5s ease 0.5s 1 forwards",
      }}
      className="text-success text-uppercase position-fixed top-50 start-50 translate-middle text-nowrap"
    >
      you {finishType} {finishType == "win" ? "!!" : "..."}
    </h3>
  );
}
