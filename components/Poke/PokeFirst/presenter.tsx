import { pokeColorMap } from "@/const/pokeColorMap";
import { ComponentProps } from "react";
import PokeCard from "../PokeCard/container";
import PokeFirst from "./container";

type Props = ComponentProps<typeof PokeFirst> & {
  imgBase: number;
};

export default function PokeFirstPresenter({ firstPoke, imgBase }: Props) {
  return (
    <div
      style={{ width: "90%" }}
      className="d-flex mt-3 mb-2 justify-content-end"
    >
      <span className="mx-2 align-self-center">最初のポケモン:</span>
      <div
        className="px-2 rounded d-flex justify-content-center"
        style={{
          height: `${imgBase}px`,
          backgroundColor: firstPoke.type && pokeColorMap[firstPoke.type[0]],
        }}
      >
        <PokeCard targetPoke={firstPoke} small imgBase={imgBase} />
      </div>
    </div>
  );
}
