import { CONFIG } from "@/const/config";
import { pokeColorMap } from "@/const/pokeColorMap";
import { ComponentProps } from "react";
import PokeCard from "../PokeCard/container";
import PokeTarget from "./container";

type Props = ComponentProps<typeof PokeTarget>;

export default function PokeTargetPresenter({ targetPoke }: Props) {
  return (
    <div
      className="px-2 rounded d-flex mx-auto justify-content-center"
      style={{
        height: `${CONFIG.spaceBasis}px`,
        width: "20%",
        minWidth: "200px",
        backgroundColor: targetPoke.type && pokeColorMap[targetPoke.type[0]],
      }}
    >
      <PokeCard targetPoke={targetPoke} small />
    </div>
  );
}
