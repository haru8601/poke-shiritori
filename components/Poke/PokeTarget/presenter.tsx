import { pokeColorMap } from "@/const/pokeColorMap";
import { ComponentProps } from "react";
import PokeCard from "../PokeCard/container";
import PokeTarget from "./container";

type Props = ComponentProps<typeof PokeTarget>;

export default function PokeTargetPresenter({ targetPoke, spaceBasis }: Props) {
  return (
    <div
      className="px-2 rounded d-flex align-items-center justify-content-center mx-auto"
      style={{
        height: `${spaceBasis}px`,
        width: "20%",
        backgroundColor: targetPoke.type && pokeColorMap[targetPoke.type[0]],
      }}
    >
      <PokeCard targetPoke={targetPoke} spaceBasis={spaceBasis} />
    </div>
  );
}
